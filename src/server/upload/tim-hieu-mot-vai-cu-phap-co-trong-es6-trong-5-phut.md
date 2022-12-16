# ES6 là gì ?
ES6 là chữ viết tắt của ECMAScript 6, đây được coi là một tập hợp các kỹ thuật nâng cao của Javascript và là phiên bản mới nhất của chuẩn ECMAScript. Theo wikipedia thì ECMAScript là thương hiệu đặc tả ngôn ngữ kịch bản được tiêu chuẩn hóa bởi `Ecma International` thông qua `ECMA-262` và `ISO/IEC 16262`. Nó được tạo ra để tiêu chuẩn hóa JavaScript, để thúc đẩy nhiều hiện thực độc lập. JavaScript vẫn là hiện thực nổi tiếng nhất của ECMAScript kể từ khi tiêu chuẩn này được xuất bản, với các hiện thực nổi tiếng khác gồm JScript và ActionScript. ECMAScript thường được sử dụng cho kịch bản phía máy khách (client-side scripting) trên World Wide Web, và nó ngày càng được sử dụng nhiều để viết ứng dụng máy chủ và dịch vụ bằng Node.js.
<br>
Ở bài viết lần này thì mình xin giới thiệu cho các bạn một vài chức năng ở trong ES6 mà chúng ta nên áp dụng vào trong việc lập trình hằng ngày vì nó có thể giúp các bạn tiết kiệm thời gian từ những cú pháp ngắn hơn và rất nhiều lợi ích khác...

## 1, Từ khóa "let"
Trong javascript thông thường cách để khai báo một biến chúng ta thường hay nhìn thấy và sử dụng nhất đó chính là từ khóa `var`, thế nhưng trong ES6 đã hỗ trợ một từ khóa khai báo biến là `let`.  Tại sao từ khóa `let` được sinh ra?  Đơn giản là vì nếu chúng ta muốn sử dụng một biến ở trong một block(khối) từ hãy sử dụng từ khóa này.
<br>
Ví dụ :
<br > Thông thường nếu sử dụng từ khóa `var`
```javascript
function foo() {
  var x = 1;
  
  if(x == 1) {
    var y = 2;  
  }
  console.log(y); // Trả về 2
  console.log(x); // Trả về 1
}
foo();
```

nhưng với từ khóa `let`
```javascript
function foo() {
  let x = 1;
  
  if(x == 1) {
    let y = 2;  
  }
  console.log(y); // Lỗi
  console.log(x); // 1
}
foo();
```

Hơn nữa `let` không cho phép gán lại giá trị của một biến. Ví dụ :
<br> với `var`
```javascript
var x = 10;
var x = 20;
console.log(x); // 20
```
còn `let`
```javascript
let x = 10;
let x = 20; // Lỗi vì x đã được định nghĩa
```

## 2, Từ khóa const
Từ khóa `const` này để khai báo một biến chỉ đọc. Ví dụ :
```javascript
const message = "Xin chào tất cả mọi người";
```
Khi biến const đã được khai báo, nó không thể được gán lại. Việc gán phải diễn ra trong cùng thời gian khai báo biến

## 3, Khai báo tham số mặc định
Chúng ta có thể khai báo tham số mặc định khi biết một function
```javascript
function foo(x, y=2) {
  console.log(x); // undefined
  console.log(y); // 2
}
foo();
```
Chúng ta cũng có thể overwrite(viết lại) giá trị của tham số. Ví dụ 
```javascript
function foo(x, y=2) {
  console.log(x); 
  console.log(y); 
}
foo(1, 3); // 1, 3
```

Chúng ta cũng có thể sử dụng biểu thức ở bên trong tham số mặc định. Ví dụ :
```javascript
function foo(x = 0, y=Math.pow(2,2)) {
  console.log(x); // 0
  console.log(y); // 4
}
foo();
```

## 4, Spread và Rest Operators

`Spread Operator` cho phép chuyển đổi một chuỗi thành nhiều argument (trong trường hợp gọi với hàm) hoặc thành nhiều phần tử (cho array). Cú pháp của nó sử dụng là `...`
Ví dụ :
```javascript
const obj = {x: 12, y: 10}
const obj2 = {z: 3, ...obj}; // obj2 = {x: 12, y:10 , z:3}
```
Hay hơn nữa chúng ta có thể truyền giá trị của một mảng vào thay cho các tham số trong một function. Ví dụ :
```javascript
const arr = [10, 12];
function foo(x, y) {
  console.log(x, y);
}
foo(...arr); // Kết quả là 10, 12
```

`Rest operators` cách sử dụng của nó như tên gọi của nó, tạm dịch trong tiếng việt là `các tham số còn lại`. Ý nghĩa như sau.
```javascript
function foo(x, y, ...arguments) {
  console.log(arguments);
}
foo(10,20,'Hello', 'World'); // Kết quả ['Hello', 'World']
```

## 5, Khai báo nhiều giá trị cùng 1 lúc
```javscript
// Không dùng ES6
var x = 1;
var y = 2;
var z = 3;
// Sử dụng ES6
let [x, y, z] = [1,2,3]
```

## 6, Arrow Functions
Đây là một cú pháp khá mới để sử dụng khai báo một hàm
```javascript
// ES5
function multiply(x, y) {
  return x * y;
}
// ES6
const multiply = (x,y) => {
  return x * y;
}
```
Thâm chí trong trường hợp hàm chỉ sử dụng đơn lẻ một câu lệnh ta có thể làm ngắn gọn lại như sau
```javascript
const multiply = (x,y) => x * y;
```

## 7, Template literals
Cách nối chuỗi trong ES6 cũng khá đơn giản. Với cú pháp es5.
```javascript
var str = 'Release date: ' + date
```
trong es6 sẽ tối ưu hơn
```javascript
let str = `Release Date: ${date}`
```
Cách để viết 1 đoạn văn bản trên nhiều dòng
```javascript
let str = `This text
            is on
            multiple lines`
```

## 8, Định nghĩa ngắn 1 method (Method definition shorthand)
Từ khóa `function` có thể được bỏ qua khi gán các phương thức trên một đối tượng.
```javascript
// với es5
var obj = {
  a: function(c, d) {},
  b: function(e, f) {},
}
// trong es6
let obj = {
  a(c, d) {},
  b(e, f) {},
}
// để gọi method a chỉ cần obj.a();
```
## 9, Vòng lặp
```javascript
var arr = ['a', 'b', 'c'];
// bình thường để lặp ta thường làm ntn
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

nhưng nếu dùng es6 cú pháp sẽ ngắn hơn kha khá

for (let i of arr) {
  console.log(i)
}
```

**Tài liệu tham khảo [](https://www.taniarascia.com/es6-syntax-and-feature-overview/)**