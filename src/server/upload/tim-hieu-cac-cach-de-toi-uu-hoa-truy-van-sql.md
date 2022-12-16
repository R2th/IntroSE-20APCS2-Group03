Lập trình viên chúng ta mỗi ngày phải làm việc rẩt nhiều với các câu lệnh truy vấn SQL do vậy hiểu được cách để tối ưu hóa câu lệnh SQL là rất quan trọng vì nó sẽ giúp cho hiệu suất hệ thống ta tăng lên đáng kể, giảm thời gian chờ đợi từ phía người dùng. Bài viết sẽ trình bày các cách để tối ưu hóa các câu lệnh này. <br>
# 1. Đánh index ở các cột sử dụng where, order by, group by
- Bên cạnh việc đảm bảo tính duy nhất các bản ghi, index cho phép MySQL server lấy kết quả nhanh hơn. Index có thể chiếm bộ nhớ tài nguyên và giảm performance khi insert, delete, update. Tuy nhiên trong trường hợp bảng có nhiều bản ghi (> 10), chúng có thể giúp giảm thời gian cho các câu lệnh select. Hãy cùng xem ví dụ dưới đây khi chạy một câu lệnh SQL với 500 rows mà không sử dụng index <br>
``` java
mysql> explain select customer_id, customer_name from customers where customer_id='1';
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | customers | NULL       | ALL  | NULL          | NULL | NULL    | NULL |  500 |    10.00 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------|-------------+
```
Khi sử dụng EXPLAIN để xem chi tiết câu truy vấn trên ta thấy một số thông tin quan trọng: <br>
- MySQL đã search toàn bộ table để lấy được bản ghi có id được truyền vào ban đầu dựa vào cột type: ALL, rows: 500 <br>
Để sửa lại tối ưu cho câu truy vấn trên ta chỉ cần đánh index vào cột customer_id <br>
``` java
mysql> Create index customer_id ON customers (customer_Id);
```
Chạy lại câu truy vấn bên trên sẽ cho ra kết quả <br>
``` java
mysql> Explain select customer_id, customer_name from customers where customer_id='1';
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys | key         | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | customers | NULL       | ref  | customer_id   | customer_id | 13      | const |    1 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
```
Có thể thấy truy vấn đã được tối ưu do chỉ cần duyệt trên 1 rows mà không cần duyệt cả bảng như trên nữa. Việc chọn và đánh index cũng cần phải lựa chọn kỹ lưỡng để tránh việc lãng phí tài nguyên và không đem lại hiệu suất cho hệ thống. Tham khảo thêm ở [đây](https://www.eversql.com/choosing-the-best-indexes-for-mysql-query-optimization/)
# 2. Tối ưu hóa câu lệnh bằng Union
Thỉnh thoảng chúng ta cũng cần chạy các câu truy vấn so sánh với 'like', 'or'. Khi sử dụng 'or' quá nhiều có thể mysql sẽ phải search toàn bộ bảng để tìm kiếm bản ghi. Union có thể giúp câu truy vấn trở nên nhanh hơn đặt biệt là trong trường hợp đã đánh index một cách hợp lý. Ví dụ trong trường hợp dưới đây <br>
``` java
mysql> select * from students where first_name like  'A%'  or last_name like 'B%' ;
```
Câu truy vấn trên có thêm được tối ưu hơn bằng cách sử dụng union để tận dụng index đã đánh <br>
``` java
mysql> select  from students where first_name like  'A%'  union all select  from students where last_name like  'B%' ;
```
# 3. Tránh sử dụng câu truy vấn cùng like với '%' phía trước
Hãy xem xét câu truy vấn dưới đây <br>
``` java
mysql> select * from students where first_name like  '%A'  ;
```
Sử dụng EXPLAIN để xem chi tiết hơn <br>
``` java
mysql> explain select * from students where first_name like  '%A'  ;

+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table    | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | students | NULL       | ALL  | NULL          | NULL | NULL    | NULL |  500 |    11.11 | Using where |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
```
có thể thấy index không có tác dụng trong trường hợp này, truy vấn vẫn cần phải duyệt toàn bộ bảng để tìm kiếm các bản ghi thỏa mãn yêu cầu. Trong trường hợp này có 2 lựa chọn hãy xem xét kỹ nếu có thật sự cần dùng % ở phía trước nếu không hãy loại bỏ nó hoặc xem xét có thể dùng [full-text index](https://dev.mysql.com/doc/refman/5.6/en/innodb-fulltext-index.html)
# 4. Sử dụng truy vấn của MySQL Full-text search
Trong trường hợp phải truy vấn với các toán tử wildcards như ở trên, ta có thể xem xét sử dụng MySQL full-text search (FTS) sẽ cho hiệu suất tốt hơn. Để thêm full-text search index ta sử dụng câu lệnh <br>
``` java
mysql>Alter table students ADD FULLTEXT (first_name, last_name);
mysql>Select * from students where match(first_name, last_name) AGAINST ('A');
```
Trong ví dụ bên trên, chúng ta đã xác định 2 cột mà muốn match (first_name, last_name) tìm kiếm với ('A'). Chạy EXPLAIN có kết quả như sau <br>
``` java
mysql> explain Select * from students where match(first_name, last_name) AGAINST ('A');
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
| id | select_type | table    | partitions | type     | possible_keys | key        | key_len | ref   | rows | filtered | Extra                         |
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
|  1 | SIMPLE      | students | NULL       | fulltext | first_name    | first_name | 0       | const |    1 |   100.00 | Using where; Ft_hints: sorted |
+----+-------------+----------+------------+----------+---------------+------------+---------+-------+------+----------+-------------------------------+
```
Có thể thấy câu truy vấn đã được tối ưu khi chỉ phải duyệt 1 rows chứ không phải duyệt toàn bộ cả bảng như trước nữa.
# 5. Tránh sử dụng các cột đã đánh index với function
Cùng xem xét câu truy vấn sau <br>
``` java
mysql> select count(*) from orders where YEAR(finished_at) = ‘2018’
```
Chúng ta sử dụng function YEAR cùng với cột finished_at nó sẽ không cho phép database sử dụng index ở cột finished_at bởi vì index giá trị của finished_at chứ không phải YEAR(finished_at). <br>
Để có thể tránh được điều này ta có thể sử dụng index cho function bằng [generated columns](https://mysqlserverteam.com/generated-columns-in-mysql-5-7-5/) <br>
Hoặc một cách khác là tìm cách để viết lại câu truy vấn tương đương mà không phải sử dụng đến function <br>
``` java
mysql> select count(*) from orders where finished_at >= '2018-01-01' and finished_at < '2019-01-01'
```
# 6. Tối ưu database schema
## Tối ưu hóa kiểu dữ liệu
MySQL support nhiều kiểu dữ liệu khác nhau : integer, float, double, date, date_time, Varchar, text ... Khi thiết kế bảng ta nên tuân theo nguyên tắc "**shorter is always better**" <br>
Ví dụ khi thiết kế bảng user chỉ chứa nhỏ hơn 100 bản ghi, chúng ta nên sử dụng 'TINYINT' cho cột user_id. Hay trong trường hợp cột liên quan đến ngày tháng (order_date) thì sử dụng kiểu là date_time sẽ hợp lý nhất vì ta sẽ không viết thêm gì để convert. Cột nào cần là số thì nên để là kiểu dạng là số như integer thay vì là char, varchar vì MySQL sẽ tính toán tốt hơn trong trường hợp là kiểu số nếu so sánh với varchar.
## Tránh null value
Ta nên tránh sử lưu null value trong bảng dữ liệu vì có thể sẽ đem lại kết quả không mong muốn. Ví dụ trong trường hợp tính toán tiền của order mà một cột nào đó chứa null thì có thể dẫn đến kết quả không mong muốn mà ta phải sử dụng thêm điều kiện "if not null". Trong trường hợp này hãy xem xét đến sử dụng các giá trị default cho value.
# 7. Sử dụng MySQL query caching
Nếu hệ thống sử dụng nhiều câu lệnh select, ta có thể xem xét sử dụng mysql query caching sẽ làm tăng tốc độ đọc của hệ thống. Tuy nhiên trong trường hợp cần update nhiều thì có thể làm giảm hiệu suất hiệu năng. Có thể check nếu Mysql server sử dụng query cache hay không bằng cách chạy câu lệnh <br>
``` java
mysql> show variables like 'have_query_cache';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| have_query_cache | YES   |
+------------------+-------+
1 row in <b>set</b> (0.00 sec)
```
## Seting mysql query cache
- Ta có thể setting mysql query cache bằng cách edit file **'/etc/mysql/my.cnf'** hoặc **'/etc/mysql/mysql.conf.d/mysqld.cnf'**. Để check value của query cache ta sử dụng command <br>
``` java
mysql> show variables like 'query_cache_%' ;
+------------------------------+----------+
| Variable_name                | Value    |
+------------------------------+----------+
| query_cache_limit            | 1048576  |
| query_cache_min_res_unit     | 4096     |
| query_cache_size             | 16777216 |
| query_cache_type             | OFF      |
| query_cache_wlock_invalidate | OFF      |
+------------------------------+----------+
5 rows in <b>set</b> (0.00 sec)
```
Có thể thay đổi giá trị trên bằng cách thay đổi trong file config <br>
``` java
query_cache_type=1 // bật query cache nếu đang off
query_cache_size = 10M // default là 1MB lý tưởng sẽ set trong khoảng 1MB -> 10MB
query_cache_limit=256k // default là 1MB giá trị này sẽ điều khiển số lượng kết quả query được cache
```
# 8. Các lưu ý khác
## Chỉ select các cột thật sự cần thiết
Thay vì sử dụng SELECT * thì ta chỉ nên select các cột mà cần sử dụng, điều này sẽ giúp hiệu suất câu truy vấn tăng lên trong quá trình làm việc.
## Dùng inner join thay vì outer join khi có thể
Sử dụng outer join quá nhiều sẽ làm hiệu suất câu truy vấn giảm đi đáng kể thay vì dùng với inner join, trong các trường hợp tương đương nhau hãy sử inner join thay vì outer join
## Dùng DISTINCT và UNION chỉ khi cần
Khi sử dụng union và distinct trong trường hợp không cần thiết có thể dẫn đến giảm performance của câu truy vấn. Thay vì sử dụng UNION có thể sử dụng UNION ALL sẽ cho kết quả tốt hơn.
## Tránh sử dụng điều kiện với loại khác kiểu
Ví dụ khi so sánh bằng với where một bên là kiểu varchar và kiểu số thì index sẽ không có tác dụng do sẽ phải cast ngầm kiểu để đồng nhất dữ liệu. Trong trường hợp này ta cố gắng để kiểu so sánh giống nhau ngay từ đầu sẽ cho kết quả tốt hơn.

# Reference
https://www.eversql.com/sql-performance-tuning-tips-for-mysql-query-optimization/ <br>
https://www.oreilly.com/library/view/high-performance-mysql/9780596101718/ch04.html <br>
https://www.alibabacloud.com/blog/how-to-optimize-mysql-queries-for-speed-and-performance-on-alibaba-cloud-ecs_593872 <br>
https://www.cloudways.com/blog/mysql-performance-tuning/#wild <br>