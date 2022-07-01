import { apiInstance } from "@/api/index.js";
const axios = apiInstance();

const newsStore = {
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
};

export default newsStore;
