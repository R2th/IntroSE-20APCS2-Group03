Khi mới tìm hiểu về JavaScript mình thường hay bị nhầm lẫn giữa null, undefined và NaN. Đặc biệt đối với null và undefined thì ta thấy về mặt ý nghĩa chúng tương đối giống nhau đều là "không có gì", nhưng tại sao lại cần chia thành các thuật ngữ như vậy. Bài viết sau đây sẽ giúp bạn tìm hiểu chi tiết về các khái niệm này.
# 1. Null
Null là đại diện cho một giá trị không tồn tại. Nó cần phải được gán cho một biến:
```
var a = null;
console.log(a); //null
```
Trong javascript, khi chúng ta kiểm tra kiểu của null sẽ nhận được kết quả là “object”, tuy nhiên nó vẫn là giá trị nguyên thủy.

`typeof null; // 'object';`

Để kiểm tra chính xác một giá trị là null, ta sử dụng phép so sánh strict equal `===` (so sánh kiểu giá trị của 2 bên, nếu 2 bên có kiểu giá trị khác nhau thì kết quả trả về false và ngược lại):
```
var a = null;
a === null; // true
```
# 2. Undefined
undefined có nghĩa là không xác định, nó xuất hiện trong các trường hợp dưới đây:
*  1 biến được khai báo nhưng không được gán giá trị:
```
let foo;
console.log('is undefined?', foo === undefined);
// is undefined? true
```
* Truy cập giá trị của một thuộc tính không tồn tại:
```
let foo = { a: 'a' };
console.log('is undefined?', foo.b === undefined);
// is undefined? true
```
* Giá trị trả về của 1 hàm không trả về 1 giá trị:
```
function foo() { return; }
console.log('is undefined?', foo() === undefined);
// is undefined? true
```
* Giá trị tham số của hàm đã được khai báo nhưng bị bỏ qua tham số khi gọi hàm:
```
function foo(param) {
console.log('is undefined?', param === undefined);
}
foo('a');
foo();
// is undefined? false
// is undefined? True
```
undefined cũng là một thuộc tính của  global window object:

```
// Only in browsers
console.log(window.undefined); // undefined
window.hasOwnProperty('undefined'); // true
// Version < 5
```
# 3. Sự khác biệt giữa null và undefind
* undefined nghĩa là một biến đã được khai báo nhưng chưa được gán giá trị, null là được gán cho một biến.
* Khi so sánh null và undefined:
 ```
null == undefined; // true
null === undefined; // false
```
* Ta xét ví dụ sau để thấy sự khác biệt khi sử dụng null và undefined làm đối số.
```
let logHi = (str = ‘Hi’) => {
	console.log(str);
}
```
 Đoạn code trên sẽ tạo một hàm có tên ‘logHi’ với giá trị tham số mặc định là ‘Hi’. Khi chúng ta gọi hàm logHi với đối số lần lượt là undefined và null thì ta sẽ nhận được kết quả như sau:
```
logHi(undefined);
// hi
```
```
logHi(null);
//null 
```
Qua ví dụ trên ta có thể thấy việc sử dụng undefined làm đối số giống việc ta không định nghĩa giá trị str cho hàm logHi: `logHi();` và đối số truyền vào sẽ là giá trị tham số mặc định ban đầu.
# 4. NaN
NaN là viết tắt của "Not a Number". Khi một function hoặc operation trong JavaScript không thể trả về một số cụ thể, nó sẽ trả về giá trị NaN thay thế. NaN sẽ được coi như một kiểu Number:

`typeof NaN; // 'number'`

NaN là một thuộc tính của global object:
```
window.hasOwnProperty('NaN'); // true
NaN; // NaN
```
Không thể so sánh NaN với chính nó giống như việc kiểm tra như các giá trị khác trong JavaScript. Cả hai phương pháp operator so sánh bằng, đó là == và === đều trả ra false khi chúng ta kiểm tra giá trị NaN là NaN:
```
NaN == NaN // false
NaN === NaN // false
```
Một số trường hợp sinh ra NaN:
* Lấy số 0 chia cho số 0
* Lấy vô cùng (infinity) chia cho vô cùng (infinity)
* Nhân vô cùng (infinity) với số 0
* Bất kỳ phép tính toán nào trong đó NaN là một toán hạng
* Chuyển đổi một xâu non-numeric hoặc undefined về dạng number.

isNaN() là phương thức kiểm tra NaN trong phạm vi global: trước tiên nó sẽ kiểm tra xem giá trị đó có phải number hay không, nếu không thì sẽ chuyển đổi để trả về kết quả (xem chi tiết các bước tại [ECMA-262 18.2.3](http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number)).  Một số ví dụ:
```
isNaN(NaN);           // true
isNaN(1);             // false: 1 is a number
isNaN(-2e-4);         // false: -2e-4 is a number (-0.0002) in scientific notation
isNaN(Infinity);      // false: Infinity is a number
isNaN(true);          // false: converted to 1, which is a number
isNaN(false);         // false: converted to 0, which is a number
isNaN(null);          // false: converted to 0, which is a number
isNaN("");            // false: converted to 0, which is a number
isNaN(" ");           // false: converted to 0, which is a number
isNaN("45.3");        // false: string representing a number, converted to 45.3
isNaN("1.2e3");       // false: string representing a number, converted to 1.2e3
isNaN("Infinity");    // false: string representing a number, converted to Infinity
isNaN(new Date);      // false: Date object, converted to milliseconds since epoch
isNaN("10$");         // true: conversion fails, the dollar sign is not a digit
isNaN("hello");       // true: conversion fails, no digits at all
isNaN(undefined);     // true: converted to NaN
isNaN();              // true: converted to NaN (implicitly undefined)
isNaN(function(){});  // true: conversion fails
isNaN({});            // true: conversion fails
isNaN([1, 2]);        // true: converted to "1, 2", which can't be converted to a number
```
Phương thức Number.isNaN() khác với global funtion: isNaN(), nó sẽ trả về False với bất kì giá trị nào không thuộc kiểu number mà không ép kiểu cho nó. Chỉ có NaN mới đưa ra kết quả true cho phương thức này. Một số ví dụ:
```
Number.isNaN(NaN);         // true
Number.isNaN(1);           // false
Number.isNaN(-2e-4);       // false
Number.isNaN(Infinity);    // false
Number.isNaN(true);        // false
Number.isNaN(false);       // false
Number.isNaN(null);        // false
Number.isNaN("");          // false
Number.isNaN(" ");         // false
Number.isNaN("45.3");      // false
Number.isNaN("1.2e3");     // false
Number.isNaN("Infinity");  // false
Number.isNaN(new Date);    // false
Number.isNaN("10$");       // false
Number.isNaN("hello");     // false
Number.isNaN(undefined);   // false
Number.isNaN();            // false
Number.isNaN(function(){});// false
Number.isNaN({});          // false
Number.isNaN([]);          // false
Number.isNaN([1]);         // false
Number.isNaN([1, 2]);      // false
Number.isNaN([true]);      // false
```
# 5. Tổng kết
Qua bài viết, mình đã trình bày khái niệm và một số vấn đề cần thảo luận về null, undefined và NaN. Hi vọng rằng nó giúp các bạn hiểu hơn về các thuật ngữ này và có nhiều cách xử lý linh hoạt hơn trong các trường hợp phải làm việc với chúng trong JavaScript nhé.