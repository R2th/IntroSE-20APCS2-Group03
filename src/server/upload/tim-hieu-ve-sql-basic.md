## 1.SQL là gì?
SQL là loại ngôn ngữ máy tính, giúp cho thao tác lưu trữ và truy xuất dữ liệu được lưu trữ trong một cơ sở dữ liệu quan hệ. Nó  là một công cụ quản lý dữ liệu được sử dụng phổ biến ở nhiều lĩnh vực. 

SQL là viết tắt của Structured Query Language là ngôn ngữ truy vấn có cấu trúc. 

Làm sao để sử dụng nó luôn là một câu hỏi được đặt ra rất nhiều. Hãy cùng tôi đi trả lời lần lượt về SQL và cách dùng SQL thông qua các câu lệnh nào !
## 2. Tại sao sử dụng SQL?
Ngoài việc là một ngôn ngữ máy tính phổ biến, SQL còn là ngôn ngữ máy tính hữu dụng. Vì vậy, người ta thường sử dụng SQL cho các mục đích:

- Tạo cơ sở dữ liệu, bảng và view mới.
- Để chèn các bản ghi vào trong một cơ sở dữ liệu.
- Để xóa các bản ghi từ một cơ sở dữ liệu.
- Để lấy dữ liệu từ một cơ sở dữ liệu.

## 3.Chức năng của SQL là gì?

Một trong những lý do khiến cho SQL được sử dụng phổ biến, chính là nó đã cho phép người dùng thực hiện đa dạng các chức năng sau:

- Cho phép người dùng truy cập dữ liệu trong các hệ thống quản lý cơ sở dữ liệu quan hệ.
- Cho phép người dùng mô tả dữ liệu.
- Cho phép người dùng xác định dữ liệu trong cơ sở dữ liệu và thao tác dữ liệu đó.
- Cho phép nhúng trong các ngôn ngữ khác sử dụng mô-đun SQL, thư viện và trình biên dịch trước.
- Cho phép người dùng tạo và thả các cơ sở dữ liệu và bảng.
- Cho phép người dùng tạo chế độ view, thủ tục lưu trữ, chức năng trong cơ sở dữ liệu.
- Cho phép người dùng thiết lập quyền trên các bảng, thủ tục và view.

## 4.Ưu điểm của SQL là gì?
Tại sao cần sử dụng SQL? Với SQL, người dùng dường như khai thác được khá nhiều lợi ích. Dưới đây là một số ưu điểm của SQL:

- **Dữ liệu có ở mọi nơi:** Dữ liệu xuất hiện ở mọi nơi trên màn hình từ laptop đến điện thoại của bạn. Việc học tập và tìm hiểu SQL sẽ giúp bạn biết được cách thức hoạt động của những dữ liệu này.
-  **Thêm, sửa, đọc và xóa dữ liệu dễ dàng:** với SQL, các thao tác xử lý dữ liệu trở nên dễ dàng hơn bao giờ hết. Bạn chỉ cần thực hiện một số thao tác với dữ liệu đơn giản trên SQL thay vì phải dùng nhiều câu lệnh phức tạp trên các loại ngôn ngữ khác.
- **SQL giúp công việc lập trình dễ dàng hơn:** bạn có thể lưu nhiều dữ liệu cho nhiều ứng dụng khác nhau trên cũng một cơ sở dữ liệu và việc truy cập các cơ sở dữ liệu này trở lên đơn giản hơn nhờ một cách thức giống nhau.
- **Được sử dụng và hỗ trợ bởi nhiều công ty lớn:** tất cả các công ty lớn về công nghệ trên thế giới hiện nay như Microsoft, IBM, Oracle… đều hỗ trợ việc phát triển ngôn ngữ SQL.
- **Lịch sử hơn 40 năm:** với lịch sử phát triển hơn 40 năm từ 1970, SQL vẫn tồn tại và trụ vững đến ngày nay. Điều này cho thấy vị trí của SQL hiện tại rất khó bị thay thế bởi bất kỳ một ngôn ngữ máy tính nào khác.
## 5.Các câu lệnh SQL phổ biến
Trong SQL có khá nhiều câu lệnh, mệnh đề khác nhau. Tuy nhiên dưới đây là một số những truy vấn thường gặp nhất. Chúng ta sẽ cùng tìm hiểu chi tiết ngay bên dưới:

- Truy vấn Update
- Truy vấn Insert
- Truy vấn Select 
- Mệnh đề Order By
- Mệnh đề Group By
- Từ khóa Distinct
- Mệnh đề Where
- Mệnh đề AND & OR
-  Câu lệnh Select
-  Câu lệnh Select Top
-  Mệnh đề HAVING

### 5.1.Truy vấn Update trong SQL là gì?
Truy vấn UPDATE trong SQL được sử dụng để sửa đổi các bản ghi đang tồn tại trong một bảng. 

Bạn có thể sử dụng mệnh đề WHERE với truy vấn UPDATE sửa đổi các hàng đã lựa chọn, nếu không, hệ thống sẽ mặc định là tất cả các hàng đều bị tác động.
```
UPDATE ten_bang

SET column1 = value1, column2 = value2...., columnN = valueN

WHERE CONDITION;
```

### 5.2. Truy vấn Insert trong SQL là gì?
Lệnh INSERT INTO trong SQL được sử dụng để thêm các hàng dữ liệu mới vào một bảng trong Database.

- Xác định cột để chèn dữ liệu:

```
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)] 

VALUES (value1, value2, value3,...valueN);
```
- Thao tác trên tất cả các cột trong bảng:

`INSERT INTO TABLE_NAME VALUES (value1, value2, value3,...valueN);`

### 5.3.Mệnh đề Order By
Mệnh đề ORDER BY trong SQL được sử dụng để sắp xếp dữ liệu theo thứ tự tăng dần hoặc theo thứ tự giảm dần, trên một hoặc nhiều cột.

```
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION
ORDER BY column_name {ASC|DESC};
```

### 5.4.Mệnh đề Group By
Mệnh đề GROUP BY trong SQL được sử dụng kết hợp với lệnh SELECT để sắp xếp dữ liệu đồng nhất vào trong các nhóm.
```
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name;
```
### 5.5.Từ khóa Distinct
Mệnh đề DISTINCT trong SQL được sử dụng kết hợp với lệnh SELECT để loại tất cả các bản sao của bản ghi và chỉ lấy các bản ghi duy nhất.
```
SELECT DISTINCT column1, column2....columnN
FROM   table_name;
```

### 5.6.Mệnh đề Where
Mệnh đề WHERE trong SQL được sử dụng để xác định một điều kiện trong khi lấy dữ liệu từ bảng đơn hoặc nhiều bảng kết hợp. Bạn sẽ sử dụng mệnh đề WHERE để lọc các bản ghi và chỉ lấy lại các bản ghi cần thiết.

```
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION;
```
### 5.7.Mệnh đề AND & OR
Các toán tử AND và OR trong SQL được sử dụng để kết hợp nhiều điều kiện để thu hẹp phạm vi dữ liệu trong một lệnh SQL. Hai loại toán tử này được gọi là toán tử liên hợp. Nó cho phép tồn tại nhiều điều kiện trong mệnh đề WHERE của một lệnh SQL.
```
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION-1 {AND|OR} CONDITION-2;
```

### 5.8.Câu lệnh SQL SELECT
Câu lệnh SELECT được sử dụng để chọn dữ liệu từ cơ sở dữ liệu.

Dữ liệu trả về được lưu trữ trong một bảng kết quả, được gọi là tập kết quả.
```
SELECT column1, column2....columnN
FROM   table_name;
```

### 5.9.Câu lệnh Select Top
Mệnh đề SELECT TOP được sử dụng để chỉ định số lượng bản ghi sẽ trả về.

Mệnh đề SELECT TOP hữu ích trên các bảng lớn với hàng ngàn bản ghi. Trả lại một số lượng lớn các hồ sơ có thể ảnh hưởng đến hiệu suất.
```
SELECT TOP number|percent column_name(s)
FROM table_name
WHERE condition;
```
### 5.10.Mệnh đề HAVING
Mệnh đề HAVING đã được thêm vào SQL vì từ khóa WHERE không thể được sử dụng với các hàm tổng hợp.
```
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

Links references:

https://www.w3schools.com/sql/default.asp

https://quantrimang.com/13-cau-lenh-sql-quan-trong-programmer-nao-cung-can-biet-136595

https://viettuts.vn/sql/cu-phap-sql

https://itzone.com.vn/vi/article/tam-quan-trong-cua-sql-doi-voi-mot-tester/

https://wiki.matbao.net/sql-la-gi-cac-lenh-co-ban-trong-lap-trinh-co-so-du-lieu-sql/