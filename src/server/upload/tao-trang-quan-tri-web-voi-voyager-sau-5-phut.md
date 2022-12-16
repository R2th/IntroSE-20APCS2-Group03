# Giới thiệu
Với mỗi một ứng dụng website, chúng ta đều cần 1 trang quản trị (backend) hoàn chỉnh. Nếu như để phát triển những phần quản trị cơ bản mà website nào cũng cần phải có (ví dụ: bài viết, trang, người dùng, ...) thì cũng mất khá nhiều thời gian.

Trong bài viết này, mình sẽ giới thiệu đến các bạn 1 mã nguồn mở cho Laravel. Nó sẽ giúp chúng ta xây dựng một ứng dụng quản trị hoàn chỉnh và qua đó giảm tải thời gian phát triển cho dự án của mình. Đó là **[Voyager](https://laravelvoyager.com/)**. 
![](https://images.viblo.asia/d2ac234a-a8f5-47d5-9c59-3444d397a5be.png)

Nếu ai đã từng dùng CMS thì sẽ thấy nó khá giống với phần quản trị của [Wordpress](https://wordpress.com/).
# Chuẩn bị
Chúng ta cần xóa cache config để Laravel có thể cập nhật các cài đặt với các giá trị mới. Ngoài ra, chúng ta cần phải chạy migrations cho database.
```
php artisan config:clear
php artisan migrate
```
# Cài đặt & cấu hình Voyager
Sử dụng composer để cài đặt Voyager:
```
composer require tcg/voyager
```
Thêm package Voyager vào Service Providers trong file `config/app.php`.
```php
'providers' => [
    // Laravel Framework Service Providers...
    //...

    // Package Service Providers
    TCG\Voyager\VoyagerServiceProvider::class,
    // ...

    // Application Service Providers
    // ...
],
```
Bây giờ bạn sẽ có thể chạy lệnh artisan để tạo tất cả các file cần thiết cho màn hình admin dashboard.
```
php artisan voyager:install --with-dummy
```
# Đăng nhập vào trang quản trị
Khởi động ứng dụng của bạn với câu lệnh:
```
php artisan serve
```
Sau đó truy cập: http://localhost:8000/admin
Sử dụng thông tin đăng nhập mặc định `admin@admin.com` / `password` để đăng nhập

![](https://images.viblo.asia/fbf7df94-6606-4c22-831d-e4eceafba9b7.png)

Đến đây, chào mừng bạn đã đăng nhập thành công! Hãy cùng trải nghiệm các tính năng tuyệt vời của Voyager.

![](https://images.viblo.asia/24408526-695c-4922-b601-30050a4261e3.png)
# Trải nghiệm
Bất cứ website nào cũng cần những mục cơ bản để quản trị như post (bài viết), page (trang), menu, category (danh mục). Mình sẽ cùng các bạn khám phá một số phần xem trang quản trị của Voyager có ổn không nhé.
## Post (Bài viết)
* Danh sách bài viết
![](https://images.viblo.asia/19e6ead6-31d2-4a93-9fb2-8fba4df82fd9.png)

* Thêm/Sửa bài viết
Phần này mình thấy nó khá chi tiết & đầy đủ cho nội dung của 1 trang tin tức và rất giống CMS về blog/tin tức nổi tiếng - **Wordpress**.
Ngoài tiêu đề, nội dung, trích đoạn, ảnh đại diện ra, còn có những cái mình thấy khá hay: URL slug, SEO Content (Meta Description, Meta Keywords, SEO Title).
![](https://images.viblo.asia/8f3255d9-c9db-4764-8ffe-ebabed1b9a5b.png)
## Menu Builder
Một phần mà mình cảm thấy rất hay từ Voyager đó là phần menu. Thật sự nó rất đẹp & lại rất giống Wordpress - cho phép người dùng kéo thả menu dễ dàng, trực quan.
Việc của 1 người quản trị website đơn giản là thêm menu rồi kéo - thả, còn việc của chúng ta khi muốn show ra menu ở bất kỳ nơi nào chỉ đơn giản là gọi: 
```
menu('name') // name là tên của menu
```
![](https://images.viblo.asia/533df1f1-8bdb-47fc-969f-bc50997742ac.png)
## Media Library
Phần media library (quản lý file) trong Voyager cũng rất dễ sử dụng, và mình đánh giá khá cao ở mức độ trực quan của nó.
![](https://images.viblo.asia/4f62f7b4-f5f9-469f-85de-41965d4e31e3.png)

## Database
Voyager có thể cho phép người dùng quản lý được database, thêm/sửa/xóa các trường, thay đổi các thuộc tính của database ngay trên trang quản trị. Thậm chí, khi tạo mới 1 bảng, nó còn có thể tạo file model của bảng đó luôn cho chúng ta.
![](https://images.viblo.asia/b3e162de-9783-488f-8a08-33dc1d7af426.png)

![](https://images.viblo.asia/465d1a7e-d077-40d8-b365-ec405ff04d10.png)
## Others
Ngoài ra, Voyager còn có rất nhiều tính năng hay ho. Bạn có thể cài trực tiếp nó và trải nghiệm, hoặc tìm hiểu thêm về nó thông qua [document](https://voyager.readme.io/docs) hoặc xem hướng dẫn qua loạt video này: https://www.youtube.com/playlist?list=PL_UnIDIwT95PEQFNdgXZGo5SYU5V_TQvc
# Kết luận
Một bộ quản trị như thế này bạn hoàn toàn có thể tự phát triển được theo ý của riêng mình, nhưng có thể sẽ mất nhiều thời gian & công sức. 

**Voyager** theo mình thấy thì nó có đầy đủ tính năng của 1 CMS như Wordpress, giúp cho người dùng quản trị website một cách dễ dàng, trực quan, giao diện đẹp, bố cục hợp lý, tốc độ nhanh.

Hơn nữa, với Voyager - 1 bộ công cụ có sẵn thì sẽ giúp chúng ta tiết kiệm được nhiều thời gian làm backend & dành sự tập trung nhiều hơn cho frontend.

Nhưng nhược điểm mà mình nhận thấy đó là khi bạn muốn dựa trên nền tảng là Voyager để phát triển và custom thành bộ backend dành cho mình thì sẽ mất thời gian để nghiên cứu code về nó.

Hy vọng, qua bài viết này, các bạn sẽ có thêm sự lựa chọn, sự gợi ý để phát triển dự án website cho riêng mình với Voyager.

# Tham khảo
https://www.codementor.io/connorleech/build-a-fullstack-admin-app-with-voyager-in-5-minutes-9x81ifvzb
https://laravelvoyager.com/docs/
https://www.youtube.com/watch?v=RSAnupACbhg&index=1&list=PL_UnIDIwT95PEQFNdgXZGo5SYU5V_TQvc