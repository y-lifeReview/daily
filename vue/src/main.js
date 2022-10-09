import { createApp } from 'vue'
import App from './App.vue'
import "@/styles/main.css";
import router from "./router";

// import ElementPlus from 'element-plus';
import vuetyped from 'vue3typed'

import 'animate.css'

import 'animate.css/animate.compat.css'
import 'github-markdown-css'
// createApp.prototype.$wow = wow

// import 'element-plus/dist/index.css'
import './utils/router'
import './mock/article/index'
const app = createApp(App);
app.use(router).use(vuetyped)
// app.config.compilerOptions.isCustomElement = tag => tag === 'meting-js'
app.mount('#app')

