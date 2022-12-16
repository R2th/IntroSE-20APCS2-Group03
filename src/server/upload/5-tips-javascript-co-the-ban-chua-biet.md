Hê lô anh em :laughing:

Trong bài viết này, mình sẽ chỉ cho bạn một số thủ thuật JavaScript 🔥🔥 mà có thể bạn chưa biết ....

Vào bài luôn nào !!!

# 1.Use Strict
Nếu mọi người đã biết và sử dụng về Typescript chắc cũng biết về chế độ này.

Use Strict sẽ kích hoạt strict mode trong JavaScript :

- Không cho phép người dùng sử dụng các biến không được khai báo.
- Sẽ giúp anh em  viết code an toàn hơn 🔐 
- Xóa variables hoặc các object không được phép sử dụng.
- Và còn nhiều chức năng nữa ...

**Enable strict mode như thế nào ??**

Rất đơn giản, anh em chỉ cần add dòng này vào :
```
"use strict";
```
Thử một vài trường hợp nhé :

```
"use strict";
x = 3.14;  
// kết quả như sau :
VM390:3 Uncaught ReferenceError: x is not defined
// lỗi liền bởi vì x chưa được khai báo
```

```
"use strict";
myFunction();

function myFunction() {
  y = 3.14;
}
// Cũng vẫn lỗi vì y chưa được khai báo
```
```
x = 3.14;    // Ở đây sẽ không gặp error
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;  // Bởi vì y chưa được khai báo nên ở đây sẽ lỗi.
}
```

# 2. Chúng ta không nhất thiết phải sử dụng dấu ";"
Nghe thật là lạ đúng không nhưng đúng là như vậy đấy , dấy chấm phẩy trong Javascript là một tùy chọn. JavaScript không yêu cầu nghiêm ngặt dấu chấm phẩy, khi có vị trí cần dấu chấm phẩy, nó sẽ tự thêm dấu chấm phẩy vào phía sau, quá trình này gọi là **Automatic Semicolon Insertion**.

Các quy tắc của Chèn dấu chấm phẩy tự động JavaScript :
- Khi dòng code tiếp theo bắt đầu bằng dòng code mới ngắt dòng hiện tại.
- Khi dòng code tiếp theo bắt đầu bằng 1 dấu  **}**,  đóng block hiện tại.
- Khi đến cuối cùng của source code.
- Khi xuất hiện một **return statement**.
- Khi xuất hiện một **break statement**.
- Khi xuất hiện một **throw statement**.
- Khi xuất hiện một **continue statement**.

# 3. Run một function ngay tại thời điểm nó được khai báo :
Được gọi là các hàm tự gọi hay còn gọi là Immediately Invoked Function Expression (IIFE). Nó là một function tự động chạy khi bạn tạo nó :

```
(function(){
    console.log("Chay ngay luon , chay ngay di day nay");
})();
```

```
(function(a,b){
     console.log(a+b);
})(21,1996);
```

# 4. Xử lí errors :
Đây chắc là điều mà mọi người thường hay làm , khi mà các tham số sai được truyền vào function của mình :

```
function divide(dividend, divisor){
    if(typeof divisor != "number")
         throw new Error("Typeof divisor is not a number");
    if(typeof dividend != "number")
         throw new Error("Typeof dividend is not a number");
    if(divisor === 0)
         throw new Error("Divisor cannot be equal to 0");

    return dividend/divisor;
}
```

# 5. Xử dụng block scope để tạo ra các temporary variables :

Bolck scope rất hữu ích để tránh việc chúng ta khai báo ra các biến không cần thiết.

```
{
    let a = "Hello";
    console.log(a);
    // Expected output "Hello"
}
console.log(a);     // kết quả trả ra undefined
```

# Kết bài :

Đó là 5 tips mà mình muốn giới thiệu với anh em trong bài viết này.

Nếu thấy hay thì mọi người hãy chia sẻ và upvote cho mình nhé.

Many thankssssssss