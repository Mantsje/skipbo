<template>
	<settings :confirmMethod="confirmSettings" :editable="editable" :hasConfirm="hasConfirm" title="Game Settings:">
		<slider class="player-range" label="Amount of players" :editable="editable" :min="2" :max="6" v-model="nPlayers" />
		<slider
			class="goal-card-range"
			label="Goal cards per player"
			:editable="editable"
			:min="5"
			:max="30"
			v-model="nGoalCards"
		/>
	</settings>
</template>

<script>
import Settings from "@/components/generic/Settings";
import Slider from "@/components/generic/Slider";

export default {
	name: "GameSettings",
	components: {
		Settings,
		Slider
	},
	props: {
		editable: Boolean,
		hasConfirm: Boolean
	},
	data() {
		return {
			nPlayers: -1,
			nGoalCards: -1
		};
	},
	mounted() {
		// init data fields
		this.nPlayers = this.$store.state.settings.game.nPlayers;
		this.nGoalCards = this.$store.state.settings.game.playerGoalPileSize;
	},
	methods: {
		confirmSettings() {
			this.$store.commit("settings/updateGameSettings", {
				nPlayers: this.nPlayers,
				playerGoalPileSize: this.nGoalCards
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
