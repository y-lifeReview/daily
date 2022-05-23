<template>
  <div class="article_list">
    <div
      v-for="item in 10"
      :key="item"
      class="article_item wow animate__fadeIn"
    ></div>
  </div>
</template>
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
