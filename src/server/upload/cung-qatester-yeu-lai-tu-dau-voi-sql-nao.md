Là một Tester/QA, công việc kiểm thử đòi hỏi rất nhiều kỹ năng...Trong đó, sử dụng SQL là một trong những kỹ năng rất quan trọng, biết thao tác với SQL ở mức cơ bản thôi cũng đã hữu ích rất nhiều cho công việc của tester rồi. Bằng chứng là lần nào đi phỏng vấn mình cũng được hỏi đôi câu về SQL đấy các bác tester ạ, đủ biết là rất nhiều dự án cần đến rồi. 

Vậy SQL là gì? Và bài viết này mình cũng sẽ ghi lại vài câu lệnh mà một tester gà mờ SQL như mình hay dùng trong quá trình kiểm trình kiểm thử nhé.

### I. SQL là gì?
SQL (Structured Query Language) là một ngôn ngữ máy tính để lưu trữ, thao tác và truy xuất dữ liệu được lưu trữ trong cơ sở dữ liệu quan hệ (RDMS). Tất cả các hệ thống quản lý cơ sở dữ liệu quan hệ như MySQL, MS Access, Oracle, SQL Server... đều sử dụng SQL làm ngôn ngữ cơ sở dữ liệu chuẩn của chúng.

**Vì sao tester cần biết sử dụng SQL:**
* Tester nên biết sử dụng SQL để có thể truy cập vào cơ sở dữ liệu (CSDL) và tự tạo dữ liệu test mà không cần đến sự hỗ trợ của dev. Có thể kiểm tra dữ liệu lưu vào, hiển thị ra chính xác chưa?
* Khách hàng báo lỗi và gửi bản dump dữ liệu, tester cũng biết cách restore dữ liệu để dựng môi trường và tái hiện lỗi.

Cũng qua vài dự án thực tế, bản thân mình nhận thấy việc kiểm thử chỉ bằng các thao tác trên giao diện vẫn chưa thể phát hiện ra hết tất cả các lỗi của phần mềm, mà cần kiểm tra sâu hơn bằng CSDL. 

Ví dụ: Khi test màn hình list, nếu không biết sử dụng SQL, thao tác với CSDL sẽ khó kiểm tra được tất cả record đã hiển thị trên màn hình list chưa? Ngoài cách tạo một record mới và nó được hiển thị ngay lập tức trên màn hình list. Tuy nhiên những data cũ có thể vì lỗi nào đó đã không được hiển thị đầy đủ trên list.

### II. Các câu lệnh SQL thường dùng trong kiểm thử.
### 1. SQL SELECT
SELECT là câu lệnh cơ bản nhất trong SQL và tester sử dụng thường xuyên nhất để truy vấn dữ liệu trong các bảng (Table) của CSDL. 

Cú pháp:
```
SELECT column1, column2, ...
FROM table_name;
```

Để lấy tất cả các cột của một bảng mà không cần nhập tất cả tên cột, dùng câu lệnh: 
`SELECT * FROM table_name;`

### 2. SQL WHERE
Mệnh đề WHERE được sử dụng để lọc các bản ghi, nhằm giới hạn phạm vi truy vấn dựa vào những điều kiện cụ thể.

Cú pháp:
```
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
Lưu ý:
* WHERE không chỉ được dùng với câu lệnh Select, mà nó cũng được dùng với các câu lệnh Update, Delete,...
* Sau WHERE có thể là một hoặc một nhóm các điều kiện kèm theo được kết hợp với nhau bằng AND hoặc OR hoặc NOT
* Các toán tử chỉ điều kiện, hay dùng với WHERE và ý nghĩa của chúng:
    * "=" - Bằng với
    * "<>" hoặc "!=" - Khác với
    * "<" - Nhỏ hơn
    * ">" - Lớn hơn
    * "<=" - Nhỏ hơn hoặc bằng
    * ">=" - Lớn hơn hoặc bằng
    * "LIKE" - Giống với
    * "BETWEEN" - Nằm giữa
    * "IN" - Trong phạm vi.
    
 Ví dụ 1: Bảng dữ liệu "Customers" như sau:
![](https://images.viblo.asia/678db573-8557-4c10-97a0-edf319b8a1f5.png)
Select tất cả khách hàng đến từ "Mexico" ở bảng "Customers":
```
SELECT * FROM Customers
WHERE Country='Mexico';
```
### 2.1. Toán tử  AND, OR, NOT
* Toán tử AND và OR được sử dụng để lọc các bản ghi dựa trên nhiều hơn một điều kiện:
    * Toán tử AND lọc các bản ghi nếu thỏa mãn tất cả các điều kiện được phân tách bằng AND.
    * Toán tử OR lọc các bản ghi nếu thỏa mãn bất kỳ điều kiện nào được phân tách bằng OR.
* Toán tử NOT lọc các bản ghi nằm ngoài (các) điều kiện.

Cú pháp toán tử **AND**:
```
SELECT column1, column2, ...
FROM table_name
WHERE condition1 AND condition2 AND condition3 ...;
```
Cú pháp toán tử **OR**:
```
SELECT column1, column2, ...
FROM table_name
WHERE condition1 OR condition2 OR condition3 ...;
```
Cú pháp toán tử **NOT**:
```
SELECT column1, column2, ...
FROM table_name
WHERE NOT condition;
```
Xét bảng dữ liệu "Customers" ở ví dụ 1

Ví dụ 2: Chọn tất cả các fields từ bảng "Customers" trong đó Country = "Germany" và City = "Berlin" OR City = "Mannheim"
```
SELECT * FROM Customers
WHERE Country = 'Germany' AND (City = 'Berlin' OR City = 'Mannheim');
```
Kết quả:
![](https://images.viblo.asia/5788c28a-bf64-437d-9d17-f8328142b2af.png)
Ví dụ 3: Chọn tất cả các fields từ bảng "Customers" trong đó "Country" khác "Germany" và khác "France"
```
SELECT * FROM Customers
WHERE NOT Country='Germany' AND NOT Country='France';
```
Kết quả:
![](https://images.viblo.asia/ba1513e8-f2f3-4991-9fa6-8570dd2d80f3.png)
###   2.2. Toán tử LIKE
Toán tử LIKE được sử dụng trong mệnh đề WHERE để tìm kiếm dựa vào một vài kí tự (pattern).

Cú pháp:
```
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```
Có hai ký tự đại diện thường được sử dụng cùng với toán tử LIKE:
* Dấu phần trăm '%' đại diện cho một hoặc nhiều hoặc không ký tự nào.
* Dấu gạch dưới '_' thể hiện một ký tự.

Một số ví dụ hiển thị các toán tử LIKE với các ký tự đại diện '%' và '_': Xét bảng dữ liệu "Customers" ở ví dụ 1, tìm kiếm theo "CustomerName"
| Toán tử LIKE | Mô tả | 
| -------- | -------- |
| WHERE CustomerName LIKE 'a%'| Tìm những giá trị bắt đầu bằng "a"|
| WHERE CustomerName LIKE '%a'| Tìm những giá trị kết thúc bằng "a"|
| WHERE CustomerName LIKE '%Ha%'| Tìm những giá trị có "Ha" ở bất kỳ vị trí nào|
| WHERE CustomerName LIKE '_k%'| Tìm những giá trị có "k" ở ví trí kí tự thứ 2|
| WHERE CustomerName LIKE 'a_%'| Tìm những giá trị có "a" ở ví trí đầu tiên và có ít nhất 2 kí tự|
| WHERE CustomerName LIKE 'a__'| Tìm những giá trị có "a" ở ví trí đầu tiên và có ít nhất 3 kí tự|
|WHERE ContactName LIKE 'd%o'| Tìm những giá trị có "d" ở ví trí đầu tiên và "o" ở ví trí cuối cùng|

### 2.3. Toán tử IN

Toán tử IN là cách viết tắt của nhiều điều kiện OR, cho phép chỉ định nhiều giá trị.

Cú pháp:
```
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);
```
Như ở ví dụ 2 thay vì viết `City = 'Berlin' OR City = 'Mannheim'` thì có thể viết `City IN ('Berlin', 'Mannheim')`

Ví dụ 4: Từ bảng "Customers" chọn những khách hàng không đến từ "Germany", "France" or "UK":
```
SELECT * FROM Customers
WHERE Country NOT IN ('Germany', 'France', 'UK');
```
Kết quả:
![](https://images.viblo.asia/a0a41670-e5f2-4f01-b906-a173270ce3c0.png)

### 2.4. Toán tử BETWEEN

Toán tử BETWEEN chọn các giá trị trong một phạm vi nhất định. Các giá trị có thể là số, văn bản hoặc ngày tháng. Bao gồm: giá trị bắt đầu và kết thúc.

Cú pháp:
```
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```
Ví dụ 5: Bảng "Products" như sau:
![](https://images.viblo.asia/07b7fe9e-28e0-44b1-9dda-c934d04de68f.png)
Chọn những sản phẩm có giá trong khoảng từ 18 đến 20
```
SELECT * FROM Products
WHERE Price BETWEEN 18 AND 20;
```
--> Kết quả:
![](https://images.viblo.asia/621cd846-5368-44bb-bf09-2cac0ff82485.png)
Chọn những sản phẩm có giá nằm ngoài khoảng từ 18 đến 20
```
SELECT * FROM Products
WHERE Price NOT BETWEEN 18 AND 20;
```
--> Kết quả:
![](https://images.viblo.asia/906f2011-8d35-4d6e-9f91-eccb23ab3787.png)
### 3. SQL SELECT DISTINCT
Bên trong mỗi bảng, một cột thường chứa nhiều giá trị trùng lặp, và đôi khi muốn liệt kê các giá trị khác nhau (riêng biệt), câu lệnh SELECT DISTINCT được sử dụng trong trường hợp này.

Cú pháp:
```
SELECT DISTINCT column1, column2, ...
FROM table_name;
```
Ví dụ 6: Từ bảng "Customers" (ở ví dụ 1) lấy ra các cặp (Country, City) duy nhất
`SELECT DISTINCT Country, City FROM Customers`
![](https://images.viblo.asia/738f83d9-6378-4721-91fd-9b650b6ce04a.png)
### 4. SQL INSERT INTO
Dùng để thêm một bản ghi mới vào bảng dữ liệu. Cú pháp:
```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
### 5. SQL UPDATE
Update giá trị cho các bản ghi đã tồn tại trong bảng dữ liệu. Cú pháp:
```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
Lưu ý: Nhớ chỉ định điều kiện cho mệnh đề WHERE trong câu lệnh UPDATE, nếu không tất cả các bản ghi của bảng đều bị update.
### 6. SQL DELETE
Xóa các bản ghi hiện có trong bảng dữ liệu. Cú pháp:

`DELETE FROM table_name WHERE condition;`

Lưu ý: Nhớ chỉ định điều kiện cho mệnh đề WHERE trong câu lệnh DELETE, nếu không tất cả các bản ghi của bảng đều bị xóa.

### 7. SQL NULL Values
Trường có giá trị NULL là trường không có giá trị, là trường đã bị bỏ trống trong quá trình tạo/chỉnh sửa bản ghi. Sau đó, trường được lưu vào CSDL với giá trị NULL. Giá trị NULL khác với chuỗi rỗng ('') và chuỗi chỉ gồm kí tự trắng nha mấy bà, mấy má.

Không thể truy vấn giá trị NULL bằng các toán tử so sánh, chẳng hạn như =, <hoặc <> đâu nha. Thay vào đó, phải sử dụng toán tử "IS NULL" và "IS NOT NULL".

Cú pháp:
```
SELECT column_names
FROM table_name
WHERE column_name IS NULL;
```
```
SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```
### 8. SQL ORDER BY 
ORDER BY theo từ khóa: được sử dụng để sắp xếp các bản ghi theo thứ tự tăng dần hoặc giảm dần. Mặc định ORDER BY là sắp xếp các bản ghi theo thứ tự tăng dần (ASC), để sắp xếp các bản ghi theo thứ tự giảm dần, dùng DESC.

Cú pháp:
```
SELECT column1, column2, ...
FROM table_name
ORDER BY column(x+1) ASC, column(x+2) DESC,...;
```
Lưu ý: Khi ORDER BY có nhiều từ khóa sẽ ưu tiên sắp xếp theo từ khóa đứng trước, đến các từ khóa đứng sau.
Ví dụ 7:
```
SELECT * FROM Customers
ORDER BY Country DESC, CustomerID ASC;
```
Kết quả:
![](https://images.viblo.asia/83b6e391-8bfe-4fd6-a3b0-d74942f32fd5.png)

Trong bài viết này, mình đã note lại các câu lệnh SQL mà mình thường hay dùng ở vai trò là tester, có thể nhiều anh em dev sử dụng những câu lệnh cao siêu hơn. Đây là tài liệu để thỉnh thoảng mình cần cũng sẽ coi lại, hy vọng là hữu ích cho các bạn Tester/QA. Ở bài sau mình sẽ tiếp tục tổng hợp thêm một vài câu lệnh SQL nữa như inner join, left join, các function: MIN/MAX,...

Cảm ơn nguồn https://www.w3schools.com/sql/default.asp