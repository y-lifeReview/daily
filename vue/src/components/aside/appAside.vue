<template>
  <aside class="app-aside">
    <div class="aside-box scroll-hide">
      <div class="avatar-box wow animate__fadeIn">
        <a href="">
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
            :strings="['减少信息输入，保持理智。']"
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
          <li>
            <a href="">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-icon_github"></i>
              <span>仓库</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-favorites"></i>
              <span>朋友</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-pic"></i>
              <span>相册</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-password"></i>
              <span>日记</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-feeds"></i>
              <span>归档</span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-xinxibar_zhanghu"></i>
              <span>关于</span>
              <i class="iconfont icon-arrow-right right-icon"></i>
            </a>
          </li>
          <div class="nav-line"></div>
          <li class="text-guide">
            <span>组成</span>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-viewlist"></i>
              <span>分类</span>
              <i class="iconfont icon-arrow-right right-icon"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-image-text"></i>
              <span>页面</span>
              <i class="iconfont icon-arrow-right right-icon"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="iconfont icon-account"></i>
              <span>友链</span>
              <i class="iconfont icon-arrow-right right-icon"></i>
            </a>
          </li>
        </ul>
      </nav>
      <div class="nav-footer wow animate__fadeInUp">
        <div>
          <a class="foot-item" href=""
            ><i class="aside-foot-icon iconfont icon-set"></i>
            <small>管理</small></a
          >
        </div>
        <div>
          <a class="foot-item" href=""
            ><i class="aside-foot-icon iconfont icon-dongtai"></i>
            <small>文章</small></a
          >
        </div>
        <div>
          <a class="foot-item" href=""
            ><i class="aside-foot-icon iconfont icon-comments"></i>
            <small>评论</small></a
          >
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
.app-aside {
  width: 220px;
  float: left;
  background-color: #f9f9f9;
  height: 100%;
  position: fixed;
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
          padding: 10px 20px;
          display: flex;
          align-items: center;
        }
      }
    }
    .nav-footer {
      position: absolute;
      bottom: 50px;
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
</style>
