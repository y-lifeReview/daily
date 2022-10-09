const service = require('../request/axios')

const getArticle = function (url) {
    return service.service({
        url,
        method: 'get',
    })
}
module.exports = {
    getArticle
}