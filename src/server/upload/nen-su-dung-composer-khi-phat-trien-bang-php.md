Tôi tự hỏi rằng sẽ ra sao khi chỉ có namespace và composer, có khó khăn gì không ?

Sau đây, tôi sẽ tóm tắt quá trình phát triển sử dụng composer như một tiêu chuẩn trong thực tế như một sự biết ơn dành cho composer.

# composer
## composer : Dependency Management
Composer là một Dependency Management trong PHP, công cụ quản lý các thư viện mà project Php của bạn sử dụng...
Chúng ta thử xem xét các tình huống dưới đây :

Tôi muốn sử dụng Library A khá là hữu ích, nhưng thư viện A này lại cần thư viện B và C. Ngoài ra còn có thư viện D và E ...

Vậy rất khó khăn khi phụ thuộc vào các library trên.
Tôi muốn sử dụng thư viện A nhưng tôi lại phải cần các thư viện khác cần thiết cho việc sử dụng A.

Nhưng nếu bạn có composer thì sao ?
Tôi muốn sử dụng library A thì, A sẽ tham chiếu các thư viện cần thiết và download chúng cùng lúc.

```
composer require A
```
Tất nhiên chúng phải là các Library có hỗ trợ composer.

## Ưu điểm của composer
### Giữ cho Repository sạch sẽ 
Bản thân thôi không thích code của ai đó ngoài tôi hoặc Project Member được ghi vào repository 
Khi đó chúng tôi sẽ có cảm giác không tốt do repository đó không phải là thành quả chúng tôi tạo nên.
Nhưng, khi quản lý các library mà bạn sử dụng bằng composer, thì mọi thứ sẽ khác đi, bạn sẽ không phải lo lắng nữa.
Những library được install bằng composer sẽ được đưa vào directory `vendor`, vì vậy bạn chỉ cần ignore vendor directory là được.
Dependency Management của những library đó sẽ được mô tả trong `composer.json` được tạo ra riêng biệt, và repository sẽ được giữ sạch sẽ ngay cả với lượng library với dung lượng lớn.

### share composer.lock
Bằng cách share `composer.json` thì các member khác có thể loại bỏ library đã được quản lý bằng composer. Chỉ cần thực hiện install composer trên directory có chứa `composer.json` là đã có các library cần thiết cho việc phát triển.

Tại đây, composer sẽ lặp đi lặp lại việc : check từng library, kiểm tra các library phụ thuộc, cho nên có thể xử lý có thể bị chậm.
Nhưng, trên thực tế khi install library sử dụng composer, đồng thời sẽ sinh ra file `composer.lock`.
composer.lock sẽ lấy được library có trong `composer.json` nhưng cũng sẽ tổng hợp những file nào được xóa trong thực tế.
Nói cách khác, với `composer.lock` có thể install library với file , version giống như Member đã thực hiện install mà không cần check từng thư viện phụ thuộc.

### Có thể thực hiện autoload
Trong PHP, cơ chế Namespace và autoload rất mạnh và thay đổi lớn hiệu quả phát triển

Nếu sử dụng composer để install library, sẽ sinh ra file `vendor/autoload.php`. Bằng cách required `vendor/autoload.php` có thể setting sao cho autoload library có trong `vendor`.
Thậm chí, có thể thêm setting vào autoload bằng cách thêm ghi chú trong `composer.json`
```
    "autoload": {
        "psr-4": {
            "Niisan\\": "src/"
        }
    },
```    

Tại setting này : sẽ thực hiện autoload namespace bắt đầu với `Niisan\ ` với tiêu chuẩn psr-4 trong folder src/
Ví dụ : 
Đối với name `Niisan\Model\Class`, sẽ thực hiện autoload `src/model/Class.php`
Trong trường hợp thêm setting autoload, sẽ thực hiện bằng : `composer dump-autoload`, và thêm setting vào `vendor/autoload.php`

## Chuẩn bị môi trường với điều kiện tiền đề sử dụng composer
Hiện nay mọi người đều sử dụng composer, nhưng nó không được đính kèm theo PHP.
Trường hợp dự định phát triển có sử dụng composer sẽ rất thuận tiện nếu có môi trường đã được instal sẵn composer
Đối với tôi, tôi build trước image trên docker dựa theo Dockerfile dưới đây:
```
FROM php:latest
MAINTAINER niisan-tokyo <***@****>

#php : Khai báo những gì cần install
RUN apt-get update && apt-get install -y unzip git && \
    docker-php-ext-install pdo_mysql mysqli mbstring

RUN mkdir /var/php -p
WORKDIR /var/php

#composer : thêm composer(Tại row thứ 2 : Hash sẽ phụ thuộc vào version, nên set version mới nhất)
#=> https://composer.github.io/pubkeys.html
RUN php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php ;\
php -r "if (hash_file('SHA384', 'composer-setup.php') === 'a52be7b8724e47499b039d53415953cc3d5b459b9d9c0308301f867921c19efc623b81dfef8fc2be194a5cf56945d223') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" ;\
php composer-setup.php --filename=composer;\
php -r "unlink('composer-setup.php');" ;\
mv composer /usr/local/bin/composer

CMD /bin/bash
```

# composer - command
Việc phát triển sử dụng composer, với step rất rõ ràng.
Sử dụng `composer init` hoặc `composer create-project` để tạo project.
Sau đó sử dụng `composer require` để thêm các package cần thiết 
Loại bỏ các package không cần thiết bằng `composer remove`, nếu thêm setting namespace trong application thì có thể autoload bằng `composer dump-autoload`

Dưới đây là các comman thông dụng 

## init
```
composer init
```


## create-project
Một số Project có sẵn template, dưới đây là một số framework : 
laravel, cake3, bearsunday, aura...

T/h sử dụng laravel, sử dụng comman dưới đây để tạo project 
```
composer create-project --prefer-dist laravel/laravel blog
```
## require
```
composer require <package>[:<tag>]
```
Sử dụng composer để install library và package 
Thông tin các library đã được install sẽ được ghi chú tại : `composer.json`, thông tin đã install library nào sẽ được ghi chú tại : `composer.lock`
Nếu đã sử dụng composer, chúng ta nên sử dụng `composer require`

Nếu thực hiện add thêm --dev(option), có thể install các package chuyên dùng cho môi trường DEV.
Trong `composer.json`: sẽ thêm vào hạng mục : require-dev

    
## install
```
composer install
```
Thực hiện install package theo nội dung mô tả trong `composer.json` hoặc `composer.lock`
Project member có thể sử dụng command này để giải quyết các phụ thuộc của package 
Nếu thực hiện update package, chỉ cần chạy lại command này 
    

## update
```
composer update
```
Bỏ qua `composer.lock`, thực hiện install package theo `composer.json`
Sử dụng comman này khi muốn update tất cả các library hiện tại

    
## remove
```
composer remove <package>
```
Ngược lại với require, command này thực hiện deleta package


## dump-autoload
```
composer dump-autoload
```
Command này thực hiện giải phóng namespace đã đề cập trước đó 
Nếu thực hiện thêm `autoload` vào `composer.json`, nên sử dụng command này để renew autoload

# Tóm tắt
Composer là một Dependency Management trong PHP, công cụ quản lý các thư viện mà project Php của bạn sử dụng. Một cách chính xác hơn Composer quản lý sự phụ thuộc các tài nguyên trong dự án. Nó cho phép khai báo các thư viện mà dự án của bạn sử dụng, composer sẽ tự động tải code của các thư viện. Nó tạo ra các file cần thiết vào project của bạn, và cập nhật các thư viện khi có phiên bản mới.

Nguồn : https://qiita.com/niisan-tokyo/items/8cccec88d45f38171c94