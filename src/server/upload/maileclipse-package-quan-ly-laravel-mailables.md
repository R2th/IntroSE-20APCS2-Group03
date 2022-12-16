MailEclipse là một package khá hay giúp bạn tạo và quản lý mailables cho ứng dụng Laravel của bạn một cách dễ dàng và trực quan thông qua web UI. Chỉ cần thao tác trên website, bạn có thể quản lý mailables mà không cần sử dụng đến command line, tạo mail template sử dụng WYSIWYG editor và nhiều tính năng khác.

## Tính năng
* Tạo mailables không cần sử command line
* Xem thử/chỉnh sửa tất cả mailables của bạn ở cùng một nơi.
* Hổ trợ templates (trên 20 mail temaplate có sẵn)
* WYSIWYG Email HTML/Markdown editor.
* Sử dụng đơn giản, thích hợp với cả những người mới bắt đầu sử dụng Laravel
* và nhiều hơn nữa :#)

## Cài đặt
Thông qua Composer:
```
$ composer require qoraiche/laravel-mail-editor
```

Sau đó publish file cấu hình và assets:
```
php artisan vendor:publish --provider="qoraiche\mailEclipse\mailEclipseServiceProvider"
```

## Sử dụng
Bạn có thể xem video hướng dẫn dưới đây để dễ dàng sử dụng hơn:

{@embed: https://www.youtube.com/watch?v=QFgEGNBY3FI}

Sau khi cài đặt xong, truy cập vào đường dẫn `domain/maileclipse` để bắt đầu sử dụng thôi, bạn có thể tùy chỉnh lại đường dẫn này trong file config bất cứ lúc nào.

## Một số hình ảnh
![](https://camo.githubusercontent.com/b0a91e41fa20be371e9fd5de5e947604b201ec05/68747470733a2f2f692e696d6775722e636f6d2f635744356f64682e706e67)
<p align="center">Danh sách mailables</p>

![](https://camo.githubusercontent.com/552d4721c785e92ec865968341d60b61cf419fcc/68747470733a2f2f692e696d6775722e636f6d2f41694d457459302e706e67)
<p align="center">Tạo mới mailables</p>

![](https://camo.githubusercontent.com/03abf602df469616b923aa6929fa0317fb56635c/68747470733a2f2f692e696d6775722e636f6d2f736971785756612e706e67)
<p align="center">Danh sách mail template</p>

![](https://camo.githubusercontent.com/1db3f0d1342a6e66a321e3c20a29e1d43ce3acc7/68747470733a2f2f692e696d6775722e636f6d2f384f51724549532e706e67)
<p align="center">Chỉnh sửa mail template</p>

## Related:
* https://github.com/Qoraiche/laravel-mail-editor