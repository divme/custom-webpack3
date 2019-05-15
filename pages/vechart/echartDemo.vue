<template>
    <div>
        <div
                ref='barchart'
                class='echartbox'
                style="width:300px;height:300px"
        >
        </div>
    </div>
</template>

<script>
    import Echarts from "echarts"

    export default {
        name: 'Bar',
        props: {
            textlink: {
                type: String,
                required: false,
                default: ''
            },
            xname: {
                type: String,
                required: false,
                default: ''
            },
            yname: {
                type: String,
                required: false,
                default: ''
            },
            bardata: Object
        },
        data () {
            return {
                link: this.textlink,
                title: '',
                legend_data: [],
                axis_data: [],
                series_data: [],
                x_name: this.xname,
                y_name: this.yname
            }
        },
        watch: {
            bardata (val) {
                this.title = val.title
                this.legend_data = val.legend_data
                this.axis_data = val.Axis_data
                this.series_data = val.series
                this.drawBar()
            }
        },
        mounted () {
            this.drawBar()
        },
        methods: {
            drawBar () {
                // debugger;
                let myCharts = Echarts.init(this.$refs.barchart);
                myCharts.setOption({

                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
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