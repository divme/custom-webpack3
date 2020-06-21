<template>
	<ul class="tree-ul">
		<li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
			<o-checkbox
						v-if="showCheckbox"
						:value="data.checked"
						@input="handleCheck"
			></o-checkbox>
			<span>{{ data.title }}</span>
			<o-tree-node
						v-if="data.expand"
						v-for="(item, index) in data.children"
						:key="index"
						:data="item"
						:show-checkbox="showCheckbox"
			></o-tree-node>
		</li>
	</ul>
</template>

<script>
import {findComponentUpward} from '@/utils/vueTool';

export default {
  name: "oTreeNode",
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
	data() {
    return {
      tree: findComponentUpward(this, 'oTree')
    }
	},
	watch: {
    'data.children': {
      handler (data) {
        if (data) {
          const checkedAll = !data.some(item => !item.checked);
          this.$set(this.data, 'checked', checkedAll);
        }
      },
      deep: true
    }
	},
  methods: {
    // 选中，展开；勾掉，叠起
    handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand);

      if (this.tree) {
        console.log('this.tree', this.tree)
        this.tree.emitEvent('on-toggle-expand', this.data);
      }
    },
	  // 选中时，所有子节点选中；通知父节点自己已选中
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);

      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data);
      }
    },
    updateTreeDown (data, checked) {
      this.$set(data, 'checked', checked);

      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked);
        });
      }
    }
  }
}
</script>

<style scoped>
	.tree-ul, .tree-li{
		list-style: none;
		padding-left: 10px;
	}
	.tree-expand{
		cursor: pointer;
	}
</style>
