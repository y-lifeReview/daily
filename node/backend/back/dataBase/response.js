const resType = {
    200: {
        code: 200,
        message: 'ok'
    },
    500: {
        code: 500,
        message: 'err'
    },
    
}
const response = function (code, data,other={}) {
    let obj = resType[code]
    if (data) obj.data = data;
    if (other) obj.info = other;
    return obj
}
module.exports = response;