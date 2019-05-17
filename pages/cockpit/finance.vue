<template>
    <div>
        <div class="title-box">
            <span class="title">2015年财务分析</span>
            <span class="subtitle">单位：万亿元</span>
        </div>
        <ve-histogram
                width='100%'
                height="360px"
                :settings = "chartSettings"
                :extend="chartExtend"
                :data="chartData"

                :after-config = 'afterConfig'
                :after-set-option = 'afterSetOption'

        >
        </ve-histogram>
        <div class="info-box">
            <div class="info-title">
                财务指标
            </div>
            <div class="info-content">
                净利润：2082.37万亿元、总支出2051.84万亿元、总收入：4764.76万亿元，分别比上年末增长209.6%、108.94%和161.31%。
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data () {
            this.colors = ['#df5316', '#e67843', '#ffc000'];
            this.chartExtend = {
                legend:{
                    show: false
                },
                xAxis:{
                    axisLine:{
                        show: false
                    },
                    axisLabel:{
                        margin: 12,
                        fontSize: 13,
                        fontWeight: 'bold',
                        lineHeight: 20,
                        // backgroundColor: 'red',
                        width: 120,
                        // formatter: '{value}kt',
                        // formatter: function(val, index){
                        // },
                        color: function(val, index){
                            const colors = ['#df5316', '#e67843', '#ffc000'];
                            return colors[index];
                        }
                    },
                    rich:{
                        a:{

                        }
                    }
                },
                yAxis:{
                    show: false,
                    axisLabel:{
                        show: false
                    },
                    axisTick:{
                        show: false
                    }
                }
            };
            this.chartSettings = {
                labelMap: {
                    Name: '名称',
                    Order: '下单用户'
                }
            };
            return {
                chartData: {
                    columns: ['Name',  'Order'],
                    rows: [
                        { 'Name': '总收入\n 1156347.45 \n 161.31%', 'Order': 1156347.45 },
                        { 'Name': '总支出\n 338705.14 \n 108.94%', 'Order': 338705.14 },
                        { 'Name': '总利润\n 95051.87 \n 209.6%', 'Order': 95051.87 }
                    ]
                }
            }
        },
        methods: {
            afterConfig (options){
                var data = options.series[0].data;
                for(var i = 0; i < data.length; i++){
                    var obj = {};
                    obj.value = data[i];
                    obj.itemStyle={
                        color: this.colors[i]
                    };
                    data[i] = obj;
                }
                options.series[0].barWidth = 50;
                options.series[0].barCategoryGap = '30%';
                return options
            },
            afterSetOption (echart){

                echart.on('legendselectchanged', function(){
                    console.log('I am legendselectchanged')
                });
                echart.dispatchAction({
                    type: 'legendToggleSelect'
                });

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
    .subtitle{
        display: block;
        margin-top: 15px;
        line-height: 20px;
        font-size: 13px;
    }
    .ve-histogram{
        position: relative;

        /*right: 10%*/
    }
    .info-box{
        /*margin-top: 30px;*/
        padding: 0 15px;
    }
    .info-title{
        line-height: 2;
        font-size: 15px;
    }
    .info-content{
        margin-top: 6px;
        line-height: 1.6;
        color: #666;
    }
</style>