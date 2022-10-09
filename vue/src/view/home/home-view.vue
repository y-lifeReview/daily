<template>
  <div class="main-container">
    <Header
      :city="city"
      :temperature="temperature"
      :weather="weather"
      :weatherBg="weatherBg"
    ></Header>
    <Aside></Aside>
    <div class="main-content">
      <div class="article-content">
        <div class="article-box">
          <router-view v-slot="{ Component }">
            <keep-alive include="articleList">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
        <div class="article-option"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/app-header.vue";
import Aside from "@/components/aside/appAside.vue";
import { useGet } from "@/hooks/index";
import { getLStorage, setLStorage } from "@/hooks/storage";
import { urlForGetWeather } from "@/api/url";
const get = useGet();
export default {
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      city: "成都市",
      temperature: "25",
      weather: "多云",
      weatherBg:
        "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/weatherbg1.png",
    };
  },
  methods: {
    getWeather: function () {
      get({
        url: urlForGetWeather,
      }).then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          let data = res.data.lives[0];
          if (data.city) {
            setLStorage("city", data.city);
            setLStorage("temperature", data.temperature);
            setLStorage(
              "weather",
              data.weather.replace("/", "a").replace("-", "a")
            );
          }
        } else {
          return;
        }
      });
    },
  },
  mounted() {
    let date = new Date();
    this.city = getLStorage("city") || "成都市";
    this.temperature = getLStorage("temperature") || "25";
    this.weather = getLStorage("weather") || "多云";
    this.weatherBg =
      "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/weatherbg" +
      Math.ceil(Math.random() * 5) +
      ".png";
    if (!getLStorage("city") || date.getSeconds() % 3 < 2) {
      this.getWeather();
    }
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 1170px;
  // height: 100%;
  margin: auto;
  padding-top: 50px;
  min-height: 100%;
  box-shadow: 0 0 4px 3px rgb(0 0 0 / 5%);
  .main-content {
    width: auto;
    // height: 100%;
    // min-height: 100%;
    margin-left: 220px;
    .article-content {
      width: auto;
      // min-height: 100%;
      position: relative;
      // height: 100%;
      .article-box {
        width: 100%;
        // height: 100%;
        // float: left;
        padding-right: 240px;
        background-color: #f0f3f4;
      }
      .article-option {
        width: 240px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
