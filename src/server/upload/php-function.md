### 1) Hàm (Function):
Hàm là một khối câu lệnh có thể được sử dụng lặp đi lặp lại trong một chương trình

Một chức năng sẽ không tự động thực thi khi tải trang

Một hàm sẽ được thực thi bởi một lời gọi hàm

Cú pháp :

```php
function functionName() {
    code to be executed;
}
```

#### Đối số trong hàm (Arguments):
Trong một hàm chúng ta có thể gọi các đối số để thực hiện những nhiệm vụ, hành động trong hàm

Ví dụ: 

Hàm có1 đối số:
```php
<?php
function familyName($fname) {
  echo "$fname Mine.<br>";
}

familyName("Jani");
?>

Kết quả: Jani Mine
```
Hàm có 2 đối số:
```php
<?php
function familyName($fname, $year) {
  echo "$fname Mine. Born in $year <br>";
}

familyName("Hege", "2001");
?>
Kết quả: Hege Mine. Born in 2001
```
#### Trả về giá trị (Returning values):
Để hàm trả về 1 giá trị, sử dụng câu lệnh **return**

Ví dụ:
```php
<?php
function sum(int $x, int $y) {
  $z = $x + $y;
  return $z;
}
echo "5 + 10 = " . sum(5, 10);
?>
Kết quả: 5 + 10 = 15
```

### 2) Hàm có sẵn trong PHP:
Trong PHP có rất nhiều hàm có sẵn để sử dụng giúp cho việc code trở nên nhanh chóng, dễ dàng hơn

#### Hàm date():
**Định nghĩa:** Định dạng ngày giờ cục bộ và trả về chuỗi ngày tháng đã định dạng

**Cú pháp:** 
```php
date(format, timestamp)
```
**Format:** 

Y: năm,

m: tháng,

d: ngày,

H: giờ,

i: phút,

s: giây

Ví dụ:
```php
echo 'Today is: ' . date("Y-m-d h:i:s");
kết quả: Today is: 2020-11-6 10:15:01
```
Đây là thời gian lấy trên server, không đúng với thời gian thực.

Hàm date() kết hợp với hàm **date_default_timezone_set("Asia/Bangkok")** để định dạng về đúng nơi hiện tại 

Ví dụ:
```php
date_default_timezone_set("Asia/Bangkok");
echo 'Today is: ' . date("Y-m-d h:i:s");
kết quả: Today is: 2020-11-6 4:18:30
```
Hàm date() kết hợp cùng nhiều hàm để thay đổi thời gian theo mong muốn của người dùng.

Sử dụng hàm:  **strtotime()** thay đổi thời gian.

Ví dụ: 
```php
date_default_timezone_set("Asia/Bangkok");
echo 'Today is: ' . date("Y-m-d h:i:s", strtotime("+4 months -3 days"));
kết quả: Today is: 2020-03-03 4:22:30 
```

### 3)Tài liệu: 
https://www.w3schools.com/php/func_date_date.asp
https://www.php.net/manual/en/function.date.php