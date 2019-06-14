<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="520px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="工具代码" prop="code">
        <el-input v-model="form.code" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="工具名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="交易所代码" prop="exchangeCode">
        <el-select v-model="form.exchangeCode" clearable placeholder="交易所代码">
          <el-option v-for="item in exchangeDicts" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="交易所名称" prop="exchangeName">
        <el-input v-model="form.exchangeName" style="width: 370px;" disabled />
      </el-form-item>
      <el-form-item label="标的代码" prop="underlyingCode">
        <el-input v-model="form.underlyingCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="标的名称" prop="underlyingName">
        <el-input v-model="form.underlyingName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="业务状态" prop="transStatus">
        <el-select v-model="form.transStatus" clearable placeholder="业务状态">
          <el-option v-for="item in statusDicts" :key="item.label" :label="item.label" :value="item.label"/>
        </el-select>
      </el-form-item>
      <el-form-item label="上市日期" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          placeholder="请选择日期"
          style="width: 370px;"
          type="date"/>
      </el-form-item>
      <el-form-item label="终止日期" prop="endDate">
        <el-date-picker
          v-model="form.endDate"
          placeholder="请选择日期"
          style="width: 370px;"
          type="date"/>
      </el-form-item>
      <el-form-item label="手续费类型" prop="feeType">
        <el-select v-model="form.feeType" clearable placeholder="请选择">
          <el-option v-for="item in feeTypeDicts" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手续费率" prop="feeRate">
        <el-input v-model="form.feeRate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="保证金率" prop="marginRate">
        <el-input v-model="form.marginRate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="乘数" prop="multiplier">
        <el-input v-model="form.multiplier" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="单位名称" prop="unitName">
        <el-select v-model="form.unitName" clearable placeholder="请选择">
          <el-option v-for="item in unitDicts" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="数据源" prop="dataSource">
        <el-select v-model="form.dataSource" clearable placeholder="请选择">
          <el-option v-for="item in dataSourceDicts" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/hedgingInstrument'
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
    exchangeDicts: {
      type: Array,
      default: function() {
        return []
      }
    },
    statusDicts: {
      type: Array,
      default: function() {
        return []
      }
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
  data() {
    return {
      loading: false, dialog: false,
      rules: {
        code: [
          { required: true, message: '请输入正确的工具代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入正确的工具名称', trigger: 'blur' }
        ],
        exchangeCode: [
          { required: true, message: '请选择正确的交易所代码', trigger: 'blur' }
        ],
        underlyingCode: [
          { required: true, message: '请输入正确的标的代码', trigger: 'blur' },
          { min: 6, message: '请输入规范的代码', trigger: 'blur' }
        ],
        underlyingName: [
          { required: true, message: '请输入正确的标的名称', trigger: 'blur' }
        ],
        transStatus: [
          { required: true, message: '请选择正常的状态', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        feeType: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        feeRate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        marginRate: [
          { required: true, message: '请输入保证金率', trigger: 'blur' }
        ],
        multiplier: [
          { required: true, message: '请输入乘数', trigger: 'blur' }
        ],
        // unitName: [
        //   { required: true, message: '请选择单位', trigger: 'blur' }
        // ],
        dataSource: [
          { required: true, message: '请选择数据源', trigger: 'blur' }
        ]
      },
      form: {
        code: '',
        name: '',
        exchangeCode: '',
        exchangeName: '',
        underlyingCode: '',
        underlyingName: '',
        status: '',
        transStatus: '',
        startDate: '',
        endDate: '',
        feeType: '',
        feeRate: '',
        marginRate: '',
        multiplier: '',
        unitName: '',
        dataSource: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
      // transStatus: ''
    }
  },
  watch: {
    'form.exchangeCode': function(val) {
      if (val && this.exchangeDicts) {
        const _this = this
        this.exchangeDicts.forEach(function(cur) {
          if (val === cur.value) {
            _this.form.exchangeName = cur.label
            return true
          }
        })
      }
    },
    'form.transStatus': function(val) {
      if (val && this.statusDicts) {
        const _this = this
        this.statusDicts.forEach(function(cur) {
          if (val === cur.label) {
            _this.form.status = cur.value
            return true
          }
        })
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
        code: '',
        name: '',
        exchangeCode: '',
        underlyingCode: '',
        underlyingName: '',
        status: '',
        startDate: '',
        endDate: '',
        feeType: '',
        feeRate: '',
        marginRate: '',
        multiplier: '',
        unitName: '',
        dataSource: '',
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
