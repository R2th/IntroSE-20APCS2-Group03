# Mở đầu 
Trong bài viết trước, tôi đã đề cập đến những vấn đề vô cùng nan giải trong việc quản lý mã nguồn PHP mà mọi lập trình viên đều có thể gặp phải. Nhưng kể từ khi Composer ra đời, những vấn đề này đã thực sự được giải quyết một cách triệt để. Những lập trình viên PHP giờ đây có thể thoải mái sử dụng những thư viện để phát triển dự án của mình mà không một chút lo lắng. Để có cái nhìn rõ hơn, tôi sẽ cùng các bạn đi vào tìm hiểu xem Composer đã thực sự giải quyết những vấn đề của chúng ta như thế nào.

Composer thực sự đã quá phổ biến và các bạn cũng có thể dễ dàng tìm hiểu thông tin về nó trong những bài viết trên Internet. Do vậy, tôi sẽ không giới thiệu về những phần này nữa. Thay vào đó, các bạn hãy tự tìm hiểu sơ lược và cài đặt Composer cho máy tính cá nhân của mình để bắt đầu.

Để chắc chắn rằng chúng ta đã cài đặt Composer thành công, hãy chạy câu lệnh sau:
```bash
$ composer --version
Composer version 1.6.3 2018-01-31 16:28:17
```
Dưới đây, tôi sử dụng hệ điều hành Ubuntu 16.04. Do vậy, các thao tác cũng như các lệnh đều được thức thi trên terminal của hệ điều hành này.

# Cài đặt
Trước tiên, tôi tạo ra một thư mục tên composer-demo và di chuyển vào trong thư mục này.

Thứ hai, tôi sử dụng câu lệnh **composer init** để tạo ra tệp composer.json - nơi lưu trữ thông tin các thư viện sẽ được sử dụng. Lệnh này sẽ tương tác và yêu cần bạn nhập một vài thông số nhưng chỉ "Package name" là bắt buộc. Do vậy, tôi chỉ cần nhập package name và nhấn "enter" để bỏ qua các thông số còn lại. Cuối cùng, tôi có một tệp composer.json đơn giản trông như thế này:

```json
{
    "name": "xuanquynh/composer-demo",
    "authors": [
        {
            "name": "Nguyen Xuan Quynh",
            "email": "nguyenxuanquynh2210vghy@gmail.com"
        }
    ],
    "require": {}
}
```

Tiếp theo, để tìm kiếm một thư viện nào đó, các bạn có thể truy cập vào trang [packagist.org](https://packagist.org). Còn với tôi, symfony/http-foundation là một lựa chọn tuyệt vời cho việc xử lý http request trong php nên tôi sẽ lấy thư viện này làm ví dụ. Tôi chạy lệnh **composer require "symfony/http-foundation:3.4.*"** để cài đặt thư viện này. Sau khi cài đặt xong, một thư mục có tên vendor xuất hiện trong thư mục hiện tại.

```bash
$ ls
composer.json  composer.lock  vendor
```

Lúc này, thư mục composer-demo/vendor/symfony/http-foundation chính là nơi chứa mã nguồn của thư viện mà tôi vừa cài đặt.

Để sử dụng thư viện này, tôi tạo ra một tệp composer-demo/index.php với nội dung sau:
```php
<?php

require 'vendor/autoload.php';

$request = Symfony\Component\HttpFoundation\Request::createFromGlobals();

var_dump(get_included_files());

var_dump($request);
```

Sau đó, tôi chạy lệnh **php -S localhost:8080** và ghé thăm trình duyệt để rõ kết quả. Mọi thứ hoạt động thật tuyệt vời. Bằng một phương thức nào đó, Composer đã tải thư viện mà tôi mong muốn, lưu nó trong thư mục vendro và đăng ký giúp tôi trong vendor/autoload.php. Tôi chỉ việc tận hưởng thành quả mà nó đem lại. Thay vì phải tự đi tìm mã nguồn, tải về và lưu trữ vào thư mục mình mong muốn, việc cài đặt thư viện giờ đây đã trở nên dễ dàng hơn rất nhiều đúng không nào?

Bây giờ, tôi muốn sử dụng thêm thư viện symfony/validator với phiên bản 3.4, tôi chỉ cần chạy lệnh **composer require "symfony/http-foundation:3.4.*"**. Sau khi cài đặt xong, tôi kiểm tra tệp composer.json thì thấy hai thư viện này đã được liệt kê trong phần require với phiên bản xác định.
```
{
    "name": "xuanquynh/composer-demo",
    "authors": [
        {
            "name": "Nguyen Xuan Quynh",
            "email": "nguyenxuanquynh2210vghy@gmail.com"
        }
    ],
    "require": {
        "symfony/http-foundation": "3.4.*",
        "symfony/validator": "3.4.*"
    }
}
```

=> 3 vấn đề trong cài đặt thư viện đã được giải quyết:
+ **Không lo phải thêm thư viện mới:** Tôi có thể thoải mái thêm một thư viện mới bằng cách chạy lệnh **composer require packagename:<version>** mà không cần bận thêm đến việc tải nó.

+ **Không lo tải tệp thừa trong request**: Sau khi cài đặt xong symfony/validator mà chưa sử dụng, tôi chạy lại lệnh **php -S localhost:8080** và xem lại trình duyệt thì thấy không có tệp nào của thư viện symfony/validator được tải vào lúc này. Rõ ràng, những tệp nào không được sử dụng, không cần thiết trong một request đã không được tải.

+ **Không lo các thư viện yêu cầu chéo**: Các bạn có thể xem trên trang chi tiết [symfony/http-foundation](https://packagist.org/packages/symfony/http-foundation) và [symfony/validator](https://packagist.org/packages/symfony/validator), hai thư viện này đều yêu cầu một thư viện khác là [symfony/polyfill-mbstring](https://packagist.org/packages/symfony/polyfill-mbstring). Nhưng khi vào trong composer-demo/vendor/symfony, tôi chỉ thấy có một thư mục polyfill-mbstring chứa mã nguồn. Có thể thấy các thư viện đều chỉ được cài đặt một lần cho dù nó được yêu cầu bởi hai hay nhiều thư viện khác nhau.

# Cập nhật, nâng cấp
Có thể thấy, cài đặt thư viện PHP với Composer đã được đơn giản hóa hơn rất nhiều so với việc phải thao tác thủ công. Vậy còn với việc cập nhật và nâng cấp thì như thế nào? Xét trong ví dụ trên, sau một thời gian, tôi thấy thư viện symfony/http-foundation phiên bản 4.0 đã được release và có nhiều phần thật tiện ích, tôi quyết định dùng nâng cấp. Và như vậy, tôi chỉ cần chạy một lệnh  **composer require symfony/http-foundation:4.0** là đã có được phiên bản mình mong muốn. Các bạn có thể thể thử và thấy thông báo trên terminal:
```bash
Updating symfony/http-foundation (v3.4.8 => v4.0.0): Loading from cache
Updating symfony/validator (v3.4.8 => v4.0.0): Loading from cache
```
Sau đó một thời gian, symfony/http-foundation phiên bản 4.0 có xuất hiện một lỗi bảo mật. Vậy là tôi tìm cách để quay lại phiên bản 3.4. Chắc hẳn các bạn đá biết rõ việc cần làm rồi đấy. Sau khi chạy lệnh xong, trên terminal sẽ thông báo:
```bash
Updating symfony/http-foundation (v4.0.0 => v3.4.8): Loading from cache
```
Các bạn có thể thấy rất rõ rằng, việc cập nhật và nâng cấp phiên bản đã được thu gọn vào trong một câu lệnh thật đơn giản. Dĩ nhiên, nhiều khi để nâng cấp, chúng ta vẫn cần lưu ý và làm thêm những việc quan trọng khác mà những tác giả có đề cập trong thư viện của họ. Nhưng nhìn chung, Composer đã làm cho chúng ta những công việc khó khăn nhất.

Và nếu bạn là người luôn thích cái mới, chỉ với **composer update** mỗi ngày, bạn luôn sở hữu những phiên bản mới nhất của những thư viện đã được cài đặt. :D

2 vấn đề trong việc cập nhật và nâng cấp thư viện đã được giải quyết:
+ **Không lo nhiều thao tác khó**: Chỉ cần lựa chọn phiên bản cần thiết, chạy một lệnh đơn giản, thư viện sẽ được cập nhật với phiên bản mong muốn.
+ **Không lo xảy ra lỗi phát sinh**: Những thư viện được tổ chức khá rõ ràng và được lưu trữ trong những thư mục tách biệt. Không có chuyện bị thêm nhầm hoặc xoá nhầm tệp như khi làm thủ công. Vả lại, khi có chót thay đổi phiên bản mà gặp lỗi, tôi ngay lập tức có thể sử lại phiên bản trước đó.

# Xung đột
Những phần công việc rất khó khăn đã được Composer giải quyết khá gọn ghẽ đúng không nào? Như vậy, sau khi miệt mài code, tôi muốn kiểm tra kết quả bằng cách sử dụng thư viện phpunit. Tôi chạy lệnh **composer require phpunit/phpunit:5.1**, mộ số thông báo lỗi xuất hiện, quá trình cài đặt thất bại
```bash
$ composer require phpunit/phpunit:5.1
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Your requirements could not be resolved to an installable set of packages.

  Problem 1
    - phpunit/phpunit 5.1.0 conflicts with symfony/validator[v4.0.0].
    - phpunit/phpunit 5.1.0 conflicts with symfony/validator[v4.0.0].
    - phpunit/phpunit 5.1.0 conflicts with symfony/validator[v4.0.0].
    - Installation request for phpunit/phpunit 5.1 -> satisfiable by phpunit/phpunit[5.1.0].
    - Installation request for symfony/validator 4.0 -> satisfiable by symfony/validator[v4.0.0].


Installation failed, reverting ./composer.json to its original content.
```
Thông báo lỗi đã khá rõ ràng rồi đúng không nào, tôi ghé thăm [symfony/validator](https://packagist.org/packages/symfony/validator) và thấy rằng phần conflicts có một thông số phpunit/phpunit: <4.8.35|<5.4.3,>=5.0 mà 5.0 < 5.1 < 5.4.3. Do vậy việc xảy ra xung đột là không có gì lạ.

Bạn hãy tử tưởng tượng xem, nếu bạn mất cả buổi sáng để cài đặt thư viện một cách thủ công mà khi thực hiện xong, ta lại gặp xung đột thế này thì biết phải làm sao? Composer đã giúp chúng ta tránh được những trường hợp tồi tệ như thế này bằng cách thông báo lỗi ngay từ khi chuẩn bị cài đặt và nếu có vấn đề nó sẽ  reverting ./composer.json to its original content và dĩ nhiên là dự án của bạn vẫn an toàn, không chút vấn đề.

=> Vấn đề xung đột thư viện đã được giải quyết. Những xung đột có thể được phát hiện ngay trước khi quá trình cài đặt được diễn ra.

# Kết luận
Trong bài viết này, tôi không muốn đi sâu vào chi tiết cách sử dụng Composer với từng câu lệnh một. Thay vào đó, tôi cố gắng sử dụng những câu lệnh đơn giản nhất và tìm ra những ví dụ trực quan để giúp mọi người hiểu ra Composer đã giải quyết những vấn đề quản lý thư viện PHP như thế nào. Hơn thế nữa, tôi cũng hy vọng đây sẽ là bước đà tốt giúp nhiều bạn lập trình viên mới có cái nhìn tổng quan hơn về package management hay dependency manager chứ không riêng gì Composer.

Chúc các bạn học tập và làm việc vui vẻ!