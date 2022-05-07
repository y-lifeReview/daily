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
    redirect: '/index',
    hidden: true,
}, {
    path: '/index',
    name: 'Index',
    component: Index,
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router