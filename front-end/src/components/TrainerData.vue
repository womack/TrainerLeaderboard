<template>
    <div class="trainerData">
        <div class="container">
            <ul class="media-list">
                <li class="media" v-for="week in feedback">
                    <div class="media-body">
                        <h4 class="media-heading"> {{week.title}}</h4>
                        <h5>Date: {{week.date}}</h5>
                        <p>Attendees: {{week.totalAttendees}}</p>
                        <p>TQI: {{week.tqi}}</p>
                        <p>Average: {{week.avg}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import logic from "../logic/TrainerLogic"
let jsonObj = {};
export default {
    name: "trainerdata",
    props: ["trainer"],
    data() {
        return {
            feedback: []
        }
    },
    methods: {
        getFeedback: logic.getFeedback,
        updateTrainer: function (trainer) {
            this.$http.get("http://192.168.0.23:3000/api/trainers?name=" + trainer)
                .then((response) => {
                    this.feedback = this.getFeedback(response.data);
                });
        }
    },
    created: function () {
        this.updateTrainer(this.trainer);
    },
    watch: {
        trainer: function (val) {
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