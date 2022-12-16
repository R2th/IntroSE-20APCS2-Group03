Theo một cuộc điều tra cách mạng ẩn danh mà mình tìm hiểu được thì trong cuộc sống có 2 thứ khó hiểu nhất. Đối với nam giới thì đó là phụ nữ, còn đối với lập trình viên thì đó hẳn là javascript rồi. 
![](https://images.viblo.asia/79b2de9b-0518-4bc9-8a41-9252ebd25b55.png)
Javascript là ngôn ngữ không thể thiếu trong thời đại hiện nay. Dù bạn có học ngôn ngữ gì đi chăng nữa thì bạn vẫn cần phải biết về javascript. Hôm nay mình xin chia sẻ một chút kiến thức về javascript, cũng không có gì cao siêu cả, nếu không muốn nói là khá tù. Bài viết này mình viết với mục đích dành cho các bạn Intern, Fresher trong quá trình đi phỏng vấn có thể tham khảo vì đây là những câu hỏi liên quan đến javascript mà rất dễ bị "sờ gáy".  Bắt đầu nào. Mại zô...

![](https://images.viblo.asia/e843f0b1-070f-4c2e-af5a-ba3dcdbeb47f.jpeg)
### 1. Javascript là gì?
> Trả lời: Javascript là một ngôn ngữ lập trình kịch bản dựa vào đối tượng phát triển có sẵn hoặc tự định nghĩa ra, javascript được sử dụng rộng rãi trong các ứng dụng Website. Nó là một ngôn ngữ **thông dịch**.
### 2. Các kiểu dữ liệu trong Javascript?
> Trả lời: Có 6 kiểu đó là **String**, **Number**, **Object**, **Undefined**, **Boolean**, **Array**, **Null**

Ví dụ: 
```js
// String
var a = 'viblo';
// Number
var b = 3;
// Object
var c = { a: 1, b: '2' }
// Undefined
var d;
// Boolean
var e = 10 < 11;
// Array
var f = [1, 2, 3, 'z'];
```
### 3. Hàm delete có chức năng gì?
> Trả lời: Hàm delete  loại bỏ một thuộc tính khỏi object; nếu không tồn tại tham chiếu tới thuộc tính, nó sẽ tự động giải phóng.

Ví dụ:
```js
var user = { name: 'Vu', age: 18 };
delete user.age;
console.log(user)

// => { name: 'Vu' }
```

### 4. Phân biệt var, let và const?
> Trả lời:<br> **const** dùng để khai báo một hằng số - là một giá trị không thay đổi được trong suốt quá trình chạy.<br>**let** tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó<br> **var** - tạo ra một biến có phạm vi truy cập xuyên suốt function chứa nó.
> 
Ví dụ: 
```js
// let
if (true) {
  let text = 'in if statement'
}
 
console.log(text) // undefinded

//const
const a = 'vu';
a = 'nguyen'; // Lỗi Identifier 'a' has already been declared

// var
var a = 'viblo';
if (true) {
  var a = 'viblo.asia';
  console.log(a); // 'viblo.asia'
}
console.log(a); // 'viblo.asia'
```

### 5. Strict mode trong javascript là gì?
> Trả lời: Strict theo nghĩa tiếng Việt là "nghiêm khắc". Strict Mode là một quy mẫu nghiêm khắc trong Javascript. Nếu như việc viết code bình thường là Normal mode, thì Strict Mode sẽ có thêm các quy định khác so với Normal mode.

Ví dụ:
```js
"use strict";
function foo(){
    var bar = 'viblo';
    return bar;
}

// Uncaught ReferenceError: bar is not defined
bar = 'asia';
```

### 6. this trong javascript là gì?
> Trả lời: Từ khóa **this** dùng để chỉ **đối tượng** từ **nơi nó được gọi**.

Ví dụ:
```js
var data = {
  name: "vu",
  age: 18,
  getName: function(){
      return this.name; // this = data;
  }
};

console.log(data.getName()) // 'vu'
```

### 7. Khác nhau giữa undefined và null trong javascript?
> Trả lời: Khi tạo ra một biến mà không gán giá trị thì nó sẽ là **undefined**. Còn null là một object

Ví dụ:
```js
var a;
console.log(typeof a) // undefined
console.log(typeof null) // object
```

### 8. == và === khác nhau như thế nào?
> Trả lời: Toán tử == kiểm tra tính bằng nhau, còn === kiểm tra cả tính bằng nhau và cả kiểu dữ liệu

Ví dụ:
```js
var number1 = 1;
var number2 = '1';

console.log(number1 == number2) // true
console.log(number1 === number2) // false
```

### 9. Thay đổi style/class của element?
> Trả lời: Sử dụng thuộc tính **document** trong javascript. Có thể sử dụng với id, class hay bất cứ element nào. 

Ví dụ:
```js
document.getElementById("myId").style.backgroundColor = "red";
document.getElementById("myId").className = "newclass";
document.getElementByClass("myClass").className = "newclass";
document.getElementByTagsName("myTagsName").className = "newclass";
```
### 10. Tại sao Math.max() nhỏ hơn Math.min() ?
> Trả lời: Khi chạy code Math.max() > Math.min(), giá trị trả về là False, nghe có vẻ không hợp lý. Tuy nhiên, nếu không có tham số nào được truyền vào, Math.min() trả về Infinity và Math.max() trả về -Infinity. Vậy nên Math.max() < Math.min().

Ví dụ: 
```js
var infinity = 5

var value1 = Math.min(1)
var value2 = Math.min(1, infinity)
var value3 = Math.min(1, -infinity)

console.log(value1) // 1
console.log(value2) // 1
console.log(value3) // -5
```
### 11. Closure trong javascript là gì?
> Trả lời: Closure là một hàm bên trong, truy cập đến các giá trị bên ngoài phạm vi của nó. Closure có thể truy cập vào các biến trong phạm vi của riêng nó (Variables in their own scope), trong hàm (Variables in the function’s scope), và biến toàn cục (Global variables).

Ví dụ:
```js
const arr = [1, 2, 3, 4];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(i);
  }, 10);
}

// 4 4 4 4
```

> Lý do là bởi vì hàm setTimeout sẽ tạo ra 1 function (closure) có thể truy cập phạm vi bên ngoài nó, vòng loop sẽ chứa index i. Sau 10ms, hàm được thực thi và nó sẽ log ra giá trị của i, là giá trị cuối cùng của vòng lặp (4).

### 12. Hoisting trong javascript là gì?
> Trả lời: Hoisting là hành động mặc định của Javascript, nó sẽ chuyển phần khai báo lên phía trên top Trong Javascript, một biến (variable) có thể được khai báo sau khi được sử dụng.

Ví dụ:
```js
a = 'https://viblo.asia';
console.log("My website: ", a); // My website: https://viblo.asia
var domain;
console.log("My website: ", a); //  // My website: https://viblo.asia
```

### 13. Phân biệt giữa Function Declaration và Function Expression
> Trả lời: **Function declaration** sẽ sử dụng từ khóa **function** rồi đến tên hàm. Còn **Function expression** sẽ được bắt đầu với từ khóa var, const, hoặc let.

Ví dụ:
```js
// Function Declaration:
function a(x,y,z) {
    // code here
}

// Function Expression
const a = function(x,y,z) {
    // code here
}
```

### 14. Hàm Array.splice() và hàm Array.slice() khác nhau như thế nào ?
> Trả lời: Hàm **Array.splice()** sẽ thay thế một hoặc một số phần tử của mảng bằng một hoặc một số phần tử khác. Trong khi hàm **Array.slice()** sẽ trích xuất một số phần tử của mảng, vị trí bắt đầu và kết thúc việc trích xuất sẽ được xác định bởi tham số truyền vào hàm. Lưu ý hàm sẽ trích xuất không bao gồm phần tử end truyền vào.

Ví dụ:
```js
// Array.splice()
var language = ["php", "css", "html", "js"];
language.splice(1, 1, "python", "c#", "ios");
console.log(language) // ['php', 'python', 'c#', 'ios', 'html', 'js'];
// Array.slice()
var language = ["html", "js", "php", "c#", "python", "androi", "ios"];
var slice = language.slice(1, 4);
console.log(slice); // ['js(1)', 'php(2)', 'c#(3)']
```
### 15. Spead Operator trong javascript ?
> Trả lời: Spead operator là một biểu thức mở rộng giúp gộp các phần tử vào trong một cách viết ngắn gọn hơn. Cách viết này được thể hiện bằng dấu `...`

Ví dụ:
```js
var topLane = ['zed', 'akali'];
var all = ['yasuo', 'rengar', ...topLane, 'đan trường'];
console.log(all) //  ['yasuo', 'rengar', 'zed', 'akali', 'đan trường']
```

### 16. Anonymous function là gì ?
> Trả lời: Là một hàm ẩn danh, không có tên gọi, thường được sử dụng khi xử lý các công việc có quy mô nhỏ, vì thế không cần thiết phải khởi tạo tên định danh cho hàm này. Giúp nó có tốc độ xử lý nhanh hơn hàm truyền thống phải có tên định danh.

Ví dụ:
```js
var anonymous = function(a, b) {
    return a + b;
};
console.log(anonymous(5, 10)); // 15
//Anonymous Function không có đối số
var anonymous = function() {
    return "Hello World";
};
console.log(anonymous()); // Hello World

(function(){
    console.log('viblo');
}).call(this) // viblo
```

### 17. Tại sao 0.1  + 0.2 không bằng 0.3 ? 
> Trả lời: Vấn đề này liên quan đến việc Javascript lưu trữ dữ liệu float ở dạng nhị phân chính xác tới từng con số sau dấu phẩy. Hơn nữa  máy tính không thể biểu diễn chính xác số thập phân, nên gây ra sai số kiểu này.<br>Giải pháp ở đây có thể sử dụng hàm toFixed() để đạt được kết quả đúng.

```js
console.log(0.1 + 0.2) //0.30000000000000004

// Sử dụng toFixed()
var number = 0.1 + 0.2;
console.log(number.toFixed(2)) // 0.3
```

### 18. Sự khác nhau giữa window.onload và onDocumentReady ?
> Trả lời: Sự kiện **window.onload** có ý nghĩa rằng khi trình duyệt đã load xong mọi thứ (image, js, css) thì những đoạn code nằm bên trong đó mới được chạy. Với **onDocumentReady**, mọi thứ bên trong hàm này sẽ được load ngay khi DOM được load và trước khi toàn bộ nội dung bên ngoài được load.

### 19. Kết quả của 1 + 2 + '3' ?
> Trả lời: 33. 1 và 2 là kiểu integer, khi cộng lại sẽ được 3, sau đó sẽ nối với string '3' để được kết quả là 33.

### 20. Promise trong javascript là gì ?
> Trả lời: Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell hay pyramid of doom, là tình trạng các hàm callback lồng vào nhau ở quá nhiều tầng. Có 3 trạng thái: **pending**, **fulfilled**, **reject**.

Hi vọng sau khi đọc xong bài này các bạn có thể nhớ thêm, học thêm 1 chút gì đó về javascript. Mong có thể giúp ích cho các bạn.
Hẹn gặp lại các bạn ở bài viết tiếp theo. 

![](https://images.viblo.asia/7ecd1943-b49b-455c-b1f9-00e968ac8139.gif)
Tài liệu tham khảo:
- https://medium.com/@bretcameron/9-javascript-interview-questions-48416366852b
- https://www.gangboard.com/blog/javascript-interview-questions-and-answers/