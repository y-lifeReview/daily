<template>
  <articleHead :info="info" />
  <div class="article_list">
    <markDown :md="md" />
  </div>
</template>

<script>
import { marked } from "marked";
import articleHead from "@/components/articleHead/articleHead.vue";
import markDown from "@/components/markDown/markDown.vue";
import { useGet } from "@/hooks/index";
import { urlForGetArticleDetail } from "@/api/url";
import { timeformatstande } from "@/hooks/timeformat";
const get = useGet();
export default {
  components: {
    articleHead,
    markDown,
  },
  data() {
    return {
      md: "",
      info: {},
    };
  },
  mounted() {
    this.getMdContent(this.$route.params.id);
  },
  methods: {
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
      get({
        url: urlForGetArticleDetail + "?id=" + id,
      })
        .then((res) => {
          // console.log('详情：',res)
          res.data.updata_at = timeformatstande(res.data.updata_at)
          res.data.article_view = res.data.article_view+'次浏览'
          _this.info = res.data;
          _this.md = marked(res.data.content);
          // let titleAry = marked(res.data.content).match(/<[hH][1-6].*?>.*?<\/[hH][1-6]>/g)
          // console.log('titleAry',titleAry)
        })
        .catch((err) => {
          console.log("详情错误:", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
a {
  text-decoration: none;
}
</style>
<style  scoped></style>
