<template>
    <div :style="boxStyle">
        <div class="propbox" @click="changeTheme">我是一个prop测试组件</div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                boxStyle:{
                    color: this.themeColor,
                    fontSize: '14px',
                    fontWeight: 'bold'
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
            }
        }
    }
</script>

<style scoped>
.propbox{
    height: 50px;
    line-height: 50px;
    padding: 10px 15px;
}
</style>