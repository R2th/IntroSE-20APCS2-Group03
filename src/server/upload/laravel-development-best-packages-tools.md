Bản gốc: [Laravel 開発を楽しくするパッケージ＆ツール](https://qiita.com/ucan-lab/items/9bed7aeb7d165bc26b2d)

Trong bài viết này, xin phép giới thiệu đến các bạn những package và tool thường được sử dụng giúp cho quá trình phát triển Laravel trở nên dễ dàng, thú vị hơn.

Các nội dung chia sẻ ở đây có thể chưa hoàn toàn đầy đủ, rất mong nhận được các ý kiến đóng góp bổ sung.

## Nguồn tham khảo

- https://twitter.com/laravelphp

- https://twitter.com/laravelnews

- https://laravel-news.com

- https://github.com/chiraggude/awesome-laravel

- https://github.com/TimothyDJones/awesome-laravel

## Standard

Dưới đây là các packages được tích hợp trong Laravel tiêu chuẩn.

### briannesbitt/Carbon

https://github.com/briannesbitt/carbon

Đây là gói mở rộng DateTime của PHP được tích hợp trong Laravel tiêu chuẩn, thông qua đó, thao tác với DateTime trở nên dễ dàng và thuận tiện hơn rất nhiều.

Cách sử dụng cũng được mô tả rất chi tiết trong trang chủ của Carbon, các bạn có thể tham khảo thêm nhé.

https://carbon.nesbot.com

### laravel/tinker

https://github.com/laravel/tinker

```
$ php artisan tinker
```
Đây là command cho phép thực thi code Laravel được tích hợp trong Laravel tiêu chuẩn.

Rất dễ để thử code Laravel, các bạn đừng quên sử dụng command này nhé.

### JeffreyWay/laravel-mix

https://github.com/JeffreyWay/laravel-mix

Đây là một Wrapper package của Webpack được tích hợp trong Laravel tiêu chuẩn.

Với Webpack, các cài đặt phức tạp nhất cũng được mô tả một cách đơn giản, ngắn gọn bằng Laravel Mix.

## IDE

### barryvdh/laravel-ide-helper

https://github.com/barryvdh/laravel-ide-helper

Sau khi chạy lệnh generate ide-helper, file idehelper.php sẽ được sinh ra với thuộc tính Facade và EloquentModel.

Theo đánh giá cá nhân, đây là package bắt buộc nên dùng khi phát triển Laravel.

## Debug

### barryvdh/laravel-debugbar

![](https://images.viblo.asia/461260f5-5f81-4f8f-8157-79dd85bfc191.PNG)

https://github.com/barryvdh/laravel-debugbar

Đây là package hiển thị debug bar chứa thông tin debug ở ngay phía dưới cùng màn hình.

Bạn có thể tham khảo rất nhiều các thông tin như query/session thực thi SQL, log v.v. mà không cần viết code debug.

Package này không được sử dụng trong phát triển API, nhưng chắc chắn là một công cụ tốt để phát triển màn hình bằng Blade.

### laravel/telescope

https://github.com/laravel/telescope

![](https://images.viblo.asia/5222e5c7-c31d-478b-95b3-1bf98ed13cc4.png)

Đây là package dùng để quản lý thông tin debug, có thể nói là cặp đôi với laravel-debugbar mà tôi đã giới thiệu trên này.

Package này rất hữu ích trong việc phát triển API, thông qua đó có thể confirm được log, log thực thi SQL mà không cần tạo code debug.

### beyondcode/laravel-dump-server

![](https://images.viblo.asia/37e740cf-35f5-482d-a7ff-c97f459c045a.gif)

https://github.com/beyondcode/laravel-dump-server

Đây là tool dùng để output kết quả dump()  ra console, rất thuận tiện vì có thể nhìn vào màn hình hiển thị trên trình duyệt để confirm kết quả dump() trên console.

Trước đây, package này được tích hợp trong Laravel tiêu chuẩn, nhưng hiện đã tạm dừng hoạt động ở bản Laravel 5.9 và xóa khỏi site chính thức.

https://github.com/laravel/laravel/pull/5052/commits/f053116c5680e77c3a6c73afd193984a17ea482d

Trên Laravel 7, package này hoạt động bình thường, rất tiện lợi nên các bạn đừng quên sử dụng nhé.

## Test

### laravel/dusk

https://github.com/laravel/dusk

Đây là package cho phép test tự động Browser. 

Tài liệu chính thức:  https://laravel.com/docs/7.x/dusk

### Laravel TestTools

https://chrome.google.com/webstore/detail/laravel-testtools/ddieaepnbjhgcbddafciempnibnfnakl

Đây là chức năng mở rộng Chrome cho phép sinh ra mã test trên Browser.


### mpociot/laravel-test-factory-helper

https://github.com/mpociot/laravel-test-factory-helper

Đây là package sinh ra model factory từ model hiện tại, rất dễ dàng để tạo data test.

## Code quality

### nunomaduro/phpinsights

![](https://images.viblo.asia/4524aaa8-143a-47e0-92d7-2dd87db3e16b.png)

https://github.com/nunomaduro/phpinsights

Đây là package cho phép check độ tin cậy, độ đơn giản của code nhằm nâng cao chất lượng code.

Site chính thức: https://phpinsights.com

## Database

### ucan-lab/laravel-dacapo

https://github.com/ucan-lab/laravel-dacapo

Đây là package hỗ trợ việc tạo migration cho Laravel, thông qua đó, có thể mô tả một cách ngắn gọn và đơn giản cấu trúc table bằng YAML.

## Mail

### Qoraiche/laravel-mail-editor

![](https://images.viblo.asia/f49ad03b-cf6d-48bc-aeaa-5474954f58af.png)

https://github.com/Qoraiche/laravel-mail-editor

Đây là package cho phép edit nội dung mail bằng GUI.

Site chính thức : https://maileclipse.io

Laravel News: https://laravel-news.com/maileclipse-laravel-mail-editor-package

Video demo:  https://youtu.be/QFgEGNBY3FI

## Aspect

### ytake/Laravel-Aspect

https://github.com/ytake/Laravel-Aspect

Những cái không thể phân tách chỉ bằng Object-Oriented (hướng đối tượng) thì hoàn toàn có thể phân tách bằng Laravel Aspect này.

## CI

### StyleCI

https://styleci.io

Là CI để check coding style.

Pull request được tự động tạo ra, developer chỉ đơn giản cần merge và import là đã có thể định dạng được code rồi.

## Monitoring

### getsentry/sentry-laravel

https://github.com/getsentry/sentry-laravel

Là server giám sát lỗi, dùng để quản lý các exception phát sinh.

Site chính thức : https://sentry.io/welcome