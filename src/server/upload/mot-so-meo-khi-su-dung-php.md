# Mở đầu
![](https://images.viblo.asia/0b1ac480-84b9-4855-b304-5536e705e9c3.png)

- Lập trình PHP đã tăng lên nhanh chóng kể từ khi bắt đầu khiêm tốn của nó từ năm 1995.Kể từ đó, PHP đã trở thành ngôn ngữ lập trình phổ biến nhất cho các ứng dụng Web. Nhiều trang web phổ biến được xây dựng bằng PHP và phần lớn các mã nguồn và dự án Web được xây dựng với ngôn ngữ phổ biến.
- Hướng dẫn này nhằm vào những người vừa mới bắt đầu học PHP và sẵn sàng xắn tay áo lên và code.
- Dưới đây là một số kỹ thuật tuyệt vời mà các nhà phát triển PHP nên học và sử dụng mỗi khi họ lập trình.
- Những mẹo này sẽ tăng tốc độ thành thạo và làm cho mã nguồn sạch hơn và tối ưu hóa hơn cho hiệu suất.
# Nội dung
## 1. Tránh SQL Injection
- VD: Khi người dùng nhập thông tin đăng nhập và bấm login, thông tin của người dùng sẽ được gửi một tới server thông qua một POST request sau đó sẽ được gán vào một câu lệnh SQL. Đoạn code đó sẽ trông như này:
```sql
$query = "SELECT * FROM users WHERE email = '" . $_POST['email'] . "' AND password = '" . $_POST['password'] . "'"; 
```
- Giả sử dữ liệu gửi lên `email="linhdn1198@gmail.com"` và `password="12345678"` thì câu query sẽ như sau:
```sql
$query = "SELECT * FROM users WHERE email='linhdn1198@gmail.com' AND password='12345678'"
```
- Đấy là trường hợp người dùng nhập đúng vậy nếu người dùng cố tình nhập sai thì sao?

![](https://images.viblo.asia/42d0c76c-0d34-4301-869a-13286ba959b5.png)

- Kết quả câu query sẽ như dưới, người dùng chỉ cần nhập email là có thể truy cập được.
```sql
SELECT * FROM users WHERE email='linhdn1198@gmail.com' OR 1=1; 
-- ' AND password='123456' 
```
#### Vậy làm thế nào để tránh tấn công SQL Injection
- Đừng bao giờ tin vào thông tin người dùng nhập vào.
- Validate dữ liệu trên server side: Sử dụng hàm `mysql_real_escape_string()` để loại bỏ những kí tự có thể gây ảnh hưởng đến câu lệnh SQL.
```php
$email = mysql_real_escape_string($_POST['email']); 
$password = mysql_real_escape_string($_POST['password']); 
```
- Sử dụng command parameters https://www.php.net/pdo
```php
<?php
$query = $db->prepare('SELECT * FROM users WHERE email=:email AND password=:password');

$query->execute([
    'email' => $_POST['email'],
    'password' => $_POST['password'],
]);
```
## 2. Sự khác biệt giữa các toán tử so sánh
- Đây là một mẹo hay, nhưng cần một ví dụ thực tế chứng minh khi một so sánh không nghiêm ngặt có thể gây ra vấn đề.
- Nếu bạn sử dụng `strpose()` để xác định xem một chuỗi con có tồn tại trong một chuỗi hay không (nó trả về FALSE nếu không tìm thấy chuỗi con và trả về vị trí đầu tiên xuất hiện của chuỗi con), kết quả có thể gây hiểu nhầm:
```php
<?php

$authors = 'Chris & Sean';

if (strpos($authors, 'Chris')) {
    echo 'Chris is an author.';
} else {
    echo 'Chris is not an author.';
}
```
- Vì chuỗi con Chris xuất hiện ở đầu 'Chris & Sean', `strpose()` trả về đúng 0, cho biết vị trí đầu tiên trong chuỗi.
- Bởi vì câu lệnh có điều kiện coi đây là Boolean, nó trả về FALSE. và kết quả sẽ là `Chris is not an author.` -> Sai logic
- Điều này có thể được sửa chữa bằng một so sánh nghiêm ngặt:
```php
<?php

if (strpos($authors, 'Chris') !== FALSE) {
    echo 'Chris is an author.';
} else {
    echo 'Chris is not an author.';
}
```
## 3. Shortcut The Else
- Kiểm tra người dùng có phải admin không? dựa vào username.
```php
<?php

if (auth($username) == 'admin') {
    $admin = TRUE;
} else {
    $admin = FALSE;
}
```
- Đoạn code trên có vẻ ổn, nhưng nếu nhà phát triển sau đó thêm một role khác.
```php
<?php

if (auth($username) == 'admin') {
    $admin = TRUE;
} elseif (auth($username) == 'mod') {
    $moderator = TRUE;
} else {
    $admin = FALSE;
    $moderator = FALSE;
}
```
- Đoạn code trên, nếu người dùng cung cấp tên ngừoi chạy vào điều kiện `auth($username) == 'mod'` thì $admin chưa được khởi tạo. Điều này có thể dẫn đến kết quả không mong muốn hoặc lỗ hổng bảo mật.
- Ngoài ra, một case tương tự `$moderator` không được khởi tạo khi chạy điều kiện `auth($username) == 'admin'`.
- Bằng cách khởi tạo `$admin` và `$moderator` đầu tiên để tránh được tình huống này.
```php
<?php

$admin = FALSE;
$moderator = FALSE;

if (auth($username) == 'admin') {
    $admin = TRUE;
} elseif (auth($username) == 'mod') {
    $moderator = TRUE;
} else {
    $admin = FALSE;
    $moderator = FALSE;
}
```
- Nên tạo một `function` để  xử lý user có được phép xem một trang cụ thể.
```php
<?php

function authorized($username, $page) {
    if (!isBlacklisted($username)) {
        if (isAdmin($username)) {
            return TRUE;
        } elseif (isAllowed($username, $page)) {
            return TRUE;
        } else {
            return FALSE;
        }
    } else {
        return FALSE;
    }
}
```
- Nếu bạn muốn giảm số lượng dòng, có thể ghép điều kiện như sau.
```php
<?php

function authorized($username, $page) {
    if (!isBlacklisted($username)) {
        if (isAdmin($username) || isAllowed($username, $page)) {
            return TRUE;
        } else {
            return FALSE;
        }
    } else {
        return FALSE;
    }
}
```
- Bạn có thể giảm toàn bộ hàm thành một điều kiện ghép duy nhất
```php
<?php

function authorized($username, $page) {
    if (!isBlacklisted($username) && (isAdmin($username) || isAllowed($username, $page)) {
        return TRUE;
    } else {
        return FALSE;
    }
}
```
- Cuối cùng, `function`có thể được giảm xuống thành một lần `return`
```php
<?php

function authorized($username, $page) {
    return (!isBlacklisted($username) && (isAdmin($username) || isAllowed($username, $page));
}
```
- Nếu mục tiêu của bạn là giảm số lượng dòng, bạn đã hoàn thành. Tuy nhiên, nhìn code rất dối, khó hiểu.
- Điều này đưa chúng ta đến mẹo sẽ trả về ngay lập tức nếu thỏa mãn điều kiện.
```php
<?php

function authorized($username, $page) {

    if (isBlacklisted($username)) {
        return FALSE;
    }

    if (isAdmin($username)) {
        return TRUE;
    }

    return isAllowed($username, $page);
}
```
- Mặc dù sử dụng nhiều dòng mã hơn, nhưng nó rất đơn giản, dễ hiểu và hữu ích khi logic của bạn phức tạp hơn.
## 4. Luôn sử dụng {} sau biểu thức điều kiện
- Xem ví dụ sau:
```php
<?php
if (date('d M') == '21 May')
    $birthdays = [
        'Al Franken',
        'Chris Shiflett',
        'Chris Wallace',
        'Lawrence Tureaud'
    ];
```
- Bạn đã có danh sách người sinh nhật vào `21 May` và sau đó gọi hàm `party(TRUE);`
```php
<?php
if (date('d M') == '21 May')
    $birthdays = [
        'Al Franken',
        'Chris Shiflett',
        'Chris Wallace',
        'Lawrence Tureaud'
    ];
    party(TRUE);
```
- Nhưng không hàm `party(TRUE);` luôn chạy không cần điều kiện `date('d M') == '21 May'`.
- Do đó nên sử dụng `{}` sau biểu thức điều kiện dù chỉ có một dòng lệnh trong đó.
```php
<?php

if (date('d M') == '21 May') {
    $birthdays = [
        'Al Franken',
        'Chris Shiflett',
        'Chris Wallace',
        'Lawrence Tureaud'
    ];
    party(TRUE);
}
```
## 5. Hàm str_replace(), ereg_replace() và preg_replace()
- Nếu bạn sử dụng biểu thức chính quy, `ereg_replace()` và `preg_replace()` sẽ nhanh hơn `str_replace`. Vì str `str_replace` không hỗ trợ khớp mẫu.
- Sự lựa chọn giữa các string functions và regular expression functions phù hợp với mục đích, không phải là nhanh hơn.
- Nếu bạn cần khớp mẫu, sử dụng hàm biểu thức chính quy `ereg_replace`, `preg_replace`.
- Nếu bạn cần khớp chuỗi sử dụng `str_replace`.
## 6. Cẩn thận khi sử dụng toán tử 3 ngôi.
- Xem ví dụ sau:
```php
<?php

$host = strlen($host) > 0 ? $host : htmlentities($host);

```
- Tác giả muốn `$host = htmlentities($host)` nếu độ dài chuỗi lớn hơn 0, nhưng thay vào đó lại vô tình làm ngược lại.
## 7. Sử dụng một Framework để phát triển ứng dụng web
- Nên sử dụng một framework để phát triển ứng dụng web, một số framework php như [Symfony](https://symfony.com/), [CodeIgniter](https://codeigniter.com/), [Yii](https://www.yiiframework.com/), [CakePHP](https://cakephp.org/), [Laravel](https://laravel.com/)...
## 8. Sử dụng isset() thay cho strlen()
- Xem ví dụ sau:
```php
<?php

if (isset($username[5])) {
    // The username is at least six characters long.
}
```
- Khi bạn coi các chuỗi là mảng, mỗi ký tự trong chuỗi là một phần tử trong mảng.
- Bằng cách xác định xem một phần tử cụ thể có tồn tại hay không, bạn có thể xác định xem chuỗi đó có dài ít nhất nhiều ký tự hay không. (Lưu ý rằng ký tự đầu tiên là phần tử 0, vì vậy $ username [5] là ký tự thứ sáu trong $ username).
- Lý do: hàm `isset()` sẽ nhanh hơn `strlen()` vì `strlen()` là một function còn `isset()` là một `language construct` [xem thêm](https://stackoverflow.com/questions/6955913/isset-vs-strlen-a-fast-clear-string-length-calculation).
# Tài liệu tham khảo
- [Làm sao để bảo vệ website của bạn trước tấn công SQL Injection](https://techmaster.vn/posts/34164/lam-sao-de-bao-ve-website-cua-ban-truoc-tan-cong-sql-inection)
- [10 Advanced PHP Tips](https://www.smashingmagazine.com/2009/03/10-useful-php-tips-revisited/)