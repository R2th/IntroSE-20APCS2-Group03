## Đặt lại giá trị cho trường "sort"

Chào mọi người, hôm nay mình có được hỏi 1 câu hỏi về vấn đề update trường `sort` trong Mysql như sau:

Có một table `banners` gồm các trường: `id, name, sort`. Table `banners` gồm 1000 bản ghi và các giá trị của sort được xếp theo thứ tự 1->1000. 
Yêu cầu: 
Thêm chức năng update sort cho banners theo logic sau:
  1. Khi thêm mới sẽ thêm một bản ghi và giá trị sort sẽ ở cuối cùng.
  2. Khi update hoặc xóa 1 banner thì gía trị của sort sẽ về đúng vị trí cần thiết và các giá trị sort là duy nhất.
  3. Số lượng query thực hiện là bao nhiêu cho 1 hành động.
  
#### VD:
Giả sử bản danh sách bản ghi dạng:
```
mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  3 | C    |    3 |
|  4 | D    |    4 |
|  5 | E    |    5 |
+----+------+------+
5 rows in set (0.00 sec)

```
+ Thêm mới: 

 . Khi thêm 1 bản ghi F. Thì banner sẽ là: 
```
mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  3 | C    |    3 |
|  4 | D    |    4 |
|  5 | E    |    5 |
|  6 | F    |    6 |
+----+------+------+
5 rows in set (0.00 sec)
```


+ Sửa: 
Bây giờ update mong muốn B(2) => B(5). 
```
mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    5 |
|  3 | C    |    2 |
|  4 | D    |    3 |
|  5 | E    |    4 |
+----+------+------+
5 rows in set (0.00 sec)

```
+ Xóa: 
 Xóa bản ghi B(2)..
 
```
mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  3 | C    |    2 |
|  4 | D    |    3 |
|  5 | E    |    4 |
+----+------+------+
5 rows in set (0.00 sec)

```


Và sau khi nhận được thì mình có search google và đưa ra một số đáp án: 

### I. Ý tưởng bản thân

#### 1. Khi thêm mới: cái này thuộc dạng dễ dàng nhất

 + Lấy bản ghi có sort lớn nhất ra(sort_max)
 
 + Inser bản ghi mới vào và có `sort = sort + 1`. 
 
 ```
 set @max_sort = (Select MAX(sort) as max_sort from banners);
 INSERT INTO banners (name, sort) VALUES ("F", (@max_sort + 1));
 
 Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  3 | C    |    3 |
|  4 | D    |    4 |
|  5 | E    |    5 |
|  6 | F    |    6 |
+----+------+------+

 ```
 
 
#### 2. Khi update sort cho 1 banner


Thì mình sẽ chia 2 trường hợp: với giả sử bản ghi là B.

**a. Nếu `new_sort > older_sort`**
 
  + B1: Update sort của tất cả phần tử trong khoảng `[older_sort +1, new_sort +1]`  giảm xuống 1.
  + B2: Update sort của bản ghi cần update bằng `new_sort`
```
Update banners set 
    -> sort = (sort - 1) where sort > 2 and sort <= 4;
Query OK, 2 rows affected (0.10 sec)
Rows matched: 2  Changed: 2  Warnings: 0

mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  3 | C    |    2 |
|  4 | D    |    3 |
|  5 | E    |    5 |
+----+------+------+
5 rows in set (0.00 sec)

mysql> Update banners set sort = 4 where id = 2;
Query OK, 1 row affected (0.04 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    4 |
|  3 | C    |    2 |
|  4 | D    |    3 |
|  5 | E    |    5 |
+----+------+------+
5 rows in set (0.00 sec)

mysql> 
```

**b. Nếu `new_sort < older_sort`**

Cái này thì mình ý tưởng ngược lại.
```
mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    4 |
|  3 | C    |    2 |
|  4 | D    |    3 |
|  5 | E    |    5 |
+----+------+------+
5 rows in set (0.00 sec)

mysql> Update banners set  sort = (sort + 1) where sort >= 2 and sort < 4;
Query OK, 2 rows affected (0.04 sec)
Rows matched: 2  Changed: 2  Warnings: 0

mysql> Update banners set sort = 2 where id = 2;
Query OK, 1 row affected (0.04 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  3 | C    |    3 |
|  4 | D    |    4 |
|  5 | E    |    5 |
+----+------+------+
5 rows in set (0.00 sec)

mysql> 
```

#### 3. Destroy :

Phần này thì mình chia 2 bước.

 + B1: Destroy bản ghi nhưng lưu lại remove_sort.
 + B2: Update lại bản ghi với `sort > remove_sort` giảm đi 1

```
mysql> Delete from banners where sort = 3;
Query OK, 1 row affected (0.07 sec)

mysql> Update banners set sort = (sort -1) where(sort > 3);
Query OK, 2 rows affected (0.09 sec)
Rows matched: 2  Changed: 2  Warnings: 0

mysql> Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |    1 |
|  2 | B    |    2 |
|  4 | D    |    3 |
|  5 | E    |    4 |
+----+------+------+
4 rows in set (0.00 sec)

```

### II. Ý tưởng lần được trên mạng tại link [Renumbering an "ordering" field in mysql](http://paulwhippconsulting.com/blog/renumbering-an-ordering-field-in-mysql/)

Khi họ thêm mới bản ghi họ sẽ dãn 1 khoảng cho bản ghi này là 10 bằng lệnh:

```
mysql> SET @ordering_inc = 10;
Query OK, 0 rows affected (0.00 sec)

mysql> SET @new_ordering = 0;
Query OK, 0 rows affected (0.00 sec)

mysql> UPDATE  banners SET sort = (@new_ordering := @new_ordering + @ordering_inc) ORDER BY sort ASC;
```

```
mysql>  Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |   10 |
|  2 | B    |   20 |
|  3 | C    |   30 |
|  4 | D    |   40 |
|  5 | E    |   50 |
+----+------+------+
5 rows in set (0.00 sec)
```

Khi thêm mới mà muố xen giữa 2 bản ghi thì sẽ set giá trị là trung bình giữa 2 bản ghi, nếu cuối cùng thì sẽ là max và nếu đầu tiên sẽ là 0.
Tiếp đó là chạy lại lệnh trên chúng ta lại có bản ghi mới
```
mysql> INSERT INTO tasks (name, sort) VALUES ("F", 15);
ERROR 1054 (42S22): Unknown column 'name' in 'field list'
mysql> INSERT INTO banners (name, sort) VALUES ("F", 15);
Query OK, 1 row affected (0.04 sec)

mysql>  Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |   10 |
|  2 | B    |   20 |
|  3 | C    |   30 |
|  4 | D    |   40 |
|  5 | E    |   50 |
|  6 | F    |   15 |
+----+------+------+
6 rows in set (0.00 sec)

mysql> SET @ordering_inc = 10;
Query OK, 0 rows affected (0.00 sec)

mysql> SET @new_ordering = 0;
Query OK, 0 rows affected (0.00 sec)

mysql> UPDATE  banners SET sort = (@new_ordering := @new_ordering + @ordering_inc) ORDER BY sort ASC;
Query OK, 5 rows affected (0.04 sec)
Rows matched: 6  Changed: 5  Warnings: 0

mysql>  Select * from banners;
+----+------+------+
| id | name | sort |
+----+------+------+
|  1 | A    |   10 |
|  2 | B    |   30 |
|  3 | C    |   40 |
|  4 | D    |   50 |
|  5 | E    |   60 |
|  6 | F    |   20 |
+----+------+------+
6 rows in set (0.00 sec)
```

Với Destroy thì mình nghĩ cũng sẽ sinh ra câu lệnh dạng như trên.

### III. 1 ý tưởng mình nghĩ đơn giản nhất và cũng là câu trả lời đầu tiên của mình

 + Với ngôn ngữ server mình sẽ lấy hết kết quả của các bản ghi ra và lưu ở dạng hash.
 + Dùng thuật toán sort lại hash sao cho phù hợp với mong đợi.
 + Xóa hết data ở bảng `banners` đi.
 + Insert lại tất cả các giá trị.


## Kết Luận
 + Với cách 1 thì mình rất tự nhận là của bản thân vì mình chỉ tham khảo đến cách 2 và cách 1 xong tự nghĩ ra mà không cũng không tìm kiếm sâu trên google để xác định đã có ai làm chưa. (bản thân mình cũng chưa làm cái này vào thực tế).
 + Cách 2 thì mình lần được trên google với đường link đính kèm bên trên thì thấy là 1 ý tưởng hay hơn cách 3 rất nhiều.
 + Cách 3 này là mình lôi ra từ thực tế bản thân trải nghiệm. Và mình cũng trải nghiệm với data khá lớn dẫn tới web của mình cứ thế xoay luôn(tuy data vẫn được update bình thường => thế nên mình không khuyến khích suy nghĩ cách này)