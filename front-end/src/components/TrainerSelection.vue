<template>
    <div class="trainerSelection">
        <div>
            <div class="jumbotron">
                <h2>
                    <span class="glyphicon glyphicon-list-alt"></span>Trainer List</h2>
                <h4> Select trainer</h4>
                <select class="form-control" v-on:change="dateChanged">
                    <option value=""> Please select trainer </option>
                    <option v-for="trainer in trainers" v-bind:value="trainer.id">{{trainer.name}}</option>
                </select>
                <div v-if="trainer">
                    <h6>{{trainer.name}} </h6>
                    <!--<a v-bind:href="source.url" class="btn btn-primary" target="_blank">Go To {{source.name}} Website</a>
                            Will be useful to direct to pages-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "trainerSelection",
    date() {
        return {
            trainers: [],
            trainer: ""
        }
    },
    methods: {
        trainerChanged: function (e) {
            for (let i = 0; i < this.trainers.length; i++) {
                if (this.trainers[i].id == e.target.value) {
                    this.trainer = this.trainers[i];
                }
            }
            this.$emit("trainerChanged", e.target.value);
        }
    },
    created: function () {
        this.$http.get("localhost:3000/api/trainers")
            .then((response) => {
                this.trainers = response.data;
            });
    }
}

</script>

<style scoped>

</style>