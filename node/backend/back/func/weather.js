
const service = require('../request/axios')
const MD5 = require("md5-node")

const  getWeather =  function (adcode,sig) {
    // console.log(adcode)
    let sig1 = MD5('city='+adcode+'&key=947cc16643f4bc1afdf8b54eb96177ad'+sig)
    // console.log(sig1)
    let url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=947cc16643f4bc1afdf8b54eb96177ad&city='+adcode+'&sig='+sig1
    // console.log(url)
    return service.service({
        url,
        method: 'get',
    })
}
const  getAdcode =  function (ip,sig) {
    // console.log(ip)
    let sig1 = MD5('key=947cc16643f4bc1afdf8b54eb96177ad'+sig)
    // console.log(sig)
    let url =ip!=='127.0.0.1'?'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad&sig='+sig1:'https://restapi.amap.com/v3/ip?key=947cc16643f4bc1afdf8b54eb96177ad&sig='+sig1
    // console.log(url)
    return service.service({
        url,
        method: 'get',
    })
}
module.exports= {getWeather,getAdcode}