Cú pháp JavaScript là tập hợp các quy tắc, các chương trình JavaScript được xây dựng:

```js
var x, y, z; // khai báo biến
x = 5;
y = 6; // gán giá trị cho biến
z = x + y; // tính toán lại giá trị
```

### Giá trị trong Javascript

JavaScript bao gồm hai loại giá trị:

- Giá trị cố định
- Giá trị biến đổi

Giá trị cố định được gọi là **Literal** .
Giá trị biến đổi được gọi là **Biến(Variables)** .

### JavaScript Literals

Chúng ta có hai quy tắc cú pháp quan trọng cho các giá trị cố định là:

1 . **Số** được viết dưới dạng số nguyên và số thập phân. Ví dụ:

```js
10.5;
1001;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_numbers" target="_blank">Click để xem kết quả</a>
</div>

2 . **Chuỗi là văn bản**, được viết trong dấu ngoặc kép hoặc ngoặc đơn. Ví dụ:

```js
"John Doe";
"John Doe";

```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_strings" target="_blank">Click để xem kết quả</a>
</div>

### Các biến JavaScript

Trong một ngôn ngữ lập trình, các biến được sử dụng để lưu trữ các giá trị dữ liệu.

- JavaScript sử dụng từ khó `var` a để khai báo các biến.
- Dấu bằng được sử dụng để gán giá trị cho các biến.

Ví dụ khai báo biến x và gán giá trị cho nó bằng 6

```js
var x;
x = 6;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_variables" target="_blank">Click để xem kết quả</a>
</div>

### Toán tử JavaScript

JavaScript sử dụng toán tử số học `+`, `-`, `*`, `/` để tính toán các giá trị. Ví dụ:

```js
5 + 6 * 10;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_operators" target="_blank">Click để xem kết quả</a>
</div>

JavaScript sử dụng toán tử gán `=` để gán giá trị cho các biến. Ví dụ:

```js
var x, y;
x = 5;
y = 6;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_assign" target="_blank">Click để xem kết quả</a>
</div>

### Biểu thức trong JavaScript

Một biểu thức là sự kết hợp của các giá trị, biến và toán tử, tính toán thành một giá trị. Ví dụ:

```js
5 * 10;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_assign" target="_blank">Click để xem kết quả</a>
</div>

Biểu thức cũng có thể chứa các biến. Ví dụ:

```js
var x;
x = 5;
document.getElementById("demo").innerHTML = x * 10;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_expressions_variables" target="_blank">Click để xem kết quả</a>
</div>

Các giá trị có thể thuộc nhiều kiểu dử liệu khác nhau, chẳng hạn như số và chuỗi.
Ví dụ: `"John" + "" + "Doe"`, Kết quả là `"John Doe"`

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_expressions_strings" target="_blank">Click để xem kết quả</a>
</div>

### Từ khóa trong javascript JavaScript

Các từ khóa JavaScript được sử dụng để xác định các hành động sẽ được thực hiện.
Từ khóa `var` để tạo ra các biến.

```js
var x, y;
x = 5 + 6;
y = x * 10;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_keywords" target="_blank">Click để xem kết quả</a>
</div>

### Comment trong Javascript

Comment code thì các câu lệnh JavaScript sẽ không được "thực thi". Với mục đích chú thích code để lần sau có thể hiểu hoặc người khác đọc code có thể hiểu. Muốn commnet code trong javascript ta sử dụng hai dấu gạch chéo `//` hoặc trong gặp dấu `/* */`. Ví dụ:

```js
var x = 5; // Đoạn code này sẽ chạy
// var x = 6; Đoạn code này sẽ không được chạy
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_comments" target="_blank">Click để xem kết quả</a>
</div>

### Định danh trong Javascript

- Định danh là tên.
- Trong JavaScript, định danh là đặt tên cho các biến (và **từ khóa**, **hàm** và **label**).
- Các quy tắc về đặt tên khá giống nhau trong hầu hết các ngôn ngữ lập trình.
- Trong JavaScript, ký tự đầu tiên phải là một chữ cái, hoặc một dấu gạch dưới `_`, hoặc ký hiệu đô la `$`.
- Các ký tự tiếp theo có thể là chữ cái, chữ số, dấu gạch dưới hoặc ký hiệu đô la.
- Ký tự đầu tiên không được phép là con số.

### JavaScript phân biệt chữ hoa chữ thường

Với Javascript hai biến `lastName` và `lastname`, là hai biến khác nhau. Ví dụ

```js
var lastname, lastName;
lastName = "Doe";
lastname = "Peterson";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_syntax_case" target="_blank">Click để xem kết quả</a>
</div>

Từ khóa khai báo biển không thể là `VAR`, `Var` mà phải là `var`.

### Camel Case trong Javascript

Có nhiều cách khác nhau để nối nhiều từ thành một tên biến như:

**1. Underscore**

Một vài ví dụ như: **first_name**, **last_name**, **master_card**, **inter_city**.

**2. Upper Camel Case (Pascal Case)**

Một vài ví dụ như: **FirstName**, **LastName**, **MasterCard**, **InterCity**.

**3. Lower Camel Case**

Các lập trình viên JavaScript có xu hướng sử dụng trường hợp lowerCamel bắt đầu bằng chữ thường. Một vài ví dụ:
**firstName**, **lastName**, **masterCard**, **interCity**.