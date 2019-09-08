<template>
  <div ref="cbox" class="canvas-box">
    <canvas id="canvas" ref="canvas"/>
  </div>
</template>

<script>
  import style from '@/styles/basic-variables-black.scss'
  export default {
    name: 'Bar',
    props: {
      data: {
        type: [Array, Object],
        required: true,
        default() {
          return []
        }
      },
      option: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        style: ''
      }
    },
    computed: {
      chartOption() {
        const that = this
        const defaultOption = {
          axisColor: that.style.textDark,
          lineColor: that.style.red,
          textDark: that.style.textDark,

          xname: '结算价/期初价(%)',
          yname: '收益(%)',
          dataPoint: [100, 0],
          labelName: [
            {
              name: '执行价',
              value: [105, 0],
              position: 'top',
              offset: 15
            },
            {
              name: '敲出价',
              value: [105, 0],
              position: 'top',
              offset: 15
            }
          ],
          strikePrice: 105,
          strikeName: '执行价',
          outPrice: 110,
          outEarning: 2.5,
          outName: '敲出价'
        }
        // const obj = Object.assign({}, defaultOption, that.option)

        // const keys = Object.keys(defaultOption)
        // const obj = {}
        // keys.forEach(function(key) {
        //   if (that.option.hasOwnProperty(key)) {
        //     obj[key] = that.option[key]
        //   } else {
        //     obj[key] = defaultOption[key]
        //   }
        // })
        return Object.assign({}, defaultOption, that.option)
      }
    },
    watch: {
      data() {
        this.drawBar()
      },
      chartOption() {
        if (this.data.length < 1) return
        this.drawBar()
      }
    },
    created() {
      this.style = style
    },
    mounted() {
      if (this.data.length < 1) return
      this.drawBar()
    },
    methods: {
      // 1. 数据数组排序
      // 2. 确定数据横纵坐标 max min
      // 3. 确定图中坐标max min
      // 4. 依据2/3, 转换原点坐标，绘制x/y轴，并标注其名称
      // 5. 依据2/3，将数据数组依次转换为坐标数组，并依次绘制：
      //      绘制走势图
      //      绘制坐标tick，label
      //      绘制纵坐标到x轴的虚线
      //      标注执行价，敲出价，并绘制敲出价点的横纵坐标到x y轴的虚线
      //      绘制敲出后收益
      drawBar() {
        const that = this
        const cbox = this.$refs.cbox
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const width = parseInt(this.getStyle(cbox, 'width'))
        const height = parseInt(this.getStyle(cbox, 'height'))
        const pRatio = window.devicePixelRatio || 1
        canvas.width = width * pRatio
        canvas.height = height * pRatio
        ctx.scale(pRatio, pRatio)
        canvas.style.transform = 'scale(' + 1 / pRatio + ',' + 1 / pRatio + ')'

        // 从option中存储一些数据，方便书写
        const dataPoint = that.chartOption.dataPoint

        // 1. 数据排序
        const length = this.data.length
        const dataX = []
        const dataY = []
        for (let i = 0; i < length; i++) {
          dataX.push(this.data[i][0])
          dataY.push(this.data[i][0])
        }

        const xArr = []
        const yArr = []
        this.data.forEach(function(cur) {
          xArr.push(cur[0])
          yArr.push(cur[1])
        })
        const xMin = Math.min(...xArr)
        const xMax = Math.max(...xArr)
        const yMin = Math.min(...yArr)
        const yMax = Math.max(...yArr)
        // 2. 确定数据横纵坐标范围, 边界即原点
        const minX = Math.floor(xMin) > dataPoint[0] ? dataPoint[0] : Math.floor(xMin)
        const maxX = Math.ceil(xMax) < dataPoint[0] ? dataPoint[0] : Math.ceil(xMax)
        const minY = Math.floor(yMin) > dataPoint[1] ? dataPoint[1] : Math.floor(yMin)
        const maxY = Math.ceil(yMax) < dataPoint[1] ? dataPoint[1] : Math.ceil(yMax)
        const difX = maxX - minX
        const difY = maxY - minY

        // 3. 确定绘制区域范围
        const startH = width * 0.05
        const endH = width * 0.7
        const startV = height * 0.05
        const endV = height * 0.9
        const difH = endH - startH
        const difV = endV - startV

        // 4. 依据2、3, 转换原点坐标，绘制x/y轴，并标注其名称
        const coordPoint = conversion(dataPoint)
        renderCoord(coordPoint)

        // 5. 依据2/3，将数据数组依次转换为坐标数组，并依次绘制：
        //    绘制走势图
        //    绘制坐标tick，label
        //    绘制纵坐标到x轴的虚线
        //    标注执行价，敲出价，并绘制敲出价点的横纵坐标到x y轴的虚线
        //    绘制敲出后收益
        const coordData = this.data.map(function(cur) {
          return conversion(cur)
        })
        // 绘制走势图
        // 二元期权等，会出现同一横坐标出现俩纵坐标，需分段展示
        let lastX = 0
        coordData.forEach(function(cur, index) {
          if (index === 0) {
            ctx.beginPath()
            lastX = cur[0]
            return ctx.moveTo(cur[0], cur[1])
          }
          if (cur[0] === lastX) {
            ctx.moveTo(cur[0], cur[1])
          } else {
            ctx.lineTo(cur[0], cur[1])
          }
          lastX = cur[0]
          if (index === length - 1) {
            ctx.lineWidth = 2
            ctx.strokeStyle = that.chartOption.lineColor
            ctx.stroke()
            ctx.closePath()
          }
        })
        // 绘制横坐标 tick label
        // 绘制纵坐标到x轴的虚线
        coordData.forEach(function(cur, index) {
          // 横坐标在原点上，则 横坐标上不画刻度，纵坐标也不画刻度
          if (that.data[index][0] !== dataPoint[0]) {
            // 绘制刻度
            ctx.beginPath()
            ctx.moveTo(cur[0], coordPoint[1])
            ctx.lineTo(cur[0], coordPoint[1] - 2)

            ctx.moveTo(coordPoint[0], cur[1])
            ctx.lineTo(coordPoint[0] - 2, cur[1])

            ctx.lineWidth = 1.0
            ctx.strokeStyle = that.chartOption.textDark
            ctx.stroke()

            // 绘制刻度label
            ctx.fillStyle = that.chartOption.textDark
            ctx.textAlign = 'center'
            ctx.fillText(that.data[index][0], cur[0], coordPoint[1] - 10)
            ctx.fillText(that.data[index][1], coordPoint[0] - 20, cur[1] + 10)

            // 绘制对应点虚线,敲出价还要画到y轴的虚线，在敲出价的时候判断
            ctx.beginPath()
            ctx.moveTo(cur[0], cur[1])
            ctx.lineTo(cur[0], coordPoint[1])
            ctx.setLineDash([5, 2])
            ctx.lineWidth = 1
            ctx.stroke()
          } else {
            ctx.beginPath()
            ctx.fillStyle = that.chartOption.textDark
            ctx.textAlign = 'left'
            ctx.fillText(that.data[index][0], cur[0], coordPoint[1] - 10)
          }

          // 标注执行价、敲出价
          if (that.data[index][0] === that.chartOption.strikePrice) {
            ctx.fillText(that.chartOption.strikeName, cur[0], coordPoint[1] - 24)
          } else if (that.data[index][0] === that.chartOption.outPrice) {
            ctx.beginPath()
            ctx.moveTo(cur[0], cur[1])
            ctx.lineTo(coordPoint[0], cur[1])
            ctx.setLineDash([5, 2])
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.fillText(that.chartOption.outName, cur[0], coordPoint[1] - 24)
          }
        })

        // 绘制敲出后收益: 绘制敲出收益横纵坐标；绘制收益line
        var outEarningV = conversion([that.chartOption.outPrice, that.chartOption.outEarning])
        ctx.beginPath()
        ctx.moveTo(outEarningV[0], outEarningV[1])
        ctx.lineTo(width, outEarningV[1])
        ctx.lineWidth = 2
        ctx.setLineDash([5, 0])
        ctx.strokeStyle = that.chartOption.lineColor
        ctx.stroke()
        // 绘制刻度label
        ctx.fillStyle = that.chartOption.textDark
        ctx.textAlign = 'center'
        if (dataX.indexOf(that.chartOption.outPrice) < 0) {
          ctx.fillText(that.chartOption.outPrice, outEarningV[0], coordPoint[1])
        }
        ctx.fillText(that.chartOption.outEarning, coordPoint[0] - 10, outEarningV[1])

        // 根据原点坐标位置，绘制坐标系函数
        function renderCoord(point) {
          point = point || [0, 0]
          // y轴
          ctx.beginPath()
          ctx.moveTo(point[0], 0)
          ctx.lineTo(point[0], height)

          ctx.moveTo(point[0] - 5, 5)
          ctx.lineTo(point[0], 0)

          ctx.moveTo(point[0] + 5, 5)
          ctx.lineTo(point[0], 0)

          // x轴 y轴 名字
          ctx.fillStyle = that.chartOption.textDark
          ctx.fillText(that.chartOption.xname, width - 80, point[1] + 15)
          ctx.fillText(that.chartOption.yname, point[0] - 50, startV)

          // x轴
          ctx.moveTo(0, point[1])
          ctx.lineTo(width, point[1])

          ctx.moveTo(width - 5, point[1] - 5)
          ctx.lineTo(width, point[1])

          ctx.moveTo(width - 5, point[1] + 5)
          ctx.lineTo(width, point[1])

          ctx.strokeWidth = 0.5
          ctx.strokeStyle = that.chartOption.axisColor
          ctx.stroke()
          ctx.closePath()
        }
        // 数据转化为坐标
        function conversion(cur) {
          const arr = []
          arr[0] = startH + (cur[0] - minX) * (difH / difX)
          arr[1] = startV + (maxY - cur[1]) * (difV / difY)
          return arr
        }
      },
      getStyle(ele, property) {
        return ele.currentStyle ? ele.currentStyle[property] : document.defaultView.getComputedStyle(ele)[property]
      }
    }
  }
</script>
<style scoped>
  .canvas-box{
    position: relative;
    height: 2.5rem;
    text-align: center;
    overflow: hidden;
  }
  #canvas{
    transform-origin: top left;
  }
</style>
