<template>
   <div class="checkbox-group">
	   <slot></slot>
   </div>
</template>

<script>
import Emmiter from '@/mixins/contact';

export default {
  name: "oCheckboxGroup",
	mixins: [Emmiter],
	props: {
    value: {
      type: Array,
	    default() {
        return []
	    }
    }
	},
	data() {
    return {
      model: []
    }
	},
	watch: {
    value(val) {
      this.updateModel(val);
    }
	},
	created() {
    this.updateModel();
	},
	methods: {
    updateModel() {
      this.model = this.value;
      this.broadcast('oCheckbox', 'updateFromGroup', this.model);
    },
		change(model) {
      this.$emit('input', model);
      this.$emit('change', model);
		}
	}
}
</script>

<style scoped>

</style>
