Chào mọi người, bài viết này mình xin chia sẻ về cách tạo cronjob đơn giản trên google apps script.
Nếu bạn đang cần tạo cronjob hàng ngày gửi mail đòi nợ, hay hàng ngày gửi message lên chatwork nhắc nhở viết báo cáo mà bạn chưa có server thì bài viết này sẽ giúp bạn giải quyết vấn đề đó... à google script còn làm được nhiều thứ hay ho lắm phần này mình chỉ giới thiệu vậy thôi, các bạn tự tìm hiểu thêm nhé.
![](https://images.viblo.asia/7766a03a-79e9-4cc7-bc1f-ae4e04ab87fb.png)

# Giới thiệu Google Apps Script
Google App Script là ngôn ngữ lập trình dựa trên JavaScript cho phép bạn tạo, sửa đổi và triển khai các dự án trên trình biên tập Apps Script, mã Apps Script chạy trên máy chủ của Google. Bạn có thể lập trình để thao tác, can thiệp đến rất nhiều các dịch vụ của Google như google sheet, clendar, maps, form, drive ... nói chung là hầu hết các dịch vụ của google.<br>
Mội vài ví dụ bạn có thể làm với google apps script<br>
- Với goole form: có thể viết mã để khi có người submit form thì sẽ gửi dữ liệu đến api server của bạn.
- Google sheet: ghi và đọc dữ liệu từ google sheet, lấy dữ liệu từ google sheet để gửi mail
- Google calendar: đọc dữ liệu lịch biểu từ file của bạn để tạo sự kiện trên google calender<br>
...<br>
Còn làm được rất rất nhiều thứ khác, còn nay mình sẽ hướng dẫn tạo cronjob gửi mail và gửi message lên chartwork.
# Cronjob gửi mail
**1. Để sử dụng google script thì bạn cần có tài khoản google ( cái này chắc ai cũng có rồi )** <br>
**2. Truy cập vào [script.google.com](https://script.google.com/) để mở trình soạn thảo code** <br>
**3. Chọn `+ dự án mới` để viết code**  <br>
![](https://images.viblo.asia/7e313273-2061-4829-b410-0f6ac0f977b5.png) <br>
**4. Để gửi mail thì bạn sử dụng đoạn code sau** <br>
``` php
    function myFunction() {
      var subject = 'Hello viblo.asia';
      var body = 'Xin chào viblo.asia, Bài viết này thuộc về trang web viblo.asia';
      var mailTo = 'email_recipient'
      GmailApp.sendEmail(mailTo, subject, body);
}
```
<br>
! email_recipient là email của người nhận. <br>

![](https://images.viblo.asia/44594acf-679a-4c55-808c-105e10f96519.png)
<br>
Đọc qua chắc các bạn cũng hiểu đoạn code này rồi, code này sẽ sử dụng chính email mà bạn đăng nhập vào app để gửi mail cho `mailTo` <br>
**5. Click vào nút :arrow_forward: để chạy thử** <br>
![](https://images.viblo.asia/39568f7a-6d8e-418e-bad3-58415734d89e.png)<br>
Bạn cần cấp quyền cho script này <br>
![](https://images.viblo.asia/d0aaa380-4299-46ed-b997-9143b2a0d756.png)<br>
Chọn xem xét các quyền<br>
![](https://images.viblo.asia/77aa271e-6fe2-47e0-9604-77d8e9fc2c13.png)<br>
Chọn nâng cao<br>
![](https://images.viblo.asia/522045a0-6ca4-4615-b250-3ffa7737e45a.png)<br>
Chọn đi tới dự án ... (không an toàn)<br>
![](https://images.viblo.asia/102bae4c-5635-4dbe-9ad1-ab8cfbfff5ed.png)<br>
Và click vào cho phép để cấp các quyền với email.<br>
Vậy là xong phần gửi mail thử, 1 mail đã được gửi đến người nhận.<br>
**6. Tạo triggers để chạy cronjob** <br>
![](https://images.viblo.asia/a4c0ae25-0e0c-470b-a24d-6385a5f60504.png)<br>
Tại mục chỉnh sửa chon kịch hoạt dự án hiện tại<br>
![](https://images.viblo.asia/35d7f067-3e5f-4d2f-9fd5-3c6b5a7f5b8b.png)<br>
Chọn mục Thêm trình kích hoạt ở góc dưới bên phải màn hình.<br>
![](https://images.viblo.asia/7a975169-de32-42d6-8557-b1d616b19a37.png)<br>
    Modal setting hiện ra và bạn cài đặt các thông số nhé, như trên là mình cài cho code script chạy khoảng nửa đêm đến 1 giờ sáng đó.<br>
   **Vậy là đã tạo cronjob gửi mail xong rồi ezz nhỉ**
   # Cronjob message lên chatwork
   Mình cần tạo cronjob send message lên chatword lúc 5h chiều để nhắc nhở viết report cuối ngày. Việc này khá đơn giản làm như phần conjob gửi mail ở trên và thay bằng đoạn code sau
``` php
   function myFunction() {
      var token = 'your_bot_chatwork_token';
      var roomId = 'your_room_id';
      var message = 'Viết report cuối ngày đi';

      var params = {
        'method' : 'post',
        'headers' : {
          'X-ChatWorkToken' : token
        },
        'payload' : {
          'body' : message
        }
      };

      UrlFetchApp.fetch("https://api.chatwork.com/v2/rooms/" + roomId + "/messages", params);
}
```
Chúng ta cần your_bot_chatwork_token là token của bot mà bạn dùng để gửi message
bạn vào chatwork bằng tài khoản của bot để lấy token [tại đây ](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php) <br>
Với room_id thì bạn vào box chat mà bạn muốn gửi tin nhắn lên đó để lấy trên url nhé, nó là 1 chuỗi số sau chữ id.
![](https://images.viblo.asia/f04a0e34-fc66-4aba-8795-ce4a235da822.png) <br>
**Sửa code rồi làm giống phần send mail là xong rồi.
Cảm ơn mn đã theo dõi.**