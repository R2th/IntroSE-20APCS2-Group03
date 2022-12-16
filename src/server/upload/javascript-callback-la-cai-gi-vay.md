Trong bài viết này, chúng ta sẽ cùng học và hiểu thêm về callback qua các ví dụ đơn giản. 
# Callback là gì
**Đơn giản**:  `callback` là một function được thực thi ngay sau khi một function khác được thực thi xong.

**Phức tạp hơn**  : Trong JS, functions là các objects. Bởi vì thế nên function này có thế lấy các function khác làm tham số, và nó cũng có thể được trả về từ một function khác. Các function đó được gọi là `higher-order function`. Bất cứ function nào được truyền dưới dạng một tham số đều được gọi là một function `callback`.

^ Trên lý thuyết là thế, chúng ta cùng xem vài ví dụ để hiểu rõ hơn nhé:
# Tại sao chúng ta cần sử dụng Callback
Vì một lý do rất quan trọng - JavaScript là ngôn ngữ hướng sự kiện. Điều này có nghĩa là thay vì chờ phản hồi trước khi tiếp tục chạy tiếp, JavaScript vẫn sẽ tiếp tục thực thi trong khi `listen` các sự kiện khác. Hãy xem một ví dụ cơ bản:

```javascript
function first(){
  console.log(1);
}
function second(){
  console.log(2);
}
first();
second();
```

Đúng như bạn mong đợi, function đầu tiên được thực thi trước và function thứ hai được thực thi ngay sau đó - và sẽ log vào console:

```javascript
// 1
// 2
```

Khá ổn, đúng không?

Nhưng điều gì sẽ xảy ra nếu function đầu tiên chứa một đoạn code không thể được thực thi ngay lập tức? Ví dụ: một request API nơi chúng ta phải gửi `request` sau đó chờ `response`? Để mô phỏng việc này, chúng ta sẽ sử dụng `setTimeout`, đây là một function của JavaScript dùng để gọi một function khác sau một khoảng thời gian nhất định. Chúng ta sẽ delay function lại trong 500 mili giây để mô phỏng việc request API. Code mới của chúng ta sẽ trông như thế này:

```javascript
function first(){
  setTimeout( function(){
    console.log(1);
  }, 500 );
}
function second(){
  console.log(2);
}
first();
second();
```

Kết quả:
```javascript
first();
second();
// 2
// 1
```

Mặc dù chúng ta đã gọi function `first()` trước tiên, nhưng kết quả của hàm đó đã được log ra sau kết quả của function `second()`

Không phải là JavaScript đã thực thi các function sai thứ tự mà thay vào đó, JavaScript đã không đợi `respone` từ  `first()` trước khi chuyển sang thực thi `second()`.

Vậy tại sao mình lại cho bạn xem các ví dụ này? Bởi vì bạn đôi khi không thể mong chờ rằng các hàm của bạn được thực thi đúng thứ tự. **`callback` là một cách để đảm bảo 1 đoạn code nhất định sẽ không thực thi cho đến khi đoạn code khác được thực thi xong.**
# Tạo một Callback
Chúng ta bắt đầu tạo một callback nhé.

```javascript
function greeting(name) {
  alert(`Hello ${name}!`);
}
```
Ở trên, chúng ta đã khai báo 1 function `greeting()`. Function của chúng ta nhận có một tham số `name`. Tiếp tục:
```javascript
greeting('Walter White')
// Alert: Hello Walter White!
```
Bây giờ chúng ta sẽ thêm vào 1 `callback` - sử dụng như là tham số cuối cùng của function greeting(). Function `callback` sau đó được định nghĩa trong tham số thứ hai khi thực thi function `greeting()`.

```javascript
function greeting(name, callback) {
  alert(`Hello ${name}!`);
  callback();
}

greeting('Walter White', function() {
  alert('Nice to meet you');
});

// Alert: Hello Walter White!
// Alert: Nice to meet you
```

Nhưng các function callback không nhất thiết là phải được khai báo và định nghĩa trong khi gọi hàm. Chúng cũng có thể được định nghĩa ở ngoài như sau:

```javascript
function greeting(name, callback) {
  alert(`Hello ${name}!`);
  callback();
}

function nice(){
  alert('Nice to meet you');
}

greeting('Walter White', nice);

// Alert: Hello Walter White!
// Alert: Nice to meet you
```

Kết quả của ví dụ này hoàn toàn giống với ví dụ trước, nhưng thiết lập hơi khác một chút. Như bạn có thể thấy, chúng ta đã truyền định nghĩa function `nice()` làm tham số để thực thi function `greeting()`

# Ví dụ thực tế
Đây là một ví dụ đơn giản về việc lấy dữ liệu từ 1 URL bằng một request:

```javascript
const request = require(‘request’);
request('https://www.somepage.com', function (error, response, body) {
  if(error){
    // Handle error.
  }
  else {
    // Thành công, tiếp tục xử lý dữ liệu.
  }
});
```
Đoạn code dưới cũng sẽ trả về kết quả như đoạn trên:
```javascript
const request = require(‘request’);
function handleResponse(error, response, body){
    if(error){
        // Handle error.
    }
    else {
        //  Thành công, tiếp tục xử lý dữ liệu.
    }
}
request('https://www.somepage.com', handleResponse);
```
Như  bạn thấy, `request` nhận 1 function như là tham số cuối cùng của nó. Function này không được thực thi cùng lúc ở 2 đoạn code trên. Nó được lưu lại để thực thi ngay sau khi việc lấy dữ liệu qua  HTTP(s) hoàn tất. Request  HTTP(s) đang chạy là một giao thức bất đồng bộ (asynchronous) và không ngừng thực thi các function khác. Function `callback` sẽ được đặt vào một hàng đợi được gọi là `event loop` cho đến khi nó được thực thi bởi `respone` của `request`.
![](https://images.viblo.asia/39a75a1c-ebf8-432f-89d9-18c624c5c666.png)

*Sơ đồ  `event loop`*

*Mình sẽ nói rõ hơn về  `event loop` trong các bài viết tiếp theo*

# Tổng kết

Làm tốt lắm! Bây giờ các bạn đã có thể hiểu đơn giản `callback` là gì và cách thức hoạt động của nó. Đây chỉ là một phần rất nhỏ của `callback`, và vẫn còn nhiều điều nữa để tìm hiểu về nó và mình sẽ cố gắng đưa tới các bạn những kiến thức mới về nó. Xin cảm ơn vì đã đọc.



*nguồn: [codeburst.io](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)*