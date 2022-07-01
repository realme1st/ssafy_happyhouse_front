<template>
  <div class="footer">
    <div class="f_text">
      <h4>Contact Us</h4>
      <hr />
      <div>
        <ul class="nav">
          <div class="col-6">
            <li>
              <i class="fa-solid fa-location-dot"></i> (SSAFY) 7기 happyhouse
            </li>

            <li class="footer_info_item">
              <i class="fa-solid fa-envelope"></i> 02-3429-5100
            </li>
            <li class="footer_info_item">
              <i class="fa-solid fa-envelope"></i> Copyright © SAMSUNG All
              Rights Reserved.
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VuejsFooter",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
hr {
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
}
.footer {
  background-color: rgb(113, 162, 210);
}

.f_text {
  padding: 20px;
  color: white;
}
</style>
