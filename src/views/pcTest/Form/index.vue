<template>
 <div>
   <h3>组件测试</h3>
   <o-form :model="form" :rules="rules">
     <o-form-item label="用户名" prop="name">
       <o-input type="text" v-model="form.name" />
     </o-form-item>
     <o-form-item label="邮箱" prop="email">
       <o-input type="text" v-model="form.email" />
     </o-form-item>
     <o-form-item>
       <o-checkbox-group v-model="multiple">
         <o-checkbox label="option1">选项 1</o-checkbox>
         <o-checkbox label="option2">选项 2</o-checkbox>
         <o-checkbox label="option3">选项 3</o-checkbox>
         <o-checkbox label="option4">选项 4</o-checkbox>
       </o-checkbox-group>
     </o-form-item>
     <o-form-item>
       <o-checkbox v-model="checkboxVal">checkbox</o-checkbox>
     </o-form-item>
   </o-form>
 </div>
</template>

<script>

export default {
  name: "oFormTest",
  data() {
    return {
      multiple: ['option1', 'option2'],
      checkboxVal: true,
      form: {
        name: '',
        mail: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    }
  }
}
</script>

<style scoped>

</style>
