# Giới thiệu qua về Laravel Telescope
Laravel Telescopes là một package hỗ trợ người dùng debug với giao diện thân thiện, dễ sử dụng. Bạn có thể debug requests, exceptions, databases, cache và nhiều thứ khác bằng cách truy cập vào một route cụ thể trên môi trường local của máy tính bạn
# Cài đặt Laravel Telescope
Chúng ta chạy lênh:
```markdown
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```
Sau khi migrate xong chúng ta vào file config/app.php thêm dòng sau vào phần providers
```rust
App\Providers\TelescopeServiceProvider::class,
```
Và chúng ta sẽ use nó trong app/Providers/AppServiceProvider.php
```rust
use App\Providers\TelescopeServiceProvider;
```
Trong hàm register() chúng ta sẽ thêm nội dung sau:
```cpp
if ($this->app->isLocal()) {
$this->app->register(TelescopeServiceProvider::class);
}
```
Trong trường hợp bạn muốn chỉ định user nào mới có thể vào được telescope dashboard thì chúng ta sẽ thêm vào phương thức gate() của app/Providers/TelescopeServiceProvider.php như sau:
```javascript
protected function gate()
{
Gate::define('viewTelescope', function ($user) {
return in_array($user->email, [
'user@email.com',
]);
});
}
```
Bạn cũng có thể chỉ định người dùng theo id:
```ruby
return in_array($user->id, [
1, 2, 3,
]);
```
# Request
Đây là trang mặc định khi vào telescope dashboard,để vào được trang này bạn chỉ cần thêm /telescope vào sau url trang chủ là được.Trang hiển thị tất cả các yêu cầu http, đường dẫn của yêu cầu, mã trạng thái http, thời lượng và thời gian của yêu cầu. Bạn có thể mở rộng chi tiết theo bất kỳ yêu cầu nào bằng cách nhấp vào biểu tượng con mắt.
![image.png](https://images.viblo.asia/bc984566-2437-4355-a489-c273613bbc91.png)
![image.png](https://images.viblo.asia/1ed42f84-3618-406c-aec2-061fdf4c1711.png)
# Exceptions
Ở đây các bạn có thể thấy các exception được server trả ra
![image.png](https://images.viblo.asia/c9dc5dee-e10e-4d2c-8e5f-bef8faa6a6b7.png)
![image.png](https://images.viblo.asia/8abff1bc-33a1-497b-9e4e-6cdcf6da6dc2.png)
# Logs
Bạn có thể xem log của ứng dụng mình tại đây
![image.png](https://images.viblo.asia/a64352ca-ff7d-44c6-994b-da24a80131e2.png)
# Dumps
Bạn có thể xem dump ở đây. Điều này hữu ích để giữ cho chế độ xem của bạn gọn gàng trong khi vẫn có quyền truy cập vào thông tin gỡ lỗi quan trọng đó. Bạn có thể nhấp vào yêu cầu để biết thêm thông tin nếu cần.
![image.png](https://images.viblo.asia/fa8cfe02-f229-46c9-a3e3-08c47f9bb51b.png)
# Queries
Một chức năng cực kỳ hữu ích nếu bạn muốn tối ưu ứng dụng hay là trang web của mình. Chức năng này liệt kê tất cả các query và thời gian để thực hiện chúng. Từ đó bạn có thể tối ưu chúng hay là biết được các query nào thừa
![image.png](https://images.viblo.asia/d5b5b9e4-0656-46c8-b60b-2b2d2239f0e0.png)
![image.png](https://images.viblo.asia/3145f447-3f2b-445a-95f7-15787aef63a4.png)
# Tạm kết
Laravel Telescope là một công cụ có giao diện thân thiện,dễ sử dụng phù hợp trong việc debug ứng dụng.Trên đây mình mới chỉ liệt kê một vài phần của laravel telescope để tìm hiểu kỹ hơn bạn có thể xem tại:https://laravel.com/docs/9.x/telescope#main-content. Cuối cùng cảm ơn các bạn đã đọc bài viết hi vọng nó giúp ích được cho các bạn.