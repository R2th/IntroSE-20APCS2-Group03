![](https://images.viblo.asia/4906fe8c-a765-4ac2-a5d0-6330036f9414.png)




**Xin chào quý vị rất thân ái!**


Chào mừng quý vị đến với bài viết tiếp theo của em sau chuỗi em đang chìm đắm trong dự án và chủ đề của lần gặp gỡ này sẽ là "Các điều thú vị sắp tới của JavaScript ES2021 (ES12)".

ES2021 (ES12) sẽ ra mắt trong giữa năm 2021. Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu 4 features thú vị gồm: String.prototype.replaceAll(), numeric separators, logical assignment operators, Promise.any().

Chúng ta cùng xem cách mà chúng hoạt động thôi!

## String.prototype.replaceAll()

Phương thức này hoạt động cũng giống như replace chúng ta thường dùng. Sự khác biệt là `replaceAll()` sẽ replace tất cả các lần xuất hiện của đối tượng trong string mà không cần dùng đến vòng lặp.

`replaceAll()` cũng có thể nhận vào một regex.

> * Bạn có thể đọc thêm về tính năng này ở đây: https://github.com/tc39/proposal-string-replaceall
```
// Declare a string:
let str = 'There are those who like cats, there those who like watching cats and there are those who have cats.'

// Replace all occurrences of "cats" with dogs:
str = str.replaceAll('cats', 'dogs')

// Log the new value of "str":
console.log(str)
// Output:
// 'There are those who like dogs, there those who like watching dogs and there are those who have dogs.'


// A simple alternative with replace():
str = str.replace(/cats/g, 'dogs')

// Log the new value of "str":
console.log(str)
// Output:
// 'There are those who like dogs, there those who like watching dogs and there are those have dogs.'
```

## Numeric separators
Một tính năng nhỏ tiếp theo đó nữa là Numeric separators. Khi chúng ta là việc với các dãy số dài, chúng ta khó xác định được giá trị của dãy số và số hạng của từng số. Numeric separators giúp chúng ta dễ nhìn hơn.
Cú pháp là dấu gạch dưới đơn giản (_)
```
// Number without numeric separators:
const num = 3685134689


// Number with numeric separators:
const num = 3_685_134_689
```

Chú ý: Numeric separators chỉ giúp chúng ta dễ nhìn, chứ không làm ảnh hưởng tới giá trị của biến.
```
// Use numeric separators with a number:
const num = 3_685_134_689

// Log the value of "num":
console.log(num)
// Output:
// 3685134689
```

## Logical assignment operators
ES2021 sẽ cho phép chúng ta kết hợp các toán tử logic như (&& || ...) với biểu thức gán bằng (=).

Trước đây chúng ta đã sử dụng kết hợp các phép toán tử với phép gán bằng. Ví dụ: phép cộng (+ =), phép trừ (- =), phép nhân (* =), v.v. Nhờ ES2021, chúng ta có thể sử dụng các toán tử logic (&&, || và ?? ) với phép gán bằng (=)

```
//
// AND AND equals (&&=)
x &&= y

// Is equivalent to:
x = x && d

// Or:
if (x) {
  x = y
}

// Example 1:
let x = 3 // Truthy value.
let y = 0 // Falsy value.
x &&= y

// Log the value of "x":
console.log(x)
// Output:
// 0

// Example 2:
let x = 0 // Falsy value.
let y = 9 // Truthy value.
x &&= y

// Log the value of "x":
console.log(x)
// Output:
// 0

// Example 3:
let x = 3 // Truthy value.
let y = 15 // Truthy value.
x &&= y

// Log the value of "x":
console.log(x)
// Output:
// 15


//
// OR OR equals (||=):
x ||= y

// Is equivalent to:
x = x || y

// Or:
if (!x) {
  x = y
}

// Example 1:
let x = 3 // Truthy value.
let y = 0 // Falsy value.
x ||= y

// Log the value of "x":
console.log(x)
// Output:
// 3

// Example 2:
let x = 0 // Falsy value.
let y = 9 // Truthy value.
x ||= y

// Log the value of "x":
console.log(x)
// Output:
// 9

// Example 3:
let x = 3 // Truthy value.
let y = 15 // Truthy value.
x ||= y

// Log the value of "x":
console.log(x)
// Output:
// 3


//
// Nullish coalescing (??):
x ??= y

// Is equivalent to:
x = x ?? y

// Or:
if (x == null || x == undefined) {
    x = y
}

// Example 1:
let x = null // Null value.
let y = 'Hello' // Non-null value.
x ??= y

// Log the value of "x":
console.log(x)
// Output:
// 'Hello'

// Example 2:
let x = 'Jay' // Non-null value.
let y = 'Hello' // Non-null value.
x ??= y

// Log the value of "x":
console.log(x)
// Output:
// 'Jay'

// Example 3:
let x = 'Jay' // Non-null value.
let y = null // Null value.
x ??= y

// Log the value of "x":
console.log(x)
// Output:
// 'Jay'

// Example 4:
let x = undefined // Non-null value.
let y = 'Jock' // Null value.
x ??= y

// Log the value of "x":
console.log(x)
// Output:
// 'Jock'
```

Hãy cùng xem một số ví dụ trên. Đầu tiên, `x && = y`. Điều này sẽ gán y cho x nếu x là truthy. Nếu không, nó sẽ gán y. Thứ hai, `x || = y.` Điều này sẽ chỉ gán y cho x khi x là một giá trị falsy. Nếu x là truthy và y là falsy, việc gán sẽ không xảy ra.

## Promise.any()

ES6 đã giới thiệu các phương thức `Promise.race()` và `Promise.all()`. Sau đó, ES2020 mang đến `Promise.allSettled()`. ES2021 mang đến một phương thức khác có thể làm cho việc làm việc với các Promise trở nên dễ dàng hơn, phương thức `Promise.any()`.

Phương thức `Promise.any()` nhận nhiều Promise và trả về một Promise nếu bất kỳ Promise nào được thực hiện. Promise đầu tiên được thực hiện là promise được trả về bởi `Promise.any()`. Nếu tất cả các Promise bạn cung cấp đều reject, `Promise.any()` sẽ trả về AggregateError và message errors.
```
// Example 1: All resolve:
// Create promises:
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1 is resolved.')
  }, Math.floor(Math.random() * 1000))
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2 is resolved.')
  }, Math.floor(Math.random() * 1000))
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise3 is resolved.')
  }, Math.floor(Math.random() * 1000))
})

;(async function() {
  // Await the result of Promise.any():
  const result = await Promise.any([promise1, promise2, promise3])

  // Log the value returned by Promise.any():
  console.log(result)
  // Output:
  // 'promise1 is resolved.', 'promise2 is resolved.' or 'promise3 is resolved.'
})()


// Example 2: Some resolve:
// Create promises:
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1 is resolved.')
  }, Math.floor(Math.random() * 1000))
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise2 was rejected.')
  }, Math.floor(Math.random() * 1000))
})

;(async function() {
  // Await the result of Promise.any():
  const result = await Promise.any([promise1, promise2])

  // Log the value returned by Promise.any():
  console.log(result)
  // Output:
  // 'promise1 is resolved.'
})()


// Example 3: None resolves:
// Create promises:
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise1 was rejected.')
  }, Math.floor(Math.random() * 1000))
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise2 was rejected.')
  }, Math.floor(Math.random() * 1000))
})

;(async function() {
  // Use try...catch to catch the AggregateError:
  try {
    // Await the result of Promise.any():
    const result = await Promise.any([promise1, promise2])
  }

  catch (err) {
    console.log(err.errors)
    // Output:
    // [ 'promise1 was rejected.', 'promise2 was rejected.' ]
  }
})()
```

## Conclusion

ES2021 (ES12) có vẻ thay đổi nhỏ hơn so với các version trước đây của JavaScript, chẳng hạn như ES6 và ES2020. Tuy nhiên, có một số tính năng thú vị đáng được quan tâm.

Đêm cũng đã khuya, thôi thì xin hẹn quý vị ở các dịp hội ngộ lần sau. Xin hẹn gặp lại!

Tham khảo: https://alimammiya.hashnode.dev/upcoming-interesting-javascript-es2021-es12-features-to-look-for-1