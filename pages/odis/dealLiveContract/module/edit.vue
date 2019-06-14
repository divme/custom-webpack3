<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm
      ref="form"
      :sup_this="sup_this"
      :is-add="false"
      :direction-dict="directionDict"
      :structure-code-dict="structureCodeDict"
      :hedging-type-dict="hedgingTypeDict"
      :paytime-type-dict="paytimeTypeDict"
      :round-type-dict="roundTypeDict"
      :counterparty-data="counterpartyData"
      :underlying-data="underlyingData"
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
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        dealNo: this.data.dealNo,
        underlyingCode: this.data.underlyingCode,
        counterpartyId: this.data.counterpartyId,
        dealOwner: this.data.dealOwner,
        optionStructureCode: this.data.optionStructureCode,
        direction: this.data.direction,
        hedgingType: this.data.hedgingType,
        nominal: this.data.nominal,
        startDate: this.data.startDate,
        clearDate: this.data.clearDate,
        endDate: this.data.endDate,
        maturity: this.data.maturity,
        ifFinish: this.data.ifFinish,
        ifAnnual: this.data.ifAnnual,
        annualizedDays: this.data.annualizedDays,
        optionPremium: this.data.optionPremium,
        paytimeType: this.data.paytimeType,
        optionFeeRate: this.data.optionFeeRate,
        optionFixRate: this.data.optionFixRate,
        additionalRate: this.data.additionalRate,
        initialPrice: this.data.initialPrice,
        pricingDividendRate: this.data.pricingDividendRate,
        pricingVolatility: this.data.pricingVolatility,
        pricingRiskFreeRate: this.data.pricingRiskFreeRate,
        hedgingVolatility: this.data.hedgingVolatility,
        leftStrikePrice: this.data.leftStrikePrice,
        midStrikePrice: this.data.midStrikePrice,
        rightStrikePrice: this.data.rightStrikePrice,
        leftRebateRate: this.data.leftRebateRate,
        rightRebateRate: this.data.rightRebateRate,
        leftParticipateRate: this.data.leftParticipateRate,
        rightParticipateRate: this.data.rightParticipateRate,
        hedgingRiskFreeRate: this.data.hedgingRiskFreeRate,
        leftHurdle: this.data.leftHurdle,
        rightHurdle: this.data.rightHurdle,
        ifKnockout: this.data.ifKnockout,
        terminatePrice: this.data.terminatePrice,
        multiplier: this.data.multiplier,
        roundType: this.data.roundType,
        roundPrecision: this.data.roundPrecision,
        ifReportPnl: this.data.ifReportPnl,
        structureFilePath: this.data.structureFilePath,
        valuationFilePath: this.data.valuationFilePath,
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
