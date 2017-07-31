<template>
    <div class="leaderBoard">
        <div class="container">
            <div class="Chart__list">
                <div class="Chart">
                    <h2>Linechart</h2>
                    <chart :chart-data="datacollection" :label="labels">
                    </chart>
                    <button @click="fillData()">Randomize</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Chart from "./Chart";
import logic from "../logic/TrainerLogic"

export default {
    components: {
        Chart
    },
    data() {
        return {
            datacollection: null
        }
    },
    trainers: [],
    methods: {
        fillData() {
            this.datacollection = {
                labels: logic.getGraphLabels(this.trainers),
                datasets: [
                    {
                        label: 'TQI',
                        backgroundColor: '#f87979',
                        data: logic.getData(this.trainers, "tqi")
                    }, {
                        label: 'Average Knowledge Score',
                        backgroundColor: '#f87979',
                        data: logic.getAverageScore(this.trainers, "kScore")
                    },
                    {
                        label: 'Average Reccomendation Score',
                        backgroundColor: '#f87979',
                        data: logic.getAverageScore(this.trainers, "rScore")
                    }
                ]
            }
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        },
        loadTrainers() {
            this.$http.get("http://192.168.0.23:3000/api/trainers")
                .then((response) => {
                    this.trainers = response.data;
                    this.fillData();
                });
        }
    },
    created() {
        this.loadTrainers();
    }
};



</script>

<style>

</style>
