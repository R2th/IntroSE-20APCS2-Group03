Stored Procedure là 1 phần không thể thiếu của SQL Server. Chúng có thể hỗ trợ rất nhiều cho lập trình và cấu hình cơ sở dữ liệu.

Một Stored Procedure là bao gồm các câu lệnh Transact-SQL và được lưu lại trong cơ sở dữ liệu. Các lập trình viên chỉ cần gọi ra và thực thi thông qua SQL Server Management Studio hoặc ngay trong ứng dụng đang phát triển.

Transact-SQL dựa trên SQL, nó là một ngôn ngữ lập trình được sử dụng làm trung gian giữa cơ sở dữ liệu và các ứng dụng. Nó tương đối dễ học vì thực chất nó được tạo bởi hầu hết là các lệnh SQL.

# Lợi ích của Stored Procedure

| Lợi ích | Giải thích |
| -------- | -------- | 
| Module hóa | Bạn chỉ cần viết Stored Procedure 1 lần, sau đó có thể gọi nó nhiều lần ở  trong ứng dụng.|
| Hiệu suất | Stored Procedure thực thi mã nhanh hơn và giảm tải băng thông. <br> - **Thực thi nhanh hơn**: Stored Procedure sẽ được biên dịch và lưu vào bộ nhớ khi được tạo ra. Điều đó có nghĩa rằng nó sẽ thực thi nhanh hơn so với việc gửi từng đoạn lệnh SQL tới SQL Server. Vì nếu bạn gửi từng đoạn lệnh nhiều lần thì SQL Server cũng sẽ phải biên dịch lại nhiều lần, rất mất thời gian so với việc biên dịch sẵn.<br> - **Giảm tải băng thông**: Nếu bạn gửi nhiều câu lệnh SQL thông qua network đến SQL Server sẽ ảnh hưởng tới hiệu suất đường truyền. Thay vì gửi nhiều lần thì bạn có thể gom các câu lệnh SQL vào 1 Stored Procedure và chỉ phải gọi đến 1 lần duy nhất qua network.|
|Bảo mật|Trong SQL Server có các tác vụ cấp cao mà người dùng bình thường không thể truy cập vào được. Bằng việc cung cấp các Stored Procedure đã truy cập tới các tác vụ này cho người dùng thường thì không sao hết. Vì làm vậy thì người dùng thường sẽ truy cập gián tiếp mà không ảnh hưởng tới vấn đề bảo mật của SQL Server.|

# Tạo Stored Procedure
Bạn tạo Stored Procedure được lưu trữ trong SQL Server Management Studio bằng cách sử dụng câu lệnh *CREATE PROCEDURE*:
```sql
CREATE PROCEDURE StoredProcedureName AS
...
```
Đoạn mã sau tạo một Stored Procedure gọi là "MyStoredProcedure":
```sql
CREATE PROCEDURE MyStoredProcedure AS
SET ROWCOUNT 10
SELECT Products.ProductName AS TenMostExpensiveProducts, Products.UnitPrice
FROM Products
ORDER BY Products.UnitPrice DESC
```
# Chỉnh sửa Stored Procedure
Nếu bạn cần sửa đổi một Stored Procedure, bạn chỉ cần thay CREATE bằng ALTER.

```sql
ALTER PROCEDURE MyStoredProcedure AS
...
```
# Thực thi Stored Procedure
Bạn có thể chạy một Stored Procedure bằng cách sử dụng EXECUTE hoặc EXEC. Ví dụ: để chạy  Stored Procedure  ở trên, hãy nhập như sau:
```sql
EXEC MyStoredProcedure
```
Nếu Stored Procedure có khoảng trắng bên trong tên của nó, hãy đặt nó giữa các dấu ngoặc kép:
```sql
EXEC "My Stored Procedure"
```
Nếu Stored Procedure của bạn cần truyên thêm các param:
```sql
EXEC MyStoredProcedure @ParameterName="MyParameter"
```
# Sử dụng qua GUI
Bạn có thể thực thi Stored Procedure trên trực tiếp giao diện của SQL Server mà không dùng câu lệnh:
1. Di chuyển đến "Stored Procedures" của Database mà bạn đang làm việc.
2. Chọn Stored Procedure của bạn đã tạo và nhấn chuộn phải chọn "Execute Stored Procedure..."
3. Nếu như Stored Procedure của bạn cần param thì 1 hộp thoại sẽ xuất hiện để bạn nhập.
4. Nhấp "OK".
5. Sau đó SQL Server sẽ show kết quả thực thi cho bạn.

# Parameters
Parameters(tham số) là giá trị mà Stored Procedure của bạn sử dụng để thực hiện tác vụ của nó. Khi bạn viết một Stored Procedure, bạn có thể chỉ định các Parameters cần được cung cấp từ người dùng. 

Ví dụ: Nếu bạn viết một Stored Procedure để show ra chi tiết địa chỉ về một ái đó, thì Stored Procedure của bạn cần biết thông tin nào đó để tìm ra người đó. Trong trường hợp này, người dùng có thể cung cấp UserId để cho Stored Procedure lọc dữ liệu từ Database và trả về cho người dùng.
# System Stored Procedures
SQL Server bao gồm một số lượng lớn các System Stored Procedure để hỗ trợ các việc quản trị cơ sở dữ liệu. 

Một số điều bạn có thể làm với các System Stored Procedure bao gồm:
- Cấu hình tài khoản bảo mật.
- Thiết lập liên kết các máy chủ.
- Tạo kế hoạch bảo trì cơ sở dữ liệu.
- ...