const service = require('../request/axios')

const getArticle = function (id) {
    let url = 'https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/markdown/test.md'
    
    return service.service({
        url,
        method: 'get',
    })
    
}
module.exports = {
    getArticle
}