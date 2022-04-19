{
    // # Array
        // * attribute
            // constructor : 返回创建数组对象的原型函数
            let ary = [];
            console.log(ary.constructor);
            // length : 设置或返回数组元素的个数
            ary.length = 2;
            console.log(ary);  // [,] [empty × 2]
            console.log(ary.length); //2
            // prototype : 允许你向数组对象添加属性 或方法
            Array.prototype.newAtr = 'newAtr';
            console.log(ary.newAtr); // 'newAtr'
        // * methods 
            // concat() : 连接两个或多个数组，返回结果数组
            let ary1 = [1,2],
                ary2 = [3,4],
                ary3 = ary1.concat(ary2);
            console.log(ary1); // [1,2] !该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
            console.log(ary3); //[1,2,3,4]
            
            // copyWithin(target,start,end) : 从数组的指定位置拷贝元素到数组的另一个指定位置中 
            // target:必需。复制到指定目标索引位置; start:可选。元素复制的起始位置;end:可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数
            let ary4 = ['a','b','c','d'];
            let ary5 = ary4.copyWithin(2,0); //复制数组的前面两个元素到后面两个元素上
            console.log(ary5);  //['a','b','a','b']
            console.log(ary4);  //['a','b','a','b'] 改变原数组

            // entries() : 返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)
            let ary6 = ['tom','jerry'];
            console.log(ary6.entries().next().value); // [ 0, 'tom' ]

            // every() : 用于检测数组所有元素是否都符合指定条件,不会改变原始数组
            // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
            // 如果所有元素都满足条件，则返回 true
            // array.every(function(currentValue,index,arr), thisValue)
            // currentValue:必须。当前元素的值 ; index:可选。当前元素的索引值 ; arr:可选。当前元素属于的数组对象
            let aryEvery = [1,3,5,7];
            let isEvery = aryEvery.every(function(item){
                return item >= 1
            })
            console.log(isEvery); //true 

            // fill() : 用于将一个固定值替换数组的元素。
            // array.fill(value, start, end)
            // value:必需。填充的值; start:可选。开始填充位置; end:可选。停止填充位置
            let aryFill = [1,2,3,4];
            console.log(aryFill.fill('fill')); //[ 'fill', 'fill', 'fill', 'fill' ]
            console.log(aryFill); //[ 'fill', 'fill', 'fill', 'fill' ] 改变数组

            // filter() ：filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
            
}