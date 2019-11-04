<template>
    <div>
        <basic-topbar title="首页"></basic-topbar>

        <div class="main" >
            <router-link to="/timedata">2015年财务分析</router-link>
            <router-link to="/ranking">2015年营业收入机构排名</router-link>
            <router-link to="/finance">2015年财务分析(柱状图)</router-link>
            <router-link to="/performance">2015年部门绩效收入(饼图)</router-link>
            <router-link to="/performance2">2015年部门绩效收入(条形图)</router-link>
            <router-link to="/map">2015年部门地区分布(地图)</router-link>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import BasicTopbar from './components/basicTopbar'
    export default {
        components: { BasicTopbar },
        created() {
            const that = this
            // debugger
        }
    }
</script>

<style scoped>
    .main{
        margin: 80px 0;
    }
    .main a{
        display: block;
        height: 45px;
        line-height: 45px;
        border-bottom:  1px solid #f4f4f4;
        color: #666;
        text-align: center;
        text-decoration: none;
    }
    .content{
        margin-top: 40px;
    }

</style>
