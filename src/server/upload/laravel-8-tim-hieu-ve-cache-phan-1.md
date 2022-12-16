> Phần 2: https://viblo.asia/p/tim-hieu-ve-cache-trong-laravel-8-phan-2-GrLZDRQ25k0

# Giới thiệu
Một số tác vụ truy xuất hoặc xử lý dữ liệu của ứng dụng có thể tốn nhiều CPU hoặc mất vài giây để hoàn thành. Khi trường hợp này xảy ra, thông thường dữ liệu đã truy xuất được lưu vào bộ nhớ cache  trong một thời gian để có thể truy xuất nhanh trong các yêu cầu tiếp theo đối với cùng một dữ liệu. Bộ nhớ Cache đóng một vai trò quan trọng trong việc tối ưu hóa hiệu suất của các ứng dụng web.


Trong Laravel 8 có cung cấp một API hợp nhất cho các phần phụ trợ bộ nhớ cache khác nhau, cho phép bạn tận dụng khả năng truy xuất dữ liệu nhanh như chớp của chúng và tăng tốc ứng dụng web của bạn.

# Cấu hình
Bạn có thể tìm thấy cấu hình cho Laravel cache trong tệp config/cache.php. Bên trong tệp, bạn có thể chỉ định cache driver nào bạn muốn sử dụng mặc định. Một số loại Laravel cache driver phổ biến là:
1. Memcached
2. Redis
3. Database
4. Array


Để thay đổi cache driver, bạn chỉ cần mở file .env và sửa Cache_Driver = file.
## Yêu cầu của driver
Đối với các loại driver khác nhau, bạn sẽ cần hoàn thành một số yêu cầu để có thể sử dụng chúng, xem thêm tại https://laravel.com/docs/8.x/cache#driver-prerequisites

# Cách sử dụng cache
Để làm việc với bộ nhớ cache, bạn có thể sử dụng Cache facade hoặc là cache() helper function.
## Cache facade
Cache facade cung cấp quyền truy cập thuận tiện, ngắn gọn với Laravel cache contracts:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Show a list of all users of the application.
     *
     * @return Response
     */
    public function index()
    {
        $value = Cache::get('key');

        //
    }
}
```

Khi sử dụng Cache facade, bạn có thể truy cập các kho lưu trữ bộ nhớ cache khác nhau thông qua phương thức ```store```. Khóa được chuyển cho phương thức ```store``` phải tương ứng với một phần tử trong mảng stores trong tệp cấu hình cache của bạn:
```php
$value = Cache::store('file')->get('foo');

Cache::store('redis')->put('bar', 'baz', 600); // 10 Minutes
```

## Cache Helper
Ngoài việc sử dụng Cache facade, bạn cũng có thể sử dụng hàm toàn cục cache() để truy xuất và lưu trữ dữ liệu qua cache. Khi hàm cache() được gọi, nó sẽ trả về giá trị của khóa được truyền vào tham số:
```php
$value = cache('key');
```
Nếu bạn cung cấp một mảng các cặp key / value và thời gian expiration cho hàm, nó sẽ lưu trữ các giá trị trong bộ nhớ cache trong khoảng thời gian được chỉ định:
```php
cache(['key' => 'value'], $seconds);
cache(['key' => 'value'], now()->addMinutes(10));
```
Khi hàm cache được gọi mà không có bất kỳ tham số nào, nó sẽ trả về một thể hiện của Illuminate\Contracts\Cache\Factory, cho phép bạn gọi các phương thức caching khác:
```php
cache()->remember('users', $seconds, function () {
    return DB::table('users')->get();
});
```
Khi kiểm tra lệnh gọi hàm toàn cục cache(), bạn có thể sử dụng phương thức ```Cache::shouldReceive``` giống như khi bạn kiểm tra facade.

## Truy xuất phần tử trong cache
Để thao tác với bộ nhớ cache, Cache facade cung cấp cho bạn một số phương thức sau:
### get()
phương thức ```get``` được sử dụng để lấy các phần tử từ cache. Nếu phần tử không tồn tại trong bộ nhớ cache sẽ trả về ```null```. Bạn có thể chuyển tham số thứ hai cho phương thức ```get``` chỉ định giá trị mặc định mà bạn muốn được trả về nếu phần tử không tồn tại:
```php
$value = Cache::get('key');

$value = Cache::get('key', 'default');
```
Bạn cũng có thể truyền vào một closure làm giá trị mặc định. Kết quả của closure sẽ được trả về nếu phần tử được chỉ định không tồn tại trong cache. Truyền vào một cache cho phép bạn trì hoãn việc truy xuất các giá trị mặc định từ cơ sở dữ liệu hoặc dịch vụ bên ngoài khác:
```php
$value = Cache::get('key', function () {
    return DB::table(...)->get();
});
```
### put()
Bạn có thể sử dụng phương thức put để lưu trữ các phần tử trong bộ nhớ cache:
```php
Cache::put('key', 'value', $seconds = 10);
```
Nếu thời gian lưu trữ không được truyền vào phương thức put, phần tử sẽ được lưu trữ vô thời hạn:
```php
Cache::put('key', 'value');
```
Thay vì truyền số giây, bạn cũng có thể truyền một biến DateTime đại diện cho thời gian hết hạn của phần tử trong bộ nhớ cache:
```php
Cache::put('key', 'value', now()->addMinutes(10));
```
Bạn cũng có thể xóa các phần tử bằng cách truyền vào số giây hết hạn bằng 0 hoặc âm:
```php
Cache::put('key', 'value', 0);
Cache::put('key', 'value', -5);
```
### add()
Phương thức add sẽ chỉ thêm phần tử vào bộ nhớ cache nếu nó chưa tồn tại trong cache. Phương thức sẽ trả về true nếu phần tử thực sự được thêm vào bộ đệm. Nếu không, phương thức sẽ trả về false. Phương thức add là một atomic operation:
```php
Cache::add('key', 'value', $seconds);
```
### forever()
Phương thức forever() được sử dụng để lưu trữ vĩnh viễn một phần tử trong bộ nhớ cache. Vì các phần tử này sẽ không hết hạn, chúng phải được xóa thủ công khỏi bộ nhớ cache bằng phương thức forget():
```php
Cache::forever('key', 'value');
```
Nếu bạn đang sử dụng driver Memcached, các phần tử được lưu trữ "vĩnh viễn" có thể bị xóa khi kích thước bộ nhớ cache đạt đến giới hạn.
### has()
Phương thức ```has``` được sử dụng để xác định xem một phần tử có tồn tại trong bộ nhớ cache hay không. Phương thức này cũng sẽ trả về false nếu phần tử tồn tại nhưng giá trị của nó là null:
```php
if (Cache::has('key')) {
    //
}
```
### increment() và decrement()
Các phương thức increment() và decrement() được sử dụng để điều chỉnh giá trị của các phần tử kiểu integer trong bộ nhớ cache. Cả hai phương thức này đều chấp nhận tham số thứ hai tùy chọn cho biết số lượng để tăng hoặc giảm giá trị của phần tử:
```php
Cache::increment('key');
Cache::increment('key', $amount);
Cache::decrement('key');
Cache::decrement('key', $amount);
```
### remember()
Đôi khi bạn có thể muốn truy xuất một phần tử từ bộ nhớ cache, nhưng cũng lưu trữ một giá trị mặc định nếu phần tử được yêu cầu không tồn tại. Ví dụ: bạn có thể muốn truy xuất tất cả users từ cache, nếu không tồn tại trong cache thì truy xuất users từ database và thêm họ vào cache. Bạn có thể thực hiện việc này bằng phương thức remember():
```php
$value = Cache::remember('users', $seconds, function () {
    return DB::table('users')->get();
});
```
Nếu phần tử không tồn tại trong bộ đệm, thì closure được truyền vào phương thức remember sẽ được thực thi và kết quả của nó sẽ được đặt trong bộ đệm.
### rememberForever()
Bạn có thể sử dụng phương thức memoryForever để truy xuất một phần tử từ bộ nhớ cache hoặc lưu trữ nó mãi mãi nếu nó không tồn tại:
```php
$value = Cache::rememberForever('users', function () {
    return DB::table('users')->get();
});
```
### pull()
Phương thức pull() được sử dụng khi cần truy xuất một phần tử từ bộ nhớ cache và sau đó xóa phần tử đó. Nếu phần tử không tồn tại trong bộ nhớ cache, hàm sẽ trả về null.
```php
$value = Cache::pull('key');
```
### forget()
dùng để xóa các phần tử khỏi bộ nhớ cache
 ```php
 Cache::forget('key');
 ```
 ### flush()
 xóa toàn bộ bộ nhớ cache
 ```php
 Cache::flush();
 ```
 Việc flush bộ nhớ cache không quan tâm đến  bộ nhớ cache đã định cấu hình trước đó của bạn và sẽ xóa tất cả các mục khỏi bộ nhớ cache. Hãy xem xét điều này cẩn thận khi xóa bộ nhớ cache được chia sẻ bởi các ứng dụng khác.
 
 
 # Tài liệu tham khảo
 Tham khảo tại https://laravel.com/docs/8.x/