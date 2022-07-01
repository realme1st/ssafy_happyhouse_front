<template>
	<div class="bv-example-row text-center box">
		<div class="img">
			<b-card
				class="card text-center"
				overlay
				:img-src="require('@/assets/headerImg.jpg')"
				text-variant="dark"
			>
				<div class="card-header-title">login</div>
			</b-card>
		</div>
		<b-row>
			<b-col></b-col>
			<b-col cols="4">
				<b-card class="login-form-border text-center mt-5" style="max-width: 35rem">
					<b-form class="login-form-form">
						<b-form-group label="아이디" label-cols="3" label-for="userid">
							<b-form-input
								id="userid"
								v-model="user.id"
								required
								placeholder="아이디"
								@keyup.enter="confirm"
							></b-form-input>
						</b-form-group>
						<b-form-group label="비밀번호" label-cols="3" label-for="userpwd">
							<b-form-input
								type="password"
								id="userpwd"
								v-model="user.pwd"
								required
								placeholder="비밀번호"
								@keyup.enter="confirm"
							></b-form-input>
						</b-form-group>
						<b-button
							squared
							type="button"
							variant="primary"
							class="login-button m-1"
							@click="confirm"
							>로그인</b-button
						>
					</b-form>
				</b-card>
			</b-col>
			<b-col></b-col>
		</b-row>
		<b-row class="login-alert mt-3">
			<b-col></b-col>
			<b-col
				><b-alert class="text-center" show variant="danger" v-if="isLoginError"
					>아이디 또는 비밀번호를 확인하세요.</b-alert
				></b-col
			>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const userStore = "userStore";
export default {
	name: "UserLogin",
	data() {
		return {
			user: {
				id: null,
				pwd: null,
			},
		};
	},
	computed: {
		...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
	},
	methods: {
		...mapActions(userStore, ["userConfirm", "getUserInfo"]),
		async confirm() {
			await this.userConfirm(this.user);
			let token = sessionStorage.getItem("access-token");
			if (this.isLogin) {
				await this.getUserInfo(token);
				alert("로그인되었습니다.");
				this.$router.push({ name: "home" });
			}
		},
	},
};
</script>

<style scoped>
.box {
	margin-bottom: 100px;
}
</style>
