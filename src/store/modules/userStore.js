import jwt_decode from "jwt-decode";
import { login, findById, getUserList } from "@/api/member.js";

const userStore = {
	namespaced: true,
	state: {
		isLogin: false,
		isLoginError: false,
		userInfo: null,
		userInfos: [],
	},
	getters: {
		checkUserInfo: function (state) {
			return state.userInfo;
		},
	},
	mutations: {
		SET_IS_LOGIN: (state, isLogin) => {
			state.isLogin = isLogin;
		},
		SET_IS_LOGIN_ERROR: (state, isLoginError) => {
			state.isLoginError = isLoginError;
		},
		SET_USER_INFO: (state, userInfo) => {
			state.isLogin = true;
			state.userInfo = userInfo;
		},
		SET_USER_INFO_LIST: (state, userInfos) => {
			state.userInfos = userInfos;
		},
	},
	actions: {
		async userConfirm({ commit }, user) {
			await login(
				user,
				(response) => {
					if (response.data.message === "success") {
						let token = response.data["access-token"];
						commit("SET_IS_LOGIN", true);
						commit("SET_IS_LOGIN_ERROR", false);
						sessionStorage.setItem("access-token", token);
					} else {
						commit("SET_IS_LOGIN", false);
						commit("SET_IS_LOGIN_ERROR", true);
					}
				},
				() => {}
			);
		},
		getUserInfo({ commit }, token) {
			let decode_token = jwt_decode(token);
			findById(
				decode_token.userid,
				(response) => {
					if (response.data.message === "success") {
						commit("SET_USER_INFO", response.data.userInfo);
					} else {
						console.log("유저 정보 없음!!");
					}
				},
				(error) => {
					console.log(error);
				}
			);
		},
		async getUserInfos({ commit }) {
			await getUserList(
				(response) => {
					if (response.data.message === "success") {
						console.log(JSON.stringify("유저정보리스트 : " + response.data));
						commit("SET_USER_INFO_LIST", response.data.userInfos);
					} else {
						console.log("유저 정보 없음!!");
					}
				},
				(error) => {
					console.log(error);
				}
			);
		},
	},
};

export default userStore;
