<template>
    <div class="container">
        <div class="header">{{title}}</div>
        <div class="content" :style="contentStyle">{{content}}</div>

        <!--class与style强化-->
        <div class="classbox">
            <div class="info" :class="claStr"></div>
            <div class="info" :class="claObj"></div>
            <div class="info" :class="claArr"></div>
        </div>
        <div class="stylebox">
            <div :style=""></div>
            <div></div>
        </div>

        <!--命令大全-->
        <div class="directivebox">
            <div v-bind:title="directives.title" v-html="directives.html"></div>
            <div v-text="directives.text"></div>

            <div v-if="directives.vif">
                v-if 等切换开销大，适用于一开始就决定渲染或者不渲染的场景，这里当插入之前生成的随机数大于0.5时,显示 v-if
            </div>
            <div v-else>
                v-else 等切换开销大，适用于一开始就决定渲染或者不渲染的场景，这里当插入之前生成的随机数不大于0.5时,显示 v-else
            </div>

            <div v-show="directives.vshow">指令v-show，只是切换元素的display属性</div>

            <div class="btn-isshow" @click="changeVshow">change v-show</div>

            <ul class="vfor">
                <li v-for="item in directives.items" :key="item.id">
                    <!--<img :src="item.url" alt="image">-->
                    {{item.name}}
                </li>
            </ul>

            <!--四大不需要表达式的功能指令：-->
            <!--v-once  v-pre v-cloak v-else-->
            <div v-once>我只渲染一次</div>
            <div v-pre>我是纯html，不用编译，因此用v-pre</div>
        </div>

        <!--计算属性-->
        <div>{{url}}</div>
    </div>
</template>

<script>
    export default {
        name: 'basicvue',
        data: function(){
            return {
                themeColor: '#ea3939',
                title: 'vue basic content',
                content: '人家也是一个真正的军艺高材生，无论是跳舞还是啥都是一流，为什么这样一个女孩愿意跟随李诞，这一点让每个人都感到非常困惑。事实上，李诞亲自提到了这方面的问题，他觉得主要是因为黑尾酱看上了他的内蒙古户口和超高的颜值',

                // class 与 style 属性
                claStr: false,
                claObj:{

                },
                claArr:[

                ],
                contentStyle: {

                },
                // 12指令
                directives: {
                    title: 'this is v-bind',
                    html: '<p style="color: green;">I am a vhtml，带着tag，同时绑定着v-bind指令</p>',
                    text: 'I am  innerText, 仅仅是text',

                    vif: true,
                    vshow: true,

                    items:[
                        {
                            id: 'v1',
                            url: './image/ic-jrsc.png',
                            name: '天猫新品'
                        },
                        {
                            id: 'v2',
                            url: './image/ic-jrsc.png',
                            name: '今日爆款'
                        },
                        {
                            id: 'v3',
                            url: './image/ic-mncg.png',
                            name: '天猫国际'
                        },
                        {
                            id: 'v4',
                            url: './image/ic-tgsq.png',
                            name: '天猫超市'
                        }
                    ]
                }
            }
        },
        mounted: function(){
            var d = Math.random();
            if(d > 0.5){
                this.directives.vif = false;
            }
        },
        computed:{
            url: function(){
                return 'dd'
            }
        },
        methods:{
            changeVshow(){
                this.directives.vshow = !this.directives.vshow;
            }
        },
        watch:{

        }
    }
</script>

<style scoped>
  .container{
      padding: 10px 15px;
  }
  .directivebox{
      margin: 20px auto;
      font-size: 15px;
      color: #666;
  }
  .directivebox div{
      margin: 10px 0;
  }
  .directivebox .btn-isshow{
      width: 120px;
      height: 36px;
      line-height: 36px;
      margin: 10px auto;
      text-align: center;
      background: #ea3030;
      color: #ffffff;
  }
  .directivebox .vfor li{
      text-indent: 25px;
      background: url(./image/ic_gzlc.png) no-repeat left center;
      background-size: 20px auto;
  }
  .directivebox .vfor li img{
      width: 20px;
      height: 20px;
      margin-right: 12px;
  }

</style>