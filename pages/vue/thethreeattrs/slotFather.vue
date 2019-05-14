<template>
    <!--三大属性之slot-->
    <div class="slot-box">
        <slots @click.native="onclicks" @focus.native="onFocus">
            <template v-slot:header>
                <h2 class="slot-header">文章头部标题</h2>
            </template>
            <template v-slot:content="propfromson">
                <div class="slot-content">
                    <p>因为作用域为当前父组件作用域，所以可以访问当前父组件数据：{{fatherprop}}</p>
                    <p>也可以通过在子元素内bind的方式，访问子元素内属性：{{propfromson.dd}}</p>
                </div>
            </template>
            <template v-slot:footer>
                <div class="slot-footer">文章尾注</div>
            </template>
        </slots>
        <div class="testclick" @click="click1">
            <div @click="click2">
                <div @click.stop="click3">我是谁</div>
            </div>
        </div>
    </div>

</template>

<script>
    import slots from './slot'
    export default {
        components:{
            slots
        },
        data(){
           return{
               fatherprop: 'the father prop'
           }
        },
        methods:{
            onclicks(){
                console.log(132);
                // debugger;
            },
            onFocus(){
               console.log('focus')
            },
            click1(){
                console.log("c1")
            },
            click2(){
                console.log("c2")
            },
            click3(){
                console.log("click3")
            }
        }
    }
</script>

<style scoped>
  .testclick{
      padding: 40px;
      background: green;
  }
  .testclick>div{
      padding: 20px;
      background: #3a0394;
  }
  .testclick>div>div{
      height: 40px;
      background: #ffffff;
      color: #333;
  }
</style>