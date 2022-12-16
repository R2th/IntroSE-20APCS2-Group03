### Bối cảnh
Dự án với hệ thống sử dụng MySQL cho cơ sở dữ liệu. Với thiết kế sử dụng UTF-8 encoding cho các table.
Dự án đã release, chức năng đang hoạt động mượt mà thì một ngày đẹp trời, hệ thống quản lý lỗi bắn về 1 error message.

`Mysql2::Error: Incorrect string value: '\xF0\xA0\xAE\xB7\xE5\xB2...' for column...`

Sau một (vài) hồi tìm hiểu thì dev đưa ra kết luận: 
Do hệ thống hiện tại đang setting DB với charset = "utf8", mà thực ra với MySQL "utf8" lại không hề là UTF-8 như mong muốn thiết kế ban đầu.

### Vậy utf8 của MySQL là gì
Theo như Document của MySQL định nghĩa thì
>utf8 is an alias for the utf8mb3 character set.
>
>The utf8mb3 character set has these characteristics:
>
>・Supports BMP characters only (no support for supplementary characters)
>
>・**Requires a maximum of three bytes per multibyte character.**
>
>Applications that use UTF-8 data but require supplementary character support should use utf8mb4 rather than utf8mb3 (see Section 10.9.1, “The utf8mb4 Character Set (4-Byte UTF-8 Unicode Encoding)”).

https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8.html

https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb3.html

Ta thấy được vấn đề quan trọng nhất, đó là "utf8" của MySQL yêu cầu tối đa 3 bytes cho mỗi kí tự multibyte.
Trong khi đó UTF-8 encoding lại có thể có từ 1 đến 4 bytes.

https://en.wikipedia.org/wiki/UTF-8

Nói ngắn gọn, cái thứ gọi là utf8 của MySQL chỉ encode được "một phần" của UTF-8. Và một ngày đẹp trời lỗi sẽ xảy ra khi xuất hiện 1 character insert vào DB có độ dài lớn hơn 3 bytes.

### Tái hiện lại Bug
Thử tái hiện lại bug trên bằng cách insert 1 kí tự có mã U+1D306 (Là kí hiệu của TETRAGRAM FOR CENTRE (𝌆)) vào MySQL DB.
Setting column của table được insert vào với collation = utf8_unicode_ci, charset = utf8

```
mysql> SET NAMES utf8; # just to emphasize that the connection charset is set to `utf8`
Query OK, 0 rows affected (0.00 sec)

mysql> UPDATE database_name.table_name SET column_name = 'foo𝌆bar' WHERE id = 9001;
Query OK, 1 row affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 1
```

```
mysql> SELECT column_name FROM database_name.table_name WHERE id = 9001;
+-------------+
| column_name |
+-------------+
| foo         |
+-------------+
1 row in set (0.00 sec)
```

Rõ ràng, khi tiến hành query lại data đã insert, phần nội dung đã bị cắt ngắn đi kí hiệu 𝌆
Bên cạnh có, khi kiểm tra warning của MySQL thì nhận được message tương tự ở trên

```
mysql> SHOW WARNINGS;
+---------+------+------------------------------------------------------------------------------+
| Level   | Code | Message                                                                      |
+---------+------+------------------------------------------------------------------------------+
| Warning | 1366 | Incorrect string value: '\xF0\x9D\x8C\x86' for column 'column_name' at row 1 |
+---------+------+------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

Tóm gọn thì:
1. “utf8mb4” của MySQL mới có nghĩa là “UTF-8”.
2. “utf8” của MySQL chỉ có nghĩa là “Một phần character encoding của UTF-8”. Quả là củ chuối.

### Kết luận
Với việc tìm hiểu con bug này thì có thể rút ra được một số bài học

1. Hệ thống cơ sở dữ liệu có các lỗi tinh vi và kỳ quặc, và bạn có thể tránh được rất nhiều lỗi bằng cách tránh các hệ thống cơ sở dữ liệu. (Yaoming)
2. Còn nếu cần phải có database, thì thôi đừng có dùng MySQL hoặc MariaDB. Dùng PostgreSQL đi.
3. Nếu vẫn nhất quyết dùng MySQL hoặc MariaDB, thì chớ bao giờ dùng “utf8”. Luôn dùng “utf8mb4” khi muốn encoding UTF-8.

Nguồn:
https://medium.com/@adamhooper/in-mysql-never-use-utf8-use-utf8mb4-11761243e434
https://mathiasbynens.be/notes/mysql-utf8mb4