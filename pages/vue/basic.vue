<template>
    <div class="container">
        <!--命令大全-->
        <div class="directivebox box">
            <h1>Vue 命令大全</h1>
            <div v-bind:title="directives.title" v-html="directives.html"></div>
            <div v-text="directives.text"></div>

            <div v-if="directives.vif">
                v-if v-else v-else-if: 等切换开销大，适用于一开始就决定渲染或者不渲染的场景，这里当插入之前生成的随机数大于0.5时,显示 v-if
            </div>
            <div v-else>
                v-else v-if v-else-if: 等切换开销大，适用于一开始就决定渲染或者不渲染的场景，这里当插入之前生成的随机数不大于0.5时,显示 v-else
            </div>

            <div class="vshowbox">
                <div v-show="directives.vshow">v-show: 只是切换元素的display属性</div>
            </div>

            <div class="btn btn-isshow" @click="changeVshow">v-click</div>

            <ul class="vfor">
                <li v-for="item in directives.items" :key="item.id">
                    <img :src="item.url" alt="image">
                    v-for : {{item.name}}
                </li>
            </ul>

            <div>
                <input type="text" v-model="directives.inputvalue">
                <p>{{directives.inputvalue}}</p>
                <div class="btn btn-model" @click="initvalue">initvalue</div>
            </div>

            <!--四大不需要表达式的功能指令：-->
            <!--v-once  v-pre v-cloak v-else-->
            <div v-once>v-once: 我只渲染一次</div>
            <div v-pre>v-pre: 我是纯html，不用编译</div>
            <div>v-slot v-cloak</div>

            <p>四个不需要表达式的功能指令: v-else v-once v-pre  v-cloak</p>
            <p>v-bind v-on 需要prop</p>
        </div>

        <div class="header" ref="header">{{title}}</div>
        <div class="content">{{content}}</div>
        <div>计算属性computedstr：{{computedstr}}</div>

        <!--class与style强化-->
        <div class="box">
            <h1>class 与 style 绑定强化</h1>
            <div class="classbox">
                <div class="info" :class="claStr">string class</div>
                <div class="info" :class="claObj">obj class</div>
                <div class="info" :class="claArr">Arr class</div>
            </div>
            <div class="stylebox">
                <div :style="contentStyle">style 可以绑定为 Obj, 也可以绑定为 Arr</div>
            </div>
        </div>

        <div class="box">
            <h1>子组件</h1>
            <div class="btn" @click="clickson">子组件专用</div>
            <sonprop @testevent="proptestevent"  ref="propson"></sonprop>
        </div>

       <div class="box">
           <h1>实例方法测试</h1>
           <h4>数据</h4>
           <div @click="vmset" :style="eventStyle">vm.$set
              <!--<p v-show="dd">www</p>-->
           </div>

           <input type="radio" v-model="pick" v-bind:value="a">{{pick}}{{a}}
           <div @click="changepick">change pick</div>
           <div @click="changea">change a</div>
       </div>

    </div>
</template>

<script>
    import img1 from './image/ic_gzlc.png';
    import img2 from './image/ic_jrsc.png';
    import img3 from './image/ic_mncg.png';
    import img4 from './image/ic_tgsq.png';

    import sonprop from './thethreeattrs/sonprop'

    export default {
        name: 'basicvue',
        components:{
            sonprop
        },
        data: function(){
            return {
                a: 'a',
                pick: 'pick',
                themeColor: '#ea3939',
                title: 'vue basic content',
                content: 'html中嵌入双大括号语法',

                // class 与 style 属性
                claStr: 'strClass',
                claObj:{
                    class1: true
                },
                claArr:[
                    'arrStr',
                    {
                        arrObj1: true
                    }
                ],
                contentStyle: {
                    fontWeight: 'bold',
                    color: 'green'
                },
                eventStyle:{
                    padding: '10px',
                    background: '#ddd',
                    color: '#ea3939'
                },

                // 常用12指令
                directives: {
                    title: 'this is v-bind',
                    html: '<p style="color: green;">v-html v-bind: I am a vhtml，带着tag，同时绑定着v-bind指令</p>',
                    text: 'v-text: I am  innerText, 仅仅是text',

                    vif: true,
                    vshow: true,
                    inputvalue: 'input content',

                    items:[
                        {
                            id: 'v1',
                            url: img1,
                            name: '天猫新品'
                        },
                        {
                            id: 'v2',
                            url: img2,
                            name: '今日爆款'
                        },
                        {
                            id: 'v3',
                            url: img3,
                            name: '天猫国际'
                        },
                        {
                            id: 'v4',
                            url: img4,
                            name: '天猫超市'
                        }
                    ]
                }
            }
        },
        mounted: function(){
            const d = Math.random();
            if(d > 0.5){
                this.directives.vif = false;
            }
        },
        computed:{
            computedstr: function(){
                return 'This is a computed attr'
            }
        },
        methods:{
            changepick(){
               this.pick = 'picks'
            },
            changea(){
               this.a = 'as'
            },
            // 指令方法
            changeVshow(){
                this.directives.vshow = !this.directives.vshow;
            },
            initvalue(){
                this.directives.inputvalue = 'input content'
            },

            // 父子组件通信
            clickson(){
                this.$refs.propson.changefocus()
            },
            proptestevent(){
                alert('vm emit something')
            },

            // 实例方法
            vmset(){

                debugger;
                console.log('$data: ' + this.$data);
                console.log('$props: '+ this.$props);
                console.log('$el: '+ this.$el);
                console.log('$options: '+ this.$options);
                console.log('$parent: '+ this.$parent);
                console.log('$root: ' + this.$root.nodeType)
                console.log('$children: ' + this.$children)
                // this.$set( 'dd' , true)
            }
        },
        watch:{
           'directives.inputvalue' : function(val, oldval){
                  console.log(val + ' : ' +oldval)
            }
        }
    }
</script>

<style scoped>
  h1{
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
  .directivebox div{
      margin: 10px 0;
  }
  .directivebox input{
      width: 100%;
      line-height: 32px;
      padding: 0 10px;
      border: 1px solid #ccc;
      box-sizing: border-box;
  }
  .directivebox .vshowbox{
      height: 30px;
  }
  .directivebox .btn{
      width: 120px;
      height: 36px;
      line-height: 36px;
      margin: 10px auto;
      text-align: center;
      background: #ea3030;
      color: #ffffff;
  }
  .directivebox .vfor li{
      background-size: 20px auto;
  }
  .directivebox .vfor li img{
      width: 20px;
      height: 20px;
      margin-right: 12px;
  }

</style>