// vue 对原生 radio 做了如下改动：
//    1. v-model (属性：checked 与 事件： change) 绑定
//    2. 绑定 value 值与 v-model 互动，checked 时则 v-model 绑定值为 value

// 示例如下： 选中第一个则 picked = val1, 选中第二个则 picked = val2
// <template>
//    <input type="radio" id="one" value="val1" v-model="picked">
//    <input type="radio" id="two" value="val2" v-model="picked">
// </template>

// 组件需求分析： 两种情况
// 1. o-radio-group：
//    <o-radio-group v-model="radioGroup">
//      <o-radio :label="1">1</o-radio>
//      <o-radio :label="2">2</o-radio>
//      <o-radio :label="3">3</o-radio>
//    </o-radio-group>
// 目标：将变量 radioGroup 的值单选为 1 | 2 | 3
// 分析：value 绑定到 group 的 v-model 上, 则 radio 更新的值为 radio-group的

// 2. o-radio
//    <o-radio v-model="radio1" :label="1">同意/不同意</o-radio>
//    <o-radio v-model="radio1" :label="2">同意/不同意</o-radio>
// 目标：将变量 radio1 的值单选为 1 | 2
// 分析：v-model传递进去的值和事件： value <=> @input
// 内部 radio： checked + @change：给 o-radio v-model 的值赋值为当前o-radio 绑定的label值
