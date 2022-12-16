# 6. Update Data Cho Các Bản Ghi
Khi bạn muốn thay đổi các giá trị trong 1 hoặc nhiều Row chúng ta có thể sử dụng câu lệnh sau:

**Cú pháp:**
```
UPDATE table_name SET column1=value1,column2=value2,… WHERE some_column=some_value;
```

**Ví dụ:**
- Thay đổi giá trị của Column **Department** thành “Manpower”  nếu như Column đó có giá trị  “HR”

```
Update Employee SET Department='Manpower' where Department='HR';
```
# 7. Show Unique Values
Với nhiều Row trong 1 Column thì có thể sẽ có nhiều giá trị trùng với nhau. Để có thể liệt kê những giá trị trong 1 Column mà không bị trùng lặp. Chúng ta có câu lệnh:

**Cú pháp:**
```
SELECT DISTINCT column_name,column_name FROM table_name;
```

**Ví dụ:**
- Show tên các thành phố có trong thành Table Employee
```
Select distinct City from Employee;
```

![](https://images.viblo.asia/5dcf3d76-b903-4553-9e9d-553fb47995d6.png)
# 8. Tạo Column Mới Từ Biểu Thức
Ngoài show các Column của 1 Table, bạn có thể show thêm các Column mà tự tạo ra bằng câu lệnh sau:

**Cú pháp:**
```
Select column_name, ..., expression AS new_column from table_name;
```

**Ví dụ:**
- Tạo 1 Column mới với tên là Incentive và show 10% giá trị của Column Total_Payout
```
Select *, Total_Payout*01 as Incentive from Employee;
```
![](https://images.viblo.asia/97205b6f-8256-4133-8d83-e95ff405f944.png)

- Tạo 1 Column mới với tên là City_Code và show 3 ký tự cuối của Column City
```
Select *, Left(City,3) as City_Code from Employee where Department="Admin";
```
![](https://images.viblo.asia/939990e2-eb34-48e9-a266-85d538ee4f00.png)
# 9. JOIN TABLE
Không phải lúc cũng lấy được các giá trị cần thiết trong 1 Table. Vì SQL có chức năng có thể kết hợp dữ liệu từ 2 Table  hoặc nhiều bảng khác nhau thông qua một khóa chung. Chức năng tương này được lại là **JOIN**. Có 4 loại chính:
- INNER JOIN: Trả về các Row khi có khóa chung phù hợp trong cả 2 Table 
- LEFT JOIN: Trả lại tất cả các Row từ Table bên trái và các Row khớp từ Table bên phải
- RIGHT JOIN: Trả lại tất cả các Row từ Table bên phải và các Row khớp từ Table bên trái
- FULL JOIN: Trả lại tất cả các Row từ cả 2 Table, và điền vào đó giá trị NULL cho các giá trị không so khớp nhau.

**Cú pháp:**
```
SELECT table1.column1, table2.column2..... FROM table1 INNER | LEFT| RIGHT| FULL JOIN table2 ON table1.column = table2.column;
```

**Ví dụ:**
- Để hiển thị tất cả các Row của Table Employee. Vì vậy, sẽ sử dụng LEFT JOIN
```
SELECT Employee.*,City_Cat.City_Category FROM Employee LEFT JOIN City_Cat ON Employee.City = City_Cat.City;
```
![](https://images.viblo.asia/aba83e49-31e7-48e2-9038-b74212f72e6b.png)
# 10. GROUP BY
Để thao tác tính trên 1 Column nhất định nào đấy. Trong SQL có lệnh  GROUP BY để xử lý việc này.

**Cú pháp:**
```
SELECT column, aggregate_function(column) FROM table WHERE column operator value GROUP BY column;
```

**Ví dụ:**
- Hiển thị tổng của Total_Payout theo giới tính
```
SELECT Gender, Sum(Total_Payout) from Employee Group by Gender;
```
![](https://images.viblo.asia/49d86639-1b2a-4bde-9b9a-afb8d9c12719.png)

- Hiển thị tổng số Total_Payout và đếm Row theo giới tính và thành phố
```
SELECT Gender, City, Count(City), Sum(Total_Payout) from Employee Group by Gender, City;
```
![](https://images.viblo.asia/1636abb6-f31d-4ef1-b16e-09e6863f7ead.png)
# PHẦN KẾT
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.