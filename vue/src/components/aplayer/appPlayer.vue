<template>
  <div id="aplayer" />
</template>
<script>
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
const get = useGet();

import { useGet } from "@/hooks/index";
import { urlForGetMusicList,urlForGetMusicUrls } from "@/api/musicUrl";
export default {
  name: "aPlayer",
  data() {
    return {
      audio: [
        {
          //歌曲名,作者,歌曲链接,图片链接,歌词链接
          name: "",
          artist: "",
          url: "",
          cover: "",
          lrc: "",
        },
      ],
      info: {
        fixed: false, // 吸底模式
        mini: false, //开启迷你模式
        theme: "#f9f9f9", //主题色
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
        volume: 1, //默认音量
      },
      hover: true,
    };
  },
  mounted() {
    // 初始化播放器
    this.createPlayer();
    this.getAudioList();
    
  },
  methods: {
    //这里我引入了jQuary来弥补无法调用aplayer的接口的问题(其实主要是他接口咋调用我没搞清楚)
    //使用jQuary监听点击事件,动态添加隐藏动画
    clickButton() {
      window.$(".aplayer-icon").on("click", () => {
        let aplayer = window.$(".aplayer-body");
        if (this.hover) {
          aplayer.removeClass("aplayer-hover");
          this.hover = false;
        } else {
          aplayer.addClass("aplayer-hover");
          this.hover = true;
        }
      });
    },
    createPlayer() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      // eslint-disable-next-line no-unused-vars
      const aPlayer = new APlayer({
        container: document.getElementById("aplayer"),
        //使用js字符串格式加载歌词
        lrcType: 1,
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
      window.$(".aplayer-body").addClass("aplayer-hover");
      //   this.clickButton();
      //   loadingClose();
    },
    getAudioList() {
      get({
        url: urlForGetMusicList,
      }).then((res) => {
        console.log("res", res);
        if (res.code === 200) {
          let idList = res.data.songids;
          //   infoList = res.data.songlist;
          this.getAudioUrls(idList)
        } else {
          return;
        }
      });
    },
    getAudioUrls(ids) {
      get({
        url: urlForGetMusicUrls,
        data:{
          id:ids
        }
      }).then((res) => {
        console.log("res", res);
        if (res.code === 200) {
          // console.log(res)
        } else {
          return;
        }
      });
    },
  },
};
</script>
<style lang="scss">
#aplayer {
  width: 205px;
  height: 50px;
  background: 0 0;
  box-shadow: none;
  margin: 0 5px;

  .aplayer-pic {
    transition: 0.37s;
    -webkit-transition: 0.37s;
    -moz-transition: 0.37s;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    float: left;
    position: relative;
    z-index: 3;
    margin-top: 5px;
  }
  .aplayer-info {
    margin-left: 40px;
    height: 50px;
    padding: 8px 0 0 7px;
    border: none;
    .aplayer-music {
      margin: 0 0 7px 5px;
      height: auto;
      padding-bottom: 0;
    }
    .aplayer-lrc {
      //   display: none;
      display: block;
      position: fixed;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: 0;
      z-index: 98;
      pointer-events: none;
      text-shadow: 0 0 0 #fff, 0 0 0 #000;
    }
    .aplayer-controller {
      position: absolute;
      //   width: 90%;
      bottom: 0;
      .aplayer-bar {
        height: 3px !important;
      }
      .aplayer-volume-bar {
        height: 25px !important;
        right: 13px;
        .aplayer-volume {
          background-color: black !important;
        }
      }
      .aplayer-loaded {
        background: #d3d3e0;
      }
      .aplayer-played {
        background: rgb(142, 169, 167) !important;
      }
    }
  }
  .aplayer-notice {
    opacity: 0 !important;
  }
  .aplayer-icon {
    opacity: 1;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-info .aplayer-music {
    margin: 0 15px 7px 5px;
  }
}

@media (min-width: 767px) {
  #aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0;
    width: 96%;
    display: inline;
    // opacity: 0;
    transition: all 0.3s;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-time .aplayer-time-inner {
    display: none;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-arrow,
  #aplayer .aplayer-icon-back,
  #aplayer .aplayer-icon-forward,
  #aplayer .aplayer-icon-play {
    display: inline-block !important;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-volume-wrap {
    margin-left: 38px;
  }
}
@media (min-width: 767px) {
  #aplayer:hover .aplayer-bar-wrap,
  #aplayer:hover .aplayer-icon.aplayer-icon-lrc,
  #aplayer:hover .aplayer-volume-wrap {
    display: inline;
    opacity: 1 !important;
    transition: all 0.3s;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-icon.aplayer-icon-lrc,
  #aplayer .aplayer-volume-wrap {
    display: inline;
    opacity: 0;
    transition: all 0.3s;
  }
}

@media (min-width: 767px) {
  #aplayer .aplayer-withlist .aplayer-icon-order,
  #aplayer
    .aplayer-withlist
    .aplayer-info
    .aplayer-controller
    .aplayer-time
    .aplayer-icon.aplayer-icon-menu {
    display: none !important;
  }
}
@media (min-width: 767px) {
  #aplayer
    .aplayer-info
    .aplayer-controller
    .aplayer-bar-wrap
    .aplayer-bar
    .aplayer-played
    .aplayer-thumb {
    border-radius: 35% 35% 0 0 !important;
    background-color: #8ea9a7 !important;
  }
}
</style>
