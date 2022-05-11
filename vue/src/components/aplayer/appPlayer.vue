<template>
  <div id="aplayer">
    <meting-js
      :autoplay="false"
      :fixed="false"
      :id="1574204418"
      :mini="false"
      :list-folded="true"
      :volume="0.4"
      server="tencent"
      type="playlist"
    />
  </div>
</template>
<script>
export default {
  name: "aPlayer",
  data() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
#aplayer {
  width: 205px;
  height: 50px;
  background: 0 0;
  box-shadow: none;
  margin: 0 5px;
  float:right;
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
      // display: block;
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
    opacity: 0;
    transition: all 0.3s;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer {
    // display: none;
    box-shadow: 0 0 0 #fff !important;
    margin: 0 !important;
    background-color: rgba(255, 255, 255, 0) !important;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer-time .aplayer-time-inner {
    display: none;
  }
}
@media (min-width: 767px) {
  #aplayer .aplayer .aplayer-pic .aplayer-play {
    display: none;
  }
  #aplayer .aplayer .aplayer-pic .aplayer-pause {
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
