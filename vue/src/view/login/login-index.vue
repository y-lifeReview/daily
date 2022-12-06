<template>
  <div class="login_container">
    <div class="container">
      <h1>Please login</h1>
      <form>
        <div class="form-control">
          <input type="text" v-model="name" required />
          <label>
            <span style="transition-delay: 0ms">N</span>
            <span style="transition-delay: 50ms">a</span>
            <span style="transition-delay: 100ms">m</span>
            <span style="transition-delay: 150ms">e</span>
            <!-- <span style="transition-delay: 200ms">l</span> -->
          </label>
        </div>
        <div class="form-control">
          <input type="password" v-model="password" required />

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
          <div class="tips">{{ tips }}</div>
        </div>
        <button @click.prevent="login()" class="btn">Login</button>
        <p class="text">Don't have an account? <a href="#">Register</a></p>
      </form>
    </div>
  </div>
</template>
<script>
import "@/styles/animates.css";
import { hamcSha } from "@/hooks/cryptoJs";
import { urlForLogin, urlForRegister } from "@/api/url";
import { usePost } from "@/hooks/index";
import { setSStorage } from "@/hooks/storage";
// import { urlForGetMockArticle, urlForSaveMockArticle } from "@/api/url";

const post = usePost();

export default {
  data() {
    return {
      name: "",
      password: "",
      tips: "",
    };
  },

  methods: {
    login: function () {
      if (this.name.length === 0 || this.name.trim().length === 0) {
        this.tips = "请输入用户名！";
        return;
      }
      if (this.password.length === 0 || this.password.trim().length === 0) {
        this.tips = "请输入密码！";
        return;
      }
      this.tips = "";
      let name = this.name.trim(),
        password = hamcSha(this.password.trim());
      // console.log(name, password);
      post({
        url: urlForLogin,
        data: {
          name,
          password,
        },
      })
        .then((result) => {
          // console.log(result)
          if(result.code === 200){
            window.alert('登录成功！')
            setSStorage('token',result.data)
          }else{
            window.alert(result.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register: function () {
      post({
        url: urlForRegister,
        data: {
          name: hamcSha("ycc"),
          password: hamcSha("19980508cX"),
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
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
  background-image: linear-gradient(120deg, #a1c4fd, #c2e9fb);
  // #dedfe3,
    // #c7e7fc,
    // #9cf5ff,
    // #89ffe2,
    // #b2ffaa,
    // #f9f871
  // background-image: linear-gradient(to right top, #dedfe3, #bce6fe, #7ef3fb);
  animation: bg-pan-left 5s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  /* background-image: linear-gradient( to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486) */
  background-size: 400% 100%;
  .container {
    background: linear-gradient(145deg, #5c7477, #4f6161);
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
      .tips {
        color: red;
        font-size: 12px;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        min-height: 20px;
      }
    }
    .text {
      margin-top: 30px;
      color: #f9f871 ;
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
