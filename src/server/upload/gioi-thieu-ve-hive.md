Thuật ngữ Big Data được sử dụng cho các bộ tập dữ liệu khổng lồ bao gồm khối lượng lớn, tốc độ cao và nhiều loại dữ liệu đang tăng lên từng ngày. Sử dụng các hệ thống quản lý dữ liệu truyền thống, rất khó để xử lý Big data. Do đó, Quỹ phần mềm Apache (Apache Software Foundation) đã giới thiệu một framework tên là Hadoop để giải quyết các thách thức quản lý và xử lý Big data.

# Hadoop
Hadoop là một framework open-source để lưu trữ và xử lý Big data trong môi trường phân tán. Nó chứa hai mô-đun, một là MapReduce và một mô-đun khác là Hệ thống tệp phân tán Hadoop (Hadoop Distributed File System - HDFS).

* **MapReduce**: Đây là mô hình lập trình song song để xử lý một lượng lớn dữ liệu có cấu trúc, bán cấu trúc và không cấu trúc trên các cụm lớn của phần cứng thương mại (commodity hardware). 
* **HDFS**: Hệ thống tệp phân tán Hadoop là một phần của framework Hadoop, được sử dụng để lưu trữ và xử lý các bộ dữ liệu. Nó cung cấp một hệ thống tập tin chịu lỗi để chạy trên phần cứng thương mại.

Hệ sinh thái Hadoop chứa các sub-project (tool) khác nhau như Sqoop, Pig và Hive được sử dụng để trợ giúp các mô-đun Hadoop.

* **Sqoop**: Nó được sử dụng để nhập và xuất dữ liệu đến và đi giữa HDFS và RDBMS.
* **Pig**: Đây là một nền tảng ngôn ngữ thủ tục được sử dụng để phát triển tập lệnh cho các hoạt động của MapReduce.
* **Hive**: Đây là một nền tảng được sử dụng để phát triển các tập lệnh loại SQL để thực hiện các hoạt động MapReduce.

**Chú ý**: Có nhiều cách khác nhau để thực hiện các hoạt động MapReduce:

* Cách tiếp cận truyền thống sử dụng chương trình Java MapReduce cho dữ liệu có cấu trúc, bán cấu trúc và không cấu trúc.
* Cách tiếp cận dùng câu lệnh cho MapReduce để xử lý dữ liệu có cấu trúc và bán cấu trúc bằng Pig.
* Ngôn ngữ truy vấn Hive (HiveQL hoặc HQL) cho MapReduce để xử lý dữ liệu có cấu trúc bằng Hive.

# Hive là gì?
Hive là một công cụ cơ sở hạ tầng kho dữ liệu để xử lý dữ liệu có cấu trúc trong Hadoop. Nó nằm trên đỉnh Hadoop để tóm tắt Dữ liệu lớn và giúp truy vấn và phân tích dễ dàng.

Ban đầu Hive được phát triển bởi Facebook, sau đó Quỹ Phần mềm Apache đã lấy và phát triển nó thành một nguồn mở dưới tên Apache Hive. Nó được sử dụng bởi các công ty khác nhau. Ví dụ: Amazon sử dụng nó trong Amazon Elastic MapReduce.

#### Hive không phải là:
* Một CSDL quan hệ 
* Một thiết kế để xử lý giao dịch Online (OnLine Transaction Processing - OLTP)
* Một ngôn ngữ cho các truy vấn thời gian thực và cập nhật cấp hàng

# Đặc trưng của Hive
* Nó lưu trữ lược đồ trong cơ sở dữ liệu và xử lý dữ liệu vào HDFS.
* Nó được thiết kế cho OLAP.
* Nó cung cấp ngôn ngữ kiểu SQL để truy vấn được gọi là HiveQL hoặc HQL.
* Nó là quen thuộc, nhanh chóng, có khả năng mở rộng.

# Kiến trúc của Hive 
Sơ đồ sau đây mô tả kiến trúc của Hive:
![](https://images.viblo.asia/6c15fb23-1bab-4d2e-a708-a86346421e11.jpg)
Sơ đồ thành phần này chứa các đơn vị khác nhau.

* User Interface: Hive là một phần mềm cơ sở hạ tầng kho dữ liệu có thể tạo ra sự tương tác giữa người dùng và HDFS. Các giao diện người dùng mà Hive hỗ trợ là Hive Web UI, Hive command line và Hive HD Insight (Trong máy chủ Windows).
* Meta Store: Hive chọn các máy chủ cơ sở dữ liệu tương ứng để lưu trữ lược đồ hoặc metadata của các bảng, cơ sở dữ liệu, các cột trong một bảng, các loại dữ liệu của chúng và ánh xạ HDFS.
* HiveQL Process Engine: HiveQL tương tự như SQL để truy vấn thông tin lược đồ trên Metastore. Đây là một trong những thay thế của phương pháp truyền thống cho chương trình MapReduce. Thay vì viết chương trình MapReduce bằng Java, chúng ta có thể viết một truy vấn cho công việc MapReduce và xử lý nó.
* Execution Engine: Phần kết hợp của công cụ xử lý HiveQL và MapReduce là Công cụ thực thi Hive (Hive Execution Engine). Công cụ thực thi xử lý truy vấn và tạo kết quả giống như kết quả MapReduce.
* HDFS hoặc HBASE: Hệ thống tệp phân tán Hadoop hoặc HBASE là các kỹ thuật lưu trữ dữ liệu để lưu trữ dữ liệu vào hệ thống tệp.	

# Cách làm việc của Hive
Sơ đồ sau mô tả quy trình làm việc giữa Hive và Hadoop.

![](https://images.viblo.asia/33656cdc-58be-4821-94c7-a2d629c20dc9.jpg)

Cách Hive tương tác với framework Hadoop:
1.  Thực thi query: Giao diện Hive như Command line hoặc Giao diện người dùng web gửi truy vấn đến Trình điều khiển (bất kỳ trình điều khiển cơ sở dữ liệu nào như JDBC, ODBC, v.v.) để thực thi.
2.  Nhận kế hoạch: Trình điều khiển có sự trợ giúp của trình biên dịch truy vấn để phân tích cú pháp truy vấn để kiểm tra cú pháp và kế hoạch truy vấn hoặc yêu cầu của truy vấn.
3.  Nhận metadata: Trình biên dịch gửi yêu cầu metadata đến Metastore (bất kỳ cơ sở dữ liệu nào).
4.  Gửi metadata: Metastore gửi metadata như một phản hồi cho trình biên dịch.
5.  Gửi kế hoạch: Trình biên dịch kiểm tra yêu cầu và gửi lại kế hoạch cho trình điều khiển. Đến đây, việc phân tích cú pháp và biên dịch một truy vấn đã hoàn tất.
6.  Kế hoạch thực hiện: Trình điều khiển gửi kế hoạch thực hiện đến công cụ thực thi.
7.  Thực thi công việc: Trong nội bộ, quá trình thực thi công việc là một công việc MapReduce. Công cụ thực thi gửi công việc đến JobTracker, trong node Name và nó gán công việc này cho TaskTracker, trong node Data. Ở đây, truy vấn thực thi công việc MapReduce.
**Hoạt động metadata**: Trong khi thực hiện, công cụ thực thi có thể thực thi các hoạt động metadata với Metastore.
8.  Lấy kết quả: Công cụ thực thi nhận kết quả từ các node Data.
9.  Gửi kết quả: Công cụ thực thi gửi các giá trị kết quả đó đến trình điều khiển.
10.  Gửi kết quả: Trình điều khiển gửi kết quả đến Giao diện Hive.