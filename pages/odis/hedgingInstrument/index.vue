<template>
  <div class="app-container">
    <eHeader
      :query="query"
      :exchange-dicts="exchangeDicts"
      :status-dicts="statusDicts"
      :fee-type-dicts="feeTypeDicts"
      :unit-dicts="unitDicts"
      :data-source-dicts="dataSourceDicts"
    />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="code" label="工具代码"/>
      <el-table-column prop="name" label="工具名称"/>
      <el-table-column prop="exchangeCode" label="交易所代码"/>
      <el-table-column prop="exchangeName" label="交易所名称">
        <template slot-scope="scope">
          {{ dictObj[scope.row.exchangeCode] || '无' }}
        </template>
      </el-table-column>
      <el-table-column prop="underlyingCode" label="标的代码"/>
      <el-table-column prop="underlyingName" label="标的名称"/>
      <el-table-column prop="status" label="业务状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ? '' : 'info'">{{ scope.row.status?'允许': '禁止' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="上市日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="终止日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="feeType" label="手续费类型"/>
      <el-table-column prop="feeRate" label="手续费率"/>
      <el-table-column prop="marginRate" label="保证金率"/>
      <el-table-column prop="multiplier" label="乘数"/>
      <el-table-column prop="unitName" label="单位名称"/>
      <el-table-column prop="dataSource" label="数据源"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit
            v-if="checkPermission(['ADMIN'])"
            :data="scope.row"
            :sup_this="sup_this"
            :exchange-dicts="exchangeDicts"
            :status-dicts="statusDicts"
            :fee-type-dicts="feeTypeDicts"
            :unit-dicts="unitDicts"
            :data-source-dicts="dataSourceDicts"
          />
          <el-popover
            v-if="checkPermission(['ADMIN'])"
            :ref="scope.row.code"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.code].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.code)">确定</el-button>
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
      @current-change="pageChange"/>
  </div>
</template>

<script>
import Base64 from 'js-base64'

import checkPermission from '@/utils/permission'
import { parseTime } from '@/utils/index'

import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'

import { del } from '@/api/hedgingInstrument'
import { get } from '@/api/dictDetail'

import eHeader from './module/header'
import edit from './module/edit'

export default {
  components: { eHeader, edit },
  mixins: [initData, initDict],
  data() {
    return {
      delLoading: false, sup_this: this,
      // 字典： 交易所名称，业务状态
      exchangeDicts: [], statusDicts: [],
      // 字典： 手续费类型，单位名称，数据源
      feeTypeDicts: [], unitDicts: [], dataSourceDicts: [],
      dictObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.pageGetDict('exchange_code', 'exchangeDicts')
      this.pageGetDict('business_status', 'statusDicts')
      this.pageGetDict('fee_type', 'feeTypeDicts')
      this.pageGetDict('unit_name', 'unitDicts')
      this.pageGetDict('code_source', 'dataSourceDicts')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    pageGetDict(name, prop) {
      get(name).then(res => {
        // debugger
        this[prop] = res.content
        if (prop === 'exchangeDicts') {
          for (let i = 0, len = res.content.length; i < len; i++) {
            this.dictObj[res.content[i].value] = res.content[i].label
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      this.url = 'api/hedgingInstrument'
      const sort = 'modifyTime,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(code) {
      this.delLoading = true
      del(Base64.encode(code)).then(res => {
      // del(code).then(res => {
        this.delLoading = false
        this.$refs[code].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[code].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
