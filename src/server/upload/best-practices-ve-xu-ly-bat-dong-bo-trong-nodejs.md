# Classical Approach - Callbacks
Để ví dụ thì mình sẽ giả lập function bất đồng bộ bằng cách tạo timer gọi đến function sau khi kết thúc bộ đếm của timer. 
```js
function fastFunction (done) {
  setTimeout(function () {
    done()
  }, 100)
}

function slowFunction (done) {
  setTimeout(function () {
    done()
  }, 300)
}
```

Trường hợp muốn thực hiện các function theo thứ tự trước sau thì có thể sử dụng tới phương pháp lồng hay **nesting callbacks**. Tuy nhiên mình không khuyến khích sử dụng cách này vì sẽ dẫn tới **callback-hell**
```js
function runSequentially (callback) {
  fastFunction((err, data) => {
    if (err) return callback(err)
    console.log(data)   // results of fastFunction
  
    slowFunction((err, data) => {
      if (err) return callback(err)
      console.log(data) // results of slowFunction
  
      // here you can continue running more tasks
    })
  })
}
```

# Avoid Callback Hell
## 1. Promises
Để tránh callback-hell thì có thể viết lại như dưới bằng cách sử dụng **promise**
```js
function fastFunction () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('Fast function done')
      resolve()
    }, 100)
  })
}

function slowFunction () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('Slow function done')
      resolve()
    }, 300)
  })
}

function asyncRunner () {
    return Promise.all([slowFunction(), fastFunction()])
}
```

Lưu ý rằng `Promise.all` sẽ thất bại ngay khi bất kỳ `promise` nào bên trong bị thất bại. Vậy nên cần phải điều chỉnh lại cho function `asyncRunner` cũng trả về 1 promise, từ đó sử dụng `.then` và `.catch` để xứ lý kết quả trả về hoặc lỗi.
```js
asyncRunner()
  .then(([ slowResult, fastResult ]) => {
    console.log('All operations resolved successfully')
  })
  .catch((error) => {
    console.error('There has been an error:', error)
  })
```

Phương thức `promise.allSettled` cho phép lấy hết tất cả giá trị trả về của các promise ngay cả khi 1 trong số những project đó bị failed. Phương thức này sẽ nhận vào 1 mảng các promises truyền vào sau đó trả về 1 mảng các objects với **status** **"fulfilled"** hoặc **"rejected"**; kèm theo giá trị được resolved hoặc error gặp phải.
```js
function failingFunction() {
  return new Promise((resolve, reject) => {
    reject(new Error('This operation will surely fail!'))
  })
}

function asyncMixedRunner () {
    return Promise.allSettled([slowFunction(), failingFunction()])
}

asyncMixedRunner()
    .then(([slowResult, failedResult]) => {
        console.log(slowResult, failedResult)
    })
```

Có thể hiểu cách implement phương thức `promise.allSettled` như function dưới đây
```js
function allSettled(promises) {
  return Promise.all(promises.map((promise) => {
    return promise
      .then((value) => {
        return { status: 'fulfilled', value }
      })
      .catch((error) => {
        return { status: 'rejected', error }
      })
  }))
}
```

### Serial task execution
Để đảm bảo các tasks được thực hiện theo trật tự cố định (A -> B -> C), chẳng hạn function C cần kết quả của function B và function B cần kết quả từ function A, thì mình sẽ chain các function bất đồng bộ lại.
```js
function serial(asyncFunctions) {
    return asyncFunctions.reduce(function(functionChain, nextFunction) {
        return functionChain.then(
            (previousResult) => nextFunction(previousResult)
        );
    }, Promise.resolve());
}

serial([parameterValidation, dbQuery, serviceCall ])
   .then((result) => console.log(`Operation result: ${result}`))
   .catch((error) => console.log(`There has been an error: ${error}`))
```

Trong trường hợp thất bại, điều này sẽ bỏ qua tất cả các promises còn lại và chuyển thẳng đến phần catch lỗi. Bạn có thể điều chỉnh để nhận kết quả của tất cả các promises bất kể resolved hay rejected.
```js
function serial(asyncFunctions) {
    return asyncFunctions.map(function(functionChain, nextFunction) {
        return functionChain
            .then((previousResult) => nextFunction(previousResult))
            .then(result => ({ status: 'fulfilled', result }))
            .catch(error => ({ status: 'rejected', error }));
    }, Promise.resolve());
}
```

## 2. async - await
```js
const promisify = require('util').promisify;

async function asyncRunner () {
    try {
      const slowResult = await promisify(slowFunction)()
      const fastResult = await promisify(fastFunction)()
      console.log('all done')
      return [
        slowResult,
        fastResult
      ]
    } catch (error) {
      console.error(error)
    }
}
```

# In practice
Dưới đây là ví dụ về route handler cho web-app được xử lý theo 3 cách
```js
// CALLBACK (not suggested)
function handler (done) {
  validateParams((err) => {
    if (err) return done(err)
    dbQuery((err, dbResults) => {
      if (err) return done(err)
      serviceCall((err, serviceResults) => {
        done(err, { dbResults, serviceResults })
      })
    })
  })
}
```

```js
// PROMISES
function handler () {
  return validateParams()
    .then(dbQuery)
    .then(serviceCall)
    .then((result) => {
      console.log(result)
      return result
    })
    .catch(console.log.bind(console))
}
```

```js
// ASYNC - AWAIT
async function handler () {
  try {
    await validateParams()
    const dbResults = await dbQuery()
    const serviceResults = await serviceCall()
    return { dbResults, serviceResults }
  } catch (error) {
    console.log(error)
  }
}
```