let state = {
	meta: {
		playablePiles: 4,
		deckPacks: 12,
		deckSkipbos: 18,

		playerDiscardPiles: 4,
		playerHandSize: 5
	},

	game: {
		playerGoalPileSize: 20,
		nPlayers: 2
	}
};

let mutations = {
	updateMetaSettings(state, data) {
		state.meta.playablePiles = Number(data.playablePiles);
		state.meta.deckPacks = Number(data.deckPacks);
		state.meta.deckSkipbos = Number(data.deckSkipbos);
		state.meta.playerDiscardPiles = Number(data.playerDiscardPiles);
		state.meta.playerHandSize = Number(data.playerHandSize);
	},
	updateGameSettings(state, data) {
		state.game.playerGoalPileSize = Number(data.playerGoalPileSize);
		state.game.nPlayers = Number(data.nPlayers);
	}
};

let actions = {};

let getters = {};

const settings = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
export default settings;
