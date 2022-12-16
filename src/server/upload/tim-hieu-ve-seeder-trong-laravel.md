Xin chào anh em, tiếp tục series **Laravel và những điều thú vị về nó**, hôm nay mình sẽ giới thiệu về **Seeder** trong Laravel cho các bạn. Như các bạn biết đấy, khi chúng ta tạo xong CSDL(các bạn có thể tham khảo tại bài viết [Migration](https://viblo.asia/p/tim-hieu-ve-migration-trong-laravel-bWrZn1MpKxw) của mình để rõ hơn cách tạo table bằng Migration trong Laravel). Bây giờ chúng ta cần có một số lượng dữ liệu kha khá lớn để hiển thị lên website của chúng ta, thay vì cách nhập tay thủ công thông thường vừa tốn thời gian vừa tốn công thì Laravel hỗ trợ chúng ta Seeder để nhanh chóng tạo dữ liệu , nhanh chóng để phát triển tính năng của chúng ta.
# 1. Cấu trúc thư mục
Tất cả các seed class được đặt trong thư mục ```database/seeds```. trong thư mục này đã có sẵn file ```DataTableSeeder.php``` 

![](https://images.viblo.asia/a7f79df6-f9a4-48b3-9017-a23fab21cfe8.png)
```PHP
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
        // $this->call(UsersTableSeeder::class);
    }
}
```
Mặc định trong file này sẽ có class DatabaseSeeder có function ```run()``` call tới các seed class khác, cho phép bạn có thể control được thứ tự thêm dữ liệu theo thứ tự bạn sắp xếp.

# 2. Các cách insert dữ liệu bằng Seeder
Có rất nhiều cách để thêm dữ liệu bằng seeder , sau đây mình xin giới thiệu về một trong những cách đó.
## Viết thẳng trong file DataTableSeeder.php
Chúng ta có thể viết trực tiếp trong function ```run()```
```PHP
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
        DB::table('categories)->insert([
            ['name' => 'Điện thoại'],
            ['name' => 'Laptop'],
            ['name' => 'Tivi'],
        ]);
    }
}
```
hoặc chúng ta cũng có thể tách riêng ra 1 class và sử dụng hàm hàm ```call()``` trong function ```run()```.

![](https://images.viblo.asia/ada54590-fe05-4434-94ef-2a1e44b69ac2.png)
<br>Lúc này xong , chúng ta sẽ chạy câu lệnh để thực thi chèn dữ liệu vào bảng ```catgories``` : ``` php artisan db:seed```.
## Sử dụng Model Factories
Các bạn thấy sử dụng cách trên nó vẫn còn thủ công, chúng ta phải thêm từng record cho một bảng bằng tay. Thay vì thế, để sinh ra một lượng dữ liệu lớn như 100 records chúng ta sẽ sử dụng Model Factories. Bây giờ các bạn hãy follow theo ví dụ của mình để có thể hiểu thêm về nó nhé.
<br>Ví dụ đặt ra là chúng ta cần tạo **1000 records** trong bảng users.
Trong folder database ta sẽ thấy còn có một folder nữa là factories, bên trong folder này có 1 file tên là UserFactory.php dùng để định nghĩa cấu trúc của dữ liệu mẫu mà ta muốn thêm vào CSDL theo từng bảng. Trong folder đó có chứa sẵn UserFactory.php 
```PHP
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

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});
```
Bây giờ chúng ta tạo 1 file giống ý hệt file này nhưng đổi tên thành ``` SupplierFactory.php``` hoặc có thể sử dụng terminal để tạo `php artisan make:factory SupplierFactory`
```PHP
<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Supplier::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'created_at' => new DateTime,
        'updated_at' => new DateTime,
    ];
});
```
Các bạn sẽ nhìn thấy trong file này nó ``` use Faker\Generator as Faker```. Đây là một thư viện fake data rất hữu ích, chúng ta không cần phải nghĩ ra những địa chỉ, những số điện thoại hay email để thêm vào table. Điểu đó đã được thự viện [``` Faker```](https://github.com/fzaninotto/Faker) hỗ trợ hết.
<br>Tiếp theo chúng ta sẽ sẽ tạo file seeder : ```php artisan make:seed SupplierTableSeeder``` , sau khi ấn enter một file SuplierTableSeeder sễ được sinh ra trong folder database/seeds.
```PHP
<?php

use Illuminate\Database\Seeder;

class SuppliersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Supplier::class, 1000)->create();
    }
}
```
Trong function ``` run()``` chúng ta sẽ sử dụng hàm của helper trong Laravel là hàm ```factory()```. Đối số thứ nhất truyền vào class Model , đối số thứ hai truyền vào số lượng bản ghi muốn sính ra.
<br>Giờ chúng ta vào file ```DatableSeeder.php``` trong hàm ``` run()``` :
```PHP
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
        $this->call(SuppliersTableSeeder::class);
    }
}

```
Và cuối cùng chạy lệnh `php artisan db:seed`
<br>Hoặc chúng ta cũng có thể chạy file ``` SupplierTableSeeder.php``` bằng câu lệnh : ``` php artisan db:seed --class=SupplierTableSeeder```
## Chú ý!
Để chạy nhiều Seeder ta sẽ tạo nhiều file Seeder rồi gọi chúng trong function`run()` ở file `DataTableSeeder.php` :
```PHP
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
        $this->call(RolesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(SuppliersTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(ImagesTableSeeder::class);
    }
}
```
Các bạn hãy chú ý table nào cần thêm dữ liệu trước để sắp xếp thứ tự trong function `run()` nhé!!!
# 3. Kết luận
Bài viết trên nhằm giới thiệu đến các bạn sử dụng Seeder trong Laravel , vừa tiết kiệm thời gian vừa đỡ tốn công. Mọi thắc mắc gì các bạn comment phía dưới nhé. Hẹn gặp lại các bạn ở các bài tiếp theo.
# 4. Tham khảo
https://laravel.com/docs/5.6/seeding
<br>https://laravel.com/docs/5.6/database-testing#writing-factories
<br>https://github.com/fzaninotto/Faker