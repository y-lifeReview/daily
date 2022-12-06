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
            name: 'list',
            component: List,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/detail/:id',
            component: detail,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/images',
            component: detail,
            meta: {
                keepAlive: false
            }
        }
    ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,

    scrollBehavior(to, from, savedPosition) {
        // console.log(to,savedPosition)
        if (savedPosition && to.meta.keepAlive) {
            return savedPosition;
        }
        return {
            left: 0,
            top: 0
        };
    }
})

export default router