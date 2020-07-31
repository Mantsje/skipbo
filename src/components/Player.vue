<template>
	<div class="player">
		<div class="piles">
			<pile
				decktype="goal"
				:selected="selected.isPlayerGoalPile"
				v-on:selected="select($event, { isPlayerGoalPile: true })"
				:pile="player.goalPile"
			/>
			<div class="discard-piles">
				<pile
					decktype="discard"
					v-for="(pile, index) of player.discardPiles"
					v-on:selected="select($event, { playerDiscardPileIdx: index })"
					:selected="selected.playerDiscardPileIdx == index"
					:pile="pile"
					:key="'discard-' + index"
				/>
			</div>
		</div>
		<div class="hand">
			<card
				v-for="(card, index) of player.hand"
				:key="'hand-' + index"
				:class="{ selected: selected.playerHandIdx == index }"
				:card="card"
				:faceup="true"
				v-on:click.native="selectCard({ value: card, playerHandIdx: index })"
			/>
		</div>
	</div>
</template>

<script>
// Datastructures
import Player from "@/assets/js/core/Player";
import Selection, { Type } from "@/assets/js/controller/Selection";
// Components
import Pile from "@/components/Pile";
import Card from "@/components/Card";

export default {
	name: "Player",
	components: { Pile, Card },
	props: {
		isPlayersTurn: Boolean,
		player: Player,
		selected: Selection,
		index: Number
	},
	methods: {
		selectCard(selectionFields) {
			this.select(new Selection(null, Type.CARD), selectionFields);
		},
		select(selection, selectionFields) {
			selection.playerIdx = this.index;
			for (let objkey in selectionFields) {
				selection[objkey] = selectionFields[objkey];
			}
			this.$emit("selected", selection);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
	width: 100%;
	margin: auto;
}

.piles {
	overflow: hidden;
	display: inline-block;
	margin: auto;
}

.goal {
	margin-right: 3rem;
	margin-left: 1rem;
	float: left;
}

.discard-piles {
	margin: auto;
	float: left;
}

.discard {
	margin-left: 2rem;
	margin-right: 2rem;
	float: left;
}

.hand {
	width: 100%;
	overflow: hidden;
	float: none;
	display: inline-block;
	margin: auto;
	margin-top: 5rem;
}

.hand .card {
	height: 9rem;
	margin: 0.3rem;
}
</style>
