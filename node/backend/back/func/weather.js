
const service = require('../request/axios')

const  getWeather =  function (adcode) {
    let url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=947cc16643f4bc1afdf8b54eb96177ad&city='+adcode
    return service.service({
        url,
        method: 'get',
    })
}
const  getAdcode =  function (ip) {

    let url =ip!=='127.0.0.1'?'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad&ip='+ip:'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad'
    return service.service({
        url,
        method: 'get',
    })
}
module.exports= {getWeather,getAdcode}