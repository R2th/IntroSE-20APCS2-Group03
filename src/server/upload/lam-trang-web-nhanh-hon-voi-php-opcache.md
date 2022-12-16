![](https://images.viblo.asia/42d19dca-bbc1-4a1b-ae50-3c9e77cc8bc9.png)

# OPcache là gì?
Mỗi khi bạn thực thi một tập lệnh PHP, tập lệnh cần được biên dịch thành bytecode. OPcache tận dụng bộ đệm cho bytecode này, vì vậy lần sau nếu vẫn là tập lệnh đó, nó không phải biên dịch lại lần nữa. Điều này có thể tiết kiệm một số thời gian thực hiện quý giá và do đó làm cho ứng dụng của bạn nhanh hơn (và có thể tiết kiệm một số chi phí máy chủ).

# Những con số biết nói
Trước tiên chúng ta cần phải biết rõ về loại tối ưu mà chúng ta đang đề cập đến. Mặc dù cải thiện hiệu suất phụ thuộc nhiều vào cấu hình ứng dụng và máy chủ của bạn, tuy nhiên bên cạnh đó ta có thể dùng quick benchmark cho ví dụ lần này.

Vì vậy, mình đã tạo ra một DO droplet với 1 CPU, 1Gb RAM và chạy Apache Benchmark. Mình đã sử dụng luôn trang Wellcome mặc định của Laravel và để benchmark chạy trong vòng 1 phút với 10 request cùng một lúc:
```
OPcache disabled: 10.18 requests per second
```

Không quá chậm cho một máy chủ nhỏ như vậy, nhưng ta vẫn có thể làm nó nhanh hơn:

```
Enabled with default values: 34.52 requests per second
```

Bắt đầu có sự khác biệt, thử thêm lần nữa xem có nhanh hơn nữa không.

```
Enabled with optimized values: 42.53 requests per second
```

Giờ thì khác biệt chưa? =)))

# Làm sao để sử dụng nó?
***Trước khi làm bất cứ điều gì, mình khuyên nên kiểm tra mọi thứ trước tiên trên môi trường development / staging trước khi thực hiện trên môi trường production.***

Đầu tiên, ta cần đảm bảo OPcache được cài đặt trên máy chủ. Nếu bạn có cài đặt lại cấu hình máy chủ gần đây, có thể OPcache đã được cài đặt, vì nó đã được đưa vào sử dụng phổ biến hơn. Nếu bạn sử dụng Laravel Forge, nó đã được cài đặt và kích hoạt (ít nhất là trên các phiên bản gần đây).

Để kiểm tra xem OPcache đã được cài đặt chưa, ta chỉ cần chạy:
```
<?php

phpinfo();
```

Bạn sẽ thấy tất cả các thông tin về cài đặt môi trường cho PHP của bạn. Nếu bạn thấy 'OPcache' thì tức là nó đã được cài đặt.

> Nếu bạn chưa cài đặt, hãy tìm kiếm hướng dẫn cài đặt trên mạng hoặc forum / support của OPcache.

Bây giờ ta đã chắc chắn nó đã được cài đặt, ta có thể điều chỉnh cấu hình để tận dụng tối đa OPcache.

*> Trên Laravel forge ta có thể chọn `files -> Edit PHP FPM configuration` trên server’s overview để mở file PHP configuration*

*> Trên môi trường khác, bạn phải tìm tệp có đuôi .ini. File này có trong php-info mà ta vừa tạo trong 'Loaded Configuration File'. Mở nó với quyền root.*

Bây giờ ta có thể thay đổi một số giá trị, mình sẽ hướng dẫn thay đổi những cái quan trọng nhất. Nhưng phải viết ở dưới phần [opcache] trong tệp ini.

```
opcache.enable=1
```

*Cái này là đầu tiên, để bật OPcache.*

```
opcache.memory_consumption=512
```

*Phân vùng OPcache, ta muốn gán bao nhiêu Megabyte cho OPcache thì tùy thuộc vào nhu cầu của bạn. Ở đây mình để 512, nhưng mặc định sẽ là 64*

```
opcache.interned_strings_buffer=64
```

*Bạn muốn gán bao nhiêu Megabyte cho các string được thực hiện. Giá trị mặc định là 16.*

```
opcache.max_accelerated_files=32531
```

*Có bao nhiêu tập lệnh có thể cache? Cố gắng chọn số càng gần càng tốt (hoặc nhiều hơn) số lượng file cần cache trong dự án. Chọn 1 trong các số này: 3907, 7963, 16229, 32531, 65407, 130987 (xem giải thích ở docs: http://php.net/manual/en/opcache.configuration.php#ini.opcache.max-accelerated-files)*

```
opcache.validate_timestamps=0
```

*Điều này sẽ xác nhận lại đoạn script. Nếu ta đặt là 0 (hiệu suất tốt nhất), ta cần xóa thủ công OPcache mỗi khi code PHP thay đổi. Nếu ta không muốn tự xóa nó, ta có thể đặt cài đặt này 1 và định cấu hình khoảng thời gian xác nhận lại `opcache.revalidate_freq`, điều này sẽ khiến ta mất một số hiệu suất vì nó cần kiểm tra các thay đổi sau mỗi x giây.*

```
opcache.save_comments=1
```

*Điều này sẽ lưu giữ các comments trong đoạn script, mình khuyên nên duy trì tính năng này vì một số thư viện phụ thuộc vào nó và mình không thể tìm thấy bất kỳ lợi ích nào từ việc vô hiệu hóa nó (ngoại trừ việc lưu một vài byte RAM).*

```
opcache.fast_shutdown=0
```

*Fast shutdown sẽ cung cấp một cơ chế nhanh hơn để xóa bộ nhớ. Tuy nhiên, trong Benchmarks thì chậm hơn một chút, nó có thể mang lại một số cải tiến cho ứng dụng của mình.*

Tổng hợp lại các câu lệnh ở trên của mình thì được 1 đoạn như thế này:
```
opcache.enable=1
opcache.memory_consumption=512
opcache.interned_strings_buffer=64
opcache.max_accelerated_files=32531
opcache.validate_timestamps=0
opcache.save_comments=1
opcache.fast_shutdown=0
```

Test các giá trị khác tùy thuộc vào kích thước ứng dụng và tài nguyên của máy chủ của bạn.
Bây giờ save và restart server. Web của bạn sẽ nhanh hơn rất nhiều!

# Setup với Laravel
Như đã nói ở trên, ta cần xóa OPcache theo cách thủ công mỗi khi chúng ta thay đổi code PHP. Mình biết một package cung cấp các lệnh Artisan để làm việc với OPcache.

Để cài đặt, hãy xem hướng dẫn trong repo này: github.com/appstract/laravel-opcache

Tiếp theo, thêm command này vào cuối tập lệnh deploy script (mình đặt nó ngay sau khi artisan up) `php artisan opcache:clear`

Package này cũng chứa một số helpful tools khác cho OPcache, có thể đọc thêm về nó trên trang [Github](https://github.com/appstract/laravel-opcache?source=post_page---------------------------).

。。。

Mình hy vọng bài viết này hữu ích và trang web của bạn đã nhanh hơn trước đó rất nhiều.

# Tham khảo
* https://github.com/appstract/laravel-opcache?source=post_page---------------------------
* https://php.net/manual/en/opcache.configuration.php#ini.opcache.max-accelerated-files
* https://medium.com/appstract/make-your-laravel-app-fly-with-php-opcache-9948db2a5f93