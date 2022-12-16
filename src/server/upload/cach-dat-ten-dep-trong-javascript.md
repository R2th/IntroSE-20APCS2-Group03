## Tên biến
***Trong Javascript, tên biến phân biệt hoa thường***
```js
var number = 'One';
var Number = 'True';
var NUMBER = 'Three';
console.log(number);
// "One"
console.log(Number);
// "True"
console.log(NUMBER);
// "Three"
```
***Tên biến cần phải rõ nghĩa, không cần phải ghi chú gì thêm, nhìn vào tên biến là có thể biết được nó chứa thông tin gì***
```js
❌ Không nên
var value = 'Nhi';
❌ Không nên
var val = 'Nhi';

✅ Nên
var firstName = 'Nhi';
```
***Viết Javascript được khuyến khích sử dụng tên biến theo kiểu con lạc đà***
```js
❌ Không nên
var firstname = 'Nhi';
❌ Không nên
var first_name = 'Nhi';
❌ Không nên
var FIRSTNAME = 'Nhi';
❌ Không nên
var FIRST_NAME = 'Nhi';

✅ Nên
var firstName = 'Nhi';
```
***Các trường hợp ngoài lệ, có luật riêng là hằng số, biến cục bộ, class, component***

## Biến Boolean
***Với biến mang giá trị là Boolean (true/false, 0/1), thêm tiền tố `is, has, are`***
```js
❌ Không nên
var visible = true;

✅ Nên
var isVisible = true;

❌ Không nên
var equal = false;

✅ Nên
var isEqual = false;

❌ Không nên
var encryption = true;

✅ Nên
var hasEncryption = true;
```
## Đặt tên class
***Tên class được đặt theo kiểu `PascalCase`***
```js
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
var me = new FrontendDeveloper('Nhi', 'Developer');
```
## Đặt tên hàm, phương thức của một class
***Hàm cũng đặt tên theo con lạc đà, tốt nhất nên diễn đạt hàm đó làm gì bằng cách thêm một tiền tố là một động từ***
```js
❌ Không nên
function name(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

✅ Nên
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```
***Một số tiền tố hay được sử dụng là: `get, fetch, push, apply, calculate, compute, post`***
```js
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
✅ Nên
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
var me = new FrontendDeveloper('Nhi', 'Truong');
console.log(me.getName());
// "Nhi Truong"
```
## Phương thức, biến cục bộ
***Thêm tiền tố `_` vào trước biến, phương thức cục bộ của một class***
```js
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = _getName(firstName, lastName);
  }
  _getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}
var me = new FrontendDeveloper('Nhi', 'Truong');

✅ Nên
var name = me.name;
console.log(name);
// "Nhi Truong"

❌ Không nên
name = me._getName(me.firstName, me.lastName);
console.log(name);
// "Nhi Truong"
```
## Hằng số
***Viết hoa tất cả nếu nó là hằng số***
```js
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const DAY = SECONDS * MINUTES * HOURS;
```
## Dash
***Javascript không ưa gì ký tự `-`, tránh sử dụng `-` khi khai báo***
```js
❌ Không nên
var person = {
  'first-name': 'Nhi',
  'last-name': 'Truong',
};
var firstName = person['first-name'];

✅ Chuẩn nè
var person = {
  firstName: 'Nhi',
  lastName: 'Truong',
};
var firstName = person.firstName;
```

Thậm chí không thể sử dụng dấu gạch ngang cho tên biến
```js
var first-name = 'Nhi';
// Uncaught SyntaxError: Unexpected token '-'
```
Đó là các lý do tại sao nên tránh dùng `-` nha.
## Files

Có hai cách đặt tên tệp trong JavaScript là PascalCase và kebab-case.
Trong các ứng dụng Js, thường sẽ dùng PascalCase để đặt tên các thành phần (ví dụ là các thành phần React)
```js
- components/
--- user/
----- UserProfile.js
----- UserList.js
----- UserItem.js
--- ui/
----- Dialog.js
----- Dropdown.js
----- Table.js
```
Ngược lại trong ứng dụng phụ trợ Js, kebab-case lại hay được dùng hơn
```js
- routing/
--- user-route.js
--- messages-route.js
```
Cũng có cách đặt tên camelCase, nhưng tương tự như PascalCase cũng có thể có rủi ro do các hệ điều hành xử lý khác nhau có thể bị lỗi

source nha:
https://www.robinwieruch.de/javascript-naming-conventions