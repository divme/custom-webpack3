<template>
  <div class="topbar">
      <div class="topbar-title">{{title}}</div>
      <div class="topbar-back" @click="goHome">
          <span></span>
          <span></span>
          <span></span>
      </div>

      <div v-show="isMenu" class="menu">
          <router-link to="/">首页</router-link>
          <router-link to="/timedata">2015年财务分析</router-link>
          <router-link to="/ranking">2015年营业收入机构排名</router-link>
          <router-link to="/finance">2015年财务分析(柱状图)</router-link>
          <router-link to="/performance">2015年部门绩效收入(饼图)</router-link>
          <router-link to="/performance2">2015年部门绩效收入(条形图)</router-link>
          <router-link to="/map">2015年部门地区分布(散点图)</router-link>
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
        data(){
             return {
                 isMenu : false
             }
        },
        methods:{
            goHome(){
                    this.isMenu = !this.isMenu
                // this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>
    .menu{
        position: fixed;
        top: 50px;
        left: 0;
        background: #383838;
        color: #fff;
    }
    .menu a{
        display: block;
        line-height: 45px;
        padding: 0 10px;
        border-bottom: 1px solid #666;
        color: #fff;
    }

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