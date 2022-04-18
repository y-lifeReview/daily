"use strict";
function sayHello(person) {
    return "hello," + person;
}
let user = "Tom";
console.log(sayHello(user));
//数据类型
//布尔值 boolean
let isDone = false;
//通过new Boolean构造函数创建的对象不是布尔值：
// let bb: boolean = new Boolean(1) //编译错误
// console.log(bb) //[Boolean: true]
//数值 number
let numa = 6;
let hexNum = 0xf00d;
let notANumber = NaN;
let infinityNum = Infinity;
//字符串 string
let myName = "tom";
//模板字符串
let modeStr = `my name is ${myName}`;
//Void :表示没有任何返回值的函数
function alertName() {
    console.log("my name is tom");
}
//Null 和 Undefined null undefined
let n = null;
let u = undefined;
//任意值 Any ：允许赋值为任意类型
let anyData = "string";
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
//类型推论
// TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
// let myFavoriteNumber = 'seven';
// myFavoriteNumber = 7; //报错：myFavoriteNumber被推断为string类型 无法被赋值为number类型
//联合类型 :取值可以为多种类型的一种
let unio;
unio = "string";
unio = 9;
//访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something) {
    return something.length;
}
// length 不是 string 和 number 的共有属性，所以会报错
// 访问 string 和 number 的共有属性是没问题的
function getString(something) {
    return something.toString();
}
let tom = {
    name: "tom",
    age: 6,
};
// 定义的变量比接口少了一些属性是不允许的
let jerry = {
    name: "jerry",
};
//多一些属性也是不允许的
let alice = {
    name: "alice",
    age: 6,
    gender: 1,
};
{
    let people = {
        name: "tom",
    };
}
{
    let tom = {
        name: "Tom",
        age: 25,
        gender: "male",
    };
    let tom3 = {
        name: "Tom",
        age: 25,
        gender: "male",
    };
    let tom4 = {
        id: 89757,
        name: "Tom",
        gender: "male",
    };
    tom4.id = 9527;
}
{
    // 数组的类型
    // 「类型 + 方括号」表示法
    let ary1 = [1, 2, 3];
    // 数组的项中不允许出现其他的类型：
    let ary2 = [1, "2", 3];
    // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
    let ary3 = [1, 2, 3];
    ary3.push("4");
    // 数组泛型
    // 也可以使用数组泛型 Array<elemType> 来表示数组
    let ary4 = [1, 2, 3];
    // any 在数组中的应用 any 表示数组中允许出现任意类型
    let list = ["aaaa", 25, { website: "http://aaa.com" }];
}
{
    // 函数的类型
    // 函数声明、函数表达式
    function sum(x, y) {
        return x + y;
    }
    let sum2 = function (x, y) {
        return x + y;
    };
    // 输入多余的（或者少于要求的）参数，是不被允许的
    sum(1, 2, 3);
    sum2(1);
    // 可选参数 用 ? 表示可选的参数
    function sum3(x, y) {
        if (y) {
            return x + y;
        }
        else {
            return x;
        }
    }
    sum3(1);
    sum3(1, 2);
    // 可选参数必须接在必需参数后面
    function sum4(x, y) {
        if (x) {
            return x + y;
        }
        else {
            return y;
        }
    }
    // 参数默认值 TypeScript 会将添加了默认值的参数识别为可选参数
    // 此时就不受「可选参数必须接在必需参数后面」的限制了
    let sum5 = function (x, y = "abc") {
        return x + y;
    };
    sum5("1");
    function sum6(x = 1, y) {
        return x + y;
    }
    sum6(undefined, 1);
    // 剩余参数 我们可以用数组的类型来定义它 只能是最后一个参数
    function sum7(x, ...items) {
        items.forEach(function (item) {
            x += item;
        });
        return x;
    }
    sum7(1, 2, 3, 4);
    function reverse(x) {
        if (typeof x === "number") {
            return Number(x.toString().split("").reverse().join(""));
        }
        else if (typeof x === "string") {
            return x.split("").reverse().join("");
        }
    }
}
{
    function isFish(animal) {
        if (typeof animal.swim === 'function') {
            //联合类型只能访问共有的属性或方法，在访问animal.swim时会报错；使用类型断言，将animal断言成Fish即可
            return true;
        }
        return false;
    }
    // 将一个父类断言为更加具体的子类
    // 将任何一个类型断言为 any
    // window.foo = 1;
    // (window as any).foo = 1;
    // 将 any 断言为一个具体的类型
    function getCacheData(key) {
        // return (window as any).cache[key];
    }
    const tom = getCacheData('tom');
    // tom.run();
    // 上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。
    // 这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性
    // 联合类型可以被断言为其中一个类型
    // 父类可以被断言为子类
    // 任何类型都可以被断言为 any
    // any 可以被断言为任何类型
    // 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
    // 双重断言 
    // 任何类型都可以被断言为 any
    // any 可以被断言为任何类型
}
{
    function createAry(length, value) {
        let ary = [];
        for (var i = 0; i < length; i++) {
            ary.push(value);
        }
        return ary;
    }
    console.log(createAry(3, 'dsd'));
}




// 