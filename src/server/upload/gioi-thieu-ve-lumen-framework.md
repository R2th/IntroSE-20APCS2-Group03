![](https://images.viblo.asia/2b779e15-7514-4b57-b1d7-db60fbb82752.png)
<p>
Lumen là một framework PHP được phát triển bởi cha đẻ của Laravel – Taylor Otwell. Theo tác giả , Lumen không có ý định thay thế Laravel. Trên thực tế Lumen được tạo ra để làm hệ thống microservices – một hệ thống nhỏ hơn để hỗ trợ các hệ thống lớn như Laravel.
    </p>
<p>
Trong bài viết này , mình không muốn đi quá sâu vào Lumen mà chỉ muốn giới thiệu cơ bản về Framework này. Let’s start
</p>

## 1.Những điểm nổi bật của Lumen
### Hiệu suất
Mục đích của Lumen được tạo ra để phát triển hệ thống microservice nên tốc độ được đánh giá rất cao. Mặt khác việc thay thế Symfony router bằng Fast Router – một thư viện router được phát triển bởi Nikita Popov nên hiệu suất cũng được cải thiện.
![](https://images.viblo.asia/57adee63-1567-45a8-9a1a-85555d592ce7.png)
<div  align="center">Hiệu suất của Lumen so với các micro-framework khác</div>

### Tính tiện lợi
Do Lumen được xây dự từ Core của Laravel nên Framework này cũng được kế thừa rất nhiều từ Laravel như : Eloquent, caching, queues, validation, routing, middleware, và các container services. 

Tuy nhiên để đảm bảo về mặt hiệu suất, Lumen cũng đã lược bỏ nhiều thành phần của Laravel, bạn nên cân nhắc vấn đề này khi bắt đầu một dự án Lumen.

Tin vui là bạn có thể chuyển từ Lumen lên thành Laravel Framework chỉ bằng vài bước đơn giản.
![](https://images.viblo.asia/b0d4c2b8-9f09-4fef-8c2c-e2a8a87a9f97.png)

## 2.Cài đặt Lumen và chạy ứng dụng đầu tiên của bạn
### Cấu hình
Tính đến hiện tại, phiên bản mới nhất của Lumen là phiên bản 7x. Để cài đặt thì server của bạn phải đáp ứng các yêu cầu sau:
* Phiên bản PHP >= 7.2
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension

###  Tạo project
Cũng như Laravel, Lumen được cài đặt qua Composer. Nếu bạn chưa cài Composer thì cũng có thể cài đặt tại [Đây](https://getcomposer.org/)
<br>

Cài đặt Lumen bằng command sau :

```
composer create-project --prefer-dist laravel/lumen blog
```

Sau khi tất cả các tiến trình cài đặt xong, bạn có thể chạy ngay project bằng câu lệnh:
```
cd blog
php -S localhost:8000 -t public
```
### Cấu hình
Bạn có thể cấu hình Project Lumen của mình qua file `.env`.
Ngoài ra bạn cũng có thể Custom các third-party trong file này. 

## 3.Kết thúc
Tóm lại , Lumen là một framework được xây dựng từ mã nguồn của Laravel. Mục đích của Lumen là để phát triển các microservices, hỗ trợ các hệ thống lớn.

Bài viết được tham khảo từ:
* https://lumen.laravel.com/docs/7.x

Bài viết này đã có trên blog cá nhân của mình, các bạn có thể xem tại [đây](https://tuanha.asia/gioi-thieu-ve-lumen-framework/)