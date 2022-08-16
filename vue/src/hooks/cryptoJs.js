import CryptoJS from "crypto-js";

const hamcSha = function (str) {
    let hamsStr = CryptoJS.HmacSHA256(str, 'lifeReview')
    return CryptoJS.enc.Hex.stringify(hamsStr)
}

export {
    hamcSha
}