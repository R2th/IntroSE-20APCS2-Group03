Đây là một bài viết nhằm giúp các bạn mới tìm hiểu về Javascript clear rõ về vấn đề giữa ba cách khai báo biến đó là **var**, **let**, **const**.

**let** và **const** được giới thiệu trong ES6. Câu hỏi đặt ra ở đây là nó khác gì với **var**? Trong bài viết này, chúng ta sẽ thảo luận về scope, cách dùng và hoisting. 

# var
Trước khi ES6 ra đời, thì **var** là một ông vua. Tuy nhiên, có nhiều vấn đề khi ra sử dụng cách khai báo này. Đầu tiên, hãy hiểu rõ **var** trước khi chúng ta thảo luận về những vấn đề trên.

## Scope của var
**Scope** hiểu cơ bản thì nó có nghĩa là nơi các biến này có sẵn để sử dụng.  Khi ta khai báo **var**, thì biến đó có thể là global scope hoặc function/local scope.

Biến sẽ là global scope khi một biến **var** được khai báo bên ngoài một function. Điều này có nghĩa là bất kỳ biến nào được khai báo bằng **var** bên ngoài một function thì có thể dùng được ở mọi nơi.

Biến sẽ là function scope khi nó được khai báo bên trong một function. Điều này có nghĩa là biến đó sẽ có sẵn và chỉ dùng được ở trong function đó.

Dưới đây là một ví dụ:

```javascript
var greeter = "hey hi";

function newFunction() {
       var hello = "hello";
}
```

Ở đây, **greeter** là một biến có global scope bởi vì nó được khai báo bên ngoài một function trong khi **hello** là một function scope. Chính vì vậy, chúng ta sẽ không thể truy cập **hello** ở bên ngoài function. Nếu chúng ta làm như này:

```javascript
var tester = "hey hi";

function newFunction() {
        var hello = "hello";
}
console.log(hello); // error: hello is not defined
```

Chúng ta sẽ nhận lỗi do **hello** không được phép truy cập ở bên ngoài function.

## Biến var có thể khai báo lại và update 
Điều này có nghĩa là chúng ta có thể khai báo lại một biến đã được khai báo trong cùng một scope mà không bị lỗi.

```javascript
var greeter = "hey hi";
var greeter = "say Hello instead";
```

tương tự:

```rust
var greeter = "hey hi";
greeter = "say Hello instead";
```

## Hoisting của var
Hoisting là một cơ chế của Javascript, khi mà ta khai báo một biến hoặc function thì chúng sẽ được đẩy lên đầu scope của chúng trước khi mã được thực thi. Dưới đây là ví dụ:

```javascript
console.log (greeter);
var greeter = "say hello"
```

Nó sẽ là như thế này: 
```javascript
 var greeter;
 console.log(greeter); // greeter is undefined
 greeter = "say hello"
```
Ở đây biến **var** đã được đẩy lên đầu scope của nó và khởi tạo với một giá trị là **undefined**.
## Vấn đề của var
Có một điểm yếu khi chúng ta sử dụng **var**. Dưới đây sẽ là một ví dụ giải thích:
```javascript
var greeter = "hey hi";
var times = 4;

if (times > 3) {
        var greeter = "say Hello instead"; 
}

 console.log(greeter) // "say Hello instead"
```
Do **times > 3** trả về true, **greeter** được khai báo lại thành **"say Hello instead"**. Đây sẽ không phải là vấn đề nếu bạn cố ý muốn **greeter** được khai báo lại, nó sẽ là một vấn đề khi bạn quên rằng một biến **greeter** đã được khai báo trước đó. Và điều này sẽ gây ra nhiều vấn đề và bạn sẽ ngạc nhiên khi thấy output mà bạn nhận được.

Đây cũng là lý do tại sao **let** và **const** ra đời.
# let
**let** gần như là "meta" trong nhiều năm nay. Điều này là khá là bình thường vì nó là một sự cải tiến đối với cách khai báo cũ là **var**. Nó giải quyết vấn đề của **var** mà chúng ta vừa đề cập.
## Scope của let
Scope của let là block scope. Block là một đoạn mã được giới hạn bởi {}. Một block nằm trong một dấu ngoặc nhọn. Bất kỳ thứ gì trong dấu ngoặc nhọn đều là một block.

Chính  vì vậy, một biến được khai báo trong một block bằng **let** chỉ có thể được sử dụng trong block đó. Dưới đây là ví dụ: 

```c
let greeting = "say Hi";
let times = 4;

if (times > 3) {
        let hello = "say Hello instead";
        console.log(hello);// "say Hello instead"
}
console.log(hello) // hello is not defined
```

Có thể thấy rằng khi ta cố **console.log(hello)** thì nó sẽ trả về lỗi. Đó là do **hello** có block scope.
## let có thể update nhưng không thể khai báo lại
Cũng giống **var**, một biến được khai báo bằng **let** có thể update được trong scope của nó. Nhưng điều khác biệt ở đây là một biến khai báo bằng **let** không thể khai báo lại được trong scope của nó. Dưới đây là ví dụ:

```rust
 let greeting = "say Hi";
 greeting = "say Hello instead";
```

Làm như này sẽ lỗi:

```swift
let greeting = "say Hi";
let greeting = "say Hello instead"; // error: Identifier 'greeting' has already been declared
```

Tuy nhiên, nếu cùng một biến nhưng lại được khai báo trong các scope khác nhau thì không có vấn đề gì: 
```javascript
 let greeting = "say Hi";
 if (true) {
        let greeting = "say Hello instead";
        console.log(greeting); // "say Hello instead"
 }
 console.log(greeting); // "say Hi"
```

Đó chính là lý do tại sao **let** lại là meta hiện tại. Khi sử dụng **let**, bạn sẽ không phải bận tâm nếu trước đó bạn đã khai báo một biến có trùng tên vì biến **let** sẽ chỉ tồn tại trong phạm vi của nó.
## Hoisting của let
Cũng giống **var**, khi ta khai báo một biến **let** thì nó cũng sẽ được đẩy lên đầu. Nhưng lưu ý, không giống **var**, khi khởi tạo thì **var** sẽ có giá trị là **undefined**. **let** không như vậy, nên nếu bạn cố dùng **let** trước khi khai báo, bạn sẽ gặp lỗi tham chiếu (**Reference Error**).
# const
Các biến được khai báo bằng **const** sẽ có giá trị không đổi. Cách khai báo này có một số điểm tương đồng với **let**.
##  Scope của const
Cũng giống **let**, scope của **const** là block scope.
## const không thể update hoặc khai báo lại
Điều này có nghĩa là giá trị của một biến được khai báo bằng **const** sẽ không thay đổi trong scope của nó. **const** không thể update hoặc khai báo lại. Dưới đây là ví dụ: 

```rust
const greeting = "say Hi";
greeting = "say Hello instead";// error: Assignment to constant variable. 
```

hoặc:

```javascript
 const greeting = "say Hi";
 const greeting = "say Hello instead";// error: Identifier 'greeting' has already been declared
```

Chính vì thế, mọi khai báo bằng **const** đều phải được khởi tạo tại thời điểm khai báo.

Nhưng khi chúng ta khai báo các đối tượng với **const**, sẽ có một chút khác biệt. Một đối tượng **const** sẽ không thể update, nhưng các thuộc tính của nó thì lại có thể update. Dưới đây là ví dụ:

```go
 const greeting = {
        message: "say Hi",
        times: 4
 }
```

Chúng ta sẽ không thể làm như sau:

```go
 greeting = {
        words: "Hello",
        number: "five"
  } // error:  Assignment to constant variable.
```

Thay vào đó:

```sql
greeting.message = "say Hello instead";
```

Bằng cách này chúng ta có thể update giá trị của greeting.message mà không bị lỗi.

## Hoisting của const
Cũng giống như **let**, khi khai báo **const** chúng sẽ được đưa lên đầu nhưng không được khởi tạo.

# Tổng kết
1. **var** có global scope trong khi **let** và **const** có block scope.
2. Các biến **var** có thể update và khai báo lại trong scope của nó; **let** có thể update nhưng không khai báo lại được; Các biến **const** không thể update cũng như không thể khai báo lại.
3. **Cả ba cách khai báo đều sở hữu cơ chế hoisting**. Nhưng các biến **var** được khởi tạo với giá trị **undefined**, **let** và **const** không như vậy, chúng không được khởi tạo.
4. **var** và **let** có thể khai báo mà không cần khởi tạo, **const** phải được khởi tạo trong quá trình khai báo. 

Thank you for reading :)