`Javascript Hoisting`, `Hoisting in Javascript` chắc hẳn mỗi người trong chúng ta khi làm việc với `Javascript` đã từng nghe hoặc biết qua về thuật ngữ `Hoisting`. Có rất nhiều chủ đề xoay quanh thuật ngữ `Hoisting` mà đã có rất nhiều bài viết đề cập đến. Mình cũng có tìm hiểu và thấy được một số ví dụ rất hay về `Function Hoisting`. Mình xin phép được chia sẻ cùng mọi người để chúng ta có thể có những cái nhìn khác nhau, biết thêm những tình huống khác nhau về `Hoisting` nói chung và `Function Hoisting` nói riêng. Bắt đầu thôi!

# I. Một chút về `Hoisting`.
`Hoisting` là một thuật ngữ trong `Javascript` dùng để miêu tả cách `Javascript` đưa những khai báo (declaration) biến (variable) và hàm (function) lên đầu đoạn code của chúng ta (có thể là global scope hoặc functional scope). Nói sâu xa hơn là những khai báo biến và hàm được đặt vào trong bộ nhớ trong suốt giai đoạn biên dịch nhưng ở chính xác nơi chúng ta viết lệnh (có nghĩa là `Javascript` không chỉnh sửa code của chúng ta mà nó giống như một cơ chế ưu tiên xử lý định nghĩa hàm và biến hơn).

`Hoisting` được thực thi khi chúng ta khai báo biến (`Variable Hoisting`) bằng cách dùng `var`, `let`, `const` (có một chút khác nhau giữa hoisting `var` và bộ đôi `let`, `const`) và khi chúng ta khai báo hàm (`Function Hoisting`).

Chúng ta sẽ đi bỏ qua phần hoisting khi khai báo biến và đi luôn vào phần hoisting khi khai báo hàm nhé!
# II. Function Hoisting.
`Function Hoisting` hoạt động khi chúng ta khai báo hàm thông qua `Function Declaration` hoặc `Function Expression`. Tiếp theo hãy cùng xem hoisting tác động lên hai kiểu khai báo hàm như thế nào!

`Function Declaration` định nghĩa một hàm với những tham số được chỉ định:
```javascript
function func_name(param1, param2, ...) { [statements] }
```
Trong javascript thì đối với những hàm được khai báo thông qua  `Function Declaration` thì cơ chế hoisting sẽ đưa cả phần khai báo và định nghĩa hàm lên đâu của đoạn code. Điều đó đồng nghĩa với việc `chúng ta có thể sử dụng hàm đó khi trước khi chúng ta khai báo nó`.
```javascript
foo(); // Kết quả in ra ở console sẽ là "The first"

function foo() {
  console.log("The first");
}
```

`Function Expression` được hiểu như là chúng ta có thể dùng từ khóa `function` để khai báo một hàm bên trong một biểu thức (Expression).
```javascript
var func_name = function [func_name](param1, param2, ...) { [statements] }
```
Trong javascript thì cơ chế hoisting sẽ không hoạt động khi chúng ta khai báo hàm thông qua `Function Expression` (nói dễ hiểu hơn là phần định nghĩa hàm sẽ không được đưa lên đầu mà chỉ có phần khai báo `undefined` được đưa lên đầu giống như `Variable Hoisting` vậy). Vì thế mà chúng ta sẽ không thể sử dụng hàm (Function Expression) trước khi định nghĩa nó.
```javascript
console.log(foo); // Kết quả in ra ở console sẽ là "undefined"
// foo(); // (nếu bỏ comment và run) Kết quả in ra sẽ là lỗi "TypeError: foo is not a function"

var foo = function foo() {
  console.log("The first");
}

console.log(foo);
// Kết quả in ra ở console sẽ là
// ƒ foo() {
//   console.log("The first");
// }

foo(); // Kết quả in ra sẽ là "The first"
```
Vậy chúng ta đã có những tìm hiểu cơ bản về `Function Hoisting` rồi, tiếp theo hãy cùng đi đến một số ví dụ tính huống để hiểu rõ hơn.
# III. Một số ví dụ tình huống.
## 1. Function Declaration in functional scope and global scope.
Chúng ta có đoạn code như dưới:
```javascript
var fullName = "John";

function getName() {
  fullName = "Vladimir";
  console.log(fullName); // "Vladimir"
  return;
  
  // Hàm "fullName" được khai báo
  // thông qua Function Declaration ở trong scope của hàm "getName"
  // và sẽ được đưa lên đầu của hàm "getName" cùng với phần định nghĩa hàm
  // Tiếp đến "fullName" sẽ được gán cho một giá trị là "Vladimir"
  // Vì "fullName" đã được khai báo ở đầu scope của hàm "getName"
  // nên biến "fullName" ở global scope sẽ không bị ảnh hưởng bởi lệnh gán
  function fullName() {}
}

getName();

console.log(fullName); // "John"
```
Kết quả chúng ta nhận được ở console sẽ là
```
"Vladimir"
"John"
```
## 2. Function Declaration.
Chúng ta có đoạn code như dưới:
```javascript
function showAge(){
  function getAge() { return "18"; }
  
  return getAge();
  
  // Cả hai hàm "getAge" đều được khai báo thông qua Function Declaration
  // và sẽ được đưa khai báo và định nghĩa lên đầu scope của hàm "showAge"
  // Tuy nhiên hàm "getAge" tra về "17" sẽ được đưa lên sau khi
  // hàm "getAge" trả về "18" được khai báo và định nghĩa
  // Gần giống như lệnh gán vậy
  // hàm "getAge" sẽ nhận phần định nghĩa trả về "17"
  function getAge() { return "17"; }
}

console.log(showAge()); // "17"
```
Kết quả chúng ta nhận được ở console sẽ là `"17"`
## 3. Multiple Declaration.
Chúng ta có đoạn code như dưới:
```javascript
function who() {
  // Tại đây thì hàm "whoAmI" sẽ được khai báo và định nghĩa trả về "Function"
  // Lúc này thì "whoAmI" đang là hàm "whoAmI"
  // Đối với khai báo var whoAmI = "Variable"
  // thì sẽ bị bỏ qua vì trong scope đã có khai báo hàm
  // nên khai báo biến sẽ không được đưa lên trên đầu nữa
  // Tiếp đến sau khi đưa tất cả khai báo lên đầu scope
  // thì sẽ bắt đầu chạy các lệnh tiếp theo
  // Chính là lệnh khai báo và gán var whoAmI = "Variable";
  // vì var cho phép chúng ta khai báo trùng (nếu không trong strict mode)
  // Sau lệnh gán thì "whoAmI" sẽ có giá trị là "Variable"
  // thay vì là định nghĩa hàm "whoAmI" trả về "Function"
  var whoAmI = "Variable";

  function whoAmI() {
    return "Function";
  }

  // Cuối cùng là gọi hàm "whoAmI"
  // Nhưng vì đến đây thì "whoAmI" đang là kiểu string
  // Vì thế ở console chúng ta sẽ chỉ nhận được lỗi
  // "TypeError: whoAmI is not a function"
  return whoAmI();
}

console.log(who());
```
Kết quả chúng ta nhận được ở console sẽ là lỗi `"TypeError: whoAmI is not a function"`

Đối với trường hợp mà trong một scope có khai báo của cả hàm và biến mà cả hai đều có cùng một định đanh giống như `whoAmI` ở ví dụ trên thì khai báo hàm sẽ được hoist còn khai báo biến sẽ không được hoist. Nhưng ở ví dụ trên, đối với từ khóa khai báo trùng `var` thì code của chúng ta sẽ vẫn hợp lệ (có thể tham kháo thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#Description)).
## 4. Function Expression.
Chúng ta có đoạn code như dưới:
```javascript
// Tại đây thì hàm "showGender" sẽ được khai báo và định nghĩa lên đầu
// sẽ hợp lệ khi gọi hàm tại đây
console.log(showGender());

function showGender() {
  // Tại đây thì hàm "getGender" trả về "male" được khai báo
  // nhưng không bao gồm phần định nghĩa hàm
  // vì hàm "getGender" được khai báo thông qua "Function Expression"
  // Tiếp đến là hàm "getGender" trả về "female" cũng tương tự
  // chỉ đưa phần khai báo lên đầu
  // Tiếp đến sẽ là lệnh gán
  // var getGender = function() { return "male"; };
  var getGender = function() { return "male"; };

  // Tiếp đến là gọi hàm "getGender"
  // Lúc này thì hàm "getGender"
  // đang được định nghĩa là trả về "male"
  // vì hàm "getGender" trả về "female"
  // nằm sau lệnh return và chưa được thực thi
  return getGender(); // "male"

  // Chỉ được hoist chứ không được thực thi
  var getGender = function() { return "female"; };
}
```
Kết quả chúng ta nhận được ở console sẽ là `"male"`
## 5. IIFE.
Chúng ta có đoạn code như dưới:
```javascript
// Khai báo biến "myName" tại global scope
var myName = 'Maria';

// Tiếp đến là 1 biểu thức IIFE
// được gọi ngay sau khi khai báo và định nghĩa
// vì thế mà trong biểu thức IIFE
// sẽ không thể thao tác với biến global "myName"
(function() {
  // Tiếp đến trong hàm này
  // sẽ đưa khai báo "myName" lên đâu scope
  // Lúc này "myName" sẽ có giá trị là undefined
  console.log("Old name was: " + myName); // "Old name was: undefined"
  
  // Tiếp đến sẽ là lệnh gán giá trị "Jenny" cho biến "myName"
  var myName = "Jenny";
  
  // Bây giờ biến "myName" sẽ có giá trị là "Jenny" thay vì undefined
  console.log("New name is: " + myName); // "New name is: Jenny"
})();
```
Kết quả nhận được là
```
"Old name was: undefined"
"New name is: Jenny"
```
Về `IIFE` mọi người tham khảo thêm tại [đây](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

Thì ví dụ này là ví dụ cuối cùng mình muốn chia sẻ cùng mọi người! Cả năm ví dụ đều đặt ra những tình huống nhất định giúp chúng ta phần nào có thể hiểu rõ hơn về `Function Hoisting` nói riêng và `Hoisting` nói chung.
# IV. Kết luận.
Bên trên chúng ta đã có những định nghĩa về `Hoisting` cũng như là `Variable Hoisting` và `Function Hoisting`. Mình cũng đi sâu và đưa ra một số ví dụ về `Function Hoisting`. Rất thú vị đúng không nào. Thì bài chia sẻ của mình đến đây là hết rồi! Mong rằng nó sẽ mang lại một phần ích lợi cho các bạn và giúp chúng ta hiểu thêm về `Hoisting`. Cảm ơn các bạn đã đón đọc. Xin chào và hẹn gặp lại trong các bài chia sẻ kế tiếp! :triumph: