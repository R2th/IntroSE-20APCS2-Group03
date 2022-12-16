Chào mọi người, vừa qua mình có task upgrade laravel từ 5.4 lên 5.8 nên qua đó mình có chút lưu ý muốn chia sẻ lại với mọi người các upgrade và những lưu ý khi upgrade. Mời mọi người theo dõi bài viết của mình nhé.

## 1. Cập nhật file composer.json
Trước tiên việc cần làm là cập nhật lại file composer.json:

* laravel/framework của bạn lên 5.8.*
* phpunit/phpunit của mình lên ~6.0. 
* filp/whoops với phiên bản ~2.0 vào phần request-dev của tệp composer.json của bạn. 

```
"require": {
        "php": ">7.1.3"
        "laracasts/flash": "3.0.2",
        "laravel/framework": "5.8.*",
        ...
},
"require-dev": {
        "phpunit/phpunit": "^7.5",
        "filp/whoops": "2.3.1",
        ...
}
```
***Lưu ý: Ở đây mình chỉ note ra những package cần thiết nhất thôi, các bạn dùng package nào thì nhớ dùng phiên bản mới nhất nhé***

Trong phần tập lệnh của tệp composer.json, hãy thêm lệnh gói: Discover vào sự kiện post-autoload-dump:
```
"scripts": {
    ...
    "post-autoload-dump": [
        "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
        "@php artisan package:discover"
    ],
}
```
và xóa scripts này vì lệnh optimize đã bị bỏ ở version 5.6:
```
"scripts": {
    ...
   "post-update-cmd": [
            "Illuminate\\Foundation\\ComposerScripts::postUpdate",
            "php artisan optimize"
        ],
}
```
Việc nâng cấp laravel 5.4 lên 5.8 theo mình thẩy chủ yếu là các thay đổi từ 5.4 lền 5.5 thôi nên các bạn có thể đọc guide upgrade tại đây nhé: [Upgrade 5.4 to 5.5](https://laravel.com/docs/5.5/upgrade#upgrade-5.5.0)
## 2. Cấu trúc response validate ajax
Sau khi nâng cấp laravel version lên 5.8, Exception Format đã được thay đổi từ cấu trúc:
```
 {
        "field-1": [
            "Error 1",
            "Error 2"
        ],
        "field-2": [
            "Error 1",
            "Error 2"
        ],
}
```
thành cấu trúc mới: 
```
{
    "message": "The given data was invalid.",
    "errors": {
        "field-1": [
            "Error 1",
            "Error 2"
        ],
        "field-2": [
            "Error 1",
            "Error 2"
        ],
    }
}
```
Như vậy để giải quyết vấn đề này sẽ có 2 cách:

1. Bạn phải sửa code cho từng hàm ajax.

2. Sửa hàm common trả về cho đúng định dạng như cũ:

```
use Illuminate\Validation\ValidationException;
...
protected function invalidJson($request, ValidationException $exception)
    {
        return response()->json($exception->errors(), $exception->status);
    }
```
## 3. Thay đổi template thông báo lỗi validate
Khi upgrade flash lên 3.0.2 các bạn cần chaỵ lệnh sau để copy template flash ra folder resource nhé:
```
php artisan vendor:publish --provider="Laracasts\Flash\FlashServiceProvider"
```
sau khi chạy lệnh trên bạn sẽ thấy folder `resources/views/vendor` được tạo.
## 4. Các function đã thay đổi
### 4.1 has() function
Hàm `has()` sẽ được thay đổi trả về true ngay cả khi giá trị đầu vào là một chuỗi rỗng hoặc null. Thay vào đó hàm `filled()` sẽ được thay thế cho hàm `has()`.
### 4.2 compact() function
Hàm `compact()` do phiên bản PHP nâng cấp nên sẽ thay đổi. Trước đây `compact()` 1 biến không tồn tại thì sẽ không thông báo lỗi, nhưng phiên bản PHP 7.3 sẽ thông báo 1 lỗi đỏ và sẽ đứng lại.
https://www.php.net/manual/en/function.compact.php
### 4.3 only() function
Hàm `only()` bây giờ sẽ chỉ trả về các thuộc tính thực sự có trong request. Nếu bạn muốn giữ nguyên hành vi cũ của hàm `only()`, bạn có thể sử dụng hàm `all()` để thay thế.
### 4.4 intersect() function
Hàm `intersect()` đã được bỏ, bạn có thể sử dụng array_filter($request->only('foo')); để thay thế.
### 4.5 request() function
Hàm `request()` sẽ không còn truy xuất các khóa lồng nhau nữa. Nếu cần, bạn có thể sử dụng hàm `input()` của request để truy xuất: `request()->input('filters.date');`
## 5. Lưu ý khác
1. Tạo thư mục storage/framework/cache/data
Ở phiên bản 5.7 laravel đã một thư mục data mới để lưu cache. Bạn nên tạo thư mục này trong ứng dụng của mình: `storage/framework/cache/data`

```
mkdir -p storage/framework/cache/data
```
Sau đó, thêm tệp `.gitignore` vào thư mục vừa tạo data:
```
cp storage/framework/cache/.gitignore storage/framework/cache/data/.gitignore
```
Cuối cùng, đảm bảo rằng tệp lưu trữ / framework / cache / .gitignore được cập nhật như sau:
```
*
!data/
!.gitignore
```
2. Thay đổi về cache TTL từ phút sang giây
```
// Laravel 5.7 - Store item for 30 minutes...
Cache::put('foo', 'bar', 30);

// Laravel 5.8 - Store item for 30 seconds...
Cache::put('foo', 'bar', 30);
```
## Kết luận
Như vậy mình đã chia sẻ cho các bạn về cách nâng cấp laravel version 5.4 lên 5.8 và những lưu ý khi nâng cấp. Bài viết dựa trên những gì mình tìm hiểu được, nên có thể có những thiếu sót, các bạn comment ở bên dưới giúp mình nhé.

Cảm ơn các bạn đã theo dõi bài viết của mình.
## Tài liệu tham khảo
https://laravel.com/docs/5.4/upgrade
https://laravel.com/docs/5.5/upgrade
https://laravel.com/docs/5.6/upgrade
https://laravel.com/docs/5.7/upgrade
https://laravel.com/docs/5.8/upgrade