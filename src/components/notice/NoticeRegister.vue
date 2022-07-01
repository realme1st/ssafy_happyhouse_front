<template>
	<b-container class="bv-example-row mt-3 box">
		<b-row>
			<b-col>
				<b-alert show variant="light"><h3>공지사항 작성</h3></b-alert>
			</b-col>
		</b-row>
		<notice-input-item type="register" />
	</b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/item/NoticeInputItem.vue";

export default {
	name: "NoticeRegister",
	components: {
		NoticeInputItem,
	},
};
</script>

<style>
.box {
	margin-bottom: 80px;
}
</style>
