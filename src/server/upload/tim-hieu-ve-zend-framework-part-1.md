Zend Framework được giới thiệu là một framework PHP phổ biến với hơn 570 triệu cài đặt. Tuy vậy, sau 3 năm code Laravel mình mới biết đến em nó :joy: Cùng mình tìm hiểu framework này nhé

### 1. Init project
Yêu cầu: 
- Composer
- PHP 5.6+

```
$ composer create-project -s dev zendframework/skeleton-application MyProject
```

>> Nếu bạn gặp lỗi như vậy `Your requirements could not be resolved to an installable set of packages `, hãy thử chạy lệnh
>> ```
>> $ composer self-update --1
>> ```

Sau khi composer install một số package cần thiết cho project, bạn sẽ phải trả lời một vài câu hỏi để hoàn tất quá trình init
```
Do you want a minimal install (no optional packages)? Y/n
```
Đến bước này, bạn nên chọn Y (Yes), khi đó bạn sẽ chỉ cần trả lời 1 câu hỏi nữa là
```
Do you want to remove the existing VCS (.git, .svn..) history? [Y,n]?
```
Ngược lại, bạn sẽ phải trả lời một loạt câu hỏi về việc cài các thư viện hỗ trợ, như:
```
    Would you like to install the developer toolbar? y/N
    Would you like to install caching support? y/N
    Would you like to install database support (installs zend-db)? y/N
    Would you like to install forms support? y/N
    Would you like to install JSON de/serialization support? y/N
    Would you like to install logging support? y/N
    Would you like to install MVC-based console support? (We recommend migrating to zf-console, symfony/console, or Aura.CLI) y/N
    Would you like to install i18n support? y/N
    Would you like to install the official MVC plugins, including PRG support, identity, and flash messages? y/N
    Would you like to use the PSR-7 middleware dispatcher? y/N
    Would you like to install sessions support? y/N
    Would you like to install testing support? y/N
    Would you like to install MVC testing tools for testing support? y/N
    Would you like to install the zend-di integration for zend-servicemanager? y/N
```
Tất nhiên, nếu bạn cần thì có thể chọn n (No), nhưng mà nó khá mất thời gian. Bạn có thể required bất kì package nào sau khi init, nên chúng ta có thể thêm các package này sau nếu cần mà.

Giờ thì chạy thử xem chúng ta có gì nào
```
$ php -S 0.0.0.0:8080 -t public public/index.php
```

![](https://docs.zendframework.com/tutorials/images/user-guide.skeleton-application.hello-world.png)

### 2. Tìm hiểu cấu trúc thư mục

![](https://images.viblo.asia/8d557f96-8f17-4d25-8014-6634a1f08dd4.PNG)

- **config**: Thư mục chứa config của dự án, tại đây bạn có thể tạo các file config cho các môi trường khác nhau của project cũng như config các module thư viện cần sử dụng
- **data**: Thư mục chứa dữ liệu, ví dụ như các file sql cho database dự án
- **module**: Thư mục chứa các module chúng ta xây dựng để xử lý các tác vụ của project. Code của chúng ta sẽ tập trung ở thư mục này nha

    ![](https://images.viblo.asia/706c3cff-5d75-48eb-9de4-820855630ffb.PNG)

    Như bạn có thể thấy, module template của zend là Application, bao gồm `config, src, test, và view`, theo mô hình MVC. Mình sẽ nói chi tiết hơn về các thư mục này khi code nhé.

- **public**: Tương tự laravel, public của zend chứa các file asset như css, js, images,...

![](https://images.viblo.asia/03d06530-5c9d-480b-adf7-c998723b0d61.PNG)

### 3. Development mode
Trước khi bắt đầu, mình nghĩ chúng ta cần tìm hiểu qua về `development mode` của Zend. Đây là chế độ dành riêng cho quá trình phát triển ứng dụng.

Nếu quan sát cấu trúc thư mục, bạn sẽ thấy, ở thư mục config chúng ta có sẵn 2 files cho phép chúng ta config các cài đặt chung khi phát triển ứng dụng, bao gồm việc enable các modules để debug hoặc enable các lỗi hiển thị 

* config/development.config.php.dist
* config/autoload/development.local.php.dist

Khi chúng ta enable chế độ `development mode`, 2 files trên sẽ được copy vào 2 files tương ứng

- config/development.config.php
- config/autoload/development.local.php

Ngược lại, khi disable chế độ `development mode`, 2 files này sẽ bị xóa, chỉ còn lại 2 files `.dist`.

- Lệnh enable
```
$ composer development-enable
```
- Lệnh disable
```
$ composer development-disable
```
- Lệnh kiểm tra chế độ hiện tại
```
$ composer development-status
```

>> Lưu ý: Không bao giờ được enable `development mode` trên production.

### 4. Kết luận
Với một người quen code Laravel như mình thì mình thích sự thuận tiện về document của Laravel hơn Zend. Thực sự yêu Laravel ở điểm này. Tuy nhiên, sự khó hiểu của Zend cũng là một điều thú vị, một flow mới và những các xử lý mới có thể sẽ cho chúng ta những góc nhìn khác và những kinh nghiệm hữu ích. Nên ngại gì mà không thử nhỉ ;)

Ở bài viết tiếp theo, mình sẽ hướng dẫn mọi người tạo 1 trang web với chức năng CRUD cơ bản nhé. Giờ thì cảm ơn và tạm biệt. Hẹn gặp lại bạn ở bài viết tiếp theo!

Tài liệu tham khảo

[Zend Framework Tutorials](https://docs.zendframework.com/tutorials/getting-started)