## 1 Giới thiệu
```
10:24 05/29/2020 - The First
```
JavaScript là ngôn ngữ lập trình phổ biến trên thế giới .Là một ngôn ngữ có thể học rất nhanh và áp dụng được cho rất nhiều mục tiêu có thể làm web , mobie, cũng có thể tạo game. Vì là một ngôn ngữ với số lượng lập trình viên đông đảo, nên cộng đồng support và các tool , template...  hỗ trợ thì khỏi  phải nó nữa . 
Sau đâu là một số điều hay ho về JS mà bạn có thể chưa biết đến : 
## 2 Tên đầu tiên của JS là Mocha
Mocha, hay Mạng xã hội  Mocha là ứng dụng nhắn tin, gọi điện miễn phí của Viettel. Mocha được sử dụng cho hệ điều hành Android và IOS, bạn cũng có thể sử dụng Mocha trên máy tính, laptop với phần mềm giả lập android BlueStacks. Ha ha đùa thôi . Đúng vậy cái tên đầu tiên của JS nó chính là mocha và được phát hành bởi [Brendan Eich](https://vi.wikipedia.org/wiki/Brendan_Eich)  tại [hãng truyền thông Netscape](https://vi.wikipedia.org/wiki/Netscape) . Ông chính là cha đẻ của ngôn ngữ lập trình Javascript. Sau đó được đổi tên thành  LiveScript và cuối cùng là  JavaScript

## 3 [Truthy](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Truthy) & [falsy](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Falsy)
**[Falsy](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Falsy)**
*  ""(empty string)
*  0, -0, NaN (invalid number)
*  null, undefined
*  false

[**Truthy**
](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Truthy)
* "hello world"
* 22
* true
* [ ], [1,"2",3] (array)
* { a :3 } ( object )
* function hello(){..} (funtion)
## 4 Infinity và -Infinity 
[Infinity](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Infinity) là giá trị kiểu số biểu diễn vô cùng. 
Infinity là một thuộc tính của global object, hay nói các khác, là một biến trong global scope.
Giá trị khởi đầu của Infinity là Number `POSITIVE_INFINITY`  Giá trị Infinity (dương vô cùng) lớn hơn mọi số. Về mặt toán học, giá trị này có biểu hiện giống hệt với vô cùng; chẳng hạn, mọi số `dương nhân với Infinity đều bằng Infinity,` và `mọi số chia cho Infinity đều bằng 0`.
```
5/0 = Infinity

5/0 = -Infinity

5*Infinity = Infinity

5/Infinity = 0

typeof(Infinity) = number
```

`Link chi tiết ` [https://jsfiddle.net/tranminhducsoftware/pnbok9rs/13/](https://jsfiddle.net/tranminhducsoftware/pnbok9rs/13/)

## 5 So sánh chuỗi với mảng
Ta có 2 mảng và một chuỗi

```
let arr1 = [1,2,3];
let arr2 = [1,2,3];
let str1 = "1,2,3";
```

```
arr1 == arr2   return false
arr1 === arr2  return false
arr1 === str1  return false
arr1 == str1   return true
```
Cách so sánh 2 mảng với nhau
let arr1 = [1,2,3];
let arr2 = [1,2,3];

JSON.stringify(arr1)==JSON.stringify(arr2)          return true;
JSON.stringify(arr1)===JSON.stringify(arr2)       return true;

Tuy nhiên nó cũng sẽ bị nhầm với Chuỗi
vậy nên ta có thể  check `[typeof](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/typeof)`  để phân biệt chuỗi và arr

```
let arr1 = [1,2,3];
let arr2 = [1,2,3];
let str1 = "1,2,3";
let object1 = {a:1,b:2,c:3};

typeof(arr1);
"object"
typeof(str1)
"string"
typeof(object1)
"object"
```
## 6 [typeof](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/typeof) in js
typeof trả về kiểu dữ liệu của đối tượng nào đó.


| Type | 	Result |
| -------- | -------- |
| [Undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)     | 	"undefined"     |
| [Null](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Null)     | "object"     |
| [Boolean](https://developer.mozilla.org/vi/docs/Tu-dien-thuat-ngu/Boolean)     | "boolean"     |
| [Number](https://developer.mozilla.org/en-US/docs/Glossary/Number)     | "number"     |
| [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)     | "bigint"     |
| [String](https://developer.mozilla.org/en-US/docs/Glossary/String)     | "string"     |
| [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol) (new in ECMAScript 2015)     | "symbol"     |
| [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function) object (implements [[Call]] in ECMA-262 terms)     | "function"     |
| Host object (provided by the JS environment)     | 	Implementation-dependent     |
| Any other object     | "object"     |



```
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Mặc dù "Not-A-Number" nhưng lại là number :)
typeof Number('1') === 'number'; // Number ép kiểu chuỗi thành kiểu number

typeof 42n === 'bigint';


// Strings
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // 1 là number nhưng khi nằm trong ngoặc '' sẽ thành kiểu string
typeof (typeof 1) === 'string'; // typeof 1 sẽ trả về chữ number, bạn tự hiểu được hen
typeof String(1) === 'string'; // String sẽ đổi kiểu số 1 từ number thành string

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() will convert values based on if they're truthy or falsy
typeof !!(1) === 'boolean'; // two calls of the ! (logical NOT) operator are equivalent to Boolean()


// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'


// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 


// Objects
typeof {a: 1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // See Regular expressions section for historical results


// The following are confusing, dangerous, and wasteful. Avoid them.
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String('abc') === 'object';


// Functions
typeof function() {} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';
```
## Tổng kết 
Mình lấy tài liệu chủ yếu ở trên [https://developer.mozilla.org/](https://developer.mozilla.org/) Một trang web mà mình nghĩ là lập trình viên các bạn nên biết đến nó. 
Mục đích - Lưu lại những gì mình đã học cũng như chia sẻ tới mọi người
BYE