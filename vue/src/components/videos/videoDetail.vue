<template>
  <articleHead :info="{ title: imgsTitle }" :isArticle="false" />
  <div v-if="isPass" class="check-box">
    <div class="check-content">
      <div class="check-tip">请输入密码访问</div>
      <div class="input-box">
        <el-input :placeholder="info.ques" v-model="answer">
          <template #append>
            <el-button @click="toVideoCheck">提交</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
  <div v-else class="img_box">
    <el-skeleton
      :rows="4"
      style="width: 90%; margin: auto"
      :loading="imgloading"
      animated
    >
      <div
        v-for="item in videoList"
        :key="item.id"
        class="img_cover"
        @click="showPlayer(item.url)"
      >
        <el-image
          lazy
          :alt="item.title"
          :title="item.title"
          class="image"
          fit="cover"
          :src="item.mask_img + '?imageMogr2/format/webp'"
          ><template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template></el-image
        >
      </div>
    </el-skeleton>

    <div v-if="playerShow" class="player-mask">
      <div class="player-box">
        <div @click="closePlayer" class="player-close">
          <i class="iconfont icon-guanbi"></i>
        </div>

        <div id="dplayer" class="player-content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import DPlayer from "dplayer";

import { useGet, usePost } from "@/hooks/index";
import { htmlEncode } from "@/hooks/inputcheck";

import {
  urlForGetVideo,
  urlForVideoIsPass,
  urlForVideoPassCheck,
} from "@/api/url";

import articleHead from "@/components/articleHead/articleHead.vue";
const get = useGet();
const post = usePost();
export default {
  components: {
    articleHead,
  },
  data() {
    return {
      answer: "",
      imgloading: true,
      videoList: [],
      imgsTitle: "",
      isPass: false,
      playerShow: false,
      dp: null,
      info: {},
      id: 0,
    };
  },
  mounted() {
    let id = this.$route.query && this.$route.query.id;
    this.id = id;
    let title = this.$route.query && this.$route.query.title;
    this.imgsTitle =
      title == "此内容受密码保护" ? title : title + " 合集下的视频";
    //   this.getImgs(id);
    this.isPassWord(id);
  },
  methods: {
    getVideo(id) {
      get({
        url: urlForGetVideo + "?id=" + id,
      })
        .then((res) => {
          this.videoList = res.data;
          this.imgsTitle = res.info.title+' 合集下的视频'
          this.imgloading = false;
        })
        .catch((err) => {
          this.videoList = [];
          this.imgloading = false;
        });
    },
    isPassWord(id) {
      get({
        url: urlForVideoIsPass + "?id=" + id,
      })
        .then((res) => {
          let info = res.data[0];
          this.info = info;
          if (info.ispassword) {
            this.isPass = true;
          } else {
            this.getVideo(id);
          }
          this.imgloading = false;
        })
        .catch((err) => {

          this.imgloading = false;
        });
    },
    showPlayer(url) {
      this.playerShow = true;
      this.$nextTick(() => {
        this.dp = new DPlayer({
          container: document.getElementById("dplayer"),
          video: {
            url,
            autoplay: true,
            lang: "zh-cn",
            defaultQuality: 100,
            screenshot: true,
            hotkey: true,
          },
        });
      });
    },
    closePlayer() {
      this.playerShow = false;
      this.dp.destroy();
      this.dp = null;
    },
    toVideoCheck() {
      let anwser = htmlEncode(this.answer.trim());
      if (anwser.length == 0) return;
      let _this = this
      
      post({
        url: urlForVideoPassCheck,
        data: {
          id: this.id,
          anwser,
        },
      })
        .then((data) => {
          // console.log(data)
          if (data.data[0]) {
            this.isPass = false
            this.getVideo(this.id);
          } else {
            _this.$message.warning({
              message: "密码错误",
            });
          }
        })
        .catch((err) => {
            _this.$message.error({
              message: "网络错误",
            });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.check-box {
  width: 100%;
  padding: 20px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  background-color: #f1f3f4;
  .check-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
    .check-tip {
      text-align: center;
    }
    .input-box {
      margin-top: 30px;
      width: 200px;
    }
  }
}
.img_box {
  width: 100%;
  // min-height: 1000px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  // justify-content: space-between;
  .img_cover {
    width: 30%;
    height: 132px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 8px 16px rgb(0 0 0 / 30%);
    overflow: hidden;
    cursor: pointer;
    .image {
      height: 100%;
      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }
      .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
      }
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: "\e667";
        font-family: iconfont;
        font-size: 35px;
        color: #fff;
      }
    }

    .img_title {
      width: 100%;
      height: 32px;
      text-align: center;
      line-height: 32px;
      overflow: hidden;
      font-size: 14px;
    }
  }
  .player-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7);
    .player-box {
      width: 100%;
      height: 100%;
      position: relative;
      padding: 50px;
      .player-close {
        position: absolute;
        right: 50px;
        top: 10px;
        width: 40px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.4);
        font-size: 22px !important;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .player-content {
        background: gray;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
