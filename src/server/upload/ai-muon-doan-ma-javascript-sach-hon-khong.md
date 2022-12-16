![](https://images.viblo.asia/63ddca92-1c39-4170-b471-4030340aab02.jpg)

**Đồng đội:** `Đứa nào viết đoạn code này đây?`<br>
**Mong đợi:** `Ít sờ my!` Bạn trả lời một cách tự hào vì đơn giản đoạn code trông có vẻ khá là ổn áp.<br>
**Thực tế:** `Nah, không phải tao!` Bạn đang cố trốn tránh trách nhiệm vì đoạn code đó quá là lởm.<br>
Giờ nếu bạn muốn biến những thứ mong đợi bên trên thành hiện thực thì hãy đọc tiếp tục bài viết nhé.<br/>

-----
### 1.Sử dụng tên biến có nghĩa
Hãy cố gẳng sử dụng những tên biến có ý nghĩa một chút nhé, làm sao mà ngay khi đọc đến thì bạn đã biết chính xác nó dùng để làm gì:
```javascript
// Bad
let xyz = validate(‘BuiThiDung’);

// Good
let isUsernameValid = validate(‘BuiThiDung’);
```
Đừng quên thêm `s` vào sau những tên biến mà trả về là một tập hợp các phần tử (ví dụ như một mảng các số, một hash lưu các đối tượng, ...)
```javascript
// Bad
let number = [3, 5, 2, 1, 6];

// Good
let numbers = [3, 5, 2, 1, 6];
```
Hàm(functions) để làm việc gì đó, vậy nên tên của hàm phải là một động từ:
```javascript
// Bad
function usernameValidation(username) {}

// Good
function validateUsername(username) {}
```
Bắt đầu với `is` nếu kiểu trả về có dạng `true` hoặc `false`:
```javscript
let isValidName = validateName(‘BuiThiDung’);
```
Đừng cố sử dụng hằng số một cách trực tiếp(không khai báo cụ thể) vì nếu sau này bạn đọc lại code sẽ chẳng hiểu gì đâu - `What the hell is this?`. Tốt hơn hết là đặt ra cho hắng số đó một cái tên và gọi lại mỗi khi dùng đến:
```javascript
// Bad
let area = 5 * 5 * 3.14;

// Good
const PI = 3.14;
let radius = 5;
let area = PI * radius * radius;
```
Đối với callback functions, đừng quá lười biếng khi chỉ đặt tên cho tham số dưới dạng một ký tự như **a**, **o**, **m**,.. hãy đặt tên cụ thể nhưng cũng đừng quá dài dòng. Nếu tham số truyền vào là đối tường sách hãy đặt tên là `book`, nếu là người dùng hãy đặt tên là `user`:
```javascript
// Bad
let books = [‘Nếu Chỉ Còn Một Ngày Để Sống’, ‘Bạn Đắt Giá Bao Nhiêu?’, ‘Nhà Giả Kim’];
books.forEach(function(b) {
  // …
});

// Good
let books = [‘Nếu Chỉ Còn Một Ngày Để Sống’, ‘Bạn Đắt Giá Bao Nhiêu?’, ‘Nhà Giả Kim’];
books.filter(function(book) {
  // …
});
```

### 2.Đưa ra lỗi cụ thể
`An error occurs.`<br/>
`Error.`<br/>
Lỗi? Cái gì lỗi? Lỗi như thế nào? Lỗi ở đâu?<br/>
Mỗi khi gặp lỗi như vậy khi dùng app, hoặc vào một trang vào nào đó,với tư cách là người dùng thông thường, mình khá là khó chịu khi gặp phải điều này. <br/>
Những lúc như thế này thì người dùng đúng kiểu hỏi chấm các thứ: <br/>`Tôi đã làm điều gì sai à?` <br/>`Tôi đã làm sai cái gì à?`<br/> `Mà sai cái gì mới được chứ?` <br>`Mà tại sao lại sai ý?`.<br>
Bạn không có một thông báo cụ thể về lỗi dẫn đến người dùng cũng chẳng biết phải làm gì tiếp theo? <br/>
Đó cũng là một trong các lý do khiến những người gặp phải trường hợp trên gỡ app vừa cài không một chút do dự và cũng chẳng bao giờ sử dụng lại app của bạn nữa.<br/>
Sẽ không quá khó cho việc thông báo lỗi một cách rõ ràng đâu nhỉ.<br/>
Giả dụ nếu không có kết nối mạng Internet thì hãy:
```javascript
showMessage(‘No internet connection! Please check your connection and try again!’);
```
Nếu người dùng quên không nhập username thì:
```javascript
showMessage(‘Please enter your username’);
```
Quan trọng hơn vẫn là việc định nghĩa lỗi rõ ràng giúp bạn debug code dễ dàng và nhanh chóng hơn.
```javascript
if (error) {
  throw new Error(‘validation.js:checkUser: special characters are now allowed’);
}
```

### 3. Return càng sớm càng tốt.
Hãy đọc đoạn code dưới đây:
```javascript
// Bad
function login(username, password) {
  if (isValid(username)) {
    // Log in
  } else {
    showMessage(‘Username is not valid’);
  }
}
```
Bài trước mình cũng nói về vấn đề này rồi, nếu quan tâm bạn có thể [vào đây](https://viblo.asia/p/lam-the-nao-de-tranh-su-dung-else-khi-code-maGK7J2e5j2) để đọc. Giờ thì hãy để ý cụm trong `else`, chỉ có một dòng code trong `else` như thế này là không thật sự cần thiết, Sao chúng ta không xóa `else` đi và trả về tin nhắn báo invalid sớm nhất có thể nhỉ:
```javascript
// Good
function login(username, password) {
  if (!isValid(username)) {
    showMessage(‘Username is not valid’);
    return;
  }
  // Log in
}
```
Điều này làm cho đoạn code của bạn rõ ràng hơn đúng không. Với những trường hợp khác, bạn nên ưu tiên đưa những phần đơn giản, ít logic lên đầu tiên và return sớm nhất nếu có thể, còn những phần dài hơn, có nhiều logic xử lý hơn thì nên đưa xuống dưới cùng.
### 4. Đừng xử lý quá nhiều việc trong một hàm
Mỗi hàm viết ra chỉ nên thực hiện một chức năng thôi, đừng biến hàm đó thành `nồi chè thập cẩm`.
```javascript
function validateAndLogin() {
  // Xử lý quá nhiều thứ ở đây
}
```
Từ `and` không nên đặt tên cho hàm như vậy. Bởi `and` là số nhiều rồi, một hàm có nhiều hơn một chức năng sẽ khó control, về lâu dài thì sẽ gây hại hơn là có lợi, Tốt hơn bạn nên:
```javascript
function validate() {
  // Chỉ check validate
}

function login() {
  // Chỉ login
}
```
### 5. Avoid Side Effect
Bất cứ những thứ gì bên ngoài một hàm thì đều không liên quan đến nó. Do đó hàm sẽ không nên sử dụng đến những thứ ngoài phạm vi của hàm đó, ví dụ như:
```javascript
var number = 3;
function changeNumber(add) {
  number = 2 + add;
  return number;
}

// console.log(number)
3
changeNumber(4);
// console.log(number)
4
```
Khi bạn gọi hàm chaneNumber, biến **number** bên ngoài sẽ thay đổi thành **6**. Thực sự đây là một vấn đề lơn nha, vì đôi khi bạn không biết tại sao lại có sự thay đổi của một biến toàn cục. Vậy bạn nên tránh sử dụng những thứ bên ngoài hàm nha.<br/>
Ví dụ trên có thể thay đổi lại như sau:
```javascript
function addThree(summand) {
  const constant = 3;
  const sum = summand + constant;
  return sum;
}
```
### 5. Tạo mô-đun
Bạn tạo ra một vài function, và những function này lại có chức năng tương tự nhau. Ví dụ như **validateUsername** và **validatePassword**. Bạn cảm thấy rằng chúng có thể được nhóm thành một mô-đun. Hãy gọi nó là mô-đun validation:
```javascript
const validateUsername = function (username) {
  // Validate username
};
const validatePassword = function (password) {
  // Validate password
};
Module.exports = {
  validateUsername,
  validatePassword
};
const { 
  validateUsername,
  validatePassword
} = require(‘./validation’);
let isUsernameValid = validateUsername(‘BuiThiDung’);
```
### 6. Sử dụng Plugin
Sử dụng plugin sẽ không nâng cao trình độ code đau nhé :v, nhưng sẽ giúp bạn tiết kiệm thời gian đỡ format lại code, đọc code dễ dàng hơn này, dễ phát hiện lỗi(như lỗi syntax chẳng hạn)... Nhờ đó, bạn có thể sử dụng thời gian đó để tập trung hơn vào chất lượng code của mình .<br>

Nếu bạn  VSCode thì bạn có install một vài plugin mà mình cho là hữu ích và hay dùng sau:<br/>
`Prettier - Code formatter`<br>
`ESLint`<br>
`GitLens — Git supercharged`<br>
`indent-rainbow` - Màu phân biệt cho từng indent<br>
`Rainbow Brackets` - Màu phân biệt cho từng cặp đóng-mở ngoặc<br>
`endwise` - Tự động end (ruby)<br>
`Auto Close Tag` - Tự động đóng tag<br>
`Auto Rename Tag` - Tự động rename của tag đóng(hoặc mở) tương ứng<br>
### Tham khảo
[JavaScript In Plain English](https://medium.com/javascript-in-plain-english/who-else-wants-to-write-clean-javascript-code-ff4f7896e6bd)