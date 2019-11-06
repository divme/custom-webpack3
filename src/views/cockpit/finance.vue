<template>
    <div>
        <basic-topbar title="财务报表分析"></basic-topbar>
        <basic-title :title="pageTitle">
            <template v-slot:subLeft>
                <span>单位：万元</span>
            </template>
        </basic-title>
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
    import BasicTitle from './components/basicTitle'
    import BasicTopbar from './components/basicTopbar'
    export default {
        components: {
            BasicTitle, BasicTopbar
        },
        data () {
            this.pageTitle = '2015年财务分析';
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
                    console.log('财务报表分析: finance.vue', 'I am legendselectchanged')
                });
                echart.dispatchAction({
                    type: 'legendToggleSelect'
                });

            }
        }
    }
</script>
<style scoped>

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
