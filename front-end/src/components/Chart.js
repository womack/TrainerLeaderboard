import { Line } from 'vue-chartjs'
export default Line.extend({
    props: ["data", "label"],
    mounted() {
        this.renderChart({
            labels: this.label,
            datasets: this.data
        }, { responsive: true, maintainAspectRatio: false })
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