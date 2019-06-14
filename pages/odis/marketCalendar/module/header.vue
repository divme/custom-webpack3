<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--<span>开始日期</span>-->
    <!--<el-date-picker-->
    <!--v-model="query.startDate"-->
    <!--placeholder="请选择日期"-->
    <!--type="date"-->
    <!--class="filter-item"-->
    <!--/>-->
    <!--<span>结束日期</span>-->
    <!--<el-date-picker-->
    <!--v-model="query.endDate"-->
    <!--placeholder="请选择日期"-->
    <!--type="date"-->
    <!--class="filter-item"-->
    <!--/>-->

    <!-- 查询 -->
    <el-date-picker
      v-model="periodDate"
      class="filter-item"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width: 420px"
    />
    <el-button class="filter-item" size="mini" type="primary" @click="toQuery">查询</el-button>
    <el-button
      v-if="checkPermission(['ADMIN'])"
      class="filter-item"
      size="mini"
      type="primary"
      @click="toUpdate">更新</el-button>
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
      periodDate: ''
      // queryTypeOptions: [
      //   { key: 'calendarDate', display_name: '日期' }
      // ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      debugger
      if (this.periodDate && this.periodDate.length === 2) {
        this.$parent.query = {
          startDate: parseTime(this.periodDate[0]),
          endDate: parseTime(this.periodDate[1])
        }
      }
      // this.$parent.query.type = 'calendarDate'
      this.$parent.page = 0
      this.$parent.init()
    },
    toUpdate() {
      console.log('update')
    }
  }
}
</script>
