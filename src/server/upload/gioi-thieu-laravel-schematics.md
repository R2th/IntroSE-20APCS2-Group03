### Giới thiệu
Nếu mọi người đã làm việc với laravel framework thì chắc hẳn sẽ biết model và migration trong laravel được hỗ trợ rất mạnh, hôm nay mình sẽ giới thiệu cho mọi người một package giúp quản lý, thêm, sửa, xoá model và migration bằng giao diện


### Cài đặt
Đầu tiên sẽ cần cài đặt package vào project
```
composer require mtolhuys/laravel-schematics --dev
```

Sau đó mọi người chạy tiếp lệnh bên dưới để thư viện khởi tạo
```
php artisan schematics:install
```

Sau khi cài đặt xong mọi người truy cập vào link sau: http://127.0.0.1:8000/schematics

Ra hình bên dưới là quá trình cài đặt đã thành công
![](https://images.viblo.asia/59683b2a-4427-410e-a817-ddb07a369492.png)

### Tạo model
Để tạo mới model, mọi người chọn vào icon cộng trên góc phải màn hình như hình bên dưới
![](https://images.viblo.asia/fb8275c8-7f10-4bfe-947f-c38dd411eeab.png)

Sau đó điền các cột vào và tích chọn tạo thêm controller, request, ....
![](https://images.viblo.asia/06067922-ffb1-4254-b781-424fc3693934.png)

Sau khi tạo xong, mở src code ra sẽ thấy laravel sẽ tạo ra 1 class model trong thư mục app là ok

### Thêm, sửa cột model
Để thêm hoặc xoá cột trong model, mọi người chọn vào icon hình bút chì bên cạnh model tương ứng
![](https://images.viblo.asia/12dd95a4-ec3a-41c0-b569-7d34182d462f.png)

Sau đó chọn icon cộng hoặc trừ để thêm và sửa cột, tích vào tạo migration nếu cần thiết
![](https://images.viblo.asia/b0ae05c6-3557-43dd-ad16-1b0f242b26a9.png)

![](https://images.viblo.asia/f16403dc-d26e-49fd-8bbf-75f4ffbb81e0.png)
### Thêm quan hệ giữa các model
Để thêm quan hệ mọi người kéo từ icon mũi tên từ model này qua model khác như hình bên dưới
![](https://images.viblo.asia/5c1b7b54-ee5f-48eb-bf6d-87d627722c36.gif)

### Diagram
Laravel Schematics hỗ trợ 4 kiểu style diagram, để thay đổi mọi người chọn ở phía trên bên phải như hình
![](https://images.viblo.asia/17399fa9-ee1e-4c62-bb8c-db6208a2c165.gif)

### Import, export
Ngoài ra Laravel Schematics còn hỗ trợ import, export diagram
![](https://images.viblo.asia/997e1bea-19f9-4a3f-8f3c-7830f85c4e13.gif)

### Filter
Để giới hạn các model muốn xem mọi người có thể sử dụng tính năng search ở góc trên bên trái
![](https://images.viblo.asia/29534611-2a49-47a9-b5f5-322525bf12a3.gif)

### Tham khảo
- https://laravel-news.com/design-models-interactively-with-laravel-schematics
- https://github.com/mtolhuys/laravel-schematics