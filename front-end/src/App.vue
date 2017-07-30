<template>
  <div class="container" id="app">
    <TrainerSelection v-on:trainerChanged="trainerChanged"></TrainerSelection>
    <TrainerData v-bind:trainer="trainer"></TrainerData>
  </div>
</template>

<script>

import TrainerSelection from "./components/TrainerSelection";
import TrainerData from "./components/TrainerData";


export default {
  name: 'app',
  components: {
    TrainerSelection,
    TrainerData
  },
  data() {
    return {
      trainer: ""
    }
  },
  methods: {
    trainerChanged: function (trainer) {
      this.trainer = trainer;
    }
  }
}
</script>

<style>
#app {
  padding-top: 20px
}
</style>
