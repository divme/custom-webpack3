<template>
  <div class="app-container">
    <eHeader
      :query="query"
      :account-data="accountData"
      :instrument-data="instrumentData"
      :data-obj="dataObj"
    />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="accountNo" label="账户号码"/>
      <el-table-column prop="accountName" label="账户名称">
        <template slot-scope="scope">
          {{ dataObj[scope.row.accountNo] || '无' }}
        </template>
      </el-table-column>
      <el-table-column prop="instrumentCode" label="工具代码"/>
      <el-table-column prop="positionDate" label="持仓日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.positionDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantityBuy" label="多头持仓"/>
      <el-table-column prop="quantitySell" label="空头持仓"/>
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

import eHeader from './module/header'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      // data：对冲账户信息
      accountData: [], accountUrl: '', accountParams: {},
      // data：对冲工具信息
      instrumentData: [], instrumentUrl: '', instrumentParams: {},
      // 将需要对应显示的数据提取出来，本页面为 accountNo：accountName 的键值对
      dataObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.accountInit()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    async accountInit() {
      if (!await this.beforeInit()) {
        return
      }
      pageInitData(this.accountUrl, this.accountParams).then(res => {
        // debugger
        this.accountData = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          this.dataObj[res.content[i].accountNo] = res.content[i].accountName
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      const sort = 'id,desc'
      this.url = 'api/hedgingPosition'
      this.accountUrl = 'api/hedgingAccount'
      this.instrumentUrl = 'api/hedgingInstrument'
      this.params = { page: this.page, size: this.size, sort: sort }
      this.accountParams = { page: this.page, size: this.size }
      this.instrumentParams = { page: this.page, size: this.size }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    }
  }
}
</script>

<style scoped>

</style>
