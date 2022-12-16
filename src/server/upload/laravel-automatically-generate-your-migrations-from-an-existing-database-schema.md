**I. Đặt vấn đề**

Khi tạo ra [migration](https://laravel.com/docs/5.6/migrations) của chúng ta. Đôi khi ta có thể khó khăn đưa ra một cách chính xác để thêm columns hoặc fields vào bảng của chúng ta.

Nhiều lúc, bạn có một cơ sở dữ liệu tại một nơi, nhưng bạn muốn di chuyển đối tượng này sang một máy chủ khác, hoặc đơn giản là có một bản thiết kế cơ sở dữ liệu ta muốn tạo ra một tập [migration](https://laravel.com/docs/5.6/migrations) tương ứng một cách nhanh chóng. Sẽ rất tuyệt vời nếu chúng ta có một cách để xử lý việc này cho chúng ta một cách tự động?

Thật may là, Laravel cung cấp cho chúng ta package "xethron/migrations-generator" giúp giải quyết được vấn đề này.

**II. Cài đặt**

**1. Cài đặt package**


Chạy command line với dòng lệnh dưới đây

Đối với Laravel 4
```php
composer require "xethron/migrations-generator:~1.3.0"
```        
Đối với Laravel 5
```php
composer require "xethron/migrations-generator"
```
**2. Thiết lập cấu hình trong file config/app.php**

Đối với Laravel 4
```php
'providers' => [
    ...
    'Way\Generators\GeneratorsServiceProvider::class',
    'Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class',
];
```
Đối với Laravel 5
```php
'providers' => [
    ...
    Way\Generators\GeneratorsServiceProvider::class,
    Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class,
]
```  
 **III Thiết lập cấu hình trong file .evn**
 
 Như đã nói ở trên, để tạo [migration](https://laravel.com/docs/5.6/migrations) từ một database có sẵn ta phải chỉ định database có các bảng mà ta muốn migrations.

 Giả sử ta có database tên là **demo**, khi đó trong file .evn chỗ DB_DATABASE=homestead sẽ thay bằng DB_DATABASE=demo
 
**IV. Cách dùng**

Để tạo [migration](https://laravel.com/docs/5.6/migrations) cho tất cả các bảng có trong database ta chạy lệnh sau
```php
php artisan migrate:generate
```
Để tạo [migration](https://laravel.com/docs/5.6/migrations) cho các bảng mà bạn muốn tạo 
```
php artisan migrate:generate table1,table2
```
Trong đó table1, table2 là các bảng mà ta muốn convert từ mysql database files sang migration tương ứng
Bạn cũng có thể bỏ qua các bảng mà bạn không muốn tạo bằng tùy chọn --ignore="table3,table4"
```
php artisan migrate:generate table1,table2 --ignore="table3,table4" 
```

Laravel Migrations Generator đầu tiên sẽ tạo tất cả các bảng, cột và chỉ mục, và sau đó thiết lập tất cả các ràng buộc khóa ngoại. 

**V. Kết luận**

Như chúng ta có thể thấy, đây là một trình tạo Laravel Migration Generator thực sự thú vị mà cộng đồng đã tạo ra. Đó là một cách tuyệt vời để tạo ra [migration](https://laravel.com/docs/5.6/migrations) từ cơ sở dữ liệu có sẵn cũng như giúp chúng ta học cách tạo ra [migration](https://laravel.com/docs/5.6/migrations).

Nguồn tham khảo [Laravel Migration Generator](https://github.com/Xethron/migrations-generator)