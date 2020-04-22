// vue 中多选框的使用，分了两种情况，一种是单独使用，一种是分组
// 一、 单独使用：简单地把 boolean 值绑定到 checked
//   <input type="checkbox" id="checkbox" v-model="checked">

// 二、 按组使用：v-model 绑定到一个数组，增加一个 vaule 值，在选中时，将 value 添加到数组中
// <div id='example-3'>
//   <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
//   <input type="checkbox" id="john" value="John" v-model="checkedNames">
//   <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
// </div>


<!-- 多选按钮单独使用测试 -->
// <template>
//   <o-checkbox v-model="checkbox1" :disabled="false">{{checkbox1}}</o-checkbox>
//   <o-checkbox v-model="checkbox2" :true-value="1" :false-value="0">{{checkbox2}}</o-checkbox>
// </template>
// 目标：把 trueval 和 falseval 绑定到 v-model 的值
// 分析：o-checkbox 通过 value 和 @input 绑定下去；
//      内部 checkbox 通过 checked 和 @change 同步更新

<!--多选按钮组测试-->
// <template>
//   <o-checkbox-group v-model="checkboxGroup">
//     <o-checkbox v-for="item in checkboxGroupData" :key="item.id" :value="item.value">我是{{item.id}}</o-checkbox>
//   </o-checkbox-group>
// </template>
// 目标：选中时将 value 添加到 group v-model 的数组里
// 分析：checkbox
