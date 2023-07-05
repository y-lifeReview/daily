// 函数节流
const  throttle = function(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}
// 防抖
const  debounce = function(func, delay) {
    let time = null;
    return function() {
        if(time!==null){
            clearTimeout(time)
        }
        time = setTimeout(() => {
            func.call(this)
        }, delay);
    }
}
export {
    throttle,
    debounce
}