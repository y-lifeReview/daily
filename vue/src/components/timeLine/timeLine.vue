<template>
  <articleHead :info="{ title }" :isArticle="false" />
  <div class="linebox">
    <el-skeleton :loading="loading" :count="8" animated>
      <el-timeline>
        <el-timeline-item
          class="wow fadeIn"
          v-for="item in timeList"
          :key="item.id"
          :timestamp="item.timestamp"
          placement="top"
          :type="typeAry[item.id % 5]"
          center
          @click="godetail(item.id)"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.nickname }} 提交于 {{ item.updata_at }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-skeleton>
    <div class="pagenation_lox">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="15"
        :pager-count="5"
        :total="articleTotal"
        @prev-click="currentChange"
        @next-click="currentChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { urlForGetArchives } from "@/api/url";
import { usePost } from "@/hooks/index";
import articleHead from "@/components/articleHead/articleHead.vue";
import { timeformatstande } from "@/hooks/timeformat";
const post = usePost();
export default {
  name:"archives",
  components: {
    articleHead,
  },
  data() {
    return {
      loading: true,
      timeList: [],
      title: "文章归档",
      typeAry: ["primary", "success", "warning", "danger", "info"],
      articleTotal: 0,
    };
  },
  mounted() {
    this.getActArchives();
  },
  methods: {
    getActArchives(page=1) {
      post({
        url: urlForGetArchives,
        isProgress: true,
        data:{
          page
        }
      })
        .then((data) => {
          this.loading = false;
          let list = data.data || [];
          list.map((item) => {
            return (item.timestamp = timeformatstande(item.updata_at));
          });
          this.timeList = list;
          this.articleTotal = data.total
          console.log("归档", data);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => {
          this.loading = false;

          console.log("归档err", err);
        });
    },
    godetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id,
        },
      });
    },
    currentChange: function (e) {
      this.getActArchives(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.linebox {
  width: 100%;
  padding: 30px 40px 20px 0;
  .pagenation_lox {
  width: 100%;
  padding: 10px 0 50px;
  .el-pagination {
    width: fit-content;
    margin: auto;
  }
}
}

:deep .el-timeline-item__content {
  //   width: 50%;
  position: relative;
  cursor: pointer;
}
:deep .el-timeline-item__content::after {
  //   width: 50%;
  content: "";
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  border-color: #fff;
  border: transparent 20px solid;
  border-right-color: #fff;
}
</style>
