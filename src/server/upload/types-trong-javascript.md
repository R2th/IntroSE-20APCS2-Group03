# Các loại types trong Javascript
Javascript định nghĩa sẵn 7 loại types như dưới đây:
* null
* undefined
* boolean
* number
* string
* object
* symbol (mới được thêm trong ES6)
 
Lưu ý: tất cả những types trên ngoại trừ `object ` đều là những types "nguyên thủy".
# Null
Trong javascript, `null` nghĩa là không có gì cả. Chúng ta có thể hiểu là thứ gì đó không tồn tại. Thật không may là trong javascript data type của `null` lại trả về object, chúng ta có thể kiểm tra với `typeof`:
```javascript
typeof null === "object"; // true
```
Sẽ tuyệt hơn biết bao nếu giá trị trả về ở trên là `"null"`, nhưng bug (tính năng??) này đã xuất hiện gần 2 thập kỷ và gần như sẽ không bao giờ được fix vì rất nhiều trang web đang sống nhờ vào bug này, nếu fix nó thì kha khá trang web sẽ teo luôn...

Nếu bạn muốn test giá trị của 1 biến có phải là `null` không, bạn có thể sử dụng cách sau:
```javascript
var a = null;

(!a && typeof a === "object"); // true
```
`null` mang giá trị `falsy` (aka luôn sai) nhưng đồng thời nó lại trả về `"object"` khi chúng ta kiểm tra với `typeof`.
# Undefined
Những biến mà không có giá trị, chúng sẽ có giá trị là `undefined`. Dùng `typeof` để kiểm tra những biến đó cũng sẽ trả về kết quả `"undefined"`:
```javascript
var a;

typeof a; // "undefined"

var b = 42;
var c;

// later
b = c;

typeof b; // "undefined"
typeof c; // "undefined"
```

Rất nhiều lập trình viên có thể nghĩ rằng `undefined` và `undeclared` giống nhau. Tuy nhiên trong JS, 2 khái niệm này khá là khác biệt.
`undefined` là 1 biến đã được khai báo trong scope đang trỏ đến, nhưng ở thời điểm được gọi nó không có giá trị nào ở bên trong nó. Còn `undeclared` là 1 biến thậm chí chưa được khai báo trong scope. Hãy cùng xem ví dụ:
```javascript
var a;

a; // undefined
b; // ReferenceError: b is not defined
```

Khá là bực mình với thông báo lỗi được browser trả về trong trường hợp này. Như bạn có thể thấy, thông báo lỗi là `"b is not defined"`, điều này làm chúng ta rất dễ nhầm lẫn sang `"b is undefined"`. 1 lần nữa `"undefined"` và `"is not defined"` là 2 thứ khác biệt nhau hoàn toàn. Thật tuyệt biết bao nếu như browser báo lỗi đại loại như `"b is not found"` hoặc `"b is not declared"`, điều này sẽ giảm bớt biết bao nhầm lẫn, nhưng đời không như là mơ tập n ...

Còn 1 trường hợp đặc biệt khác với `typeof` liên quan đến 2 thằng `undefined` và `undeclared` mà còn làm chúng ta xoắn não hơn nữa. Hãy xem:
```javascript
var a;

typeof a; // "undefined"

typeof b; // "undefined"
```
`typeof` trả về kết quả là `"undefined"` cho cả 2 trường hợp `undefined` và `undeclared`. Hãy để ý thêm rằng thậm chí không có lỗi nào bắn ra khi chúng ta thực hiện `typeof b` mặc dù chúng ta còn chưa khai báo thằng `b` nữa. Đây là 1 cơ chế an toàn của `typeof` (T_T).

Giống như trên, thật tuyệt nếu `typeof` được dùng với `undeclared` sẽ trả về `"undeclared"` thay vì `"undefined"`.

# Boolean
`Boolean` chỉ có thể có 2 giá trị là `true` hoặc `false`. Nó thường được sử dụng trong những câu điều kiện dạng `if else` khi cần những giá trị logic có dạng đúng hoặc sai. Fun fact: Boolean được đặt tên theo nhà toán học `George Boole`, người đã đi tiên phong trong lĩnh vực lý luận toán học.

Mọi thứ có "giá trị" đều là `true`(aka truthy):
```javascript
Boolean(100); //true
Boolean("hello"); //true
```
Có 1 số trường hợp đặc biệt có giá trị nhưng sẽ trả về kết quả là `false`(aka falsy):
```javascript
Boolean(0); //false
Boolean(""); //false
Boolean(null); //false
Boolean(undefined); //false
Boolean(false); //false - hiển nhiên :)))
Boolean(NaN); //false
```
# Tạm kết
Trong bài viết này mình đã giới thiệu đến các bạn 3 loại types trong Javascript, còn 3 loại nữa mình sẽ giới thiệu với các bạn trong bài viết sau, xin cảm ơn vì đã đọc bài viết của mình.

Bài viết có tham khảo từ:
* You don't know JS - tác giả Jenn Lukas
* https://www.w3schools.com