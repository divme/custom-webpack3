<template>
    <div>
        <basic-topbar title="财务绩效分析一"></basic-topbar>
        <basic-title :title="pageTitle">
            <template v-slot:subLeft>
                <span>单位：万元</span>
            </template>
        </basic-title>
        <ve-pie
                width='100%'
                height="300px"
                :settings = "chartSettings"
                :extend="chartExtend"
                :data="chartData"


                :after-config="afterConfig"
                :before-config="beforeConfig"
        >
        </ve-pie>
        <div class="list">
            <ul class="list-name">
                <li class="li li-title">
                    <span class="name">部门</span>
                </li>
                <li class="li">
                    <span class="name">经纪业务线</span>
                </li>
                <li class="li">
                    <span class="name">投资银行总部</span>
                </li>


                <li class="li">
                    <span class="name">融资融券部</span>
                </li>
                <li class="li">
                    <span class="name">债券投资部</span>
                </li>
                <li class="li">
                    <span class="name">衍生品部</span>
                </li>
                <li class="li">
                    <span class="name">研究结构线</span>
                </li>
            </ul>
            <ul class="list-income">
                <li class="li li-title">

                    <span class="income">收入（万元）</span>

                </li>
                <li class="li">

                    <span class="income">111</span>
                </li>
                <li class="li">
                    <span class="income">333</span>
                </li>


                <li class="li">
                    <span class="income">32131</span>
                </li>
                <li class="li">
                    <span class="income">456</span>
                </li>
                <li class="li">
                    <span class="income">762</span>
                </li>
                <li class="li">
                    <span class="income">846</span>
                </li>
            </ul>
            <ul class="list-grate">
                <li class="li li-title">
                    <span class="grate">12%</span>
                </li>
                <li class="li">
                    <span class="grate">5.6%</span>
                </li>
                <li class="li">
                    <span class="grate">45.32%</span>
                </li>


                <li class="li">
                    <span class="grate">23.2%</span>
                </li>
                <li class="li">
                    <span class="grate">25%</span>
                </li>
                <li class="li">
                    <span class="grate">65%</span>
                </li>
                <li class="li">
                    <span class="grate">12.25%</span>
                </li>
            </ul>
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
            this.pageTitle = '2015年部门绩效收入（饼图）';
            this.title = {
                text: 'I am title'
            };

            this.chartExtend = {
                color: ['#5eb8c0', '#92cddd', '#05c9dd', '#01c082', '#fdd006', '#fd8001', '#ff4648', '#466177'],
                series:{
                    radius: 110,
                    center: ['50%', 140]
                }
            };
            this.chartSettings = {
                radius: 80,
                legendLimit: 5,
                offsetY: 120,
                labelLine:{
                    show: true,
                    length: 0,
                    length2: 5,
                    lineStyle:{
                        color: '#fff'
                    }
                },
                label:{
                    formatter: function(params){
                        var str = params.name + ':\n'+ params.percent +'%';
                        if(params.percent < 12){
                            str = ''
                        }

                        return str
                    },
                    height: 10,
                    lineHeight: 20,
                    align: 'left',
                    verticalAlign: 'bottom',
                    rich:{
                        s1:{
                            width: '80%',
                            lineHeight: 30,
                            color:'#ea3939'
                        }
                    }
                }
            };
            return {
                chartData: {
                    columns: ['Name',  'Order'],
                    rows: [
                        { 'Name': '经纪业务线', 'Order': 1156347.45, label:{
                                show: false
                            }},
                        { 'Name': '融资融券部', 'Order': 338705.14 },
                        { 'Name': '投资银行总部', 'Order': 95051.87 },
                        { 'Name': '投资管理部', 'Order': 89832.83 },
                        { 'Name': '债券投资部', 'Order': 53316.98 },
                        { 'Name': '债券融资总部', 'Order': 52930.28 },
                        { 'Name': '衍生品部', 'Order': 39582.41 },
                        { 'Name': '研究结构线', 'Order': 31612.91 },
                        { 'Name': '新三板业务总部', 'Order': 117.86 }
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