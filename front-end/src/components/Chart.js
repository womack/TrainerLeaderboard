import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;
export default Bar.extend({
    mixins: [reactiveProp],
    mounted() {
        this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false })
    }
})


/*[
                {
                    label: 'Data One',
                    backgroundColor: '#FC2525',
                    data: [40, 39, 10, 40, 39, 80, 40]
                }, {
                    label: 'Data Two',
                    backgroundColor: '#05CBE1',
                    data: [60, 55, 32, 10, 2, 12, 53]
                }*/