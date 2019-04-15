<template>
    <div>
        <div class="title-box">
            <span class="title">2015年部门绩效收入</span>
        </div>
        <ve-pie
                width='100%'
                height="300px"
                :settings = "chartSettings"
                :extend="chartExtend"
                :data="chartData"


                :after-config="afterConfig"
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
    export default {
        data () {
            this.chartExtend = {
                series:{
                    // radius: 120
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
                    formatter: "{s1|{b}}:{d}%",
                    rich:{
                        s1:{
                            width: '50%',
                            height: 60,
                            lineHeight: 30,
                            color:'#ea3939'
                        }
                    }
                },

                labelMap: {
                    Order: '下单用户'
                }
            };
            return {
                chartData: {
                    columns: ['名称',  'Order'],
                    rows: [
                        { '名称': '经纪业务线', 'Order': 2793 },
                        { '名称': '融资融券部', 'Order': 530 },
                        { '名称': '投资银行总部', 'Order': 623 },
                        { '名称': '债券投资部', 'Order': 323 },
                        { '名称': '衍生品部', 'Order': 492 },
                        { '名称': '研究结构线', 'Order': 193 }
                    ]
                }
            }
        },
        methods: {
            afterConfig (options) {
                options.series[0].minShowLabelAngle = 300;
                debugger;
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