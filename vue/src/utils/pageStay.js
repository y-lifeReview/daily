import {
    getLStorage,
    setLStorage
} from '@/hooks/storage'

export function pageStay(app) {
    if (process.env.NODE_ENV === "development") return;
    const send = app.config.globalProperties.$send
    //页面停留开始时间
    let pageBeginTime = new Date().getTime();
    let beforeTitle = document.title;
    let beforePageUrl = location.href;
    //页面停留时间上报
    const PageStaySend = (event) => {
        const pageEndTime = new Date().getTime()
        const stayTime = pageEndTime - pageBeginTime
        const obj = {
            pageBeginTime,
            pageEndTime,
            pageTitle: beforeTitle,
            pageUrl: encodeURIComponent(beforePageUrl)
        }
        //记录停留时长大于1s的
        if (stayTime > 1000) {
            let pageStayAry = getLStorage('pageStayAry') || []
            pageStayAry.push(obj);
            // if (event === 'beforeunload') {
            //     console.log('开始上报', pageStayAry)
            send('PageStay', pageStayAry)
            // setLStorage('pageStayAry', [])
            // } else {
            // setLStorage('pageStayAry', pageStayAry)
            // }
        }
        //重置
        pageBeginTime = new Date().getTime()
        beforeTitle = document.title
        beforePageUrl = location.href
    }

    //劫持pushState，replaceState
    const oldPushState = window.history.pushState
    window.history.pushState = function () {
        oldPushState.apply(this, arguments)
        PageStaySend()

        let reqAry = getLStorage('reqAry') || []
        if (reqAry.length) {
            setLStorage('reqAry', [])
            send('Requst', reqAry)
        }
    }
    const oldReplaceState = history.replaceState
    window.history.replaceState = function () {
        oldReplaceState.apply(this, arguments)
        PageStaySend()

        let reqAry = getLStorage('reqAry') || []
        if (reqAry.length) {
            setLStorage('reqAry', [])
            send('Requst', reqAry)
        }
    }

    // beforeunload: html页面销毁阶段,点击刷新按钮或者跳转到一个新项目会触发
    // popstate: back、go和forward触发这个事件
    const Events = ['beforeunload', 'popstate']
    for (const item of Events) {
        // console.log('监听关闭',item)
        window.addEventListener(item, () => {
            PageStaySend(item)

            let reqAry = getLStorage('reqAry') || []
            if (reqAry.length) {
                setLStorage('reqAry', [])
                send('Requst', reqAry)
            }
        })


    }
}