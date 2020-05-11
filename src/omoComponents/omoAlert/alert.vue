<template>
	<div class="alert">
		<div class="alert-main" v-for="item in notices" :key="item.name">
			<div class="alert-content">{{ item.content }}</div>
		</div>
	</div>
</template>
<script>

let	id = 0;
function getUid() {
  return `alert-${id++}`
}

export default {
  name: 'oAlert',
  data () {
    return {
      notices: [
	      // {
		    //   name: 'notice',
		    //   content: 'I am zongqilin'
	      // },
        // {
        //   name: 'notice2',
        //   content: 'I am chenmouyun'
        // }
      ],
	    defaultDuration: 2000
    }
  },
  methods: {
    add(options) {
      if (typeof options === 'string') {
        options = {
	        content: options,
	        duration: this.defaultDuration
        }
      }
      const name = getUid();
      const op = Object.assign({}, {
        name
      }, options);
	    this.notices.push(op);
	    setTimeout(() => {
	      this.remove(name);
	    }, options.duration)
    },
    remove(name) {
      const index = this.notices.findIndex((item) => item.name === name);
      if (index > -1) this.notices.splice(index, 1)
    }
  }
}
</script>
<style>
	.alert{
		position: fixed;
		width: 100%;
		top: 16px;
		left: 0;
		text-align: center;
		pointer-events: none;
	}
	.alert-content{
		display: inline-block;
		padding: 8px 16px;
		background: #fff;
		border-radius: 3px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
		margin-bottom: 8px;
	}
</style>
