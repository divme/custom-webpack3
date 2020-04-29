<template>
 <div class="components-container">
   <h3>组件测试</h3>
   <!-- 多选按钮测试 -->
   <template>
     <o-checkbox v-model="checkbox1" :disabled="false">{{checkbox1}}</o-checkbox>
     <o-checkbox v-model="checkbox2" :true-value="1" :false-value="0">{{checkbox2}}</o-checkbox>
   </template>
   <!--多选按钮组测试-->
   <template>
     <o-checkbox-group v-model="checkboxGroup">
       <o-checkbox v-for="item in checkboxGroupData" :key="item.id" :value="item.value">我是{{item.id}}</o-checkbox>
     </o-checkbox-group>
   </template>

   <!--单选按钮测试-->
	 <template>
		 <input type="radio" v-model="radio2" value="23"/>
	 </template>
   <!--单选按钮非组测试-->
   <template>
     <o-radio v-model="radio1" :label="1">同意/不同意</o-radio>
     <o-radio v-model="radio1" :label="2">同意/不同意</o-radio>
   </template>
   <!--&lt;!&ndash;单选按钮组测试&ndash;&gt;-->
   <template>
     <o-radio-group v-model="radioGroup">
       <o-radio :label="1">1</o-radio>
       <o-radio :label="2">2</o-radio>
       <o-radio :label="3">3</o-radio>
     </o-radio-group>
   </template>

   <div @click="changeGroup">点击改变checkboxGroup</div>

   <!--	display 组件测试-->
	 <div class="display-box">
		 <div class="display-item">
			 <textarea
						 class="display-input"
						 v-model="displayVal"
						 placeholder="输入vue代码">不支持  d</textarea>
		 </div>
		 <div class="display-item">
			 <display :code="displayVal"></display>
		 </div>
	 </div>


   <!-- <z-message/> -->
   <!-- <iam-vue/> -->
 </div>
</template>

<script>
const displayVal = `<template>
  <div>
    我叫{{name}}
   \\(^o^)/~
   <h4>你叫什么呢？</h4>
</div>
</template>
<script>
  export default {
     data() {
     return {
        name: '宗小宇'
       }
   }
 }
</\u0073cript>
<style>
	h4 {
		color: yellowgreen;
	}
</style>`

export default {
  name: "index",
  data() {
    const checkboxGroupData = [];
    for (let i = 0; i < 5; i++) {
      checkboxGroupData.push({
        id: i,
        value: `val${i}`
      })
    }
    const str = `<span>dsd</span>`

    return {
      checkbox1: 2,
      checkbox2: true,
      checkboxGroup: ['val1', 'val2', 'val3'],
      checkboxGroupData,
      radio1: 1,
      radio2: true,
      radioGroup: 1,
      displayVal,
      placeholder: 1
    }
  },
	watch: {
    radio2(val) {
      if (val) {
        this.$alert('success');
        this.$alert({
	        content: 'i am a alert',
	        duration: 300
        })
      }
    }
	},
  methods: {
    changeGroup() {
      this.checkboxGroup = ['val0', 'val2'];
    }
  }
}
</script>

<style lang="scss" scoped>
  .components-container{
    margin: 10px auto;
    padding: 20px;
	  .display-box{
		  display: flex;
		  width: 1000px;
		  height: 500px;
		  margin: 20px auto;
		  border: 1px solid #ccc;
		  .display-item {
			  flex: 0 0 50%;
			  .display-input{
				  width: 100%;
				  height: calc(100% - 40px);
				  padding: 20px;
				  border: none;
				  border-right: 1px solid #ddd;
				  word-wrap: break-word;
				  word-break: break-word;
				  white-space: pre-wrap;
				  box-sizing: border-box;
			  }
		  }
	  }
  }
</style>
