<template>
  <div class="article_list">
    <div
      v-for="item in articleList"
      :key="item"
      class="article_item wow animate__fadeIn"
    >{{item.id}}</div>
  </div>
</template>

<script>
import { usePost } from "@/hooks/index";
import { urlForGetArticleList } from "@/api/url";
const post = usePost();
export default {
  data(){
    return{
      articleList:[]
    }
  },
  mounted() {
    this.getArticleList()
  },
  methods: {
    getArticleList: function (page = 1) {
      let _this = this
      post({
        url: urlForGetArticleList,
        data: {
          page,
        },
      })
        .then((res) => {
          console.log(res);
          _this.articleList = res.data||[]
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
    height: 150px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
    border-radius: 6px;
  }
}
</style>
