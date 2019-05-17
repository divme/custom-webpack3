<template>
    <div>
        <div
                ref='barchart'
                class='echartbox'
                style="height:300px"
        >
        </div>
    </div>
</template>

<script>
    import Echarts from "echarts"

    export default {
        name: 'Bar',

        data () {
            return {

            }
        },
        watch: {

        },
        mounted () {
            this.drawBar()
        },
        methods: {
            drawBar () {
                // debugger;
                let myCharts = Echarts.init(this.$refs.barchart);
                myCharts.setOption({
                    toolbox:{
                        show: true,
                        feature: {
                            // dataZoom: {
                            //     yAxisIndex: 'none'
                            // },
                            // dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            // restore: {},
                            saveAsImage: {}
                        }
                    },
                    brush:{
                      toolbox: ['rect']
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        }
                    ],
                    visualMap:{
                        orient: 'horizontal',
                        left: 'center',
                        min: 800,
                        max: 1400,
                        // range: [900, 1000],
                        itemWidth: 5,
                        itemHeight: 120,
                        text: ['High Score', 'Low Score'],
                        // Map the score column to color
                        dimension: 1,
                        inRange: {
                            color: ['#3a3939', '#E15457']
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisTick:{
                            alignWithLabel: true
                        },
                        axisLabel:{
                             // show: false
                        },
                        axisLine:{
                             // show: false,
                             lineStyle:{
                                 // color: 'red'
                             }
                        },

                        data: [{
                            value: 'Mon',
                            textStyle:{
                                color: '#333'
                            }
                        }, 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{
                            // show: true,
                            alignWithLabel: true
                        },
                        axisLine:{
                            show: true
                        },
                        splitLine:{
                            show: false
                        },
                        splitArea:{
                            show: false
                        }
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });
                window.addEventListener('resize', function () {
                    myCharts.resize()
                })
            }
        }
    }
</script>