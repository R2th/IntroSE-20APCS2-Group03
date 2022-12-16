![](https://images.viblo.asia/42478efd-584e-40b3-befc-9e49f9110dde.png)

## 1. Giới thiệu
Promise là một tính năng được giới thiệu trong ES6, nhằm thay thế callback function, giúp các đoạn mã bất đồng bộ Javascript được sáng sủa, dễ debug hơn (tránh tình trạng callback hell). Ở bài này chúng ta sẽ cùng tìm hiểu Promise qua các ví dụ

## 2. Cơ bản về Promise

Promise sẽ lưu trữ kết quả trả về của một hàm hay một đoạn mã bất đồng bộ. Thay vì truyền vào một callback function như trong ES5, kết quả trả về của hàm hoặc chức năng sẽ là một Promise.

```js
let promise = readFile("example.txt");
```

Ở đoạn mã trên, hàm readFile là một hàm bất đồng bộ, nó sẽ trả về một Promise, tùy vào kết quả Promise trả về mà chúng ta có thể tiếp tục xử lý dữ liệu.

### Vòng đời của Promise (The Promise Life Cycle)

Khi Promise được khởi tạo và đang chờ kết quả trả về thì nó được coi là đang ở trạng thái chờ (pending state) hay **unsetted**.
Khi quá trình xử lý bất đồng bộ được thực hiện xong xuôi, Promise đang ở trạng thái **setted**, khi Promise được trả về, có 2 khả năng có thể xảy ra:
- Fulfilled: Đoạn mã xử lý bất đồng bộ thành công
- Rejected: Đoạn mã xử lý bất đồng bộ thất bại

Khi Promise được trả về, chúng ta có thể sử dụng method `then()` để xử lý, `then()` gồm 2 tham số, thứ nhất là hàm để xử lý Promise trả về ở trạng thái **Fulfilled**, tham số thứ 2 là để xử lý lỗi khi trạng thái của Promise là **Rejected**

```js
let promise = readFile("example.txt");

promise.then(function(contents) {
 // fulfillment
 console.log(contents);
}, function(err) {
 // rejection
 console.error(err.message);
});

promise.then(function(contents) {
 // fulfillment
 console.log(contents);
});

promise.then(null, function(err) {
 // rejection
 console.error(err.message);
});
```

3 method `then()` ở trên đều xử lý cùng Promise, method thứ nhất `console.log` ra khi thành công hoặc thất bại, method thứ 2 thì chỉ xử lý khi Promise thành công (nó sẽ ko thông báo khi có lỗi), cuối cùng là method thứ 3 chỉ xử lý khi Promise ở trạng thái **Rejected**

Promise cũng còn có method `catch()` dùng để xử lý các Promise ở trạng thái **Rejected**

```js
promise.catch(function(err) {
 // rejection
 console.error(err.message);
});

// Tương tự như
promise.then(null, function(err) {
 // rejection
 console.error(err.message);
});
```

### Tạo các unsettled Promises

Một Promise được tạo bằng cách sử dụng **Promise constructor**, constructor chấp nhận một tham số truyền vào là một function được gọi là `executor`, `executor` lại được truyền vào 2 tham số là 2 function `resolve()` và `reject()`, `resolve()` được gọi khi`executor` xử lý thành công, còn `reject()` sẽ được gọi khi `executor` bị lỗi.

```js
// Node.js example
let fs = require("fs");

function readFile(filename) {
     return new Promise(function(resolve, reject) {
         // trigger the asynchronous operation
         fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {
         // check for errors
         if (err) {
             reject(err);
             return;
         }
         // the read succeeded
         resolve(contents);
     });
 });
}

let promise = readFile("example.txt");
// listen for both fulfillment and rejection
promise.then(function(contents) {
 // fulfillment
 console.log(contents);
}, function(err) {
 // rejection
 console.error(err.message);
});
```

Ở đoạn mã trên, hàm `fs.readFile` được bọc trong Promise, hàm `reject` sẽ được gọi nếu `fs.readFile` trả về lỗi, ngược lại sẽ là `resolve` được gọi. 

Lưu ý rằng đoạn `executor` sẽ được thực thi ngay lập tức khi hàm `readFile()` được gọi, trừ các hàm `resolve()`, `reject()` sẽ được thực thi bất đồng bộ, để rõ hơn chúng ta cùng xem các ví dụ dưới đây:


```js
let promise = new Promise(function(resolve, reject) {
 console.log("Promise");
 resolve();
});

console.log("Hi!");
```

Kết quả:

```
Promise
Hi!
```

```js
let promise = new Promise(function(resolve, reject) {
 console.log("Promise");
 resolve();
});
promise.then(function() {
 console.log("Resolved.");
});
console.log("Hi!");
```

Kết quả:

```
Promise
Hi!
Resolved.
```

### Tạo các Settled Promises

Sử dụng Promise constructor là cách tốt nhất để tạo các promise unsetted (chưa rõ kết quả trả về). Nếu chúng ta muốn quyết định giá trị trả về cho Promise, thì cách đơn giản hơn là sử dụng luôn các hàm `resolve()`, `reject()`.

### Sử dụng Promise.resolve()

```js
let promise = Promise.resolve(42);
promise.then(function(value) {
 console.log(value); // 42
});
```

### Sử dụng Promise.reject()

```js
let promise = Promise.reject(42);
promise.catch(function(value) {
 console.log(value); // 42
});
```

### Xử lý lỗi xảy ra trong `executor`

Nếu một lỗi được throw bên trong một `executor`, có một đoạn `try-catch` được ẩn trong `executor`, lỗi sẽ được `catch` và  truyền vào rejection handler. Ví dụ:

```js
let promise = new Promise(function(resolve, reject) {
 throw new Error("Explosion!");
});

promise.catch(function(error) {
 console.log(error.message); // "Explosion!"
});
```

Đưa đoạn `try-catch` vào, kết quả vẫn như cũ.

```js
let promise = new Promise(function(resolve, reject) {
 try {
     throw new Error("Explosion!");
 } catch (ex) {
     reject(ex);
 }
});

promise.catch(function(error) {
 console.log(error.message); // "Explosion!"
});
```

## 3. Chuỗi Promises (Chaining Promises)

Với phiên bản ES5, các đoạn mã bất đồng bộ phức tạp sẽ gồm nhiều callback function lồng nhau, gây ra hiện tượng **callback hell** làm việc đọc hiểu, debug trở nên khó khăn. Chuỗi Promises trong ES6 sinh ra nhằm khác phục bất lợi trên.

Các method `then()` và `catch()` sẽ tạo ra một Promise và trả về. Promise thứ 2 sẽ được xử lý khi Promise thứ nhất đã trả về fulfilled hoặc rejected.

![](https://images.viblo.asia/467c6061-f9d9-4372-8c23-8fe50883d7c9.jpeg)

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

p1.then(function(value) {
     console.log(value);
}).then(function() {
     console.log("Finished");
});
```

Kết quả:

```
42
Finished
```


```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

let p2 = p1.then(function(value) {
 console.log(value);
})

p2.then(function() {
 console.log("Finished");
});
```

Kết quả tương tự
```
42
Finished
```

Promise trả về từ `p1.then()` được lưu trong `p1`, nếu `p2.then()` trả về một Promise thành công (fulfillment) thì sẽ `console.log` ra `Finished`.

### Bắt lỗi

Chuỗi Promises gồm các method `catch()` sẽ bắt lỗi của Promise được trả về từ  từ hàm trước đó trong chuỗi.

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
     throw new Error("Boom!");
}).catch(function(error) {
     console.log(error.message); // "Boom!"
});
```

```js
let p1 = new Promise(function(resolve, reject) {
     throw new Error("Explosion!");
});

p1.catch(function(error) {
     console.log(error.message); // "Explosion!"
     throw new Error("Boom!");
}).catch(function(error) {
     console.log(error.message); // "Boom!"
});
```

### Trả về các giá trị trong Promise Chains

Ngoài cách truyền giá trị trả về của Promise bằng hàm `resolve()`, chúng ta còn có thể sử dụng `return`. 

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

p1.then(function(value) {
 console.log(value); // "42"
 return value + 1;
}).then(function(value) {
 console.log(value); // "43"
});
```

```js
let p1 = new Promise(function(resolve, reject) {
 reject(42);
});

p1.catch(function(value) {
 // first fulfillment handler
 console.log(value); // "42"
 return value + 1;
}).then(function(value) {
 // second fulfillment handler
 console.log(value); // "43"
});
```

### Trả về các Promise trong Promise Chains

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
 resolve(43);
});
p1.then(function(value) {
 // first fulfillment handler
 console.log(value); // 42
 return p2;
}).then(function(value) {
 // second fulfillment handler
 console.log(value); // 43
});
```

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
 resolve(43);
});
let p3 = p1.then(function(value) {
 // first fulfillment handler
 console.log(value); // 42
 return p2;
});
p3.then(function(value) {
 // second fulfillment handler
 console.log(value); // 43
});
```

### Xử lý nhiều Promises cùng một lúc

#### Promise.all()

`Promise.all()`  nhận vào một đối số (thường là một mảng các Promises). Trạng thái Promise là fulfilled nếu tất cả các Promises đều fulfilled, nếu không `Promise.all()` sẽ trả về ở trạng thái reject.

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
 resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
 resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);
p4.then(function(value) {
 console.log(Array.isArray(value)); // true
 console.log(value[0]); // 42
 console.log(value[1]); // 43
 console.log(value[2]); // 44
});
```


```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
 reject(43);
});

let p3 = new Promise(function(resolve, reject) {
 resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.catch(function(value) {
 console.log(Array.isArray(value)) // false
 console.log(value); // 43
});
```

Ở đoạn mã trên, Promise p2 ở trạng thái reject, dẫn đến p4 với `Promise.all()` return lỗi.

####  Promise.race()

Khác với `Promises.all()` sẽ thực thi và chờ kết quả của tất cả Promises, `Promise.race()` sẽ xử lý Promise đầu tiên có kết quả trả về.

```js
let p1 = Promise.resolve(42);
let p2 = new Promise(function(resolve, reject) {
 resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
 resolve(44);
});

let p4 = Promise.race([p1, p2, p3]);
p4.then(function(value) {
 console.log(value); // 42
});
```

Promise p1 được resolve đầu tiên nên value mà Promise return về là 42.

```js
let p1 = new Promise(function(resolve, reject) {
 resolve(42);
});
let p2 = Promise.reject(43);

let p3 = new Promise(function(resolve, reject) {
 resolve(44);
});

let p4 = Promise.race([p1, p2, p3]);
p4.catch(function(value) {
 console.log(value); // 43
});
```

## 4. Kế thừa Promise
Chúng ta có thể tạo ra một class riêng kế thừa class Promise mặc định của Javascript, ví dụ dưới đây chúng ta tạo ra class MyPromise, định nghĩa 2 hàm `success` và `failure` để xử lý kết quả trả về.

```js
class MyPromise extends Promise {
   // use default constructor
   success(resolve, reject) {
   return this.then(resolve, reject);
 }
 
 failure(reject) {
 return this.catch(reject);
 }
}

let promise = new MyPromise(function(resolve, reject) {
 resolve(42);
});

promise.success(function(value) {
 console.log(value); // 42
}).failure(function(value) {
 console.log(value);
});
```


## Tài liệu tham khảo

[Chapter11-Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers](https://www.amazon.com/Understanding-ECMAScript-Definitive-JavaScript-Developers/dp/1593277571)