<template>
	<div class="pile" :class="[decktype]">
		<div class="card-container" v-on:click="select" :class="[{ empty: pile.isEmpty() }, decktype]">
			<card v-if="!pile.isEmpty()" :card="topCard" :faceup="topIsVisible" :class="[{ selected: selected }]" />
		</div>
		<span>Cards on pile: {{ pile.size() }}</span>
	</div>
</template>

<script>
// Datastructures
import Pile, { PileVisibility } from "@/assets/js/core/Pile";
import Selection, { Type } from "@/assets/js/controller/Selection";
// Components
import Card from "@/components/Card.vue";

export default {
	name: "CentreBoard",
	components: {
		Card
	},
	props: {
		pile: Pile,
		selected: Boolean,
		decktype: String
	},
	computed: {
		topIsVisible: function() {
			return this.pile.visibility == PileVisibility.ALL || this.pile.visibility == PileVisibility.TOP;
		},
		topCard: function() {
			return this.pile.peek();
		}
	},
	methods: {
		select() {
			this.$emit("selected", new Selection(this.pile, Type.PILE));
		}
	}
};
</script>

<style scoped>
.pile {
	margin: auto;
	display: inline-block;
}

.card-container {
	width: 9rem;
	height: 12rem;
	margin: auto;
	margin-bottom: 0.5rem;
}

.empty {
	outline: 4px dashed var(--main-color);
	outline-offset: -4px;
}

.draw {
	--main-color: crimson;
}
.play {
	--main-color: darkgreen;
}
.goal {
	--main-color: dodgerblue;
}
.discard {
	--main-color: darkorchid;
}
</style>
