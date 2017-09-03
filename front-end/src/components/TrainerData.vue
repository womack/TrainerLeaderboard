<template>
    <div class="trainerData">
        <div class="container">
            <ul class="media-list">
                <li class="media" v-for="week in feedback">
                    <div class="media-body">
                        <h4 class="media-heading"> <b>{{week.title}}</b></h4>
                        <h5>Date: {{week.date}}</h5>
                        <p>Attendees: {{week.traineeCount}}</p>
                        <p>TQI: {{week.tqi}}</p>
                        <p>Average Knowledge Score: {{week.avgK}}</p>
                        <p>Average Reccomendation Score: {{week.avgR}}</p>                        
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import logic from "../logic/TrainerLogic";

export default {
    name: "trainerdata",
    props: ["trainer"],
    data() {
        return {
            feedback: []
        }
    },
    methods: {
        updateTrainer: function(trainer) {
            this.$http.get("http://192.168.0.23:3000/api/trainers?name=" + trainer)
                .then((response) => {
                    //get average from data, should have this done somewhere else.
                    // store the entire results object somewhere then do work on it
                    let tmp = logic.getFeedback(response.data);
                    logic.determineAverages(tmp);
                    logic.determineTQI(tmp);
                    this.feedback = tmp;                    
                });
        }
    },
    //Causes an issue since there isnt a trainer selected by default, dont think it should select one either, so disabling for now.
    // created: function() {
    //     this.updateTrainer(this.trainer);
    // },
    watch: {
        trainer: function(val) {
            this.updateTrainer(val);
        }
    }
}

</script>

<style scoped>
.media-object {
    width: 1880px;
    padding: 10px;
}

.media {
    border-top: 1px solid lightgray;
    padding-top: 20px;
}
</style>