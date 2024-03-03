import {
    createApp
} from 'vue'
import App from './App.vue'
import "@/styles/main.scss";
import "@/styles/sprinkle.css";
import router from "./router";
import store from "./store"

import {
    pageStay
} from "./utils/pageStay"
import {
    errMonitor
} from "./utils/errorMonitor"

// import ElementUI from 'element-ui'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import vuetyped from 'vue3typed'
import 'animate.css'


import {
    send
} from '@/hooks/datareport'
import 'animate.css/animate.compat.css'
// import 'github-markdown-css'
// createApp.prototype.$wow = wow
// import 'element-plus/dist/index.css'
import './utils/router'
import './mock/article/index'

const app = createApp(App);
app.config.globalProperties.$send = send
app.use(store).use(router).use(vuetyped).use(ElementPlus)
    .use(pageStay(app)).use(errMonitor(app))
// app.config.compilerOptions.isCustomElement = tag => tag === 'meting-js'

app.mount('#app')

export default app