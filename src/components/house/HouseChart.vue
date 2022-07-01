<template>
  <div class="_str">
    <div class="chart-box">
      <b-row class="mt-4 mb-3">
        <b-col cols="2" class="sm-1">
          <b-form-select
            v-model="sidoCode"
            :options="sidos"
            @change="gugunList"
          ></b-form-select>
        </b-col>
        <b-col cols="2" class="sm-1">
          <b-form-select
            v-model="gugunCode"
            :options="guguns"
            @change="sendKeyword"
          ></b-form-select>
        </b-col>
      </b-row>
      <div class="charts">
        <b-row>
          <b-col>
            <div>
              <div class="chart-subject mb-2">
                최근거래가격 평균 상위동네 Top10
              </div>

              <chart-reactive :chart-data="aptDescChart"></chart-reactive>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="chart-subject mb-2">
                최근거래가격 평균 하위동네 Top10
              </div>
              <chart-reactive :chart-data="aptAscChart"></chart-reactive>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { apiInstance } from "@/api/index.js";
import chartReactive from "@/components/house/chart/chartReactive.vue";

// import { Bar } from "vue-chartjs/legacy";

const houseStore = "houseStore";
const api = apiInstance();

export default {
  name: "VuejsHouseChart",
  components: {
    chartReactive,
  },
  // components: { Bar },

  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      aptDealDescData: {},
      aptDealAscData: {},
      aptDescChart: {},
      aptAscChart: {},
      aptDealDesclabel: [],
      aptDealDescdata: [],
      aptDealAsclabel: [],
      aptDealAscdata: [],
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.Sido();
  },
  mounted() {},

  methods: {
    ...mapActions(houseStore, ["Sido", "Gugun", "HouseList"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.Gugun(this.sidoCode);
    },
    async sendKeyword() {
      this.aptDealDescData = await api
        .get("/map/findAvgDesc/" + this.gugunCode + "00000")
        .then((response) => {
          console.log(response.data);
          if (response.data == "") {
            alert("목록이 없습니다");
          } else {
            return response.data;
          }
        })
        .catch(() => {
          console.log("목록 불러오기 실패.");
        });

      this.aptDealAscData = await api
        .get("/map/findAvgAsc/" + this.gugunCode + "00000")
        .then((response) => {
          console.log(response.data);
          if (response.data == "") {
            alert("목록이 없습니다");
          } else {
            return response.data;
          }
        })
        .catch(() => {
          console.log("목록 불러오기 실패.");
        });

      this.fillData();
    },
    fillData() {
      this.aptDealDesclabel = [];
      this.aptDealDescdata = [];
      this.aptDealAsclabel = [];
      this.aptDealAscdata = [];

      for (var i = 0; i < this.aptDealDescData.length; i++) {
        this.aptDealDesclabel.push(this.aptDealDescData[i].dongname);
        this.aptDealDescdata.push(this.aptDealDescData[i].dealAmountAvg);
        this.aptDealAsclabel.push(this.aptDealAscData[i].dongname);
        this.aptDealAscdata.push(this.aptDealAscData[i].dealAmountAvg);
      }

      this.aptDescChart = {
        labels: this.aptDealDesclabel,
        datasets: [
          {
            label: "동별 평균 거래가격(만원)",
            backgroundColor: "skyblue",
            // Data for the x-axis of the chart
            data: this.aptDealDescdata,
          },
        ],
      };
      this.aptAscChart = {
        labels: this.aptDealAsclabel,
        datasets: [
          {
            label: "동별 평균 거래가격(만원)",
            backgroundColor: "skyblue",
            // Data for the x-axis of the chart
            data: this.aptDealAscdata,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.chart-box {
  margin-left: 130px;
  margin-right: 130px;
}
.charts {
  margin-top: 50px;
  margin-bottom: 130px;
}
</style>
