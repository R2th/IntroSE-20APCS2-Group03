Đôi khi những dòng code chuẩn cú pháp sẽ làm các Hàm trở dài dòng và rườm rà, vì thế chúng ta thường rút gọn code bằng những mẹo nhỏ (thủ thuật) mà không làm ảnh hưởng đến kết quả. Với Dev đã có nhiều kinh nghiệm thì những mẹo này đã có sẵn trong tư duy code của họ với nhiều năm chính chiến các dự án, tích lũy mà có. 

Và trong Javascript cũng vậy, nên mình xin tổng hợp một số mẹo, thủ thuật hay dùng của các anh/chị Dev đi trước cho các bạn mới bắt đầu tiếp cận. Nào chúng ta bắt đầu thôi!

### Format JSON Code
Bạn có thể đã sử dụng JSON.stringify trước đây, nhưng bạn có nhận ra rằng nó cũng có thể giúp bạn một format đẹp hơn khi output ra không? Phương thức stringify() có hai tham số tùy chọn: 

- **replacer function**, bạn có thể sử dụng để lọc JSON được hiển thị và giá trị không gian.

- **space** giúp bạn lấy một số nguyên cho số lượng khoảng trắng bạn muốn hoặc một chuỗi (chẳng hạn như '\ t' để chèn các tab) và nó có thể giúp đọc dữ liệu JSON được tìm nạp dễ dàng hơn rất nhiều. 
```js
console.log(JSON.stringify({ hoten: 'Quoc Anh', tuoi: '20' }, null, '\t'));
// Kết quả:
// '{
//     "hoten": Quoc Anh,
//     "tuoi": 20
// }'
```

### Get the Last Item(s) in an Array
Phương thức trong array là slice() có thể lấy các số nguyên âm và nếu được cung cấp, nó sẽ lấy các giá trị từ cuối mảng thay vì bắt đầu.
```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Kết quả: [9]
console.log(array.slice(-2)); // Kết quả: [8, 9]
console.log(array.slice(-3)); // Kết quả: [7, 8, 9]
```

### Filter Unique Values
Kiểu đối tượng Set đã được giới thiệu trong ES6 và cùng với ..., ‘spread’ operator, chúng ta có thể sử dụng nó để tạo một mảng mới chỉ với các giá trị duy nhất.
```js
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Kết quả: [1, 2, 3, 5]
```

### Ternary Operator - Toán tử 3 ngôi 
Ta có đoạn code if...else như sau:
```js
const deptrai = 90;
let result;
if (deptrai > 50) {
  ketqua = "bạn đẹp trai";
} else {
  ketqua = "bạn vẫn đẹp trai nhưng deptrai <= 50";
}
```
được viết ngắn gọn lại như sau:
```js
const deptrai = 90;
const ketqua = (deptrai > 50) ? "bạn đẹp trai" : "bạn vẫn đẹp trai nhưng deptrai <= 50";
```

### Shorthand Evaluate
Khi gán giá trị của biến cho biến khác, chúng ta thường muốn đảm bảo rằng giá trị biến đó không **null**, không **undefinded** hoặc **rỗng**, vì vậy mà cần phải viết một loạt điều kiện để kiểm tra:
```js
if (deptrai !== null || deptrai !== undefined || deptrai !== '') {
  return deptrai;
} else {
  return "bạn vẫn đẹp trai :-p";
}
```
thì được viết gọn lại là:
```js
return deptrai || "bạn vẫn đẹp trai :-p";
```

### Function Declaration
Kiểu khai báo function cũ thì dễ đọc dễ viết, nhưng nó sẽ trở nên rối khi nằm chung với những lời gọi hàm khác. Ví dụ thay vì:
```js
function sayHello(name) {
  console.log('Hello', name);
}
 
setTimeout(function() {
  console.log('Loaded')
}, 2000);
```

có thể dùng cú pháp arrow để khai báo function (arrow function):
```js
sayHello = name => console.log('Hello', name);
 
setTimeout(() => console.log('Loaded'), 2000);
```

### Destructuring Assignment
Nếu đã làm việc với các framework js, hẳn ta không lạ gì việc truyền các data dưới dạng object giữa các component với nhau. Khi data object được truyền tới nơi thì ta cần unpack nó.
```js
const action = require('lib/action')
const service = require('lib/service')
 
const form = this.props.form;
const errors = this.props.errors;
const entity = this.props.entity;
const controller = this.props.controller;
const component = this.props.component;
```
Đoạn trên được rút gọn lại là:
```js
import { action, service } from 'lib';
 
const { form, errors, entity, controller, component } = this.props;
```
Và còn nhiều nữa...
### Tổng kết
Trên đây mình đã chia sẻ một số mẹo giúp các bạn newbie như mình, hoặc các anh chị đi trước mà chưa sử dụng thì có thể áp dụng ngay vào các dự án của mình. Cám ơn các bạn đã theo dõi, chúc các bạn học tốt!