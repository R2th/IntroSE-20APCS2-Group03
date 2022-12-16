## Push Notification - Có thể bạn đã biết ?

### Mở đầu
Push notification đối với 1 số lập trình viên có thể đơn giản tuy nhiên việc thiết lập và lựa chọn 1 số config cho firebase cũng như tạo certificate nào cho nó vẫn khá khó nhớ cho những lập trình viên mới vào nghề

Sẽ khá là rối rắm khi mà sự việc không rơi vào những case thẳng phải k nào? 

Đôi khi, bạn thậm chí có thể không xuất được tệp .p12 cần thiết do bị mất khóa hoặc chứng nhận môi trường product / develop lẫn lộn và không thể gửi thông báo đẩy tới Testflight / App Store . Tồi tệ hơn, certificate thường hết hạn sau 1 năm và bạn phải gia hạn certificate trong trung tâm nhà phát triển của Apple và tải lại cho nhà cung cấp dịch vụ của bạn mỗi năm, nếu bạn có 5 ứng dụng, thì bạn phải thực hiện quy trình này 5 lần mỗi năm!

Nhưng vấn đề đó là trước WWDC 2016, vậy giờ thì sao?

May mắn thay, Apple thừa nhận sự thiếu hụt cũng như điểm yếu đó và đã giới thiệu một định dạng xác thực mới cho việc push notification. Định dạng mới là tệp khóa .p8 , nó hoạt động cho tất cả các ứng dụng của bạn (ví dụ: 1 tệp chính có thể gửi thông báo đẩy tới tất cả các ứng dụng của bạn), hoạt động trong cả môi trường develop và product (không cần chuyển đổi giữa các chứng chỉ) và 1 yếu tố cơ bản và tốt hơn đó là nó không hết hạn!

Tuy nhiên, việc bảo mật và quản lí file này sẽ cần chú ý hơn rất nhiều so với file .p12 vì bất kỳ ai có nó đều có thể push noti tới tất cả các ứng dụng trên App Store của bạn! Nếu bạn nghi ngờ tệp khóa có thể bị xâm phạm, vui lòng vào trang khóa và thu hồi nó.

Chúng ta sẽ xem xét cách tạo tệp khóa .p8 và sử dụng nó trên Firebase trong phần tiếp theo.

### Tạo tệp .p8
Để tạo tệp khóa .p8, hãy truy cập[ https://developer.apple.com/account/](https://developer.apple.com/account/) sau đó vào mục Certificates, Identifiers & Profiles và chọn key

![](https://images.viblo.asia/08efa9a9-20d3-49c7-90fb-17c3935de3d5.png) 
![](https://images.viblo.asia/2e08c3d3-faa7-465b-8de5-9f9e3230ce09.png)
![](https://images.viblo.asia/336755c2-5e39-423a-b4c2-326528868305.png)

Chọn Register a New Key sau đó chọn 	
Apple Push Notifications service (APNs) điền thông tin, create và tải nó về máy.

![](https://images.viblo.asia/bfd59507-0252-48d6-ad1e-9c095ee87b3a.png)
![](https://images.viblo.asia/ad436478-9b59-46b6-a31d-d2e6e56de3ba.png)

Tên tệp Auth Key sẽ trông như thế này: AuthKey ABCD1234.p8 , với ABCD1234 là ID chính cho khóa này, chúng ta sẽ cần ID khóa này sau.

Đó là cách để tạo tệp .p8

> **NOTE : Hãy nhớ giữ tệp khóa an toàn vì bạn chỉ có thể tải xuống một lần, nếu bạn mất tệp khóa, bạn sẽ cần phải thu hồi và tệp đó và đăng ký một tệp mới.**


Vì tệp khóa .p8 có thể dễ dàng bị lạm dụng, tôi khuyên bạn không nên sử dụng dịch vụ web trực tuyến miễn phí, yêu cầu  push miễn phí vì họ có thể giữ tệp khóa trên máy chủ của họ.

### Sử dụng file .p8 trong Firebase để push notification.

Bây giờ chúng ta đã có file .p8, hãy đến Firebase để định cấu hình dịch vụ APNs (Thông báo đẩy của Apple) 

Trong bảng điều khiển Firebase, chọn dự án của bạn:

![](https://images.viblo.asia/0ee6692c-5bdc-4436-adcf-8b97848908ea.png)

sau đó nhấn vào biểu tượng cài đặt tên ứng dụng, chọn tab cloud messaging

![](https://images.viblo.asia/9fc4e3e5-6c86-4f24-acbf-4a227bafdb4e.png)

và cuộn xuống phần Khóa xác thực APNs , sau đó nhấp vào tải lên để tải lên tệp khóa .p8 của bạn.

![](https://images.viblo.asia/8546c3ba-0969-4f4d-9e48-3873fa385653.png)

Trong hộp thoại tải lên, có hai trường khác chúng ta cần quan tâm, đó là key ID và Team ID.
Như đã đề cập trước đó, ID khóa là chuỗi phía sau AuthKey trong tên tệp.

![](https://images.viblo.asia/779796f9-8299-459b-a2a1-4365ce96f43c.png)

Đối với Team ID, bạn có thể lấy thông tin này trên [https://developer.apple.com/account/#/membership](https://developer.apple.com/account/#/membership)

![](https://images.viblo.asia/05b9131d-361c-463a-acfc-7594ab7fe0d3.png)

Nhấp vào 'Tải lên' và bạn đã hoàn tất! 
Giờ đây, bạn có thể gửi push notification của Firebase bằng tệp chính .p8.

Việc tiếp theo của bạn là viết code để handle push trên ứng dụng.
Có thể tham khảo bài viết sau:
[https://www.raywenderlich.com/8164-push-notifications-tutorial-getting-started](https://www.raywenderlich.com/8164-push-notifications-tutorial-getting-started)