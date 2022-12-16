Chào các bạn! Tuy javascript ES6 đã được giới thiệu cách đây khá lâu, nhưng mình cũng chưa thực sự hiểu và sử dụng thành thạo những tính năng được giới thiệu. Gần đây mình có tìm hiểu và sử dụng một tính năng mà mình cho khá hay và hữu ích khi chúng ta làm việc với array hoặc object literial, đó là Destructuring. Trong bài viết này mình sẽ giới thiệu về destructuring và những trường hợp cần sử dụng nó.
## Destructuring
Destructuring là một tính năng dễ, đơn giản và mình hay sử dụng nhất. Một điều tuyệt với là tính năng này làm việc với cả array và object trong javascript.

```
// Destructuring dùng với object literial
var foo = { bar: 'pony', baz: 3 }
var {bar, baz} = foo
console.log(bar)
// <- 'pony'
console.log(baz)
// <- 3
```
```
// Destructuring dùng với array
let [a, b] = [1, 2]
console.log(a)
// <- 1
console.log(b)
// <- 2
```
Destructuring cho phép chúng ta lấy ra một property cụ thể một cách rất nhanh chóng.
```
var foo = { bar: 'pony', baz: 3, fod: 'trump' }
var {bar, baz} = foo
console.log(bar)
// <- 'pony'
console.log(baz)
// <- 3
```
Ngoài ra chúng ta cũng có thể đặt tên khác cho biến của chúng ta bằng cú pháp.
```
var foo = { bar: 'pony', baz: 3, foo: 'trump' }
var {bar: a, baz: b} = foo
console.log(a)
// <- 'pony'
console.log(b)
// <- 3
```
Chúng  cũng có thể lấy các thuộc tính sâu bên trong một object và cũng có thể đặt tên cho các property sâu bên trong đó.
```
var foo = { bar: { deep: 'pony', dangerouslySetInnerHTML: 'lol' } }
var {bar: { deep, dangerouslySetInnerHTML: sure }} = foo
console.log(deep)
// <- 'pony'
console.log(sure)
// <- 'lol'
```
Mặc định nếu property không tìm thấy trong object thì sẽ có giá trị undefined, giống như khi chúng ta cố gắng lấy giá trị của một property không có trong object.
```
var {foo} = {bar: 'baz'}
console.log(foo)
// <- undefined
```
Nếu chúng ta cố gắng lấy giá trị của một property sâu bên trong mà không tồn tại trong object thí một exception sẽ được throw.
```
var {foo:{bar}} = {baz: 'ouch'}
// <- Exception
```
Một ứng dụng mình thấy thích nhất ở tính năng destructuring là hoán đổi giá trị giữa hai biến.
```
function es5 () {
  var left = 10
  var right = 20
  var aux
  if (right > left) {
    aux = right
    right = left
    left = aux
  }
}
function es6 () {
  var left = 10
  var right = 20
  if (right > left) {
    [left, right] = [right, left]
  }
}
```
Chúng ta cũng có thể dùng 'computed property names' trong destructuring.
```
var key = 'such_dynamic'
var { [key]: foo } = { such_dynamic: 'bar' }
console.log(foo)
// <- 'bar'
```
Chúng ta cũng có thể chị định giá trị mặt định cho biến khi biến đó nhận giá tị undefined.
```
var {foo=3} = { foo: 2 }
console.log(foo)
// <- 2
var {foo=3} = { foo: undefined }
console.log(foo)
// <- 3
var {foo=3} = { bar: 2 }
console.log(foo)
// <- 3
```
Như đã nói ở trên, destructuring cũng làm việc với array, lúc này chúng ta thay dấu { và } thành dấu \[ và ].
```
var [a] = [10]
console.log(a)
// <- 10
```
## Các trường hợp sử dụng Destructuring
Sau đây là một số trường hợp mà destructuring sẽ hữu ích.
Khi một function trả về một object, sau đó bạn muốn gắn các propery trong object đó vào các biến riêng biệt, destructuring sẽ giúp bạn làm việc đó rất đơn giản
```
function getCoords () {
  return {
    x: 10,
    y: 22
  }
}
var {x, y} = getCoords()
console.log(x)
// <- 10
console.log(y)
// <- 22
```
Sử dụng destructuring trong param của function 
```
function random ({ min=1, max=300 }) {
  return Math.floor(Math.random() * (max - min)) + min
}
console.log(random({}))
// <- 174
console.log(random({max: 24}))
// <- 18
```
```
function random ({ min=1, max=300 } = {}) {
  return Math.floor(Math.random() * (max - min)) + min
}
console.log(random())
// <- 133
```
Trên đây mình đã giới thiệu về cú pháp, các trường hợp nên sử dụng destructuring. Mình mong là bài viết của mình sẽ giúp bạn hiểu hơn về destructuring và sử dụng tính năng này trong code của mình.