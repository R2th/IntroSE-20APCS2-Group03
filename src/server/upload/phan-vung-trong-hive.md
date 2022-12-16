Sau khi kết thúc seri hướng dẫn thao tác cơ bản với table trong Hive, ta cùng đến với bài hướng dẫn về việc phân vùng trong Hive, bài này có sử dụng các bước thao tác cơ bản với table nên khá là dễ, cùng theo dõi nhé. 

Hive tổ chức các bảng thành các phân vùng. Đó là một cách chia bảng thành các phần liên quan dựa trên các giá trị của các cột được phân vùng như date, city và department. Sử dụng phân vùng, dễ dàng để truy vấn một phần dữ liệu. 

Các bảng hoặc phân vùng được chia thành các bucket, để cung cấp cấu trúc bổ sung cho dữ liệu có thể được sử dụng để truy vấn hiệu quả hơn. Bucket hoạt động dựa trên giá trị của hàm băm của một số cột của bảng.

Ví dụ, một bảng tên Tab1 chứa dữ liệu employee như id, name, dept, và yoj (year of joining). Giả sử bạn cần truy xuất thông tin chi tiết của tất cả nhân viên đã tham gia vào năm 2012. Một truy vấn tìm kiếm toàn bộ bảng để biết thông tin bắt buộc. Tuy nhiên, nếu bạn phân vùng dữ liệu nhân viên theo năm và lưu trữ nó trong một tệp riêng biệt, việc này sẽ giảm thời gian xử lý truy vấn. Ví dụ sau đây cho thấy cách phân vùng một tệp và dữ liệu của nó: 

File sau đây chứa bảng employeedata.
/tab1/employeedata/file1
```
id, name, dept, yoj
1, gopal, TP, 2012
2, kiran, HR, 2012
3, kaleel,SC, 2013
4, Prasanth, SC, 2013
```

Dữ liệu ở trên được phân vùng vào 2 files sử dụng year 

/tab1/employeedata/2012/file2
```
1, gopal, TP, 2012
2, kiran, HR, 2012
```
/tab1/employeedata/2013/file3
```
3, kaleel,SC, 2013
4, Prasanth, SC, 2013
```

# 1. Thêm một phân vùng
Chúng ta có thể thêm phân vùng vào bảng bằng việc thay đổi bảng. Giả sử chúng ta có một bảng gọi là employee với trường như Id, Name, Salary, Designation, Dept, và yoj.

Cú pháp:
```
ALTER TABLE table_name ADD [IF NOT EXISTS] PARTITION partition_spec
[LOCATION 'location1'] partition_spec [LOCATION 'location2'] ...;

partition_spec:
: (p_column = p_col_value, p_column = p_col_value, ...)
```

Câu truy vấn sau được sử dụng để thêm 1 phân vùng vào bảng employee.

```
hive> ALTER TABLE employee
> ADD PARTITION (year=’2012’)
> location '/2012/part2012';
```

# 2. Đổi tên phân vùng 
Cú pháp:

```
ALTER TABLE table_name PARTITION partition_spec RENAME TO PARTITION partition_spec;
```

Câu truy vấn được sử dụng để thay tên một phân vùng:
```
hive> ALTER TABLE employee PARTITION (year=’1203’)
   > RENAME TO PARTITION (Yoj=’1203’);
```

# 3. Xoá một phân vùng
Cú pháp xoá 1 phân vùng:

```
ALTER TABLE table_name DROP [IF EXISTS] PARTITION partition_spec, PARTITION partition_spec,...;
```

Câu truy vấn sau được sử dụng để xoá một phân vùng:
```
hive> ALTER TABLE employee DROP [IF EXISTS]
   > PARTITION (year=’1203’);
```


That's all. Một trong những bài ngắn nhất của series Hive. Chúc mọi người cuối tuần vui vẻ ^^.