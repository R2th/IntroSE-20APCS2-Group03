## Mục tiêu bài viết

- Hiểu được cú pháp khai báo hàm
- Hiểu được cách sử dụng hàm trong Javascript

## Nội dung bài viết

Hàm trong JavaScript là một khối mã được thiết kế để thực hiện một tác vụ cụ thể.

### Cú pháp khai báo hàm trong javascript

Một hàm JavaScript được định nghĩa bằng từ khóa `function`, theo sau là tên hàm, theo sau là dấu ngoặc đơn `()`.

Dấu ngoặc đơn có thể bao gồm tên tham số được phân tách bằng dấu phẩy.

Tên hàm có thể chứa các chữ cái, chữ số, dấu gạch dưới và dấu đô la (quy tắc giống như các biến). Ví dụ:

```js
function name(parameter1, parameter2, parameter3) {
  // code được viết ở đây
}
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_functions" target="_blank">Click để xem kết quả</a>
</div>

- Các **tham số** của hàm được liệt kê bên trong dấu ngoặc đơn ().
- Các **đối số** của hàm là các giá trị mà hàm nhận được khi nó được gọi.
- Bên trong hàm, các đối số (các tham số) hoạt động như các biến cục bộ.

### Khi nào hàm được gọi

Hàm được gọi:

- Khi một sự kiện xảy ra (khi người dùng nhấp vào một nút)
- Khi nó được gọi từ mã JavaScript.
- Tự động gọi.

### Return hàm

Khi JavaScript gặp từ khóa `return`, hàm sẽ ngừng thực thi.
Các hàm thường tính ra giá trị và trả về. Ví dụ:

```js
var x = myFunction(4, 3); // Hàm được gọi, trả về giá trị bằng x

function myFunction(a, b) {
  return a * b; // hàm trả về tích của a và b
}
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_function_return" target="_blank">Click để xem kết quả</a>
</div>

### Tại sao cần sử dụng hàm?

Hàm giúp chúng ta có thể tái sử dụng code để code dễ đọc, dễ bảo trì hơn.
Bạn có thể sử dụng hàm nhiều lần và với các tham số khác nhau thì sẽ trả ra kết quả khác nhau. Ví dụ:

```js
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
document.getElementById("demo").innerHTML = toCelsius(77);
```

Kết quả trả về : `function toCelsius(f) { return (5/9) \* (f-32); }`

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_farenheit_to_celsius" target="_blank">Click để xem kết quả</a>
</div>