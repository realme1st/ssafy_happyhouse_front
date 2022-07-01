<template>
  <b-container class="bv-example-row mt-5 box">
    <b-row>
      <b-col>
        <b-alert show variant="light" style="color: rgb(75, 129, 183)"
          ><h3>공지사항 수정</h3></b-alert
        >
      </b-col>
    </b-row>
    <notice-input-item type="modify" />
  </b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/item/NoticeInputItem.vue";

export default {
  name: "NoticeModify",
  components: {
    NoticeInputItem,
  },
};
</script>

<style>
.box {
  margin-bottom: 80px;
}
</style>
