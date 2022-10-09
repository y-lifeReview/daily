import request from "./axios.config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
    showSpinner: false,
});

function http({
    url,
    data,
    method,
    headers,
    beforeRequest = function(){
        console.log('请求开始')
        NProgress.start();
    },
    afterRequest = function(){
        NProgress.done();
        console.log('请求结束')
    }
}) {
    const successHandler = (res) => {
        // if (res.data.code == 200) {
            afterRequest && afterRequest();
            return res.data;
            
        // }
        // throw new Error(res.data.msg || "请求失败，未知异常");
    };
    const failHandler = (error) => {
        afterRequest && afterRequest();
        throw new Error(error.msg || "请求失败，未知异常");
    };
    beforeRequest && beforeRequest();
    method = method || "GET";
    const params = Object.assign(typeof data === 'function' ? data() : data || {}, {})
    return method === 'GET' ?
        request.get(url, {
            params
        }).then(successHandler, failHandler) :
        request.post(url, params, {
            headers: headers
        }).then(successHandler, failHandler)
}

export function get({
    url,
    data,
    method = "GET",
    beforeRequest,
    afterRequest,
}) {
    return http({
        url,
        method,
        data,
        beforeRequest,
        afterRequest,
    });
}

export function post({
    url,
    data,
    method = "POST",
    headers,
    beforeRequest,
    afterRequest,
}) {
    return http({
        url,
        method,
        data,
        headers,
        beforeRequest,
        afterRequest,
    });
}
export default {
    get,
    post
};