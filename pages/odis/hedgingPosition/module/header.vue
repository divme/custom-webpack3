<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!--新增 -->
    <div style="display: inline-block;margin: 0px 20px;">
      <el-date-picker
        v-model="startDate"
        placeholder="请选择开始日期"
        type="date"
        class="filter-item"
      />
      <el-button
        v-if="checkPermission(['ADMIN'])"
        class="filter-item"
        size="mini"
        type="primary"
        @click="recount">重算</el-button>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    accountData: {
      required: true,
      type: Array
    },
    instrumentData: {
      required: true,
      type: Array
    },
    dataObj: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      startDate: '',
      queryTypeOptions: [
        { key: 'accountNo', display_name: '账户号码' },
        { key: 'instrumentCode', display_name: '工具代码' }
      ]
    }
  },
  methods: {
    checkPermission,
    recount() {

    },
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
