# Dumy data trong laravel
 Nhờ các thư viện như [fzaninotto/Faker](https://github.com/fzaninotto/Faker)  chúng ta có thể tạo ra rất nhiều dữ liệu giả có ý nghĩa.

Thư viện  [fzaninotto/Faker](https://github.com/fzaninotto/Faker)có sẵn trên packagist để chúng ta có thể cài đặt nó thông qua composer. Bạn không cần phải cài đặt gói này nếu bạn đang sử dụng laravel 5 trở lên.

```

composer require fzaninotto/faker --dev

```
Sau khi cài đặt  `faker`  , ta có thể sử dụng class `seeder` của mình để tạo nhiều dữ liệu mà ta mong muốn.  Trong phương thức  `run`của lớp  `UserTableSeeder`  hoặc các class khác bằng cách tạo thêm thông qua command:

```
php artisan make:seeder ArticleTableSeeder
```
Example:
```php
public function run() {
    $faker = Faker\Factory::create();

    for($i = 0; $i < 1000; $i++) {
        App\User::create([
            'username' => $faker->userName,
            'name' => $faker->name,
            'email' => $faker->email
        ]);
    }
}
```

Với đoạn trích trên, chúng ta có thể tạo ra một nghìn User mà không phải trải qua nhiều bước thủ công

Mặc dù phương pháp này giúp chúng ta tiết kiệm rất nhiều thời gian và công sức, nhưng nó không phải là giải pháp hiệu quả nhất hiện có.  Khi bạn muốn tạo dữ liệu giả để test,  bạn phải copy code này và dán nó vào class test của mình.  Phương pháp này không thể duy trì được vì bây giờ bạn đã copy, khi thay đổi schema sẽ là một cơn ác mộng :))

# Model Factory

Model Factory cho phép chúng ta xác định một mẫu được sử dụng trong việc tạo dữ liệu giả.  Một thời gian trước, Jeffrey Way of  [Laracasts](https://laracasts.com/)  đã tạo ra một gói có tên  [TestDummy](https://github.com/laracasts/TestDummy)  .  [TestDummy](https://github.com/laracasts/TestDummy)  cho phép các nhà phát triển xác định một pattern để tạo dữ liệu giả mạo.  Model Factory đã trở thành một phần trong các tính năng của Laravel kể từ Laravel 5.

Để sử dụng factory, trước tiên chúng ta phải define chúng.  Trong  `database/factories/ModelFactory.php`  chúng ta có thể tạo một factory ở đó.Laravel cung cấp một đối tượng global của  `$factory`  mà chúng ta có thể mở rộng để define các factory của mình

```php

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
         'username' => $faker->userName,
        'email' => $faker->email,
        'name' => $faker->name
    ];
});

```
Như bạn có thể thấy, phương thức  `define`  được gọi trên đối tượng  `$factory`  có hai tham số.  Cái đầu tiên là một định danh (model FQN), được sử dụng để tham chiếu factory sau này.  Tham số thứ hai là một closure `Faker\Generator`  và trả về một mảng  `users`  .

# Using the Factory

```php
// create a user and save them to the database
$user = factory(App\User::class)->create();
```
Câu lệnh này tạo ra một user duy nhất.  Để tạo nhiều user - ta chỉ cần truyền tham số thứ hai cho hàm  `factory`  .

```php
// create 1000 users with just one line
$users = factory(App\User::class, 1000)->create();
```

# Overriding Attributes

Nếu bạn muốn ghi đè một số giá trị mặc định của modal của mình, bạn có thể chuyển một mảng các giá trị cho phương thức  `create`  .  Chỉ các giá trị được chỉ định sẽ thay đổi - trong khi phần còn lại của các giá trị vẫn được đặt thành giá trị mặc định của chúng như được chỉ định bởi factory.

```php
$user = factory(App\User::class)->create([
    'username' => 'pizzamuncher'
]);
```

# Factory make 
Đôi khi chúng ta có thể không muốn lưu dữ liệu được tạo vào cơ sở dữ liệu.  Cho rằng chúng tôi sử dụng phương thức  `make`  trên đối tượng  `factory`thay vì  `create`  .

```php
$user = factory(App\User::class)->make();
```

Giống như chúng ta đã làm với phương thức  `create`  , chúng ta cũng có thể ghi đè lên các thuộc tính của  method `make`  .  Nó hoạt động trên cùng một nguyên tắc như phương thức  `create`  .
```php
$user = factory(App\User::class)->make([
    'username' => 'pitzanotpizza'
]);
```

# Multiple Factory Types

Một model có thể có nhiều loại khác nhau;  chúng ta có thể cấu hình một model factory để sử dụng nhiều loại.  Ví dụ: chúng ta muốn một số user trở thành admin, chúng ta có thể tạo một factory với  `$factory->defineAs()`  có ba tham số.  Tham số đầu tiên là base model, tham số thứ hai là Type và tham số thứ ba là một closure.

```php
$factory->defineAs(App\User::class, 'admin', function (Faker\Generator $faker) {
    return [
         'username' => $faker->userName,
        'email' => $faker->email,
        'name' => $faker->name,
        'admin' => true
    ];
});
```

Hoặc nếu bạn muốn mở rộng một factory base model, bạn có thể làm điều này:

```php
$factory->defineAs(App\User::class, 'admin', function ($faker) use ($factory) {
    $post = $factory->raw('App\User');

    return array_merge($post, ['admin' => true]);
});
```

Để sử dụng factory được tạo bằng phương thức  `defineAs`  , chúng ta có thể thay đổi đối số thứ hai thành  `factory`  từ số lượng bài đăng sang số nhận dạng nhà máy mới.

```php
factory(App\User::class, 'admin')->create();
```

Nếu bạn muốn tạo người dùng quản trị, bạn có thể chuyển tham số thứ ba cho chức năng của nhà máy.

```php
factory(App\User::class, 'admin', 10)->create();
```
# Sumary
Nguồn: https://scotch.io/tutorials/generate-dummy-laravel-data-with-model-factories#toc-overriding-attributes