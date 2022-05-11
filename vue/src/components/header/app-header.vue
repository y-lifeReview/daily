<template>
  <header class="app-header">
    <div class="header-left">
      <div
        class="weather-box wow animate__fadeInDown"
        :style="{ background: 'url(' + weatherBg + ') 0% 0% / 100%' }"
      >
        <span>{{ temperature }}℃</span>
        <img
          class="weather-icon"
          :src="
            'https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/' +
            weather +
            '.png'
          "
          alt=""
        />
        <span>{{ city }}</span>
      </div>
    </div>
    <div class="header-right">
      <aPlayer></aPlayer>
    </div>
  </header>
</template>

<script>
import { getLStorage } from "@/hooks/storage";
import aPlayer from "@/components/aplayer/appPlayer.vue";

export default {
  components: {
    aPlayer,
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

  mounted() {
    this.city = getLStorage("city") || "成都市";
    this.temperature = getLStorage("temperature") || "25";
    this.weather = getLStorage("weather") || "多云";
    this.weatherBg =
      "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/weatherbg" +
      Math.ceil(Math.random() * 5) +
      ".png";
  },
};
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 50px;
  max-width: 1170px;
  box-shadow: 0 1px 4px 1px rgb(0 0 0 / 5%);
  background-color: #f9f9f9;
  z-index: 2;
  display: flex;
  .header-left {
    width: 220px;
    height: 50px;
    float: left;
    padding: 5px 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .weather-box {
      width: 150px;
      height: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 5px;
      span {
        color: #fff;
        letter-spacing: 1px;
      }
      .weather-icon {
        width: 40px;
        height: 40px;
      }
    }
  }
  .header-right{
    width:950px
  }
}
</style>
