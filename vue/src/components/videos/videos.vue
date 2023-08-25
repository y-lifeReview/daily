<template>
  <articleHead :info="{ title: '视频集' }" :isArticle="false" />
  <div class="img_box">
    <el-skeleton
      :rows="4"
      style="width: 90%; margin: auto"
      :loading="imgloading"
      animated
    >
      <div
        v-for="(item, index) in imgList"
        :key="index"
        @click="goVideoDetail(item.id, index)"
        class="img_cover"
      >
        <template v-if="item.ispassword">
          <div class="clock-image"></div>
          <div class="img_title">此内容受密码保护</div>
        </template>
        <template v-else>
          <el-image
            class="image"
            fit="cover"
            :src="item.mask_img + '?imageMogr2/format/webp'"
          >
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
          <div class="img_title">{{ item.title }}</div>
        </template>
      </div>
    </el-skeleton>
  </div>
</template>
<script>
import { useGet } from "@/hooks/index";
import { urlForGetVideoCategory } from "@/api/url";
import articleHead from "@/components/articleHead/articleHead.vue";
const get = useGet();
export default {
  name: "images",
  components: {
    articleHead,
  },
  data() {
    return {
      imgloading: true,
      imgList: [],
    };
  },
  mounted() {
    this.getImgCategory();
  },
  methods: {
    getImgCategory() {
      get({
        url: urlForGetVideoCategory,
      })
        .then((res) => {
          this.imgList = res.data;
          this.imgloading = false;
        })
        .catch((err) => {
          this.imgList = [];
          this.imgloading = false;
        });
    },
    goVideoDetail(id, index) {
        // console.log(this.imgList[index].ispassword)
      let title = this.imgList[index].ispassword
        ? "此内容受密码保护"
        : this.imgList[index].title;
      this.$router.push({
        name: "videoDetail",
        query: {
          id,
          title,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.img_box {
  width: 100%;
  // min-height: 1000px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
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
      height: 100px;
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
      &:before {
        color: #fff;
        font-family: iconfont;
        content: "\e6ff";
        display: block;
        font-size: 18px;
        height: 30px;
        left: calc(50% - 18px);
        top: calc(50% - 18px);
        line-height: 35px;
        position: absolute;
        text-align: center;
        transform: scale(0);
        opacity: 0;
        transition: 0.25s;
        width: 30px;
        z-index: 1;
      }
      &:hover:before {
        transform: scale(2);
        opacity: 1;
        transition: 0.25s;
      }
      &:after {
        background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0;
        content: "";
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        opacity: 0;
        transition: 0.25s;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      &:hover:after {
        opacity: 1;
        transition: 0.25s;
      }
    }
    .clock-image {
      height: 100px;
      position: relative;
      &:before {
        color: #fff;
        font-family: iconfont;
        content: "\e602";
        display: block;
        font-size: 35px;
        left: calc(50% - 18px);
        top: calc(50% - 18px);
        line-height: 35px;
        position: absolute;
        text-align: center;
        z-index: 1;
      }
      &:after {
        background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0;
        content: "";
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
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
}
</style>
