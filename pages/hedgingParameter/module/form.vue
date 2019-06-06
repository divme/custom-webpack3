<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="标的代码" prop="code">
        <el-input v-model="form.underlyingCode" style="width: 370px;" @blur="autoFill"/>
      </el-form-item>
      <el-form-item label="参数日期" prop="date">
        <el-date-picker
          v-model="form.parameterDate"
          :placeholder="new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()"
          style="width: 370px;"
          type="date"
          @blur="autoFill"/>
      </el-form-item>
      <el-form-item label="无风险收益率">
        <el-input v-model="form.riskFreeRate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="分红率">
        <el-input v-model="form.dividendRate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="波动率">
        <el-input v-model="form.volatilityRate" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/hedgingParameter'
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
    otherData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      rules: {
        code: [
          { required: true, message: '请输入正确的标的代码', trigger: 'blur' },
          { min: 6, message: '请输入规范的代码', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择参数日期', trigger: 'blur' }
        ]
      },
      form: {
        id: '',
        underlyingCode: '',
        parameterDate: '',
        riskFreeRate: '',
        dividendRate: '',
        volatilityRate: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
    }
  },
  methods: {
    autoFill() {
      debugger
      debugger
      debugger
      debugger
      if (this.form.underlyingCode && this.form.parameterDate) {
        const cur = this.form.parameterDate.getTime()
        for (let i = 0, len = this.otherData.length; i < len; i++) {
          if (this.otherData[i].underlyingCode === this.form.underlyingCode && this.otherData[i].parameterDate === cur) {
            this.form.volatilityRate = this.otherData[i].volatilityRate
            this.form.dividendRate = this.otherData[i].dividendRate
            return true
          }
        }
      }
    },
    cancel() {
      console.log(this.form.parameterDate)
      this.resetForm()
    },
    doSubmit() {
      // this.loading = true
      // if (this.isAdd) {
      //   this.doAdd()
      // } else this.doEdit()
      this.$refs['form'].validate((valid) => {
        debugger
        if (valid) {
          if (this.form.underlyingCode === '' || this.form.type === null) {
            this.$message({
              message: '标的代码不能为空',
              type: 'warning'
            })
          } else if (this.form.parameterDate === '' || this.form.startDate === null) {
            this.$message({
              message: '参数日期不能为空',
              type: 'warning'
            })
          } else if (this.form.endDate === '' || this.form.endDate === null) {
            this.$message({
              message: '结束日期不能为空',
              type: 'warning'
            })
          } else if (this.form.status === '' || this.form.status === null) {
            this.$message({
              message: '标的状态不能为空',
              type: 'warning'
            })
          } else if (this.form.exchangeCode === '' || this.form.exchangeCode === null) {
            this.$message({
              message: '交易所代码不能为空',
              type: 'warning'
            })
          } else if (this.form.exchangeName === '' || this.form.exchangeName === null) {
            this.$message({
              message: '交易所名称不能为空',
              type: 'warning'
            })
          } else if (this.form.datasource === '' || this.form.datasource === null) {
            this.$message({
              message: '数据源不能为空',
              type: 'warning'
            })
          } else {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          }
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
        id: '',
        underlyingCode: '',
        parameterDate: '',
        riskFreeRate: '',
        dividendRate: '',
        volatilityRate: '',
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
