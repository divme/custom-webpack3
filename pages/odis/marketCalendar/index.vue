<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="exchangeCode" label="交易所代码"/>
      <el-table-column prop="exchangeName" label="交易所名称">
        <template slot-scope="scope">
          {{ dictObj[scope.row.exchangeCode] || '上交所' }}
        </template>
      </el-table-column>
      <el-table-column prop="calendarDate" label="日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.calendarDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isTradeDate" label="是否交易日">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isTradeDate ? '' : 'info'">{{ scope.row.isTradeDate?'是': '否' }}</el-tag>
          <!--<span >{{ scope.row.isTradeDate?'是': '否' }}</span>-->
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

import { get } from '@/api/dictDetail'

import eHeader from './module/header'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      // 字典： 交易所名称
      exchangeDicts: [],
      dictObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.pageGetDict('exchange_code', 'exchangeDicts')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    pageGetDict(name, prop) {
      get(name).then(res => {
        // debugger
        this[prop] = res.content
        // if (prop === 'exchangeDicts') {
        for (let i = 0, len = res.content.length; i < len; i++) {
          this.dictObj[res.content[i].value] = res.content[i].label
        }
        // }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      const sort = 'calendarDate,desc'
      this.url = 'api/marketCalendar'
      this.params = { page: this.page, size: this.size, sort: sort }
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
