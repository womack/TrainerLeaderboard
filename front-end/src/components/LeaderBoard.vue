<template>
    <div class="leaderBoard">
        <div class="container">
            <div class="Chart_list">
                <div class="Chart">
                    <h2>Leaderboard</h2>
                    <chart :chart-data="datacollection" :width="1125" :height="600" :options="{responsive: false, maintainAspectRatio: false,  scales: { yAxes: [{  ticks: { beginAtZero: false, stepSize: 1 } }]} }" :label="labels">
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
            <div class="ranking"> 
        <div> <h3>Knowledge Score</h3>
        <ol id="kScore">
            <li v-for="trainer in kScoreRanking">
            {{trainer.name}} - <b> {{trainer.score}}</b>
            </li>
        </ol>
        </div>
        <div> <h3>Recomendation Score</h3>
        <ol id="rScore">
            <li v-for="trainer in rScoreRanking">
            {{trainer.name}} - <b> {{trainer.score}}</b>
            </li>
        </ol>
        </div>
        <div> <h3>TQI </h3>
        <ol id="tqiScore">
            <li v-for="trainer in tqiScoreRanking">
            {{trainer.name}} - <b> {{trainer.score}}</b>
            </li>
        </ol>
        </div>

        </div>
    </div>
   
</template>

<script>
import Chart from "./Chart";
import logic from "../logic/TrainerLogic";
const ip = require("../privates").ip;

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
            currentResults: {},
                 tqiScoreRanking: [{name:"Jeff"}, {name:"Bob"}],
      rScoreRanking : [{name:"Jeff"}, {name:"Bob"}],
      kScoreRanking:[{name:"Jeff"}, {name:"Bob"}] 
        }
    },
    methods: {
        fillData() {
            //Graph work
            this.currentResults = logic.getAverageScore(this.trainers, this.getSelectedDate());
            this.datacollection = {
                labels: this.currentResults.names,
                datasets: [
                    {
                        label: 'Average Knowledge Score',
                        backgroundColor: '#4169e1',
                        data: this.currentResults.results.kScore
                    },
                    {
                        label: 'Average Recomendation Score',
                        backgroundColor: '#fF7979',
                        data: this.currentResults.results.rScore
                    },                    
                    {
                        label: 'Average TQI ',
                        backgroundColor: '#000000',
                        data: this.currentResults.results.tqi
                    }
                ]
            }
            //Rankings work
            this.tqiScoreRanking = logic.getRanking(this.currentResults,"tqi");
            this.rScoreRanking = logic.getRanking(this.currentResults,"rScore");
            
            this.kScoreRanking = logic.getRanking(this.currentResults,"kScore");
            
        },
        loadTrainers() {
            this.$http.get(`http://${ip}:3000/api/trainers`)
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
