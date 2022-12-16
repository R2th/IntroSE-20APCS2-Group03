Trong bài viết này mình sẽ chia sẻ cách sử dụng template literal trong Javascript, cái cho phép bạn làm việc với strings dễ dàng hơn.<br>
Trước đây bạn phải sử dụng 1 cặp dấu nháy đơn ( ' ) hoặc dấu nháy kép ( " ) để bao quanh một string(chuỗi ký tự). Khi đó strings của chúng ta bị giới hạn nhiều chức năng.<br>
Để giải quyết các vấn đề phức tạp hơn trong strings, ES6 cung cấp một cú pháp giúp chúng ta làm việc với strings một cách dễ dàng hơn.<br>
Trong ES6 bạn có thể tạo một template literal bởi cặp dấu  nháy ngược ( \` ) như bên dưới.<br>
```
let simple = `This is a template literal`;
```
### Cú pháp sử dụng trong Template Literal
Thay vì sử dụng dấu ( ' )  hoặc ( " ) để bao quanh một strings thì bạn có thể sử dụng cặp dấu nháy ngược(  \` )  để bao quanh một string.<br>
```Javascript
let str = `Template literal in ES6`;

console.log(str);// Template literal in ES6
console.log(str.length); // 23
console.log(typeof str);// string
```
Bạn có thể sử dụng thoải mái dấu  ( ' )  hoặc ( " )  trong template literal.<br>
```
let anotherStr = `Here's a template literal`;
```
Nếu string có chứa dấu nháy ngược (  \` ) thì bạn phải thêm ký tự \ trước dấu nháy ngược đó để sử dụng.<br>
```Javascript
let strWithBacktick = `Template literals use backticks \` insead of quotes`;
```

### Sử dụng multiline trong strings
Trước đây để xuống dòng trong một chuỗi thì bạn phải thêm ký tự xuống ( \n ) như bên dưới.<br>
```Javascript
let msg = 'Multiline \n\
string';

console.log(msg);
//Multiline
//string
```
Tuy nhiên với cách này có thể sẽ không hoạt động tốt trên các công cụ javascript.<br>
Template literals cho phép bạn tạo nhiều dòng trong một string một cách dễ dàng như bên dưới.<br>
```Javascript
let p =
`This text
can
span multiple lines`;
```

### Sử dụng variable trong strings
Để sử dụng một variable trong string bạn hãy đặt biến đó trong khối ${  } như bên dưới nhé<br>
```Javascript
${variable_name}
```
Ví dụ:<br>
```Javascript
let firstName = 'John',
    lastName = 'Doe';

let greeting = `Hi ${firstName}, ${lastName}`;
console.log(greeting); // Hi John, Doe
```
```Javascript
let price = 8.99,
    tax = 0.1;

let netPrice = `Net Price:$${(price * (1 + tax)).toFixed(2)}`;

console.log(netPrice); // netPrice:$9.89
```