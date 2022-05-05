<template>
  <header class="app-header">
    <div class="header-left">{{city}}</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      city:'成都'
    };
  },
  setup() {
    
  },
};
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 50px;
  max-width: 1170px;
  box-shadow: 0 1px 4px 1px rgb(0 0 0 / 5%);
  background-color: #f9f9f9;
  z-index: 2;
  .header-left {
    width: 220px;
    height: 50px;
    float: left;
    .logo-img {
      width: 100px;
      height: 40px;
    }
  }
}
</style>
