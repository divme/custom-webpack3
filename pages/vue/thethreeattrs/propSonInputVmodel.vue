<template>
   <div class="con">
       <div class="group">
           <input type="text" id="i4" name="i4" @focus="onfocus" :value="valuefromfather" @input="$emit('inputs', $event.target.value)"/><label for="i4">搜索</label>
       </div>
       <div>valuefromfather: {{valuefromfather}}</div>

   </div>
</template>

<script>
    export default {
        // v-model模式
        model: {
            prop: 'valuefromfather',
            event: 'inputs'
        },
        props:{
            // 组件直接模拟v-model模式
            valuefromfather: String,
        },
        data: function(){
            return {

            }
        },
        methods:{
            eventtofather(e){
                this.$emit('inputs', e.target.value)
            },
            onfocus(){
                // debugger;
                console.dirxml(document.activeElement)
            }
        }
    }
</script>

<style scoped>
   .con{
       margin: 10px;
   }
   .group{

   }

    .group input[type='text']{
        width: 200px;
        height: 40px;
        line-height: 400px;
        text-indent: 12px;
        border: 1px solid #dedede;
        box-sizing: border-box;
    }
    .group input[type='text']+label{
        display: inline-block;
        width: 80px;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
        border-radius: 4px;
        background: #ea3030;
        color: #ffffff;
        box-sizing: border-box;
        vertical-align: middle;
        text-align: center;
    }
   .group input:focus{
       border: 1px solid #ea3030;
   }
</style>