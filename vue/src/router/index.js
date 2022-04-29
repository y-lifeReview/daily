import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Login from '@/view/login/login-index.vue'
import Index from '@/view/home/home-view.vue'
export const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
}, {
    path: '/',
    redirect: '/login',
    hidden: true,
}, {
    path: '/index',
    name: 'Index',
    component: Index,
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router