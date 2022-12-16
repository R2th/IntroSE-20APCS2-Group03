### Giới thiệu về ES6
ECMAScript 2015 hoặc ES2015 là một bản nâng cấp của ngôn ngữ Javascript, nó là một chuẩn code mới giúp code của chúng ta có thể tương thích trên tất cả các trình duyệt.<br>
ES2015 cũng thường được gọi là ES6.
### Giới thiệu về từ khóa let trong Javascript
Trong ES5 khi bạn khai báo một biến sử dụng từ khóa var thì phạm vi của biến có thể là toàn cục(global) hay cục bộ(local). Nếu bạn khai báo một biến ngoài function thì phạm vi ảnh hưởng của biến là global.<br>
Khi bạn khai báo một biến bên trong function thì phạm vi ảnh hưởng của biến là local.<br>
ES6 cũng cấp một cách mới để khai báo biến bằng việc sử dụng từ khóa let. Ví dụ:<br>
```
let variable_name;
```
Trong JavaScript, các khối được biểu thị bằng dấu ngoặc nhọn {}, ví dụ khối if else, for, do while, while, try catch...<br>
```
if(condition) {
   // inside a block
}
```
Hãy xem ví dụ sau:<br>
```
let x = 10;
if (x == 10) {
    let x = 20;
    console.log(x); // 20:  reference x inside the block
}
console.log(x); // 10: reference at the begining of the script
```
Cách hoạt động:<br>
* Đầu tiền khai báo biến x và khởi tạo giá trị là 10
* Thứ hai, khai báo một biến mới trùng tên x bên trong block if nhưng với giá trị khởi tạo là 20.
* Thứ ba, output giá trị của biến x bên trong và sau block if<br>
Vì từ khóa let khai báo biến kiểu block-scoped do đó output giá trị trong block if là 20 và output biến x ngoài block if là 10.<br>
### JavaScript let và global object
Khi bạn khai báo một biến global sử dụng từ kháo var thì bạn có thể truy cập biến đó qua global object.Trong trường hợp web browser thì global object là window. Ví dụ:<br>
```
var a = 10;
console.log(window.a); // 10
```
Tuy nhiên, khi bạn sử dụng từ kháo let để khai báo biến, bạn sẽ không thể truy cập biến đó qua global object. Ví dụ:<br>
```
let b = 20;
console.log(window.b); // undefined
```
### JavaScript let và callback function in a for loop
ví dụ:<br>
```
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```
Output:<br>
```
5
5
5
5
5
```
Trong ví dụ này, biến i là biến global. Sau vòng lặp giá trị của nó là 5. Khi callback function đến hàm setTimeout() chúng tham chiếu cùng đến giá trị là 5.<br>
Trong ES6, từ khóa let khai báo một biến mới trong mỗi lần lặp của for. Do đó, bạn chỉ cần chèn từ khóa var thành từ khóa let để fix vẫn đề ở ví dụ trên.<br>
```
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```
Output:<br>
```
0
1
2
3
4
```
### Redeclaration(Khai báo lại biến)
Từ khóa var cho phép bạn khai bao lại biến mà không gặp bất kỳ lỗi gì:<br>
```
var counter = 0;
var counter;
console.log(counter); // 0
```
Tuy nhiên, khai báo lại một biến sử dụng từ khóa let sẽ phát sinh lỗi:<br>
```
let counter = 0;
let counter;
console.log(counter);
```
Error message:<br>
```
Uncaught SyntaxError: Identifier 'counter' has already been declared
```
Tổng kết:<br>
* Những biến khai báo sử dụng từ khóa let thì được gọi là các block-scoped, không truy cập được từ global object.
* Khai báo lại một biến sử dụng từ khóa let thì sẽ báo lỗi