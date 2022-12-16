Bài viết này mình sẽ chia sẻ vể những cách đặt tên sao cho dễ đọc, dễ hiểu, dễ maintain. Không có ai quy ước cách đặt tên này nhưng nó được sử dụng rộng rãi như 1 tiêu chuẩn trong cộng đồng Javascript.
## 1. JAVASCRIPT NAMING CONVENTIONS: VARIABLES
Các biến trong javascrip có phân biệt chữ hoa và chữ thường. Do đó các biến JS có kí tự thường và viết hoa là hoàn toàn khác nhau.

```
var name = 'name 1';
 
var Name = 'name 2';
 
var NAME = 'name 3';
 
console.log(name);
// "name 1"
 
console.log(Name);
// "name 2"
 
console.log(NAME);
// "name 3"
```

Đặt tên biến phải self-descriptive, không cần thiết phải thêm comment để bổ sung tài liệu cho biến.

```
// bad
var value = 'A bê cê';
 
// bad
var val = 'A bê cê';
 
// good
var firstName = 'A bê cê';
```

Thông thường bạn sẽ thấy các biến js được khai báo bằng tên biến camelCase với kí tự viết thường ở đầu.

```
// bad
var firstname = 'Alex';
 
// bad
var first_name = 'Alex';
 
// bad
var FIRSTNAME = 'Alex';
 
// bad
var FIRST_NAME = 'Alex';
 
// good
var firstName = 'Alex';
```

Các ngoại lệ cho các class, hằng số... chúng ta sẽ nói sau. Tuy nhiên nói chung, một biến JavaScript - một chuỗi, boolean hoặc số, nhưng cũng là một đối tượng, mảng hoặc hàm - được khai báo với tên biến camelCase.
Tổng quan ngắn gọn về một vài style đặt tên :
* camelCase (used in JS)
* PascalCase (used in JS)
* snake_case
* kebab-case
## 2. JAVASCRIPT NAMING CONVENTIONS: BOOLEAN
Một tiền tố như is, are, or sẽ giúp chúng ta dễ dàng phân biệt biến boolean với 1 biến khác chỉ cần nhìn vào nó.

```
// bad
var visible = true;
 
// good
var isVisible = true;
 
// bad
var equal = false;
 
// good
var areEqual = false;
 
// bad
var encryption = true;
 
// good
var hasEncryption = true;
```

Ngược lại với chuỗi và số nguyên, bạn có thể xem nó như một quy tắc mềm khác cho quy ước đặt tên boolean trong JavaScript bên cạnh việc được viết bằng chữ hoa camel.
## 3. JAVASCRIPT NAMING CONVENTIONS: FUNCTION
Các hàm JavaScript cũng được viết kiểu camelCase. Ngoài ra, cách tốt nhất là thực sự cho biết hàm đang làm gì bằng cách đặt cho tên hàm một động từ làm tiền tố.

```
// bad
function name(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
 
// good
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

Động từ làm tiền tố này có thể là bất cứ thứ gì (ví dụ: get, fetch, push, apply, post...). Đó là một quy tắc mềm khác cần xem xét để có nhiều biến JavaScript tự mô tả hơn.
## 4. JAVASCRIPT NAMING CONVENTIONS: CLASS
Một class JavaScript được khai báo bằng PascalCase trái ngược với các cấu trúc dữ liệu JavaScript khác:

```
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
 
var me = new SoftwareDeveloper('Robin', 'Wieruch');
```

Mỗi khi một hàm tạo JavaScript được gọi để khởi tạo một thể hiện mới của một Class, thì tên của Class đó sẽ xuất hiện trong Pascal Case, vì ngay từ đầu lớp đã được khai báo bằng Pascal Case.

## 5. JAVASCRIPT NAMING CONVENTIONS: CONSTANT
Cuối cùng nhưng không kém phần quan trọng, có các hằng số - nhằm mục đích là các biến không thay đổi - trong JavaScript được viết bằng chữ in hoa (UPPERCASE):

```
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;
 
var DAY = SECONDS * MINUTES * HOURS;
```

Nếu một biến có nhiều hơn một từ trong tên khai báo biến của nó, nó sẽ sử dụng dấu gạch dưới (_):
``` 
var DAY = SECONDS * MINUTES * HOURS;
```

Thông thường, các hằng số JavaScript được định nghĩa ở đầu tệp JavaScript. Như đã gợi ý trước đây, không ai bắt buộc không được thay đổi biến ở đây, ngoại trừ một khai báo const của biến cho các cấu trúc dữ liệu nguyên thủy, nhưng việc đặt tên viết hoa cho thấy bạn nên tránh điều đó.

Trên đây là một vài chia sẻ mình thấy khá cần thiết, hi vọng nó sẽ hữu ích đối với những người mới bắt đầu với Javascript. Cảm ơn các bạn đã đọc bài của mình.

Nguồn tham khảo tại đây :  https://www.robinwieruch.de/javascript-naming-conventions