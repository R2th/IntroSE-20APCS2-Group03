Chào cả nhà, lần này mình xin giới thiệu với mọi người một số cú pháp để viết code đẹp, ngắn gọn và clear hơn.
### 1. The Ternary Operator
Đây là một sự thay thế tuyệt với cho câu lệnh `if...else`

Longhand:
```
const x = 20;
let answer;

if (x > 10) {
    answer = "greater than 10";
} else {
    answer =  "less than 10";
}
```
Shorthand:
```
const answer = x > 10 ? "greater than 10" : "less than 10";
```
### 2. Short-circuit Evaluation Shorthand
Trước khi gắng giá trị của một biến cho một biến khác có thể bạn muốn chắc chắn giá trị đó không null, undefined hoặc empty. Thay vì dùng if với nhiều điều kiện thì có thể dùng short-circuit evaluation để thay thế

Longhand:
```
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}
```
Shorthand:
```
const variable2 = variable1  || 'new';
```
### 3. Declaring Variables Shorthand
Thay vì khai báo như sau:

Longhand:
```
let x;
let y;
let z = 3;
```
Thì bạn có thể khai báo ngắn gọn như sau:

Shorthand:
```
let x, y, z=3;
```
### 4. If Presence Shorthand
Cú pháp này mình tin các bạn đã dùng nhưng nó đáng để để cập ở đây.

Longhand:
```if (likeJavaScript == true)```
Shorthand:
```if (likeJavaScript)```
### 5. JavaScript For Loop Shorthand
Cú pháp này hửu ích khi bạn muốn dùng plain javascript mà không muốn dùng lodash hoặc jQuery

Longhand:
```
const fruits = ['mango', 'peach', 'banana'];
for (let i = 0; i < fruits.length; i++)
```
Shorthand:
```
for (let fruit of fruits)
```
Nếu bạn muốn lấy index thì có thể dùng 
```
for (let index in fruits)
```
Cú pháp trên cũng làm việc với một literal object
```
const obj = {continent: 'Africa', country: 'Kenya', city: 'Nairobi'}
for (let key in obj)
  console.log(key) // output: continent, country, city
```
### 6. Decimal Base Exponents
Cú pháp này ít dùng nhưng thật thiếu sót nếu không liệt kê ở đây. Nếu bạn có một giá trị `1 000 000 000 (1 tỷ)` bạn có thể viết là `1e9`

Longhand:
```
for (let i = 0; i < 1000000000; i++) {}
```
Shorthand:
```
for (let i = 0; i < 1e9; i++) {}

// All the below will evaluate to true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;
...
```
### 7. Object Property Shorthand
ES6 cung cấp cho chúng ta một cách ngắn gọn để tạo một literal object từ các biến đã có. Nếu key trong object giống với tên biến thì thay vì dùng

Longhand:
```
const x = 1920, y = 1080;
const obj = { x:x, y:y };
```
Thì bạn có thể dùng 

Shorthand:
```
const obj = { x, y };
```
### 8. Arrow Functions Shorthand
Trong ES6 ngoài cách định nghĩa function như trước thì còn có cú pháp định nghĩa function gọi là arrow function

Longhand:
```
function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});
```

Shorthand:
```
sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));
```
### 9. Default Parameter Values
Bạn có thể dùng câu lệnh `if` để đặt giá trị mất đinh cho những tham số của function. Trong ES6 bạn có thể đặt giá trị mặc định trong định nghĩa function. 

Longhand:
```
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}
```
Shorthand:
```
volume = (l, w = 3, h = 4 ) => (l * w * h);

volume(2) //output: 24
```
### 10. Template Literals
Trong ES6 thay phải dùng dấu `+` để ghép string và biến thì bạn có thể dùng `backtick ` và `${}` để ghép string và biến lại với nhau.

Longhand:
```
const welcome = 'You have logged in as ' + first + ' ' + last + '.'

const db = 'http://' + host + ':' + port + '/' + database;
```
Shorthand:
```
const welcome = `You have logged in as ${first} ${last}`;

const db = `http://${host}:${port}/${database}`;
```

Trên đây là một số cú pháp giúp chúng ta viết code gọn gàng, clear hơn. Mình mong là bài viết hữu ích và các bạn vận dụng vào trong code của mình.
Nội dung bài viết được tham khảo [tại đây](https://www.sitepoint.com/shorthand-javascript-techniques/)