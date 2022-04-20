{
    // # Array
        // * attribute
            // constructor : 返回创建数组对象的原型函数
            let ary = [];
            console.log(ary.constructor);
            // length : 设置或返回数组元素的个数
            ary.length = 2;
            console.log(ary); // [,] [empty × 2]
            console.log(ary.length); //2
            // prototype : 允许你向数组对象添加属性 或方法
            Array.prototype.newAtr = 'newAtr';
            console.log(ary.newAtr); // 'newAtr'
        // * methods 
            // concat() : 连接两个或多个数组，返回结果数组
            let ary1 = [1, 2],
                ary2 = [3, 4],
                ary3 = ary1.concat(ary2);
            console.log(ary1); // [1,2] !该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
            console.log(ary3); //[1,2,3,4]

            // copyWithin(target,start,end) : 从数组的指定位置拷贝元素到数组的另一个指定位置中 
            // target:必需。复制到指定目标索引位置; start:可选。元素复制的起始位置;end:可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数
            let ary4 = ['a', 'b', 'c', 'd'];
            let ary5 = ary4.copyWithin(2, 0); //复制数组的前面两个元素到后面两个元素上
            console.log(ary5); //['a','b','a','b']
            console.log(ary4); //['a','b','a','b'] 改变原数组

            // entries() : 返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)
            let ary6 = ['tom', 'jerry'];
            console.log(ary6.entries().next().value); // [ 0, 'tom' ]

            // every() : 用于检测数组所有元素是否都符合指定条件,不会改变原始数组
            // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
            // 如果所有元素都满足条件，则返回 true
            // array.every(function(currentValue,index,arr), thisValue)
            // currentValue:必须。当前元素的值 ; index:可选。当前元素的索引值 ; arr:可选。当前元素属于的数组对象
            let aryEvery = [1, 3, 5, 7];
            let isEvery = aryEvery.every(function (item) {
                return item >= 1
            })
            console.log(isEvery); //true 

            // fill() : 用于将一个固定值替换数组的元素。
            // array.fill(value, start, end)
            // value:必需。填充的值; start:可选。开始填充位置; end:可选。停止填充位置
            let aryFill = [1, 2, 3, 4];
            console.log(aryFill.fill('fill')); //[ 'fill', 'fill', 'fill', 'fill' ]
            console.log(aryFill); //[ 'fill', 'fill', 'fill', 'fill' ] 改变数组

            // filter() ：filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
            let aryFilter = [1, 2, 3, 4];
            let newFilter = aryFilter.filter((item, index) => {
                return item < 3
            })
            console.log(newFilter);

            // find() : find() 方法返回通过测试（函数内判断）的数组的第一个元素的值 如果没有符合条件的元素返回 undefined
            let aryFind = [1, 2, 3, 4];
            let newFind = aryFind.find((item, index) => {
                return item < 3
            })
            console.log(newFind)

            // forEach() : 调用数组的每个元素，并将元素传递给回调函数
            let aryEach = [1, 2, 3, 4];
            let tempEach = []
            let newEach = aryEach.forEach((item, index) => {
                item += 1;
                tempEach.push(item)
            })
            console.log(aryEach) //[1,2,3,4] 不改变原数组
            console.log(newEach) //undefined forEach没有返回值
            console.log(tempEach)

            // from(object,mapFunction,thisValue)：用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
            // 参数：object:必需，要转换为数组的对象;mapFunction:可选，数组中每个元素要调用的函数。;thisValue:可选，映射函数(mapFunction)中的 this 对象
            // eg：通过字符串创建一个数组：
            let myArr = Array.from("RUNOOB");
            console.log(myArr) // [ 'R', 'U', 'N', 'O', 'O', 'B' ]
            let obj = {
                '0': 'a',
                '1': 'b',
                '2': 'c',
                'length': 4
            }
            let newFrom = Array.from(obj);
            console.log(newFrom) //[ 'a', 'b', 'c', undefined ]
            // eg: * from 实现数组去重：*
            let arrSet = Array.from(new Set([1, 2, 1, 2]))
            console.log(arrSet) //[1, 2]

            // includes(searchElement,fromIndex) : 用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false
            // searchElement:必须。需要查找的元素值;fromIndex:可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0
            // ！如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索
            let valInclu = [1, 2, 3].includes(2);
            console.log(valInclu); //true

            // indexOf(item,start):返回数组中某个指定的元素位置，返回 item 的第一次出现的位置。没有搜索到则返回 -1
            // item:要检索的元素；start:可选，开始检索的位置
            let aryIndex = [1, 2, 3, 4, 2]
            console.log(aryIndex.indexOf(2)) // 1
            console.log(aryIndex.indexOf(2, 3)) // 4
            console.log(aryIndex.indexOf(6)) // -1

            // isArray(obj) : 方法用于判断一个*对象*是否为数组
            // obj:必需，要判断的对象
            console.log(Array.isArray(null)) //false
            console.log(Array.isArray([null])) //true
            console.log(Array.isArray(undefined)) //false
            console.log(Array.isArray({})) //false

            // join(separator):用于把数组中的所有元素转换一个字符串
            // separator:可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符
            console.log([1, 2, 3].join()) //'1,2,3'
            console.log([1, 2, 3].join('+')) //'1+2+3'

            // keys()
            var fruits = ["Banana", "Orange", "Apple", "Mango"];
            console.log(fruits.keys());


}