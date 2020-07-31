import Vue from "vue";
import Vuex from "vuex";

import gamestate from "@/store/gamestate";
import settings from "@/store/settings";

Vue.use(Vuex);

let state = {};

let mutations = {};

let actions = {};

let modules = {
	settings: settings,
	game: gamestate
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules
});
