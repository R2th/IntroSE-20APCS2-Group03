Trong Mysql, index hỗ trợ việc tìm kiếm các rows theo từng giá trị của các columns trong bảng trở nên nhanh chóng. Việc tìm kiếm sẽ phải scan toàn bộ table nếu các column trong câu query không được đánh index một cách thích hợp.

Bài viết này mình sẽ nói về một số lưu ý trong khi sử dụng index trong Mysql 

:snowflake:

---

## Isolating the Column
Mysql không thể sử dụng index cho những columns không được đặt độc lập (`isolated`) trong câu query.

>> `Isolating` the column means it should not be part of an expression or be inside a function in the query

Các column cần được đặt trong câu query sao cho nó không nằm trong một biểu thức expression (các phép tính toán, phép so sánh, ...) hoặc là một tham những tham số của các `function` (`CONCAT`, `LENGTH`, `LOCATE` ...).

Ví dụ, Mysql sẽ không thể sử dụng index cho câu query:
```mysql
 mysql> SELECT * FROM users WHERE id + 1 = 5;
 ```
Dễ thấy câu điều kiện WHERE bằng với `id = 4`, tuy nhiên Mysql không thể giải quyết nó tương tự như trường hợp so sánh bằng kia được :
```mysql
mysql> EXPLAIN SELECT * FROM users WHERE id = 4;
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type  | possible_keys | key     | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | users | NULL       | const | PRIMARY       | PRIMARY | 8       | const |    1 |   100.00 | NULL  |
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
1 row in set, 1 warning (0.01 sec)

mysql> EXPLAIN SELECT * FROM users WHERE id + 1 = 5;
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | users | NULL       | ALL  | NULL          | NULL | NULL    | NULL |    4 |   100.00 | Using where |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```
Câu truy vấn đầu sử dụng được index (số rows mysql phải kiểm tra chỉ là 1), còn câu truy vấn còn lại, lượng row phải kiểm tra là 4:

```mysql
SELECT COUNT(*) FROM users;
+----------+
| COUNT(*) |
+----------+
|        5 |
+----------+
1 row in set (0.01 sec)
```
Một ví dụ khác cũng không thể sử dụng index trong câu truy vấn :

```mysql
mysql> SELECT ... WHERE TO_DAYS(CURRENT_DATE) - TO_DAYS(date_col) <= 10;
```
---
## Multi-column vs Single-column Indexes
Ngoài việc có thể đánh index cho từng column riêng lẻ (`single-column`), Mysql còn cho phép ta tạo index cho nhiều column (`multi-column`) :
```mysql
# Single column

mysql> ALTER TABLE users ADD INDEX idx_on_last_name (last_name);
mysql> ALTER TABLE users ADD INDEX idx_on_first_name (first_name);

# Multiple columns

mysql> ALTER TABLE users ADD INDEX idx_on_last_name_and_first_name (last_name, first_name);
```

Việc sử dụng `multi-column` hay `single-column` index trong table phụ thuộc vào câu query được sử dụng tới table đó.

Ví dụ, với câu query :
```mysql
mysql> EXPLAIN SELECT * FROM users WHERE last_name="Terry" AND first_name="John";

| select_type | table | type | possible_keys | key | ref | Extra |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SIMPLE | users | index_merge | idx_on_last_name, idx_on_first_name | idx_on_last_name, idx_on_first_name | NULL | Using intersect(idx_on_last_name, idx_on_first_name), Using where |
```
Các columns trong câu query đều được đánh index (`first_name`, `last_name`), cột `possible_key` chỉ ra các index mà mysql **có thể** sẽ sử dụng, cột `key` là những index mysql sử dụng để thực hiện truy vấn. Ở đây ta thấy rằng cả 2 index `idx_on_last_name`, `idx_on_first_name` đều được mysql sử dụng, tuy nhiên loại truy vấn (cột `type`) ở đây là **index_merge**, nghĩa là mysql đã sử dụng [Index Merge Optimization](https://dev.mysql.com/doc/refman/8.0/en/index-merge-optimization.html#:~:text=The%20Index%20Merge%20access%20method,intersections%20of%20its%20underlying%20scans.) để thực hiện truy vấn này : 

> The Index Merge intersection algorithm performs simultaneous scans on all used indexes and produces the intersection of row sequences that it receives from the merged index scans.

`index_merge` sẽ tiến hành `scan` đồng thời trên từng index đã có, gộp những rows thỏa mãn điều kiện truy vấn từ những kết quả `scan` trước đó để build ra list result rows.

Rõ ràng việc sử dụng `index_merge` là không được hiệu quả, vì thế ta có thể xét tới hướng thứ 2, dùng `multi-column` index : 
```mysql
mysql> EXPLAIN SELECT * FROM users WHERE last_name="Terry" AND first_name="John";

| select_type | table | type | possible_keys | key | ref | Extra |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SIMPLE | users | ref | idx_on_last_name_and_first_name | idx_on_last_name_and_first_name | NULL | NULL |
```
Kết quả cho thấy mysql đã dùng index `idx_on_last_name_and_first_name` để thực hiện tìm kiếm : 

![](https://images.viblo.asia/de8b603e-c7e1-4465-9ac5-41700c1eee2b.png)

Ảnh trên minh họa cho cấu trúc B-Tree - nơi lưu trữ index.

Việc tìm kiếm trở nên dễ dàng và nhanh chóng : bắt đầu từ `last_name="Terry"` trong cây tìm kiếm, sau khi tìm thấy page với `last_name` là `Terry`, tiếp tục tìm trong page đó node có giá trị `first_name` là `John`.

### Choosing a Good Column Order
Khi sử dụng `multi-column index`, ta cần phải chú ý tới thứ tự các column trong index. 

Việc tìm kiếm chỉ có hiệu quả khi các column trong câu query được tìm kiếm theo thứ từ trái qua phải trong danh sách các column ở index.

Lấy index ở ví dụ trên :
```mysql
mysql> ALTER TABLE users ADD INDEX idx_on_last_name_and_first_name (last_name, first_name);
```

Các trường hợp sau nên sử dụng `multi-column index` (mọi người có thể đối chiếu với ảnh bên trên) : 

* Match the full value : câu truy vấn tìm kiếm `users` có tên đầy đủ là `John Terry`
 ```mysql
 mysql> SELECT * FROM users WHERE last_name="Terry" AND first_name="John";
 ```
* Match the leftmost prefix : câu truy vấn tìm kiếm `users` có `last_name` là `Terry` (leftmost prefix ở đây là `last_name`, đứng đầu tiên trong danh sách các column trong index)
 ```mysql
 mysql> SELECT * FROM users WHERE last_name="Terry";
 ```
* Match the column prefix : câu truy vấn tìm kiếm `users` có `last_name` bắt đầu với `T` (LIKE "T%")
```mysql
mysql> SELECT * FROM users WHERE last_name LIKE "%T";
```
* Match a range of values : câu truy vấn tìm kiếm `users` có `last_name` từ "Allen" đến "Barca
```mysql
mysql> SELECT * FROM users WHERE last_name BETWEEN "Allen" AND "Barca";
```
* Match one part exactly and match a range on another part
```mysql
mysql> SELECT * FROM users WHERE last_name="Terry" AND first_name BETWEEN "John" AND "Kelly";
```

---