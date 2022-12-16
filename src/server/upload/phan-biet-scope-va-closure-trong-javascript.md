![](https://images.viblo.asia/afbee620-eb74-4087-9475-202aab124300.jpg)

Scope và Closure là những khái niệm quan trọng trong Javascript nhưng chúng thường gây nhiều nhầm lẫn . Vì vậy ở bài viết này mình sẽ giải thích và có những ví dụ đơn giản để các bạn có thể dễ hiểu hơn!
## Scope
Một Scope trong JavaScript xác định những biến bạn có quyền truy cập. Có hai loại scope - **global scope** và **local scope**
1.  **Global scope**

Nếu một biến được khai báo bên ngoài tất cả các hàm hoặc dấu ngoặc nhọn ({}) thì nó được xác định là định nghĩa trong phạm vi toàn cục.
`Lưu ý`: Điều này chỉ đúng với JavaScript trong trình duyệt web. Biến toàn cục trong Node.js thì không giống vậy.

```
const globalConstant = "Some contant";
var globalVariable = "Some value";
```
Khi khai báo biến như trên, bạn có thể sử dụng chúng ở bất cứ đâu trong code, thậm chí trong các function...

```
function helloName() {
    var name = "Brack Obama";
}
helloName();
alert(name); //ReferenceError
```

Bạn không thể truy cập biến local từ bên ngoài, kế quả là gây lỗi.

```
var name = "Donald Trump";
function helloName() {
    var name = "Barack Obama";
}
helloName();
alert(name); // "Barack Obama"
```
Vì biến name được khai báo global nên khi gọi hàm helloName() nó đã được gán lại từ "Donald Trump" thành "Barack Obama". Điều này rất dễ gây lỗi nên có lời khuyên là khi code chúng ta không nên đặt tên biến trùng nhau dù cho là global hay local đi nữa.

```
let thing = "something";
let thing = "something else"; // Error, thing has already been declared
```
Khi khai báo 2 biến trùng nhau trong cùng scope với **let** hoặc **const** sẽ gây lỗi. Nhưng khai báo bằng var thì lại ok (và cũng chẳng ai làm điều đó cả :v)
```
var thing = "something";
var thing = "something else";
console.log(thing) // "something else"
```
2.  **Local scope**
Những biến chỉ có thể sử dụng được trong một phần cụ thể của code được coi là trong **local scope**. Các biến này được gọi là biến cục bộ.
Trong JavaScript, có hai loại **local scope**: **function scope** và **block scope**.
* **function scope**
Khi bạn khai báo một biến trong một function, bạn chỉ có thể truy cập biến này trong function đó.
```
function sayHello() {
  const hello = "Hello Barack Obama!";
  console.log(hello);
}
sayHello(); // "Hello Barack Obama!"
console.log(hello); // Error, hello is not defined
```
**Block scope**
Khi bạn khai báo một biến có **const** hoặc **let** trong dấu ngoặc nhọn ({}), bạn chỉ có thể truy cập biến này trong dấu ({}) đó.
```
{
  const hello = "Hello Barack Obama!";
  console.log(hello); // "Hello Barack Obama!"
}

console.log(hello); // Error, hello is not defined
```
`Lưu ý`: 
Các hàm, khi được khai báo với một khai báo hàm, luôn luôn được kéo lên trên cùng của scope hiện tại. Vì vậy, hai cách này là tương đương:
```
// This is the same as the one below
sayHello();
function sayHello() {
  console.log("Hello Barack Obama!");
}

// This is the same as the code above
function sayHello() {
  console.log("Hello Barack Obama!");
}
sayHello();
```

Nhưng với **const** thì gây lỗi:
```
sayHello(); // Error, sayHello is not defined
const sayHello = function() {
  console.log("Hello Barack Obama!");
}
```
Vì vậy tốt nhất là khai báo hàm trước rồi mới gọi hàm sau!
3. **Lexical Scope** 
Ta có thể hiểu như sau Lexical scope là khả năng truy cập của các biến trong inner function ra các scope cha của nó. (nhưng điều ngược lại thì không đúng, parent scope sẽ không thể access được children scope). Nó có các tên gọi khác nhau như Closure hay Static Scope. Xét ví dụ dưới đây để có thể hiểu rõ hơn.
```
var firstName = "Barack";
function parentFunction() {
    var lastName = "Obama!";
    function childFunction() {
        var hello = "Hello";
        console.log(hello + " " + firstName + " " + lastName); //Hello Barack Obama!
    }
    childFunction();
}
parentFunction();
```
## Closures
Bất cứ khi nào tạo một function trong một function khác, bạn đã tạo một **closure**.
Các biến số (không phải là argument của hàm) sẽ không phụ thuộc vào môi trường đang được chạy, mà phụ thuộc vào môi trường mà nó được định nghĩa (scope tĩnh).
```
function outerFunction () {
  const outer = "I see the outer variable!";

  return function innerFunction() {
    console.log(outer);
  }
}

outerFunction()(); // I see the outer variable!
```
Closure có quyền truy cập các biến trong outer function, chúng thường được sử dụng phục vụ 2 mục đích:
* Để kiểm soát các hiệu ứng.
Khi bạn sử dụng các dấu ngoặc nhọn để kiểm soát các hiệu ứng phụ, bạn thường quan tâm đến các hiệu ứng có thể làm xấu dòng code của bạn như Ajax hoặc Timeout.
Hãy xem 1 ví dụ để thấy rõ hơn:
```
function makeCake() {
  setTimeout(_ => console.log("Made a cake"), 1000);
}
```
Bạn muốn làm 1 chiếc bánh để tặng sinh nhật 1 người bạn, chiếc bánh sẽ mất 1s để làm.
* Để tạo các biến private
Như bạn đã biết, các biến được tạo trong function không thể được truy cập bên ngoài function đó. Vì chúng không thể được truy cập, chúng còn được gọi là private variables.
Tuy nhiên, đôi khi bạn cần truy cập vào một private variable như vậy. Bạn có thể làm như vậy với closures.
```
function secret(secretCode) {
  return {
    saySecretCode () {
      console.log(secretCode);
    }
  }
}

const theSecret = secret("CSS Tricks is amazing");
theSecret.saySecretCode();
// "CSS Tricks is amazing"
```
Như bạn thấy saySecretCode() đã được truy cập từ bên ngoài.

Nguồn tham khảo: [https://css-tricks.com/javascript-scope-closures/](https://css-tricks.com/javascript-scope-closures/)