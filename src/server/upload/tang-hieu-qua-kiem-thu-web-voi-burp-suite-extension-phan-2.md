Chào các bạn,

Tiếp nối phần 1 của bài viết [**Tăng hiệu quả kiểm thử web với Burp Suite extension**](https://viblo.asia/p/tang-hieu-qua-kiem-thu-web-voi-burp-suite-extension-phan-1-3Q75wA3eZWb), trong phần này, mình sẽ chia sẻ với các bạn thêm 3 extension trong Burp Suite giúp cho việc kiểm thử ứng dụng web của bạn đạt được hiệu quả hơn. Hãy cùng mình tìm hiểu nhé!

# 1. HTTP Request Smuggler
HTTP Request Smuggler là một kỹ thuật can thiệp vào cách một trang web xử lý chuỗi các yêu cầu HTTP nhận được từ một hoặc nhiều người dùng. Các lỗ hổng bảo mật về request smuggler thường có mức độ nghiêm trọng, cho phép kẻ tấn công vượt qua các kiểm soát bảo mật, truy cập trái phép vào dữ liệu nhạy cảm và xâm phạm trực tiếp vào người dùng khác trong ứng dụng.

Như các bạn đã biết, các cuộc tấn công HTTP Request Smuggler rất khó để thực hiện và cũng khó trong việc kiểm tra chúng, và đôi khi còn gặp phải những hạn chế nhất định. Hơn nữa, giả sử bạn có thể khai thác nhiều kiểu tấn công HTTP Request Smuggler nhưng chắc chắn bạn không thể kiểm tra hết tất cả chúng một cách thủ công được vì chúng đòi hỏi sự chính xác trong Content Length cũng như Transfer Encoding header.

Để giúp người kiểm thử dễ dàng hơn trong việc kiểm tra, giải pháp đó chính là HTTP Request Smuggler extension. Đây là một tiện ích mở rộng cho Burp Suite được thiết kế để giúp khởi chạy các cuộc tấn công HTTP Request Smuggling. Nó hỗ trợ quét các lỗ hổng Request Smuggling và cũng hỗ trợ khai thác bằng cách xử lý các tùy chỉnh thích hợp cho bạn.

*Lưu ý: Không nên nhầm lẫn tiện ích mở rộng này với Burp Suite HTTP Smuggler, sử dụng các kỹ thuật tương tự nhưng chỉ tập trungvào việc bypass WAF.*

Để cài đặt extension này, chỉ cần vào phần BApp trong tab Extender và tra cứu với tên HTTP Request Smuggler.  

Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/http-request-smuggler

# 2. AWS Extender
Với xu thế hiện nay, ngày càng nhiều công ty và doanh nghiệp lựa chọn các dịch vụ trên đám mây. Và các bên cung cấp dịch vụ tiên phong trong lĩnh vực này chính là AWS, Google và Microsoft Azure. Giả sử chúng ta là người kiểm thử và được yêu cầu kiểm tra các dịch vụ trên đám mây này thì có thể việc này sẽ hơi khó khăn khi bạn hầu như không biết chúng là gì và kiểm tra chúng như thế nào.

AWS Extender là một tiện ích mở rộng của BurpSuite để xác định và kiểm tra S3 bucket cũng như Google Storage bucket và Azure Storage container về các vấn đề lỗi cấu hình sai phổ biến bằng cách sử dụng thư viện boto / boto3 SDK.

Tất cả những gì mà extension này yêu cầu là chúng ta phải cung cấp một Quyền truy cập hoặc một Khóa bí mật. Nó sẽ tự động thực hiện quét và kiểm tra các vấn đề thường gặp về lỗi cấu hình sai. Nếu không có khóa truy cập, extension này vẫn có thể thực hiện một số kiểm tra và thử nghiệm thụ động.

Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/cloud-storage-tester

Chi tiết về các bước cài đặt và hướng dẫn sử dụng cũng đều được trình bày chi tiết trong repo phía trên.

Ảnh minh họa:
*Thiết lập một số cài đặt trong AWS Extender extension*
![image.png](https://images.viblo.asia/7cc4b5f3-9a28-43d1-99c2-e8c610f480f9.png)

*Thông báo khi phát hiện lỗ hổng*
![image.png](https://images.viblo.asia/af68a470-b4f4-4169-bc9e-3c4156fc706d.png)

![image.png](https://images.viblo.asia/c2c18af6-079a-4a14-9b13-f704df582a21.png)

# 3. 403Bypasser
Đã bao giờ, sau rất nhiều cố gắng trong quá trình pentest, bạn tìm thấy một endpoint có khả năng bị tấn công nhưng khi truy cập thì lại nhận được status code 403?

403Bypasser extension sẽ tự động quét các status code 403 và cố gắng tìm cách để bypass chúng.

Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/403-bypasser

Chi tiết về các bước cài đặt và hướng dẫn sử dụng cũng đều được trình bày chi tiết trong repo phía trên.

Ảnh minh họa:
![image.png](https://images.viblo.asia/b11f40b0-4c0a-4206-ab45-6ad0acfc597c.png)

# Lời kết
Qua chuỗi 2 bài viết về Burp Suite extension, mình đã chia sẻ một số tiện ích mở rộng khác nhau có thể cải thiện chức năng của Burp Suite và sẽ giúp chúng ta thực hiện pentest một cách hiệu quả hơn. Mặc dù nội dung mình chia sẻ có thể chưa thỏa mãn đối với một số bạn pentester chuyên nghiệp, nhưng mình hy vọng rằng nó cũng sẽ giúp ích một phần nào đó cho các bạn mới bắt đầu vào con đường pentest cũng như đang làm quen với công cụ Burp Suite để kiểm tra, đánh giá ứng dụng web. Trong tương lai, mình sẽ tiếp tục chia sẻ đến các bạn nhiều thông tin hữu ích khác mà mình tích lũy được trong quá trình học tập và làm việc và sẽ cải thiện chất lượng nội dung bài viết tốt hơn.