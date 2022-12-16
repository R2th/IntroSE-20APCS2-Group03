## **Giới thiệu về My SQL**

**SQL là gì??**<br>
**SQL** (**Structured Query Languge** hay ngôn ngữ truy vấn có cấu trúc) là một loại ngôn ngữ máy tính phổ biến để tạo, sửa, và lấy dữ liệu từ một hệ quản trị [cơ sở dữ liệu quan hệ](https://vi.wikipedia.org/wiki/C%C6%A1_s%E1%BB%9F_d%E1%BB%AF_li%E1%BB%87u_quan_h%E1%BB%87). Ngôn ngữ này phát triển vượt xa so với mục đích ban đầu là để phục vụ các hệ quản trị cơ sở dữ liệu đối tượng-quan hệ. Nó là một tiêu chuẩn **ANSI/ISO**.

**Hệ quản trị cơ sở dữ liệu:**<br>
Một hệ quản trị cơ sở dữ liệu (tiếng Anh: **Database Management System**, viết tắt **DBMS**) là một chương trình máy tính (một bộ các chương trình) được thiết kế để quản lý một cơ sở dữ liệu, một tập hợp dữ liệu lớn có cấu trúc, phục vụ cho các yêu cầu về dữ liệu của một số lượng lớn người sử dụng.<br>
Ví dụ điển hình của hệ quản trị cơ sở dữ liệu bao gồm kế toán, nguồn nhân lực và hệ thống hỗ trợ khách hàng. Đầu tiên, hệ quản trị cơ sở dữ liệu chỉ có ở các công ty lớn với đầy đủ phần cứng cần thiết hỗ trợ cho một tập hợp dữ liệu lớn. Hệ quản trị cơ sở dữ liệu. Gần đây, nó đã trở thành một phần tiêu chuẩn của bất kỳ công ty nào. <br>
Có rất nhiều hệ quản trị CSDL như (**SQL Server** của Microsoft, **MySQL** của Oracle, ... ), nhưng trong bài viết này, chúng ta cùng tìm hiểu **MySQL**

**Giới thiệu về hệ quản trị dữ liệu MySQL:**<br>
**MySQL** là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng. Vì MySQL là hệ quản trị cơ sở dữ liệu tốc độ cao, ổn định và dễ sử dụng, có tính khả chuyển, hoạt động trên nhiều hệ điều hành cung cấp một hệ thống lớn các hàm tiện ích rất mạnh. Với tốc độ và tính bảo mật cao, MySQL rất thích hợp cho các ứng dụng có truy cập CSDL trên internet. Người dùng có thể tải về **MySQL** miễn phí từ trang chủ. **MySQL** có nhiều phiên bản cho các hệ điều hành khác nhau: phiên bản Win32 cho các hệ điều hành dòng **Windows, Linux, Mac OS X, Unix, FreeBSD, NetBSD, Novell NetWare, SGI Irix, Solaris, SunOS**,.. <br>
**MySQL** là một trong những ví dụ rất cơ bản về Hệ Quản trị Cơ sở dữ liệu quan hệ sử dụng Ngôn ngữ truy vấn có cấu trúc (**SQL**). <br>
**MySQL** được sử dụng cho việc bổ trợ NodeJs, PHP, Perl, và nhiều ngôn ngữ khác, làm nơi lưu trữ những thông tin trên các trang web viết bằng NodeJs, PHP hay Perl,... <br>

## Kiểu dữ liệu trong MySQL
**1 Kiểu dữ liệu số**<br>
***1.1 Các kiểu số nguyên***<br>
Các kiểu số nguyên tiêu chuẩn của SQL như **INTEGER** (or INT) và **SMALLINT** đều được hỗ trợ bởi **MySQL**. Và các mở rộng tiêu chuẩn, **MySQL** cũng hỗ trợ các kiểu số nguyên khác như **TINYINT, MEDIUMINT**, và **BIGINT**. Bảng dưới đây sẽ liệt kê các kiểu và không gian lưu trữ đòi hỏi và phạm vi của chúng (Giá trị nhỏ nhất, lớn nhất cho kiểu số nguyên có dấu, và không dấu).
| Kiểu dữ liệu | Độ dài (số byte) | Khoảng giá trị | 
| -------- | -------- | -------- |
|TINYINT|1|-128..127|
|SMALLINT|2|-32768..32767|
|MEDIUMINT|3|-8388608..8388607|
|INT|4|-2147483648..2147483647|
|BIGINT	|8|-9223372036854775808..9223372036854775807|
***1.2 Kiểu dấu chấm động (Floating-Point Types)*** <br>
Kiểu dữ liệu **FLOAT** và **DOUBLE** mô tả gần đúng các giá trị số thực. MySQL sử dụng 4 byte để lưu trữ dữ liệu **FLOAT** và 8 byte dành cho kiểu dữ liệu **DOUBLE**.
| Kiểu dữ liệu | Độ dài (số byte) | Khoảng giá trị |
| -------- | -------- | -------- |
|FLOAT|4|-3.402823466E+38..-1.175494351E-38|
|DOUBLE|8|-1.7976931348623157E+308..-2.2250738585072014E- 308|
***1.3 Kiểu dấu chấm cố định (Fixed-Point Types)***
Kiểu dấu chấm cố định (Fixed-Point data type) được sử dụng để bảo vệ độ chính xác (precision), ví dụ như với dữ liệu tiền tệ. Trong MySQL kiểu **DECIMAL** và **NUMERIC** lưu trữ chính xác các dữ liệu số. MySQL 5.6 lưu trữ giá trị **DECIMAL** theo định dạng nhị phân.<br>
Trong SQL chuẩn, cú pháp **DECIMAL(5,2)** nghĩa là độ chính xác (precision) là 5, và 2 là phần thập phân (scale), nghĩa là nó có thể lưu trữ một giá trị có 5 chữ số trong đó có 2 số thập phân. Vì vậy giá trị lưu trữ sẽ là -999.99 tới 999.99.  Cú pháp **DECIMAL(M)** tương đương với **DECIMAL(M,0)**. Tương tự DECIMAL tương đương với **DECIMAL(M,0)** ở đây M mặc định là 10. <br>
Độ dài tối đa các con số cho **DECIMAL** là 65.<br>
***1.4 Kiểu dữ liệu Bit (Bit Value Types)***
Kiểu dữ liệu BIT được sử dụng để lưu trữ trường giá trị bit. Kiểu BIT(N) có thể lưu trữ N giá trị bit. N có phạm vi từ 1 tới 64. Để chỉ định giá trị các bit, có thể sử dụng b'value'. value là dẫy các số nhị phân  0 hoặc 1. Ví dụ b'111' mô tả số 7, và b'10000000' mô tả số 128.<br><br>
**2 Các kiểu Date and Time**<br>
Các kiểu dữ liệu ngày tháng và thời gian đại diện bao gồm **DATE**, **TIME**, **DATETIME**, **TIMESTAMP**, and **YEAR**. Mỗi kiểu có một phạm vi hợp lệ.<br>
|Kiểu dữ liệu|Mô tả|Định dạng hiển thị|Phạm vi|
| -------- | -------- | -------- |-------- |
|DATETIME|Sử dụng khi bạn cần giá trị lưu trữ cả hai thông tin ngày tháng và thời gian.|YYYY-MM-DD HH:MM:SS|'1000-01-01 00:00:00' to '9999-12-31 23:59:59'.|
|DATE|Sử dụng khi bạn muốn lưu trữ chỉ thông tin ngày tháng.|YYYY-MM-DD|'1000-01-01' to '9999-12-31'.|
|TIMESTAMP|Lưu trữ cả hai thông tin ngày tháng và thời gian. Giá trị này sẽ được chuyển đổi từ múi giờ hiện tại sang UTC trong khi lưu trữ, và sẽ chuyển trở lại múi giờ hiện tại khi lấy dữ liệu ra.|YYYY-MM-DD HH:MM:SS|'1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC|
<br>**3 Kiểu dữ liệu CHAR và VARCHAR**
|Kiểu dữ liệu|Mô tả|Định dạng hiển thị|Phạm vi các ký tự|
| -------- | -------- | -------- |-------- |
CHAR|Chứa chuỗi không  phải nhị phân (non-binary strings). Độ dài là cố định như khi bạn khai báo cột của bảng. Khi lưu trữ chúng được độn thêm bên phải (right-padded) để có độ dài chỉ được chỉ định.|Khoảng trắng phía trước (Trailing spaces) được loại bỏ|Giá trị từ 0 tới 255|
VARCHAR|Chứa các chuỗi không phải nhịn phân (non-binary strings). Cột là chuỗi có chiều dài thay đổi.|Giống như lưu trữ.|Giá trị từ 0 tới 255 với MySQL trước phiên bản 5.0.3. Và 0 tới 65,535 với các phiên bản MySQL 5.0.3 hoặc mới hơn.|

## Mối quan hệ và ràng buộc MySQL
Các ràng buộc(constraint) SQL được sử dụng để chỉ định các quy tắc cho dữ liệu trong bảng.<br>
SQL được sử dụng để chỉ định các quy tắc cho dữ liệu trong bảng.<br>
Các ràng buộc được sử dụng để giới hạn loại dữ liệu có thể đi vào bảng. Điều này đảm bảo tính chính xác và độ tin cậy của dữ liệu trong bảng. Nếu có bất kỳ vi phạm nào giữa ràng buộc và hành động dữ liệu, hành động đó sẽ bị hủy bỏ.<br>
Các ràng buộc sau thường được sử dụng trong SQL:
* **NOT NULL** – Đảm bảo rằng một cột không thể có giá trị **NULL**
* **UNIQUE** – Đảm bảo rằng tất cả các giá trị trong một cột là khác nhau
* **PRIMARY KEY** – Sự kết hợp giữa KHÔNG ĐẦY ĐỦ và ĐỘC ĐÁO. Xác định duy nhất từng hàng trong bảng
* **FOREIGN KEY** – Xác định duy nhất một hàng / bản ghi trong bảng khác
* **CHECK** – Đảm bảo rằng tất cả các giá trị trong một cột thỏa mãn một điều kiện cụ thể
* **DEFAULT** – Đặt giá trị mặc định cho một cột khi không có giá trị nào được chỉ định
* **INDEX** – Được sử dụng để tạo và truy xuất dữ liệu từ cơ sở dữ liệu rất nhanh chóng

**Quan hệ: Là sự liên kết giữa 2 hay nhiều thực thể**
* **Kiểu quan hệ giữa các kiểu thực thể**: tập tất cả các quan hệ giống nhau trên các thực thể của kiểu thực thể.
* **Cấp liên kết**: Là số kiểu thực thể tham gia vào liên kết đó
* **Ràng buộc trên kiểu liên kết**
* **Ràng buộc tỉ số:** Xét mối quan hệ nhị phân R (cấp 2) giữa 2 tập thực thể A và B
![](https://images.viblo.asia/f5ccc590-ad10-446f-b490-a55684aba6e5.png)

## Truy vấn nhiều bảng với JOIN trong SQL
Cách truy vấn nhiều bảng, sử dụng các loại JOIN như LEFT JOIN, RIGHT JOIN, INNER JOIN trong SQL để lấy dữ liệu kết hợp<br>
**Các kiểu JOIN**<br>
Cách khớp nối bảng ở trên (sử dụng điều kiện khớp nối ở mệnh đề where) sử dụng với khớp nối thông thường, thực tế SQL sử dụng từ khóa join với nhiều cách kết nối bảng khách nhau. Gồm có:<br>
* **inner join** : trả về các bản ghi có giá trị phù hợp giữa hai bảng (nhớ lại phép giao hai tập hợp).
* **left join** : mọi bản ghi bảng bên trái được trả về, bản ghi nào phù hợp với bản ghi bên phải thì nó được bổ sung thêm dữ liệu từ bản ghi bảng bên phải (nếu không có thì nhận NULL)
* **right join** : mọi bản ghi bảng bên phải được trả về, sau bổ sung dữ liệu phù hợp từ bảng bên trái.
* **outer join (full join)** :mọi bản ghi ở bảng trái và bảng phải kết hợp lại

![](https://images.viblo.asia/236bcca8-8701-4a07-9a1a-9fc5a6fa5ef1.jpg)


## **Một số lệnh trong MySQL** <br>
***1, Lệnh CREATE*** <br>
Lệnh **CREATE** để tạo một thực thể mới trong **MySQL**. Cấu trúc chung: `CREATE + <Loại thực thể> + <Tên thực thể> + <Tùy chọn>` <br>
* Tạo một Database mới: `CREATE DATABASE + <Tên Database>`
* Tạo một bảng mới: `CREATE TABLE + <Tên bảng>`
* Tạo một bảng ảo mới: `CREATE VIEW <Tên bảng> AS  <Câu lệnh truy vấn SELECT>`
* Tạo một hàm mới: `CREATE FUNCTION <tên hàm> (<Tham số truyền vào>) RETURNS datatype [options] sqlcode`
* Tạo thủ tục mới: `CREATE PROCEDURE <tên thủ tục> (<Tham số truyền vào>) [options] sqlcode`
* Tạo một Trigger mới: `CREATE TRIGGER <Tên Trigger> BEFORE | AFTER INSERT | UPDATE | DELETE ON tablename FOR EACH ROW sql-code`

***2, Lệnh DROP*** <br>
Lệnh **DROP** dùng để xóa một thực thể trong **MySQL**. Cấu trúc chung:` DROP + <Loại thực thể> + <Tên thực thể>` <br>
* Xóa một Database: `DROP DATABASE + <Tên Database>`
* Xóa một bảng: `DROP TABLE + <Tên bảng>`
* Xóa một bảng ảo: `DROP VIEW <Tên bảng>`
* Xóa một hàm: `DROP FUNCTION <tên hàm>`
* Xóa thủ tục: `DROP PROCEDURE <tên thủ tục> `
* Xóa một Trigger: `DROP TRIGGER <Tên Trigger>`

***3, Lệnh ALTER*** <br>
Lệnh **ALTER** để sửa thông tin một thực thể trong **MySQL**. Cấu trúc chung: `ALTER + <Loại thực thể> + <Tên thực thể> + <Tùy chọn>` <br>

***4, Lệnh SELECT dữ liệu***<br>
Câu lệnh **SELECT** trong **MySQL** được sử dụng để lấy các bản ghi từ một hoặc nhiều bảng. <br>
Cú pháp cho câu lệnh SELECT trong MySQL là:
```
SELECT [ ALL | DISTINCT ]
expressions
FROM tables, view
[WHERE conditions]
[GROUP BY expressions]
[HAVING condition]
[ORDER BY expression [ ASC | DESC ]]
[LIMIT [offset_value] number_rows | LIMIT number_rows OFFSET offset_value]
[PROCEDURE procedure_name]
[INTO [ OUTFILE 'file_name' options 
       | DUMPFILE 'file_name'
       | @variable1, @variable2, ... @variable_n ]
[FOR UPDATE | LOCK IN SHARE MODE];
```

***5, Lệnh INSERT trong MySQL***<br>
Câu lệnh **INSERT** trong **MySQL** được sử dụng để chèn một bản ghi đơn hoặc nhiều bản ghi vào một bảng.<br>
Cú pháp cho câu lệnh INSERT trong MySQL
```
INSERT INTO table
(column1, column2, ... )
VALUES
(expression1, expression2, ... ),
(expression1, expression2, ... ),
...;
```
Hoặc cú pháp cho câu lệnh INSERT khi lấy dữ liệu từ bảng ghi khác
```
INSERT INTO table
(column1, column2, ... )
SELECT expression1, expression2, ...
FROM source_table
[WHERE conditions];
```

***6, Lệnh UPDATE trong MySQL*** <br>
Câu lệnh **UPDATE** trong **MySQL** được sử dụng để cập nhật các bản ghi hiện có trong một bảng.<br>
Cú pháp cho câu lệnh UPDATE MySQL là:
```
UPDATE table
SET column1 = expression1,
    column2 = expression2,
    ...
[WHERE conditions]
[ORDER BY expression [ ASC | DESC ]]
[LIMIT number_rows];
```
Cú pháp cho câu lệnh UPDATE MySQL khi cập nhật một bảng với dữ liệu từ một bảng khác là:
```
UPDATE table1
SET column1 = (SELECT expression1
               FROM table2
               WHERE conditions)
[WHERE conditions];
```
Cú pháp cho câu lệnh UPDATE MySQL khi cập nhật nhiều bảng là:
```
UPDATE table1, table2, ... 
SET column1 = expression1,
    column2 = expression2,
    ...
WHERE table1.column = table2.column
AND conditions;
```
***7, Lệnh DELETE trong MySQL***<br>
Câu lệnh **DELETE** trong **MySQL** được sử dụng để xóa một hoặc nhiều bản ghi từ một bảng.<br>
Cú pháp cho câu lệnh DELETE trong MySQL là:
```
DELETE FROM table
[WHERE conditions]
[ORDER BY expression [ ASC | DESC ]]
[LIMIT number_rows];
```
***8,Lệnh TRUNCATE trong MySQL***<br>
Câu lệnh **TRUNCATE** trong **MySQL** được sử dụng để xóa hết dữ liệu của bảng và **reset transaction log**, ***vì thế khi tạo 1 record mới, giá trị của id sẽ bắt đầu từ 1***, đây cũng chính là khác biệt lớn nhất của DELETE và TRUNCATE.
```
TRUNCATE [TABLE] [database_name.]table_name;
```
<br><br><br>
*Như vậy bài viết của mình đã nói về một số vấn đề cơ bản của MySQL<br> Hẹn gặp bạn ở một bài viết khác*
<br><br><br>
***Tài liệu tham khảo***
* [Wikipedia](https://vi.wikipedia.org/)