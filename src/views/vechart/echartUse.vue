<template>
    <div>
        <echart-demo></echart-demo>
        <div class="dd">wewq</div>
        <div class="aa">gwrwr</div>
        <div class="bb">dsada</div>
    </div>
</template>

<script>
    // import EchartDemo from './echartDemo'
    export default {
        components: {
            EchartDemo: () => import('./echartDemo')
        },
        mounted(){
            const _this = this;
            console.log(_this.$el)
           // debugger
        }
    }
</script>

<style scoped>

</style>
