### **1.	Giới thiệu chung về Jmeter**

Jmeter là công cụ để đo độ tải và performance của đối tượng, có thể sử dụng để test performance trên cả nguồn tĩnh và nguồn động, có thể kiểm tra độ tải và hiệu năng trên nhiều loại server khác nhau như: Web – HTTP, HTTPS, SOAP, Database via JDBC, LDAP, JMS, Mail – SMTP(S), POP3(S) and IMAP(S)…
Jmeter là  một mã nguồn mở được viết bằng java. Cha đẻ của JMeter là Stefano Mazzocchi sau đó Apache đã thiết kế lại để cải tiến hơn giao diện đồ họa cho người dùng và khả năng kiểm thử hướng chức năng. 
Các đặc trưng của jmeter:
-	Nguồn mở, miễn phí
-	Giao diện đơn giản, trực quan dễ sử dụng
-	Có thể kiểm thử nhiều kiểu server: Web - HTTP, HTTPS, SOAP, Database - JDBC, LDAP, JMS, Mail - POP3,…
-	Một công cụ độc lập có thể chạy trên nhiều nền tảng hệ điều hành khác nhau, trên Linux chỉ cần chạy bằng một shell scrip, trên Windows thì chỉ cần chạy một file .bat
-	Đa luồng, giúp xử lý tạo nhiều request cùng một khoảng thời gian, xử lý các dữ liệu thu được một cách hiệu quả.
-	Đặc tính mở rộng, có rất nhiều plugin được chia trẻ rộng rãi và miễn phí
-	Một công cụ tự động để kiểm thử hiệu năng và tính năng của ứng dụng.
Cách thức hoạt động: nó giả lập một nhóm người dùng gửi các yêu cầu tới một máy chủ, nhận và xử lý các response từ máy chủ và trình diễn các kết quả đó cho người dùng dưới dạng bảng biểu, đồ thị,cây…
Lợi ích của jmeter đối với performance testing:
-	Jmeter có thể sử dụng để kiểm thử hiệu năng của hai nguồn tài nguyên tĩnh như là Javascript và HTML và tài nguyên động như JSP, Servlets, và AJAX.
-	Jemeter có thể phát hiện ra một số lượng lớn các users trong cùng một thời điểm mà website có thể xử lý.
-	Jmeter có thể cung cấp phần lớn các phân tích đồ họa của báo cáo performance.
-	JMeter Performance Testing bao gồm:
	Load testing: Mô hình hóa dự kiến sử dụng bởi nhiều người dùng truy cập một dịch vụ website trong cùng thời điểm.
	Stress testing: Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. Mục đích của stress testing là có thể tìm ra độ tải lớn mà web server có thể xử lý.
### **2. Tạo kịch bản kiểm thử với Jmeter**

Sau khi chạy thành công Jmeter, tạo mới một kịch bản test, và ở đây em đặt tên là Test_Tour:

![](https://images.viblo.asia/5e13e59c-fb4a-4027-99da-aefb79c8b5d8.png)
*Hình 1: Minh họa tạo kịch bản mới với jmeter*

 Bước 1: Giả lập nhiều user cùng truy cập vào website đồng thời: 
Chuột phải vào Test Plan –> Add –> Threads(users) –> Thread Group
 ![](https://images.viblo.asia/bc39b693-9336-498f-a0da-6bd3dd10fb4c.png)
*Hình 2: Minh hoạ tạo Thread Group mới trong jmeter*

Name : đặt tên cho ThreadGroup ( ở đây e có thể đặt là Thread Group Tour ).

Number of Threads(users) : số lượng người dùng mà ta muốn mô phỏng.

Ramp-up Period (in seconds): Cho biết thời gian để JMeter tạo ra tất cả những thread cần thiết. Ví dụ nếu tham số này là 10 thì trong 10 giây tất cả các Number of Threads đã khai báo ở trên sẽ được gửi đi trong 10 giây, nếu đặt tham số này là 0 thì tất cả các yêu cầu sẽ được gửi đi cùng một lúc.

Loop Count  Forever : 1 các thread được tạo sẽ thực hiện 1 lần( thay 1 bằng n thì số các thread sẽ lặp n lần).

Bước 2: Tạo các Request đến server:
1 thread(tương ứng 1 user) có thể tạo nhiều request http gửi lên server .
Chuột phải vào Thread group –> add –> sample –> http request Default
 ![](https://images.viblo.asia/baf789b6-5b7e-4651-96de-d0c68fd61ee8.png)
*Hình 3: Minh họa tạo http request Default*

Với các phần tử: 

Name: Đặt tên Request

Server name of IP: Điền vào Domain hoặc IP trang web mà mình đang cần test

Port Number: Chỉ ra port của web, nếu để trống thì sẽ default là 80

Protocol: Giao thức được sử dụng là HTTP hoặc HTTPs

Method: Phương thức để các HTTP request. có các method: GET, POST, HEAD, PUSH..

Path: Đường dẫn các nguồn để xử lý các request

Parameter: Biểu diễn danh sách các tham số để gửi cùng request. (có thể thêm hoặc xoá thông số này)

Send files with the request: Giả lập việc upload file

Retrieve All embedded Resources: Dùng để download các trang java applet được nhúng trên trang web đang test.

Ví dụ ở đây e chạy kiểm thử ở trang web http://fbt5.herokuapp.com/ thì e sẽ điền các thông tin: 
Protocol[http]: https
Server Name or Ip : fbt5.herokuapp.com/
Port number : 

Bước 3: Chạy và xem kết quả chạy các request
Có thể add các kiểu kết quả hiển thị vào với listener: 
Click chuột phải vào Thread Group -> add -> Listener

 ![](https://images.viblo.asia/87764209-fff3-4578-9996-67b7653192e8.png)
*Hình 4: Minh họa thêm kiểu hiển thị kết quả chạy trong jmeter*

Click vào run để chạy kịch bản test:

 ![](https://images.viblo.asia/7fdb74d3-5e98-4363-85bd-56e061a67aff.png)
*Hình 5: Minh họa chạy một kịch bản kiểm thử trên jmeter*

Kết quả chạy sẽ hiển thị ra các kiểu tùy theo mình lựa chọn hiển thị, ví dụ như các hình họa như sau:

 ![](https://images.viblo.asia/d20e4d0f-50e3-4d2f-b5eb-e51c19bcf18d.png)
*Hình 6: Hiển thị kết quả kiểm thử hình cây trên jmeter*

 ![](https://images.viblo.asia/288bb109-51e1-466d-aa0c-b25cef4ed48b.png)
*Hình 7: Hiển thị tổng kết kết quả kiểm thử trên jmeter*

**Phân tích các thông số**

Các thông số như sau:
-  **Label**: Hiển thị tên của từng requests có trong test plan
- **#Samples**: Tổng số lần run của request

Samples = Number of Thread (users)*Loop Count

- **Average (millisecond)**: Thời gian phản hồi trung bình (Response Time) của request, tính cho đến lần run cuối cùng.
- **Median (millisecond)**: 50% số request có response time nhỏ hơn giá trị (hiển thị trên table), và 50% số request còn lại có response time lớn hơn giá trị này.
- **90% Line (90th Percentile) (millisecond)**: 90% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 10% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table.
- **Min (millisecond)**: Respone Time thấp nhất của request tính cho toàn bộ tất cả các lần run.
- **Max (millisecond)**: Respone Time cao nhất của request tính cho toàn bộ tất cả các lần run.
- **Error %**: % số lượng request bị fail, lỗi.
- **Throughput/ Thông lượng**: Lượng requests được hệ thống (server) xử lý trong 1 đơn vị thời gian, có thể là giây, phút, hoặc giờ.
Avg. Bytes: dung lượng trung bình của 1 lần response tính bằng bytes.
- **Std.Dev.(Standard Deviation)**: độ lệch chuẩn đo lường sự thay đổi của 1 tập hợp data, dựa trên thống kê.
- **Total**: Trong report có 1 dòng cuối cùng đó là Total, nó sẽ tổng kết lại toàn bộ kết quả từ những request bên trên. Ngoại trừ:
Phân tích thông số:

**Response Time** THẤP và  Thoughput THẤP --> Trường hợp này sẽ không bao giờ xảy ra. Vì Response Time THẤP nghĩa là thời gian đáp ứng rất nhanh, nhưng Throughput THẤP lại chỉ ra rằng số request được xử lý rất ít. Điều này là vô lý

**Response Time** THẤP và Throughput CAO --> Đây là một kết quả lý tưởng . Thời gian xử lý thấp và số lượng request xử lý cùng đồng thời lại cao. Điều này chứng tỏ rằng Server đang rất tốt.

 **Response Time** CAO và Throughput THẤP --> Test chỉ ra rằng thời gian xử lý quá cao, và lượng request được xử lý lại rất thấp. Phải xem xét để improve về phía sever.
 
**Response Time** CAO and Throughput CAO --> Throughput cao, tức là server đang làm việc rất tốt, vậy tại sao thời gian xử lý lại cũng cao (không tốt). Có thể vấn đề lúc này đế từ phía Client, hoặc cụ thể là đến từ JMeter, có thể đoạn script của bạn viết chưa được tối ưu, khiến quá trình nó xử lý mất nhiều thời gian chẳng hạn.