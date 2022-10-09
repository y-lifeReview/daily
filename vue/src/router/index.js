import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Login from '@/view/login/login-index.vue'
import Index from '@/view/home/home-view.vue'
import List from '@/components/articleList/articleList.vue'
import detail from '@/components/detail/articleDetail.vue'
export const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
}, {
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
            path: '/',
            name:'list',
            component: List,
            
        },
        {
            path: '/detail/:id',
            component: detail
        }
    ]
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