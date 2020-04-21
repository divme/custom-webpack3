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
   <input type="radio" v-model="radio2" value="23"/>
   <template>
     <o-radio v-model="radio1" :label="1">同意/不同意</o-radio>
     <o-radio v-model="radio1" :label="2">同意/不同意</o-radio>
   </template>
<!--   &lt;!&ndash;单选按钮组测试&ndash;&gt;-->
   <template>
     <o-radio-group v-model="radioGroup">
       <o-radio :label="1">1</o-radio>
       <o-radio :label="2">2</o-radio>
       <o-radio :label="3">3</o-radio>
     </o-radio-group>
   </template>

   <div @click="changeGroup">点击改变checkboxGroup</div>
   <!-- <z-message/> -->
   <!-- <iam-vue/> -->
 </div>
</template>

<script>
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
    return {
      checkbox1: 2,
      checkbox2: true,
      checkboxGroup: ['val1', 'val2', 'val3'],
      checkboxGroupData,
      radio1: 1,
      radio2: true,
      radioGroup: 1,
      placeholder: 1
    }
  },
  methods: {
    changeGroup() {
      this.checkboxGroup = ['val0', 'val2'];
    }
  }
}
</script>

<style scoped>
  .components-container{
    margin: 10px auto;
    padding: 20px;
  }
</style>
