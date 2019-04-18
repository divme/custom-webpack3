<template>
    <div>
        <div class="title-box">
            <span class="title">2015年部门绩效收入2</span>
        </div>
        <ve-bar
                width='100%'
                height="580px"
                :settings = "chartSettings"
                :extend="chartExtend"
                :data="chartData"

                :after-config="afterConfig"
                :before-config="beforeConfig"
        >
        </ve-bar>
        <div class="list">

        </div>

    </div>
</template>
<script>
    export default {
        data () {
            this.title = {
                text: 'I am title'
            };
            this.colors = ['#E77841'];
            this.chartExtend = {
                color: ['#e77841'],
                legend:{
                    show: false
                },
                xAxis:{
                    // show: false,
                    axisLine:{
                        show: false
                    },
                    axisLabel:{
                        show: false,
                        margin: 12,

                        lineHeight: 20,
                        // backgroundColor: 'red',
                        width: 120,
                        // formatter: '{value}kt',
                        // formatter: function(val, index){
                        // },
                        color: function(val, index){
                            var colors = ['#df5316', '#e67843', '#ffc000'];
                            return colors[index];
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    rich:{
                        a:{

                        }
                    }
                },
                yAxis:{

                    axisLabel:{

                    }
                }
            };
            this.chartSettings = {
                scale:[true, true],
                dataOrder: true,
                max: [2222222],
                label:{
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    padding: 5,
                    backgroundColor: '#FABF91',
                    color: '#fff'
                }
            };
            return {
                chartData: {
                    columns: ['Name',  'Order'],
                    rows: [
                        { 'Name': '经纪业务线', 'Order': 1156347.45},
                        { 'Name': '融资融券部', 'Order': 338705.14 },
                        { 'Name': '投资银行总部', 'Order': 95051.87 },
                        { 'Name': '投资管理部', 'Order': 89832.83 },
                        { 'Name': '债券投资部', 'Order': 53316.98 },
                        { 'Name': '债券融资总部', 'Order': 52930.28 },
                        { 'Name': '衍生品部', 'Order': 39582.41 },
                        { 'Name': '研究结构线', 'Order': 31612.91 },
                        { 'Name': '新三板业务总部', 'Order': 1117.86 }
                    ]
                }
            }
        },
        methods: {
            beforeConfig(data){
                // debugger;
                // data.chartExtend.series.radius = 120;
            },
            afterConfig (options) {
                // options.color = ['#5eb8c0', '#92cddd', '#05c9dd', '#01c082', '#fdd006', '#fd8001', '#ff4648', '#466177'];
                // options.series[0].minShowLabelAngle = 300;
                // options.series[0].minAngle = 10;
                // options.series[0].data[0].label = {
                //     show: true,
                //     position: 'inner'
                // };
                // debugger;
                return options
            }
        }
    }
</script>
<style scoped>
    @import "../utils/reset.css";
    .title-box{
        margin: 30px 15px 10px;
    }
    .title{
        padding-right: 25px;
        padding-bottom: 10px;
        border-bottom: 2px solid #333;
        color: #666;
    }
    .ve-pie{
        margin:10px auto;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .ve-pie div{
        width: 100%!important;
    }
    .list{
        display: flex;
        justify-content: space-around;
    }
    .list ul{
        flex: 1 1 auto;
    }
    .list-name{
        min-width: 8em;
    }
    .list-income{
        min-width: 6em;
    }
    .list-grate{
        min-width: 6em;
    }
    .li{
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        border-bottom:  1px solid #dedede;
    }
</style>