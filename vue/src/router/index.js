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
import images from '@/components/images/appImages.vue'
import imageDetail from '@/components/images/imgDetail.vue'
import category from '@/components/category/category.vue'
import timeLine from '@/components/timeLine/timeLine.vue'
import contact from '@/components/contact/contact.vue'
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
            name:'detail',
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'images',
            component: images,
            meta: {
                keepAlive: false
            },
        },
        {
            path: 'imgs',
            name:'imageDetail',
            component: imageDetail,
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'archives',
            name:'archives',
            component: timeLine,
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'contact',
            name:'contact',
            component: contact,
            meta: {
                keepAlive: false
            }
        },
        {
            path: 'category/:cate',
            component: category,
            meta: {
                keepAlive: false
            },
        },
        
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
router.afterEach((to, from) => {
    // console.log('路由守卫',to,from)  
    //控制左侧导航栏选中
    let path = to.path || '/'
    if (!path.includes('/detail/')) {
        // console.log('清空目录')
        store.commit('updateDir', [])
    }
    // store.commit('changeNowRouter',path)
})
export default router