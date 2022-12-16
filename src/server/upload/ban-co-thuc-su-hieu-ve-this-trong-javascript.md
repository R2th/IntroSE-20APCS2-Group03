# Giới thiệu
Chào mọi người, sau 1 tháng vắng bóng thì mình lại trở lại đây :D

Đối với các bạn đã và đang sử dụng Javascript thì `this` là một từ khóa vô cùng kinh điển và quen thuộc. Mình chắc rằng ít nhất một lần nó đã gây ra không ít phiền toái cho các bạn, nhất là đối với các bạn mới tiếp cận với `Javascript` (lúc mới học về Js mình cũng ngán thằng `this` này lắm :D). Chính vì vậy trong bài viết này chúng ta cùng tìm hiểu rõ hơn về từ khóa `this` này nhé.
# "this" là gì?
Khi bạn gặp từ khóa `this` trong các ngôn ngữ lập trình như Java, C#,.. thì gần như bạn sẽ nghĩ tới `this` chính là tham chiếu tới thể hiện (instance) hiện tại hoặc hàm hiện tại. Đây cũng chính là lý do khiến nhiều bạn hiểu nhầm về từ khóa `this` trong `Javascript`, nhất là các bạn mới tiếp xúc và sử dụng Js.

Trong `Javascript` thì `this` là một từ khóa mà bản chất của nó giống như tên gọi của nó, đó là ám chỉ đối tượng hiện tại đang được sử dụng hoặc đang truy cập tới. Khá giống với định nghĩa `this` ở các ngôn ngữ khác đúng không các bạn, tuy nhiên trong Js `this` lại có giá trị khác nhau tùy thuộc vào **ngữ cảnh đang sử dụng**.

Một ví dụ đơn giản:
```
var student = {
  id: 1,
  firstName: "Peter",
  lastName: "Parker",
  age: 18,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
```
# "this" trong từng ngữ cảnh
Phần này chúng ta sẽ tìm hiểu rõ hơn về từ khóa `this` của Js trong từng ngữ cảnh cụ thể
### "this" trong method
Trong một object method thì `this` tham chiếu đến chủ (`owner`) của method đó. Như trong ví dụ đơn giản ở mục trên thì `this` trong method `fullName` tham chiếu đến đối tượng `student` (hay nói cách khác đối tượng `student` là chủ của method `fullName`).
```
fullName : function() {
  console.log(this)  // object student
  return this.firstName + " " + this.lastName;
}
```
### "this" trong function
Trong `Javascript function` thì `this` không phải là tham chiếu tới chính function mà `this` tham chiếu đến đối tượng toàn cục (Global) `Window`. Kể cả `normal function` và `anonymous function`:
```
function testFunc() {
    console.log(this);    // object Window

    var innerFunc = function () {
        console.log(this);    // object Window
    }

    innerFunc();

    setTimeout( function() {    // anonymous function (no name)
      console.log(this);   // object Window
    }, 1000);
}

testFunc();
```
Trong `function` ở `strict mode` thì `this` không được định nghĩa (`undefined`)
```
"use strict";

function testFunc() {
   console.log(this);    // undefined
}
```

**Một ví dụ cụ thể hơn:**
```
var number = 100;

function testFunc(number) {
    this.number = number;   // this.x = Window.x = 10
    console.log(this.number);    // 10 (Window.x)

    var innerFunc = function () {
        console.log(this.number);    // 10 (Window.x)
    }

    innerFunc();

    setTimeout( function() {      // anonymous function (no name)
      console.log(this.number);   // 10 (Window.x)
    }, 1000);
}

testFunc(10);
console.log(this.number);   // 10 (Window.x)
```
Khi bạn chạy ví dụ này kết quả sẽ là 4 số 10, điều này chứng tỏ, `this` trong các function đã tham chiếu đến đối tượng global là `Window` (`this.x = Window.x`)

Một ví dụ khác, bạn hãy thay `testFunc(10)` bằng `new testFunction(10)`. Bạn hãy tự mình dự đoán thử kết quả trước khi đọc đáp án của mình nhé (nếu đúng thì bạn đã hiểu được `this` trong ngữ cảnh này rồi đó :D).
Kết quả sẽ như sau:
```
var number = 100;

function testFunc(number) {
    this.number = number;   // this.x = 10 (testFunc object)
    console.log(this.number);    // 10 (object testFunc)

    var innerFunc = function () {
        console.log(this.number);    // 100 (Window.x)
    }

    innerFunc();

    setTimeout( function() {      // anonymous function (no name)
      console.log(this.number);   // 100 (Window.x)
    }, 1000);
}

new testFunc(10);
console.log(this.number);   // 100 (Window.x)   
```
Ở đây mình đã dùng từ khóa `new`, từ khóa đặc trưng để khởi tạo một đối tượng (object). Vì vậy `this` trong function `testFunc` không còn tham chiếu đến đối tượng `Window` nữa mà nó sẽ tham chiếu đến đối tượng `testFunc` (như mình đã nói ở mục trên - **"this" trong method**), vậy nên `this.number` trong function này sẽ là 10, còn `this` trong function `innerFunc` và `anonymous function` của `setTimeout` vẫn là tham chiếu đến đối tượng `Window` nên giá trị hiển thị sẽ là 100.

Tuy nhiên ở đây mình lại muốn cả 2 function con trong `testFunc` có thể sử dụng `this` của đối tượng `testFunc` thì mình sẽ phải làm như sau:
```
var number = 100;

function testFunc(number) {
    this.number = number;   // this.x = 10 (testFunc object)
    console.log(this.number);    // 10 (object testFunc)

    var self = this;

    var innerFunc = function () {
        console.log(self.number);    // 10
    }

    innerFunc();

    setTimeout( function() {      // anonymous function (no name)
      console.log(self.number);   // 10
    }, 1000);
}

new testFunc(10);
console.log(this.number);   // 100 (Window.x)
```
### "this" đứng một mình
Khi được sử dụng một mình thì `this` sẽ tham chiếu đến đối tượng toàn cục (global) `Window`:
```
var x = this;
console.log(x);  // object Window
```
Trong `strict mode` thì `this` cũng tham chiếu đến đối tượng `Window`:
```
"use strict";

var x = this;
console.log(x);  // object Window
```

### "this" trong DOM Event handlers
Trong HTML Event handlers thì `this` tham chiếu đến phần tử HTML nhận sự kiện:
```
<button onclick="this.style.background='red'">
  Click Me!
</button>
```
Trong ví dụ này `this` tham chiếu đến element `button`.
### "this" trong một số function đặc biệt của Js
Trong `Javascript`, giá trị của `this` còn chịu ảnh hưởng bởi một số phương thức đặc biệt, đó là: 
* `Function.prototype.apply( thisArg, argArray )`
* `Function.prototype.call( thisArg [ , arg1 [ , arg2, ... ] ] )`
* `Function.prototype.bind( thisArg [ , arg1 [ , arg2, ... ] ] )`
* `Array.prototype.every( callbackfn [ , thisArg ] )`
* `Array.prototype.some( callbackfn [ , thisArg ] )`
* `Array.prototype.forEach( callbackfn [ , thisArg ] )`
* `Array.prototype.map( callbackfn [ , thisArg ] )`
* `Array.prototype.filter( callbackfn [ , thisArg ] )`

Đối với các phương thức dạng **Function.prototype** ở trên: `this` sẽ tham chiếu đến `thisArg` chứ không phải `object`.

Đối với các phương thức dạng **Array.prototype** ở trên: `this` sẽ tham chiếu đến `thisArg` nếu được truyền vào, còn ngược lại `this` sẽ tham chiếu đến đôí tượng toàn cục (`Global`).

**Ví dụ 1:** `call()` là phương thức có thể được dùng để gọi các phương thức (methods) của đối tượng này với một đối tượng khác làm tham số. Bạn hãy xem ví dụ sau:
```
var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName: "Peter",
  lastName: "Paker",
}

console.log(person1.fullName.call(person2));   // "Peter Paker"
```
Trong ví dụ này, bạn có thể thấy khi gọi phương thức `fullName` của `person1` với `person2` làm tham số thì `this` sẽ tham chiếu đến đối tượng `person2` mặc dù nó được sử dụng trong phương thức của `person1` (`person2` chính là `thisArg` của phương thức `call()` mà mình đã liệt kê ở trên).

**Ví dụ 2:** 
```
var student = {
  firstName: "Peter",
  lastName: "Paker",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}

var numbers = [1, 2, 3];

// without thisArg
numbers.forEach(function (a) {
    console.log(this);     // object Window
});

// with thisArg
numbers.forEach(function (a) {
    console.log(this);     // object student
}, student);
```
Ở ví dụ này, nếu mình không truyền vào `student` thì `this` sẽ tham chiếu đến đối tượng toàn cục `Window`, ngược lại nếu mình truyền vào `student` thì `this` sẽ tham chiếu đến đối tượng `student` (`student` chính là `thisArg` của phương thức `forEach()` mà mình đã liệt kê ở trên).
# Kết luận
**Tóm tắt:** `this` là một từ khóa đặc biệt được cung cấp bởi Js. Nó có giá trị khác nhau phụ thuộc vào ngữ cảnh đang sử dụng:
* Trong `method`, `this` tham chiếu đến đối tượng là chủ của method.
* Trong function, `this` tham chiếu đến đối tượng toàn cục (`Global`).
* Trong function ở `strict mode`, `this` không được định nghĩa (`undefined`)
* Sử dụng một mình, `this` tham chiếu đến đối tượng toàn cục (`Global`).
* Trong DOM Event handlers, `this` tham chiếu đến phần tử Html nhận sự kiện.
* Giá trị của `this` còn chịu ảnh hưởng khi sử dụng một số phương thức đặc biệt của Js như: `call()`, `apply()`, `forEach()`, ...


Qua bài viết này mình đã giới thiệu với mọi người về từ khóa `this` trong `Javascript`, đồng thời mình cũng đã trình bày việc sử dụng `this` trong các ngữ cảnh cụ thể. Hy vọng bài viết của mình sẽ giúp các bạn, đặc biệt là những bạn mới tiếp xúc với Js hiểu rõ hơn về từ khóa vô cùng kinh điển này.

# Tham khảo
https://www.w3schools.com/js/js_this.asp