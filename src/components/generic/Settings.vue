<template>
	<div class="settings-container">
		<h1 class="settings-header">{{ title }}</h1>
		<slot v-on:confirm-settings="confirmSettings" class="settings-body" />
		<button class="settings-confirm" v-if="editable && hasConfirm" v-on:click="confirmSettings">Confirm</button>
	</div>
</template>

<script>
export default {
	name: "Settings",
	props: {
		title: String,
		editable: Boolean,
		hasConfirm: Boolean,
		confirmMethod: Function
	},
	methods: {
		confirmSettings() {
			if (this.editable) {
				this.confirmMethod();
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
