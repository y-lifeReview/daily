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
export function getSStorage(key) {
    
    return JSON.parse(window.sessionStorage.getItem(key))
}

export function setSStorage(key, value) {
    // console.log(value)
    window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function removeSStorage(key) {
    window.sessionStorage.removeItem(key)
}

export function clearSStorage() {
    window.sessionStorage.clear()
}

// export default {
//     getLStorage,
//     setLStorage,
//     removeLStorage,
//     clearLStorage
// }