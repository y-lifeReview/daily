const getClientType = function () {

     
    let clienInfo = localStorage.getItem('clientInfo')
    if(clienInfo) return clienInfo;
    // 获取userAgent信息
    const ua = navigator.userAgent.toLowerCase();
    // 判断是否为IE 浏览器，因为IE浏览器有独特的userAgent信息
    if (/msie|trident/.test(ua)) {
        // IE11 及以下版本
        if (/msie \d+/.test(ua)) {
            const ieVersion = parseInt(ua.match(/msie (\d+)/)[1]);
            clienInfo = `IE ${ieVersion}`;
            
        } else {
            clienInfo = 'IE 11或以上版本';
        }
    }
    // 判断是否为Edge 浏览器
    else if (/edge\/(\d+)/.test(ua)) {
        const edgeVersion = parseInt(ua.match(/edge\/(\d+)/)[1]);
        clienInfo = `Edge ${edgeVersion}`;
    }
    // 判断是否为firefox 浏览器
    else if (/firefox\/(\d+)/.test(ua)) {
        const firefoxVersion = parseInt(ua.match(/firefox\/(\d+)/)[1]);
        clienInfo = `Firefox ${firefoxVersion}`;
    }
    // 判断是否为chrome 浏览器
    else if (/chrome\/(\d+)/.test(ua)) {
        const chromeVersion = parseInt(ua.match(/chrome\/(\d+)/)[1]);
        clienInfo = `Chrome ${chromeVersion}`;
    }
    // 判断是否为Safari 浏览器
    else if (/safari\/(\d+)/.test(ua)) {
        const safariVersion = parseInt(ua.match(/safari\/(\d+)/)[1]);
        clienInfo = `Safari ${safariVersion}`;
    }else{
        clienInfo = 'Unknow_'+ua
    }
    localStorage.setItem('clientInfo',clienInfo)
    return clienInfo
}

module.exports = getClientType