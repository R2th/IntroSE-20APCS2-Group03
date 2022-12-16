## VAR, LET và CONST
JavaScript, cũng như các ngôn ngữ lập trình khác, cho phép khai báo biến bằng nhiều cách khác nhau. Với các keyword **var**, **let** và **const** và mỗi keyword lại có use case khác nhau, bài viết này sẽ tập trung vào những điều cần cân nhắc khi sử dụng các phương thức khai báo biến này
Hãy cùng xem qua định nghĩa của từng keyword, dựa vào [trang chính thức của ECMAScript](https://www.ecma-international.org/ecma-262/6.0/) và [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
> **Var**  khai báo một biến có phạm vi là [execution context](https://viblo.asia/p/tim-hieu-ve-bat-dong-bo-trong-javascript-gDVK29Yv5Lj) hiện tại của nó , có thể khởi tạo giá trị hoặc không.
> 
> **Let** khai báo một biến có phạm vi trong một `block` scope, có thể khởi tạo giá trị hoặc không.
> 
> **Const**  khai báo một hằng số có phạm vi trong một `block` scope  giống như biến khai báo bằng **let** nhưng giá trị của hằng số không thể thay đổi.  Khai báo bằng **const** tạo ra một tham chiếu read-only tới giá trị.
 

Chúng ta thấy để hiểu rõ hơn các định nghĩa trên thì cần nắm thêm một số khái niệm khác:

> **Execution context** là môi trường mà JavaScript code đang thực thi, có thể hiểu là tập hợp các giá trị của *this*, các biến, hàm hay object mà JavaScript đang được phép truy cập 
> 
> **Scope** là phạm vi hoạt động của một biến. Ta có `global level scope` là phạm vi rộng nhất, có thể truy cập được ở bất cứ đâu. `function level scope` giới hạn trong các định nghĩa hàm, có nghĩa là ngoài hàm đó thì không thể truy cập tới biến định nghĩa bên trong. Tương tự là `block level scope` nhưng giới hạn sâu hơn, có thể hiểu là chỉ khả dụng ở giữa hai dấu `{`, `}`

```javascript
var one = 1; // global level
function doSomething(){
  var two = 2; // function level
  if( true ){
    var three = 3; // block level
  }
}
if( true ){
   var four = 4; // block level
}
```
## HOISTING
Về lý thuyết, có thể hiểu là **hoisting** sẽ đưa các khai báo biến và phương thức lên trên đầu code của bạn. Nhưng điều thực sự  xảy ra là các khai báo biến và hàm được đưa vào bộ nhớ trước *trong quá trình biên dịch* và chúng vẫn giữ nguyên vị trí trong code. Một vài điều đáng lưu ý rút ra từ định nghĩa của **hoisting** là:
* Chỉ duy nhất việc khai báo biến và hàm được di chuyển. Viện gán hay khởi tạo biến không bao giờ di chuyển.
* Chính xác thì các khai báo không bị chuyển lên đầu code, mà thay vào đó là thêm vào bộ nhớ trước.

Trong JavaScript, tất cả các định nghĩa biến với keyword **var** có giá trị ban đầu là **undefined**. Đó là bởi vì **hoisting** đã đưa các khai báo biến vào bộ nhớ và khởi tạo chúng với giá trị **undefined**. Hãy xét ví dụ sau
```javascript
   console.log(x) // prints undefined
   console.log(y) // throws ReferenceError: y is not defined
   var x = 1;
```

Ngược lại, định nghĩa biến với keyword **let** hoặc **const** khi được **hoist** không khởi tạo với giá trị **undefined**. Thay vào đó, chúng sẽ có trạng thái gọi là **Temporal Dead Zone** và không được khởi tạo tới khi câu lệnh định nghĩa chúng được chạy tới.
```javascript
console.log(x); // throws TDZ ReferenceError: x is not defined
let x = 1;
```
hoặc
```javascript
var x = 10;
{
    console.log(x); // throws TDZ ReferenceError: x is not defined
    let x = 5;
}
```
Biến `x` được định nghĩa bằng keyword **let** trong `block` được **hoist** và ưu tiên hơn biến `x` được định nghĩa bằng **var**. Hơn nữa, nó vẫn đang trong **Temporal Dead Zone** khi được tham chiếu trong **console.log(x)**, vậy nên throw một **reference error**

## SCOPE

Như đã trình bày ở trên, biến định nghĩa với keyword **var** có phạm vi là `execution context` hiện tại của nó. Chúng không phải là phạm vi `block` vậy nên có thể được truy cập từ ngoài `block` mà nó được định nghĩa, chỉ cần nó vẫn nằm trong phạm vi của `execution context`. Ngược lại, biến định nghĩa bằng **let** hoặc **const** có phạm vi là `block`, có nghĩa không thể truy cập được từ ngoài `block`.  Để dễ hiểu hơn hãy xét ví dụ sau:
```javascript
(function () {
    {
        var x = 2;
        let y = 3;
        const z = 4;
    }
    if (true) {
        console.log(x); // prints 2
        console.log(y); // throws ReferenceError - out of its scope
        console.log(z); // throws ReferenceError - out of its scope
    }
    console.log(x) // prints 2
    console.log(y); // throws ReferenceError - out of its scope
    console.log(z); // throws ReferenceError - out of its scope
})();
console.log(x); // throws ReferenceError - out of its scope
```

Lưu ý, khi bạn khai báo biến global với keyword **var**, biến được gắn vào `global` scope (**window** trong trình duyệt và **global** trong node).  Điều này không đúng với trường hợp khai báo biến global với **let** và **const**

## Lưu ý

* Khi bạn không khai báo biến nhưng gán giá trị cho biến, biến sẽ được tạo và gắn vào `execution context` hiện tại của nó (giá trị hiện tại của **this**). Tuy nhiên, điều này không được khuyển khích bởi nó làm việc debug khó hơn rất nhiều

```javascript
x = "this gets attached to the global this";
console.log(this.x); // prints the value of x
function testFn() {
    y = "this get attached to the this of the function";
    console.log(this.y); //prints the value of y
}
testFn();
```

* Đó là lí do [strict mode](https://viblo.asia/p/tim-hieu-ve-strict-mode-trong-javascript-jaqG0QQevEKw) tồn tại, buộc bạn phải dùng các keyword để khai báo biến, giúp tránh được các lỗi không mong muốn. Ngoài ra strict mode còn một vài công dụng khác (hay đúng hơn là quy tắc), mình đã dẫn link tham khảo và không đi sâu trong bài viết này.

```javascript
"use strict"; // Khai báo sử dụng strict mode
x = 1; // Uncaught ReferenceError: x is not defined
```
* Biến khai báo bằng keyword **var** có thể khai báo lại bất cứ lúc nào, khác với **let** và **const** chỉ có thể khai báo 1 lần trong phạm vi (scope) của nó
```javascript
var x = 1;
var x = 2;
console.log(x); // prints 2
let y = 1;
let y = 2; // throws SyntaxError: Identifier y has already been declared
const z = 1;
const z = 2; // throws SyntaxError: Identifier z has already been declared
```
Điều này có thể gây ra lỗi nếu bạn sử dụng **let** hoặc **const** để khai báo biến trong switch case:
```javascript
var x = 1;
switch (x) {
    case 0:
            let foo = 20;
            break;
     case 1:
             let foo = 30; // throws SyntaxError: Identifier foo há already been declared
             break;
}
```
Tất nhiên là có thể tránh bằng cách sử dụng ngoặc nhọn để định nghĩa các block riêng biệt:
```javascript
var x = 1;
switch (x) {
    case 0:
        {
            let foo = 20;
            break;
         }
     case 1:
         {
             let foo = 30;
             break;
         }
}
```

* Một lưu ý khác là hằng số mặc dù giá trị không thể gán lại, nó vẫn có thể thay đổi. Ví dụ nếu như giá trị là một object, các thuộc tính của object đó có thể thay đổi được:
```javascript
const obj = {
    firstName: "Favour"
};
obj.lastName = "Harrison";
console.log(obj); // prints an object 
```

Hi vọng bài viết sẽ có ích cho các bạn

## Tham khảo
https://blog.usejournal.com/var-let-and-const-hoisting-and-scope-8860540031d1

https://medium.com/@MentallyFriendly/es6-an-idiots-guide-to-let-and-const-70be9691c389