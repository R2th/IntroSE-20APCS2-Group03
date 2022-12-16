# Giới thiệu
SQL là viết tắt của Structured Query Language, là ngôn ngữ truy vấn có cấu trúc, cho phép bạn truy cập và thao tác với các cơ sở dữ liệu để tạo, xóa, sửa đổi, trích xuất dữ liệu. Các hệ thống quản trị cơ sở dữ liệu như MySql, MS Access, Oracle, Sybase, Informix, Postgres hay SQL Server đều lấy SQL làm ngôn ngữ cơ sở dữ liệu tiêu chuẩn. Càng về sau này thì các ứng dụng đòi hỏi phải có tốc độ xử lý dữ liệu ngày càng nhanh, dẫn đến sự nổi lên của NoSQL(cơ sở dữ liệu phi quan hệ): MapReduce và Bigtable, Cassandra, MongoDB, và nhiều nữa.

Trong bài viết ngày chúng ta sẽ tìm hiểu tổng quan về SQL, một số khái niệm cơ bản và chuẩn hóa dữ liệu.

Hiện nay, các job về SQL khá nhiều, bạn có thể xem chi tiết tuyển dụng SQL Developer tai đây: https://itviec.com/it-jobs/sql

# Các khái niệm cơ bản
**Primary Key (Khóa chính):**
Khóa chính hay còn gọi là khóa ràng buộc chính, được dùng để định danh một bản ghi trong bảng (table) có giá trị duy nhất. Được dùng để thiết lập mối quan hệ (1-n).

**Foreign Key (Khóa ngoại):**
Khóa ngoại được xem như là con trỏ trỏ tới khóa chính của bảng khác

**Column:**
Hay còn gọi là trường (field) được thiết kế để chứa tập dữ liệu, mô tả thuộc tính của mỗi thực thể (record) trong table.

**Index:**
Chỉ mục trong table, để giúp tốc độ xử lý truy vấn tốt hơn

**Quan hệ trong SQL**
*  1 - 1: quan hệ giữa 1 khóa chính và 1 khóa ngoại
*  1 - n: quan hệ giữa 1 khóa chính và nhiều khóa ngoại
*  n - n: quan hệ giữa nhiều khóa chính và nhiều khóa ngoại

**Relationship (Quan hệ giữa các bảng):**
Mối quan hệ liên kết giữa các bảng trong database 

![](https://images.viblo.asia/b257923f-fdd2-414b-8ac2-73b644529b26.png)



#  Các nhóm lệnh SQL
  **DDL - Data Definition Language (Ngôn ngữ định nghĩa dữ liệu)**
*   CREATE: Tạo bảng mới, view của bảng và các đối tượng khác trong cơ sở dữ liệu.
*   ALTER: Chỉnh sửa các đối tượng dữ liệu đã có, như bảng.
*   DROP: Xóa toàn bộ bảng, view của bảng hoặc các đối tượng khác trong cơ sở dữ liệu.
*   TRUNCATE: Được sử dụng để xóa tất cả các bản ghi trong bảng.
*   COMMENT: Được sử dụng để bình luận vào từ điển dữ liệu.
*   RENAME: Được sử dụng để đổi tên các đối tượng trong database.

**DML - Data Manipulation Language (Ngôn ngữ để thao tác với dữ liệu)**
*   INSERT: Chèn dữ liệu mới vào cơ sở dữ liệu.
*   UPDATE: Sửa đổi, cập nhật dữ liệu trong cơ sở dữ liệu.
*   DELETE: Xóa dữ liệu từ cơ sở dữ liệu.

**DQL - Data Query Language (Ngôn ngữ truy vấn dữ liệu)**
*   SELECT: Trích xuất bản ghi cụ thể từ một hoặc nhiều bảng

**DCL - Data Control Language (Ngôn ngữ kiểm soát dữ liệu)**
*   GRANT: Cấp đặc quyền cho user
*   REVOKE: Lấy lại quyền đã cấp cho user


# Các câu lệnh SQL đơn giản
**1. Câu lệnh truy vấn (Query)** <br>
Được sử dụng để lấy dữ liệu từ một bảng trong Database và trả về dữ liệu ở dạng bảng dữ liệu kết quả.

```
SELECT column1, column2, ...
FROM table_name;
```

**2. Câu lệnh Insert** <br>
Được dùng để chèn dữ liệu vào bảng trong cơ sở dữ liệu

- Liệt kê các cột được thêm dữ liệu vào
```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

- Thêm vào tất cả các cột trong bảng
```
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

**3. Câu lệnh update** <br>
Được dùng để thay đổi dữ liệu trong bảng

```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

**4. Câu lệnh Delete (Xóa)** <br>
Được dùng để xóa bản ghi trong bảng 

```
DELETE FROM table_name WHERE condition;
```

# Các mệnh đề trong SQL
**1. Mệnh đề Where** <br>
Mệnh đề Where dùng để đặt điều kiện khi truy vấn

```
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

**2. Mệnh đề Like** <br>
Dùng để tìm kiếm mẫu xác định trong cột

```
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```

**3. Mệnh đề Having** <br>
Mệnh đề HAVING trong SQL cho phép bạn chỉ định điều kiện lọc mà kết quả nhóm xuất hiện trong kết quả. Mệnh đề WHERE đặt các điều kiện trên các cột đã lựa chọn, trong khi mệnh đề HAVING đặt các điều kiện trên các nhóm đã được tạo bởi mệnh đề GROUP BY.

```
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

**4. Mệnh đề Order By** <br>
    Được dùng để sắp xếp bản ghi truy vấn được theo trật tự mong muốn
    
```
SELECT column1, column2, ... 
FROM table_name 
ORDER BY column1, column2, ... ASC|DESC;
```

# Các toán tử và hàm thường dùng
**1. SQL Join** <br>
Dùng để kết hợp 2 hoặc nhiều bảng có quan hệ với nhau, có các loại Join khác nhau: 

* (INNER) JOIN: Trả về các bản ghi khớp với giá trị của 2 bảng.
* LEFT JOIN: Trả về tất cả bản ghi bên trái bảng, và khớp với các bản ghi bên phải bảng.
* RIGHT JOIN: Trả về tất cả bản ghi bên phải bảng, và khớp với các bản ghi bên trái bảng.
* FULL JOIN: Trả về tất cả các bản ghi bên trái và phải bảng.

![](https://images.viblo.asia/a0ee9f20-ac75-4309-bf11-4ff80d27850b.jpg)

**2. Toán tử IN** <br>
Toán tử IN nhằm bổ sung cho tiêu chí tìm kiếm, cho phép bạn chỉ định nhiều giá trị trong mệnh đề Where

```
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);
```

**3. Toán tử Between** <br>
Toán tử Between cho phép chọn các giá trị trong một phạm vi nhất định, các giá trị này có thể là số, văn bản hoặc ngày.

```
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

**5. Các hàm Count(), Avg(), Sum()** <br>
* Hàm Count() trả về số lượng hàng khớp với một tiêu chí đã chỉ định

```
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
```

* Hàm Avg() trả về giá trị trung bình của một cột số, ta chỉ có thế sử dụng hàm Avg() với những cột là dạng số

```
SELECT AVG(column_name)
FROM table_name
WHERE condition;
```

* Hàm Sum() trả về tổng của một cột số, ta chỉ có thế sử dụng hàm Sum() với những cột là dạng số.

```
SELECT SUM(column_name)
FROM table_name
WHERE condition;
```

Bài viết cũng đã khá dài rồi, mình muốn note thêm còn một số thứ nâng cao của SQL như chuẩn hóa cơ sở dữ liệu,  Views, Trigger, stored procedures, ... Các bạn có thể tìm hiểu về những cái này thêm. 

Một số trang học SQL hay:  <br>
https://www.w3schools.com/sql/default.asp <br>
https://www.mysqltutorial.org/ <br>
https://www.geeksforgeeks.org/sql-tutorial/ <br>

**Kết luận:** Mong rằng qua bài viết, các bạn có thể hiểu tổng quát hơn về SQL, từ đó vận dụng vào công việc của bạn nhé :kissing_heart:.