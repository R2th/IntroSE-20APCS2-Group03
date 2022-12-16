Ở dự án, gần đây mình được giao 1 công việc mới là điều tra các lỗi phát sinh trên môi trường production, trên production thì mỗi thao tác trên terminal đều phải rất cẩn thận và gần như không được phép sai sót. Trong quá trình làm việc với các lỗi xuất sai dữ liệu ra màn hình thì mình thường phải đọc logic code xử lý lấy ra và dùng lệnh `php artisan tinker` để debug (quy định của dự án mình là không được phép sửa code trực tiếp trên production như log hay dd dữ liệu nên mình đành phải copy đoạn code và cho vào tinker) kết hợp với query trong mysql để kiểm tra xem lỗi do dữ liệu trả ra sai hay do code logic. Làm 1 vài lần thì mình thấy việc này rất mất thời gian, mình có tìm hiểu thì thấy có 1 `package` khá hay cho phép lắng nghe kết quả câu truy vấn mỗi khi có lệnh truy vấn vào database và hiển thị trực tiếp trên terminal.

# Giới thiệu
Laravel Tail DB cho phép bạn giám sát truy vấn sql thời gian thực được thực thi trong ứng dụng của bạn từ terminal. Khi bạn chạy lệnh, nó sẽ lắng nghe bất kỳ truy vấn SQL nào được thực thi và xuất ra dữ liệu truy vấn. `Package` này có thể hữu ích nếu bạn muốn kiểm tra kết quả câu truy vấn, phát hiện truy vấn chậm và tối ưu hóa truy vấn sql. Thay vì bạn phải thao tác thủ công, `package` này sẽ tự động chạy nó cho bạn. Từ kết quả, bạn có thể kiểm tra xem truy vấn có bị thiếu, bị chậm không (đánh index và xử lý những thứ khác tuỳ theo yêu cầu công việc).

# Danh sách cơ sở dữ liệu được hỗ trợ
* MySQL
* PostgreSQL
* Sqlite
* Sql Server

# Phiên bản yêu cầu
* PHP: ^7.0
* Laravel: ~5.5, ~5.6, ~5.7, ~5.8, ~6.0, ~7.0, ~8.0
* Lumen

# Cài đặt
Sao chép lệnh bên dưới và chạy trong terminal của dự án (vì phiên bản laravel yêu cầu từ 5.5 trở lên nên gói sẽ được tự động đăng kí trong provider)
```
composer require muhdfaiz/laravel-tail-db
```

Xuất bản tệp cấu hình vào thư mục config
```
php artisan vendor:publish --provider="Muhdfaiz\LaravelTailDb\TailDatabaseServiceProvider" --tag="tail-db-config"
```


-----


**config/tail-db.php:**
```php
return [
    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    |
    | This option used to enable or disable the Laravel Tail DB watcher.
    | If enabled, every sql query executed from the application will
    | be captured and store the query in the log file if you enabled the
    | query option.
    |
    */
    'enabled' => env('TAIL_DB_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Host
    |--------------------------------------------------------------------------
    |
    | Laravel Tail DB use ReactPHP to monitor the SQL query. When you run
    | 'tail:db' command, it will start the ReactPHP Server. ReactPHP Server
    | will use this host when starting the server.
    |
    */
    'host' => env('TAIL_DB_HOST', '0.0.0.0'),

    /*
    |--------------------------------------------------------------------------
    | Port
    |--------------------------------------------------------------------------
    |
    | Laravel Tail DB use ReactPHP to monitor the SQL query. When you run
    | 'tail:db' command, it will start the ReactPHP Server. ReactPHP Server
    | will use this port when starting the server.
    */
    'port' => env('TAIL_DB_PORT', '9001'),

    /*
    |--------------------------------------------------------------------------
    | Duration of time to considered as slow query.
    |--------------------------------------------------------------------------
    |
    | This option used to tell Laravel Tail DB if the query slow or not.
    | For example, if you specify 2000ms and the last query executed take
    | more than 2000ms, Laravel Tail DB will highlight the time with red color.
    | If the query below than 2000ms Laravel Tail DB will highlight with green color.
    | The value must be in milliseconds.
    */
    'slow_duration' => env('TAIL_DB_SLOW_DURATION', 3000),

    /*
    |--------------------------------------------------------------------------
    | Ignore queries
    |--------------------------------------------------------------------------
    |
    | You can specify the keyword to skip the tailing.
    | Laravel Tail DB will check if the query contain those keyword or not.
    | If exist, Laravel Tail DB will skip recording to log file.
    | The key keyword must be separated by comma.
    | Example: alter table}drop table. (Separated by |)
    |
    */
    'ignore_query_keyword' => env('TAIL_DB_IGNORE_QUERY_KEYWORD', ''),

    /*
    |--------------------------------------------------------------------------
    | Log Query
    |--------------------------------------------------------------------------
    |
    | Option to specify if you want to store the SQL query in the log file.
    |
    */
    'log_query' => env('TAIL_DB_LOG_QUERY', false),

    /*
    |--------------------------------------------------------------------------
    | Filename to store mysql queries log
    |--------------------------------------------------------------------------
    |
    | Default filename is database.log
    |
    */
    'filename' => env('TAIL_DB_FILENAME', 'database.log'),

    /*
    |--------------------------------------------------------------------------
    | Path to store sql queries log.
    |--------------------------------------------------------------------------
    |
    | Default path is inside storage/logs.
    |
    */
    'path' => env('TAIL_DB_PATH', storage_path('logs')),

    /*
    |--------------------------------------------------------------------------
    | Show explain sql during the tail.
    |--------------------------------------------------------------------------
    |
    | By default every sql query executed, laravel tail db will run explain
    | command. Useful if you want to troubleshooting performance issue.
    | If turn off, Laravel Tail DB only show the query executed, the time and
    | the location where the query executed.
    */
    'show_explain' => env('TAIL_DB_SHOW_EXPLAIN', true),
];
```


-----



**Giải thích qua 1 số cấu hình ở trên**

- enabled: Bật/tắt package
- slow_duration: Thời gian cho 1 câu truy vấn mà bạn coi là chậm (đơn vị giây)
- ignore_query_keyword: Các từ khoá mà bạn không muốn package lắng nghe trên terminal (các từ khoá ngăn cách bởi dấu |)
- show_explain: Ẩn hiện explain cho query
- log_query, path, filename: cho phép lưu trữ query ra file

# Sử dụng
Sau khi cài đặt và cấu hình xong, bạn chỉ cần chạy câu lệnh dưới sẽ lắng nghe được kết quả câu truy vấn trên terminal
```
php artisan tail:db
```
-----
Kết quả demo trên mysql
![](https://images.viblo.asia/8f51a365-1e71-4580-b33b-a5bbb9b28718.png)

# Tham khảo
* https://laravel-tail-db.muhdfaiz.com/
* https://github.com/muhdfaiz/laravel-tail-db