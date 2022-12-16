Mình đã thu thập 50 câu hỏi phổ biến khi phỏng vấn về HIve, ngắn gọn và trọng tâm, sau đây là 25 câu hỏi đầu tiên:

1. Q1
```
Các loại bảng có sẵn trong Hive ?
```
Có 2 loại: bảng được quản lý và bảng bên ngoài. Trong bảng được quản lý cả dữ liệu và 

2. Q2
```
Hive có thích hợp sử dụng cho hệ thống OLTP không? Tại sao?
```
Không, Hive không thích hợp để chèn và cập nhập nhật ở mức row, nên nó không thích hợp cho hệ thống OLTP.

3. Q3
```
Một bảng trong Hive có thể được đổi tên không?
```

Có, sử dụng `Alter Table table_name RENAME TO new_name`

4. Q4
```
Có thể thay đổi kiểu dữ liệu của một cột trong Hive được không?
```
Có. Sử dụng tùy chọn cột REPLACE: 
`
ALTER TABLE table_name REPLACE COLUMNS ……
`

5. Q5
```
Metastore trong Hive là gì?
```
Nó là một cơ sở dữ liệu quan hệ lưu trữ siêu dữ liệu của bảng hive, phân vùng, cơ sở dữ liệu Hive, v.v.

6. Q6
```
Điều gì cần cho SerDe custom?
```
Tùy thuộc vào bản chất của dữ liệu mà người dùng có, SerDe có sẵn có thể không đáp ứng định dạng của dữ liệu. NÊN người dùng cần phải viết mã java của riêng để đáp ứng các yêu cầu định dạng dữ liệu của họ.

7. Q7
```
Tại sao chúng ta cần Hive?
```
Hive là một công cụ trong hệ sinh thái Hadoop cung cấp một giao diện để tổ chức và truy vấn dữ liệu trong một cơ sở dữ liệu và viết các truy vấn giống như SQL. Nó thích hợp để truy cập và phân tích dữ liệu trong Hadoop bằng cú pháp SQL.

8. Q8
```
Vị trí mặc định nơi hive lưu trữ dữ liệu bảng là gì?
```
hdfs://namenode_server/user/hive/warehouse

9. Q9
```
Kể tên 3 chế độ khác nhau Hive có thể chạy?
```
* Chế độ local - cục bộ 
* Chế độ distributed - phân tán 
* Chế độ pseudodistributed - giả phân tán 
10. Q10
```
Có loại dữ liệu ngày trong Hive không?
```
Có. Các kiểu dữ liệu TIMESTAMP lưu trữ ngày ở định dạng java.sql.timestamp

11. Q11
```
Các kiểu dữ liệu kết hợp trong Hive là gì?
```
Có 3 kiểu dữ liệu kết hợp trong Hive:
* ARRAY
* MAP
* STRUCT

12. Q12
```
Chúng ta có thể chạy các lệnh unix shell từ hive không? Đưa ra ví dụ.
```
Có, bằng cách sử dụng ! đánh dấu ngay trước lệnh command. Ví dụ !pwd tại hive promt sẽ liệt kê thư mục hiện tại.

13. Q13
```
Biến Hive là gì? Chúng ta sử dụng nó để làm gì?
```
Biến hive là biến được tạo trong môi trường Hive có thể được tham chiếu bởi các tập lệnh Hive. Nó được sử dụng để truyền một số giá trị cho các truy vấn hive khi truy vấn bắt đầu thực thi.

14. Q14
```
Các truy vấn hive có thể được thực thi từ các file script không? Làm thế nào?
```
Sử dụng source command.

15. Q15
```
Tầm quan trọng của file .hiverc là gì?
```
Nó là một tệp chứa danh sách các lệnh cần chạy khi CLI hive bắt đầu. Ví dụ: đặt chế độ strict thành true, v.v.

16. Q16
```
Bản ghi mặc định và dấu phân cách trường được sử dụng cho file text hive là gì?
```
Dấu phân tách bản ghi mặc định là  \n

Dấu phân tách các trường  − \001,\002,\003

17. Q17
```
Bạn hiểu thế nào về  schema đã được đọc
```
Schema được xác thực với dữ liệu khi đọc và không bị  ghi đè khi ghi dữ liệu

18. Q18
```
Làm thế nào để bạn liệt kê tất cả các cơ sở dữ liệu có tên bắt đầu bằng p?
```
SHOW DATABASES LIKE ‘p.*’

19. Q19
```
Lệnh "USE" trong hive dùng để làm gì?
```
Bạn sẽ sử dụng cơ sở dữ liệu nào => giống trong sql thông thường

20. Q20
```
Làm cách nào để bạn có thể xóa DBPROPERTY trong Hive?
```
Không có cách nào để xóa DBPROPERTY

21. Q21
```
Ý nghĩa của dòng:
set hive.mapred.mode = strict;
```
Nó set các job được ánh xạ hóa thành chế độ strict, theo đó các truy vấn trên các bảng được phân vùng không thể chạy nếu không có mệnh đề WHERE. Điều này ngăn cản job rất lớn chạy trong thời gian dài.

22. Q22
```
Làm thế nào để bạn kiểm tra xem một phân vùng cụ thể có tồn tại hay không?
```
Dùng câu lệnh sau :
```
SHOW PARTITIONS table_name PARTITION(partitioned_column=’partition_value’)
```
23. Q23
```
Class java nào xử lý mã hóa bản ghi Đầu vào thành các tệp lưu trữ các bảng trong Hive?
```
org.apache.hadoop.mapred.TextInputFormat

24. Q24
```
Lớp java nào xử lý mã hóa bản ghi đầu ra thành các tệp là kết quả của các truy vấn Hive?
```
org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat

25. Q25
```
Ý nghĩa của mệnh đề "IF EXISTS" trong khi xóa bảng là gì?
```
Khi chúng ta dùng lệnh DROP TABLE IF EXISTS table_name, Hive sẽ trả về một lỗi nếu bảng được xóa không tồn tại.