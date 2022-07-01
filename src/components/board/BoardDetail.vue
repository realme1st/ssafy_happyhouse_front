<template>
  <b-container class="bv-example-row mt-5 box">
    <b-row class="mb-1">
      <b-col>
        <b-card border-variant="dark" class="mb-2">
          <b-card-title>{{ article.subject }}</b-card-title>
          <br />
          <b-card-sub-title>
            <b-row>
              <b-col> {{ article.userid }} | {{ article.regtime }} </b-col>
              <b-col> <b-icon icon="eye"></b-icon> {{ article.hit }} </b-col>
            </b-row></b-card-sub-title
          >

          <hr />
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button squared variant="info" size="sm" @click="listArticle"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="article.userid == userInfo.id">
        <b-button
          squared
          variant="dark"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >수정</b-button
        >
        <b-button squared variant="danger" size="sm" @click="deleteArticle"
          >삭제</b-button
        >
      </b-col>
    </b-row>
    <div v-if="this.userInfo.id == 'admin'">
      <hr />
      <div class="float-left"><b-icon icon="person-fill"></b-icon> 관리자</div>
      <br />
      <b-card border-variant="dark" class="mt-2" v-if="!modifyMode">
        <b-row>
          <b-col
            ><div class="text-left">{{ article.reply }}</div></b-col
          >
          <b-col cols="2" v-if="article.reply == '답변이 없습니다.'"
            ><b-button
              squared
              class="mr-2"
              variant="info"
              size="sm"
              @click="registerReply"
              >답변하기</b-button
            >
          </b-col>
          <b-col cols="2" v-else>
            <b-button
              squared
              class="mr-2"
              variant="dark"
              size="sm"
              @click="registerReply"
              >수정</b-button
            >
            <b-button squared variant="danger" size="sm" @click="deleteReply"
              >삭제</b-button
            >
          </b-col>
        </b-row>
      </b-card>
      <b-card border-variant="dark" class="mt-2" v-if="modifyMode">
        <b-row>
          <b-col>
            <b-form-input class="text-left" v-model="reply">
              {{ article.reply }}</b-form-input
            >
          </b-col>
          <b-col cols="2"
            ><b-button
              squared
              class="mr-2"
              variant="dark"
              size="sm"
              @click="modifyReply"
              >수정</b-button
            >
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div v-else>
      <hr />
      <div class="float-left"><b-icon icon="person-fill"></b-icon> 관리자</div>
      <br />
      <b-card border-variant="dark" class="mt-2" v-if="!modifyMode">
        <b-row>
          <b-col
            ><div class="text-left">{{ article.reply }}</div></b-col
          >
        </b-row>
      </b-card>
    </div>
  </b-container>
</template>

<script>
// import moment from "moment";
import { mapState } from "vuex";
import {
  getArticle,
  updateHit,
  deleteArticle,
  modifyReply,
  deleteReply,
} from "@/api/board";

const userStore = "userStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      modifyMode: false,
      reply: "",
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
        if (!this.article.reply) {
          this.article.reply = "답변이 없습니다.";
        }
        updateHit(
          {
            articleno: this.article.articleno,
            hit: this.article.hit,
          },
          ({ data }) => {
            if (data === "success") {
              console.log(this.article.hit);
            } else {
              console.log("조회수 처리 중 오류가 발생하였습니다.");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log("오류가 발생하였습니다.", error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("글을 삭제하시겠습니까?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardList" });
        });
      }
    },
    toggleModify() {
      this.modifyMode = !this.modifyMode;
    },
    registerReply() {
      this.toggleModify();
    },
    modifyReply() {
      modifyReply(
        {
          articleno: this.article.articleno,
          reply: this.reply,
        },
        ({ data }) => {
          let msg = "답변 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            this.article.reply = this.reply;
            msg = "답변 수정이 완료되었습니다.";
          }
          alert(msg);
          console.log(this.article.reply);
          this.toggleModify();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteReply() {
      deleteReply(
        {
          articleno: this.article.articleno,
        },
        ({ data }) => {
          let msg = "답변 삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답변 삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$router.go(this.$router.currentRoute);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped>
.box {
  margin-bottom: 80px;
}
</style>
