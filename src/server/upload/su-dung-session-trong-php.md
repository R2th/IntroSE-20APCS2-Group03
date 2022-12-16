Sử dụng được session và hiểu về nó là điều quan trong trong lập trình web, hôm nay mình sẽ giới thiệu về cách sử dụng session cơ bản. Bài viết được dịch từ chương 28 của quyển PHP Notes For Professionals.

# 1. session_start() options

Bắt đầu với PHP session, chúng ta có thể truyền vào 1 mảng với [session-based php.ini options](https://www.php.net/manual/en/ini.list.php) tới hàm *sessionstart*

Ví dụ 1:
```php
if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
    // php >= 7 version
    session_start([
        'cache_limiter' => 'private',
        'read_and_close' => true,
    ]);
} else {
    // php < 7 version
    session_start();
}
```

Ở bản này cũng giới thiệu một setting mới trong `php.ini` gọi là `session.lazy_write`,  với giá trị mặc định là true và định nghĩa rằng session data là chỉ được ghi lại nếu nó thay đổi.

Ref: https://wiki.php.net/rfc/session-lock-ini

# 2. Sesssion locking
Chúng ta đều biết rằng PHP ghi session data vào file ở phía server. Khi 1 request được tạo tới php script (cái mà khởi tạo session qua session_start()), PHP khóa session file để block hoặc đợi những request khác đang đến đối với cùng session_id để hoàn thành nó, bởi vì những request khác có thể bị nghẽn trong session_start cho đến khi hoặc trừ khi session file đã bị khóa  không được bỏ ra.

Session file vẫn bị khóa đến khi script được hoàn thành hoặc session được đóng bằng tay. Để tránh trường hợp ví dụ như *tránh nhiều request bị block*, chúng ta có thể khởi tạo session và đóng sesion cái mà sẽ bỏ khóa từ session file và cho phép tiếp tục các request còn lại.

Ví dụ 2:

```php
// php < 7.0
// start session
session_start();

// write data to session
$_SESSION['id'] = 123; // session file is locked, so other requests are blocked

// close the session, release lock
session_write_close();
```

Giờ chúng ta sẽ là nếu session bị đóng thì làm sao để đọc được những giá trị trong session đó, tuy nhiên dù sau khi session bị đóng thì session vẫn còn. Do đó, chúng ta vẫn đọc được session data.

Từ php >= 7.0, chúng ta có thể có **read_only** session, **read_write** session, **lazy_write** sesion, do đó nó ko yêu cầu cần phải sử dụng ***sessionwriteclose()***

# 3. Manipulating session data
Biến $_SESSION là 1 array, và chúng ta có thể nhận được và xử lý nó như 1 mảng thông thường.

Ví dụ 3:
```php
// Starting the session
session_start();

// Storing the value in session
$_SESSION['id'] = 342;

// conditional usage of session values that may have been set in a previous session
if(!isset($_SESSION["login"])) {
    echo "Please login first";
    exit;
}
// now you can use the login safely
$user = $_SESSION["login"];

// Getting a value from the session data, or with default value,
// using the Null Coalescing operator in PHP 7
$name = $_SESSION['name'] ?? 'Anonymous';
```

Chú ý rằng nếu bạn lưu 1 object trong session, nó sẽ nhận và chỉ khi bạn có 1 class autoloader hoặc bạn đã load class đó. Các trường hợp khác, object sẽ lưu dưới dạng `__PHP_Incomplete_Class`, có thể dẫn tới [crashes](https://stackoverflow.com/questions/1055728/php-session-with-an-incomplete-object) app 

> **Warning**: 
>  Session có thể bị tấn công. Do đó, không bao giờ nên lưu thông tin người dùng trong session. Đặc biệt với thẻ tin dụng, các thông tin id, password, nhưng cũng có thể sử dụng với 1 vài thông tin public như tên tuổi, email, số điẹnt thoại ...
>  

# 4. Destroy an entire session
Nếu đã lấy được session, ta sẽ muốn có thể hủy bỏ được nó. Điều này được làm dễ dàng với [session_destroy()](http://php.net/session_destroy)
Ví dụ:
```php
/*
        Let us assume that our session looks like this:
        Array([firstname] => Jon, [id] => 123)
        We first need to start our session:
*/
session_start();
/*
        We can now remove all the values from the `SESSION` superglobal:
        If you omitted this step all of the global variables stored in the
        superglobal would still exist even though the session had been destroyed.
*/
$_SESSION = array();
// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

//Finally we can destroy the session:
session_destroy();
```

Sử dụng ***sessiondestroy*** khác với sử dụng những thứ như `$_SESSION = array()` Nó sẽ bỏ hết giá trị lưu trong session global nhưng nó sẽ không hủy phiên bản được lưu thực sự của session.

> **Chú ý**:
> Chúng ta có thể dùng session_unset() cho code cũ không sử dụng được $_SESSION.
> 

# 5. Safe Session Start With no Errors

Nhiều lập trình viên gặp phải vấn đề này khi làm việc với dự án lớn, đặc biết nếu họ làm việc trên những nền tảng CMS dựa trên plugin, addons, components ... Đây là solution cho khởi tạo session an toàn mà ta sẽ kiểm tra phiên bản PHP đầu tiên để cover tất cả các phiên bản và tiếp đó thì mới khởi tạo session. Nếu session không tồn tại thì ta sẽ khởi tạo session an toàn. Nếu session tồn tại thì sẽ không có gì xảy ra cả.

Ví dụ:
```php
if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
    if(session_status() == PHP_SESSION_NONE) {
        session_start(array(
            'cache_limiter' => 'private',
            'read_and_close' => true,
        ));
    }
}
else if (version_compare(PHP_VERSION, '5.4.0') >= 0)
{
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}
else
{
    if(session_id() == '') {
        session_start();
    }
}
```

Nó sẽ giúp bạn không bị session_start error

# 6. Session name
Kiểm tra nếu session cookie đã được khởi tạo chưa

Session name là tên củ cookie được sử dụng để lưu session. Bạn có thể sử dụng nó để phát hiện nếu cookie cho session đã được khởi tạo cho người dùng.

```php
if(isset($_COOKIE[session_name()])) {
    session_start();
}
```

Chú ý rằng phương thức này thường không hữu dụng trừ khi bạn không muốn tạo cookie không cần thiết.

Thay đổi session name

Bạn có thể cập nhật session name bằng cách gọi `session_name()`
```php
//Set the session name
session_name('newname');
//Start the session
session_start();
```

Nếu không có tham số truyền vào thì session name hiện tại sẽ được trả về.