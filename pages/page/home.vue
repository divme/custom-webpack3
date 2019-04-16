<template>
	<div>
		<div>I am Vue,I am {{start}}</div>
		<router-link to="/add">go to add</router-link>
		<router-link to="/echart">go to echart</router-link>
		<router-link to="/veline">go to vechartLine</router-link>
		<router-link to="/vescatter">go to vechartScatter</router-link>
		<router-link to="/vemap">go to vechartMap</router-link>
		<router-link to="/finance">2015年部门绩效收入</router-link>
		<router-link to="/performance">2015年财务分析</router-link>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
         name: 'start',
		 data: function(){
         	return {
         		start: 'happy'
			}
		}
	}
</script>
<style scoped>
	div{
		margin: 10px;
		text-align: center;
	}
    a{
    	 display: block;
	     height: 40px;
	     line-height: 40px;
	     border-bottom:  1px solid #f4f4f4;
		 color: #666;
		 text-decoration: none;
	}
</style>