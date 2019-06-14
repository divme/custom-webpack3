<template>
  <div class="app-container">
    <eHeader :query="query" :code-data="codeData"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="underlyingCode" label="标的代码"/>
      <el-table-column prop="parameterDate" label="参数日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.parameterDate, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="riskFreeRate" label="无风险收益率"/>
      <el-table-column prop="dividendRate" label="分红率"/>
      <el-table-column prop="volatilityRate" label="波动率"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this" :code-data="codeData" />
          <el-popover
            v-if="checkPermission(['ADMIN'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
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
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/hedgingParameter'
import { initData as pageDateInit } from '@/api/data'

import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      // 获取标的代码列表
      codeUrl: '', codeParams: {}, codeData: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.otherInit()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    async otherInit() {
      if (!await this.beforeInit()) {
        return
      }
      const _this = this
      pageDateInit(this.codeUrl, this.codeParams).then(res => {
        // debugger
        _this.codeData = res.content
      }).catch(err => {
        console.log(err)
      })
    },
    beforeInit() {
      this.url = 'api/hedgingParameter'
      this.codeUrl = 'api/underlying'

      const sort = 'modifyTime,desc'

      this.params = { page: this.page, size: this.size, sort: sort }
      this.codeParams = { }

      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
