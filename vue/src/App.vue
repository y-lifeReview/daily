<template>
  <h1>
    {{msg}}
  </h1>
  <img  :[obj.attr]="obj.src" alt="">
  <div @click="setMsg()" v-for="(item,index) in list" :key="index">{{item}}--{{index}}</div>
  <div :class="{'active':isActive,'error':isError}">hello</div>
  <div :class="[class1,class2]">hello</div>
  <div :class="[isActive?class1:class2]">hello</div>
  <div :style="'color:'+color">hello</div>
  <div :style="{'color':color,'fontSize':fontSize}">hello</div>
  <div :style="colorObj">hello</div>
</template>
<script>
export default {
  data(){
    return {
      msg:'s你好',
      obj:{
        attr:'src',
        src:'dsadas.png'
      },
      list:[1,2,3],
      isActive:true,
      isError:false,
      class1:'class1',
      class2:'class2',
      color:'red',
      fontSize:'20px',
      colorObj:{
        color:'red'
      }
    }
  },
  methods:{
    setMsg(){
      this.msg = 'changed'
    }
  }
}
</script>
<style >
  h1{
    text-align: center;
    /* color:red; */
  }
  .active{
    background-color: aqua;
  }
  .error{
    font-size: red;
  }
  .class1{
    width: 100px;
  }
  .class2{
    height: 100px;
    background-color: aquamarine;
  }
</style>