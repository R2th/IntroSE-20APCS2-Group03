Trong bài viết này mình sẽ giới thiệu một vài attributes của input mà có thể giúp tăng trải nghiệm người dùng, cùng đi vào ví dụ cụ thể nhé.

### Ứng dụng bảo mật 2 lớp
Đoạn code dưới đây là ví dụ xác minh bảo mật 2 lớp, ở đó có một thẻ `input` với `type="text"` để người dùng nhập mã được gửi về điện thoại, sau đó người dùng nhấn xác minh để hoàn tất việc xác minh.

```javascript
<form action="/sessions/check-2fa" method="POST">
  <div>
    <label for="token">Please enter the code you were sent:</label>
    <input type="text" name="token" id="token" />
  </div>
  <button type="submit">Check token</button>
</form>
```

Thêm một chút CSS để làm cho form này trở nên đẹp hơn, như hình sau:
![](https://images.viblo.asia/0ccc1667-8425-436a-8975-c096234e2281.png)

Tuy nhiên chúng ta có thể cải thiện trải nghiệm với một vài thuộc tính HTML dưới đây

### Cài đặt bàn phím

Trên điện thoại di động hoặc thiết bị có bàn phím ảo, điều đầu tiên cần chú ý là chúng tôi đang trình bày bàn phím `alpha` đầy đủ. 

Mã xác minh được tạo bằng các ký tự số nên sẽ tốt hơn nhiều nếu hiển thị cho người dùng một bàn phím chỉ gồm các số.

Chúng ta có thể xem việc chuyển type của input từ `text` thành `number` là một giải pháp
```javascript
 <input type="number" name="token" id="token" />
```
Điều này kích hoạt một bàn phím khác trên iOS, nhưng nó vẫn bao gồm dãy số và cả những ký tự khác không phải là số, như hình dưới:
![](https://images.viblo.asia/0703b3f1-3bab-4ac4-bb89-a21760e35a38.png)

Thay đổi `type` của input sẽ thay đổi cách trình duyệt hiển thị. Nó cũng có thể gây ra lỗi; nếu mã xác thực hai yếu tố bắt đầu bằng số không, một input số có thể bỏ số 0 đứng đầu đó.

### inputmode
Thuộc tính `inputmode` làm thay đổi bàn phím trình duyệt hiển thị mà không làm thay đổi ý nghĩa của dữ liệu mà `input` nhận được.

Chúng ta muốn nhận được đầu vào là `text`, nhưng từ bàn phím số. Vì vậy, thay vào đó, hãy thêm `inputmode="numeric"`

```javascript
<input type="text" name="token" id="token" inputmode="numeric" />
```

### pattern
Thuộc tính mẫu cho phép bạn xác thực nội dung của một biểu thức chính quy. Sử dụng mẫu [0-9] * cho trình duyệt biết rằng chúng tôi chỉ chấp nhận các số trong trường và cũng kích hoạt bảng số trong các trình duyệt không hỗ trợ mã đầu vào.

Thuộc tính `pattern` cho phép bạn xác thực nội dung của một `input` sử dụng biểu thức chính quy. 

Sử dụng pattern `[0-9]*` để cho trình duyệt biết rằng sẽ chỉ chấp nhận các số ở `input` và cũng kích hoạt keyboard số trong trường hợp trình duyệt không hỗ trợ `inputmode`.

HTML của input sẽ như thế này

```javascript
<input
  type="text"
  name="token"
  id="token"
  inputmode="numeric"
  pattern="[0-9]*"
/>
```
Đây là kết quả với HTML ở trên, chỉ bàn phím nhập số:
![](https://images.viblo.asia/df56498b-0f2a-44cb-92e2-4113d3b90f3c.png)

### HTML autocomplete
Theo tài liệu từ [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) thì thuộc tính autocomplete cho các nhà phát triển web chỉ định những gì mà [user agent](https://developer.mozilla.org/en-US/docs/Glossary/user_agent) có để cung cấp hỗ trợ tự động trong việc điền các giá trị các `field`, cũng như hướng dẫn cho trình duyệt về loại thông tin được mong đợi trong `field` này.

Trong hệ điều hành iOS và Safari trên macOS, chúng ta có thể tận dụng lợi thế này để trình duyệt đề xuất mã xác thực 2 lớp được gửi đến thiết bị qua SMS. Thêm thuộc tính `autocomplete` với giá trị `one-time-code` sẽ gợi ý nhập mã này.
```javascript
<input
  type="text"
  name="token"
  id="token"
  inputmode="numeric"
  pattern="[0-9]*"
  autocomplete="one-time-code"
/>
```

Khi đó, `input` nhập thông tin xác minh 2 lớp sẽ hiển thị như sau

![](https://images.viblo.asia/e424a42c-9579-4b46-99ab-d67a35e85760.png)


### Kết luận
Với bài viết trên thì chúng ta đã giúp người dùng có thể nhập xác minh 2 bước một cách nhanh chóng và chính xác, hiện tại mình thấy một số APP cũng đang sử dụng cách này (vd: App Vietcombank).

Nếu ứng dụng của bạn có chức năng này hoặc tương tự, đừng chần chừ mà hãy áp dụng vào nhé. 

Cảm ơn và hẹn gặp lại :).

 Nguồn tham khảo tại [đây](https://www.twilio.com/blog/html-attributes-two-factor-authentication-autocomplete).