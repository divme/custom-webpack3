<template>
	<div class="container">
        <keep-alive>
            <div class="tabbox">
                <div @click="cockpit" :class="{active: iscockpit}">cockpit</div>
                <div @click="vchart"  :class="{active: isvchart}">v-chart</div>
                <div @click="vuetest" :class="{active: isvue}">vue</div>
            </div>
        </keep-alive>


        <div class="main" v-if="iscockpit">
            <router-link to="/finance">2015年财务分析</router-link>
            <router-link to="/performance">2015年部门绩效收入(柱状图)</router-link>
            <router-link to="/performance2">2015年部门绩效收入(条形图)</router-link>
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
	export default{
         name: 'start',
		 data: function(){
         	return {
         		start: 'happy'
			}
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
<style scoped>
    a{
    	 display: block;
	     height: 40px;
	     line-height: 40px;
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
        background: #fff;
        color: #383;
        font-weight: bold;
    }
    .tabbox div{
        flex-grow: 1;

        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        text-align: center;
    }
    .tabbox .active{
        border-bottom: 2px solid #383;
    }

    .main{
        margin: 10px 0;
    }
</style>