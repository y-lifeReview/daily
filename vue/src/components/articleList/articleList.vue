<template>
  <div class="article_list">
    <div
      style="
        background-image: url('https://www.ihewro.com/usr/uploads/2019/01/762065921.jpg');
      "
      class="article_item article_top wow animate__fadeIn"
    >
      <a class="article_top_a" href="">
        <div class="article_top_mask">
          <h3>
            <a href=""
              ><span class="article_top_icon">置顶</span
              >置顶标题置顶标题置顶标题置顶标题置顶标题</a
            >
          </h3>
          <div class="article_top_des">置顶描述置顶描述置顶描述置顶描述</div>
        </div>
      </a>
    </div>
    <template v-for="item in articleList" :key="item">
      <div class="article_item wow animate__fadeIn">
        <img :src="item.url" class="article_img" alt="" />
        <div class="article_info">
          <h2 class="article_title">
            <a href="">{{ item.title }}</a>
          </h2>
          <p class="article_des">{{ item.summary }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { usePost } from "@/hooks/index";
import { urlForGetArticleList } from "@/api/url";
const post = usePost();
export default {
  data() {
    return {
      articleList: [],
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList: function (page = 1) {
      let _this = this;
      post({
        url: urlForGetArticleList,
        data: {
          page,
        },
      })
        .then((res) => {
          // console.log(res);
          let list = res.data || [];
          list.map((item) => {
            item.mode = item.width > item.height ? "hov" : "ver";
          });
          _this.articleList = list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.article_list {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .article_item {
    width: 100%;
    height: 190px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
    border-radius: 6px;
    overflow: hidden;
    // position: relative;
    display: flex;
    .article_img {
      width: 30%;
      height: 190px;
      object-fit: cover;
    }
    .article_info {
      width: 70%;
      height: 100%;
      padding: 30px 50px 15px;
      display: flex;
      flex-direction: column;
      .article_title {
        font-size: 22px;
        color: #555;
        margin: 0;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: normal;
      }
      .article_des {
        margin: 0;
        height: 60px;
        line-height: 2em;
        overflow: hidden;
        word-break: break-word;
        color: #a0a0a0;
      }
    }
  }
  .article_top {
    height: 250px;
    background-size: cover;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .article_top_mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      color: #fff;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5));
      padding: 30px;
      .article_top_icon {
        padding: 0.2em 0.6em 0.3em;
        display: inline;
        font-size: 13px;
        white-space: nowrap;
        border-radius: 0.25em;
        float: left;
        font-weight: 700;
        background-color: #f05050;
        color: #fff;
        margin-right: 15px;
      }
      .article_top_des {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .article_top_a {
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
a {
  text-decoration: none;
}
</style>
