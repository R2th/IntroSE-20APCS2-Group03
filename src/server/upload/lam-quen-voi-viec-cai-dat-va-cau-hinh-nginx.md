Ở [bài trước](https://viblo.asia/p/nginx-la-gi-1VgZvOXMlAw) mình có giới thiệu về Nginx. Nội dung bài viết hoàn toàn là lý thuyết để bản thân có cái nhìn tổng quan về việc Nginx có gì và làm được những gì. Vì vậy, hôm nay mình sẽ đi tìm hiểu cách cấu hình Nginx cho dự án của bạn. Mong rằng bài viết sẽ có ích đối với bạn.

# Cài đặt
Việc cài đặt Nginx từ nguồn cung cấp bao gồm các mô-đun của bên thứ ba giúp cho Nginx mạnh mẽ hơn nhiều. Nó cho phép chúng ta tùy chỉnh để phù hợp với nhu cầu của ứng dụng.

Sử dụng Debian để cài đặt.
```sh
sudo apt-get update
sudo apt-get install nginx
```
Cách để bạn có thể kiểm tra câu lệnh trên đã cài đặt Nginx thành công chính là chúng ta sử dụng command kiểm tra phiên bản :smiley: .
```sh
nginx -v
```
Kết quả
![](https://images.viblo.asia/8b95e339-2bdb-482a-abec-da66256035cc.png)
Webserver mà bạn vừa thực hiện cài đặt sẽ có thông tin cài đặt ở 
```sh
/etc/nginx/
```
Đây là các thư mục, tệp ở trong nó
![](https://images.viblo.asia/60ee7937-6bdb-4bf6-8ba4-5bdb6dd63528.png)

Như bạn thấy, ở trong này có khá nhiều thư mục và tệp. Tuy nhiên, ta chỉ cần đặc biệt chú ý đến `nginx.conf` và thư mục `sites-available`.

# Cấu hình
Mặc định tệp `nginx.conf` sẽ như sau:
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}


#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
# 
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}
```
Tệp được cấu trúc thành **Contexts**. Đầu tiên là **events context**, tiếp theo là **http context** và cuối cùng là 1 ví dụ để cấu hình mail. Với cấu trúc như trên cho phép một số lớp nâng cao cấu hình. Bởi vì trong mỗi context có thể có các context lồng nhau khác có thể kế thừa từ cha mẹ của chúng và nó cũng có khả năng ghi đè khi cần thiết. 

Nhiều thứ trong tệp này có thể được điều chỉnh dựa trên nhu cầu của bạn. Tuy nhiên với sự đơn giản của Nginx cho nên bạn có thể hoàn toàn sử dụng cấu hình mặc định mà không cần chỉnh sửa gì. Với thực tế hiện tại như mình thì cũng không chỉnh sửa tệp này :smiley: . Một số phần quan trọng của tệp cấu hình này là:
* **worker_processes:** Xác định số lượng worker process mà Nginx sẽ sử dụng. Do Nginx là single thread cho nên con số này thường bằng với số core của CPU.
* **worker_connections:** Đây là số lượng kết nối tối đa tại một thời điểm cho mỗi worker process và cho biết worker process có bao nhiêu người dùng có thể được phục vụ đồng thời bởi Nginx. Con số này càng lớn thì số lượng người dùng được Nginx phục vụ sẽ càng cao.
* **access_log và error_log:** Đây là các tệp mà Nginx sử dụng để ghi lại các lần lỗi và truy cập. 
* **gzip:** Đây là các cài đặt để nén GZIP của các phản hồi. Kích hoạt cài đặt này cùng với các cài đặt phụ khác theo mặc định sẽ làm cho hiệu suất được nâng cao. 

Cài đặt Nginx có thể cho nhiều hơn một trang web và các tệp xác định máy chủ. Các trang web của bạn nằm trong thư mục `/etc/nginx/sites-available`. 

Thư mục `sites-available` bao gồm các cấu hình cho virtual hosts. Điều này cho phép máy chủ web được cấu hình cho nhiều trang web có cấu hình đặc biệt. Các trang web trong thư mục này không hoạt động và chỉ được bật nếu chúng ta tạo một sumbolic link vào thư mục `/etc/nginx/sites-enabled`.

Chúng ta thử với một tệp cấu hình được định nghĩa trong document của Laravel
```sh
server {
    listen 80;
    server_name example.com;
    root /example.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
Giống như `nginx.conf` thì tệp như trên cũng được định nghĩa theo lối nested context. **Server context** định nghĩa một máy chủ ảo cụ thể để xử lý các yêu cầu của người dùng. Bạn có thể có nhiều server block và Nginx sẽ chọn giữa chúng dựa trên `listen` và `server_name`.

Trong server block, chúng ta định nghĩa nhiều **location context** được sử dụng để quyết định cách xử lý các yêu cầu của máy khách. Bất cứ khi nào có yêu cầu đến, Nginx sẽ cố gắng so sánh URI của nó với một trong những location phù hợp từ đó đưa ra hướng xử lý phù hợp. 

Một số nội dung quan trọng được sử dụng trong **location context**:
* **try_files** sẽ cố gắng phân phát một tệp tĩnh trong thư mục trỏ đến root. 
* **proxy_pass** sẽ gửi yêu cầu đến một máy chủ proxy được chỉ định.
* **rewrite** sẽ ghi đè URI đến dựa trên regex để một location block sẽ có thể xử lý nó.

# Start Nginx
Sau một tràng dài các bước cấu hình Nginx cho máy chủ của bạn như trên thì tiếp đến chúng ta có thể khởi động Nginx như sau:
```sh
sudo service nginx start
```
Còn khi bạn thực hiện bất kỳ thay đổi nào trong cấu hình Nginx, thì bạn cần khởi động lại (không có down time) như sau:
```sh
sudo service nginx reload
```
Để kiểm tra trạng thái của Nginx:
```sh
service nginx status
```
Dừng dịch vụ Nginx:
```sh
sudo service nginx stop
```
Dừng và khởi động lại Nginx 
```sh
sudo service nginx restart
```
# Kết luận
Bài viết là bước khởi đầu cơ bản để bạn có thể tự mình cấu hình Nginx cho chính ứng dụng của riêng bản thân. Tuy nhiên, như bạn thấy các thông tin cấu hình trên hoàn toàn đang ở dạng copy/paste và vẫn chưa hiểu được từng dòng lệnh với mục đích như nào, Hãy cùng tìm hiểu chúng ở những bài viết sau nhé.