<template>
  <div id="article_md" class="markdown-body" v-html="md"></div>
</template>

<script>
export default {
    props:{
        md:String
    }
}
</script>

<style  scoped>
#article_md{
    min-height: 1000px;
}
</style>