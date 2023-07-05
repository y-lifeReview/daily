<template>
  <header class="app-header" id="progress_content">
    <div @click="menuContrl" class="menu-btn">
      <div class="btn-item"></div>
      <div class="btn-item"></div>
      <div class="btn-item"></div>
    </div>
    <div class="header-left">
      <div
        class="weather-box "
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
// import { getLStorage } from "@/hooks/storage";
import aPlayer from "@/components/aplayer/appPlayer.vue";

export default {
  components: {
    aPlayer,
  },
  props: {
    city:String,
    temperature:String,
    weather:String,
    weatherBg:String
  },
  data() {
    return {
      
    };
  },
  methods:{
    menuContrl(){
      let cls = document.getElementsByClassName('app-aside-xs')[0].style.left
      console.log(cls)
      if(cls!='0px'){
        document.getElementsByClassName('app-aside-xs')[0].style.left = '0px'
        document.getElementsByClassName('aside-bg')[0].style.display = 'block'
      }else{
        document.getElementsByClassName('app-aside-xs')[0].style.left = '-220px'
        document.getElementsByClassName('aside-bg')[0].style.display = 'none'
      }
    }
  }

 
};
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  // width: 100%;
  min-height: 50px;
  // max-width: 1170px;
  box-shadow: 0 1px 4px 1px rgb(0 0 0 / 5%);
  background-color: #f9f9f9;
  z-index: 4;
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
  // .header-right{
  //   // width:950px
  // }
  .menu-btn{
    width: 50px;
    height: 50px;
    padding: 19px 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .btn-item{
      width: 16px;
      height: 1.5px;
      background-color: #777;
      border-radius: 2px;
    }
  }
}
</style>
