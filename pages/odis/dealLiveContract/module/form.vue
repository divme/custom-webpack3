<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? (isCopy?'复制':'新增') : '编辑'" :center="true" width="1290px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="116px" style="font-size: 0;">
      <el-form-item label="合约编号" prop="dealNo">
        <el-input v-model="form.dealNo" :style="style" />
      </el-form-item>
      <el-form-item label="标的代码" prop="underlyingCode">
        <el-select :style="style" v-model="form.underlyingCode" clearable placeholder="请选择">
          <el-option v-for="item in underlyingData" :key="item.code" :label="item.code" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item label="对手方" prop="counterpartyId">
        <el-select :style="style" v-model="form.counterpartyId" clearable placeholder="请选择">
          <el-option v-for="item in counterpartyData" :key="item.name" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="业务部门" prop="dealOwner">
        <el-input v-model="form.dealOwner" :style="style" />
      </el-form-item>
      <el-form-item label="期权结构代码" prop="optionStructureCode">
        <el-select :style="style" v-model="form.optionStructureCode" clearable placeholder="请选择">
          <el-option v-for="item in structureCodeDict" :key="item.label" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="买卖方向" prop="direction">
        <el-select :style="style" v-model="form.direction" clearable placeholder="请选择">
          <el-option v-for="item in directionDict" :key="item.label" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="对冲方式" prop="hedgingType">
        <el-select :style="style" v-model="form.hedgingType" clearable placeholder="请选择">
          <el-option v-for="item in hedgingTypeDict" :key="item.label" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="名义金额" prop="nominal">
        <el-input v-model="form.nominal" :style="style"/>
      </el-form-item>
      <el-form-item label="起始日" prop="startDate">
        <el-date-picker
          :style="style"
          v-model="form.startDate"
          type="date"
          placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="结算日" prop="clearDate">
        <el-date-picker
          :style="style"
          v-model="form.clearDate"
          type="date"
          placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="到期日" prop="endDate">
        <el-date-picker
          :style="style"
          v-model="form.endDate"
          type="date"
          placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="是否终止" prop="ifFinish">
        <el-radio v-for="item in booleanDict" :style="rStyle" :key="item.label" v-model="form.ifFinish" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="是否年化" prop="ifAnnual">
        <el-radio v-for="item in booleanDict" :style="rStyle" :key="item.label" v-model="form.ifAnnual" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="年化期限" prop="annualizedDays">
        <el-input v-model="form.annualizedDays" :style="style" />
      </el-form-item>
      <el-form-item label="付款方式" prop="paytimeType">
        <el-select :style="style" v-model="form.paytimeType" clearable placeholder="请选择">
          <el-option v-for="item in paytimeTypeDict" :key="item.label" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="期权费率" prop="optionFeeRate">
        <el-input v-model="form.optionFeeRate" :style="style"  />
      </el-form-item>
      <el-form-item label="固定收益率" prop="optionFixRate">
        <el-input v-model="form.optionFixRate" :style="style" />
      </el-form-item>
      <el-form-item label="附加费率" prop="additionalRate">
        <el-input v-model="form.additionalRate" :style="style" />
      </el-form-item>
      <el-form-item label="期初价" prop="initialPrice">
        <el-input v-model="form.initialPrice" :style="style" />
      </el-form-item>
      <el-form-item label="分红率(定价)" prop="pricingDividendRate">
        <el-input v-model="form.pricingDividendRate" :style="style" />
      </el-form-item>
      <el-form-item label="波动率(定价)" prop="pricingVolatility">
        <el-input v-model="form.pricingVolatility" :style="style" />
      </el-form-item>
      <el-form-item label="无风险收益率(定价)" prop="pricingRiskFreeRate">
        <el-input v-model="form.pricingRiskFreeRate" :style="style" />
      </el-form-item>
      <el-form-item label="波动率(对冲)" prop="hedgingVolatility">
        <el-input v-model="form.hedgingVolatility" :style="style"/>
      </el-form-item>
      <el-form-item label="无风险收益率(对冲)" prop="hedgingRiskFreeRate">
        <el-input v-model="form.hedgingRiskFreeRate" :style="style"/>
      </el-form-item>
      <el-form-item label="左执行价" prop="leftStrikePrice">
        <el-input v-model="form.leftStrikePrice":style="style" />
      </el-form-item>
      <el-form-item label="中执行价" prop="midStrikePrice">
        <el-input v-model="form.midStrikePrice" :style="style"/>
      </el-form-item>
      <el-form-item label="右执行价" prop="rightStrikePrice">
        <el-input v-model="form.rightStrikePrice" :style="style"/>
      </el-form-item>
      <el-form-item label="左Rebate" prop="leftRebateRate">
        <el-input v-model="form.leftRebateRate" :style="style"/>
      </el-form-item>
      <el-form-item label="右Rebate" prop="rightRebateRate">
        <el-input v-model="form.rightRebateRate" :style="style"/>
      </el-form-item>
      <el-form-item label="左参与率" prop="leftParticipateRate">
        <el-input v-model="form.leftParticipateRate" :style="style"/>
      </el-form-item>
      <el-form-item label="右参与率" prop="rightParticipateRate">
        <el-input v-model="form.rightParticipateRate" :style="style"/>
      </el-form-item>
      <el-form-item label="左hurdle" prop="leftHurdle">
        <el-input v-model="form.leftHurdle" :style="style"/>
      </el-form-item>
      <el-form-item label="右hurdle" prop="rightHurdle">
        <el-input v-model="form.rightHurdle" :style="style"/>
      </el-form-item>
      <el-form-item label="是否敲出" prop="ifKnockout">
        <el-radio v-for="item in booleanDict" :style="rStyle" :key="item.label" v-model="form.ifKnockout" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="是否计算PnL" prop="ifReportPnl">
        <el-radio v-for="item in booleanDict" :style="rStyle" :key="item.label" v-model="form.ifReportPnl" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="提前终止价" prop="terminatePrice">
        <el-input v-model="form.terminatePrice" :style="style"/>
      </el-form-item>
      <el-form-item label="乘数" prop="multiplier">
        <el-input v-model="form.multiplier" :style="style"/>
      </el-form-item>
      <el-form-item label="舍入方法" prop="roundType">
        <el-select :style="style" v-model="form.roundType" clearable placeholder="请选择">
          <el-option v-for="item in roundTypeDict" :key="item.label" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="舍入精度" prop="roundPrecision">
        <el-input v-model="form.roundPrecision" :style="style"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/deal'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    isCopy: {
      type: Boolean,
      default: false,
      required: false
    },
    sup_this: {
      type: Object,
      default: null
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
      loading: false, dialog: false,
      style: '184px', rStyle: '92px',
      booleanDict: [
        { value: true, label: '是' },
        { value: false, label: '否' }
      ],
      expiresDict: [
        { value: 365, label: '365' },
        { value: 360, label: '360' }
      ],
      rules: {
        dealNo: [
          { required: true, message: '请填写合约编号', trigger: 'blur' }
        ],
        underlyingCode: [
          { required: true, message: '请填写标的代码', trigger: 'blur' }
        ],
        counterpartyId: [
          { required: true, message: '请填写对手方ID', trigger: 'blur' }
        ],
        dealOwner: [
          { required: true, message: '请填写业务部门', trigger: 'blur' }
        ],
        optionStructureCode: [
          { required: true, message: '请选择期权结构代码', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择买卖方向', trigger: 'blur' }
        ],
        hedgingType: [
          { required: true, message: '请选择对冲方式', trigger: 'blur' }
        ],
        nominal: [
          { required: true, message: '请填写名义金额', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择起始日', trigger: 'blur' }
        ],
        clearDate: [
          { required: true, message: '请选择结算日', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择到期日', trigger: 'blur' }
        ],
        maturity: [
          { required: true, message: '请填写合约期限', trigger: 'blur' }
        ],
        ifFinish: [
          { required: true, message: '请选择是否终止', trigger: 'blur' }
        ],
        ifAnnual: [
          { required: true, message: '请选择是否年化', trigger: 'blur' }
        ],
        annualizedDays: [
          { required: true, message: '请填写年化天数', trigger: 'blur' }
        ],
        optionPremium: [
          { required: true, message: '请填写期权费', trigger: 'blur' }
        ],
        paytimeType: [
          { required: true, message: '请选择付款方式', trigger: 'blur' }
        ],
        optionFeeRate: [
          { required: true, message: '请填写期权费率', trigger: 'blur' }
        ],
        optionFixRate: [
          { required: true, message: '请填写固定收益率', trigger: 'blur' }
        ],
        additionalRate: [
          { required: true, message: '请填写附加费率', trigger: 'blur' }
        ],
        initialPrice: [
          { required: true, message: '请填写期初价', trigger: 'blur' }
        ],
        pricingDividendRate: [
          { required: true, message: '请填写分红率(定价)', trigger: 'blur' }
        ],
        pricingVolatility: [
          { required: true, message: '请填写波动率(定价)', trigger: 'blur' }
        ],
        pricingRiskFreeRate: [
          { required: true, message: '请填写无风险收益率(定价)', trigger: 'blur' }
        ],
        hedgingVolatility: [
          { required: true, message: '请填写波动率(对冲)', trigger: 'blur' }
        ],
        leftStrikePrice: [
          { required: true, message: '请填写左执行价', trigger: 'blur' }
        ],
        midStrikePrice: [
          { required: true, message: '请填写中执行价', trigger: 'blur' }
        ],
        rightStrikePrice: [
          { required: true, message: '请填写右执行价', trigger: 'blur' }
        ],
        leftRebateRate: [
          { required: true, message: '请填写左Rebate', trigger: 'blur' }
        ],
        rightRebateRate: [
          { required: true, message: '请填写右Rebate', trigger: 'blur' }
        ],
        leftParticipateRate: [
          { required: true, message: '请填写左参与率', trigger: 'blur' }
        ],
        rightParticipateRate: [
          { required: true, message: '请填写右参与率', trigger: 'blur' }
        ],
        hedgingRiskFreeRate: [
          { required: true, message: '请填写无风险收益率(对冲)', trigger: 'blur' }
        ],
        leftHurdle: [
          { required: true, message: '请填写左hurdle', trigger: 'blur' }
        ],
        rightHurdle: [
          { required: true, message: '请填写右hurdle', trigger: 'blur' }
        ],
        ifKnockout: [
          { required: true, message: '请选择是否敲出', trigger: 'blur' }
        ],
        terminatePrice: [
          { required: true, message: '请填写提前终止价', trigger: 'blur' }
        ],
        multiplier: [
          { required: true, message: '请填写乘数', trigger: 'blur' }
        ],
        roundType: [
          { required: true, message: '请选择舍入方法', trigger: 'blur' }
        ],
        roundPrecision: [
          { required: true, message: '请填写舍入精度', trigger: 'blur' }
        ],
        ifReportPnl: [
          { required: true, message: '请选择是否计算PnL', trigger: 'blur' }
        ],
        structureFilePath: [
          { required: true, message: '请填写期权结构文件路径', trigger: 'blur' }
        ],
        valuationFilePath: [
          { required: true, message: '请填写估值文件路径', trigger: 'blur' }
        ]
      },
      form: {
        id: '',
        dealNo: '',
        underlyingCode: '',
        counterpartyId: '',
        dealOwner: '',
        optionStructureCode: '',
        direction: '',
        hedgingType: '',
        nominal: '',
        startDate: '',
        clearDate: '',
        endDate: '',
        maturity: '',
        ifFinish: '',
        ifAnnual: '',
        annualizedDays: '',
        optionPremium: '',
        paytimeType: '',
        optionFeeRate: '',
        optionFixRate: '',
        additionalRate: '',
        initialPrice: '',
        pricingDividendRate: '',
        pricingVolatility: '',
        pricingRiskFreeRate: '',
        hedgingVolatility: '',
        leftStrikePrice: '',
        midStrikePrice: '',
        rightStrikePrice: '',
        leftRebateRate: '',
        rightRebateRate: '',
        leftParticipateRate: '',
        rightParticipateRate: '',
        hedgingRiskFreeRate: '',
        leftHurdle: '',
        rightHurdle: '',
        ifKnockout: '',
        terminatePrice: '',
        multiplier: '',
        roundType: '',
        roundPrecision: '',
        ifReportPnl: '',
        structureFilePath: '',
        valuationFilePath: '',
        createUserId: '',
        createTime: '',
        modifyUserId: '',
        modifyTime: ''
      }
    }
  },
  created() {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
      this.rStyle = 'width: 92px'
    } else {
      this.style = 'width: 172'
      this.rStyle = 'width: 86px'
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
        id: '',
        dealNo: '',
        underlyingCode: '',
        counterpartyId: '',
        dealOwner: '',
        optionStructureCode: '',
        direction: '',
        hedgingType: '',
        nominal: '',
        startDate: '',
        clearDate: '',
        endDate: '',
        maturity: '',
        ifFinish: '',
        ifAnnual: '',
        annualizedDays: '',
        optionPremium: '',
        paytimeType: '',
        optionFeeRate: '',
        optionFixRate: '',
        additionalRate: '',
        initialPrice: '',
        pricingDividendRate: '',
        pricingVolatility: '',
        pricingRiskFreeRate: '',
        hedgingVolatility: '',
        leftStrikePrice: '',
        midStrikePrice: '',
        rightStrikePrice: '',
        leftRebateRate: '',
        rightRebateRate: '',
        leftParticipateRate: '',
        rightParticipateRate: '',
        hedgingRiskFreeRate: '',
        leftHurdle: '',
        rightHurdle: '',
        ifKnockout: '',
        terminatePrice: '',
        multiplier: '',
        roundType: '',
        roundPrecision: '',
        ifReportPnl: '',
        structureFilePath: '',
        valuationFilePath: '',
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
  .el-dialog__header{
    background: #D12B2B;
  }
  .el-radio + .el-radio{
    margin-left: 0;
    color: #D12B2B;
  }
</style>
