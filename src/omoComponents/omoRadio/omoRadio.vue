<template>
	<label>
		<input
			type="radio"
			:disabled="disabled"
			:value="label"
			:checked="checked"
			@change="change"
		/>
<!--		<template v-for="n in 3">-->
			<slot name="zong"></slot>
			<slot name="yu"></slot>
		  <slot name="zong"></slot>
<!--		</template>-->
	</label>
</template>

<script>
import {findComponentUpward} from "@/utils/vueTool";
export default {
  name: "oRadio",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
	  value: {
      type: [Boolean, String, Number],
		  default: false
	  },
	  label: {
      type: [Boolean, String, Number],
		  default: ''
	  }
  },
  data() {
    return {
      group: false,
	    groupModel: [],
      checked: false
    }
  },
  watch: {
    value() {
      this.updateChecked();
    }
  },
  created() {
    const parent = findComponentUpward(this, 'oRadioGroup');
    this.parent = parent;
    if (parent) {
      this.group = true;
      this.groupModel = parent.value;
      this.$on('updateRadioGroup', this.updateRadioGroup);
    } else {
      this.updateChecked();
    }
  },
  methods: {
    change(e) {
      const checked = e.target.checked;
      this.checked = checked;
      if (this.group) {
        this.parent.change(this.label);
      } else if (checked) {
        this.$emit('input', this.label);
        this.$emit('change', this.label);
      }
    },
    updateChecked() {
      this.checked = this.label === this.value;
    },
    updateRadioGroup(val) {
      this.checked = this.label === val;
    }
  }
}
</script>

<style scoped>

</style>
