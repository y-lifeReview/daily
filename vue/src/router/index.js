import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Login from '@/view/login/login-index.vue'
export const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
}, {
    path: '/',
    redirect: '/login',
    hidden: true,
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router