<template>
	<settings :confirmMethod="confirmSettings" :editable="editable" :hasConfirm="hasConfirm" title="Meta Game Settings:">
		<slider
			class="playable-piles-range"
			label="Central piles to play on"
			:editable="editable"
			:min="2"
			:max="8"
			v-model="playablePiles"
		/>
		<slider
			class="deck-packs-range"
			label="Total packs of 1-12"
			:editable="editable"
			:min="8"
			:max="30"
			v-model="deckPacks"
		/>
		<slider
			class="deck-skipbos-range"
			label="Total amount of Skip Bo cards"
			:editable="editable"
			:min="8"
			:max="60"
			v-model="deckSkipbos"
		/>
		<slider
			class="player-discard-piles-range"
			label="Discard piles per player"
			:editable="editable"
			:min="2"
			:max="8"
			v-model="playerDiscardPiles"
		/>
		<slider
			class="player-hand-size-range"
			label="Max player hand size"
			:editable="editable"
			:min="2"
			:max="10"
			v-model="playerHandSize"
		/>
	</settings>
</template>

<script>
import Settings from "@/components/generic/Settings";
import Slider from "@/components/generic/Slider";

export default {
	name: "MetaSettings",
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
			playablePiles: -1,
			deckPacks: -1,
			deckSkipbos: -1,

			playerDiscardPiles: -1,
			playerHandSize: -1
		};
	},
	mounted() {
		// init data fields
		this.playablePiles = this.$store.state.settings.meta.playablePiles;
		this.deckPacks = this.$store.state.settings.meta.deckPacks;
		this.deckSkipbos = this.$store.state.settings.meta.deckSkipbos;
		this.playerDiscardPiles = this.$store.state.settings.meta.playerDiscardPiles;
		this.playerHandSize = this.$store.state.settings.meta.playerHandSize;
	},
	methods: {
		confirmSettings() {
			this.$store.commit("settings/updateMetaSettings", {
				playablePiles: this.playablePiles,
				deckPacks: this.deckPacks,
				deckSkipbos: this.deckSkipbos,
				playerDiscardPiles: this.playerDiscardPiles,
				playerHandSize: this.playerHandSize
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
