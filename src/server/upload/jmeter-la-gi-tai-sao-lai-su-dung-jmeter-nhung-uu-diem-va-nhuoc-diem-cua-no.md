Hãy giả sử rằng công ty bạn vừa phát triển một trang web thương mại điện tử, cái mà tương tự như Amazon. Đó là dự án lớn nhất đối với tổ chức của bạn và một số lượng lớn khách hàng sẽ sử dụng trang web này. Nó cần có khả năng xử lý 100,000 giao dịch trong 1 ngày và hàng nghìn người dùng đồng thời trở lên. 

Một số điều mà bạn có thể quan tâm khi phát triển trang web là:

* Điều gì sẽ xảy ra với máy chủ web trong điều kiện tải khốc liệt như vậy
* Làm thế nào bạn có thể kiểm tra trang web của bạn trong kịch bản này?
* Lấy 100.000 người dùng đồng thời kết nối với trang web của bạn để thử nghiệm là bất khả thi.

May mắn thay, có một phần mềm cái mà có thể giúp bạn giải quyết những vấn đề này. Đó là JMeter. Đây là công cụ tốt nhất để đo đặc hiệu suất của trang web. Ban đầu, các nhà phát triển đã phát triển công cụ này để thử nghiệm hiệu năng của các ứng dụng web nhưng trên thực tế, nó có thể làm được nhiều hơn thế.
# Vậy Jmeter là gì? 

Jmeter là một phần mềm cái mà có thể sử dụng để chạy thử nghiệm hiệu suất, thử nghiệm tại và thử nghiệm chức năng của ứng dụng web. JMeter cũng có thể mô phỏng tải nặng trên máy chủ bằng cách tạo hàng tấn người dùng ảo đồng thời lên máy chủ web.

JMeter là một ứng dụng mã nguồn mở. Điều này có nghĩa là bạn có thể tải xuống mã nguồn của JMeter để phân tích và sửa đổi nó nếu bạn muốn.

Stefano Mazzocchi của Quỹ phần mềm Apache thiết kế nó đầu tiên. Bây giờ anh ấy là một kỹ sư phần mềm tại Google. Ngày nay, JMeter đã trở thành một trong những công cụ thử nghiệm phổ biến nhất trên thế giới, bên cạnh Selenium và Load Runner.

# Ưu điểm và nhược điểm của việc sử dụng Jmeter

Bây giờ bạn đã hiểu Jmeter là gì, chúng ta hãy nhìn vào một số ưu điểm và nhược điểm của việc sử dụng JMeter. Có hàng tấn công cụ kiểm thử ngoài kia như Load Runner, Selenium và QTP. Vậy tại sao bạn cần JMeter để kiểm tra hiệu suất? Đó là bởi vì JMeter có những tính năng mà các công cụ khác không có.

## Ưu điểm: 
 
* **Mã nguồn mở**: Jmeter là một phần mềm mã nguồn mở. Điều này có nghĩa là nó có thể được tải xuống miễn phí. Nó cũng là một ứng dụng Java thuần túy 100%. Nhà phát triển có thể sử dụng mã nguồn của nó, có thể sửa đổi và tùy chỉnh nó theo yêu cầu của họ. Họ cũng có thể đóng góp code của họ để làm nên một JMeter tốt hơn.

* **Dễ sử dụng**: Người dùng có thể cài đặt và sử dụng JMeter một cách dễ dàng. Chỉ cần tải về từ internet, cài đặt và chạy. Như một ứng dụng Java thuần túy, nó sẵn sàng để sử dụng với các cài đặt mặc định. Nó không yêu cầu bạn phải có bất kỳ kỹ năng cụ thể nào hoặc kiến thức tên miền để sử dụng nó.

* **Nền tảng độc lập**: JMeter được phát triển bằng Java, đây là ngôn ngữ lập trình phổ biến nhất trên thế giới. Do đó, nó có thể chạy trong mọi hệ điều hành có thể là Window, Linux hoặc Mac.

* **Báo cáo mạnh mẽ**: JMeter có thể tạo báo cáo hiệu quả. Kết quả kiểm tra có thể được xem lại bằng cách sử dụng Graph, Chart, and Tree View. Jmeter hỗ trợ các định dạng khác nhau của báo cáo như text, XML, HTML and JSON. 

* **Thử nghiệm cuối cùng**: Với Jmeter, người dùng có thể thực hiện bất kỳ loại kiểm thử nào mà bạn muốn. Load Test, Stress Test, Functional Test, Distributed Test, tất cả trong một công cụ

* **Tính linh hoạt**: Bạn có thể tùy chỉnh JMeter theo yêu cầu của bạn và áp dụng thử nghiệm tự động cho JMeter. Bạn có thể tiết kiệm công sức của việc thực hiện các trường hợp kiểm tra thủ công.

* **Hỗ trợ đa giao thức**: JMeter hỗ trợ một vài giao thức như HTTP, FTP, SOAP, JDBC, JMS và LDAP. Nó cũng có thể được sử dụng để kiểm thử hiệu suất của cơ sở dữ liệu của bạn.

JMeter là công cụ tuyệt vời, nhưng nó vẫn có một số nhược điểm.

## Nhược điểm: 

* **Tiêu thụ bộ nhớ:** JMeter có thể mô phỏng tải nặng và trực quan hóa báo cáo thử nghiệm. Điều này có thể tiêu tốn rất nhiều bộ nhớ và có thể dẫn ra khỏi bộ nhớ dưới tải nặng.

* **Chỉ áp dụng cho ứng dụng web**: JMeter là công cụ tốt để thử nghiệm ứng dụng web nhưng nó không phải là công cụ phù hợp để thử nghiệm ứng dụng máy tính để bàn.

* **Thiếu hỗ trợ cho JavaScript**: JMeter không phải là một trình duyệt, vì vậy nó không thể chạy JavaScript trong ứng dụng web. Nó có hỗ trợ hạn chế để xử lý JavaScript hoặc Ajax, điều này có thể ảnh hưởng đến độ chính xác của mô phỏng.

# Jmeter thực hiện kiếm tra tải như thế nào? 
1. Jmeter tạo ra các yêu cầu và gửi chúng lên server giống như trình duyệt web yêu cầu một trang
2. Nó nhận được phản hồi từ server, thu thập chúng và hiển thị những chi tiết đó trong biểu đồ hoặc đồ thị.
3. Nó xử lý phản hồi từ server.
4. Nó tạo ra kết quả thử nghiệm theo một số định dạng như text, XML, JSON. Sau đó, tester có thể phân tích dữ liệu

Link tham khảo: 
https://www.linkedin.com/pulse/what-jmeter-why-use-advantages-disadvantages-private-limited