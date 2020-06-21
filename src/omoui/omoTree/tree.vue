<template>
	<div>
		<o-tree-node
					v-for="(item, index) in cloneData"
					:key="index"
					:data="item"
					:show-checkbox="showCheckbox"
		></o-tree-node>
	</div>
</template>

<script>
import {deepCopy} from "@/utils/vueTool";

export default {
  name: "oTree",
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cloneData: []
    }
  },
  created () {
    this.rebuildData();
  },
  watch: {
    data () {
      this.rebuildData();
    }
  },
  methods: {
    rebuildData () {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent (eventName, data) {
      this.$emit(eventName, data, this.cloneData);
    }
  }
}
</script>

<style scoped>

</style>
