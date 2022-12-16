Trong bài viết này, mình sẽ chỉ cho bạn cách nhanh nhất để thiết lập browser notifications bằng cách sử dụng thư viện mã nguồn mở Push.js .
# Cài đặt chương trình:
Điều đầu tiên chúng ta cần làm là thêm thư viện: Push.js vào chương trình.
Ta có thể  thêm bằng cách cài đặt thông qua npm:
```
npm install push.js --save
```
hoặc một local file, nhưng cách dễ nhất để thực hiện nó là thông qua CDN:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/push.js/0.0.11/push.min.js"></script>
```
# Gửi yêu cầu cấp quyền:
Người dùng cần cấp quyền trước khi chúng ta có thể gửi thông báo cho họ. Điều này được thực hiện thông qua hộp thoại của trình duyệt được thấy ngay sau đây:
![](https://images.viblo.asia/56a9729c-c29a-453f-b317-b48dffb264fe.png)

Push.js tự động yêu cầu cấp quyền hiển thị notifications khi thông báo đầu tiên được gửi. Tuy nhiên, trong nhiều trường hợp, ta phải cần người dùng cho phép bằng cách thủ công. Chỉ với 1 dòng đơn giản,ta có thể  hiển thị thông báo yêu cầu cấp quyền của người dùng:
```
Push.Permission.request();
```
Thao tác này sẽ mở hộp thoại trên trình duyệt khiến người dùng chấp nhận hoặc từ chối nhận thông báo. Nếu quyền đã được cấp hoặc bị từ chối, yêu cầu trên sẽ bị bỏ qua.
# Tạo một notification:
Để hiển thị một thông báo, chúng ta chỉ cần gọi phương thức Push.create.Ta sẽ cung cấp cho chúng tiêu đề và một đối tượng tùy chọn chứa tất cả các tùy chọn hữu dụng và callbacks:
```
Push.create('Hi there!', {
    body: 'This is a notification.',
    icon: 'icon.png',
    timeout: 8000,               // Timeout before notification closes automatically.
    vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
    onClick: function() {
        // Callback for when the notification is clicked. 
        console.log(this);
    }  
});
```
Một thông báo mới có thể được tạo bất kỳ lúc nào, kể cả khi tab không hoạt động tại thời điểm này.
![](https://images.viblo.asia/1f6c6487-fe7e-43ee-9013-5e15e78f5266.png)
Để đảm bảo không làm phiền người dùng quá nhiều. Chỉ gửi thông báo khi bạn muốn cập nhật thông tin về nội dung quan trọng như tin nhắn mới hoặc yêu cầu kết bạn mới.
# Sự tương thích trình duyệt:
Hầu hết notification API đều hỗ trợ trong hầu hết các trình duyệt hiện đại.Để xem trình duyệt bạn chọn có hỗ trợ hay không, hãy thử chạy ứng dụng [demo](https://tutorialzine.github.io/web-notifications-demo/) này. Nó sẽ hoạt động mà không có sự cố trong Chrome, Firefox và Safari trên máy tính để bàn cũng như Chrome dành cho Android. Client phổ biến duy nhất bị thiếu trong danh sách này là iOS Safari, không cung cấp bất kỳ hình thức thông báo web nào.
Một điều quan trọng cần lưu ý ở đây là để thông báo được hiển thị trong Android, ứng dụng web cần phải được lưu trữ trên HTTPS.
# Đọc thêm:
Nếu bạn muốn tìm hiểu thêm về notifications JavaScript, dưới đây là một số tài nguyên tuyệt vời mà chúng tôi khuyên bạn nên xem:
1. [Bài đăng ](https://blog.tylernickerson.com/push-js-an-introduction-49291ac986e8) trên blog của tác giả của Push.js, thảo luận lý do tại sao anh ấy tạo dự án và các kế hoạch tương lai của anh ấy cho nó
2. Push API - API tuyệt vời mới cho phép người dùng nhận [thông báo](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) ngay cả khi ứng dụng web không mở
3. Điều gì tạo nên một thông báo tốt? - [Bài viết](https://developers.google.com/web/fundamentals/push-notifications/common-notification-patterns) của Google Developers về cách làm cho thông báo tốt hơn