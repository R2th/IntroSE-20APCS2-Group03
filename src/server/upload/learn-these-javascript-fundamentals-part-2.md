Tiếp nối [Learn these JavaScript fundamentals [Part 1]](https://viblo.asia/p/learn-these-javascript-fundamentals-part-1-bJzKmy4XK9N), phần này mình sẽ nói về `Array` và `Function`

## Array

Mảng (`Array`) là tập các giá trị được đánh chỉ mục (`index`). Mỗi giá trị là một phần tử (`element`). Các phần tử được sắp xếp và truy cập bởi `index` của chúng.
JavaScript có các đối tượng (`object`) giống như mảng. Mảng được triển khai bằng cách sử dụng các `object`. Các `index` chuyển đổi thành chuỗi và được sử dụng làm khóa (`key`) để truy xuất giá trị.

Một mảng đơn giản như `let Array = ['A', 'B', 'C']` được mô phỏng bằng cách sử dụng một đối tượng như bên dưới:

```js
{
    '0': 'A',
    '1': 'B',
    '2': 'C'
}
```

Note: `arr[1]` trả về giá trị giống như `arr['1']`:

```js
arr[1] === arr['1']; //true
```

Xóa giá trị khỏi một mảng với `delete` sẽ để lại phần tử `empty` (không có giá trị và index là index của phần tử bị xóa). Sử dụng phương thức `splice()` có thể  tránh vấn đề này, nhưng nó có thể chậm.

```js
let arr = ['A', 'B', 'C'];
delete arr[1];
console.log(arr); //['A', empty, 'C']
console.log(arr.length); //3
```

Mảng trong JavaScript không throw `index out of range` exception. Nếu mảng không có `index` mà bạn chỉ định, nó sẽ trả về `undefined`.

`Stack` và `Queue` có thể triển khai dễ dàng bằng các phương thức có sẵn của mảng:

```js
let stack = [];
stack.push(1);           //[1]
stack.push(2);           //[1, 2]
let last = stack.pop();  //[1]
console.log(last);       //2

let queue = [];
queue.push(1);           //[1]
queue.push(2);           //[1, 2]
let first = queue.shift();//[2]
console.log(first);      //1
```

## Functions
`function` là các đơn vị hành vi độc lập. Có ba cách để xác định `function`:
- Khai báo hàm (aka function statement)
- Biểu thức hàm (aka function literal)
- Arrow function

### Khai báo hàm
```js
function doSomething() {

}
```
- `function` là từ khóa đầu tiên trên dòng.
- Nó phải có tên.
- Nó có thể được sử dụng trước khi định nghĩa. Các khai báo hàm được di chuyển, hoặc kéo lên trên đỉnh phạm vi của chúng.


### Biểu thức hàm
```js
let doSomething = function() {

}
```
- `function` không phải từ khóa đầu tiên trên dòng
- Tên của `function` không bắt buộc phải có
- Trước khi sử dụng, nó phải được định nghĩa trước
- Nó có thể tự động chạy sau khi được định nghĩa (không cần gọi vẫn tự động chạy). Nó được gọi là IIFE (Immediately Invoked Function Expression).

Đây là một ví dụ về `IIFE`:

```js
(function autorun() {
    console.log("executed");
})();
//"executed"
```

### Arrow function
`arrow function` là một cú pháp để tạo biểu thức hàm ẩn danh.

```js
let doSomething = () => { 
    // do anything
};
```

### Function invocation
`Function` có thể thực thi bằng nhiều cách khác nhau:

```js
// as functions
doSomething(arguments);

// as methods
theObject.doSomething(arguments);

//as constructors
new Constructor(arguments)

//with apply() or call()
doSomething.apply(theObject, [arguments]);
doSomething.call(theObject, arguments);
```

Các hàm có thể được gọi với nhiều hoặc ít hơn các đối số (`arguments`) được khai báo trong định nghĩa. Các đối số bổ sung (thừa) sẽ bị bỏ qua và các đối số bị thiếu sẽ được đặt thành `undefined`.

Các hàm, ngoại trừ `arrow function`, có hai tham số giả: `this` và `argument`.

#### this

Methods are functions that are stored in objects. In order for a function to know on which object to work on, this is used. this represents the function’s context.
When functions are used as methods, this represents the object.

`method` là các hàm được lưu trữ trong các đối tượng. Để một chức năng biết được sẽ làm việc trên đối tượng nào, `this` được sử dụng. `this` đại diện cho bối cảnh chức năng.

Khi `function` được sử dụng như các `method`, `this` thể hiện đối tượng.

```js
let theObject = {
    name: "name",
    getName: function() {
        return this.name;
    }
}

theObject.getName(); // "name"
```

Các phương thức `apply()` và `call()` thực thi hàm với một giá trị đã cho. `call()` cung cấp các đối số riêng lẻ, trong khi `apply()` chấp nhận một mảng với tất cả các đối số.

```js
let otherObject = {
  name: "otherName"
}

function getName() {
  return this.name;
}

getName.apply(otherObject); //"otherName"
getName.call(otherObject);  //"otherName"
```

Giá trị của `this` phụ thuộc vào cách chúng ta gọi hàm chứ không phải vị trí chúng mà hàm được khai báo.

```js
"use strict";
function getName() {
    return this.name;
}

getName();
//Cannot read property 'name' of undefined

```

#### arguments

Các tham số giả (arguments `pseudo-parameter`) cung cấp cho tất cả các đối số được sử dụng tại lời gọi. Nó là một đối tượng giống như mảng, nhưng không phải là một mảng. Nó thiếu các phương thức mảng.

```js
function logAll() {
    console.log(arguments);
}

logAll("msg1", "msg2", "msg3");
// Arguments(3)["msg1","msg2","msg3"]
return
```

`return` dừng thực thi hàm và trả về kết quả. Khi nó trả về không gì cả hoặc không có trả về, hàm vẫn trả về  `undefined`. Dưới đây là một ví dụ, function sau sẽ không trả về `{}` mà trả về `undefined` như đã nói ở trên:

```js
function getObject() {
    return 
    { }
}

getObject();
```

**Note: dấu ngoặc nhọn mở `{` phải được đặt cùng dòng với `return`**

### Dynamic typing
JavaScript có `kiểu dữ liệu động` (dynamic typing). Giá trị có kiểu dữ liệu của nó, nhưng biến thì không có kiểu giá trị. Kiểu giá trị của biến sẽ thay đổi tại thời điểm thực thi

```js
function log(value) {
    console.log(value);
}

log(1);
log("text");
log({message: "text"});

```

Phương thức `typeof()` có thể kiểm tra kiểu dữ liệu của một biến

```js
let n = 1;
typeof(n);   //"number"

let s = "text";
typeof(s);   //"string"

let fn = function() {};
typeof(fn);  //"function"
```

*Dynamic typing offers a higher flexibility.*

## Tổng kết
- JavaScript cho phép truy cập các thuộc tính trên các giá nguyên thủy.
- Object là tập hợp động của các cặp `khóa - giá trị`.
- Mảng là bộ các giá trị được lập chỉ mục (`index`).
- Hàm là các đơn vị độc lập và có thể được gọi theo nhiều cách khác nhau.