<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
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
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        accountNo: this.data.accountNo,
        accountName: this.data.accountName,
        accountOwner: this.data.accountOwner,
        accountPassword: this.data.accountPassword,
        accountBank: this.data.accountBank,
        status: this.data.status,
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
