<template>
	<div class="bv-example-row text-center box">
		<div class="img">
			<b-card
				class="card text-center"
				overlay
				:img-src="require('@/assets/headerImg.jpg')"
				text-variant="dark"
			>
				<div class="card-header-title">sign up</div>
			</b-card>
		</div>
		<b-row>
			<b-col></b-col>
			<b-col cols="5">
				<b-card class="login-form-border text-center mt-5" style="max-width: 40rem">
					<b-form @submit="onSubmit" class="login-form-form">
						<b-form-group label="아이디" label-cols="3" label-for="userid" class="join-label">
							<b-form-input
								id="userId"
								v-model="user.id"
								:state="idValid"
								required
								placeholder="아이디 (6글자 이상)"
								aria-describedby="inputId"
								@keyup="idCheck"
							></b-form-input>
							<b-form-invalid-feedback id="inputId"
								>6글자 미만이거나 중복된 아이디가 있습니다.</b-form-invalid-feedback
							>
						</b-form-group>
						<b-form-group label="비밀번호" label-cols="3" label-for="userpwd" class="join-label">
							<b-form-input
								type="password"
								id="userPwd"
								v-model="user.pwd"
								:state="pwdValid"
								required
								placeholder="비밀번호 (4글자 이상)"
								aria-describedby="inputPwd"
								@keyup="pwdCheck"
							></b-form-input>
							<b-form-invalid-feedback id="inputPwd"
								>4글자 이상 입력해주세요.</b-form-invalid-feedback
							>
						</b-form-group>
						<b-form-group
							label="비밀번호 확인"
							label-cols="3"
							label-for="confirmpwd"
							class="join-label"
						>
							<b-form-input
								type="password"
								id="confirmPwd"
								v-model="confirmPwd"
								:state="confirmPwdValid"
								required
								placeholder="비밀번호 확인"
								aria-describedby="inputConfirmPwd"
								@keyup="confirmPwdCheck"
							></b-form-input>
							<b-form-invalid-feedback id="inputConfirmPwd"
								>비밀번호가 다릅니다.</b-form-invalid-feedback
							>
						</b-form-group>
						<b-form-group label="이름" label-cols="3" label-for="userName" class="join-label">
							<b-form-input
								id="userName"
								v-model="user.name"
								required
								placeholder="이름"
							></b-form-input>
						</b-form-group>

						<b-form-group label="이메일" label-cols="3" label-for="email" class="join-label">
							<b-form-input
								type="email"
								id="email"
								v-model="user.email"
								required
								placeholder="이메일"
							></b-form-input>
						</b-form-group>
						<b-form-group label="전화번호" label-cols="3" label-for="phoneNm" class="join-label">
							<b-form-input
								id="phoneNm"
								v-model="user.phoneNm"
								required
								placeholder="전화번호"
							></b-form-input>
						</b-form-group>
						<b-button squared type="submit" variant="primary" class="login-button m-1"
							>가입</b-button
						>
					</b-form>
				</b-card>
			</b-col>
			<b-col></b-col>
		</b-row>
		<b-row class="login-alert mt-3">
			<b-col></b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
import { registerUser, checkId } from "@/api/member.js";
export default {
	name: "MemberRegister",
	data() {
		return {
			user: {
				id: "",
				pwd: "",
				name: "",
				email: "",
				phoneNm: "",
			},
			idValid: null,
			pwdValid: null,
			confirmPwd: "",
			confirmPwdValid: null,
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			let msg = "[";
			let err = false;
			if (!this.idValid) {
				msg += " 아이디 ";
				err = true;
			}
			if (!this.pwdValid) {
				msg += " 비밀번호 ";
				err = true;
			}
			if (!this.confirmPwdValid) {
				msg += " 비밀번호 확인 ";
				err = true;
			}
			msg += "]에 문제가 있습니다.";
			if (err) alert(msg);
			else this.registJoin();
		},
		idCheck() {
			if (this.user.id.length > 4) {
				checkId(
					this.user.id,
					({ data }) => {
						if (data === "success") {
							this.idValid = true;
						} else {
							this.idValid = false;
						}
					},
					(error) => {
						console.log("아이디 검사 에러 : " + error);
					}
				);
			} else if (this.user.id.length > 0) {
				this.idValid = false;
			} else {
				this.idValid = null;
			}
		},
		pwdCheck() {
			if (this.user.pwd.length > 3) {
				this.pwdValid = true;
			} else if (this.user.pwd.length > 0) {
				this.pwdValid = false;
			} else {
				this.pwdValid = null;
			}
		},
		confirmPwdCheck() {
			if (this.user.pwd.length == 0) {
				this.confirmPwdValid = null;
			} else if (this.confirmPwd == this.user.pwd) {
				this.confirmPwdValid = true;
			} else {
				this.confirmPwdValid = false;
			}
		},
		registJoin() {
			registerUser(
				this.user,
				({ data }) => {
					let msg = "";
					if (data === "success") msg = "회원가입이 완료되었습니다.";
					else msg = "회원가입시 문제가 발생했습니다.";
					alert(msg);
					this.$router.push({ name: "signIn" });
				},
				(error) => {
					alert("회원가입시 서버문제가 발생했습니다.");
					console.log("회원가입 에러 : " + error);
				}
			);
		},
	},
};
</script>

<style scoped>
.box {
	margin-bottom: 50px;
}
</style>
