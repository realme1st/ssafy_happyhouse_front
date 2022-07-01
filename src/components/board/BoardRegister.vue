<template>
  <b-container class="bv-example-row mt-5 box">
    <b-row>
      <b-col>
        <b-alert show variant="light" style="color: rgb(75, 129, 183)"
          ><h3>Q&A 작성</h3></b-alert
        >
      </b-col>
    </b-row>
    <board-input-item type="register" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardRegister",
  components: {
    BoardInputItem,
  },
};
</script>

<style>
.box {
  margin-bottom: 80px;
}
</style>
