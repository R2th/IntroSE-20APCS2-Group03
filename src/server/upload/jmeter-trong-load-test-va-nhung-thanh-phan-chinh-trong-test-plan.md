# Jmeter là gì ?
- Là công cụ đo tải về hiệu năng của đối tượng, 
có thể kiểm tra hiệu năng trên nhiều loại server 
khác nhau như Web-HTTP, HTTPS, SOAP, 
Database via JDBC, LDAP, JMS, Mail –
SMTP(S), POP3(S), IMAP(S)…  
# Các đặc trưng của Jmeter
- *Mã nguồn mở, giao diện trực quan, dễ sử dụng.*
- *Có thể kiểm thử nhiều kiểu server: Web - HTTP, 
HTTPS, SOAP, Database - JDBC, LDAP, JMS, 
Mail - POP3,…*

- *Có thể chạy trên nhiều nền tảng hệ điều hành 
khác nhau.*
- *Đa luồng, giúp xử lý nhiều request cùng một 
khoảng thời gian, xử lý các dữ liệu thu được một 
cách hiệu quả.*

- *Đặc tính mở rộng, có rất nhiều plugin được chia 
sẻ rộng rãi và miễn phí.*
- *Jmeter thực hiện giả lập một nhóm người dùng 
gửi các yêu cầu tới một máy chủ, nhận và xử lý 
các phản hồi từ máy chủ.*

![](https://images.viblo.asia/648e8f4b-f21a-446f-9166-a117a0fd6408.png)

# Các thành phần chính để lập Test plan
## 1. Thread Group
Trong Jmeter mọi TestPlan đều cần ít nhất 1 Thread 
Group, nhiệm vụ của Thread Groups sẽ
tạo ra các yêu cầu để request tới server. Để lập nên 1 Thread Groud cần chú ý các thông tin sau:

* Name: đặt tên cho ThreadGroup
* Number of Threads(users): số lượng 
người dùng mà ta muốn mô phỏng.
* Ramp-up Period (in seconds): thời gian để 
JMeter tạo ra tất cả những thread cần 
thiết.
* Loop Count Forever: mỗi thread được 
tạo sẽ thực hiện 1 lần (thay 1 bằng n thì 
số các thread sẽ lặp n lần).

## 2. Controllers
Có 2 loại controllers chính đó là :
*  **Samplers**: gửi các requests cụ thể tới một
server  . Có rất nhiều Samplers như sau:

1. HTTP Request

1. FTP Request

1. JDBC Request

1.  Java Request

1.  SOAP/XML Request

1.  RPC Requests

* **Logical Controller**: cho phép customize trình
tự logic Jmeter sử dụng khi gửi các request. 
Ví dụ, có thể thêm một Interleave Logic 
Controller giữa 2 HTTP Request Samplers, 
hoặc có thể sử dụng các Random Controllers 
để gửi các HTTP requests đến server 1 cách
ngẫu nhiên.
## 3. Listeners
- Là sự tập hợp các kết quả của việc Run test, cung cấp cho người dùng các công cụ hiển thị một cách trực quan, dễ hiểu thông qua các : Tables, Graphs, trees hoặc một vài log files đơn giản

*Graph full result*: Cung cấp tất cả những kết quả trả về dưới dạng đồ thị: Lỗi, Thời gian phản hồi, lưu lượng,...

![](https://images.viblo.asia/2cec64bb-cec3-4a70-925c-65d6614b8b5d.png)


*View result in the Table*: Hiển thị những thông số về thời gian phản hồi của từng yêu cầu, những yêu cầu thực hiện thành công hay thất bại ... dưới dạng bảng

![](https://images.viblo.asia/f658fcf1-613b-46e9-8113-7ac22a6463ab.png)


*Summary Report*: Cung cấp những thống kê tổng thể 

## 4. Timer
Dùng để định nghĩa thời gian đợi giữa những request, có 1 số loại Timer phổ biến hay dùng như sau:

*Uniform random timer* : Cho phép delay request trong 1 khoảng thời gian được thiết lập.

*Constant throughput timer*: Cho phép quy định số lượng Sample chạy trong 1 phút.

*Synchronizing timer*: Cho phép gom nhóm số lượng Threads muốn đẩy tải trong 1 thời điểm.

*Constant timer*: Cho phép delay 1 thời gian được thiết lập.

## 5. Config Element
Đây là chỗ để tạo các giá trị mặc định và các biến dùng trong Sampler, được thực hiện đầu tiên trước tất cả các Sampler trong cùng phạm vi đó. Một số loại config sẵn có trong Jmeter:

* CSV data set config.
* TCP Sampler config.
* User defined variables.
* FTP request defaults.
* HTTP cookie manager.
* HTTP header manager.
* JDBC connection configuration.

## 6. Assertion 
Là phần xác nhận kết quả trả về đã đúng hay chưa , thông qua các kiểu trả về như sau:

* Responsive code
* Responsive message
* Duration Assertion
* XPath Assertion
* Size Assertion

## 7. Post - Processor elements
Là thành phần cuối cùng dùng để xử lý các kết quả trả về sau khi Sampler được thực hiện. Một Post-Processor được dùng để xử lý dữ liệu của response, thường dùng để trích xuất giá trị từ response của server. 

# Kết luận
Qua bài viết chúng ta đã tìm hiểu được khái niệm về Jmeter và các thành phần chính trong Test Plan. Hy vọng bài viết sẽ giúp ích cho các bạn đang bắt đầu tìm hiểu về Load Test để áp dụng trong dự án