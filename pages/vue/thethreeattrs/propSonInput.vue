<template>
   <div class="con">
       <div class="group">
           <input type="text" id="i3" name="i3" @focus.stop="ddd" :value="soninput" @input="$emit('soninputevent', $event.target.value)"/><label for="i3">搜索</label>
       </div>
       <div>来自父组件的prop: {{soninput}}</div>
   </div>
</template>

<script>
    export default {
        props:{
            soninput: String,
        },
        data: function(){
            return {

            }
        },
        methods:{
            ddd(){
                // debugger;
                console.dirxml(document.activeElement);
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