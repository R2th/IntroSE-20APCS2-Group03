Trong hướng dẫn này, mình sẽ hướng dẫn bạn tìm hiểu về cú pháp JavaScript bao gồm phân biệt chữ hoa chữ thường, số nhận dạng, nhận xét, câu lệnh và biểu thức.

**JavaScript is case-sensitive**

Mọi thứ trong JavaScript bao gồm các biến, tên hàm, tên lớp và toán tử đều phân biệt chữ hoa chữ thường.

Vd: Như hai biến dưới đây là khác nhau hoàn toàn 
```
Counter
```
với
```
counter
```

Tương tự như vậy, bạn không thể sử dụng `instanceof ` làm tên của hàm vì nó là một từ khóa. Tuy nhiên `instanceof` là một tên hàm hợp lệ

**Identifiers**

Một định danh là tên của một biến, hàm, tham số hoặc lớp. Mã định danh bao gồm một hoặc nhiều ký tự theo định dạng sau:

1. Ký tự đầu tiên phải là một chữ cái (a-z hoặc A-Z), dấu gạch dưới (_) hoặc ký hiệu đô la ($).
2. Các ký tự khác có thể là chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_) và ký hiệu đô la ($).

Tên được đặt theo kiểu lạc đà (camel case) là rất tốt. Chữ cái đầu viết thường và từ thứ hai trở đi viết hoa chữ cái đầu

VD: Như các tên dưới đây
```
counter
inArray
beginWith
redirectPage
```

**Comments**

Javascript hôc trợ comments một dòng hay một khối 

VD: Nhận xét một dòng bắt đầu bằng ký tự gạch chéo `//`
```
// this is a single-line comment
```

Nhận xét khối bắt đầu bằng dấu gạch chéo và dấu hoa thị (/*) và kết thúc ngược lại như sau:
```
/*
* This is a block comment that can
* span multiple lines
*/
```

Khi các bạn viết code một chức năng nào đó thì các bạn nên để lại nhận xét cho đoạn code đó là làm gì để cho khi người khác vào đọc code của bạn có thể hiểu được đoạn code xử lý cái gì.

**Statements**

Mặc dù JavaScript không yêu cầu kết thúc câu lệnh bằng dấu chấm phẩy ( ; ), nhưng luôn luôn nên sử dụng dấu chấm phẩy để kết thúc câu lệnh.

Lý do là dấu chấm phẩy sẽ làm cho mã của bạn dễ đọc hơn và giúp bạn tránh được nhiều vấn đề mà bạn có thể gặp phải.

```
var a = 20;
var b = 10;
```
Bạn có thể sử dụng một khối mã bắt đầu bằng dấu ngoặc nhọn trái ({) và kết thúc bằng dấu ngoặc nhọn phải (}) để kết hợp nhiều câu lệnh như sau:

```
if( a > b) {
   console.log('a is greater than b');
   return true;
}
```

**Expressions**

Biểu thức là một đoạn mã đánh giá một giá trị.

Ví dụ:
```
2 + 1
```

Biểu thức trên trả về 3 vì vậy nó là biểu thức hợp lệ.

Giả sử bạn có hai biến a và b, sau đây minh họa một biểu thức liên quan đến a và b:
```
a + b
```

**Keywords**

JavaScript định nghĩa một danh sách các từ khóa có công dụng đặc biệt.

Bạn không thể sử dụng các từ khóa phía dưới làm định danh. Danh sách các từ khóa JavaScript hoàn chỉnh như sau:

* break, export, super, case, extends, switch
* catch, finally, typeof, class, for, this, const, function, throw
* continue,	if,	try, debugger, import, var, default, in, void
* delete, instanceof, while, 
* do, new, with, else, return, yield

Bây giờ bạn đã hiểu rõ về cú pháp JavaScript bao gồm đặt tên định danh, xây dựng câu lệnh và nhận xét code.

Mình hy vọng bài viết trên có thể giúp các bạn hiểu rõ hơn về cú pháp javascript.

Cảm ơn các bạn đã đọc bài viết của mình. Hẹn các bạn ở các bài tiếp theo :heart_eyes::heart_eyes: