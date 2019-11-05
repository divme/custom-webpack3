<template>
	<div>I am Vue,I am {{start}}</div>
</template>
<script>
	export default{
         name: 'IamVue',
		 data: function(){
         	return {
         		start: 'happy'
			}
		}
	}
</script>