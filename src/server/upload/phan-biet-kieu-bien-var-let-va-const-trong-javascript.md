# 1. Giới Thiệu
ES6 (viết tắt của ECMAScript 6) là một tập hợp các kỹ thuật nâng cao của Javascript. ECMAScript do hiệp hội các nhà sản xuất máy tính Châu Âu đề xuất làm tiêu chuẩn của ngôn ngữ Javascript. Bạn cứ nghĩ xem hiện nay có khá nhiều trình duyệt Browser ra đời và nếu mỗi Browser lại có cách chạy Javascript khác nhau thì các trang web không thể hoạt động trên tất cả các trình duyệt đó được, vì vậy cần có một chuẩn chung để bắt buộc các browser phải phát triển dựa theo chuẩn đó.

Một trong những tính năng nổi bật của ES6 đó là sự bổ sung **`let`** và **`const`** phục vụ cho việc khai báo biến dữ liệu. Vậy tại sao lại cần tới `let` và `const` dù trước đó đã có `var` để khai báo biến, thì ở bài viết này chúng ta sẽ cùng tìm hiểu lý do của từng kiểu khai báo biến.
# 2. Phân Biệt
## 2.1. Biến var
Như đã biết trong Vanilla Javascript, với từ khóa **`var`** chúng ta có thể khai báo đa dạng các kiểu biến như number, string, boolean, etc. Trừ trường hợp được khai báo bên trong 1 function (khi đó biến `var` sẽ có scope là **function/locally scoped**), biến `var` sẽ có scope là **globally scoped**. Đặc biệt, biến `var` còn có thêm tính chất **hoisting**: nghĩa là dù khai báo ở đâu thì biến đều sẽ được đem lên đầu scope trước khi code được thực hiện.

Lấy ví dụ:
```javascript
    console.log (greeting);
    var greeting = "say hello";
```
sẽ được biên dịch là:
```javascript
    var greeting;
    console.log(greeting); // greeting is undefined
    greeting = "say hello";
```

Nhưng có một vấn đề với biến `var`. Giả sử ta có ví dụ như sau:
```javascript
    var greeting = "hey hi";
    var times = 4;

    if (times > 3) {
        var greeting = "say Hello instead"; 
    }

    console.log(greeting); //"say Hello instead"
```
Vì thỏa điều kiện `if` nên `greeting` khi này sẽ có giá trị là `"say Hello instead"` và sẽ vẫn giữ nguyên giá trị này sau khi thoát ra khỏi block `if`. Điều này sẽ không có gây vấn đề gì nhưng nếu trong trường hợp code của chúng ta lên đến hàng trăm, hàng nghìn dòng code, hoặc chúng ta cũng không biết được giá trị của biến liệu có bị thay đổi ở đoạn code nào sẽ dẫn đến việc debug là vô cùng khó khăn.
Để giải quyết vấn đề trên thì ES6 cung cấp cho chúng ta thêm 2 cách khác để khai báo biến bao gồm `let` và `const`.

## 2.2. Biến let
Một trong những nguyên nhân khiến **`let`** có thể thay thế `var` để xử lý vấn đề nêu trên là vì biến `let` được khai báo sẽ có scope là **block scoped** chứ không phải globally hay locally scoped.

```c
   let greeting = "say Hi";
   let times = 4;

   if (times > 3) {
        let hello = "say Hello instead";
        console.log(hello); // "say Hello instead"
    }
   console.log(hello); // hello is not defined
```
Chúng ta có thế thấy là đối với biến có scope là block scoped nếu ra khỏi scope được khai báo thì sẽ không thể sử dụng được nữa.

`let` cho phép chúng ta cập nhật giá trị của biến chứ không cho phép chúng ta tái khái báo lại biến đó.
```swift
    let greeting = "say Hi";
    console.log(greeting); //"say Hi"

    greeting = "say Hello instead";
    console.log(greeting); //"say Hello instead"

    -----------------------------------------------------

    let greeting = "say Hi";
    let greeting = "say Hello instead"; // error: Identifier 'greeting' has already been declared
```

Tuy nhiên, đối với các block khác nhau thì việc tái khai báo biến sẽ không sinh ra lỗi vì đối với từng scope, mỗi biến sẽ được xem xét là 1 biến riêng khác biệt.
```javascript
    let greeting = "say Hi";
    if (true) {
        let greeting = "say Hello instead";
        console.log(greeting); // "say Hello instead"
    }
    console.log(greeting); // "say Hi"
```

Giống với `var`, `let` cũng có tính **hoisting** tuy nhiên lại khác nhau ở chỗ thay vì `var` được khởi tạo với giá trị là `undefined` thì `let` sẽ không có bất kỳ giá trị khởi tạo nào. Điều này dẫn đến việc nếu chúng ta sử dụng biến `let` trước khi khai báo thì sẽ gặp lỗi `Reference Error`.

## 2.3. Biến const
Tương tự với `let` cũng có scope là **block scoped**, và **hoisting** thì chúng ta có thêm 1 kiểu khai báo biến nữa là **`const`**. Trong biến `const` nếu trường hợp kiểu của biến là **primitive** (bao gồm string, number, boolean, null, và undefined) thì chúng ta sẽ không thể tái khai báo hay cập nhật giá trị mới để thay thế cho giá trị trước đó của biến.
```php
    const greeting = "say Hi";
    greeting = "say Hello instead"; // error : Assignment to constant variable. 

    ------------------------------------------------

    const greeting = "say Hi";
    const greeting = "say Hello instead"; // error : Identifier 'greeting' has already been declared
```

Đối với trường hợp kiểu biến là **reference** (bao gồm object, array, và function) thì tuy không thể tái khai báo hay cập nhật giá trị của biến nhưng chúng ta vẫn có thể cập nhật giá trị cho thuộc tính của biến đó.
```javascript
    const greeting = {
        message : "Hello",
        number : "five"
    }

    greeting.message = "say Hello instead";
    console.log(greeting); // {message:"say Hello instead",number:"five"}
```