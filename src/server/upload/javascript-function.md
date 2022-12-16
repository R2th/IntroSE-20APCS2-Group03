## JavaScript series

Chương hôm nay giới thiệu về function trong JavaScript, thứ tưởng đơn giản nhưng không đơn giản tí nào.

Bài viết này là một phần của series [JavaScript dành cho người không mới](https://viblo.asia/s/javascript-danh-cho-nguoi-khong-moi-yEZkg8LgZQ0), giúp các bạn đã có kinh nghiệm code trong các ngôn ngữ khác nhanh chóng làm quen với JS.

Nếu được rất mong nhận được sự ủng hộ và đóng góp ý kiến của mọi người để hoàn thiện series.

## A. Function overview

### 1. Overview

Function (hàm) là một nhóm các câu lệnh có liên quan, được gom lại với nhau, được đặt tên và thực hiện một công việc gì đó. Sử dụng hàm giúp mã hạn chế bị trùng lặp, tăng tính tái sử dụng và tổ chức source code tốt hơn.

Function có hai phần:

* Phần khai báo (declaration) hay còn gọi là định nghĩa (definition)
* Phần gọi hàm (call hoặc invoke)

Function có thể nằm riêng lẻ, hoặc thuộc về một function hay object nào đó (function bên trong object gọi là method - phương thức).

**Function definition**

Cú pháp cơ bản định nghĩa một hàm.

```script.js
function func_name(param1, param2,...) {
    ...
}
```

Một định nghĩa function gồm có từ khóa function, tên function, theo sau là danh sách tham số (parameter - viết tắt param) trong cặp ngoặc tròn. Cuối cùng là thân hàm gồm các câu lệnh trong cặp {}.

**Function calling (invoking)**

Hàm có thể chạy bằng cách gọi hàm (call - invoke) hoặc để hàm tự động chạy (self invoking). Hàm tự động chạy sẽ được bàn sau.

Hàm có thể dùng riêng lẻ như một statement, hoặc dùng trong một biểu thức (khi này hàm nên return giá trị nào đó).

```script.js
function sum(a, b) { return a + b; }
sum(10, 5);  // As a statement
let c = sum(10, 5);  // In expression
```

Khi gọi hàm, cần truyền cho nó một số lượng đối số. Các đối số này đi vào hàm và được chuyển vào các param tương ứng. Trong JS không bắt buộc, và cũng không kiểm tra truyền đối số có đầy đủ hay không, do đó bạn có thể truyền thiếu, thừa đối số cũng không sao. Các param bị thiếu thì sẽ có value là undefined, hoặc default value nếu có.

Chú ý, khi gọi hàm cần có ngoặc (), dù có truyền đối số hay không. Ví dụ như sau.

```script.js
sum();  // Ok
sum;  // Không có lỗi, nhưng hàm sum không được chạy
```

Nếu bạn chỉ ghi `sum` mà không phải là `sum()`, thì thay vì chạy hàm, nó sẽ trả về chính hàm đó. Khi đưa output ra ngoài, thì nó sẽ return toàn bộ code của hàm.

**Return a value**

Khi gặp lệnh return, hàm sẽ thoát và trả về giá trị nếu có. Các lệnh còn lại sẽ không được thực hiện (ngoại trừ một số trường hợp như finally block).

```script.js
function ABC() {
    return 10;  // ABC() = 10
    return;  // ABC() = undefined
}
```

**Function hoisting**

Function được hoisting (kéo lên), tương tự các biến khai báo với var. Kĩ thuật hoisting đã được nói tới trong các chương trước, nên không bàn nhiều ở đây.

```script.js
let c = sum(10, 5);  // Sử dụng trước
function sum(a, b) { return a + b; }  // Khai báo sau
```

### 2. Function & events

HTML event là những sự kiện xảy ra đối với element cụ thể, ví dụ như click vào button thì sự kiện onclick của button đó được gọi,... Tên event toàn bộ là chữ thường, và có dạng một thuộc tính của tag.

**JS inline**

Bên trong thuộc tính event của tag, có thể chứa những đoạn mã JS.

```index.html
<button onclick="alert('Hello');">Click me</button>
```

Khi event cụ thể được fire, thì code trong event đó được chạy. Vì code JS thường dài, nếu đặt hết vào thuộc tính event sẽ rắc rối, nên cách tốt nhất là dùng event để gọi một function đã định nghĩa từ trước.

```script.js
function hello() {
    alert("Hello");
}
```

```index.html
<script src="script.js"></script>
...
<button onclick="hello();">Click me</button>
```

Về các event, các bạn sẽ được tìm hiểu trong chương DOM.

**This keyword**

Để biết được element nào nhận được event, thì sử dụng từ khóa this. This trong một thuộc tính event mang ý nghĩa là element nhận được thuộc tính đó.

```index.html
<button onclick="this.innerHTML = 'Clicked'">Click me</button>
```

Thuộc tính `innerHTML` cơ bản dùng để thay đổi nội dung của element thôi.

Chú ý, khi gọi hàm trong event, thì this không sử dụng được trong hàm. Ví dụ như sau sẽ không chạy.

```script.js
function change() {
    this.innerHTML = "Clicked";
        // This ở đây mang ý nghĩa khác
        // Không còn là element được nhận event nữa
        // Nên code không hoạt động
}
```

```index.html
<script src="script.js"></script>
...
<button onclick="change();">Click me</button>
```

Giải pháp cho vấn đề này là truyền đối tượng this cho hàm `change()` như là một tham số. Code sửa lại như sau.

```script.js
function change(element) {
    element.innerHTML = "Clicked";
        // This ở đây mang ý nghĩa khác
        // Không còn là element được nhận event nữa
        // Nên code không hoạt động
}
```

```index.html
<script src="script.js"></script>
...
<button onclick="change(this);">Click me</button>
```

Event sẽ truyền this thành một tham số tên là `element`. Khi vào function thì sử dụng tham số này thay vì this, nên kết quả code chạy tốt.

### 3. This keyword

Từ khóa this trong JS thực sự có nhiều ý nghĩa, nhưng cũng dễ để nắm bắt được.

* Trong thuộc tính HTML event: this là element nhận được event
* Trong function: this là chủ sở hữu (owner) của function. Nếu function là method, nghĩa là thuộc object nào đó, thì this là object. Nếu function đứng riêng lẻ, thì this là object window (function riêng lẻ thì luôn thuộc object window).
* Trong function, khi gọi bằng call, apply: This là object truyền vào function dạng tham số ẩn (sẽ được trình bày trong phần sau).
* Trong strict mode: this trong function bị cấm (có giá trị undefined).

## B. Definition & invocation

### 1. Function definition (advanced)

**Function expression**

Ngoài cách khai báo (declare) hoặc định nghĩa (define) function bình thường như sau.

```script.js
function sum(a, b) { return a + b; }
```

Còn có cách viết khác là dùng function dạng biểu thức (expression). Biểu thức function có thể gán vào một biến, và biến này sẽ có kiểu function.

```script.js
let s1 = sum;
let s2 = function (a, b) { return a + b; };
```

Chú ý dòng 2, biểu thức gán cho biến `s2` có dạng một anonymous function (hảm ẩn danh) là một function không có tên. Và sử dụng function trên tương tự như function bình thường.

```script.js
let x = s1(10, 5);  // x = 15
let y = s2(2, 3);  // y = 5
```

Function expression không được hoisting, vì bản thân nó là một value (vế phải dấu bằng), nên không được hosting. Thực ra biến vẫn được hoisting, nhưng chỉ là không dùng được như function (value là undefined), nên coi như nó không được hoisting.

**Function constructor**

Cách khác nữa để tạo hàm là dùng Function constructor.

```script.js
let sum = new Function("a", "b", "return a + b");
let x = sum(10, 5);  // x = 15
```

Function constructor nhận vào nhiều tham số, trong đó tham số cuối là code body của function.

Không nên dùng function constructor, vì code rối rắm và không an toàn.

### 2. Parameters & arguments

**Parameters & arguments**

Tham số (parameter - param) là những biến trong cặp () của function, đại diện cho những đối số được truyền vào trong hàm. Các param được coi như các biến cục bộ trong hàm, và bị hủy khi hàm thực hiện xong.

Đối số (argument) là những biến, giá trị thực sự được truyền vào hàm. Các đối số được chuyển vào bên trong hàm, biến thành các tham số theo đúng thứ tự.

```script.js
function sum(a, b) {
    // a, b is params
    return a + b;
}
let x = 5;
let y = sum(10, x);  // 10, x is arguments
let z = sum(y + 1, x * 2);  // y + 1, x * 2 is arguments
```

Người ta nhắc tới tham số khi ở bên trong định nghĩa hàm, và gọi là đối số khi gọi hàm. Và param phải là biến (biến object, biến function cũng là biến), trong khi đối số có thể là bất cứ thứ gì có giá trị, như số, biến, hằng, biểu thức, hàm,...

**Parameter rules**

JS không định kiểu cho tham số, và cũng không kiểm tra số lượng đối số truyền vào. Do đó, số argument truyền cho hàm có thể nhiều hơn, hoặc ít hơn số lượng param cần có. Những param không nhận được argument (do truyền bị thiếu) thì sẽ có value là undefined.

```script.js
function test(a, b) {
    console.log(a, b);  // a = 10, b = undefined
}
test(10);
```

ES6 (ECMAScript 2015) cho phép function có default value cho param. Khi truyền không đủ đối số, thì những param bị thiếu thay vì có value là undefined, thì nó sẽ sử dụng default value.

```script.js
function test(a, b = 100, c) {
    console.log(a, b, c);  // a = 10, b = 100, c = undefined
}
test(10);
```

Trong đoạn code trên, số 10 truyền cho `a`, `b` không nhận được đối số nào, nhưng vì `b` có default value nên giá trị lúc này của nó chính là default value 100. Còn `c` thì không có đối số, cũng không có default value nên nó mang giá trị undefined.

**Argument passing**

Đây là khái niệm cực quan trọng khi học về hàm, trong mọi ngôn ngữ lập trình.

Trong JS, nếu đối số là kiểu primitive thì được truyền pass by value (theo giá trị). Một bản sao của argument được tạo ra và đưa vào param, mọi thao tác trong hàm đều thực hiện trên bản sao nên dữ liệu gốc không bị ảnh hưởng (khi hàm thực hiện xong).

Đối với đối số object, thì truyền kiểu pass by reference (tham chiếu). Thực ra vẫn là pass by value, nhưng value ở đây là tham chiếu tới địa chỉ bộ nhớ, nên các thay đổi trên tham chiếu thì cũng ảnh hưởng tới dữ liệu gốc.

### 3. Function invocation

**Invoking a function**

Để gọi (call - invoke) một function, gọi tên nó và truyền cho nó danh sách các đối số. Số lượng đối số không cần thiết phải tương ứng với tham số.

```script.js
let x = sum(10, 5);  // Hàm sum() đã định nghĩa phía trên
```

Nếu function thuộc về một object, thì function gọi là method (phương thức). Gọi method tương tự gọi hàm, nhưng phải có tên object và dấu chấm phía trước.

```script.js
let obj = {
    sum(a, b) { return a + b; }
}
let x = obj.sum(10, 5);
```

Thực ra mọi function trong JS đều là method, các function không thuộc object nào thực ra thuộc về object window. Do đó, ví dụ đầu tiên có thể viết lại như sau, cũng cho kết quả tương tự.

```script.js
let x = window.sum(10, 5);
```

Khi function thuộc object, chúng ta gọi object là owner (chủ sở hữu) của function đó.

**Call function as a constructor**

Có thể gọi hàm với từ khóa new, lúc này function được coi như là một constructor. Constructor thường dùng để khởi tạo một object mới.

```script.js
function createName(fname, lname) {
    this.firstName = fname;
    this.lastName = lname;
}
let myName = new createName("Vu", "Tong");
```

This trong trường hợp này không phải đối tượng window, mà là object mới được tạo ra nhờ từ khóa new. Object này sẽ được gán tham chiếu tới biến `myName`, do đó `myName` là một object. Tuy nhiên, this lúc này không có giá trị (rỗng), và giá trị được thêm vào this sẽ dùng để tạo object mới.

Vấn đề này sẽ được bàn kĩ hơn trong chương object.

**Self invoking function (IIFE)**

Một hàm có thể được tự động gọi mà không cần lời gọi hàm, chúng có tên là self invoking function, hoặc IIFE (Immediately invoke function expression).

```script.js
let hello1 = function () { alert("Hello"); }();
(function hello2() { alert("Hello"); })();
```

Chú ý hai dòng trên, chúng ta có 2 cách để làm một function thành self invoking:

* Cách 1 đối với function expression: chỉ cần thêm một cặp ngoặc () phía cuối của nó là được.
* Cách 2 đối với function bình thường: vì đây chỉ là định nghĩa, nên cần bọc lại toàn bộ bằng (), sau đó mới thêm cặp () ở cuối.

Self invoking function tự động chạy khi được định nghĩa.

## C. Function features

### 1. Anonymous function

Anonymous function (hàm ẩn danh) là một hàm không có tên, đơn giản vậy thôi.

```script.js
let x = function () { ... };
```

Hàm ẩn danh thường được dùng trong function expression, để viết nhanh một hàm chỉ dùng một lần. Anonymous function cũng được sử dụng làm callback, truyền dưới dạng tham số cho một hàm khác và được chính hàm đó gọi lại (call back) sau một khoảng thời gian làm gì đó :). Ngoài ra nó còn được dùng trong closure hoặc cho self invoking function.

### 2. Function object

Function cũng là một object trong JS, cũng có những thuộc tính (property) và phương thức (method). Chúng ta chỉ quan tâm tới hai đối tượng cơ bản nhất.

**Method toString()**

Dùng chuyển một function thành string, nghĩa là show toàn bộ code của function đó.

```script.js
function abc() { ... }
let code = abc.toString();
```

**Arguments object**

Bên trong mỗi function có một object ẩn là `arguments`. Nó giống như một mảng các đối số được truyền vào, có thuộc tính `length` để lấy độ dài. Chú ý arguments khác với các giá trị mà param nhận được, nó là các giá trị thực sự được truyền vào.

### 3. Arrow function

Arrow function (hàm mũi tên) là một cách viết khác ngắn gọn hơn cho function, được giới thiệu từ phiên bản ES6. Ví dụ bên dưới, 3 hàm tương tự nhau nhưng có cách viết khác nhau.

```script.js
let sum1 = function (a, b) { return a + b; };
let sum2 = (a, b) => { return a + b; };
let sum3 = (a, b) => a + b;
```

Cách 2 là syntax chuẩn của arrow function, dạng `(param1, param2,...) => { code }`, với dấu `=>` là dấu mũi tên (arrow).

**Rút gọn return**

Cách 3 rút gọn lệnh return. Nếu phần thân function chỉ có một lệnh return, thì có thể rút gọn theo cách bỏ ngoặc {}.

**Rút gọn một lệnh**

Nếu thân function chỉ có một lệnh (không phải return), thì có thể bỏ ngoặc {}.

```script.js
let hello = (name) => alert("Hello, " + name);
```

Chú ý, nếu chỉ có một lệnh nhưng là return, thì phải bỏ return như cách 3 ở trên. Nếu để return luôn sẽ có lỗi.

```script.js
let sum4 = (a, b) => a + b;  // Ok
let sum5 = (a, b) => return a + b;  // Sai 
```

**Rút gọn tham số**

Nếu function có 1 tham số, thì ngoặc () có thể bỏ đi.

```script.js
let negative = a => -a;
```

Nếu không có tham số nào, thì phải giữ lại cặp (), không được bỏ đi.

```script.js
let hello1 = () => alert("Hello");  // Ok
let hello2 = => alert("Hello");  // Sai
```

## D. Call, apply & closure

### 1. Call method

Mỗi function đều có một method với tên `call()`, dùng để truyền một object vào function đó. Khi object vào function được gọi với `call()`, thì object sẽ biến thành đối tượng this. Function sử dụng this, thực chất là sử dụng object được truyền vào.

Ví dụ như đoạn code sau.

```script.js
let PhanSo_Handler = {
    inPhanSo: function() {
        console.log(this.tuSo, "/", this.mauSo);
    }
}
let ps1 = { tuSo: 2, mauSo: 3 };
PhanSo_Hander.inPhanSo.call(ps1);
```

Code trên định nghĩa hai object:

* `PhanSo_Handler` chuyên dùng xử lý phân số, chứa method `inPhanSo` và có thể thêm các method khác. Object này chỉ xử lý phân số, không chứa bất kì dữ liệu nào.
* `ps1` một phân số với `tuSo` và `mauSo`. Object này được truyền cho method `PhanSo_Handler.inPhanSo()` bằng method `call()`. Lúc này, `ps1` đi vào bên trong `inPhanSo`, biến thành `this` và được in ra ngoài console.

Bạn sẽ đặt câu hỏi "tại sao không truyền thẳng object vào method như một param?". Thực ra câu hỏi đó hoàn toàn có lý, và như vậy code chúng ta sẽ trông như sau.

```script.js
let PhanSo_Handler = {
    inPhanSo: function (ps) {
        console.log(ps.tuSo, "/", ps.mauSo);
    }
}
let ps1 = { tuSo: 2, mauSo: 3 };
PhanSo_Handler.inPhanSo(ps1);
```

Hai đoạn code trên tương tự nhau, cho ra kết quả giống nhau.

**Why call?**

Sự khác biệt nằm ở chỗ context của function thay đổi. Khi gọi function với `call()` và một object, thì giống như việc đưa function ấy vào trong object kia. Đối với function là method, thì owner của method bị thay đổi thành object được gọi bởi `call()`. Ví dụ như code trên thực ra như sau.

```script.js
let ps1 = {
    tuSo: 2,
    mauSo: 3,
    inPhanSo: function () {  // Được đưa vào object được call() gọi
        console.log(this.tuSo, "/", this.mauSo);
    }
}
ps1.inPhanSo();
// The same with PhanSo_Handler.inPhanSo.call(ps1);
```

Nói chung phần này hơi trừu tượng, và thực tế không dùng nhiều như cách truyền object như param.

**Call and params**

Function được gọi với `call()` có thể có thêm các param khác.

```script.js
let PhanSo_Handler = {
    inPhanSo: function (tenPs) {
        console.log(tenPs, ": ", this.tuSo, "/", this.mauSo);
    }
}
let ps1 = { tuSo: 2, mauSo: 3 }
PhanSo_Handler.inPhanSo.call(ps1, "Phan so test");
```

Lúc này khi gọi `call()` thì truyền đúng theo param, nhưng đối số đầu tiên phải là object truyền vào. Các đối số thứ 2 sẽ thành param 1, đối 3 thành tham 2,... cứ như vậy. Nghĩa là đối số đầu tiên bị mất và trở thành `this` trong function.

Như trên code trên, thì khi gọi `call()` đối số `ps1` thành `this` trong function `inPhanSo()`, đối số chuỗi thứ 2 "Phan so test" được truyền vào tham số `tenPS` thứ nhất.

### 2. Apply method

Method `apply()` tương tự như `call()`, nhưng sự khác biệt ở chỗ các tham số bổ sung được truyền dưới dạng mảng.

```script.js
...
PhanSo_Handler.inPhanSo.apply(ps1, ["Phan so test"]);
```

Function được `apply()` vẫn giữ nguyên các tham số riêng lẻ, nhưng khi gọi với `apply()` như trên thì truyền vào là mảng. Từng phần tử của mảng này sẽ pass vào từng tham số tương ứng cho phù hợp.

ES6 cung cấp một cách khác là spread operator khá giống `apply()`, nhưng chưa phổ biến lắm.

Sử dụng `apply()` rất tiện khi các đối truyền vào có dạng mảng, sẽ dễ hơn trong các thao tác.

### 3. Call, apply in strict mode

Bình thường, nếu gọi `call()` hoặc `apply()` với đối số đầu tiên không phải object, hoặc không truyền đối objec, thì khi vào function được gọi `this` sẽ là đối tượng window.

Nhưng trong strict mode, điều này bị cấm. Khi dùng `call()` hoặc `apply()`, đối số đầu tiên bắt buộc phải là object, và không được bỏ qua.

## E. Closure

### 1. Overview

Closure là một trong những khái niệm trừu tượng nhất trong JS, và rất khó để hiểu được và định nghĩa chính xác nó là gì.

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function.
> 

Theo định nghĩa của [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) về closure, thì có thể hiểu như sau (tạm dịch).

> Closure là kết hợp của một function được gói lại và tham chiếu tới môi trường xung quanh (nơi chứa function đó, nơi nó được tạo ra).

Có vẻ khái niệm closure vẫn còn khá trừu tượng, nhưng đừng lo. Hãy đi vào các đoạn code ví dụ để hiểu hơn.

```script.js
// global members
function outer() {
    // outer members
    return function inner() {
        // inner members
    }
}
```

Bên trên là cấu trúc cơ bản của một closure. Theo định nghĩa phía trên, chúng ta áp dụng vào code để hiểu rõ hơn.

Ở đây function `inner()` được gói lại bên trong function `outer()`. Function `inner()` này, tương tự function khác, có thể truy cập vào các `inner members` (biến cục bộ của chính nó), hoặc `global members` (biến toàn cục của chương trình). Điểm đặc biệt là `inner()` cũng có thể truy cập vào `outer member`, vì nó giữ tham chiếu tới function `outer`, là nơi nó được tạo ra.

**Closure & scopes**

Khi nhắc tới closure phải nhắc tới scope. Như phân tích ở trên, function bình thường chỉ có hai scope, nhưng closure tạo ra tới 3 scope. Chính scope mới này tạo nên các tính chất đặc biệt của closure.

**Đặc điểm closure**

Một closure có hai đặc điểm sau:

* Lưu trữ value của biến qua nhiều lần chạy: đặc điểm này giống với global var. Nghĩa là khi chạy function nhiều lần, thì giá trị lần trước của function vẫn giữ như vậy, không bị mất đi.
* Chỉ cho phép truy cập nội bộ: đặc điểm này giống local var. Đối với closure, chỉ cho phép những thành viên nội bộ của nó mới có thể truy cập vào được.

### 2. Cấu trúc một closure

Closure có cấu trúc gồm 2 phần:

* Phần định nghĩa closure: là một function return một function con bên trong nó.
* Phần sử dụng closure: Function trên được tự động chạy 1 lần đầu tiên để khởi tạo giá trị (bằng self invoking hoặc function expression).

Ví dụ như sau là một closure đầy đủ nhất.

```script.js
function outer() {
    let count = 0;
    function inner() {
        count++;
        console.log(count);
    }
    return inner;  // Return một function
}
let ot = outer();
    // Chạy 1 lần đầu tiên bằng function expression
    // Hoặc biến cả function outer ở trên thành self invoking
    // cũng được kết quả tương tự
ot();  // 1
ot();  // 2
ot();  // 3 
```

Câu đố dành cho bạn đây. Hàm `outer()` phía trên được gọi mấy lần?

Nếu câu trả lời là 3, hoặc 4 lần thì bạn nhầm rồi. Hàm `outer()` chỉ được gọi duy nhất một lần ở câu lệnh let, trong function expression có dấu () nghĩa là chạy `outer()` một lần.

Bạn sẽ bảo "chạy `ot()` cũng giống như chạy `outer()` vì được gán vào rồi". Vâng, nhưng thứ gán vào biến `ot` ở đây không phải bản thân `outer()`, mà là cái function "bé bé xinh xinh" được `outer()` return ra đấy. Chính là thằng ml :upside_down_face: `inner()` đấy.

Để tớ phân tích kĩ hơn câu lệnh `let ot = outer()`. Đầu tiên, `outer()` sẽ chạy trước vì có self invoking (). Kết quả `outer()` trả về tham chiếu của thằng `inner()`. Biến `ot` phải nhận tham chiếu này, và kể từ đó `ot()` là `inner()`.

Code trên nên viết lại với những comment như sau cho dễ hiểu.

```script.js
let ot = outer();
    // Gọi outer() 1 lần duy nhất
    // và kể từ đây, ot() = inner()
    // do outer return inner() thì ot phải nhận thôi
ot();  // inner();
ot();  // inner();
ot();  // inner();
```

Yeah, đó chính là cách hoạt động của closure.

**Question 1**

Câu hỏi đầu tiên được đặt ra ở đây là "code trên liên quan vẹo gì tới closure?".

Hãy nhớ lại đặc điểm scope của một closure:

* Lưu trữ giá trị biến qua nhiều lần chạy.
* Chỉ cho phép truy cập nội bộ trong closure.

Rồi, bây giờ quay lại code phía trên. Để thực hiện 2 đặc điểm trên, đơn giản chỉ cần khai báo biến bên trong `outer()`.

```script.js
function outer() {
    let count = 0;  // Here
    function inner() {
        ...
    }
    return inner;
}
```

Như trên đã phân tích, thì `outer()` chỉ chạy 1 lần. Mục đích lần chạy duy nhất này là khởi tạo giá trị cho biến `count`. Và các lần gọi tiếp theo thì không phải gọi `outer()` mà trở thành gọi `inner()`.

Function `inner()` cùng cấp với biến `count` do đó chúng có thể truy cập lẫn nhau. Và bắt đầu ở đây, hai đặc điểm của closure được thực thi.

Đặc điểm 1: `inner()` có thể chạy nhiều lần, nhưng giá trị của `count` vẫn giữ lại, vì JS chỉ xóa những gì khai báo trong `inner()` khi nó chạy xong, `count` khai báo bên ngoài nên không bị xóa khi `inner()` chạy xong.

Đặc điểm 2: `inner()` và `count` cùng thuộc trong `outer()`, là local var của `outer()` nên các đối tượng bên ngoài không truy cập được. Nghĩa là chỉ trong `outer()`, đồng nghĩa chỉ các member của closure mới có thể truy cập lẫn nhau.

Đấy, bắt đầu thấy liên quan chưa.

**Question 2**

Câu hỏi thứ 2 liên quan tới câu hỏi 1 mà các bạn có thể nghĩ đến, là "làm sao biến trong outer có thể được giữ lại khi outer chỉ thực hiện một lần rồi thôi?"

Thực ra `outer()` chưa bao giờ bị dừng lại cả, do đó các biến khai báo trong function `outer()` vẫn giữ được giá trị, không bị xóa đi. Chỉ tới khi `inner()` hoặc `ot()` không còn dùng nữa thì JS mới loại bỏ luôn `outer()`.

Có thể hiểu như nếu còn `inner()` thì `outer()` đang trong trạng thái chờ. Chờ cho tới khi không còn dùng tới `inner()` nữa thì `outer()` mới kết thúc.

Nếu đi sâu vào thêm nữa thì nó liên quan tới cách JS thực hiện các function trong execution context, rồi call stack đủ thứ nên thôi dừng lại ở đây.

### 3. Rút gọn closure

Closure như ví dụ trên vẫn khá dài, nên được rút gọn lại như sau.

```script.js
function outer() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    }
}
...
```

Phiên bản đầu tiên rút gọn đi hàm `inner()` mà trực tiếp return một hàm ẩn danh luôn, đỡ phải viết nhiều.

Tiếp theo, chúng ta thay vì viết hàm `outer()` như bình thường (dạng `function outer() {}`) thì đổi lại viết dạng function expression và cho nó tự chạy (self invoking) luôn.

```script.js
let outer = function() {  // Function expression
    let count = 0;
    return function() {
        count++;
        console.log(count);
    }
}();  // Self invoking
outer();  // 1
outer();  // 2
outer();  // 3
```

### 4. Example

Ví dụ trên về closure của mình có lẽ không rõ nghĩa lắm, tuy có phân tích khá chi tiết nhưng thực sự nó không có nghĩa trong thực tế.

Do đó, mình khuyến khích các bạn tìm hiểu thêm một số ví dụ về closure khác nữa, để nắm rõ hơn về closure vì đây là một khái niệm cực kì quan trọng.