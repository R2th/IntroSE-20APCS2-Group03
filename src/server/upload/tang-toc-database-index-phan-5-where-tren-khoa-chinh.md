Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Nếu các bạn chưa đọc bài trước có thể đọc tại link này[ Tăng tốc database index phần 4 - Index chậm](https://viblo.asia/p/tang-toc-database-index-phan-4-index-cham-RnB5pOOrlPG)


Trong những phần trước mình đã mô tả về cách index hoạt động và nguyên nhân làm index chậm, trong các phần sau mình sẽ mô tả cách phát hiện mà tránh những vấn đề này, bắt đầu với WHERE.
Lệnh WHERE xác định điều kiện tìm kiếm của một câu lệnh SQL vì vậy việc sử dụng index với where rất quan trọng quyết định tốc độ truy vấn dữ liệu. Mặc dù WHERE là một lệnh ảnh hưởng siêu to khổng lồ tới hiệu năng nhưng nó lại thường không được hiểu đúng,  dẫn tới database phải quét qua rất nhiều index. Một lệnh truy vấn chậm thường có nguyên nhân đầu tiên là một lệnh WHERE viết cùi.

Phần lệnh WHERE này mình sẽ trình bày các điều kiện các toán tử cũng như cách nó ảnh hưởng tới index trong điều kiện where và cách sử dụng index để có thể đáp ứng được nhiều câu truy vấn nhất.
Toán tử đầu tiên cần quan tâm là toán tử bằng (=). Toán tử này là toán tử cơ bản nhất và được sử dụng nhiều nhất trong SQL. Các lỗi index rất hay gặp phải với toán tử này đặc biệt là khi điều kiện where chứa nhiều điều kiện ví dụ WHERE A=B AND C=D ...
Phần này mình sẽ mô tả cách dùng index, và đặc biệt mô tả cách tối ưu index khi truy vấn với điều kiện where kết hợp nhiều toán tử bằng.

Trước hết sẽ là truy vấn toán tử bằng trên khóa chính (Primary Key)
ví dụ có một bảng nhân viên như sau

 ```
 CREATE TABLE employees (
   employee_id   NUMBER         NOT NULL,
   first_name    VARCHAR2(1000) NOT NULL,
   last_name     VARCHAR2(1000) NOT NULL,
   date_of_birth DATE           NOT NULL,
   phone_number  VARCHAR2(1000) NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
)
```
 
 Database sẽ tự tạo index trên khóa chính (employee_id) dù bạn có dùng lệnh tạo hay không tạo đi nữa. Giả sử bạn muốn lấy họ tên nhân viên có ID là 123, ta sẽ dùng câu lệnh sau
```
 SELECT first_name, last_name
  FROM employees
 WHERE employee_id = 123
```

Lệnh này chỉ trả về một bản ghi duy nhất, do khóa chính bắt buộc phải là duy nhất, bạn nào k rõ có thể xem tại [đây](https://en.wikipedia.org/wiki/Primary_key). Trong trường hợp này database không cần duyệt qua các leaf node chỉ cần duyệt tree  là đã OK rồi. Dưới đây là mô tả execution plan của một bài loại DB phổ biến với câu lệnh trên để xác nhận mình không chém gió.

MYSQL
```
+----+-----------+-------+---------+---------+------+-------+
| id | table     | type  | key     | key_len | rows | Extra |
+----+-----------+-------+---------+---------+------+-------+
|  1 | employees | const | PRIMARY | 5       |    1 |       |
+----+-----------+-------+---------+---------+------+-------+
```
loại *const* trong MYSQL tương ứng với  INDEX UNIQUE SCAN trong Oracle

```
---------------------------------------------------------------
|Id |Operation                   | Name         | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT            |              |    1 |    2 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |    1 |    2 |
|*2 |  INDEX UNIQUE SCAN         | EMPLOYEES_PK |    1 |    1 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("EMPLOYEE_ID"=123)
```

Với SQL Server thì có khác môt chút
```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:employees_pk,
   |               SEEK:employees.employee_id=@1
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```
SQL Server sử dùng Index Seek tương ứng với INDEX RANGE SCAN  và RID Lookup tương ứng với TABLE ACCESS BY ROWID trong Oracle. Khác với Oracle SQL Server dùng Nested Loops join (chi tiết các loại join sẽ có trong các bài sau) giữa index và table data để lấy dữ liệu.

Trong phần trên ta thấy Oracle dùng INDEX UNIQUE SCAN, với phương pháp này chỉ cần duyệt tree là lấy được dữ liệu, nó sẽ chạy rất nhanh không phụ thuộc vào độ lớn của bảng như được mô tả trong phần [B-TRee](https://viblo.asia/p/tang-toc-database-index-phan-3-b-tree-GrLZDBBn5k0)
Sau khi lấy được cục index thích hợp, data base cần 1 bước nữa là lấy dữ liệu trong bảng (Trường first_name và last_name) đó là bước TABLE ACCESS BY ROWID bước này có thể là nguyên nhân gây chậm như được mô tả trong bài [Index Chậm](https://viblo.asia/p/tang-toc-database-index-phan-4-index-cham-RnB5pOOrlPG). Nhưng vì chỉ có một kết quả trả về duy nhất, nên bước này cũng chỉ phải chọc vào dữ liệu của bảng một lần duy nhất nên cũng không bị chậm. Vì vây các vấn đề gây nên việc truy vấn chậm ở phần trước ( Duyệt qua leaf node, lấy dữ liệu trong bảng) không hề xảy ra với kiểu truy vấn theo khóa chính này, nên cách truy vấn bằng theo khóa chính không gây chậm.
Vậy ít ra đã biết rằng dù dữ liệu to nhỏ mặc lòng khi cần tìm kiếm theo Primary Key thì cứ vô tư đi, không thể nào chậm được. Vậy những trường hợp nào chậm nhỉ? Từ từ mình sẽ trình bày sau, serries này còn rất rất dài, các bạn chờ xem nhé!

Link phần sau[ Tăng tốc database index phần 6 -Index kết hợp](https://viblo.asia/p/tang-toc-database-index-phan-6-index-ket-hop-vyDZOBRkKwj)