# 1. Giới thiệu
-  Khi bắt đầu một project bạn cần tạo database nếu tạo bằng tay sẽ rất bất tiện và nếu có thay đổi thuộc tính hay thêm mới một bảng, cột dữ liệu thì việc kiểm soát chúng rất khó khăn.
- Laravel cung cấp migrations giúp cho việc kiểm soát các phiên bản database dễ dàng, cho phép các thành viên  sửa đổi và chia sẽ database của ứng dụng.
- Để biết được những tiện lợi của migration hãy theo dõi bài viết dưới đây.
# 2. Các lệnh artisan command trong migrate
## Tạo migration
- Để tạo file migration chúng ta sử dụng câu lệnh.
php artisan make:migration create_users_table
- File timestamp _create_users_table sẽ được sinh ra trong thư mục `database/migrations` , timestamp có định dạng 2019_10_14_071928.
- Ngoài ra có 2 lựa chọn `--table` và `--create`.
    - `--table` Tạo ra file migration cho mục đích thay đổi thuộc tính các column.
    ```
    php artisan make:migration add_votes_to_users_table --table=users
    ```
    - `--create` Tạo ra file migration cho mục đích tạo bảng.
    ```
    php artisan make:migration create_users_table --create=users
    ```
## Cấu trúc migration
- Một class trong migration có 2 phương thức `up` và `down`.
Phương thức `up` được sử dụng để tạo tables, columns và indexes.
- Phương thức `down` sẽ reverse lại các hoạt động của phương thức `up`.
- VD migration tạo bảng users.
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
            $table->bigIncrements('id');
            $table->string('name');
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
## Thực thi file migrations
| Command | Description |
| ----------- | ----------- |
| php artisan migrate | Để  thực thi tất cả các file migration. |
| php artisan migrate --force| Để  thực thi tất cả các file migration mà không cần xác nhận. |
| php artisan migrate:rollback | Khôi phục các file migration đã tạo. |
| php artisan migrate:rollback --step=5 | Khôi phục về phiên bản  --step=5.|
| php artisan migrate:reset| Khôi phục tất cả các migration.|
| php artisan migrate:refresh| Khôi phục tất cả các migration và thực thi migrate.|
| php artisan migrate:refresh --seed |  Khôi phục tất cả các migration và thực thi migrate, seed.|
| php artisan migrate:refresh --step=5 | Khôi phục và di chuyển lại phiên bản  --step=5.|
| php artisan migrate:fresh| Xóa tât cả các bảng trong database và thự thi migrate.|
| php artisan migrate:fresh --seed| Xóa tất cả các bảng trong database và thự thi migrate, seed.|
# 3. Table
## Tạo table
- Sử dụng phương thức `create` trong `Schema`.
- Phương thức `create` có 2 tham số.
    - Tham số  thứ 1 là tên bảng.
    - Tham số  thứ 2 là một `Closure` nhận vào 1 đối tượng Blueprint được sử dụng để định nghĩa một bảng mới.
```
Schema::create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('name');
    $table->timestamps();
});
```
## Kiểm tra table/column có tồn tại
- Laravel cung cấp 2 phương thức `hasTable` và `hasColumn` để làm việc này:
```
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```
## Kết nối database và table
- Nếu muốn kết nối đến database khác không phải là mặc định, sử dụng phương thức connection.
```
Schema::connection('foo')->create('users', function (Blueprint $table) {
   $table->bigIncrements('id');
});
```
## Đổi tên, xóa table
- Đổi tên một table tồn tại trong database, sử dụng phương thức `rename`. Trước khi đổi tên bảng, nên kiểm tra lại các khóa ngoại trong bảng.
```
Schema::rename($from, $to);
```
- Xóa bảng tồn tại trong database, sử dụng method `drop` hoặc `dropIfExists`.
```
Schema::drop('users');
Schema::dropIfExists('users');
```
# 4. Columns
## Tạo columns
- Phương thức `table` trong `Schema` được sử dụng để cập nhật nếu tồn tại. Như phương thức `create`, phương thức `table` chấp nhận 2 tham số: tên bảng và một `Closure` nhận vào thể hiện của đối tượng `Blueprint` được dùng để  thêm column cho table.
```
Schema::table('users', function (Blueprint $table) {
    $table->string('email');
});
```
- Một số column có sẵn [Xem thêm](https://laravel.com/docs/6.x/migrations#creating-columns).

| Câu lệnh | Mô tả |
| ----------- | ----------- |
| $table->bigIncrements('id'); | Cột khóa chính, số nguyên tự động tăng không âm. |
| $table->bigInteger('votes'); | Cột kiểu dữ liệu số nguyên |
| $table->boolean('confirmed'); | Cột kiểu dữ liệu boolean |
| $table->date('created_at'); | Cột kiểu dữ liệu ngày |
| $table->dateTime('created_at'); | Cột kiểu dữ liệu ngày, giờ. |
| $table->dateTimeTz('created_at'); | Cột kiểu dữ liệu ngày giờ theo múi giờ |
| $table->decimal('amount', 8, 2); | Cột kiểu dữ liệu số thập phân với độ chính xác 8 và số thập phân 2|
| $table->double('amount', 8, 2); | Tương tự decimal nhưng là double|
| $table->enum('level', ['easy', 'hard']); | Cột kiểu enum |
| $table->float('amount', 8, 2); | Tương tự decimal nhưng là float |
| $table->increments('id'); | Cột khóa chính, số nguyên tự động tăng không âm.  |
| $table->integer('votes'); | Cột kiểu dữ liệu số nguyên |
| $table->json('options'); | Cột kiểu dữ liệu json |
| $table->jsonb('options'); | Cột kiểu dữ liệu jsonb |
| $table->lineString('positions'); | Cột kiểu dữ liệu line string |
| $table->longText('description'); | Cột kiểu dữ liệu long text  |
| $table->macAddress('device'); | Cột kiểu dữ liệu địa chỉ MAC  |
| $table->mediumIncrements('id'); | Cột khóa chính, số nguyên tự động tăng không âm.  |
| $table->mediumInteger('votes'); | Cột kiểu dữ liệu số nguyên |
| $table->mediumText('description'); | Cột kiểu dữ liệu text |
| $table->string('name', 100); | Cột kiểu dữ liệu chuỗi.  |
## Column Modifiers
- Ngoài các loại column trên, có thể bổ sung các thêm các thuộc tính cho column.
- Ví dụ: Để tạo một column có thể  `nullable`.
```
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable();
});
```
- Các column modifers có sẵn [Xem thêm](https://laravel.com/docs/6.x/migrations#column-modifiers)

| Câu lệnh | Mô tả |
| ----------- | ----------- |
| ->after('column') | Thêm vào sau cột khác |
| ->autoIncrement() | Thêm cột số nguyên tự động tăng(khóa chính) |
| ->charset('utf8') | Chỉ định bộ ký tự cho cột |
| ->collation('utf8_unicode_ci') | Chỉ định collation cho cột |
| ->comment('my comment') | Thêm nhận xét vào cột |
|->default($value) | Thêm giá trị mặc định |
| ->first() | Đặt cột đầu tiên trong bảng |
| ->nullable($value = true) | Cho phép giá trị null được thêm vào cột |
| ->storedAs($expression) | Tạo một cột được lưu trữ |
| ->unsigned() | Thêm cột số nguyên và không âm |
## Thay đổi columns
- Điều kiện phải cài gói: `composer require doctrine/dbal`.
- Thay đổi thuộc tính của column, sử dụng phương thức `change` để tiến hành thay đổi.
```
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 50)->change();
});
```
- Thay đổi tên column, sử dụng phương thức `renameColumn`.
```
Schema::table('users', function (Blueprint $table) {
    $table->renameColumn('from', 'to');
});
```
- Một số aliases có sẵn

| Câu lệnh | Mô tả |
| ----------- | ----------- |
| $table->dropMorphs('morphable') | Xóa morphable_id và cột morphable_type |
| $table->dropRememberToken(); | Xóa cột remember_token |
| $table->dropSoftDeletes(); | Xóa cột delete_at |
| $table->dropSoftDeletesTz(); | Aliases của phương thức dropSoftDeletes() |
| $table->dropTimestamps();	 | Xóa cột created_at và updated_at |
| $table->dropTimestampsTz(); | Aliases của phương thức dropTimestamps()  |
## Xóa columns
- Sử dụng method `dropColumn` để xóa columns.
- Xóa một columns.
```
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('votes');
});
```
- Xóa nhiều columns.
```
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```
# 5. Tài liệu tham khảo
- [Database: Migrations](https://laravel.com/docs/6.x/migrations)