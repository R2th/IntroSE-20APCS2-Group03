## Hướng dẫn Laravel 5.5 CRUD. Thực hành CRUD trong PHP Framework Laravel. Tạo dự án Website CRUD User với Laravel PHP Framework 5.5. Thực hành CRUD.

Bài viết này sẽ hướng dẫn từng bước để tạo một dự án Laravel 5.5 CRUD để quản lý người dùng. Quản lý người dùng sẽ bao gồm:
* Create – Thêm mới người dùng.
* Read – Đọc thông tin người dùng.
* Update – Cập nhật hay chỉnh sửa thông tin người dùng.
* Delete – Xóa dữ liệu người dùng.

**Dự án mẫu:** https://namcoi.com/du-an/aptech-php-laravel-crud-user/public/users

**Mã nguồn:** https://github.com/namnh06/aptech-php-laravel-crud-user

### Bước 1: Tạo dự án Laravel 5.5 sử dụng Composer Create-Project

Sử dụng Terminal để cài đặt và khởi tạo dự án Website Laravel CRUD 5.5 theo câu lệnh:
```
composer create-project --prefer-dist laravel/laravel user-crud-laravel "5.5.*"
```
Câu lệnh trên sẽ cài đặt và khởi tạo dự án Laravel mới có tên là user-crud-laravel với PHP Framework Laravel 5.5.
![](https://images.viblo.asia/b40b3c1a-4525-4da9-b9f6-29a9024a25a7.png)

### Bước 2: Làm việc với Database và file .env

Tạo Database mới có tên user_crud_laravel ở localhost thông qua phpMyAdmin hoặc Workbench, sử dụng câu lệnh bên dưới:
```
CREATE DATABASE user_crud_laravel;
```
![](https://images.viblo.asia/7f66cdbd-2b18-4028-87ee-f52037a96171.png)

Thiết lập thông tin trong file .env của Dự Án Laravel user-crud-laravel vừa mới tạo:
```
DB_DATABASE=user_crud_laravel
DB_USERNAME=root
DB_PASSWORD=
```
![](https://images.viblo.asia/d6845236-7603-4ecb-a2d3-fb0b30b5de1b.png)
Lưu ý rằng DB_USERNAME mặc định của XAMPP là root và mật khẩu là để trống.

### Bước 3: Sử dụng Migration để tạo bảng dữ liệu users

Tạo file Migration thông qua php artisan để tạo bảng dữ liệu users:
```
php artisan make:migration create_users_table --create=users
```
Sử dụng thêm flag cho câu lệnh –create=users để chắc chắn rằng Laravel sẽ hỗ trợ chúng ta câu lệnh trong file migration. Bất kể câu lệnh của bạn có gặp lỗi cú pháp lúc khai báo tên file là create_users table hay không.

Chắc rằng trong thư mục user-crud-laravel > database > migrations chỉ có một file migration, các files đã có sẵn bạn có thể xóa đi.
![](https://images.viblo.asia/f51f189c-e355-40ca-9c91-dd20e224b332.png)
Chỉnh sửa file migration vừa được tạo ra như sau:
```
<?php
 
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
 
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }
 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```
Trong các dòng lệnh ở trên, chúng ta đã thêm vào 3 cột dữ liệu là name, email, password. Tương ứng với cột dữ liệu tên người dùng, email của người dùng và mật khẩu của người dùng trong bảng dữ liệu users.

Thực thi câu lệnh bên dưới để file migration “chạy” và tạo bảng dữ liệu users:
```
php artisan migrate
```
![](https://images.viblo.asia/6bad4327-fe89-4ded-8935-bd07eb39aaba.png)
Thông qua phpMyAdmin hoặc Workbench để kiếm tra lại xem đã có bảng dữ liệu users hay chưa?

### Bước 4: Sử dụng Seeder trong Laravel để thêm dữ liệu cho mục đích thử nghiệm

Tạo file seed dữ liệu thông qua câu lệnh:
```
php artisan make:seeder UsersTableSeeder
```
![](https://images.viblo.asia/cefa7dbd-a738-42fc-b3e1-3e3a1ce91f82.png)
Câu lệnh trên sẽ tạo file UsersTableSeeder.php trong thư mục user-crud-laravel > database > seeds.

Chỉnh sửa file UsersTableSeeder.php bằng đoạn code dưới đây:
```
<?php
 
use Illuminate\Database\Seeder;
 
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name(),
                'email' => $faker->safeEmail,
                'password' => bcrypt('123456')
            ]);
        }
    }
}
```
Trong function run, chúng ta tạo đối tượng từ Class Faker\Factory. PHP Library Faker được tích hợp sẵn trong Laravel 5.5. Sử dụng vòng lặp của PHP và Query Builder của Laravel thêm 5 người dùng vào bảng users.

Thực thi file UsersTableSeeeder.php bằng cách sử dụng câu lệnh sau:
```
php artisan db:seed --class=UsersTableSeeder
```
Kiểm tra trong Database user_crud_laravel và bảng dữ liệu users để chắc chắn rằng dữ liệu đã được thêm vào.![](https://images.viblo.asia/9a6f5ef7-49a6-4f06-877b-cf300bb995df.png)
Chúng ta đã có một dự án sử dụng PHP Framework Laravel 5.5 với Migration và Seeder, đây vẫn chưa phải là các tính năng CRUD mà một Website có thể mang lại. Migration chỉ giúp việc tạo bảng dữ liệu được dễ dàng và dễ kiểm soát hơn. Seeder hỗ trợ thêm dữ liệu giả nhằm mục đích thử nghiệm.

Phần tiếp theo sẽ giới thiệu về Routes, Controller, Model và View trong Laravel 5.5.