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
import videos from '@/components/videos/videos.vue'
import imageDetail from '@/components/images/imgDetail.vue'
import videoDetail from '@/components/videos/videoDetail.vue'
import category from '@/components/category/category.vue'
import timeLine from '@/components/timeLine/timeLine.vue'
import contact from '@/components/contact/contact.vue'
import life from '@/components/lifeNote/lifeNote.vue'
export const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
        title:'登录'
    }
}, {
    path: '/',
    name: 'Index',
    component: Index,
    meta:{
        title:'首页'
    },
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
                keepAlive: false,
                title:'详情'
            }
        },
        {
            path: 'images',
            component: images,
            meta: {
                keepAlive: false,
                title:'相册'
            },
        },
        {
            path: 'imgs',
            name:'imageDetail',
            component: imageDetail,
            meta: {
                keepAlive: false,
                title:'相册详情'
            }
        },
        {
            path: 'videos',
            component: videos,
            meta: {
                keepAlive: false,
                title:'视频'
            },
        },
        {
            path: 'video',
            name:'videoDetail',
            component: videoDetail,
            meta: {
                keepAlive: false,
                title:'视频详情'
            }
        },
        {
            path: 'archives',
            name:'archives',
            component: timeLine,
            meta: {
                keepAlive: false,
                title:'归档'
            }
        },
        {
            path: 'contact',
            name:'contact',
            component: contact,
            meta: {
                keepAlive: false,
                title:'留言板'
            }
        },
        {
            path: 'category/:cate',
            component: category,
            meta: {
                keepAlive: true,
                title:'分类'
            },
        },
        {
            path: 'life',
            component: life,
            meta: {
                keepAlive: true,
                title:'动态'
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