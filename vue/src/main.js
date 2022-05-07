import { createApp } from 'vue'
import App from './App.vue'
import "@/styles/main.css";
import router from "./router";

import ElementPlus from 'element-plus';
import vuetyped from 'vue3typed'

import 'animate.css'
// 这块一定要加,否者会有部分动画无法执行
import 'animate.css/animate.compat.css'

// createApp.prototype.$wow = wow

import 'element-plus/dist/index.css'
import './utils/router'
import './mock/article/index'
const app = createApp(App);
app.use(router).use(ElementPlus).use(vuetyped)
app.mount('#app')

