## Giới thiệu
React là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng. Nó được biết đến với  Virtual DOM và Components. Tuy nhiên, trước khi bắt đầu học React, bạn cần phải hiểu rõ về JavaScript và các tính năng của nó. Vì vậy, bạn cần phải nắm rõ những điều cơ bản đó vì chúng sẽ giúp bạn làm việc với React dễ dàng hơn nhiều.
Trong bài viết này, chúng tôi sẽ cung cấp cho bạn những hiểu biết cơ bản về tất cả các tính năng này mà bạn cần phải nắm rõ trước khi bạn bắt đầu học ReactJs.

### 1. **Let** and **Const**
Từ khóa `let` là một trong những tính năng hữu ích của ES6 trong JavaScript. Nó được sử dụng để khai báo các biến như từ khóa `var`. Nhưng từ khóa let là block scope, có nghĩa là không thể truy cập từ khóa bên ngoài phạm vi đó.
Ví dụ:
```
var x = 1;
console.log(x); // x = 1
{
  let a = 2; // Block scope.
  var y = 3; 
  console.log(a);   // a = 2
  console.log(y);  // y = 3
}
// a can NOT be used here
console.log(a) // error: a is not defined
console.log(x); // x = 1
console.log(y); // y = 3
```

Từ khoá `const` cũng tương tự như `let`, nó cũng là block scope nhưng nó được sử dụng cho các giá trị không đổi, có nghĩa là nó không thể thay đổi
Ví dụ:
```
let name = "Mickey";
console.log(name); // Mickey
name = "John";
console.log(name); // John

const name = "Mickey"; 
console.log(name); // Mickey
name = "John";
console.log(name); // error: Uncaught TypeError: Assignment to constant variable.
```
**Lưu ý** : Đối với Object và Array thì có thể thay đổi

Ví dụ: 
```
// Object
const student = {name:"Peter", age:18, class:'12'};
console.log(student); // {name:"Peter", age:18, class:'12'}
student.name = "John";
console.log(student); // {name:"John", age:18, class:'12'}

// Array
const name = ['Peter','John'];
console.log(name); // ['Peter','John']
name[1] = 'Miley';
console.log(name) // ['Peter','Miley']
```
**Lưu ý**: Khác với từ khóa `var`, `let` và `const` không `hoisting`
### 2. Arrow Function
Arrow function  là một tính năng mới được giới thiệu trong ES6, là một cú pháp ngắn gọn hơn để viết các biểu thức hàm. Nó  được sử dụng gần như rộng rãi vì cách viết ngắn gọn và dễ đọc.
Ví dụ:
```
let name;
// Function declaration
function student(name) {
   return name;
}
console.log(student('John')); // John
// Arrow function
const student = (name) => {
  return name;
}
console.log(student('John')); // John
```
Như bạn thấy, ở đây tôi bỏ từ khóa `function` và thêm mũi tên `=> ` sau `()`. Các dấu ngoặc đơn vẫn được sử dụng để truyền các tham số hàm và nếu bạn chỉ có một tham số, bạn có thể bỏ dấu ngoặc đơn.
Một cái hay của arrow function nữa đó là nếu arrow function của bạn chỉ có một dòng, bạn có thể trả về các giá trị mà không cần phải sử dụng từ khóa `return` và dấu ngoặc nhọn `{}`.
Ví dụ :
```
const testFunction = () => 'Hello world';
console.log(testFunction()); // Hello world
```
### 3. Destructuring Assignment
Một trong những cú pháp mới hữu ích nhất được giới thiệu trong ES6, `Destructuring assignment` chỉ đơn giản là sao chép một phần của một Object hoặc Array và  và gán nó cho nhiều biến riêng biệt.
Ví dụ:
```
//Object
const user = { name: Peter', age: 18 };
console.log(user.name) // Peter
console.log(user.age); // 18
// Array
const numbers = [1,2];
console.log(numbers) // [1,2]
// Using the ES6 destructuring syntax:
const { name, age } = user;
console.log(name, age); // Peter, 18
const [one,two] = numbers;
console.log(one,two) // 1,2
```
### 4. Map, Filter, Reduce
**1. Map**

Phương thức map là cho phép bạn lặp qua một mảng và sửa đổi các phần tử của nó bằng cách sử dụng một hàm callback.Sau đó hàm callback sẽ được thực thi trên các phần tử của mảng.

Ví dụ:
```
const arr = [3, 4, 5, 6];
const modifiedArr = arr.map(function(element){
    return element *3;
});
console.log(modifiedArr); // [9, 12, 15, 18]
```
**2. Filter**

Phương thức filter nhận từng phần tử trong một mảng và nó áp dụng một câu lệnh điều kiện đối với nó. Nếu điều kiện này trả về true, phần tử sẽ được đẩy vào mảng đầu ra. Nếu điều kiện trả về false, phần tử không được đẩy vào mảng đầu ra.

Ví dụ
```
const numbers = [1, 3, 6, 8, 11];
const lucky = numbers.filter(function(number) {
  return number > 7;
});
console.log(lucky); // [8,11]
```
**3. Reduce**

Phương thức reduce là lặp tất cả các phần tử trong mảng và trả về một kết quả cuối cùng.

Ví dụ:
```
const arr = [1,2,3];
const max = arr.reduce(function(a,b) {
    return Math.max(a, b);
});
console.log(max) // 3
```
###  5. ES6 Classes
Trong JavaScript, các lớp là một khuôn mẫu để tạo các đối tượng. Chúng được xây dựng trên các nguyên mẫu và chúng cung cấp một đường cú pháp dễ dàng để viết các hàm khởi tạo cho lập trình hướng đối tượng trong JavaScript.

Ví dụ: 
```
class User {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
}
const peter = new User('Peter', 18);
console.log(peter); // User { name: "Peter', age: 18 }
```
**Kế thừa class trong Es6**

Một lớp được tạo với kế thừa lớp sẽ kế thừa tất cả các phương thức từ một lớp khác.Để tạo một kế thừa lớp, hãy sử dụng từ khóa `extend`.  Hãy xem ví dụ dưới đây, nơi chúng ta sẽ tạo một lớp có tên là “Role" sẽ kế thừa các phương thức từ lớp "User"

Ví dụ:
```
class User {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
}
const peter = new User('Peter', 18);
console.log(peter); // User { name: "Peter', age: 18 }

class Role extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role
  }
}
const john = new Role('John', 18, 'admin');
console.log(john) // Role { name: "John", age: 18, role: "admin" }
```
### 6. Modules
Hệ thống mô-đun ES6 cho phép JavaScript để import và export file.  Đó là một cách để dễ dàng chia sẻ code giữa các files Javascript và đó là điều đầu tiên bạn sẽ sử dụng trong React.
Để sử dụng các mô-đun JavaScript, bạn phải cho trình duyệt biết rằng bạn đang sử dụng các mô-đun bên trong files Javascript của mình. Bạn có thể đạt được điều đó bằng cách đặt tập lệnh bên dưới bên trong thẻ head trong HTML của mình.
```
<script src="myscripts.js"></script>
```
Giả sử bạn muốn sử dụng code trong một số files khác nhau. Bạn có thể đạt được điều đó bằng cách export đoạn code đó, sau đó import vào file khác.
```
export const calculator = (x, y) => {
  return x + y;
}
// OR.
const calculator = (x, y) => {
  return x + y;
}

export { calculator };
```
Bây giờ bạn có thể nhập mã đã xuất đó vào một files khác để sử dụng nó
```
import { calculator } from './calculator.js';
```
### 7. The Spread Operator
Toán tử spread là một trong những tính năng quan trọng và hữu ích đã được thêm vào JavaScript. Spread Operator cho phép chuyển đổi một chuỗi thành nhiều argument (function) hoặc thành nhiều phần tử ( array ). Operator này có syntax là 3 dấu chấm `...`

Ví dụ:
```
const number= [1,2,3,4];
const newNumber = [...number];
console.log(newNumber); //[1,2,3,4] 
```
## Kết luận
Như bạn có thể thấy, sau khi hiểu rõ về tất cả các tính năng này trong JavaScript, bạn sẽ có thể dễ dàng học bất kỳ framework nào. Tuy nhiên, không có nghĩa là bạn phải thành thạo mọi thứ về JavaScript để bắt đầu viết một ứng dụng React, nhưng những khái niệm này sẽ giúp bạn làm mọi thứ dễ dàng hơn. Mong rằng bài viết sẽ giúp ích cho bạn.

Link tham khảo: https://medium.com/swlh/7-javascript-features-you-need-to-know-before-learning-react-e77c3b3481d8