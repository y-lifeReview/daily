const CryptoJS = require("crypto-js");

const getToken = function(name,key,resolve){
     name = name + new Date().getTime().toString() 
    //  console.log('key',key)
   let str = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(name,key))
   resolve(str)
}

module.exports = {
    getToken
}