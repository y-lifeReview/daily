<template>
  <header class="article_head">
    <h1>{{ info.title }}</h1>
    <ul>
      <li>{{ info.nickname }}</li>
      <li>{{ info.updata_at }}</li>
      <li>{{ info.article_view}}</li>
      <li>{{ info.category }}</li>
    </ul>
  </header>
</template>

<script>

export default {
  props: {
    info: Object,
  },
};
</script>

<style lang="scss" scoped>
.article_head {
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  ul{
    list-style: none;
    padding: 0;
    li{
        display: inline-block;
        padding: 0 5px;
    }
  }
}
</style>
