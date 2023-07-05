import {
    createApp
} from 'vue'
import App from './App.vue'
import "@/styles/main.scss";
import "@/styles/sprinkle.css";
import router from "./router";
import store from "./store"

// import ElementUI from 'element-ui'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import vuetyped from 'vue3typed'
import 'animate.css'
// import AOS from "aos";

// import 'aos/dist/aos.css'
// Use import
// AOS.init({
//     duration:700,
//     easing:"ease-in-out-back"
// })
// or Use require


// import VueViewer from 'v-viewer';
// import 'viewerjs/dist/viewer.css'

// const Valine = require('valine');


import 'animate.css/animate.compat.css'
// import 'github-markdown-css'
// createApp.prototype.$wow = wow
// import 'element-plus/dist/index.css'
import './utils/router'
import './mock/article/index'
const app = createApp(App);
app.use(store).use(router).use(vuetyped).use(ElementPlus)
// app.config.compilerOptions.isCustomElement = tag => tag === 'meting-js'
app.mount('#app')