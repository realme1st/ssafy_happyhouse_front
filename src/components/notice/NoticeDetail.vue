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
      <b-col class="text-right" v-if="userInfo.id == 'admin'">
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
  </b-container>
</template>

<script>
// import moment from "moment";
import { mapState } from "vuex";
import { getArticle, deleteArticle, updateHit } from "@/api/notice";

const userStore = "userStore";

export default {
  name: "NoticeDetail",
  data() {
    return {
      article: {},
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
        console.log("삭제 중 오류가 발생하였습니다.", error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "noticeList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "noticeModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("글을 삭제하시겠습니까?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "noticeList" });
        });
      }
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>
.box {
  margin-bottom: 80px;
}
</style>
