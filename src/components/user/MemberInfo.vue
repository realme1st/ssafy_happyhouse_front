<template>
  <div class="bv-example-row text-center box">
    <div class="img">
      <b-card
        class="card text-center"
        overlay
        :img-src="require('@/assets/headerImg.jpg')"
        text-variant="dark"
      >
        <div class="card-header-title">User info</div>
      </b-card>
    </div>
    <b-row class="mt-5">
      <b-col></b-col>
      <b-col cols="4">
        <b-card no-body style="max-width: 40rem">
          <template #header>
            <b-avatar
              b-avatar
              size="72px"
              style="background-color: skyblue"
            ></b-avatar>
            <h4 class="mb-0 mt-3">{{ userInfo.id }}</h4>
          </template>
          <b-list-group flush>
            <b-list-group-item
              ><b-card-sub-title class="mb-2 mt-1">이름</b-card-sub-title>
              <b-card-text>
                {{ userInfo.name }}
              </b-card-text></b-list-group-item
            >
            <b-list-group-item
              ><b-card-sub-title class="mb-2 mt-1">비밀번호</b-card-sub-title>
              <b-card-text>
                {{ userInfo.pwd }}
              </b-card-text></b-list-group-item
            >
            <b-list-group-item
              ><b-card-sub-title class="mb-2 mt-1">이메일</b-card-sub-title>
              <b-card-text>
                {{ userInfo.email }}
              </b-card-text></b-list-group-item
            >
            <b-list-group-item
              ><b-card-sub-title class="mb-2 mt-1">전화번호</b-card-sub-title>
              <b-card-text>
                {{ userInfo.phoneNm }}
              </b-card-text></b-list-group-item
            >
          </b-list-group>

          <b-card-footer
            ><b-button
              squared
              variant="primary"
              href="#"
              class="mr-1"
              @click="modify"
              >정보수정</b-button
            >
            <b-button squared variant="danger" href="#" @click="removeUser"
              >회원탈퇴</b-button
            ></b-card-footer
          >
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { deleteUser } from "@/api/member.js";

const userStore = "userStore";

export default {
  name: "VuejsMemberInfo",
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    modify() {
      this.$router.push({ name: "modify" });
    },
    removeUser() {
      deleteUser(
        JSON.stringify(this.userInfo),
        (response) => {
          alert("탈퇴가 완료되었습니다.");
          console.log("delete success" + response);
          this.SET_IS_LOGIN(false);
          this.SET_USER_INFO(null);
          sessionStorage.removeItem("access-token");
          this.$router.push({ name: "home" });
        },
        (error) => {
          alert("탈퇴 처리시 문제가 발생했습니다.");
          console.log("delete error :" + error);
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
