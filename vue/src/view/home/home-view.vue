<template>
  <div class="main_container">
    <Header
      :city="city"
      :temperature="temperature"
      :weather="weather"
      :weatherBg="weatherBg"
    ></Header>
    <Aside></Aside>
    <div class="main_content">
      <div class="article_content">
        <div class="article_box">
          <router-view v-slot="{ Component }">
            <keep-alive include="articleList">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
        <div class="article_option">
          <div class="right_nav">
            <ul>
              <li
                @click="changeactive(0)"
                data-index="0"
                :class="active == 0 ? 'active' : ''"
              >
                <a>
                  <div class="nav_item">
                    <i class="iconfont icon-like"></i>
                  </div>
                </a>
              </li>
              <li
                @click="changeactive(1)"
                data-index="1"
                :class="active == 1 ? 'active' : ''"
              >
                <a>
                  <div class="nav_item">
                    <i class="iconfont icon-message"></i>
                  </div>
                </a>
              </li>
              <li
                @click="changeactive(2)"
                data-index="2"
                :class="active == 2 ? 'active' : ''"
              >
                <a>
                  <div class="nav_item">
                    <i class="iconfont icon-gift"></i>
                  </div>
                </a>
              </li>
              <span class="active_bar"></span>
            </ul>
            <div class="ri_atc_li">
              <h5>热门文章</h5>
              <ul>
                <el-skeleton :loading="hotloading" animated :count="2">
                  <template v-for="item in hotList" :key="item.id">
                    <router-link :to="{ path: '/detail/' + item.id + '/' }">
                      <li>
                        <a class="hot_icon">
                          <img
                            class="hot_icon"
                            :src="
                              'https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/image/hot (' +
                              ((item.id % 11) + 1) +
                              ').png'
                            "
                            alt=""
                          />
                        </a>
                        <div class="hot_title">
                          <h4>{{ item.title }}</h4>
                          <small>
                            <i class="iconfont icon-eye"></i>
                            <span>{{ item.article_view }}</span>
                          </small>
                        </div>
                      </li>
                    </router-link>
                  </template>
                </el-skeleton>
              </ul>
            </div>
          </div>
          <!-- 博客信息 -->
          <div class="ri_atc_li blog_info">
            <h5>博客信息</h5>
            <ul>
              <el-skeleton :loading="infoloading" animated :count="2">
                <li>
                  <i class="iconfont icon-suggest"></i>
                  <span>文章数目</span>
                  <div class="blog_info_view badge">{{ blogInfo.count }}</div>
                </li>
                <li>
                  <i class="iconfont icon-comments"></i>
                  <span>评论数目</span>
                  <div class="blog_info_view badge">257</div>
                </li>
                <li>
                  <i class="iconfont icon-calendar"></i>
                  <span>运行天数</span>
                  <div class="blog_info_view badge">{{ blogInfo.day }}</div>
                </li>
                <li>
                  <i class="iconfont icon-history"></i>
                  <span>最后活跃</span>
                  <div class="blog_info_view badge">{{ blogInfo.time }}</div>
                </li>
              </el-skeleton>
            </ul>
          </div>
          <!-- 标签 -->
          <div class="ri_atc_li blog_info">
            <h5>标签云</h5>
            <div>
              <el-skeleton :loading="tagloading" animated :count="2">
                <a
                v-for="item in tagList"
                :key="item.category"
                class="badge tags"
                >{{ item.category }}</a
              >
              </el-skeleton>
              
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/app-header.vue";
import Aside from "@/components/aside/appAside.vue";
import { useGet, usePost } from "@/hooks/index";
import { getLStorage, setLStorage } from "@/hooks/storage";
import {
  urlForGetWeather,
  urlForGetHot,
  urlForGetTags,
  urlForGetBlogInfo,
} from "@/api/url";
const get = useGet(),
  post = usePost();
export default {
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      blogInfo: {},
      hotList: [],
      tagList: [],
      active: 0,
      city: "成都市",
      temperature: "20",
      weather: "多云",
      weatherBg:
        "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/weatherbg1.png",
      hotloading: true,
      infoloading:true,
      tagloading:true,
    };
  },
  methods: {
    getWeather: function () {
      get({
        url: urlForGetWeather,
      }).then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          let data = res.data.lives[0];
          if (data.city) {
            setLStorage("city", data.city);
            setLStorage("temperature", data.temperature);
            setLStorage(
              "weather",
              data.weather.replace("/", "a").replace("-", "a")
            );
          }
        } else {
          return;
        }
      });
    },

    changeactive: function (e) {
      if (e === this.active) return;
      this.active = e;
    },
    getHot: function () {
      get({
        url: urlForGetHot,
      })
        .then((data) => {
          // console.log(data)
          this.hotList = data.data || [];
          this.hotloading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTags: function () {
      get({
        url: urlForGetTags,
      })
        .then((data) => {
          // console.log(data)
          this.tagList = data.data || [];
          this.tagloading = false
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBlogInfo: function () {
      post({
        url: urlForGetBlogInfo,
      })
        .then((data) => {
          // console.log('bloginfo',data)
          this.blogInfo = data.data;
          this.infoloading = false
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let date = new Date();
    this.city = getLStorage("city") || "成都市";
    this.temperature = getLStorage("temperature") || "25";
    this.weather = getLStorage("weather") || "多云";
    this.weatherBg =
      "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/weatherbg" +
      Math.ceil(Math.random() * 5) +
      ".png";
    if (!getLStorage("city") || date.getSeconds() % 3 < 2) {
      this.getWeather();
    }
    this.getHot();
    this.getTags();
    this.getBlogInfo();
  },
};
</script>

<style lang="scss" scoped>
.main_container {
  width: 1170px;
  // height: 100%;
  margin: auto;
  padding-top: 50px;
  min-height: 100%;
  box-shadow: 0 0 4px 3px rgb(0 0 0 / 5%);
  .main_content {
    width: auto;
    // height: 100%;
    // min-height: 100%;
    margin-left: 220px;
    position: relative;

    .article_content {
      width: auto;
      // min-height: 100%;
      position: relative;
      height: fit-content;
      background-color: #f9f9f9;
      .article_box {
        width: 710px;
        height: 100%;
        float: left;
        // padding-right: 240px;
        background-color: #f0f3f4;
      }
      .article_option {
        width: 240px;
        float: right;
        // height: 100%;
        // position: absolute;
        // right: 0;
        // top: 0;
        background-color: #f9f9f9;
        ul {
          display: flex;
          position: relative;
          padding: 0;
          margin: 0;
          box-shadow: 4px 0 5px rgb(0 0 0 / 5%), 0 0 0 rgb(0 0 0 / 5%);
          li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
              padding: 10px 15px;
              .nav_item {
                padding: 10px;
              }
            }
          }
          li[data-index="0"].active ~ .active_bar {
            transform: translateX(55%);
          }
          li[data-index="1"].active ~ .active_bar {
            transform: translateX(255%);
          }
          li[data-index="2"].active ~ .active_bar {
            transform: translateX(460%);
          }
          .active_bar {
            content: "";
            position: absolute;
            top: auto;
            bottom: 0;
            height: 2px;
            width: 16.5%;
            background-color: #000;
            left: 0;
            transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        }
        .ri_atc_li {
          opacity: 1;
          padding: 20px;
          h5 {
            font-size: 16px;
            margin-top: 0;
            margin-bottom: 10px;
            color: #777;
            font-weight: 400;
          }
          ul {
            flex-direction: column;
            box-shadow: none;
          }
          li {
            justify-content: start;
            padding: 10px 0;
            a {
              padding: 0;
            }
          }
          .hot_icon {
            display: inline-block;
            width: 40px;
            margin-right: 15px;
            border-radius: 20%;
          }
          .hot_title {
            display: block;
            overflow: hidden;
            h4 {
              font-size: 14px;
              opacity: 0.8;
              font-weight: 400;
              margin: 0;
              color: #777;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: normal !important;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            small {
              color: #a0a0a0;
              margin-top: 10px;
              font-size: 12px;
              display: flex;
              align-items: center;
              i {
                margin-right: 5px;
              }
            }
          }
        }
        .blog_info {
          opacity: 0.8;
          color: #777;
          ul {
            box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
            li {
              display: block;
              background-color: #fff;
              padding: 15px;
              i {
                float: left;
                margin-right: 5px;
              }
              .blog_info_view {
                float: right;
              }
            }
            li:first-child {
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }
            li:last-child {
              border-bottom-right-radius: 4px;
              border-bottom-left-radius: 4px;
            }
          }
          .badge {
            font-size: 12px;
            background-color: #cfdadd;
            text-shadow: 0 1px 0 rgb(0 0 0 / 20%);
            padding: 3px 7px;
            font-weight: 700;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            border-radius: 10px;
          }
          .tags {
            display: inline-block;
            margin: 0 4px 8px 0;
          }
        }
      }
      .clearfix {
        clear: both;
      }
    }
  }
}
</style>
