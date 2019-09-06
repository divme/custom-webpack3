<template>
  <div class="option-list">
    <div v-for="item in options" :key="item.name" class="option-box" @click="optionClick(item)">
      <svg-icon icon-class="aaa"/>
      <span class="option-name">{{ item.shortName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    optionClick(item, e) {
      this.$store.dispatch('ConfirmCurOption', {
        curOption: item
      })
      if (item.type) {
        switch (item.type) {
          case 'Vanilla':
            this.$router.push({ path: '/optionDetailVanilla' })
            break
          case 'CallPutSpread':
            this.$router.push({ path: '/optionDetailSpread' })
            break
          case 'Digital':
            this.$router.push({ path: '/optionDetail' })
            break
          default:
            this.$router.push({ path: '/optionDetail' })
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .option-list{
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    .option-box{
      flex: 0 0 25%;
      margin: .1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .svg-icon{
        width: .3rem;
        height: .3rem;
      }
      .option-name{
        margin-top: .1rem;
      }
    }
  }
</style>
