Prototype là khái niệm cốt lõi trong JavaScript và là cơ chế quan trọng trong việc thực thi mô hình OOP trong JavaScript (nhưng không thực sự không hoàn chỉnh như trong các ngôn ngữ class-based khác), vì như đã biết, trong JavaScript, không có khái niệm class như các ngôn ngữ hướng đối tượng khác như Java hay C#. Bài viết này sẽ trình bày sơ lược về khái niệm này.

### Prototype object


Để dễ hiểu, chúng ta xem xét function sau:

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

Khi function `Person` được tạo, mặc định nó sẽ có một property có tên là `prototype` (lưu ý là function trong JavaScript cũng là một object). Property này là một object mà ban đầu chỉ có chứa một property là `constructor` trỏ ngược lại function `Person`. Và khi function `Person` này được gọi với từ khóa `new`, object mới được tạo sẽ **_kế thừa_** tất cả các property từ `Peron.prototype`. Để kiểm tra, chúng ta thêm vào `Person.prototype` một method là `showFullName()` như sau:

```javascript
Person.prototype.showFullName = function() {
    console.log(this.firstName + ' ' + this.lastName);
}

var justin = new Person('Justin', 'Vo');
console.log(justin); // Person {firstName: "Justin", lastName: "Vo"}
justin.showFullName(); // Justin Vo
```

Người ta còn gọi `Person.prototype` là **_prototype object_** hay gọn hơn là **_prototype_** của object `justin`, cũng như bất kì object nào được tạo với cú pháp `new Person(...)`.

```javascript
var david = new Person('David', 'Truong');
console.log(david); // Person {firstName: "David", lastName: "Truong"}
david.showFullName(); // David Truong
```

Thật ra chúng ta có thể khai báo method `showFullName()` ngay bên trong function `Person`. Tuy nhiên, do method `showFullName()` là giống nhau ở mọi object, nên chúng ta đưa nó lên `Person.prototype` để các object kế thừa lại (nguyên lý **Don't Repeat Yourself - DRY**). Và đó cũng là một trong số các best practice trong JavaScript: constructor chỉ khởi tạo các property riêng biệt cho mỗi object được tạo, còn các method áp dụng chung cho mọi object sẽ được tạo ở prototype.

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.friends = [];
}

Person.prototype.showFullName = function() {
    console.log(this.firstName + ' ' + this.lastName);
}

Person.prototype.addFriend = function(friend) {
    this.friends.push(friend);
}


var vancanh = new Person('Canh', 'Dinh');
var justin = new Person('Justin', 'Vo');
var micheal = new Person('Micheal', 'Huynh');

console.log(vancanh.friends); // [];
vancanh.addFriend(justin);
vancanh.addFriend(micheal);
console.log(vancanh.friends); // [Person, Person]
```

Các object mặc định có sẵn trong JavaScript cũng được xây dựng theo cách tương tự như trên. Ví dụ, prototype của các object được tạo với cú pháp `new Object()` hoặc `{}` là `Object.prototype`, các array được tạo với cú pháp `new Array()` hoặc `[]` là `Array.prototype` và tương tự như thế cho các object khác như `RegExp` hay `Date`. `Object.prototype` được kế thừa bởi mọi object và bản thân nó không có prototype (nói cách khác, prototype của nó là `null`).

Thực tế thì chúng ta không thể truy cập được prototype của một object và cũng không cần thiết phải dùng đến nó, tuy nhiên, chẳng hạn như trong Chrome, nó cho phép chúng ta truy cập vào prototype của một object thông qua một property "giả" là `__proto__`.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nawbni4vs3_Untitled.png)

### Prototype chain


Cơ chế prototype chain rất đơn giản: khi chúng ta truy cập vào một property của một object, JavaScript engine sẽ tìm property đó bên trong chính object, nếu không có nó sẽ tìm lên trên prototype của object, và cứ tiếp tục như thế cho đến khi gặp `Object.prototype` thì dừng và cho ra kết quả (`undefined` nếu không tìm thấy). Ví dụ:

```javascript
var obj1 = { a: 1 };
var obj2 = Object.create(obj1);
obj2.b = 2;
console.log(obj1.a); // 1
console.log(obj2.a); // 1
console.log(obj2.b); // 2
console.log(obj2.c); // undefined
```

Trong ví dụ trên, `Object.create()` sẽ tạo một object mới `obj2` với prototype là `obj1`. Và như đã thấy, mặc dù `obj2` không có property `a`, nhưng chúng ta vẫn có thể truy cập nó nhờ vào cơ chế prototype chain.

### Kết

Mình xin tạm dừng bài viết tại đây vì có lẽ đã khá dài. Trên đây mình đã cố gắng trình bày về prototype theo cách dễ hiểu. Hi vọng qua bài viết này sẽ giúp bạn hiểu hơn về khái niệm prototype trong JavaScript.