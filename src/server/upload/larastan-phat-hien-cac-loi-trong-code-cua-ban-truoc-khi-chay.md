![](https://raw.githubusercontent.com/nunomaduro/larastan/master/docs/logo.png)

Larastan là một command-line tool do Nuno Maduro xây dựng dựa trên PHPStan và tập trung vào việc tìm lỗi trong code Laravel của bạn trước khi chạy nó. Nếu bạn đã từng sử dụng PhpStorm, có lẽ bạn đã trải nghiệm phân tích tĩnh code PHP của mình cả trong thời gian thực và trong kiểm tra code.

![](https://cdn-images-1.medium.com/max/800/1*sSxjkYaeUlaIiFqNdwP1UA.png)

Laravel tận dụng các magic method của PHP (ví dụ `__get()`) cho một số chức năng của framework và Larastan nhằm mục đích phân tích code dựa trên các magic method và có thể báo cáo bất kỳ lỗi nào có thể xảy ra.

Bạn cài đặt Larastan với composer, sau đó bạn có thể sử dụng với các command Artisan trên các ứng dụng của Laravel

### Cài đặt 
```composer require --dev nunomaduro/larastan```

### Phân tích code
```php artisan code:analyse```

Command `code:analyse` sẽ  có một vài option giúp bạn tùy chỉnh phân tích:

### Default is 5 - 0 is the loosest, and 7 the strictest
```php artisan code:analyse --level=[0-7]```

### Analyze specific paths

```php artisan code:analyse --paths="modules,app,domain"```

### Error formats
Theo mặc định, các đầu ra của Larastan tìm thấy các lỗi trong các bảng được nhóm theo các tệp để dễ đọc với con người. 
Để thay đổi đầu ra, bạn có thể sử dụng tùy chọn  `--error-format` trong CLI.

Các tùy chọn có sẵn là: `checkstyle, raw, table, json, prettyJson`.

```php artisan code:analyse --error-format table```

Bạn cũng có thể sử dụng Larastan để phân tích code cho các package Laravel, với file cấu hình`phpstan.neon.dist` trong thư mục gốc của package:

```includes:
    - ./vendor/nunomaduro/larastan/extension.neon
parameters:
    level: 5
    paths:
        - src
```

Nuno Maduro chịu trách nhiệm cho một loạt các công cụ điều khiển mà chúng tôi yêu thích trong cộng đồng Laravel, từ Collision (mặc định có Laravel) đến Laravel Zero , một micro-framework cho các ứng dụng console/command line

Bài viết được sưu tầm từ: https://laravel-news.com/larastan