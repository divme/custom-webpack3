<template>
	<div id="home" class="container">
        <keep-alive>
            <div class="tabbox">
                <div @click="cockpit" :class="{active: iscockpit}">cockpit</div>
                <div @click="vchart"  :class="{active: isvchart}">v-chart</div>
                <div @click="vuetest" :class="{active: isvue}">vue</div>
            </div>
        </keep-alive>


        <div class="main" v-if="iscockpit">
            <iam-vue/>
            <router-link to="/container">驾驶舱omo</router-link>
            <router-link to="/timedata">2015年财务分析</router-link>
            <router-link to="/ranking">2015年营业收入机构排名</router-link>
            <router-link to="/finance">2015年财务分析(柱状图)</router-link>
            <router-link to="/performance">2015年部门绩效收入(饼图)</router-link>
            <router-link to="/performance2">2015年部门绩效收入(条形图)</router-link>
            <router-link to="/map">2015年部门地区分布(地图)</router-link>
        </div>
        <div class="main" v-if="isvchart">
            <router-link to="/useechart">go to useNormalEchart</router-link>
            <router-link to="/veline">go to vechartLine</router-link>
            <router-link to="/vescatter">go to vechartScatter</router-link>
            <router-link to="/vemap">go to vechartMap</router-link>
        </div>
        <div class="main" v-if="isvue">
            <router-link to="/vuebasic">Vue test: basic</router-link>
            <router-link to="/vuepropfather">Vue test: propfather</router-link>
            <router-link to="/vueslotfather">Vue test: slotfather</router-link>
            <router-link to="/vueeventfather">Vue test: eventfather</router-link>
            <router-link to="/vuestore">Vue test: store</router-link>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>
	</div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
//    import IamVue from '@/components/iamvue'
	export default{
        name: 'Home',
        components: {
//            IamVue
        },
        data: function(){
         	return {
         		start: 'happy'
			}
		},
        created() {
            const that = this
            console.log(123)
        },
        computed:{
            ...mapState(['iscockpit', 'isvchart', 'isvue'])
        },
        methods:{
            ...mapMutations(['changeActive']),
            cockpit(){
                 this.$store.commit('changeActive', 0)
             },
            vchart(){
                 // this.$store.commit('changeActive', 1)
                this.changeActive(1);
            },
            vuetest(){
                 this.$store.commit('changeActive' , 2)
            }
        }
	}
</script>
<style scoped lang="scss">
    a{
    	 display: block;
	     height: 45px;
	     line-height: 45px;
	     border-bottom:  1px solid #f4f4f4;
		 color: #666;
         text-align: center;
		 text-decoration: none;
	}

    .container{
        margin: 0;
    }
    .tabbox{
        display: flex;
        justify-content: space-around;

        margin: 0;
        font-size: 14px;
        font-weight: bold;


        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*border-bottom: 2px solid #993333;*/
        /*background: #f7f7f7;*/
    }
    .tabbox div{
        flex-grow: 1;

        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        text-align: center;
        color: rgba(153, 51, 51, 0.6);

    }
    .tabbox .active{
        border-bottom: 2px solid #993333;
        color: #993333;
        font-size: 18px;

        /*background: #993333;*/
        /*color: #fff;*/
    }

    .main{
        margin: 10px 0;
    }
</style>

<style>
    #home{
        /*display: flex;*/
        white-space: normal;
    }
</style>
