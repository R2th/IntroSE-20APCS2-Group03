### 1. NGNIX là gì?

Đầu tiên chúng ta cần hiểu một chút về khái niệm Web Server.

>> **Web Server** hay máy chủ web, là máy chủ xử lý các truy cập được gửi từ máy khách thông qua giao thức HTTP và các giao thức khác để phản hồi các yêu cầu của người dùng được thực hiện qua World Wide Web.

Web server bao gồm: 

- Phần cứng: web server như một máy tính chứa phần mềm máy chủ web và các tệp thành phần của trang web (các files HTML, CSS, JS, hình ảnh, ...) Máy chủ web kết nối với Internet và hỗ trợ trao đổi dữ liệu vật lý với các thiết bị khác được kết nối với web.

- Phần mềm: Web server bao gồm một số phần kiểm soát người dùng truy cập vào các tệp thành phần của trang web. Ở mức tối thiểu, đây là một máy chủ HTTP. Máy chủ HTTP có thể được truy cập thông qua domain của nó và cung cấp nội dung của các trang web được lưu trữ đến thiết bị của người dùng cuối.

>>>**NGINX** is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It started out as a web server designed for maximum performance and stability. In addition to its HTTP server capabilities, NGINX can also function as a proxy server for email (IMAP, POP3, and SMTP) and a reverse proxy and load balancer for HTTP, TCP, and UDP servers.

Có thể hiểu **NGNIX** là 1 máy chủ web mã nguồn mở phục vụ các giao thức HTTP, HTTPS, SMTP, POP3 và IMAP, cũng như là 1 máy chủ cân bằng tải, HTTP cache và nhiều hơn thế.
<br>

 **NGINX** được biết đến là máy chủ web nhanh nhất và là giải pháp tốt nhất cho các máy chủ của các trang web có lưu lượng truy cập cao như Dropbox, Netflix và Zynga. Hiện tại có hơn 400 triệu (hơn 30%) trang web trên toàn thế giới đang sử dụng **NGNIX**.

![](https://images.viblo.asia/81411337-a753-4c49-9053-73d827be0b16.png)

### 2. Cài đặt
```
$ sudo apt-get update
$ sudo apt-get install nginx
```
Sau khi cài đặt xong, bạn có thể kiểm tra phiên bản cài đặt bằng lệnh
```
$ sudo nginx -v
nginx version: nginx/1.10.3 (Ubuntu)
```

Nếu bạn gặp lỗi `Failed to start A high performance web server and a reverse proxy server.`, hãy stop apache đi và thử lại lệnh cài đặt là oke nhé.
```
$ sudo service apache2 stop
```
Bạn có thể xem chi tiết tại [đây](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#installing-a-prebuilt-ubuntu-package-from-an-ubuntu-repository)

### 3. Cấu hình
Chúng ta sẽ cấu hình NGNIX trong các file cấu hình tại thư mục `/etc/ngnix`.
```
$ cd /etc/nginx/
$ ll
total 72
drwxr-xr-x   6 root root  4096 Th09 25 08:32 ./
drwxr-xr-x 145 root root 12288 Th09 25 08:32 ../
drwxr-xr-x   2 root root  4096 Th01 11  2020 conf.d/
-rw-r--r--   1 root root  1077 Th02 12  2017 fastcgi.conf
-rw-r--r--   1 root root  1007 Th02 12  2017 fastcgi_params
-rw-r--r--   1 root root  2837 Th02 12  2017 koi-utf
-rw-r--r--   1 root root  2223 Th02 12  2017 koi-win
-rw-r--r--   1 root root  3957 Th02 12  2017 mime.types
-rw-r--r--   1 root root  1462 Th02 12  2017 nginx.conf
-rw-r--r--   1 root root   180 Th02 12  2017 proxy_params
-rw-r--r--   1 root root   636 Th02 12  2017 scgi_params
drwxr-xr-x   2 root root  4096 Th09 25 08:32 sites-available/
drwxr-xr-x   2 root root  4096 Th09 25 10:11 sites-enabled/
drwxr-xr-x   2 root root  4096 Th09 25 08:32 snippets/
-rw-r--r--   1 root root   664 Th02 12  2017 uwsgi_params
-rw-r--r--   1 root root  3071 Th02 12  2017 win-utf
```

Các file quan trọng bạn cần quan tâm là:
- **nginx.conf**: File config chính
- **conf.d**: Thư mục chưa các file config của riêng bạn
- **sites-available**: Thư mục chưa các file config VirtualHost, cho phép chúng ta cấu hình riêng biệt cho từng website
- **sites-available/default**: File config Virtual Hosts mặc định

**Cấu hình ngnix.conf**

File cấu hình này gồm 3 context: *events*, *http* và *mail*. Trong đó, việc cấu hình events và http là bắt buộc.
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

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
	gzip_disable "msie6";

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
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}
```
Những mục bạn cần lưu ý trong file này bao gồm:

- **worker_processes**: số máy chủ ảo có thể tạo, nên bằng số core máy của bạn.

    Bạn có thể kiểm tra điều này bằng lệnh
    ```
    $ grep processor /proc/cpuinfo | wc -l
    ```

-  **worker_connections**: cho số lượng máy khách tối đa có thể được Nginx phục vụ đồng thời với mỗi worker processes.

    Chúng ta có thể kiểm tra số liệu của 1 lõi bằng lệnh
    ```
    $ ulimit -n
    ```
- Cấu hình lưu trữ log
    - **access_log**: lưu trữ thông tịn truy cập
	- **error_log**: lưu trữ thông tin lỗi.
	Bạn có thể tắt việc lưu log bằng cách cấu hình như vậy:
     ```
     access_log off;
	 error_log off;
     ```
- Cấu hình buffer
    - **client_body_buffer_size**:  là kích thước tối đa của client buffer, là kích thước gói tin của giao thức POST
    - **client_header_buffer_size**: Tương tự, đây là kích thước tối đa cho header, nên đặt giá trị này là *1K*
    - **client_max_body_size**: Kích thước tối đa cho phần body. Nếu  vượt quá, Nginx sẽ gặp lỗi 413 hoặc Request Entity Too Large.
    - **large_client_header_buffers**: Số lượng và kích thước bộ đệm tối đa cho các large header.
- Cấu hình timeout
    - **client_body_timeout**: thời gian máy chủ sẽ đợi body request của máy khách.
    - **client_header_timeout**: thời gian máy chủ sẽ đợi header request của máy khách.
    - **keepalive_timeout** gán thời gian chờ cho các kết nối lưu động với client.
    - **send_timeout**: timeout cho response trả về
- Cấu hình gzip:

Sau khi cấu hình xong, bạn cần restart lại NGNIX nhé
```
$ sudo service nginx restart
```

Tài liệu tham khảo:

[NGINX Documentation](https://docs.nginx.com/nginx/)

[Cách tối ưu hóa cấu hình Nginx](https://vicloud.vn/community/cach-toi-uu-hoa-cau-hinh-nginx-491.html)

NGNIX có rất nhiều chỉ thị cần config. Trong bài viết tiếp theo mình sẽ viết một vài ví dụ về việc cấu hình NGNIX cho từng mục đích cụ thể. 
Hi vọng bài viết này có ích với bạn. Cảm ơn và hẹn gặp lại ở bài viết tiếp theo.