import ErrorStackParser from 'error-stack-parser';
import getClientType from '@/hooks/getclientinfo'
import {
    send
} from '@/hooks/datareport'

export function errMonitor(app) {
    if (process.env.NODE_ENV === "development") return;
    app.config.errorHandler = (e) => {
        console.log('vue错误', e)
        // 向追踪服务报告错误
        const Error = ErrorStackParser.parse(e)[0]
        let errObj = {
            errInfo: String(e),
            errSource: Error.fileName,
            errLineno: Error.lineNumber,
            errColno: Error.columnNumber,
            errUrl: window.location.pathname,
            errTime: new Date().getTime(),
            clientInfo: getClientType()
        }

        console.log('错误信息收集:', errObj)
        send('Error', errObj)
    }
    window.addEventListener('unhandledrejection', e => {
        console.log('未处理的promise错误', e.reason)
        const Error = ErrorStackParser.parse(e.reason)[0]

        let errObj = {
            errInfo: e.reason.message,
            errSource: Error.fileName,
            errLineno: Error.lineNumber,
            errColno: Error.columnNumber,
            errUrl: window.location.pathname,
            errTime: new Date().getTime(),
            clientInfo: getClientType()
        }

        console.log('未处理的promise错误', errObj)
        send('Error', errObj)
    })
    window.addEventListener('error', (e) => {
        console.log('资源加载错误', e)
        let errObj = null
        if (e.colno) {
            const Error = ErrorStackParser.parse(e.error)[0]
            errObj = {
                errInfo: e.error.message,
                errSource: Error.fileName,
                errLineno: Error.lineNumber,
                errColno: Error.columnNumber,
                errUrl: window.location.pathname,
                errTime: new Date().getTime(),
                clientInfo: getClientType()
            }
        } else {
            //图片资源排除 或图片资源加载失败截取网页
            if(e.target['localName']==='img') return;
            errObj = {
                errInfo: e.target['localName'],
                errSource: encodeURIComponent(e.target['href'] || e.target['currentSrc'] || e.target['src']),
                errLineno: 0,
                errColno: 0,
                errUrl: window.location.pathname,
                errTime: new Date().getTime(),
                clientInfo: getClientType()
            }
        }
        // console.log('资源加载错误：', errObj)
        send('Error', errObj)
    }, true)
}