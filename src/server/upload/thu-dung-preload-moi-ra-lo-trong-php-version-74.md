## Preload là gì.
Chào các bạn, nếu các bạn là một PHP developer giống như mình thì chắc là các bạn sẽ biết là php vừa release version 7.4 với một số tính năng mới. Preload là một tính năng mới được thêm vào PHP version 7.4, Một tính năng được cho là sẽ cải thiện đang kể hiệu suất cho app PHP của bạn.

Preload hoạt động như sau:
1. Chúng ta phải custom một file script để chỉ định các file chúng ta muốn preload.
2. Script chúng ta vừa custom ở trên sẽ được thực hiện khi service PHP khởi động.
3. Tất cả các file đã preload sẽ được lưu trữ trên RAM và sử dụng để xử lý các request tới.
4. Khi bạn thay đổi một file đã được preload thì thay đổi đó sẽ không được apply cho đến khi bạn restart lại service PHP.

## Ví dụ về preload
**Cài đặt php7.4-fpm và nginx:** Các bạn tham khảo [tại đây](https://computingforgeeks.com/how-to-install-php-on-ubuntu/)
**Config php7.4-fpm:** Mở file /etc/php/7.4/fpm/php.ini và sữa lại các config sau:
```
...
opcache.preload=/var/www/php74/preload.php # Ở file này chúng ta chỉ định những file nào được preload
...
opcache.preload_user=www-data
...
...
```
**Config nginx:**  Edit lại nội dung file /etc/nginx/sites-enabled/default thành:
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/php74;

    index index.php index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
            try_files $uri $uri/ =404;
    }
    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_read_timeout 600;
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    }
}
```
**Tạo thư mục chứa code muốn preload:** Trong ví dụ nào tôi tạo một thư mục có tên php74 trong thư mục /etc/www/. Trong thư mục php74 có cấu trúc như sau:
```
 A.php
 B.php
index.php
preload.php
```
Nội dung của các file như sau:
```
//A.php
<? php  
class  A 
{ 
    public  function  name () :  string 
    { 
        return  'Hello PHP 7.4' ; 
    } 
}
```
```
//B.php
<? php
require_on('A.php')
class  B  extends  A  {}
```
```
//index.php
<? php
require_on('B.php')
$ b  =  new  B ;

echo  $ b- > name ()  .  '<BR>' ;
```
Tại đây nếu bạn reload nginx và truy cập từ trình duyệt thì sẽ nhận được lỗi "B does not know the class"
Edit lại nội dung file preload.php thành:
```
//preload.php
<? php

$ files  =  glob ( __DIR__  .  '/**.php' );

foreach  ( $ files  as  $ file )  { 
    opcache_compile_file ( $ file ); 
}
```
Tiếp theo chúng ta reload lại service php7.4-fpm và nginx. Truy cập vào http://localhost sẽ nhận được kết quả là:
![](https://images.viblo.asia/1ad2bc98-a5d4-442c-932f-a16927d95e17.png)

Sau khi restart  php7.4-fpm, theo chỉ định trong file preload.php thì các thư mục php74 sẽ được load vào RAM và sẽ được thực thi khi có request tới.
Nhưng file đã được preload load thì khi bạn edit lại thì những thay đổi mới sẽ không được apply cho đến khi bạn khởi động lại service php7.4-fpm.
Bây giờ chúng ta hãy thử thay đổi nội dung file A.php thành
```
<?php  
class  A 
{ 
    public  function  name () :  string 
    { 
        return  'I HAVE BEEN CHANGED' ; 
    } 
}
```
Sau đó reload lại browser thì trình duyệt vẫn hiện là 'Hello PHP 7.4' => những thay đỏi của ta trong file A.php chưa được apply.
Nếu bay giờ chúng ta  restart lại php7.4-fpm thì những thay đỗi của chúng ta sẽ được apply.
![](https://images.viblo.asia/67b6601e-f5e6-44ed-833b-fe457b3f8b1b.png)
## Performance
Như đã nói ở phần đầu, việc sự dụng preload sẽ giúp cải thiện hiệu suất của app một cách đáng kể. Bạn có thể tham khảo kết quả benchmarks khi dùng preload của Ben Morel [tại đây](https://github.com/composer/composer/issues/7777#issuecomment-440268416)
Theo chia sẽ của Ben Morel , bạn có thể quyết định chỉ tải trước "hot class" - các lớp thường được sử dụng trong codebase của bạn. Điểm chuẩn của Ben Morel cho thấy rằng chỉ tải khoảng 100 hot class, thực sự mang lại hiệu suất tốt hơn so với tải trước mọi thứ. Việc preload tất cả các class chỉ làm tăng hiệu suất thêm 13%, trong khi việc preoad các hot class thì hiệu suất  tăng thêm17%.

Như vậy qua bài viết mình đã giới thiệu và ví dụ về preload trong PHP version 7.4, mong là bài viết của mình mang lại thông tin hữu ích với các bạn.