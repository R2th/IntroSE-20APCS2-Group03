Các kiểu dữ liệu SQL xác định loại giá trị có thể được lưu trữ trong một cột trong bảng. Ví dụ: nếu chúng ta muốn một cột chỉ lưu trữ các giá trị nguyên, thì chúng ta có thể định nghĩa nó kiểu dữ liệu là `int`.
# SQL Data Types
Các kiểu dữ liệu SQL có thể được chia thành các loại sau:
1. Các kiểu dữ liệu số như int, tinyint, bigint, float, real,...
2. Các loại dữ liệu Ngày và Giờ như Date, Time, Datetime,...
3. Các kiểu dữ liệu ký tự và chuỗi như char, varchar, text,...
4. Các kiểu dữ liệu chuỗi ký tự Unicode, ví dụ nchar, nvarchar, ntext,...
5. Các loại dữ liệu nhị phân như binary, varbinary,...
6. Các loại dữ liệu khác – clob, blob, xml, cursor, table,...

![](https://images.viblo.asia/d1aba5c0-21a2-4b37-9f71-629d1dc9c782.png)

# Các điểm quan trọng về loại dữ liệu SQL
* Không phải tất cả các loại dữ liệu được hỗ trợ bởi mọi nhà cung cấp cơ sở dữ liệu quan hệ. Ví dụ: cơ sở dữ liệu Oracle không hỗ trợ dữ liệu DATETIME và MySQL không hỗ trợ kiểu dữ liệu CLOB. Vì vậy, trong khi thiết kế lược đồ cơ sở dữ liệu và viết các truy vấn sql, hãy đảm bảo kiểm tra xem các loại dữ liệu có được hỗ trợ hay không.
* Các loại dữ liệu được liệt kê ở đây không bao gồm tất cả các loại dữ liệu, đây là các loại dữ liệu được sử dụng phổ biến nhất. Một số nhà cung cấp cơ sở dữ liệu quan hệ có các loại dữ liệu riêng có thể không được liệt kê ở đây. Ví dụ: Microsoft SQL Server có các loại dữ liệu money và smallmoney nhưng vì nó không được hỗ trợ bởi các nhà cung cấp cơ sở dữ liệu phổ biến khác, nên nó không được liệt kê ở đây.
* Mỗi nhà cung cấp cơ sở dữ liệu quan hệ đều có giới hạn kích thước tối đa của riêng nó cho các loại dữ liệu khác nhau, bạn không cần phải nhớ giới hạn. Bạn sẽ có kiến thức về loại dữ liệu sẽ được sử dụng trong một trường hợp cụ thể khi bạn sử dụng.

# SQL Numeric Data Types
![](https://images.viblo.asia/3620a247-aa91-41b6-877c-6d6c50abfe07.png)
# SQL Date and Time Data Types
![](https://images.viblo.asia/00e3d409-a476-4008-bd23-6ea8f6ab4c99.png)
# SQL Character and String Data Types
![](https://images.viblo.asia/2b7506bb-32e5-41c7-8591-7b4e52f8d4fb.png)

Lưu ý rằng tất cả các loại dữ liệu trên là dành cho ký tự, chúng không nên được sử dụng với dữ liệu unicode.
# SQL Unicode Character and String Data Types
![](https://images.viblo.asia/be7e686a-603c-416c-abb8-54a34214bda5.png)

Lưu ý rằng các loại dữ liệu trên không được hỗ trợ trong cơ sở dữ liệu MySQL.
# SQL Binary Data Types
![](https://images.viblo.asia/806775ab-99a1-413d-b110-7015b27e69ee.png)
# SQL Miscellaneous Data Types
![](https://images.viblo.asia/e40c2923-7260-4da6-a110-acfc2bb8ef16.png)
# Tổng kết
Thông qua bài viết mình đã liệt kê sơ lược về các loại dữ liệu SQL. Mong là sẽ hữu ích với mọi người.