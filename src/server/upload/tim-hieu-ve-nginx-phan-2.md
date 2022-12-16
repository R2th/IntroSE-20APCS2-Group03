Như vậy là ở [bài trước](https://viblo.asia/p/tim-hieu-ve-nginx-phan-1-maGK7GJMKj2) mình đã giới thiệu tổng quan về Nginx, giúp chúng ta hiểu được Nginx là gì, ứng dụng và ưu điểm của nó ra sao. Ở bài này mình sẽ tiếp tục đi vào phần cài đặt và cấu hình Nginx cho 1 project trên nền hệ điều hành ubuntu 20. Chúng ta cùng đi vào bài thôi.
# Cài đặt
Trên Ubuntu / Debian / LinuxMint ta sử dụng câu lệnh sau 

```
sudo apt-get update
sudo apt-get install nginx
```

Chúng ta có thể kiểm tra xem Nginx đã được cài đặt thành công hay chưa bằng câu lệnh

```
nginx -v
```
![](https://images.viblo.asia/c6b52bab-9507-4db6-be68-0611cd373ef1.png)


Để Nginx có thể khởi động cùng lúc với boot hệ điều hành :

```
sudo systemctl start nginx.service
sudo systemctl enable nginx.service // khởi động cùng hệ điều hành (mặc định)
sudo systemctl disable nginx // không khởi động cùng hệ điều hành
```
Mặc định tường lửa trên HDH sẽ chặn các cổng của Nginx, đổi với dịch vụ web các bạn chỉ cần mở port 80 cho giao thức HTTP và port 443 cho giao thức HTTPS:
```
sudo ufw allow http
sudo ufw allow https
```
hoặc  nếu cần mở tất cả các cổng 
```
sudo ufw allow 'Nginx Full'
```
Kiểm tra trạng thái của Nginx :
```
service nginx status
```
![](https://images.viblo.asia/1ea888f8-67c6-4cf6-a7a8-2fb7c82af3e9.png)

Một số lệnh quan trọng khác :
```
sudo systemctl start nginx  //khởi động Nginx
sudo systemctl stop nginx   //dừng Nginx
sudo systemctl restart nginx // ngắt connect và khởi động lại Nginx
sudo systemctl reload nginx // giữ nguyên connect và khởi động lại Nginx
```
Ngoài ra còn nhiều lệnh khác mà mình sẽ đề cập tới trong phần sau.Tiếp theo chúng ta sẽ đi tìm hiểu danh sách file và thư mục quan trọng nằm trong /ect/nginx/
![](https://images.viblo.asia/d7310ea1-de28-425a-86d5-2f7d8e2e975b.png)
Trong các tệp ở trên ta chỉ cần đặc biệt chú ý đến :
- **nginx.conf**: File config chính, chịu trách nhiệm tải nhiều tệp khác trong thư mục cấu hình
- **sites-available**: chứa các file config VirtualHost, cho phép chúng ta cấu hình riêng biệt cho từng website
- **conf.d**: chứa các file config của riêng bạn, lưu trữ Server Block của mỗi trang web
# Cấu hình
Bây giờ hãy thử vào nginx.conf để xem có gì nào
```
cat nginx.conf
```
gõ lệnh trên để vào file và chúng ta sẽ thấy 
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

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
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

Tệp xây dựng theo cấu trúc lồng nhau nên các cấu hình lớp trong có thể kế thừa từ cha mẹ của chúng và nó cũng có khả năng ghi đè theo nhu cầu của bạn. Hãy chú ý đến 
- **worker_processes**: Xác định số lượng worker process mà Nginx sẽ sử dụng. Do Nginx là single thread cho nên con số này thường bằng với số core của CPU
- **worker_connections**: Đây là số lượng kết nối tối đa tại một thời điểm cho mỗi worker process và cho biết worker process có bao nhiêu người dùng có thể được phục vụ đồng thời bởi Nginx. Con số này càng lớn thì số lượng người dùng được Nginx phục vụ sẽ càng cao.

### Cấu hình Log
Thông thường, log của Nginx được lưu ở trong thư mục /var/log/nginx gồm có 2 file là:
- **access.log**: Lưu lại thông tin truy cập tới Web Server
- **error.log**: Lưu lại thông tin lỗi
Để thay đổi đường dẫn 2 file này chúng ta sửa 2 tham số là error_log và access_log trong file /etc/nginx/nginx.conf:
```
http {
        ##
        # Logging Settings
        ##
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
}
```
### Cấu hình gzip
Gzip là phương pháp nén dữ liệu trả về của server, giúp giảm tải thời gian tải tài nguyền từ server về client , giúp hiệu suất được nâng cao.

Để bật gzip trên Nginx chúng ta sửa file config /etc/nginx/nginx.conf:
```
http {
        ##
        # Gzip Settings
        ##
        gzip on;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Đến đây còn 1 phần đó là cấu hình Virtual Hosts, mình sẽ trình bày chi tiết hơn trong 1 bài viết khác.
Nếu có thay đổi config thì đừng quên chạy lệnh này để thực thi các thay đổi đó nha 
```
sudo service nginx reload  
 hoặc 
sudo systemctl reload nginx
```
Bài viết mới chỉ giới thiệu việc cấu hình Nginx ở mức độ cơ bản, mời các bạn qua [đây](https://viblo.asia/p/tim-hieu-ve-nginx-phan-3-3P0lPGrGZox#_location-context-6) để xem cách cấu hình chi tiết và nâng cao hơn. Hy vọng bài viết sẽ giúp ích cho việc cài đặt và cấu hình Nginx của các bạn. Cám ơn đã đọc bài viết của mình ^^.