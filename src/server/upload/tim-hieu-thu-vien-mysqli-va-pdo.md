Khi thao tác với cơ sở dữ liệu MySQL, PHP cung cấp cho ta 3 thư viện đó là MySQL, MySQLi và PDO.  Tuy nhiên thư viện MySQL đã không còn được hỗ trợ và bị xóa hoàn toàn trong các phiên bản PHP 7 trở lên, vì thế ở bài hôm nay mình sẽ chỉ giới thiệu đến các bạn 2 thư viện MySQLi và PDO.
# Cài đặt
* Mặc định khi cài PHP, 2 thư viện PDO và MySQLi đã được tích hợp sẵn, vì thế ta không cần cài đặt thêm và có thể gọi và sử dụng ngay.
# So sánh MySQLi và PDO
## Tóm lược

   
| | PDO | MySQLi |
| -------- | -------- | -------- |
| CSDL hỗ trợ    | Hỗ trợ 12 loại CSDL khác nhau    | Chỉ có My SQL  |
| API    | OOP   | OOP + Hướng thủ tục  |
| Kết nối   | Dễ dàng    | Dễ dàng  |
|Named parameters    | Có    | Không  |
| Ánh xạ đối tượng    | Có | Có  |
|Prepared statements    | Có | Không  |
|Hiệu năng    | Cao | Cao  |
|Hỗ trợ Stored procedures    | Có |Có  |
## Kết nối
* Ta đều có thể dễ dàng kết nối CSDL với 2 thư viện PDO và MySQLi  bằng cách sau:
    * PDO hỗ trợ thiết lập kết nối hướng đối tượng:
    
    ```PHP
    // PDO
    $pdo = new PDO("mysql:host=localhost;dbname=database", 'username', 'password');
    ```
    * MySQli hỗ trợ ta thiết lập kết nối cả theo hướng đối tượng và hướng thủ tục:
    
    ```PHP
    // mysqli, procedural way
    $mysqli = mysqli_connect('localhost','username','password','database');

    // mysqli, object oriented way
    $mysqli = new mysqli('localhost','username','password','database');
    ```
## Hỗ trợ CSDL
* Lợi thế lớn nhất của PDO so với MySQLi là nó hỗ trợ đến 12 hệ quản trị CSDL khác nhau trong khi MySQLi chỉ hỗ trợ MySQL.
* Các Hệ quản trị cơ sở dữ liệu mà PDO hỗ trợ gồm có:
    1. Cubrid
    2. Microsoft SQL Server / Sybase
    3. Firebird
    4. IBM DB2
    5. IBM Informix Dynamic Server
    6. MySQL 3.x/4.x/5.x
    7. Oracle Call Interface
    8. ODBC v3 (IBM DB2, unixODBC and win32 ODBC)
    9. PostgreSQL
    10. SQLite 3 and SQLite 2
    11. Microsoft SQL Server / SQL Azure
    12. 4D
##  Named Parameters
* Đây là 1 tính năng quan trọng mà PDO có, nó giúp việc ràng buộc tham số dễ dàng hơn nhiều so với việc sử dụng liên kết số.
    ```PHP
    $params = array(':username' => 'test', ':email' => $mail, ':last_login' => time() - 3600);

    $pdo->prepare('
        SELECT * FROM users
        WHERE username = :username
        AND email = :email
        AND last_login > :last_login');

    $pdo->execute($params);
    ```
*    ... trái ngược với cách của MySQLi:
        ```PHP
        $query = $mysqli->prepare('
            SELECT * FROM users
            WHERE username = ?
            AND email = ?
            AND last_login > ?');

        $query->bind_param('sss', 'test', $mail, time() - 3600);
        $query->execute();
        ```
*    Cú pháp của việc sử dụng liên kết tham số với dấu `?`  có vẻ ngắn hơn nhưng nó không linh hoạt như khi sử dụng named parameters vì thực tế ta sẽ phải theo dõi thứ tự tham số và việc này sẽ gây khó khăn cho dev khi có nhiều tham số.
## Ánh xạ đối tượng
* Cả PDO và MySQLi đều có thể ánh xạ kết quả đến các đối tượng, điều này là rất hữu ích khi chúng ta lập trình hướng đối tượng.
* Hãy tưởng tượng rằng chúng ta có một lớp User với một số thuộc tính khớp với tên trường từ cơ sở dữ liệu.
    ```PHP
    class User {
        public $id;
        public $first_name;
        public $last_name;

        public function info()
        {
            return '#'.$this->id.': '.$this->first_name.' '.$this->last_name;
        }
    }
    ```
* Nếu không có ánh xạ đối tượng, chúng ta sẽ cần điền vào từng giá trị của trường (theo cách thủ công hoặc thông qua hàm tạo) trước khi chúng ta có thể sử dụng hàm info().
* Ánh xạ đối tượng cho phép chúng ta xác định trước các thuộc tính này trước khi đối tượng được xây dựng! 
    ```PHP
    $query = "SELECT id, first_name, last_name FROM users";

    // PDO
    $result = $pdo->query($query);
    $result->setFetchMode(PDO::FETCH_CLASS, 'User');

    while ($user = $result->fetch()) {
        echo $user->info()."\n";
    }
    // MySQLI, procedural way
    if ($result = mysqli_query($mysqli, $query)) {
        while ($user = mysqli_fetch_object($result, 'User')) {
            echo $user->info()."\n";
        }
    }
    // MySQLi, object oriented way
    if ($result = $mysqli->query($query)) {
        while ($user = $result->fetch_object('User')) {
            echo $user->info()."\n";
        }
    }
    ```
## Bảo mật
* Cả hai thư viện đều cung cấp phương pháp bảo mật tránh tấn công bằng SQL Injection.
* Giả sử một hacker đang cố gắng truyền vào 1 đoạn mã SQL thông qua tham số truy vấn HTTP của tên người dùng (GET):
    ```PHP
    $_GET['username'] = "'; DELETE FROM users; /*"
    ```
* Nếu ta không kiểm soát được chuyện này, các đoạn mã độc sẽ được bao gồm trong câu truy vấn gốc và được thực thi. Khi đó, tất cả các hàng trong bảng `users` của bạn sẽ bị xóa
    ```PHP
    // PDO, "manual" escaping
    $username = PDO::quote($_GET['username']);

    $pdo->query("SELECT * FROM users WHERE username = $username");

    // mysqli, "manual" escaping
    $username = mysqli_real_escape_string($_GET['username']);

    $mysqli->query("SELECT * FROM users WHERE username = '$username'");
    ```
* Như bạn có thể thấy, `PDO::quote()` không chỉ thoát khỏi chuỗi, mà nó còn trích dẫn nó. Mặt khác, `mysqli_real_escape_string()` sẽ chỉ thoát khỏi chuỗi, bạn sẽ cần phải áp dụng các trích dẫn bằng tay.
## Cú pháp
*  Về cú pháp, các bạn có thể tham khảo[ tại đây](https://www.w3schools.com/php7/php7_mysql_connect.asp)
#  Nên sử dụng MySQLi hay PDO
* Theo ý kiến của mình, sử dụng PDO sẽ là phương án tốt hơn bởi:
    * PDO sẽ rất hữu ích cho việc bảo trì và nâng cấp bởi nó hỗ trợ tới 12 loại database. Ta có thể xoay chuyển thay đổi từ loại DB này sang DB khác mà không cần phải sửa lại code, trong khi với MySQLi chỉ hỗ trợ cho MySQL.
    * Nếu thay đổi hoặc sử dụng nhiều DB thì với MySQli, ta sẽ phải học thêm các thư viện với mỗi loại DB còn lại, còn với PDO thì ta chỉ cần duy nhất PDO là đủ. Như thế tiết kiệm được thời gian để làm chủ các thư viện.
    * Ưu điểm thứ 3 của PDO so với MySQLi chính là Named Parameters. Phần này mình đã nêu rõ ở trên, các bạn có thể lướt lên để xem lại.
* Tuy nhiên MySQLi sẽ là lựa chọn tốt hơn cho người dùng nâng cao, muốn có những chức năng mới nhất của MySQL.
#  Kết luận
* Trên đây mình đã trình bày những hiểu biết của mình về 2 thư viện PDO và MySQLi, nếu thấy bài có sai xót hay bất kỳ ý kiến đóng góp gì, mọi người vui lòng comment ở dưới để mình có thể tiếp nhận và sửa chữa. 
* Cảm ơn mọi người đã đọc bài !
#  Tài liệu tham khảo
* https://code.tutsplus.com/tutorials/pdo-vs-mysqli-which-should-you-use--net-24059
* https://websitebeaver.com/php-pdo-vs-mysqli
* https://www.w3schools.com/php7/php7_mysql_intro.asp