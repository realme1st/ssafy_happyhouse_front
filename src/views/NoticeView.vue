<template>
  <div class="bv-example-row text-center">
    <div class="img">
      <b-card
        class="card text-center"
        overlay
        :img-src="require('@/assets/headerImg.jpg')"
        text-variant="dark"
      >
        <div class="card-header-title">Notice</div>
      </b-card>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "VuejsNoticeView",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
