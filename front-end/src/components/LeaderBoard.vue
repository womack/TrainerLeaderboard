<template>
    <div class="leaderBoard">
        <div class="container">
            <div class="Chart__list">
                <div class="Chart">
                    <h2>Linechart</h2>
                    <line-chart :data="dummyData" :label="labelz">
                    </line-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LineChart from "./Chart";

export default {
    components: {
        LineChart
    },
    data() {
        return {
            dummyData: [{
                label: 'Data One',
                backgroundColor: '#FC2525',
                data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
                label: 'Data Two',
                backgroundColor: '#05CBE1',
                data: [60, 55, 32, 10, 2, 12, 53]
            }],
            labelz: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        }
    },
    trainers: [],
    methods: {
        loadTrainers: function () {
            this.$http.get("http://192.168.0.23:3000/api/trainers")
                .then((response) => {
                    this.trainers = response.data;
                });
        }
    },
    created: function () {
        this.loadTrainers();
    }
};



</script>

<style>

</style>
