<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "oForm",
  props: {
    model: {
      type: Object,
      default: {}
    },
    rules: {
      type: Object,
      default: {}
    }
  },
  provide() {
    return {
      form: this
    }
  },
  data() {
    return {
      fields: []
    }
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if(field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      if(field) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {
    validate(callback) {
      const fields = this.fields;
      return new Promise((resolve, reject) => {
        let flag = true;
        let count = 0;
        if (fields.length) {
          fields.forEach((field) => {
            field.validate('', (errMessage) => {
              count++;
              if (errMessage) flag = false;
              if (count === fields.length - 1) {
                resolve(flag);
                if (typeof callback === 'function') callback(flag);
              }
            })
          })
        } else {
          reject('请添加表单');
        }
      });
    },
    resetFields() {
      const fields = this.fields;
      if (fields.length) {
        fields.forEach((item) => {
          item.resetField();
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
