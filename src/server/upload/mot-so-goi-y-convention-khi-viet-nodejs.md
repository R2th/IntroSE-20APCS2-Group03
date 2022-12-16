Nếu như các developer trong cùng 1 dự án, mỗi người một phong cách code khác nhau thì đôi khi có thể tạo ra vấn đề khi phát sinh khi phát triển như người này phải đọc code người kia để hiểu và làm tiếp hoặc để fixbug. Để tránh những vấn đề như vậy khi làm việc theo nhóm, hầu hết các cộng đồng ngôn ngữ lập trình đều tuân theo bộ coding convention riêng. Bằng cách tuân theo các quy tắc này, mọi developer đều có thể viết code mà team của họ đọc có thể hiểu được mà không mất nhiều thời gian. <br>
Bài viết này hướng dẫn viết code Node.js nhất quán và đẹp mắt về mặt thẩm mỹ, các bạn có thể tham khảo.<br>
### 1. Formatting
* **4 spaces for indentation**

Sử dụng 4 dấu cách để thụt đầu dòng code của bạn và hãy chắc chắn không bao giờ trộn các tab và dấu cách - một loại địa ngục đặc biệt đang chờ đợi^^.<br>
* **No trailing white space**

Giống như bạn đánh răng sau mỗi bữa ăn, bạn hãy làm sạch bất kỳ khoảng trắng thừa nào trong các tệp .js của mình trước khi commit. Hãy cứ tưởng tượng những khoảng trắng thừa đó như mùi thối rữa của thức ăn, chính mùi đó sẽ xua đuổi những người cùng team với bạn hoặc đồng nghiệp bạn.<br>
* **80 characters per line**

Giới hạn dòng của bạn nên ở 80 ký tự. Vâng, màn hình đã lớn hơn nhiều trong vài năm qua, nhưng bộ não của bạn thì không. Sử dụng thêm chỗ để chia đôi màn hình, trình soạn thảo của bạn hỗ trợ điều đó, phải không?<br>
* **Use single quotes**

Sử dụng dấu ngoặc kép, trừ khi bạn đang viết JSON. Điều này giúp bạn tách chuỗi đối tượng của mình khỏi chuỗi bình thường.<br>

Right:
`var foo = ‘bar’;`<br>
Wrong:
`var foo = “bar”;`
* **Opening braces go on the same line**

Dấu ngoặc nhọn mở đầu của bạn đi cùng dòng với câu lệnh.<br>

Right:
```
if (true) {
    console.log(‘winning’);
}
```
Wrong:
```
if (true) 
{
    console.log(‘losing’);
}
```
Ngoài ra, hãy lưu ý việc sử dụng khoảng trắng trước và sau câu lệnh điều kiện. Điều gì xảy ra nếu bạn muốn viết ‘else’ hoặc ‘else if’ cùng với ‘if’…<br>

Right:

```
if (true) {
    console.log(‘winning’);
} else if (false) {
    console.log(‘this is good’);
} else {
    console.log(‘finally’);
}
```
Wrong:

```
if (true)
{
    console.log(‘losing’);
}
else if (false)
{
    console.log(‘this is bad’);
}
else
{
    console.log(‘not good’);
}
```
* **Declare one variable per var/let/constant statement**

Khai báo một biến cho mỗi câu lệnh var/let/constant, nó giúp sắp xếp lại các dòng dễ dàng hơn.<br>

Right:

```
var keys = [‘foo’, ‘bar’];
var values = [23, 42];
var object = {};
```
Wrong:

```
var keys = [‘foo’, ‘bar’],
values = [23, 42],
object = {},
key;
```
### 2. Naming Conventions
* **Use lowerCamelCase for variables, properties and function names**

Các variables, properties và tên function nên sử dụng lowerCamelCase. Chúng cũng phải mang tính mô tả. Thường nên tránh các biến ký tự đơn và các chữ viết tắt không phổ biến.

Right:
`var adminUser = db.query(‘SELECT * FROM users …’);`
<br>
Wrong:
`var admin_user = db.query(‘SELECT * FROM users …’);`
* **Use UpperCamelCase for class names**

Tên class phải được viết hoa bằng cách sử dụng UpperCamelCase.<br>

Right:

```
function BankAccount() {
//
}
```
Wrong:

```
function bank_Account() {
//
}
```
* **Use UPPERCASE for Constants**

Hằng số nên được khai báo dưới dạng biến thông thường hoặc static class properties, sử dụng tất cả các chữ cái viết hoa.<br>

Right:

```
var SECOND = 1 * 1000;
function File() {
}
File.FULL_PERMISSIONS = 0777;
```
Wrong:

```
const SECOND = 1 * 1000;
function File() {
}
File.fullPermissions = 0777;
```
### Variables
* **Object / Array creation**

Sử dụng dấu phẩy ở cuối và đặt các khai báo ngắn gọn trên một dòng.<br>

Right:

```
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```
Wrong:

```
var a = [
  'hello', 'world'
];
var b = {"good": 'code'
        , is generally: 'pretty'
        };
```
### Conditionals
* **Use the === operator**

Lập trình không phải để ghi nhớ các quy tắc ngu ngốc. Sử dụng  triple equality operator  và nó sẽ hoạt động như mong đợi.<br>

Right:

```
var a = 0;
if (a !== '') {
  console.log('winning');
}
```
Wrong:

```
var a = 0;
if (a == '') {
  console.log('losing');
}
```
* **Use descriptive conditions**

Mọi điều kiện non-trivial nên được gán cho một biến hoặc hàm có tên mô tả:

Right:

```
var isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);
if (isValidPassword) {
  console.log('winning');
}
```
Wrong:

```
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing');
}
```
### Functions
* **Write small functions**

Giữ cho các function của bạn thật ngắn gọn. Mỗi function chỉ làm 1 việc<br>
* **Return early from functions**

Để tránh lồng sâu các câu lệnh if, hãy luôn trả về giá trị của hàm càng sớm càng tốt.<br>

Right:

```
function isPercentage(val) {
  if (val < 0) {
    return false;
  }
  if (val > 100) {
    return false;
  }
  return true;
}
```
Wrong:

```
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```
Hoặc đối với ví dụ cụ thể này, bạn cũng có thể rút ngắn mọi thứ hơn nữa:
```
function isPercentage(val) {
  var isInRange = (val >= 0 && val <= 100);
  return isInRange;
}
```
### Comments
* **Use slashes for comments**

Sử dụng dấu gạch chéo cho cả comments một dòng và nhiều dòng. Cố gắng chỉ viết comment giải thích ở những phần logic phức tạp.<br>

Right:

```
// 'ID_SOMETHING=VALUE' -> ['ID_SOMETHING=VALUE', 
// 'SOMETHING', 'VALUE']
var matches = item.match(/ID_([^\n]+)=([^\n]+)/));
// This function has a nasty side effect where a failure to 
// increment a redis counter used for statistics will 
// cause an exception. This needs to be fixed in a later iteration.
function loadUser(id, cb) {
  // ...
}
var isSessionValid = (session.expires < Date.now());
if (isSessionValid) {
  // ...
}
```
Wrong:

```
// Execute a regex
var matches = item.match(/ID_([^\n]+)=([^\n]+)/);
// Usage: loadUser(5, function() { ... })
function loadUser(id, cb) {
  // ...
}
// Check if the session is valid
var isSessionValid = (session.expires < Date.now());
// If the session is valid
if (isSessionValid) {
  // ...
}
```
Cảm ơn bạn vì đã đọc!<br>
Link bài viết gốc: https://medium.com/swlh/node-js-coding-style-guidelines-74a20d00c40b