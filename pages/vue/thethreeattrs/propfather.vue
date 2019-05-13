<template>
    <div class="container">
        <h3>propfather: father of propson</h3>
        <div class="box">
            <h3>子组件</h3>
            <div class="btn" @click="clickson">子组件focus</div>
            <div>{{pinfeather.pname}}</div>

<!--三大属性之prop-->
            <div>
                <!--子组件prop只接受了title 和 pinfeather属性-->
                <son-prop title="来自父实例的命名"  v-bind="pinfeather"

                         ref="propson"  style="font-weight: bold;"

                         placeholder="Enter your username"

                         @testevent="proptestevent"

                         v-model="modelVal">
                </son-prop>


                <div style="margin-top: 20px; padding-top:20px; border-top: 2px solid #dedede;">
                    <h3>模拟v-model</h3>
                    <search-input :value="modelson" @input="sonfunc"></search-input>
                    <div>modelson: {{modelson}}</div>
                </div>


                <div style="margin-top: 20px; padding-top:20px; border-top: 2px solid #dedede;">
                    <h3>组件应用v-model</h3>
                    <search-input-vmodel v-model="modelson0"></search-input-vmodel>
                    <div>modelson0: {{modelson0}}</div>
                </div>

            </div>
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



        </div>

    </div>
</template>

<script>

    import SonProp from './sonprop';
    import SearchInputVmodel from './soninputvmodel';
    import SearchInput from './soninput';

    import Slots from './slot'

    export default {
        
        name: 'pinfeather',
        components:{
            SonProp, SearchInputVmodel, SearchInput,
            Slots
        },
        data: function(){
            return {
                fatherprop: 'the father prop',

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

    .slot-box{
        margin: 20px auto;
        border-top: 2px solid #ddd;
        box-sizing: border-box;
    }
    .slot-box .slot-header{
        text-align: center;
    }
    .slot-box .slot-footer{
        font-size: 12px;
        text-align: right;
    }
</style>
