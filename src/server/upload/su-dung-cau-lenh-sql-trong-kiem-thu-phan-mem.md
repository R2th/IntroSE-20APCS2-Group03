# 1. SQL và mục đích sử dụng SQL trong testing

 SQL là viết tắt của Structured Query Language, là ngôn ngữ cơ sở dữ liệu được sử dụng để tạo, thêm, sửa xóa dữ liệu trong cơ sở dữ liệu, … Tất cả các hệ quản trị cơ sở dữ liệu như MySQL, Oracle, MS Access, Sybase, Informix, Postgres và SQL Server sử dụng SQL như là ngôn ngữ cơ sở dữ liệu chuẩn.
 
**Vậy việc sử dụng SQL trong testing có mục đích gì? **

SQL được sử dụng để truy vấn các dữ liệu trong database phục vụ cho các mục đích test khác nhau liên quan đến dữ liệu của hệ thống. Ví dụ SQL được sử dụng trong Actual Data Testing( Kiểm thử dữ liệu thực) để kiểm tra nội dung của data có chính xác hay không...) 

Đối với 1 tester, Có 2 nhóm lệnh SQL chính mà chúng ta cần quan tâm:
1. Nhóm truy vấn dữ liệu: gồm các lệnh truy vấn lựa chọn(Select) để lấy thông tin nhưng không làm thay đổi dữliệu trong các bảng
2. Nhóm thao tác dữ liệu: Gồm các lệnh làm thay đổi dữ liệu (Insert, Delete, Update,…) lưu trong các bảng

Trong bài viết này, tôi sẽ giới thiệu các câu lệnh SQL cơ bản thường được sử dụng nhất để truy xuất dữ liệu khi thực hiện kiểm thử. Chúng ta hay cùng tìm hiểu về các câu lệnh và cách sử dụng chúng như thế nào nhé. 

# 2. Sử dụng SQL trong testing như thế nào?

## 2.1 Tìm hiểu về cấu trúc cơ sở dữ liệu

Trước khi thực hiện truy vấn dữ liệu bằng các câu lệnh SQL, trước hết, chúng ta cần tìm hiểu về cấu trúc cơ sở dữ liệu(CSDL) trước khi viết các câu lệnh truy vấn
- Chúng ta cần hiểu và nắm được các bảng CSDL cần dùng để truy vấn, quan hệ giữa các bảng ra sao,
- Nắm được định nghĩa các giá trị của các trạng thái trong 1 bảng

 VD: Đối với CSDL quản lý nhân viên: trong bảng nhân viên, ta cần nắm được 1 nhân viên có những trạng thái gì( đang đi làm, đã nghỉ việc, đang trong thời kì thai sản..) và tương ứng với những giá trị nào trong DB) 
 
##  2.2 Các câu lệnh SQL cơ bản 

### Câu lệnh SELECT
- Truy vấn lựa chọn một số trường của bảng:

    SELECT column1, column2, ...
    FROM TableName;
 
- Truy vấn lựa chọn tất cả các trường của bảng (lưu ý: truy vấn này ít dùng với database lớn)

    SELECT * FROM TableName

Lưu ý : Để trả về bản ghi không trùng lặp nhau ta có dùng câu lệnh DISTINCT như sau:

    SELECT DISTINCT column1, column2, ...
    FROM TableName;

VD: Ta có 1 hệ thống quản lý nhân viên gồm có bảng Department lưu thông tin về các phòng ban trong công ty. Để lấy ra danh sách phòng ban và tên các phòng ban có trên hệ thống ta dùng câu lệnh sau:

    SELECT * from Department
    
Hoặc:

    SELECT DISTINCT Name from Department

### Mệnh đề WHERE - AND, OR, BETWEEEN và LIKE
Mệnh đề WHERE được sử dụng để lọc các bản ghi theo điều kiện trong câu lệnh SELECT, còn được sử dụng trong câu lệnh UPDATE, DELETE...

   Cú pháp : 
   
        SELECT column1, column2, ...
        FROM table_name
        WHERE condition;
        
Có 6 mối quan hệ điều kiện sau:
![](https://images.viblo.asia/2a0084dc-f706-4dbe-904f-8ae3d3a565a4.png)

- Để thỏa mãn đồng thời nhiều điều kiện chúng ta dùng câu lệnh AND , và để thỏa mãn một trong số những điều kiện chúng ta dùng câu lệnh OR
Ví dụ ta có bảng sau:
![](https://images.viblo.asia/f44552ea-c7d3-4c15-9cc8-3fe422800584.png)

Giờ ta thực hiện lấy ra những nhân viên đang làm việc tại công ty và có năm sinh 1990:

        SELECT * from Employee 
        WHERE Employee.Status = 1 AND Employee.Birthday = 1990;
        
Lấy ra các nhân viên có năm sinh 1990 hoặc 1993 sử dụng OR

        SELECT * from Employee 
        WHERE Employee.Birthday = 1990 OR Employee.Birthday = 1993;
- Và 1 ví dụ về việc sử dụng toán tử BETWEEN     
Ví dụ tìm nhân viên trong công ty có năm sinh từ năm 1990 đến 1993 :

        SELECT * from Employee 
        WHERE Employee.Birthday between 1990 and 1993;

- Câu lệnh sử dụng từ khóa LIKE thường được dùng khi bạn muốn so sánh 1 xâu/chuỗi. 
VD vẫn với bảng phía trên: Hãy tìm nhân viên mà tên có chữ Mai
        
        Select * from Employee where Fullname like '%Mai%'

*) 1 số các toán tử khác hay được sử dụng trong biểu thức điều kiện:
- Toán tử so sánh:
 =, < , >, <>, !=, >=, <=, BETWEEN… AND, LIKE, IN

*- So sánh xâu dùng LIKE: , %...

*- Toán tử logic: AND, OR và NOT*

### Các loại kết nối bảng

Khi cần truy vấn dữ liệu trên nhiều bảng, ta phải sử dụng các câu lệnh kết nối các bảng dữ liệu với nhau, có các kiểu kết nối như sau:
    - Inner Join (Equi-join, Natural Join )
    - Outer Join (Left outer Join, Right outer join, Full outer join)
    - Cross Join
    - Self Join
Nhưng chúng ta sẽ chỉ tập trung tìm hiểu 2 loại join đó là Inner Join( kết nối trong) và Outer Join( kết nối ngoài)

**Kết nối trong INNER JOIN**

Có 2 cách sử dụng kết nối trong như sau:
    - Sử dụng điều kiện WHERE 
    Cú pháp: 
        SELECT column_name(s)
        FROM table1, table2 
        WHERE table1.column_name = table2.column_name;
    - Sử dụng INNER JOIN  
    Cú pháp: 
        SELECT column_name(s) FROM table1
        INNER JOIN table2 ON table1.column_name = table2.column_name;

![](https://images.viblo.asia/ce703913-3be8-4b7b-8506-843548c06551.png)

**Kết nối ngoài LEFT JOIN**

![](https://images.viblo.asia/0b601c81-2907-4645-908c-89bd9308993a.png)

    Cú pháp:
        SELECT column_name(s)
        FROM table1
        LEFT JOIN table2 ON table1.column_name = table2.column_name;
        
Kết nối ngoài trả về tất cả những giá trị từ bảng bên trái (table1) + những giá trị tương ứng với bảng bên phải (table2) hoặc
là null (khi những giá trị ở bảng bên phải không tương ứng).

**Kết nối ngoài RIGHT JOIN**

![](https://images.viblo.asia/08f81533-cb10-4542-8ddd-52322602dad5.png)

    Cú pháp:
        SELECT column_name(s)
        FROM table1
        RIGHT JOIN table2 ON table1.column_name = table2.column_name;
        
Kết quả:
Trả về tất cả những giá trị từ bảng bên phải (table2)+ những giá trị tương ứng với bảng bên trái (table1) hoặc là null (khi những giá trị ở bảng bên phải không tương ứng).

**Kết nối ngoài FULL OUTER JOIN**

![](https://images.viblo.asia/d81c3de8-a0d9-4903-a47b-1723167949f1.png)

    Cú pháp:
        SELECT column_name(s)
        FROM table1
        FULL OUTER JOIN table2 ON table1.column_name = table2.column_name; 
Kết quả:
Kết nối ngoài đủ kết hợp cả kết quả của cả phép kết nối ngoài bên trái và phép kết nối ngoài bên phải ➔ đưa ra bản ghi của cả hai bảng dữ liệu và lấp đầy những dòng tương ứng bị thiếu của cả hai phía bằng NULL.

Trong phạm vi bài viết này, chúng ta sẽ lấy ví dụ về INNER JOIN, loại kết nối hay được sử dụng nhất:
Giả sử, chúng ta có 2 bảng dữ liệu: Employee and Department như sau: 

![](https://images.viblo.asia/f44552ea-c7d3-4c15-9cc8-3fe422800584.png)

![](https://images.viblo.asia/1bcd0965-014c-4632-afcc-9233e8a444ba.png)

=> Thực hiện tìm danh sách nhân viên nữ đang làm việc trong phòng IT
Ta sử dụng câu lệnh sau:
        SELECT a.FullName FROM Employee a
        INNER JOIN Department b ON a.DepartmentId = b.DepartmentID
        WHERE a.Sex = 0 AND a.Status = 1 AND b.Name = 'IT' ;
  
=> Kết quả trả về 2 nhân viên: MaiNT và NgocLT.
  
### Mệnh đề ORDER BY

Mệnh đề này cho phép sắp xếp kết quả truy vấn theo cột.
    Cú pháp: 
    
    SELECT column1, column2, ...
    FROM table_name
    ORDER BY column1, column2, ... ASC|DESC;
        
Có thể sắp xếp kết quả theo chiều:
    - Tăng dần (asc) – mặc định khi truy vấn khi order
    - Giảm dần (desc)
Ví dụ:  Lấy ra các phòng trong công ty sắp xếp theo số lượng nhân viên giảm dần

     SECLECT Department.Name 
     FROM Department
     ORDER BY Department.Number DESC 
     
   Hoặc lấy ra các phòng trong công ty sắp xếp theo số lượng nhân viên tăng dần ta sử dụng câu lệnh sau:
     
     SECLECT Department.Name 
     FROM Department
     ORDER BY Department.Number DESC 
     
### Mệnh đề GROUP BY

Mệnh đề GROUP BY cho phép nhóm các hàng dữ liệu có giá trị giống nhau thành một nhóm
Các tính toán (thường sử dụng các hàm truy vấn nhóm) sẽ được tính trên mỗi nhóm.	
    Cú pháp:
    
        SELECT column_name(s)
		FROM table_name
		WHERE condition
		GROUP BY column_name(s);
  
### Một số hàm khác thường được sử dụng

- Hàm Max(column) - Tìm giá trị lớn nhất trong cột column

        SELECT MAX(column_name) FROM table_name 
        WHERE condition;
        
- Hàm Min(column) - Tìm giá trị nhỏ nhất trong cột column

        SELECT MIN(column_name) FROM table_name
        WHERE condition;
        
- Hàm Avg(column) - Tìm giá trị trung bình của cột column

        SELECT AVG(column_name) FROM table_name 
        WHERE condition;
        
- Hàm Count – Hàm đếm số bộ		

        SELECT COUNT(column_name) FROM table_name
        WHERE condition;
        
- Hàm SUM(column) – Tổng các giá trị của cột column
    
        SELECT SUM(column_name) FROM table_name
        WHERE condition;
    
## 2.3 Ngôn ngữ thao tác dữ liệu
. Ngôn ngữ thao tác dữ liệu gồm các truy vấn cho phép thêm, sửa, xóa dữ liệu trong các bảng 
. Các truy vấn này bắt đầu bằng từ khóa: 
    INSERT INTO - thêm dữ liệu mới vào bảng
    UPDATE - cập nhật/sửa đổi dữ liệu trong bảng
    DELETE - xóa dữ liệu trong bảng	

### Câu lệnh thêm dữ liệu mới vào bảng

  Câu lệnh này cho phép thêm mới bản ghi vào 1 bảng. Khi thực hiện các câu lệnh truy vấn này cần  rõ cấu trúc dữ liệu, mối quan hệ giữa các bảng và chỉ trong trường hợp không tạo được dữ liệu ngoài site thì mới nên dùng INSERT
  
    Cú pháp:
        INSERT [INTO] TableName VALUES(val1,val2,…)
        INSERT [INTO] TableName(column1,…,columnN) VALUES (val1,…,valN)
        
### Câu lệnh cập nhật dữ liệu trong bảng

Câu lệnh này giúp bạn cập nhật dữ liệu trong 1 bảng nào đó. Và lưu ý khi thực hiện: luôn phải có điều kiện khi update dữ liệu và chú ý hạn chế update dữ liệu bởi vì có thể gây ra sai sót về dữ liệu. 

  Cú pháp:
    
        UPDATE table_name
        SET column1 = value1, column2 = value2, ...
        WHERE condition; 

### Câu lệnh xóa dữ liệu trong bảng
Trước khi thực hiện câu lệnh này, bạn cần nhớ phải luôn có điều kiện khi thực hiện delete và phải hiểu rõ các ràng buộc trước khi thực hiện delete. 

   Cú pháp:
    
        DELETE FROM table_name
        WHERE condition;

# 3. Một số lưu ý khi viết câu lệnh SQL

- SQL không phân biệt chữ hoa chữ thường
- Một số gợi ý khi xử lý lỗi cú pháp:
    + Quên hoặc lựa chọn sai CSDL
    + Viết sai tên bảng hoặc tên cột
    + Viết sai từ khóa
    + Bỏ sót dấu đóng ngoặc với một chuỗi ký tự.
    + Query 2 câu lệnh nhưng thiếu dấu ;
- Sử dụng gợi ý khi viết câu lệnh
- Với database có dữ liệu lớn thì phải truy vấn có điều kiện (VD: khi sử dụng có thể dùng câu lệnh select top 1000 rows: để lấy ra chỉ 1000 bản ghi )
Trong trường hợp truy vấn phức tạp chúng ta có thể tham khảo truy vấn từ developer và nhớ kiểm tra lại độ chính xác của câu lệnh.

# 4. Tài liệu tham khảo
https://www.w3schools.com/sql/