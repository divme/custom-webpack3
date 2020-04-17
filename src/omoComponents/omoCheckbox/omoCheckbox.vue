<!--
 prop： value trueValue falseValue disabled
 event: input  change
 slot: default
-->
<template>
	<label>
		<input
			v-if="group"
			type="checkbox"
			:checked="checked"
			:value="value"
			v-model="model"
			@change="onchange"
		/>
		<input
			v-else
			type="checkbox"
			:disabled="disabled"
			:checked="checked"
			@change="onchange"
		/>
		<slot name="default"></slot>
	</label>
</template>

<script>
import {findComponentUpward} from "@/utils/vueTool";

export default {
  name: "oCheckbox",
	props: {
    value: {
      type: [Boolean, Number, String],
	    default: true
    },
    trueValue: {
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
	    default: false
		}
	},
	data() {
    return {
      checked: this.value === this.trueValue,
	    group: false,
	    model: []
    }
	},
	watch: {
    value(val) {
      if (val === this.trueValue ||  val === this.falseValue) {
        this.updateModel();
      } else {
        throw Error('value should be a true-value or false-value');
      }
		}
	},
	created() {
    const parent = findComponentUpward(this, 'oCheckboxGroup');
    this.parent = parent;
    if (parent) {
      this.group = true;
      this.model = parent.model;
      this.$on('updateFromGroup', this.updateFromGroup);
    } else {
      this.updateModel();
    }
	},
	methods: {
    onchange(e) {
      if (this.disabled) return false;
      const checked = e.target.checked;
      this.checked = checked;

      if (this.group) {
        this.parent.change(this.model);
      } else {
        const value = checked ? this.trueValue: this.falseValue;
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
		updateModel() {
      this.checked = this.value === this.trueValue;
		},
    updateFromGroup(model) {
      this.model = model;
    }
	}
}
</script>

<style scoped>

</style>
