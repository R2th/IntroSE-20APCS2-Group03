Chào các bạn

M là newbie trong code laravel, m thấy có cái package upload ảnh tích hợp trình soạn thảo TinyCME

Đầu tiên là tạo project Lavel

Cài đặt LFM và config như website của họ nhé, đủ bước là ok

có trong website này: https://unisharp.github.io/laravel-filemanager/installation

Phần tiny thì bạn tải file về add trong project luôn rồi add đường dẫn vào, intergration thì vào trang TinyCME nhé https://www.tiny.cloud/docs/
Trong phần này có khu vực tải file offline về để add file js vào luôn nhé mn, khỏi phải cdn, bạn nào cdn thì lên mạng search

Toàn bộ trên bạn config như hướng dẫn nhé

**Đến bước mà như tiêu đề m có nói là khắc phục lỗi khi upload ảnh và show ảnh**

M cũng đã thử cho nên mới biết được lỗi nằm ở đâu, đó là file trong folder [Storage] không cho phép đọc nên lúc show đúng đường dẫn nhưng vẫn bị lỗi Not Found 404

bạn chỉ cần config trong file: filesystems.php trong thư mục config

ở đây m config như thế này

```php
'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('/'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('/'),
            'url' => env('APP_URL').'public/image',
            'visibility' => 'public',
        ],



    ],
    
    
    'links' => [
        public_path('image') => storage_path(''),
    ],
```  

Lưu ý sau khi bạn config như thế này rồi bạn mới chạy lệnh **php artisan storage:link** nhé

Ở đây m sẽ cho thêm 1 thư mục image trong mục public của project nhé, còn các bạn đặt tên khác thì sửa lại đường dẫn như trên là được

sau khi thử xong thì m đã up được và hiển thị được ảnh, trên mạng có nhiều video nhưng đến bước hiển thị ảnh thì không được vì lý do trên

nếu bạn nào có cách khác thì update hộ m nhé

Code này m làm trên localhost, còn trên host thật thì m chưa test, vì đang hoàn thiện web

Thank for reading