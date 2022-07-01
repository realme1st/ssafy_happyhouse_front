<template>
  <div>
    <div class="main main-raised">
      <div class="section" id="services">
        <div class="container">
          <b-row class="mt-4 mb-2 text-center">
            <b-col cols="2">
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </b-col>
            <b-col class="text-right" cols="5" align-h="end">
              <b-input-group>
                <b-input v-model="word" @keyup.enter="searchN"></b-input>
                <template #append>
                  <b-input-group-text @click="searchN()" @keyup.enter="searchN"
                    ><b-icon icon="search"></b-icon
                  ></b-input-group-text>
                </template>
              </b-input-group>
            </b-col>
          </b-row>
          <br />
          <br />

          <b-card-group columns v-if="this.selected == 'card'">
            <b-card
              class="box"
              v-for="(item, index) in paginatedCards"
              :key="index"
              :items="NewsList"
              :per-page="perPage"
              :current-page="currentPage"
              footer-tag="footer"
            >
              <b-card-img
                height="190px"
                v-if="item.img"
                thumbnail
                :src="item.img"
                img-top
              >
              </b-card-img>
              <b-card-img
                v-else
                thumbnail
                :src="require('@/assets/noimage.jpeg')"
                height="190px"
                img-top
              >
              </b-card-img>

              <div class="cardBody">
                <b-card-title class="mt-3 title"
                  ><a :href="`${item.url}`" target="_blank">{{
                    item.title
                  }}</a></b-card-title
                >
                <b-card-sub-title class="mt-3">
                  {{ item.contents }}
                </b-card-sub-title>
              </div>
              <template #footer>
                <b-card-text>
                  <b-icon icon="clock" font-scale="1" variant="dark"></b-icon>
                  {{ item.time }}
                </b-card-text>
              </template>
            </b-card>
          </b-card-group>

          <b-table
            hover
            v-if="this.selected == 'table'"
            id="newstable"
            variant="light"
            :items="NewsList"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            responsive="sm"
          >
            <template #cell(제목)="data">
              <a
                :href="`${data.item.url}`"
                target="_blank"
                style="font-size: 1em"
                >{{ data.item.title }}</a
              >
            </template>
            <template #cell(내용)="data">
              <div style="width: 400px; font-size: 0.9em">
                {{ data.item.contents }}
              </div>
            </template>
            <template #cell(시간)="data">
              <div style="font-size: 14px">
                <b-icon icon="clock" font-scale="1" variant="dark"></b-icon>
                {{ data.item.time }}
              </div>
            </template>
          </b-table>
          <b-row class="mt-4" align-h="end">
            <b-col cols="4"
              ><b-pagination
                class="customPagination"
                v-model="currentPage"
                :total-rows="NewsList.length"
                :per-page="perPage"
                aria-controls="newstable"
              ></b-pagination>
            </b-col>
            <b-col cols="4"
              ><b-button
                squared
                class="md-default"
                @click="all"
                style="background-color: rgb(75, 129, 183)"
                >목록</b-button
              ></b-col
            >
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fields: ["제목", "내용", "시간"],
      currentPage: 1,
      perPage: 9,
      word: "",
      selected: "card",
      options: [
        { value: "card", text: "카드형" },
        { value: "table", text: "테이블형" },
      ],
    };
  },
  created() {
    this.$store.dispatch("ALLNEWS");
  },
  computed: {
    ...mapState(["NewsList"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.NewsList.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["ALLNEWS", "SEARCHNEWS"]),
    searchN() {
      if (this.word == "") alert("검색어를 입력해주세요.");
      // else this.$store.dispatch("SEARCHNEWS", this.word);
      else this.SEARCHNEWS(this.word);
    },
    all() {
      this.word = "";
      // this.$store.dispatch("ALLNEWS");
      this.ALLNEWS();
    },
  },
};
</script>

<style scoped>
a {
  color: rgb(75, 129, 183);
  text-decoration: none;
  font-size: 0.9em;
  font-family: "Noto Sans KR", sans-serif;
}
a:hover {
  font-weight: bold;
}
.cardBody {
  height: 160px;
}

#services {
  padding: 60px 0 40px 0;
  position: relative;
  margin: auto;
  max-width: 1000px;
  width: calc(100% - 100px);
  height: 100%;
  min-height: 100%;
}
#services .box {
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
  height: 100%;
}
#services .box:hover {
  transform: scale(1.1);
}

#services .box:hover .title a {
  color: rgb(75, 129, 183);
  font-weight: bold;
}
</style>
