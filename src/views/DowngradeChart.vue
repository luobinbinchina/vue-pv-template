<template>
  <div class="echartDemo">
    <div id="myChart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    const echarts = require('echarts');
    this.showData()
  },
  methods: {
    showData () {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let option = {
            title: {
                text: '降级大盘'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['访问量','降级量','并发量','异常量','超时量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'访问量',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'降级量',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'并发量',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'异常量',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'超时量',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        myChart.setOption(option)
    }
  }
}
</script>

<style lang="css">
  #myChart {
    margin-top: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    height: 600px;
  }
</style>
