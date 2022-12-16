Đây là bài cuối cùng trong series Hive rồi, sắp tới mình sẽ ra thêm một số bài về HiveQL nữa, mọi người cùng theo dõi nha :hugs::hugs:

# View

Bài viết này mô tả cách tạo và quản lý view.  View được tạo dựa trên yêu cầu của người dùng.  Bạn có thể lưu bất kỳ dữ liệu tập kết quả nào dưới dạng view.  Cách sử dụng view trong Hive giống như trong SQL. Đây là một khái niệm RDBMS tiêu chuẩn.  Chúng ta có thể thực hiện tất cả các hoạt động DML trên một khung nhìn.

Giống như trong SQL, một khung nhìn VIEW là một bảng ảo trong cơ sở dữ liệu có nội dung được định nghĩa thông qua một câu lệnh SQL nào đó. Một VIEW bao gồm các hàng và cột giống như một bảng thực. Các trường trong một khung nhìn là các trường từ một hoặc nhiều bảng thực trong Database.

Điểm khác biệt giữa khung nhìn VIEW và bảng là VIEW không được xem là một cấu trúc lưu trữ dữ liệu tồn tại trong cơ sở dữ liệu. Thực chất dữ liệu quan sát được trong VIEW được lấy từ các bảng thông qua câu lệnh truy vấn dữ liệu và được sử dụng để hạn chế truy cập cơ sở dữ liệu hoặc để ẩn dữ liệu phức tạp.

### Tạo view 

Bạn có thể tạo  một view tại thời điểm thực thi một câu lệnh SELECT. Cú pháp như sau:
```
CREATE VIEW [IF NOT EXISTS] view_name [(column_name [COMMENT column_comment], ...) ]
[COMMENT table_comment]
AS SELECT ...
```

### Ví dụ 

Chúng ta sẽ cùng lấy một ví duj về view. Giả sử bảng employee được cho bên dưới, với các trường Id, Name, Salary, Designation và Dept. Tạo một câu query để lấy thông tin chi tiết về employee người có lương cao hơn 30000 Rs. Chúng ta lưu trữ kết quả trong một view tên là emp_30000

```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1201  | Gopal        | 45000       | Technical manager | TP     |
|1202  | Manisha      | 45000       | Proofreader       | PR     |
|1203  | Masthanvali  | 40000       | Technical writer  | TP     |
|1204  | Krian        | 40000       | Hr Admin          | HR     |
|1205  | Kranthi      | 30000       | Op Admin          | Admin  |
+------+--------------+-------------+-------------------+--------+
```

Câu query sau đây lấy ra chi tiết của employee sử dụng kịch bản như trên:
```
hive> CREATE VIEW emp_30000 AS
SELECT * FROM employee
WHERE salary>30000;
```

### Xóa view

Sử dụng cú pháp sau để xóa một view:

```
DROP VIEW view_name
```

Câu truy vấn sau đây sẽ xóa một view tên là emp_30000:
```
hive> DROP VIEW emp_30000;
```

# Index
### Tạo index 

Một index (chỉ mục) không là gì ngoài một con trỏ trên một cột cụ thể của bảng.  Tạo một chỉ mục có nghĩa là tạo một con trỏ trên một cột cụ thể của bảng.  Cú pháp của nó như sau:

```
CREATE INDEX index_name
ON TABLE base_table_name (col_name, ...)
AS 'index.handler.class.name'
[WITH DEFERRED REBUILD]
[IDXPROPERTIES (property_name=property_value, ...)]
[IN TABLE index_table_name]
[PARTITIONED BY (col_name, ...)]
[
   [ ROW FORMAT ...] STORED AS ...
   | STORED BY ...
]
[LOCATION hdfs_path]
[TBLPROPERTIES (...)]
```

### Ví dụ 
Chúng ta cùng lấy một ví dụ về index. Sử dụng cùng bảng employee như trên với các trường Id, Name, Salary, Designation, Dept. Tạo một index tên là index_salary trên cột salary của bảng employee.

Câu truy vấn sau tạo một index:

```
hive> CREATE INDEX index_salary ON TABLE employee(salary)
AS 'org.apache.hadoop.hive.ql.index.compact.CompactIndexHandler';
```

Nó là một con trỏ trên cột salary. Nếu cột bị thay đổi, sự thay đổi được lưu trữ sử dụng một giá trị index.

### Xóa index 
Cú pháp sau đây được sử dụng để xóa index có tên index_salary:

```
DROP INDEX <index_name> ON <table_name>
```
Câu truy vấn sau xóa một index có tên index_salary:
```
hive> DROP INDEX index_salary ON employee;
```