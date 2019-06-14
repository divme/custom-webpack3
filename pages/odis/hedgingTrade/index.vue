<template>
  <div class="app-container">
    <eHeader
      :query="query"
      :open-close-dicts="openCloseDicts"
      :direction-dicts="directionDicts"
      :account-data="accountData"
      :instrument-data="instrumentData"
      :data-obj="dataObj"
    />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="tradeNo" label="交易编号"/>
      <el-table-column prop="accountNo" label="账户号码"/>
      <el-table-column prop="accountName" label="账户名称">
        <template slot-scope="scope">
          {{ dataObj[scope.row.accountNo] || '无' }}
        </template>
      </el-table-column>
      <el-table-column prop="instrumentCode" label="工具代码"/>
      <el-table-column prop="tradeTime" label="成交时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tradeTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tradePrice" label="成交均价"/>
      <el-table-column prop="quantity" label="成交数量"/>
      <el-table-column prop="direction" label="买卖方向">
        <template slot-scope="scope">
          {{ dictObj[scope.row.direction] }}
        </template>
      </el-table-column>
      <el-table-column prop="openClose" label="开平仓">
        <template slot-scope="scope">
          {{ dictObj[scope.row.openClose] }}
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="手续费"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit
            v-if="checkPermission(['ADMIN'])"
            :data="scope.row"
            :sup_this="sup_this"
            :open-close-dicts="openCloseDicts"
            :direction-dicts="directionDicts"
            :account-data="accountData"
            :instrument-data="instrumentData"
            :data-obj="dataObj"
          />
          <el-popover
            v-if="checkPermission(['ADMIN'])"
            :ref="scope.row.tradeNo"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.tradeNo].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.tradeNo)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { parseTime } from '@/utils/index'

import initData from '@/mixins/initData'

import { initData as pageInitData } from '@/api/data'
import { del } from '@/api/hedgingTrade'
import { get } from '@/api/dictDetail'

import eHeader from './module/header'
import edit from './module/edit'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      // 字典：开平仓 和 买卖方向
      openCloseDicts: [], directionDicts: [],
      // 对冲账户信息
      accountData: [], accountUrl: '', accountParams: {},
      // 对冲工具信息
      instrumentData: [], instrumentUrl: '', instrumentParams: {},
      // 所有字典放到一个对象里，形成 value:label 的键值对, 方便 table 展示时做转化
      dictObj: {},
      // 将需要对应显示的数据提取出来，本页面为 accountNo：accountName 的键值对
      dataObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.accountInit()
      this.pageGetDict('open_close', 'openCloseDicts')
      this.pageGetDict('direction', 'directionDicts')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    pageGetDict(name, prop) {
      get(name).then(res => {
        // debugger
        this[prop] = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          this.dictObj[res.content[i].value] = res.content[i].label
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async accountInit() {
      if (!await this.beforeInit()) {
        return
      }
      pageInitData(this.accountUrl, this.accountParams).then(res => {
        debugger
        this.accountData = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          this.dataObj[res.content[i].accountNo] = res.content[i].accountName
        }
      }).catch(err => {
        console.log(err)
      })
      pageInitData(this.instrumentUrl, this.instrumentParams).then(res => {
        debugger
        this.instrumentData = res.content
        for (let i = 0, len = res.content.length; i < len; i++) {
          this.dataObj[res.content[i].code] = res.content[i].unitName
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      const sort = 'modifyTime,desc'
      this.url = 'api/hedgingTrade'
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
    },
    subDelete(tradeNo) {
      this.delLoading = true
      del(tradeNo).then(res => {
        this.delLoading = false
        this.$refs[tradeNo].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[tradeNo].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
