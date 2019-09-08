<template>
  <div class="container">
    <div class="container-item">
      <div class="header">
        <div class="header-name">{{ curOption.shortName }}</div>
        <div class="header-eng">up-and-out call options</div>
      </div>

      <div class="underlying-box">
        <div class="underlying-header">{{ underlying.name + ' (' + underlying.code + ')' }}</div>
        <div class="underlying-detail">
          <div :class="addChgClass(underlying.lastPrice)" class="underlying-detail-left">{{ underlying.lastPrice }}</div>
          <div class="underlying-detail-right">
            <div class="cur-day">
              <span>
                <span class="chg-type">当 日</span>
                <span class="chg-arrows rise-arrows"/>
              </span>
              <span :class="addChgClass(underlying.lastPrice)">{{ underlying.lastPrice }}</span>
              <span :class="addChgClass(underlying.pctChg)">{{ underlying.pctChg }}</span>
            </div>
            <div class="recent-month">
              <span>
                <span class="chg-type">近1月</span>
                <span class="chg-arrows fall-arrows"/>
              </span>
              <span :class="addChgClass(underlying.lastPrice)">{{ underlying.lastPrice }}</span>
              <span :class="addChgClass(underlying.pctChg)">{{ underlying.pctChg }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-box">
        <div class="chart-title title">收益示意图</div>
        <div class="chart-direction">方向：<span class="rise">看涨</span></div>
        <div class="chart">
          <option-chart :data="chartData" :option="chartOption" />
        </div>
        <div class="chart">
          <option-chart :data="chartDataWithoutRate" :option="chartOption" />
        </div>
      </div>

      <div class="setting-box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="参数详情" name="one">

            <div class="title">参数期限</div>
            <div class="setting-select">
              <choose v-model="expires" :data="expiresData" type="str" name="expires" />
            </div>

            <div class="title">是否年化</div>
            <div class="setting-select">
              <choose v-model="ifAnnual" type="bool" name="annual" />
            </div>

            <div class="title">选择执行价</div>
            <div class="setting-select">
              <el-slider v-model="strikePrice" :min="strikePriceMin" :max="strikePriceMax" :step="strikeStep" :marks="strikePriceMarks" />
            </div>

            <div class="title">选择参与率</div>
            <div class="setting-select">
              <el-slider v-model="participationRate" :min="participationRateMin" :max="participationRateMax" :step="participationRateStep" :marks="participationRateMarks" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="收益说明" name="two">
            <div class="title">收益说明</div>
            <p class="explain">购入一份行权价格为K的向上敲出看涨期权，且障碍价格为B，若标的资产在合约期间价格高于B，期权自动消失。当B≤K时，向上敲出看涨期权在触碰到障碍价格时就已经消失，即永远无法行权，此时期权价值为0，这样设计的期权将毫无意义；当B>K时，该期权才有可能行权，所以我们只讨论此种情况。假设该期权的权利金为c，合约到期时标的资产价格为ST，若在合约期间标的资产价格从未超过障碍价格B且到期价格低于行权价格K，多头方放弃行权，收益为-c，即亏损了期权的权利金；若在合约期间标的资产价格从未超过障碍价格B且到期价格高于行权价格K，到期收益为ST-K-c；若在合约期间标的资产价格超过障碍价格，期权自动消失，投资者的损失同样为期权的权利金。</p>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-button type="primary" @click.native.prevent="calcOptionCost">计算期权费</el-button>
    <div v-if="ifCalcBox" class="calc-box">
      <div class="close-box"/>
      <div class="title">输入名义本金(元)</div>
      <el-input v-model="notionalPrincipal" />
      <div class="calc-text-box">
        <span>费率</span>
        <span>{{ toPercent(rate) }}</span>
      </div>
      <div class="calc-text-box">
        <span>期权费</span>
        <span>{{ optionCost }}</span>
      </div>
      <div class="calc-btn-box">
        <el-button type="primary">认购</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getProducts } from '@/api/enquiry'
  import { addChgClass, keepDecimals, toPercent, formatNumber } from '@/utils/tool'
  import Choose from '@/views/components/Choose'
  import Slider from '@/views/components/Slider'
  import OptionChart from '@/views/components/OptionChart'
  import OptionChartOne from '@/views/components/OptionChartOne'
  export default {
    name: 'OptionDetail',
    components: {
      Choose,
      Slider,
      OptionChart,
      OptionChartOne
    },
    data() {
      return {
        isCall: true,
        // 参数/说明，当前tab
        activeName: 'one',

        // 根据标的和期权name返回的数据
        data: [],

        // 当前期限，期限数组
        expires: 1, expiresData: [1, 2, 3, 4],
        // 是否年化
        ifAnnual: true,
        // 名义本金
        notionalPrincipal: 10000,

        // 费用
        fee: 0,
        // 费率
        // rate: 0.0005,
        // 当前执行价，执行价数组
        strikePrice: 0, strikePriceMin: 0, strikePriceMax: 0, strikeStep: 0.5, strikePriceData: [], strikePriceMarks: {},
        // 当前参与率，参与率数组
        participationRate: 100, participationRateMin: 0, participationRateMax: 200, participationRateStep: 1, participationRateData: [], participationRateMarks: {},

        // 是否显示计算期权费的弹出框
        ifCalcBox: false,

        // 折线图数据数组，含 费率
        chartData: [],
        // 折线图数据数组，不含 费率
        chartDataWithoutRate: []
      }
    },
    computed: {
      // 当前期权
      curOption() {
        return this.$store.state.option.curOption
      },
      // 当前标的
      underlying() {
        return this.$store.state.option.underlying
      },
      // 数字规则： 百分比的数据都是按照*100返回，处理数据需要注意
      // 费率
      rate() {
        return this.fee * this.participationRate / 100
      },
      // 计算期权手续费
      optionCost() {
        if (this.ifAnnual) {
          return formatNumber(this.notionalPrincipal * this.expires / 12 * this.rate)
        } else {
          return formatNumber(this.notionalPrincipal * this.rate)
        }
      },
      // 当前产品信息, 由period 和 fee 唯一确定 根据此信息绘制
      curData() {
        const that = this
        let index = -1
        this.data.forEach(function(cur, curIndex) {
          if (cur.strikePrice === that.strikePrice && cur.period === that.expires) {
            index = curIndex
            that.fee = cur.fee
          }
        })
        index = index < 0 ? 0 : index
        return index < 0 ? this.curData : this.data[index]
      },
      // chart 选项
      chartOption() {
        const that = this
        return {
          strikeName: '执行价',
          strikePrice: that.strikePrice,
          outPrice: 2000,
          outEarning: 0,
          outName: '敲出价'
        }
      }
    },
    watch: {
      curData() {
        const gap = Math.max(10, this.rate * 2 + 5)
        if (this.isCall) {
          this.chartData = [
            [this.strikePrice - gap, -1 * this.rate],
            [this.strikePrice, -1 * this.rate],
            [this.strikePrice + gap, gap - this.rate]
          ]
          this.chartDataWithoutRate = [
            [this.strikePrice - gap, 0],
            [this.strikePrice, 0],
            [this.strikePrice + gap, gap]
          ]
        } else {
          this.chartData = [
            [this.strikePrice - gap, gap - this.rate],
            [this.strikePrice, -1 * this.rate],
            [this.strikePrice + gap, -1 * this.rate]
          ]
          this.chartDataWithoutRate = [
            [this.strikePrice - gap, gap],
            [this.strikePrice, 0],
            [this.strikePrice + gap, 0]
          ]
        }
      }
    },
    created() {
      this.$nextTick(() => {
        getProducts({
          code: this.underlying.code,
          optionName: this.curOption.shortName
        }).then(res => {
          // debugger
          // 香草(欧式)期权图需要 执行价 和 费率（fee*参与率）
          // 另外期权图需要 存在对应的产品才能绘制，由 period 和 lExercisePrice 唯一确认产品
          // 最终需要的数据：
          //   this.curData： 当前产品的信息
          //   this.data： 所有产品的信息
          //   this.strike： 当前执行价；执行价集合
          //   this.fee： 当前产品的费用
          //   this.participationRateData ： 参与率集合

          // 提取信息： 所有产品信息 执行价数组 参与率数组  期限数组
          this.data = res.products
          const sData = res.rExercisePrice
          if (sData.length < 2) {
            sData.unshift(0)
            this.strikeStep = res.rExercisePrice[0]
          }
          this.strikePriceData = sData
          const length = this.strikePriceData.length
          this.participationRateData = res.participate
          const length1 = this.participationRateData.length
          this.expiresData = res.period

          // 执行价 参与率选择条所需信息: 最大最小值， 分段显示的信息
          this.strikePriceMin = this.strikePriceData[0]
          this.strikePriceMax = this.strikePriceData[length - 1]
          this.participationRateMin = this.participationRateData[0]
          this.participationRateMax = this.participationRateData[length1 - 1]
          const start = this.strikePriceData[0]
          const end = this.strikePriceData[this.strikePriceData.length - 1]
          this.strikePriceMarks = {
            [start]: start + '%',
            [end]: end + '%'
          }
          const start1 = this.participationRateData[0]
          const end1 = this.participationRateData[this.participationRateData.length - 1]
          this.participationRateMarks = {
            [start1]: start1 + '%',
            1: '100%',
            [end1]: end1 + '%'
          }

          // 默认取第一条产品数据，进行展示绘制
          const cur = this.data[0]
          this.fee = cur.fee
          this.strikePrice = cur.rExercisePrice
          this.expires = cur.period
          this.isCall = cur.optionName.indexOf('涨') > -1
        })
      })
    },
    methods: {
      addChgClass,
      keepDecimals,
      toPercent,
      calcOptionCost() {
        this.ifCalcBox = true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    position: relative;
    height: 100vh;
    overflow-y: auto;
    .container-item{
      height: calc(100vh - .5rem);
      overflow-y: auto;
    }
    &>.el-button{
      position: absolute;
      width: 100%;
      height: .5rem;
      bottom: 0;
      left: 0;
      border: none;
      background: var(--red);
    }
    .calc-box{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: .1rem .15rem 0;
      background: var(--bg-lighter);
      z-index: 99;
      .calc-text-box{
        line-height: .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .calc-btn-box{
        margin: 0 -0.15rem;
        .el-button{
          width: 100%;
          height: .5rem;
          border: none;
          border-radius: 0;
          background: var(--red);
        }
      }
    }
    .title{
      margin: .1rem auto;
      &:before{
        content: '';
        display: inline-block;
        width: 4px;
        height: 1em;
        margin-right: .1rem;
        vertical-align: -.15em;
        border-radius: 2px;
        background: var(--red);
      }
    }
  }

  .header{
    height: .6rem;
    padding-top: .1rem;
    text-align: center;
    border-bottom: 1px solid var(--text-dark);
    background: var(--bg-light);
    .header-name{
      margin-bottom: 5px;
      font-size: 16px;
      color: var(--text-light);
    }
    .header-eng{
      font-size: 12px;
      color: var(--text-dark);
    }
  }

  .underlying-box{
    margin-bottom: .1rem;
    padding: .1rem .15rem;
    background: var(--bg-light);
    .underlying-header{
      line-height: .3rem;
    }
    .underlying-detail{
      display: flex;
      justify-content: start;
      align-items: center;
      .underlying-detail-left{
        margin-right: .1rem;
        font-size: 28px;
        font-weight: bold;
      }
      .underlying-detail-right{
        &>span{
          margin-right: .05rem;
        }
        .chg-type{
          display: inline-block;
          width: 3em;
          text-align-last: justify;
        }
        .chg-arrows{
          margin-right: 3px;
        }
      }
    }
  }

  .chart-box{
    padding: 1px .15rem .1rem;
    background: var(--bg-light);
    .chart-direction{
      height: .2rem;
      font-size: 12px;
    }
    .chart{
      padding: .1rem;
      background: var(--bg);
    }
  }

  .setting-box{
    margin-top: .1rem;
    .setting-select{
      margin: .2rem auto;
      padding: 0 .15rem;
    }
    .explain{
      line-height: 1.5;
      text-indent: 2em;
      &::first-letter{
        font-size: 1.2em;
        color: red;
      }
    }
  }

  .choose-box{
    display: flex;
    justify-content: space-around;
    span{
      width: 5em;
      line-height: .3rem;
      text-align: center;
      background: var(--bg);
    }
    span.active{
      background: var(--bg-lighter);
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .setting-box{
    .el-tabs__header{
      margin-bottom: .1rem;
      .el-tabs__nav.is-top{
        width: 100%;
      }
      .el-tabs__item{
        width: 50%;
        text-align: center;
      }
    }
    .el-tabs__content{
      padding: 0 .15rem;
      background: var(--bg-light);
    }

    .setting-select{
      .el-slider__runway{
        background: var(--bg);
      }
      .el-slider__bar{
        background: var(--red);
      }
      .el-slider__button{
        border-color: var(--red);
        background: var(--red);
      }
      .el-slider__stop{
        width: .1rem;
        height: .1rem;
        background: var(--red);
      }
    }
  }
  .calc-box{
    .el-input__inner{
      border: 1px solid var(--border);
      background: var(--bg-lighter);
    }
  }
</style>
