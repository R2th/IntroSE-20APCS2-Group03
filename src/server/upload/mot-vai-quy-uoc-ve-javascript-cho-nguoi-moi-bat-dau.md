Xin chào mọi người, hôm nay mình xin chia sẻ một vài thứ linh tinh nhưng nghĩ sẽ có ích cho ai đó, nếu các bạn biết rồi xin bỏ qua nhé :D
OK, với bất kỳ ngôn ngữ nào, ngôn ngữ lập trình được xác định bởi các bộ quy tắc. Các quy tắc (hoặc cú pháp) là những gì ta tuân theo khi viết code, tạo thành một cấu trúc logic của các chương trình.

Và javascript cũng vậy, hãy dành thời gian để tìm hiểu các cú pháp cơ bản, chúng ta sẽ có thể viết nên những đoạn code hiệu quả và dễ đọc, và hơn hết là dễ hiểu, sau đó một vài ngày ngày chúng ta tự đọc lại (yaoming).

![](https://images.viblo.asia/5fd1da37-8586-4f00-a084-8a4143a8988d.png)

### Literal
Literals được định nghĩa là các giá trị được viết trong code ở dạng số, chuỗi, boolean (true hay false), cũng như object và mảng (array). Xem một số ví dụ:
```js
10          // Kiểu số (có thể số thập phân)
'Quoc Anh'  // Kiểu chuổi, có thể sử dụng nháy đơn hoặc kép
true        // Kiểu Boolean (true or false)
['a', 'b']  // Kiểu mảng
{
    color: 'blue', 
    shape: 'Circle'
}           // Kiểu đối tượng
```

### Variable
Các biến được đặt tên là các giá trị lưu trữ dữ liệu. Trong Javascript, ta khai báo biến với từ khóa **var**, **let** hoặc **const** , và ta gán giá trị với dấu =.

Ví dụ:
```js
// key được định nghĩa là một biến được gán giá trị abc123
let key;
key = abc123;

// name được định nghĩa là một biến được gán giá trị Quoc Anh
const name = "Quoc Anh"
```
Vậy:
-  khi nào thì dùng **var**? Không nên, nó thực sự chỉ nên được sử dụng khi làm việc với những đoạn code thừa kế. Đó là cú pháp Pre-ES6 cũ kỹ.
- Khi nào thì dùng **let**? Dùng nó khi biến của bạn cần được cập nhật lại trong chương trình (có thể được gán lại).
- Khi nào thì dùng **const**? Sử dụng nó nếu biến của bạn giữ một giá trị không đổi. Nó phải được chỉ định tại thời điểm khai báo và không thể được gán giá trị lại.

### camelCase
![](https://images.viblo.asia/d39015fc-c6af-44de-a700-011b63a847c5.png)

Điều gì xảy ra nếu tên biến của chúng ta bao gồm nhiều hơn một từ?

Ví dụ, làm thế nào để khai báo một biến mà chúng ta muốn đặt tên là `“first name”`?


- Liệu có thể dùng dấu gạch ngang? -p Ví dụ: **first-name** không, **-** được dành riêng cho phép trừ trong JavaScript
- Còn dấu gạch dưới thì sao? Ví dụ: **first_name** Có thể, nhưng điều đó sẽ làm cho code của chúng ta trông lộn xộn và khó hiểu.
Giải pháp? Đó chính là camelCase! Ví dụ **firstName**. Từ đầu tiên được viết thường, chữ cái đầu tiên của từ tiếp theo được viết hoa. Đây chính là quy ước.


> Note: Tuy nhiên, hoàn toàn có thể chấp nhận việc đặt tên các biếnconst với chữ in hoa và dấu gạch dưới, ví dụ: const DEFAULT_PLAYBACK_SPEED = 1. Điều đó sẽ thể hiện rõ hơn việc giá trị của biến là cố định. Hoặc bạn có thể chỉ trung thành với camelCase thôi.

### Dấu chấm phẩy
Các chương trình JavaScript được tạo thành từ một số **instruction** được biết đến như sau:
```js
// Một số ví dụ JavaScript statements
let a = 1000;
a = b + c;
const time = Date.now();
```
Các câu lệnh JavaScript thường kết thúc bằng dấu chấm phẩy `";"`.

Tuy nhiên, điều này không hề bắt buộc! Sẽ không có vấn đề gì trong Javascript nếu bạn không sử dụng các dấu chấm phẩy.
```js
// Vẫn là các biểu thức hợp lệ
let a = 1000
a = b + c
const time = Date.now()
```

Tuy nhiên, nếu chúng ta sử dụng một object như:
```js
const person = {
  firstName: "Quoc Anh",
  lastName: "Nguyen",
  age: 30,
  weight: "70kg"
};
```

Thì dấu` ; `là cần thiết.
> Lưu ý: Khi bạn thực sự quen với JavaScript, hãy bắt đầu sử dụng các linter như ESLint. Nó sẽ tự động tìm lỗi cú pháp trong code của bạn và làm cho cuộc sống của bạn dễ dàng hơn nhiều :D

### Thụt đầu dòng
Về lý thuyết, chúng ta có thể viết toàn bộ chương trình JavaScript trên một dòng. Tuy nhiên điều này sẽ khiến code không thể đọc và bảo trì được. Đó là lý do tại sao chúng ta nên sử dụng dòng và thụt đầu dòng. Hãy dụng một câu lệnh điều kiện làm ví dụ:
```js
if (loginSuccessful === 1) {
  // code to run if true
} else {
  // code to run if false
}
```
Trong trường hợp này, code được thụt đầu dòng là dòng comment // code to run if true và // code to run if false. Bạn có thể thụt đầu dòng bằng một vài khoảng trắng (2 hoặc 4 là phổ biến) hoặc một tab. 

Tùy bạn lựa chọn, nhưng mọi thứ phải nhất quán! Nếu thêm code vào, ta sẽ thụt đầu dòng như sau:
```js
if (loginAttempts < 5){
  if (loginAttempts < 3){
    alert("< 3");
  } else {
    alert("between 3 and 5");
  }
} else {
  if (loginAttempts > 10){
    alert("> 10");
  } else {
    alert("between 5 and 10");
  }
}

```

Bằng cách áp dụng thụt đầu dòng, bạn sẽ có được những đoạn code rõ ràng, dễ đọc và dễ bảo trì hơn.

### Comment
**Comment** là một dang code không thể sử dụng. Chúng có ích khi cung cấp giải thích về một đoạn code trong một chương trình. Hoặc có thể được dùng để đưa ra một đoạn code nhưng không sử dụng — thường được sử dụng khi test một đoạn code thay thế.

Hai loại comment trong Javascript:
```
// Đây là comment

/* Đây cũng là comment */
```

### Phân biệt chữ hoa — chữ thường
JavaScript phân biệt chữ hoa và chữ thường! Một định danh có tên là `test` khác với `Test`.
```js
function test() {
  alert("Đây là test!");
}

// Lỗi! test(); mới đúng.
function show_alert() {
  Test();                     
}

```

Để đảm bảo code có thể đọc được, tốt nhất bạn nên thử thay đổi tên của các biến của bạn để không có định danh quá giống nhau và gây lầm lẫn.

### Kết luận
Bài viết này nhằm cung cấp một cái nhìn tổng quan về cú pháp và 1 vài quy tắc cơ bản của JavaScript. Chúng ta đã xem xét nhiều quy ước chung, tuy nhiên, hãy nhớ rằng bạn có thể linh hoạt một chút — đặc biệt là khi làm việc trong môi trường hợp tác với các tiêu chuẩn cụ thể của riêng.


Cả cú pháp và cấu trúc đều có vai trò quan trọng đối với cả chức năng của các chương trình cũng như khả năng đọc và bảo trì code. 
Cám ơn mọi người đã theo dõi, hẹn gặp lại.