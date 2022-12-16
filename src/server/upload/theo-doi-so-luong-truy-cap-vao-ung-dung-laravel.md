Mình xin giới thiệu một package khá hay, Laravel Visits là một package giúp bạn theo dõi số lượng truy cập vào ứng dụng, bao gồm một số chức năng:
* Một Model có thể được theo dõi lượt truy cập theo nhiều kiểu (sử dụng tag)
* Có thể sử dụng với mọi Model (một số package chỉ cho phép model User)
* Ghi lại theo khách truy cập bằng cách sử dụng IP người dùng, tránh việc ghi trùng lặp nếu người đó đã xem rồi
* Get Model có lượt visit nhiều nhất/ít nhất
* Get quốc gia có lượt visit nhiều nhất
* Get visit theo từng giai đoạn như theo tháng hay năm của từng Model

## Cài đặt

```
composer require awssat/laravel-visits
```

Nếu bạn đang sử dụng phiên bản Laravel < 5.5 thì nhớ đăng ký `awssat\Visits\VisitsServiceProvider::class` vào `config/app.php`, Laravel 5.5+ thì không cần.

Publish file config của package sử dụng command:
```
php artisan vendor:publish --provider="awssat\Visits\VisitsServiceProvider"
```

Package này sử dụng redis để lưu dữ liệu. Mặc định package không sử dụng cấu hình redis mặc định của Laravel, tạo mới một connection khác trong `config/database.php` để sử dụng cho `laravel-visits` phòng tránh việc mất mát dữ liệu:

```php

        'laravel-visits' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 3, // anything from 1 to 15, except 0 (or what is set in default)
        ],
```

Và thay đổi redis connection trong `config/visits.php`:

```php
'connection' => 'laravel-visits'
```

## Sử dụng
Rất đơn giản sử dụng helper `visits`:

```php
visits($model)->{method}()
```

Trong đó:
* `$model`: là Eloquent model bất kỳ trong project của bạn
* `{method}`: là method bất kỳ được hổ trợ bởi 'laravel-visits', sẽ được giới thiệu dưới đây

**Tags:**
Bạn có thể theo dõi nhiều kiểu truy cập của cùng một model bằng cách sử dụng tag:

`visits($model, 'tag1')->increment()`

### Increments và Decrements

Tăng 1 lượt truy cập:

```php
visits($post)->increment();
```

Tăng nhiều hơn 1:

```php
visits($post)->increment(10);
```

Giảm 1 lượt truy cập:

```php
visits($post)->decrement();
```

Giảm nhiều hơn 1:

```php
visits($post)->decrement(10);
```

Chỉ tăng hoặc giảm lượt truy cập mỗi x giây (dựa vào IP người truy cập)

```php
visits($post)->seconds(30)->increment()
```

* Việc này sẽ ghi đè cấu hình mặc định của package (mỗi 15phút 1 lần cho 1 IP)

Force increment/decrement:

```php
visits($post)->forceIncrement();
visits($post)->forceDecrement();
```

Việc này sẽ tăng hoặc giảm ngay lập tức mà ko cần kiểm tra IP.

### Getting data

Đếm tất cả lượt truy cập của `$post`:

```php
 $post = Post::find(1);
 
visits($post)->count();
```

Đếm số lượt truy cập theo chu kỳ:

```php
$post = Post::find(1);

visits($post)->period('day')->count();
```

#### Đếm lượt truy cập theo Model class

Tất cả lượt truy cập của 1 Model:

```php
// Đếm lượt truy cập vào tất cả các post
visits('App\Post')->count()
```

Theo chu kỳ:

```php
visits('App\Post')->period('day')->count()
```

#### Quốc gia của khách truy cập

```php
visits($post)->countries()
```

#### Nguồn của khách truy cập

```php
visits($post)->refs()
```

#### Top 10 post được truy cập nhiều nhất

```php
visits('App\Post')->top(10)
```

Hoặc ít nhất:

```php
visits('App\Post')->low(10)
```

##### Lấy dữ liệu mới nhất (không cache)

```php
visits('App\Post')->fresh()->top(10)
```

Cũng có thể luôn lấy dữ liệu mới nhất (không cache) bằng cách setting `'always_fresh' => true` trong file config.

##### Lấy dữ liệu theo chu kỳ

```php
visits('App\Post')->period('month')->top(10)
```

#### Reset và xóa dữ liệu

Xóa lượt truy cập của 1 post:

```php
visits($post)->reset();
```

Xóa theo chu kỳ:

```php
visits($post)->period('year')->reset()
```

Xóa dữ liệu theo IP:

```php
visits($post)->reset('ips');
visits($post)->reset('ips', '127.0.0.1');
```

Ngoài ra:

```php
// Xóa lượt truy cập của Model
visits('App\Post')->reset();

// XÓa cache của list thấp nhất/cao nhất của Model
visits('App\Post')->reset('lists');

// Xóa dữ liệu theo chu kỳ của Mode
visits('App\Post')->period('year')->reset() 

//...?
visits('App\Post')->reset('factory')
```

### Tích hợp vào Eloquent

Chúng ta có thể thêm một method `visits` vào trong model class:

```php
    public function visits()
    {
        return visits($this);
    }
```

Và sau đó sử  dụng, tiện hơn:

```php
    $post = Post::find(1);
    $post->visits()->increment();
    $post->visits()->count();
```

Một package khá tiện cho việc theo dõi số lượt truy cập trong Laravel phải không nào. Happy coding! :smile:

Tham khảo:
* [Count Models With the Laravel Visits Package](https://laravel-news.com/laravel-visits-package)
* [Github](https://github.com/awssat/laravel-visits)