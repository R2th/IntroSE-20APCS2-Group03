# **1.Introduction**
**Migration**  giống như một **Control Database** có tác dụng quản lý cũng như lưu trữ lại cấu trúc của database giúp cho việc sửa đổi database trở lên dễ dàng hơn.

Để Tạo 1 **Migration** cách thông thường thì chúng ta chạy lệnh: `php artisan make:migration TenMigrate --create=TableName`

Nhưng nếu một ngày bạn có 1 **Database** tận 50 **table**  , Task  sếp giao là bạn phải tạo Migration cho 50 table đó, khách hàng đang cần gấp để deploy server,  không lẽ bạn phải đi tạo từng file , check từng column, từng kiểu dữ liệu, index và ràng buộc khóa ngoại của nó,  rất tốn thời gian.  Hôm nay mình xin chia sẻ 1 package giúp bạn xử lý việc này.

**[Laravel Migrations Generator](https://github.com/Xethron/migrations-generator)** là 1 trong những package như vậy, nó tự động tạo ra các file **migrations** từ cơ sỡ dữ liệu đã có, bao gồm các chỉ mục (**index**) và các khóa ngoại (**foreign keys**) 1 cách rất nhanh chóng và tiện lợi! 

Ngoài ra thì cũng có thêm 2 tool khác cũng rất hay, mình xin giới thiệu để anh em châm cứu khi cần:

1. [Laravel Migration Exporter for Sequel Pro](https://github.com/cviebrock/sequel-pro-laravel-export) – Một gói cho Sequel Pro cho phép bạn tạo các tệp Migrations Laravel từ cơ sỡ dữ liệu , nó được viết bằng ngôn ngữ PHP
2. [MySQL Workbench Export Laravel 5 Migrations Plugin](https://github.com/beckenrode/mysql-workbench-export-laravel-5-migrations) – Một plugin của MySQL Workbench, được viết bằng ngôn ngữ Python

# **2.Prerequisites**
* **Laravel 5 installation**
    
    `composer require --dev "xethron/migrations-generator"`
    
    Nếu bạn dùng phiên bản thấp hơn **Laravel 5.5** thì cần phải thêm **providers** ở **config/app.php**:
    
    ```
      Way\Generators\GeneratorsServiceProvider::class,
    
      Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class

    ```
    
# **3.Getting Started**
Để tạo **migrations** từ cơ sở dữ liệu, bạn cần thiết lập cơ sở dữ liệu của mình trong Cấu hình của Laravel.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

* Run `php artisan migrate:generate`  để generate tất cả bảng trong cơ sỡ dữ liệu.
* Run `php artisan migrate:generate table1,table2,table3,table4,table5` để chỉ định các bảng muốn tạo.
* Bỏ qua các bảng với `--ignore="table3,table4,table5"`
# **4.Testing**
* `php artisan migrate:generate`

![](https://images.viblo.asia/c3a6479f-f1b2-4302-b926-a55aaac2a754.png)

![](https://images.viblo.asia/5aa0464a-eca2-4434-95c4-ba71a81a75ed.png)

Ok, **migrations** được tạo thành công.  Bây giờ hãy run **migrate Artisan command:**

```
php artisan migrate
```

![](https://images.viblo.asia/1beca923-ff7b-4778-8c53-1fda9d42ed85.png)