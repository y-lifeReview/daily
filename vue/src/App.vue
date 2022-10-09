<template>
  <router-view />
</template>
<script>

import wow from "wow.js";
 

export default {
  data() {
    return {};
  },
  methods: {
    
  },
  mounted() {
    new wow({
      offset: 50,
    }).init();
    // console.log("mounted");
    window.scrollTo(0, 0);
    
  },
};
</script>
<style></style>
