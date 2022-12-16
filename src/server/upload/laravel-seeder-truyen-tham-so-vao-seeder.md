Trong quá trình làm việc mình đã gặp nhiều trường hợp cập nhật lại dữ liệu cho 1 *table* bằng cách sử dụng *seeder*. Vậy làm thế nào để chúng ta có thể thêm các tham số tùy chỉnh khi chạy *seeder*?.

## 1. Truyền tham số trực tiếp trong command khi chạy

### 1.1 Sử dụng `command->ask('key')` 

Trong file seeder hãy sử dụng phương thức `ask('SEED_KEY', 'default_value')`, lệnh này sẽ yêu cầu nhập giá trị khi chạy seeder nếu bạn để trống và enter giá trị `SEED_KEY` sẽ là `default_value`.

```php
// database/seeders/UpdateSomeThingSeeder.php

class UpdateSomeThingSeeder extends Seeder
{
    public function run()
    {
        $valueName = $this->command->ask('SEED_KEY', 'Thanh');
        $this->command->alert("User name: {$userName}");
    }
}
```
Chạy thử seeder
```sh
php artisan db:seed --class=UpdateSomeThingSeeder
```

Đây là kết quả khi sau khi chạy seeder
```
$php artisan db:seed --class=UpdateSomeThingSeeder

 User name [Thanh]:
 > Cong Thanh           

*********************************
*     User name: Cong Thanh     *
*********************************

Database seeding completed successfully.
```

### 1.2 Sử dụng `env('key')` 

Trong file seeder hãy sử dụng `env('SEED_KEY', 'default_value')`, lệnh này sẽ lấy giá trị biến `SEED_KEY` trong file cấu hình `.env` hoặc bạn cũng có thể truyền trực tiếp khi chạy seeder
```php
// database/seeders/UpdateSomeThingSeeder.php

class UpdateSomeThingSeeder extends Seeder
{
    public function run()
    {
        $valueName = env('SEED_KEY', 'Thanh');
        $this->command->alert("User name: {$userName}");
    }
}
```
Chạy thử seeder
```sh
SEED_KEY='Cong Thanh' php artisan db:seed --class=UpdateSomeThingSeeder
```

Đây là kết quả khi chạy seeder
```
$SEED_KEY='Cong Thanh' php artisan db:seed --class=UpdateSomeThingSeeder
*********************************
*     User name: Cong Thanh     *
*********************************

Database seeding completed successfully.
```

## 2. Truyền tham số giữa các seeder

Trong file seeder hãy sử dụng `callWith(seederClass, params = [])` hàm này có 2 tham số:
- seederClass: giống với hàm `call()` tham số này chính là `Class` của seeder bạn muốn chạy
- params: các biến bạn muốn truyền sang cho seeder `seederClass` khi chạy

```php
// database/seeders/DatabaseSeeder.php

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->callWith(UpdateSomeThingSeeder::class, ['userName' => 'Cong Thanh']);
    }
}
```

```php
// database/seeders/UpdateSomeThingSeeder.php

class UpdateSomeThingSeeder extends Seeder
{
    public function run($userName = 'Thanh')
    {
        $this->command->alert("User name: {$userName}");
    }
}
```

Chạy thử seeder
```sh
php artisan db:seed
```

Đây là kết quả khi chạy seeder
```
php artisan db:seed
Seeding: Database\Seeders\UpdateSomeThingSeeder
*********************************
*     User name: Cong Thanh     *
*********************************

Seeded:  Database\Seeders\UpdateSomeThingSeeder (0.35ms)
Database seeding completed successfully.
```

## 3. Tham khảo

- [Laravel - Seeder](https://github.com/laravel/framework/blob/9.x/src/Illuminate/Database/Seeder.php#L80)
- [Laravel - Command ask()](https://github.com/laravel/framework/blob/9.x/src/Illuminate/Console/Concerns/InteractsWithIO.php#L145)
- [Youtube - Laravel Daily](https://www.youtube.com/watch?v=quowhrwzshA)

## 4. Lời kết

*Hi vọng chia sẻ này sẽ giúp các bạn newbie 1 phần nào trong quá trình tìm hiểu về Laravel. Nếu thấy hữu ích hãy cho mình 1 vote 👍 để thêm nhiều người biết đến chia sẻ này nhé.*

> Mình là **[Công Thành](https://viblo.asia/u/viblo.d.c.thanh)** cám ơn các bạn đa theo dõi bài viết của mình, nếu có câu hỏi nào vui lòng bình luận phía dưới 👇 nhé.

> Xem thêm series bài viết 👉 [Laravel tips](https://viblo.asia/s/laravel-tips-meo-hay-ve-laravel-r1QLxn3x4Aw)