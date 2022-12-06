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

<style lang="scss"  scoped>
#article_md{
    /* min-height: 1000px; */
    background-color: #fff;
    padding: 30px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
}
</style>