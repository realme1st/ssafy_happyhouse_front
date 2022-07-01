<template>
  <div class="box">
    <b-container class="bv-example-row mt-3">
      <b-row class="mb-2" align-h="end">
        <b-col class="text-right" cols="5">
          <b-input-group class="mt-3">
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>

            <b-form-input v-model="search"></b-form-input>
            <template #append>
              <b-input-group-text @click="searchUser()"
                ><b-icon icon="search"></b-icon
              ></b-input-group-text>
            </template>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="articles.length">
          <b-table
            hover
            responsive
            id="board-table"
            :items="articles"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <template #cell(articleno)="data">
              {{ data.item.articleno }}
            </template>
            <template #cell(subject)="data">
              <router-link
                class="link"
                :to="{
                  name: 'boardDetail',
                  params: { articleno: data.item.articleno },
                }"
                >{{ data.item.subject }}</router-link
              >
            </template>
            <template #cell(userid)="data">
              {{ data.item.userid }}
            </template>
            <template #cell(hit)="data">
              {{ data.item.hit }}
            </template>
            <template #cell(regtime)="data">
              {{ data.item.regtime | dateFormat }}
            </template>
            <template #cell(replystatus)="data">
              <h6>
                <b-badge v-if="data.item.reply" variant="primary"
                  >답변완료</b-badge
                >
                <b-badge v-else variant="light">답변대기</b-badge>
              </h6>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row class="mb-1" align-h="end">
        <b-col cols="4">
          <b-pagination
            class="customPagination"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="board-table"
          ></b-pagination>
        </b-col>
        <b-col class="text-right" cols="4">
          <b-button squared style="background-color: rgb(75, 129, 183)"
            ><router-link :to="{ name: 'boardRegister' }" class="registerLink"
              ><b-icon icon="pencil"></b-icon> 글쓰기</router-link
            ></b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { listArticle, searchById, searchBySubject } from "@/api/board.js";
// import BoardListItem from "@/components/board/item/BoardListItem";
import moment from "moment";

export default {
  name: "VuejsBoardList",
  components: {
    // BoardListItem,
  },
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호" },
        { key: "subject", label: "제목" },
        { key: "userid", label: "작성자" },
        { key: "hit", label: "조회수" },
        { key: "regtime", label: "등록일" },
        { key: "replystatus", label: "상태" },
      ],
      rows: "",
      perPage: 10,
      currentPage: 1,
      search: "",
      selected: "id",
      options: [
        { value: "id", text: "작성자" },
        { value: "subject", text: "제목" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
        this.rows = this.articles.length;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    // 검색
    searchUser() {
      if (this.selected == "id") {
        let param = {
          id: this.search,
        };
        searchById(
          param,
          (response) => {
            this.articles = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.selected == "subject") {
        let param = {
          subject: this.search,
        };
        searchBySubject(
          param,
          (response) => {
            this.articles = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style scoped>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
.link {
  color: rgb(75, 129, 183);
  text-decoration: none;
}
.registerLink {
  color: white;
  text-decoration: none;
}
a:hover {
  font-weight: bold;
}

.box {
  margin-bottom: 50px;
}
</style>
