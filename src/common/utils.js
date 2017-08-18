/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import Qs from 'qs'
//import WXUtils from './wx-util.js'
// import store from './store/store'
// import * as types from './store/types'
// import router from './router'

// axios 配置
axios.defaults.timeout = 500000;
// axios.defaults.baseURL = 'http://192.168.1.216:8080';
axios.defaults.baseURL = 'http://192.168.20.104:8180';

//axios.defaults.baseURL = 'http://tv.pinchengkeji.com';
//axios.defaults.baseURL = 'http://shop.pinchengkeji.com';
// axios.defaults.contentType = 'application/json';
// axios.defaults.dataType = 'string'

// http request 拦截器
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    config => {

        if (localStorage.getItem("sessionid")) {
            config.headers.Authorization = localStorage.getItem("sessionid");
        }
        if (config.method == 'post') {
            var querystring = require('querystring');
            config.data = querystring.stringify(config.data);
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(function(response) {

    if (response.data.code == '0001') {
        axios.get('/rest/wechat/getToken')
            .then(response => {

                localStorage.setItem("sessionid", response.data.data.token);

            })
            // localStorage.removeItem("WXOAUTH2INFO");
            //      WXUtils.isWeiXin();
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;