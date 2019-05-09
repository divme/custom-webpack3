<template>
    <div class="container">
        <h3>propfather: father of propson</h3>
        <div class="box">
            <h3>子组件</h3>
            <div class="btn" @click="clickson">子组件focus</div>
            <pp title="来自父实例的命名"  v-bind="propsonobj" @testevent="proptestevent" placeholder="Enter your username" style="color: red;"  ref="propson"></pp>
        </div>

    </div>
</template>

<script>

    import pp from './prop'

    export default {
        name: 'propfather',
        components:{
            pp
        },
        data: function(){
            return {
                propsonobj:{
                    titles: 'propsonobj-title',
                    number: 6
                }
            }
        },

        methods:{
            // 父子组件通信
            clickson(){
                this.$refs.propson.changefocus()
            },
            proptestevent(){
                alert('vm emit something')
            },


        }
    }
</script>

<style scoped>
    h3{
        text-align: center;
    }
    .container{
        padding: 10px 15px;
        line-height: 1.6;
    }
    .box{
        margin: 20px -15px;
        padding: 10px;
        font-size: 15px;
        border: 5px solid #ccc;
        color: #666;
    }
    .btn{
        width: 120px;
        height: 36px;
        line-height: 36px;
        margin: 10px auto;
        text-align: center;
        background: #ea3030;
        color: #ffffff;
    }
</style>