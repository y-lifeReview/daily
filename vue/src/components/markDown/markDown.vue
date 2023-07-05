<template>
  <div v-viewer="{movable: false}" id="article_md" class="markdown-body hljs" v-html="md"></div>
</template>

<script>
import "@/styles/marked.css";
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";
export default {
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  props: {
    md: String,
  },
};
</script>

<style lang="scss" scoped>
#article_md {
  /* min-height: 1000px; */
  background-color: #fff;
  padding: 30px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
</style>
