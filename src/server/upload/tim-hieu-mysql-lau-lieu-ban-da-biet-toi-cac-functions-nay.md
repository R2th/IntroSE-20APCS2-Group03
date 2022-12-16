# Giới thiệu
Trong quá trình làm việc cũng như học tập về SQL cụ thể trong bài này mình muốn nói tới là MySQL, vì nó khá phổ biến so với sinh viên hay với những người đã đi làm thì việc sử dụng cơ sở dữ liệu như một điều tất yếu đối với lập trình viên chúng ta. Tuy nhiên ở trường lớp chúng ta cũng chỉ có cơ hội tiếp xúc với những câu lệnh SQL đơn giản, thậm chí khi đi làm 1, 2 năm rồi cũng chưa chắc chúng ta đã có cơ hội để sử dụng hết những `functions` trong MySQL.

Vậy nên ở trong bài viết này mình sẽ giới thiệu cho các bạn một vài `functions` của MySQL khá hữu ích mà đôi khi chúng ta sẽ cần đến.

Các hàm này trong MySQL cũng sẽ có các hàm xử lý kết quả được lấy ra từ database luôn mà không cần đợi đến lúc chúng ta lấy kết quả từ cơ sở dữ liệu ra rồi, lại sử dụng một ngôn ngữ lập trình nào đó, format kết quả đó thành thứ chúng ta mong muốn.
# String functions
Ở phần này mình sẽ giới thiệu cho các bạn một vài các functions trong MySQL để sử lý các chuỗi (string).
## CONCAT()
Nhắc tới hàm `concat` chắc nhiều tín đồ javascript sẽ nhận ra ngay đây cũng là một hàm phổ biến trong javascript được sử dụng để nối chuỗi hoặc merge các mảng lại với nhau. Trong MySQL cũng có hàm `CONCAT` cho riêng mình với tác dụng tương tự, dùng để nối các biểu thức lại với nhau

Cú pháp :
```php
CONCAT(expression1, expression2, expression3,...)
```

Ví dụ 
```php
SELECT Name, CONCAT(Address, " ", City) AS Address
FROM Users;
```
Kết quả


| Name | Address | 
| -------- | -------- | 
| Quang Phú     | Minh Khai Hà Nội     |
| Thu Thủy    | Phú Xuyên Hà Nội     |

## LCASE() và UCASE()
Khi sử dụng hàm `LCASE()`, nó sẽ convert chuỗi được lấy ra dưới dạng lower-case, và ngược lại `UCASE()`  sẽ lấy ra dưới dạng upper-case

Cú pháp :
```php
LCASE(text)
UCASE(text)
```
Ví dụ :
```php
SELECT LCASE(Name) AS LowercaseName
FROM Users;
```
Kết quả :
| LowercaseName | 
| -------- |
| quang phú   | 
| thu thủy |
## LEFT()
Hàm này dùng để trích xuất một số ký tự từ một chuỗi được lấy ra, bắt đầu từ trái qua phải
Cú pháp :
```php
LEFT(string, number_of_chars)
```
Ví dụ :
```php
SELECT LEFT(Name, 3) AS ExtractName
FROM Users;
```
Kết quả
| ExtractName | 
| -------- |
| qua   | 
| thu |
## TRIM()
Hàm này dùng để loại bỏ khoảng trắng đầu cuối. Hàm này khá hữu ích khi dữ liệu của bạn đôi khi được lưu trong cơ sở dữ liệu mà dữ liệu thừa khoảng trắng đầu và cuối. 

Để xử lý việc này MySQL cung cấp luôn cho chúng ta functions này để xử lý dữ liệu ngay khi lấy ra.

Cú pháp
```php
TRIM(string)
```
Ví dụ
```php
SELECT TRIM('    Quang Phú    ') AS TrimmedName;
```
Kết quả
```php
Quang Phú
```
# Numeric functions
Nhắc đến các numeric functions chắc chắc không thể nhắc tới các hàm nổi tiếng được xuất hiện trong các giáo trình hồi đại học của mình như `MAX`, `MIN`, `SUM`, `COUNT`, `AVG`, thì hồi đó trong trí óc của 1 cậu sinh viên của mình chỉ biết tới sợ tồn tại của những functions đó.

Tuy nhiên cũng còn rất nhiều các functions liên quan đến số má các kiểu mà mình sẽ liệt kê vài functions mà mình thấy hay dưới đây
## GREATEST() và LEAST()
Hàm `GREATEST` sẽ trả về giá trị lớn nhất, ngược lại `LEAST` sẽ trả về giá trị nhỏ nhất
Cú pháp :
```php
GREATEST(arg1, arg2, arg3, ...)
LEAST(arg1, arg2, arg3, ...)
```
Ví dụ 
```php
SELECT LEAST(3, 12, 34, 8, 25);
```
Kết quả
```
3
```
## ROUND()
Hàm này sẽ làm tròn một số đến với số thập phân được chỉ định
Cú pháp :
```php
ROUND(number, decimals)
```
với `number` là giá trị cần làm tròn, `decimals` là số chữ số thập phân được làm tròn
Ví dụ :
```php
SELECT ROUND(135.375, 2);
```
Kết quả :
```
135.38
```
## MOD()
Hàm này sẽ trả về kết quả của phép chia
Cú pháp :
```php
MOD(x, y)
// hoặc
x MOD y
// hoặc
x % y
```
Ví dụ 
```php
SELECT 18 MOD 4;
```
Kết quả 
```
2
```
# Date functions
Việc xử lý ngày tháng trong MySQL rõ ràng là điều chúng ta rất cần thiết, vì vậy việc MySQL cung cấp cho chúng ta các hàm để xử lý cũng là điều dễ hiểu, tuy nhiên không phải ai cũng biết.

## DATE_FORMAT()
Trong quá trình làm việc mình thấy đa số việc xử lý ngày tháng sẽ được xử lý sau khi lấy dữ liệu ra bằng các hàm có sẵn của ngôn ngữ lập trình hoặc sử dụng thư viện nên đôi khi làm chúng ta quên đi rằng SQL cũng có cách để chúng ta xử lý ngày tháng.

Hàm `DATE_FORMAT` này mình thấy khá hay được dùng để định dạng ngày tháng.
Cú pháp :
```php
DATE_FORMAT(date, format)
```
trong đó `date` là ngày cần được định dạng, `format` là kiểu cần định dạng ra là gì, giá trị của `format` có thể là các `format` sau
* %d: ngày (giá trị từ 01>31)
* %H: giờ (00->23h)
* %h: giờ (0->12h)
* %M: tháng (January -> December)
* %Y: năm (giá trị trả về là xxxx, 4 số)
* %y: năm (giống %Y những trả về 2 số cuối)

Ngoài ra còn rất nhiều các kiểu định dạng khác mà chúng ta có thể tìm được ở docs của MySQL
Ví dụ :
```php
SELECT DATE_FORMAT("1998-06-12", "%Y");  
```
Kết quả 
```
1998
```
hoặc truyền một lúc nhiều định dạng
```php
SELECT DATE_FORMAT("2017-06-15", "%M %d %Y");
```
Kết quả
```
June 15 2017
```
## DAYOFMONTH()
Ngoài cách định dạng trên để lấy ra giá trị của tháng trong dữ liệu được truyền vào, MySQL cung cấp cho chúng ta hàm `DAYOFMONTH()` để lấy ra kết quả của ngày trong date nhanh hơn.
Cú pháp :
```php
DAYOFMONTH(date)
```
Ví dụ :
```php
SELECT DAYOFMONTH("2017-06-15");  
```
Kết quả 
```
15
```
## EXTRACT()
Hàm này giúp chúng trong việc lấy dự liệu trong date được truyền vào, có thể là ngày, tháng, năm, giờ ...
Cú pháp :
```php
EXTRACT(part FROM date)
```
trong đó với `part` là dữ liệu mà chúng ta cần trích xuất ra
Ví dụ 
```php
SELECT EXTRACT(MONTH FROM "2017-06-15");
```
Kết quả
```
6
```
Ngoài ra còn rất nhiều thuộc tính truyền vào `part` như
`MICROSECOND`,
`SECOND`,
`MINUTE`
`HOUR`,
`DAY`
`DAY_SECOND`,
`DAY_HOUR`,
`YEAR_MONTH` ... tùy vào nhu cầu sử dụng của mỗi người

# Advanced functions
## CASE 
Việc xử lý điều kiện rồi mới trả về kết quả thay vì chúng ta thực thi câu lệnh truy vấn xong r mới lọc kết quả, giờ đây đã có câu điều kiện CASE trong MySQL giúp.

Câu lệnh này sẽ đi qua lần lượt các câu lệnh điều kiện, nếu thỏa mãn lệnh điều kiện nào nó sẽ return luôn giá trị đó, ngược lại nếu không thỏa mãn bất cứ điều kiện nào, nó sẽ đi vào phần ELSE của câu lệnh điều kiện này

Cú pháp :
```php
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```
Ví dụ :
```php
SELECT CustomerName, City, Country FROM Customers
ORDER BY (CASE
WHEN City IS NULL THEN Country
ELSE City
END);
```
Kết quả :


| CustomerName  | City  | Country  |
| -------- | -------- | -------- |
| Drachenblut Delikatessend	     | Aachen     | Germany     |
| Rattlesnake Canyon Grocery		     | Albuquerque     | USA     |
|Folies gourmandes		     | Leipzig     | Germany     |

##  IF
Ngoài câu điều kiện CASE ra thì còn có cả câu điều kiện IF luôn cho anh em sử dụng, việc sử dụng cũng khá dễ dàng

Cú pháp :
```php
IF(condition, value_if_true, value_if_false)
```

Ví dụ :
```php
SELECT OrderID, Quantity, IF(Quantity>10, "MORE", "LESS") as QuantityText
FROM OrderDetails;
```
Kết quả
| OrderID  | Quantity  | QuantityText  |
| -------- | -------- | -------- |
|1	     | 12     | MORE     |
| 2		     | 10     | LESS     |
|3		     | 8     | LESS     |

## COALESCE()
Hàm này sẽ trả về giá trị không null đầu tiên được tìm thấy 

Cú pháp :

```php
COALESCE(val1, val2, ...., val_n)
```

Ví dụ :
```php
SELECT COALESCE(NULL, 1, 2, 'W3Schools.com');
```
Kết quả
```
1
```

## CAST()
Dùng để convert dữ liệu sang một kiểu dữ liệu khác

Cú pháp :
```php
CAST(value AS datatype)
```
trong đó với `datatype` là kiểu dữ liệu muốn convert sang, ví dụ như `DATE`, `DATETIME`, `CHAR`, `TIME`...

Ví dụ 
```php
SELECT CAST("2017-08-29" AS DATE);
```
Kết quả :
```
2017-08-29
```
    
## LAST_INSERT_ID()
Hàm này khá hữu ích trong một số trường hợp khi bạn muốn lấy AUTO_INCREMENT id của record gần nhất được thêm vào cơ sở dữ liệu
Ví dụ :
```
SELECT LAST_INSERT_ID();
```

## DATABASE();
Hàm này dùng để trả về tên của database

Ví dụ :

```php
SELECT DATABASE();
```

# Kết luận
Trên đây là những functions hữu ích trong MySQL mà mình muốn giới thiệu với các bạn, bởi đôi khi các hàm này có sẵn mà chúng ta lại không hề hay biết thì quả là hơi phí :rofl::rofl::rofl:

Nếu bài viết có ích hãy tặng mình 1 upvote nhé !!!