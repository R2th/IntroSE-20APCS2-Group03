Các method bind() tạo ra một function mới, khi được gọi, từ khóa `this` được thiết lập như giá trị cung cấp, với một chuỗi các đối số đã cho trước bất kỳ được cung cấp khi hàm mới được gọi.

**JavaScript Demo: Function.bind():**
```js
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

# Syntax
```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```
### Parameters

***thisArg***

Giá trị được truyền dưới dạng tham số `this` cho hàm đích khi hàm bị ràng buộc được gọi. Giá trị bị bỏ qua nếu hàm ràng buộc được xây dựng bằng toán tử `new`. Khi sử dụng `bind` để tạo một hàm (được cung cấp dưới dạng gọi lại) bên trong một `setTimeout`, mọi giá trị nguyên thủy được truyền dưới dạng `thisArg` được chuyển đổi thành `Object`. Nếu không có đối số nào được cung cấp cho `bind`, phạm vi  `this` thực thi được coi là `thisArg` đối với hàm mới.

***arg1, arg2, ...***

Các đối số để thêm vào các đối số được cung cấp cho hàm bị ràng buộc khi gọi hàm đích.
### Return value
Một bản sao của hàm đã cho với giá trị `this` được chỉ định và các đối số ban đầu.

# Description

Hàm bind () tạo ra một hàm ràng buộc mới (BF). BF là một **exotic function object** (một thuật ngữ từ ECMAScript 2015) bao bọc đối tượng chức năng ban đầu. Gọi một BF thường dẫn đến việc thực hiện chức năng gói của nó.
Một BF có các thuộc tính bên trong sau:
* **[[BoundTargetFunction]]** - function object được bao bọc;
* **[[Bound This]]** - giá trị luôn được truyền dưới dạng `this` khi gọi hàm được gói.
* **[[BoundArgument]]** - một danh sách các giá trị có các phần tử được sử dụng làm đối số đầu tiên cho bất kỳ lệnh gọi nào đến hàm được gói.
* **[[Call]]** - thực thi mã được liên kết với đối tượng này. Được gọi thông qua một biểu thức gọi hàm. Các đối số cho phương thức bên trong là một giá trị này và một danh sách chứa các đối số được truyền cho hàm bằng một biểu thức cuộc gọi.

Khi chức năng ràng buộc được gọi, nó gọi phương pháp nội bộ **[[Call]]** trên **[[BoundTargetFunction]]**, với lập luận sau đây gọi ( boundThis , args ). Trong đó, ràng buộc Đây là **[[Bound This]]** , args là **[[BoundArgument]]** theo sau là các đối số được truyền bởi lệnh gọi hàm.

Một hàm ràng buộc cũng có thể được xây dựng bằng cách sử dụng toán tử `new`: làm như vậy hoạt động như thể chức năng đích đã được xây dựng. Giá trị `this` được cung cấp bị bỏ qua, trong khi các đối số được chuẩn bị trước được cung cấp cho hàm mô phỏng.

# Examples
### Creating a bound function
Cách sử dụng đơn giản nhất `bind()` là tạo ra một function, cho dù nó được gọi như thế nào, được gọi với một giá trị `this` cụ thể . Một lỗi phổ biến đối với các lập trình viên JavaScript mới là trích xuất một phương thức từ một đối tượng, sau đó gọi hàm đó và mong đợi nó sử dụng đối tượng ban đầu như nó (ví dụ: bằng cách sử dụng phương thức đó trong mã dựa trên gọi lại). Tuy nhiên, đối tượng ban đầu thường bị mất. Tạo một hàm ràng buộc từ hàm, sử dụng đối tượng gốc, sẽ giải quyết gọn gàng vấn đề này:
```js
this.x = 9;    // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

### Partially applied functions
Việc sử dụng đơn giản tiếp theo `bind()` là tạo một hàm với các đối số ban đầu được chỉ định trước. Các đối số này (nếu có) tuân theo giá trị `this` được cung cấp và sau đó được chèn vào lúc bắt đầu các đối số được truyền cho hàm đích, theo sau là các đối số được truyền cho hàm bị ràng buộc, bất cứ khi nào hàm được ràng buộc được gọi.

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(null, 37);

// Create a function with a preset first argument.
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 , second argument is ignored
```

### With setTimeout
Theo mặc định bên trong window.setTimeout(), từ khóa `this` sẽ được đặt thành đối tượng window(hoặc global). Khi làm việc với các class methods yêu cầu tham chiếu `this` đến các class instances, bạn có thể liên kết `this` rõ ràng với hàm gọi lại, để duy trì thể hiện.
```js
function LateBloomer() {
  this.petalCount = Math.floor(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  
// after 1 second, triggers the 'declare' method
```
### Bound functions used as constructors
Các hàm ràng buộc tự động phù hợp để sử dụng với toán tử `new` để xây dựng các thể hiện mới được tạo bởi hàm đích. Khi một hàm ràng buộc được sử dụng để xây dựng một giá trị, việc cung cấp `this` sẽ bị bỏ qua. Tuy nhiên, các đối số được cung cấp vẫn được thêm vào lệnh gọi hàm tạo:
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};

var p = new Point(1, 2);
p.toString(); // '1,2'

// not supported in the polyfill below,

// works fine with native bind:

var YAxisPoint = Point.bind(null, 0/*x*/);


var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true
```
Lưu ý rằng bạn không cần làm gì đặc biệt để tạo một hàm ràng buộc để sử dụng `new`. Hệ quả là bạn không cần phải làm gì đặc biệt để tạo một hàm ràng buộc để được gọi rõ ràng, ngay cả khi bạn muốn yêu cầu hàm bị ràng buộc chỉ được gọi bằng cách sử dụng `new`.
```js
// Example can be run directly in your JavaScript console
// ...continuing from above

// Can still be called as a normal function 
// (although usually this is undesired)
YAxisPoint(13);

emptyObj.x + ',' + emptyObj.y;
// >  '0,13'
```
Nếu bạn muốn hỗ trợ việc sử dụng hàm bị ràng buộc chỉ bằng cách sử dụng `new` hoặc chỉ bằng cách gọi nó, hàm mục tiêu phải thực thi hạn chế đó.
### Creating shortcuts
`bind()` cũng hữu ích trong trường hợp bạn muốn tạo một lối tắt đến một hàm yêu cầu một giá trị `this` cụ thể .

Lấy ví dụ `Array.prototype.slice` , bạn muốn sử dụng để chuyển đổi một đối tượng giống như mảng thành một mảng thực. Bạn có thể tạo một lối tắt như thế này:
```js
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```
Với `bind()`, điều này có thể được đơn giản hóa. Trong đoạn mã sau đây, `slice` là một hàm ràng buộc với hàm `apply()` của `Function.prototype`, với  giá trị `this` được đặt thành  hàm `slice()` của `Array.prototype`. Điều này có nghĩa là các cuộc gọi bổ sung `apply()` có thể được loại bỏ:
```js
// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```

Trên đây là 1 vài cách sử dụng bind(), chúc các bạn thành công

Link tham khảo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind