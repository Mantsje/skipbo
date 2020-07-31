<template>
	<div class="centre-board">
		<div class="draw-container">
			<pile
				decktype="draw"
				:selected="selected.isDrawpile"
				v-on:selected="select($event, { isDrawpile: true })"
				:pile="drawPile"
			/>
		</div>
		<div class="play-container">
			<div class="play-piles">
				<pile
					decktype="play"
					v-for="(pile, index) of playPiles"
					:selected="selected.playablePileIdx == index"
					v-on:selected="select($event, { playablePileIdx: index })"
					:pile="pile"
					:key="index"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
// Datastructures
import Selection from "@/assets/js/controller/Selection";
// Components
import Pile from "@/components/Pile";

export default {
	name: "CentreBoard",
	components: {
		Pile
	},
	props: {
		selected: Selection
	},
	methods: {
		select(selection, selectionFields) {
			for (let objkey in selectionFields) {
				selection[objkey] = selectionFields[objkey];
			}
			this.$emit("selected", selection);
			return false;
		}
	},
	computed: {
		...mapState({
			playPiles: state => state.game.playPiles,
			drawPile: state => state.game.deck
		})
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centre-board {
	overflow: hidden;
	width: 70%;
	margin: auto;
	padding: 2rem;
}

.draw-container {
	width: 20%;
	float: left;
}

.play-container {
	width: 80%;
	float: left;
	padding: auto;
}

.play-piles {
	display: inline-block;
}

.play-container .pile {
	margin-left: 1rem;
	margin-right: 1rem;
}
</style>
