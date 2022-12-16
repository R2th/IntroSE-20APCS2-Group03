# Docker và những lợi ích khi triển khai ứng dụng
## 1. Docker là gì
- Docker là một nền tảng ở tầng OS (operating system) phục vụ cho việc chạy ảo hóa các dịch vụ/ứng dụng một cách nhanh chóng. Việc ảo hóa này tương tự với các bạn dùng VMware thực hiện tạo các máy chủ ảo, chia sẻ phần cứng của máy chủ thực. Docker có thể gọi là ảo hóa các ứng dụng chia sẻ các tài nguyên của một máy chủ.
- Docker là nền tảng phần mềm cho phép bạn dựng, kiểm thử và triển khai ứng dụng một cách nhanh chóng. Docker đóng gói phần mềm vào các đơn vị tiêu chuẩn hóa được gọi là container có mọi thứ mà phần mềm cần để chạy, trong đó có thư viện, công cụ hệ thống, mã và thời gian chạy. Bằng cách sử dụng Docker, bạn có thể nhanh chóng triển khai và thay đổi quy mô ứng dụng vào bất kỳ môi trường nào và biết chắc rằng mã của bạn sẽ chạy được.
## 2. Mô hình Docker trong máy tính
Docker hoạt động bằng cách cung cấp phương thức tiêu chuẩn để chạy mã của bạn. Docker là hệ điều hành dành cho container. Cũng tương tự như cách máy ảo ảo hóa (loại bỏ nhu cầu quản lý trực tiếp) phần cứng máy chủ, các container sẽ ảo hóa hệ điều hành của máy chủ. Docker được cài đặt trên từng máy chủ và cung cấp các lệnh đơn giản mà bạn có thể sử dụng để dựng, khởi động hoặc dừng container.
![](https://images.viblo.asia/197d472c-e058-44bf-8da5-91ee065433c6.png)
Đây là hình ảnh so sánh giữa Docker và VMware.
- Máy ảo (Virtual Machine – VM) là một mô phỏng của hệ thống máy tính. Nói một cách đơn giản, công nghệ này giúp người dùng có thể tạo ra nhiều “máy tính logic” trên một “máy tính vật lý”, dễ dàng quản lý vấn đề bảo mật. Kiến trúc của service khi hoạt động trên nền tảng máy ảo thông qua ảnh minh họa bên dưới:
![](https://images.viblo.asia/06ddebdb-7f4f-40d6-b68f-54cde8c68972.jpg)
- Docker container sẽ loại bỏ lớp “Guest OS”, với tốc độ khởi tạo service nhanh hơn hẳn so với việc sử dụng máy ảo. Docker Container sẽ giảm thiểu và đơn giản hóa các bản cập nhật bảo mật. Kiến trúc của service khi hoạt động trên nền tảng Docker container thông qua ảnh minh họa bên dưới:
![](https://images.viblo.asia/74ed2fec-22ca-4343-8d3c-21703905d87d.jpg)
- Docker daemon có thể giao tiếp trực tiếp với hệ điều hành của server và phân bổ tài nguyên cho các Docker container đang chạy, đảm bảo mỗi container hoạt động độc lập với các container khác và hệ điều hành của server. Thay vì phải đợi một phút để máy ảo khởi động, người dùng có thể khởi động Docker container chỉ trong vài mili giây và tiết kiệm được rất nhiều dung lượng ổ đĩa và các tài nguyên hệ thống khác do không cần phải sử dụng “guest OS” cồng kềnh cho mỗi ứng dụng. Người dùng sẽ không cần ảo hóa vì Docker chạy trực tiếp trên hệ điều hành của server.


|Máy ảo| Docker containe
| -------- | -------- |
|Kích thước (dung lượng) lớn   | Kích thước (dung lượng) nhỏ.   |
|Mỗi máy ảo sẽ có một hệ điều hành riêng.|Container sẽ sử dụng hệ điều hành của host. |
|Ảo hóa về mặt phần cứng | 	Ảo hóa về mặt hệ điều hành|
|Thời gian khởi động tính theo phút | 	Thời gian khởi động tính theo mili giây |
|Phân bổ bộ nhớ theo nhu cầu cần thiết|Yêu cầu ít dung lượng bộ nhớ hơn|
|Hoàn toàn bị cô lập và an toàn hơn|Cô lập ở mức tiến trình, có thể kém an toàn hơn|
## 3.Kết Luận
- Việc sử dụng máy ảo hay Docker container sẽ phụ thuộc vào nhu cầu sử dụng của người dùng. Máy ảo rất phù hợp trong việc cách ly tài nguyên hệ thống và toàn bộ môi trường làm việc. Đây sẽ là lựa chọn tốt hơn để chạy các ứng dụng yêu cầu tất cả tài nguyên và chức năng của hệ điều hành khi bạn cần chạy nhiều ứng dụng trên server hoặc có nhiều hệ điều hành khác nhau để quản lý. Ví dụ: công ty của bạn cung cấp dịch vụ web hosting, bạn có thể sẽ sử dụng máy ảo để phân phối tài nguyên của server công ty cho từng khách hàng.

- Mặt khác, triết lý của Docker là cô lập các ứng dụng riêng lẻ, không phải toàn bộ hệ thống. Một ví dụ hoàn hảo về điều này sẽ là chia nhỏ một loạt các dịch vụ ứng dụng web thành các Docker image của riêng chúng và triển khai chúng bằng Docker Container. Docker Container là lựa chọn tốt hơn khi ưu tiên lớn nhất của bạn là tối đa hóa số lượng ứng dụng đang chạy trên một số lượng server tối thiểu.