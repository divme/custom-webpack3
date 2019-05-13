<template>
    <!--三大属性之slot-->
    <div class="slot-box">
        <slots>
            <template v-slot:header>
                <h2 class="slot-header">文章头部标题</h2>
            </template>
            <template v-slot:content="propfromson" >
                <div class="slot-content">
                    <p>因为作用域为当前父组件作用域，所以可以访问当前父组件数据：{{fatherprop}}</p>
                    <p>也可以通过在子元素内bind的方式，访问子元素内属性：{{propfromson.dd}}</p>
                </div>
            </template>
            <template v-slot:footer>
                <div class="slot-footer">文章尾注</div>
            </template>
        </slots>
    </div>
</template>

<script>
    import slots from './slot'
    export default {
        components:{
            slots
        },
        data(){

        }
    }
</script>

<style scoped>

</style>