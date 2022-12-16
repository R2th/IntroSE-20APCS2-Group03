# Index Selecitivity
Nếu bạn là người hay làm về index, sẽ có những trường hợp các bạn cần phải đánh index cho 1 cột chuỗi kí tự rất dài. Việc này sẽ khiến cho index của bạn trở nên rất lớn và chậm. Bạn có thể đánh index dựa trên vài kí tự đầu thay vì cả cụm kí tự ban đầu.  Điều này làm cho các index của bạn sử dụng ít không gian hơn, nhưng nó cũng làm cho chúng ít chọn lọc.  **Index selecivity** là tỷ lệ của số lượng giá trị được lập chỉ mục riêng biệt (số lượng thẻ) cho tổng số hàng trong bảng (#T) và nằm trong khoảng từ 1 / #T đến1. Một index có tính chọn lọc cao là tốt vì nó cho phép MySQL lọc ra nhiều hàng hơn khi nó tìm kiếm các trận đấu Một chỉ mục duy nhất có độ chọn lọc là 1, tốt như nó có được. Nếu bạn đánh index cho **BLOB**, **TEXT**, hoặc một cột **VARCHAR** dài bạn buộc phải sử dụng prefix index vì MYSQL không cho phép đánh index toàn bộ độ dài.
# Prefix Indexes
Chúng ta có 1 mẹo nhỏ là chọn một prefix đủ dài để cung cấp tính chọn lọc tốt, nhưng ngắn đủ để tiết kiệm không gian. Prefix phải đủ dài để làm cho chỉ mục gần như hữu ích vì nó sẽ được lập index cho toàn bộ cột. Trong bài viết này tôi sử dụng cơ sở dữ liệu Sakila để minh họa cho bài toán cần giải quyết. Bạn có thể tìm hiểu về cách cài đặt, cách sử dụng cơ sở dữ liệu [tại đây ](https://downloads.mysql.com/docs/sakila-en.pdf)

Trong sakila, không có bảng nào đủ dài để chúng ta minh họa cách giải quyết bài toán nên đầu tiên chúng ta sẽ tạo ra 1 bảng **city_demo** mới từ bảng **city** có sẵn trong sakila.
```
CREATE TABLE sakila.city_demo(city VARCHAR(50) NOT NULL);
INSERT INTO sakila.city_demo(city) SELECT city FROM sakila.city;
-- Lăp lại câu lệnh này 5 lần
INSERT INTO sakila.city_demo(city) SELECT city FROM sakila.city_demo;
--Bây giờ chúng ta sẽ random lại phân bố của các record
UPDATE sakila.city_demo
SET city = (SELECT city FROM sakila.city ORDER BY RAND() LIMIT 1);
```

Đầu tiên chúng ta sẽ tìm các thành phố xuất hiện nhiều nhất:
```
SELECT COUNT(*) AS cnt, city
FROM sakila.city_demo GROUP BY city ORDER BY cnt DESC LIMIT 10;
```
Ta có 1 bảng kết quả
![](https://images.viblo.asia/8ebc30a4-4121-41ba-af1f-36270377adf9.png)

Bây giờ chúng ta sẽ tìm các prefix xuất hiện nhiều nhất, bắt đầu với prefix có độ dài là 3.
```
SELECT COUNT(*) AS cnt, LEFT(city, 3) AS pref
FROM sakila.city_demo GROUP BY pref ORDER BY cnt DESC LIMIT 10;
```

Ta nhận được kết quả như sau:
![](https://images.viblo.asia/f1793757-3a7a-4dea-8ceb-f9b83ca2362d.png)

Chúng ta có thể dễ dàng thấy được có rất nhiều sự xuất hiện của một prefix. Chúng ta cần phải tăng độ dài của prefix đến khi prefix có độ chọn lọc gần bằng với độ chọn lọc của cột. Chúng ta thử 1 giá trị khác chẳng hạn là 7.
```
SELECT COUNT(*) AS cnt, LEFT(city, 7) AS pref
FROM sakila.city_demo GROUP BY pref ORDER BY cnt DESC LIMIT 10;
```
Ta nhận được kết quả:
![](https://images.viblo.asia/4282439a-c2c3-4080-94df-1753da531112.png)

Một cách khác để tính độ dài một prefix là đủ tốt bằng việc chúng ta sẽ tính ra độ chọn lọc của cột và chúng ta sẽ tính toàn để độ chọn lọc của prefix gần nhất với giá trị này. Cách để tính độ chọn lọc của cột.
```
SELECT COUNT(DISTINCT city)/COUNT(*) FROM sakila.city_demo;
```
Chúng ta có kết quả:
![](https://images.viblo.asia/e22e7e4e-02c4-42b4-9953-8907ee07b266.png)
Chúng ta sẽ tính độ chọn lọc các prefix có độ dài từ 3 đến 7 đễ xem kết quả
```
SELECT COUNT(DISTINCT LEFT(city, 3))/COUNT(*) AS sel3,
COUNT(DISTINCT LEFT(city, 4))/COUNT(*) AS sel4,
COUNT(DISTINCT LEFT(city, 5))/COUNT(*) AS sel5,
COUNT(DISTINCT LEFT(city, 6))/COUNT(*) AS sel6,
COUNT(DISTINCT LEFT(city, 7))/COUNT(*) AS sel7
FROM sakila.city_demo;
```
Ta nhận được kết quả như sau:
![](https://images.viblo.asia/e32402d4-dad3-4130-bcaa-bbaf1b8be6e4.png)
Chúng ta có thể thấy từ kết quả trên, 7 là 1 length phù hợp cho bài toán. Bây giờ chúng ta sẽ tạo prefix index trên cột đó:
```
ALTER TABLE sakila.city_demo ADD KEY (city(7));
```
Lưu ý, prefix indexes là một cách tốt để index nhỏ và nhanh hơn nhưng chúng cũng có nhược điểm là MySQL không thể sử dụng chúng cho câu truy vấn **ORDER BY** hoặc **GROUP** .

# Tài liệu tham khảo
https://www.highperfmysql.com/