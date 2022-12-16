##### Chào anh em :grinning: , `Promise` có thể nhiều anh em đang sử dụng nó hằng ngày, hằng giờ nhưng thực chất vẫn chưa hiểu hết về nó. Vì vậy hôm này cùng mình tìm hiểu kĩ hơn về thằng này nhé. Bắt đầu :100:

# Chuẩn bị

#### Một vài kiến thức cần biết:
- Javascript

#### Môi trường sẽ demo:
-  Bất kì `Editor code` nào, kể cả online :D

#### Bỏ qua
- Các lý thuyết cụ thể về [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 

#  Promise, nó là cái gì ?
JavaScript là một ngôn ngữ lập trình `đồng bộ` (đơn luồng), có nghĩa là chỉ một điều gì đó có thể xảy ra tại một thời điểm, `JavaScript engine` chỉ có thể xử lý một câu lệnh tại một thời điểm trong một luồng.
<br>
`Promise` được sinh ra như một đối tượng đặc biệt dùng cho các xử lý `bất đồng bộ`. Nó đại diện cho một xử lý bất đồng bộ và chứa kết quả cũng như lỗi xảy ra từ xử lý bất đồng bộ đó.

## Trạng thái
Tại mỗi thời điểm Promise sẽ có 1 trạng thái nhất đinh
- `pending`
- `fulfilled`
- `rejected`

## Prototype
#### Properties
- `constructor(callback)`

#### Methods
- `then(onFulfilled[, onRejected])`
- `catch(onRejected)`
- `finally(onFinally)`

## Static methods
- `Promise.resolve(value)`: Trả về một promise resolved (hoàn thành) với một giá trị cụ thể.
- `Promise.reject(reason)`: Trả về một promise rejected (lỗi) với một lỗi cụ thể.
- `Promise.all(iterable of multiple promises)`
  - Nhận vào một mảng các promise hoặc cũng có thể là non-promise (number, boolean, .etc).
  - Trả về một promise mới.
  - Chờ tất cả các promise trong mảng resolved, kết quả của promise mới này là một mảng chứa kết quả của các promise theo đúng thứ tự.
  - 1 promise bất kì rejected, kết quả của promise mới này được trả về ngay lập tức lỗi của promise rejected đó, các promise khác vẫn tiếp tục thực thi nhưng kết quả bị bỏ qua.
  - Thực thi promise dạng parallel.
- `Promise.race(iterable of multiple promises)`: 
  - Nhận vào một mảng các promise hoặc cũng có thể là non-promise (number, boolean, .etc).
  - Trả về một promise mới.
  - Kết quả của promise mới là kết quả của promise bất kì đầu tiên resolved hoặc rejected.
- `Promise.allSetted(iterable of multiple promises)`: 
  - Nhận vào một mảng các promise hoặc cũng có thể là non-promise (number, boolean, .etc).
  - Trả về một promise mới.
  - Chờ cho tất cả các promise được xử lý, kết quả trả về là mảng chứa các object chứa trạng thái và giá trị của promise kể cả resolved hay rejected.
  - `Một vài trình duyệt với phiên bản mới gần đây đã hỗ trợ`
- `Promise.any(iterable of multiple promises)`: `experimental`

## Mô phỏng về promise
 Promise là 1 `constructor function` (es5) hay cũng có thể gọi nó là 1 `class` (es6)
 <br>
 Mình sẽ mô phỏng nó bằng es6
 ```js
 class MyPromise {
  constructor(callback) {
    console.log("prototype method constructor")
  }
  
  then(onFulfilled) {
    console.log("prototype method then")
    return this
  }

  catch(onRejected) {
    console.log("prototype method catch")
    return this
  }

  finally(onFinally) {
    console.log("prototype method finally")
  }

  static resolve(value) {
    console.log('static method resolve', value)
  }

  static all(array) {
    console.log('static method all', array)
  }
}

MyPromise.propertyX = "property"

const instance = new MyPromise()

// prototype property
console.log(instance.constructor)
// prototype method
instance.then().catch().finally()

// static property
console.log(MyPromise.propertyX)
// static method
MyPromise.resolve('xxx')
MyPromise.all(['yyy', 'zzz'])

// OUTPUT
// prototype method constructor
// { [Function: MyPromise] propertyX: 'property' }
// prototype method then
// prototype method catch
// prototype method finally
// property
// static method resolve xxx
// static method all [ 'yyy', 'zzz' ]
 ```
 dĩ nhiên đây chỉ là mô phỏng thôi, còn thực thế thì xử lý bên trong của nó cồng kềnh hơn nhiều.
 
## Sử dụng thực tế
#### Cách sử dụng cơ bản nhất
```js
const p1 = new Promise((resolve, reject) => {
  resolve('xxx success')
})

const p2 = new Promise((resolve, reject) => {
  reject('yyy error')
})

p1.then(success => {
  console.log(success)
})

p2.catch(error => {
  console.log(error)
})

p1
.then(success => {
  console.log(success)
})
.catch(error => {
  console.log(error)
})
.finally(() => {
  console.log('finally')
})

// xxx success
// yyy error
// xxx success
// finally
```
 
#### all, race, allSetted
- `all`
```js
const p1 = Promise.resolve(100)
const p2 = Promise.resolve(true)
const p3 = Promise.reject('error')
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p4")
  }, 2000)
})

Promise.all([p1,p2,p4])
  .then(data => {
    console.log('p1,p2,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p4', err)
  })

Promise.all([p1,p2,p3,p4])
  .then(data => {
    console.log('p1,p2,p3,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p3,p4', err)
  })
  
// p1,p2,p3,p4 error
// p1,p2,p4 [ 100, true, 'p4' ]
 ```
 Tất nhiên là khi có lỗi thì ngay lập tức promise chuyển sang trạng thái `rejected` và cũng như trả về luôn kết quả, nhưng hãy nhớ là các promise khác vẫn được thực hiện nhưng kết quả bị bỏ qua.
 
 - `race`
```js
const p1 = Promise.resolve(100)
const p2 = Promise.resolve(true)
const p3 = Promise.reject('error')
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p4")
  }, 2000)
})

Promise.race([p1,p2,p4])
  .then(data => {
    console.log('p1,p2,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p4', err)
  })

Promise.race([p1,p2,p3,p4])
  .then(data => {
    console.log('p1,p2,p3,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p3,p4', err)
  })
  
// p1,p2,p4 100
// p1,p2,p3,p4 100
```
Tất nhiên là promise đầu tiên thành công thì sẽ trả về kết quả ngay lập tức.

- `allSettled`
```js
const p1 = Promise.resolve(100)
const p2 = Promise.resolve(true)
const p3 = Promise.reject('error')
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p4")
  }, 2000)
})

Promise.allSettled([p1,p2,p4])
  .then(data => {
    console.log('p1,p2,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p4', err)
  })

Promise.allSettled([p1,p2,p3,p4])
  .then(data => {
    console.log('p1,p2,p3,p4', data)
  })
  .catch(err => {
    console.log('p1,p2,p3,p4', err)
  })
  
// "p1,p2,p4" Array [Object { status: "fulfilled", value: 100 }, Object { status: "fulfilled", value: true }, Object { status: "fulfilled", value: "p4" }]
// "p1,p2,p3,p4" Array [Object { status: "fulfilled", value: 100 }, Object { status: "fulfilled", value: true }, Object { status: "rejected", reason: "error" }, Object { status: "fulfilled", value: "p4" }
```

####  Chaining promises
-  Đơn giản
```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 1')
  })
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 2')
  })
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 3')
  })
})

p1.then((data) => {
  console.log(data)
  return p2
})
.then((data) => {
  console.log(data)
  return p3
})
.then((data) => {
  console.log(data)
})

// Promise 1
// Promise 2
// Promise 3
```

- Hàm trả về promise
```js
const p1 = data => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 1')
    resolve(data)
  })
})

const p2 = data => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 2')
    resolve(data)
  })
})

const p3 = data => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 3')
    resolve(data)
  })
})

p1(1).then((data) => {
  console.log(data)
  return p2(data + 1)
})
.then((data) => {
  console.log(data)
  return p3(data + 1)
})
.then((data) => {
  console.log(data)
})

// Promise 1
// 1
// Promise 2
// 2
// Promise 3
// 3
```

## Một vài lưu ý
#### Catch error và callback error của then
Callback lỗi không bắt được lỗi khi khối promise resolved và trong callback của then có `throw Error`
```js
const resolvePromise = new Promise((resolve, reject) => {
  resolve('OK')
})

const rejectPromise = new Promise((resolve, reject) => {
  reject('Error')
})

rejectPromise
.then(() => {
  throw new Error('Oh no')
})
.catch(err => {
  console.log('rejectPromise, Catch lỗi', err)
})

rejectPromise
.then(() => {
  throw new Error('Oh no')
}, err => {
  console.log('rejectPromise, Callback lỗi', err)
})

resolvePromise
.then(() => {
  throw new Error('Oh no')
})
.catch(err => {
  console.log('resolvePromise, Catch lỗi', err)
})

resolvePromise
.then(() => {
  throw new Error('Oh no')
}, err => {
  console.log('resolvePromise, Callback lỗi', err)
})

// rejectPromise, Callback lỗi Error
// rejectPromise, Catch lỗi Error
// resolvePromise, Catch lỗi Error: Oh no
```

#### return và không return trong callback của then (khi sử dụng tính chất chaining promises)
- Có return
```js
const promise = new Promise((resolve, reject) => {
  resolve(100)
})

promise.then(data1 => {
  console.log("ok 1", data1)
  return data1 * 2
})
.then(data2 => {
  console.log("ok 2", data2)
})
.catch(err => {
  console.log('error', err)
})
.finally(() => {
  console.log('done')
})

// ok 1 100
// ok 2 200
// done
```

- Không return
```js
const promise = new Promise((resolve, reject) => {
  resolve(100)
})

promise.then(data1 => {
  console.log("ok 1", data1)
})
.then(data2 => {
  console.log("ok 2", data2)
})
.catch(err => {
  console.log('error', err)
})
.finally(() => {
  console.log('done')
})

// ok 1 100
// ok 2 undefined
// done
```

#### Micro-Task Queue (ES8 term)
Khi 1 promise đã sẵn sàng, `.then/catch/finally` của nó được đẩy vào `queue`, chúng chưa được thực hiện ngay. Khi `JavaScript engine` đã hoàn thành code hiện tại (hoàn thành các task synchronous), nó lấy các task từ `queue` và thực thi nó.
(Để hiểu kĩ hơn về cách `JavaScript engine` hoạt động như thế nào thì phần này bạn phải tìm hiểu thêm về `event loop` nhé)

```js
console.log('start')

setTimeout(() => {
  console.log('setTimeout done')
}, 0)

const promise1 = Promise.resolve()
const promise2 = Promise.reject()

promise1
  .then(() => {
    console.log('promise1 then 1 ok')
  })
  .then(() => {
    console.log('promise1 then 2 ok')
  })
  .catch(() => {
    console.log('catch 1')
  })

promise2
  .then(() => {
    console.log('promise2 then 1 ok')
  })
  .then(() => {
    console.log('promise2 then 2 ok')
  })
  .catch(() => {
    console.log('catch 2')
  })

console.log('stop')

// start
// stop
// promise1 then 1 ok
// promise1 then 2 ok
// catch 2
// setTimeout done
```

Các bạn thấy đó, sau task các log đồng bộ thì sẽ đến các log của `promise` sau đó mới đến `setTimeout` dù chỉ set là `0ms`, bởi vì độ ưu tiên của `Micro-Task Queue` cao hơn `Message Queue` nên promise sẽ được thực thi trước callback bên trong `setTimeout`

Thứ tự xử lý `callback` của `then/catch/finally` trong queue
```js
const promise1 = Promise.reject()
const promise2 = Promise.resolve()
const promise3 = Promise.resolve()

promise1
  .then(() => {
    console.log('promise1 then')
  })
  .catch(() => {
    console.log('promise1 catch')
  })
  .finally(() => {
    console.log('promise1 finally')
  })

promise2
  .then(() => {
    console.log('promise2 then')
  })
  .catch(() => {
    console.log('promise2 catch')
  })
  .finally(() => {
    console.log('promise2 finally')
  })

promise3
  .then(() => {
    console.log('promise3 then')
  })
  .catch(() => {
    console.log('promise3 catch')
  })
  .finally(() => {
    console.log('promise3 finally')
  })


// promise2 then
// promise3 then
// promise1 catch
// promise1 finally
// promise2 finally
// promise3 finally
```

# Tổng kết
Anh em thấy đấy `promise in javascript` phức tạp hơn những gì chúng ta nghĩ.
<br>
Qua bài viết này hi vọng sẽ giúp ích phần nào đó cho anh em.
<br>
Cảm ơn anh em đã đọc bài viết này. Chúc anh em thành công nhé :+1: .