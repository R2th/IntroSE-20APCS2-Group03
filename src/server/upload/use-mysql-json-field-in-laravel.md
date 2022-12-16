# 1. Giới thiệu
Khi chúng ta làm việc trên một app cần lưu trữ nhiều dữ liệu về thông tin người dùng, chúng ta có thể sử dụng cơ sở dữ liệu **NoQuery (MongoDB)** vì bộ dữ liệu Json có thể được mở rộng và tùy chỉnh cho thông tin người dùng cụ thể do cấu trúc schemaless của nó. Tuy nhiên từ phiên bản **Mysql 5.7.8** trở đi đã hỗ trợ kiểu dữ liệu là dạng json.

Chúng ta có vừa có thể lưu trữ dữ liệu dưới dạng json mà còn có thể truy vấn đối với dạng dữ liệu này. Vì vậy, chúng ta có thể sử dụng type json để đáp ứng được yêu cầu để ra khi mà chúng ta sử dụng cơ sở dữ liệu Mysql và mong muốn có một column lưu trữ thông tin người dùng có thể mở rộng và tùy chỉnh được.
# 2. Tạo project laravel
Tạo một project laravel tên là "JsonLaravel" sử dụng câu lệnh sau.
```php
composer create-project --prefer-dist laravel/laravel JsonLaravel
```
Sau khi hoàn thành trong file database/migrations/ ta tạo một file migration với column meta dạng json để lưu trữ thông tin người.
```php
php artisan make:migration modify_users_table
```
Thay nội dung của file vừa tạo như sau:
```php 
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
           $table->json('meta')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
           $table->dropColumn('meta');
        });
    }
}
```
Cấu trúc column "meta" có dạng như bên dưới (Chúng ta có thể thay đổi tùy theo mục đích lưu trữ khác nhau)
```json
{
    "gender": "Male",
    "country": "India",
    "bio": {
        "summery": " A labore voluptatem ipsam velit alias.",
        "full": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. "
    },
    "skills": ["PHP", "Laravel", "MySQL", "VueJS", "JavaScript"]
}
```
Chạy lệnh sau để tạo db
```php
php artisan migrate
```
Để ép kiểu json khi mà thêm vào, hoặc lấy ra kiểu array ta làm như sau
```php
// Trong file app/User.php
protected $casts = [
     'meta' => 'array'
];
// thuộc tính được mass assignment
protected $fillable = [
  'name', 'email', 'password', 
  'meta'
];
```
Fake một vài dữ liệu mẫu cho bảng user của chúng ta
```php 
// Trong file database/factories/ModelFactory.php
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'meta' => [
            "gender" => $faker->randomElement(['Male', 'Female']),
            "country" => $faker->country,
            "bio" => [
                "summery" => $faker->realText(),
                "full" => $faker->realText(800)
            ],
            "skills" => $faker->randomElements(["PHP", "Laravel", "MySQL", "VueJS", "JavaScript"], rand(2,4))
        ],
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});
```
# 3. Truy vấn dữ liệu json
```php
// Lấy tất cả user từ thành phố India
App\User::where('meta->country', 'India')->get()

// Lấy tất cả user với giới tính là nam
App\User::where('meta->gender', 'Female')->get()

// Lấy tất cả user có skills là Vue
App\User::where('meta->skills', 'like',  '%Vue%')->get()

// Tìm kiếm trong một tài liệu Json

#  Lấy tất cả user có skills là Laravel
App\User::whereRaw('JSON_CONTAINS(meta->"$.skills", \'["Laravel"]\')')->get();

# Lấy tất cả user có skills là Php
App\User::whereRaw('JSON_SEARCH(meta->"$.skills", "one", "PHP%") IS NOT NULL')->get();

# Selecting json path as columns 
App\User::select('id', 'name', 'meta->gender as sex', 'meta->skills as skills')->get()
```
# 4. Cập nhật dữ liệu json
```php
// Update JSON data
$user = App\User::first();
$user->meta = [ 'bio' => [ 'full' => 'Lorem ipsum dolor sit amet...' ] ];
$user->save();
// output
{"bio":{"full":"Lorem ipsum dolor sit amet..."}}
```
Ngoài ra còn có những hàm của Mysql 5.7.8 hỗ trợ khác nữa
```
JSON_SET(doc, path, val[, path, val]...)  thêm hoặc cập nhật data in the document

JSON_INSERT(doc, path, val[, path, val]...) thêm data into the document

JSON_REPLACE(doc, path, val[, path, val]...) thay thế data in the document

JSON_MERGE(doc, doc[, doc]...) gộp two or more documents

JSON_ARRAY_APPEND(doc, path, val[, path, val]...) chèn thêm data vào cuối mảng

JSON_ARRAY_INSERT(doc, path, val[, path, val]...) thêm data của một mảng in the document
```
# 5. Xóa dữ liệu json
```php 
// Remove skills from a user 
User::find(17)
    ->update(['meta' => DB::raw('JSON_REMOVE(meta, "$.skills")')])
```
# 6. Kết luận
Bằng cách sử dụng Json được tích hợp trong MySQL 5.7.8, chúng ta có thể sử dụng tính linh hoạt của cơ sở dữ liệu không quan hệ (Nosql) trong MySQL và Laravel.
# 7. Tài liệu tham khảo
https://www.qcode.in/use-mysql-json-field-in-laravel