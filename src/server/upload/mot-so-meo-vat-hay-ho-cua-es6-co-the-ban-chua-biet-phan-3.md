**Xin chào, ở 2 bài trước của series ["Một số mẹo vặt "hay ho" của ES6"](https://viblo.asia/s/mot-so-meo-vat-hay-ho-cua-es6-P856j7gR5Y3), mình đã chia sẻ 1 số tips/tricks nhỏ với ES6, hy vọng ít nhiều nó sẽ có ích với các bạn khi áp dụng vào thực tế.  Hôm nay, xin mời các bạn theo dõi phần 3 của series này. Hãy cùng nhau xem thử có gì thú vị trong phần tiếp theo này nhé :)**

![](https://images.viblo.asia/b50e28f1-b8c7-40d5-a0bc-e2e8c64f0eed.png)

### 1. Truyền Array vào function dưới dạng đối số

Nếu bạn muốn truyền một Array vào một function. Bạn có thể sử dụng ES6 spread để biến mảng đó thành một danh sách các đối số.

```javascript
const array = ['Sun', 'Asterisk', 'Viet Nam'];

function company(name1, name2, name3) {
  console.log(name1); // 'Sun'
  console.log(name2); // 'Asterisk'
  console.log(name3); // 'Viet Nam'
}

// ES5
company.apply(null, array);

// ES6
company(...array);
```

Thoạt nhìn qua thì có vẻ như không có gì đặc biệt cả, chỉ là truyền 1 array vào funtion bằng cú pháp `...` của ES6 thôi, hmm! Vậy chúng ta cùng xem xét thêm 1 ví dụ nữa xem nó hiệu quả như thế nào. 

```javascript
const numbers = [5, 7, 3];

// Cách này thì work nhưng nó rất là...củ chuối
Math.max(numbers[0], numbers[1], numbers[2]);

// Cách này thì lại không work, hmmm
Math.max(numbers); // NaN

// Đừng lo, ES6 đã ở đây
Math.max(...numbers); // 7
```

### 2. Làm tròn số thập phân thành số nguyên

Để làm tròn chữ số thập phân thành số nguyên, có thể các bạn đều đã biết tới cách dùng hàm `parseInt`. Tuy nhiên, `parseInt` có 1 điểm trừ đó là...

```javascript
const number = 1600000000000000000000.8;

const result = parseInt(number);

console.log(result); // 1
```

...ôi không, tại sao lại là `1`, kết quả mong đợi của chúng ta phải là `1.6+e21`. (Nếu các bạn chưa hiểu `e` biểu thị giá trị bao nhiêu trong Javascript thì các bạn có thể xem qua bài viết về Decimal number của mình ở [đây](https://viblo.asia/p/mot-so-cu-phap-javascript-shorthand-thong-dung-aWj5376e56m) nhé  :wink:)

Bởi vì khi số có giá trị quá lớn và được convert qua giá trị mới chứa chuỗi (ký tự `.`, `+`, `e`) thì hàm `parseInt` sẽ chỉ lấy ký tự đầu tiên mà thôi. Vì vậy, để hàm `parseInt` hoạt động chính xác, đầu tiên chúng ta cần convert kiểu dữ liệu number qua string rồi mới thực hiện làm tròn.

```javascript
const number = 1600000000000000000000.8;

const result = number.toString();

console.log(result); // "1.6e+21"
```

Và để giải quyết sự "rối rắm" trên, ES6 đã cung cấp cho chúng ta 1 hàm để làm việc này mà không cần phải quan tâm đến giá trị đầu vào của number là bao nhiêu.

```javascript
const number = 1600000000000000000000.8;

const result = Math.trunc(number);

console.log(result); // "1.6e+21"
```

### 3. Kiểm tra kiểu dữ liệu của Array

Trong JavaScript, Array thật sự không phải là...Array, bản chất của Array là Object. Vì vậy, bạn không thể chỉ đơn giản là dùng `typeof` để kiểm tra tính đúng đắn của kiểu dữ liệu Array,

```javascript
const array = [1, 2, 3, 4];

typeof array; // 'object'
```

Nhưng đừng lo lắng! ES6 cung cấp cho chúng ta 1 function đó là `Array.isArray()`, giúp dễ dàng hơn để kiểm tra xem một giá trị có phải là một Array hay không.

```javascript
const array1 = [];

Array.isArray(array1); // true

const array2 = [1, 2, 3, 4];

Array.isArray(array2); // true
```

hoặc

```javascript
// Object
Array.isArray({}); // false

// Object
Array.isArray({ name: 'Sun' }); // false

// Number
Array.isArray(1000); // false

// Boolean
Array.isArray(true); // false
```

Trên đây là 1 bài chia sẻ ngắn về 1 số kiến thức hay ho, mẹo vặt của Javscript/ES6 mà mình lượm lặt được trong quá trình làm việc cũng như tham khảo ở nhiều nguồn học tập khác nhau.

Hy vọng nó sẽ giúp ích được các bạn ít nhiều cho công việc nhé. Xin cảm ơn và hẹn gặp lại!

Chào thân ái và quyết thắng! :cowboy_hat_face: