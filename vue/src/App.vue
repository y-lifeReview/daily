<template>
  <router-view />
</template>
<script>
import { useGet } from "@/hooks/index";
import { setLStorange } from "@/hooks/storage";
const get = useGet();

export default {
  data() {
    return {};
  },
  methods: {
    getWeather: function (adcode) {
      get({
        url: "https://restapi.amap.com/v3/weather/weatherInfo",
        data: { key: "", city: adcode },
      }).then((res) => {
        console.log("res", res);
        if (res.info === "ok") {
          let data = res.lives[0]
          setLStorange('city',data.city);
        }
      });
    },
    getAdcode: function () {
      get({
        url: "https://restapi.amap.com/v3/ip",
        data: { key: "" },
      }).then((res) => {
        this.getWeather(res.adcode);
      });
    },
  },
  mounted() {
    console.log("mounted");
    this.getAdcode();
  },
};
</script>
<style></style>
