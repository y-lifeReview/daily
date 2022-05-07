<template>
  <div class="main-container">
    <Header ></Header>
    <Aside></Aside>
    <div class="main-content">
        <div class="article-content">
          <div class="article-box">
            <header  class="box-header">
              <h1 class="">sprinkle</h1>
              <small>她说生命来来往往，哪怕来日方长。</small>
            </header>
            <div class="article_list">
              <div v-for="item in 10" :key="item" class="article_item wow animate__fadeIn"></div>
            </div>
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
  mounted(){
    
  }
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
    .article-content{
      width: auto;
      // min-height: 100%;
      position: relative;
      // height: 100%;
      .article-box{
        width: 100%;
        // height: 100%;
        // float: left;
        padding-right: 240px;
        background-color: #f0f3f4;
        .box-header{
          background-color: #f9f9f9;
          padding: 20px;
          h1{
            font-weight: 300;
            color: #000;
            margin: 0 !important;
          }
          small{
            letter-spacing: 2px;
            color: #a0a0a0;
          }
        }
        .article_list{
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          .article_item{
            width: 100%;
            height: 150px;
            margin-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
            border-radius: 6px;
          }
        }
      }
      .article-option{
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
