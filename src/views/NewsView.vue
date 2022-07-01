<template>
  <div class="bv-example-row text-center">
    <div class="img">
      <b-card
        class="card text-center"
        overlay
        :img-src="require('@/assets/headerImg.jpg')"
        text-variant="dark"
      >
        <div class="card-header-title">오늘의 뉴스</div>
      </b-card>
    </div>

    <news-list></news-list>
  </div>
</template>

<script>
import NewsList from "@/components/news/NewsList.vue";

export default {
  name: "VuejsNewsView",

  data() {
    return {};
  },
  components: {
    NewsList,
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
