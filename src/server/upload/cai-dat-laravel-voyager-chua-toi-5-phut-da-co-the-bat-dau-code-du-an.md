![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb8f714f5-bd5e-44e5-85d2-54aacecd4c77%2FUntitled.png?table=block&id=ddbfaf8f-f172-4973-ac94-ed99f48b8e13&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2790&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb8f714f5-bd5e-44e5-85d2-54aacecd4c77%2FUntitled.png?table=block&id=ddbfaf8f-f172-4973-ac94-ed99f48b8e13&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2790&userId=&cache=v2)

Khi xây dựng một hệ thống phần mềm, chúng ta thường xuyên "nhai đi, nhai lại" các công việc kiểu như Thêm, Xóa, Sửa, Danh sách của một Table nào đó?

Hôm nay chúng ta sẽ cùng tìm hiểu về Voyager, một package cho phép bạn có thể triển khai nhanh một bộ giao diện Admin có sẳn với các tính năng cơ bản để bắt đâu một dự án một cách nhanh chống

### Cài đặt

### Cái đặt Laravel

 Setup Laravel Sail phiên bản mới nhất bằng lệnh

```bash
curl -s "https://laravel.build/demo1?with=mysql" | bash
```

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc1249d28-717d-40a4-ab0c-1eff9a99f366%2FUntitled.png?table=block&id=32ffd052-6d1c-41eb-8884-6492e387dbbb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1240&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc1249d28-717d-40a4-ab0c-1eff9a99f366%2FUntitled.png?table=block&id=32ffd052-6d1c-41eb-8884-6492e387dbbb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1240&userId=&cache=v2)

Truy cập vào thư mục vừa tải về

```bash
cd demo1
```

Thêm hai dòng định nghĩa Port truy cập vào các service Docker

```bash
//file .env
APP_PORT=8111 #Port truy cập web có dạng localhost:8111
FORWARD_DB_PORT=3111 #Port truy cập mysql trực tiếp từ host
```

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9fe99b16-7ead-45e7-9cab-fa1aa190bc80%2FUntitled.png?table=block&id=e69f0fda-5848-446f-956f-76e6d7e1389c&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=550&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9fe99b16-7ead-45e7-9cab-fa1aa190bc80%2FUntitled.png?table=block&id=e69f0fda-5848-446f-956f-76e6d7e1389c&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=550&userId=&cache=v2)

Vào thư mục được tải về chạy lệnh khởi chạy Laravel Sail

```bash
./vendor/bin/sail up -d
```

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbb3c94fd-476b-4d54-86e2-0ff8865670b9%2FUntitled.png?table=block&id=d6727670-76e8-4ff2-9146-173546e5b088&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1090&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbb3c94fd-476b-4d54-86e2-0ff8865670b9%2FUntitled.png?table=block&id=d6727670-76e8-4ff2-9146-173546e5b088&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1090&userId=&cache=v2)

Tới bước này xem như đã cài đặt Laravel thành công, các bạn có thể kiểm tra mọi thứ hoạt động bằng việc truy cập link "[http://localhost:](http://localhost:8111/)8111"

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8adba399-2572-4cf2-9bd6-f2499919c3d6%2FUntitled.png?table=block&id=828daf83-c298-4a7c-be5c-804a277740ef&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2430&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8adba399-2572-4cf2-9bd6-f2499919c3d6%2FUntitled.png?table=block&id=828daf83-c298-4a7c-be5c-804a277740ef&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2430&userId=&cache=v2)

Màn hình khi cài đặt thành công Laravel

### Cái đặt Voyager

Để thuận tiện cho qua trình sử dụng Sail chung ta chạy lện gán alias cho rút gọn

```bash
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

Chạy lệnh composer install Voyager

```bash
sail composer require tcg/voyager
```

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81afedc4-072b-4234-aca3-4dbcdd30fc66%2FUntitled.png?table=block&id=528e65c2-5e93-457f-8e62-6ac922e6a2bb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1210&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81afedc4-072b-4234-aca3-4dbcdd30fc66%2FUntitled.png?table=block&id=528e65c2-5e93-457f-8e62-6ac922e6a2bb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1210&userId=&cache=v2)

Sau khi chạy xong ta tiếp tục chạy lênh Voyager install

```bash
sail artisan voyager:install
php artisan voyager:install --with-dummy
```

Sau khi cài  đặt thành công truy cập và kiểm tra kết quả tại "[http://localhost:8111/](http://localhost:8111/)admin"

```bash
// Thông tin đăng nhập mặt định
	user: admin@admin.com
	password: password
```

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81afedc4-072b-4234-aca3-4dbcdd30fc66%2FUntitled.png?table=block&id=528e65c2-5e93-457f-8e62-6ac922e6a2bb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1210&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81afedc4-072b-4234-aca3-4dbcdd30fc66%2FUntitled.png?table=block&id=528e65c2-5e93-457f-8e62-6ac922e6a2bb&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1210&userId=&cache=v2)

### Các màn hình chính

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11d30913-3c24-48aa-a7e0-ad720a73babe%2FUntitled.png?table=block&id=13634737-7b8a-462a-a1fa-08a448d9b5b6&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3690&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11d30913-3c24-48aa-a7e0-ad720a73babe%2FUntitled.png?table=block&id=13634737-7b8a-462a-a1fa-08a448d9b5b6&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3690&userId=&cache=v2)

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe59638c7-f2e7-4989-ba1e-4be1e5e95e56%2FUntitled.png?table=block&id=1c34e9a1-0bcc-4972-9bfb-8123d5c2e2e6&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3780&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe59638c7-f2e7-4989-ba1e-4be1e5e95e56%2FUntitled.png?table=block&id=1c34e9a1-0bcc-4972-9bfb-8123d5c2e2e6&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3780&userId=&cache=v2)

![https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F91847c2a-c2b4-4609-8600-321652d63962%2FUntitled.png?table=block&id=2fb30274-f827-431d-be31-b6c32951d514&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3780&userId=&cache=v2](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F91847c2a-c2b4-4609-8600-321652d63962%2FUntitled.png?table=block&id=2fb30274-f827-431d-be31-b6c32951d514&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3780&userId=&cache=v2)

### Tài liệu tham khảo

1. [https://voyager-docs.devdojo.com](https://voyager-docs.devdojo.com/getting-started/what-is-voyager)
2. [https://laravel.com/docs/8.x/sail](https://laravel.com/docs/8.x/sail)