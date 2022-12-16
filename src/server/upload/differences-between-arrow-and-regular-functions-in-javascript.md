Hello mọi người, tiếp tục seri tìm hiểu về Javascript, hôm nay mình sẽ cùng tìm hiểu về những điểm khác nhau giữa Arrow Function và Regular Function trong Javascript nha. Ok, bắt đầu thôi.

Trong Javascript thì bạn có thể định nghĩa một function thoe nhiều cách khác nhau.

Cách đầu tiên đó là sử dụng `function` keyword:
```
// Function declaration
function greet(who) {
  return `Hello, ${who}!`;
}
```
```
// Function expression
const greet = function(who) {
  return `Hello, ${who}`;
}
```
Mình xin phép gọi chung `Function declaration` và `Function expression` là `Regular function`.

Cách tiếp theo để định nghĩa một function mới là sử dụng `Arrow function` syntax (bắt đầu khả dụng từ ES2015):
```
const greet = (who) => {
  return `Hello, ${who}!`;
}
```
Nếu cả hai cách sử dụng `Arrow function` và `Regular function` đều có thể định nghĩa function thì câu hỏi đặt ra là: Khi nào thì bạn sẽ sử dụng cách định nghĩa này thay vì cách khác?

Trong bài viết ngày hôm nay chúng ta cùng đi tìm hiểu điểm khác biệt giữa hai cách và bạn có thể lựa chọn cách tốt nhất cho các tình huống mà bạn gặp phải.

# 1. `this` value
## 1.1 Regular function
Bên trong Regular function thì giá trị `this` là `dynamic`. Dynamic có nghĩa là giá trị của `this` sẽ phụ thuộc vào việc function được thực thi như thế nào. Trong Javascript, có 4 cách để thực thi một Regular function.

Trong trường hợp sử dụng `sinple invocation` thì giá trị của `this` sẽ là global object.
```
function myFunction() {
  console.log(this);
}

// Simple invocation
myFunction(); // logs global object (window)
```
Đối với trường hợp sử dụng `method invocation` thì giá trị của `this` là object mà sở hữu method đó:
```
const myObject = {
  method() {
    console.log(this);
  }
};
// Method invocation
myObject.method(); // logs myObject
```
Đối với trường hợp sử dụng `indirect invocation` sử dụng `myFunc.call(thisVal, arg1,..., argN)` hoặc `myFunc.apply(thisVal, [arg1,..., argN])` thì giá trị của `this` sẽ bằng đối số đầu tiên truyền vào:
```
function myFunction() {
  console.log(this);
}

const myContext = { value: 'A' };

myFunction.call(myContext);  // logs { value: 'A' }
myFunction.apply(myContext); // logs { value: 'A' }
```
Còn đối với `constructor invocation` sử dụng keyword `new` thì `this` sẽ bằng với instance mới được tạo:
```
function MyFunction() {
  console.log(this);
}

new MyFunction(); // logs an instance of MyFunction
```
## 1.2 Arrow function
`this` trong Arrow function nó những khác biệt đáng kể so với Regular function. Arrow function không xác định ngữ cảnh thực thi của riêng nó.

Không quan trọng hàm được thực thi ở đâu hay thực thi khi nào, giá trị của `this`trong một arrow function luôn bằng `this` của function bao bọc nó (outer function).

Trong ví dụ dưới đây, `myMethod()` là một outer function của `callback()` arrow function:
```
const myObject = {
  myMethod(items) {
    console.log(this); // logs myObject
    const callback = () => {
      console.log(this); // logs myObject
    };
    items.forEach(callback);
  }
};

myObject.myMethod([1, 2, 3]);
```
giá trị của `this` trong arrow function `callback()` bằng giá trị của `this` của function `myMethod()`.

Đây là một tính năng tuyệt vời của Arrow function. Khi sử dụng callback trong method bạn có thể chắc chắn là Arrow function sẽ không định nghĩa ra `this` của riêng nó và tất nhiên không cần sử dụng `const self = this` hoặc là `callback.bind(this)` :).

Trái ngược với Regular function, `inderect invocation` một Arrow function sử dụng `myArrowFunc.call(thisVal)` hoặc `myArrowFunc.apply(thisVal)` sẽ không thay đổi giá trị của `this`. Giá trị của nó sẽ luôn bằng giá trị của `this` của outer function.
# Constructors
## 2.1 Regular function
Như chúng ta đã thấy ở phần trước, Regular function có thể dễ dàng khởi tạo một object.

Ví dụ, `new Car()` sẽ tạo ra một instance của Car:
```
function Car(color) {
  this.color = color;
}

const redCar = new Car('red');
redCar instanceof Car; // => true
```
`Car` là một Regular function. Khi khởi tạo với keyword `new`: `new Car('red')` một instance của Car sẽ được tạo mới.
## 2.3 Arrow function
Khác biệt so với Regular function thì Arrow function không thể sử dụng để khởi tạo một instance mới.

Nếu bạn cố gắng khởi tạo một Arrow function với keyword `new` Javasctipt sẽ bắt lỗi ngay lập tức:
```
const Car = (color) => {
  this.color = color;
};

const redCar = new Car('red'); // TypeError: Car is not a constructor 
```
Khi khởi tạo `new Car('red')` trong khi `Car` là một Arrow function sẽ bị lỗi: `TypeError: Car is not a constructor`.
# 3. Arguments object
## 3.1 Regular function
Bên trong body của một Regular function, `arguments` là một `array-like object` đặc biệt chứa danh sách các arguments mà function sẽ thực thi.

Ví dụ chúng ta sẽ thực thi `myFunction()` với 2 arguments:
```
function myFunction() {
  console.log(arguments);
}

myFunction('a', 'b'); // logs { 0: 'a', 1: 'b', length: 2 }
```
Bên trong `myFunction()` body thì `arguments` như là một array object bao gồm hai phần tử là 'a' và 'b'.
## 3.2 Arrow function
Mặt khác, không có keyword `arguments` được định nghĩa bên trong một Arrow fucntion.

Cũng giống như `this`  ở phần 1, `arguments`bên trong Arrow function sẽ được truy cập đến `arguments` của outer function.

Cùng xem một ví dụ:
```
function myRegularFunction() {
  const myArrowFunction = () => {
    console.log(arguments);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); // logs { 0: 'a', 1: 'b', length: 2 }
```
Arrow function `myArrowFunction()` được thực thi với hai đối số `'c', 'd'`. Nhưng bên trong body của `myArrowFunction()`, `arguments` object bằng với `arguments` object của `myRegularFunction()`: `'a', 'b'`.

Nếu như bạn muốn truy cập vào đối số của Arrow function bạn cần sử dụng `rest parameters`:
```
function myRegularFunction() {
  const myArrowFunction = (...args) => {
    console.log(args);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); // logs ['c', 'd']
```
`...args` parameter sẽ lấy tất cả đối số của Arrow function: `['c', 'd']`
# 4. Implicit return
## 4.1 Regular function
`return` sẽ trả về kết quả của function:
```
function myFunction() {
  return 42;
}

myFunction(); // => 42
```
Nếu một hàm không có `return` hoặc là không có giá trị gì truyền vào return thì Regular function sẽ trả về `undefined`:
```
function myEmptyFunction() {
  42;
}

function myEmptyFunction2() {
  42;
  return;
}

myEmptyFunction();  // => undefined
myEmptyFunction2(); // => undefined
```
## 4.2 Arrow function
Nếu bạn return về một giá trị trong Arrow function thì nó cũng sẽ tương tự như Regular function, nhưng có một trường hợp khác biệt so với Regular function.

Khi sử dụng inline arrow function, nó sẽ tự động return về kết quả:
```
const increment = (num) => num + 1;

increment(41); // => 42
```
`increment()` function sử dụng duy nhất một expression: `num + 1`. Khi đó giá trị của `num + 1` sẽ được tự động trả về khi gọi đến `increment(41)` mà không cần return.
# 5. Methods
## 5.1 Regular function
Regular function là một cách thông thường để định nghĩa một method trong class.

Trong class `Hero`, method `logName()` được định nghĩa bằng cách sử dụng regular function:
```
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName() {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```
Thông thường, regular function sẽ được sử dụng để định nghĩa một method trong class.

Đôi khi bạn cần sử dụng một callback, ví dụ như `setTimeout()` hoặc là `event listener`. Trong trường hợp này bạn có thể bỏ sót `this`.

Ví dụ, chúng ta hãy thử sử dụng `logName()` method như là một callback của `setTimeout()`:
```
setTimeout(batman.logName, 1000);
// after 1 second logs "undefined"
```
Sau một giây, `undefined` sẽ được log trong console. `setTimeout()` thực thi một lời gọi hàm của `logName` (nơi mà `this` là một global object). Đó là khi mà method sẽ tách biệt với object.

Cùng sử dụng `bind` cho `this`:
```
setTimeout(batman.logName.bind(batman), 1000);
// after 1 second logs "Batman"
```
`batman.logName.bind(batman)` sẽ bind giá trị của `this` từ `batman` instance.

Bind `this` thủ công như vậy là không tốt chút nào, đặc biệt là khi bạn có rất nhiều method. Nhưng có một cách tuyệt vời hơn: sử dụng Arrow function như là một `class field`.
## 5.2 Arrow function
Với `class field`, bạn có thể sử dụng Arrow function như là một method bên trong class.

Cùng đi tới một ví dụ sử dụng Arrow function như là một field trong class:
```
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName = () => {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```
Bây giờ bạn có thể sử dụng `batman.logName` như là một callback mà không cần sử dụng binding. Giá trịc của `this` bên trong `logName()` luôn luôn là class instance:
```
setTimeout(batman.logName, 1000);
// after 1 second logs "Batman"
```
# 6. Summary
Khi hiểu được sự khác nhau giữa Regular function và Arrow function sẽ giúp bạn lựa chọn chính xác nên sử dụng cách nào trong từng trường hợp khác nhau.

`this` trong Regular function là không cố định, giá trị của nó phụ thuộc vào việc thực thi. Nhưng `this` bên trong Arrow function thì bằng giá trị của `this` của outer function.

`arguments` object trong Regular function chứa dánh sách các đối số của function. Ngược lại, đối với Arrow function, nó không định nghĩa `arguments` (nhưng bạn có thể dễ dàng truy cập vào nó bằng cách sử dụng `...args`).

Nếu Arrow function có một expression, khi đó giá trị của espression sẽ được trả về mà không cần sử dụng keyword `return`.

Cuối cùng nhưng cũng không kém phần quan trọng, bạn có thể định nghĩa một method sử dụng Arrow function bên trong một class. Arrow method sẽ tự động bind `this` của instance class.

Bằng bất cứ cách nào, khi Arrow method được thực thi, `this` luôn bằng class instance, nó rất hữu dụng khi method sử dụng callback.

Để hiểu rõ hơn tất cả các kiểu function trong Javascript, bạn có thể tham khảo [6 Ways to Declare JavaScript Functions](https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/)
# 7. References
- https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/#comments