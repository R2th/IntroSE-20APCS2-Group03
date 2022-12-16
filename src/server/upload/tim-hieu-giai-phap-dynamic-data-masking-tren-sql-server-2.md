Ở bài viết lần trước, chúng ta đã cùng tìm hiểu và có cái nhìn tổng quan về DDM
Trong bài viết lần này, hãy cùng đi tìm hiểu CƠ CHẾ HOẠT ĐỘNG của DDM
# 1. Các bước thực hiện 
Dynamic data masking là tính năng bảo vệ dữ liệu, che giấu dữ liệu nhạy cảm trong tập kết quả trả về của truy vấn trên các trường cơ sở dữ liệu đã chọn. 
Dữ liệu được che dấu khi truy vấn, nhưng dữ liệu cơ bản  không bị biến đổi. 
 
 *Các bước* : 
 
 • Quyết định cột nào cần được MASK 

• Chọn chức năng MASK phù hợp nhất với nhu cầu cho mỗi cột 

• Alter các cột để thêm các quy tắc MASK  

• Chỉ định người dùng nào sẽ xem dữ liệu được che dấu và cấu hình các quyền. 

# 2. Quyền
Không cần bất kỳ sự cho phép đặc biệt nào để tạo một bảng có Dynamic data masking , chỉ cần có quyền CREATE TABLE và ALTER trên các lược đồ. 
Thêm, thay thế hoặc xóa mask của một cột, phải có quyền ALTER ANY MASK và quyền ALTER trên bảng.

Người dùng có quyền SELECT trên bảng có thể xem dữ liệu bảng. Các cột được định nghĩa mask, sẽ hiển thị dữ liệu được che  dấu. Cấp phép UNMASK cho người dùng để cho phép họ truy xuất dữ liệu bị che giấu từ các cột đã mask. 

Các quyền CONTROL  trên cơ sở dữ liệu bao gồm cả quyền  ALTER ANY MASK và  UNMASK . 
 
#  3. Thực tiễn và các trường hợp sử dụng phổ biến 
• Tạo mask trên cột không ngăn cản việc UPDATE cho cột đó. Vì vậy, mặc dù người dùng nhận được dữ liệu che dấu khi truy vấn cột được mask, cũng người dùng đó có thể cập nhật dữ liệu nếu họ có quyền ghi. Chính sách kiểm soát quyền truy cập thích hợp vẫn cần phải được sử dụng để giới hạn quyền cập nhật. 

• Việc sử dụng SELECT INTO hoặc INSERT INTO sao chép dữ liệu từ một cột có mask vào một bảng khác thì dữ liệu vẫn được che dấu trong bảng đích. 

• Dynamic Data Masking được áp dụng khi chạy SQL Server Import and Export. Một cơ sở dữ liệu chứa các cột mask sẽ dẫn đến một tệp dữ liệu được xuất ra với dữ liệu được che dấu (giả sử nó được xuất bởi người dùng không có đặc quyền UNMASK ) và cơ sở dữ liệu nhập sẽ chứa dữ liệu che dấu tĩnh. 

# 4. Truy vấn cho các cột được che dấu 
Sử dụng khung nhìn ***sys.maskedcolumns*** để truy vấn cho các cột bảng có hàm mask được áp dụng cho chúng. Chế độ xem này kế thừa từ chế độ xem ***sys.columns*** . Nó trả về tất cả các cột trong khung nhìn ***sys.columns*** , cộng với cột ***ismasked*** và ***maskingfunction*** , cho biết cột có bị che dấu hay không, và nếu như vậy, hàm mask nào được định nghĩa. Chế độ xem này chỉ hiển thị các cột có chức năng che giấu được áp dụng. 
 
```
SELECT c.name, tbl.name as table_name, c.is_masked, c.masking_function  
FROM sys.masked_columns AS c  
JOIN sys.tables AS tbl        
ON c.[object_id] = tbl.[object_id]   
WHERE is_masked = 1;
```

# 5. Giới hạn và hạn chế 
Không thể xác định quy tắc che dấu cho các loại cột sau: 

• Các cột được mã hóa (Luôn được mã hóa) 

• FILESTREAM 

• COLUMN_SET hoặc cột rải rác là một phần của tập hợp cột. 

• Một mask không thể được cấu hình trên một cột được tính toán, nhưng nếu cột được tính toán phụ thuộc vào một cột có MASK, thì cột được tính toán sẽ trả về dữ liệu được che dấu. 

• Cột có  dữ liệu che dấu không thể là khóa cho chỉ mục FULLTEXT. 

Đối với người dung không có quyền UNMASK, các yêu cầu READTEXT, UPDATETEXT và WRITETEXT không hoạt động đúng chức năng trên cột được cấu hình DDM. 

Việc thêm Dynamic Data Masking được thực hiện dưới dạng thay đổi lược đồ của bảng ban đầu, do đó không thể thực hiện trên cột có CONSTRAINT. Để thực hiện được, trước tiên bạn có thể loại bỏ CONSTRAINT đó, sau đó thêm Dynamic Data Masking và tạo lại CONSTRAINT. 

Ví dụ, nếu CONSTRAINT là do một chỉ số CONSTRAINT trên cột đó, bạn có thể drop chỉ mục, sau đó thêm mask, và sau đó tạo lại chỉ mục. 
 
#  6. Bảo mật 
Bỏ qua masking bằng cách sử dụng kỹ thuật suy luận hoặc kỹ thuật brute-force 

Dynamic Data Masking được thiết kế để đơn giản hóa việc phát triển ứng dụng bằng cách hạn chế phơi bày dữ liệu bởi các truy vấn được xác định được ứng dụng sử dụng. Trong khi Dynamic Data Masking cũng có thể hữu ích để ngăn chặn tình trạng ngẫu nhiên để lộ dữ liệu nhạy cảm khi truy cập trực tiếp vào cơ sở dữ liệu, điều quan trọng cần lưu ý là người dùng không có đặc quyền là quyền truy vấn đặc biệt có thể áp dụng các kỹ thuật để truy cập vào dữ liệu thực tế. Nếu có nhu cầu cấp quyền truy cập đặc biệt như vậy,  Auditing nên được sử dụng để theo dõi tất cả hoạt động cơ sở dữ liệu và giảm thiểu kịch bản này. 

Ví dụ, hãy xem một người quản lý cơ sở dữ liệu có đủ đặc quyền để chạy các truy vấn đặc biệt trên cơ sở dữ liệu và cố gắng 'đoán' dữ liệu cơ bản và cuối cùng suy ra các giá trị thực tế. Giả sử rằng chúng ta có một mask trên ***[Employee].[Salary]*** và người dùng này kết nối trực tiếp với cơ sở dữ liệu và bắt đầu đoán các giá trị, cuối cùng suy ra ***[Salary]*** là giá trị của một tập hợp các nhân viên: 
```
 SELECT ID, Name, Salary 
 FROM Employees 
 WHERE Salary > 99999 and Salary < 100001;
```
 

| **ID** | **Name** | **Salary** |
| -------- | -------- | -------- |
| 62543     | Jane Doe     | 0     |
| 91245     | John Smith     | 0     |

Điều này chứng tỏ rằng Dynamic Data Masking không nên được sử dụng như một biện pháp riêng biệt để bảo mật đầy đủ dữ liệu nhạy cảm từ người dùng có quyền chạy các truy vấn đặc biệt trên cơ sở dữ liệu. DDM chỉ  thích hợp để ngăn ngừa sự tiếp xúc ngẫu nhiên với các dữ liệu nhạy cảm, nhưng sẽ không bảo vệ chống lại ý định suy ra các dữ liệu cơ bản. 

Điều quan trọng là quản lý đúng các quyền trên cơ sở dữ liệu và luôn tuân theo nguyên tắc quyền tối thiểu cần thiết. Ngoài ra, hãy nhớ bật Auditing để theo dõi tất cả các hoạt động diễn ra trên cơ sở dữ liệu. 
 
 **Ví dụ**: 

***Tạo Dynamic Data Masking***  

Ví dụ sau tạo một bảng với ba loại Dynamic Data Masking  khác nhau.  
```
CREATE TABLE Hocsinh (ID int IDENTITY PRIMARY KEY,      Hoten varchar(100)  
MASKED WITH (FUNCTION = 'partial(1,"X",2)') NULL,      

Diachi varchar(100) NOT NULL, Sodienthoai varchar(12) MASKED WITH (FUNCTION = 'default()') NULL,      

Email varchar(100) MASKED WITH (FUNCTION = 'email()') NULL); 

INSERT Hocsinh(Hoten,Diachi,Sodienthoai,Email) VALUES ('Linh1', 'Hanoi', ‘123456789’,’abc@gmail.com),   ('Linh2', 'Hanoi', ‘12345678912’,’abc2@gmail.com), ('Linh3', 'Hanoi', ‘123456789123’,’abc3@gmail.com) 

SELECT * FROM Hocsinh; 
```

Người dùng mới được tạo và cấp quyền SELECT trên bảng. Các truy vấn được thực hiện như user ***Linhtest***. 
 
```
CREATE USER Linhtest WITHOUT LOGIN;   

GRANT SELECT ON Hocsinh TO Linhtest;   
 
EXECUTE AS USER = 'Linhtest';   
SELECT * FROM Hocsinh;   
REVERT;   
```

Kết quả cho thấy các che giấu bằng cách thay đổi dữ liệu từ 

`1 'Linh1', 'Hanoi', ‘123456789’,’abc@gmail.com ‘ `

Thành 
 
` 1 ‘Lxh1’ ‘Hanoi’ ‘xxxx’ ‘aXXX@XXXX.com’ `
 
 
***Thêm hoặc Chỉnh sửa MASK trên Cột Hiện có*** 

Sử dụng câu lệnh ALTER TABLE để thêm một mask vào một cột hiện có trong bảng, hoặc để sửa che giấu trên cột đó.  

Ví dụ sau thêm một hàm mask vào LastName: 

`ALTER TABLE Hocsinh ALTER COLUMN Hovaten ADD MASKED WITH (FUNCTION = 'partial(2,"XXX",0)'); `  

Ví dụ tiếp thay đổi hàm mask trên cột Hovaten 

`ALTER TABLE Hocsinh ALTER COLUMN Hovaten varchar(100) MASKED WITH (FUNCTION = 'default()');`    
***Cấp quyền xem dữ liệu  ***

Cấp phép UNMASK cho phép Linh1 xem dữ liệu. 
 
```
GRANT UNMASK TO Linh1;   
EXECUTE AS USER = 'Linh1';   
SELECT * FROM Hovaten;   
REVERT;   
``` 
 
***Removing the UNMASK permission***   

`REVOKE UNMASK TO Linh1;   `
 
***DROP Dynamic Data Masking***   

Sử dụng câu lệnh drop mask trên cột Hovaten : 
 
`ALTER TABLE Hocsinh 
ALTER COLUMN Hovaten 
DROP MASKED; `