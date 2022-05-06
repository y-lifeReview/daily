export function getLStorage(key) {
    
    return JSON.parse(window.localStorage.getItem(key))
}

export function setLStorage(key, value) {
    // console.log(value)
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLStorage(key) {
    window.localStorage.removeItem(key)
}

export function clearLStorage() {
    window.localStorage.clear()
}

// export default {
//     getLStorage,
//     setLStorage,
//     removeLStorage,
//     clearLStorage
// }