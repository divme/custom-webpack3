<template>
    <div>
        <basic-topbar title="财务绩效分析二"></basic-topbar>
        <basic-title :title="pageTitle">
            <template v-slot:subLeft>
                <span>单位: 万元</span>
            </template>
            <template v-slot:subRight>
                <router-link to="/performance">明细查询</router-link>
            </template>
        </basic-title>
        <ve-bar
                width='100%'
                height="520px"
                :settings = "chartSettings"
                :extend="chartExtend"
                :data="chartData"

                :after-config="afterConfig"
                :before-config="beforeConfig"
                :after-set-option-once="afterSetOptionOnce"
        >
        </ve-bar>
        <div class="list">
            公司总收入: 755.412.72
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
            this.pageTitle = '2015年部门绩效收入（条形图）';
            this.colors = ['#E77841'];
            this.chartExtend = {
                color: ['#e77841'],
                title:{
                    show: false
                },
                legend:{
                    show: false
                },
                xAxis:{
                    show: false,
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
                    inverse: true,

                    axisLabel:{

                    }
                },
                series:{
                    barWidth: 22
                }
            };
            this.chartSettings = {
                scale: [true, true],
                dataOrder: true,
                max: [2222222],
                barCategoryGap: 30,
                label:{
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    padding: 5,
                    // height: 30,
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
                        { 'Name': '新三板业务总部', 'Order': 3446.86 }
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
            },
            afterSetOptionOnce(e){
                e.getDom().style.top = '-10px';
                // debugger;
             }
        }
    }
</script>
<style scoped>
    .subtitle a{
        text-decoration: underline;
    }

    .ve-pie div{
        width: 100%!important;
    }
    .list{
        position: relative;
        top: -50px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #ea3939;
    }


</style>