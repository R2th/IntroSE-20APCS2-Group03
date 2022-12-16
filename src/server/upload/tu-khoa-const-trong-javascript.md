## Mục tiêu bài viết

- Hiểu được từ khóa `const` và cách sử dụng của từ khóa này.
- Có thể thực hành với từ khóa `const`.

## Nội dung bài viết

Ở phiên bản ES2015 đã giới thiệu 2 từ khóa Javascript mới là `let` và `const`. Bài trước chúng ta đã tìm hiểu `let`, đến bài này chúng ta sẽ tìm hiểu thứ còn lại đó là `const`.

Các biến được xác định bằng `const` hoạt động giống như biến `let`, ngoại trừ chúng không thể được gán lại giá trị. Ví dụ:

```js
const PI = 3.141592653589793;
PI = 3.14; // Gây ra lỗi
PI = PI + 10; // Cũng gây ra lỗi
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_value" target="_blank">Click để xem kết quả</a>
</div>

### Phạm vi khối

Khai báo biến với từ khóa `const` cũng giống như `let`.

```js
var x = 10;
// Ở đây x là 10
{
  const x = 2;
  // Ở đây x là 2
}
// Ở đây x là 10
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const" target="_blank">Click để xem kết quả</a>
</div>

### Gán khi khai báo

Biến khai báo với từ khóa `const` phải được gán giá trị khi khai báo.

```js
const PI;
PI = 3.14159265359; // sai

const PI = 3.14159265359; // đúng
```

### Hằng số

`const` không xác định một giá trị không đổi mà nó xác định một tham chiếu không đổi đến một giá trị.

Bởi vì điều này nên không thể thay đổi các giá trị nguyên thủy không đổi, nhưng chúng ta có thể thay đổi các thuộc tính của các đối tượng hằng số

### Giá trị nguyên thủy

Nếu gán một giá trị nguyên thủy cho một hằng số thì chúng ta không thể thay đổi giá trị đó. Ví dụ:

```js
const PI = 3.141592653589793;
PI = 3.14; // error
PI = PI + 10; // error
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_value" target="_blank">Click để xem kết quả</a>
</div>

### Hằng số là đối tượng có thể thay đổi

Khi khai báo một đối tượng với từ khóa `const` chúng ta có thể thay đổi giá trị của thuộc tính đối tượng. Ví dụ:

```js
const car = { type: "Fiat", model: "500", color: "white" };

// thay đổi giá trị của thuộc tính color
car.color = "red";

// Có thể thêm cả thuộc tính mới vào đối tượng.
car.owner = "Johnson";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_object" target="_blank">Click để xem kết quả</a>
</div>

Có thể thay đổi giá trị của thuộc tính đôi tượng nhưng không thể gán lại cho nó một đối tượng mới. Ví dụ:

```js
const car = { type: "Fiat", model: "500", color: "white" };
car = { type: "Volvo", model: "EX60", color: "red" }; // ERROR
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_object_assign" target="_blank">Click để xem kết quả</a>
</div>

### Hàng số là mảng có thể thay đổi

Tương tự như đối tượng, chúng ta có thể thay đổi các giá trị của các phần tử trong 1 mảng. Ví dụ:

```js
const cars = ["Saab", "Volvo", "BMW"];

// Thay đổi phần tử thứ 0
cars[0] = "Toyota";

// Có thể thêm cả phần tử mới vào mảng.
cars.push("Audi");
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_array" target="_blank">Click để xem kết quả</a>
</div>

Tương tự Object , bạn cũng không thể gán lại cho nó 1 mảng mới. Ví dụ:

```js
const cars = ["Saab", "Volvo", "BMW"];
cars = ["Toyota", "Volvo", "Audi"]; // ERROR
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_array_assign" target="_blank">Click để xem kết quả</a>
</div>

### Khai báo lại

Không được phép khai báo đè biến `var` hoặc `let` hiện có thành biến `const` trong cùng phạm vi hoặc cùng một khối. Ví dụ:

```js
var x = 2;
const x = 2; // Không được phép
{
  let x = 2;
  const x = 2; // Không được phép
}
```

Không được phép khai báo lại hoặc gán lại một biến const hiện có, trong cùng phạm vi hoặc trong cùng một khối.

```js
const x = 2;
const x = 3; // Không được phép
x = 3; // Không được phép
var x = 3; // Không được phép
let x = 3; // Không được phép
```

```js
const x = 2;
const x = 3; // Không được phép
x = 3; // Không được phép
var x = 3; // Không được phép
let x = 3; // Không được phép
```

Được phép khai báo lại một biến với const, trong một phạm vi khác hoặc trong một khối khác.

```js
const x = 2; // Được phép

{
  const x = 3; // Được phép
}

{
  const x = 4; // Được phép
}
```

### Hoisting

Các biến được định nghĩa bằng `var` được đẩy lên trên cùng và sẽ được khởi tạo.

Nhưng với biến `const` cũng được đưa lên đầu khối, nhưng không được khởi tạo. Khối mã nhận biết được biến, nhưng nó không thể được sử dụng cho đến khi nó đã được khai báo.

Sử dụng một biến `const` trước khi nó được khai báo, là một lỗi cú pháp.

```js
carName = "Volvo";
const carName;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_let_hoisting_const" target="_blank">Click để xem kết quả</a>
</div>