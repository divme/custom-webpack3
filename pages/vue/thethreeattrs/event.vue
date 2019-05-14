<template>
   <div class="container">
        <div @click="toDoSomething">事件承载器</div>
   </div>
</template>

<script>
    export default {
        methods:{
            toDoSomething(e){
                this.$emit('things', e.target.innerText)
            }
        }
    }
</script>

<style scoped>

</style>