Xin chào mọi người. Như các bạn đã biết việc test là một công việc lặp đi lặp lại trong quá trình xây dựng ứng dụng. Chính vì thế chúng ta cần 1 bộ dữ liệu mẫu để phục vụ cho công việc đó. Thay vì nhập tay một cách thủ công thì Laravel đã cung cấp Seeder để tạo dữ liệu. Trong bài viết này chúng ta sẽ cùng nhau tạo 1 seeder đơn giản và hiểu cách hoạt động của nó nhé.
![](https://images.viblo.asia/926965b4-8ec7-4a17-8efc-7013fc5945f3.png)
# Seeder là gì?

Seeder thực chất là 1 class để tạo ra các dữ liệu mẫu cho database trong quá trình xây dựng ứng dụng. 
# Các bước tạo một seeder

Chúng ta cùng vào thư mục  ***database/seeds/*** sẽ thấy 1 file ***DatabaseSeeder.php***, đây gọi là seeder gốc sẽ được chạy khi ta thêm dữ liệu, nội dung file gốc như sau.

```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //
    }
}
```
Như chúng ta thấy thì trong file seeder gốc có ***function run()*** , muốn thêm dữ liệu vào database chúng ta có thể viết các câu lệnh truy vấn trong hàm này.
```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        
        $users = [
            ['TranCongTu', '12345678', 'visaodoncoi9x@gmail.com','3'],
            ['NguyenThiXuan', '12345678', 'nguyenxuan@gmail.com','3'],
        ];

        foreach ($users as $user) {
            DB::table('users')->insert([
                'username' => $user[0],
                'password' => $user[1],
                'email' => $user[2],
                'role_id' => $user[3]
            ]);
        }
        
        Schema::enableForeignKeyConstraints();
    }
}
```
Tuy nhiên thì nếu như chúng ta thêm tất cả các dữ liệu mẫu cho database của mình trong file seeder gốc này thì sẽ dẫn đến tình trạng rối loạn và khó kiểm soát. Trong thực tế thì chúng ta sẽ tách ra thành các file seeder nhỏ cho từng bảng, rồi gọi chúng vào ***function run()*** trong file seeder gốc. Chúng ta sẽ cùng nhau tạo 1 seeder mới cho bảng users nhé.

**Bước 1**: Tạo 1 seeder mới cho bảng users có tên là UsersTableSeeder.php
```
php artisan make:seeder UsersTableSeeder
```
**Bước 2**: Giờ đây chúng ta đã có 1 file ***UsersTableSeeder.php*** trong thư mục ***database/seeds/*** . Chúng ta sẽ thêm các câu lênh truy vấn để tạo seed cho bảng users.
```php
<?php

use Illuminate\Database\Seeder;
use App\Models as Database;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();

        $users = [
        	 ['TranCongTu', '12345678', 'visaodoncoi9x@gmail.com','3'],
            ['NguyenThiXuan', '12345678', 'nguyenxuan@gmail.com','3'],
        ];

        foreach ($users as $user) {
            Database\User::create([
                'username' => $user[0],
                'password' => $user[1],
                'email' => $user[2],
                'role_id' => $user[3]
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
```
**Bước 3**: Bây giờ chúng ta chỉ cần gọi UsersTableSeeder.php class vào ***function run()*** trong file seeder gốc.
```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
    }
}
```
**Bước 4**: Chúng ta sẽ có 2 cách chạy.
* Cách 1: Chỉ định trực tiếp class seeder cần chạy bằng lệnh
```bash
 php artisan db:seed --class=UsersTableSeeder
```
* Cách 2: Chạy tất cả các seeder được gọi vào file seeder gốc.
```bash
php artisan db:seed
```

Như vậy chúng ta đã tao thành công dữ liệu mẫu vào database. Bên cạnh đó, chúng ta còn có thể sử dụng 1 thư viện tạo dữ liệu giả Faker. Thư viện này hỗ trợ tạo dữ liệu giống y như dữ liệu thật giúp chúng ta không phải mất công nghĩ các tên, số điện thoại hay các email ..v..v
```php
<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Schema::enableForeignKeyConstraints();
        
        $faker = Faker\Factory::create('ja_JP');
        $limit = 100;
        $lang = [User::LANG_JAPANESE, User::LANG_VIETNAMESE];

        for ($i = 0; $i < $limit; $i++) {
            $randomKey = array_rand($lang);
            User::create([
                'login_id' => $faker->unique()->ean8,
                'username' => $faker->username,
                'password' => Hash::make(12345678),         
                'email' => $faker->unique()->safeEmail,
                'role_id' => Role::all()->random()->id,
            ]);
        }
    }
}

```
Đến đây, các bạn thấy mọi thứ đã dần ổn rồi phải không? Vậy mình xin đặt 1 câu hỏi. Như ở ví dụ trên với số lượng bản ghi còn ít, 2 bản ghi thì chúng ta có thể thêm thủ công, rồi số lượng bản ghi lớn hơn là 100 chúng ta sẽ chạy 100 vòng for để thêm dữ liệu vào. Vậy số lượng bản ghi lên tới 10000 bản ghi thì sao? Đừng lo lắng! Laravel đã cung cấp cho chúng ta 1 cỗ máy đó chính là Model Factory. Chúng ta cùng tìm hiểu cách vận hành 1 Model Factory nhé.
# Tạo Model Factory
Chúng ta sẽ tiếp tục ví dụ với bảng users bằng việc tạo Model Factory cho nó và cùng cảm nhận nhé.

**Bước 1**: Tạo Model Factory cho bảng users với tên UserFactory.php
```bash
php artisan make:factory UserFactory
```
**Bước 2**: Sau khi hoàn thành bước 1, chúng ta sẽ được 1 file UserFactory.php trong thư mục ***database/factories/*** . Tiếp đó chúng ta sẽ tạo dữ liệu, trong Model Factory đã tích hợp sẵn thư viện tạo dữ liệu giả Faker.
```php
<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'login_id' => $faker->unique()->ean8,
        'username' => $faker->username,
        'password' => Hash::make(12345678),         
        'email' => $faker->unique()->safeEmail,
        'role_id' => App\Models\Role::all()->random()->id,
    ];
});
```
**Bước 3**: Bây giờ trong ***function run()*** của ***UsersTableSeeder*** class chúng ta sử dụng hàm *helper* ***factory()*** với 2 đố số truyền vào:

1. Class models cần tạo dữ liệu.
2. Số bản ghi cần tạo.
```php
<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class JobTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 100)->create();
    }
}
```
Như vậy việc tạo dữ liệu mẫu số lượng lớn không còn là vấn đề phải lo nghĩ nữa phải không? Chúng ta có thể dễ dàng thấy được việc định nghĩa trước cấu trúc dữ liệu cần để insert vào database sẽ giúp cho chúng ta tối ưu được code và tiện lợi cho quá trình chỉnh sửa hoặc thay đổi số lượng bản ghi 1 cách dễ dàng.
# Kết luận
Đến đây chắc mọi người đã hiểu về seeder, model factory và cách thức hoạt động của chúng rồi phải không. Hy vọng bài viết này mang lại thú vị, cũng như góp thêm một chút ít kiến thức cho mọi người. Chúc mọi người thành công <3 <3 <3 
# Tài liệu tham khảo
[https://laravel.com/docs/5.7/seeding](https://laravel.com/docs/5.7/seeding)

[https://laravel-news.com/learn-to-use-model-factories-in-laravel-5-1](https://laravel-news.com/learn-to-use-model-factories-in-laravel-5-1)