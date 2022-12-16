Hầu hết các tính năng hay ho trên ES6 đầu đã được các trình duyệt hỗ trợ. Nhờ nó mà các nhà phát triển có thể xây dựng ứng dụng trực tiếp bằng ES6, không cần phải thông qua các công cụ chuyển đổi như Babel hay Bublé nữa, giúp ứng dụng trở nên gọn nhẹ hơn, giảm thiểu kích thước tập tin khi chuyển đến người sử dụng.

Sau đây là một số tính năng nổi bật của ES6 mà bạn nên biết

# 1. *let* và *const*
Trước đây, bạn thường khai báo biến bằng `var` giống như ví dụ dưới đây

```
 var foo = 1
 console.log(foo) // 1
```

Biến được khai báo với `var` sẽ có tầm vực bên trong hàm gần nhất (function scope), và sẽ được đẩy lên đầu của tầm vực (hoisting)
ES6 giới thiệu `let` và `const` như hai cách khai báo biến mới, hỗ trợ tầm vực theo khối (block scope) và không thực hiện hoisting.

```
let foo1 = 1
const foo2 = 2

console.log(foo1, foo2) // 1, 2
```

Điểm khác biệt giữa `let` và `const` là với `const`, bạn không thể gán giá trị mới cho biến sau khi khai báo, trong khi điều này lại có thể với `let`.

```
let foo = 2
foo = 3
console.log(foo) // 3

const baz = 2
baz = 3 // Error: Assignment to constant variable.
```

# 2. Hàm mũi tên

Hàm mũi tên – (fat) arrow functions – là một kiểu cú pháp rút gọn cho khai báo hàm trong JavaScript. Trước ES6, bạn khai báo một hàm trong JavaScript với từ khóa function.

```
// before ES6
function add(x, y) {
  return x + y
}

// ES6
const add = (x, y) => {
  return x + y
}
```

Hàm mũi tên cũng hữu dụng để giải quyết vấn đề muôn thuở trong JavaScript: “which this is `this`?” – khái niệm con trỏ `this`. Với ES5, bạn hay gặp trường hợp giống như thế này:

```
'use strict'
function App() {
  this.count = 0
  setInterval(function() {
    console.log(this.count++)
  }, 1000)
}

var a = new App()
```

Trước ES6, mỗi khai báo hàm đều có một giá trị `this` tách biệt. Điều này làm cho đoạn code ở trên không hoạt động, vì `this.count` bên trong hàm của `setInterval` mang giá trị undefined. Cách giải quyết thông thường là đặt một biến self, that hay `_this` để giữ reference, hoặc sử dụng `Function.prototype.bind`.

```
function App() {
  this.count = 0
  var self = this
  setInterval(function() {
    console.log(self.count++)
  }, 1000)
}
```

Với hàm mũi tên trong ES6, giá trị của `this` chính là this trong tầm vực gần nhất với nó (lexical this). Do đó chúng ta không cần phải khai báo biến tạm hay dùng `.bind` nữa

```
function App() {
  this.count = 0

  setInterval(() => console.log(this.count++), 1000)
}
```

# 3. Chuỗi bản mẫu
Chuỗi bản mẫu (template strings) là chuỗi chân phương (string literals) nhưng cho phép đính kèm biểu thức. Nó cũng cho phép khai báo chuỗi trên nhiều dòng. Để sử dụng, bạn dùng ký tự backtick ` (dấu huyền). Ví dụ như là:

```
const name = 'John'

const greetings = `Hello ${name},
The result of 1 + 1 is ${1 + 1}, and the time is now ${Date.now()}.`
```

Vì chuỗi bản mẫu cũng chỉ là chuỗi nên bạn có thể gọi đến những phương thức của `String.prototype`

```
`Hello World`.substr(0, 5).toUpperCase()
```

# 4. Object Literals
Object Literals chỉ đơn giản là khai báo một object trong JavaScript như bạn đã làm bao năm nay.

```
var birthYear = 2000
var obj = {
  name: 'John',
  birthYear: birthYear,
  getAge: function(currentYear) {
    return currentYear - obj.birthYear
  }
}
```

ES6 nâng cấp Object Literals, cho phép bạn khai báo tắt thuộc tính của object với biến cùng tên, và khai báo phương thức cho object.

```
const birthYear = 2000
const obj = {
  name: 'John',
  birthYear, // khai báo tắt birthYear: birthYear
  getAge(currentYear) {
    // `this` được gán trực tiếp vào bản thân object
    return currentYear - this.birthYear
  }
}
```

# 5. Rest và spread
Rest – phần còn lại – là một bổ sung của phân rã biến mảng ở trên. Bạn dùng ba dấu chấm ... để biểu thị rest.

```
const [first, second, ...rest] = [1, 2, 3, 4, 5]

console.log(first, second, rest)
// 1
// 2
// [3, 4, 5]
```

Spread – rải – là thao tác ngược lại với rest, giúp bạn kết hợp một mảng đã có sẵn thành mảng mới.

```
const arr = [3, 4, 5]
const newArr = [1, 2, ...arr, 6]
console.log(newArr) // [1, 2, 3, 4, 5, 6]
```

Spread rất hữu ích để thay thế các thao tác thên mảng, ví dụ như `.concat()`

```
const head = [1, 2]
const tail = [3, 4, 5]
console.log([...head, ...tail]) // [1, 2, 3, 4, 5]
```

# Lời kết
Trên đây là một số tính năng nổi bật mình liệt kê ra về ES6. ES6 mang đến rất nhiều tính năng tuyệt vời cho lập trình viên, giúp cho làm việc với JavaScript trở nên dễ dàng hơn, đồng thời nâng cao hiệu suất, cải thiện mã nguồn và giảm dung lượng tập tin khi truyền tải trên mạng. Nếu ứng dụng của bạn hướng đến các trình duyệt hiện đại, đừng chần chờ gì, hãy dùng ES6 ngay hôm nay.

Tham khảo: 
https://toidicode.com/hoc-ecmascript
https://ehkoo.com/bai-viet/tong-hop-tinh-nang-noi-bat-es6/