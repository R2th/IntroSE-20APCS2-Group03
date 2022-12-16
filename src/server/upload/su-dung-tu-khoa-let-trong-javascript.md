Trong hướng dẫn này, bạn sẽ tìm hiểu cách sử dụng từ khóa cho phép JavaScript để khai báo các biến trong phạm vi khối.

 Trong ES5, khi bạn khai báo một biến bằng từ khóa `var`, phạm vi của biến là toàn cục nếu bạn khai báo nó bên ngoài hàm hoặc cục bộ trong trường hợp bạn khai báo nó bên trong hàm.

 ES6 cung cấp một cách mới để khai báo một biến bằng cách sử dụng từ khóa `let`. Từ khóa `let` tương tự như từ khóa `var`, ngoại trừ các biến mà nó khai báo là phạm vi khối:

 ```
 let variable_name;
 ```

 Trong JavaScript, các khối được biểu thị bằng dấu ngoặc nhọn `{}`, ví dụ: `if else, for, do while, while, try catch` ...

 ```javascript
 if(condition) {
   // inside a block
}
```

Bạn xem ví dụ sau:

```javascript
let x = 10;
if (x == 10) {
    let x = 20;
    console.log(x); // 20:  reference x inside the lbock
}
console.log(x); // 10: reference at the begining of the script
```
Bạn cùng xem cách hoạt động của đoạn code trên:

- Đầu tiên, khai báo một biến `x` và gán giá trị của nó 10.
- Thứ hai, khai báo một biến mới có cùng tên `x` bên trong khối if nhưng có giá trị ban đầu là 20.
- Thứ ba, console biến x cả trong và ngoài `if`

Bởi vì từ khóa `let` khai báo một biến có phạm vi khối, biến `x` bên trong `if` là một biến mới và nó thay thế biến `x` được khai báo ở đầu tập lệnh. Do đó, giá trị của `x` khi console ra là 20.

Khi chạy  `if` xong, biến `x` bên trong `if` nằm ngoài phạm vi, do đó, giá trị của biến `x` console phía ngoài sẽ là 10.

### let vs var

Khi bạn khai báo một biến toàn cục bằng từ khóa `var`, bạn đang thêm biến đó vào danh sách thuộc tính của đối tượng toàn cục. Trong trường hợp trình duyệt web, đối tượng toàn cầu là `window`.

Bạn xem ví dụ bên dưới

```javascript
var a = 10;
console.log(window.a); // 10
```

Tuy nhiên, khi bạn sử dụng từ khóa `let` để khai báo một biến, biến đó `không` được gắn vào đối tượng toàn cục như một thuộc tính. Đây là một ví dụ:

```html
let b = 20;
console.log(window.b); // undefined
```

### let and callback function in a for loop
Bạn xem ví dụ bên dưới

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```
Các bạn `F12` trang web lên và sang tab `console` và copy đoạn code trên vào chạy các bạn sẽ biết kết quả.

Nếu đúng thì khi chúng ta console thì i trả về cho chúng ta từ 0->4 nhưng không ở vòng lặp này sẽ trả về 5. Tại sao lại như vậy.

Lý do, giá trị của biến i bên trong hàm callback luôn là giá trị cuối cùng của i trong vòng lặp.

Trong ES6, từ khóa `let` khai báo một biến mới trong mỗi lần lặp , do đó, bạn chỉ cần thay thế từ khóa `var` bằng từ khóa `let` để khắc phục vấn đề.

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```

Nếu bạn nào đã biết đến  `arrow function` trong ES6 thì đoạn code trên có thể viết gọn lại như này

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
}
```

Bây giờ các bạn copy đoạn code này chạy lại xem kết quả trả đúng chưa.

Cuối cùng, từ ES6, bạn nên dùng từ khóa let và ngừng sử dụng từ khóa `var` khi bạn khai báo một biến

Hẹn các bạn ở bài viết khác. Cảm ơn các bạn đã tham khảo bài hướng dẫn của mình <3