Trước khi đi vào nội dung bài viết, ta cùng nhìn lại các khái niệm cơ bản về `var`, `let` và `const`
## Sự khác nhau giữa var, let và const
Dưới đây có 3 cách khai báo biến trong JavaScript
```JavaScript
var width = 100;
let height = 200;
const key = 'abc123';
```
### var
Chính xác var là gì? Nó có thể được gán lại và cập nhật. Ví dụ:
```JavaScript
// Khai báo 1 biến
var width = 1000;

// Khi gọi tới width
width // sẽ trả về 1000

// Gán lại giá trị cho width và gọi lại nó
width = 200;
width // lúc này giá trị của width là 200
```

`var` là function scope. WTF?. Nghĩa là gì thế?. Nghĩa là nó chỉ có tác dụng trong phạm vi function nó được khai báo. Vậy khi khai báo nó bên ngoài function thì sao ? Đơn giản thì nó là biến toàn cục.
Nếu khai báo 1 biến var bên trong function và gọi biến đó bên ngoài function thì biến đó không hoạt động ở phạm vi ngoài function
Ví dụ:
```JavaScript
function setWidth(){
    var width = 100;
    console.log(width);
}
width;
// Return:
Uncaught ReferenceError: width is not defined
```

### Hiểu về Scope
Trước hết ta đến với 1 ví dụ: 
```JavaScript
var x = 100;
if (x > 12){
    var y = x * 2;
    console.log(y);
}
```
Ở ví dụ trên, console.log sẽ trả ra
```
200
```

Tiếp đến gọi `y` thì giá trị của nó là `200`. Có gì sai sai rồi, `y` là biến toàn cục?
Vì biến var là function scope và `var y` không khai báo bên trong function nên thay vào đó var được định nghĩa ở `window` hoặc biến toàn cục
### Lợi ích khi sử dụng let và const ?
Để trả lời câu hỏi trên, thay vì hướng tới function thì ở đây ta hướng tới block. Vậy block là gì ? Nó là khối bên trong dấu `{}`

Vì vậy trong ví dụ trên, khi ta thay `var y` bằng `let y` sau đó gọi lại `y` nó sẽ trả về 1 error `Uncaught ReferenceError: y is not defined.` :D

### Lưu ý với ES6
- Không dùng `var`
- Sử dụng `let` thay vì `var`
- Dùng `const` để định nghĩa hằng số

Tổng kết lại với những ví dụ trên bạn đã hiểu rõ hơn về function scope và block scope ? Hãy comment bên dưới và vote để bày tỏ suy nghĩ về bài viết này nhé.
Cảm ơn bạn đã theo dõi bài viết, hẹn gặp lại ở bài viết tiếp theo về ES6 ! Bye ;)

Refs
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements