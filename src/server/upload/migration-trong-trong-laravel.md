# 1. Migration.
- **Migration** có thể được hiểu như một phiên bản database của bạn tại một thời điểm nào đó vậy.
- Nó giúp cho việc chia sẻ lược đồ database của bạn khi làm việc nhóm trở nên dễ dàng hơn.
- Chỉ cần chạy **migration** là bạn có thể sinh ra một lược đồ giống như bạn đã định nghĩa.
- Và tất nhiên là bạn cũng có thể sửa được các cột trong database rồi.

# 2 Tạo migration.
- Để tạo ra một **migration** trong laravel thì bạn chỉ cần chạy lệnh sau trong terminal:
```
php artisan make:migration ten_migration --create=table_name
//hoặc
php artisan make:migration ten_migration --table=table_name
```

- Kết quả sau khi chạy lệnh là bạn nhận được một file **migration** ở trong thư mục `database/migrations`
- Về phần `--create` hay `--table` là để chỉ ra tên của bảng và việc migration có tạo bảng mới hay không.
- Mỗi file migration được đặt tên bao gồm `timestamp + tên` để xác định thứ tự migartion với nhau.

# 3 File migration.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
};
```

- Trong file này có 2 funtion là **up** và **down**.
- Về cơ bản thì function **up** sẽ chạy khi bạn thực thi câu lệnh `php artisan migrate` còn function **down** sẽ được chạy khi bạn thực thi câu lệnh `php artisan migrate:rollback`.
- Tất nhiên là khi function **up** được thực thi thì nó sẽ sinh ra một bảng **uers** trong database của bạn còn function **down** sẽ xóa bảng đó đi.

# 4 Chạy migration
- Như ở trên mình có nói thì để thực thi các file **migration** thi bạn chỉ cần chạy lệnh:
```
php artisan migrate
```
- Và để quay trở lại trạng thái trước đó thì chạy lệnh:
```
php artisan migrate:rollback
```
- Ngoài ra bạn cũng có thể xác định số bước khôi phục bằng lựa chọn `--step` .
```
php artisan migrate:rollback --step=5
```
- **Laravel** cũng cung cấp cho bạn một cách để bạn không cần phải chạy lại **migrate** mỗi khi rollback đó là
```
php artisan migrate:reset
```

# 5. Schema
- Bạn có thể hiểu **Schema** dùng để `tạo, sửa, xóa,..` những thứ liên quan đến **table** trong database.
```php
//tạo bảng
Schema::create('users', function (Blueprint $table) {}
//đổi tên bảng
Schema::rename('post', 'posts')
//xóa bảng
Schema::drop('users');
Schema::dropIfExists('users');
```
- Bạn cũng có thể kiểm tra xem bảng hoặc cột đó có tồn tại hay không bằng cách
```php
// kiểm tra bảng tồn tại
if (Schema::hasTable('users')) {
    //
}
// kiểm tra cột tồn tại
if (Schema::hasColumn('users', 'email')) {
    //
}
```

- Tạo cột:
```php
Schema::create('users', function (Blueprint $table) {
    $table->type('ten_cot');   //type ở đây là chỉ các kiểu mà cột đó cần
    $table->type('ten_cot');
}
```
- Bạn có thể tham khảo các kiểu dữ liệu ở đây: [tại đây](https://laravel.com/docs/8.x/migrations#available-column-types)

# 6. Foreign Key Constraints
- Để  tạo các rằng buộc cho các bảng, chúng ta có thể sử dụng cú pháp sau để rằng buộc cho 2 bảng:
```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```

# Kết luận
- Trên đây là những điều cơ bản về **migration** mình muốn giới thiệu tới các bạn. Mong rằng nó sẽ giúp được các bạn.
- Phần sau mình sẽ giới thiệu cho các bạn về models trong Laravel.