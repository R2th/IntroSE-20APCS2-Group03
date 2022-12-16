> UPDATED: Hiện framework F3 đã không còn được cập nhật thường xuyên. Hãy sử dụng các framework khác thay thế.

Hi, Hello.
Nếu là một lập trình viên về mảng web, chắc các bạn ít nhiều đều **ăn nằm** qua với các framework rồi nhỉ? (mà bây giờ mấy ai đã code chay - đều chọn cho mình một **con gấu**). Và hôm nay đây mình sẽ giới thiệu với các bạn một **con gấu** mới mang tên FatFree Framework, đơn giản gọi là F3.

## FatFree Framework là gì?
Đơn giản mà nói thì nó là một framework của php, không hơn không kém. Nhưng mỗi framework sẽ có những điểm khác nhau (Laravel, Zend Framework,...). Và F3 cũng có những điểm mạnh của nó:
* gọn nhẹ, có thể nói F3 là framework php nhẹ nhất cũng không ngoa chỉ khoảng 65kb zip (theo F3)
* tốc độ render code rất nhanh (đơn giản vì nó nhẹ thôi)
* khá dễ sử dụng và code
* hỗ trợ khá đầy đủ các tính năng cơ bản của một framework (route, view, smart sql ...)
* ... 
Dẫu vậy F3 vẫn có những nhược điểm của nó (cái này các bạn đọc tự tìm hiểu). Nhưng ở đây mình hơi buồn vì F3 không hỗ trợ MVC. Không sao cái này chúng ta có thể xử lý dễ dạng được. Các bạn yên tâm.
## Cách cài đặt
### Yêu cầu 
Không quá khắt khe chỉ đơn giản là version của php >= 5.4
### Cài đặt
Có 2 cách:
1. Đơn giản dễ làm. (kể cả người mới học về web và php)
Vào trang chủ của F3 và download code về thôi. 
* URL trang chủ: https://fatfreeframework.com
* URl download code: https://github.com/bcosca/fatfree/archive/master.zip
Ok như vậy là xong, bây giờ hãy chạy thử f3 nào. http://localhost/f3 (giả định f3 là thư mục index đến Fatfree Framework)
2. Cách này cũng quá ư là đơn giản: sử dụng **composer**
Hãy đảm bảo là máy bạn đã cài **composer**, sau đó thực hiện lệnh:
```
composer require bcosca/fatfree-core
```
Sau đó tại thư mục root của f3, chúng ta tạo một file index.php
```
require 'vendor/autoload.php';
$f3 = \Base::instance();
$f3->route('GET /',
    function() {
        echo 'Hello, world!';
    }
);
$f3->run();
```
Ok vậy là xong.

## Lời kết.
F3 là một framework php không phải mới mẻ nhưng có vẻ sự quan tâm của các dev PHP còn khá ít. Vậy sao bạn không thử nó nhỉ.
* URL trang chủ F3: https://fatfreeframework.com