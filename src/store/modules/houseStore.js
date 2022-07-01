import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  houseDealList,
  houseDealSearchList,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시" }],
    guguns: [{ value: null, text: "군" }],
    dongs: [{ value: null, text: "동" }],
    houses: [],
    house: null,
    houseDeals: null,
    houseDealModal: false, //상세보기 모달
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({
          value: sido.sidoCode,
          text: sido.sidoName,
        });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({
          value: gugun.gugunCode,
          text: gugun.gugunName,
        });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({
          value: dong.dongCode,
          text: dong.dongName,
        });
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
    SET_HOUSEDEAL_LIST(state, houseDeals) {
      state.houseDeals = houseDeals;
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "군" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동" }];
    },
  },

  actions: {
    Sido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    Gugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    Dong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async HouseList({ commit }, dongCode) {
      const params = {
        dong: dongCode,
      };
      await houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      commit("SET_DETAIL_HOUSE", house);
    },
    HouseDealList: ({ commit }, aptCode) => {
      const params = {
        aptCode: aptCode,
      };
      houseDealList(
        params,
        ({ data }) => {
          commit("SET_HOUSEDEAL_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    HouseDealSearchList: ({ commit }, state, aptName) => {
      const params = {
        aptName: aptName,
      };
      houseDealSearchList(
        params,
        ({ data }) => {
          state.houses = data;
          commit("SET_HOUSEDEAL_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
