## I. Function:
Function là một trong những khái niệm cơ bản nhưng được sử dụng nhiều trong Javasript. Hôm nay mình xin được phép chia sẻ với các bạn một số thông tin bên lề của `Function` trong Javascript nhé.

> A JavaScript function is a block of code designed to perform a particular task.
> 
> Một phương thức là 1 tập hợp câu lệnh để thực hiện 1 nhiệm vụ cụ thể.

Với định nghĩa trên, chúng ta có cú pháp cơ bản của `function`:
```javascript
function name(parameter1, parameter2, parameter3,...) {
  // code to be executed
}
```

> A JavaScript function is executed when "something" invokes it (calls it).

Và theo như hướng dẫn ở trên, một `Function` cơ bản được khai báo và sử dụng như sau:
```javascript
function helloWorld() {
    alert('Hello world!');
}

helloWorld();
```

Vậy, chúng ta vừa đi qua cơ bản về 1  `function`.  

Bạn có biết rằng, với sự phát triển của `Javascript`, hay cụ thể là với các bản cập nhật từ `ES6, ES7, ...`, chúng ta đã có nhiều sự thay đổi hơn. Và chúng ta cũng có thêm 1 dạng mới của `function`, gọi là `Function Expressions`, và cú pháp cũ của `function` được gọi là `Function Declarations` để phân biệt.

## II. Function Expressions:
### 1. Định nghĩa:

Định nghĩa cơ bản của `Function Expressions`:
> A function expression can be stored in a variable.

Một ví dụ cơ bản của `Function Expressions`:
```javascript
const sumOf = funnction (a, b) {
    return a + b;
}

// cách viết sử dụng arrow function của ES6
const sumOf = (a,b) => {
    return a + b;
}

sumOf(5,6) // -> 11
```

### 2. So sánh:
Sự khác biệt cơ bản nhất của `Function Declarations` và `Function Expressions`  chính là `Hoisting`:

Đối với `Function Declarations`:
```javascript
sumOf(5,9); // -> 14

function sumOf(a,b) {
    return a + b;
}
```
Với `Function Expressions`:

```javascript
sumOf(5, 9) // Uncaught SyntaxError: Identifier 'sumOf' has already been declared

const sumOf = (a,b) => {
    return a + b;
}
```
Hiểu đơn giản, `Function Declarations` sẽ được khởi tạo trước khi thực thi các dòng code, còn `Function Expressions` sẽ chỉ được định nghĩa khi trình phiên dịch đọc đến dòng code khai báo nó.

### 3. Ứng dụng:
Thông thường trong dự án mà mình đang làm việc, `Function Expressions`  có khá nhiều lợi ích.

* Closures
* Arguments
* IIFE

### a) Closures:
```javascript
// GOOD:
function tabsHandler(index) {
    return function tabClickEvent(evt) {
        // Doing ...
        // hàm tabsHandler sẽ lưu trữ index và sử dụng khi các thẻ được click. 
    };
}

var tabs = document.querySelectorAll('.tab'),
    i;

for (i = 0; i < tabs.length; i += 1) {
    tabs[i].onclick = tabsHandler(i);
}

// BAD:
var i;

for (i = 0; i < list.length; i += 1) {
    document.querySelector('#item' + i).onclick = function doSomething(evt) {
        // Doing ...
        // khi click vào thẻ, biến i luôn trả về list.length
    }
}
```

### b) Arguments:
Chúng ta có thể sử dụng các `Function Expressions` như những `argument` để làm ngắn code của chúng ta:

First:
```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```
Become:
```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```

### c) IIFE:
Chúng ta có thể tạo ra những `module` nhỏ nhờ `Function Expressrions`:
```javascript
var myModule = (function () {
    var privateMethod = function () {
        console.log('A private method');
    },
    someMethod = function () {
        console.log('A public method');
    },
    anotherMethod = function () {
        console.log('Another public method');
    };

    return {
        someMethod: someMethod,
        anotherMethod: anotherMethod
    };
}());
```

## Tham khảo:
1. [Function Declarations vs. Function Expressions](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/#more-787)
2. [Function expressions](https://javascript.info/function-expressions)
3. [Quick Tip: Function Expressions vs Function Declarations](https://www.sitepoint.com/function-expressions-vs-declarations/)