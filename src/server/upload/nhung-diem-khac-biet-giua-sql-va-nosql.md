Trước khi phân biệt SQL và NoSQL chúng ta cần làm rõ được thế nào là SQL và thế nào là NoSQL. Sau đây mình cũng xin nêu lên 1 số khái niệm qua sự tìm hiểu của mình.
## SQL là gì?

SQL chính là viết tắt của Structured Query language, được phát âm là "S-Q-L" hoặc đôi khi là "See-Quel" là ngôn ngữ chuẩn để xử lý Cơ sở dữ liệu quan hệ. Một cơ sở dữ liệu quan hệ xác định các mối quan hệ dưới dạng các bảng.

Lập trình SQL có thể được sử dụng hiệu quả để chèn, tìm kiếm, cập nhật, xóa các bản ghi cơ sở dữ liệu.

Điều đó không có nghĩa là SQL không thể làm được gì ngoài việc đó. Nó có thể làm rất nhiều thứ bao gồm, nhưng không giới hạn, tối ưu hóa và duy trì cơ sở dữ liệu.

Các cơ sở dữ liệu quan hệ như Cơ sở dữ liệu MySQL, Oracle, MS SQL Server, Sybase, vv sử dụng SQL.


## NoSQL là gì?

NoSQL là một DMS không quan hệ, không yêu cầu một lược đồ cố định, tránh các phép nối, và dễ dàng mở rộng. Cơ sở dữ liệu NoSQL được sử dụng cho các kho dữ liệu phân tán với nhu cầu lưu trữ dữ liệu khổng lồ. NoSQL được sử dụng cho dữ liệu lớn và các ứng dụng web thời gian thực. Ví dụ như các công ty như Twitter, Facebook, Google thu thập hàng terabyte dữ liệu người dùng mỗi ngày.

Cơ sở dữ liệu NoSQL là viết tắt của "Không chỉ SQL" hoặc "Không phải SQL". Mặc dù một thuật ngữ tốt hơn sẽ NoREL NoSQL bắt gặp. Carl Strozz giới thiệu khái niệm NoSQL vào năm 1998.

RDBMS truyền thống sử dụng cú pháp SQL để lưu trữ và truy xuất dữ liệu để có thêm thông tin chi tiết. Thay vào đó, một hệ thống cơ sở dữ liệu NoSQL bao gồm một loạt các công nghệ cơ sở dữ liệu có thể lưu trữ dữ liệu có cấu trúc, bán cấu trúc, không có cấu trúc và đa hình.


![](https://images.viblo.asia/1c4e1532-e1cd-4e9b-aa30-28579de6f851.png)
NoSQL DB (mongo) Vs RDBMS DB (mysql) Google Trend


## So sánh SQL và NoSQL 


| Tham số | SQL | NoSQL  |
| -------- | -------- | -------- |
| Định nghĩa     | Cơ sở dữ liệu SQL chủ yếu được gọi là RDBMS hoặc Cơ sở dữ liệu quan hệ     | Cơ sở dữ liệu NoSQL chủ yếu được gọi là cơ sở dữ liệu không liên quan hoặc phân tán     |
| Design for     | RDBMS truyền thống sử dụng cú pháp và truy vấn SQL để phân tích và lấy dữ liệu để có thêm thông tin chi tiết. Chúng được sử dụng cho các hệ thống OLAP.    | Hệ thống cơ sở dữ liệu NoSQL bao gồm nhiều loại công nghệ cơ sở dữ liệu khác nhau. Các cơ sở dữ liệu này được phát triển để đáp ứng nhu cầu trình bày cho sự phát triển của ứng dụng hiện đại.     |
| Ngôn ngữ Query   | Structured query language (SQL)     | Không có ngôn ngữ query    |
| Type     | SQL databases là cơ sở dữ liệu dựa trên bảng  | NoSQL databases có thể dựa trên tài liệu, cặp khóa-giá trị, cơ sở dữ liệu biểu đồ  |
| Schema     | SQL databases có lược đồ được xác định trước     | NoSQL databases sử dụng lược đồ động cho dữ liệu phi cấu trúc.  |
| Khả năng mở rộng     | SQL databases có thể mở rộng theo chiều dọc     | NoSQL databases có thể mở rộng theo chiều ngang |
| Ví dụ     | Oracle, Postgres, and MS-SQL.     | MongoDB, Redis, , Neo4j, Cassandra, Hbase.     |
| Phù hợp cho     | Đây là 1 lựa chọn lý tưởng cho môi trường truy vấn phức tạp     | Không phù hợp với truy vấn phức tạp     |
| Lưu trữ dữ liệu phân cấp     | SQL databases không thích hợp cho việc lưu trữ dữ liệu phân cấp.    | Phù hợp hơn cho kho lưu trữ dữ liệu phân cấp vì nó hỗ trợ phương thức cặp khóa-giá trị.     |
| Variations     | Một loại có biến thể nhỏ     | Nhiều loại khác nhau bao gồm các kho khóa-giá trị, cơ sở dữ liệu tài liệu và cơ sở dữ liệu đồ thị. |
| Năm phát triển     | Nó được phát triển vào những năm 1970 để giải quyết các vấn đề với lưu trữ tệp phẳng     | Được phát triển vào cuối những năm 2000 để khắc phục các vấn đề và hạn chế của SQL databases.     |
| Open-source     | Một sự kết hợp của mã nguồn mở như Postgres & MySQL, và thương mại như Oracle Database.     | Open-source     |
| Tính nhất quán     | Nó phải được cấu hình cho sự nhất quán chặt chẽ.     | Nó phụ thuộc vào DBMS như một số cung cấp tính nhất quán mạnh mẽ như MongoDB, trong khi những người khác cung cấp chỉ cung cấp sự nhất quán cuối cùng, như Cassandra.     |
| Được sử dụng tốt nhất cho     | RDBMS database là tùy chọn thích hợp để giải quyết các vấn đề về ACID.  | NoSQL được sử dụng tốt nhất để giải quyết các vấn đề về tính khả dụng của dữ liệu     |
| Tầm quan trọng     | Nó nên được sử dụng khi hiệu lực dữ liệu là siêu quan trọng     | Sử dụng khi nó quan trọng hơn để có dữ liệu nhanh hơn dữ liệu chính xác     |
| Lựa chọn tốt nhất     | Khi bạn cần hỗ trợ truy vấn động     | Sử dụng khi bạn cần mở rộng quy mô dựa trên yêu cầu thay đổi     |
| Hardware     | Specialized DB hardware (Oracle Exadata, etc.)     | Commodity hardware     |
| Network     | Highly available network (Infiniband, Fabric Path, etc.)     | Commodity network (Ethernet, etc.)     |
| Loại lưu trữ     | Highly Available Storage (SAN, RAID, etc.)     | Commodity drives storage (standard HDDs, JBOD)     |
| Tính năng tốt nhất     | Hỗ trợ đa nền tảng, Bảo mật và miễn phí     | Dễ sử dụng, hiệu suất cao và công cụ linh hoạt.     |
| Mô hình  ACID và BASE   | ACID (Atomicity, nhất quán, cách ly và độ bền) là một chuẩn cho RDBMS  | Cơ bản (Về cơ bản có sẵn, trạng thái mềm, phù hợp cuối cùng) là một mô hình của nhiều hệ thống NoSQL     |
| Performance |SQL hoạt động tốt và nhanh thì việc desgin tốt là cực kì quan trọng và ngược lại. |Nhanh hơn SQL NoSQL thì denormalized cho phép bạn lấy được tất cả thông tin về một item cụ thể với các codition mà không cần JOIN liên quan hoặc truy vấn SQL phức tạp.|
| Kết luận| Dự án đã có yêu cầu dữ liệu rõ ràng xác định quan hệ logic có thể được xác định trước. | Phù hợp với những dự án yêu cầu dữ liệu không liên quan, khó xác định, đơn giản mềm dẻo khi đang phát triển| 


![](https://images.viblo.asia/ea5bb77b-8103-451f-b1ca-45a0c596f2cf.png)

## Khi nào sử dụng SQL?

- SQL là ngôn ngữ đơn giản nhất được sử dụng để giao tiếp với RDBMS
- Phân tích các phiên liên quan đến hành vi và tùy chỉnh
- Tạo trang tổng quan tùy chỉnh
- Nó cho phép bạn lưu trữ và lấy dữ liệu từ cơ sở dữ liệu một cách nhanh chóng
- Được ưu tiên khi bạn muốn sử dụng các phép nối và thực hiện các truy vấn phức tạp


## Khi nào sử dụng NoSQL?


- Khi không cần hỗ trợ ACID
- Khi mô hình RDBMS truyền thống không đủ
- Dữ liệu cần lược đồ linh hoạt
- Các ràng buộc và logic xác thực không bắt buộc phải được thực hiện trong
cơ sở dữ liệu
- Ghi nhật ký dữ liệu từ các nguồn được phân phối
- Nó nên được sử dụng để lưu trữ dữ liệu tạm thời như giỏ mua hàng, danh sách mong muốn và dữ liệu phiên



## Tổng kết

![](https://images.viblo.asia/4c5228ba-ceea-497c-9d41-80ff59c8ac6f.png)
NoSQL DB (mongo) Vs RDBMS DB (mysql) Stackoverflow Questions


- Ngôn ngữ truy vấn có cấu trúc (SQL) được phát âm là "S-Q-L" hoặc là "See-Quel" là ngôn ngữ chuẩn
- NoSQL là một DMS không quan hệ, không yêu cầu một lược đồ cố định, tránh tham gia và dễ dàng mở rộng
- Cơ sở dữ liệu SQL chủ yếu được gọi là RDBMS hoặc Cơ sở dữ liệu quan hệ
- Cơ sở dữ liệu NoSQL chủ yếu được gọi là cơ sở dữ liệu không liên quan hoặc phân tán
- Cơ sở dữ liệu SQL là cơ sở dữ liệu dựa trên bảng
- Cơ sở dữ liệu NoSQL có thể dựa trên tài liệu, cặp khóa-giá trị, cơ sở dữ liệu biểu đồ
- SQL nên được sử dụng để giao tiếp với RDBMS
- NOSQL nên được sử dụng khi mô hình RDBMS truyền thống không đủ


Từ bài viết này bạn có thể nhận thấy một số điểm khác biệt giữa SQL và NoSQL. Cảm ơn bạn đã đọc bài viết mong rằng sẽ giúp bạn có thể xác định rõ ràng và lựa chọn khi bắt đầu một dự án. Chúc bạn thành công!

Nguồn tham khảo: https://www.guru99.com/sql-vs-nosql.html