# 1. Function Declaration

Đầu tiên ta có thể khai báo 1 hàm vô cùng đơn giản với từ khóa **function**, theo sau nó là tên của hàm đó cùng với 1 hoặc nhiều tham số (**parameters**) được tập hợp lại trong dấu ngoặc tròn (), cuối cùng là phần thân hàm sẽ được nhận biết thông qua cặp ngoặc nhọn {}.

```javascript
// Khai báo hàm
function isEven(num) {  
  return num % 2 === 0;
}
isEven(24); // => true  
isEven(11); // => false  
```

* Khai báo hàm tạo một biến trong phạm vi hiện tại với mã định danh bằng tên hàm. Biến này giữ đối tượng hàm.
* Đồng thời biến này sẽ được **hoisted up** trong phạm vi scope hiện tại, nhờ đó ta có thể gọi và sử dụng hàm trước khi khai báo.
* Hàm được tạo được đặt tên, có nghĩa là thuộc tính tên của đối tượng hàm giữ tên của nó. Nó rất hữu ích khi xem ngăn xếp cuộc gọi: trong việc gỡ lỗi hoặc đọc thông báo lỗi.

```javascript
// Hoisted variable
console.log(hello('Aliens')); // => 'Hello Aliens!'  
// Named function
console.log(hello.name)       // => 'hello'  
// Variable holds the function object
console.log(typeof hello);    // => 'function'  
function hello(name) {  
  return `Hello ${name}!`;
}
``` 

Ở đây hàm được khai báo `hello (name) {...}` tạo một biến `hello` được hoist lên trên cùng của phạm vi hiện tại. Biến hello giữ đối tượng hàm và `hello.name` chứa tên hàm: `'hello'`.

## 1.1 A regular function

Khai báo hàm trùng với trường hợp khi tạo một hàm thông thường (**regular**). Thông thường có nghĩa là bạn khai báo hàm một lần và sau đó gọi nó ở nhiều nơi khác nhau. Ví dụ:

```javascript
function sum(a, b) {  
  return a + b;
}
sum(5, 6);           // => 11  
([3, 7]).reduce(sum) // => 10
```

Bởi vì khai báo hàm tạo một biến trong phạm vi hiện tại, cùng với lệnh gọi hàm thông thường, nó rất hữu ích cho đệ quy hoặc tách biệt các event listeners. Trái với biểu thức hàm hoặc arrow functions không tạo liên kết với biến hàm theo tên của nó.
Ví dụ để tính toán đệ quy giai thừa:

```javascript
function factorial(n) {  
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
factorial(4); // => 24  
```

Trong hàm `factorial()` một cuộc gọi đệ quy đang được thực hiện bằng cách sử dụng biến chứa hàm: `factorial(n - 1)`.
Tất nhiên có thể sử dụng biểu thức hàm và gán nó cho một biến thông thường, ví dụ: `var factorial = function(n) {...}`. Nhưng hàm khai báo hàm `factorial(n)` trông gọn hơn (không cần sử dụng tới var và =).

Một tính chất quan trọng của khai báo hàm là cơ chế hoisting. Nó cho phép sử dụng hàm trước khi khai báo trong cùng phạm vi. Hoisting rất hữu ích trong nhiều trường hợp. Chẳng hạn, khi muốn xem hàm được gọi như thế nào trong phần đầu của tập lệnh mà không cần đọc chi tiết về cách thực hiện hàm.

## 1.2 Difference from function expression

Rất dễ nhầm lẫn giữa khai báo hàm và biểu thức hàm. Chúng trông rất giống nhau, nhưng lại tạo ra các hàm với các thuộc tính khác nhau. Một quy tắc dễ nhớ: khai báo hàm trong câu lệnh luôn bắt đầu bằng hàm từ khóa. Nếu không phải thì nó là một biểu thức hàm. Ví dụ sau đây là một khai báo hàm trong đó câu lệnh bắt đầu bằng từ khóa hàm:

```javascript
// Function declaration: starts with "function"
function isNil(value) {  
  return value == null;
}
```

Trong trường hợp biểu thức hàm, câu lệnh JavaScript không bắt đầu bằng từ khóa hàm (nó xuất hiện ở đâu đó ở giữa mã câu lệnh):

```javascript
// Function expression: starts with "var"
var isTruthy = function(value) {  
  return !!value;
};
// Function expression: an argument for .filter()
var numbers = ([1, false, 5]).filter(function(item) {  
  return typeof item === 'number';
});
// Function expression (IIFE): starts with "("
(function messageFunction(message) {
  return message + ' World!';
})('Hello');
```

## 1.3 Function declaration in conditionals

Một số môi trường JavaScript có thể đưa ra lỗi tham chiếu khi gọi một hàm có khai báo xuất hiện trong các khối {...} của các câu lệnh if, for hoặc while. Giờ chúng ta hãy bật strict mode và xem điều gì sẽ xảy ra khi một hàm được khai báo trong một khối điều kiện:

```javascript
(function() {
  'use strict';
  if (true) {
    function ok() {
      return 'true ok';
    }
  } else {
    function ok() {
      return 'false ok';
    }
  }
  console.log(typeof ok === 'undefined'); // => true
  console.log(ok()); // Throws "ReferenceError: ok is not defined"
})();
```

Khi gọi ok (), JavaScript sẽ báo lỗi ReferenceError: ok is not defined, vì khai báo hàm nằm trong một khối có điều kiện. Lưu ý rằng trường hợp này hoạt động tốt trong non-strict mode, khiến nó càng khó hiểu hơn. Như một quy tắc chung cho các tình huống này, khi một hàm nên được tạo dựa trên một số điều kiện - sử dụng biểu thức hàm.

```javascript
(function() {
  'use strict';
  var ok;
  if (true) {
    ok = function() {
      return 'true ok';
    };
  } else {
    ok = function() {
      return 'false ok';
    };
  }
  console.log(typeof ok === 'function'); // => true
  console.log(ok()); // => 'true ok'
})();
```

Bởi vì hàm là một đối tượng thông thường, nên việc gán nó cho một biến tùy thuộc vào một điều kiện là tốt. Gọi ok () hoạt động tốt và không trả về bất kỳ lỗi nào.

# 2. Function expression

Biểu thức hàm được xác định bởi một từ khóa hàm, theo sau là tên hàm tùy chọn, danh sách các tham số trong một cặp dấu ngoặc đơn (para1, ..., paramN) và một cặp dấu ngoặc nhọn {...} phân định phần thân hàm. Một số ví dụ sử dụng biểu thức hàm:

```javascript
var count = function(array) { // Function expression  
  return array.length;
}
var methods = {  
  numbers: [1, 5, 8],
  sum: function() { // Function expression
    return this.numbers.reduce(function(acc, num) { // func. expression
      return acc + num;
    });
  }
}
count([5, 7, 8]); // => 3  
methods.sum();    // => 14
```  

Biểu thức hàm tạo một đối tượng hàm có thể được sử dụng trong các tình huống khác nhau: 
* Được gán cho một biến dưới dạng đối tượng `Count = function (...) {...} `
* Tạo một phương thức trên một đối tượng sum: `function () {... } `
* Sử dụng hàm dưới dạng gọi lại `.reduce (function (...) {...}) `

Hầu hết các nhà phát triển sẽ xử lý loại khai báo hàm này cùng với hàm mũi tên.

## 2.1 Named function expression

Hàm là ẩn danh khi nó không có tên (thuộc tính name là một chuỗi rỗng):

```javascript
var getType = function(variable) {  
  return typeof variable;
};
getType.name // => ''  
```

`getType()` là một hàm ẩn danh và `getType.name` là ''. 

Khi biểu thức có tên được chỉ định, đây là biểu thức hàm được đặt tên. Nó có một số thuộc tính bổ sung so với biểu thức hàm đơn giản: 
* Hàm được đặt tên được tạo, tức là thuộc tính name giữ tên hàm 
* Bên trong thân hàm một biến có cùng tên giữ đối tượng hàm 

Cũng sử dụng lại ví dụ ở trên, nhưng lần này chúng ta sẽ chỉ định một cái tên trong biểu thức hàm:

```javascript
var getType = function funName(variable) {  
  console.log(typeof funName === 'function'); // => true
  return typeof variable;
}
console.log(getType(3));                    // => 'number'  
console.log(getType.name);                  // => 'funName'  
console.log(typeof funName === 'function'); // => false 
```

`function funName (var) {...}` là một biểu thức hàm được đặt tên. Biến funName có thể truy cập trong phạm vi chức năng, nhưng không phải bên ngoài. Tên của đối tượng hàm: funName.

## 2.2 Favor named function expression

Khi một phép gán biến được sử dụng với biểu thức hàm `var fun = function () {}`, nhiều engine có thể suy ra tên hàm từ biến này. Các callback thường được truyền dưới dạng biểu thức hàm ẩn danh, không lưu trữ vào các biến: vì vậy engine không thể xác định tên của nó.

Trong nhiều tình huống có vẻ hợp lý khi sử dụng các hàm được đặt tên và tránh các hàm ẩn danh. Điều này mang lại một loạt lợi ích:

* Các thông báo lỗi và stack callbacks hiển thị thông tin chi tiết hơn khi sử dụng tên hàm
* Debug dễ hơn bằng cách giảm số lượng stack anonoymous
* Tên hàm giúp hiểu nhanh những gì hàm đó sẽ làm
* Có thể truy cập chức năng theo tên trong phạm vi của nó cho các callback đệ quy hoặc tách event listener

# 3. Shorthand method definition

Định nghĩa phương thức rút gọn có thể được sử dụng trong khai báo phương thức trên các đối tượng bằng chữ và các lớp ES6. Chúng ta có thể xác định chúng bằng tên hàm, theo sau là danh sách các tham số trong một cặp dấu ngoặc đơn (para1, ..., paramN) và một cặp dấu ngoặc nhọn {...} để phân định các câu lệnh cơ thể. Ví dụ sau sử dụng định nghĩa phương thức tốc ký trong một đối tượng bằng chữ:

```javascript
var collection = {  
  items: [],
  add(...items) {
    this.items.push(...items);
  },
  get(index) {
    return this.items[index];
  }
};
collection.add('C', 'Java', 'PHP');  
collection.get(1) // => 'Java'  
```

Phương thức `add ()` và `get ()` trong đối tượng bộ sưu tập được định nghĩa bằng định nghĩa phương thức rút gọn. Các phương thức này được gọi như bình thường: `Collection.add (...)` và `Collection.get (...)`. Cách tiếp cận ngắn của định nghĩa phương thức có một số lợi ích so với định nghĩa thuộc tính truyền thống với tên, dấu hai chấm: và biểu thức hàm add: `function (...) {...}`: Một cú pháp ngắn dễ đọc và viết định nghĩa phương thức rút gọn hơn chức năng được đặt tên, trái với một biểu thức chức năng. Nó rất hữu ích để debug. Lưu ý rằng cú pháp lớp yêu cầu khai báo phương thức ở dạng ngắn:

```javascript
class Star {  
  constructor(name) {
    this.name = name;
  }
  getMessage(message) {
    return this.name + message;
  }
}
var sun = new Star('Sun');  
sun.getMessage(' is shining') // => 'Sun is shining'  
```

## 3.1 Computed property names and methods

ECMAScript 6 thêm một tính năng hay: tên thuộc tính được tính trong các đối tượng và các lớp đối tượng. Các thuộc tính được sử dụng một cú pháp khác nhau `[methodName] () {...}`, vì vậy định nghĩa phương thức trông như thế này:

```javascript
var addMethod = 'add',  
  getMethod = 'get';
var collection = {  
  items: [],
  [addMethod](...items) {
    this.items.push(...items);
  },
  [getMethod](index) {
    return this.items[index];
  }
};
collection[addMethod]('C', 'Java', 'PHP');  
collection[getMethod](1) // => 'Java'  
```

`[addMethod] (...) {...}` và `[getMethod] (...) {...}` là các khai báo phương thức rút gọn với tên thuộc tính được tính toán.

# 4. Arrow function

Hàm mũi tên (**Arrow function**) được xác định bằng cặp dấu ngoặc đơn chứa danh sách các tham số (param1, param2, ..., paramN), theo sau là mũi tên => và cặp dấu ngoặc nhọn {...} phân định thân hàm với các câu lệnh. Khi hàm mũi tên chỉ có một tham số, cặp dấu ngoặc đơn có thể được bỏ qua. Khi nó chứa một câu lệnh đơn, các dấu ngoặc nhọn cũng có thể được bỏ qua. Ví dụ sau đây cho thấy chức năng sử dụng cơ bản của hàm mũi tên:

```javascript
var absValue = (number) => {  
  if (number < 0) {
    return -number;
  }
  return number;
}
absValue(-10); // => 10  
absValue(5);   // => 5  
```

absValue là một hàm mũi tên tính giá trị tuyệt đối của một số. 
Hàm được khai báo bằng mũi tên có các thuộc tính sau: 
* Hàm mũi tên không tạo bối cảnh thực thi riêng của nó
* Hàm mũi tên là ẩn danh: Tên là một chuỗi rỗng (trái với khai báo hàm có tên) 
* Đối tượng không có sẵn trong hàm mũi tên (trái với các kiểu khai báo khác cung cấp đối tượng đối số)

## 4.1 Context transparency

Từ khóa this là một trong những khía cạnh khó hiểu nhất của JavaScript. ECMAScript 6 cải thiện việc sử dụng này bằng cách giới thiệu chức năng mũi tên, lấy bối cảnh theo từ vựng. Từ bây giờ không cần thiết phải sử dụng .bind (cái này) hoặc lưu trữ bối cảnh var self = this khi một hàm cần bối cảnh kèm theo. Chúng ta hãy xem làm thế nào điều này được kế thừa từ chức năng bên ngoài:

```javascript
class Numbers {  
  constructor(array) {
    this.array = array;
  }
  addNumber(number) {
    if (number !== undefined) {
       this.array.push(number);
    } 
    return (number) => { 
      console.log(this === numbersObject); // => true
      this.array.push(number);
    };
  }
}
var numbersObject = new Numbers([]);  
numbersObject.addNumber(1);  
var addMethod = numbersObject.addNumber();  
addMethod(5);  
console.log(numbersObject.array); // => [1, 5]  
```

Lớp Number chứa một mảng các số và cung cấp một phương thức `addNumber ()` để chèn các số mới. Khi `addNumber ()` được gọi mà không có đối số, một closure được trả về cho phép chèn số. Closure này là một hàm mũi tên có ví dụ như numberObject, vì bối cảnh được lấy từ vựng từ phương thức `addNumbers ()`. Không có chức năng mũi tên thì việc tự sửa lỗi bối cảnh là cần thiết. Nó có nghĩa là thêm các bản sửa bằng cách sử dụng phương thức .bind ():

```javascript
//...
    return function(number) { 
      console.log(this === numbersObject); // => true
      this.array.push(number);
    }.bind(this);
//...
```

hoặc lưu trữ bối cảnh vào một biến var self = this:

```javascript
//...
    var self = this;
    return function(number) { 
      console.log(self === numbersObject); // => true
      self.array.push(number);
    };
//...
```

## 4.2 Short callbacks

Khi tạo một hàm mũi tên, các cặp dấu ngoặc đơn và dấu ngoặc nhọn là tùy chọn cho một tham số đơn và một câu lệnh cơ thể. Điều này giúp tạo ra các hàm gọi lại rất ngắn. Hãy tạo một hàm tìm nếu một mảng có 0 phần tử:

```javascript
var numbers = [1, 5, 10, 0];  
numbers.some(item => item === 0); // => true  
```

**item => item === 0** là một hàm mũi tên trông đơn giản. Đôi khi các hàm mũi tên ngắn lồng nhau rất khó đọc. Vì vậy, cách thuận tiện nhất để sử dụng biểu mẫu ngắn là một hàm gọi lại duy nhất (không có hàm lồng nhau). Nếu cần thiết, trong các hàm lồng nhau, các dấu ngoặc nhọn tùy chọn có thể được khôi phục để tăng khả năng đọc.