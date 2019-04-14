<template>
    <div>
        <ve-pie :data="chartData" width='90%' :legend-visible="legendVisible"></ve-pie>
        <ul class="list">
            <li class="li li-title">
                <span class="name">部门</span>
                <span class="income">收入（万元）</span>
                <span class="grate">12%</span>
            </li>
            <li class="li">
                <span class="name">经纪业务线</span>
                <span class="income"></span>
                <span class="grate">5.6%</span>
            </li>
            <li class="li">
                <span class="name">投资银行总部</span>
                <span class="income"></span>
                <span class="grate">45.32%</span>
            </li>


            <li class="li">
                <span class="name">融资融券部</span>
                <span class="income"></span>
                <span class="grate">23.2%</span>
            </li>
            <li class="li">
                <span class="name">债券投资部</span>
                <span class="income"></span>
                <span class="grate">25%</span>
            </li>
            <li class="li">
                <span class="name">衍生品部</span>
                <span class="income"></span>
                <span class="grate">65%</span>
            </li>
            <li class="li">
                <span class="name">研究结构线</span>
                <span class="income"></span>
                <span class="grate">12.25%</span>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data () {
            this.legendVisible = false;
            this.chartSettings = {
                labelMap: {
                    Order: '下单用户'
                }
            }
            return {
                chartData: {
                    columns: ['名称',  'Order'],
                    rows: [
                        { '名称': '经纪业务线', 'Order': 1393 },
                        { '名称': '融资融券部', 'Order': 530 },
                        { '名称': '投资银行总部', 'Order': 923 },
                        { '名称': '债券投资部', 'Order': 723 },
                        { '名称': '衍生品部', 'Order': 792 },
                        { '名称': '研究结构线', 'Order': 593 }
                    ]
                }
            }
        }
    }
</script>
<style scoped>
    @import "../utils/reset.css";
    .ve-pie{
        width: 90%;
        margin:10px auto;
    }
    .li{
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        border-bottom:  1px solid #dedede;
    }
</style>