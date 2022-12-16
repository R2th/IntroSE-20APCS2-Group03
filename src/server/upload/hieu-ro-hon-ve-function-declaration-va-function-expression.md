Chắc hẳn khi mới làm việc với javascript chúng ta cũng thường gặp 2 dạng khai báo function phổ biến sau `function a() {}` và `var a = function() {}` trong bài viết này mình xin phép được chia sẻ về 2 function trên, sự khác nhau và cách sử dụng chúng sao cho hợp lí. 
Có thể nhận thấy sự khác biết rõ rệt ở 2 ví dụ trên đó là tên của function. 

Vậy cách đơn giản nhất để định nghĩa chúng đó là *function declaration* với những function được tạo kèm theo tên và *function expression* với những function chỉ có mô tả. 
## Function Declaration
```
function doSmth() {
    ...
}
```
## Function Expression
```
var anyVar = function() {
	...
}
```
hoặc cũng có thể sử dụng cú pháp es6 để tạo ra một function anonymous (không cần keyword function) như sau 
```
var anyVar = () => {
	...
}
```
Sự khác biệt giữa 2 function trên đó là cách mà chúng được thực thi. 
## Hoisting
Khi một JavaScript file (hay HTML document có chưa JavaScript) được load. Các *function declarations* được hoisted to the top (mình xin phép được giữ nguyên tiếng Anh) của JS code bởi browser, trước khi những dòng code được thực thi. 
Hiểu một cách đơn giản là tất cả các functions được viết dưới dạng function declarations được xếp lên trước các đoạn code khác, việc này cho phép bạn gọi function ngay cả trước khi khai báo function đấy

```
/**
 * This works!
 */
function add(num1, num2) {
	return num1 + num2;
}
add(3, 3); // returns 6


/**
 * This does, too!
 */
substract(7, 4); // returns 3
function subtract(num1, num2) {
	return num1 - num2;
}
```
Mặt khác *function expression* sẽ không hoisted to the top như trên. Vì vậy bạn không thể gọi function mà chưa khai báo chúng 
```
/**
 * This works!
 */
var add = function(num1, num2) {
	return num1 + num2;
};
add(3, 3); // returns 6


/**
 * This does not =(
 */
substract(7, 4); // returns Uncaught TypeError: subtract is not a function
var subtract = function (num1, num2) {
	return num1 - num2;
};
```
Qua 2 ví dụ trên có thể thấy *function declaration* và *function expression* khác nhau ở thuộc tính hoisting. Function declaration mạnh mẽ hơn về phạm vi sử dụng, tuy nhiên trong thực tế ta cũng nên cân nhắc sử dụng hợp lí giữa 2 loại functions này để tránh việc quá nhiều functions không cần thiết trong global scope làm giảm hiệu năng của chương trình. 

Function expression cũng có thể hiểu như một closures và khai báo như asguments của một function khác.

Bài viết trên mình đã giới thiệu cho các bạn về **Function Declaration** và **Function Expression**. Chúc mọi người một ngày làm việc vui vẻ!