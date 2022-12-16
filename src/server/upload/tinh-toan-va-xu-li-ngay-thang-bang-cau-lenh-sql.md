Vừa qua mình vừa có 1 task  liên quan đến việc tính toán và xử lí ngày tháng bằng câu lệnh SQL.  Trong quá trình tìm hiểu và thực hiền mình có rút ra 1 chút kinh nghiệm hay hay nên hôm nay muốn chia sẽ cùng mọi người, mong có thế giúp các bạn khi cần thiết :smile:
# 1. Kiểu dữ liệu ngày SQL.
**MySQL**  có các loại dữ liệu sau cho một ngày hoặc giá trị ngày / thời gian trong cơ sở dữ liệu: 
* **Date** - format YYYY-MM-DD
* **DATETIME** - format: YYYY-MM-DD HH:MI:SS
* **TIMESTAMP** - format: YYYY-MM-DD HH:MI:SS
* **YEAR** - format YYYY hoặc YY

**Sql server**  có các loại dữ liệu sau cho một ngày hoặc giá trị ngày / thời gian trong cơ sở dữ liệu: 
* **DATE** - format YYYY-MM-DD
* **DATETIME** - format: YYYY-MM-DD HH:MI:SS
* **SMALLDATETIME** - format: YYYY-MM-DD HH:MI:SS
* **TIMESTAMP** - format: 1 số duy nhất
# 2. Các funtion thường sử dụng.
| Tên  | Chức năng |
| -------- | -------- | 
| **DATE**()     | Trả về ngày từ biểu thức datetime                 |
| **CURDATE**()     | Trả về ngày hiện tại của máy tính                 |
| **YEAR**()     | Trả về năm của ngày đã chỉ định                 |
|  **MONTH**()  | Trả về tháng của ngày đã chỉ định                 |
| **DAY**()     | Trả về ngày của ngày được chỉ định                 |
| **TIME**()     | Trả về giờ của ngày được chỉ định                 |
| **DATE**()     | Trả về ngày từ biểu thức datetime                 |
| **DATE_ADD**()     | Trả về ngày từ biểu thức datetime                 |
| **DATEDIFF**()    | Trả về ngày từ biểu thức datetime                 |
| **DATE_SUB**()     | Trả về ngày từ biểu thức datetime                 |
| **NOW**()     | Trả về thời gian hiện tại                 |
| **DAYOFWEEK**()     | Trả về ngày của tuần                 |
| **DAYNAME**()    | Trả về tên ngày               |
| **MONTHNAME**()     | Trả về tên tháng                |
| **STR_TO_DATE**()     | Format chuỗi về ngày                |
.......
Ngoài ra còn rất nhiều hàm khác nhưng mình xin phép trình bày một số hàm mà chúng ta hay sử dụng như trên.
# 3. Tính toán 
#### 3.1  Còn bao nhiêu ngày nữa ? 

Câu hỏi này chắc chắn chạy qua đầu của chúng ta ít nhất là hàng tuần nếu không nói là hàng ngày :rofl:

MySQL giải quyết loại câu hỏi này với hàm  **DATEDIFF**()

**DATEDIFF**() trừ hai giá trị ngày và trả về số ngày giữa chúng.
```SQL
SELECT DATEDIFF(CURDATE(), birthday) AS days_difference
     FROM friends
    LIMIT 5;
```

và kết quả là đây : 
![](https://images.viblo.asia/b0b06eb3-92f4-4ec9-bcd4-5d3f5b078a8d.png)

sau khi lấy được số ngày, bạn muốn  xem người đó năm nay bao nhiêu tuổi :point_right: bạn chỉ cần chia cho 365 ngày là ra kết quả số tuổi.
```SQL
SELECT ROUND(DATEDIFF(CURDATE(), birthday) / 365, 0) AS years
    FROM friends
   LIMIT 5;
```
![](https://images.viblo.asia/e372e5e3-f73d-4522-b234-720032ed2299.png)

*Hàm ROUND()toán học được sử dụng để làm tròn kết quả thành một số nguyên.*

Bạn cũng có thể tính toán  tuổi của friends bằng cách sau 
```SQL
SELECT 
    first_name,
    last_name,
    (YEAR(CURDATE()) - YEAR(birthday)) - (RIGHT(CURDATE(), 5) < RIGHT(birthday, 5)) AS years
FROM
    friends
```
*Giải thích 1 chút :*

Hàm CURDATE () trả về ngày hiện tại của máy tính, hàm YEAR () trả về năm của ngày đã chỉ định, hàm MONTH () trả về tháng của ngày đã chỉ định, hàm DAY () trả về ngày của ngày được chỉ định Hàm  RIGHT () trả về số lượng ký tự như được chỉ định trong hàm từ chuỗi hoặc ngày đã cho. Phần của biểu thức so sánh các trả về từ hàm RIGHT () ước tính 1 hoặc 0.
kết quả là : 

![](https://images.viblo.asia/153e4c69-aefe-45da-a0f3-5debd20ab425.png)

Sau khi select được số tuổi của các friend trong khoa trong list friend của mình bạn  muốn sắp xếp số tuổi theo thứ tự giảm dần hoặc tăng dần thì chúng ta chỉ cần 
```SQL
ORDER BY age ASC; //sắp xếp tăng dần
ORDER BY age DESC; // sắp xếp giảm dần 
```
vào cuối mệnh đề trên.
<br>
<br>
#### 3.2 Chúng ta không bao giờ quên sinh nhật phải không?
<br>
<br>
Giả sử chúng ta muốn biết ngày trong tuần là sinh nhật của một người bạn. Có lẽ chúng tôi nhìn vào friends bàn mỗi tuần và biết được ai sẽ sinh nhật, nếu có, và ghi chú ngày hôm nay là ngày gì.

Các DAYOFWEEK()hàm trả về một giá trị số cho tham số giá trị ngày tháng. Những con số đó đại diện cho:

1 = Chủ nhật,

2 = Thứ hai, v.v.

Chúng ta có thể đặt một CASE biểu thức để sử dụng ở đây.
```SQL
SELECT 
    first_name,
    last_name,
    birthday,
    CASE
        WHEN DAYOFWEEK(birthday) = '1' THEN 'Sunday'
        WHEN DAYOFWEEK(birthday) = '2' THEN 'Monday'
        WHEN DAYOFWEEK(birthday) = '3' THEN 'Tuesday'
        WHEN DAYOFWEEK(birthday) = '4' THEN 'Wednesday'
        WHEN DAYOFWEEK(birthday) = '5' THEN 'Thursday'
        WHEN DAYOFWEEK(birthday) = '6' THEN 'Friday'
        WHEN DAYOFWEEK(birthday) = '7' THEN 'Saturday'
        ELSE 'not a day of week'
    END AS day_of_week
FROM
    friends
LIMIT 10
```
![](https://images.viblo.asia/2ab998e8-91ce-4d86-84a8-a2fedef1282f.png)
Awesome! Điều đó hoạt động hoàn hảo. 
Nhưng  nó khá dài để lấy tên 1 ngày trong tuần.

MySQL có một  function **DAYNAME**() phù hợp cho việc này. 
Đơn giản chỉ cần cung cấp cho nó một giá trị ngày và bạn là vàng.

```SQL
SELECT 
    first_name, last_name, DAYNAME(birthday)
FROM
    friends
LIMIT 10
```

![](https://images.viblo.asia/2ab998e8-91ce-4d86-84a8-a2fedef1282f.png)

#### 3.3 Xử lí tháng

Các  hàm MONTH()  được sử dụng để lấy  các giá trị số theo tháng từ một giá trị ngày tháng cung cấp. Như trong 1 nghĩa (tháng 1) và 12 cho (tháng 12) với mọi thứ khác ở giữa.
```SQL
SELECT 
    (MONTH(birthday)) AS month, COUNT(*) AS number_of_birthdays
FROM
    friends
GROUP BY month
ORDER BY month ASC
```
Trong truy vấn này, hàm COUNT()  đến số người có ngày sinh trong mỗi tháng :
![](https://images.viblo.asia/c884b8ed-756a-4402-8700-d6c145b62443.png)
Vậy liệu chúng ta có thể lấy tên của tháng không ? câu trả lởi chắc chắn là có rồi 

Sử dụng  hàm MONTHNAME(), lấy tên của Tháng thực tế từ giá trị ngày đã qua, so với số Tháng qua MONTH().
```SQL
SELECT DISTINCT
    (MONTHNAME(birthday)) AS month,
    COUNT(*) AS number_of_birthdays
FROM
    friends
GROUP BY month
```
Kết quả 
![](https://images.viblo.asia/19714981-3257-4819-a7c4-e1dbf9123582.png)

#### 3.4 Xử lí ngày

Khi bạn có thêm 1 người bạn mới, bạn vui vẻ nhập thông tin người bạn ấy vào  Nhưng, ngày sinh nhật ở dạng chuỗi như 'ngày 10tháng 08 năm 2017'. 
```SQL
SELECT STR_TO_DATE("August 10 2017", "%M %d %Y")
```
![](https://images.viblo.asia/a15f9e93-9e7d-4229-8a78-b2a9866ff579.png)

Giải thích một chút nào :smiley:


%M %d,%Y  được định dạng là 
%M - Tên tháng.
%d - Số ngày trong tháng.
%Y - 4 chữ số năm.

#### 3.5  Ngày có giá trị NOT NULL

 để kiểm tra nếu giá trị ngày không phải là NULL.
```SQL
SELECT 
    first_name, last_name, birthday
FROM
    friends
WHERE
    birthday IS NOT NULL;
```
Câu lệnh MySQL ở trên sẽ lọc các hàng có ngày birthday KHÔNG phải là NULL.

#### 3.5  Lấy ra những ngày trong khoảng ngày từ ngày... đến ngày ...

```SQL
SELECT 
    *
FROM
    friends
WHERE
    birthday BETWEEN '1996-10-05 00:00:00' AND '1996-12-25 23:59:59'
```
![](https://images.viblo.asia/33a5f0ff-dc8a-4dbc-8470-52a8ba78ba28.png)

# 4. Kết luận 
Thông qua các ví dụ thực tế trên, mong có  thể giúp chúng ta có cái nhìn rõ hơn với việc xử lí ngày tháng bằng câu lệnh SQL. Bài viết của mình vẫn còn nhiều thiếu sót rất mong nhận được sự góp ý đóng góp của các bạn để bài viết được hoàn thiện hơn :smiley:


Tài liệu tham khảo :

https://www.w3resource.com/mysql/advance-query-in-mysql/date-calculation.php

https://www.w3school.com
https://codeburst.io/handy-mysql-date-functions-with-examples-93dbd79849c5