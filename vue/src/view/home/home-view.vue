<template>
  <div class="main-container">
    <Header></Header>
    <Aside></Aside>
    <div class="main-ontent">
        
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
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 1170px;
  height: 100%;
  margin: auto;
  padding-top: 50px;
  min-height: 100%;
  box-shadow: 0 0 4px 3px rgb(0 0 0 / 5%);
  .main-ontent {
    width: auto;
    margin-left: 220px;
  }
}
</style>
