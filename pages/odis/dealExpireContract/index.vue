<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="dealNo" label="合约编号"/>
      <el-table-column prop="dealOwner" label="业务部门"/>
      <el-table-column prop="counterpartyId" label="对手方">
        <template slot-scope="scope">
          <span>{{ dataObj[counterpartyKey+scope.row.counterpartyId] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="underlyingCode" label="标的代码"/>
      <el-table-column prop="optionStructureCode" label="期权结构">
        <template slot-scope="scope">
          <span>{{ dictObj["structureCodeDict" + scope.row.optionStructureCode] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="direction" label="买卖方向">
        <template slot-scope="scope">
          <span>{{ dictObj["directionDict" + scope.row.direction] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hedgingType" label="对冲方式" />
      <el-table-column prop="initialPrice" label="期初价"/>
      <el-table-column prop="nominal" label="名义金额"/>
      <el-table-column prop="multiplier" label="乘数"/>
      <el-table-column prop="ifAnnual" label="是否年化">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ifAnnual? '' : 'info'">{{ scope.row.ifAnnual?'是': '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="起始日">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="clearDate" label="结算日">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.clearDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="到期日">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maturity" label="合约期限"/>
      <el-table-column prop="ifFinish" label="是否终止">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ifFinish ? '' : 'info'">{{ scope.row.ifFinish?'已终止': '尚存续' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="annualizedDays" label="年化天数"/>
      <el-table-column prop="optionPremium" label="期权费"/>
      <el-table-column prop="paytimeType" label="付款方式">
        <template slot-scope="scope">
          <span>{{ dictObj["paytimeTypeDict" + scope.row.paytimeType] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="optionFeeRate" label="期权费率"/>
      <el-table-column prop="optionFixRate" label="固定收益率"/>
      <el-table-column prop="additionalRate" label="附加费率"/>
      <el-table-column prop="pricingDividendRate" label="分红率(定价)"/>
      <el-table-column prop="pricingVolatility" label="波动率(定价)"/>
      <el-table-column prop="pricingRiskFreeRate" label="无风险收益率(定价)"/>
      <el-table-column prop="hedgingVolatility" label="波动率(对冲)"/>
      <el-table-column prop="leftStrikePrice" label="左执行价"/>
      <el-table-column prop="midStrikePrice" label="中执行价"/>
      <el-table-column prop="rightStrikePrice" label="右执行价"/>
      <el-table-column prop="leftRebateRate" label="左Rebate"/>
      <el-table-column prop="rightRebateRate" label="右Rebate"/>
      <el-table-column prop="leftParticipateRate" label="左参与率"/>
      <el-table-column prop="rightParticipateRate" label="右参与率"/>
      <el-table-column prop="hedgingRiskFreeRate" label="无风险收益率(对冲)"/>
      <el-table-column prop="leftHurdle" label="左hurdle"/>
      <el-table-column prop="rightHurdle" label="右hurdle"/>
      <el-table-column prop="ifKnockout" label="是否敲出">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ifKnockout? '' : 'info'">{{ scope.row.ifKnockout?'已敲出': '未敲出' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="terminatePrice" label="提前终止价"/>
      <el-table-column prop="roundType" label="舍入方法">
        <template slot-scope="scope">
          <span>{{ dictObj[ "roundTypeDict" +scope.row.roundType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roundPrecision" label="舍入精度"/>
      <el-table-column prop="ifReportPnl" label="是否计算PnL">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ifReportPnl? '' : 'info'">{{ scope.row.ifReportPnl?'是': '否' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { parseTime } from '@/utils/index'

import initData from '@/mixins/initData'

import { initData as pageInitData } from '@/api/data'
import { get } from '@/api/dictDetail'

import eHeader from './module/header'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,

      // 字典：买卖方向、  期权结构代码、          对冲方式、            付款方式、             舍入方法
      directionDict: [], structureCodeDict: [], hedgingTypeDict: [], paytimeTypeDict: [], roundTypeDict: [],
      // 所有字典放到一个对象里，形成 value:label 的键值对, 方便 table 展示时做转化
      dictObj: {},

      // 数据：对手方信息
      counterpartyData: [], counterpartyKey: '', counterpartyUrl: '', counterpartyParams: {},
      // 将需要转化显示或者联动显示的数据提取为键值对
      dataObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.pageGetDict('direction', 'directionDict')
      this.pageGetDict('option_structure_code', 'structureCodeDict')
      // this.pageGetDict('hedging_type ', 'hedgingTypeDict')
      this.pageGetDict('paytime_type', 'paytimeTypeDict')
      this.pageGetDict('round_type', 'roundTypeDict')
      this.pageDataInit()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    pageGetDict(name, prop) {
      const _this = this
      get(name).then(res => {
        // debugger
        _this[prop] = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          _this.$set(_this.dictObj, prop + res.content[i].value, res.content[i].label)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async pageDataInit() {
      if (!await this.beforeInit()) {
        return
      }
      const _this = this
      pageInitData(this.counterpartyUrl, this.counterpartyParams).then(res => {
        debugger
        _this.counterpartyData = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          _this.$set(_this.dataObj, _this.counterpartyKey + res.content[i].id, res.content[i].name)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      const sort = 'id,desc'
      this.url = 'api/deal'
      this.params = { page: this.page, size: this.size, sort: sort, ifExist: false }

      this.counterpartyKey = 'cp'
      this.counterpartyUrl = 'api/counterparty'
      this.counterpartyParams = {}

      this.underlyingKey = 'underlying'
      this.underlyingUrl = 'api/underlying'
      this.underlyingParams = {}

      const query = this.query
      const type = query.type
      const value = query.value
      if (String(type) === 'periodDate') {
        if (query.date && query.date.length === 2) {
          this.params['startDate'] = parseTime(query.date[0])
          this.params['endDate'] = parseTime(query.date[1])
          return true
        }
      }
      if (type && value) { this.params[type] = value }
      return true
    }
  }
}
</script>

<style scoped>

</style>
