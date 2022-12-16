# 0. Tổng quan
Indexs (Chỉ mục - cũng được gọi là "keys" trong MySQL) là cấu trúc dữ liệu làm phương tiện lưu trữ để tìm các hàng nhanh hơn.
Indexs rất quan trọng để có hiệu suất tốt và trở nên quan trọng hơn khi dữ liệu của bạn
phát triển lớn hơn. Cơ sở dữ liệu nhỏ, tải nhẹ thường hoạt động tốt ngay cả khi không có đúng cách
chỉ mục, nhưng khi tập dữ liệu tăng lên, hiệu suất có thể giảm rất nhanh. Thật không may,
chỉ mục thường bị lãng quên hoặc hiểu lầm, vì vậy lập chỉ mục kém là nguyên nhân hàng đầu của
vấn đề hiệu suất trong thế giới thực.

# 1. Cơ bản về indexing
## 1.1. Nó hoạt động ra sao
Cách dễ hiểu nhất index hoạt động dư lào trong MySQL là nghĩ về index trong sách. Để tìm 1 topic cụ thể nào trong sách, bạn nhìn mục lục và nó sẽ nói cho bạn trang nào xuất hiện nội dung đó
Trong MySQL, phương pháp lưu trữ sử dụng index cũng tương tự vậy. Nó tìm kiếm index của cấu trúc dữ liệu như 1 giá trị. Khi tìm kiếm trùng khớp, nó có thể tìm thấy hàng đó. Khi bạn chạy câu lệnh
```sql
mysql> SELECT first_name FROM sakila.actor WHERE actor_id = 5;
```
Cột `actor_id` là index, bởi vậy MySQL sẽ sử dụng index để tìm những hàng có `actor_id` là 5. Nói cách khác, nó thực hiện tra cứu các giá trị trong chỉ mục
và trả về bất kỳ hàng nào chứa giá trị được chỉ định.
## 1.2. Các loại index
- B-Tree Indexes

Đa số kỹ thuật lưu trữ MySQL đều hỗ trợ loại index này. 

Ngoại lệ của kỹ thuật này là nó không hỗ trợ index với tất cả các phiên bản cho đến khi phiên 			bản MySQL 5.1, khi mà bắt đầu cho phép các cột AUTO_INCREMENT

- Hash index

Hash index không được sử dụng rộng rãi vì nó không thế áp dụng cho nhiều trường hợp như B-Tree Indexs. Hash index có 1 số điểm mạnh sau:

Chúng chỉ được sử dụng để so sánh bằng, sử dụng các toán tử = hoặc <=> (nhưng rất nhanh). Chúng không được sử dụng cho các toán tử so sánh, chẳng hạn như <tìm thấy một phạm vi các giá 
		trị. Các hệ thống phụ thuộc vào loại tra cứu giá trị đơn này được gọi là các cửa hàng giá trị khóa chính xác để sử dụng MySQL cho các ứng dụng đó, hãy sử dụng các chỉ mục băm bất cứ khi nào 			có thể.

Toán tử ORDER By không tối ưu được nếu sử dụng hash index

MySQL không thể xác định khoảng bao nhiêu hàng giữa hai giá trị (điều này được sử dụng bởi trình tối ưu hóa phạm vi để quyết định sử dụng chỉ mục nào). Điều này có thể ảnh hưởng đến một số 			truy vấn nếu bạn thay đổi bảng MyISAM hoặc InnoDB thành bảng MEMOR được lập chỉ mục băm.

Chỉ toàn bộ khóa có thể được sử dụng để tìm kiếm một hàng. (Với chỉ mục cây B, mọi tiền tố ngoài cùng bên trái của khóa đều có thể được sử dụng để tìm hàng.)

- Spatial (R-Tree) indexes: Hỗ trợ tốt cho các ứng dụng liên quan đến địa lý

MyISAM hỗ trợ các chỉ mục không gian, mà bạn có thể sử dụng với các loại một phần như GEOME TRY. Không giống như các chỉ mục B-Tree, các chỉ mục không gian không yêu cầu các mệnh đề WHERE của bạn hoạt động trên tiền tố ngoài cùng bên trái của chỉ mục. Họ lập chỉ mục dữ liệu theo tất cả các kích thước giống nhau
thời gian. Kết quả là, tra cứu có thể sử dụng bất kỳ sự kết hợp kích thước nào một cách hiệu quả. Tuy nhiên, bạn phải sử dụng các chức năng của MySQL GIS, chẳng hạn như MBRCONTAINS (), để làm việc này và hỗ trợ MySQL MySQL GIS rất tuyệt, vì vậy hầu hết mọi người không sử dụng nó. Giải pháp tiếp cận cho GIS trong RDBMS mã nguồn mở là PostGIS trong PostgreQuery. (ứng dụng cho các ứng dụng liên quan đến địa lý)
# 2.  Các truy vấn sử dụng index
## 2.1. Multiple-Column Indexes
Một bảng có thể chọn nhiều cột làm index. Một chỉ mục có thể bao gồm tối đa **16** cột. MySQL có thể sử dụng các chỉ mục nhiều cột cho các truy vấn kiểm tra tất cả các cột trong chỉ mục hoặc các truy vấn chỉ kiểm tra cột đầu tiên, hai cột đầu tiên, ba cột đầu tiên, v.v. Nếu bạn chỉ định các cột theo đúng thứ tự trong định nghĩa chỉ mục, một chỉ mục tổng hợp duy nhất có thể tăng tốc một số loại truy vấn trên cùng một bảng.

Trước khi nói về các truy vấn mà có sử dụng index. Tôi muốn nói qua về ***leftmost prefix***. Leftmost prefix dịch tạm sang tiếng Việt là "tiền tố trái nhất" của 1 index. Nó được áp dụng trong trường hợp "Multiple-Column Indexes". Ví dụ khi bạn tạo index
```sql
CREATE TABLE test (
    id         INT NOT NULL,
    last_name  CHAR(30) NOT NULL,
    first_name CHAR(30) NOT NULL,
    PRIMARY KEY (id),
    INDEX name (last_name,first_name)
);
```
Thì `last_name` ở đây chính là leftmost prefix của index có tên là name. Tại sao leftmost lại quan trọng như vậy, ta cùng xem xét phần tiếp theo nhé.
## 2.2. Các truy vấn có sử dụng index trong B-Tree
Chính vì B-Tree index được sử dụng phổ biến nhất, phần này tôi sẽ liệt kê các truy vấn sử dụng index trong B-Tree
* Match the full value

Truy vấn tìm đúng giá trị:
```sql
SELECT * FROM test WHERE last_name='Widenius';
```
* Match a range of values

Tất nhiên trùng giá trị trong một khoảng ta thì các index cũng được áp dụng `(>=, <=, >, <)`
* Match a leftmost prefix

Điều này cho thấy thứ tự index thật sự quan trọng như thế nào.  **Nếu 1 bảng có nhiều cột trong 1 index, chỉ có leftmost prefix có thể được sử dụng để tối ưu truy vấn**. Ví dụ index của bạn có 3 cột` (col1, col2, col3)`, chỉ thao tác trên `(col1), (col1, col2),` và `(col1, col2, col3)` mới có thể giúp tối ưu hóa truy vấn, thao tác trên `(col2) hay (col2, col3)` hoàn toàn không có ý nghĩa:
```sql
SELECT * FROM tbl_name WHERE col1=val1;
SELECT * FROM tbl_name WHERE col1=val1 AND col2=val2;

SELECT * FROM tbl_name WHERE col2=val2;
SELECT * FROM tbl_name WHERE col2=val2 AND col3=val3;
```
Như truy vấn ở trên thì chỉ có 2 truy vấn đầu đánh index có ý nghĩa, 2 truy vấn sau không áp dụng index.

Vậy thì `col2`, `col3` cho vào index có ý nghĩa gì? Nó sẽ có ý nghĩa index trong trường hợp bổ sung truy vấn, cải thiện truy vấn nhanh hơn (trong trường hợp truy vấn `(col1, col2)` hoặc `(col1, col2, col3)` ý). 

Như vậy quay trở lại với bảng đã áp dụng từ trên, các truy vấn sau sẽ phát huy được tác dụng của index (sử dụng leftmost prefix):
```sql
SELECT * FROM test WHERE last_name='Widenius';

SELECT * FROM test
  WHERE last_name='Widenius' AND first_name='Michael';

SELECT * FROM test
  WHERE last_name='Widenius'
  AND (first_name='Michael' OR first_name='Monty');

SELECT * FROM test
  WHERE last_name='Widenius'
  AND first_name >='M' AND first_name < 'N';
```
Còn các truy vấn này thì không:
```sql
SELECT * FROM test WHERE first_name='Michael'; -- không sử dụng leftmost

SELECT * FROM test
  WHERE last_name='Widenius' OR first_name='Michael'; -- dùng OR nên cũng không sử dụng leftmost (vế sao OR)
```
Do đó việc sắp xếp thự tự các cột trong index là rất quan trọng để lấy được leftmost prefix.
* Match a column prefix

Bạn có thể áp dụng index để tìm những người có `last_name` bắt đầu là "J".

## 2.3. Hạn chế của index
Như đã đề cập ở trên, một số truy vẫn sẽ không sử dụng index:
- Không sử dụng leftmost

Nếu không sử dụng leftmost trong truy vấn, index sẽ không phát huy được tác dụng của nó.
- Kỹ thuật lưu trữ không thể tối ưu truy vấn với 1 cái cột với các "bên phải của điều kiện với khoảng đầu tiên" (the right of the
first range condition)

Dễ hiểu nhất là thử áp dụng với `LIKE`. Nếu như phần trên đề cập có thể truy vấn với người dùng có `last_name` bắt đầu là "J" có áp dụng index thì với những truy vấn last_name kết thúc là"J" sẽ không áp dụng index vì nó là điều kiện bên phải. Đây là một hạn chế khá lớn của index.
```sql
SELECT * FROM test WHERE last_name LIKE 'J%'; -- áp dụng index trong truy vấn
SELECT * FROM test WHERE last_name LIKE '%J'; -- còn đây thì không
```
# 3. Xem truy vấn có sử dụng index không?
Để xem truy vấn của bạn có sử dụng index hay không, bạn có thể sử dụng lệnh `EXPLAIN` trong sql. Nhìn vào số cột nó đã duyệt và cột extra, bạn có thể biết thêm thông tin hữu ích đó :D.

Ví dụ sao tôi đã tạo 20k bản ghi user để truy vấn từ seed của Laravel:
```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(App\User::class, 20000)->create()->each(function ($user) {
            
        });
    }
}
```
Và đây là truy vấn để test index:
```sql
mysql> explain select * from users where email LIKE "m%";
+----+-------------+-------+------------+-------+--------------------+--------------------+---------+------+------+----------+-----------------------+
| id | select_type | table | partitions | type  | possible_keys      | key                | key_len | ref  | rows | filtered | Extra                 |
+----+-------------+-------+------------+-------+--------------------+--------------------+---------+------+------+----------+-----------------------+
|  1 | SIMPLE      | users | NULL       | range | users_email_unique | users_email_unique | 1022    | NULL | 1514 |   100.00 | Using index condition |
+----+-------------+-------+------------+-------+--------------------+--------------------+---------+------+------+----------+-----------------------+
1 row in set, 1 warning (0,00 sec)

mysql> explain select * from users where email LIKE "%m";
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows  | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-------------+
|  1 | SIMPLE      | users | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 19853 |    11.11 | Using where |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-------------+
1 row in set, 1 warning (0,00 sec)

```
Nhìn qua là biết cái nào sử dụng index rồi đó. Index giúp ta giảm truy vấn từ duyệt 19853 bản ghi xuống 1514 bản ghi

# Tài liệu tham khảo:
https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html