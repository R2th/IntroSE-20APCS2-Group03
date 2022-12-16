Query ra dữ liệu sau đó xử lý bằng ngôn ngữ lập trình thì cũng ngầu đấy nhưng bạn có biết MySQL cũng đã cung cấp cho chúng ta 1 số functions hữu ích này chưa?

### CHARACTER_LENGTH
Thức ra thì nó cũng chỉ tương tự như 
```ruby
# 1 câu query
a = User.find_by name: "abc"
# cộng 1 function của ngôn ngữ lập trình
a.length
```
thì thay vào đó chúng ta sẽ viết
```ruby
a = User.find_by(name: "abc").select(CHARACTER_LENGTH("users.name") AS name_length)
a.name_length
```
Hmm thực ra thì mình thấy viết kiểu MySql này còn dài hơn ấy :))) nhưng biết thêm 1 cái mới cũng hay mà.

### FORMAT
Cách dùng thì giống CHARACTER_LENGTH nhé. Nhưng công dụng thì khác hoàn toàn nhé<br>
```ruby
FORMAT(number, decimal_places)
```
number: số chúng ta cần format<br>
decimal_places: nghe tên thì chúng ta kiểu là vị trí của số thập phân nhưng các bạn cứ hiểu đơn giản là số chữ số thập phân được lấy thêm. Ví dụ
```sql
SELECT FORMAT(250500.5634, 2);
=> 250,500.56
```

### TRIM
Loại bỏ khoảng trắng đầu cuối. <br>
Cái này khá hay vì nếu bạn query ra 1 đối tượng Post và có trường content cần trim title ở nhiều nơi thì thay vì chỗ nào cũng phải `post.content.strip` dễ bị miss thì bạn có thể trim ngay ở câu truy vấn ví dụ như
```sql
SELECT TRIM('    SQL Tutorial    ') AS TrimmedString;
=> 'SQL Tutorial'
```

### REPLACE
Công dụng của nó cũng giống gsub của ruby - Replace tất cả 1 ký tự hoặc đoạn string nào đó với ký tự hoặc đoạn string khác
```sql
SELECT REPLACE(string, from_string, new_string)
```
Ví dụ:
```sql
SELECT REPLACE("SQL Tutorial", "SQL", "HTML");
=> HTML Tutorial
```

### GREATEST và LEAST
Trả về giá trị lớn nhất và nhỏ nhất. Ví dụ:
```sql
SELECT GREATEST(3, 12, 34, 8, 25);
=> 34
SELECT LEAST(3, 12, 34, 8, 25);
=> 3
```

### DATE_FORMAT
Convert format của kiểu dữ liệu ngày tháng
Ví dụ:
```sql
SELECT DATE_FORMAT("2017-06-15", "%Y");  
=> 2017
```

### CASE
Cái này mình nghĩ thực sự mọi người nên biết vì nó, hỗ trợ mình rất nhiều trong những trường hợp select theo điều kiện oái ăm. <br>
Ví dụ:
```sql
SELECT OrderID, Quantity,
  CASE 
      WHEN Quantity > 30 THEN 'The quantity is greater than 30'
      WHEN Quantity = 30 THEN 'The quantity is 30'
      ELSE 'The quantity is under 30'
  END AS QuantityText
FROM OrderDetails;
```

| OrderID | Quantity | QuantityText |
| -------- | -------- | -------- |
|1	|12|	The quantity is under 30|
|2	|40|	The quantity is greater than 30|
|3	|10|	The quantity is under 30|

### CAST
Convert giá trị sang 1 kiểu dữ liệu cụ thể khác.<br>
Ví dụ:
```sql
SELECT CAST("2017-08-29" AS DATETIME);
=> 2017-08-29 00:00:00
```

### COALESCE
Trả về giá trị đầu tiên không bị Null
```sql
SELECT COALESCE(NULL, NULL, NULL, 'The', NULL, 'Thao');
=> The
```

### IF
Quá quen rồi nhưng cú pháp của nó như này cơ
``` sql
SELECT IF(condition, value_if_true, value_if_false)
# Giống trong excel nhỉ :))
```

### Tổng kết
Đây là 1 số function mà bản thân mình nghĩ nó sẽ hữu ích (trong 1 đống các function có sẵn của MySQL). Hy vọng là nó cũng giúp ích cho mọi người (bow)