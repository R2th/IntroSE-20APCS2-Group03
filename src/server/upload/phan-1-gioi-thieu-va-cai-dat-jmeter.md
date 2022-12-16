**1.Performance testing là gì?**

**Performance testing**  là việc thực hiện test để xác định một hệ thống có thể đáp ứng và ổn định với yêu cầu độ tải cao.
 Nó có thể phục vụ để điều tra, đo đạc, xác nhận hoặc xác minh chất lượng các thuộc tính của hệ thống như: khả năng thay đổi, tính tin cậy, và tài nguyên sử dụng. 
 
**Load testing** : Mô hình hóa dự kiến sử dụng bởi nhiều người dùng truy cập một dịch vụ website trong cùng thời điểm.

**Stress testing** : Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. Mục đích của stress testing là có thể tìm  ra độ tải lớn mà web server có thể xử lý.

**2.Giới thiệu về Jmeter**

Jmeter là một phần mềm kiểm thử mã nguồn mở, nó là ứng dụng 100% Java cho việc tải và kiểm thử hiệu năng. Nó được thiết kế để bao quát các loại kiểm thử như là độ tải, chức năng, hiệu năng, etc... và nó yêu cầu JDK 5 hoặc cao hơn.
- Nguồn mở, miễn phí
- Giao diện đơn giản, trực quan dễ sử dụng
- Có thể kiểm thử nhiều kiểu server: Web - HTTP, HTTPS, SOAP, Database - JDBC, LDAP, JMS, Mail - POP3,…
- Một công cụ độc lập có thể chạy trên nhiều nền tảng hệ điều hành khác nhau, trên Linux chỉ cần chạy bằng một shell script, trên Windows thì chỉ cần chạy một file .bat
- Đa luồng, giúp xử lý tạo nhiều request cùng một khoảng thời gian, xử lý các dữ liệu thu được một cách hiệu quả.
- Đặc tính mở rộng, có rất nhiều plugin được chia sẻ rộng rãi và miễn phí.
- Một công cụ tự động để kiểm thử hiệu năng và tính năng của ứng dụng.
- 
**Cách thức hoạt động:**

1.Jemeter giả lập một nhóm người dùng gửi các yêu cầu tới một máy chủ, nhận và xử lý các response từ máy chủ

2.Jmeter có thể cung cấp phần lớn các phân tích đồ họa của báo cáo performance.

JMeter Performance Testing bao gồm:

- **Load testing**: giả lập nhiều người dùng truy cập một dịch vụ website trong cùng thời điểm.
- **Stress testing**: Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. Mục đích của stress testing là có thể tìm ra độ tải lớn mà web server có thể xử lý.

![](https://images.viblo.asia/248e07c7-4511-4643-8f7b-1b4c4ab43d3e.png)

**3.Cài đặt Jmeter**
- Install Java JDK:
http://www.oracle.com/technetwork/java/javase/downloads/index.html
- Set JAVA_HOME: 
My Computer -> Properties -> Advance System Settings -> Environment variables -> System variables -> New
Variable name: JAVA_HOME
Variable value: đường dẫn đến folder JDK
- Set Path:
Thêm %JAVA_HOME%\bin; vào System Path
- Download Jmeter và giải nén ra folder C:\Jmeter:
http://jmeter.apache.org/download_jmeter.cgi
- Chạy Jmeter:
Vào trong folder C:\Jmeter\bin
Chạy file jmeter.bat
                                

         

| OS | Output |
| -------- | -------- | -------- |
| Windows     | jmeter.bat     | 
| Linux            | jmeter.sh      | 
| Mac              | jmeter.sh     | 
           
**4. Giao diện người dùng của Jmeter**

**Test Plan**

Test plan là nơi bạn thêm các phần tử (Element) cần thiết cho quá trình testing của bạn.
Nó lưu trữ tất cả các element và các setting tương ứng để chạy quá trình test theo mong muốn.

![](https://images.viblo.asia/ebd5e372-c54e-4b54-a540-5fb40b60d076.png)

**WorkBench**

WorkBench chỉ đơn giản là nơi lưu trữ kết quả test tạm thời và không có mối quan hệ nào với Test Plan. Jmeter sẽ không lưu nội dung của WorkBench mà chỉ lưu nội dung của Test Plan.

![](https://images.viblo.asia/6f022a99-12c4-4559-bbfc-462a1083fb3a.png)

**Thêm Element**

Thêm các Element là bước thiết yếu để xây dựng một Test Plan bởi vì nếu không có các Element, JMeter sẽ không thể chạy được Test Plan của bạn.
Một Test Plan bao gồm nhiều Element như Listener, Controller, và Timer
Bạn có thể thêm một phần tử để kiểm tra kế hoạch bằng cách nhấp chuột phải vào Test Plan và chọn các Element mới từ danh sách "Add".
Bạn cũng có thể xóa 1 Element không dùng đến khỏi Test Plan bằng cách chọn Remove

**Save Element**

Click chuột phải vào element và chọn Save Selection As
JMeter Test Elements và Test plan được lưu trữ dưới định dạng *.JMX. JMX là viết tắt của Java Management Extensions.

**Load Element**

Click chuột phải vào element, chọn Merge.

**Cấu hình Element**

Chọn Element ở cây bên trái
Thiết lập cấu hình ở khung bên phải

**Chạy và dừng Test Plan**

Trước khi chạy Test Plan, bạn phải lưu Test Plan trước.
Chọn File –> Save Test Plan as, nhập file name và click Save.

Để chạy một hoặc nhiều Test Plan, chọn Start (Ctrl + R) từ Run menu

![](https://images.viblo.asia/4dd8d465-7896-4922-a2c9-983ab37687cd.png)

Để dừng quá trình test, chọn Stop (Ctrl + ‘.’)

![](https://images.viblo.asia/406e5368-a1af-4fdf-9bc7-0338ec546d41.png)

**Test Report**

Sau khi chạy test xong, bạn sẽ nhận được test report. Test report bao gồm các error, log file được lưu trong jmeter.log và bản tóm tắt kết quả kiểm tra.

**5. Các bước thực hiện performance test với Jmeter**

![](https://images.viblo.asia/7006ae75-23ec-4372-9b73-54d23eb35b09.png)

Nguồn Tham khảo: https://www.guru99.com/jmeter-tutorials.html