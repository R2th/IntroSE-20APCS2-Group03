Việc giới hạn phạm vi ảnh hưởng và khả năng bị ảnh hưởng của các property và các biến và một việc cực kỳ quan trọng thế nhưng, Javascript lại không phải là một ngôn ngữ OOP và nó cũng không có cơ chế riêng cho phép chúng ta tạo ra các `private property` cho instance của các `constructor function`. Tuy nhiên, bằng việc áp dụng `module` pattern, chúng ta hoàn toàn có thể làm được điều này một cách dễ dàng.
 
 ## Khời tạo một Module
 `Module` cho phép chúng đóng gói các property, method, biến và function bằng cách tận dụng một đặc điểm rất đặc trưng của Javascript đó là `closure`. Các closure sẽ được tạo ra mỗi khi một function bất kỳ được tạo ra và đây cũng chính là cách mà ta tạo ra một `module`, đó là tạo ra một `IIFE`(Immediately Invoked Function Expression), một function tự gọi đến chính nó.
 
 ```js
 var testModule = (function() {
   var counter = 0; // biến này đã được cô lập bởi closure của function này
   
   ...
 })();
 ```
 
Bằng cách khởi tạo biến `counter` bên trong một `IIFE` chúng ta đã giới hạn phạm vi bị tác động của `counter` giờ đây, ngoài các đoạn code bên trong `IIFE` này ra thì các đoạn code bên ngoài không thể truy cập cũng như sử dụng được biến `counter`. Ngoài các biến thì chúng ta cũng có thể khởi tạo các private function bằng cách này. 

## Export các method và property
Chúng ta đã biết cách tạo ra các biến private, nhưng để có thể sử dụng được các module thì chúng ta cần export các property cũng như các method hoặc đơn giản chỉ là các biến hoặc function ra bên ngoài.

 ```js
 var testModule = (function() {
   var counter = 0;
   
   return {
       getCounter() {
           return counter;
       },
       increateCounter() {
           counter++;
       },
       resetCounter() {
           counter = 0;
       }
   }
 })();
 
 for (var i = 0; i < 10; i++) {
   testModule.increateCounter();
 }
console.log(testModule.getCounter()); // 10

testModule.resetCounter();
console.log(testModule.getCounter()); // 0

console.log(testModule.counter); // undefined
 ```
 
 Như các bạn có thể thấy, biến `counter` không thể bị truy cập từ bên ngoài module `testModule`, nhưng chúng ta vẫn có thể cho phép các developer khác thực hiện các tác vụ liên quan đến `counter` thông qua các method mà ta cho export ra cho họ sử dụng.
 
 ## Global import
Khi phân tích kỹ cú pháp của `IIFE` thì các bạn có thể thấy tất cả những gì mà ta làm chỉ là truyền một `function expression` vào một cặp dấu `()` để tránh Javascript hiểu lầm cặp dấu` {}` của `function expression` mà ta truyền vào `()` là cú pháp khời tạo Object hoặc chúng là cặp dấu `{}` của các statement như if, switch,... và sau đó ta sẽ dùng thêm một cặp dấu `()` nữa để chạy `function expression` mình vừa đề cập ở trên.

Tất cả những gì chúng ta tạo ra 1 `IIFE` chỉ là chạy một `function expression`. Ngoài việc giúp cho code của chúng ta ngắn hơn và ta không phải tạo thêm một biến để chứa `function expression` đó thì nó không khác gì lắm với ví dụ dưới đây cả.

```js
var functionExpression = function() {}

functionExpression();
```

Chính vì bản chất đơn giản của `IIFE` mà ta hoàn toàn có thể truyền một biến vào trong `IIFE` tương tự như khi ta truyền một biến vào trong một function.

```js
var globalVar = 'test';

var testModule = (function(global) {
  console.log(global);
})(globalVar);
```

Trong `Module pattern` thì việc truyền một biến bên ngoài vào 1 module được gọi là `global import`.

Với các module bị phụ thuộc vào các thư module khác và các module khác này lại nằm ở các file khác nhau thì các bạn có thể áp dụng `gobal import` như ví dụ dưới đây chẳng hạn.

```js
var testModule = (function($) {
  const bodyEle = $('body');
  ...
})($); // truyền function $ của thư viện jquery vào module testModule
```

## Lời kết
Như các bạn có thể thấy `Module` mang lại rất nhiều lợi ích ngoài việc định nghĩa các biến và function một cách  private thì nó cũng giúp cho việc tái sử dụng trở nên dễ dàng hơn và giảm thiểu xung đột về tên biến đi rất nhiều. Mong rằng qua bài viết này các bạn đã hiểu về pattern này. Chúc các bạn một ngày làm việc vui vẻ và hiệu quả. Cheer !