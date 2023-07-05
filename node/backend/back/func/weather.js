const service = require('../request/axios')
const MD5 = require("md5-node")

const getWeather = function (adcode, sig) {
    let sig1 = MD5('city=' + adcode + '&key=947cc16643f4bc1afdf8b54eb96177ad' + sig)
    let url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=947cc16643f4bc1afdf8b54eb96177ad&city=' + adcode + '&sig=' + sig1
    return service.service({
        url,
        method: 'get',
    })
}
const getAdcode = function (ip, sig) {
    let sig1 = MD5('ip='+ip+'&key=947cc16643f4bc1afdf8b54eb96177ad' + sig)
    let url = ip !== '127.0.0.1' ? 'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad&sig=' + sig1 +'&ip='+ip: 'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad&sig=' + sig1
    return service.service({
        url,
        method: 'get',
    })
}
module.exports = {
    getWeather,
    getAdcode
}