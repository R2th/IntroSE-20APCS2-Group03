Bên cạnh việc tối ưu Lược đồ CSDL và Indexes thì tối ưu truy vấn SQL (Query Optimization) cũng là một yếu tố cần thiết để cải thiện hiệu suất. Trong bài viết này, mình sẽ chỉ ra một số lưu ý cần thiết khi viết truy vấn SQL để đạt kết quả tối ưu nhất.
## 1. Index tất cả các cột dùng trong lệnh 'WHERE', 'ORDER BY' và 'GROUP BY'

Ngoài việc đảm bảo nhận dạng duy nhất các bản ghi, MySQL Indexes còn giúp máy chủ MySQL lấy bản ghi từ CSDL nhanh hơn. Index cũng rất có ích khi sắp xếp các bản ghi.
MySQL Indexes có thể chiếm nhiều dung lượng hơn và giảm hiệu suất khi insert, delete và update. Tuy nhiên, nếu bảng của bạn có nhiều hơn 10 records, nó thể giảm đáng kể thời gian thực hiện truy vấn.
Xét trường hợp chạy truy vấn SQL sau từ CSDL có 500 records không có Index:
```
mysql> select customer_id, customer_name from customers where customer_id='160343';
```
Truy vấn trên sẽ buộc máy chủ MySQL tiến hành quét toàn bộ bảng để truy xuất bản ghi mà ta muốn tìm.
MySQL có một câu lệnh **EXPLAIN** mà ta có thể sử dụng cùng với các lệnh SELECT, INSERT, UPDATE, DELETE để phân tích truy vấn của mình.
Khi bạn đặt **EXPLAIN** vào trước câu lệnh SQL, MySQL sẽ hiển thị thông tin từ trình tối ưu hóa về kế hoạch thực hiện dự định:
```
mysql> explain select customer_id, customer_name from customers where customer_id='160343';
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | customers | NULL       | ALL  | NULL          | NULL | NULL    | NULL |  500 |    10.00 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
```
Như bạn thấy, trình tối ưu hóa đã hiển thị thông tin rất quan trọng có thể giúp ta tinh chỉnh lại bảng CSDL. Đầu tiên, rõ ràng rằng MySQL sẽ tiến hành quét toàn bộ bảng vì cột key là 'NULL'. Thứ hai, máy chủ MySQL đã chỉ rõ rằng nó sẽ tiến hành quét toàn bộ 500 hàng trong CSDL.

Để tối ưu hóa truy vấn trên, chúng ta chỉ cần thêm Index vào trường 'customer_id' bằng cú pháp dưới đây:
```
mysql> CREATE INDEX customer_id ON customers (customer_id);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
Sau đó, ta chạy lại EXPLAIN và xem kết quả:
```
mysql> Explain select customer_id, customer_name from customers where customer_id='160343';
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys | key         | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | customers | NULL       | ref  | customer_id   | customer_id | 13      | const |    1 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
```
Từ output trên, rõ ràng máy chủ MySQL sẽ sử dụng Index (customer_Id) để tìm kiếm. Ta có thể thấy rõ số lượng rows cần quét chỉ là 1, dù ta chạy truy vấn trên trong một bảng có 500 records. Indexes có thể rất có ích khi bạn truy vấn một tập dữ liệu lớn (ví dụ: một bảng có hàng triệu rows)
## 2. Tối ưu lệnh LIKE với UNION
Đôi khi, bạn có thể muốn chạy truy vấn bằng toán tử so sánh **OR** trên các cột khác nhau trong một bảng cụ thể. Khi từ khóa **OR** được sử dụng quá nhiều trong mệnh đề WHERE, nó có thể khiến trình tối ưu hóa MySQL chọn quét toàn bộ bảng để lấy bản ghi.

Mệnh đề **UNION** có thể làm cho truy vấn chạy nhanh hơn, đặc biệt nếu bạn có Index cho cột trong mệnh đề WHERE

Ví dụ, xét trường hợp bạn đang chạy truy vấn bên dưới với 'first_name' và 'last_name' được đánh index:
```
mysql> select * from students where first_name like 'Le%' or last_name like 'Hau%' ;
```
Truy vấn trên có thể chạy chậm hơn nhiều so với truy vấn bên dưới sử dụng toán tử **UNION** kết hợp 2 kết quả của các truy vấn riêng biệt để tận dụng Index.
```
mysql> select  from students where first_name like  'Le%' union all select from students where last_name like 'Hau%' ;
```
## 3. Tránh dùng LIKE Expressions với ký tự đại diện ở đầu
MySQL không thể sử dụng các Index khi có một ký tự đại diện ở đầu trong một truy vấn.
Ta lấy ví dụ ở trên trên bảng students, tìm kiếm như thế này sẽ khiến MySQL thực hiện quét toàn bộ bảng ngay cả khi bạn đã đánh index trường 'first_name' trên bảng students.
```
mysql> select * from students where first_name like  '%nam'  ;
```
Ta có thể thấy điều đó khi chạy lệnh EXPLAIN:
```
mysql> explain select * from students where first_name like  '%nam'  ;
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table    | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | students | NULL       | ALL  | NULL          | NULL | NULL    | NULL |  500 |    11.11 | Using where |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
```
Như bạn thấy, MySQL phải duyệt qua 500 rows trong bảng students, điều đó làm chậm truy vấn của ta đi rất nhiều.
## 4. Sử dụng MySQL Full-Text Search
Nếu bạn gặp phải tình huống cần tìm kiếm dữ liệu bằng ký tự đại diện và bạn không muốn CSDL của mình chạy chậm, bạn nên cân nhắc sử dụng tìm kiếm toàn văn bản - MySQL Full-Text Search (FTS) vì nó nhanh hơn nhiều so với truy vấn sử dụng ký tự đại diện.

Hơn nữa, FTS cũng có thể mang lại kết quả tốt hơn và phù hợp hơn khi bạn tìm kiếm trong một CSDL lớn.

Để thêm Index tìm kiếm toàn văn vào bảng students, ta có thể sử dụng lệnh MySQL bên dưới:
```
mysql>ALTER TABLE students ADD FULLTEXT (first_name, last_name);
mysql>SELECT * FROM students WHERE MATCH(first_name, last_name) AGAINST ('Hau');
```
Trong ví dụ trên, ta đã chỉ định các cột mà ta muốn khớp (first_name và last_name) theo từ khóa tìm kiếm ('Hau').
Chạy lệnh EXPLAIN cho truy vấn trên, ta có kết quả tối ưu như dưới đây:
```
mysql> EXPLAINT SELECT * FROM students WHERE MATCH(first_name, last_name) AGAINST ('Hau');
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
| id | select_type | table    | partitions | type     | possible_keys | key        | key_len | ref   | rows | filtered | Extra                         |
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
|  1 | SIMPLE      | students | NULL       | fulltext | first_name    | first_name | 0       | const |    1 |   100.00 | Using where; Ft_hints: sorted |
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
```
Có rất nhiều Options cho MySQL Fulltext Search, bạn có thể tham khảo thêm tại [đây](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)
## 5. Tối ưu lược đồ CSDL
Nếu bạn không có một lược đồ CSDL tối ưu thì dù có cố gắng tối ưu truy vấn đến đâu thì hiệu suất của CSDL cũng giảm khi số lượng bản ghi tăng lên.
Có 1 vài lời khuyên giúp bạn tối ưu lược đồ CSDL như sau:
### 1.  Chuẩn hóa các bảng
Đầu tiên, hãy chuẩn hóa tất cả các bảng cơ sở dữ liệu. Ví dụ: nếu bạn đang tạo hai bảng để lưu dữ liệu customers và orders, bạn nên tham chiếu customer trên bảng orders bằng cách sử dụng customer_id thay vì lặp lại tên customers trên bảng orders. 

Ảnh dưới đây đề cập đến một lược đồ CSDL được thiết kế mà không có bất kỳ sự dư thừa dữ liệu nào. Trong chuẩn hóa cơ sở dữ liệu MySQL, bạn chỉ nên trình bày một thực tế một lần trong toàn bộ CSDL. Đừng lặp lại tên khách hàng trong mỗi bảng; thay vào đó chỉ sử dụng customer_id để tham chiếu trong các bảng khác.
![](https://images.viblo.asia/e0b0909e-e96c-4a02-85b7-69fc02823354.png)
### 2. Tối ưu kiểu dữ liệu
MySQL hỗ trợ nhiều kiểu dữ liệu khác nhau bao gồm integer, float, double, date, date_time, varchar, text...Khi thiết kế CSDL, bạn nên nhớ rằng "shorter is always better".

Trong các trường hợp, nếu bạn đang thiết kế bảng người dùng hệ thống sẽ chứa ít hơn 100 users, bạn nên sử dụng loại dữ liệu 'TINYINT' cho trường 'user_id' vì nó sẽ có khoảng giá trị từ -128 đến 128.

Ngoài ra, nếu một trường chứa một giá trị ngày (ví dụ: sales_order_date), sử dụng loại dữ liệu date_time sẽ rất tốt vì bạn không phải chạy các hàm phức tạp để chuyển đổi trường thành ngày khi lấy bản ghi bằng SQL.

Sử dụng Integer nếu bạn muốn tất cả các giá trị là số (ví dụ: trong trường student_id hoặc trường payment_id). Hãy nhớ rằng, khi nói đến tính toán, MySQL có thể làm tốt hơn với các giá trị integer so với các kiểu dữ liệu văn bản như Varchar.
### 3. Tránh giá trị NULL
Null là sự vắng mặt của bất kỳ giá trị nào trong một cột. Bạn nên tránh loại giá trị này bất cứ khi nào có thể vì chúng có thể gây hại cho kết quả cơ sở dữ liệu của bạn. 
Ví dụ: nếu bạn muốn lấy tổng của tất cả các orders trong cơ sở dữ liệu nhưng một bản ghi đơn hàng cụ thể có số tiền không có giá trị, kết quả dự kiến có thể hoạt động sai trừ khi bạn sử dụng câu lệnh 'ifnull' của MySQL để trả về giá trị thay thế nếu bản ghi là null.

Trong một số trường hợp, bạn có thể cần xác định giá trị mặc định cho trường nếu các bản ghi không phải bao gồm giá trị bắt buộc cho cột / trường cụ thể đó.
### 4. Tránh dùng quá nhiều cột
Các bảng nhiều cột có thể cực kỳ tốn kém và cần nhiều thời gian CPU để xử lý. Nếu có thể, không dùng quá 100 cột trừ khi logic nghiệp vụ của bạn đặc biệt yêu cầu điều này.

Thay vì tạo một bảng nhiều cột, hãy xem xét tách nó thành các cấu trúc logic. Ví dụ: nếu bạn đang tạo bảng customers nhưng bạn nhận ra customers có thể có nhiều address, tốt hơn là tạo một bảng riêng để giữ address của customers giới thiệu lại bảng khách hàng bằng trường 'customer_id'.
### 5. Tối ưu JOIN
Hãy cố gắng JOIN ít bảng hơn trong truy vấn của bạn. Một câu lệnh SQL với quá nhiều JOIN có thể không hoạt động tốt. Một nguyên tắc là nên có tối đa 12 JOIN cho mỗi truy vấn.
## 6. MySQL Query Caching
Nếu trang web hoặc ứng dụng của bạn thực hiện nhiều truy vấn SELECT, bạn nên tận dụng tính năng cache truy vấn của MySQL. Điều này sẽ tăng hiệu suất khi đọc dữ liệu.

Công nghệ hoạt động bằng cách lưu cache truy vấn SELECT cùng với tập dữ liệu kết quả. Điều này làm cho truy vấn chạy nhanh hơn vì chúng được tìm nạp từ bộ nhớ nếu chúng được thực thi nhiều lần. Tuy nhiên, nếu ứng dụng của bạn cập nhật bảng thường xuyên, điều này sẽ làm mất hiệu quả mọi truy vấn và bộ kết quả được lưu trong bộ nhớ cache.

Bạn có thể kiểm tra xem máy chủ MySQL của bạn có bật bộ đệm truy vấn hay không bằng cách chạy lệnh bên dưới:
```
mysql> show variables like 'have_query_cache';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| have_query_cache | YES   |
+------------------+-------+
1 row in <b>set</b> (0.00 sec)
```
Ngoài ra, bạn có thể cài đặt cache của máy chủ MySQL với các options cụ thể được liệt kê tại [đây](https://dev.mysql.com/doc/refman/5.5/en/query-cache-configuration.html)
Tuy nhiên không đặt kích thước cache truy vấn rất lớn vì điều này sẽ làm giảm hiệu năng máy chủ MySQL do quá tải và khóa bộ nhớ cache. Các giá trị trong phạm vi hàng chục MB được khuyến nghị.
## Tài liệu tham khảo
1. https://www.infoworld.com/article/3210905/10-essential-performance-tips-for-mysql.html
2. https://viblo.asia/p/5-meo-de-toi-uu-cau-truy-van-sql-cua-ban-RnB5pX4Y5PG
3. https://dzone.com/articles/how-to-optimize-mysql-queries-for-speed-and-perfor