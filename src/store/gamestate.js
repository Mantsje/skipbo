import Player from "@/assets/js/core/Player";
import DrawPile from "@/assets/js/core/DrawPile";
import Pile, { PileVisibility } from "../assets/js/core/Pile";
import { validateMoveTargets, isValidMove } from "@/assets/js/controller/gamerules";
import { Type } from "@/assets/js/controller/Selection";

import router from "@/router/index";

let state = {
	activePlayer: -1, // int (index)
	players: [], // List[Player]
	deck: null, // DrawPile
	completedPacks: null, // Pile
	playPiles: [] // List[Pile]
};

let mutations = {
	wipeCurrent(state) {
		state.activePlayer = -1;
		state.players = [];
		state.deck = null;
		state.completedPacks = null;
		state.playPiles = [];
	},
	generateNewFromSettings(state, settings) {
		for (let i = 0; i < settings.game.nPlayers; i++) {
			state.players.push(new Player(settings.meta.playerDiscardPiles, settings.meta.playerHandSize));
		}
		for (let i = 0; i < settings.meta.playablePiles; i++) {
			state.playPiles.push(new Pile(PileVisibility.ALL));
		}
		state.deck = new DrawPile(settings.meta.deckPacks, settings.meta.deckSkipbos);
		state.completedPacks = new Pile(PileVisibility.ALL);
	},
	init(state, settings) {
		for (let i = 0; i < state.players.length; i++) {
			let goalCards = state.deck.draw(settings.game.playerGoalPileSize);
			state.players[i].receiveGoalCards(goalCards);
		}
		for (let i = 0; i < state.players.length; i++) {
			state.players[i].fillHand(state.deck);
		}
		state.activePlayer = 0;
	},
	move(state, { selected, target }) {
		let cardToPlay = selected.value;
		let player = state.players[state.activePlayer];
		if (selected.type == Type.PILE) {
			// If we selected a pile, take the top card
			cardToPlay = cardToPlay.draw()[0];
		}
		// Target is already ensured to be a pile, otherwise this move wouldn't be valid
		let targetPile = target.value;

		if (selected.playerHandIdx >= 0) {
			// If it is a card from the player's hand
			player.playCardFromHand(selected.playerHandIdx, targetPile);
		} else {
			// else its either discard pile or goal pile
			player.playCard(cardToPlay, targetPile);
		}

		// If the target pile is a playable pile and now its full, empty it
		if (target.playablePileIdx >= 0 && target.value.size() == 12) {
			state.completedPacks.addMany(target.value.draw(12));
		}
		// If the player's hand is now empty, refill his hand
		if (player.hand.length == 0) {
			player.fillHand(state.deck);
		}
	},
	endTurn(state) {
		state.players[state.activePlayer].fillHand(state.deck);
		state.activePlayer = (state.activePlayer + 1) % state.players.length;
		if (state.deck.size() < state.players[state.activePlayer].hand.length) {
			state.deck.addMany(state.completedPacks.draw(state.completedPacks.size()));
			state.deck.shuffle();
		}
	}
};

let actions = {
	create({ commit, rootState }) {
		commit("wipeCurrent");
		commit("generateNewFromSettings", rootState.settings);
		commit("init", rootState.settings);
	},
	attemptMove({ state, commit }, { selected, target }) {
		return new Promise((resolve, reject) => {
			validateMoveTargets(state.activePlayer, selected, target).then(
				() => {
					if (isValidMove(selected, target)) {
						commit("move", { selected, target });
						if (state.players[state.activePlayer].goalPile.size() == 0) {
							router.push("/results");
						}
						if (target.playerDiscardPileIdx >= 0) {
							commit("endTurn");
						}
						resolve();
					} else {
						reject("Move would violate rules");
					}
				},
				err => {
					reject(err);
				}
			);
		});
	}
};

let getters = {
	inProgress: state => {
		return state.activePlayer >= 0 && state.players.length > 0 && state.deck != null && state.playPiles.length > 0;
	}
};

const gamestate = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
export default gamestate;
