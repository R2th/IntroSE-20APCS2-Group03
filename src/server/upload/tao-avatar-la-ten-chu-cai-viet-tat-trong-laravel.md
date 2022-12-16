Chào các bạn hôm nay mình sẽ hướng dẫn các bạn cách tạo avatar là tên viết tắt giống  như các avatar mạc định trong danh bạ điện thoại android hay account cuar Google.
# CÀI ĐẶT
Để tạo ra các avatar theo tên viết tắt chúng ta sẽ cần phải cài đặt một package có tên là laravolt/avatar. Để cài đặt chúng ta thực hieeenj như sau:

Nếu các bạn đang sử dụng Laravel >= 5.2
```
composer require laravolt/avatar
```
Còn nếu các bạn đang sử dụng phiện bản Laravel < 5.2 :
```
composer require laravolt/avatar ~0.3
```
# CONFIG
Tiếp theo chúng ta sẽ thực hiện các config theo tùy chúng ta, ở bước này chúng ta cần có một file để config :
```
php artisan vendor:publish --provider="Laravolt\Avatar\ServiceProvider"
```
Sau khi chạy lệnh publish config trên bạn sẽ có 1 file dùng để config ở  đường dẫn sau `config/laravolt/avatar.php`
# SỬ DỤNG
Để hiển thị ra được dưới dạng hình ảnh bạn chỉ cần thực hiện trong file view như sau:
```
<img src="{{ Avatar::create($user->name)->toBase64() }}" />
```
Ngoài việc tạo ra ảnh là  Base64 bạn còn có thể sử dụng các phương thức khác để tạo ảnh như: `toGravatar()` hay `toSvg()`
Rồi đến đây khi chạy thử kết quả nó sẽ trông như thế này:
![](https://images.viblo.asia/bd203dba-fe22-4e97-9757-82a8943ad3ee.png)

Như mình đã nói ở trên chúng ta có thể tùy chỉnh file config `avatar.php` theo ý chúng ta muốn, bây giờ mình sẽ thử config lại hình ảnh là hình vuông có boder radius xem sao nhé, trong file `avatar.php` mình sẽ chỉnh lại `shape` là `square` và `radius` là `3`:
```
'shape' => 'square',
'border' => [
    'radius' => 3,
],
```
sau khi save lại bạn đừng quên chạy 
``` 
php artisan config:cache
```
Kết quả sau khi config:
![](https://images.viblo.asia/7ebc2844-16c4-4f11-ab0e-dad5717a6a65.png)
# KẾT LUẬN
Trên đây là bài hướng dẫn cách chúng ta có thể tạo ra được avatar là chữ cái trong họi tên cũng rất đơn giản đúng không nào.
# THAM KHẢO
https://github.com/laravolt/avatar