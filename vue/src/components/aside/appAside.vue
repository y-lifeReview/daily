<template>
  <aside class="app-aside">
    <div class="aside-box scroll-hide">
      <div class="avatar-box">
        <a href="/about">
          <img
            class="aside-avatar"
            src="https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/blog-avatar.png"
            alt=""
          />
        </a>
        <div class="aside-sign">
          <span class="aside-name">
            <strong class="name-text">明天下小雨</strong>
          </span>
          <vuetyped
            :strings="['山雾漫漫，别迷了路']"
            :loop="true"
            :smart-backspace="true"
            :typeSpeed="150"
            :backSpeed="50"
          >
            <div class="typing sign-text" />
          </vuetyped>
          <!-- <span class="sign-text"></span> -->
        </div>
      </div>
      <nav class="nav-box">
        <ul class="nav-ul">
          <div class="nav-line"></div>
          <li class="text-guide">
            <span>导航</span>
          </li>
          <el-skeleton
            :rows="8"
            style="width: 90%; margin: auto"
            :loading="asideloading"
            animated
          >
            <li v-for="(item, index) in asideList" :key="item.title">
              <!-- 有二级导航 -->
              <template v-if="item.children">
                <div class="second-box" @click="asideExtend(index)">
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                  <i
                    :class="[
                      'iconfont',
                      asideExIndex === index
                        ? 'icon-arrow-down'
                        : 'icon-arrow-right',
                      'right-icon',
                    ]"
                  ></i>
                </div>
                <!-- 二级子项 -->
                <ul
                  v-show="asideExIndex === index"
                  class="animate__animated slideInLeft ul-second nav-ul"
                >
                  <li v-for="itemchild in item.children" :key="itemchild.title">
                    <a
                      v-if="itemchild.is_outweb"
                      target="_blank"
                      :href="itemchild.path"
                    >
                      <span>{{ itemchild.title }}</span>
                    </a>
                    <router-link
                      v-else
                      :to="{path:itemchild.path}"
                      exact-active-class="router-target"
                    >
                      <span>{{ itemchild.title }}</span>
                    </router-link>
                  </li>
                </ul>
              </template>
              <!-- 无二级导航 -->
              <template v-else>
                <a v-if="item.is_outweb" target="_blank" :href="item.path">
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                </a>
                <router-link
                  v-else
                  :to="item.path"
                  exact-active-class="router-target"
                >
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                </router-link>
              </template>
            </li>
          </el-skeleton>
        </ul>
      </nav>
      <div class="nav-footer">
        <div>
          <!-- <a class="foot-item" href="" -->
          <a class="foot-item" target="_blank" :href="'https://www.c-sandm.top/back'">
            <i class="aside-foot-icon iconfont icon-set"></i>
            <small>管理</small>
          </a>
          <!-- </a> -->
        </div>
        <div>
          <a class="foot-item" href="/detail/20"
            ><i class="aside-foot-icon iconfont icon-dongtai"></i>
            <small>文章</small></a
          >
        </div>
        <div>
          <a class="foot-item" href="/contact"
            ><i class="aside-foot-icon iconfont icon-comments"></i>
            <small>评论</small></a
          >
        </div>
      </div>
    </div>
  </aside>
  <!--  -->
  <aside class="app-aside-xs" @click="hidemenu">
    <div class="aside-bg" @click="hidemenu"></div>
    <div class="aside-box scroll-hide">
      <div class="avatar-box">
        <a href="/about">
          <img
            class="aside-avatar"
            src="https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/blog-avatar.png"
            alt=""
          />
        </a>
        <div class="aside-sign">
          <span class="aside-name">
            <strong class="name-text">明天下小雨</strong>
          </span>
          <vuetyped
            :strings="['山雾漫漫，别迷了路']"
            :loop="true"
            :smart-backspace="true"
            :typeSpeed="150"
            :backSpeed="50"
          >
            <div class="typing sign-text" />
          </vuetyped>
          <!-- <span class="sign-text"></span> -->
        </div>
      </div>
      <nav class="nav-box">
        <ul class="nav-ul">
          <div class="nav-line"></div>
          <li class="text-guide">
            <span>导航</span>
          </li>
          <el-skeleton
            :rows="8"
            style="width: 90%; margin: auto"
            :loading="asideloading"
            animated
          >
            <li v-for="(item, index) in asideList" :key="item.title">
              <!-- 有二级导航 -->
              <template v-if="item.children">
                <div class="second-box" @click.stop="asideExtend(index)">
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                  <i
                    :class="[
                      'iconfont',
                      asideExIndex === index
                        ? 'icon-arrow-down'
                        : 'icon-arrow-right',
                      'right-icon',
                    ]"
                  ></i>
                </div>
                <!-- 二级子项 -->
                <ul
                  v-show="asideExIndex === index"
                  class="animate__animated slideInLeft ul-second nav-ul"
                >
                  <li v-for="itemchild in item.children" :key="itemchild.title">
                    <a
                      v-if="itemchild.is_outweb"
                      target="_blank"
                      :href="itemchild.path"
                    >
                      <span>{{ itemchild.title }}</span>
                    </a>
                    <router-link
                      v-else
                      :to="{path:itemchild.path}"
                      exact-active-class="router-target"
                    >
                      <span>{{ itemchild.title }}</span>
                    </router-link>
                  </li>
                </ul>
              </template>
              <!-- 无二级导航 -->
              <template v-else>
                <a v-if="item.is_outweb" target="_blank" :href="item.path">
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                </a>
                <router-link
                  v-else
                  :to="item.path"
                  exact-active-class="router-target"
                >
                  <i :class="['iconfont', 'icon-' + item.icon_string]"></i>
                  <span>{{ item.title }}</span>
                </router-link>
              </template>
            </li>
          </el-skeleton>
        </ul>
      </nav>
      <div class="nav-footer">
        <div>
          <!-- <a class="foot-item" href="" -->
          <a class="foot-item" target="_blank" :href="'https://www.c-sandm.top/back'">
            <i class="aside-foot-icon iconfont icon-set"></i>
            <small>管理</small>
          </a>
          <!-- </a> -->
        </div>
        <div>
          <a class="foot-item" href="/detail/20"
            ><i class="aside-foot-icon iconfont icon-dongtai"></i>
            <small>文章</small></a
          >
        </div>
        <div>
          <a class="foot-item" href="/contact"
            ><i class="aside-foot-icon iconfont icon-comments"></i>
            <small>评论</small></a
          >
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
import { useGet } from "@/hooks/index";
import { urlForGetAsideIinfo } from "@/api/url";
const get = useGet();
export default {
  name: "appAside",
  data() {
    return {
      asideloading: true,
      asideList: [],
      asideExIndex: null,
    };
  },
  mounted() {
    this.getAsideInfo();
  },
  methods: {
    getAsideInfo() {
      get({
        url: urlForGetAsideIinfo,
      })
        .then((res) => {
          console.log("导航数据", res);
          this.asideList = res.data;
          this.asideloading = false;
        })
        .catch((err) => {
          //
          this.asideList = [];
          this.asideloading = false;
        });
    },
    asideExtend(index) {
      // console.log('index',index)
      if (index === this.asideExIndex) {
        this.asideExIndex = null;
        return;
      }
      this.asideExIndex = index;
    },
    hidemenu(){
      document.getElementsByClassName('app-aside-xs')[0].style.left='-220px'
      document.getElementsByClassName('aside-bg')[0].style.display = 'none'
    }
  },
};
</script>
<style lang="scss" scoped>
.app-aside,.app-aside-xs {
  width: 220px;
  // float: left;
  background-color: #f9f9f9;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
  // left: 0;
  height: 100%;
  padding-top: 50px;
  transition: all .4s ease;
  .aside-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    .avatar-box {
      width: 100%;
      padding: 15px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .aside-avatar {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        box-shadow: 2px 2px 3px #e1e1e1;
      }
      .aside-sign {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .aside-name {
          margin-top: 10px;
          .name-text {
            font-weight: 700;
            color: #777;
          }
        }
        .sign-text {
          color: #98a6ad;
          font-size: 12px;
        }
      }
    }
    .nav-box {
      width: 100%;
      padding-bottom: 100px;
      .nav-ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;
        .nav-line {
          width: 100%;
          height: 1px;
          margin: 10px 0;
          overflow: hidden;
          font-size: 0;
          background-color: #fff;
        }
        .text-guide {
          padding-left: 15px;
          font-size: 12px;
          color: #98a6ad;
          margin: 15px 0 10px;
        }
        li > a {
          padding: 6px 10px;
          display: flex;
          align-items: center;
          width: 90%;
          margin: 5px auto;
          border-radius: 5px;
        }
        .second-box {
          position: relative;
          padding: 6px 10px;
          display: flex;
          align-items: center;
          width: 90%;
          margin: 5px auto;
          border-radius: 5px;
          cursor: pointer;
        }

        .ul-second {
          padding: 6px 0;
          margin: 0 10px 5px;
          background-color: #fff;
          border-radius: 5px;
          -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
          a {
            position: relative;
            display: flex;
            align-items: center;
            width: 90%;
            margin: auto;
            cursor: pointer;
          }
        }
        .router-target {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
    .nav-footer {
      position: absolute;
      bottom: 0px;
      padding: 5px;
      width: 100%;
      height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .foot-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        small {
          color: #98a6ad;
          font-size: 13px;
        }
      }
    }
  }
}
.aside-bg{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  // z-index: 3;
}
.app-aside-xs{
  display: none;
}
// .menu-show{
//   animation: menuanishow .4s ease ;
//   animation-fill-mode: both;
// }

// @keyframes menuanishow {
//   from {
//     left: -220px;
//   }
//   to {
//     left: 0px;
//   }
// }
// .menu-hide{
//   animation: menuanihide .4s ease ;
//   animation-fill-mode: both;
// }
// @keyframes menuanishow {
//   from {
//     left: 0;
//   }
//   to {
//     left: -220px;
//   }
// }
</style>
