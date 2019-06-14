<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="交易编号" prop="tradeNo">
        <el-input v-model="form.tradeNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="工具代码" prop="instrumentCode">
        <el-select v-model="form.instrumentCode" clearable placeholder="工具代码">
          <el-option v-for="item in instrumentData" :key="item.code" :label="item.code" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item label="账户号码" prop="accountNo">
        <el-select v-model="form.accountNo" clearable placeholder="账户号码">
          <el-option v-for="item in accountData" :key="item.accountNo" :label="item.accountNo" :value="item.accountNo"/>
        </el-select>
      </el-form-item>
      <el-form-item label="账户名称" prop="accountName">
        <el-input v-model="form.accountName" style="width: 370px;" disabled />
      </el-form-item>
      <el-form-item label="买卖方向" prop="direction">
        <el-select v-model="form.direction" clearable placeholder="买卖方向">
          <el-option v-for="item in directionDicts" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="开平仓" prop="openClose">
        <el-select v-model="form.openClose" clearable placeholder="开平仓">
          <el-option v-for="item in openCloseDicts" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="成交时间" prop="tradeTime">
        <el-date-picker
          v-model="form.tradeTime"
          type="datetime"
          placeholder="请选择成交时间"/>
      </el-form-item>
      <el-form-item label="成交均价" prop="tradePrice">
        <el-input v-model="form.tradePrice" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="成交数量" prop="quantity">
        <el-input v-model="form.quantity" style="width: 100px;"/><span>( {{ dataObj[form.instrumentCode] || '单位' }} )</span>
      </el-form-item>
      <el-form-item label="手续费" prop="fee">
        <el-input v-model="form.fee" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/hedgingTrade'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
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
  data() {
    return {
      loading: false, dialog: false,
      rules: {
        tradeNo: [
          { required: true, message: '请填写交易编号', trigger: 'blur' }
        ],
        instrumentCode: [
          { required: true, message: '请选择工具代码', trigger: 'blur' }
        ],
        accountNo: [
          { required: true, message: '请选择账户号码', trigger: 'blur' }
        ],
        tradeTime: [
          { required: true, message: '请选择交易时间', trigger: 'blur' }
        ],
        tradePrice: [
          { required: true, message: '请输入正确的标的名称', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请选择正常的状态', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择买卖方向', trigger: 'blur' }
        ],
        openClose: [
          { required: true, message: '请选择开平仓', trigger: 'blur' }
        ],
        fee: [
          { required: true, message: '请输入手续费', trigger: 'blur' }
        ]
      },
      form: {
        tradeNo: '',
        accountNo: '',
        accountName: '',
        instrumentCode: '',
        tradeTime: '',
        tradePrice: '',
        quantity: '',
        direction: '',
        openClose: '',
        fee: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
    }
  },
  watch: {
    'form.accountNo': function() {
      this.form.accountName = this.dataObj[String(this.form.accountNo)]
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
        tradeNo: '',
        accountNo: '',
        instrumentCode: '',
        tradeTime: '',
        tradePrice: '',
        quantity: '',
        direction: '',
        openClose: '',
        fee: '',
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
