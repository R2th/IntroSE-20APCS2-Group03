Trong bài tổng quan kiểm thử trên tập dữ liệu, chúng ta đã nắm sơ bộ các bước để thực hiện kiểm thử hiệu năng cho Big Data, chi tiết như sau : 
![](https://images.viblo.asia/09e41a7d-3a06-4152-86ab-a7161283d052.png)
Kiểm thử hiệu năng bao gồm việc kiểm thử thời gian hoàn thành các job, CPU và RAM sử dụng, khả năng xử lý dữ liệu kịp thời và một tập các chỉ số quan trọng khác. Trong đó có 2 vấn đề quan trọng nhất chính là : 

        1.Tốc độ xử lý dữ liệu (get file, convert, filter, import, load)
        2.Tốc độ truy xuất dữ liệu (realtime)
Việc kiểm thử hiệu năng cho các ứng dụng thông thường đã phức tạp thì nay càng phức tạp hơn trên tập dữ liệu lớn. Do đó, Tester cho app bigdata cũng yêu cầu nhiều kĩ năng liên quan như Hadoop, NoSQL… và thành thạo các công cụ hỗ trợ testing bigdata phổ biến bao gồm : 

         1. Yahoo! Cloud Serving Benchmark (YCSB): Công cụ hỗ trợ đo tốc độ đọc/ghi/cập nhật tập dữ liệu lớn trên nền tảng đám mấy
         2. Sandstorm : Công cụ hỗ trợ tính năng tự động kiểm thử dữ liệu lớn
         2. Apache Jmeter : cung cấp một số plugin hỗ trợ kiểm thử dữ liệu lớn dạng Cassandra
Trong bài này, chúng ta sẽ tìm hiểu sơ bộ về công cụ Yahoo! Cloud Serving Benchmark (YCSB). 
Yahoo! Cloud Serving Benchmark (YCSB)  là một framework mã nguồn mở để đánh giá và so sánh hiệu năng các hệ thống dữ liệu lớn. YCSB hỗ trợ nhiều loại database khác nhau : Apache HBase, Apache Cassandra, Redis, MongoDB và Voldemort.
![](https://images.viblo.asia/477399e9-6dc1-4a8d-a7b1-c15e59acfead.png)

Công cụ này bao gồm 2 phần :

1. YSCB Client : một bộ tạo workload mở rộng

2. Core workload : một tập các kịch bản workload có sẵn

Core workload cung cấp một bức tranh tổng thể về hiệu năng của một hệ thống và YSCB Client cho phép tester khai báo các kịch bản kiểm thử đặc thù với từng hệ thống khác nhau. Đặc biệt các kịch bản này có thể được mở rộng để có thể đo hiệu năng của nhiều loại database khác nhau. YSCB có các lib giao tiếp với nhiều loại database phổ biến bao gồm : HBase, Cassandra, Apache Accumulo, MongoDB, và Voldemort. Ngoài ra, tester có thể bổ sung thêm loại database khác bằng cách chủ động code lib riêng.
Để kiểm thử hiệu năng nhiều loại dữ liệu khác nhau để so sánh, tester có thể cài đặt nhiều database trong cùng một lần triển khai. Sau đó có thể cho chạy các nghiệp vụ lần lượt trên từng loại database khác nhau để đánh giá.

Các bước để chạy một YCSB workload :

1. Thiết lập database chuẩn bị test

2. Tạo bảng và load dữ liệu. Có thể sử dụng YCSB hoặc làm thủ công bằng các câu lệnh (shell script) đặc thù của từng database

3. Chọn workload trong YCSB

4. Cài đặt các tham số tùy theo kịch bản kiểm thử. Các tham số cần quan tâm như : thời gian chạy, phân bổ yêu cầu, số lượng tiến trình chạy đồng thời ….

5. YCSB Client thực hiện workload

6. Sau khi hoàn thành, Client sẽ có báo cáo kết quả. Qua đó tester có thể đánh giá hiệu năng của từng loại database.

**Ví dụ :**
Dưới đây là ví dụ về việc setup test hiệu năng dựa trên công cụ Yahoo! Cloud Serving Benchmark (YCSB)
**Setup :** 

-06 server-class  :  8 cores (2 x quadcore) 2.5 GHz CPUs, 8 GB RAM, 6 x 146GB 15K RPM SAS drives in RAID 1+0, Gigabit ethernet, RHEL 4 

-Cassandra 0.5.0 (0.6.0-beta2 for range queries)

-HBase 0.20.3

-MySQL 5.1.32

-Sherpa 1.8 with MySQL 5.1.24 

-Không bật replication

**Workloads : **

-120 triệu bản ghi 1KB ~ 20 GB một server

-100 tiến trình đọc/ghi đồng thời

**Case test 1 : case test cho 50 tiến trình đọc và 50 tiến trình ghi**
![](https://images.viblo.asia/6654a4a1-ae36-4264-8577-4fd95ef29a31.png)
Đánh giá : 

- **Cassandra** có hiệu năng tốt nhất  với các tiến trình đọc, lưu trữ, độ trễ thấp. 
- **Sherpa và MySQL** có hiệu năng thất nhất do bị giới hạn bởi khả năng của MySQL
- **Hbase**  có độ trễ thấp nhất do các thao tác xử lý trên RAM, trong đó độ trễ ghi tốt hơn độ trễ đọc.

**Case test 2 : case test cho 95 tiến trình đọc và 5 tiến trình ghi**
![](https://images.viblo.asia/d69400e0-02ee-4d69-9ee8-c3c393f1020e.png)
**Đánh giá : **

- Với testcase này thì Sherpa thể hiện hiệu năng rất tốt với độ trễ đọc nhanh. 

**Tóm lại :**

-Yahoo! Cloud Serving Benchmark (YCSB)  là công cụ hỗ trợ test hiệu năng khá mạnh, đặc biệt hỗ trợ nhiều loại database big data khác nhau.

-Phù hợp với các nghiệp vụ kiểm thử hiệu năng của các workload đơn giản (có thể triển khai trên nhiều database khác nhau) và đưa ra đề xuất lựa chọn database phù hợp nhất với APP Bigdata cần test.