#### 1. JavaScript(ES6) Class :

Các đối tượng trong ngôn ngữ lập trình cung cấp cho chúng ta một cách dễ dàng để thao tác với mô hình dữ liệu. Lấy ví dụ ta có một đối tượng người dùng. Đối tượng người dùng này có các thuộc tính: các giá trị chứa dữ liệu về người dùng, và các phương thức xác định các hành động mà người dùng có thể thực hiện. Trong lập trình hướng đối tượng ta tập trung vào các đối tượng và các phương thức của chúng.

#### 2. Nói ngắn gọn lập trình hướng đối tượng

Lập trình hướng đối tượng là một cách để viết chương trình. Theo đó tập trung vào dữ liệu được lưu trữ vào các thuộc tính của đối tượng, và các hành động của đối tượng thông qua các phương thức. Cách viết này giúp ta dễ hình dung vào thực tế. Trong lập trình hướng đối tượng, bất cứ hành động nào làm thay đổi dữ liệu của đối tượng cần được thực hiện thông qua các phương thức.

#### 3. Đối tượng trước khi có ES6 như thế nào

Quay trở lại với đối tượng người dùng được đề cập ở trên, với javascript trước phiên bản ES6 ta có một vài đối tượng ví dụ như sau

```javascript
var user1 = {name: "User 1", email: "email1@example.com"}
var user2 = {name: "User 2", email: "email2@example.com"}
var user3 = {name: "User 3", email: "email3@example.com"}
```
Ta thấy các đối tượng trên có chung các thuộc tính, một cách tốt hơn là tạo ra một bản mẫu sinh ra các đối tượng người dùng này (tương tự như class)

```javascript
function User(name, email) {
  this.name = name
  this.email = email
}
var user1 = new User('User 1', "email1@example.com")
var user2 = new User('User 2', "email2@example.com")
var user3 = new User('User 3', "email3@example.com")
```

Tiếp theo đó ta có thêm thêm các method cho đối tượng như sau
```
function User(name, email) {
  this.name = name
  this.email = email

  this.sayName = function() {
    console.log("My name is " + this.name)
  }
}
var user1 = new User('User 1', "email1@example.com")
user1.sayName() // My name is User 1
```

Trong ví dụ trên ta có một bản mẫu để tạo ra các đối tượng người dùng. Hàm `User` trong ví dụ trên chính là một hàm tạo. Hàm tạo là một hàm được gọi khi đối tượng được tạo ra (còn gọi là hàm khởi tạo). Trong hàm tạo User tạo ra các thuộc tính của đối tượng người dùng (name, email) các giá trị của chúng được lấy theo tham số truyền vào.

Theo cách này ta vẫn có thể lập trình hướng đối tượng trong Javascript một cách bình thường. Nhưng có vẻ nó hơi khó hiểu và nhìn khá là tệ hại, thấy chẳng giống ngôn ngữ nào cả có thể sẽ làm bạn bối rối. Rất may trong phiên bản ES6 cung cấp cho ta một các dễ hiểu hiểu hơn khi muốn lập trình hướng đối tượng trong Javascript.

#### 4. Lập trình hướng đối tượng trong ES6

Rất may trong ES6 ta có thể tạo ra các lớp nó tương tự với các ngôn ngữ phổ biến đang dùng như PHP, Ruby, Python ... bạn sẽ cảm thấy rất quen thuộc

Cú pháp khai báo lớp trong ES6 như sau
```javascript
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  sayName() {
    console.log("My name is " + this.name)
  }
}
let user1 = new User('User 1', "email1@example.com")
user1.sayName() // My name is User 1
```

Với cách viết như thế này bạn sẽ cảm thấy rất quen thuộc rất giống với các ngôn ngữ hướng đối tượng hiện tại. Sẽ có một hàm khởi tạo (constructor) riêng, việc khai báo các phương thức của đối tượng cũng hết sức đơn giản.

##### phương thức của lớp (class method) trong ES6

Class cũng có thể chứa các phương thức tĩnh (static). Phương thức tĩnh là một phương thức liên kết với lớp chứ không phải đối tượng. Phương thức tĩnh được gọi trực tiếp từ lớp chứ không gọi được từ đối tượng

```javascript
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  sayName() {
    console.log("My name is " + this.name)
  }

  static staticMethod() {
    console.log("I'm a static method")
  }
}

User.staticMethod() // I'm a static method
```

ES6 cũng giới thiệu thêm setters và getters (hàm gán giá trị và lấy giá trị). Một trong những khái niệm cơ bản của lập trình hướng đối tượng là tính đóng gói. Một phần cốt lõi của tính đóng gói là dữ liệu không được truy cập hoặc sửa đổi trực tiếp từ bên ngoài. Để truy cập hoặc thay đổi các giá trị của đối tượng ta phải thực hiện qua các phương thức mà đối tượng cung cấp.  

Để rõ hơn ta có ví dụ sau
```javascript
class User {
  constructor(name, email) {
    this._name = name
    this._email = email
  }

  get name() {
    return this._name
  }

  set name(newName) {
    this._name = newName
  }
}

let user = new User('User 1', 'user1@example.com')
console.log(user.name) // User 1
console.log(user.email) // undefined
user.name = 'User 1 new name'
```

Rất tiếc hiện tại ES6 vẫn chưa hỗ trợ thuộc tính private. Tất cả các thuộc tính của đối tượng đều có thể được thêm mới, truy cập hoặc thay đổi từ bên ngoài. Tuy nhiên nếu có thể thì vẫn nên tuân theo tính đóng gói của lập trình hướng đối tượng sẽ tốt hơn.

Hi vọng bài viết sẽ giúp ích cho bạn trong việc sử dụng class trong Javascript với ES6

#### Tham khảo
1. [ES6 classes](https://medium.com/@luke_smaki/javascript-es6-classes-8a34b0a6720a)