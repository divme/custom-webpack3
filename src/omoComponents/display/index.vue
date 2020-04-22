<template>
	<div ref="display" class="display">
	</div>
</template>

<script>
import Vue from 'vue';

export default {
  name: "display",
  props: {
    code: {
      type: String,
	    default: ''
    }
  },
	data() {
    return {
      timer: '',
	    html: '',
	    script: '',
	    style: '',
	    id: '',
	    component: ''
    }
	},
	watch: {
    code() {
      this.debounce(this.update);
    }
	},
  beforeDestroy () {
    if (this.id) {
      const css = document.querySelector(`#${this.id}`);
      if (css)  css.parentNode.removeChild(css);
    }
	  if (this.component) {
	    this.$refs.display.removeChild(this.component.$el);
	    this.component.$destroy();
	    this.component = null;
	  }
	},
	methods: {
    debounce(func) {
      // 没有，则赋值；有，则重置
      if (this.timer) {
        clearTimeout(this.timer);
      }
	    this.timer = setTimeout(func, 2000);
    },
		// 拆解 template script style 部分
		getSource(type) {
      const startReg = new RegExp(`(?<=<${type}[^>]*>)(.|\n){1}`);
			const endReg = new RegExp(`<\/${type}>`);
			const code = this.code;
			const start = code.search(startReg);
			const end = code.search(endReg);
			if (start < 0) return '';
			return code.slice(start, end)
		},
		update() {
      this.html = this.getSource('template');
      this.script = this.getSource('script');
      this.style = this.getSource('style');

      this.insert()
		},
		insert() {
      if (this.html !== '' && this.script !== '') {
        const script = this.script.replace('export default', 'return');
        const obj = new Function(script)();
        obj.template = this.html;

        try {
          const Vm = Vue.extend(obj);
          this.component = new Vm().$mount();
          this.$refs.display.innerHTML = '';
          this.$refs.display.appendChild(this.component.$el);
        } catch(e) {
          alert(e)
        }

        if (this.style !== '') {
          this.id = this.randomStr();
          const style = document.createElement('link');
          style.type = 'text/css';
          style.id = this.id;
          style.innerHTML = this.style;
          document.querySelector('head').appendChild(style);
        }
      }
    },
		randomStr(len = 32) {
      const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      const maxPos = $chars.length;
      let str = '';
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
		}
	}
}
</script>

<style scoped>
  .display{
	  padding: 20px;
  }
</style>
