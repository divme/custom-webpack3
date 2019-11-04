<template>
    <div class="box" :style="boxStyle">
        <div class="propbox" @click="changeTheme">我是一个prop测试组件</div>
        <div :style="{color: themeColor}">{{themeColor}}</div>
        <div :style="{marginTop: '15px', background: lightThemeColor, color: darkThemeColor}">{{lightThemeColor + ' : ' + darkThemeColor }}</div>
    </div>
</template>

<script>
    import { mapState, mapGetters} from 'vuex';
    export default {
        data: function(){
            return {
                color: this.themeColor,
                boxStyle:{
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }
        },
        computed:{
          ...mapState(["themeColor", "themeName", 'themeState']),
          ...mapGetters(["lightThemeColor", "darkThemeColor"])
        },
        methods:{
            changeTheme(){
                this.$store.commit('changeThemeColor');
            }
        }
    }
</script>

<style scoped>
    .box div{
        height: 50px;
        line-height: 50px;
        padding: 10px 15px;
    }
    .propbox{
        cursor: pointer;
    }
</style>