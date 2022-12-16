![](https://images.viblo.asia/def809f8-ee39-4365-90a1-c2b4eceb0987.png)

Thôi thì không lòng vòng nữa bắt đầu luôn nào (go)


## 1. Nên tìm hiểu những ý tưởng và concept trước khi lao vào học react

- Kiến thức tiên quyết mà bạn phải làm quen chính là một số tính năng JavaScript mà bạn sẽ sử dụng rất rất nhiều lần trong React.

- Đôi khi mọi người nhầm lẫn nghĩ rằng đó là một trong các tính năng được React cung cấp, nhưng thật ra nó chỉ là cú pháp JavaScript hiện đại thôi.

- Có thể nói rằng Javascript là xương sống của React, vậy nên việc tìm hiểu Javascript chính là đang tiến đến dần đến React.

- Mình sẽ đề cập một danh sách những điều giúp mọi người tăng tốc trong việc tìm hiểu React.

## 2. Biến

- Giống như các ngôn ngữ lập trình khác, `biến` được hiểu như là gán cho một định danh, sau đó có thể sử dụng lại bằng cách gọi lại chính tên định danh đó (cần chú ý `scope` khi khai báo).

- Một biến phải được khai báo trước khi sử dụng nó.  Trong javascript có 3 cách để làm điều này, sử dụng `var`, `let` và `const`. Cả 3 cách đều có cách tiếp cận và cách sử dụng khác nhau.

### 2.1 Sử dụng `var`

- Cho đến ES2015, `var` là cấu trúc duy nhất để định nghĩa một biến

```
var a = 0;
```

- Nếu bạn không gán giá trị cho nó khi khai báo, nó sẽ nhận giá trị là `undefined` cho đến khi bạn gán giá trị

```
var a; 
// a == 'undefined'
// typeof a == 'undefined'
```

- Bạn có thể ghi đè biến nhiều lần: 

```
var a = 1;
var a = 2;
```

- Có thể khai báo nhiều biến trên một dòng:

```
var a = 1, b = 2; 
```

- `var` tạo ra một biến có phạm vi truy cập xuyên suốt các function (biến toàn cục).

### 2.2 Sử dụng `let`

```
let a = 3;
```

- `let` là một tính năng mới được giới thiệu trong ES2015 và về cơ bản nó là một phiên bản tốt hơn `var`. 

-  `scope`của nó được giới hạn trong `block`, `statement` hoặc biểu thức nơi nó được xác định và tất cả các `block` bên trong được chứa.

- Các coder javascript hiện tại đã chọn chỉ sử dụng `let` và loại bỏ hoàn toàn việc sử dụng `var`

- Ngược lại với `var`, `let` không tạo ra một biến toàn cục, điều này hạn chế việc xảy ra lỗi vặt hơn

### 2.3 Sử dụng `const`

- Khác với `let` và `var`, khai báo biến với `const` thì giá trị không được thay đổi nữa và nó không thể được gán lại thành một giá trị khác.

```
const a = 22;
```

- `const` có `scope` được giới hạn trong `block`, giống với `let`

[Tham khảo thêm](https://kipalog.com/posts/var--let-va-const-trong-ES6)

## 3. Arrow functions

- `Arrow function` được giới thiệu trong ES6/ ECMAScript 2015, kể từ khi giới thiệu, nó làm thay đổi cách chúng ta viết và nhìn nhận một `function`

- Trực quan mà nói, nó làm đơn giản hơn trong việc viết code `function` rất nhiều, trông đơn giản và thích thú hơn nhiều. 

- Từ 

```
const myFactor = function () {
   // ...
}
```

thành

```
const myFactor = () => {
   // ...
}
```

- Nếu thân hàm chỉ chứa một câu lênh, bạn có thể bỏ qua dấu ngoặc nhọn và viết nó trên một dòng

```
const myFunction = () => doSomething()
```

- Các tham số được truyền trong ngoặc đơn: 

```
const myFunction = (param1, param2) => doSomething(param1, param2)
```

- Nếu bạn chỉ có một và chỉ một tham số, bạn nên lược bỏ luôn cả ngoặc dơn đó

```
const myFunction = param => doSomething(param)
```

- Dễ thích hơn nhiều đúng không nào =)).

### 3.1 Implicit return

- Với `arrow function`thì chúng ta thêm tính năng là `implicit return`, cụ thể là

- Thay vì:

```
const myFactor = function() {
    return 'test';
}
myFactor () // 'test'
```

ta có thể viết:

```
const myFactor = () => 'test'

myFactor () // 'test'
```

- Một ví dụ khác, khi trả về một đối tượng, hãy nhớ bọc dấu ngoặc nhọn trong ngoặc đơn để tránh nó được coi là dấu ngoặc của thân hàm:

```
const myFunction = () => ({value: 'test'})

myFactor () // {value: 'test'}
```

### 3.2 `this` trong `arrow function`

- `this` là một khái niệm có thể phức tạp để nắm bắt, vì nó thay đổi rất nhiều tùy thuộc vào ngữ cảnh.

- Nó rất quan trọng để làm rõ khái niệm này vì các `arrow function` hoạt động rất khác so với các hàm thông thường.

- Khi được định nghĩa là một phương thức của một đối tượng, trong một hàm thông thường, điều này đề cập đến đối tượng, vì vậy bạn có thể làm:

```
const car = {
  model: 'Fiesta',
  manufacturer: 'Ford',
  fullName: function() {
    return `${this.manufacturer} ${this.model}`
  }
}
```

gọi `car.fullName ()` sẽ trả về `"Ford Fiesta"`.

- `Scope` của `this` trong `arrow function` là kế thừa từ bối cảnh thực hiện. 

-  `arrow function` hoàn toàn không định nghĩa giá trị của `this`, do đó, với đoạn code trên, `car.fullName ()` sẽ không hoạt động và sẽ trả về chuỗi `"undefined undefined"`

```
const car = {
  model: 'Fiesta',
  manufacturer: 'Ford',
  fullName: () => {
    return `${this.manufacturer} ${this.model}`
  }
}
```

- `arrow function` không thể được sử dụng như các hàm khởi tạo, khi khởi tạo một đối tượng sẽ raise `TypeError` lỗi.

- Đây là nơi các chức năng thông thường nên được sử dụng thay thế, khi không cần bối cảnh động.

- Đây cũng là một vấn đề khi xử lý các sự kiện. DOM Event listeners set `this` là thành phần đích và nếu bạn dựa vào điều này trong trình xử lý sự kiện, thì một chức năng thông thường là cần thiết....:

```
const link = document.querySelector('#link')
link.addEventListener('click', () => {
  // this === window
})

const link = document.querySelector('#link')
link.addEventListener('click', function() {
  // this === link
})
```

[Tham khảo thêm](https://completejavascript.com/phan-biet-arrow-function-va-function-trong-javascript#arrow-function-kh%C3%B4ng-bind-this)

## 4. Rest và spread

### 4.1 `Spread Operator`

- Bạn có thể mở rộng một mảng, đối tượng, hoặc một `string` với  `spread operator(...)`

- Hãy bắt đầu với một ví dụ mảng.

```
const a = [1, 2, 3]
```

- Bạn có thể tạo một mảng mới bằng cách sử dụng

```
const b = [... a, 4, 5, 6]
```

- Cũng có thể tạo một bản sao của một mảng bằng cách sử dụng

```
const c = [... a]
```

- Điều này làm việc cho các đối tượng khá tốt giúp nhân bản một đối tượng:

```
const newObj = {... oldObj}
```

- Sử dụng với `string`, `spread operator` tạo một mảng với mỗi kí tự trong chuỗi:

```
const hey = 'hey'
const arrayized = [...hey] // ['h', 'e', 'y']
```

- Toán tử này có một số ứng dụng khá hữu ích. Điều quan trọng nhất là khả năng sử dụng một mảng làm đối số hàm theo cách rất đơn giản:

```
const f = (foo, bar) => {}
const a = [1, 2]
f(...a)
```

### 4.2 `Rest element`

`rest element` rất hữu ích khi làm việc với `array destructuring`:

```
const numbers = [1, 2, 3, 4, 5]
[first, second, ...others] = numbers
// first = 1
// second = 2
// others = [3, 4, 5]
```

và `spread elements`:

```
const numbers = [1, 2, 3, 4, 5]
const sum = (a, b, c, d, e) => a + b + c + d + e
const sumOfNumbers = sum(...numbers)
```

### 4.3 `Rest properties`

```
const { first, second, ...others } = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5
}

first // 1
second // 2
others // { third: 3, fourth: 4, fifth: 5 }
```

- `Spread properties` cho phép tạo một đối tượng mới bằng cách kết hợp các thuộc tính của đối tượng được truyền sau `spread operator`:

```
const items = { first, second, ...others }
items //{ first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
```

### 4.4 Object and array destructuring

- Đưa ra một đối tượng, sử dụng của `destructuring`, bạn có thể trích xuất một số giá trị và đặt chúng vào các biến tên mới:

```
const person = {
  firstName: 'Tom',
  lastName: 'Cruise',
  actor: true,
  age: 54 //made up
}

const { firstName: name, age } = person 

// name: Tom
// age: 54
```

- `name` và `age` chứa các giá trị mong muốn.

- Cú pháp này cũng hoạt động tốt với mảng

```
const a = [1, 2, 3, 4, 5]
const [first, second] = a
```

- Câu lệnh này lấy ra 3 phần từ của mảng lần lượt là 0, 1, 4

```
const a = [1, 2, 3, 4, 5]
const [first, second, , , fifth] = a
```



## 5. `Template literals`

- `Template literials` là một tính năng mới của ES2015 / ES6  cho phép bạn làm việc với các chuỗi theo một cách mới lạ so với ES5 trở xuống.

- Cú pháp đơn giản, string đặt trong dấu ``:

```
const a_string = `something`
```

- `Template literials`cung cấp rất nhiều công dụng trong việc viết các `string` mà các dấu nháy đơn(''), nháy kép("")  làm được" 

+ Dễ dàng trong việc viết đoạn `string` nhiều dòng

+ Dễ dàng để nội suy các biến và biểu thức trong chuỗi

+ Cùn một số tính năng khác 

### 5.1 `Multiline strings`

- Trước ES6, để tạo một chuỗi trải dài trên hai dòng, bạn phải sử dụng ký tự `\` ở cuối dòng:

```
const string =
  'first part \
second part'
```

nhưng kết quả in ra 

```
first part second part
```

- Muốn kết quả in ra trên 2 dòng thì ta phải thêm kí tự `\n` ở cuối dòng 

```
const string =
  'first line\n \
second line'
```

hoặc

```
const string = 'first line\n' + 'second line'
```

- `Template literials` làm điều đó tốt hơn thế, bạn chỉ cẩn nhập chuỗi trong dấu nháy (``) là được

```
const string = `Hey
this
string
is awesome!`
```

### 5.2 Nội suy

- `Template literals` cung cấp cách nội suy dễ dàng với các biến và biểu thức bên trong `string`

- Chỉ cần đặt biến hoặc biểu thức vào trong `${...}`là được

```
const myVariable = 'test'
const string = `something ${myVariable}` //something test
```

- Bên trong `${}` bạn có thể thêm bất cứ thứ gì, kể cả là biểu thức

```
const string = `something ${1 + 2 + 3}`
const string2 = `something ${foo() ? 'x' : 'y'}`
```

## 6. Classes

### 6.1 Định nghĩa một `class`

```
class Person {
  constructor(name) {
    this.name = name
  }
  
  hello() {
    return 'Hello, I am ' + this.name + '.'
  }
}
```

- Khi đối tượng được khởi tạo, phương thức `constructor` được gọi, với bất kỳ tham số nào được truyền.

- Một lớp cũng có nhiều phương thức cần thiết. Trong trường hợp này, `hello` là một phương thức và có thể được gọi trên tất cả các đối tượng xuất phát từ lớp này:

```
const flavio = new Person('Flavio')
flavio.hello()
```

### 6.2 `Class inheritance`

- Một `class` có thể `extend` một `class` khác và các đối tượng được khởi tạo bằng cách sử dụng `class` đó kế thừa tất cả các phương thức của cả hai `class`.

- Nếu `class inheritance` có một phương thức có cùng tên với một trong các `class` cao hơn trong hệ thống phân cấp, thì phương thức gần nhất được ưu tiên:

```
class Programmer extends Person {
  hello() {
    return super.hello() + ' I am a programmer.'
  }
}

const flavio = new Programmer('Flavio')
flavio.hello()

// Hello, I am Flavio. I am a programmer.
```

- Trong một `class`, bạn có thể tham chiếu `class` cha khi gọi `super ()`.

### 6.3 `Static methods`

- Thông thường các phương thức được định nghĩa trên các `instance`, không phải trên `class`.

- Các `static method` được thực thi trên `class` thay thế:

```
class Person {
  static genericHello() {
    return 'Hello'
  }
}

Person.genericHello() //Hello
```

### 6.4 `Private methods`

- JavaScript không có cách tích hợp để xác định các `private method` hoặc `protected method`

- Có cách giải quyết, nhưng chúng ta sẽ không mô tả chúng ở đây.

### 6.5 Getters and setters

- Bạn có thể thêm các phương thức có tiền tố `get` hoặc `set` để tạo `getter` và `setter`

-  Đó là hai đoạn `code` khác nhau được thực thi dựa trên những gì bạn đang làm: truy cập biến hoặc sửa đổi giá trị của nó.

```
class Person {
  constructor(name) {
    this.name = name
  }
  
  set name(value) {
    this.name = value
  }
  
  get name() {
    return this.name
  }
}
```

## 7. Callbacks

- Còn tiếp ...

## 8. Kết luận

- Trên đây là danh sách cần chuẩn bị trước khi nhảy vào code `react`, hi vọng bài viết sẽ giúp ích được cho mọi người.

- Cảm ơn mọi người đã theo dõi.

- Tài liệu tham khảo:

+ [React handbook](https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/)

+ [Arrow function](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

+ [Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

+ [Destructing syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

+ [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)