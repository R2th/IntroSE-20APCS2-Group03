Một vấn đề thường xuyên gặp đối với lập trình viên  đó là việc gặp bug và fix bug. Riêng việc fix bug thì tất nhiên chẳng bao giờ dễ chịu chút nào, và debug là phương án tốt nhất để giúp bạn kiểm tra và fix những lỗi trong code của bạn. Hôm nay mình xin giới thiệu với các bạn công cụ debug Laravel Debugbar, một công cụ debug hiệu quả và tiện lợi. 
<br>
<br>
Laravel Debugbar là một package được xây dựng bởi [Barry vd. Heuvel](https://laravel-news.com/artisan-files-barry-vd-heuvel), cho phép bạn debug nhanh chóng và dễ dàng ngay trong khi đang bật cửa sổ duyệt web. Là một công cụ debug mạnh mẽ và dễ cài đặt, [Debugbar package](https://github.com/barryvdh/laravel-debugbar) là một trong những package quan trọng dành cho Laravel.
<br>
<br>
Laravel Debugbar đã được update cho Laravel 5, sau đây mình sẽ giới thiệu các tính năng tuyệt vời mà Laravel Debugbar mang lại cho bạn.
# Cài đặt Laravel Debugbar
Bước cài đặt cực kì đơn giản, bạn chỉ cần chờ đợi dưới 3 phút, và 2 trong số đó chỉ để đợi composer. Sau đây là các bước cài đặt và setup Laravel Debugbar.
<br>
<br>
Trong project Laravel của bạn, dùng lệnh require package sau:
```php
composer require barryvdh/laravel-debugbar
```
<br>
Tiếp theo mở 'config/app.php' và thêm đoạn code sau vào trong mảng 'providers':

```php
'Barryvdh\Debugbar\ServiceProvider',
```
<br>
Cuối cùng, thêm đoạn code sau vào mảng 'aliases':

```php
'Debugbar' => 'Barryvdh\Debugbar\Facade',
```
<br>
Như vậy là đã xong bước cài đặt, giờ mỗi khi bạn chạy project trong chế độ debug, thanh debug sẽ được tự động load và hiển thị các thông số về trang bạn đang xem.

# Tìm hiểu về Debugbar
Sau khi hoàn thành bước cài đặt và hiển thị thành công thanh debug, giờ là lúc xem qua các tính năng của Laravel Debugbar.
### Messages
![](https://images.viblo.asia/da5d8f19-1998-4b0d-bc60-7f09db4bb0d0.png)

Messages là một tab đặc biệt, nó chỉ được load khi bạn gọi facade Debugbar ở trong code của bạn.
<br>
Ví dụ: thêm đoạn code php sau vào trang của bạn
```php
Debugbar::info($object);
Debugbar::error('Error!');
Debugbar::warning('Watch out…');
Debugbar::addMessage('Another message', 'mylabel');
```
### Timeline
![](https://images.viblo.asia/a6a1a918-84e5-4f11-bac0-520a1ec386b7.png)

Tab Timeline có tác dụng giúp bạn kiểm tra và sửa những thứ làm chậm code của bạn. Dưới đây là một số ví dụ:
```php
Debugbar::startMeasure('render','Time for rendering');
Debugbar::stopMeasure('render');
Debugbar::addMeasure('now', LARAVEL_START, microtime(true));
Debugbar::measure('My long operation', function() {
    // Do something…
});
```
### Exceptions
![](https://images.viblo.asia/fedc2833-01d9-4d8a-a8b8-e250d160ca70.png)

Tab tiếp theo là một tab lưu các log exception. Bạn có thể log lại một exception vào debugbar bằng cách sử dụng đoạn code giống như sau:
```php
try {
    throw new Exception('foobar');
} catch (Exception $e) {
    Debugbar::addException($e);
}
```

### Views
![](https://images.viblo.asia/8254cff4-9d7a-41c0-bd04-36c122ec2ffd.png)

Tab View sẽ hiển thị cho các bạn tất cả các file view đã được render cũng như tất cả các tham số được truyền vào chúng. Điều này thực sự tiện dụng khi trang web của bạn lớn hơn và bạn có một số lượng nhiều các view. Với tab view, bạn có thể chắc chắn bạn chỉ gửi những dữ liệu mà một view thực sự cần.
### Route
![](https://images.viblo.asia/0b2cbe46-42fc-4dfa-b388-d784f075ac5d.png)

Bạn có thể xem mọi thứ liên quan đến route đã được gọi, từ URI, middleware, controller, namespace, đến đường dẫn file. Điều này giúp bạn kiểm tra dễ dàng hơn đường đi của một request.

### Queries
![](https://images.viblo.asia/5fa29208-c21b-4639-8122-42901f27a0db.png)

Các câu truy vấn là một trong những phần quan trọng của một ứng dụng web. Tab Queries sẽ hiển thị cho bạn tất cả các câu truy vấn đã được dùng để hiển thị nên trang web bạn đang xem. Điều này giúp bạn có cái nhìn trực quan hơn về những câu truy vấn bạn sử dụng và giúp bạn chỉnh sửa một cách dễ dàng hơn.

### Mail và Request
Hai tab này bao gồm các thông tin bạn cần biết về email gửi đi và các request hiện tại.

### Nút Folder
![](https://images.viblo.asia/b6570734-6564-4f99-97d9-06ac389eb208.png)

Mình không chắc tên gọi thật của nút này là gì, nhưng khi ấn vào icon folder ở gần sát bên phải, bạn sẽ thấy tất cả các request đã được gửi trước đó. Điều này rất tuyệt khi sử dụng ajax vì bạn có thể kiểm tra xem request của bạn có thực hiện đúng hay không.

### Tổng kết
Trong bài này mình chỉ chỉ ra các tính năng cơ bản mà Laravel Debugbar mang lại. Bạn có thể tự trải nghiệm và khám phá thêm các tính năng của Laravel Debugbar. Ngoài ra, nếu bạn muốn tìm hiểu kĩ hơn, bạn có thể truy cập trang docs của Laravel Debugbar [tại đây](http://phpdebugbar.com/docs/).