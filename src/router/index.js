import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store/index";

import GameSetup from "../views/GameSetup.vue";
import GameView from "../views/GameView.vue";
import Results from "../views/Results.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "GameSetup",
		component: GameSetup
	},
	{
		path: "/results",
		name: "Results",
		component: Results
	},
	{
		path: "/game",
		name: "Game",
		component: GameView,
		beforeEnter: (to, from, next) => {
			let inProgress = store.getters["game/inProgress"];
			if (inProgress) {
				next();
			} else {
				next({ name: "GameSetup" });
			}
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
