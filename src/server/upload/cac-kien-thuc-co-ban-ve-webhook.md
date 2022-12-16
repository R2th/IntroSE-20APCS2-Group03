## 1. Webhook là gì?
### 1.1 Webhook là gì?
Webhook là một tính năng giúp các lập trình viên cập nhật các sự kiện trong thời gian thực cho phép. Webhook hay còn gọi là web callback và HTTP push API. Server sẽ tự động thông báo và gửi dữ liệu từ một sự kiện nào đó trên website. Ví dụ như form đăng kí từ khách hàng, mua hàng, comment hay gửi mail hỗ trợ.

Webhook là một công nghệ rất tiện dụng trong việc triển khai các phản ứng sự kiện (event) trên website của bạn. Webhook cung cấp một giải pháp giúp ứng dụng server-side thông báo cho ứng dụng phía client-side khi có sự kiện phát sinh đã xảy ra trên máy chủ (event reaction). Cũng chính vì vậy, ứng dụng client-side sẽ không cần phải liên tục hỏi hoặc check với ứng dụng server-side.

Nhiều người cũng thường gọi Webhook là “Reverse APIs”. Thông thường đối với các API, ứng dụng client-side sẽ gọi ứng dụng server-side. Tuy nhiên khi có webhook, phía server-side sẽ gọi webhook (end-point URL được cung cấp bởi ứng dụng client-side), ví dụ: ứng dụng server-side gọi ứng dụng client-side.

Đây là một tính năng rất hữu ích trong việc triển khai các event reaction trên website. Khi có một sự kiện mới xảy ra trên máy chủ Webhook sẽ cung cấp theo cơ chế giúp ứng dụng server-side sẽ thông báo cho một ứng dụng phía client-side.
![](https://images.viblo.asia/4acaa9d6-4733-498c-95e2-42d8f9a0ea72.png)

### 1.2 Webhook Discord là gì?
Webhook Discord được tạo để khi thiết lập tập lệnh Bash sẽ giúp bạn kiểm tra trạng thái của danh sách các trang web. Từ đó sẽ kiểm tra thông báo cụ thể từ server đến kênh Discord của bạn.

Discord là một trong những hệ thống trò chuyện được lưu trữ tương tự với Slack. Mọi người có thể cài đặt hệ thống nhắn tin miễn phí  thông qua Discord. Nó cho phép bạn giao tiếp thông qua: văn bản, hình ảnh, âm thanh và video. Nó thường cung cấp các tính năng cao cấp giúp bạn đăng ký miễn phí và nó sẽ sẵn có ứng dụng client dành riêng cho macOS, Linux, Windows, iOS.

### 1.3 Webhook Facebook là gì?
Webhook Facebook là một tính năng tiện lợi để quản lí trang cá nhân trên Facebook. Các tính năng của nó hầu hết đều giống như Webhook Discord.

Vậy chúng ta đã tìm hiểu Webhook là gì và Webhook trên Discord cũng như trên Facebook. Bài viết sẽ đưa ra cho bạn một số ví dụ cụ thể hơn ở phần sau. Chúng sẽ giúp bạn hiểu rõ hơn về thực tiễn Webhook là gì.

### 1.4 Ví dụ thực tiễn Webhook là gì?
*Ví dụ 1*

Ứng dụng đo đạc mức độ ô nhiễm không khí AirVisual sẽ gửi đến điện thoại thông báo về “Mức độ ô nhiễm không khí tại TP HCM rất xấu (AQI khoảng 250 – 270). Sau khi nhận được thông báo này từ server, ứng dụng sẽ lập tức hiển thị thông báo trên điện thoại để cảnh báo cho người dùng.

![](https://images.viblo.asia/ce46967f-64d7-4854-a5ff-b232c26d9229.png)

*Ví dụ 2*

MailChimp – một công cụ gửi email marketing chuyên nghiệp hiện nay. Webhook được MailChimp dùng cho các sự kiện quan trọng như đăng ký nhận bản tin hay hủy đăng ký và thay đổi thông tin người dùng.

Những người đăng ký tài khoản trên website đều sẽ được kết nối với MailChimp. Việc này giúp bạn quản lý data, thực hiện gửi email hàng ngày khá dễ dàng.

*Ví dụ 3*

Cổng thanh toán trực tuyến Stripe cũng cho phép sử dụng Webhook với rất nhiều loại sự kiện khác nhau. Ví dụ như thanh toán có thông qua hay không, ngày tháng có chính xác không. Điều này giúp cho việc thực hiện lại thao tác sẽ được chính xác và dễ dàng hơn.

## 2. Chức năng cơ bản của Webhook là gì?
Chức năng cơ bản của Webhook là có thể được tích hợp vào các dịch vụ Website mà không cần thêm cơ sở hạ tầng mới. Bởi vì dùng HTTP nên nó có thể làm được điều đó.

Webhook là cuộc gọi lại do người dùng định nghĩa thường được kích hoạt bởi một số sự kiện. Nó giống như là đẩy mã vào kho lưu trữ hoặc bình luận được đăng lên blog.

Hiểu đơn giản chức năng của một Webhook là gì thì đó chính là có thể được tích hợp vào các dịch vụ website mà không cần thêm cơ sở hạ tầng mới nhờ HTTP. Sử dụng phổ cập là để kích hoạt các bản dựng với các hệ thống tích hợp liên tục.

## 3. Khi nào nên sử dụng Webhook
Webhook thường được các lập trình viên sử dụng để cập nhất các event theo thời gian thực một cách tiết kiệm tài nguyên nhất có thể. Cũng chình vì vậy mà Webhook được sử dụng trong trường hợp này. Ngoài ra Webhook còn đường dùng qua API là khi API của bạn không tốt lắm hoặc thậm chí là không có API để bắt đầu. Vì vậy thông qua Webhook, bạn có thể tạo một giải pháp cung cấp dữ liệu mà ứng dụng của bạn cần để hoạt động ngay một cách trơn tru nhất.

Có một lưu ý nhỏ thế này, tuy Webhook khá linh động nhưng nếu nó không được sử dụng thường xuyên để call dữ liệu (vì nó chỉ hoạt động khi có dữ liệu hoặc event mới trên hệ thống), nên dẫn đến khả năng sẽ không thể lấy được các bản cập nhật mới nhất nếu hệ thống dừng hoạt động vì một lý do bất chợt nào đó.

## 4. Sự khác biệt giữa Webhook và API
### 4.1 API là gì?
API là các phương thức, giao thức kết nối với các thư viện và ứng dụng khác. API là viết tắt của cụm từ Application Programming Interface. Đây là một giao diện lập trình ứng dụng.

Bên cạnh tìm hiểu Webhook là gì chúng ta có thể tìm hiểu thêm về API. Mục đích để so sánh xem điểm khác biệt giữa nó và Webhook là gì. API cung cấp khả năng cung cấp khả năng truy xuất đến một tập các hàm hay dùng. Từ đó có thể trao đổi dữ liệu giữa các ứng dụng.

![](https://images.viblo.asia/b2c2698f-d1dd-4313-a629-a57bfe5907fd.png)

### 4.2 Sự khác biệt giữa API và Webhook là gì?
Giữa API và Webhook có sự khác biệt rõ ràng. Điều đó được thể hiện qua nhiều yếu tố như sau:

Do hỗ trợ đồng bộ hóa và chuyển tiếp dữ liệu thực hiện bằng những phương thức khác nhau, nên chúng sẽ phục vụ các mục đích khác nhau.
Các API cần phải thăm dò server thường xuyên để biết được sự kiện mới phát sinh. Ngược lại, với Webhook bất cứ mọi sự kiện đều sẽ tự động thông báo cho client.
API thực hiện cuộc gọi nhưng không thể biết có nhận được bất kỳ cập nhật dữ liệu mới nào dưới dạng phản hồi hay không. Còn Webhook chỉ khi có một số cập nhật dữ liệu thì chúng mới được nhận các cuộc gọi qua HTTP POST từ các hệ thống.

## 5. Một số lưu ý khi sử dụng Webhook
Sau đây là một vài lưu ý khi sử dụng Webhook:
- Hãy hiểu rõ cách nhà cung cấp Webhook của bạn xử lý những phản hồi. Điều đó nhằm để chuẩn bị tốt cho các trường hợp lỗi có thể xảy ra trong ứng dụng.
- Webhook có khả năng hỗ trợ rất nhiều yêu cầu. Điều này có thể dẫn đến tình trạng Dosing. Nên lưu ý để hoạt động của bạn được diễn ra tốt hơn.