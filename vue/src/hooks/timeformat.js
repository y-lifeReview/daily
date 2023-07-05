

const timeformatstande = function (str) {
    return str.substring(0,4)+'年'+str.substring(5,7)+'月'+str.substring(8,10)+'日'
}

export {
    timeformatstande
}