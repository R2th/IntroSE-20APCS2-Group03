![image.png](https://images.viblo.asia/edd05a6f-7e60-47a5-a0ac-f7a52bbeef8d.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Bạn có thể khai báo các Functions của bạn theo nhiều cách.

Sử dụng keyword **function**:

```js
// function declaration
function test(msg) {
  return `Hey ${msg}`;
}

// function expression
const test = function (msg) {
  return `Hey ${msg}`;
};
```

Bạn có thể gọi cả **khai báo** và **biểu thức** hàm là **Normal/Regular Function**

**Arrow function** được giới thiệu trong **ES6** và còn được gọi là **arrow function**.

```js
const arrowFunction = (msg) => { 
    return `Hey $ {msg}` 
}
```

Như bạn thấy cả hai **function** hoạt động giống nhau trong ví dụ trên. Bây giờ câu hỏi đặt ra là tại sao chúng ta cần **regular funcion** hoặc **arrow function**.

1️. Syntax - Cú pháp
====================

Chúng ta có thể viết hàm **regular** và **arrow function** theo cách này 😎

```js
// ES5
var add = function (x, y) {
  return x + y;
};

// ES6
let add = (x, y) => x + y;
```

Implicit Return - Return ngầm định
==================================

Trong hàm thông thường, bạn phải sử dụng keyword **return** để trả về bất kỳ **value** nào. Nếu bạn không trả về bất kỳ thứ gì thì hàm sẽ trả về **undefined**.

```js
function regFunc() {
  return "Regular Function";
}

regFunc();
// Regular Function
function regFunc() {
  console.log("Regular Function");
}

regFunc();
// Regular Function
// undefined
```

Các **arrow function** hoạt động theo cách tương tự khi trả về giá trị.

Nếu **arrow function** chứa một biểu thức, bạn có thể bỏ qua dấu ngoặc nhọn và khi đó biểu thức sẽ được trả về **implicitly returned.**

`{}`không bắt buộc nếu nó chỉ có một dòng tuyên bố
--------------------------------------------------

```js
const addOne = (number) => number + 1;
addOne(10);
```

`()`không bắt buộc nếu bạn chỉ có một đối số
--------------------------------------------

`let add = (x) => x + x;`

Nếu không có đối số
-------------------

`let arrowFunc = _ => console.log("Arrow Function");`

2️. Arguments binding - Đối số ràng buộc
========================================

Trong hàm thông thường, các keyword **arguments** có thể được sử dụng để truy cập các đối số được truyền cho hàm.

**Thí dụ:**

```js
function regularFunction(a, b) {
  console.log(arguments);
}
regularFunction(1, 2);
// Arguments[1,2]
```

Các **arrow function** không có ràng buộc đối số.

```js
const arrowFunction = (a, b) => {
  console.log(arguments);
};
arrowFunction(1, 2);
//ReferenceError: arguments is not defined
```

Tuy nhiên, nếu bạn muốn truy cập các đối số trong một **arrow function**, bạn có thể sử dụng toán tử **rest**:

```js
var arrowFunction = (...args) => {
  console.log(...args);
};
arrowFunction(1, 2);
// 1 2
```

3️. this
========

Trong hàm thông thường, **this** thay đổi theo cách hàm đó được gọi.

*   **Simple Invocation:** `this` bằng đối tượng toàn cục hoặc có thể không xác định nếu bạn đang sử dụng chế độ **strict mode**.
*   **Method Invocation:** `this` bằng đối tượng sở hữu hàm.
*   **Indirect Invocation:** `this` bằng đối số đầu tiên.
*   **Constructor Invocation:** `this` bằng **instance** mới được tạo.

```js
// 1️⃣ Simple Invocation
function simpleInvocation() {
  console.log(this);
}
simpleInvocation();
// Window Object

// 2️⃣ Method Invocation
const methodInvocation = {
  method() {
    console.log(this);
  },
};
methodInvocation.method();
// logs methodInvocation object

// 3️⃣ Indirect Invocation
const context = { aVal: "A", bVal: "B" };
function indirectInvocation() {
  console.log(this);
}
indirectInvocation.call(context); // logs { aVal: 'A' }
indirectInvocation.apply(context); // logs { bVal: 'A' }

// 4️⃣ Constructor Invocation
function constructorInvocation() {
  console.log(this);
}
new constructorInvocation();
// logs an instance of constructorInvocation
```

Các **arrow function** không có **this** riêng và chúng không xác định lại **value** của **this** bên trong hàm.

`this` bên trong một **arrow function** luôn đề cập đến **this** từ **contexts** bên ngoài.

```js
var name = "Suprabha"
let newObject = {
    name : "supi",
    arrowFunc: () => {
        console.log(this.name); 
    },
    regularFunc() {
        console.log(this.name); 
    }   
}
newObject.arrowFunc(); // Suprabha
newObject.regularFunc(); // supi
```

4️. new
=======

Các hàm thông thường có thể sử dụng **constructor**, chúng có thể được gọi bằng cách sử dụng keyword **new**.

```js
function add(x, y) {
  console.log(x + y);
}
let sum = new add(2, 3);
// 5
```

Tuy nhiên, các **arrow function** không bao giờ có thể được sử dụng như các hàm khởi tạo. Do đó, chúng không bao giờ có thể được gọi với keyword **new**

```js
let add = (x, y) => console.log(x + y);
const sum = new add(2, 4);
// TypeError: add is not a constructor
```

5️. paramaters không được đặt tên trùng lặp
===========================================

Trong function bình thường, chúng ta có thể làm điều này:

```js
// ✅ will work
function add(a, a) {}

// ❌ will not work
("use strict");
function add(a, a) {}
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```

Các **arrow function** không bao giờ được có các tham số được đặt tên trùng lặp, cho dù ở chế độ strict mode hay non-strict mode.

```js
const arrowFunc = (a, a) => {};
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```

6️. Function Hoisting
=====================

Trong **function** thông thường, **function** được **hoisting** lên ở đầu.

```js
normalFunc();
function normalFunc() {
  return "Normal Function";
}
// "Normal Function"
```

Trong **arrow function**, hàm được hoisting vào nơi bạn khai báo nó. Vì vậy, nếu bạn gọi hàm trước khi khai báo, bạn sẽ nhận được **referenceError**.

```js
arrowFunc();
const arrowFunc = () => {
  return "Arrow Function";
};
// ReferenceError: Cannot access 'arrowFunc' before initializati
```

7️. Methods
===========

Bạn có thể xác định các hàm trong lớp bằng cách sử dụng hàm thông thường.

```js
class FullName {
  constructor(name) {
    this.name = name;
  }
  result() {
    console.log(this.name);
  }
}
let name = new FullName("Suprabha");
console.log(name);
// FullName {name: "Suprabha"}
```

Bạn cũng cần áp dụng **callback**.

```js
setTimeout(name.result, 2000);
// after 1 second logs ""
```

Nhưng nếu bạn ràng buộc `this`

```js
setTimeout(name.result.bind(name), 2000);
// Suprabha
```

Bằng ví dụ trên, bạn có thể thấy rằng bạn phải liên kết **contexts this** với **context của chúng**.

Trong **arrow function**, bạn không cần phải ràng buộc với **context**.

```js
class FullName {
  constructor(name) {
    this.name = name;
  }
  result = () => {
    console.log(this.name);
  };
}
let name = new FullName("Suprabha");
setTimeout(name.result, 2000); // Suprabha
```

Khi nào không sử dụng arrow function 👩🏻‍💻
============================================

**Object** 

```js
let dog = {
  count: 3,
  jumps: () => {
    this.count++;
  },
};
```

Khi bạn gọi `dog.jumps`, số đếm không tăng lên. Đó là bởi vì **this** không bị ràng buộc với bất cứ điều gì, và sẽ kế thừa **value** của **this** từ phạm vi cha của nó.

Tham khảo 🧐
============

*   [GeeksForGeeks normal vs arrow function](https://www.geeksforgeeks.org/difference-between-regular-functions-and-arrow-functions/)

Tóm tắt
=======

Trong hàm thông thường, `this` value là động, Trong **arrow function**, **this value** bằng với **value** của hàm ngoài.

Trong hàm thông thường, các đối số sẽ cung cấp cho bạn danh sách tham số **arguments** được truyền vào hàm. **argument** của **arrow function** không được xác định.

Trong hàm thông thường, bạn luôn phải trả về bất kỳ **value** nào, nhưng trong **arrow function**, bạn có thể bỏ qua **keyword return** và có thể viết **single line**.

Trong mũi tên, các tham số của hàm phải là duy nhất.

Vấn đề **Hoisting** trong **arrow function** vì hàm không được gọi trước khi khởi tạo.

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog16-iem-khac-nhau-giua-regular.html