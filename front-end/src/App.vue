<template>
  <div id="app">
    <div><router-link to="/profiles">Trainers</router-link></div>
    <div><router-link to="/leaderboard">Leaderboard</router-link></div>    
    <div class="container">
  
      <router-view></router-view>
      <!--  <LeaderBoard></LeaderBoard> -->

    </div>
  </div>
</template>

<script>

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
