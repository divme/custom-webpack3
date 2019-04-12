<template>
	<div>I am Vue,I am {{start}}</div>
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