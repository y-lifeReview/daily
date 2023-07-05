<template>
  <articleHead :info="{ title: imgsTitle }" :isArticle="false" />
  <div class="img_box">
    <el-skeleton
      :rows="4"
      style="width: 90%; margin: auto"
      :loading="imgloading"
      animated
    >
      <div v-for="(item, index) in imgList" :key="item.id" class="img_cover">
        <el-image
          lazy
          :alt="item.title"
          :title="item.title"
          class="image"
          fit="cover"
          :src="item.src"
          :preview-src-list="urls"
          :initial-index="index"
          ><template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template></el-image
        >
      </div>
    </el-skeleton>
  </div>
</template>
<script>
import { useGet } from "@/hooks/index";
import { urlForGetImgs } from "@/api/url";
import articleHead from "@/components/articleHead/articleHead.vue";
const get = useGet();
export default {
  components: {
    articleHead,
  },
  data() {
    return {
      imgloading: true,
      imgList: [],
      imgsTitle: "",
      urls: [],
    };
  },
  mounted() {
    let id = this.$route.query && this.$route.query.id;
    this.imgsTitle = this.$route.query && this.$route.query.title;
    this.getImgs(id);
  },
  methods: {
    getImgs(id) {
      get({
        url: urlForGetImgs + "?id=" + id,
      })
        .then((res) => {
          this.imgList = res.data;
          this.urls = res.data.map((item) => {
            return item.src;
          });
          //   console.log('this.urls',res.data,this.urls)
          this.imgloading = false;
        })
        .catch((err) => {
          this.imgList = [];
          this.imgloading = false;
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
