Sau [Query Turning](https://viblo.asia/p/aWj53DNGK6m) thì có vẻ như đây là bài viết đầu tiên về sql của mình. Cũng không biết nói sao, đây là một bài viết không thiên hẳn về học thuật hay thực hành, nó chỉ đơn giản là một số kiến thức và tip mà mình nghĩ là cần thiết. Hi vọng bài viết sẽ có ích với các bạn :)

### 1. Reset password
Với một đứa *não tàn* như mình thì **Reset password** là một trong những tip mình không thể không biết :sweat_smile: 

Quy trình này khá đơn giản thôi. Đầu tiên, bạn cần stop service mysql. Chạy lệnh
```
$ /etc/init.d/mysql stop
```
hoặc
```
$ sudo service mysql stop
```

Sau đó, bạn hãy bật **safe mode** để truy cập mysql mà không cần password
```
$ sudo mysqld_safe --skip-grant-tables &
```
>> Lưu ý: Nếu bạn gặp lỗi như vậy 
>> ```
>> 2021-03-16T08:00:38.488211Z mysqld_safe Logging to '/var/log/mysql/error.log'.
>> 2021-03-16T08:00:38.502557Z mysqld_safe Directory '/var/run/mysqld' for UNIX socket file don't exists.
>> ```
>> hãy chạy 2 lệnh sau
>> ```
>> $ sudo mkdir -p /var/run/mysqld
>> $ sudo chown mysql:mysql /var/run/mysqld
>> ```


Cuối cùng bạn hãy truy cập hệ quản trị cơ sở dữ liệu 
```
$ mysql -u root mysql
```

để chạt lệnh update password nào
```
$ update user set password=PASSWORD("newpassword") where User='root';
```
hoặc
```
$ update user set authentication_string=PASSWORD("secret") where User='root';
```
 cho mysql serrver ver 5.7 trở lên
>> Trong đó: `newpassword` là mật khẩu mới của bạn

Nếu kết quả sau khi update như vậy là được
```
Query OK, 0 rows affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 1
```
    
Giờ thì bạn hãy *restart* lại để truy cập lại nhé
```
$ /etc/init.d/mysql restart
```
hoặc
```
$ sudo service mysql restart
```

Nếu bạn dùng docker, thì bạn chỉ việc thay đổi config password, cực kỳ đơn giản luôn =)).
```
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:-root}
```
Tham khảo thêm về docker qua series [này](https://viblo.asia/s/W65GEjAjZDO) của mình nhé ;)

### 2. Export and import database

Để export cơ sở dữ liệu (CSDL), chúng ta sẽ dùng `mysqldump`
```
mysqldump --routines -u username -p dbname > dbexport.sql
```
>> Trong đó
>> - username: tên đăng nhập hệ quản trị cơ sở dữ liệu (HQTCSDL)
>> - dbname: tên CSDL bạn muốn export


File export sẽ là một file *sql*

Ngược lại, để import một cơ sở dữ liệu trong file `.sql`, bạn cần
Tạo 1 cơ sở dữ liệu mới
```
CREATE DATABASE newdb;
```

```
mysql -u username -p newdb < dbexport.sql
```
>> Tương tự
>> - username: tên đăng nhập HQTCSDL
>> - newdbname: tên CSDL bạn muốn import dữ liệu

### 3. Quy trình truy vấn
Bạn hãy xem hình ảnh dưới đây để thấy được thứ tự thực hiện các mệnh đề trong các truy vấn SQL

![](https://learnsql.com/blog/difference-between-where-and-having-clauses-in-sql/order-of-execution-in-SQL%20queries.png)

(I) Quá trình xử lý logic của một truy vấn SQL bắt đầu bằng câu lệnh FROM, câu lệnh này sẽ thu thập dữ liệu từ các bảng được yêu cầu trong truy vấn. Nó cũng có thể chứa một mệnh đề JOIN kết hợp hai hoặc nhiều bảng bằng cách sử dụng toán tử ON.

(II) Mệnh đề được xử lý tiếp theo là mệnh đề WHERE, lệnh này sẽ lọc các bản ghi của các bảng và chỉ lấy những bản ghi đáp ứng (các) điều kiện do người dùng chỉ định.

(III) Theo sau mệnh đề WHERE là mệnh đề GROUP BY, nó sẽ nhóm các bản ghi nhận được từ điều kiện WHERE.

(IV) Tiếp theo sẽ là mệnh đề HAVING. Lệnh này sẽ lọc những nhóm bản ghi được tạo ra từ mệnh đề GROUP BY trước đó, và chỉ lấy những bản ghi thỏa mãn điều kiện chỉ định.

(V) Giờ quá trình xử lý logic sẽ chuyển đến lệnh SELECT. Nó sẽ lấy các cột được chỉ định từ những cột đầu vào của nó. Nó cũng đánh giá thêm 1 số yếu tố như UNIQUE, DISTINCT và TOP, nếu được yêu cầu.

(VI) Mệnh đề ORDER BY được thực hiện ở cuối quy trình logic này. Lệnh này sẽ sắp xếp dữ liệu theo (các) cột được chỉ định trong đó và theo thứ tự tăng hoặc giảm dần (mặc định là tăng dần).

Có lẽ đây là kiến thức quá căn bản rồi nhỉ, nhưng càng căn bản thì chúng ta càng nên biết phải không nào. Hiểu quy trình truy vấn sẽ giúp bạn hiểu được systax, cũng như cách viết truy vấn hiệu quả hơn.

### 4. WHERE và HAVING
Đây là hai mệnh đề mà chúng ta rất hay dùng vì chả mấy khi chúng ta truy vấn toàn bộ bản ghi mà không kèm điều kiện. Vậy WHERE và HAVING giống và khác nhau như thế nào? Cùng mình tìm hiểu nhé ;)

Về sự giống nhau, hai mệnh đề này  có rất nhiều toán tử giúp chúng ta tạo và kết hợp các điều kiện như:
+ Toán tử so sánh: <, >, <=, >=, =, <>
+ Toán tử check null, exists:  IS NULL, IS NOT NULL, EXISTS
+ Toán tử khớp chuỗi: LIKE, '%=_'
+ Toán tử phạm vi: BETWEEN, IN
+ Toán tử so sánh định lượng: ALL, ANY, SOME
+ Toán tử kết hợp điều kiện: AND, OR, NOT
   
Nhưng khác với WHERE, mệnh đề HAVING còn có thể tạo điều kiện từ các aggregate functions như: MIN, MAX, SUM, COUNT, AVG,... Tuy nhiên chúng ta có thể sử dụng các aggregate functions này ở select, sau đó dùng mệnh đề WHERE để lọc bớt các bản ghi không thỏa mãn điều kiện.

Chúng ta có thể tóm tắt một số đặc điểm khác biệt chính giữa WHERE và HAVING như sau:

|  | Mệnh đề WHERE | Mệnh đề HAVING |
| -------- | -------- | -------- |
| Tính chất| WHERE được sử dụng để lọc các bản ghi (hàng) từ bảng dựa trên điều kiện được chỉ định. | HAVING lọc các nhóm bản ghi (hàng) được tạo bởi GROUP BY, tức là đầu ra của mệnh đề GROUP BY là  đầu vào để WHERE|
|Cách lọc|Mệnh đề WHERE được thực hiện trước GROUP BY, trước khi việc gom nhóm được thực hiện|Mệnh đề HAVING được thực hiện GROUP BY, sau khi đã có nhóm các bản ghi|
| Điều kiện | Có thể sử dụng WHERE mà không có GROUP BY  | Không thể sử dụng HAVING mà không có GROUP BY |
| Cú pháp| WHERE được đặt trước GROUP BY| HAVING được đặt sau GROUP BY |
| Khả năng kết hợp với các mệnh đề khác| Mệnh đề WHERE có thể được sử dụng với câu lệnh SELECT, UPDATE, DELETE| Mệnh đề HAVING chỉ có thể được sử dụng với lệnh SELECT. |
|Khả năng lọc| Mệnh đề WHERE không thể chứa aggregate functions|Mệnh đề HAVING có thể chứa aggregate function|

<br>

Từ những sự khác biệt này, bạn nên sử dụng HAVING nếu bạn cần lọc những bản ghi của GROUP, nếu không, hãy sử dụng WHERE nhé, nó sẽ hiệu quả hơn đó. Mình cũng đã từng viết về điều này, tham khảo tại [đây](https://viblo.asia/p/query-tuning-part-1-aWj53DNGK6m#_khong-su-dung-having-khi-chi-where-la-du-8) nhé. 

### 5. TRUNCATE, DELETE và DROP

Bạn có nghĩ rằng TRUNCATE, DELETE và DROP là các lệnh giống hệt nhau. Tất nhiên là không rồi phải không. Vậy chúng khác nhau như thế nào? Khi nào chúng ta nên sử dụng TRUNCATE và khi nào chúng ta nên sử dụng DELETE, hay DROP?

**1. DELETE**

DELETE là lệnh DML (Data Manipulation Language). Lệnh này xóa các bản ghi khỏi bảng chứ không xóa bảng khỏi cơ sở dữ liệu.

Nếu bạn không muốn xóa cấu trúc bảng hoặc bạn chỉ xóa các bản ghi cụ thể, hãy sử dụng lệnh DELETE. Nó có thể xóa một, một số hoặc tất cả các bản ghi trong bảng. DELETE sẽ trả về số hàng bị xóa khỏi bảng.

DELETE sử dụng `row lock` trong quá trình thực thi và có thể khôi phục lại dữ liệu sau khi xóa. Mọi hàng đã xóa đều sẽ bị khóa (locked), vì vậy sẽ cần rất nhiều lock nếu bạn làm việc với một bảng lớn. Bạn có thể thấy DELETE giữ nguyên ID trong bảng. Nếu bạn xóa bản ghi cuối cùng trong bảng có ID = 20 và sau đó thêm bản ghi mới, bản ghi này sẽ có ID = 21.

**2. TRUNCATE**

TRUNCATE là một lệnh DML (Data Manipulation Language). Lệnh này sẽ xóa toàn bộ các bản ghi của bảng.  Nó chỉ được sử dụng khi bạn muốn xóa toàn bộ dữ liệu của bảng, và tất nhiên, nó không xóa bảng khỏi cơ sở dữ liệu.

TRUNCATE nhanh hơn DELETE vì nó không cần lọc các bản ghi bị xóa. Nó không cần lọc bản ghi mà chỉ cần lock toàn bộ bảng, và nó không trả về số hàng bị xóa như DELETE.

**3. DROP**

DROP là một phương thức DDL (Data Definition Language). Nó không đơn giản chỉ xóa dữ liệu khỏi bảng mà nó xóa cả cấu trúc bảng khỏi cơ sở dữ liệu.

DROP sẽ xóa cấu trúc bảng và toàn bộ dữ liệu của bảng đó, đồng thời giải phóng bộ nhớ. Vậy nên, dĩ nhiên, chúng ta không thể khôi phục lại dữ liệu sau khi đã DROP.

Bạn có thể xem tót tắt trong bảng này

![](https://i.stack.imgur.com/Dt1vU.png)

Về cách sử dụng
- Để xóa các bản ghi cụ thể, hãy sử dụng DELETE.
- Để xóa tất cả các bản ghi khỏi một bảng lớn và move nó khỏi cấu trúc bảng, hãy sử dụng TRUNCATE. Nó nhanh hơn DELETE.
- Để xóa toàn bộ bảng, bao gồm cả cấu trúc và dữ liệu của bảng đó, hãy sử dụng DROP.

### 6. Update table by itself

Trong một vài trường hợp, nếu bạn muốn mở rộng bảng mà trường bạn mở rộng liên quan đến một số trường đã tổn tại trong bảng, bạn hãy thử lệnh này nhé
```
UPDATE 
     Table1 t1, 
     Table2 t2
SET 
     t1.column1 = t2.column2
WHERE
     t1.ID = t2.ID;
```

### 7. INSERT IGNORE và UPSERT

INSERT hoặc UPDATE hẳn khá quen thuộc với bạn, vậy INSERT IGNORE và UPSERT thì sao?

Nếu bạn có một lượng lớn dữ liệu mới và cần INSERT một phần dữ liệu có chứa giá trị trường id (là PRIMARY_KEY DUY NHẤT trong bảng) thì việc sử dụng INSERT cơ bản chắc chắn sẽ tạo ra lỗi:
```
INSERT INTO books
    (id, title, author, year_published)
VALUES
    (1, 'Green Eggs and Ham', 'Dr. Seuss', 1960);
ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'
```
Khi đó, bạn có thể sử dụng INSERT IGNORE, nó sẽ giúp bạn bỏ qua dữ liệu có chứa id đã tồn tại trong bảng
```
INSERT IGNORE INTO books
    (id, title, author, year_published)
VALUES
    (1, 'Green Eggs and Ham', 'Dr. Seuss', 1960);
Query OK, 0 rows affected (0.00 sec)
```

Một trường hợp khác, bạn có một lượng lớn dữ liệu, trong đó, một phần là dữ liệu mới để insert, một phần là dữ liệu cập nhật cho những bản ghi đã tồn tại trong bảng.
Với lượng dữ liệu nhỏ, tất nhiên, bạn có thể tạo từng câu lệnh INSERT hoặc UPDATE, nhưng với lượng dữ liệu lớn thì sao? 1 vòng for các queries hả, sẽ chẳng hợp lý tí nào phải không.
Khi đó UPSERT sẽ giúp bạn.

UPSERT là sẽ lệnh insert nếu dữ liệu tạo ra 1 bản ghi mới chưa tồn tại trong bảng, ngược lại nó sẽ update bản ghi cũ đã có trong bảng. Việc update hay insert được xét thông qua các trường unique của bảng. 
```
INSERT INTO Table1
    (column_1, column_2,.. , column_n)
VALUES
    (value_1, value2,... , value_n)
ON DUPLICATE KEY UPDATE
    column_1 = ...,
    column_2 = ...,;
```

>> Lưu ý: Những trưởng để check DUPLICATE KEY phải là unique nhé 

Bài viểt đến đây là hết rồi. Hi vọng bài viết này có ích với bạn. Hẹn gặp lại bạn ở những bài viết tiếp theo :)

Tài liệu tham khảo

[What Is the Difference Between WHERE and HAVING Clauses in SQL?](https://learnsql.com/blog/difference-between-where-and-having-clauses-in-sql/)

[What is the difference between TRUNCATE, DELETE and DROP statements?](https://afteracademy.com/blog/what-is-the-difference-between-truncate-delete-and-drop-statements)

[How to INSERT If Row Does Not Exist (UPSERT) in MySQL](https://chartio.com/resources/tutorials/how-to-insert-if-row-does-not-exist-upsert-in-mysql)