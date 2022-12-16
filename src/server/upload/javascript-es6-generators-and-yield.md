### Yield, generator và next()
`Yield` là một từ khóa đặc biệt. Nó không chỉ cho phép chúng ta tạm dừng quá trình thực thi của function mà còn `emits` một giá trị cho đối tượng (hoặc ngữ cảnh) gọi nó. Chúng ta sẽ xem xet một ví dụ sau:
```javascript
function* doSomething() {
  yield 'hello';
  var lastInput = yield 'world';
  console.log(lastInput);
}
```
Chú ý, từ khóa yield phải được sử dụng trong khai báo `function*` (đây chính là một `Generator`) nhé, các bạn chú ý điểm này :D 

Chúng ta sẽ sử dụng `function*` trên như sau:
```javascript
const s = doSomething()
console.log(s.next().value) // hello
```

Khi chúng ta gọi `s.next().value` chúng ta sẽ thu được giá trị `hello`, chính là giá trị của `yield 'hello'` và function sẽ tạm thời dừng thực thi cho đến khi chúng ta gọi `s.next()` lần tiếp theo

```javascript
console.log(s.next().value) // world
```

Khi chúng ta gọi `s.next()`, chúng ta sẽ thu được một object gồm 2 thuộc tính là `value` và `done`, ví dụ
```javascript
function* doSomething() {
  yield 'hello'
  var lastInput = yield 'world'
  console.log(lastInput) // undefined
}

const s = doSomething()
console.log(s.next()) // { value: hello, done: false }
console.log(s.next()) // { value: world, done: false }
console.log(s.next()) // { done: true }
```

Với ví dụ trên, các bạn thấy cách dùng `function*` và `yield` cũng khá đơn giản ko? :D

Một trường hợp khác chúng ta cũng có thể sử dụng `yeild` với nhiều giá trị. Ví dụ
```javascript
function* doSomething() {
  yield* ['hello', 'world']
}

var s = doSomething()

console.log(s.next().value) // hello
console.log(gen.next().value) // world
```

Chúng ta sẽ tiếp tục một ví dụ khá thú vị sau
```javascript
function* generatorFoo() {
  yield 1
  yield 2
}

function* generatorBar() {
  yield generatorFoo();
  yield 'The end.';
}

var s = generatorBar()
console.log(s.next().value) // 1
console.log(s.next().value) // 2
console.log(s.next().value) // The end.
```

Như vậy chúng ta có thể thấy `yield` sẽ tuần tự được gọi khi function được lồng vào nhau.
Ngoài ra chúng ta có thể sử dụng `yield` cho vòng lặp, ví dụ
```javascript
function* greet() {
  yield 'hello'
  yield 'world'
}

for (let message of greet()) {
  console.log(message)
}
// hello
// world
```

Tiếp theo chúng ta sẽ xem xét trường hợp sử dụng `return` trong `function* (generator)`. 

### Sử dụng return trong generator
Giá trị của return trong `function*` sẽ không có tác dụng. Ví dụ
```javascript
function* greet() {
  yield 'hello'
  yield 'world'
  return 1
}
console.log(greet()) // {} 
for (let message of greet()) {
  console.log(message)
}
// hello
// world
```

Để lấy được giá trị return trong `function*`, chúng ta phải sử dụng `yield`
```javascript
function* greet1() {
  yield 'hello'
  yield 'world'
  return 1
}

function* greet2() {
  var returnValue = yield* greet1()
  console.log(returnValue) 
}

for (let message of greet2()) {
  console.log(message);
}
// hello
// world
// 1
```

### Tham số trong generator
Giả sử chúng ta có một function như sau
```javascript
function* player(name) {
  console.log('name received') // (A)
  var life = 1000
  yield 'Hello ' + name // (B)
  yield 'You have a life of a ' + life + ' years' // (C)
}

var p = player('Tuan')
```

Khi chúng ta khai báo `player('Tuan')`, function đã nhận được tham số `name` nhưng câu lệnh (A) chưa được thực thi cho đến khí chúng ta gọi next()
```javascript
console.log(p.next().value)
// name received 
// Hello Tuan
```
Generator sẽ tạm dừng thực đến hết dòng lệnh (B) và chờ lời gọi next() tiếp theo.
```javascript
console.log(p.next().value) // You have a life of a 1000 years
```

Dòng lệnh (C) đã được thực thi, nếu chúng ta tiếp tục gọi next(), chúng ta sẽ thu được `undefined` vì chúng ta đã thực hiện hết các `yield`
```javascript
console.log(p.next().value) // undefined
```

Một chú ý cuối cùng là `yield` phải được khai báo và sử dụng trong phạm vi của `function*`. Như ví dụ sau, `yield` sẽ bị báo lỗi về cú pháp
```javascript
function* generatorFoo() {
  [1, 2].forEach(function (item) {
    yield item // error
  })
}
```

Hy vọng với bài viết này, các bạn sẽ hiểu rõ hơn về `Generator` và `Yield` trong JavaScript ES6.

#### Cảm ơn mọi người đã đọc bài viết. Happy coding!!!