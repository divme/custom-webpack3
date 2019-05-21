<template>
    <div class="page-line-chart">
        <h4>地图</h4>
        <!--<ve-map :data="chartData"></ve-map>-->
        <div style="width: 350px; height: 350px; overflow: hidden;">
            <ve-map :data="beijing.chartData" :settings="beijing.chartSettings" :extend="beijing.chartOptions"></ve-map>
        </div>

    </div>
</template>

<script>
    export default {
        data() {

            return {

                chartData: {
                    columns: ['位置', '税收', '人口', '面积'],
                    rows: [
                        { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
                        { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
                        { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
                        { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
                    ]
                },
                beijing:{
                    chartOptions:{
                        legend: {
                            show: false
                        },
                        tooltip: {
                            show: true
                        },
                        series:{
                            id: 'no',
                            name: 'noBo',
                            roam: true,
                            label:{
                                show: false
                            },
                            selectedMode: 'multiple',
                            itemStyle:{
                                // areaColor: 'yellow',
                                // color: '#eee'
                            },
                            markPoint:{
                                symbol: 'rect'
                            }
                        }
                    },
                    chartSettings: {
                        position: 'province/beijing',
                        label: false,
                        labelMap: {

                        },
                        zoom: 1,
                        mapGrid: {
                            top: 10,
                            left: 10
                        }

                    },
                    chartData: {
                        columns: ['位置', '人口'],
                        rows: [
                            { '位置': '延庆区', '人口': 123 },
                            { '位置': '密云区', '人口': 1223 },
                            { '位置': '平谷区', '人口': 2123 },
                            { '位置': '海淀区', '人口': 4123 }
                        ]
                    }

                }
            };
        }
    };
</script>

<style scoped>
    h4{
        margin: 10px auto;
        text-align: center;
    }
</style>