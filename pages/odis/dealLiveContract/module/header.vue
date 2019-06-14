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
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-if="checkPermission(['ADMIN'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增</el-button>
      <eForm
        ref="form"
        :is-add="true"
        :direction-dict="directionDict"
        :structure-code-dict="structureCodeDict"
        :hedging-type-dict="hedgingTypeDict"
        :paytime-type-dict="paytimeTypeDict"
        :round-type-dict="roundTypeDict"
        :counterparty-data="counterpartyData"
        :underlying-data="underlyingData"
      />
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    directionDict: {
      required: true,
      type: Array
    },
    structureCodeDict: {
      required: true,
      type: Array
    },
    hedgingTypeDict: {
      required: true,
      type: Array
    },
    paytimeTypeDict: {
      required: true,
      type: Array
    },
    roundTypeDict: {
      required: true,
      type: Array
    },
    counterpartyData: {
      required: true,
      type: Array
    },
    underlyingData: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'dealNo', display_name: '合约编号' },
        { key: 'periodDate', display_name: '起止日期' }
      ]
    }
  },
  methods: {
    checkPermission,
    add() {
      debugger
      const _this = this.$refs.form
      _this.form.terminatePrice = '-1'
      _this.form.annualizedDays = '365'
      _this.form.dealOwner = '机构客户部'
      _this.form.ifAnnual = true
      // 合约期限、期权费，暂时给个默认值
      _this.form.maturity = '1'
      _this.form.optionPremium = '1'
      _this.dialog = true
    },
    toQuery() {
      debugger
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
