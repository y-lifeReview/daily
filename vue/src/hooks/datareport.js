const send = function (type,val) {
    //type:Request,PageEvent,PageStay,Error,Performance
    // val.type = type
    // !val.currentTime ? val.currentTime = new Date().getTime() : '';
    // !val.pageUrl ? val.pageUrl = location.href : '';
    const data = JSON.stringify(val)
    // console.log(`上报类别:${val.type}`, val)
    // new Image().src = `${this.customSendUrl}?${data}`
    new Image().src = `${process.env.VUE_APP_BASE_API}getSendData.gif?type=${type}&data=${data}`
}
export {
    send
}