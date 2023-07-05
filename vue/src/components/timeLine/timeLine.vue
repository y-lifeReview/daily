<template>
  <articleHead :info="{ title }" :isArticle="false" />
  <div class="linebox">
    <el-skeleton :loading="loading" :count="8" animated>
      <el-timeline>
        <el-timeline-item
          class="wow  fadeIn"
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
  </div>
</template>
<script>
import { urlForGetArchives } from "@/api/url";
import { usePost } from "@/hooks/index";
import articleHead from "@/components/articleHead/articleHead.vue";
import { timeformatstande } from "@/hooks/timeformat";
const post = usePost();
export default {
  components: {
    articleHead,
  },
  data() {
    return {
      loading: true,
      timeList: [],
      title: "文章归档",
      typeAry: ["primary", "success", "warning", "danger", "info"],
    };
  },
  mounted() {
    this.getActArchives();
  },
  methods: {
    getActArchives() {
      post({
        url: urlForGetArchives,
        isProgress: true,
      })
        .then((data) => {
          this.loading = false;
          let list = data.data || [];
          list.map((item) => {
            return (item.timestamp = timeformatstande(item.updata_at));
          });
          this.timeList = list;
          console.log("归档", data);
        })
        .catch((err) => {
          this.loading = false;
          console.log("归档err", err);
        });
    },
    godetail(id){
        this.$router.push({
        name: "detail",
        params: {
          id
        },
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.linebox {
  width: 100%;
  padding: 30px 40px 20px 0;
}

::v-deep .el-timeline-item__content {
  //   width: 50%;
  position: relative;
  cursor: pointer;
}
::v-deep .el-timeline-item__content::after {
  //   width: 50%;
  content:'';
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  border-color: #fff;
  border:transparent 20px solid;
  border-right-color: #fff;
}
</style>
