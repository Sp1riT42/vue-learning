

<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveData } = mixins
export default {
  name: "ChartCost",
  extends: Doughnut,
  mixins: [reactiveData],
  //props: ['chartdata', 'options'],
  data() {
    return {
      dataChart: {},
      keysDataChart: [],
      valuesDataChart: [],
      colors: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(196, 88, 79, 0.6)',
        'rgba(142, 94, 162, 0.6)',
        'rgba(58, 186, 159, 0.6)'
      ],
      options: {
        legend: {

          position: 'right'
        }}
    }
  },
  created() {
    this.dataChart = this.$store.getters.getChartData
    this.keysDataChart = Object.keys(this.dataChart)
    this.valuesDataChart = Object.values(this.dataChart)

    this.chartData = {
      labels: this.keysDataChart ,
      datasets: [{
        data: this.valuesDataChart,
        label:'graph',
        backgroundColor: this.colors
      }],

    }
  },
  mounted () {
this.renderChart(this.chartData, this.options)
  },

}
</script>

<style scoped>

</style>