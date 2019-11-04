<template>
    <div  class="boxd" :style="boxStyle">

        <div class="box propbox"   @click="changeTheme" :style="eventStyle">changeTheme in store: {{this.$store.state.themeColor}}</div>

        <div class="box" @click="fsevent">
           <div class="btn">子组件触发父组件事件</div>
        </div>


        <div class="box syncbox">
            <h4 class="likebtn" @click.stop="changeTitle">改变子组件title，sync改变父组件title对应属性propfromfather</h4>
            <div>title：{{title}}</div>
            <slot name="syncSlot">syncSlot</slot>
        </div>

        <div class="box inputbox">
            <div>自定义组件v-model属性，在子组件内实现绑定</div>
            <input type="text" id="i1" name="i1"  ref="propson" :value="modelprop" @input="$emit('modelevent', $event.target.value)" />
            <div>{{modelprop}}</div>
            <slot name="inputSlot">inputSlot</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'propson',
        inheritAttrs: false,
        model:{
            prop: 'modelprop',
            event: 'modelevent'
        },
        props:{
            modelprop: {
                required: false
            },
            title: {
              type: String,
              default: 'prop测试子组件',
              required: false,
              validator(val){
                 if(val.length > 1000){
                     return false
                 }
                 return true
              }
          },
            pname: String,
            pnumber: Number

        },
        data: function()    {
            return {
                eventStyle:{
                    padding: '10px',
                    background: '#ddd',
                    color: '#ea3939'
                }
            }
        },
        computed:{
          boxStyle: function(){
              return {
                      color: this.$store.state.themeColor
                  }
          }
        },
        methods:{
            changeTheme(){
                this.$store.commit('changeThemeColor');
                console.log('this.$store.state.themeColor: ' + this.$store.state.themeColor);

            },
            fsevent(){
                this.$emit('testevent');
            },
            changeTitle(){
                this.$emit('update:title', 'sync修饰符，子组件改变值');
                console.log('子组件prop，title改变，同时sync改变父组件对应属性 propfromfather');
            },
            changeFocus(){
                // debugger;
                this.$refs.propson.focus();
                console.log('this.$attrs:');
                console.log( this.$attrs);
            }
        }
    }
</script>

<style scoped>
    .boxd{
        /*background: #dedede;*/
    }
    .propbox{
        height: 50px;
        line-height: 50px;
        padding: 10px 15px;
    }
    input{
        width: 80%;
        line-height: 36px;
        margin: 10px auto;
        text-indent: 10px;
        border: 1px solid #dedede;
    }
    input:focus{
        border: 1px solid #dedede;
    }
    .likebtn{
        padding: 5px 10px;
        background: #ea3939;
        color: #fff;
    }
    .btn{
        width: 150px;
        line-height: 36px;
        margin: 10px auto;
        padding: 0 10px;
        border-radius: 5px;
        text-align: center;
        background: #ea3030;
        color: #ffffff;
    }
    .box{
        margin: 30px auto;
        padding-top: 10px;
        border-top: 5px solid #ddd;
    }
</style>