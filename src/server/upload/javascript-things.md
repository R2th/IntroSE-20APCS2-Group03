![](https://images.viblo.asia/268d762b-d606-4355-830a-da8a67f70197.jpg)
Chào mọi người !   
Ngày nay `Javascript` trở nên rất phổ biến, đặc biệt trong việc xử lý các tương tác với client trên các trang web.
Hôm nay chúng ta sẽ cùng tìm hiểu một số thứ "hay ho" của `javascript` nhé

:sneezing_face:


-----
# I. `arguments` và `this`
   Mỗi khi 1 function được thực thi, 2 tham số ẩn được truyền vào: `arguments` và `this`
##    1. `arguments`
Trong `javascript`, số lượng tham số truyền vào khi gọi hàm có thể khác với số lượng tham số (`paramters`) được khai báo của hàm, `arguments` lưu trữ tất cả những tham số được truyền khi gọi hàm:
```javascript
function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}

sum(1, 2, 3, 4, 5);
=> 15
```
Một lưu ý rằng `arguments` là một `alias` tới các `parameters` của hàm. Nếu ta thay đổi giá trị của `arguments`, giá trị của parameters tưởng ứng sẽ thay đổi theo:
```javascript
function func(name, sex) {
    arguments[0] = "SHERLOCK";
    console.log(name, sex);
}

func("HUYNV", "MALE");
=> SHERLOCK MALE
```
Ta có thể tránh việc ghi đè này với `strict mode`:
```java
function func(name, sex) {
    "use strict";
    
    arguments[0] = "SHERLOCK";
    console.log(name, sex);
}

func("HUYNV", "MALE");
=> HUYNV MALE
```
## 2. `this`
Một tham số ẩn được truyền vào nữa, đó là `this`, hay còn được gọi : `function context`

`function context` là khái niệm trong các ngôn ngữ lập trình hướng đối tượng, trong đó, `this` trỏ tới object của class nới chứa method được gọi.

Tuy nhiên trong `javascript`, các `function` được thực thi bằng nhiều cách, và với mỗi cách đó, giá trị của tham số `this` cũng khác nhau


-----
# II. Invoking functions
Trong `javascript`, có 4 cách để thực thi một `function`:
## 1. Invoke as a function
`function` được gọi như `function` (???), đây là cách thức đơn giản nhất để thực thi một `function`

Với trường hợp này, `this` có thể nhận 2 giá trị, một là `window` object (không `strict mode`), hai là `undefined` (có `strict mode`):
```javascript
function coder() {
    return this;
}

coder() === window;
=> true

function coder() {
    "use strict";
    
    return this;
}

coder() === undefined;
=> true
```
## 2. Invoke as a method
`function` có thể được gán cho 1 `property` của object, và được gọi như 1 `method` của object đó

Trường hợp này giống với các ngôn ngữ hướng đối tượng, `this` sẽ trỏ tới object gọi tới `method` đó:
```javascript
var context = function() {
    return this;
}

context() === window;
=> true

var object = {
    getContext: context
}

object.getContext() === object;
=> true
```
## 3. Invoke as a constructor
Thực thi `function` như 1 `constructor function` với từ khóa `new`

Khi 1 `function` được gọi với `new`, 1 object rỗng được truyền vào và `this` sẽ lưu giá trị cho object mới này :
```javascript
function Coder() {};

var coder = new Coder();

coder;
=> Coder {}__proto__: Object
```
Nếu trường hợp `constructor function` trả về một giá trị (?). Với trường hợp này, object được khởi tạo bằng việc Thực thi `function` với từ khóa `new` sẽ nhận giá trị là giá trị trả về nếu đó là 1 object, còn lại các giá trị trả về khác (như số, chuỗi, mảng, ...) thì sẽ nhận giá trị là `this`:
```javascript
obj = {
    name: "OBJECT000"
}

function Coder() {
    return 0;
}

var coder000 = new Coder();

coder000 === obj;
=> false

function Coder() {
    return obj;
}

var coder001 = new Coder();

coder001 == obj;
=> true
```
## 4. Invoke with `call` and `apply`
Từ 3 trường hợp trên ta có thể thấy `function context` (hay `this`) chỉ có thể nhận giá trị là `window` hoặc là object gọi method đó.

Trong nhiều trường hợp, ta muốn `function context` là 1 giá trị theo ý muốn, `javascript` hỗ trợ 2 method `call` và `apply` cho điều này :
```javascript
function setLever(lever) {
    if (lever > 0) {
        this.lever = "Intern";
    } else {
        this.lever = "Open";
    }    
}

var coder001 = {};
var coder002 = {};

setLever.call(coder001, 1);
setLever.call(coder002, 0);

coder001
=> {lever: "Intern"}
coder002
=> {lever: "Open"}
```
Điểm khác nhau giữa `call` và `apply` là các tham số của hàm khi sử dụng `call` được truyền trực tiếp ngay sau object muốn gán, còn đối với `apply` thì các tham số đó phải truyền vào qua các phần tử của một mảng.


-----


# III. `bind`
Nếu đã nói tới `apply` và `call`, chắc hẳn ta đã nghe ở đâu đó về method `bind` trong `javascript`

Điểm khác biệt giữa `bind` với `apply` hay `call` đó là với `apply` hay `call`,  hàm sẽ được thực thi ngay lập tức với `function context` được truyền vào, còn `bind` sẽ tạo ra một `function` mới, với nội dung giống với `function` ban đầu, và context của nó luôn là 1 object được truyền vào trong tham số khi dùng `bind`.

Vì thế mà `bind` thường được sử dụng làm các hàm callback.

Ví dụ dưới đây sẽ xử lý tình huống user click button chọn file, sau đó không chọn file mà lại ấn cancel. Với trường hợp user nhấn cancel này, ta muốn ảnh đã được user chọn trước đó sẽ bị ẩn đi :
```javascript
$(document).on('click', 'input[type="file"]', function(){
    var checkCancelClicked = function(){
      if(this.val() == ''){
        $('.preview-img').addClass('hidden');
        $('.original-img').removeClass('hidden');
        document.body.onfocus = null;
      }
    }
    document.body.onfocus = checkCancelClicked.bind($(this));
  });
```
`checkCancelClicked.bind($(this));` sẽ tạo mới 1 hàm dùng làm callback cho sự kiện focus, với `function context` được gán là `$(this)` chính là `input[type="file"]`.

Một câu hỏi khác, nếu ta không sử dụng `bind` cho `checkCancelClicked` mà chỉ có :
```javascript
 document.body.onfocus = checkCancelClicked;
```
thì giá trị this trong function `checkCancelClicked` là gì ?

-----

# IV. Closure
## 1. Scope
Trong `javascript`:
> `Scope` là khả năng truy cập, sử dụng các biến, hàm, object trong một phần code cụ thể 

`Scope` trong `javascript` có loại : `global scope` và `local scope` . Những biến được định nghĩa trong một function được sẽ nằm trong `local scope`, những biến định nghĩa bên ngoài function nằm trong `global scope`. Mỗi một function khi được  thực thi sẽ tạo ra một scope mới.

### 1.1. Globle scope
Chỉ có duy nhất 1 `global scope` xuyên suốt toàn bộ file `javascript`. Khi bắt đầu viết code, ta đã ở trong `global scope`. Những gì được định nghĩa ở đây có thể được truy cập sử dụng ở mọi scope khác

```javascript
var globalScope = 'GLOBAL SCOPE';
// globleScope có thể truy cập ở mọi nơi

function func() {
    console.log(globalScope); // globleScope có thể truy cập ở mọi nơi
}

func();
=> "GLOBAL SCOPE"
```
### 1.2. Local scope
Các biến được định nghĩa trong function, chỉ có thể sử dụng trong phạm vi local scope của chúng
```javascript
// Global Scope
function someFunction() {
    // Local Scope #1
    function someOtherFunction() {
        // Local Scope #2
    }
}

// Global Scope
function anotherFunction() {
    // Local Scope #3
}
// Global Scope
```
 Block statement: các câu lệnh điều kiện `if`, `switch` hay vòng lặp `for`, `loop` không giống như function (tạo ra scope mới), những biến được định nghĩa trong các block statement vẫn nằm trong scope mà chúng thuộc về trước đó :
```javascript
// Global Scope
if (true) {
    // this 'if' conditional block doesn't create a new scope
    var name = 'Sherlock'; // name is still in the global scope
}

console.log(name);
=> "Sherlock"
```
## 2. Closure

`closure` được định nghĩa :
> `Closure` cho phép 1 function có thể truy cập và sử dụng được các biến ở bên ngoài function đó

```javascript
var outerValue = "samurai";
var later;

function outerFunction(){
    var innerValue = "ninja";

    function innerFunction(){
        console.log(outerValue, innerValue);
    }

    later = innerFunction;
}

outerFunction();

later();
=> samurai, ninja
```
Trong ví dụ trên, khi `later()` được thực thi ở `global scope`, theo lý thuyết ở trên thì nó không thể sử dụng được những biến `local scope` được khai báo trong function, tuy nhiên kết quả lại cho thấy điều ngược lại.

Điều này được thực hiện bởi `closure`, 1 `safe bubble` được tạo ra, chứa toàn bộ các biến, function có trong `scope` tại thời điểm function đó được định nghĩa, và `safe bubble` này tồn tại đến khi nào function còn tồn tại

![](https://images.viblo.asia/c05d8154-2cbb-412e-8d30-64fc32324d43.png)

---

Trên đây là một số tìm hiểu của mình về `javascripts`, cảm ơn mọi người đã đọc bài viết :sneezing_face: