<template>
  <articleHead :info="info" />
  <div class="article_list">
    <ol class="breadcrumb">
      <li>
        <a href="">
          <span class="bread_icon"><i class="iconfont icon-home1"></i></span
          >首页
        </a>
      </li>
      <li>正文</li>
    </ol>
    <div v-if="info.url"
      :style="'background-image: url(' + info.url + ');'"
      class="article_img"
    ></div>
    <markDown :md="md" />
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
import articleHead from "@/components/articleHead/articleHead.vue";
import markDown from "@/components/markDown/markDown.vue";
import { useGet } from "@/hooks/index";
import {
  articleispasswprd,
  articlecheckpasswprd,
} from "@/hooks/articlepassword";
import { urlForGetArticleDetail } from "@/api/url";
import { timeformatstande } from "@/hooks/timeformat";
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
      proptValue: "",
      ques:'',
      showPropt: false,
      md: "",
      info: {},
    };
  },
  mounted() {
    this.getMdContent(this.$route.params.id);
  },
  methods: {
    input: function () {

      let value = this.$refs.input.value;
      this.proptValue = value;
    },
    enterconfirm:function(e){
      if(e.keyCode == 13){
        this.checkpass()
      }
    },
    checkpass: function () {
      let _this = this;
      let awser = this.proptValue;
      let id = this.$route.params.id;
      // console.log(awser);
      articlecheckpasswprd(id, awser)
        .then((result) => {

          if (!result.data[0]) {
            window.alert("密码错误");
            return;
          } else {
            this.showPropt = false
            get({
              url: urlForGetArticleDetail + "?id=" + id,
            })
              .then((res) => {
                // console.log('详情：',res)
                res.data.updata_at = timeformatstande(res.data.updata_at);
                res.data.article_view = res.data.article_view + "次浏览";
                _this.info = res.data;
                _this.md = marked(res.data.content);
                // let titleAry = marked(res.data.content).match(/<[hH][1-6].*?>.*?<\/[hH][1-6]>/g)
                // console.log('titleAry',titleAry)
              })
              .catch((err) => {
                console.log("详情错误:", err);
              });
          }
        })
        .catch(() => {
          return;
        });
    },
    mdRender: function () {
      const render = new marked.Renderer();
      marked.setOptions({
        renderer: render,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      });
    },
    getMdContent: function (id) {
      let _this = this;
      articleispasswprd(id)
        .then((data) => {
          if (data.data.is_password === 1) {
            this.ques = data.data.ques
            this.showPropt = true;
            return;
          } else {
            get({
              url: urlForGetArticleDetail + "?id=" + id,
            })
              .then((res) => {
                // console.log('详情：',res)
                res.data.updata_at = timeformatstande(res.data.updata_at);
                res.data.article_view = res.data.article_view + "次浏览";
                _this.info = res.data;
                _this.md = marked(res.data.content);
                // let titleAry = marked(res.data.content).match(/<[hH][1-6].*?>.*?<\/[hH][1-6]>/g)
                // console.log('titleAry',titleAry)
              })
              .catch((err) => {
                console.log("详情错误:", err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  left: 40%;
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
#article_md {
  background-color: #fff;
  padding: 30px;
}
.article_list {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f1f3f4;
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
    min-height: 250px;
    position: relative;
    display: block;
    background-position: 50% 50%;
    background-size: cover;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
}
a {
  text-decoration: none;
}
</style>
<style scoped></style>
