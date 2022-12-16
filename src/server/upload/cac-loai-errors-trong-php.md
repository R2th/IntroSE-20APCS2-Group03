## Mở đầu
Khi bạn bắt đầu ngồi tìm hiểu PHP và code PHP thì sẽ gặp những lần chương trình bạn bị lỗi, khi đó màn hình sẽ hiển thị ra thông tin lỗi cho bạn. Bạn sẽ tập trung fix lỗi đó nên có thể bạn sẽ không để ý phân biệt lỗi đó là thuộc loại lỗi nào. Mình cũng đã từng như vậy, vậy nên hôm nay mình quyết định tìm hiểu lại về các loại lỗi trong PHP. Trong PHP có nhiều loại lỗi khác nhau trong PHP nhưng về cơ bản nó chứa bốn loại lỗi chính sau đây và cùng mình tìm hiểu từng loại nhé.
+ Parse error or Syntax Error
+ Fatal Error
+ Warning Errors
+ Notice Error

### Parse error or Syntax Error
Lỗi phân tích cú pháp hoặc lỗi cú pháp là loại lỗi được lập trình viên thực hiện trong code của chương trình, lỗi cú pháp được phát hiện ra khi chương trình thực hiện biên dịch code. Sau khi sửa lỗi cú pháp thì sẽ biên dịch code và thực thi nó. Lỗi phân tích cú pháp có thể được gây ra bởi các sai sót như bị thiếu dấu ngoặc kép, thiếu dấu ngoặc đơn, thiếu dấu ngoặc nhọn, thiếu dấu chấm phảy, ..v.v

**Example**
```php
<?php 
$x = 'hello'; 
y = 'welcome; 
echo $x; 
echo $y; 
?> 
```

**Error**
```
PHP Parse error:  syntax error, unexpected '=' 
in /home/18cb2875ac563160a6120819bab084c8.php on line 3
```

### Fatal Error
Đây là loại lỗi khi biên dịch code PHP và hiểu những gì mình viết, tuy nhiên nó nhận ra trong đó có một hàm không được khai báo. Điều này có nghĩa là hàm được gọi nhưng hàm đó lại không được định nghĩa. Và dừng thực thi chương trình.

**Example**
```php
<?php 
  
function add($x, $y) 
{ 
    $sum = $x + $y; 
    echo 'sum = ' . $sum; 
} 
$x = 0; 
$y = 20; 
add($x, $y); 
  
diff($x, $y); 
?> 
```

**Error**
```
PHP Fatal error:  Uncaught Error: 
Call to undefined function diff() 
in /home/36db1ad4634ff7deb7f7347a4ac14d3a.php:12

Stack trace:
#0 {main}
  thrown in /home/36db1ad4634ff7deb7f7347a4ac14d3a.php on line 12
```
### Warning Errors
Đây là lỗi cảnh báo và không dừng việc thực thi chương trình. Lý do chính cho các lỗi cảnh báo là bao gồm một file nào đó bị thiếu hoặc sử dụng tham số không chính xác trong một chức năng.

**Example**
```php
<?php  
  
$x = 'Hello world'; 
  
include ('hello.php'); 
  
echo $x . 'welcome'; 
?> 
```

**Error**
```
PHP Warning:  include(hello.php): failed to 
open stream: No such file or directory in 
/home/aed0ed3b35fece41022f332aba5c9b45.php on line 5
PHP Warning:  include(): Failed opening 'hello.php'
 for inclusion (include_path='.:/usr/share/php') in 
/home/aed0ed3b35fece41022f332aba5c9b45.php on line 5
```
### Notice Error
Đây là một lỗi giống như `Warning Errors`, tức là những lỗi nhỏ, không nghiêm trọng mà PHP gặp phải khi thực thi tập lệnh - ví dụ: truy cập vào một biến chưa được xác định. Theo mặc định, các lỗi như vậy hoàn toàn không được hiển thị cho người dùng - mặc dù hành vi mặc định có thể được thay đổi.

**Example**
```php
<?php  
  
$x = 'Hello world'; 
  
echo $x; 
  
echo $y; 
?> 
```

**Error**
```
PHP Notice:  Undefined variable: y in 
/home/84c47fe936e1068b69fb834508d59689.php on line 5
```

### PHP error constants

| Constant | Description |
| -------- | -------- |
| E_ERROR     | Một lỗi nghiêm trọng gây ra dừng chương trình.     |
| E_WARNING     | Lỗi cảnh báo nhưng không dừng chương trình.    |
| E_PARSE     | Lỗi thời gian biên dịch phân tích cú pháp.     |
| E_NOTICE     | Chạy thông báo thời gian gây ra do lỗi trong code.     |
| E_CORE_ERROR     | Lỗi nghiêm trọng xảy ra trong quá trình khởi động (cài đặt) PHP.     |
| E_CORE_WARNING     | Các cảnh báo xảy ra trong quá trình khởi động ban đầu PHP.     |
| E_COMPILE_ERROR     | Sự cố chỉ báo lỗi thời gian biên dịch nghiêm trọng.     |
| E_USER_ERROR     | Thông báo lỗi do người dùng tạo.    |
| E_USER_WARNING     | Thông báo cảnh báo do người dùng tạo.     |
| E_USER_NOTICE     | Báo thông báo do người dùng tạo.     |
| E_STRICT     | Thông báo thời gian chạy.     |
| E_RECOVERABLE_ERROR     | Lỗi nghiêm trọng có thể bắt được chỉ ra lỗi nguy hiểm     |
| E_DEPRECATED     | Thông báo thời gian chạy.     |

## Kết luận
Trên đây mình vừa tìm hiểu những loại lỗi cơ bản mà chúng ta hay gặp trong PHP, hi vọng bài viết sẽ giúp bạn hiểu thêm về từng loại lỗi trong PHP trong thời gian tìm hiểu về PHP cũng như lúc bạn học tập và làm việc. Cảm ơn các bạn đã đọc bài viết của mình!

Bài viết tham khảo: https://www.quora.com/What-are-the-different-types-of-errors-in-PHP