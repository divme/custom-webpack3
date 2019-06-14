<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm
      ref="form"
      :sup_this="sup_this"
      :is-add="false"
      :open-close-dicts="openCloseDicts"
      :direction-dicts="directionDicts"
      :instrument-data="instrumentData"
      :account-data="accountData"
      :data-obj="dataObj"
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
    openCloseDicts: {
      required: true,
      type: Array
    },
    directionDicts: {
      required: true,
      type: Array
    },
    instrumentData: {
      required: true,
      type: Array
    },
    accountData: {
      required: true,
      type: Array
    },
    dataObj: {
      required: true,
      type: Object
    }
  },
  methods: {
    to() {
      debugger
      const _this = this.$refs.form
      _this.form = {
        tradeNo: this.data.tradeNo,
        accountNo: this.data.accountNo,
        instrumentCode: this.data.instrumentCode,
        tradeTime: this.data.tradeTime,
        tradePrice: this.data.tradePrice,
        quantity: this.data.quantity,
        direction: this.data.direction + '',
        openClose: this.data.openClose,
        fee: this.data.fee,
        createUserId: this.data.createUserId,
        createTime: this.data.createTime,
        modifyUserId: this.data.modifyUserId,
        modifyTime: this.data.modifyTime
      }
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
