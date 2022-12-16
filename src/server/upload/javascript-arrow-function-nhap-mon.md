![](https://images.viblo.asia/fdece3c9-207d-4114-a50a-e401f3327d6a.jpeg)


## 1. Arrow function là gì?
**Arrow function** là một tính năng mới của ES6 (ECMAScript2015) được sử dụng song song với cách viết javascript truyền thống, giúp cho cú pháp đơn giản hơn; bạn sẽ không phải viết các từ khóa như `return`, `function`, hay những dấu ngoặc có thể bỏ đi khi không cần thiết.



## 2. Lợi thế của Arrow function
### 2.1 Cú pháp đơn giản

Hãy lấy một ví dụ đơn giản nào:

```
function funcName(params) {
   return params + 2;
 }
funcName(2);

// 4
```

Với **arrow function**, chúng ta chỉ cần biểu diễn với 1 dòng code

```
var funcName = (params) => params + 2
funcName(2);

// 4
```

Cú pháp của **arrow function** sẽ là:

```
(parameters) => { statements }
```

Nếu như bạn không có tham số nào, nó sẽ như thế này:

```
() => { statements }
```

Còn nếu bạn muốn `return` giá trị đó, dấu ngoặc nhọn là không bắt buộc:
```
parameters => expression

// nó tương đương với đoạn code:

function (parameters) {
  return expression;
}
```

Hòm hòm rồi đấy, bạn đã biết cú pháp cơ bản rồi, làm vài ví dụ cụ thể thôi :D. Mở Chrome Developer Console và quẩy thôi:

```
var double = num => num * 2
```

Như ví dụ trên, chúng ta đã chỉ định biến `double` là một arrow function. Arrow function có một tham số là `num`. Ta chỉ có một tham số, vì thế ta có thể lược bỏ đi dấu ngoặc. Và chúng ta bỏ nốt ngoặc nhọn để `return` giá trị `num*2`. Code chuẩn rồi đó, chạy thôi:

```
double(2);
// 4
double(3);
// 6
```

### 2.2 Không phụ thuộc vào `this`

Không giống với các function khác, **arrow function** không phụ thuộc vào từ khóa this. 

Cùng làm một ví dụ để có thể dễ hiểu hơn. Hãy tạo một `constructor` function sau đó tạo `create` của nó:

```
function Counter() {
  this.num = 0;
}
var a = new Counter();
```

Như mọi nguời đã biết, với `constructor` function thì giá trị của `this` phụ thuộc vào đối tuợng `new` được khởi tạo. Trong trường hợp này là `a`. Đó là lý vì sao chúng ta đọc giá trị bằng `console.log` của `a.num` và được giá trị là `0`

```
console.log(a.num);
// 0
```

Bây giờ sẽ phức tạp hơn, nếu như muốn tăng giá trị của `a.num` lên theo mỗi giây. Chúng ta sử dụng `setInterval()` function. `setInterval()` là function được gọi từ một function khác sau khi set số giây. Sử dụng `Counter` function để làm việc đó:

```
function Counter() {
  this.num = 0;
  this.timer = setInterval(function add() {
    this.num++;
    console.log(this.num);
  }, 1000);
}
```


Code trông có vẻ giống với bên trên rồi đó, chúng ta đã thêm mới biến `this.timer` và kỳ vọng nó sẽ được set bằng `setInterval` function. Mỗi 1000 milliseconds (1s), đoạn code này sẽ được chạy. `this.num` sẽ tăng lên 1, và sau đó `console.log` sẽ in ra kết quả. Chạy code thôi:

```
var b = new Counter();
// NaN
// NaN
// NaN
// ...
```

Như bạn thấy, function log ra màn hình mỗi giấy nhưng kết quả lại là `NaN` (Not a number). Có điều gì đó sai ở đây?? Trước tiên, chúng ta cứ dừng cái hàm đếm này đã: 

```
clearInterval(b.timer);
```


`setInterval` function đã không được gọi khi khai báo object `b`. Nó cũng không được khởi tạo bởi từ khóa `new` (chỉ có `Counter` là được gọi). 

Nguyên nhân ở đây là giá trị của `this` trong `setInterval` phụ thuộc vào biến global. Hãy kiểm tra giá trị `this` đã:

```
function Counter() {
  this.num = 0;
this.timer = setInterval(function add() {
    console.log(this);
  }, 1000);
}
var b = new Counter();

// window
// window
// window
// ...
```

Ta được log là `window`??? Ta lại xóa cái interval đã:

```
clearInterval(b.timer);
```

Giải thích: log `NaN` bởi vì lúc đó giá trị `this` là `window`, `window.num` thì không tồn tại.

Vậy làm sao chúng ta có thể fix được. Hãy làm nó với **arrow function**!!! Chúng ta cần một function không phụ thuộc vào biến `this`. Với `arrow` function, `this` chỉ phụ thuộc giá trị ban đầu nó được khai báo. ...

```
function Counter() {
  this.num = 0;
  this.timer = setInterval(() => {
    this.num++;
    console.log(this.num);
  }, 1000);
}
var b = new Counter();
// 1
// 2
// 3
// ...
```

Code đã chạy rồi =))
`this` vẫn được lưu lại từ bên ngoài `Counter()` đến bên trong `setInterval()`, vì thế `this` ràng buộc với biến mới được tạo `b`.

Để chắc chắn với kết luận trên, chúng ta lại làm thêm một ví dụ nữa cho nó chắc. Chúng ta tạo một biến là `that` trong `Counter()` và kiểm tra liên tục biến `this` trong `setInterval()` function và `this` trong `Counter()` (thông qua `that`)

```
function Counter() {
  var that = this;
  this.timer = setInterval(() => {
    console.log(this === that);
  }, 1000);
}
var b = new Counter();
// true
// true
// ...
```

OK rồi đó, luôn `true` rồi. Cuối cùng thì ta xóa interval bằng:

```
clearInterval(b.timer);
```

**Note:** Chính vì **arrow function** không phụ thuộc vào `this` nên khi các bạn chuyển từ code block truyền thống sang `arrow` function nên cẩn thận vì có thể bạn đang select nhầm `this`

## 3. Tổng kết
Hi vọng bài viết của mình giúp được cho các bạn lập trình có cái nhìn tổng quát về **arrow function**. 

Cảm ơn các bạn đã theo dõi!!

Tài liệu tham khảo: https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc