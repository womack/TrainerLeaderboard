<template>
  <div id="app">
    <div class="container">
      <LeaderBoard></LeaderBoard>
      <!-- <TrainerSelection v-on:trainerChanged="trainerChanged"></TrainerSelection>
                                    <TrainerData v-bind:trainer="trainer"></TrainerData> -->
  
    </div>
  </div>
</template>

<script>
// import TrainerSelection from "./components/TrainerSelection";
// import TrainerData from "./components/TrainerData";
// export default {
//   name: 'app',
//   components: {
//     TrainerSelection,
//     TrainerData
//   },
//   data() {
//     return {
//       trainer: ""
//     }
//   },
//   methods: {
//     trainerChanged: function (trainer) {
//       this.trainer = trainer;
//     }
//   }
// }
import LeaderBoard from "./components/LeaderBoard";
export default {
  name: "app",
  components: {
    LeaderBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 2000px;
  max-height: 1000px;
  margin: 0 auto;
}
</style>
