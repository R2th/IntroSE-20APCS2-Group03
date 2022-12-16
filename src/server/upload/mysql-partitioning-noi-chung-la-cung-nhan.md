**Mysql Partitioning** theo đúng như tên của nó là việc phân chia một table thành những phần nhỏ theo một logic nhất định, được phân biệt bằng key, key này thường là tên column trong table.
Như chúng ta đã biết mysql và nhiều hệ quản trị cơ sở dữ liệu khác, lưu trữ dữ liệu dưới dạng bảng gồm các hàng và cột. Mỗi lần truy vấn  DB engine phải duyệt qua toàn bộ bảng để lấy dữ liệu, điều này tạo ra vấn đề về performance khi bản ghi trong table quá lớn, vấn đề này sẽ được giải quyết khá đơn giản bằng partition, nhờ kỹ thuật này chúng ta sẽ chỉ lấy dữ liệu tại vùng nhất định thay vì toàn bộ table như trước đây. Cùng xem một ví dụ để hiểu hơn về các hoạt động của partition nhé.
Ví dụ chúng ta có table persons chưa hề được tạo partition, và có các trường dữ liệu cụ thể như sau:

![](https://images.viblo.asia/3e541cc0-6b53-485b-ac5f-683b2e7c2fe1.png)

 Table này khi tạo ra mặc định sẽ được lưu trữ thành 1 chunk trong file system
 
 ![](https://images.viblo.asia/0e362817-1a3b-417c-ba00-afaee0ab57bb.png)
 
 Khi sử dụng partition, table sẽ được phân chia thành nhiều chunk với key mà chúng ta đã định nghĩa. Ví dụ ở đây mình dùng trường age làm key.
 ![](https://images.viblo.asia/061cc678-1d39-4774-9458-c5681fcf6693.png)

Chúng ta có thể test độ hiệu quả của partition bằng câu truy vấn đơn giản như sau:
```sql
select * from persons where age = 24
```
 Trong trường hợp chưa dùng partition thời gian thực thi query là 0.00064 sec.
 
 ![](https://images.viblo.asia/a00307b0-f90b-4bc8-95db-53a48a3170b3.png)
 
Với partition thì kết quả khác biệt rõ rệt, thời gian thực thi chỉ còn 0.0016 sec.

![](https://images.viblo.asia/5bec8b92-c125-48c2-8c26-3f235f20bb63.png)

Do table của chúng ta đang có ít dữ liệu nên độ hiệu quả khó có thể cảm nhận được, tuy nhiên với những cơ sở dữ liệu có hàng triệu bản ghi thì đây thực sự là một giải pháp tuyệt vời.
Như vậy qua ví dụ trên bạn đã phần nào hiểu về Partition là gì và tác dụng của nó như nào, bây giờ chúng ta cùng đi vào chi tiết hơn nhé.
## 1. Cách tạo partition
Trước khi tạo partition bạn phải chắc chắn column mà bạn sử dụng được sử dụng thường xuyên trong các truy vấn, thì việc tạo partition mới thực sự có ý nghĩa.

Bạn có thể tạo partition bằng việc sử dụng CREATE TABLE hoặc ALTER TABLE
```sql
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
(create_definition,...)
[table_options]
[partition_options]
```
```sql
ALTER TABLE tbl_name [partition_options]
```
Ví dụ :
```sql
create table products(id integer, name varchar(100), price integer) partition by key(price);
```
```sql
alter table persons partition by key(age) partitions 5;
-- key: là column được chỉ định để phân chia table
-- 5: là số lượng partition mà bạn muốn chia
```
## 2. Các kiểu partition chính
* Range partitioning
* List partitioning
* Columns partitioning
* Hash partitioning
* Key partitioning
* Subpartitioning
Trong phạm vi bài viết và sự hiểu biết mình sẽ tập trung làm rõ 2 loại partition là  **Range partitioning, List partitioning**. Các loại còn lại hẹn các bạn trong một bài viết khác.

### 2.1. Range partitioning
**Range partitioning** hiểu đơn giản là phân vùng theo khoảng mà bạn muốn sử dụng, tức là chia table ra thành nhiều khoảng giá trị, các khoảng giá trị này phải liên tiếp và không chồng chéo lên nhau, ví dụ trong 1 năm bạn có 12 tháng, chúng ta có thể chia thành 12 khoảng liên tiếp nhau như 

p1: 01-01-2020 đến 31-01-2020
p2: 01-02-2020 đến 29-02-2020
p3: 01-03-2020 đến 30-03-2020
....
Mục đích của chia vùng theo khoảng sẽ giúp việc insert và tìm kiếm nhanh hơn rất nhiều, khi insert nếu có giá trị nằm trong khoảng nào thì nó sẽ được insert vào trong đúng khoảng đã định nghĩa, và khi tìm kiếm cũng vậy. Việc tạo range partitioning yêu cầu từ khóa `VALUE LESS THAN` để chỉ định phạm vi cần sử dụng . Cùng xem ví dụ cụ thể sau:
```sql
mysql> CREATE TABLE sales (no INT NOT NULL, date TIMESTAMP NOT NULL, 
code VARCHAR(15) NOT NULL, amount INT NOT NULL) 
PARTITION  BY RANGE (amount) (
PARTITION p0 VALUES LESS THAN (100), 
PARTITION  p1 VALUES LESS THAN (300), 
PARTITION p2 VALUES LESS THAN (700), 
PARTITION  p3 VALUES LESS THAN (1000)); 
Query OK, 0 rows affected (1.34 sec)
```
Ở đây chúng ta đã tạo ra một table `sales` cùng với 4  partition được chỉ định rõ phạm vi sử dụng, p0 là sẽ lưu trữ những record có `amount` < 100. p2 sẽ có 100 <= `amount` < 300 Tương tự với các partition còn lại. Bây giờ chúng ta cùng insert vào table này 
```sql
mysql> INSERT INTO sales VALUES
(1, '2013-01-02', 'C001', 50), 
(2, '2013-01-25', 'C003', 80), 
(3, '2013-02-15', 'C012', 250), 
(4, '2013-03-26', 'C345', 300), 
(5, '2013-04-19', 'C234', 400), 
(6, '2013-05-31', 'C743', 500), 
(7, '2013-06-11', 'C234', 750), 
(8, '2013-07-24', 'C003', 800), 
```
và khi select ra chúng ta cùng xem kết quả
```sql
mysql> SELECT PARTITION_NAME, TABLE_ROWS FROM INFORMATION_SCHEMA.PARTITIONS WHERE TABLE_NAME='sales';
+----------------+------------+
| PARTITION_NAME | TABLE_ROWS |
+----------------+------------+
| p0             |          2 |
| p1             |          1 |
| p2             |          3 |
| p3             |          2 |
+----------------+------------+
```
> Lưu ý trước khi tạo range partioning chúng ta cần xác định rõ các khoảng cần thiết cho nhu cầu, giả sử nếu giờ mình insert một row có amount > 1000 thì sẽ như thế nào nhỉ? Các bạn thử test và tự trả lời nhé :D

### 2.2. List partitioning
Loại này khác với loại range một chút là nó không phân chia theo khoảng nữa mà nó nhặt những phần tử được chỉ định tạo thành 1 danh sách, loại này chúng ta sẽ dùng từ khóa `VALUES IN` (list_value) để tạo `partition`. cũng lấy ví dụ trên nhưng thêm một chút trong bảng `sales` chúng ta có thêm cột mã nhân viên sale là `saler_id` để biết là nhân viên nào đã bán, và ví dụ trong một công ty chúng ta có 10 nhân viên sale, cùng với 3 nhóm sale, Mỗi nhóm làm việc ở một đoạn đường do cấp trên yêu cầu. 

Ví dụ:
* Nhóm A làm việc ở Phạm Văn Đồng
* Nhóm B làm việc ở Trần Duy Hưng
* Nhóm C làm việc ở Láng 

Bây giờ cùng tạo table sales như sau
```SQL
mysql> CREATE TABLE sales (no INT NOT NULL, date TIMESTAMP NOT NULL, 
code VARCHAR(15) NOT NULL, amount INT NOT NULL, saler_id INT NOT NULL) 
PARTITION  BY LIST(saler_id) (
PARTITION pA VALUES IN (1,2,5), 
PARTITION pB VALUES IN (3,4,8), 
PARTITION pC VALUES IN (6,7,9,10)); 
Query OK, 0 rows affected (1.34 sec)
```

Và như vậy là sau này khi muốn tìm kiếm thống kê theo nhóm cũng sẽ nhanh hơn, thống kê nhân viên nào bán được bao nhiêu hàng cũng sẽ nhanh hơn là duyệt toàn bộ table.
## 3. Delete partition
Nếu trong quá trình vận hàng hệ thống bạn không cần một lượng data nào đó nữa thì có thể xóa đi bằng cách xóa chính partition đã định nghĩa
```mysql
MySQL> ALTER TABLE sales TRUNCATE PARTITION p0;
```
## 4. Kết luận
Như vậy trong bài viết này mình đã giới thiệu cho các bạn khái niệm, mục đích sử dụng của `Mysql partition`, và 2 loại partition chính hay được sử dụng là `Range partition và List partition`. Hy vọng đây sẽ là kiến thức bổ ích giúp các bạn tối ưu truy vấn trong quá trình làm dự án với những database lơn. Bài viết có thể còn nhiều thiếu sót , cũng như việc sử dụng từ ngữ `partition` và `partitioning` còn nhầm lẫn mong các bạn đóng góp và hẹn các bạn trong bài viết sớm nhất về 4 loại `mysql partitioning` còn lại.