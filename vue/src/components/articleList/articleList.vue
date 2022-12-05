<template>
  <header class="box-header">
    <h1 class="">sprinkle</h1>
    <small>{{ longsign }}</small>
  </header>

  <div class="article_list">
    <el-skeleton :loading="toploading" animated>
      <div
        :style="'background-image: url(' + articleTop.img + ');'"
        class="article_item article_top wow animate__fadeIn"
      >
        <router-link
          class="article_top_a"
          :to="{ path: '/detail/' + articleTop.id + '/' }"
        >
          <div class="article_top_mask">
            <h3>
              <span class="article_top_icon">置顶</span>{{ articleTop.title }}
            </h3>
            <div class="article_top_des">{{ articleTop.summary }}</div>
          </div>
        </router-link>
      </div>
    </el-skeleton>
    <el-skeleton :loading="listloading" :count="6" animated>
      <template v-for="item in articleList" :key="item">
        <div class="article_item wow animate__fadeIn">
          <img :src="item.img" class="article_img" alt="" />
          <div class="article_info">
            <h2 class="article_title">
              <router-link :to="{ path: '/detail/' + item.id + '/' }">
                {{ item.title }}
              </router-link>
            </h2>
            <p class="article_des">{{ item.summary }}</p>
            <div class="line"></div>
            <div class="other_info">
              <li>
                <span class="icon_sapn"
                  ><i class="iconfont icon-user"></i
                ></span>
                <span>{{ item.nickname }}</span>
              </li>
              <li>
                <span class="icon_sapn"
                  ><i class="iconfont icon-time-circle"></i
                ></span>
                <span>{{ item.updata_at }}</span>
              </li>
              <li>
                <span class="icon_sapn"><i class="iconfont icon-eye"></i></span>
                <span>{{ item.article_view }}</span>
              </li>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <div class="pagenation_lox">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="6"
      :pager-count="5"
      :total="articleTotal"
      @prev-click="currentChange"
      @next-click="currentChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
let timer = null;
import { usePost, useGet } from "@/hooks/index";
import {
  urlForGetArticleList,
  urlForGetArticleTop,
  urlForGetLongSign,
} from "@/api/url";
import { timeformatstande } from "@/hooks/timeformat";
const post = usePost(),
  get = useGet();
export default {
  name: "articleList",
  data() {
    return {
      articleTop: {},
      articleList: [],
      longsign: "",
      toploading: true,
      listloading: true,
      articleTotal: 0,
    };
  },

  mounted() {
    this.getArticleTop();
    this.getArticleList();
    // let _this = this;
    // timer = setInterval(() => {
    //   _this.getSign();
    // }, 15000);
  },
  unmounted() {
    clearInterval(timer);
  },
  methods: {
    // 置顶文章
    getArticleTop: function () {
      let _this = this;
      post({
        url: urlForGetArticleTop,
        data: {},
      })
        .then((res) => {
          // console.log(res);
          let list = res.data[0];
          _this.articleTop = list;
          _this.toploading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //文章列表
    getArticleList: function (page = 1) {
      let _this = this;
      post({
        url: urlForGetArticleList,
        data: {
          page,
        },
        isProgress:true
      })
        .then((res) => {
          // console.log(res);
          let list = res.data || [];
          list.map((item) => {
            item.mode = item.width > item.height ? "hov" : "ver";
            item.updata_at = timeformatstande(item.updata_at);
            item.article_view = item.article_view + "次浏览";
          });
          _this.articleList = list;
          _this.listloading = false;
          _this.articleTotal = res.total;
          _this.getSign();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => {
          console.log(err);
          _this.getSign();
        });
    },
    //签名获取
    getSign: function () {
      get({
        url: urlForGetLongSign,
        data: "",
        method: "GET",
        beforeRequest: () => {},
        afterRequest: () => {},
      }).then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          // console.log(res)
          this.longsign = res.data[0].content;
        } else {
          this.longsign = "欲买桂花同载酒，只可惜故人...";
          return;
        }
      });
    },
    currentChange: function (e) {
      this.getArticleList(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.box-header {
  background-color: #f9f9f9;
  padding: 20px;
  h1 {
    font-weight: 300;
    color: #000;
    margin: 0 !important;
  }
  small {
    letter-spacing: 2px;
    color: #a0a0a0;
  }
}
.article_list {
  width: 100%;
  min-height: 1000px;
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
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #a0a0a0;
      }
      .line {
        border-color: rgba(237, 241, 242, 0.6);
        border-bottom: 1px solid rgba(222, 229, 231, 0.45);
        width: 100%;
        height: 2px;
        margin: 15px 0;
        overflow: hidden;
        font-size: 0;
      }
      .other_info {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #a0a0a0;
        li {
          display: inline-block;
          padding: 0 5px;
          .icon_sapn {
            margin-right: 5px;
          }
        }
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
.pagenation_lox {
  width: 100%;
  padding: 10px 0 50px;
  .el-pagination {
    width: fit-content;
    margin: auto;
  }
}
a {
  text-decoration: none;
}
</style>
