<template>
  <div>
    <label>{{label}}</label>
    <slot></slot>
    <div v-if="validateStatus === 'error'">{{validateMessage}}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';

export default {
  name: "oFormItem",
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  inject: ['form'],
  data() {
    return {
      validateStatus: '',
      validateMessage: ''
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    }
  },
  created() {
    if (this.prop) {
      this.$on('on-input', this.onFieldInput);
      this.$on('on-input-blur', this.onFieldBlur);
    }
  },
  mounted() {
    this.initVal = this.fieldValue;
    if (this.prop) this.dispatch('oForm', 'on-form-item-add', this);
  },
  beforeDestroy() {
    this.dispatch('oForm', 'on-form-item-remove', this);
  },
  methods: {
    getRules() {
      const rules = this.form.rules;
      return rules[this.prop] ? rules[this.prop] : [];
    },
    getFilterRules(trigger) {
      const rules = this.getRules();
      return rules.filter((item) => !item.trigger || item.trigger.indexOf(trigger) > -1);
    },
    validate(trigger, callback) {
      const rules = this.getFilterRules(trigger);
      if (!rules.length) return true;
      this.validateStatus = 'pending';

      // async-validator 调用方法
      let model = {};
      model[this.prop] = this.fieldValue;
      let des = {};
      des[this.prop] = rules;
      const validator = new AsyncValidator(des);
      validator.validate(model, {firstFields: true}, error => {
        this.validateStatus = error ? 'error' : 'success';
        this.validateMessage = error ? error[0].message : '';
        callback(this.validateMessage);
      })
    },
    onFieldInput() {
      this.validate('input');
    },
    onFieldBlur() {
      this.validate('blur');
    },
    resetField() {
      this.form.model[this.prop] = this.initVal;
    }
  }
}
</script>

<style scoped>

</style>
