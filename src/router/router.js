import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(Vuex)
    /*import WXUtils from '../common/wx-util.js'*/

import home from '../pages/home'
import entrance from '../pages/entrance'
import login from '../components/login'
import WXlogin from '../components/wx-login'
import category from '../pages/category'
import cart from '../pages/cart'
import myself from '../pages/user/myself'
import search_res from '../pages/search_res'
import storeList from '../pages/store/list'
import brand from '../pages/store/brand'
import store from '../pages/store/store'
import featureDetail from '../pages/featureDetail'
import order from '../pages/user/order'
import address from '../pages/user/address'
import collection from '../pages/user/collection'
import coupon from '../pages/user/coupon'
import footprint from '../pages/user/footprint'
import feedback from '../pages/user/feedback'
import productDetail from '../pages/productDetail'
import search from '../components/search'
import editAdd from '../pages/user/editAdd'
import allGoods from '../pages/allGoods'
import newGoods from '../pages/store/new'
import activity from '../pages/store/activity'
import storeSearch from '../pages/store/searchTitle'
import serve from '../pages/serve'
import merchant from '../pages/home/map/merchant'
import map from '../pages/home/map/map'

import search_all from '../pages/search_all'
import theme from '../pages/theme'
import themeInfo from '../pages/themeInfo'
import day from '../pages/day'
import newActivity from '../pages/newActivity'
import accounts from '../pages/accounts'
import activityInfo from '../pages/activityInfo'
import storeActivity from '../pages/store/storeActivity'
import allStoreGoods from '../pages/allStoreGoods'
import orderInfo from '../pages/user/orderInfo'




const discovery = resolve => {
    require.ensure(['../pages/discovery.vue'], () => {
        resolve(require('../pages/discovery.vue'));
    });
};

const routes = [{
        path: '/m/home',
        name: 'home',
        component: home
    },
    {
        path: '/m/entrance',
        name: 'entrance',
        component: entrance
    },
    {
        path: '/m/login',
        name: 'login',
        component: login
    },
    {
        path: '/m/WXlogin',
        name: 'WXlogin',
        component: WXlogin
    },
    {
        path: '/m/category',
        name: 'category',
        component: category
    }, {
        path: '/m/discovery',
        name: 'discovery',
        component: discovery
    }, {
        path: '/m/featureDetail/:feature_id',
        name: 'featureDetail',
        component: featureDetail
    }, {
        path: '/m/cart',
        name: 'cart',
        component: cart
    }, {
        path: '/m/myself',
        name: 'myself',
        component: myself,
        meta: {
            auth: true, // 这里设置，当前路由需要校验
        }
    },
    //店铺 brand
    {
        path: '/m/brand/:brandId',
        name: 'brand',
        component: brand
    },
    {
        path: '/m/store/:storeId',
        name: 'store',
        component: store
    },
    //订单
    {
        path: '/m/order/:index',
        name: 'order',
        component: order
    },
    /*{
        path: '/m/order',
        name: 'order',
        component(resolve) {
            require.ensure(['../pages/order.vue'], () => {
                resolve(require('../pages/order.vue'));
            });
        }
    },*/
    //地址管理
    {
        path: '/m/address',
        name: 'address',
        component: address
    },
    {
        path: '/m/editAdd/:add_id',
        name: 'editAdd',
        component: editAdd
    },
    //我的收藏
    {
        path: '/m/collection',
        name: 'collection',
        component: collection
    },
    //我的礼券
    {
        path: '/m/coupon',
        name: 'coupon',
        component: coupon
    },
    //我的足迹
    {
        path: '/m/footprint',
        name: 'footprint',
        component: footprint
    },
    //意见反馈
    {
        path: '/m/feedback',
        name: 'feedback',
        component: feedback
    },
    {
        path: '/m/search_res/:catId',
        name: 'search_res',
        component: search_res
    },
    {
        path: '/m/productDetail/:pro_id',
        name: 'productDetail',
        component: productDetail
    },
    {
        path: '/m/storeList',
        name: 'storeList',
        component: storeList
    },
    {
        path: '/m/map',
        name: 'map',
        component: map
    },
    {
        path: '/m/allGoods/:id',
        name: 'allGoods',
        component: allGoods
    },
    {
        path: '/m/newGoods/:id',
        name: 'newGoods',
        component: newGoods
    },
    {
        path: '/m/activity/:id',
        name: 'activity',
        component: activity
    },
    {
        path: '/m/search',
        name: 'search',
        component: search
    },
    {
        path: '/m/store_search/:id',
        name: 'storeSearch',
        component: storeSearch
    },
    {
        path: '/m/serve',
        name: 'serve',
        component: serve
    },
    {
        path: '/m/merchant',
        name: 'merchant',
        component: merchant
    },
    {
        path: '/m/search_all/:keyword',
        name: 'search_all',
        component: search_all
    },
    {
        path: '/m/theme/:id',
        name: 'theme',
        component: theme
    },
    {
        path: '/m/themeInfo/:id',
        name: 'themeInfo',
        component: themeInfo
    },
    {
        path: '/m/day',
        name: 'day',
        component: day
    },
    {
        path: '/m/newActivity',
        name: 'newActivity',
        component: newActivity
    },

    {
        path: '/m/accounts/:ids',
        name: 'accounts',
        component: accounts
    },
    {
        path: '/m/activityInfo/:id',
        name: 'activityInfo',
        component: activityInfo
    },
    {
        path: '/m/storeActivity/:id',
        name: 'storeActivity',
        component: storeActivity
    },
    {
        path: '/m/allStoreGoods/:id/:keyword',
        name: 'allStoreGoods',
        component: allStoreGoods
    },
    {
        path: '/m/orderInfo/:id',
        name: 'orderInfo',
        component: orderInfo
    },
    {
        path: '/',
        redirect: '/m/home'
    }


]

const router = new VueRouter({
    routes,
    mode: 'history',
    hashbang: false,
    history: true
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth)) {
        // 对路由进行验证
        if (localStorage.getItem("login") == 'true') { // 已经登陆
            next();
        } else {
            // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
            // if (WXUtils.isWeiXin()) {
            //     next({
            //         path: '/m/WXlogin',
            //         query: {
            //             toPath: to.name,
            //             fromPath: from.path
            //         }
            //     })
            // } else {
            next({
                    path: '/m/login',
                    query: {
                        toPath: to.name,
                        fromPath: from.path
                    }
                })
                // }
        }
    } else {
        next()
    }
})
export default router;