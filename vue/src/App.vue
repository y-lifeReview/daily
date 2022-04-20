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
  <button data-aid="123" @click="setFun($event)">方法</button>
  <br>
  <input type="text" @keyup.enter="doSearch()">
  <br>
  <h3>人员登记系统</h3>
  <text>姓名：</text>
  <input id="name" type="text" v-model="username">
  <div>{{username}}</div>
  <br>
  <text>年龄：</text>
  <input type="text" ref="age">
  <button @click="doGet($event)">获取表单内容</button>
  <br>
  <text>性别：</text>
  <input type="radio" name="sex" id="sex1" value="1" v-model="sex"><label for="sex1">男</label>
  <input type="radio" name="sex" id="sex2" value="2" v-model="sex"><label for="sex2">女</label>
</template>
<script>
export default {
  data(){
    return {
      msg:'s你好',
      username:'defalut',
      sex:1,
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
    },
    setFun(e){
      console.log(e.srcElement.dataset.aid)
      // console.log(e.keycode)
      // 事件修饰符 
      // .stop:阻止冒泡；.prevent:阻止默认行为;...
      // 按键修饰符：.enter:回车键； ...  or e.keyCode

    },
    doSearch(){
      console.log('按键修饰符-回车')
    },
    doGet(e){
      console.log(e)
      let query = document.querySelector("#name")
      console.log(query.value)
      console.log(this.$refs.age.value)
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