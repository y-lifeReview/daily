import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
import store from '../store'
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
            path: '',
            name: 'list',
            component: List,
            meta: {
                keepAlive: true
            }
        },
        {
            path: 'detail/:id',
            component: detail,
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'images',
            component: detail,
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'about',
            component: detail,
            meta: {
                keepAlive: false
            }
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(),
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
// router.afterEach((to, from) => {
//     // console.log('路由守卫',to,from)
//     //控制左侧导航栏选中
//     let path = to.path||'/'
//     store.commit('changeNowRouter',path)
//   })
export default router