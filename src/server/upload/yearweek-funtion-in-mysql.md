In Mysql `YEARWEEK()` function này sẽ trả về năm và tuần của ngày. Bạn truyền vào đối số là ngày cho hàm và sau đó hàm sẽ trả về kết quả cho bạn. 
Bạn cũng có thể tùy chình ngày bắt đầu của một tuần để ngày bắt đầu của tuần là thứ hai hoặc chủ nhật và tuần có thể nằm trong khoảng 0 tới 53 hoặc 1 tới 53.
# syntax
bạn có thể sử dụng hai cách sau
```
YEARWEEK(date)
YEARWEEK(date, mode)
```
Có hai đối số:
`date` ngày bạn truyền vào.
`mode` đối số quyết định một tuần bắt đầu từ thứ hai hoặc chủ nhật và tuần nằm trong khoảng từ 0 tới 53 hoặc 1 tới 53.

Các bạn nhìn bảng sau để biết được `mode` có thể nhận giá bị nào:

| Mode | Ngày bắt đầu của tuần | khoảng tuần | giả thích |
| -------- | -------- | -------- |  --------  |
| 0     | chủ nhật     | 0 - 53     | Với một chủ nhật trong năm |
| 1     | Thứ hai     | 0 - 53     | Với 4 ngày trở lên trong năm|
| 2     | chủ nhật     | 0 - 53     | Với một chủ nhật trong năm |
| 3     | Thứ hai     | 0 - 53     | Với 4 ngày trở lên trong năm |
| 4     | chủ nhật     | 0 - 53     | Với 4 ngày trở lên trong năm |
| 5     | Thứ hai     | 0 - 53     | Với một thứ 2 trong năm |
| 6     | chủ nhật     | 0 - 53     | Với 4 ngày trở lên trong năm |
| 7     | Thứ hai     | 0 - 53     | Với một thứ 2 trong năm |
Những `mode` có kiểu "Với 4 ngày trở lên trong năm", tuần được đánh số theo  ISO 8601:1988
* Nếu tuần có chứ ngày 1 tháng 1 hoặc có 4 ngày trở nên trong năm mới thì đây là tuần 1
* Mặt khác. nó là tuần cuối cùng của năm trước và tuần tiếp theo là tuần 1

Nếu bạn không truyền vào `mode` thì mặc định `mode = 0`

Chúng ta cần đi vào ví dụ có vẻ sẽ dễ hiểu hơn.
# ví dụ 1 - Cách sử dụng cơ bản
Ví dụ với ngày 25/1/2021:
```
SELECT YEARWEEK('2021-01-25') As 'Result';
```
Kết quả:
```
+--------+
| Result |
+--------+
| 202104 |
+--------+
```
Ta có ví dụ với một ngày khác
```
SELECT YEARWEEK('1999-12-25') As 'Result';
```
kết quả:
```
+--------+
| Result |
+--------+
| 199951 |
+--------+
```
# Ví dụ 2 Sử dụng tham số `Mode`
Nếu bạn không chỉ định tham số thứ 2 thì `YEARWEEK()` nhận `mode` là `0`.

Tuy nhiên, Bạn có thể truyền vào đối số `mode` như sau. ví dụ:
```
SELECT YEARWEEK('2019-11-23', 7) AS 'Mode 7';
```
kết quả:
```
+--------+
| Mode 7 |
+--------+
| 201946 |
+--------+
```
với giá trị của `mode` bạn có thể theo dõi bảng bên trên mình đã liệt kê ra. `mode` của `YEARWEEK()` cũng sử dụng giống trong `WEEK()`

Một điểm khác biệt giữa hai hàm này là `WEEK()` nhận `mode` mặc định là từ biến hệ thống `default_week_format`(giá này mặc định của biến này  là 0) còn `YEARWEEK()` sẽ bỏ qua cài đặt này và sử dụng `mode` là 0 cho ta setting trong hệ trông default_week_format.

# Ví dụ 3 So sánh `Modes`
Dưới đây, chúng ta sẽ só sánh nhanh và các bạn có thể nhìn thấy kết quả khác nhau từ thuộc vào giá trị `mode`

ở ví dụ dưới đây mình sẽ viết cùng một mã và chỉ truyền vào khác ngày. và những ngày này là liên tiếp nhau. mùng 5, 6, 7. Bạn có thể nhận thấy là kết quả khá khác nhau tùy thuộc vào ngày và `mode` được sử dụng.
### Date 1: 2019-01-05
```
SET @date = '2019-01-05';
SELECT 
  YEARWEEK(@date, 0) AS 'Mode 0',
  YEARWEEK(@date, 1) AS 'Mode 1',
  YEARWEEK(@date, 2) AS 'Mode 2',
  YEARWEEK(@date, 3) AS 'Mode 3',
  YEARWEEK(@date, 4) AS 'Mode 4',
  YEARWEEK(@date, 5) AS 'Mode 5',
  YEARWEEK(@date, 6) AS 'Mode 6',
  YEARWEEK(@date, 7) AS 'Mode 7';
```

kết quả:
```
+--------+--------+--------+--------+--------+--------+--------+--------+
| Mode 0 | Mode 1 | Mode 2 | Mode 3 | Mode 4 | Mode 5 | Mode 6 | Mode 7 |
+--------+--------+--------+--------+--------+--------+--------+--------+
| 201852 | 201901 | 201852 | 201901 | 201901 | 201853 | 201901 | 201853 |
+--------+--------+--------+--------+--------+--------+--------+--------+
```
### date 2: 2019-01-06
```
SET @date = '2019-01-06';
SELECT 
  YEARWEEK(@date, 0) AS 'Mode 0',
  YEARWEEK(@date, 1) AS 'Mode 1',
  YEARWEEK(@date, 2) AS 'Mode 2',
  YEARWEEK(@date, 3) AS 'Mode 3',
  YEARWEEK(@date, 4) AS 'Mode 4',
  YEARWEEK(@date, 5) AS 'Mode 5',
  YEARWEEK(@date, 6) AS 'Mode 6',
  YEARWEEK(@date, 7) AS 'Mode 7';
```

kết quả:
```
+--------+--------+--------+--------+--------+--------+--------+--------+
| Mode 0 | Mode 1 | Mode 2 | Mode 3 | Mode 4 | Mode 5 | Mode 6 | Mode 7 |
+--------+--------+--------+--------+--------+--------+--------+--------+
| 201901 | 201901 | 201901 | 201901 | 201902 | 201853 | 201902 | 201853 |
+--------+--------+--------+--------+--------+--------+--------+--------+
```
### date 3: 2019-01-07
```
SET @date = '2019-01-07';
SELECT 
  YEARWEEK(@date, 0) AS 'Mode 0',
  YEARWEEK(@date, 1) AS 'Mode 1',
  YEARWEEK(@date, 2) AS 'Mode 2',
  YEARWEEK(@date, 3) AS 'Mode 3',
  YEARWEEK(@date, 4) AS 'Mode 4',
  YEARWEEK(@date, 5) AS 'Mode 5',
  YEARWEEK(@date, 6) AS 'Mode 6',
  YEARWEEK(@date, 7) AS 'Mode 7';
```

kết quả:
```
+--------+--------+--------+--------+--------+--------+--------+--------+
| Mode 0 | Mode 1 | Mode 2 | Mode 3 | Mode 4 | Mode 5 | Mode 6 | Mode 7 |
+--------+--------+--------+--------+--------+--------+--------+--------+
| 201901 | 201902 | 201901 | 201902 | 201902 | 201901 | 201902 | 201901 |
+--------+--------+--------+--------+--------+--------+--------+--------+
```

Nguồi tham khảo: https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_yearweek