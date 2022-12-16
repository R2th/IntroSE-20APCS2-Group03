Như chúng ta đã biết thì `Composer` là một công cụ để quản lý các `dependency` trong các ứng dụng php. Nó cho phép chúng ta khai báo các thư viện trong các dự án của chúng ta. Và nó sẽ quản lý install hay update các thư viện chúng ta đã khai báo. Ở trong các ứng dụng `Laravel` thì chúng ta thường để ý đến file `composer.json`. Vậy đã bao giờ để ý đến file `composer.lock` hay chưa ??? 

![](https://images.viblo.asia/b62e9e14-b20f-4b2c-9d03-99c2ed8776dc.jpg)

# composer.lock là gì ?
Đơn giản `composer.lock` là một file cho `composer` biết chính xác version từng package đã được sử dụng và cài đặt
<br>
Ví dụ mình cài package `laravel/socialite` như sau:
```
composer require laravel/socialite ^4.3
```
Sau khi cài đặt xong thì các bạn kiểm tra trong file `composer.json` thì ở `require` sẽ có thể package mà chúng ta đã cài đặt:
```
"laravel/socialite": "^4.3",
```
Trong file `composer.json` chỉ cho chúng ta biết được sơ bộ về version của package mà chúng ta sử dụng. <br>
Thế còn ở file `composer.lock` sau khi chúng ta cài đặt package đó sẽ như thế nào:
```
            "name": "laravel/socialite",
            "version": "v4.3.2",
            "source": {
                "type": "git",
                "url": "https://github.com/laravel/socialite.git",
                "reference": "4bd66ee416fea04398dee5b8c32d65719a075db4"
            },
            "dist": {
                "type": "zip",
                "url": "https://api.github.com/repos/laravel/socialite/zipball/4bd66ee416fea04398dee5b8c32d65719a075db4",
                "reference": "4bd66ee416fea04398dee5b8c32d65719a075db4",
                "shasum": ""
            },
            "require": {
                "ext-json": "*",
                "guzzlehttp/guzzle": "~6.0",
                "illuminate/http": "~5.7.0|~5.8.0|^6.0|^7.0",
                "illuminate/support": "~5.7.0|~5.8.0|^6.0|^7.0",
                "league/oauth1-client": "~1.0",
                "php": "^7.1.3"
            },
            "require-dev": {
                "illuminate/contracts": "~5.7.0|~5.8.0|^6.0|^7.0",
                "mockery/mockery": "^1.0",
                "phpunit/phpunit": "^7.0|^8.0"
            },
            "type": "library",
            "extra": {
                "branch-alias": {
                    "dev-master": "4.x-dev"
                },
                "laravel": {
                    "providers": [
                        "Laravel\\Socialite\\SocialiteServiceProvider"
                    ],
                    "aliases": {
                        "Socialite": "Laravel\\Socialite\\Facades\\Socialite"
                    }
                }
            },
            "autoload": {
                "psr-4": {
                    "Laravel\\Socialite\\": "src/"
                }
            },
            "notification-url": "https://packagist.org/downloads/",
            "license": [
                "MIT"
            ],
            "authors": [
                {
                    "name": "Taylor Otwell",
                    "email": "taylor@laravel.com"
                }
            ],
            "description": "Laravel wrapper around OAuth 1 & OAuth 2 libraries.",
            "homepage": "https://laravel.com",
            "keywords": [
                "laravel",
                "oauth"
            ],
            "time": "2020-02-04T15:30:01+00:00"
```
Trong file `composer.lock` sẽ chúng ta biết chi tiết rằng version mà chúng ta đang sử dụng là `4.3.2`. Và có nhiều thông tin về package mà đã cài đặt trong file này, như là về thời gian, provider, về các require để có thể cài đặt được package,...
# composer.lock được sinh ra khi nào ?
Khi cài đặt project laravel thì chúng ta sẽ có file `composer.lock`. Nếu như project của chúng ta chưa có file này chỉ có `composer.json` thì khi chạy command `composer íntall` thì file `composer.lock` sẽ được sinh ra.
# Tại sao composer.lock lại quan trọng ?
Khi bạn cài đặt thì composer sẽ ưu tiên `composer.lock` đầu tiên, so với file `composer.json`. Nếu file `lock` chưa tồn tại thì composer sẽ trỏ đến file `json` để cài đặt các dependencies và các version mới nhất
<br>
Giả định trong dự án của bạn không có file `composer.lock` hay repository của team bạn không commit file `composer.lock` lên VCS (version control system). Việc này sẽ ảnh hưởng như thế nào đến dự án ?
<br>
Khi có một thành viên mới tham gia dự án hay chúng ta auto deploy sử dụng VCS repository của bạn. Sau khi clone và thực hiện việc cài đặt các dependencies, thực hiện test một số chức năng bị fail hoặc có thể ứng dụng bị lỗi. Và sau đó thực hiện debug code xem lỗi xuất phát ở đâu. Và lỗi này không xuất phát từ việc code lỗi mà nó nằm ở version của dependencies mà chúng ta đã cài đặt. Vậy nguyên nhân của việc này là như thế nào ?
<br>
Việc chúng ta không file `composer.lock` trong dự án mà chỉ có file `composer.json` do đó khi cài đặt các dependencies thì `composer` sẽ dựa theo file `composer.json`. Ở trong file `composer.json` chúng ta cài đặt một package ví dụ là `package-A: 1.1.*` thì khi chúng ta chạy lệnh `composer install` thì composer sẽ cài đặt cho chúng ta version mới nhất của package đó (`1.1.8`). Nhưng ở trong dự án thì team lại sử dụng package A này ở version `1.1.2` dẫn tới việc test fail và có thể việc lỗi ở trên production
<br>
Vậy làm sao để khắc phục việc này ?
<br>
Đơn giản chúng ta commit file `composer.lock` lên VCS repository của team.
<br>
Và ở đây có nhiều bạn sẽ thắc mắc dựa vào file `composer.lock` thì có thể cài đặt đúng version của package mà cả team đang sử dụng.
<br>
Chúng ta để ý vào mỗi một package khi được cài đặt thì được sinh ra ở file composer.lock và sẽ kèm theo đó là một `reference` hay là commit id thực tế để khi việc cài đặt các `dependencies` sẽ đúng với version với môi trường mà cả team đang sử dụng.
<br>
Đó chính là tính năng quan trọng của `composer.lock`, đảm bảo việc đồng bộ version các `dependencies` giữa các member trong dự án và các môi trường
# Tips
Khi clone repository, để cài đăt các `dependencies` chúng ta nên sử dụng `composer install` thay vì sử dụng `composer update`. Vì `composer install` sẽ cài đặt đúng version của các `dependencies` mà chúng ta mong muốn và không xảy ra conflict. Chúng ta cần update một package nào thì chỉ nên update mỗi package đấy tránh việc sử dụng `composer update` ảnh hưởng đến các package khác trong dự án. 
# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về tầm quan trọng của `composer.lock` và vì sao chúng ta luôn phải commit file này vào source code dự án. Và việc sử dụng `composer install` sẽ an toàn hơn việc sử dụng `composer update`. Cảm ơn các bạn đã theo dõi bài viết <3