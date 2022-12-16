Các kiểu dữ liệu SQL xác định loại giá trị có thể được lưu trữ trong một cột trong bảng.
Ví dụ: nếu chúng ta muốn một cột chỉ lưu trữ các giá trị nguyên, thì chúng ta có thể định nghĩa nó kiểu dữ liệu là int.

Đối với QA chúng ta, việc nắm bắt và hiểu được các kiểu dữ liệu giúp chúng ta xác định các data test phù hợp và tạo các trường hợp kiểm thử Normal/Abnormal đầy đủ và chính xác hơn.

##  1. Kiểu dữ liệu số (Numeric Data Types)
### 1.1 Kiểu dữ liệu số nguyên

Các kiểu số nguyên tiêu chuẩn của MySQL là INTEGER (or INT) và SMALLINT. Ngoài ra, MySQL cũng hỗ trợ các kiểu số nguyên khác như TINYINT, MEDIUMINT, và BIGINT.
Mỗi kiểu dữ liệu có không gian lưu trữ khác nhau.

* TINYINT 
   + Độ dài (số byte): 1
   + Giá trị lưu trữ (có dấu): -128 **-** 127
   + Giá trị lưu trữ (không dấu): 0 **-** 255
* SMALLINT
   + Độ dài (số byte): 2
   + Giá trị lưu trữ (có dấu): -32768 **-** 32767
   + Giá trị lưu trữ (không dấu): 0 **-** 65535
* MEDIUMINT
   + Độ dài (số byte): 3
   + Giá trị lưu trữ (có dấu): -8388608 **-** 	8388607 
   + Giá trị lưu trữ (không dấu): 0 **-** 16777215
* INT
   + Độ dài (số byte): 4
   + Giá trị lưu trữ (có dấu): 	-2147483648 **-** 	2147483647
   + Giá trị lưu trữ (không dấu): 0 **-** 4294967295
* BIGINT
   + Độ dài (số byte): 8
   + Giá trị lưu trữ (có dấu): 	-9223372036854775808 **-** 	92233720368 54775807
   + Giá trị lưu trữ (không dấu): 0 **-** 184467440737 09551615

### 1.2 Kiểu dữ liệu số thực

Kiểu dữ liệu FLOAT và DOUBLE mô tả gần đúng các giá trị số thực. MySQL sử dụng 4 byte để lưu trữ dữ liệu FLOAT và 8 byte dành cho kiểu dữ liệu DOUBLE.

* FLOAT(M,D)
   + (M) là độ dài phần nguyên
   + (D) là độ dài phần thập phân
   + Độ dài (số byte): 4
   + Giá trị lưu trữ (có dấu): 	-3.402823466E+38 **-** 	-1.175494351E-38
   + Giá trị lưu trữ (không dấu): 1.175494351E-38  **-** 3.402823466E+38

* DOUBLE(M,D)
   + (M) là độ dài phần nguyên
   + (D) là độ dài phần thập phân
   + Độ dài (số byte): 8
   + Giá trị lưu trữ (có dấu): -1.7976931348623157E+ 308 **-** 	-2.2250738585072014E- 308
   + Giá trị lưu trữ (không dấu): 0 and 2.2250738585072014E- 308   **-** 1.7976931348623157E+ 308

### 1.3 Kiểu dữ liệu DECIMAL và NUMERIC

Trong MySQL kiểu DECIMAL và NUMERIC lưu trữ chính xác các dữ liệu số, định dạng nhị phân.
Kiểu dữ liệu này thường được áp dụng với dữ liệu tiền tệ, đơn giá.

*Ví dụ: Decimal (5,2): Nghĩa là nó có thể lưu trữ một giá trị có 5 chữ số trong đó có 2 số thập phân*

##  2. Kiểu dữ liệu Date and Time

Các kiểu dữ liệu ngày tháng và thời gian thường bao gồm DATE, TIME, DATETIME, TIMESTAMP và YEAR. 

### 2.1 Kiểu dữ liệu DATE

Sử dụng khi bạn muốn lưu trữ chỉ thông tin ngày tháng.
+ Định dạng hiển thị: YYYY-MM-DD
+ Phạm vi thời gian: **'1000-01-01 00:00:00'** to **'9999-12-31'**

### 2.2 Kiểu dữ liệu DATETIME

Sử dụng khi bạn cần giá trị lưu trữ cả hai thông tin ngày tháng và thời gian.
+ Định dạng hiển thị: YYYY-MM-DD HH:MM:SS
+ Phạm vi thời gian: **'1000-01-01 00:00:00'** to **'9999-12-31 23:59:59'**

### 2.3 Kiểu dữ liệu TIMESTAMP

Sử dụng khi bạn cần giá trị lưu trữ thời gian.
+ Định dạng hiển thị: HH:MM:SS
+ Phạm vi thời gian: **'-838:59:59'** to **'838:59:59'**

*Lưu ý: Phần thời gian có thể lớn bởi vì kiểu TIME có thể không chỉ mô tả thời gian của một ngày (Vốn chỉ có tối đa 24 giờ), mà nó có thể là thời gian trôi qua hoặc khoảng thời gian giữa hai sự kiện (Cái mà có thể lớn hơn 24h thậm trí có giá trị âm).*

*Sự khác biệt chính của **DATETIME** và **TIMESTAMP** là giá trị của TIMESTAMP được chuyển đổi từ múi giờ hiện tại sang UTC trong khi lưu trữ, và chuyển ngược trở lại từ UTC sang múi giờ hiện tại trong lúc lấy ra. Còn kiểu dữ liệu DATETIME thì không có gì thay đổi.*

### 2.4 Kiểu dữ liệu YEAR

Kiểu dữ liệu YEAR được sử dụng 1-byte để mô tả giá trị.
* YEAR(2)
   + Chỉ định rõ chiều rộng hiển thị là 2 ký tự
   + Định dạng hiển thị: Hiển thị 2 số cuối của năm
   + Phạm vi: **'0'** to **'99'**
   
* YEAR(4) 
   + Chỉ định rõ chiều rộng hiển thị là 4 ký tự. Nếu không chỉ rõ chiều rộng mặc định là 4 ký tự
   + Định dạng hiển thị: YYYY
   + Phạm vi: **'1901'** to **'2155'**

##  3. Kiểu chuỗi (String Types)

Các kiểu dữ liệu String bao gồm:
* CHAR
* VARCHAR
* BINARY
* VARBINARY
* BLOB
* TEXT
* ENUM
* SET

### 3.1 Kiểu dữ liệu CHAR và VARCHAR
Kiểu dữ liệu CHAR và VARCHAR là giống nhau, nhưng khác nhau ở cách chúng được lưu trữ và truy xuất. Chúng cũng khác nhau về chiều dài tối đa và giữ lại hay không khoảng trắng phía trước (gọi là trailing spaces).

* **CHAR**
  + Định dạng hiển thị: Khoảng trắng phía trước (Trailing spaces) được loại bỏ
  + Phạm vi các ký tự: **'0'** to **'255'**
  
* **VARCHAR**
  + Định dạng hiển thị: Giống như data được nhập và lưu trữ
  + Phạm vi các ký tự: **'0'** to **'65535'**

###  3.2 Kiểu dữ liệu BINARY và VARBINARY

Các kiểu dữ liệu BINARY và VARBINARY tương tự như CHAR và VARCHAR, ngoại trừ việc chúng có chứa các chuỗi nhị phân chứ không phải là chuỗi non-binary.

* **BINARY**
  + Định dạng hiển thị: Chứa các chuỗi nhị phân (Binary Strings)
  + Phạm vi các ký tự: **'0'** to **'255'**

* **VARBINARY**
  + Định dạng hiển thị: Chứa các chuỗi nhị phân (Binary Strings)
  + Phạm vi các ký tự: **'0'** to **'65535'**

###  3.3 Kiểu dữ liệu BLOB và TEXT

**BLOB**

Là một đối tượng nhị phân lớn (Binary Large OBject) có thể chứa một lượng lớn dữ liệu. Có 4 loại BLOB:
+ TINYBLOB (Chiều dài tối đa là 255 ký tự)
+  BLOB
+  MEDIUMBLOB (Chiều dài tối đa là 16777215 ký tự)
+  LONGBLOB (Chiều dài tối đa là 4294967295 ký tự)


**TEXT**

Lưu trữ giá trị được coi như một chuỗi các ký tự có mã hóa (character set).
Có 4 loại TEXT tương ứng với bốn loại BLOB:
+ TINYTEXT (Chiều dài tối đa là 255 ký tự)
+ TEXT
+ MEDIUMTEXT (Chiều dài tối đa là 16777215 ký tự)
+ LONGTEXT (Chiều dài tối đa là 4294967295 ký tự)

###  3.4 Kiểu dữ liệu ENUM

Khi định nghĩa một trường kiểu này, tức là, ta đã chỉ ra một danh sách các đối tượng mà trường phải nhận (có thể là Null). 

Ví dụ, nếu ta muốn một trường nào đó chỉ nhận một trong các giá trị "A" hoặc "B" hoặc "C" thì ta phải định nghĩa kiểu ENUM cho nó như sau: ENUM ('A', 'B', 'C'). Và chỉ có các giá trị này (hoặc NULL) có thể xuất hiện trong trường đó.


Tổng hợp từ các nguồn:
https://shareprogramming.net/sql-datatypes-cac-kieu-du-lieu-trong-sql/
https://nentang.vn/app/edu/khoa-hoc/co-so-du-lieu/co-so-du-lieu-mysql/lessons/cac-kieu-du-lieu-trong-mysql