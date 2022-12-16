**Import và Export Modules trong JavaScript là một trong những tính năng tuyệt vời với JavaScript, có thể các bạn đã biết và thường hay sử dụng nhưng chưa hiểu hết tường tận về nó. Hôm nay mình sẽ giúp các bạn hiểu rõ hơn nhé.**

Trước khi ES6 giới thiệu trong JavaScript về tính năng Import và Export thì ở ES5 chúng ta cũng đã từng sử dụng require() function. Giờ đây mọi chuyện cũng đã khác, và thân thiện hơn như ai đã từng code qua ngôn ngữ Java. Để tiếp cho các bạn hiểu thì, chúng ta nói sơ qua module là gì?

## Module là gì?
 Một module là một file. Hay là "One script is one module". Những module có thể load nhiều function bởi hai keywords đặc biệt đó là Import và Export. Và đặc biệt module này có thể gọi và sử dụng một module khác.
 
**Import**: Cho phép import các functionality từ các module khác.
**Export**: Khai báo những variables hoặc function cho phép những module khác truy cập và sử dụng

## 1. Export
Có 2 loại export đó là **named** và **default**:

### Named Export: 
Trong JavaScript ES6, named export được sử dụng để xuất nhiều thứ từ một module bằng cách thêm keyword export vào khai báo của chúng. Những thứ được export sẽ được phân biệt bằng tên. Sau đó import những thứ chúng ta cần sử dụng bằng cách bao quanh chúng cặp dấu ngoặc nhọn { }. Tên của module đã nhập phải giống với tên của module đã xuất.
```javascript
//-------util.js------
export function addTwoNumbers(x,y){
  return x + y
}
export let students = ['wisdom','bill','fred','grim']
```
**Note**: Không thể export khi không định nghĩa tên:
```javascript
export 'value';
import { };
```

### Default Export: 
Trong Javascript ES6 chỉ cho phép xuất một mặc định cho mỗi file. Default Export có thể cho một function, class hoặc một object.
```javascript
//----myFunction.js ----
export default function () {
  alert("Hello Default Export")
}
```
**Note**: Không thể export khi định nghĩa tên:
```javascript
export default const name = 'value';
```

### Default + Named export:
Bạn có thể cùng lúc sử dụng default export và named export trong 1 file
```javascript
export const name1 = 'value1';
export const name2 = 'value2';
export default 'value2';

import anyName, { name1, name2 } from '/modules/my-module.js';
console.log(anyName); // 'value2'
console.log(name); // 'value1'
```

### Đổi tên Export
Nếu không thích tên được export, bạn có thể đổi tên nó bằng cách sử dụng từ khóa as
```javascript
const name = 'value';
export { name as newName };

import { newName } from '/modules/my-module.js';
console.log(newName); // 'value'
// Tên gốc (name) không còn truy cập được
console.log(name); // undefined
```

## 2. Import
Để import một module vào một script thì bạn có thể sử dụng import. Ví dụ chúng ta có những module dùng named export thì bạn có thể import như thế này.
```javascript
//----main.js---
import { addTwoNumbers, students } from 'util';
```

**Importing with alias**:
```javascript
import * as util from 'util';

console.log(util.addTwoNumbers(2,13))
console.log(util.students)
```

Ngoài ra bạn cũng có thể sử dụng alias "as" để định danh lại nếu chưa quen thuộc hoặc tuỳ theo dự án của mình:
```javascript
import {sayHi as hi, sayBye as bye} from './say.js';
```

## Tóm lại:
ES6 đem lại cho ta rất nhiều điều thú vị và hay ho, hy vọng qua bài này các bạn sẽ có thêm cho mình kiến thức bổ ích. Cảm ơn <3

**Tham khảo**: [Javascript.info](https://javascript.info), [codesource.io](https://codesource.io)