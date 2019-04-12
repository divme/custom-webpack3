<template>
    <ve-line :data="chartData" :colors="colors"  width="90%"></ve-line>
</template>

<script>

    export default {
        data: function () {
            this.colors = ['#ea3939','greenyellow'];
            return {
                chartData: {
                    columns: ['日期', '销售额'],
                    rows: [
                        { '日期': '1月1日', '销售额': 123 },
                        { '日期': '1月2日', '销售额': 1223 },
                        { '日期': '1月3日', '销售额': 2123 },
                        { '日期': '1月4日', '销售额': 4123 },
                        { '日期': '1月5日', '销售额': 3123 },
                        { '日期': '1月6日', '销售额': 7123 }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
  .ve-line{
      margin: 10px auto;
  }
</style>