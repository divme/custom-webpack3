<template>
  <div class="topbar">
      <div class="topbar-title">{{title}}</div>
      <div class="topbar-back" @click="goHome">
          <span></span>
          <span></span>
          <span></span>
      </div>
  </div>
</template>

<script>
    export default {
        props:{
            title :{
                required :true,
                type: String
            }
        },
        methods:{
            goHome(){
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>
   .topbar{
       position: fixed;
       height: 50px;
       line-height: 50px;
       top: 0;
       left: 0;
       right: 0;
       text-align: center;
       background: #383838;
       color: #fff;
       z-index: 10;
   }
    .topbar-title{
        display: inline-block;
        height: 50px;
        line-height: 50px;
    }
    .topbar-back{
        position: absolute;
        height: 50px;
        width: 50px;
        top: 0;
        left: 10px;
        /*background: lightgoldenrodyellow;*/

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .topbar-back span{
        position: relative;
        width: 25px;
        height: 1px;
        margin-top: 8px;
        top: -4px;
        background: #fff;
    }
</style>