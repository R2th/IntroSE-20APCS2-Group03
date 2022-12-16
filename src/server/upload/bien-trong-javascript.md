## Mục tiêu bài viết

- Biết cách khai báo biến trong Javascript.
- Nắm được một số đặc điểm của biến trong Javascript.

## Nội dung bài viết

- Biến trong Javascript nói riêng và trong ngôn ngữ lập trình nói chung dùng để lưu trữ các giá trị dữ liệu.
- Ví dụ ta muốn tạo ra ba biến với các tên lần lượt là x,y,z và các biến này ta sẽ lưu các giá trị. Hãy xem ví dụ bên dưới:

```js
var x = 5;
var y = 6;
var z = x + y;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables" target="_blank">Click để xem kết quả</a>
</div>

Giải thích cụ thể ví dụ trên nhé:

- Ta dùng từ khóa `var` để khai báo biến.
- Biến x lưu một số với giá trị là 5.
- Biến y lưu một số với giá trị là 6.
- Biến z lưu một số với giá trị là 11 (5 + 6).

**Sử dụng `let` và `const`**

Trước năm 2015, ta chỉ có thể sử dụng từ khóa `var` để khai báo một biến trong JavaScript. Cho đến phiên bản 2015 của JavaScript (ES6) mang đến nhiều lựa chọn hơn là có thể sử dụng thêm từ khóa `const` để xác định một biến không thể được gán lại và từ khóa `let` để xác định một biến có phạm vi hạn chế. Chúng ta sẽ phân biệt chúng sau, hiện tại các ví dụ mình sẽ sử dụng từ khóa `var`.

### Định danh Javascript

- Tất cả các biến trong JavaScript phải được xác định bằng các **tên duy nhất**. Quy tắc đặt tên và định danh cho biến xin hãy quay trở lại bài trước để xem [Cú pháp trong Javascript](/learning/bai-viet/javascript/05-cu-phap-trong-javascript)

### Toán tử gán

Trong Javascript thì dấu `=` là toán tử _gán_ chứ không phải có ý nghĩa là _bằng_ trong toán học. Ví dụ:

```js
x = x + 5;
```

Phép gáp sẽ được thực hiện theo nguyên tắc gán kết quả ở phía bên phải cho phần biến ở bên tay trái. Ví dụ ở trên thì nó sẽ lấy giá trị của x + 5 và gán vào cho x. Tức là, đoạn code trên có ý nghĩa rằng tăng giá trị của x lên 5.

> Trong javascript, toán tử `==` mới có ý nghĩa là phép bằng trong toán học chúng ta thường gặp. Những người mới học lập trình thường quên điều này nên gây ra lỗi nên hãy chú ý nhé.

### Các kiểu dữ liệu trong Javascript

Trong JavaScript có nhiều kiểu dữ liệu, nhưng trước tiên chúng ta hãy tìm hiểu kiểu chuỗi và số - hai kiểu khá phổ biến.

- Kiểu chuỗi được viết trong dấu nháy đơn hoặc dấu nháy kép.
- Kiểu số sẽ không có dấu nháy và chỉ là những con số. Nếu bạn để 1 số vào trong dấu nháy thì nó sẽ được xem như là một chuỗi.

  VD:

  ```js
  var pi = 3.14;
  var person = "John Doe";
  var answer = "Yes I am!";
  ```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_types" target="_blank">Click để xem kết quả</a>
</div>

### Khai báo (khởi tạo) biến trong Javascript

Khai báo hay khởi tạo biến trong Javascript chúng ta sử dụng từ khóa `var`. Ví dụ:

```js
var carName;
```

Sau khi biến được khai báo, biến sẽ không có giá trị (thực tế thì nó có giá trị là `undefined`).

Sử dụng dấu `=` để gán giá trị cho biến. Ví dụ

```js
carName = "BMW";
```

Chúng ta cũng có thể gán giá trị cho biến khi khai báo. Ví dụ:

```js
var carName = "BMW";
```

Và cũng có thể thể vừa khai báo biến và gán giá trị trong cùng một câu lệnh

```js
var carName = "Volvo";
```

Ví dụ dưới đây là chèn giá trị của biến vào HTML:

```js
<p id="demo"></p>

<script>
var carName = "Volvo";
document.getElementById("demo").innerHTML = carName;
</script>
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_create" target="_blank">Click để xem kết quả</a>
</div>

### Một câu lệnh, nhiều biến

Chúng ta cũng có thể khai báo nhiều biến bằng một câu lệnh bằng cách sử dụng dấu phẩy `,`.

```js
var person = "John Doe",
  carName = "Volvo",
  price = 200;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_multi" target="_blank">Click để xem kết quả</a>
</div>

Và cũng có thể tách ra thành nhiều dòng:

```js
var person = "John Doe",
  carName = "Volvo",
  price = 200;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_multiline" target="_blank">Click để xem kết quả</a>
</div>

### Giá trị bằng `undefined`

Trong các chương trình máy tính, các biến thường xuyên được khai báo mà không có giá trị. Các biến được khai báo mà chưa được gán giá trị sẽ có giá trị là `undefined`. Ví dụ:

```js
var carName;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_undefined" target="_blank">Click để xem kết quả</a>
</div>

### Khai báo lại biến Javascript

Khi bạn khai báo lại biến trong Javascript, giá trị cũ của nó sẽ không bị mất đi. Ví dụ:

```js
var carName = "BMW";
var carName;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_redefine" target="_blank">Click để xem kết quả</a>
</div>

Ví dụ trên **carName** vẫn có giá trị là **BMW**

### Phép tính trong Javascript

Sử dụng dấu `=`, `+`,... để làm những phép tính với biến trong Javascript. Ví dụ:

```js
var x = 5 + 2 + 3;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_add_numbers" target="_blank">Click để xem kết quả</a>
</div>

Chúng ta cũng có thể làm tương tự đối với chuỗi nhưng các chuỗi sẽ được nối lại. Ví dụ:

```js
var x = "John" + " " + "Doe";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_add_strings" target="_blank">Click để xem kết quả</a>
</div>

Nếu bạn chuyển một số thành chuỗi bằng cách thêm dấu ngoặc kép thì phần còn lại sẽ được coi như là 1 chuỗi và nối vào nhau. Ví dụ:

```js
var x = "5" + 2 + 3;
```

Kết quả sẽ là: `55`

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_add_number_string" target="_blank">Click để xem kết quả</a>
</div>

### Ký hiệu đô la $

Để định danh trong Javascript phải được bắt đầu bằng:

- Một chữ cái (A-Z or a-z)
- Một ký hiệu `$`
- Hoặc dấu gạch dưới (`_`)

Vì JavaScript coi ký hiệu đô la là một chữ cái, nên các biến chứa `$` là các tên biến hợp lệ. Ví dụ:

```js
var $myMoney = 5;
var $$$ = "Hello World";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_dollar" target="_blank">Click để xem kết quả</a>
</div>

Việc sử dụng ký hiệu $ không phổ biến trong JavaScript, nhưng các lập trình viên chuyên nghiệp thường sử dụng nó làm bí danh cho hàm chính trong thư viện JavaScript như Jquery.

### Ký hiệu gạch dưới `_`

Vì JavaScript coi dấu gạch dưới là một chữ cái, các biến chứa `_` là hợp lệ. Ví dụ:

```js
var _lastName = "Johnson";
var _x = 2;
```

Sử dụng dấu gạch dưới không phổ biến trong JavaScript, nhưng một quy ước giữa các lập trình viên chuyên nghiệp là sử dụng nó làm bí danh cho các biến **private**.