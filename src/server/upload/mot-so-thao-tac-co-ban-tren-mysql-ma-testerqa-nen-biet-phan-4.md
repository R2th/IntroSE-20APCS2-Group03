## I. Cách liệt kê tất cả các table và column trong Database

### 1. Cách liệt kê tất cả các Table

Sử dụng cú pháp bên dưới, bạn có thế liệt kê được các tables đang có trong Database:

```
SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' and TABLE_SCHEMA = '{Schema Name}';
```

**Ví dụ:**

```
SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' and TABLE_SCHEMA = 'thuong';
```

**Kết quả**

![](https://images.viblo.asia/36e68cdb-ac6b-43fa-b408-c5b7ed1338bb.png)


### 2. Cách liệt kê tất cả các column 

Việc liệt kê column 'xx' nào đó đang thuộc ở những table nào có thể giúp QA chúng ta nhanh chóng xác định được quan hệ dữ liệu liên kết giữa các table với nhau, một phần hỗ trợ việc nắm bắt được business của chức năng liên quan đồng thời giúp chúng ta thực hiện truy vấn các dữ liệu cần thiết nhanh hơn.

Cú pháp sử dụng:

*CÚ PHÁP 1:*
```
SELECT * 
FROM information_schema.columns 
WHERE column_name = 'My_Column'
```

**Ví dụ 1:**

```
SELECT * 
FROM information_schema.columns 
WHERE column_name = 'qa_code';
```

**Kết quả 1:**

![](https://images.viblo.asia/fc372be7-2bbb-442a-937c-29724edf1c70.png)


*CÚ PHÁP 2:*

```
SELECT  COLUMN_NAME AS 'ColumnName', TABLE_NAME AS  'TableName'
FROM    INFORMATION_SCHEMA.COLUMNS
WHERE   COLUMN_NAME LIKE '%columnname%'
ORDER BY    TableName ,ColumnName;
```

**Ví dụ 2:**

```
SELECT  COLUMN_NAME AS 'ColumnName', TABLE_NAME AS  'TableName'
FROM    INFORMATION_SCHEMA.COLUMNS
WHERE   COLUMN_NAME LIKE '%code%'
ORDER BY    TableName ,ColumnName;
```

**Kết quả 2**

![](https://images.viblo.asia/86f55c10-1eaa-46a1-a0f5-b4734191609d.png)

## II. Cách truy vấn lấy thông tin Column Name - Data type - Max-length trong một table

Cú pháp sử dụng:

```
SELECT column_name as 'Column Name', data_type as 'Data Type', character_maximum_length as 'Max Length'
FROM information_schema.columns
WHERE table_name = 'tbl_User' 
```

**Ví dụ:**  

```
SELECT column_name as 'Column Name', data_type as 'Data Type', character_maximum_length as 'Max Length'
FROM information_schema.columns
WHERE table_name = 'qa_member'; 
```

**Kết quả:**

![](https://images.viblo.asia/43c1d0ed-6db7-4674-96fe-3aa36936f2c5.png)


## III. Khái niệm ràng buộc (CONSTRAINT) trong MySQL

Các ràng buộc được sử dụng để xác định những quy tắc cho dữ liệu bên trong một bảng, nó sẽ giới hạn loại dữ liệu có thể thêm vào bên trong bảng. Điều này đảm bảo tính chính xác, độ tin cậy của dữ liệu nằm ở bên trong bảng. Nếu có bất kỳ vi phạm nào giữa ràng buộc và hành động dữ liệu thì hành động dữ liệu đó sẽ bị hủy bỏ.

Dưới đây là các ràng buộc (CONSTRAINT) thường được sử dụng:

 **NOT NULL:**

   Thiết lập việc một cột không được phép chứa giá trị NULL

**UNIQUE**
  
   Thiết lập việc dữ liệu trong một cột không được phép trùng

**PRIMARY KEY**
 
Kết hợp giữa NOT NULL & UNIQUE (cột không được phép chứa giá trị NULL & dữ liệu không được trùng nhau)

**FOREIGN KEY**

Xây dựng một mối liên kết giữa hai cái bảng nhằm đảm bảo tính "toàn vẹn dữ liệu" của các bảng (khi trong hai cái bảng đó, có một bảng tham chiếu đến dữ liệu của cái bảng còn lại)

**CHECK**

Giới hạn phạm vi giá trị được nhập vào bên trong cột.

**DEFAULT**

Thiết lập giá trị mặc định cho cột trong trường hợp chúng ta chèn một hàng mới vào trong bảng mà không gán giá trị cho cột này.

**INDEX**

Lập chỉ mục cho các cột để cải thiện tốc độ truy xuất dữ liệu từ cơ sở dữ liệu.




Refer:
http://webcoban.vn/