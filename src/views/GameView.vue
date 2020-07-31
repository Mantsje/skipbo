<template>
	<div class="game-view">
		<div class="menu-bar topnav">
			<img alt="Skipbo logo" src="../assets/img/skipbo-logo.png" />
			<span>Current player: {{ activePlayer }}</span>
		</div>
		<div class="board">
			<centre-board :selected="selected" v-on:selected="handleSelected" />
			<player
				:index="activePlayer"
				:selected="selected"
				v-on:selected="handleSelected"
				:player="players[activePlayer]"
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
// Datastructures
import Selection, { Type } from "@/assets/js/controller/Selection";
// Components
import CentreBoard from "@/components/CentreBoard";
import Player from "@/components/Player";

const DEFAULT_SELECTION = new Selection(null, Type.CARD);

export default {
	name: "GameView",
	components: {
		CentreBoard,
		Player
	},
	data() {
		return {
			selected: DEFAULT_SELECTION,
			target: DEFAULT_SELECTION
		};
	},
	computed: {
		...mapState({
			activePlayer: state => state.game.activePlayer,
			players: state => state.game.players
		})
	},
	methods: {
		handleSelected(selection) {
			if (!selection.isValid()) {
				console.error("Selection object is not valid", selection);
			} else if (this.selected === DEFAULT_SELECTION) {
				// If current selected (initial target) s still empty
				if (selection.type == Type.PILE && selection.value.isEmpty()) {
					// If the selection is an empty pile, don't select it
					return false;
				}
				this.selected = selection;
			} else if (this.target === DEFAULT_SELECTION) {
				// Else (there is a selected), so this second selection is a target
				if (this.selected.equals(selection)) {
					// If it is the same thing, deselect the initial one
					this.selected = DEFAULT_SELECTION;
					return false;
				}
				this.target = selection;
				// Else attempt a move using the selected and applying it to the target
				this.$store.dispatch("game/attemptMove", { selected: this.selected, target: this.target }).then(
					() => {
						this.selected = DEFAULT_SELECTION;
						this.target = DEFAULT_SELECTION;
					},
					err => {
						console.error(err);
						this.selected = DEFAULT_SELECTION;
						this.target = DEFAULT_SELECTION;
					}
				);
			} else {
				console.error("both target and selected are not null, something went wrong");
			}
			return false;
		}
	}
};
</script>

<style>
.selected {
	box-shadow: 0 0 0 4px orange;
}

.topnav {
	background-color: #333;
	overflow: hidden;
	position: relative;
}

/* Style the links inside the navigation bar */
.topnav img {
	max-height: 6rem;
	max-width: 6rem;
	float: left;
	color: #f2f2f2;
	text-align: center;
	text-decoration: none;
	font-size: 17px;
}

.topnav span {
	float: right;
	font-size: 24px;
	text-align: center;
	color: whitesmoke;
}

.board {
	width: 100%;
	margin: auto;
}

.player {
	margin-top: 3rem;
}
</style>
