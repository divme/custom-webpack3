<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="code" label="代码"/>
      <el-table-column prop="tradeDate" label="交易日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tradeDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="openPrice" label="开盘价"/>
      <el-table-column prop="closePrice" label="收盘价"/>
      <el-table-column prop="settlePrice" label="结算价"/>
      <el-table-column prop="highPrice" label="最高价"/>
      <el-table-column prop="lowPrice" label="最低价"/>
      <el-table-column prop="dataSource" label="数据源"/>
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

import eHeader from './module/header'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/marketQuotationHistory'
      const sort = 'tradeDate,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      debugger
      const query = this.query
      if (query.startDate && query.endDate) {
        this.params['startDate'] = query.startDate
        this.params['endDate'] = query.endDate
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>
