<template>
  <articleHead :info="info" />
  <div class="article_list">
    <ol class="breadcrumb">
      <li>
        <a href="/">
          <span class="bread_icon"><i class="iconfont icon-home1"></i></span
          >首页
        </a>
      </li>
      <li>正文</li>
    </ol>

    <el-skeleton :loading="loading" :count="7" animated>
      <div
        v-if="info.img"
        :style="'background-image: url(' + info.img + ');'"
        class="article_img"
      ></div>
      <markDown :md="md" />
    </el-skeleton>
    <div class="card_content">
      <div class="comment_headling">
        <i
          style="font-size: 20px; padding-right: 5px"
          class="iconfont icon-Chat-"
        ></i>
        <span>评论</span>
      </div>
      <div id="vcomments"></div>
    </div>
  </div>

  <div v-if="showPropt" class="propt wow animate__fadeInDown">
    <div class="propt_content">
      <span class="propt_tips">请输入密码：</span>
      <input
        @input="input($event)"
        ref="input"
        type="text"
        class="propt_input"
        :placeholder="ques"
        @keyup="enterconfirm($event)"
      />
      <span @click="checkpass" class="propt_btn">确认</span>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/agate.css";
import articleHead from "@/components/articleHead/articleHead.vue";
import markDown from "@/components/markDown/markDown.vue";
import { useGet } from "@/hooks/index";
import {
  articleispasswprd,
  articlecheckpasswprd,
} from "@/hooks/articlepassword";
import { urlForGetArticleDetail } from "@/api/url";
import { timeformatstande } from "@/hooks/timeformat";
import { dirTreeCre } from "@/hooks/dirtreecreate";
import { debounce } from "@/hooks/throttle";
const get = useGet();
export default {
  components: {
    articleHead,
    markDown,
  },
  beforeRouteEnter: function () {},
  beforeRouteUpdate: function () {},
  data() {
    return {
      loading: true,
      proptValue: "",
      ques: "",
      showPropt: false,
      md: "",
      info: {},
      scrollHight: 0,
      dirTreeHeight: [],
      dirDomList: [],
      mdimglist: [
        "https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/upload/blog-avatar.png",
      ],
    };
  },
  mounted() {
    new Valine({
      el: "#vcomments",
      appId: "7ZHDXa3wmta33Xh4s3Sv6gnJ-gzGzoHsz",
      appKey: "0gxFfBMkdkEiA1UnxbMg7v02",
      serverURLs: "https://7zhdxa3w.lc-cn-n1-shared.com",
      path: this.$route.params.id,
      placeholder: "说点什么吧......",
      avatar: "wavatar",
      recordIP: true,
      visitor: true,
      emojiCDN: "//i0.hdslb.com/bfs/emote/",
      emojiMaps: {
        tv_doge: "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
        tv_亲亲: "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
        tv_偷笑: "bb690d4107620f1c15cff29509db529a73aee261.png",
        tv_再见: "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
        tv_冷漠: "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
        tv_发怒: "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
        tv_发财: "34db290afd2963723c6eb3c4560667db7253a21a.png",
        tv_可爱: "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
        tv_吐血: "09dd16a7aa59b77baa1155d47484409624470c77.png",
        tv_呆: "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
        tv_呕吐: "9f996894a39e282ccf5e66856af49483f81870f3.png",
        tv_困: "241ee304e44c0af029adceb294399391e4737ef2.png",
        tv_坏笑: "1f0b87f731a671079842116e0991c91c2c88645a.png",
        tv_大佬: "093c1e2c490161aca397afc45573c877cdead616.png",
        tv_大哭: "23269aeb35f99daee28dda129676f6e9ea87934f.png",
        tv_委屈: "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
        tv_害羞: "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
        tv_尴尬: "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
        tv_微笑: "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
        tv_思考: "90cf159733e558137ed20aa04d09964436f618a1.png",
        tv_惊吓: "0d15c7e2ee58e935adc6a7193ee042388adc22af.png",
        tv_打脸: "56ab10b624063e966bfcb76ea5dc4794d87dfd47.png",
        tv_抓狂: "fe31c08edad661d63762b04e17b8d5ae3c71a757.png",
        tv_抠鼻: "c666f55e88d471e51bbd9fab9bb308110824a6eb.png",
        tv_斜眼笑: "911f987aa8bc1bee12d52aafe62bc41ef4474e6c.png",
        tv_无奈: "ea8ed89ee9878f2fece2dda0ea8a5dbfe21b5751.png",
        tv_晕: "5443c22b4d07fb1907ccc610c8e6db254f2461b7.png",
        tv_流汗: "cead1c351ab8d79e9f369605beb90148db0fbed3.png",
        tv_流泪: "7e71cde7858f0cd50d74b0264aa26db612a8a167.png",
        tv_流鼻血: "c32d39db2737f89b904ca32700d140a9241b0767.png",
        tv_点赞: "f85c354995bd99e28fc76c869bfe42ba6438eff4.png",
        tv_生气: "26702dcafdab5e8225b43ffd23c94ac1ff932654.png",
        tv_生病: "8b0ec90e6b86771092a498c54f09fc94621c1900.png",
        tv_疑问: "0793d949b18d7be716078349c202c15ff166f314.png",
        tv_白眼: "c1d59f439e379ee50eef488bcb5e5378e5044ea4.png",
        tv_皱眉: "72ccad6679fea0d14cce648b4d818e09b8ffea2d.png",
        tv_目瞪口呆: "0b8cb81a68de5d5365212c99375e7ace3e7891b7.png",
        tv_睡着: "8b196675b53af58264f383c50ad0945048290b33.png",
        tv_笑哭: "1abc628f6d4f4caf9d0e7800878f4697abbc8273.png",
        tv_腼腆: "89712c0d4af73e67f89e35cbc518420380a7f6f4.png",
        tv_色: "61822c7e9aae5da76475e7892534545336b23a6f.png",
        tv_调侃: "4bc022533ef31544ca0d72c12c808cf4a1cce3e3.png",
        tv_调皮: "b9c41de8e82dd7a8515ae5e3cb63e898bf245186.png",
        tv_鄙视: "6e72339f346a692a495b123174b49e4e8e781303.png",
        tv_闭嘴: "c9e990da7f6e93975e25fd8b70e2e290aa4086ef.png",
        tv_难过: "87f46748d3f142ebc6586ff58860d0e2fc8263ba.png",
        tv_馋: "fc7e829b845c43c623c8b490ee3602b7f0e76a31.png",
        tv_鬼脸: "0ffbbddf8a94d124ca2f54b360bbc04feb6bbfea.png",
        tv_黑人问号: "45821a01f51bc867da9edbaa2e070410819a95b2.png",
        tv_鼓掌: "1d21793f96ef4e6f48b23e53e3b9e42da833a0f6.png",
      },
      // other config
    });
    this.getMdContent(this.$route.params.id);
    window.addEventListener("scroll", this.scrolling);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrolling);
  },
  watch: {
    scrollHight: {
      handler(newVal) {
        // console.log("位置监听", newVal);
        if (this.$store.state.isDirClick) {
          this.$store.commit("updataIsDirClick", false);
          return;
        }
        let actindex = this.searchInsert(
          JSON.parse(JSON.stringify(this.dirTreeHeight)),
          newVal
        );
        let actId = JSON.parse(JSON.stringify(this.dirDomList))[
          actindex == 0 ? 0 : actindex - 1
        ];

        this.$store.commit("updataDirId", actId);
        // console.log('actId',actId,actindex,newVal,JSON.parse(JSON.stringify(this.dirTreeHeight)))
        // this.dirActIndex = actindex-1<0?0:actindex-1
        // console.log('结果',newVal,JSON.parse(JSON.stringify(this.dirTreeHeight)),actindex)
      },
      immediate: true,
      deep: true,
    },
    $route(to, from) {
      if (this.$route.params.id) {
        this.showPropt = false;
        this.loading = true;
        (this.proptValue = ""), this.getMdContent(this.$route.params.id);
      }
    },
  },
  methods: {
    input: function () {
      let value = this.$refs.input.value;
      this.proptValue = value;
    },
    enterconfirm: function (e) {
      if (e.keyCode == 13) {
        this.checkpass();
      }
    },
    //加密文章验证
    checkpass: function () {
      let _this = this;
      let awser = this.proptValue;
      let id = this.$route.params.id;
      // console.log(awser);
      articlecheckpasswprd(id, awser)
        .then((result) => {
          if (!result.data[0]) {
            _this.$message.warning({
              message: "密码错误",
            });
            return;
          } else {
            this.showPropt = false;
            get({
              url: urlForGetArticleDetail + "?id=" + id,
            })
              .then((res) => {
                // console.log('详情：',res)
                res.data.updata_at = timeformatstande(res.data.updata_at);
                res.data.article_view = res.data.article_view + "次浏览";
                _this.info = res.data;
                _this.md = marked(res.data.content);
                this.loading = false;
                let titleAry =
                  marked(res.data.content).match(
                    /<[hH][1-6].*?>.*?<\/[hH][1-6]>/g
                  ) || [];
                console.log("titleAry", titleAry);
                _this.$nextTick(() => {
                  titleAry.forEach((item, index) => {
                    const sIndex = item.indexOf('id="'),
                      eIndex = item.indexOf('">');
                    const domId = item.slice(sIndex + 4, eIndex);
                    let treeHeight = document.getElementById(domId).offsetTop;
                    _this.dirTreeHeight.push(treeHeight);
                    _this.dirDomList.push(domId);
                  });
                });
                let dirTree = dirTreeCre(titleAry);
                _this.$store.commit("updateDir", dirTree);
                // let titleAry = marked(res.data.content).match(/<[hH][1-6].*?>.*?<\/[hH][1-6]>/g)
                // console.log('titleAry',titleAry)
              })
              .catch((err) => {
                console.log("详情错误:", err);
              });
          }
        })
        .catch(() => {
          _this.$message.error({
              message: "网络错误",
            });
          return;
        });
    },
    //md解析
    mdRender: function () {
      const render = new marked.Renderer();
      render.image = function (href, title, text) {
        return `<img style='cursor:pointer;width:50%;margin:10px auto;display:block'  src='${href}' alt="${text}" title="${
          title ? title : ""
        }">`;
      };
      marked.setOptions({
        renderer: render,
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      });
    },
    //获取文章内容
    getMdContent: function (id) {
      let _this = this;
      this.mdRender();
      articleispasswprd(id)
        .then((data) => {
          if (data.data.is_password === 1) {
            this.ques = data.data.ques;
            this.showPropt = true;
            return;
          } else {
            get({
              url: urlForGetArticleDetail + "?id=" + id,
            })
              .then((res) => {
                console.log("详情：", res);
                res.data.updata_at = timeformatstande(res.data.updata_at);
                res.data.article_view = res.data.article_view + "次浏览";
                _this.info = res.data;
                _this.md = marked(res.data.content).replace(
                  /<pre>/g,
                  "<pre class='hljs'>"
                );
                this.loading = false;
                let titleAry =
                  marked(res.data.content).match(
                    /<[hH][1-6].*?>.*?<\/[hH][1-6]>/g
                  ) || [];
                console.log("titleAry", titleAry);
                _this.$nextTick(() => {
                  titleAry.forEach((item, index) => {
                    const sIndex = item.indexOf('id="'),
                      eIndex = item.indexOf('">');
                    const domId = item.slice(sIndex + 4, eIndex);
                    let treeHeight = document.getElementById(domId).offsetTop;
                    _this.dirTreeHeight.push(treeHeight);
                    _this.dirDomList.push(domId);
                  });
                });
                let dirTree = dirTreeCre(titleAry);
                _this.$store.commit("updateDir", dirTree);
              })
              .catch((err) => {
                this.loading = false;
                console.log("详情错误:", err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrolling: debounce(function () {
      this.scrollHight =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('滚动',document.documentElement.scrollTop || document.body.scrollTop)
    }, 200),
    searchInsert: function (nums, target) {
      let arr = [];
      arr = arr.concat(nums);
      arr.splice(0, 0, target);
      return nums.indexOf(target) > 0
        ? nums.indexOf(target)
        : arr.sort((a, b) => a - b).indexOf(target);
    },
  },
};
</script>

<style lang="scss" scoped>
.propt {
  width: 300px;
  height: 120px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  .propt_content {
    width: 100%;
    height: 100%;
    position: relative;

    .propt_tips {
      position: absolute;
      top: 15px;
      left: 20px;
      font-size: 14px;
      color: black;
    }
    .propt_input {
      position: absolute;
      top: 45px;
      left: 20px;
      width: 260px;
      height: 30px;
      font-size: 14px;
      color: black;
      border-color: #777;
      border: 1px solid;
      border-radius: 4px;
    }
    .propt_btn {
      position: absolute;
      top: 85px;
      right: 20px;
      width: 50px;
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      background-color: #009688;
      color: #fff;
      cursor: pointer;
    }
  }
}

.article_list {
  width: 100%;
  padding: 20px;
  padding-bottom:40px;
  display: flex;
  flex-direction: column;
  background-color: #f1f3f4;
  .card_content {
    display: flex;
    flex-direction: column;
    padding: 10px 20px 20px 20px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 6px;
    color: #777;
    .comment_headling {
      font-size: 20px;
      font-weight: 700;
      position: relative;
      padding-left: 5px;
      top: 15px;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }
  }
  .breadcrumb {
    background-color: #fff;
    padding: 8px 15px;
    margin-bottom: 20px;
    margin-top: 0;
    list-style: none;
    border-radius: 4px;
    font-size: 14px;
    color: #777;
    li {
      display: inline-block;
    }
    li + li:before {
      padding: 0 5px;
      color: #ccc;
      content: "/\00a0";
    }
    .bread_icon {
      width: 14px;
      height: 14px;
      margin-right: 5px;
      i {
        font-size: 14px !important;
      }
    }
  }
  .article_img {
    // min-height: 250px;
    position: relative;
    display: block;
    background-position: 50% 50%;
    background-size: cover;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  }
}
a {
  text-decoration: none;
}
</style>
<style scoped></style>
