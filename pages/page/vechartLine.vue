<template>
    <ve-line :data="chartData" :options='options'  width="90%" :log="log" ></ve-line>
</template>

<script>
    import 'v-charts/lib/style.css';
    export default {
        data: function () {
           this.options={
              colors:['red']
            };
            this.colors = ['#ea3939'];
            this.log = true;
            this.loading= true;
            this.empty = true;
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