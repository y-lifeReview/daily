<template>
  <articleHead :info="{ title }" :isArticle="false" />
  <div class="linebox">
    <el-skeleton :loading="loading" :count="8" animated>
      <div v-for="(item, index) in timeList" :key="item.id" class="dynamic-box">
        <div
          :class="['line', index === timeList.length - 1 ? 'last-line' : '']"
        ></div>
        <img class="avatar" :src="item.avatar" alt="" />
        <div class="content-box">
          <div class="text-box">
            <div class="info-box">
              <span>{{ item.nickname }}</span>
              <span class="timetemp">{{ item.timestamp }}</span>
            </div>
            <el-input
              class="text"
              v-model="item.content"
              autosize
              readonly
              resize="none"
              type="textarea"
              input-style="border: none;box-shadow: none;letter-spacing:2px;font-size:14px;cursor: default"
            />
            <div v-if="item.imgs.length" class="img-box">
              <template
                v-for="(item_child, index_child) in item.imgs"
                :key="index_child"
              >
                <el-image
                  lazy
                  class="image-item"
                  fit="cover"
                  :src="item_child + '?imageMogr2/format/webp'"
                  :preview-src-list="item.imgs"
                  :initial-index="index_child"
                  ><template #placeholder>
                    <div class="image-slot">
                      Loading<span class="dot">...</span>
                    </div>
                  </template></el-image
                >
              </template>
            </div>
            <div class="type-box">
              <i class="iconfont icon-location"></i
              ><span style="margin-left: 3px">发布于{{ item.type }}</span>
            </div>
          </div>
        </div>
      </div>
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
import { urlForGetDynamic } from "@/api/url";
import { usePost } from "@/hooks/index";
import articleHead from "@/components/articleHead/articleHead.vue";
import { timeformat } from "@/hooks/timeformat";
const post = usePost();
export default {
  name: "life",
  components: {
    articleHead,
  },
  data() {
    return {
      loading: true,
      timeList: [],
      title: "动态",
      typeAry: ["primary", "success", "warning", "danger", "info"],
      articleTotal: 0,
    };
  },
  mounted() {
    this.getDynamic();
  },
  methods: {
    getDynamic(page = 1) {
      post({
        url: urlForGetDynamic,
        isProgress: true,
        data: {
          page,
        },
      })
        .then((data) => {
          this.loading = false;
          let list = data.data || [];
          list.forEach((item) => {
            item.timestamp = timeformat(item.created_at);
            item.imgs ? (item.imgs = item.imgs.split(",")) : (item.imgs = []);
          });
          this.timeList = list;
          this.articleTotal = data.total;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    currentChange: function (e) {
      this.getDynamic(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.linebox {
  width: 100%;
  padding: 30px 40px 20px 40px;
  .line {
    position: absolute;
    top: 0;
    height: 100%;
    left: 4px;
    border-left: 2px solid #e4e7ed;
  }
  .last-line {
    height: 80% !important;
  }
  .dynamic-box {
    color: #777;
    position: relative;
    .avatar {
      position: absolute;
      top: 0;
      left: -16px;
      width: 40px;
      height: auto;
      box-shadow: 2px 2px 3px #e1e1e1;
      border-radius: 20%;
    }
    .content-box {
      position: relative;
      // height: 50px;
      top: -3px;
      width: 100%;
      padding-left: 40px;
      padding-bottom: 20px;

      .text-box {
        position: relative;
        width: 100%;
        // height: 100%;
        background-color: #fff;
        // padding: 20px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        .info-box {
          padding: 10px 15px;
          width: 100%;
          border-bottom: 1px solid rgba(237, 241, 242, 0.6);
          position: relative;
          line-height: 1.5;
          .timetemp {
            float: right;
            color: #a0a0a0;

            font-size: 12px;
          }
        }
        .info-box::before {
          //   width: 50%;
          content: "";
          position: absolute;
          left: -26px;
          top: 50%;
          transform: translateY(-50%);
          border-color: #fff;
          border: transparent 20px solid;
          border-right-color: #fff;
        }
        .text {
          padding: 11px 0 11px 6px;
          word-wrap: break-word;          
          color: #777;
          font-family: Source Sans Pro, Hiragino Sans GB, Microsoft Yahei,
            SimSun, Helvetica, Arial, Sans-serif, monospace;
          font-size: 14px;
          
        }
        .type-box {
          padding: 10px 15px;
          width: 100%;
          border-top: 1px solid rgba(237, 241, 242, 0.6);
          position: relative;
          line-height: 1.5;
          color: #a0a0a0;
          font-size: 10px !important;
          display: flex;
          align-items: center;
        }
        .img-box {
          display: flex;
          margin: 10px;
          margin-top: 0;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;

          .image-item {
            width: 33.3%;
            padding: 5px;
            border-radius: 5px;
            height: 150px;
          }
        }
      }
    }
  }
}
:deep .el-image__inner {
  //   width: 50%;
  border-radius: 5px;
}
.pagenation_lox {
  width: 100%;
  padding: 10px 0 50px;
  .el-pagination {
    width: fit-content;
    margin: auto;
  }
}
</style>
