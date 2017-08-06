<template>
    <div class="leaderBoard">
        <div class="container">
            <div class="Chart__list">
                <div class="Chart">
                    <h2>Leaderboard</h2>
                    <chart :chart-data="datacollection" :label="labels">
                    </chart>
    
                </div>
                <div class="date">
                    <select v-model="monthSelected" v-on:change="fillData()">
                        <option v-for="month in months" v-bind:value="month.value">
                            {{month.text}}
                        </option>
                    </select>
                    <select v-model="yearSelected" v-on:change="fillData()">
                        <option v-for="year in years" v-bind:value="year">
                            {{year}}
                        </option>
                    </select>
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
            datacollection: null,
            monthSelected: new Date().getMonth(), //this would be genereated on current date
            yearSelected: new Date().getFullYear(),
            months: [
                { text: "January", value: 0 },
                { text: "Febuary", value: 1 },
                { text: "March", value: 2 },
                { text: "April", value: 3 },
                { text: "May", value: 4 },
                { text: "June", value: 5 },
                { text: "July", value: 6 },
                { text: "August", value: 7 },
                { text: "September", value: 8 },
                { text: "October", value: 9 },
                { text: "November", value: 10 },
                { text: "December", value: 11 }],
            years: [2017, 2018, 2019, 2020, 2021, 2022],
            labels: [],
            trainers: [],
        }
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: logic.getGraphLabels(this.trainers),
                datasets: [
                    // {
                    //     label: 'TQI',
                    //     backgroundColor: '#f87979',
                    //     data: logic.getData(this.trainers, "tqi", this.getSelectedDate())
                    // }, 
                    {
                        label: 'Average Knowledge Score',
                        backgroundColor: '#4169e1',
                        data: logic.getAverageScore(this.trainers, "kScore", this.getSelectedDate())
                    },
                    {
                        label: 'Average Reccomendation Score',
                        backgroundColor: '#fF7979',
                        data: logic.getAverageScore(this.trainers, "rScore", this.getSelectedDate())
                    }
                ]
            }
        },
        loadTrainers() {
            this.$http.get("http://192.168.0.23:3000/api/trainers")
                .then((response) => {
                    this.trainers = response.data;
                    this.fillData();
                });
        },
        getSelectedDate() {
            return `${this.monthSelected + 1}${this.yearSelected.toString().substring(2, 4)}`;
        }
    },
    created() {
        this.loadTrainers();
    }
};



</script>

<style>

</style>
