<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm
      ref="form"
      :sup_this="sup_this"
      :is-add="false"
      :status-dicts="statusDicts"
      :exchange-dicts="exchangeDicts"
      :fee-type-dicts="feeTypeDicts"
      :unit-dicts="unitDicts"
      :data-source-dicts="dataSourceDicts"
    />
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    statusDicts: {
      required: true,
      type: Array
    },
    exchangeDicts: {
      required: true,
      type: Array
    },
    feeTypeDicts: {
      required: true,
      type: Array
    },
    unitDicts: {
      required: true,
      type: Array
    },
    dataSourceDicts: {
      required: true,
      type: Array
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        code: this.data.code,
        name: this.data.name,
        exchangeCode: this.data.exchangeCode,
        underlyingCode: this.data.underlyingCode,
        underlyingName: this.data.underlyingName,
        status: this.data.status,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        feeType: this.data.feeType,
        feeRate: this.data.feeRate,
        marginRate: this.data.marginRate,
        multiplier: this.data.multiplier,
        unitName: this.data.unitName,
        dataSource: this.data.dataSource,
        createUserId: this.data.createUserId,
        createTime: this.data.createTime,
        modifyUserId: this.data.modifyUserId,
        modifyTime: this.data.modifyTime
      }
      this.statusDicts.forEach(function(cur) {
        if (String(_this.form.status) === String(cur.value)) {
          _this.form.transStatus = cur.label
          return true
        }
      })
      this.exchangeDicts.forEach(function(cur) {
        if (_this.form.exchangeCode === cur.value) {
          _this.form.exchangeName = cur.label
          return true
        }
      })
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
