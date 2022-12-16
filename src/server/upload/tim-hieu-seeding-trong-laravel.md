# Giới thiệu
- Laravel cung cấp phương pháp dễ dàng tạo dữ liệu mẫu trong database bằng các lớp seed.
- Các lớp seed nằm trong thư mục `database/seeds`.

 ![](https://images.viblo.asia/f599f2e5-d34a-4a55-8d13-12ab73d58d61.PNG)
- Các lớp seed có thể được đặt tên bất kỳ, nhưng nên được đặt theo một số quy tắc, VD `PostsTableSeeder`.
- Mặc định lớp `DatabaseSeeder` được tạo sẵn, trong lớp này bạn có thể `call` các seed khác.
# Tạo Seeders
- Để tạo một seed ta dùng lệnh `php artisan make:seed [tên_seed]`.
```php
<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
    }
}

```
- Một lớp seed chỉ chứa phương thức mặc định `run`.
- Phương thức này sẽ được gọi khi chạy lệnh artisan cmd `php artisan db:seed`.
- Trong phương thức `run` ta sẽ insert dữ liệu.
```php
    public function run()
    {
        $posts = [
            [
                'id' => 1,
                'title' => 'Lập trình PHP',
                'slug' => str_slug('Lập trình PHP'),
                'content' => '....',
                'category_id' => rand(1,3),
            ],
            [
                'id' => 2,
                'title' => 'Lập trình Ruby',
                'slug' => str_slug('Lập trình Ruby'),
                'content' => '....',
                'category_id' => rand(1,3),
            ]
        ];

        try {
            foreach ($posts as $post) {
                Post::create($post);
            }
        } catch (\Throwable $th) {

        }
    }
```
# Sử dụng Factory
- Tùy vào nhu cầu người dùng có thể insert dữ liệu bằng tay hay sử dụng sử liệu random.
- Sử dụng model factory để tạo ra nhiều bản ghi.
- Để tạo factory ta dùng lệnh `php artisan make:factory [tên_factory]` VD: PostFactory
```php
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
    return [
        //
    ];
});

```
- Ta cần sửa lại model và bắt đầu insert dữ liệu, ở dưới đây tôi sử dụng faker để tạo dữ liệu mẫu.
- Một số faker mẫu.

| # | Cú pháp | Kết quả ví dụ |
| -------- | -------- | -------- |
| 1     | $faker->randomDigit     | 7 
| 2     | $faker->word     | 'aut' 
| 3     | $faker->name     |  'Dr. Zane Stroman'
| 4     | $faker->address     |  '8888 Cummings Vista Apt. 101, Susanbury, NY 95473'
| 5     | $faker->phoneNumber     |  '201-886-0269 x3767'
| 6     | $faker->company     | 'Bogan-Treutel'
| 7     | $faker->text     |  'Dr. Zane Stroman'
| 9     | $faker->dateTime($max = 'now', $timezone = null)     |  DateTime('2008-04-25 08:37:17', 'UTC')
| 10     | $faker->email     |  'tkshlerin@collins.com'
| 11     | $faker->chrome     | 'Mozilla/5.0 (Macintosh; PPC Mac OS X 10_6_5) AppleWebKit/5312 (KHTML, like Gecko) Chrome/14.0.894.0 Safari/5312'
| 12     | $faker->hexcolor     | '#fa3cc2'
| 13     | $faker->fileExtension     | 'avi'
| 14     | $faker->imageUrl($width = 640, $height = 480)     | URL ảnh có kích thước 640 x 480
| 15     | $faker->uuid     | '7e57d004-2b97-0e7a-b45f-5387367791cd'
| 16     | $faker->ean13     | '4006381333931'
| 17     | $faker->md5     | 'de99a620c50f2990e87144735cd357e7'
| 18     | $faker->randomHtml(2,3)     |Tạo tài liệu HTML sâu không quá 2 cấp và rộng không quá 3 phần tử ở mọi cấp.
-   [Bạn có thể xem chi tiết tại](https://github.com/fzaninotto/Faker)
```php
$factory->define(Post::class, function (Faker $faker) {
    $title = $faker->text(10);
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'content' => $faker->text(100),
        'category_id' => rand(1,3),
    ];
});
```
- Sau khi định nghĩa sau thì trong hàm `run` của lớp `PostsTableSeeder` ta chỉ cần gọi `factory(tên_lớp, số_lượng)->create()` .
```php
public function run()
{
    factory(Post::class, 100)->create();
}
```
# Gọi Seeders
- Trong lớp DatabaseSeeder, ta có thể `call` các lớp seed khác.
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
        $this->call(CategoriesTableSeeder::class);
        $this->call(PostsTableSeeder::class);
    }
}

```
- Chú ý khi `call` các lớp phải theo thứ tự quan hệ. VD: Ở trên ta chạy `CategoriesTableSeeder` trước vì `PostsTableSeeder` cần có `category_id` để insert vào trong cột category_id của `PostsTableSeeder` .
# Chạy Seeders
- Trước khi chạy bạn nên load lại các file sử dụng `composer dump-autoload`
- Sử dụng `php artisan db:seed` để chạy tất cả các file được `call` trong lớp `DatabaseSeeder`.
- Chỉ định seed một lớp `php artisan db:seed --class=UsersTableSeeder`.
- Sử dụng `php artisan migrate:fresh --seed` để xóa tất cả các bảng sau đó chạy lại các bảng và seed.
# Kết luận
- Seed cho phép tạo dữ liệu mẫu nhanh chóng và tái sử dụng lại.
- Với thư viện [Faker](https://github.com/fzaninotto/Faker) cho phép tạo những dữ liệu mẫu đúng với thực tế hơn.
- Thuật lợi cho quá trình phát triển và kiểm thử ứng dụng.
# Tài liệu tham khảo
- [Database: Seeding](https://laravel.com/docs/6.x/seeding)
- [fzaninotto/Faker](https://github.com/fzaninotto/Faker)