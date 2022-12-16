I. Lý do cần phải kiểm thử hiệu suất cho cơ sở dữ liệu.

Hiệu suất của một sản phẩm trong phần mềm là một yếu tố quan trọng. Khi nói về hiệu suất hầu như mọi người chỉ nghe về việc test hiệu suất trên trang web người tiêu dùng sử dụng là các trang page, CDN và plugins thứ ba. Hầu như rằng ai cũng quên đi kiểm thử hiệu suất trên các Db. Nếu trang web của bạn đang gọi các thủ tục được lưu trữ hoặc các truy vấn phức tạp thì có thể sẽ mất rất nhiều thời gian để xử lý dữ liệu của bạn. Đó là điều quan trọng để bạn biết rằng kiểm tra hiệu suất của database và khả năng tải. Một trong những công cụ nguồn mở là JMeter giúp bạn đánh giá hiệu suất. Xin lưu ý rằng tôi đang lấy ví dụ về Máy chủ MSSQL nhưng bạn có thể kiểm tra bất kỳ cơ sở dữ liệu nào bằng JMeter.

Kiểm tra hiệu suất của cơ sở dữ liệu được dùng để xác định các vấn đề về hiệu suất trước khi cơ sở dữ liệu mang đến cho người dùng cuối cùng. Kiểm tra tải của cơ sở dữ liệu được sử dụng để kiểm tra cơ sở dữ liệu ứng dụng như hiệu suất, độ tin cậy và khả năng mở dụng của tải người dùng. Kiểm thử tải bao gồm mô phỏng tải người dùng thực tế cho các ứng dụng cơ sở dữ liệu đích và được sử dụng để xác định hành vi của các ứng dụng cơ sở dữ liệu khi nhiều người dùng nhấn ứng dụng cùng lúc. Kiểm tra hiệu suất cơ sở dữ liệu được sử dụng để xác định các vấn đề về hiệu suất trước khi triển khai các ứng dụng cơ sở dữ liệu cho người dùng cuối.Kiểm tra tải cơ sở dữ liệu được sử dụng để kiểm tra các ứng dụng cơ sở dữ liệu về hiệu suất, độ tin cậy và khả năng mở rộng bằng cách sử dụng tải người dùng khác nhau. Kiểm thử tải bao gồm mô phỏng tải người dùng thực tế cho các ứng dụng cơ sở dữ liệu đích và được sử dụng để xác định hành vi của các ứng dụng cơ sở dữ liệu khi nhiều người dùng nhấn ứng dụng cùng lúc.
II. Các kiểm thử hiệu suất và tải cho cơ sở dữ liệu bằng Jmeter

2.1. Điều kiện 

Java 8

Jmeter 5.0

Cài đặt Java 8 từ trang của oracle:

Java SE Development Kit 8 - Downloads

Install JMeter from apache site. https://jmeter.apache.org/download_jmeter.cgi

Bước 1: Cần tạo một cơ sở dữ liệu demo

Nó bao gồm các bước cơ bản như ban đầu chúng ta tạo cơ sở dữ liệu cho hệ thống sau đó là tạo các bảng các trường và nhập dữ liệu cho cơ sở dữ liệu để lưu trú.

Bước 2: Tải Mysql connect java

Java 8 JMeter 5.0 Install Java 8 from oracle site : https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html Install JMeter from apache site. https://jmeter.apache.org/download_jmeter.cgi
Mục đích lấy tài file thư mục này nó được coi như bên thứ 3 cung cấp cầu nối giữ Jmeter và các cơ sở dữ liệu của bạn. Và Jmeter cũng là một mã nguồn mở chúng ta nhờ file này để có thể kết nối với cơ sở dữ liệu một các dễ dàng.

Bước 3: Nên bạn cần copy thư viện mysql jdbc vào folder lib của Apache JMeter:
![](https://images.viblo.asia/96c1d93d-78d2-4fc4-b84d-9a195483dace.PNG)


Bước 4: Tạo plan trên Apache-jmeter

Nháy chuột phải vào [Thread Group] -> Chọn [Config Element] → Chọn [Add JDBC Connection Configuration]
![](https://images.viblo.asia/242e1bca-f0a7-4d72-a793-f4250a3bc4cf.PNG)


Bước 5: Tạo kết nối đến My SQL

Trong Cấu hình kết nối JDBC, bạn cần chỉ định tất cả các cấu hình kết nối cơ sở dữ liệu của bạn.
![](https://images.viblo.asia/7af653e3-50ac-4937-a566-18180adb8697.PNG)


Giải thích: 

[Variable Name for Created pool]  sẽ được sử dụng trong các yêu cầu truy vấn SQL tiếp theo, vì vậy điều quan trọng là cung cấp tên hợp lệ. Tên biến này xác định duy nhất các nhóm kết nối về cơ bản các cài đặt bạn đã cung cấp trong Cấu hình.

[Max Number of Connections] : Bạn có thể đề cập đến bất kỳ số nào tùy thuộc vào nhu cầu của bạn. Giá trị này mở số lượng kết nối được chỉ định trong nhóm tại một thời điểm. (Ví dụ: 1)

[Database URL: jdbc:Hệ quản trị cơ sở dữ liệu:Địa chỉ trỏ đến cơ sở dữ liệu/tên cơ sở dữ liệu muốn dùng

Chính xác với nguồn kết nối này có 2 loại ta cần chú ý:

MySQL: jdbc:mysql://localhost:3306/, where localhost is the name of the server hosting your database, and 3306 is the port number

Java DB: jdbc:derby:testdb;create=true, where testdb is the name of the database to connect to, and create=true instructs the DBMS to create the database.

Chọn JDBC driver class là: com.jdbc.Drive.class (chọn tùy theo loại hệ quản trị cơ sở dữ liệu bạn dùng)

Nhập username và password của MySQL.

Bước 6: Tạo request tới MySQL
![](https://images.viblo.asia/779c0d16-63b3-4495-b158-ea1546a762cc.PNG)



Nhập variable Name (bắt buộc và phải giống với variable Name ở JDBC connection configuration bên trên)
Nhập câu SQL cần truy vấn tới database.

Lưu ý: chọn query type đúng phải kiểu câu lệnh SQL, ở đây câu lệnh của mình là INSERT nên mình để query type là Update Statement

Bước 7: Kiểm tra kết quả quay chúng ta sẽ quay về sản bài toán cũ.

 Link tài liệu tham khảo : 
 https://docs.oracle.com/javase/tutorial/jdbc/basics/connecting.html?fbclid=IwAR3zB8x5urSvZI2QzJFqre1ttAemSA_XJH-KkkLydkKAm_zY0Rf2fUHGtNI
 https://medium.com/@ganeshsirsi/database-performance-and-load-testing-using-jmeter-ms-sql-470045303785