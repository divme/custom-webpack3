<template>
  <input
    type="text"
    @input="inputEvent"
    @blur="blurEvent"
  />
</template>

<script>
export default {
  name: "oInput",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentVal: this.value
    }
  },
  watch: {
    value(val) {
      this.currentVal = val;
    }
  },
  methods: {
    inputEvent(e) {
      const val = e.target.value;
      this.currentVal = val;
      this.$emit('input', val);
      this.dispatch('oFormItem', 'on-input', value);
    },
    blurEvent() {
      this.dispatch('oFormItem', 'on-input-blur', this.currentVal);
    }
  }
}
</script>

<style scoped>

</style>
