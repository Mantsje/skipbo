<template>
	<div class="results">
		<img alt="Skipbo logo" src="../assets/img/skipbo-logo.png" />
		<h1>Player {{ winner }} has won the game</h1>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
	name: "Results",
	computed: {
		...mapState({
			winner: state => state.game.players.filter(p => p.goalPile.size() == 0)
		})
	}
};
</script>
