<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img src="@/assets/happyhouse.png" width="40px" alt="happyhouse" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <div id="clock">
        <b-icon icon="calendar2-fill" small></b-icon> {{ date }}
        <br />
        <b-icon icon="clock-fill" small></b-icon> {{ time }}
      </div>

      <div id="weather" class="ml-2">
        <!-- 날씨 정보가 있을 경우 -->
        <div v-if="weather.main != 'undefined'">
          <div :title="weather.weather[0].main" class="ml-2">
            <!-- Clear -->
            <b-icon v-if="code == 800" icon="sun-fill"> </b-icon>
            <!-- Thunderstorm -->
            <b-icon
              v-else-if="code.substr(0, 1) == 2"
              icon="cloud-lightning-rain-fill"
            >
            </b-icon>
            <!-- Drizzle -->
            <b-icon v-else-if="code.substr(0, 1) == 3" icon="cloud-rain-fill">
            </b-icon>
            <!-- Rain -->
            <b-icon
              v-else-if="code.substr(0, 1) == 5"
              icon="cloud-rain-heavy-fill"
            >
            </b-icon>
            <!-- Snow -->
            <b-icon v-else-if="code.substr(0, 1) == 6" icon="snow"> </b-icon>
            <!-- Atmosphere -->
            <b-icon v-else-if="code.substr(0, 1) == 7" icon="cloud-fog-fill">
            </b-icon>
            <!-- Clouds -->
            <b-icon v-else icon="cloudy-fill"> </b-icon>
          </div>
          <div>{{ Math.round(temp) }}℃</div>
        </div>
        <!-- 날씨 정보가 없을 경우 -->
        <div v-else>
          <div>
            <b-icon>mdi-cancel</b-icon>
          </div>
          <div>
            {{ weather.cod }}
          </div>
        </div>
      </div>

      <b-collapse id="nav-collapse" is-nav class="ml-4">
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link
              :to="{ name: 'notice' }"
              class="header-link router-link-active"
              >공지사항</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link
              :to="{ name: 'house' }"
              class="header-link router-link-active"
              >매물정보</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link
              :to="{ name: 'board' }"
              class="header-link router-link-active"
              >게시판</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link
              :to="{ name: 'news' }"
              class="header-link router-link-active"
              >오늘의 뉴스</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            ><b-avatar
              class="login-avatar"
              style="background-color: skyblue"
              size="sm"
            ></b-avatar
            >{{ userInfo.name }}님 환영합니다.</b-nav-item
          >
          <b-nav-item href="#" class="header-link" @click.prevent="logout()"
            >로그아웃</b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'info' }" class="header-link"
              >회원정보</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'signIn' }" class="header-link"
              >로그인</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'signUp' }" class="header-link"
              >회원가입</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  name: "VuejsHeaderNaviBar",

  data() {
    return {
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      time: "",
      date: "",
      api_key: "03fc4336741d884fe2dc62cf694236d0",
      url_base: "https://api.openweathermap.org/data/2.5/",
      weather: {},
      code: "",
      temp: 0,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },

  mounted() {
    setInterval(this.updateTime, 1000); // 1초마다 시간 갱신
    // API 요청 URL (지역 Seoul 고정)
    let fetchUrl = `${this.url_base}weather?q=Seoul&units=metric&APPID=${this.api_key}`;
    fetch(fetchUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.weather = result; // 날씨 정보
        this.temp = result.main.temp; // 기온
        this.code = result.weather[0].id.toString(); // 날씨 코드
      });
  },

  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    logout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      alert("로그아웃되었습니다.");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
    updateTime() {
      var cd = new Date();
      // 날짜 출력
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "/" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "/" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.week[cd.getDay()];
      // 시간 출력
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
};
</script>

<style scoped>
.header-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.header-link:hover {
  text-decoration: none;
  font-weight: bold;
}

.header-link.router-link-exact-active {
  /* color: rgb(0, 0, 0, 0.618); */
  font-weight: bold;
}

.login-avatar {
  /* background-color: #959595; */
  margin-right: 5px;
}

#clock {
  font-size: 0.875rem;
  font-weight: 500;
}

#weather {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
