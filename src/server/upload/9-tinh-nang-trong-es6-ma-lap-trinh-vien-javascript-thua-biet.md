ES6 mang lại rất nhiều tính năng hay cho Javascript. Trong bài viết này hãy cùng mình tìm hiểu những tính năng có thể giúp chúng ta viết code hiệu quả hơn. Bài viết dành cho những người đang tìm hiểu JS như mình.
> ECMAScript, hay ES6,  được xuất bản vào tháng 6 năm 2015. Sau đó nó được đổi tên thành ECMAScript 2015.

### 1. Const và let
Trước khi có ES6, để khai báo biến chúng ta sử dụng từ khóa ``var``.
Tuy nhiên nó lại gặp vấn đề liên quan tới scope. Vì ``var`` không có block scope cho nên dẫn tới trường hợp không như mong muốn, ví dụ:

```javascript
var company = 'Sun Asterisk';
if (true) {
  var company = 'Framgia';
}
console.log(company); // Framgia
```

Chúng ta sẽ gặp vấn đề trong những dự án lớn với hàng ngàn dòng code, chúng ta không biết ``company`` đã được khai báo trước đó, do đó nếu khai báo lại biến cùng tên đó trong câu lệnh if thì không may sẽ dẫn tới việc thay đổi giá trị của biến company trong global scope.

Đó là lý do mà chúng ta sẽ thay thế bằng ``let`` và ``const``, ví dụ trên sẽ hoạt động đúng như sau:

```javascript
let company = 'Sun Asterisk';
if (true) {
  let company = 'Framgia';
}
console.log(company); // Sun Asterisk
```

Bây giờ nếu định nghĩa cùng tên biến thì cũng không gặp vấn đề gì vì ``company`` đã ở trong 2 scope khác nhau.

### 2. Arrow function
Ngày nay, các ngôn ngữ lập trình hiện đại đều có xu hướng đơn giản hóa cách viết nhưng vẫn đáp ứng được nhiệm vụ. Arrow function ra đời cũng giúp việc viết code ngắn gọn hơn.
Trước khi có arrow function, chúng ta thường viết như sau:
```javascript
function sayGreeting(name) {
    console.log('Hello ' + name)
}

sayGreeting('Sunner')
```

**Với arrow function:**
```javascript
function sayGreeting = name => console.log('Hello ' + name)

sayGreeting('Sunner')
```

### 3. Tham số "Rest"
Cùng xem ví dụ sau:

```javascript
function something(a, b, ... numbers) {
    console.log("a: ", a)
    console.log("b: ", b)
    console.log("numbers: ", numbers)
}

something(1, 2, 3, 5)
// a:  1
// b:  2
// numbers:  [3, 5]
```

Có thể thấy tiền tố ... của tham số cuối cùng sẽ được chứa trong một mảng, ``numbers`` được gọi là rest parameter

### 4. Template literals
Template literals là chuỗi mà bạn có thể ngắt dòng và sử dụng với interpolated expression (tạm dịch: biểu thức nội suy), kiểu ``${variable_name}``.
Để tạo template literals chúng ta dùng dấu `\` (thay vì '' hay "" như string thông thường)

**Ví dụ:**
```javascript
const name = "Sunner"
console.log(`We are ${sunner}`)
```

### 5. Promises

Promises cho phép bạn dừng lại một hàm này cho tới khi các hàm trước đó được thực hiện xong, được sử dụng khi chúng ta xử lý một chuỗi các hành động theo trình tự.
Khi chưa có Promise thì chúng ta sử dụng callback nhưng callback có nhiều hạn chế nên không ai ưa dùng.

Ví dụ: 
```javascript
// add two numbers remotely using observable

let resultA, resultB, resultC;

function addAsync(num1, num2) {
    // use ES6 fetch API, which return a promise
    // What is .json()? https://developer.mozilla.org/en-US/docs/Web/API/Body/json
    return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
        .then(x => x.json());
}

addAsync(1, 2)
    .then(success => {
        resultA = success;
        return resultA;
    })
    .then(success => addAsync(success, 3))
    .then(success => {
        resultB = success;
        return resultB;
    })
    .then(success => addAsync(success, 4))
    .then(success => {
        resultC = success;
        return resultC;
    })
    .then(success => {
        console.log('total: ' + success)
        console.log(resultA, resultB, resultC)
    });
```

Xem thêm tại đây: 
* https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise
* https://www.digitalocean.com/community/tutorials/javascript-promises-for-dummies

### 6. Tham số mặc định
Tham số mặc định trong Javascript cho phép chúng ta khởi tạo giá trị ban đầu cho tham số đầu vào của hàm nếu chúng ta gọi hàm đó mà không truyền đối số hoặc undefined.

Ví dụ nếu chúng ta không truyền đối số cho hàm ``sayGreeting``, nó sẽ undefined
```javascript
function sayGreeting = name => console.log('Hello ' + name)

sayGreeting() // Hello undefined
```

Với ES6 chúng ta có thể đặt giá trị mặc định cho tham số đầu vào như thế này:
```javascript
function sayGreeting = (name = "Sunner") => console.log('Hello ' + name)

sayGreeting() // Hello Sunner
```

### 7. Modules
Khi viết code chúng ta thường có những hàm với chức năng/mục đích cụ thể, những hàm liên quan này chúng ta tách ra ... được gọi là module.
Ví dụ chúng ta có module tính toán với các hàm cộng, trừ chẳng hạn, ví dụ:

```javascript
// calculation.js
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}
```

Chúng ta sử dụng từ khóa ``export`` để "chìa ra" cho các file khác có thể ``import`` vào để sử dụng, ví dụ:

```javascript
// main.js
import { add, sub } from './calculation.js';

let a = add(1, 2); // 3
let b = sub(2, 1); // 1
```

### 8. Destructuring

Xem qua ví dụ dưới cùng mình nha:

```javascript
let user = {
    name: 'Sunner',
    age: 19,
    address: '16 Ly Thuong Kiet St'
}

let name = user.name
let age = user.age
let address = user.address
```

Có thể thấy là với object user ở trên và mình muốn tạo biến để lưu từng giá trị ở trong đó thì phải viết lại ``user.`` khá mất thời gian.

Với ``destructuring`` thì chúng ta có thể làm như sau:

```javascript
let { name, age, address } = user
```

Nếu muốn đổi tên biến name thành username, chúng ta làm như sau:

```javascript
let { name: username, age, address } = user

console.log(username) // Sunner
```

Đơn giản hơn đúng không :D.
Destructuring cho phép chúng ta trích xuất các phần của object hoặc array.


### 9. Class
Trước ES6, JS không có class nên chúng ta thường dùng hàm kiểu thế này.

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.introduce = function () {
    console.log(`My name is ${this.name}`)
}

let person = new Person('Dot')
person.introduce();
```

Với ES6, chúng ta có thể viết rõ ràng hơn, dễ hiểu hơn cho những ai đã biết các ngôn ngữ như C#, Java ...

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    
    introduce() {
         console.log(`My name is ${this.name}`)
    }
}

let person = new Person(‘Dot’);
person.introduce();
```

Ngoài ra còn thêm các tính năng hay ho của ES6 nữa như Proxy, Symbol ... bạn có thể tìm hiểu thêm ở đây https://github.com/lukehoban/es6features

Trên đây không phải là tất cả tính năng của ES6 mà chỉ là một số tính năng hay và hữu ích đối với mình. Nếu bạn biết tính năng nào hay thì comment cho mình học hỏi thêm với nhea :kissing_heart: :kissing_heart:
Cảm ơn bạn đã dành thời gian đọc bài.

*Nguồn nè: https://medium.com/javascript-in-plain-english/9-es6-features-every-javascript-developer-should-know-b1f2915e7add*