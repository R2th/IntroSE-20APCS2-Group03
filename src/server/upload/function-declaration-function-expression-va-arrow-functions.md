Trong javascript, một function (hàm) không phải là "một cấu trúc gì đó quá là ảo diệu", nó chỉ là một loại dữ liệu đặc biệt. 

### 1. Function Declaration và Function Expression
Dưới đây là cú pháp để khai báo function trước khi nó được gọi đến `Function Declaration`

```
function sayHi() {
  alert( "Hello" );
}
```
Tương tự như trên ta cũng có một cách khác để tạo ra function gọi là `Function Expression` 
nó cũng tương tự như trên ở đây ta lưu function vào một biến
```
let sayHi = function() {
  alert( "Hello" );
};
```
Ở đây, function được tạo ra và gán vào một biến giống như tất các các biến lưu giá trị khác. Dù function được định nghĩa thế nào, thì nó cũng chỉ là một giá trị (value) được lưu trữ vào biến `sayHi`. Hiểu đơn giản cho ví dụ trên là: tạo ra một function và đặt nó vào biến `sayHi`

Chúng ta có thể in ra giá trị sử dụng `alert`

```
function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // shows the function code
```

Hãy chú ý rằng ở dòng cuối `alert( sayHi );` sẽ không chạy function `sayHi`, bởi vì không có dấu ngoặc ở sau `sayHi` (một vài ngôn ngữ khác khi gọi function name đồng thời sẽ khởi chạy luôn function đó nhưng Javascript thì không như vậy)

Trong javscript function chỉ l à một giá trị. Đoạn mã ở trên sẽ hiển thị đoạn kí tự thể hiện phần nội dung của function (source code).

Nó đơn giản chỉ là một giá trị khá đặc biệt, muốn thực thi nó thì ta cần thêm dấu ngoặc ở cuối `sayHi()`

Chúng ta cũng có thể sao chép (copy) function này sang một biến khác
```
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

Chú ý: 
Có thể bạn sẽ thắc mắc tại sao `Function Expression` lại có dấu `;` ở cuối còn `Function Declaration` thì không ?
```
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
};
```

Câu trả lời đơn giản là:
- Chúng ta không cần dấu `;` ở cuối một khối lệnh ví dụ như thế này `if { ... }`, `for { }`, `function f { }` ...
- Ở `Function Expression` thì nó sử dụng cú pháp như một dòng lệnh: `let sayHi = ...;`. Nó không phải là một khối lệnh thế nên dấu `;` ở cuối là cần thiết cho dù giá trị có là gì đi nữa. Dấu `;` ở đây có vẻ không liên quan nhiều đến `Function Expression` mà chỉ đơn giản nó là kí tự để kết thúc một dòng lệnh.

### 2. Sự khác biệt giữa Function Expression vs Function Declaration

Mặc dù 2 loại function này rất giống nhau nhưng nó có một điểm khác biệt chính đó là
- Function Expression được tạo khi mà nó được gọi đến và nó có thể được sử dụng sau khi khai báo
- Function Declaration có thể được sử dụng ở bất cứ chỗ nào trong khối lệnh khai báo function đó (có thể sử dụng trước khi khai báo function). Có thể nói javascript đã chuẩn bị function này ngay từ khi bắt đầu vào khối lệnh
Ví dụ Function Declaration
```

sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```
Function Expression
```
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Chú ý: `Function Declaration` có thể được gọi bất cứ chỗ nào trong khối lệnh (ngoài khối lệnh thì không được) còn `Function Expression` chỉ có thể được gọi sau khi khai báo.

Để hiểu thêm ta sẽ có thêm một ví dụ khác
```
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
welcome(); // Error: welcome is not defined
```

Trong ví dụ trên  sử dụng `Function Declaration` và nó chỉ được gọi đến trong khối lệnh không thể gọi được từ bên ngoài. Trong trường hợp này ta nên sử dụng `Function Expression` sẽ tốt hơn

```
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // ok now
```

Vậy khi nào nên dùng `Function Declaration` và `Function Expression` ?

Về cơ bản 2 loại trên là giống nhau khi sử dụng lưu ý một vài chỗ nho nhỏ.  Tuy nhiên `Function Declaration` được đánh giá là dễ nhìn và dễ đọc hơn `Function Expression` . Một vài trường hợp đặc biệt ta nên dùng `Function Declaration` như trong ví dụ trên

### 3. Arrow functions

Có thể nói `arrow functions` là một cải tiến đột phá. Với cú pháp vô cùng đơn giản và ngắn gọn cho việc tạo một function, nó được đánh giá là tốt hơn rất nhiều `Function Expression`

Ví dụ

Với expression đơn giản được viết 1 dòng
```
let func = (arg1, arg2, ...argN) => expression
```
hoặc với phần expression phức tạp nhiều dòng
```
let func = (arg1, arg2, ...argN) => {
  return expression
 }
```

Ví dụ trên tạo một `function` với các tham số truyền vào là `arg1, arg2, ...argN` và sẽ thực thi đoạn `expression` đồng thời trả về kết quả của `expression`.

Đoạn code trên có thể viết dưới dạng `Function Expression` như sau
```
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

Lấy một ví dụ đơn giản cụ thể
```
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

```
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Ta có thể thấy với `arrow functions` đoạn mã của chúng ta trở nên đơn giản hơn  rất nhiều.

Qua các ví dụ trên mong có thể giúp bạn hiểu phần  nào về các loại `function` (hàm) trong javascript. Cảm ơn bạn đã theo dõi bài viết

#### Tham khảo
https://javascript.info/function-expressions-arrows