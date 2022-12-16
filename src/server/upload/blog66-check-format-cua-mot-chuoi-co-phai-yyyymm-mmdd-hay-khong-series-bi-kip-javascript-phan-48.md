![image.png](https://images.viblo.asia/94dfa0ce-9ed8-4cc3-a273-13aad25d50dc.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊. 
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Để format date các bạn đã quá quen với nhứng thư viện như `moment` rồi đúng không. Tuy nhiên hiện tại dự án mình lại muốn check thêm cả `MMDD`, `YYYYMM` nữa thì thư viện này ko đáp ứng được. (Đôi khi dữ liệu được nhập từ file `csv` nên nó có rất nhiều format khác nhau. VD: `202212`, `1230`)
Nên mình đã sử dụng `regex pattern` để kiểm tra nó.

# Cách kiểm tra

Để kiểm tra xem một chuỗi có ở định dạng YYYYMMdd hay không, bạn có thể sử dụng biểu thức chính quy. Một biểu thức chính quy là một mẫu có thể được sử dụng để khớp các chuỗi.

Dưới đây là một ví dụ về biểu thức chính quy có thể được sử dụng để kiểm tra xem một chuỗi có ở định dạng YYYYMMdd hay không:

`/^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/`

Để sử dụng biểu thức chính quy này, bạn có thể sử dụng `match()`phương thức của đối tượng chuỗi trong JavaScript. Đây là một ví dụ về cách sử dụng nó:

```javascript
var dateString = "20221216";

if (dateString.match(/^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
  console.log("The string is in the YYYYMMdd format");
} else {
  console.log("The string is not in the YYYYMMdd format");
}
```

Để kiểm tra xem một chuỗi có ở định dạng YYYYMM hay không, bạn có thể sử dụng một biểu thức chính quy tương tự:

`/^[0-9]{4}(0[1-9]|1[0-2])$/`

Và để kiểm tra xem một chuỗi có ở định dạng MMDD hay không, bạn có thể sử dụng biểu thức chính quy này:

`/^(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/`

Bạn có thể sử dụng `match()`phương pháp tương tự để kiểm tra xem một chuỗi có khớp với bất kỳ biểu thức chính quy nào không.

# Cuối cùng
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/12/blog66-kiem-tra-format-mot-chuoi-co.html