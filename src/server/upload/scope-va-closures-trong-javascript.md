Scope và Closure là những khái niệm rất quan trọng trong Javascript và chúng cũng là hai khái niệm dễ khiến nhiều lập trình viên nhầm lẫn khi mới làm quen. Vì thế bài viết này với mục đích đưa ra cái nhìn rõ ràng hơn để giúp bạn có thể phân biệt đúng scope and closure.

Đầu tiên, ta sẽ tìm hiểu về scope.

### Scope

Scope trong JavaScript để xác định những biến mà bạn có quyền truy cập.
Có 2 loại scope đó là: global scope và local scope

* Global scope

```
const globalVariable = 'some value'
```

Các biến được định nghĩa ở bên ngoài các function hoặc dấu ngoặc nhọn ({}) được gọi là global scope. Phạm vi truy cập global scope đúng với tên gọi của nó là trong toàn bộ chương trình, thậm chí là trong các function (nó chỉ đúng trong Javascript trong trình duyệt web)

```
const hello = 'Hello everybody'

function sayHello () {
  console.log(hello)
}

console.log(hello) // 'Hello everybody'
sayHello() // 'Hello everybody'
```

Chúng ta có thể khai báo và sử dụng rất nhiều biến global scope, tuy nhiên, đôi khi nó sẽ xảy ra những trường hợp xung đột không hề mong muốn chẳng hạn như hai hoặc nhiều biến được đặt tên giống nhau.

```
let thing = 'something'
let thing = 'something else' // Error, thing has already been declared
```

Thay vào đó nếu bạn khai báo hai biến trùng tên với nhau sử dụng `var` thì sẽ không xuất hiện lỗi nữa. Lý do là biến thứ hai khi được khai báo sẽ được ghi đè lên biến thứ nhất, và dĩ nhiên, trừ khi bạn muốn làm mọi thứ rối tung lên nếu không sẽ chẳng ai làm như thế cả.

```
var thing = 'something'
var thing = 'something else'
console.log(thing) // 'something else'
```

* Local scope

Các biến được định nghĩa ở bên trong các function được gọi là local scope. Phạm vi truy cập của nó chỉ ở trong function nơi mà nó được định nghĩa. Và vì thế, ta có thể khai báo các biến cùng tên ở trong những function khác nhau mà không hề xảy ra xung đột.

Local scope được chia làm 2 loại là: function scope và block scope.

**Function scope**

Khi bạn định nghĩa một biến ở trong một function thì bạn chỉ có thể truy cập biến này ở trong function đó và không thể truy cập ở một nơi nào khác nữa. 

```
function sayHello () {
  const hello = 'Hello everybody'
  console.log(hello)
}
sayHello() // 'Hello everybody'
console.log(hello) // Error, hello is not defined
```

**Block scope**

Khi bạn định nghĩa một biến với từ khóa `const` hoặc `let` trong dấu ngoặc nhọn ({}) thì bạn chỉ có thể truy cập biến này ở trong dấu ({}) mà nó được định khai báo.

```
{
  const hello = 'Hello everybody'
  console.log(hello) // 'Hello everybody'
}
console.log(hello) // Error, hello is not defined
```

Trong quá trình viết code javascript, đôi khi bạn sẽ khai báo function trước khi mà bạn sử dụng nó, cũng có bạn viết theo trình tự ngược lại, điều đó không ảnh hưởng gì nếu bạn viết nó như thế này

```
#Team1
sayHello()
function sayHello () {
  console.log('Hello everybody')
}

#Team2
function sayHello () {
  console.log('Hello everybody')
}
sayHello()
```

Còn đối với `const` thì #Team1 cần phải cân nhắc vì nó sẽ xảy ra lỗi:

```
#Team1
sayHello() // Error, sayHello is not defined
const sayHello = function () {
  console.log(aFunction)
}
```

* Nested scope

Hay còn gọi là lexical scope. Khi bạn định nghĩa một function ở trong một function khác thì function bên trong sẽ có quyền truy cập vào tất cả các biến định nghĩa ở function bên ngoài. Nhưng không có điều ngược lại, đó là function bên ngoài sẽ không có quyền truy cập vào các biến được định nghiã ở function bên trong.

```
function outerFunction () {
  const outer = `I'm the outer function!`

  function innerFunction() {
    const inner = `I'm the inner function!`
    console.log(outer) // I'm the outer function!
  }

  console.log(inner) // Error, inner is not defined
}
```

Để có thể dễ hình dung hơn về khả năng truy cập của từng loại scope, bạn có thể tham khảo hình sau: 

![](https://images.viblo.asia/63395b5e-fcd5-48da-8d5a-63d1d25da57e.png)

### Closures

Bất cứ khi nào bạn tạo một function trong một fuction khác là bạn đã tạo ra một closure. Các function bên trong chính là các closure.

```
function outerFunction () {
  const outer = `I see the outer variable!`

  return function innerFunction() {
    console.log(outer)
  }
}
outerFunction()() // I see the outer variable!
```

Các closure có quyền truy cập vào các biến được định nghĩa ở function bên ngoài nên thường được được sử dụng với mục đích: kiểm soát các ảnh hưởng và tạo các biến private

* Kiểm soát các ảnh hưởng - có thể là Ajax, thời gian chờ Timeout hoặc cũng có thể là câu lệnh `console.log`

```
function (x) {
  console.log('A console.log is a side effect!')
}
```

Khi bạn sử dụng các closures để kiểm soát các ảnh hưởng, bạn thường quan tâm đến Ajax hoặc Timeout. Ví dụ, bạn muốn làm một chiếc bánh cho ngày sinh nhật của mình. Bạn mất 1s để hoàn thành nó vì thế bạn viết một function ghi nhật ký làm bánh sau 1s

```
function makeCake(flavor) {
  setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000)
}
```

Khi bạn thực hiện chiếc bánh (gọi đến hàm makeCake để thực hiện), chiếc bánh sẽ được làm sau 1s

```
makeCake('banana')
// Made a banana cake!
```

* Tạo các biến private

Như đã nói ở phần trên (scope) thì các biến được tạo bên trong một function thì sẽ không thể truy cập nó từ bên ngoài function đó. Và những biến được khai báo ở bên trong function như vậy được gọi là biến private. Trong một số trường hợp bạn cần truy cập vào một biến private thì có thể thực hiện với closure.

```
function secret (nameForHello) {
  return {
    saySecretHello () {
      console.log(nameForHello)
    }
  }
}

const theSecretHello = secret('Hello Mr. Mell')
theSecretHello.saySecretHello()
// 'Hello Mr. Mell'
```

Qua một số ví dụ đơn giản trên, hy vọng, bạn đã có thể hiểu rõ hơn về hai khái niệm scope và closures.

### Tài kiệu tham khảo
[javascript-scope-closures](https://css-tricks.com/javascript-scope-closures/)