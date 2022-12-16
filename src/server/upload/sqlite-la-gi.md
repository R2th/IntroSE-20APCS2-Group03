![](https://images.viblo.asia/0bfcc1fb-677c-49f1-b258-9628e36354a7.jpg)

*Khi thực hiện code với các framework như Django, Flask, Ruby on rail, ... bạn có bao giờ thắc mắc 'SQLite là gì? Tại sao nó lại được tích hợp sẵn vào các framework?'. Để giải đáp thắc mắc này chúng ta hãy cùng tìm hiểu về SQLite nhé!*

## SQLite là gì?
SQLite là hệ quả trị cơ sở dữ liệu (DBMS) quan hệ tương tự như Mysql, ... Đặc điểm nổi bật của SQLite so với các DBMS khác là gọn, nhẹ, đơn giản, đặt biệt không cần mô hình server-client, không cần cài đặt, cấu hình hay khởi động nên không có khái niệm user, password hay quyền hạn trong SQLite Database. Dữ liệu cũng được lưu ở một file duy nhất. 

SQLite thường không được sử dụng với các hệ thống lớn nhưng với những hệ thống ở quy mô vùa và nhỏ thì SQLite không thua các DBMS khác về chức năng hay tốc độ.  Vì không cần cài đặt hay cấu hình nên SQLite được sử dụng nhiều trong việc phát triển, thử nghiệm … vì tránh được những rắc rối trong quá trình cài đặt.

## Tính năng của SQLite

1. Giao dịch trong SQLite tuân thủ theo nguyên tắc (ACID) ngay cả sau hi hệ thống treo và mất điện.
2. Không cấu hình: 
- Không cần thiết lập hoặc quản trị
3. SQLite hỗ trợ với đầy đủ tính năng với các khả năng nâng cao như các chỉ mục 1 phần, các chỉ mục về các biểu thức, JSON và các biểu thức bảng chung.
4. Một sở dữ liệu hoàn chỉnh được lưu trữ trong một tệp đa nền tảng duy nhất. Phù hợp với sử dụng dưới dạng định dạng tệp ứng dụng
5. Hỗ trợ các cơ sở dữ liệu có kích thước terabyte và các chuỗi có kích thước gigabyte.
6. API   
- Đơn giản dễ sử dụng
- Nhanh: Trong một số trường hợp, SQLite nhanh hơn hệ thống tệp tin trực tiếp I/O.
7. Được viết bằng ANSI-C. 
- Bindings cho hàng chục ngôn ngữ khác có sẵn 1 cách riêng biệt.
8. Mã nguồn đầy, nguồn mở đủ có thể kiểm tra nhánh 100%.
9. Nền tảng đa nền tảng: 
- SQLite là có sẵn trên Android, *BSD, iOS, Linux, Mac, Solaris, Windows,.. Dễ dàng dịch chuyển sang các hệ thống khác.

## Ứng dụng chủ yếu của SQLite

1. Cơ sở dữ liệu cho Internet Of Things. 
- SQLite là lựa chọn phổ biến cho các công cụ cơ sở dữ liệu trong điện thoại di động, PDA, máy nghe nhạc mp3, hộp set-top, và các tiện ích điện tử khác.
2. Định dạng tệp ứng dụng. 
- Thay vì sử dụng fopen() để viết XML, JSON, CSV hoặc một số định dạng động quyền vào các tệp đĩa được ứng dụng của bạn sử dụng, hãy sử dụng SQLite. 
3. Cơ sở dữ liệu cho web. 
- Bởi vì SQLite không yêu cầu cấu hình và lưu trữ thông tin trong các tệp đĩa thông thường nên SQLite là lựa chọn phổ biến làm cơ sở dữ liệu để quay lại các trang web vừa và nhỏ.
4. Stand-in cho một doanh nghiệp RDBMS: 
- SQLite được sử dụng như một RDBMS doanh nghiệp cho mục đích trình diễn hoặc để thử nghiệm vì SQLite nhanh và không yêu cầu thiết lập.


## Một số điểm hay ho trong SQLite
1.  AUTOINCREMENT?

- Một cột được khai báo INTEGER PRIMARY KEY sẽ tự động tăng thêm.
- Khi chèn NULL vào cột này thì nó sẽ được tự động chuyển thành 1 số nguyên lớn nhất cột.

2.  Các kiểu dữ liệu
-  SQLite sử dụng một hệ thống kiểu động. Trong SQLite, kiểu dữ liệu là một giá trị được liên kết với chính giá trị đó, không liên kết với Container.
- Các kiểu dữ liệu  Integer, Real, Text, Blob, Null
- SQLite không thực thi ràng buộc dữ liệu. 
    - Dữ liệu loại nào cũng có có thể chèn vào bất kì cột. Nhưng Integer primary key chỉ có thể chèn được số nguyên 64bit.
    - SQLite sử dụng khai báo dữ liệu của một cột làm gợi ý định dạng dữ liệu.
- VD: Với một cột được khai báo integer bạn chèn kiểu chuỗi vào thì nó sẽ cố chuyển chuỗi thành số nguyên nếu có thể sẽ chèn số nguyên đó thay cho chuỗi. => Loại mối quan hệ.

4.  Xóa cột trong bảng
- SQLite có hỗ trợ ALTER TABLE nhưng rất hạn chế chỉ có thể thêm cột và thay đổi tên.
- Nếu muốn xóa cột thì chúng ta thực hiện các bước sau:
    - Tạo bảng mới có các cột cần thiết
    - Sao chép dữ liệu từ bảng cũ vào
    - Xóa bảng cũ
    - Tạo lại bảng với tên bảng cũ
    - Sao chép dữ liệu từ bảng tạm vào
    
```
TRANSACTION;
CREATE TEMPRARY TABLE new_backup (a,b)
INSERT INTO new_backup SELECT a,b FORM old;
DROP TABLE old;
CREATE TABLE old(a,b);
INSERT INTO SELECT a,b FORM new_backup;
DROP TABLE new_backup;
COMMIT;
```

4. Khóa ngoài
- SQLite hỗ trợ khóa ngoài nhưng theo mặc định thì khóa ngoài sẽ tắt.
- Để cho phép thực thi khóa ngoài ta sử dụng câu lệnh

```
PRAGMA foreign keys = ON 

# hoặc biên dịch với
DSQLITE DEFAULT FOREIGN KEYS = 1
```
5. Dấu nháy

SQLite phần biệt cách sử dụng dấu nháy
- Nháy đôi cho tên bảng, cột
- Đơn cho giá trị

6. Mệnh đề GLOB
- So khớp giá trị với các giá trị tương tự bởi sử dụng các toán tử wildcard.
- Không giống LIKE, GLOB phân biệt kiểu chữ và nó theo cú pháp của UNIX để xác định các toán tử Wildcard sau:
    - '*'    : số 0,1 hoặc nhiều số hoặc kí tự  ( tương tự như %)
    - '?'   : 1 số hoặc 1 kí tự đơn  (tương tự như _ )
    
```
SELECT FROM table_name
WHERE column GLOB 'XXXX*'
```

## Cú pháp trong SQLite
SQLite hỗ trợ gần như đầy đủ các cú pháp trong chuẩn SQL92.

Dưới đây là một số câu lệnh thường được sử dụng

| STT |  Cú pháp | Ý nghĩa |
| -------- | -------- | -------- |
|  1    |  `sqlite3 <name.db>`   |  Tạo database    |
|    2  | `ATTACH DATABASE ‘<databasename>’ As ‘<alias-name>’;`    |  Sử dụng database, có thể đặt alias cho database và sử dụng như tên của database, mỗi một lần gọi lệnh sử dụng thì ta có thể sử dụng tên alias khác nhau    |
|      3|  `DETACH DATABASE  ‘<name-name>’; `  |  Xóa cơ sở dữ liệu sử dụng với tên alias    |
|      4| `CREATE TABLE <databasename.tablename>();`    |  Tạo bảng    |
|  5    | `DROP TABLE database_name.table_name;  `  |  Xóa bảng    |
|  6    | `INSERT INTO table_name [(column1, column2,..)] VALUES (value1, value2,..); `   | Thêm dữ liệu vào bảng     |
|  7    | ` INSERT INTO table1 [(column…)] SELECT column FROM table2 [WHERE];`   |   Chèn dữ liệu vào bảng từ một bảng khác   |
|   8   |  `SELECT sql FROM table;   `|   Hiển thị thông tin bảng   |
|   9   | `SELECT ( 12+8) AS ADDITION; #20`    |   Thực hiện biểu thức số học   |
| 10     | `SELECT COUNT(*) AS “RECORDS” FROM table;`    | đếm bảng ghi  trong bảng   |
| 11     |   `SELECT CURRENT_TIMESTAMP; ` |  Hiển thị thời gian hệ thống    |
| 12     | ` UPDATE table_name SET column1 = value,... WHERE ..;`   | Update dữ liệu bảng     |
| 13     |`DELETE FROM table_name WHERE …;`     |  Xóa bản ghi    |
|  14    |  `PRAGMA pragma_name; `  |    Điều khiển các biến môi trường và các flag trạng thái đa dạng |
|  15    |  `PRAGMA pragma_name = value;`   |   Thiết lập giá trị   |
|  16    |  `SELECT ... FROM table1 CROSS JOIN table2 ...`   | CROSS JOIN: kết nối mọi hàng của bảng đầu tiên với mỗi hàng của bảng thứ hai |
|   17  |  `SELECT ... FROM table1 [INNER] JOIN table2 ON conditional_expression ...`   |   INNER JOIN|
| 18     |   `SELECT ... FROM table1 LEFT OUTER JOIN table2 ON conditional_expression ..`.  |   OUTER JOIN: chỉ hỗ trợ LEFT JOIN |
    
    
##  Nhược điểm
    
1. Một số tính năng của SQL92 không được hỗ trợ trong SQLite như ALTER  DROP COLUMN, ADD CONSTRAINT không được hỗ trợ; RIGHT JOIN; TRIGGER; phân quyền GRANT và REVOKE.
 2. Vì SQLite không cần cấu hình, cài đặt, không hỗ trợ GRANT và REVOKE nên việc phân quyền truy cập cơ sở dữ liệu chỉ có thể là quyền truy cập file của hệ thống.
 3. SQLite sử dụng cơ chế coarse-gained locking nên trong cùng một thời điểm có thể hỗ trợ nhiều người đọc dữ liệu, nhưng chỉ có 1 người có thể ghi dữ liệu.
4. SQLite không phù hợp với các hệ thống có nhu cầu xử lý trên một khối lượng dữ liệu lớn, phát sinh liên tục.

*Trên đây là một số kiến thức cơ bản mà mình tìm kiểu được về SQLite.*