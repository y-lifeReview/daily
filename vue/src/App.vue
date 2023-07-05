<template>
  <router-view />
</template>
<script>
import { Snow } from "snowjs";
import wow from "wow.js";
import { usePost } from "@/hooks/index";
import { urlForpostIp } from "@/api/url";
const post = usePost();
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    new wow({
      offset: 50,
    }).init();
    // console.log("mounted");
    window.scrollTo(0, 0);
    let snow = new Snow("snowcavas", null, null, 150, 1, 5, 0.5, 1, true);
    snow.start();
    //
    post({
      url: urlForpostIp,
    })
      .then((data) => {})
      .catch((err) => {});
  },
};
</script>
<style></style>
