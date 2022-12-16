Đến cuối cùng thì, Sail chỉ là phiên bản tối giản của Docker. Và bạn có thể tự do chỉnh sửa gần như mọi thứ. Ở bài này, mình sẽ cố gắng cài cắm [Laravel Mongodb](https://github.com/jenssegers/laravel-mongodb) vào project của chúng ta và sử dụng nhé.

# Chỉnh sửa Dockerfile
Để lấy được file config Docker của Sail, các bạn cần gõ command
  ```bash
  php artisan sail:publish
```
Lúc này một folder `docker` đã xuất hiện thêm trong project của chúng ta

![](https://images.viblo.asia/b55af39e-6a81-47b5-b51f-6c56a8d2b08c.png)

Ở đât các bạn sẽ thấy có 2 directory là `7.4` và `8.0` đại diện cho 2 phiên bản php mà Sail cho sẵn chúng ta xài, và mặc định đang xài bản 8.0 nha. Bây giờ chúng ta sẽ cố gắng cái php mongodb extension. 
Các bạn mở file `docker/8.0/Dockerfile`, tại đây đã sẽ có script hình thành nên container cho chúng ta. Tìm xuống phía dưới đoạn `RUN apt-get update...`, đoạn này rất dài, chúng ta xuống phía dưới nó và thêm dòng dưới đây vào

```Docker
RUN pecl install mongodb && echo "extension=mongodb.so" > /etc/php/8.0/cli/php.ini
```

file của chúng ta sẽ có dạng như này

![](https://images.viblo.asia/72ad22af-7797-4882-a8ef-91c95a2bf6b1.png)


Rồi bây giờ cần build lại docker bằng command
```
sail build --no-cache
```

Quá trình này có thể diễn ra từ vài chục phút tới vài phút :sweat_smile:

# Cài đặt và sử dụng Laravel Mongodb
Sau khi thêm thành công php mongodb extension, việc cài đặt package https://github.com/jenssegers/laravel-mongodb hẳn sẽ không gây ra lỗ lầm gì
```
sail composer require jenssegers/mongodb
```

Tiếp theo chúng ta sẽ khởi tạo services mongodb bằng Takeout
```
 takeout enable mongo --default
 ```
 
 Như [bài trước](https://viblo.asia/p/su-dung-tighten-takeout-de-quan-ly-tai-nguyen-khi-ra-khoi-tren-laravel-sail-bJzKmaJrK9N) thì chúng ta đã biết tích hợp Takeout với Sail, thời điểm này mình sẽ lấy alias của services mongo, chính là `mongo` luôn, nhét vào `DB_HOST` trong `.env`. Còn với `DB_CONNECTION` thì cái này thuộc settings mongo, mình ko đi sâu vào phân tích vì ngoài phạm trù bài viết, mà chỉ đưa ra config của mình để đảm bảo nó sẽ hoạt động
 
 Mặc định thì Takeout sẽ đưa chúng ta username và password của root mongo lần lượt là `admin` và `password`. Mình sẽ đăng nhập vào CLI admin mongo và tạo user mới bằng câu lệnh
 
```
mongo -u admin -ppassword --authenticationDatabase admin

use example_app

db.createUser(
    {
         user: "example_user",
         pwd: "example_user",
         roles: [ { role: "dbOwner", db: "example_app" } ],
         mechanisms:[  
               "SCRAM-SHA-1"
         ]
    }
)
```
 
 
 Trong `config/database.php`, tìm tới index `connections`, tại đây là nơi khai báo các thiết lập của database, mình sẽ thêm thiết lập cho mongo của chúng ta
 ```php
 'mongodb' => [
    'driver' => 'mongodb',
    'host' => env('DB_HOST'),
    'port' => env('DB_PORT'),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
    'options' => [
        'database' => env('DB_DATABASE'), // required with Mongo 3+
    ],
],
```
Chúng ta đã có connection cho mongo rồi, giờ chỉ việc fill vào `.env` thôi
```
DB_CONNECTION=mongodb
DB_HOST=mongo
DB_PORT=27017
DB_DATABASE=example_app
DB_USERNAME=example_user
DB_PASSWORD=example_user
```

# Chạy thử
Để đảm bảo mọi thứ hoạt động thì mình sẽ tạo 1 model Product 
```
sail artisan make:model Product
```

Bên trong `app/Models/Product.php` thì setup nó sử dụng connection mongo
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];
}
```

Cuối cùng mở tinker lên tạo thử 1 product xem nào 
```bash
sail tinker

App\Models\Product::create(['name' => 'Example App'])
```

![](https://images.viblo.asia/41a1f4c2-7eca-4d2f-9e23-0bcc2b1c2659.png)

# Kết
Đây hẳn sẽ là bài viết cuối cùng của series này :grin: Thật ra lượng kiến thức truyền tải của bài này không phải quá nhiều, phần lớn là biểu diễn một case khả năng cao sẽ gặp cho các bạn làm ví dụ thôi :laughing::laughing: Hi vọng bài viết và cả series này đã giúp ích cho các bạn! Hẹn gặp lại vào lần tới nhé :sunglasses::sunglasses: