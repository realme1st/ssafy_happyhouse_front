<template>
  <b-container>
    <div v-if="houses && houses.length != 0">
      <b-table
        hover
        responsive
        id="house-table"
        :items="houses"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        select-mode="single"
        selectable
        @row-selected="onRowSelected"
      >
        <template #cell(aptName)="data">
          {{ data.item.aptName }}
        </template>
        <template #cell(buildYear)="data">
          {{ data.item.buildYear }}
        </template>
        <template #cell(area)="data">
          {{ Math.round((data.item.area / 3.3058) * 100) / 100 }}평
        </template>
        <template #cell(recentPrice)="data">
          {{ parseInt(data.item.recentPrice.replace(",", "")) | price }}만원
        </template>
      </b-table>
    </div>
    <div v-else>
      <b-row>
        <b-col
          ><b-alert show class="text-center"
            >주택 목록이 없습니다.</b-alert
          ></b-col
        >
      </b-row>
    </div>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col>
        <b-pagination
          class="customPagination"
          v-model="currentPage"
          :total-rows="houses.length"
          :per-page="perPage"
          aria-controls="house-table"
        ></b-pagination>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>

    <div class="housedetail-card text-center">
      <b-modal
        class="modal-lg"
        size="xl"
        id="detailModal"
        hide-footer
        hide-header
      >
        <b-card class="text-center" header-tag="header" footer-tag="footer">
          <template #header>
            <b-card-title>{{ housedetail.aptName }}</b-card-title>
          </template>
          <b-col>
            <b-row rows="9">
              <b-col cols="6">
                <b-card-img :src="require('@/assets/aptse.jpg')"></b-card-img>
              </b-col>
              <b-col cols="6">
                <b-list-group flush>
                  <b-list-group-item
                    ><b-card-sub-title class="mb-2 mt-1">주소</b-card-sub-title>
                    <b-card-text>
                      {{ housedetail.sidoName }} {{ housedetail.gugunName }}
                      {{ housedetail.dongName }} {{ housedetail.jibun }}
                    </b-card-text></b-list-group-item
                  >
                  <b-list-group-item
                    ><b-card-sub-title class="mb-2 mt-1"
                      >건축년도</b-card-sub-title
                    >
                    <b-card-text>
                      {{ housedetail.buildYear }}
                    </b-card-text></b-list-group-item
                  >
                  <b-list-group-item
                    ><b-card-sub-title class="mb-2 mt-1"
                      >최근 거래금액</b-card-sub-title
                    >
                    <b-card-text>
                      {{ housedetail.recentPrice }}
                    </b-card-text></b-list-group-item
                  >
                  <b-list-group-item
                    ><b-card-sub-title class="mb-2 mt-1">층</b-card-sub-title>
                    <b-card-text>
                      {{ housedetail.floor }}층
                    </b-card-text></b-list-group-item
                  >
                  <b-list-group-item
                    ><b-card-sub-title class="mb-2 mt-1">면적</b-card-sub-title>
                    <b-card-text>
                      {{
                        Math.round((housedetail.area / 3.3058) * 100) / 100
                      }}평
                    </b-card-text></b-list-group-item
                  >
                </b-list-group>
              </b-col>
            </b-row>
          </b-col>
          <!-- <b-row rows="3"> -->
          <template #footer>
            <h6 class="mb-2">근처 코로나19 안심병원</h6>
            <b-table hover :items="hospitals" :fields="hospitalFields">
              <template #cell(type)="data">
                <div v-if="data.item.type == 'A'">외래진료</div>
                <div v-if="data.item.type == 'B'">외래진료 및 입원</div>
              </template>
            </b-table>
          </template>
          <!-- </b-row> -->
        </b-card>
      </b-modal>
    </div>
  </b-container>
</template>
<script>
// import HouseListItem from "@/components/house/HouseListItem.vue";
import { houseDetailshow } from "@/api/house.js";
import { mapState, mapActions } from "vuex";
import { apiInstance } from "@/api/index.js";
const api = apiInstance();
const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    // HouseListItem,
  },
  data() {
    return {
      house: Object,
      fields: [
        { key: "aptName", label: "아파트이름" },
        { key: "buildYear", label: "건축년도", sortable: true },
        { key: "area", label: "평수", sortable: true },
        { key: "recentPrice", label: "최근거래금액", sortable: true },
      ],
      rows: "",
      perPage: 8,
      currentPage: 1,
      search: "",
      housedetail: {},
      hospitals: {},
      hospitalFields: [
        { key: "name", label: "기관명" },
        { key: "address", label: "주소" },
        { key: "type", label: "유형" },
        { key: "tel", label: "전화번호" },
      ],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    ...mapActions(houseStore, ["HouseDealList"]),
    async onRowSelected(items) {
      //console.log(items);
      let param = { dong: items[0].dongCode };
      houseDetailshow(
        param,

        (response) => {
          console.log(response);
          this.housedetail = items[0];
          console.log(items[0]);
          api
            .get(
              "/aptaround/hospital/" +
                this.housedetail.sidoName +
                "/" +
                this.housedetail.gugunName
            )
            .then((response) => {
              console.log(response);
              this.hospitals = response.data;
              console.log(this.hospitals);
            })
            .catch((error) => {
              console.log(error);
            });
          this.$bvModal.show("detailModal");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "억");
    },
  },
};
</script>

<style scoped>
._str {
  min-height: 660px;
}
</style>
