<template>
  <div ref="select" class="select-box" @click="selectClick">
    <div ref="progress" class="select-progress"/>
  </div>
</template>

<script>
import style from '@/styles/basic-variables-black.scss'
export default {
  name: 'Bar',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    data: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      style: '',
      dataLen: 0,
      cellWidth: 0
    }
  },
  created() {
    this.style = style
    this.$nextTick(function() {
      this.draw()
    })
  },
  mounted() {
  },
  methods: {
    draw() {
      // 初次渲染元素：进度条，刻度mark， 当前刻度mark
      // 1. 计算所需要的变量
      const sbox = this.$refs.select
      const width = parseInt(this.getStyle(sbox, 'width'))
      const length = this.data.length
      const cellWidth = width / (length - 1).toFixed(2)
      const index = this.data.indexOf(this.value)
      this.dataLen = length
      this.cellWidth = width / (length - 1).toFixed(2)
      // 2. 渲染刻度mark; 根据当前值标记当前刻度mark
      let innerStr = ''
      for (let i = 0; i < length; i++) {
        innerStr += '<div class="circle circle' + i + ' ' + (i === index ? 'curCircle' : '') + '" style="left:' + cellWidth * i + 'px; width: ' + cellWidth + 'px;">' +
          '<span class="circle-text circle-text-' + i + '">' + this.data[i] + '</span>' +
          '</div>'
      }
      const div = document.createElement('div')
      div.innerHTML = innerStr
      sbox.appendChild(div)
      // 3. 进度条宽度设置
      this.$refs.progress.style.width = cellWidth * index + 'px'

      // 需要一个 value 和 对应的left   circle元素的转化
    },
    selectClick(e) {
      let target = e.target
      // 兼容对span的点击
      if (target.classList.contains('circle-text')) {
        target = target.parentNode
      }
      if (target.classList.contains('circle')) {
        const oldTarget = target.parentNode.querySelector('.curCircle')
        if (oldTarget) {
          oldTarget.classList.remove('curCircle')
        }
        target.classList.add('curCircle')
        const left = this.getStyle(target, 'left')
        this.$refs.progress.style.width = left
        this.$emit('input', this.data[Math.round(parseInt(left) / this.cellWidth)])
      }
    },
    getStyle(ele, property) {
      return ele.currentStyle ? ele.currentStyle[property] : document.defaultView.getComputedStyle(ele)[property]
    }
  }
}
</script>
<style>
  .select-box{
    position: relative;
    width: 80%;
    height: .06rem;
    margin: .5rem auto;
    background: var(--bg-lighter);
  }
  .select-progress{
    height: .06rem;
    transition: width 300ms;
    background: var(--red);
  }
  .circle{
    position: absolute;
    top: 50%;
    height: .3rem;
    transform: translate(-50%, -50%);
  }
  .circle:before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 0.1rem;
    height: 0.1rem;
    margin: auto;
    border-radius: 50%;
    background: var(--red);
  }
  .circle .circle-text{
    position: absolute;
    top: calc(50% + .22rem );
    left: 0;
    bottom: 0;
    right: 0;
    width: 3em;
    height: 1.2em;
    margin: auto;
    font-size: 12px;
    color: var(--text-dark);
    text-align: center;
  }
  .circle.curCircle:before{
    width: .14rem;
    height: .14rem;
  }
  .circle.cur .circle-text{
    color: var(--text-light);
  }
</style>
