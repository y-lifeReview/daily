<template>
  <articleHead :info="{ title: '相册' }" :isArticle="false" />
  <div class="img_box">
    <div v-for="(item, index) in 2" :key="index" class="img_cover">
      <el-image
        class="image"
        fit="cover"
        src="http://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/image/1672688756487cYdSsjNQ5iyA.jpg"
      ></el-image>
      <div class="img_title">标题</div>
    </div>
  </div>
</template>
<script>
import articleHead from "@/components/articleHead/articleHead.vue";
export default {
  components: {
    articleHead,
  },
};
</script>

<style lang="scss" scoped>
.img_box {
  width: 100%;
  min-height: 1000px;
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
