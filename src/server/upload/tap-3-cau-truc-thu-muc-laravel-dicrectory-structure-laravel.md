Chúng ta lại gặp nhau nữa rồi, và tập ngày hôm nay mình xin giới thiệu với các bạn về cấu trúc thư mục trong Laravel và chức năng của từng thành phần. 

Laravel cung cấp một cấu trúc thư mục có thể bắt đầu với một project dù lớn hay nhỏ. Chúng ta có thể tự do tổ chức ứng dụng chúng ta theo một cách riêng nếu muốn.

## 1. Thư mục app (The app directory)
Thư mục này chứa những code cốt lõi (core code) của ứng dụng. Hầu như tất cả các lớp (class) bạn tạo cho project sẽ nằm ở đây.

## 2. Thư mục bootstrap (The bootstrap directory)
Thư mục `bootstrap` chứa file `app.php` làm việc như một bootstrap của ứng dụng. Ngoài ra còn có thư mục `cache` dùng để chứa các file bộ nhớ config, route, services... cho việc tối ưu hiệu năng.

## 3. Thư mục config (The config directory)
Thư mục này chứa tất cả file config ứng dụng, rất thuận tiện cho việc thay đổi các thiết lập.

## 4. Thư mục database (The database directory)
Như tên gọi của nó, thư mục này sẽ chứa các file làm việc với cơ sở dữ liệu (database) của ứng dụng. Trong này gồm 3 phần: `factories`, `migrations` và `seeds`.

Về phần `factories`, nói dễ hiểu nó sẽ có chức năng tạo dữ liệu ảo database, phối hợp cho việc testing.

Thư mục `migrations` sẽ chứa các file dùng để khởi tạo các bảng (table) trong database. Mình sẽ tìm hiểu sâu hơn trong những tập kế tiếp.

Còn về `seeds`, chẳng hạn khi ứng dụng của bạn bị xóa hết các table trong database, thì với `seeds` cùng với các file seeder sẽ giúp chúng ta khôi phục lại database theo những gì đã thiết lập sẵn trước đó nhưng có thể sẽ mất đi dữ liệu đã có hoặc thay thế bằng dữ liệu mặc định được khai báo trong các file seeder.

## 5. Thư mục public (The public directory)
Thư mục `public` chứa file `index.php`, file này đảm nhận vai trò như một đích đến của các request và autoload các lớp. Ngoài ra nó còn chứa các tài nguyên mà trình duyệt (browser) có thể truy cập như JS, CSS, hình ảnh...

## 6. Thư mục resources (The resources directory)
Thư mục `resources` chứa các tài nguyên thô chưa được biên dịch như view, LESS, SASS hoặc Javascript...

## 7. Thư mục routes (The routes directory)
Thư mục `routes` chứa các tuyến đường (route) đã định nghĩa của ứng dụng. Mặc định các file: `api.php`, `web.php`, `channels.php` và `console.php` được kết nối với Laravel.

Mình sẽ giải thích đơn giản công dụng của từng file:

File `web.php`: đơn giản nó sẽ chứa những route chứa request từ trình duyệt, chịu ảnh hưởng từ session, cookie, CSRF (tính năng bảo mật trong Laravel). Nếu ứng dụng của bạn không có các RESTful API thì hầu như các route sẽ nằm trong file này.

Chẳng hạn đoạn code bên dưới ở file `routes/web.php`:
```PHP:routes/web.php
Route::get('/', function () {
    return view('welcome');
});
```
Đây chính là code khai báo một route với phương thức GET, khi truy cập đường dẫn http://localhost:8000 thì trình duyệt sẽ trả về một view với tên là *"welcome"*.

 ![](https://images.viblo.asia/f34d59bc-7c33-4f29-96ba-5a9d4e22c200.JPG)

File `api.php`: như ở trên đã nói, file này sẽ chứa các route có chức năng như là RESTful API hoặc cái gì đó tương tự, chịu ảnh hưởng qua kiểm duyệt token, authenticated... và có thể giới hạn thời gian tồn tại.

File `console.php`: nơi đây bạn có thể định nghĩa các Clouser bằng các lệnh console, dù nằm trong nhóm route nhưng đây không phải định nghĩa một route theo phương thức HTTP.

Để test xem nó làm việc thế nào, bạn có thể mở file `routes/console.php` sẽ thấy một đoạn code ví dụ (example code) bên dưới:
```PHP:routes/console.php
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');
```
    
Bây giờ các bạn mở commander lên và chạy thử lệnh:
    
> php artisan inspire 

Một kết quả khá thú vị sẽ được trả về:

![](https://images.viblo.asia/01ee034f-1bc6-4a12-b669-9ab0a7a351a9.JPG)

Nó trả về cho chúng ta một câu nói hoặc danh ngôn của người nổi tiếng, nếu bạn chạy lệnh một lần nữa sẽ ra một câu khác. Đó chính là cách "làm việc" của console route.

File `channels.php`: bạn tìm đến file này khi ứng dụng của bạn sử dụng thời gian thực (real-time), file này hỗ trợ cho ứng dụng của bạn có thể tương tác các sự kiện giữa phía người dùng (client-side) và phía hệ thống (server-side).

## 8. Thư mục storage (The storage directory)
Thư mục `storage` chứa các file blade template (chúng ta sẽ tìm hiểu nó ở tập sau) đã được phiên dịch (complied), các file session, file cache và một số file khác được tạo bởi framework. Thư mục này gồm `app`, `framework` và `logs`.

Thư mục `app` dùng để lưu trữ bất kỳ file nào do ứng dụng của mình tạo ra. Thư mục `storages/app/public` có thể dùng để lưu trữ các file do người dùng (user) đăng tải, chẳng hạn như ảnh đại diện (avatar) có thể truy cập công khai.

Về `framework` như đã nói ở trên, nó dùng để lưu trữ các file mà framework tạo ra để hỗ trợ trong việc chạy ứng dụng.

Cuối cùng, thư mục `logs` sẽ chứa các file log gồm có các lỗi trong quá trình code (errror log). 

## 9. Thư mục tests (The tests directory)
Thư mục này bạn chỉ hiểu đơn giản dùng để test các class trong quá trình thử nghiệm trên commander.

## 10. Thư mục vendor (The vendor directory)
Thư mục `vendor` chứa các thư việc tích hợp và mã nguồn của Laravel, nếu bạn nào thích tìm tòi, khám phá và học hỏi cách code của nó thì nên tìm hiểu sâu thư mục này.

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ