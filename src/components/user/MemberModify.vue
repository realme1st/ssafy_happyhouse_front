<template>
	<div class="bv-example-row text-center box">
		<div class="img">
			<b-card
				class="card text-center"
				overlay
				:img-src="require('@/assets/headerImg.jpg')"
				text-variant="dark"
			>
				<div class="card-header-title">user info</div>
			</b-card>
		</div>
		<b-row class="mt-5">
			<b-col></b-col>
			<b-col cols="4">
				<b-card no-body style="max-width: 40rem">
					<template #header>
						<b-avatar b-avatar size="72px"></b-avatar>
						<h4 class="mb-0 mt-3">{{ userInfo.id }}</h4>
					</template>
					<b-list-group flush>
						<b-list-group-item
							><b-card-sub-title class="mb-2 mt-1">이름</b-card-sub-title>
							<b-form-input
								id="userName"
								v-model="userInfo.name"
								required
								placeholder="이름"
								@keyup.enter="confirm"
							></b-form-input
						></b-list-group-item>
						<b-list-group-item
							><b-card-sub-title class="mb-2 mt-1">비밀번호</b-card-sub-title>

							<b-form-input
								id="userPwd"
								v-model="userInfo.pwd"
								required
								placeholder="비밀번호"
								@keyup.enter="confirm"
							></b-form-input>
						</b-list-group-item>
						<b-list-group-item
							><b-card-sub-title class="mb-2 mt-1">이메일</b-card-sub-title>

							<b-form-input
								id="userEmail"
								v-model="userInfo.email"
								required
								placeholder="이메일"
								@keyup.enter="confirm"
							></b-form-input>
						</b-list-group-item>
						<b-list-group-item
							><b-card-sub-title class="mb-2 mt-1">전화번호</b-card-sub-title>

							<b-form-input
								id="userPhoneNm"
								v-model="userInfo.phoneNm"
								required
								placeholder="전화번호"
								@keyup.enter="confirm"
							></b-form-input
						></b-list-group-item>
					</b-list-group>

					<b-card-footer
						><b-button squared variant="primary" href="#" class="mr-1" @click="modify"
							>정보수정</b-button
						>
					</b-card-footer>
				</b-card>
			</b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
import { modifyUser } from "@/api/member.js";
import { mapState } from "vuex";
const userStore = "userStore";
export default {
	name: "UserJoin",
	data() {
		return {};
	},
	props: {
		type: { type: String },
	},
	computed: {
		...mapState(userStore, ["userInfo"]),
	},
	methods: {
		modify() {
			modifyUser(
				this.userInfo,
				(response) => {
					alert("수정이 완료되었습니다.");
					console.log(this.userInfo);
					console.log("modify success" + response);
					this.$router.push({ name: "info" });
				},
				(error) => {
					alert("수정 처리 중 문제가 발생했습니다.");
					console.log("modify error :" + error);
				}
			);
		},
	},
};
</script>

<style scoped></style>
