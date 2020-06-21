<template>
  <div class="o-radio-group">
	  <slot></slot>
  </div>
</template>

<script>
export default {
  name: "oRadioGroup",
  props: {
    value: {
      type: [String, Number]
    }
  },
  watch: {
    value() {
      this.update();
    }
  },
	mounted() {
    this.update();
	},
  methods: {
    change(val) {
      this.$emit('input', val);
    },
    update() {
      // this.val = this.value;
      this.broadcast('oRadio', 'updateRadioGroup', this.value);
    }
  }
}
</script>

<style scoped>

</style>
