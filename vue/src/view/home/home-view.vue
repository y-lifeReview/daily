<template>
  <div class="main-container">
    <Header></Header>
    <Aside></Aside>
    <div class="main-content">
      <div class="article-content">
        <div class="article-box">
          <router-view> </router-view>
        </div>
        <div class="article-option"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/app-header.vue";
import Aside from "@/components/aside/appAside.vue";

export default {
  components: {
    Header,
    Aside,
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 1170px;
  // height: 100%;
  margin: auto;
  padding-top: 50px;
  min-height: 100%;
  box-shadow: 0 0 4px 3px rgb(0 0 0 / 5%);
  .main-content {
    width: auto;
    // height: 100%;
    // min-height: 100%;
    margin-left: 220px;
    .article-content {
      width: auto;
      // min-height: 100%;
      position: relative;
      // height: 100%;
      .article-box {
        width: 100%;
        // height: 100%;
        // float: left;
        padding-right: 240px;
        background-color: #f0f3f4;
        
      }
      .article-option {
        width: 240px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
