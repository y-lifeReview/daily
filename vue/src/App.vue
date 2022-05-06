<template>
  <router-view />
</template>
<script>
import { useGet } from "@/hooks/index";
import { getLStorage, setLStorage } from "@/hooks/storage";
import { urlForGetWeather } from "@/api/url";
const get = useGet();

export default {
  data() {
    return {};
  },
  methods: {
    getWeather: function () {
      get({
        url: urlForGetWeather,
      }).then((res) => {
        console.log("res", res);
        if(res.code === 200){
          let data = res.data.lives[0];
          setLStorage('city',data.city);
          setLStorage('temperature',data.temperature);
          setLStorage('weather',data.weather.replace('/','a').replace('-','a'));
        }else{
          return 
        }
      });
    },
  },
  mounted() {
    let date = new Date()
    if(!getLStorage('city')||date.getSeconds()%3==1){
      this.getWeather();
    }
  },
};
</script>
<style></style>
