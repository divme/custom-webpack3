<template>
  <div ref="barchart" class="echartbox" style="height: 2.4rem"/>
</template>

<script>
import Echarts from 'echarts'
import styles from '@/styles/basic-variables-black.scss'
export default {
  name: 'Bar',
  props: {
    data: {
      type: [Array, Object],
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      style: ''
    }
  },
  created() {
    this.style = styles
  },
  mounted() {
    this.drawBar()
  },
  methods: {
    drawBar() {
      const that = this
      const myCharts = Echarts.init(this.$refs.barchart)
      myCharts.setOption({
        xAxis: {
          type: 'value',
          name: '结算\n价/期\n初价\n(100% )',
          nameGap: 0,
          nameLocation: 'end',
          nameTextStyle: {
            shadowColor: that.style.text,
            shadowBlur: 5,
            shadowOffsetX: -10,
            shadowOffsetY: 10
          },
          min: 90,
          max: 115,
          offset: 10,
          axisLine: {
            show: true,
            lineStyle: {
              color: that.style.textDark
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: that.style.text
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: that.style.textDark,
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '收益(%)',
          splitNumber: 3,
          min: -0.5,
          max: 4.5,
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: that.style.textDark
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: that.style.text
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          type: 'line',
          data: that.data
        }]
      })
      window.addEventListener('resize', function() {
        myCharts.resize()
      })
    }
  }
}
</script>
