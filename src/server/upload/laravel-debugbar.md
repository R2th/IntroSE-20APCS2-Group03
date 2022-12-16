## **1. Giới thiệu**

Một vấn đề thường xuyên gặp đối với lập trình viên đó là việc gặp bug và fix bug. Riêng việc fix bug thì tất nhiên chẳng bao giờ dễ dàng chút nào và debug là phương án tốt nhất để giúp bạn kiểm tra và fix những lỗi trong code của bạn. Hôm nay, mình xin giới thiệu với các bạn công cụ debug là [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar), một công cụ debug hiệu quả và tiện lợi.

[Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) là một package được xây dựng bởi [Barry vd. Heuvel](https://laravel-news.com/artisan-files-barry-vd-heuvel), cho phép bạn debug nhanh chóng và dễ dàng ngay trong khi đang bật cửa sổ duyệt web. Sau khi cài đặt [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar), vào mỗi trang web ta sẽ thấy có một thanh công cụ ở phía dưới cùng, nó chứa rất nhiều các thông tin hữu ích cho việc kiểm tra lỗi ứng dụng.

Laravel Debugbar đã được update cho Laravel 5 với các tính năng nổi bật như: 

   * QueryCollection: Hiện tất cả những câu truy vấn đến database
   * RouteCollector: Hiện những thông tin của route hiện tại
   * ViewCollector: Hiện những view được tải lên trong lúc đó
   * EventsCollector: Hiện tất cả những sự kiện
   * LaravelCollector: Cho ta biết version của Laravel và môi trường phát triển ứng dụng
   * ConfigCollector: Hiện những giá trị từ file config

## **2. Cài đặt Laravel Debugbar**
Ta có thể cài đặt [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) vào project Laravel thông qua composer:
```shell
composer require barryvdh/laravel-debugbar --dev
```
Tiếp theo mở file config/app.php trong mảng providers thêm:
```sql
Barryvdh\Debugbar\ServiceProvider::class,
```
Tiếp theo nếu muốn thêm Facade, trong mảng aliases thêm:
```php
'Debugbar' => Barryvdh\Debugbar\Facades\Debugbar::class,
```
Public file config bằng lệnh:
```objectivec
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
```
Như vậy là đã xong bước cài đặt, giờ mỗi khi bạn chạy project trong chế độ debug, thanh debug sẽ được tự động load và hiển thị các thông số về trang bạn đang xem.
## **3. Tìm hiểu về Debugbar**
   Sau khi cài đặt thành công, ta đã có thể sử dụng tất cả các tính năng mặc định của DebugBar:
### Messages
   Một tab đặc biệt, nó chỉ được load khi bạn gọi Facade Debugbar ở trong code của bạn.
```javascript
Debugbar::info($object);
Debugbar::error('Error!');
Debugbar::warning('Watch out…');
Debugbar::addMessage('Another message', 'mylabel');
```
![image.png](https://images.viblo.asia/9b1ffb6a-a0ad-44cc-8ba9-2456e34e774b.png)
### Timeline
   Công cụ hoàn hảo giúp ta sửa chữa những đoạn code chạy chậm, tốn nhiều thời gian xử lý
```cpp
Debugbar::startMeasure('render','Time for rendering');
Debugbar::stopMeasure('render');
Debugbar::addMeasure('now', LARAVEL_START, microtime(true));
Debugbar::measure('My long operation', function() {
// Do something…
});
```
![image.png](https://images.viblo.asia/064aeb05-d9dc-4639-ad60-a11b2698b98b.png)
### Exceptions
   Một tab lưu các log exception. Bạn có thể log lại một exception vào debugbar bằng cách sử dụng đoạn code giống như sau:
```javascript
try {
    throw new Exception('foobar');
} catch (Exception $e) {
    Debugbar::addException($e);
}    
```
![image.png](https://images.viblo.asia/74489ced-7a1f-479b-a0da-571bb5b43b4d.png)
### Views
   Tab sẽ hiển thị tất cả những gì mà template render cũng như tất cả các tham số được truyền vào chúng. Nó thực sự tiện dụng cho việc phát triển ứng dụng. Với view, ta có thể chắc chắn những gì ta truyền sang có chính xác là những gì template đang cần. Ngoài ra view còn nhiều trường hợp khác sử dụng
![image.png](https://images.viblo.asia/e40c41b3-815c-4d30-8432-3c37ba447c06.png) 
### Route
   Bạn có thể xem mọi thứ liên quan đến route đã được gọi, từ URI, middleware, controller, namespace, đến đường dẫn file. Điều này giúp bạn kiểm tra dễ dàng hơn đường đi của một request.
![image.png](https://images.viblo.asia/3e775cfb-c9b4-490d-b2f0-fd001328ab47.png)
### Queries
   Các câu truy vấn là một trong những phần quan trọng của một ứng dụng web. Tab Queries sẽ hiển thị cho bạn tất cả các câu truy vấn đã được dùng để hiển thị nên trang web bạn đang xem. Điều này giúp bạn có cái nhìn trực quan hơn về những câu truy vấn bạn sử dụng và giúp bạn chỉnh sửa một cách dễ dàng hơn.
![image.png](https://images.viblo.asia/f4f64e11-1243-4857-99d8-100dd4ac7ad5.png)
### Mail và Request
   Hai tab này bao gồm các thông tin bạn cần biết về email gửi đi và các request hiện tại.
## **4. Tổng kết**
Trong bài này mình chỉ ra các tính năng cơ bản mà Laravel Debugbar mang lại. Bạn có thể tự trải nghiệm và khám phá thêm các tính năng của Laravel Debugbar. Ngoài ra, nếu bạn muốn tìm hiểu kĩ hơn, bạn có thể truy cập [trang docs](http://phpdebugbar.com/docs/) của Laravel Debugbar.