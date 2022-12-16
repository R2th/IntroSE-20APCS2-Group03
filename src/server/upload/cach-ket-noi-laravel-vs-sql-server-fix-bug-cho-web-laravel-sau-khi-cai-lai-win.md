# 1. Laravel
- Laravel là một PHP Framework, có mã nguồn mở và miễn phí, đc xây dựng nhằm hỗ trợ phát triển các phần mềm, ứng dụng, theo kiến trúc MVC. Được tạo ra bởi Taylor Otwell với phiên bản đầu tiên được ra mắt vào tháng 6 năm 2011.
- Mô hình MVC trong laravel.
[![](https://images.viblo.asia/3d26012b-b38d-4a75-8cf4-58fd55e32744.png)](https://www.marketenterprise.vn/blog/nhung-dieu-can-biet-ve-laravel.html)
**Giải thích:**   
Khi client truy cập vào link thì router sẽ phải điều hướng qua Middeware để kiểm tra Request đó có đủ điều kiện truy cập vào Controller ko. Nếu đủ thì Controller sẽ xử lý request đó bằng việc tương tác với Model để lấy dữ liệu từ Database và xử lý dữ liệu đó trước khi trả ngược lại cho  controller, sau đó controller đữa data cho View để đổ data xuống template , sau đó render ra HTML hoặc JSON rồi trả response cho client.
- Tham khảo:  
https://www.marketenterprise.vn/blog/nhung-dieu-can-biet-ve-laravel.html   
- Có nhiều bài viết về khái niệm cơ bản của Laravel nên mình ko viết nhiều về phần này. Một bài viết mình thấy rõ ràng và cụ thể ngoài link trên thì các bạn có thể tham khảo thêm ở [đây!](https://viblo.asia/p/nhung-khai-niem-co-ban-trong-laravel-Qbq5QQr35D8)
# 2. Fix bug
1. Cài nodejs, xampp (thiết lập môi trường web server), composer (Php package manager). Với composer thì bạn có thể cài đặt đó dưới dạng global (trên win thì chạy file composer-setup.ext) để có thể sử dụng hay gọi nó từ bất kì thư mục nào trong máy hoặc cài nó để nó chỉ tồn tại trong một folder thì sử dụng **Command-line installation** ở trang chủ [Composer](https://getcomposer.org/download/).
2.  Để window có thể tìm thấy file thực thi PHP, thì ta cần thay đổi PATH environment variable. Cách thay đổi:
    ```markdown
    1. Nhấn start (icon window ở góc phía dưới cùng bên trái màn hình).
    2. Nhập: Edit environment variables for your account.
    3. Nhấn enter.
    4. Popup tên System Properties hiện lên và nhấn tab: Advanced.
    5. Nhấn nút Environment Variables.
    6. Popup mới hiện lên tên: Environment Variables và ta chỉ thao tác phần: System variables.
    7. Nhấn biến Path rồi nhấn edit.
    8. Copy đường dẫn thư mục php, của mình là: G:\xampp install\php. Nếu đường dẫn đến php đó rồi thì thôi, còn ko có thì thêm mới.
    9. Nhấn ok... xong!
    ```
    Composer vs node thì mình cài global nên ko cần thêm. Với node ở máy mình thì mình phải restart lại máy để dụng đc node.
3. Sau khi cài xong thì nhập các câu lệnh sau vào Command Prompt (trên win) để đảm bảo việc thiết lập môi trường đã đúng.
    ```markdown
    node -v
    php -v
    composer (Nếu bạn cài composer độc lập thì phải mở project trong terminal (cmd trong win))
    ```
4. Đảm bảo project có .env file. Nếu ko có thì tạo file .env rồi vào file .env.example lấy nội dung rồi paste vào.
5. Nếu project lấy từ github về thì cần chạy: npm install, composer update. Nếu ko chạy composer thì khi lấy code về rồi chạy bạn sẽ có lỗi gần giống như sau: 
    ```php
    PHP Warning: require(../vendor/autoload.php): failed to open stream: No such file or directory in ../artisan on line 18.
    
    PHP Fatal error: require(): Failed opening required '../vendor/autoload.php' (include_path='../php') in ../artisan on line 18
    ```
6. Mình dùng SQL Server 2019 Developer và trạng thái của giao thức TCP/IP đã bị disabled nên mình sẽ enabled nó lên, ta đc:
![](https://images.viblo.asia/b71d9129-a0d2-42b1-b1f6-e37119372429.png)
7. Thiết lập cổng cho TCP Port của Protocols for SQLEXPRESS. Nếu bạn có số cổng ở TCP Dynamic Ports hoặc TCP Port thì bạn cũng có thể thiết lập lại hoặc bỏ qua thiết lập cổng này. Cách thiết lập
    ```markdown
    1. Click vào TCP/IP ở hình trên hoặc click chuột phải chọn properties.
    2. Popup tên TCP/IP Properties hiện lên.
    3. Chọn tab: IP Addresses.
    4. Kéo xuống phần: IPALL
    5. Nhập: 1433 vào TCP Port
    6. Nhấn OK... xong!
    ```
    Của mình:   
    ![](https://images.viblo.asia/1004caf7-deed-455b-a7d5-fc0391e95d6b.png)
8. Mở Command Prompt nhập: services.msc -> nhấn enter để mở Services -> Tìm SQL Server (SQLEXPRESS) -> Nhấn restart ở phía bên trái. 
![](https://images.viblo.asia/ddf3b779-8cf0-431a-9975-369622612491.png)
9. Mở .env file trong project. Chỉnh sửa các phần sau:
     ```markdown
     DB_CONNECTION=sqlsrv
    DB_HOST=Server name (Mở Microsoft SQL Server Management Studio -> popup tên Connect to server hiện lên -> Chỏ vào input có nhãn: Server name để lấy hoặc các bạn có thể lấy server name bằng cách khác thì tuỳ.)
    DB_PORT=1433 (Cổng mình vừa thiết lập ở TCP/IP Properties)
    DB_DATABASE= Tên Database
    DB_USERNAME= #SQL Server username (Nếu bạn ko đặt username, pass cho sql server thì có thể để trống.)
    DB_PASSWORD= #SQL Server password
     ```
10.  Chạy các migrations sử dụng migrate artisan command trong terminal (cmd trong win) đang trỏ đến project bằng cách nhập: php artisan migrate rồi nhấn enter thì các bạn nhận đc lỗi sau:
        ```markdown
        Illuminate\Database\QueryException: could not find driver.
        (SQL: select * from sysobjects where type = 'U' and name = migrations)
        ```
     Lỗi trên là do bạn chưa cài drivers cho PHP cho SQL Server.
11. Nếu bạn  gặp lỗi trên thì tải Microsoft driver for php for sql server qua [Microsoft store](https://www.microsoft.com/en-us/download/details.aspx?id=20098) hoặc [Githubpage](https://github.com/Microsoft/msphpsql/releases). Mình khuyên ae nên sử dụng link 2 để tải xuống driver phù hợp vs phiên bản hiện tại của php. Mình dùng php bản 7.3 nên mình sẽ tải bản driver tương ứng là 5.9.0
12. Giải nén file vừa tải, vs driver của mình khi giải nén thì mình có file sau rồi copy file đó và paste vào thư mục: ...\xampp\php\ext:
     ```markdown
     php_pdo_sqlsrv.dll
     ```
 13. Mở file php.ini trong folder ...\xampp\php rồi thêm dòng sau rồi đóng xampp và bật lại:
     ```markdown
     extension = php_pdo_sqlsrv.dll
     ```
  14. Mở terminal trong project rồi nhấn: php artisan serve và project đã đc build thành công. 
  15. Tham khảo:  
  * https://stackoverflow.com/questions/45613358/sqlstate08001-microsoftodbc-driver-13-for-sql-servertcp-provider-no-conn   
  *  https://support.solarwinds.com/SuccessCenter/s/article/How-to-identify-your-SQL-Server-version-and-edition?language=en_US  
  *  https://www.sitepoint.com/how-to-install-php-on-windows/    
  *  https://dev.to/mr_steelze/setting-up-a-laravel-project-with-sql-server-and-xampp-wamp-on-windows-3n7k