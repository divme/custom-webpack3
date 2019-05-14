<template>
    <div class="container">
        <h3>propfather: father of propson</h3>
        <div class="box">
            <h3>子组件</h3>
            <div class="likebtn" @click="clickson">子组件focus:changefocus()</div>
        </div>

<!--三大属性之prop-->
        <div class="box">
            <!--子组件prop只接受了title 和 pinfeather属性-->
            <div>
                <son-prop v-bind="pinfeather"

                          ref="propson"  style="font-weight: bold;"

                          placeholder="Enter your username"

                          @testevent="proptestevent"

                          :title.sync="fromfather"
                          v-model="modelVal">
                          <!--v-bind: value = 'modelVal'-->
                          <!--v-on: input = 'modelval = $event.target.value'-->
                    <template v-slot:inputSlot>input 绑定数据 modelVal: {{modelVal}}</template>
                    <template v-slot:syncSlot>sync 同步数据 fromfather: {{fromfather}}</template>
                </son-prop>
                <p></p>
                <p></p>
            </div>

<!--组件上模拟 v-model-->
            <div style="margin-top: 20px; padding-top:20px; border-top: 2px solid #dedede;">
                <h3>组件上模拟v-model</h3>
                <search-input :soninput="modelson" @soninputevent="sonfunc"></search-input>
                <div>手动同步组件内input输入与父组件数据modelson: {{modelson}}</div>
            </div>


            <div style="margin-top: 20px; padding-top:20px; border-top: 2px solid #dedede;">
                <h3>组件上应用v-model</h3>
                <search-input-vmodel v-model="modelsons"></search-input-vmodel>
                <div>自动同步组件内input输入与父组件数据modelsons: {{modelsons}}</div>
            </div>

        </div>


    </div>
</template>

<script>

    import SonProp from './propSon';
    import SearchInput from './propSonInput';
    import SearchInputVmodel from './propSonInputVmodel';


    import Slots from './slot'

    export default {
        name: 'pinfeather',
        components:{
            SonProp,  SearchInput, SearchInputVmodel,
            Slots
        },
        data: function(){
            return {
                fromfather: '来自父组件的命名',

                modelVal: 'onePunchMan',
                modelson: '第二个输入框',
                modelsons: '第三个输入框',

                pinfeather:{
                    pname: 'pname',
                    pnumber: 6
                }
            }
        },

        methods:{

            // 父子组件通信refs
            clickson(){
                this.$refs.propson.changeFocus()
            },

            // 子组件触发父组件事件
            proptestevent(){
                console.log('u emit an event')
            },


            // 组件上手动模拟 v-model：组件上事件
            sonfunc(msg){
                this.modelson = msg
            },
             // 组件上v-model：重定义默认事件
            inputs(e){
                console.log(e)
                console.log('modelevent');
            },
            modelevent(e){
                console.log(e)
                console.log('modelevent');
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
    .likebtn{
        height: 36px;
        line-height: 36px;
        margin: 10px auto;
        text-align: center;
        background: #ea3030;
        color: #ffffff;
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
