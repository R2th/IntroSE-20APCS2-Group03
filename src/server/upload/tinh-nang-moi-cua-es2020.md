Xin chào mọi người, năm 2020 đến rồi hãy cùng mình tìm hiểu những điều mới nhất đầu năm này nhé.
 
Đó là phiên bản `ECMAScript` mới đã được released! Một tin tốt đối với những người yêu thích `ECMAScript` nhỉ. Ở phiên bản `ECMAScript` trước, đã có nhiều tính năng thú vị và function hữu ích đã được thêm vào. Lần này chúng ta mong đợi điều gì? Hay cùng mình kiểm tra nhé.

### String.protype.matchAll

Phương thức matchAll() trả về  kết quả của một string với một regular expression, bao gồm cả capturing groups. Hãy xem ví dụ dưới đây để hình dung rõ hơn nhé:
```
const string = 'Trần Nữ Như Quỳnh'
const regex = 'Nữ'
for (const match of string.matchAll(regex)) {
    console.log(match)
}
kết quả: ["Nữ", index: 5, input: "Trần Nữ Như Quỳnh", groups: undefined]
```

Trình duyệt hỗ trợ:

* Chrome: 73
* Firefox: 67
* Opera: 60

### Dynamic Import
Bây giờ, bạn có thể import một file dynamically.

Trước đây chúng ta sử dụng như thế này:

```js
import { max } from '../math.js';
const nums = [1, 2, 3];
max(...nums); // 3
```

Nhưng bây giờ, chúng ta có thể import một file dynamically. Và `JavaScript` đọc các modules ở trong file và mang chúng vào đoạn code nơi mà chúng được gọi.

```js
const numbs = [1, 2, 3];
if (numbs.length) {
  const math = '../math';
  import(math)
    .then(module => {
      module.max(...numbs);
    })
}
```

Import động trả về một promise. Có nghĩa bạn có thể viết nó theo cách như này.

```js
const math = '../math.js';
const module = await import(math);
module.max(...numbs);
```

Trình duyệt hỗ trợ:

* Chrome: 63
* Firefox: 67
* Opera: 50
* Safari: 11.1
    
###   BigInt

Khi bạn phải nhân hai số mà chúng quá lớn đến nổi gây overflow, vậy chúng ta có cách khắc phục điều đó không?

```
Number.MAX_VALUE * 2 // Infinity
```

Câu trả là có, với `BigInt` nó là một vị cứu tinh cho chúng ta trong trường hợp này.

Để sử dụng BigInt bằng cách gọi BigInt() với dấu ngoặc đơn hoặc 2n với 'n' ở cuối `Number`.

```
const num = 2;
const bigNum = BigInt(num);
console.log(bigNum); // 2n
console.log(bigNum === 2n); // true
```

Bạn cũng có thể nhân, chi, công và trừ nó.

```
const bigN = BigInt(10);
bigN + bigN; // 20n
bigN * 3n; // 30n
bigN - BigInt('55'); // 45n
bigN / 3n; // 3n
```

Có một lưu ý nhỏ, đối với bigN/3n trả về 3n chứ không phải 3.33333n. Bởi vì như bạn có nhận ra từ tên của nó, nó chỉ xử lý các số nguyên. Vì vậy bigN/3n tương tự như `Math.floor(10/3)`

Thật không may, bạn không thể sử dụng `BigInt` với `float` và cũng không thể sử dụng `BigInt` và `Number` cùng nhau.

```
BigInt(3.3); 
// Uncaught RangeError 
BigInt('3.3');
// Uncaught SyntaxError
BigInt(1) + 1;
// Uncaught TypeError
// Không thể kết hợp BigInt với các kiểu dự liệu khác
```

Thay vào đó,  chúng sẽ sử dụng được trong trường hợp so sánh.

```
BigInt(1) < 2 // true
BigInt(2) === 1 // false
```

Và một BigInt có thể được đánh giá như `Number` nếu nó có điều kiện.

```
function print(n) {
  if (BigInt(n)) {
   console.log('hi');
  } else {
   console.log('bye');
  }
}
print(1); // hi
print(0); // bye
```

Trình duyệt hỗ trợ:

* Chrome: 67
* Firefox: 68
* Opera: 54

### Promise.allSettled

`Promise.allSettled` khá giống với `Promise.all`, nhưng có sự khác biệt giữa chúng. Đó là `Promise.all` đợi cho tất cả các promises được thực hiện hoặc từ chối. Còn `Promise.allSettled` lại không quan tâm điều đó. Những gì nó quan tâm là tất cả các promises đã được thực hiện, bất kể trạng thái của chúng là gì. Vì vậy mọi promise đầu vào đều có thể được thực hiện hoặc từ chối, nhưng đều đó không quan trọng với `Promise.allSettled`. Chỉ cần tất cả chúng đã được thực hiện.

```
const promises = [
  fetch('index.html'),
  fetch('index.js'),
  fetch('jquery.js')
];
await Promise
.allSettled(promises)
.finally(() => {
  // do something
})
```

Điều này có thể khá hữu ích khi bạn muốn làm điều gì đó trước khi thực hiện một số action, ví dụ, lấy tất cả các data cần thiết trước khi người dùng nhìn thấy trang danh sách. Nhưng người dùng cũng có thể thấy các item trống bởi vì action có thể bị lỗi.

Trình duyệt hỗ trợ:

* Chrome: 76
* Firefox: 71
    
###  globalThis

`globalThis` đề cập đến bối cảnh mà bạn đang ở. Nếu bạn đang ở `Browsers`, globalThis sẽ là `this`, nếu bạn ở Node `globalThis` sẽ là global. Do đó bạn không cần phải suy nghĩ về các vấn đề môi trường khác nhau nữa.

```
// worker.js
globalThis === self
// node.js
globalThis === global
// browser.js
globalThis === window
```

Và đây là cách nó hoạt động, nhưng không nên sử dụng nó trong code của bạn nhé.

```
var getGlobal = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
};
```

Trình duyệt hỗ trợ:

* Chrome: 71
* Firefox: 65
* Safari: 12.1
* Node: 12
 
### Tổng kết

Có khá nhiều tính năng mới thú vị trong `ES2020` ngoài những tính năng mình đã chia sẻ còn có `for-in mechanics`, `Optional Chaining`, `Nullish coalescing Operator`. Tuy nhiên, hầu hết một trong số chúng không hỗ trợ đối với các trình duyệt cũ và chúng không ổn định trong mọi môi trường. Vì vậy, bạn nên xem xét những môi trường mà được hỗ trợ tính năng đó.

Cảm ơn mọi người đã đọc chia sẻ của mình nhé!

![](https://images.viblo.asia/1d8bbae6-a209-4f00-9b9a-1ab4fc7c973e.jpg)


Tài liệu tham khảo: https://medium.com/javascript-in-plain-english/new-features-in-es2020-you-should-check-b4974d9d7edc
https://dev.to/carlillo/es2020-features-in-simple-examples-1513