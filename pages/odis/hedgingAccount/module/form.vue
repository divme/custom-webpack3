<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="610px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="账户号码" prop="accountNo">
        <el-input v-model="form.accountNo" :style="style"/>
      </el-form-item>
      <el-form-item label="账户名称" prop="accountName">
        <el-input v-model="form.accountName" :style="style"/>
      </el-form-item>
      <el-form-item label="账户所属">
        <el-input v-model="form.accountOwner" :style="style"/>
      </el-form-item>
      <el-form-item label="账户密码">
        <el-input v-model="form.accountPassword" :style="style" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账户经纪商">
        <el-input v-model="form.accountBank" :style="style" />
      </el-form-item>
      <el-form-item label="账户状态" prop="status">
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.status" :style="rStyle" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/hedgingAccount'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      style: '180px', rStyle: '90px',
      dicts: [
        { id: 123, value: true, label: '可用' },
        { id: 321, value: false, label: '禁止' }
      ],
      rules: {
        accountNo: [
          { required: true, message: '请输入账户号码', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择账户状态', trigger: 'blur' }
        ]
      },
      form: {
        id: '',
        accountNo: '',
        accountName: '',
        accountOwner: '',
        accountPassword: '',
        accountBank: '',
        status: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        accountNo: '',
        accountName: '',
        accountOwner: '',
        accountPassword: '',
        accountBank: '',
        status: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
