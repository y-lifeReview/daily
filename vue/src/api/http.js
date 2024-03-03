import request from "./axios.config";
import NProgress, {
    set
} from "nprogress";
import {
    getLStorage,
    setLStorage
} from "@/hooks/storage";
import "nprogress/nprogress.css";
import app from '@/main'
NProgress.configure({
    showSpinner: false,
    parent: '#progress_content'
});

function http({
    url,
    data,
    method,
    headers,
    beforeRequest = function () {
        // console.log('请求开始')
    },
    afterRequest = function () {
        // console.log('请求结束',isProgress)
        if (NProgress && isProgress) NProgress.done();
    },
    isProgress = false,
}) {
    const requestBeginTime = new Date().getTime()
    const successHandler = (res) => {
        afterRequest && afterRequest();
        if (process.env.NODE_ENV === "production") {
            const requestEndTime = new Date().getTime()
            reqObj.reqDuration = requestEndTime - requestBeginTime;
            reqObj.status = res.status
            //上报数据
            let reqAry = getLStorage('reqAry') || []
            reqAry.push(reqObj)
            if (reqAry.length >= 5) {
                setLStorage('reqAry', [])
                app.config.globalProperties.$send('Requst', reqAry)
            } else {
                setLStorage('reqAry', reqAry)
            }
        }
        return res.data;

    };
    const failHandler = (error) => {
        afterRequest && afterRequest();
        if (process.env.NODE_ENV === "production") {
            const requestEndTime = new Date().getTime()
            reqObj.reqDuration = requestEndTime - requestBeginTime;
            reqObj.status = error.code
            //上报数据
            let reqAry = getLStorage('reqAry') || []
            reqAry.push(reqObj)
            if (reqAry.length >= 5) {
                setLStorage('reqAry', [])
                app.config.globalProperties.$send('Requst', reqAry)
            } else {
                setLStorage('reqAry', reqAry)
            }
        }

        throw new Error(error.msg || "请求失败，未知异常");
    };

    if (isProgress) NProgress.start();
    beforeRequest && beforeRequest();
    method = method || "GET";
    const params = Object.assign(typeof data === 'function' ? data() : data || {}, {})
    const reqObj = {
        'reqStart': requestBeginTime,
        url,
        method,
        params: JSON.stringify(params)
    }
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
    isProgress
}) {
    return http({
        url,
        method,
        data,
        beforeRequest,
        afterRequest,
        isProgress
    });
}

export function post({
    url,
    data,
    method = "POST",
    headers,
    beforeRequest,
    afterRequest,
    isProgress
}) {
    return http({
        url,
        method,
        data,
        headers,
        beforeRequest,
        afterRequest,
        isProgress
    });
}
export default {
    get,
    post
};