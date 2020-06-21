<template>
  <div class="o-table-box">
    <h5>{{title}}</h5>
    <table>
       <thead>
          <tr>
            <th v-for="col in columns">{{col.title}}</th>
          </tr>
       </thead>
       <tbody>
          <tr v-for="(item, index) in data">
            <td v-for="col in columns">
              <template v-if="'render' in col">
                <render-dom :row="item" :col="col" :index="index" :render="col.render"></render-dom>
              </template>
              <template v-else-if="'slot' in col">
                <slot :row="item" :col="col" :index="index" :name="col.slot"></slot>
              </template>
              <template v-else>
                <span>{{item[col.key]}}</span>
              </template>
            </td>
          </tr>
       </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "oTable",
  components: {
    renderDom: {
      functional: true,
      props: {
        row: Object,
        col: Object,
        index: Number,
        render: Function
      },
      render:(h, ctx) => {
        console.log('render:', this);
        const params = {
          row: ctx.props.row,
          col: ctx.props.col,
          index: ctx.props.index
        };
        return ctx.props.render(h, params);
      }
    },
    useSlot: {
      functional: true,
      inject: ['tableRoot'],
      props: {
        row: Object,
        col: Object,
        index: Number
      },
      render: (h, ctx) => {
        return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.col.slot]({
          row: ctx.props.row,
          col: ctx.props.col,
          index: ctx.props.index
        }))
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
     },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
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
  table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
</style>
