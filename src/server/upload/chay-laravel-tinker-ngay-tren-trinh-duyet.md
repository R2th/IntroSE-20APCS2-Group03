Artisan tinker là một trong những thứ làm nên sức mạnh của Laravel, giúp bạn thao tác với ứng dụng của mình ngay trên Terminal. Tuy nhiên khi thực hiện một vài đoạn code cùng lúc hoặc copy/paste code có thể gây đôi chút khó chịu. Sẽ thật tuyệt nếu có thể chạy tinker ngay trên trình duyệt nhỉ?

Package mình sẽ giới thiệu trong bài này sẽ giúp bạn thực hiện điều đó: [laravel-web-tinker](https://github.com/spatie/laravel-web-tinker)

![](https://camo.githubusercontent.com/550ea6f4766149a4596dd30cf000b25c14ee3adb/68747470733a2f2f7370617469652e6769746875622e696f2f6c61726176656c2d7765622d74696e6b65722f6c696768742e706e67)

Package này cũng có dark mode nếu bạn không thích light mode :D

![](https://camo.githubusercontent.com/06754b3ab4a11ab3b43a82351e6eff5407cec2ca/68747470733a2f2f7370617469652e6769746875622e696f2f6c61726176656c2d7765622d74696e6b65722f6461726b2e706e67)

## Cảnh báo
Package này có thể cho phép bạn chạy bất kỳ đoạn code nào trên ứng dụng của bạn, thế nên hãy thận trọng khi cài package này trên môi trường production vì nó có thể ảnh hưởng đến data đấy.

## Cài đặt
Thông qua Composer:
```sh
composer require spatie/laravel-web-tinker --dev
```

Tiếp theo, publish các assets cần thiết để chạy ứng dụng:

```sh
php artisan web-tinker:install
```

Nếu không muốn sử dụng các cài đặt mặc định của package, bạn có thể publish file config và chỉnh sửa nó theo ý mình:

```
php artisan vendor:publish --provider="Spatie\WebTinker\WebTinkerServiceProvider" --tag="config"
```

File config `config/web-tinker.php` sẽ được publish:

```php
return [
    
    /*
     * The web tinker page will be available on this path.
     * Đường dẫn để sử dụng tinker trên trình duyệt
     */
    'path' => '/tinker',

    /*
     * Possible values are 'auto', 'light' and 'dark'.
     */
    'theme' => 'auto',


    /*
     * By default this package will only run in local development.
     * Do not change this, unless you know what your are doing.
     * Mặc định package này chỉ hoạt động ở môi trường local, nếu bạn muốn
     * đổi cài đặt này, hãy đọc lại phần cảnh báo bên trên =))
     */
    'enabled' => env('APP_ENV') === 'local',
];
```

## Sử dụng
Truy cập `domain/tinker` để thực hiện tinker theo ý bạn

## Authorization
Nếu thực sự muốn chạy package này trên một môi trường khác local, hay cân nhắc và thực hiện 2 bước dưới đây:
1. Định nghĩa một Gate tên là `viewWebTinker` trong `AuthServiceProvider`:
```php
public function boot()
{
    $this->registerPolicies();

    Gate::define('viewWebTinker', function ($user = null) {
        // return true if access to web tinker is allowed
        // điều kiện để kiểm tra xem user nào có thể truy cập vào web tinker
    });
}
```
2.  Chỉnh config `enabled` thành `true`

## Testing
```
composer test
```

Một package tương đối hay ho và hữu ích phải không nào mọi người :D