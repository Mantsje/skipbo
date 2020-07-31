<template>
	<img class="card" :class="faceup ? 'faceup' : 'facedown'" :src="getImgSrc(faceup ? String(card.value) : 'back')" />
</template>

<script>
// Datastructure
import Card from "@/assets/js/core/Card";
// Textures
import CARD_TXTS from "@/assets/js/view/CardTextures";

export default {
	name: "CentreBoard",
	props: {
		card: Card,
		faceup: Boolean
	},
	methods: {
		getImgSrc(cardValue) {
			return CARD_TXTS[cardValue];
		}
	}
};
</script>

<style scoped>
.card {
	max-width: 100%;
	max-height: 100%;
	border-radius: 15px;
	margin: auto;
}
</style>
