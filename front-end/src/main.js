//Dependencies
import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

//Components
import App from './App'
import LeaderBoard from "./components/LeaderBoard";
import TrainerProfiles from "./components/TrainerProfiles"
//config
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
/* eslint-disable no-new */

//routes
const routes = [
  {
    path: "/", component: LeaderBoard
  },
  {
    path: "/leaderboard", component: LeaderBoard
  },
  {
    path: "/profiles", component: TrainerProfiles
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
})
//startup
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
