function getLStorage(key){
    return window.localStorage.getItem(JSON.stringify(key))
}
function setLStorage(key,value){
    window.localStorage.setItem(key,JSON.parse(value))
}
function removeLStorage(key){
    window.localStorage.removeItem(key)
}
function clearLStorage(){
    window.localStorage.clear()
}

export default{
    getLStorage,setLStorage,removeLStorage,clearLStorage
}