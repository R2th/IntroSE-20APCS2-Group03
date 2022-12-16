ES 6 là gì, nó là một phiên bản mới của Javascript, hãy GG để tìm hiểu thêm nếu bạn chưa biết về nó nhé!

Dưới đây là những tính nẵng mới mình sẽ giới thiêu đến các bạn:
 
1. Default Parameters in ES6
2. Template Literals in ES6
3. Multi-line Strings in ES6
4. Destructuring Assignment in ES6
5. Enhanced Object Literals in ES6
6. Arrow Functions in ES6
7. Promises in ES6
8. Block-Scoped Constructs Let and Const
9. Classes in ES6
10. Modules in ES6

## 1. Default Parameters

Đoạn code bên dưới định nghĩa các tham số mặc định:

```
var link = function (height, color, url) {
    var height = height || 50
    var color = color || 'red'
    var url = url || 'http://azat.co'
    ...
}
```

Mọi thứ vẫn ổn cho đến khi giá trị là 0 và bởi vì trong JavaScript 0 là `flase` nên nó sẽ mặc định là giá trị mà chúng ta `link(50, 'red', 'http://azat.co')`, vì thế chúng ta cần sử dụng cách khác. Trong ES6, chúng ta có thể đặt các giá trị mặc định khi khai báo tham số như thế này:

```
let link = function(height = 50, color = 'red', url = 'http://azat.co') {
  ...
}
```

## 2. Template Literals

Template Literals hay interpolation trong các ngôn ngữ khác là một cách hiển thị các biến trong chuỗi, trong ES5:

```
var name = 'Your name is ' + first + ' ' + last + '.'
var url = 'http://localhost:3000/api/messages/' + id
```

May mắn, trong ES6 chúng ta có thể sử dụng cú pháp mới ${NAME}  bên trong chuỗi:

```
let name = `Your name is ${first} ${last}.`
let url = `http://localhost:3000/api/messages/${id}`
```

## 3. Multi-line String

Một chuỗi có nhiểu dòng, trong ES5 chúng ta sẽ có cú pháp:

```
var roadPoem = 'Then took the other, as just as fair,\n\t'
    + 'And having perhaps the better claim\n\t'
    + 'Because it was grassy and wanted wear,\n\t'
    + 'Though as for that the passing there\n\t'
    + 'Had worn them really about the same,\n\t'

var fourAgreements = 'You have the right to be you.\n\
    You can only be you when you do your best.'
```

Trong ES6 :

```
let roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`

let fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`
```

## 4. Destructuring Assignment

Destructuring có thể là một khái niệm khó hiểu, hãy xem phép gán đơn giản này:

```
var data = $('body').data(), // data has properties house and mouse
  house = data.house,
  mouse = data.mouse
```

Một ví dụ khác của phép gán destructuring (từ Node.js):

```
var jsonMiddleware = require('body-parser').json

var body = req.body, // body has username and password
  username = body.username,
  password = body.password  
```

Trong ES6, chúng ta có thể thay thế code ES5 với các câu lệnh:

```
let {house, mouse} = $('body').data() // we'll get house and mouse variables

let {jsonMiddleware} = require('body-parser')

let {username, password} = req.body
```

Điều này cũng làm việc với mảng:

```
let [col1, col2]  = $('.column'),
  [line1, line2, line3, , line5] = file.split('\n')
```

## 5. Enhanced Object Literals

Cái bạn có thể làm với object literals giờ đang thay đổi! Chúng ta đi từ phiên bản của JSON trong ES5 tới một thứ gần giống class trong ES6.

Đây là một đối tượng điển hình trong ES5 với một vài phương thức và thuộc tính:

```
var serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]}

var accountServiceES5 = {
  port: serviceBase.port,
  url: serviceBase.url,
  getAccounts: getAccounts,
  toString: function() {
    return JSON.stringify(this.valueOf())
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```

Nếu muốn đẹp, chúng ta có thể kế thừa từ đối tượng `seviceBase` bằng cách tạo protoype với phương thức `Object.create`:

```
var accountServiceES5ObjectCreate = Object.create(serviceBase)
var accountServiceES5ObjectCreate = {
  getAccounts: getAccounts,
  toString: function() {
    return JSON.stringify(this.valueOf())
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```

Tôi biết, `accountServiceES5ObjectCreate` và `accountServiceES5` không hoàn toàn giống nhau, bởi vì một đối tượng (accountServiceES5) sẽ có các thuộc tính trong đối tượng `**proto**` như dưới đây:

![](https://images.viblo.asia/8ad95801-b030-44e2-ae4c-85e546edf61e.png)

Nhưng vì lợi ích của ví dụ, chúng ta sẽ coi chúng tương tự. Trong ES6 object literal, phép gán `getAccounts`: `getAccounts`, trở thành chỉ `getAccounts`. Chúng ta thiết lập `protoype` ngay trong thuộc tính __proto__:

```
let serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]}
let accountService = {
    __proto__: serviceBase,
    getAccounts,
```

Vì thế chúng ta có thể gọi `super` và các khóa động (`valueOf_1_2_3`): 

```
 toString() {
     return JSON.stringify((super.valueOf()))
    },
    getUrl() {return "http://" + this.url + ':' + this.port},
    [ 'valueOf_' + getAccounts().join('_') ]: getAccounts()
};
console.log(accountService)
```

![](https://images.viblo.asia/5f5ff2e8-d079-4ff2-a9a6-86be6779ecc3.png)

**(còn tiếp ...)**