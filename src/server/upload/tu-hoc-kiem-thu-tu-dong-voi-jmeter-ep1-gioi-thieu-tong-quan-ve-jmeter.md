**Apache JMeter** là một ứng dụng mã nguồn mở tuyệt vời trong kiểm thử tự động ứng dụng web với khả năng kiểm thử đáng ngờ. Web Server là một nền tảng mang vô số ứng dụng và người dùng, do đó cần phải biết rằng nó hoạt động như thế nào hoặc thực hiện gì; hiệu quả của nó là xử lý đồng thời nhiều người dùng hoặc ứng dụng.<br>

*Ví dụ*: Máy chủ hỗ trợ Gmail sẽ hoạt động như thế nào khi số lượng lớn người dùng truy cập đồng thời vào tài khoản Gmail - về cơ bản phải thực hiện kiểm tra hiệu suất bằng các công cụ kiểm tra hiệu suất như JMeter, Loadrunner, v.v.

Để kiểm tra hiệu năng cao của ứng dụng hoặc server, thực hiện kiểm thử hiệu suất cao bằng cách sử dụng JMeter cho kết quả tương đối chính xác.

![](https://images.viblo.asia/e8c8d89d-0fd6-49a3-849b-333603531874.jpg)<br>
*Ví dụ trường hợp cần kiểm thử hiệu năng.*

Trước khi hiểu tổng quan về JMeter, chúng ta cũng cần có cái nhìn khái quát về 3 phương pháp kiểm thử sau:<br>
**Performance Test**- Kiểm thử hiệu năng: Kiểm thử này đưa ra hiệu suất tốt nhất có thể của hệ thống hoặc ứng dụng theo một cấu hình cơ sở hạ tầng nhất định. Ngay sau đó, nó cũng nhấn mạnh sự thay đổi cần phải được thực hiện trước khi ứng dụng đi vào sản xuất.

**Load Test**- Kiểm thử chịu tải: Kiểm thử này rất hữu ích để xác định khả năng hoạt động chịu tải của hệ thống trong các điều kiện tải bình thường và cao hơn điều kiện tải dự kiến.

**Stress Test**: xác định sự ổn định và sự mạnh mẽ của hệ thống Performance Test giúp kiểm tra hiệu suất của máy chủ trang web, cơ sở dữ liệu, mạng. Kiểm tra xem hệ thống hoạt động như thế nào khi quá tải và cách hệ thống phục hồi khi xảy ra lỗi.

## 1. Giới thiệu về JMeter
![](https://images.viblo.asia/3ac24dcb-0566-4f67-b20f-2b229ecf1928.jpg)<br>
*Overview of JMeter*

JMeter được xây dựng dựa trên plugin. Hầu hết các tính năng vượt trội của nó được áp dụng với các plugin. Các nhà phát triển có thể đơn giản hóa sử dụng JMeter bằng các plugin tùy chỉnh.

JMeter làm việc trên nhiều giao thức khác nhau: <br>
* Web Services - SOAP( Simple Object Access Protocol) / XML – RPC<br>
* Web – HTTP, HTTPS<br>
* Database – JDBC driver<br>
* Directory – LDAP( Lightweight Directory Access Protocol) <br>
* Messaging Oriented service – JMS( Java Message Service)<br>
* Service – POP3( Post Office Protocol version 3)<br>
* IMAP( Internet Message Access Protocol)<br>
* SMTP( Simple Mail Transfer Protocol)<br>
* FTP( File Transfer Protocol).
## 2. Các tính năng được hỗ trợ bởi JMeter
Mọi người thường hỏi tại sai chúng ta nên sử dụng JMeter? Vậy, để làm rõ điều này, chúng ta hãy cùng xem những tính năng "awesome" của JMeter:

* **Ứng dụng mã  nguồn mở:** JMeter là một ứng dụng mã nguồn mở miễn phí tạo điều kiện cho người dùng hoặc nhà phát triển sử dụng mã nguồn cho mục đích phát triển hoặc sửa đổi khác.
* **Giao diện thân thiện với người dùng:** JMeter có giao diện như một native app thông thường. Nó rất đơn giản, dễ sử dụng và người dùng sẽ sớm làm quen với nó.
* **Nền tảng độc lập:** Nó hoàn toàn là một ứng dụng destop dựa trên ngôn ngữ Java. Đó là tại sao nó có thể chạy trên mọi nền tảng. Nó có khả năng mở rộng cao và có khả năng tải kiểm tra hiệu năng trong nhiều loại máy chủ khác nhau: Web - HTTP, HTTPS, SOAP, Cơ sở dữ liệu thông qua JDBC, LDAP, JMS, Mail - POP3.
* **Viết script của riêng mình:** Sử dụng plugin có thể viết trường hợp kiểm thử của riêng bạn để mở rộng quá trình kiểm thử. JMeter sử dụng trình soạn thảo văn bản để tạo một test plan và cung cấp ở định dạng XML.
* **Hỗ trợ các phương pháp kiểm thử khác nhau**: JMeter hỗ trợ các phương pháp kiểm thử khác nhau như Load Testing, Distributed Testing, and Functional Testing, v.v.
* **Mô phỏng:** JMeter có thể mô phỏng nhiều người dùng khác nhau với các luồng một cách đồng thời, tạo ra mức tải nặng đối với ứng dụng web đang được kiểm thử.
* **Hỗ trợ đa giao thức:** JMeter có thể hoạt động trên kiểm thử  ứng dụng web và kiểm thử máy chủ cơ sở dữ liệu và cũng hỗ trợ các giao thức như HTTP, JDBC, LDAP, SOAP, JMS và FTP.
* **Script Test**: JMeter có khả năng thực hiện kiểm tra tự động hóa bằng Bean Shell & Selenium.
* **Framework đa luồng:** Đó là một framework đa luồng đầy đủ cho phép lấy mẫu đồng thời theo nhiều luồng và lấy mẫu đồng thời các chức năng khác nhau bằng các nhóm luồng khác nhau.
* **Kết quả kiểm thử dễ hiểu:** Nó trực quan hóa kết quả kiểm thử theo định dạng như biểu đồ, bảng, cây và file log rất đơn giản để hiểu.
* **Dễ dàng cài đặt:** Trong Windows, chỉ cần chạy tệp ".bat" để sử dụng JMeter. Trong Linux / Unix - JMeter có thể được tiếp cận bằng cách nhấp vào tập lệnh shell JMeter. <br> 
Các bạn có thể download và cài đặt JMeter theo các link sau: <br>
[Download JMeter](http://jmeter.apache.org/download_JMeter.cgi)<br>
[Hướng dẫn cài đặt JMeter](https://www.softwaretestingclass.com/jmeter-installation-guide-jmeter-tutorial-series-2/)
## 3. Quy trình hoạt động của hệ thống JMeter
JMeter mô phỏng số lượng người dùng gửi yêu cầu đến một máy chủ cho thấy hiệu suất / chức năng của một máy chủ / ứng dụng phù hợp thông qua các bảng, biểu đồ, vv 
![](https://images.viblo.asia/e5c9ba77-8969-4cff-b225-df7e6f5f3d8e.jpg)<br>
*Quy trình hoạt động của  JMeter*

User gửi reqquest lên server >  Request được gửi lên server với số lượng lớn >  Server nhận, xử lý và phản hồi kết quả request > JMeter lưu tất cả các responses từ server > JMeter thu thập data để lấy thông tin thống kê rồi trả về server > Kết thúc chu trình làm việc > Lấy về báo cáo kết quả kiểm thử.

## 4. Tổng kết
Như vậy chúng ta đã tìm hiểu được tổng quan về JMeter. Các bạn hãy thử cài đặt JMeter trên máy tính của mình xem giao diện của nó như thế nào nhé. Trong bài viết sau chúng ta sẽ tìm hiểu các thành phần trong giao diện của JMeter.<br>
Link tham khảo: https://www.softwaretestingclass.com/learn-jmeter-performance-testing-jmeter-tutorial-series/