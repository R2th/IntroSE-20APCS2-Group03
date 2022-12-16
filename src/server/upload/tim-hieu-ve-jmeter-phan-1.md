# Kiểm thử hiệu năng là gì? 
Kiểm thử hiệu năng là một loại kiểm thử phi chức năng, giúp đánh giá khả năng đáp ứng hành vi của hệ thống. Ứng dụng tốt là ứng dụng sẽ có thời gian phản hồi tốt (response time). Vì thế khả năng đáp ứng cũng quan trọng như giao diện và chức năng của ứng dụng vậy. 
Giả sử nếu một trang web có thời gian load chậm, phản hồi lâu sẽ làm có trải nghiệm người dùng không tốt và để đáp ứng được vấn đề đó đã có rất nhiều tool hỗ trợ để kiểm tra như: Jmeter, LoadView, WeLoad,... 
## Mục đích của kiểm thử hiệu năng?
* Giúp tìm ra các điểm làm nghẽn hiệu năng của hệ thống
* Kiểm tra được hệ thống có đáp ứng bao nhiêu user sử dụng đồng thời
* Khả năng dẫn đến lỗi có thể do tải nặng
* Tìm ra những tác động về hiệu năng sau mỗi lần sửa đổi
## Jmeter là gì?
Jmeter giúp kiểm tra tải hành vi, có chức năng đo lường hiệu suất của hệ thống và là mã nguồn mở được viết bởi ngôn ngữ thuần Java.
Cha đẻ của Jmeter là Stefano Mazzocchi của Apache Software Foundation, ban đầu ông viết chủ yếu để kiểm tra hiệu năng của Apache Jserv, sau đó cộng đồng đã thiết kế lại rồi cải thiệu về mặt giao diện cũng như thêm các tính năng và khả năng kiểm thử chức năng.
### Các tính năng của Jmeter
* License: Vì là mã nguồn mở nên user có thể dùng hoàn toàn miễn phí khi cài đặt và sử dụng 
* Graphical User Interface – GUI: Giao diện đơn giản, dễ sử dụng và dễ học
* Server/Protocol Support: Jmeter hỗ trợ nhiều ứng dụng, máy chủ và các giao thức khác nhau. Một số giao thức như HTTP, HTTPS, FPT,POP,SMTP,...
* Simulation: Mô phỏng nhiều người dùng bằng cách sử dụng người dùng ảo hoặc người dùng duy nhất để tạo lưu lượng truy cập nhiều cho server
* Test Result: Kết quả kiểm thử có thể xem dưới nhiều dạng bảng, biểu đồ, báo cáo,..rất trực quan và dễ hình dung
* Testing Types: Không chỉ kiểm thử hiệu năng Jmeter còn hỗ trợ kiểm thử chức năng,Regression Testing,...
* Installation dễ dàng và đơn giản, chỉ cần dowload file, giải nén và chạy file tương ứng với hệ điều hành
### Cách thức hoạt động
Jmeter sẽ mô phỏng một số lượng người dùng gửi request đến ứng dụng cần kiểm thử. Khi các request được Jmeter mô phỏng server sẽ phản hồi và bắt đầu thu thập các dữ liệu. Tất cả các phản hồi sẽ được lưu trữ và dự vào server nó sẽ trả về kết quả để thống kê. Kết quả này sẽ cho thấy hiệu năng của server dưới các định dạng khác nhau tùy theo yêu cầu mình thực hiện
### Quy trình làm việc của Jmeter
Jmeter sẽ sinh ra các request gửi đến server đích và mô phỏng số lượng người dùng gửi các request đến server đích. 
Khi máy chủ phản hồi lại các request, Jmeter sẽ lưu lại các phản hồi. Từ các dữ liệu phản hồi, Jmeter sẽ thu thập tập hợp và xử lý tổng hợp và thống kê. 
Cuối cùng dự vào kết quả đó Jmeter sẽ tạo ra báo cáo cho người dùng biết về hiệu năng của hệ thống.

![](https://images.viblo.asia/3358309a-0496-445b-b635-b6ae9d6dd000.png)
Kết luận: Rất  mong nhận được nhận xét và ủng hộ từ quý bạn đọc. Chân thành cảm ơn!