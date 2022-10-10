<template>
  <header class="article_head">
    <h1>{{ info.title }}</h1>
    <ul>
      <li>
        <span class="icon_sapn"><i class="iconfont icon-user"></i></span>
        <span>{{ info.nickname }}</span>
      </li>
      <li>
        <span class="icon_sapn"><i class="iconfont icon-time-circle"></i></span>
        <span>{{ info.updata_at }}</span>
      </li>
      <li>
        <span class="icon_sapn"><i class="iconfont icon-eye"></i></span>
        <span>{{ info.article_view }}</span>
      </li>
      <li>
        <span class="icon_sapn"><i class="iconfont icon-number"></i></span>
        <span>{{ info.category }}</span>
      </li>
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
  h1 {
    font-weight: 300;
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    font-size: 13px;
    color: #a0a0a0;
    li {
      display: inline-block;
      padding: 0 5px;
      .icon_sapn {
        margin-right: 5px;
      }
    }
  }
}
</style>
