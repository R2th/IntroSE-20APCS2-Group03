MySQL là Hệ thống quản lý cơ sở dữ liệu SQL quan hệ mã nguồn mở phổ biến nhất. MySQL là một trong những RDBMS tốt nhất đang được sử dụng để phát triển các ứng dụng phần mềm dựa trên web khác nhau. MySQL được phát triển, tiếp thị và hỗ trợ bởi MySQL AB, một công ty của Thụy Điển. 

Bài này mình có lượm nhặt một số function hữu ích thông dụng trong Mysql.

Để xuyên suốt trong quá trình truy vấn mình tạo một bảng tên là ```sinh_vien``` có dữ liệu sau:
```sql
SELECT * FROM sinh_vien;
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  1 | Craig   | Quan tri doanh nghiep   |8      |
|  2 | Craig   | Toan Cao cap            |9      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  4 | Emma    | Lap trinh C             |8      |
|  5 | Lee     | Lap tring C#            |7      |
|  6 | James   | Toan hoc va giai thuat  |10     |
|  7 | Harry   | Mo hinh toan            |9      |
|  8 | John    | Tu tuong Mac-Lenin      |8      |
+----+---------+-------------------------+-------+
```
Bắt đầu nhé:
## 1. SUM
Hàm ```SUM``` trong MySQL được sử dụng để tìm tổng của một trường trong các bản ghi trong bảng.

Nếu muốn tính tổng của tất cả điểm trong cột ```diem```, ta sử dụng lệnh sau:
```sql
SELECT SUM(diem) FROM sinh_vien
```
Kết quả:
```sql
+-----------+
| SUM(diem) |
+-----------+
| 66        |
+-----------+
```
Bạn có thể tính tổng của các bản ghi bởi sử dụng mệnh đề GROUP BY. Ví dụ sau tính tổng tất cả bản ghi liên quan tới một người:
```sql
SELECT ho_ten, SUM(diem)
FROM sinh_vien GROUP BY ho_ten;
```
Kết quả:
```sql
+---------+---------+
| ho_ten  |SUM(diem)|
+---------+---------+
| Craig   |17       |
| Emma    |8        |
| Harry   |9        |
| James   |10       |
| John    |8        |
| Lee     |14       |
+---------+---------+
```

## 2. MAX
Hàm MySQL MAX được sử dụng để tìm ra bản ghi có giá trị lớn nhất trong một bộ bản ghi.
Bây giờ, dựa vào bảng trên, bạn muốn lấy giá trị lớn nhất trong cột ```diem```, bạn sử dụng lệnh sau:
```sql
SELECT MAX(diem) FROM sinh_vien;
```
Kết quả:
```sql
+-----------+
| MAX(diem) |
+-----------+
|    10     |
+-----------+
```
Nếu trong bảng dữ liệu của bạn có nhiều bản ghi có trùng tên chẳng hạn, bạn có thể tìm giá trị lớn nhất cho ```ho_ten``` bởi sử dụng mệnh đề ```GROUP BY```, như sau:
```sql
SELECT id, ho_ten, MAX(diem) FROM sinh_vien GROUP BY ho_ten;
```
Kết quả:
```sql
+----+---------+---------+
| id | ho_ten  |MAX(diem)|
+----+---------+---------+
| 1  | Craig   |9        |
| 4  | Emma    |8        |
| 7  | Harry   |9        |
| 6  | James   |10       |
| 8  | John    |8        |
| 3  | Lee     |7        |
+----+---------+---------+
```
## 3. MIN
Hàm MIN trong MySQL được sử dụng để tìm bản ghi với giá trị nhỏ nhất trong một tập hợp bản ghi.

Bây giờ, dựa vào bảng trên, bạn muốn lấy giá trị nhỏ nhất của cột ```diem```, bạn sử dụng lệnh sau:
```sql
SELECT MIN(diem) FROM sinh_vien;
```
Kết quả:
```sql
+-----------+
| MIN(diem) |
+-----------+
|    7      |
+-----------+
```
Bạn có thể tìm giá trị nhỏ nhất cho cột ```ho_ten``` bởi sử dụng mệnh đề ```GROUP BY```, như sau:
```sql
SELECT id, ho_ten, MIN(diem)
FROM sinh_vien GROUP BY ho_ten;
```
Kết quả là:
```sql
+----+---------+---------+
| id | ho_ten  |MAX(diem)|
+----+---------+---------+
| 1  | Craig   |8        |
| 4  | Emma    |8        |
| 7  | Harry   |9        |
| 6  | James   |10       |
| 8  | John    |8        |
| 3  | Lee     |7        |
+----+---------+---------+
```

Hàm MIN trong MySQL
Bạn cũng có thể sử dụng hàm MIN cùng với hàm MAX để tìm giá trị nhỏ nhất như sau:
```sql
SELECT MIN(diem) min, MAX(diem) max
FROM sinh_vien;
```
Kết quả:
```sql
+---------+----------+
|   min   |   max    |
+---------+----------+
|   7     |  10      |
+---------+----------+
```
## 4. AVG
Hàm AVG trong MySQL được sử dụng để tìm giá trị trung bình của một trường trong các bản ghi đa dạng.
Bây giờ, dựa vào bảng trên, bạn muốn tính trung bình của tất cả các điểm trong cột  ```diem``` bạn sử dụng lệnh sau:
```sql
SELECT AVG(diem)
FROM sinh_vien;
 ```   
Kết quả:    
```sql
+------------+
| AVG(diem)  |
+------------+
|   8.2500   |
+------------+
```
Bạn có thể lấy giá trị trung bình của các bản ghi đa dạng bởi sử dụng mệnh đề ```GROUP BY```. Ví dụ sau lấy giá trị trung bình của tất cả bản ghi liên quan tới một sinh viên:
```sql
SELECT id, ho_ten, AVG(diem)
FROM sinh_vien GROUP BY ho_ten;
```
Kết quả:
```sql
+----+---------+---------+
| id | ho_ten  |MAX(diem)|
+----+---------+---------+
| 1  | Craig   |8.5000   |
| 4  | Emma    |8.0000   |
| 7  | Harry   |9.0000   |
| 6  | James   |10.0000  |
| 8  | John    |8.0000   |
| 3  | Lee     |7.0000   |
+----+---------+---------+
```

## 5. COUNT
Hàm ```COUNT``` trong MySQL là hàm đơn giản nhất và rất có ích trong việc đếm số bản ghi, được mong chờ để trả về từ một lệnh SELECT.

Mệnh đề ```GROUP BY``` trong MySQL
Bạn muốn đếm tổng số hàng trong bảng này, ta có lệnh:
```sql
SELECT COUNT(*) FROM sinh_vien;
```
Kết quả
```sql
+---------------------------+
| COUNT(*)                  |
+---------------------------+
| 8                         |
+---------------------------+
```
Tương tự, nếu bạn muốn đếm tổng số bản ghi có ```diem``` bằng 9, ta thực hiện:
```sql
SELECT COUNT(*) FROM sinh_vien
WHERE diem = 9;
```
Kết quả
```sql
+----------+
| COUNT(*) |
+----------+
|        2 |
+----------+
```
## 6. IN Clause 
Bạn có thể sử dụng mệnh đề ```IN``` để thay thế nhiều điều kiện ```OR```
Giả sử dựa trên bảng trên bạn muốn hiển thị các bản ghi với ```diem``` bằng 7, 9 và 10. Điều này có thể được thực hiện bằng các điều kiện ```OR``` như sau
```sql
SELECT id, ho_ten, mon_hoc, diem FROM sinh_vien 
WHERE diem = 7 OR diem = 9 OR diem = 10; 
```
Kết quả:
```sql
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  2 | Craig   | Toan Cao cap            |9      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  5 | Lee     | Lap tring C#            |7      |
|  6 | James   | Toan hoc va giai thuat  |10     |
|  7 | Harry   | Mo hinh toan            |9      |
+----+---------+-------------------------+-------+
```

Tương tự có thể sử dụng mệnh đề ```IN``` như sau mà vẫn đạt được kết quả như vậy:
```sql
SELECT id, ho_ten, mon_hoc, diem FROM sinh_vien 
WHERE diem IN (7, 9, 10 );
```
Kết quả:
```sql
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  2 | Craig   | Toan Cao cap            |9      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  5 | Lee     | Lap tring C#            |7      |
|  6 | James   | Toan hoc va giai thuat  |10     |
|  7 | Harry   | Mo hinh toan            |9      |
+----+---------+-------------------------+-------+
```
## 7. BETWEEN Clause
Bạn có thể sử dụng ```BETWEEN``` để thay thế một sự kết hợp của điều kiện "lớn hơn hoặc bằng VÀ bé hơn hoặc bằng".

Giả sử dựa theo bảng sinh_vien, bạn muốn tìm thông tin sinh viên có điểm thi từ 7 đến 8 điểm. Điều này có thể được thực hiện bằng cách sử dụng >= và <= điều kiện như sau:
```sql
SELECT * FROM sinh_vien 
WHERE diem >= 7 AND diem <= 8;
```
```sql
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  1 | Craig   | Quan tri doanh nghiep   |8      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  4 | Emma    | Lap trinh C             |8      |
|  5 | Lee     | Lap tring C#            |7      |
|  8 | John    | Tu tuong Mac-Lenin      |8      |
+----+---------+-------------------------+-------+
```

Ta sử dụng ```BETWEEN```:
```sql
SELECT * FROM sinh_vien 
WHERE diem BETWEEN 7 AND 8; 
```
Và kết quả cũng trả về như vậy:
```sql
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  1 | Craig   | Quan tri doanh nghiep   |8      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  4 | Emma    | Lap trinh C             |8      |
|  5 | Lee     | Lap tring C#            |7      |
|  8 | John    | Tu tuong Mac-Lenin      |8      |
+----+---------+-------------------------+-------+
```

Tham khảo nguồn: 

https://www.tutorialspoint.com/mysql/mysql-useful-functions.htm