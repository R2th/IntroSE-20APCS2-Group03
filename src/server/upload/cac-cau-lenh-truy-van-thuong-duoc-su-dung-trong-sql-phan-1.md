# 1. View Data
Để có thể lấy các bản ghi từ 1 bảng trong cơ sở dữ liệu luôn là điều cần thiết đối với những người sử dụng SQL.

**Cú pháp:**
```
SELECT column_1,column_2,…column_n | *  FROM table_name;
```
**Ví dụ:**
- Để lấy tất cả các field trong bản ghi:
```
Select * from Employee
```

![](https://images.viblo.asia/58fb6e19-d202-44c5-b32a-f8382f635fc1.png)

- Nếu như bạn chỉ muốn lấy 1 vài colum trong bản ghi:
```
Select ECODE, Gender from Employee
```

![](https://images.viblo.asia/2f2f2c0a-7269-4b08-8313-1b433a0efc64.png)

# 2. Sort Data
Sắp xếp các bản ghi theo 1 thứ tự trở nên quan trọng khi bạn có nhiều dữ liệu hơn. Điều này giúp bạn dễ dàng quan sát thông tin và nhanh chóng tổ chức 1 hệ thống dữ liệu cần thiết.

**Cú pháp:**
```
SELECT column_1,column_2,…column_n | *  FROM table_name order by column_1 [desc/ asc], column_2 [desc/asc];
```

Điều đầu tiên để ý trong cú pháp trên là ``order by column [desc]``:

- ``order by column``:  column mà bạn muốn lấy làm tiêu chuẩn để sắp xếp.
- ``[desc/asc]``: lựa chọn kiểu sắp xếp theo tăng dần hoặc giảm dần.

**Ví dụ:** 

Bạn muốn sắp xếp các bản ghi dựa trên **Tổng Tiền Thanh Toán - Total_Payout** và theo thứ tự **Giảm Dần - desc**.
```
Select * from Employee order by Total_Payout desc;
```

![](https://images.viblo.asia/d6d1f004-a7d4-4e66-992e-bf4f6e1582dc.png)

# 3. Filter Data
Ngoài việc sắp xếp, việc lọc để phân tích dữ liệu cũng không thể thiếu. Khi dữ liệu được lọc, chỉ những bản ghi phù hợp với tiếu chí mới được hiện thị khi truy vấn.

**Cú pháp:**

```
SELECT column_1,column_2,…column_n | *  FROM table_name where column_1 operator value;
```

Dưới đây là danh sách các toán tử để tạo điều kiện:
| Điều kiện | Giải thích |
| - | - |
| =	|Bằng nhau |
| <> |	Khác nhau |
| >	| Lớn hơn |
| <	|Nhỏ hơn |
| >= |	Lớn hơn hoặc bằng |
| <=	| Nhơ hơn hoặc bằng |
| BETWEEN	| Trong khoảng giá trị |
| LIKE	| Tìm kiếm theo mẫu|
| IN | Chỉ định nhiều giá trị |

**Ví dụ:**
- Để truy vẫn các bản ghi thuộc thành phố Delhi, chúng ta có câu lệnh:
```
Select * from Employee where City="Delhi";
```

![](https://images.viblo.asia/37fa4c02-3b79-4b47-b689-6a83d06f4204.png)

- Lấy các bản ghi có Department là Admin và Total_Payout lớn hơn hoặc bằng 500:
```
Select * from Employee where Department="Admin" and Total_Payout >=500;
```

![](https://images.viblo.asia/8b838302-b234-4051-8412-625ce76d596a.png)

# 4. Delete Records
Lệnh DELETE giúp loại bỏ các bản ghi từ một bảng tuy thuộc vào điều kiện đưa ra.

**Cú pháp:**
```
DELETE FROM table_name WHERE some_column=some_value;
```
**Ví dụ:**
- Xóa các bản ghi có Total_Payout  lớn hơn hoặc bằng 600:
```
Delete * from Employee where Total_Payout >=600;
```

- Xóa các bản ghi có Department là Admin và Total_Payout lớn hơn hoặc bằng 600:

```
Delete * from Employee where Total_Payout >=600 and Department ="Admin";
```

# 5. Add Records
Ngoài việc xóa thì chúng ta có thể thêm các bản ghi vào bảng.

**Cú pháp:**
```
INSERT INTO table_name VALUES (value1, value2, value3,…); -> Insert values to all columns
```
**OR**
```
NSERT INTO table_name (column1,column2,column3,…) VALUES (value1,value2,value3,…); -> Insert values to selected columns
```
**Ví dụ:**
- Thêm bản ghi:
```
Insert into employee values('A002','05-Nov-12',0.8,'Female','Admin',12.05,26,313.3,'Mumbai');
```
Sau khi thực hiện xong chúng ta cùng kiểm tra bản ghi được thêm:
```
Select * from Employee where ECODE='A002';
```

![](https://images.viblo.asia/5de068bc-d3b7-4ec8-9d8a-e2159d434cb5.png)

# PHẦN KẾT
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.