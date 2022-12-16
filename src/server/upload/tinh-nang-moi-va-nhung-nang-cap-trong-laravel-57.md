![](https://images.viblo.asia/237bf5a1-ef3f-4689-9724-43d6e28130af.png)
# Giới thiệu
Laravel là một trong những PHP framework tốt nhất năm 2018. Phiên bản đầu tiên được phát hành vào tháng 6/2011 và nó đã có những cải tiến đáng kể cho đến ngày hôm nay. Laravel luôn là một đề tài hot với các lập trình viên PHP trong cộng đồng lớn của nó. Phiên bản sắp tới là laravel 5.7 sẽ yêu cầu PHP >= 7.1.3.

Sau khi phát hành Laravel 5.7, Laravel 5.6 sẽ tiếp tục fix bug cho đến ngày 7/8/2018 và sửa các lỗi bảo mật cho đến ngày 7/2/2019.

Tương tự, Laravel 5.7 sẽ nhận hỗ trợ fix bug và các lỗi bảo mật cho đến tháng 2/2019 và tháng 8/2019.

Laravel đã liên tục bổ sung các tính năng hữu ích kể từ lần phát hành đầu tiên. Phiên bản 5.7 sắp tới cũng sẽ có rất nhiều tính năng thú vị.

Các tính năng chính sẽ được phát hành sắp tới bao gồm: Laravel Nova, tùy chọn xác minh email cho thành viên đã đăng nhập, hỗ trợ cho guest (người dùng chưa đăng nhập) trong gates và policies, tích hợp Symfony dump-server, đa ngôn ngữ khi thông báo.

Chúng ta cùng tìm hiểu kỹ hơn nhé!

# Laravel Nova
![](https://images.viblo.asia/a06bd2fc-f5ae-42db-a7c8-c86b0b6f02ee.png)

Laravel Nova là một package mới trong Laravel để tạo ra một trang quản trị admin. Bạn có thể cài đặt nó trong project mới của bạn, thậm chí trong project hiện tại thông qua `composer`.

Tin tốt là nó vẫn còn hỗ trợ cho laravel 5.6. Nó sử dụng Vuejs, Vue Router và Tailwind làm giao diện.
Khi [Tailwind.css](https://tailwindcss.com/) được phát hành gần đây, nó là một framework CSS rất tiện ích. Bạn có thể tìm thêm thông tin trong [tài liệu chính thức của nó](https://tailwindcss.com/).


Laravel Nova bao gồm từ CRUD cơ bản đến tìm kiếm phức tạp, bộ lọc filters, số liệu thống kê, ...

Nếu bạn muốn tìm hiểu thêm về này, bạn có thể đọc bài viết chi tiết của Taylor Otwell trên [medium](https://medium.com/@taylorotwell/introducing-laravel-nova-7df0c9f67273) hoặc trên [document chính thức](https://nova.laravel.com/).

# Email Verification
Các bạn đã quen thuộc với hệ thống authentication mặc định của laravel. Hiện nay, Laravel đã có tùy chọn xác minh email cho người dùng.

Một cột mới `email_verified_at` đã được thêm vào bảng `users`. Bạn không cần phải tự thêm bằng tay vào, nó đã đi kèm trong `migrations` rồi. Bạn chỉ cần chạy câu lệnh: `php artisan migrate` thôi.

`User` Model cần implement MustVerifyEmail interface để đề xuất user mới xác minh địa chỉ email của họ. Vì vậy, User Model của bạn sẽ như dưới đây:

```php
<?php 
// App/User.php namespace App; 
use Illuminate\Notifications\Notifiable; 
use Illuminate\Contracts\Auth\MustVerifyEmail; 
use Illuminate\Foundation\Auth\User as Authenticatable; 
 
class User extends Authenticatable implements MustVerifyEmail 
{ 
    // ... 
}
```
Sau khi implement MustVerifyEmail interface, user mới đăng ký nhận được email có chứa liên kết xác minh để kích hoạt tài khoản. Vì vậy, khi người dùng nhấn vào liên kết, tài khoản sẽ được kích hoạt.

Cùng với việc xác minh email, Laravel 5.7 cũng cung cấp middleware giới hạn cho các email được xác minh. Vì vậy, điều này rất hữu ích và hữu ích cho các function trong backend.

```php
'email_verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
```
Để  các routes của bạn chỉ cho các email được xác minh, hãy gắn middleware trong các routes.
```php
Route::get('info', function () {
    //
})->middleware('email_verified');
```
# Guest User Gates / Policies
Guest User Gates là một tính năng hữu ích khác có trong Laravel 5.7.
Hiện tại, Laravel trả về  `false` khi người dùng cố gắng truy cập các route mà chưa được xác thực. Nhưng trong laravel 5.7, bạn có thể  ép kiểu về  mode hoặc bất cứ thứ gì hoặc đơn giản là trả về null trong các mục đích phù hợp.
```php
Gate::define('update-page', function (?Admin $admin, Page $page) {
    // ...
});
```

# Symfony Dump Server
![](https://images.viblo.asia/c51d928e-2b71-4b2b-b7de-83d9178d0699.png)

Bạn đã bao giờ nghĩ đến việc dump data ra một file HTML bên ngoài? Sắp tới, Laravel 5.7 sẽ có một tính năng tích hợp cho việc này. Bạn có thể chỉ cần làm 1 việc đơn giản là đổ dữ liệu của bạn vào file html.

Lệnh này rất tiện dụng và rất hữu ích cho việc debug mà không làm gián đoạn thời gian chạy ứng dụng.
```sh
php artisan dump-server
 
# Or send the output to an HTML file
php artisan dump-server --format=html > dump-server-test.html
```

Lệnh này chạy ngầm trên server. Nó nhận dữ liệu được gửi từ ứng dụng và hiển thị thông qua bảng điều khiển (console). Bạn không bao giờ phải lo lắng khi chạy lệnh này, vì khi lệnh này không chạy thì `dump()` hoạt động như mặc định.

Bạn có thể tìm thêm thông tin về  package này trên [github](https://github.com/beyondcode/laravel-dump-server).

# Notification Localization
Trong laravel 5.7, bạn có thể gửi thông báo khác với ngôn ngữ hiện tại. Để làm điều này, bạn cần phải chỉ định ngôn ngữ mà bạn sẽ sử dụng trong thông báo trong phương thức `locale()`. Ví dụ:
```php
$user->notify((new CreatePost($admin))->locale('jp'));
```
Hoặc cũng có thể  thông qua Notification facade:
```php
Notification::locale('jp')->send($admin, new CreatePost($user));
```
# Cải thiện thông báo lỗi
![](https://images.viblo.asia/9b11084f-162a-46d9-a6c3-fe7391dddfa6.jpg)

Bạn có thể  theo dõi các thông báo lỗi dễ dàng hơn trong laravel 5.7. Lý do là vì Laravel 5.7 sử dụng [package mới được phát triển bởi Joseph Silber](https://github.com/JosephSilber/bouncer). Nó sẽ hiển thị thông báo lỗi trên dynamic calls và Eloquent models.

Trong Laravel 5.7, bạn sẽ nhận được một thông báo ngắn gọn, rõ ràng nói rằng phương thức này không tồn tại trên mô hình. Joseph đã đề cập đến vấn đề này trên [twitter của mình](https://twitter.com/joseph_silber/status/1028768236417036288/photo/1?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1028768236417036288&ref_url=https%3A%2F%2Flaravel-news.com%2Flaravel-5-7-improved-error-messages-for-dynamic-calls).

# URL Generator and Callable Syntax
Trong Laravel 5.7, chúng ta có thể lấy url theo cú pháp mới. Lợi ích chính của cú pháp mới này là bạn có thể  điều hướng trực tiếp đến controller của nó.

```php
<?php
// PagesController is a controller
// index is a method name inside controller
 
$url = action([PagesController::class, 'show']);
```
# Thay đổi đường dẫn resources
Sẽ có một chút thay đổi trong thư mục `resources` ở Laravel 5.7. Thư mục `assets` sẽ bị xóa và thư mục `js` và `sass` sẽ không có trong `resources`.

"Khi bạn nâng cấp phiên bản Laravel, bạn không cần phải tạo lại thư mục `resources/assets` theo cấu trúc thư mục mới. Nó sẽ hoạt động theo cấu trúc cũ." - Taylor Ottwell.

# Paginator Links
Tính năng nhỏ bé này trong laravel 5.7 có thể hữu ích trong nhiều trường hợp. Tính năng này sẽ giúp kiểm soát số lượng liên kết trang được hiển thị ở mỗi bên của dấu phân cách.

Nếu bạn đã sử dụng paginations trước đó thì bạn có thể  nhận thấy sẽ có link của 3 trang theo mặc định. Nhưng, bạn có thể xác định rõ ràng trong laravel 5.7.

```php
{{ $paginator->onEachSide(4)->links() }}
```

# Filesystem Read / Write Streams
Flysystem của Laravel sẽ cung cấp các phương thức readStream và writeStream:
```php
Storage::disk('s3')->writeStream(
    'remote-file-test.zip',
    Storage::disk('local')->readStream('local-file-test.zip')
);
```
# Kết luận
Đây là những tính năng mới của Laravel 5.7 sắp tới mà mình tìm hiểu được và thấy nó sẽ rất hữu ích cho các bạn.
Mình hy vọng các bạn đã sẵn sàng đón nhận phiên bản mới của laravel 5.7.
Cảm ơn đã đọc bài viết này.
# Tham khảo
http://www.kodementor.com/the-new-features-and-upgrades-in-laravel-57/
https://laravel-news.com/laravel-5-7-improved-error-messages-for-dynamic-calls