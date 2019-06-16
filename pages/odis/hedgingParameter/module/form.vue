<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="标的代码" prop="underlyingCode">
        <el-select v-model="form.underlyingCode" :style="style" clearable placeholder="标的代码" @blur="autoFill">
          <el-option v-for="item in codeData" :key="item.code" :label="item.code" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item label="参数日期" prop="parameterDate">
        <el-date-picker
          v-model="form.parameterDate"
          placeholder="请选择日期"
          :style="style"
          type="date"
          @blur="autoFill"/>
      </el-form-item>
      <el-form-item label="无风险收益率">
        <el-input v-model="form.riskFreeRate" :style="style"/>
      </el-form-item>
      <el-form-item label="分红率">
        <el-input v-model="form.dividendRate" :style="style"/>
      </el-form-item>
      <el-form-item label="波动率">
        <el-input v-model="form.volatilityRate" :style="style"/>
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
import { parseTime } from '@/utils/index'
import { initData as getData } from '@/api/data'
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
    codeData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      style: '184px',
      rules: {
        underlyingCode: [
          { required: true, message: '请输入正确的标的代码', trigger: 'blur' }
        ],
        parameterDate: [
          { required: true, message: '请选择参数日期', trigger: 'blur' }
        ]
      },
      needValue: '',
      oldCode: '',
      oldDate: '',
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
      if (this.form.parameterDate) {
        debugger
        if(typeof Number(this.form.parameterDate) === 'number') const thisTime = new Date(this.form.parameterDate)
        if (thisTime && !this.form.riskFreeRate) {
          // 根据日期，获取无风险波动率
          const riskUrl = 'api/marketRiskFreeRate'
          const riskParams = { parameterDate: parseTime(thisTime) }
          getData(riskUrl, riskParams).then(res => {
            this.form.riskFreeRate = res.content[0].rate
          }).catch(err => {
            console.log(err)
          })
        } else if (thisTime && this.form.underlyingCode && this.form.underlyingCode.length > 6) {
          // 根据标的代码和日期，获取分红率和波动率
          const otherUrl = 'api/hedgingParameterTemporary'
          const otherParam = { underlyingCode: this.form.underlyingCode, parameterDate: parseTime(thisTime) }
          getData(otherUrl, otherParam).then(res => {
            this.form.volatilityRate = res.content[0].volatilityRate
            this.form.dividendRate = res.content[0].dividendRate
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    doSubmit() {
      // debugger
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
    cancel() {
      this.resetForm()
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
