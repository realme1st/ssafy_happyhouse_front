<template>
	<b-row @click="selectHouse">
		<b-col>
			{{ house.dongName }}
		</b-col>
		<b-col>
			{{ house.aptName }}
		</b-col>
		<b-col>
			{{ house.buildYear }}
		</b-col>
		<b-col> {{ parseInt(house.recentPrice.replace(",", "")) | price }}만원 </b-col>
	</b-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
const houseStore = "houseStore";
export default {
	name: "HouseListItem",
	data() {
		return {};
	},
	props: {
		house: Object,
	},
	filters: {
		price(value) {
			if (!value) return value;
			return value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "억");
		},
	},
	computed: {
		...mapState(houseStore, [""]),
	},
	methods: {
		...mapActions(houseStore, ["detailHouse", "showdetailHouse"]),

		selectHouse() {
			console.log("listRow : ", this.house);
			this.detailHouse(this.house);
			this.showdetailHouse();
		},
	},
};
</script>

<style scoped></style>
