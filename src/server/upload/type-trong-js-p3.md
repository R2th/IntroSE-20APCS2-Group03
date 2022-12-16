Trong bài viết này, mình sẽ giới thiệu với các bạn về 2 data type còn lại trong Javascript là `object` và `symbol`
# SYMBOL
`symbol` là một kiểu dữ liệu được sinh ra nhằm tao ra các giá trị duy nhất, mỗi một `symbol` được tạo ra sẽ có một giá trị khác nhau và giá trị đó là duy nhất. Và bạn cũng không có thể in ra giá trị của nó.

Để khai báo `symbol` thì chúng ta sử dụng cú pháp:
```javascript
let symbol1 = Symbol();
```
Hàm khởi tạo `symbol` có một tham số truyền vào và đây có thể coi là một secret key:
```javascript
let symbol2 = Symbol('symbol2');
```
Giá trị của hai `symbol` không bao giờ bằng nhau cả:
```javascript
console.log(symbol1 === symbol2); // false
```
Chúng ta có thể sử dụng typeof để kiểm tra xem một biến có phải là `symbol` hay không:
```javascript
console.log(typeof symbol`); // symbol
```
Hãy cùng thử chuyển đổi `symbol` sang thành các dạng data type khác xem sao nhé:
* Boolean
```javascript
let sym = Symbol();
sym = Boolean(sym);
```
Mặc định khi chuyển `symbol` sang `boolean` thì nó sẽ luôn có giá trị là true, cho dù bạn có gán secret key lúc khởi tạo hay không.
* Number
```javascript
let sym = Symbol();
sym = Number(sym); // Uncaught TypeError: Cannot convert a Symbol to a number
```
Vậy là chúng ta không thể convert `symbol` sang thành `number` được.
* String
```javascript
let sym = Symbol('hello');

sym = String(sym);

console.log(sym); // Symbol('hello')
```
Giờ thử convert hai `symbol` có cùng secret key và xem kết quả như thế nào nhé
```javascript
let sym1 = Symbol('hello');
let sym2 = Symbol('hello');

sym1 = String(sym1);
sym2 = String(sym2);

console.log(sym1 === sym2); // true
```
Vậy là nếu hai `symbol` có cùng secret key và được convert sang `string` thì sẽ có giá trị giống nhau;
# OBJECTS

`objects` là một tập hợp các thuộc tính, các thuộc tính này được lưu dưới dáng key / value theo cặp, các thuộc tính này có thể là bất cứ dạng data type nào, kể cả chính `objects` hoặc là các dạng data type nguyên thủy. 
```javascript
var obj = {
  key1: 'value',
  key2: 'value',
  key3: true,
  key4: 32,
  key5: {}
}

console.log(typeof obj); // object
```
Chúng ta có thể sử dụng typeof để kiểm tra một biến có phải là `objects` hay không nhưng đồng thời với `arrays` và `null` cũng sẽ trả về kết quả là `objects`.
```javascript
typeof [7,8,9] // objects
typeof null // objects
```
typeof trả về giá trị là `objects` đối với `arrays` là vì trong javascript `arrays` cũng là một `objects`.
# End