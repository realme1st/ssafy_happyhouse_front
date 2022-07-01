<template>
	<div id="app">
		<navi-bar />
		<router-view />
		<footer-bar />
	</div>
</template>

<script>
import NaviBar from "@/components/layout/HeaderNaviBar.vue";
import FooterBar from "@/components/layout/Footer.vue";

export default {
	name: "VuejsApp",
	components: {
		NaviBar,
		FooterBar,
	},
	data() {
		return {};
	},

	mounted() {},

	methods: {},
};
</script>

<style></style>
