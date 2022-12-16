Trong bài viết này chúng ta sẽ cùng so sánh sự khác biệt của 4 cách duyệt mảng trong Javascript:
* for (let i = 0; i < arr.length; ++i)
* arr.forEach((v, i) => { /* ... */ })
* for (let i in arr)
* for (const v of arr)

## Syntactic Overview
Khởi tạo mảng: 
```js
const arr = ['a', 'b', 'c'];
```
`for` và `for/in` cho phép bạn truy cập vào index của mảng chứ không phải là phần tử thực tế, thế nên bạn cần sử dụng `arr[i]` để lấy giá trị:
```js
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

for (let i in arr) {
  console.log(arr[i]);
}
```
Với `forEach()` và `for/of` bạn có thể truy cập trực tiếp đến giá trị của phần tử, `forEach()` cho phép bạn truy cập đến `index` của phần tử, `for/of` thì không.
```js
arr.forEach((v, i) => console.log(v));

for (const v of arr) {
  console.log(v);
}
```
## Non-Numeric Properties
Array trong javascript là object nên bạn cũng có thể thêm một phần tử có key là `string` thay vì chỉ là `number` thôi:
```js
const arr = ['a', 'b', 'c'];

typeof arr; // 'object'

// Assign to a non-numeric property
arr.test = 'bad';

arr.test; // 'abc'
arr[1] === arr['1']; // true
```
3 trên 4 cách duyệt mảng bên trên bỏ qua các phần tử có key không phải là số, trừ `for/in`:
```JS
const arr = ['a', 'b', 'c'];
arr.test = 'bad';

// Prints "a, b, c, bad"
for (let i in arr) {
  console.log(arr[i]);
}
```
Đó là ví do tại sao lặp qua một mảng sử dụng `for/in` là bad practice, những cách còn lại bỏ qua các phần tử có key không phải `number`:
```js
const arr = ['a', 'b', 'c'];
arr.test = 'abc';

// Prints "a, b, c"
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

// Prints "a, b, c"
arr.forEach((el, i) => console.log(i, el));

// Prints "a, b, c"
for (const el of arr) {
  console.log(el);
}
```
Thế nên tránh sử dụng `for/in` trừ khi bạn thực sự muốn duyệt qua các phần tử có key không phải số. Sử dụng rule `guard-for-in` của ESLint để không cho phép `for/in`
## Empty Elements
Javascript array cho phép chứa các phần tử rỗng, dưới đây là một ví dụ về cú pháp hợp lệ:
```js
const arr = ['a',, 'c'];

arr.length; // 3
```
`for/in` và `for/each`bỏ qua các phần tử rỗng, `for` và `for/of` thì không:
```js
// Prints "a, undefined, c"
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

// Prints "a, c"
arr.forEach(v => console.log(v));

// Prints "a, c"
for (let i in arr) {
  console.log(arr[i]);
}

// Prints "a, undefined, c"
for (const v of arr) {
  console.log(v);
}
```
## Function Context
Scope của this bên trong `for`, `for/in`, và `for/of` chính là scope bên ngoài của các cấu trúc lặp này, `forEach()` thì không như vậy trừ khi bạn dùng arrow function
```js
'use strict';

const arr = ['a'];

// Prints "undefined"
arr.forEach(function() {
  console.log(this);
});
```
Thế nên sử dụng arrow function đối với `forEach` nếu không this sẽ không tồn tại.
## Async/Await và Generators
`forEach` cũng không hoạt động tốt với Async/Await hoặc Generators. Nếu forEach callback là đồng bộ thì không thành vấn đề, nhưng bạn không thể sử dụng `await` bên trong forEach callback
```js
async function run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}
```
Không sử dụng được `yield` nốt:
```js
function* run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}
```
Sử dụng trong `for/of` thì hoàn toàn ok:
```js
async function asyncFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}

function* generatorFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}
```

## Kết luận
Nói chung, `for/of` là cách mạnh mẽ nhất để lặp lại qua một mảng trong JavaScript. Nó ngắn gọn hơn một vòng lặp thông thường và không có nhiều trường hợp đặc biệt như `for/in` và `forEach()`. Nhược điểm chính của `for/of` là bạn không thể trực tiếp lấy được index của phần tử đang được duyệt(*). `forEach()` có một số trường hợp sẽ khiến code của bạn chạy không theo ý muốn nên cần hạn chế dùng , nhưng trong nhiều trường hợp khác nó giúp code của bạn ngắn gọn hơn.


(*) Để lấy được index của phần tử đang được duyệt khi sử dụng `for/of`, sử dụng Array entries function:
```js
for (const [i, v] of arr.entries()) {
  console.log(i, v); // Prints "0 a", "1 b", "2 c"
}
```
Tham khảo: http://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript