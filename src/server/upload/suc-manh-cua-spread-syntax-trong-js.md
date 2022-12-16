## Mở đầu

Hello everyone, welcome back to my channel =)).

Đến hẹn lại lên, hôm nay mình muốn sharing Spread Syntax trong Js, một khái niệm trong ES6 và khá hữu ích trong quá trình phát triển vs Js.

## Khái niệm

Ở đây mình sẽ giải thích theo những gì mình hiểu về Spread Syntax.

**Spread Syntax** (mình hay gọi là cú pháp 3 chấm :rofl::rofl:) hiểu đơn giản là việc cho phép duyệt qua các phần tử và truyền vào function để sử dụng như là các đối số (argument) và được sử dụng khi làm việc các array, object. Nếu mình giải thích hơi khó hiểu thì các ví dụ về việc sử dụng bên dưới sẽ rõ hơn =)).

**Note:** Bạn có thể check lại các phiên bản hổ trợ cho Spread Syntax tại link sau nhé (https://caniuse.com/?search=spread%20operator)



## Sử dụng Spread Syntax

### Sử dụng trong function call

Trước đây chúng ta thường sử dụng [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) cho trường hợp muốn sử dụng các phần tử của mảng để sử dụng nó trong function cho một logic nào đó.

Chẳng hạng cho việc tính tổng của 3 số x, y, z.
```
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers)); //6

console.log(sum.apply(null, numbers)); //6
```

Đặc biệt rất hữu ích khi sử dụng để khởi tạo object vs việc gọi new(), bạn không thể sử dụng apply() cho việc này nhưng vs Spread thì mọi thứ đơn giản hơn rất nhiều, xem ví dụ bên dưới nhé

```
let dateFields = [2020, 11, 15];
let d = new Date(...dateFields);
```

Phần này sẽ show sức mạnh thật sử của Spread Syntax nè mấy bác =))

Trước khi có Spread Syntax thì việc sử dụng lại một array đã tồn tại hoặc sử dụng một phần các phần tử của nó thì phải sử dụng đến các function support cho array như push(), splice(), concat(),... và Spread Syntax cũng làm rất tốt các công việc này.

### Copy một array

Sử dụng Spread Syntax để copy array đã tồn tại thì array đó sẽ không bị ảnh hưởng khi ta thay đổi các array copy từ nó.

```
let arr = [1, 2, 3];
let arr2 = [...arr]; // như việc sử dụng array.slice

arr2.push(4);

console.log(arr2); //[1, 2, 3, 4]
console.log(arr); //[1, 2, 3]
```

**Note:** Không áp dụng cho mảng nhiều chiều

### Nối các mảng với nhau

```
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5]; 
arr1 = arr1.concat(arr2);

console.log(arr1); // [0, 1, 2, 3, 4, 5];
```

Sử dụng Spread Syntax như sau

```
arr1 = [...arr1, ...arr2];

console.log(arr1); // [0, 1, 2, 3, 4, 5];
```

**Note:** Lưu ý Spread Syntax không thể sử dụng với 1 array được khai báo là const.

Nếu như muốn thêm các phần tử ở mảng này vào đầu mảng kia như việc sử dụng unshift(), chẳng hạn như muốn thêm từ arr2 vào arr1 thì sẽ như sau:

```
arr2 = [...arr2, ...arr1];

console.log(arr2); // [3, 4, 5, 0, 1, 2];
```

### Copy một object

**Note:**  Copy object ở đây sẽ không làm thay đổi object được copied. Mình có đọc qua 1 bài viết "3 cách copy object" trong js ở [link này](https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/) nhưng vs cách dùng Spread Syntax thì sẽ ngắn gọn hơn rất nhiều.

```
let person = {
    firstName: 'John',
    lastName: 'Doe'
};


// Sử dụng spread ...
let p1 = {
    ...person
};

// Sử dụng  Object.assign()
let p2 = Object.assign({}, person);

// Sử dụng JSON
let p3 = JSON.parse(JSON.stringify(person));
```

### Convert string to array

Một công dụng khá thú vị của Spread Syntax =))

```
var str = "Duong";
// sử dụng như str.split("");
var chars = [...str];

console.log(chars); // ["D", "u", "o", "n", "g"]
```

### Sử dụng với Math
Thêm 1 case hữu ích bé tí nữa =))
```
var arr = [11, 5, 3, 9];
var max = Math.max(...arr);
var min = Math.min(...arr);

console.log(max); //11
console.log(min); //3
```

## Kết luận

Trên đây là những gì mình đã tìm hiểu về Spread Syntax và muốn sharing với mọi người, nếu có thắc mắc, góp ý hoặc bổ sung về việc sử dụng Spread Syntax thì mọi người cmt bên dưới giúp mình nha, đừng quên like, subscribe kênh của mình nhé =)).  Cảm ơn mọi người đã đọc bài viết.