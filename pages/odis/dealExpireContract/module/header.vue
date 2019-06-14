<template>
  <div class="head-container">
    <!-- 日期查询 -->
    <el-date-picker
      v-if="query.type === 'periodDate'"
      v-model="query.date"
      class="filter-item"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width: 420px"
    />
    <!-- 条件搜索 -->
    <el-input v-if="query.type !== 'periodDate'" v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 导出 -->
    <el-button
      v-if="checkPermission(['ADMIN','USER_ALL'])"
      :loading="downloadLoading"
      size="mini"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="download">导出</el-button>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'

export default {
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'dealNo', display_name: '合约编号' },
        { key: 'periodDate', display_name: '起止日期' }
      ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    // 导出
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '合约编号', '标的代码', '对手方', '业务部门', '期权结构代码', '买卖方向', '对冲方式', '名义金额',
          '起始日', '结算日', '到期日', '合约期限', '是否终止', '是否年化', '年化天数',
          '付款方式', '期权费', '期权费率', '固定收益率', '附加费率', '期初价',
          '分红率(定价)', '波动率(定价)', '无风险收益率(定价)', '波动率(对冲)', '无风险收益率(对冲)', '左执行价', '中执行价', '右执行价',
          '左Rebate', '右Rebate', '左参与率', '右参与率', '左hurdle', '右hurdle',
          '是否敲出', '是否计算PnL', '提前终止价', '乘数', '舍入方法', '舍入精度'
        ]
        const filterVal = [
          'dealNo', 'underlyingCode', 'counterpartyId', 'dealOwner', 'optionStructureCode', 'direction', 'hedgingType', 'nominal',
          'startDate', 'clearDate', 'endDate', 'maturity', 'ifFinish', 'ifAnnual', 'annualizedDays',
          'paytimeType', 'optionPremium', 'optionFeeRate', 'optionFixRate', 'additionalRate', 'initialPrice',
          'pricingDividendRate', 'pricingVolatility', 'pricingRiskFreeRate', 'hedgingVolatility', 'hedgingRiskFreeRate',
          'leftStrikePrice', 'midStrikePrice', 'rightStrikePrice', 'leftRebateRate', 'rightRebateRate', 'leftParticipateRate', 'rightParticipateRate', 'leftHurdle', 'rightHurdle',
          'ifKnockout', 'ifReportPnl', 'terminatePrice', 'multiplier', 'roundType', 'roundPrecision'
        ]
        const data = this.formatJson(filterVal, this.$parent.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '到期合约'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'startDate' || j === 'clearDate' || j === 'endDate' || j === 'createTime' || j === 'modifyTime') {
          return parseTime(v[j], true)
        }
        if (String(v[j]).toLowerCase() === 'true') {
          return '是'
        }
        if (String(v[j]).toLowerCase() === 'false') {
          return '否'
        }
        if (j === 'counterpartyId') {
          return this.$parent.dataObj[this.$parent.counterpartyKey + v[j]]
        }
        if (j === 'optionStructureCode') {
          return this.$parent.dictObj['structureCodeDict' + v[j]]
        }
        if (j === 'direction') {
          return this.$parent.dictObj['directionDict' + v[j]]
        }
        if (j === 'paytimeType') {
          return this.$parent.dictObj['paytimeTypeDict' + v[j]]
        }
        if (j === 'roundType') {
          return this.$parent.dictObj['roundTypeDict' + v[j]]
        }
        return (v[j] || Number(v[j]) === 0) ? v[j] : '--'
      }))
    }
  }
}
</script>
