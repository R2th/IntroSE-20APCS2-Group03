## Đặt vấn đề

Khi bạn viết khởi tạo các biến trong JavaScript (ES6), có bao giờ bạn sẽ tự hỏi khi nào nên sử dụng **let**, **var** or **const** chưa :thinking: Vậy hãy thử đi tìm một số câu trả lời.

## Sự khác nhau

### Quy tắc phạm vi

Sự khác biệt chính là ở quy tắc phạm vi. Các biến được khai báo bởi từ khóa `var` được đặt trong phạm vi của một `function`  thì có thể sử dụng nó bất cứ đâu trong hàm (function scoped). Trong khi biến được khai báo bởi từ khóa `let` được đặt trong một khối được bao bọc bởi `{}` thì sẽ chỉ sử dụng được trong khối đó (block scoped), ví dụ như trong một vòng lặp `for` hoặc một câu lệnh `if`.

***Trong một function***

Bên trong một function `let` có cùng phạm vi với `var`. Bên ngoài function thì không.
```js
(() => {
  var foo = "Foo";
  let bar = "Bar";

  console.log(foo); // Foo
  console.log(bar); // Bar
})();

console.log(foo); // ReferenceError: foo is not defined
console.log(bar); // ReferenceError: bar is not defined
```

***Trong một block***

Các biến được khai báo sử dụng cho phép bên trong một block không thể được truy cập bên ngoài block đó.
```js
{
  var foo = "Foo";
  let bar = "Bar";

  console.log(foo); // Foo
  console.log(bar); // Bar
}

console.log(foo); // Foo
console.log(bar); // ReferenceError: bar is not defined
```

***Trong một vòng lặp***

Các biến được khai báo với các vòng lặp sử dụng `let` chỉ có thể được tham chiếu bên trong vòng lặp đó.
```js
for (var i = 0; i < 3; i++) {
  var j = i * 2;
}
console.log(i); // 3
console.log(j); // 4

for (let k = 0; k < 3; k++) {
  let l = k * 2;
}
console.log(typeof k); // undefined
console.log(typeof l); // undefined
// Trying to do console.log(k) or console.log(l) here would throw a ReferenceError.
```

Lý do từ khóa `let` được giới thiệu cho JavaScript chính là việc các phạm vi có thể gây nhầm lẫn và là một trong những nguồn lỗi chính trong JavaScript.

### Hoisting

Sự khác biệt tiếp theo chính là `Hoisting`.  Hoisting chính là phiên dịch JavaScript sẽ gán các khai báo biến là một giá trị mặc định không xác định trong suốt thời gian gọi là 'Creation' phase. Bạn sẽ thấy điều này khi các biến được khai báo bằng từ khóa `var` được "hosted" lên đầu khối, điều đó có nghĩa là chúng có thể truy cập được trong phạm vi kèm theo ngay cả trước khi chúng được khai báo:
```js
function run() {
  console.log(foo); // undefined
  var foo = "Foo";
  console.log(foo); // Foo
}

run();
```
Trong khi nếu bạn cố gắng gọi một biến được khai báo bằng từ khóa `let` trước khi nó được khai báo, thay vì trả ra **undefined** (như các biến được khai báo với `var`), bạn sẽ nhận được **ReferenceError**.
```js
function checkHoisting() {
  console.log(foo); // ReferenceError
  let foo = "Foo";
  console.log(foo); // Foo
}

checkHoisting();
```

### Tạo đối tượng global

Tiếp theo ở cấp cao nhất là tạo biến `global`, `let` không giống như `var`, không tạo đối tượng toàn cục.
```js
var foo = "Foo";  // globally scoped
let bar = "Bar"; // globally scoped

console.log(foo); // Foo
console.log(bar); // Bar

console.log(this.foo); // Foo
console.log(this.bar); // undefined
```

### Redeclaration

Bạn không thể khai báo cùng một biến nhiều lần bằng cách sử dụng `let`. Bạn cũng không thể khai báo một biến bằng cách sử dụng `let` với cùng một mã định danh như một biến khác được khai báo bằng `var`.
```js
var foo = "foo1";
var foo = "foo2"; // No problem, 'foo' is replaced.

let bar = "bar1";
let bar = "bar2"; // SyntaxError: Identifier 'bar' has already been declared

var foo = "foo1";
let foo = "foo2"; // SyntaxError: Identifier 'foo' has already been declared
```

### Const thì sao?

Bây giờ bạn đã hiểu sự khác biệt giữa `var` và `let`, còn `const` thì sao? Hóa ra, `const` gần chính xác như `let`. Tuy nhiên, điểm khác biệt một khi bạn đã gán một giá trị cho một biến bằng `const` qua hai điểm sau:

***No re-assigning***

Biến được khai báo sử dụng `const` sẽ không thể được gán lại.
```js
const foo = "Foo";
foo = "Foo1"; // TypeError: Assignment to constant variable.
```

Lưu ý rằng điều đó không có nghĩa với giá trị là bất biến. Thuộc tính của nó vẫn có thể được thay đổi.
```js
const obj = {};
obj.foo = "Foo";
console.log(obj.foo); // Foo
```

Nếu bạn muốn có một đối tượng bất biến, bạn nên sử dụng [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

***Initializer is required***

Bạn luôn phải chỉ định một giá trị khi khai báo một biến bằng `const`.
```js
const foo; // SyntaxError: Missing initializer in const declaration
```

## Kết luận

| var | let |const |
| -------- | -------- | -------- |
| function scoped     | block scoped     | block scoped     |
| undefined when accessing a variable before it's declared     | ReferenceError when accessing a variable before it's declared     | ReferenceError when accessing a variable before it's declared can't be reassigned     |

Vậy bạn sẽ sử dụng chúng như nào? Luôn luôn sử dụng `const` trừ khi bạn biết biến đó sẽ thay đổi. Lý do là khi sử dụng `const`, bạn có thể giúp chính bạn hoặc người nào đó đọc lại code đó của bạn rằng biến này không nên thay đổi. Nếu nó cần thay đổi (như trong vòng lặp for), bạn nên sử dụng `let`. Và cũng có ý kiến cho rằng `Always use let as much as possible to avoid the scope monster` :grinning:

Vì vậy, để tóm tắt lại, `var` là `function scoped` và nếu bạn cố gắng sử dụng một biến được khai báo với `var` trước khi khai báo thực tế, bạn sẽ nhận `undefined`. `const` và `let` bị chặn trong `block scoped` và nếu bạn cố gắng sử dụng biến được khai báo bằng `let` hoặc `const` trước khi khai báo, bạn sẽ nhận được `ReferenceError`. Cuối cùng, sự khác biệt giữa `let` và `const` là một khi bạn đã gán một giá trị cho `const`, bạn không thể xác định lại giá trị của nó, nhưng với `let`, bạn có thể.

### Tài liệu tham khảo
https://www.geeksforgeeks.org/difference-between-var-and-let-in-javascript/
https://tylermcginnis.com/var-let-const/
https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f