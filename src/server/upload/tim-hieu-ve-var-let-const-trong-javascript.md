Trong bài viết này chúng ta sẽ cùng hiểu sự khác biệt Var, Let & Const trong javascript
Chúng ta sẽ sửa dụng cửa sổ console mặc định của trình duyệt để chạy các ví dụ:

### Var
Cách thức khai báo
```
var name = "Benjamin";
console.log(name);
```
Khi bạn thực thi đoạn code trên. Biến `name` của bạn sẽ oput ra giá trị: `Benjamin` trên cửa sổ console. Và biến `name` sẽ là 1 biến có phạm vi global. 

Chúng ta có thể viết function riêng như sau:
```
function setup() {
  var name = "Benjamin";
}

setup();

console.log(name);
```
Bạn nghĩ thế nào với kết console.log ra màn hình. Nếu bạn nghĩ  nó là `Benjamin` thì bạn đã nhầm.
Bởi vì biên `name` được định nghĩa trong function `setup()` và nó chỉ có phạm vi trong function `setup()`.
Điều này có nghĩa là biến `name` sẽ chỉ được sử dụng trong phạm vi của function `setup()`.
Như vậy khi thực hiện đoạn code trên  output trên cửa sổ console.log sẽ là `undefined`.

Chúng ta có thể sử dụng các biến có phạm vi toàn cầu bên trong function `setup()`. Điều này có nghĩa là biến `age` có thể được sử dụng bên trong function `settup()`. Điều này sẽ oput ra `Benjamin 26 years old` trong cửa sổ console. 

```
var age = 26;

function setup() {
  var name = "Benjamin";
  
  console.log(name + " is " + age + " years old");
}

setup();
```

Bạn chỉ có thể truy cập các `variables` có cùng phạm vi hoặc phạm vi cao hơn. Vì vậy, từ bên trong một function, bạn có thể truy cập phạm vi `global`. Nhưng từ global bạn không thể truy cập vào một `variable` chỉ được tạo trong một function.

Nó có nghĩa là bạn có thể thay đổi được giá tri của biến global bên trong một function.
Ví dụ:
```
var age = 26;

function setup() {
  var name = "Benjamin";
  age = 35;
}

setup();

console.log(age);
```
Chúng ta đã thay đổi gía trị của biến `age`. Biến `age` lúc này sẽ được thay đổi thành `35`. Khi đoạn code trên được thực thi ouput ra console của `age` đã được thay thành `35`.

Sẽ khó khăn trong việc kiểm soát giá trị `param` khi `var` được sử dụng trong vòng lặp `for` hoặc trong câu lệnh điều kiện `if`... Một vòng lặp `for` hoặc một câu lệnh `if` đã tạo ra các biến của riêng nó. Điều này có nghĩa là biến có thể truy cập rộng rãi hơn bên ngoài vòng lặp vòng lặp dẫn tới phát sinh 1 số bug. Trong ví dụ dưới đây, biến i có phạm vi toàn cục. Điều này sẽ  chỉ ra ở vd dưới đây.
```
for (var i = 1; i <= 10; i++) {
  // Do something in this loop
}

console.log(i);

// The example above behaves the same as:

var i = 1;

for (i; i <= 10; i++) {
  // Do something in this loop
}

console.log(i);
```
Lúc này kết quả oput ra console sẽ là `10`. mặc dù có global param `i` = 1.
 
### Let
Khác với var `let` được sử dụng trong phạm vi khối. Có nghĩa là `let` sẽ không quan trâm đến global param hay local bên trong function.
 `let` sẽ quan tâm đến khối mà nó đang tham gia. Một khối cơ bản là có `{}`. Nó có thể là 1 function(), cũng có thể là 1 vòng lặp `for` hoặc mệnh đề `if`
 ```
 
let i = 5;

for (let i = 1; i <= 10; i++) {
  // Do something in this loop
}

console.log(i);
 ```
 Điều này có nghĩa là trên ví dụ trên param `i` không bị cập nhật thay đổi giá trị => conslog sẽ đưa ra oput là `5`
 `let` hữu ích khi bạn muốn có một biến trong phạm vi của nó. Nó cũng có cập các biến ở các khối cao hơn & phạm vi cao hơn.
 giống như `var` để truy cập các biến có phạm vi cao hơn.
 
 ### Const
 
 `Const` làm việc gần như `let` tuy nhiên 1 khi bạn đã gán giá trị cho nó bạn sẽ ko thể thay đổi nó bằng 1 giá trị mới.
```
for (const i = 1; i <= 10; i++) {
  // Do something in this loop
}

console.log(i);
``` 
Ví dụ trên sẽ đưa ra một `error` cho bạn biết rằng bạn đang cố gán giá trị mới cho `const`.
`Const` sẽ hoạt động tốt bất cứ khi nào có 1 biến mà bạn không muốn thay đổi.
Bạn có thể sự dủng `const` để cho code của dễ đọc hơn. 
Bạn có thể sử dụng mã được fix cứng ở nhiều nơi, nhưng sử dụng `const` 
làm cho mã của bạn dễ bảo trì hơn. Bất cứ khi nào giá trị này cần được thay đổi sẽ rất dễ dàng 
và nhanh chóng thay vì phải tìm kiếm và thay thế cho toàn bộ mã fix cứng.
 
 Trong ví dụ dưới đây, `username` là giá trị mà chúng tôi nhận được từ đầu vào của người dùng và sẽ không thay 
  Một biến const làm cho mã dễ đọc hơn nhiều.
  ```
  const username = document.querySelect(‘input[name=”username”]’).value;
  ```
Điều tương tự cũng xảy ra khi bạn làm việc với các `object` lớn. bạn cũng có thể sử dụng `const` để tăng khả năng đọc.
```
const books = api.data.sources[‘library’].books;
```
Sử dụng `const` sẽ giúp bạn làm cho các đoạn mã trên trong ràng và minh bạch hơn. Điều này đặc biệt hưu ích khi bạn làm việc nhóm mà một ai đó sử dụng `const` trong code. Người đọc code sẽ hiểu rằng có lẽ ko nên thay đổi giá trị này.
  
 #### The Exception: the Combination of const and objects

 Khai báo `const` tạo một tham chiếu chỉ đọc đến một giá trị. Điều đó không có nghĩa là giá trị mà nó giữ là bất biến, chỉ là định danh biến không thể được gán lại.
 Điều này có nghĩa là không thể thực hiện việc gán lại const.
 ```
 const user = { 'name': 'Benjamin'};
 
 user = { 'name': 'Bob'};
 
 console.log(user);
 ```
 Nhưng bạn có thể thay đổi giá trị của đối tượng này  như sau:
 ```
 const user = { 'name': 'Benjamin'};
 
 // This is possible and won't give any errors
 user.name = 'Bob';
 user.age = 38;
 ```
Bài viết của mình đến đây là hết hẹn gặp lại trong các bài viết tiếp theo:

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/JavaScript

https://medium.com/better-programming/javascript-variables-the-difference-between-var-let-and-const-10efef5d2728