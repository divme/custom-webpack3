<template>
    <div class="container">
        <div class="header">{{title}}</div>
        <div class="content" :style="contentStyle">{{content}}</div>
        <div class="classbox">
            <div class="info" :class="active"></div>
            <div class="info" :class="active"></div>
            <div class="info" :class="active"></div>
        </div>

        <div class="stylebox">
            <div :style=""></div>
            <div></div>
        </div>

        <div class="directivebox">
            <div v-bind:title="directives.title" v-html="directives.html"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basic',
        data: function(){
            return {
                themeColor: '#ea3939',
                title: 'basic practice',
                content: '人家也是一个真正的军艺高材生，无论是跳舞还是啥都是一流，为什么这样一个女孩愿意跟随李诞，这一点让每个人都感到非常困惑。事实上，李诞亲自提到了这方面的问题，他觉得主要是因为黑尾酱看上了他的内蒙古户口和超高的颜值',
                // class 与 style 属性
                active: false,
                contentStyle: {

                },
                // 12指令
                directives: {
                    title: 'this is v-bind',
                    html: '<p>I am a vhtml</p>'
                }
            }
        },
        computed:{

        },
        methods:{

        },
        watch:{

        }
    }
</script>

<style scoped>

</style>