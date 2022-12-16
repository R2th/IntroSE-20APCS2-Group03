# Giới thiệu
* Trong quá trình phát triển 1 ứng dụng, việc chỉnh sửa, thay đổi cấu trúc hay thuộc tính của database rất dễ xảy ra. Khi làm việc nhóm, việc bạn thay đổi bất cứ gì trong database cũng đều phải đồng bộ với cả các máy của các dev cùng làm với bạn để đảm bảo nhất quán về DB. Việc này nếu làm thủ công thì sẽ rất mất thời gian, chưa nói đến việc khó quản lý thay đổi của DB, hay muốn rollback lại trạng thái DB trước đó cũng sẽ gặp nhiều khó khăn.
* Để giúp lập trình viên giải quyết vấn đề này, Laravel cung cấp cho ta 1 công cụ đó là Migrations
* Migrations giống như 1 phiên bản quản lý cho database của bạn, cho phép team bạn dễ dàng sửa đổi và chia sẻ database  ứng dụng. 
* Migrations thường được sử dụng với  Laravel's schema builder để dễ dàng tạo ra các database cho ứng dụng.
* Thay vì việc bạn phải nói với đồng nghiệp phải thay đổi những gì trên database local của họ thì với migrations, chỉ cần chạy file migrations là đồng nghiệp của bạn đã có được bản database chỉnh sửa rồi.
# Tạo migrations
* Để tạo migrations, sửa dụng Artisan Command `make:migration`:
```
$ php artisan make:migration create_users_table
```
* File migration sẽ được tạo ở đường dẫn `database/migrations`. Mỗi tên file migration được sinh ra đều chứa nhãn thời gian `timestamp` để Laravel xác định được thứ tự của migrations.
* Tùy chọn `--table` và `--create` có thể được sử dụng để chỉ ra tên của bảng và migrations sẽ tạo một bảng mới. Ví dụ:
```
$ php artisan make:migration create_users_table --create=users
$ php artisan make:migration add_votes_to_users_table --table=users
```
# Cấu trúc migrations
* Một lớp migration chứa 2 hàm `up()` và `down()`. Hàm `up` được sử dụng để tạo 1 bảng, cột, hay index cho database. Hàm down sẽ làm ngược lại những hành động của hàm `up`.
* Ví dụ 1 file migration tạo bảng `flights`.
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('airline');
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
        Schema::drop('flights');
    }
}
```
# Chạy migrations
* Để chạy tất cả các migrations của bạn, dùng câu lệnh Artisan `migrate`
```
$ php artisan migrate
```
# Rollback migrations
* Để khôi phục lại lần thực hiện migration gần nhất, Bạn sử dụng lệnh `rollback`. Lệnh này sẽ quay lại "batch" migrations cuối cùng,
```
$ php artisan migrate:rollback
```
* Bạn có thể giới hạn số lượng migrations rollback bằng cách sử dụng tùy chọn `step`. Ví dụ
```
$ php artisan migrate:rollback --step=5
```
* Lệnh `migrate:reset` sẽ rolllback lại tất cả các migrations
```
$ php artisan migrate:reset
```
## Rollback & Migrate trong 1 command
* Lệnh `migrate:refresh` sẽ rollback toàn bộ các migrations của bạn và thực hiện migrate lại.
```
$ php artisan migrate:refresh
```
* Tùy chọn `--seed` sẽ thực hiện đồng thời seed lại các file seeder của bạn sau khi refresh lại database của bạn
```
$ php artisan migrate:refresh --seed
```
* Tùy chọn `step` cung cấp tùy chọn bước cho lệnh refresh. Ví dụ: lệnh sau sẽ rollback và migrate lại 5 migrations gần nhất
```
$ php artisan migrate:refresh --step=5
```
## Drop all tables & migrate
* Câu lệnh `migrate:fresh` sẽ drop tất cả các bảng trong database và chạy lại migrate:
```
$ php artisan migrate:fresh
```
* Bạn cũng có thể kèm theo tùy chọn `seed`
```
$ php artisan migrate:fresh --seed
```
# Tables
## Tạo bảng
* Để tạo bảng, sử dụng hàm `create` của `Schema` facade.Hàm `create` gồm 2 đối số truyền vào, đối số thứ nhất là tên bảng, đối số thứ 2 là 1 `Blueprint` object được sử dụng để định nghĩa bảng mới.
```php
Schema::create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
});
```
### Kiểm tra sự tồn tại của bảng, cột
* Bạn có thể dễ dàng kiểm tra sự tồn tại của bảng, cột bằng cách sử dụng hàm `hasTable` và `hasColumn`:
```php
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```
### Database Connection & Table Options
* Nếu bạn muốn thực hiện thao tác lược đồ trên kết nối cơ sở dữ liệu không phải là kết nối mặc định, sử dụng phương thức `method`:
```php
Schema::connection('foo')->create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
});
```
* Bạn có thể sử dụng các câu lệnh dưới đây để định nghĩa thuộc tính của bảng:

| Câu lệnh| Mô tả |
| -------- | -------- | -------- |
|`$table->engine = 'InnoDB';`     |Specify the table storage engine (MySQL).     |
|`$table->charset = 'utf8';`|Specify a default character set for the table (MySQL).|
|`$table->collation = 'utf8_unicode_ci';	`|Specify a default collation for the table (MySQL).|
|`$table->temporary();`|Create a temporary table (except SQL Server).|
## Renaming / Dropping Tables
* Để đổi tên 1 bảng đã tồn tại, sử dụng hàm `rename`:
```php
Schema::rename($from, $to);
```
* Để drop 1 bảng đã tồn tại, bạn có thể sử dụng hàm `drop` hoặc `dropIfExists`:
```php
Schema::drop('users');

Schema::dropIfExists('users');
```
# Columns
## Tạo columns
* Phương thức `table` của `Schema` facade có thể được sử dụng để update các bảng đã tồn tại. Hàm `table` có 2 đối số truyền vào giống như hàm 
`create`:
```php
Schema::table('users', function (Blueprint $table) {
    $table->string('email');
});
```
### Các kiểu giá trị cột
*  Để xem tất cả các kiểu giá trị của cột, bạn có thể đọc thêm ở [đây](https://laravel.com/docs/6.x/migrations#creating-columns)

## Column Modifiers
* Ngoài các loại cột được liệt kê trong link bên trên, có 1 số column "modifiers" mà bạn có thể sử dụng khi thêm 1 cột vào bảng. ví dụ để cho phép 1 cột `nullable`:
```php
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable();
});
```
* Để xem danh sách đầy đủ các "modifiers" có thể sử dụng, bạn xem [tại đây](https://laravel.com/docs/6.x/migrations#column-modifiers)
## Drop columns
* Để drop 1 cột, sử dụng hàm `dropColumn`, 
```php
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('votes');
});
```
* Bạn cũng có thể drop nhiều cột 1 lúc:
```php
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```
### Available Command Aliases


| Command |Description |
| -------- | -------- |
| `$table->dropMorphs('morphable');`    | Drop the `morphable_id` and `morphable_type` columns.   |
|`$table->dropRememberToken();`|Drop the `remember_token` column.|
|`$table->dropSoftDeletes();`|Drop the `deleted_at` column.|
|`$table->dropSoftDeletesTz();`|Alias of `dropSoftDeletes()` method.|
|`$table->dropTimestamps();`|Drop the `created_at` and `updated_at` columns.|
|`$table->dropTimestampsTz();`|Alias of `dropTimestamps()` method.|
# Kết luận
* Vậy là mình đã trình bày xong các kiến thức cơ bản về migrations đề giúp các bạn có thể hiểu, và sử dụng trong dự án của mình.
* Cảm ơn các bạn đã đọc bài, mọi ý kiến đóng góp, phản hồi vui lòng để lại dưới comment để mình có thể cải thiện để bài viết chất lượng hơn.
# Tài liệu tham khảo
* https://laravel.com/docs/6.x/migrations