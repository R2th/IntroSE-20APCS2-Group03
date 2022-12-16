### Introduction 
Trong bài viết này chúng ta sẽ cùng tìm hiểu Regular Expressions trong javascript.
Biểu thức chính quy là các mẫu được sử dụng để so khớp các tổ hợp ký tự trong chuỗi.
Khi làm việc với các ngôn ngữ lập trình, chúng ta có thể muốn tìm kiếm các chuỗi ký tự. Nó có thể 
được check một cách dễ dàng như sau:
```
if(text === "javascript") {
    console.log("Correct text!")
}
```
Nhưng không phải lúc nào chúng ta cũng chỉ tìm kiếm như vậy, đôi khi nó chỉ là một phần của chuỗi đó.
ở đầu, kết thúc hay ở đâu đó. Để làm được điều này Regular Expressions (short form : RegEx or RegExp) được sử dụng.
### How to Create a RegEx
Có hai cách để tạo biểu thức chính quy như sau:
1. Gọi hàm khởi tạo của đối tượng RegExp
```
let reg = new RegExp('^jav');
```
2. Sử dụng một ký tự biểu thức chính quy
```
let reg = /^jav/
``` 
Như bạn đã thấy ở trên, biểu thức được khai báo giữa các dấu gạch chéo đối với các chữ trong khi đối với hàm khởi tạo, biểu thức được khai báo như một đối số kiểu chuỗi.
Biểu thức được sử dụng khi regex được biết trước khi thực thi. Biểu thức `^jav` ý nghia là khớp với
các chuỗi bắt đầu (^) với `jav`. 
### Application of Regular Expressions
Biểu thức chính có thể xử dụng được với các funtion `test()` and `exec()` các phướng thức của `RegExp` object

`test()` Bạn có thể sử dụng biểu thức để kiểm tra một chuỗi. Nó trả về `true` nếu khớp và `false` ngược lại.

`exec()` Phương thức này trả về một array thông tin(index, input, group) và cập nhật thuộc tính 

`lastIndex` của regex object nếu nó khớp với chuỗi. Nếu không khớp sẽ trả về `null`. Có thể được sử dụng đề tìm kiếm nhiều kết quả trong cùng một chuỗi.

Đối với những phương thức cú phát là:`regex.method(string)`. Phương thức đã được áp dụng cho regex và nhận 
một đối số uncủa chuôi mà nó kiểm tra.

`Regex` cũng có thể được sử dụng với `match()`, `search()`, `replace()`, `split()` phương thức của `String` object.

`match ()` ếu khớp, nó trả về một mảng chứa tất cả các kết quả phù hợp và nếu không khớp nó trả về null.

`search ()` Trả về chỉ mục của kết quả phù hợp trên chuỗi khi được áp dụng. Nếu không khớp nó trả về -1

`split ()` Phương thức này được sử dụng để ngắt một chuỗi thành một mảng các chuỗi con. Phép chia được thực hiện bằng cách đặt một điểm ngắt thay thế cho biểu thức đã khớp.

Đối với phương pháp này cú pháp sử dụng là:
`string.method(regex)`. Phương thức được áp dụng trên chuỗi đích và nhận đối số của biểu thức đã khai báo.
### Methods of Declaring Expressions

Có nhiều cách để khai báo biểu thức nhưng chúng ta sẽ xem xét một vài cách chính sau:
#### Flags
Chúng được sử dụng ở cuối biểu thức và có thể ảnh hưởng tới việc tìm kiếm theo nhiều cách.
`i` : Tìm kiếm không phân biệt chữ hoa, chữ thường.

`g` : Điều này làm cho mẫu tìm tất cả các kết quả phù hợp. Theo mặc định, chỉ kết quả đầu tiên được trả về.

Một vài cái khác: m (Multitline Mode),s (dotall mode), u (full unicode support) and y (sticky mode).
#### Metacharacters
Đây là những ký tự được sử dụng trong các biểu thức với ý nghĩa đặc biệt. Một số trong số đó là:

`\w` : Tìm một ký tự từ.

`\W` : Tìm một ký tự không phải từ.

`\d` : Tìm một ký tự số.

`\D` : Tìm một ký tự không phải số

`.`  : Tìm bất kỳ ký tự đơn nào (dành riêng cho dòng mới hoặc dấu chấm dứt dòng)

`\s` : Tìm một ký tự khoảng trắng

`\S` : Tìm một ký tự không phải khoảng trắng

#### Quantifiers
Chúng được xử dụng để xác định sự xuất hiện của các ký tự. Một trong số họ là:

`+` : `a+` Điều này khớp với bất kỳ một chuỗi nào có ít nhất 1 ký tự `a`.

`*` : `a*` Điều này nghĩa là sẽ match với chuỗi nào chứa 0 hoặc nhiều ký tự `a`.

`^` : `^abc` Khớp với tất cả các chuỗi có bắt đầu bằng `abc`

`$` : `abc$`  Khớp với bất kỳ chuỗi nào có kết thúc bằng `abc`

`{x}`: `a{5}` khớp vơi chuỗi nào có xuát hiện của `a` 5 lần liên tiếp.

`{x,y}`: `a{5,9}` Điều này chứa một phạm vi tối thiểu là 5 và tối đa là 9 cho sự xuất hiện của `a`.

`{x,}`: Khớp ít nhất 5 lần và không có giới hạn.

#### Brackets
`[abc]` :  Khớp bất kỳ ký tự nào a,b,c.

`[^abc]`: Khớp với chuỗi không có ký tự trong dấu ngoặc.

`[0:9]` : Khớp với string với bất kỳ số nào từ 0:9.

`[^08]`: Khớp với string không có số là 0 hoặc 8.

`(a|b)` : Khớp một chuỗi với a hoặc b.

### Examples
#### Replacing Text
```
let str = "This is a normal sentence";
let reg1 = /^this/i
let reg2 = /a normal/

const replacedStr = str.replace(reg1, "That").replace(reg2, "an abnormal");
console.log(replacedStr);
// Expected output
// This is an abnormal sentence
```
Chúng ta đã khai báo 2 biểu thức. 
Đầu tiên là biểu thức bắt đâu với string là `this`. Flag `i` để không phân biệt hoa thường `this` === `This`.
Biểu thức thức 2 khớp với chuỗi nếu có `a normal`.
Sau đó chúng ta sẽ tiến hành thay thế biểu thức thứ nhất là `That`. Biểu thuwcwcs thứ 2 là: `an abnormal`.
#### Validate password.
Giả xử chúng ta muốn yêu cầu `passowrd` mà người dùng nhập vào dấu gạch dưới và ít nhất 5 ký tự.
Vì chúng ta đang sử dụng tên biến nên chúng ta ko thẻ sử dụng biểu thức chữ.
```
let submitBtn = querySelector('#registerUserBtn');
submitBtn.addEventListener("submit", () => {
    let firstname = querySelector('#userFirstName').value;
    let password = querySelector('#userPassWord').value;
    let reg = new RegExp(`^${firstname}_.{5,}`);

    if(reg.test(password)) {
        alert("Successfully registered!")
    } else {
        alert("Your password must begin with your firstname followed by an underscore and at least 5 characters added.")
    }
})
```
Từ ví dụ trên chúng ta có thể tạo một biểu thức để xác thực mật khẩu người do người dùng nhập.

### Conclusion
Thực tế trong quá trình làm việc sẽ có nhiều RegEx phức tạp hơn. Nhưng qua bài viết này bạn đã hiểu các áp dụng nó trong các dự án. :)
### References
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

https://codesource.io/regular-expressions-regexp-in-javascript/