<template>
	<div class="game-setup">
		<img alt="Skipbo logo" src="../assets/img/skipbo-logo.png" />
		<meta-settings ref="meta" :editable="true" />
		<game-settings ref="game" :editable="true" />
		<button v-on:click="createGame">Create Game</button>
	</div>
</template>

<script>
// @ is an alias to /src
import MetaSettings from "@/components/MetaSettings.vue";
import GameSettings from "@/components/GameSettings.vue";

export default {
	name: "GameSetup",
	components: {
		MetaSettings,
		GameSettings
	},
	methods: {
		createGame() {
			this.$refs.meta.confirmSettings();
			this.$refs.game.confirmSettings();
			this.$store.dispatch("game/create").then(
				() => {
					this.$router.push("/game");
				},
				err => {
					console.error(err);
				}
			);
		}
	}
};
</script>
