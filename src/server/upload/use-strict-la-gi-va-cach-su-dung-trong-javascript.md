Chào mọi người hôm nay đến tháng mình lại ngoi lên đây :) hôm nay mình sẽ chia sẻ về User Strict là gì ? và cách sử dụng nó nhé 

Trong con mắt của nhiều lập trình viên, JavaScript là một thứ vô cùng lộn xộn. Lập trình JavaScript chẳng khác nào cực hình.

Tuy nhiên, JavaScript có cung cấp cho lập trình viên chế độ “use strict“. Bằng việc khai báo và sử dụng chế độ này, JavaScript sẽ trở nên chính xác và nghiêm ngặt hơn. Do đó, bạn sẽ không thể viết code bừa bãi trong chế độ này.


# 1.  Use strict là gì?
- Use strict dịch sang tiếng việt thì có nghĩa là sử dụng sự nghiêm ngặt. Khi một đoạn lệnh được khai báo use strict thì tất cả các dòng code ở phía dưới dòng khai báo use strict sẽ được quản lý một cách nghiêm ngặt hơn về cú pháp.
```
x = 10;
console.log(window.x);
// => 10
```

```
Ở chế độ strict mode, bạn sẽ bị lỗi x chưa được định nghĩa: Uncaught ReferenceError: x is not defined

x = 10;
console.log(window.x);
// => Uncaught ReferenceError: x is not defined
```
# 2. Các nghiêm ngặt của strict mode.
-Khi sử dụng strict mode bạn sẽ không thể làm được những điều sau nữa:
## Gán giá trị cho biến chưa được khai báo.
-Trong chế độ thường bạn có thể làm như này để gán giá trị cho một biến chưa khai báo
```
variable = "tranvanmy";
console.log(variable);
```
-Nhưng strict mode thì không thể:

```
"use strict"
variable = "tranvanmy";
console.log(variable);

Uncaught ReferenceError: variable is not defined
```
-Để khắc phục được điều trên thì bạn cần phải khai báo biến với từ khóa var hoặc let.
```
"use strict"
var variable = "tranvanmy";
// or
let variable = "tranvanmy";
console.log(variable);
```
## Báo lỗi khi sử dụng delete.
-Nếu như ở chế độ thường thì bạn có thể xóa bất kỳ một thứ gì bằng từ khóa delete, mặc dù xóa được hay không nó cũng không báo lỗi. Nhưng khi sử dụng chế độ strict mode thì những thứ không thể xóa được nó sẽ báo lỗi ngay.

```
function getMyName (name)
{
    console.log(name)
}
delete getMyName;
//không có gì xảy ra mặc dù delete không xóa được hàm
```
-Chế độ strict mode:
```
"use strict"
function getMyName (name)
{
     console.log(name)
}
delete getMyName;
//Uncaught SyntaxError: Delete of an unqualified  identifier in strict mode.
```
## Các tham số của hàm không được trùng nhau
-Nếu như chế độ thường bạn có thể khai báo các tham số truyền vào hàm được phép trùng nhau thì giờ đây khi sử dụng chế độ strict mode thì nó sẽ báo lỗi ngay lập tức.

-Chế độ thường:

```
function getProfile (name,  name,  age)
{
    //code
}
//chạy bình thường.
```
-Chế độ strict mode:
"use strict"
```
function getProfile (name,  name,  age)
{
    //code
}
//Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```
## Không cho phép khai báo biến dưới dạng hệ nhị phân.
-Các số khai báo dưới dạng nhị phân hoặc có tiền tố prefix 0 đằng trước thì sẽ không được chấp nhận 

-Chế độ thường:
```
var num = 010100101010101;
```
-Chế độ strict mode:
```
var num = 01010;
//Uncaught SyntaxError: Octal literals are not allowed in strict mode
```
## Không được phép ghi đè lên thuộc tính chỉ được phép đọc.
-Chế độ thường:

```
var obj = {};
Object.defineProperty(obj, 'ver', {value: 1, writable: false});
obj.ver = 10;
//không có gì xảy ra
```
-Chế độ strict mode:

```
"use strict"
var obj = {};
Object.defineProperty(obj, 'ver', {value: 1, writable: false});
obj.ver = 10;
---------
Uncaught TypeError: Cannot assign to read only property 'ver' of object '#<Object>'
    at data.php:14
```
## Không sử dụng được with
-Chế độ thường:

```
var bar = 1;
var foo = 2;
with (bar){
    console.log(foo);
}
//2
```

-Chế độ strict mode:

```
"use strict"
var bar = 1;
var foo = 2;
with (bar){
    console.log(foo);
}
//Uncaught SyntaxError: Strict mode code may not include a with statement
```
## Không cho phép khai báo biến trong eval
-Vì lý do bảo mật nên khi sử dụng strict mode thì bạn sẽ không thể nào có thể khai báo được biến bên trong nó nữa.
```

"use strict"
eval ("var x = 4");
console.log(x);
//Uncaught ReferenceError: x is not defined
```
## Không chấp nhận khai báo các keyword
-Ở chế độ strict mode thì các bạn sẽ không sử dụng được các từ khóa sau để khai báo làm tên biến, hằng,...
* implements
* interface
* let
* package
* private
* protected
* public
* static
* yield
* arguments

# Kết luận
Trên đây là một số lỗi thường gặp phải khi bạn sử dụng JavaScript ở strict mode. Nói vậy, không có nghĩa là tôi khuyên bạn tránh sử dụng strict mode. Ngược lại, chế độ này giúp bạn dễ dàng phát hiện lỗi. Và đây là sự đảm bảo cho code bạn không bị xung đột với những phiên bản JavaScript mới hơn sau này. 
## Tham Khảo
+ https://toidicode.com/use-strict-mode-trong-javascript-316.html
+ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
+ https://kipalog.com/posts/MOT-SO-LOI-KHI-SU-DUNG-STRICT-MODE-JAVASCRIPT
+ https://toidicode.com/use-strict-mode-trong-javascript-316.html
+ http://fedu.vn/thu-vien-hoc-tap/lap-trinh-web/front-end/javascript/huong-dan-javascript/use-strict-la-gi-strict-mode-trong-javascript/
## MyBlog
 + https://tranvanmy.github.io/MyBLog/