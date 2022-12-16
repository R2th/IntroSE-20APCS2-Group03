Như trong [phần 1](https://viblo.asia/p/cac-function-trong-mysql-phan-1-yMnKMnODZ7P) mình xin giới thiệu thêm một số hàm trong Mysql khác nữa
Sử dụng lại bảng cũ nhé.

Ta dùng lại bảng ```sinh_vien``` với các dữ liệu như sau:
 ```sql
SELECT * FROM sinh_vien;
+----+---------+-------------------------+-------+
| id |  ho_ten |  mon_hoc                | diem  |
+----+---------+-------------------------+-------+
|  1 | Craig   | Quan tri doanh nghiep   |8      |
|  2 | Craig   | Toan Cao cap            |9      |
|  3 | Lee     | Kinh te vi mo           |7      |
|  4 | Emma    | Lap trinh C             |8      |
|  5 | Lee     | Lap tring C#            |7      |
|  6 | James   | Toan hoc va giai thuat  |10     |
|  7 | Harry   | Mo hinh toan            |9      |
|  8 | John    | Tu tuong Mac-Lenin      |8      |
+----+---------+-------------------------+-------+
```
## 8. GROUP BY
Mệnh đề ```GROUP BY``` trong SQL được sử dụng kết hợp với lệnh ```SELECT``` để sắp xếp dữ liệu đồng nhất vào trong các nhóm.

Lưu ý là mệnh đề ```GROUP BY``` phải theo sau các điều kiện trong mệnh đề ```WHERE``` và phải đứng trước mệnh đề ```ORDER BY``` nếu được sử dụng.

Ví dụ nếu muốn biết tổng điểm tất cả các môn của sinh viên, thì truy vấn ```GROUP BY``` sẽ như sau:
```sql
SELECT ho_ten, SUM(diem)
FROM sinh_vien
GROUP BY ho_ten;
```
Kết  quả truy vấn

```sql
+---------+---------+
| ho_ten  |SUM(diem)|
+---------+---------+
| Craig   |17       |
| Emma    |8        |
| Harry   |9        |
| James   |10       |
| John    |8        |
| Lee     |14       |
+---------+---------+
```
## 9. CONCAT
Hàm này được sử dụng để nối hai chuỗi để tạo thành một chuỗi đơn.

Ví dụ:
 
Ví dụ dựa trên bảng ```sinh_vien```, bạn muốn nối các cột ```id```, ```ho_ten```, và ```diem```, thì bạn có thể thực hiện điều này sử dụng lệnh:
```sql
SELECT CONCAT(id, ho_ten, diem)
FROM sinh_vien;
```
Kết quả
```sql
+-------------------------+
| CONCAT(id, ho_ten, diem)|
+-------------------------+
| 1Craig8                 |
| 2Craig9                 |
| 3Lee7                   |
| 4Emma8                  |
| 5Lee7                   |
| 6James10                |
| 7Harry9                 |
| 8John8                  |
+-------------------------+
```

## 10. SQRT
Hàm này trong SQL được sử dụng để tính căn bậc hai của bất kỳ số đã cho nào.

Ví dụ

GIả sử, bạn muốn tính căn bậc hai của tất cả ```diem```, thì bạn có thể thực hiện điều này bởi sử dụng lệnh:
```sql
SELECT ho_ten, SQRT(diem)
FROM sinh_vien;
```
Kết quả:
```sql
+---------+-------------------+
| ho_ten  |SQRT(diem)         |
+---------+-------------------+
| Craig   |2.8284271247461903 |
| Craig   |3                  |
| Lee     |2.6457513110645907 |
| Emma    |2.8284271247461903 |
| Lee     |2.6457513110645907 |
| James   |3.1622776601683795 |
| Harry   |3                  |
| John    |2.8284271247461903 |
+---------+-------------------+
```
## 11. NUMERIC
Hàm xử lý số trong SQL được sử dụng để thao tác trên các số và thực hiện các phép tính số học. Bảng dưới liệt kê chi tiết các hàm xử lý số này:

|Tên hàm|Miêu tả|
|---|---|
Hàm ABS()|	Trả về giá trị tuyệt đối của biểu thức số|
Hàm ACOS()|	Trả về arcos của biểu thức số. Hàm trả về NULL nếu giá trị không trong dãy -1 tới 1|
Hàm ASIN()|	Trả về arcsin của biểu thức số. Hàm trả về NULL nếu giá trị không trong dãy -1 tới 1|
Hàm ATAN()	|Trả về arctan của biểu thức số|
Hàm ATAN2()	|Trả về arctan của hai biến đã truyền cho nó|
Hàm BIT_AND()|	Trả về kết quả từ phép toán Bitwise AND trên tất cả bit trong biểu thức đã truyền|
Hàm BIT_COUNT()|	Trả về biểu diễn chuỗi của giá trị nhị phân đã truyền cho nó|
Hàm BIT_OR()|	Trả về kết quả từ phép toán Bitwise OR trên tất cả bit trong biểu thức đã truyền|
Hàm CEIL()|Trả về giá trị nguyên nhỏ nhất mà không nhỏ hơn biểu thức số đã truyền|
Hàm CEILING()|	Trả về giá trị nguyên nhỏ nhất mà không nhỏ hơn biểu thức số đã truyền|
Hàm CONV()|	Chuyển đổi một biểu thức số từ một hệ cơ số sang hệ cơ số khác|
Hàm COS()	|Trả về cos của biểu thức số đã truyền. Biểu thức số nên được biểu diễn bằng giá trị radian|
Hàm COT()|	Trả về cotan của biểu thức số đã truyền|
Hàm DEGREES()|	Trả về biểu thức số đã được chuyển đổi từ radian sang độ|
Hàm EXP()|	Trả về giá trị hàm mũ với cơ số e|
Hàm FLOOR()	|Trả về giá trị nguyên lớn nhất mà không lớn hơn biểu thức số đã truyền|
Hàm FORMAT()|Trả về biểu thức số đã được làm tròn về một số vị trí sau dấu phảy đã cho|
Hàm GREATEST()	|Trả về giá trị lớn nhất của các biểu thức input|
Hàm INTERVAL()	|Nhận các biểu thức exp1, exp2 và exp3, ... và trả về 0 nếu exp1 là nhỏ hơn exp2, trả về 1 nếu exp1 là nhỏ hơn exp3 và …|
Hàm LEAST()|	Trả về giá trị nhỏ nhất trong các biểu thức input đã nhập|
Hàm LOG()	|Trả về ln (loga nepe) của biểu thức số đã truyền|
Hàm LOG10()	|Trả về log10 của biểu thức số đã truyền|
Hàm MOD()|	Trả về phần dư của phép chia hai biểu thức số|
Hàm OCT()|	Trả về biểu diễn chuỗi của giá trị cơ số 8 của biểu thức số đã truyền. Trả về NULL nếu giá trị đã truyền là NULL|
Hàm PI()	|Trả về giá trị của PI|
Hàm POW()|	Trả về giá trị hàm mũ của hai số|
Hàm POWER()	|Trả về giá trị hàm mũ của hai số|
Hàm RADIANS()	|Trả về giá trị của biểu thức đã truyền sau khi đã chuyển đổi từ độ sang radian|
Hàm ROUND()|	Trả về biểu thức số đã được làm tròn về một số nguyên. Có thể được sử dụng để làm tròn một biểu thức số về vị trí sau dấu phảy nào đó|
Hàm SIN()|	Trả về sin của biểu thức số đã cho (được cung cấp với giá trị radian)|
Hàm SQRT()|Trả về căn bậc hai của biểu thức số|
Hàm STD()|	Trả về độ lệch chuẩn (phương sai) của biểu thức số|
Hàm STDDEV()|	Trả về độ lệch chuẩn (phương sai) của biểu thức số|
Hàm TAN()	|Trả về tan của biểu thức số đã cho (được cung cấp với giá trị radian)|
Hàm TRUNCATE()|	Trả về biểu thức expr1 đã bị cắt về số vị trí sau dấu phảy cụ thể đã được xác định bởi expr2. Nếu expr2 là 0, thì kết quả sẽ không có dấu thập phân|
## 12. STRING
Hàm xử lý chuỗi trong SQL được sử dụng để thao tác với chuỗi. 
Ta có bảng liệt kê chi tiết các hàm xử lý chuỗi quan trọng trong SQL.

|Tên hàm	|Miêu tả|
| -------- | -------- |
|Hàm ASCII()|Trả về giá trị số của ký tự cực tả (bên trái nhất)|
|Hàm BIN()|	Trả về một biểu diễn chuỗi của tham số|
|Hàm BIT_LENGTH()|	Trả về độ dài (số bit) của tham số|
|Hàm CHAR_LENGTH()|	Trả về số ký tự của tham số|
|Hàm CHAR()|	Trả về ký tự cho mỗi số nguyên đã truyền|
|Hàm CHARACTER_LENGTH()|	Giống hàm CHAR_LENGTH()|
|Hàm CONCAT_WS()|	Viết tắt của Concatenate With Separator, là một mẫu hàm CONCAT() đặc biệt|
|Hàm CONCAT()|	Nối chuỗi|
|Hàm CONV()|	Chuyển đổi các số sang các cơ số khác nhau|
|Hàm ELT()|	Trả về chuỗi tại chỉ mục|
|Hàm EXPORT_SET()|	Trả về một chuỗi để mà với một bit được thiết lập trong bits, bạn lấy một chuỗi con, và với mỗi khi không được thiết lập trong bits, bạn lấy chuỗi off. Các bit trong tham số bits được tính từ phải qua trái|
|Hàm FIELD()|	Trả về chỉ mục (vị trí) của tham số đầu tiên trong dãy các tham số|
|Hàm FIND_IN_SET()|	Trả về chỉ mục (vị trí) của tham số đầu tiên trong tham số thứ hai|
|Hàm FORMAT()	|Trả về một số được định dạng với một vị trí sau dấu thập phân đã cho|
|Hàm HEX()|	Trả về một biểu diễn chuỗi của một giá trị thuộc hệ cơ số 16|
|Hàm INSERT()|	Chèn một chuỗi con tại vị trí đã cho với số ký tự đã xác định|
|Hàm INSTR()|	Trả về chỉ mục cho sự xuất hiện đầu tiên của chuỗi con|
|Hàm LCASE()|	Giống hàm LOWER()|
|Hàm LEFT()	|Trả về ký tự bên trái nhất|
|Hàm LENGTH()|	Trả về độ dài (số byte) của một chuỗi|
|Hàm LOAD_FILE()|	Tải file đã được đặt tên|
|Hàm LOCATE()	|Trả về vị trí của sự xuất hiện đầu tiên của chuỗi con|
|Hàm LOWER()|	Trả về tham số trong kiểu chữ thường|
|Hàm LPAD()|	Trả về tham số chuỗi đã được thêm vào bên trái với chuỗi đã cho|
|Hàm LTRIM()|	Xóa các Leading space (theo dõi ví dụ để hiểu ý nghĩa của leading space nếu bạn chưa biết)|
|Hàm MAKE_SET()|	Trả về một tập hợp chuỗi được phân biệt bởi dấu phảy mà có bit tương ứng trong tập hợp các bit|
|Hàm MID()|	Trả về một chuỗi phụ bắt đầu từ vị trí đã cho|
|Hàm OCT()|	Trả về biểu diễn chuỗi của tham số thuộc hệ cơ số 8|
|Hàm OCTET_LENGTH()	|Giống hàm LENGTH()|
|Hàm ORD()|	Nếu ký tự cực tả của tham số là một ký tự được biểu diễn bởi nhiều byte, trả về mã hóa của ký tự đó|
|Hàm POSITION()|	Giống hàm LOCATE()|
|Hàm QUOTE()|	Lấy tham số để sử dụng trong một lệnh SQL|
|Hàm REGEXP	Pattern matching (so khớp mẫu) |sử dụng Regular Expression|
|Hàm REPEAT()|	Lặp lại một chuỗi với số lần đã cho|
|Hàm REPLACE()|	Thay thế một chuỗi đã cho nếu xuất hiện|
|Hàm REVERSE()|	Đảo ngược các ký tự trong một chuỗi|
|Hàm RIGHT()	|Trả về ký tự bên phải nhất|
|Hàm RPAD()|	Phụ thêm chuỗi với số lần đã cho|
|Hàm RTRIM()|	Gỡ bỏ các Trailing space|
|Hàm SOUNDEX()|	Trả về một chuỗi soundex|
|Hàm SOUNDS LIKE|	So sánh các sound|
|Hàm SPACE()|	Trả về một chuỗi gồm số khoảng trống đã cho|
|Hàm STRCMP()|	So sánh hai chuỗi|
|Hàm SUBSTRING_INDEX()|	Trả về một chuỗi con từ một chuỗi trước số lần xuất hiện đã cho của delimiter|
|Hàm SUBSTRING(), SUBSTR()|	Trả về chuỗi phụ như đã xác định|
|Hàm TRIM()|	Gỡ bỏ Leading và Trailing space|
|Hàm UCASE()|	Giống hàm UPPER()|
|Hàm UNHEX()|	Chuyển đổi mỗi cặp chữ số thập lục phân thành một ký tự|
|Hàm UPPER()|	Chuyển đổi thành chữ hoa|

## 13. DATE & TIME
Bảng dưới liệt kê tất cả các hàm quan trọng liên quan tới xử lý Date và Time trong SQL. 
Có các hàm đa dạng khác nhau được hỗ trợ bởi RDBMS. Danh sách dưới đây dựa trên MySQL RDBMS.

|Tên|	Miêu tả|
|---|---|
Hàm ADDDATE()|	Cộng các date|
Hàm ADDTIME()|	Cộng time|
Hàm CONVERT_TZ()|	Chuyển đổi từ một Timezone tới Timezone khác|
Hàm CURDATE()|	Trả về date hiện tại|
Hàm CURRENT_DATE()|CURRENT_DATE	Giống hàm CURDATE()|
Hàm CURRENT_TIME()| CURRENT_TIME	Giống hàm CURTIME()|
Hàm CURRENT_TIMESTAMP()|CURRENT_TIMESTAMP	Giống hàm NOW()|
Hàm CURTIME()|	Returns the current time|
Hàm DATE_ADD()	|Cộng hai date|
Hàm DATE_FORMAT()	|Định dạng date như đã được xác định|
Hàm DATE_SUB()|	Trừ hai date cho nhau|
Hàm DATE()|	Trích một phần của biểu thức biểu diễn date hoặc datetime|
Hàm DATEDIFF()|	Trừ hai date cho nhau|
Hàm DAY()|	Giống hàm DAYOFMONTH()|
Hàm DAYNAME()	|Trả về tên của ngày trong tuần|
Hàm DAYOFMONTH()|	Trả về ngày trong tháng (1-31)|
Hàm DAYOFWEEK()|	Trả về chỉ mục ngày trong tuần của tham số|
Hàm DAYOFYEAR()|	Trả về ngày trong năm (1-366)|
Hàm EXTRACT|	Trích một phần biểu diễn của một date|
Hàm FROM_DAYS()|	Chuyển đổi một số biểu diễn ngày thành date|
|Hàm FROM_UNIXTIME()|	Định dạng date ở dạng UNIX timestamp|
|Hàm HOUR()	|Trích giờ từ biểu thức biểu diễn date|
|Hàm LAST_DAY|	Trả về ngày cuối cùng của tháng cho tham số|
|Hàm LOCALTIME()|, LOCALTIME	Giống hàm NOW()|
|Hàm LOCALTIMESTAMP, LOCALTIMESTAMP()	|Giống hàm NOW()|
|Hàm MAKEDATE()|	Tạo một date từ năm và ngày trong năm|
|Hàm MAKETIME|	Trả về một giá trị time đã được ước lượng từ các tham số hour, minute, và second|
|Hàm MICROSECOND()	|Trả về số microsecond từ tham số|
|Hàm MINUTE()|	Trả về phút từ tham số|
|Hàm MONTH()|	Trả về tháng từ date đã truyền|
|Hàm MONTHNAME()|	Trả về tên tháng|
|Hàm NOW()	|Trả về date và time hiện tại|
|Hàm PERIOD_ADD()	|Thêm một period tới một year-month|
|Hàm PERIOD_DIFF()	|Trả về số các tháng giữa các period|
|Hàm QUARTER()|	Trả về Quí từ một tham số date|
|Hàm SEC_TO_TIME()|	Chuyển đổi giây sang định dạng 'HH:MM:SS'|
|Hàm SECOND()|	Trả về giây (0-59)|
|Hàm STR_TO_DATE()|	Chuyển đổi một chuỗi thành một date|
|Hàm SUBDATE()|	Khi được triệu hồi với bat ham số, hàm này giống hàm DATE_SUB()|
|Hàm SUBTIME()|	Trừ các time cho nhau|
|Hàm SYSDATE()|	Trả về time tại đó hàm thực thi|
|Hàm TIME_FORMAT()|	Định dạng ở dạng time|
|Hàm TIME_TO_SEC()|	Trả về tham số được chuyển đổi thành số giây|
|Hàm TIME()	|Trích một phần time từ biểu thức đã truyền|
|Hàm TIMEDIFF()	|Trừ các time cho nhau|
|Hàm TIMESTAMP()	|Với một tham số đơn, hàm này trả về biểu thức date hoặc datetime. Với hai tham số, nó tính tổng hai tham số|
|Hàm TIMESTAMPADD()	|Cộng mỗi khoảng thời gian vào một biểu thức datetime|
|Hàm TIMESTAMPDIFF()	|Trừ đi một khoảng thời gian từ một biểu thức datetime|
|Hàm TO_DAYS()|	Trả về tham số date đã được chuyển đổi thành các ngày|
|Hàm UNIX_TIMESTAMP()|	Trả về một UNIX timestamp|
|Hàm UTC_DATE()|	Trả về UTC date hiện tại|
|Hàm UTC_TIME()	|Trả về UTC time hiện tại|
|Hàm UTC_TIMESTAMP()	|Trả về UTC date và time hiện tại|
|Hàm WEEK()|	Trả về số tuần|
|Hàm WEEKDAY()|	Trả về chỉ mục số ngày trong tuần|
|Hàm WEEKOFYEAR()	|Trả về tuần theo lịch (1-53) của date|
|Hàm YEAR()|	Trả về năm|
|Hàm YEARWEEK()|	Trả về năm và tuần|
 

Nguồn tham khảo: https://www.tutorialspoint.com