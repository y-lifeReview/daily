//转义 元素的innerHTML内容即使转义后的字符
export function htmlEncode(str) {
    var ele = document.createElement('span');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
}
//解析 
export function htmlDecode(str) {
    var ele = document.createElement('span');
    ele.innerHTML = str;
    return ele.textContent;
}