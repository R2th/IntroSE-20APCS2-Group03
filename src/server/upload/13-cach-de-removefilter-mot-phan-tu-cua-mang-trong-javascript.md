Xin chào mọi người, sau một hồi lướt trên internet thì mình tìm được một bài khá hay về Javascript. Nên mình xin phép dịch lại nội dung bài viết đó.

Bạn có thể tham khảo bài viêt gốc ở [đây](https://javascript.plainenglish.io/13-methods-to-remove-filter-an-item-in-an-array-and-array-of-objects-in-javascript-f02b71206d9d)
# 13 Methods To Remove/Filter an Item in an Array (and Array of Objects) in JavaScript
> I know small stones doesn’t make much difference but if we get thousand of stones it will and for that I will come with new stone tomorrow. Stay tuned :+1:

Chúng ta có thể tìm ra một hay nhiều cách khác nhau để có thể xóa một phần tử trong mảng hoặc là mảng các object dựa trên một hoặc nhiều thuộc tính của phần tử đó. Hôm nay chúng ta cùng tìm hiểu các cách để xóa hoặc lọc một phần tử từ một mảng dựa trên các thuộc tính của nó trong Javascript.

## 1. pop()
`pop()` method sẽ xóa đi phần tử cuối cùng của một mảng và trả về phần tử đó. Khi sử dụng `pop` thì nó sẽ thực hiện xóa trực tiếp vào mảng ban đầu.
### Array:
```
let arraypoptest = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let testpop = arraypoptest.pop();

console.log("array pop", testpop,"-", arraypoptest);
// array pop 10 - [2, 1, 2, 5, 6, 7, 8, 9, 9];
```
### Array of objects:
```
let users1 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let testpop1 = users1.pop();

console.log("array of objects pop", SON.stringify(testpop1),  "-", JSON.stringify(users1)
);
// array of objects pop {"id":4,"name":"sara"} - [{"id":1,"name":"ted"},{"id":2,"name":"mike"},{"id":3,"name":"bob"}]
```

## 2. shift()
Ngược lại với `pop()`, `shift()` sẽ xóa đi phần tử đầu tiên của mảng và trả về phần tử đó. Nó cũng sẽ xóa trực tiếp vào mảng ban đầu.
### Array:
```
let arrayshifttest = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let testshift = arrayshifttest.shift();

console.log("array shift", testshift,"-", arrayshifttest);
// array shift 2 - [1, 2, 5, 6, 7, 8, 9, 9, 10]
```
### Array of objects:
```
let users2 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let testshift1 = users2.shift();

console.log("array of objects shift", JSON.stringify(testshift1),"-", JSON.stringify(users2));
// array of objects shift {"id":1,"name":"ted"} - [{"id":2,"name":"mike"},{"id":3,"name":"bob"},{"id":4,"name":"sara"}]
```

## 3. slice()
`slice()` method sẽ trả về một mảng mới bao gồm các phần tử của mảng bắt đầu từ vị trí `start` đến `end` (không bao gồm mảng ở vị trí `end`) của mảng ban đầu. Trong đó các giá trị `start` và `end` tương đương với giá trị index của mảng. Mảng ban đầu sẽ không bị thay đổi giá trị.
### Array:
```
let arrayslicetest = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let testslice = arrayslicetest.slice(0, 3);

console.log("array slice", testslice, arrayslicetest); 
//not changed original array
// array slice [2, 1, 2] - [2, 1, 2, 5, 6, 7, 8, 9, 9, 10]
```
### Array of objects:
```
let users3 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let testslice1 = users3.slice(0, 3);

console.log("array of objects slice", JSON.stringify(testslice1));
//not changed original array
// array of objects slice [{"id":1,"name":"ted"},{"id":2,"name":"mike"},{"id":3,"name":"bob"}]
```

## 4. splice()
`splice()` method được sử dụng để thay đổi giá trị của mảng như là xóa hoặc thay thế một phần tử tỏng mảng hoặc là thêm một phần tử mới vào một vị trí trong mảng.
### Array:
```
let arraysplicetest = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let testsplice = arraysplicetest.splice(0, 3);

console.log("array splice", JSON.stringify(testsplice),"-", JSON.stringify(arraysplicetest));
// array splice [2, 1, 2] - [5, 6, 7, 8, 9, 9, 10]
```
### Array of objects:
```
let users4 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let testspice1 = users3.splice(0, 3);

console.log("array of objects splice", JSON.stringify(testsplice));
// array of objects splice [{"id":1,"name":"ted"},{"id":2,"name":"mike"},{"id":3,"name":"bob"}]
```

## 5. Xóa một phần tử bất kỳ trong mảng sử dụng splice
### Array:
```
let arr = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 5) {
        arr.splice(i, 1);
    }
}

console.log("splice with specific value", arr);
// splice with specific value [2, 1, 2, 6, 7, 8, 9, 9, 10]
```
### Array of objects:
```
let users5 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
for (var i = 0; i < users5.length; i++) {
    if (users5[i].name === "ted") {
        users5.splice(i, 1);
    }
}

console.log("splice with specific value array of objects", JSON.stringify( users5));
// splice with specific value array of objects [{"id":2,"name":"mike"},{"id":3,"name":"bob"},{"id":4,"name":"sara"}]
```

## 6. Xóa một phần tử bất kỳ trong mảng sử dụng splice - cách ngắn gọn hơn
Mình xin nhắc lại, `splice()` method có thể thay đổi nội dung của một mảng bằng cách xóa hoặc thay thế phần tử đã tồn tại hoặc là thêm phần tử mới vào mảng.
`indexOf()` method trả về index của phần tử đầu tiên tìm thấy trong mảng và nó sẽ trả về -1 nếu phần tử đó không có trong mảng.
### Array:
```
let arrShorthand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let val = arrShorthand.indexOf(5);
arrShorthand.splice(val, 1);

console.log("splice shorthand specific value", arrShorthand);
// splice shorthand specific value [1, 2, 3, 4, 6, 7, 8, 9, 0]
```
### Array of objects:
```
let users6 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
var removeIndex = users6.map(item => item.id).indexOf(1);
users6.splice(removeIndex, 1);

console.log("splice shorthand specific value array of objects", JSON.stringify(users6));
// splice shorthand specific value array of objects [{"id":2,"name":"mike"},{"id":3,"name":"bob"},{"id":4,"name":"sara"}]
```

## 7. filter()
`filter()` method sẽ tạo ra một mảng mới chứa các phần tử mà thỏa mãn điều kiện
### Array:
```
let testarr = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let testarr2 = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let filtered = testarr.filter(function(value, index, arr) {
    return value > 5;
});
let filtered2 = testarr2.filter(item => item !== 2);

console.log("filter example 1", filtered);
// filter example 1 [6, 7, 8, 9, 9, 10]
console.log("filter example 2", filtered2);
// filter example 2 [1, 5, 6, 7, 8, 9, 9, 10]
```
### Filter with multiple values removal:
```
let forDeletion = [2, 3, 5];
let mularr = [1, 2, 3, 4, 5, 3];
mularr = mularr.filter(item => !forDeletion.includes(item));

console.log("multiple value deletion with filter", mularr);
// multiple value deletion with filter [1, 4]
```
### Array of objects:
```
let users7 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let filterObj = users7.filter(item => item.id !== 2);

console.log("filter example array of objects", filterObj);
// filter example array of objects [{"id":1,"name":"ted"},{"id":3,"name":"bob"},{"id":4,"name":"sara"}]
```

## 8. Delete operator
`delete` operator sẽ xóa một thuộc tính trong đối tượng
```
let ar = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
delete ar[4]; // delete element with index 4

console.log(ar);
//[2, 1, 2, 5, undefined, 7, 8, 9, 9, 10]
```

## 9. lodash remove
`_remove` sẽ xóa tất cả các phần tử trong mảng mà thỏa mãn điều kiện trong function và trả về một mảng mới chứa các phần tử đã bị xóa. function có 3 đối số là `(value, index, array)`.
### Array:
```
let arrlodashtest = [2, 1, 2, 5, 6, 7, 8, 9, 9, 10];
let evens = _.remove(arrlodashtest, function(n) {
    return n % 2 == 0;
});

console.log("lodash remove array", arrlodashtest);
// lodash remove array [1, 5, 7, 9, 9]
```
### Array of objects:
```
let users8 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
let evensObj = _.remove(users8, function(n) {
    return n.id % 2 == 0;
});

console.log("lodash remove array of object", JSON.stringify(evensObj));
// lodash remove array of object [{"id":2,"name":"mike"},{"id":4,"name":"sara"}]
```

## 10. Object utilities
`Object.entries()` method sẽ trả về một mảng gồm các cặp thuộc tính `[key, value]`, thứ tự của nó thì tương tự với vòng lặp `for...in`.
```
const object = [1, 2, 3, 4];
const valueToRemove = 3;
const arrObj = Object.values(
    Object.fromEntries(
        Object.entries(object).filter(([key, val]) => val !== valueToRemove)
    )
);

console.log("object utilites", arrObj);
// object utilites [1,2,4]
```

## 11. lodash filter
`_filter` sẽ duyệt qua từng phần tử trong mảng và trả về một mảng các phần tử thỏa mãn điều kiện của `predicate`. `predicate` có 3 đối số là `(value, index/key, collection)`.
```
let users10 = [
{ id: 1, name: “ted” },
{ id: 2, name: “mike” },
{ id: 3, name: “bob” },
{ id: 4, name: “sara” }
];
const lodashFilter = _.filter(users10, { id: 1 });

console.log(“lodash filter”, JSON.stringify(lodashFilter));
// lodash filter [{"id":1,"name":"ted"}]
```

## 12. lodash without
`_without` sẽ trả về một mảng mới sau khi được filter.
```
let lodashWithout = [2, 1, 2, 3];
let lodashwithoutTest = _.without(lodashWithout, 1, 2);

console.log(lodashwithoutTest);
// [3]
```

## 13. lodash reject
`_reject` sẽ ngược lại so với `_filter`, nó sẽ trả về một mảng các phần tử mà không thỏa mãn điều kiện của `predicate`.
```
let users9 = [
{ id: 1, name: "ted" },
{ id: 2, name: "mike" },
{ id: 3, name: "bob" },
{ id: 4, name: "sara" }
];
const result = _.reject(users9, { id: 1 });

console.log("lodash reject", result);
// lodash reject [{"id":2,"name":"mike"},{"id":3,"name":"bob"},{"id":4,"name":"sara"}]
```

# Tài liệu tham khảo
https://javascript.plainenglish.io/13-methods-to-remove-filter-an-item-in-an-array-and-array-of-objects-in-javascript-f02b71206d9d