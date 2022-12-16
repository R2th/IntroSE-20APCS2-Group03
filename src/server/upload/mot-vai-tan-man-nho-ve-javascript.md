### Arrow function
Khi sử dụng javascript trong các dự án, chúng ta thường sẽ tạo ra các function ẩn danh thay vì đặt tên cho chúng. Chúng ta thường làm như vậy đối với các hàm mà chúng ta chỉ định sử dụng một lần, chẳng hạn như khi sử dụng một hàm làm đối số.

Trước ES6, chúng ta sẽ viết các function ẩn danh như sau:

```js
const myFunc = function(){
  const myCat = "Bi";
  return `My cat name is ${myCat}`
}

myFunc() // My cat name is Bi
```

ES6 cung cấp các *Arrow functions* cho phép viết các function ẩn danh này ngắn gọn hơn:

```js
const myFunc = () => {
  const myCat = "Bi";
  return `My cat name is ${myCat}`
}

myFunc() // My cat name is Bi
```

Thậm chí tốt hơn nếu không có nội dung function và chỉ có giá trị trả về, arrow function cho phép bỏ qua *return* và *()*.

```js
const myFunc = () =>  "My cat name is Bi"
myFunc() // My cat name is Bi
```

### Viết Arrow Functions với Parameters

Cũng giống như với các hàm thông thường, có thể chuyển các đối số (argument) dưới dạng tham số trong các arrow function:

```js
const addFive = (num) => num + 5
addFive(1) // 6
```

Nếu chỉ có một đối số, có thể rút ngắn code hơn nữa bằng cách bỏ qua dấu ngoặc đơn xung quanh đối số.

```js
const addFive = num => num + 5
addFive(1) // 6
```
Cũng có thể chuyển nhiều đối số vào trong Arrow function
```js
const addNums = (num1,num2) => num1 + num2
addNums(10,5) // 15
```

### Thay đổi ngữ cảnh của forEach() callback

Khi làm password toggle, cần truy cập vào giá trị này của một function bên ngoài từ bên trong một function gọi lại. Việc truy cập vào phạm vi của một function bên ngoài như thế này được gọi là bao đóng (closure - sự kiết hợp đơn giản giữa một function và môi trường nơi function được khai báo vào lúc function được chạy), hoặc phạm vi (lexical scoping).

Đây là đoạn code được đề cập:

```js
function handleChange () {
  passwords.forEach(password => {
    togglePassword(this, password);
  });
}

toggle.addEventListener('change', handleChange);
```

Các Arrow function không có ràng buộc riêng đối với giá trị này, vì vậy đoạn code này thực hiện những gì muốn nó làm. Từ khóa *this* đề cập đến ngữ cảnh gốc, trong trường hợp này, là biến chuyển đổi.

Arrow function giúp không phải sử dụng biến var cũ:

```js
function handleChange () {
  var that = this;

  passwords.forEach(function (password) {
    togglePassword(that, password);
  });
}
```

Nhưng cũng có thể thay đổi ngữ cảnh của forEach() callback.

Phương thức forEach() nhận đối số thứ hai tùy chọn, là giá trị để sử dụng cho từ khóa *this* bên trong function gọi lại:

```js
function handleChange () {
  passwords.forEach(function (password) {
    togglePassword(this, password);
  }, this);
}
```

Trong đoạn code trên, giá trị này bên trong function gọi lại một lần nữa tham chiếu đến giá trị này của function bên ngoài, giống như nó đã làm với Arrow function.

Cũng có thể sử dụng phương thức bind () để thay đổi ngữ cảnh:
```js
function handleChange () {
  passwords.forEach(function (password) {
    togglePassword(this, password);
  }.bind(this));
}
```

Ngoài ra cũng có thể chỉ sử dụng đối số thứ hai tùy chọn đã đề cập ở trên.

Đối số thứ hai tùy chọn không chỉ hoạt động cho các phương thức forEach() (cả Array và NodeList), mà còn cho các phương thức cá thể ở các mảng sau:

* Array.prototype.every()
* Array.prototype.filter()
* Array.prototype.find()
* Array.prototype.findIndex()
* Array.prototype.map()
* Array.prototype.some()

Các giải pháp này không hoàn toàn gọn gàng lắm như việc sử dụng Arrow function, nhưng lại khá ổn khi cần support dùng trên IE mà không muốn xài Babel.

### Kết luận
Ở phần tới, mình sẽ viết một bài về cheatshet của Arrow Function, mong mọi người đón đọc nhé!