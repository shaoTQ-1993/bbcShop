// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App.vue'

//引入路由
import router from './router/router.js'

import Vuex from 'vuex'
Vue.use(Vuex)


import axios from './common/utils.js'
Vue.prototype.axios = axios

import common from './common/public.js'
Vue.use(common)

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '427eacdf46bb89d5513746a79be2c0f8',
    plugin: ['Geolocation'],
    uiVersion: '1.0'
});

// plugins
import { LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)


Vue.filter("currency", function(value) {
    var newPri = '￥' + parseFloat(value).toFixed(2)
    return newPri;
});

var CommonVM = new Vue();
window.CommonVM = CommonVM;

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    axios,
    template: '<App/>',
    components: {
        App
    }
})