<template>
  <div class="login_container">
    <div class="container">
      <h1>Please Login</h1>
      <form>
        <div class="form-control">
          <input type="text" required />
          <!-- <label>Email</label> -->
          <label>
            <span style="transition-delay: 0ms">N</span>
            <span style="transition-delay: 50ms">a</span>
            <span style="transition-delay: 100ms">m</span>
            <span style="transition-delay: 150ms">e</span>
            <!-- <span style="transition-delay: 200ms">l</span> -->
          </label>
        </div>

        <div class="form-control">
          <input type="password" required />
          <!-- <label>Password</label> -->
          <label>
            <span style="transition-delay: 0ms">P</span>
            <span style="transition-delay: 50ms">a</span>
            <span style="transition-delay: 100ms">s</span>
            <span style="transition-delay: 150ms">s</span>
            <span style="transition-delay: 200ms">w</span>
            <span style="transition-delay: 250ms">o</span>
            <span style="transition-delay: 300ms">r</span>
            <span style="transition-delay: 350ms">d</span>
            <!-- <span style="transition-delay: 200ms">l</span> -->
          </label>
        </div>

        <button @click="reset()" class="btn">Login</button>

        <p class="text">Don't have an account? <a href="#">Register</a></p>
      </form>
    </div>
  </div>
</template>
<script>
import "@/styles/animates.css";
import { useGet, usePost } from "@/hooks/index";
import { urlForGetMockArticle, urlForSaveMockArticle } from "@/api/url";


const post = usePost();
const get = useGet();
function save(obj){
  post({url:urlForSaveMockArticle,data:obj}).then((res)=>{
    console.log('保存结果',res)
  })
}
function set() {
  get({ url: urlForGetMockArticle }).then((res) => {
    console.log("res", res);
    save(res.data[0])
  });
}
export default {
  return: {},
  methods: {
    reset: function () {
      set();
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");
.login_container {
  width: 100vw;
  height: 100vh;
  color: #fff;
  font-family: "Muli", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  // background-image: url('@/assets/bg.jpg');
  background-image: linear-gradient(
    to right top,
    #dedfe3,
    #c7e7fc,
    #9cf5ff,
    #89ffe2,
    #b2ffaa,
    #f9f871
  );
  // background-image: linear-gradient(to right top, #dedfe3, #bce6fe, #7ef3fb);
  animation: bg-pan-left 5s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  /* background-image: linear-gradient( to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486) */
  background-size: 400% 100%;
  .container {
    background: linear-gradient(145deg, #8cdde6, #a7ffff);
    box-shadow: 35px 35px 70px #85d0d9, -35px -35px 70px #b3ffff;
    padding: 20px 40px;
    border-radius: 25px;
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #f9f871;
    }
    .form-control {
      position: relative;
      margin: 20px 0 40px;
      width: 300px;
      input {
        background-color: transparent;
        border: 0;
        border-bottom: 2px #fff solid;
        display: block;
        width: 100%;
        padding: 15px 0;
        font-size: 18px;
        color: #fff;
      }
      input:focus,
      input:valid {
        outline: 0;
        border-bottom-color: #8f939b;
      }
      input:focus + label span,
      input:valid + label span {
        color: #8f939b;
        transform: translateY(-30px);
      }
      label {
        position: absolute;
        top: 15px;
        left: 0;
        pointer-events: none;
        span {
          display: inline-block;
          font-size: 18px;
          min-width: 5px;
          transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      }
    }
    .text {
      margin-top: 30px;
      color: #fff;
    }
    .btn {
      cursor: pointer;
      display: inline-block;
      width: 100%;
      background: lightblue;
      padding: 15px;
      font-family: inherit;
      font-weight: bold;
      font-size: 1.5em;
      border: 0;
      border-radius: 5px;
    }
    .btn:focus {
      outline: 0;
    }

    .btn:active {
      transform: scale(0.98);
    }
    a {
      text-decoration: none;
      color: rgb(4, 136, 153);
    }
  }
}
</style>
