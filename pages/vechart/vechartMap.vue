<template>
    <div class="page-line-chart">
        <h4>地图</h4>
        <!--<ve-map :data="chartData"></ve-map>-->
        <div style="width: 350px; height: 350px; overflow: hidden;">
            <ve-map :data="area.chartData"
                    :settings="area.chartSettings"
                    :extend="area.chartOptions"

                    :after-config="afterConfig"
            ></ve-map>
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
                area:{
                    chartOptions:{
                        legend: {
                            show: false
                        },
                        tooltip: {
                            show: true
                        },
                        toolbox:{
                            feature:{
                                saveAsImage: {
                                    show: true
                                }
                            }

                        },
                        series:{
                            id: 'no',
                            name: 'noBo',
                            roam: true,
                            label:{
                                show: false
                            },
                            selectedMode: 'multiple',
                            markPoint:{
                                symbol: 'rect'
                            }
                        }
                    },
                    chartSettings: {
                        position: 'province/guangdong',
                        label: false,
                        itemStyle: {
                            normal:{
                                areaColor: '#02AEF1',
                                borderWidth: 0
                            }
                        },
                        zoom: 0.3,
                        mapGrid: {
                            top: 10,
                            left: 10
                        }

                    },
                    chartData: {
                        columns: ['位置', '人口'],
                        rows: [
                            // { '位置': '延庆区', '人口': 123 },
                            // { '位置': '密云区', '人口': 1223 },
                            // { '位置': '平谷区', '人口': 2123 },
                            // { '位置': '海淀区', '人口': 4123 }
                        ]
                    }
                }
            };
        },
        methods:{
            afterConfig (options) {
                // debugger;
                return options
            }
        }
    };
</script>

<style scoped>
    h4{
        margin: 10px auto;
        text-align: center;
    }
</style>