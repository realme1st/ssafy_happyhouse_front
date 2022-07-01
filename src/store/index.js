import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
import userStore from "@/store/modules/userStore.js";
import houseStore from "@/store/modules/houseStore.js";
// import newsStore from "@/store/modules/newsStore.js";

import { apiInstance } from "@/api/index.js";
const axios = apiInstance();

const store = new Vuex.Store({
  state: {
    News: {},
    NewsList: [],
  },
  getters: {
    NewsList(state) {
      return state.NewsList;
    },
  },
  mutations: {
    ALLNEWS: (state, payload) => {
      state.NewsList = payload.NewsList;
    },
    CLEAR_NEWS_LIST: (state) => {
      state.NewsList = [];
    },
  },
  actions: {
    ALLNEWS: (store) => {
      axios.get("/news").then((response) => {
        store.commit("CLEAR_NEWS_LIST");
        store.commit("ALLNEWS", { NewsList: response.data });
      });
    },
    SEARCHNEWS: (store, payload) => {
      axios.get("/news/search/" + payload).then((response) => {
        store.commit("CLEAR_NEWS_LIST");
        store.commit("ALLNEWS", { NewsList: response.data });
      });
    },
  },
  modules: {
    userStore,
    houseStore,
    // newsStore,
  },
  plugins: [
    createPersistedState({
      //브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
