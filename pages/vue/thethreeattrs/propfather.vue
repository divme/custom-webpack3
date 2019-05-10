<template>
    <div class="container">
        <h3>propfather: father of propson</h3>
        <div class="box">
            <h3>子组件</h3>
            <div class="btn" @click="clickson">子组件focus</div>
            <div>{{pinfeather.pname}}</div>

            <!--子组件prop只接受了title 和 pinfeather属性-->
            <pp title="来自父实例的命名"  v-bind="pinfeather"

                ref="propson"  style="font-weight: bold;"

                placeholder="Enter your username"

                @testevent="proptestevent"

                v-model="modelVal">
            </pp>

            <search-inputvmodel v-model="modelson0"></search-inputvmodel>
            <div>modelson0: {{modelson0}}</div>

            <!--<search-input :value="modelson" @input="sonfunc"></search-input>-->
            <div>{{modelson}}</div>
        </div>

    </div>
</template>

<script>

    import pp from './prop';
    import searchInputvmodel from './soninputvmodel';
    import searchInput from './soninput';

    export default {
        name: 'pinfeather',
        components:{
            pp, searchInputvmodel, searchInput
        },
        data: function(){
            return {
                modelVal: 'onePunchMan',
                modelson0: 'hi0',
                modelson: 'hi',
                pinfeather:{
                    pname: 'pname',
                    pnumber: 6
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
            sonfunc(msg){
                this.modelson = msg
            }


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