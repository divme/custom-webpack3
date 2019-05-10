<template>
    <div  class="boxd" :style="boxStyle">

        <div class="propbox"   @click="changeTheme" :style="eventStyle">{{title}}</div>

        <div>自定义组件v-model属性，在子组件内实现绑定</div>
        <input type="text" id="i1"  ref="propson"   v-bind="$attrs" :value="modelprop" @input="$emit('modelevent', $event.target.value)" />
        <div>{{modelprop}}</div>

        <!--<div>组件内一般的双向绑定模拟没问题></div>-->
        <!--<input type="text"  id="i2" :value="inputmodel" @input="inputmodel = $event.target.value" />-->
        <!--<div>{{inputmodel}}</div>-->

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
          title: {
              type: String,
              default: 'prop测试子组件',
              required: false,
              validator(val){
                 if(val.length > 10){
                     return false
                 }
                 return true
              }
          },
          pname: String,
          pnumber: Number,
          modelprop: {
              required: true
          }
        },
        data: function(){
            return {
                // inputmodel: '321',
                boxStyle:{
                    color: this.$store.state.themeColor
                },
                eventStyle:{
                    padding: '10px',
                    background: '#ddd',
                    color: '#ea3939'
                }
            }
        },
        computed:{
          themeColor: function (){
              return this.$store.state.themeColor;
          }
        },
        methods:{
            changeTheme(){
                this.$store.commit('changeThemeColor');
                this.$emit('testevent');
            },
            changefocus(){
                debugger;
                this.$refs.propson.focus();
                console.log(this.$attrs);
                console.log(this.$store.state.themeColor);
            }
        }
    }
</script>

<style scoped>
    .boxd{
        background: #dedede;
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
</style>