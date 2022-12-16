Đôi khi bạn cần đánh index cho các cột có ký tự rất dài, điều này làm cho index của bạn lớn và chậm. Bạn có thể làm gì?

Bạn có thể tiết kiệm dung lượng và có được hiệu suất tốt bằng cách đánh index một vài ký tự đầu tiên thay vì toàn bộ giá trị. Điều này làm cho các index của bạn sử dụng ít không gian hơn, nhưng nó cũng làm cho chúng ít được lựa chọn hơn. Độ chọn lọc của index là tỷ lệ giữa số lượng giá trị được đánh index riêng biệt với tổng số rows trong bảng (#T) và nằm trong khoảng từ 1/#T đến 1. Index có độ chọn lọc cao là tốt vì nó cho phép MySQL lọc ra nhiều rows hơn khi tìm kiếm các kết quả phù hợp. Index duy nhất có độ chọn lọc bằng 1, càng tốt.

Prefix của column thường đủ tính chọn lọc để mang lại hiệu suất tốt. Nếu bạn đang lập chỉ mục các cột BLOB, TEXT, hoặc các cột VARCHAR rất dài, bạn phải xác định các prefix indexes vì MySQL không cho phép đánh index toàn bộ chiều dài của chúng.

Mẹo là chọn một prefix đủ dài để mang lại khả năng chọn lọc tốt nhưng đủ ngắn để tiết kiệm dung lượng. Prefix phải đủ dài để làm cho index gần như hữu ích nếu bạn đánh index toàn bộ cột. Nói cách khác, bạn muốn số lượng của prefix gần với số lượng của cột đầy đủ.

Để xác định độ dài của prefix tốt, hãy tìm các giá trị thường gặp nhất và so sánh danh sách đó với danh sách các prefix thường gặp nhất. Không có table tốt nào để chứng minh điều này trong cơ sở dữ liệu mẫu của Sakila, vì vậy chúng ta tạo ra một bảng từ bảng city, để chúng ta có đủ dữ liệu để làm việc:

```sql
CREATE TABLE sakila.city_demo(city VARCHAR(50) NOT NULL);
INSERT INTO sakila.city_demo(city) SELECT city FROM sakila.city;
-- Repeat the next statement five times:
INSERT INTO sakila.city_demo(city) SELECT city FROM sakila.city_demo;
-- Now randomize the distribution (inefficiently but conveniently):
UPDATE sakila.city_demo
SET city = (SELECT city FROM sakila.city ORDER BY RAND() LIMIT 1);
```

Bây giờ chúng ta có một tập dữ liệu mẫu. Kết quả không được phân loại thực tế và chúng ta đã sử dụng RAND(), vì vậy kết quả của bạn sẽ khác ví dụ, nhưng điều đó không quan trọng đối với bài tập này. Đầu tiên, chúng ta tìm thấy các thành phố thường xuyên xảy ra nhất:

```sql
mysql> SELECT COUNT(*) AS cnt, city
-> FROM sakila.city_demo GROUP BY city ORDER BY cnt DESC LIMIT 10;
+-----+----------------+
| cnt | city
|
+-----+----------------+
| 65 | London
|
| 49 | Hiroshima
|
| 48 | Teboksary
|
| 48 | Pak Kret
|
| 48 | Yaound
|
| 47 | Tel Aviv-Jaffa
|
| 47 | Shimoga
|
| 45 | Cabuyao
|
| 45 | Callao
|
| 45 | Bislig
|
+-----+----------------+
```

Lưu ý rằng có khoảng 45 đến 65 lần xuất hiện của mỗi giá trị. Bây giờ chúng ta tìm thấy các prefix của tên thành phố xuất hiện thường xuyên nhất, bắt đầu prefix bằng ba chữ cái:

```sql
mysql> SELECT COUNT(*) AS cnt, LEFT(city, 3) AS pref
-> FROM sakila.city_demo GROUP BY pref ORDER BY cnt DESC LIMIT 10;
+-----+------+
| cnt | pref |
+-----+------+
| 483 | San |
| 195 | Cha |
| 177 | Tan |
| 167 | Sou |
| 163 | al- |
| 163 | Sal |
| 146 | Shi |
| 136 | Hal |
| 130 | Val |
| 129 | Bat |
+-----+------+
```

Có nhiều lần xuất hiện hơn của mỗi prefix, do đó, có ít prefix duy nhất hơn tên thành phố có độ dài đầy đủ duy nhất. Ý tưởng là tăng độ dài prefix cho đến khi prefix trở lên chọn lọc gần bằng độ dài đầy đủ của cột. Một thử nghiệm nhỏ cho thấy rằng 7 là một giá trị tốt:

```sql
mysql> SELECT COUNT(*) AS cnt, LEFT(city, 7) AS pref
-> FROM sakila.city_demo GROUP BY pref ORDER BY cnt DESC LIMIT 10;
+-----+---------+
| cnt | pref
|
+-----+---------+
| 70 | Santiag |
| 68 | San Fel |
| 65 | London |
| 61 | Valle d |
| 49 | Hiroshi |
| 48 | Teboksa |
| 48 | Pak Kre |
| 48 | Yaound |
| 47 | Tel Avi |
| 47 | Shimoga |
+-----+---------+
```

Một cách khác để tính toán độ dài prefix tốt là bằng cách tính toán độ chọn lọc của toàn column và cố gắng làm cho độ chọn lọc của prefix gần với giá trị đó. Dưới đây là cách tìm tính chọn lọc của toàn column:

```sql
mysql> SELECT COUNT(DISTINCT city)/COUNT(*) FROM sakila.city_demo;
+-------------------------------+
| COUNT(DISTINCT city)/COUNT(*) |
+-------------------------------+
|
0.0312 |
+-------------------------------+
```

Prefix sẽ tốt ở mức trung bình (tuy nhiên, có một thông báo ở đây), nếu chúng ta nhắm mục tiêu mức độ chọn lọc gần .031. Có thể đánh giá nhiều độ dài khác nhau trong một truy vấn, điều này hữu ích trên các bảng rất lớn. Dưới đây là cách tìm độ chọn lọc của một số độ dài tiền tố trong một truy vấn:

```sql
mysql> SELECT COUNT(DISTINCT LEFT(city, 3))/COUNT(*) AS sel3,
->
COUNT(DISTINCT LEFT(city, 4))/COUNT(*) AS sel4,
->
COUNT(DISTINCT LEFT(city, 5))/COUNT(*) AS sel5,
->
COUNT(DISTINCT LEFT(city, 6))/COUNT(*) AS sel6,
->
COUNT(DISTINCT LEFT(city, 7))/COUNT(*) AS sel7
-> FROM sakila.city_demo;
+--------+--------+--------+--------+--------+
| sel3
| sel4
| sel5
| sel6
| sel7
|
+--------+--------+--------+--------+--------+
| 0.0239 | 0.0293 | 0.0305 | 0.0309 | 0.0310 |
+--------+--------+--------+--------+--------+
```

Truy vấn này cho thấy rằng việc tăng độ dài tiền tố dẫn đến các cải thiện liên tiếp nhỏ hơn khi nó tiếp cận bảy ký tự.

Không nên chỉ xem xét độ chọn lọc trung bình. Lưu ý là tính chọn lọc cũng giảm sút. Độ chọn lọc trung bình có thể khiến bạn nghĩ rằng prefix bốn hoặc năm ký tự là đủ tốt, nhưng nếu dữ liệu của bạn không đồng đều, đó có thể là một cái bẫy. Nếu bạn nhìn vào số lần xuất hiện của các prefix tên thành phố phổ biến nhất sử dụng giá trị 4, bạn sẽ thấy rõ ràng sự không đồng đều:

```sql
mysql> SELECT COUNT(*) AS cnt, LEFT(city, 4) AS pref
-> FROM sakila.city_demo GROUP BY pref ORDER BY cnt DESC LIMIT 5;
+-----+------+
| cnt | pref |
+-----+------+
| 205 | San |
| 200 | Sant |
| 135 | Sout |
| 104 | Chan |
| 91 | Toul |
+-----+------+
```

Với bốn ký tự, các prefix thường xuyên nhất xảy ra thường xuyên hơn một chút so với các giá trị có độ dài đầy đủ thường xuyên nhất. Tức là độ chọn lọc trên các giá trị đó thấp hơn độ chọn lọc trung bình. Nếu bạn có tập dữ liệu thực tế hơn mẫu được tạo ngẫu nhiên này, bạn có thể thấy hiệu ứng này nhiều hơn. Ví dụ: xây dựng prefix index bốn ký tự trên tên thành phố trong thế giới thực sẽ mang lại khả năng chọn lọc khủng khiếp đối với các thành phố bắt đầu bằng “San” và “New”, trong đó có rất nhiều.

Bây giờ chúng ta đã tìm thấy giá trị tốt cho dữ liệu mẫu của mình, đây là cách tạo prefix index trên cột:

```sql
mysql> ALTER TABLE sakila.city_demo ADD KEY (city(7));
```

Các prefix indexes có thể là một cách tuyệt vời để làm cho các indexes nhỏ hơn và nhanh hơn, nhưng chúng cũng có nhược điểm: MySQL không thể sử dụng prefix index cho các truy vấn ORDER BY hoặc GROUP BY, cũng như không thể sử dụng chúng làm index.

Nguồn: High performance MySQL, 3rd