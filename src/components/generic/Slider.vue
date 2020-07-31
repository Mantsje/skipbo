<template>
	<div class="slider-container">
		<span class="slider-label"> {{ label }}: {{ sliderValue }}</span>
		<input
			v-if="editable"
			v-bind:class="{ disabled: !editable }"
			type="range"
			v-bind:min="min"
			v-bind:max="max"
			v-model="sliderValue"
			v-on:mouseup="emitVal"
			class="slider"
		/>
	</div>
</template>

<script>
export default {
	name: "Slider",
	props: {
		editable: Boolean,
		label: String,
		min: Number,
		max: Number
	},
	data() {
		return {
			sliderValue: -1
		};
	},
	computed: {
		// v-models sets $attrs["value"], so we observe that value here
		attrvalue: function() {
			return Number(this.$attrs["value"]);
		}
	},
	watch: {
		attrvalue: function(newVal) {
			// when $attrs["value"] it change (so outside this component), we update the internal sliderValue as well
			this.sliderValue = Number(newVal);
		}
	},
	methods: {
		emitVal() {
			// Notifies observers, such that v-model can be used
			// only emit on `mouseup`, otherwise it spams
			this.$emit("input", Number(this.sliderValue));
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
