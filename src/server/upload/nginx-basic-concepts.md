### Nginx là gì

Nginx là web server được thiết kế để xử lý vấn đề C10K. Nginx được sử dụng để giải quyết bài toán khi server có lượng truy cập lớn với hiệu suất là 10.000 kết nối cùng lúc. Ngoài ra nginx còn được sử dụng như một proxy server để có thể tích hợp với các app server như là unicorn hay puma.

Nginx được phát triển với mục tiêu tối ưu việc sử dụng ram trên hệ thống server nhưng có thể phục vụ nhiều kết nối đồng thời cao hơn. Nginx sử dụng kiến trúc hướng sự kiện (event-driven), bất đồng bộ (ansynchronous) và có khả năng mở rộng. Do việc tối ưu hóa về hiệu suất nên nginx đặc biệt sử dụng trong các trường hợp cần phục vụ nội dung tĩnh(file hình ảnh, css, js...) và các truy vấn đồng thời số lượng lớn (high concurrent request).

Ngay cả khi không cần xử lý cả hàng ngàn truy vấn đồng thời, thì vẫn nên sử dụng nginx do hiệu suất cao và yêu cầu bộ nhớ thấp của nginx so với Apache

### Kiến trúc nginx

![](https://images.viblo.asia/0bdbeb98-9152-4460-8529-589172782f3e.png)

Khi khởi chạy service, Nginx khởi tạo một master process cũng là tiến trình duy nhất tồn tại trong bộ nhớ. Master process sẽ không chịu trách nhiệm xử lý bất kỳ request nào từ phía client mà thay vào đó sinh ra các tiến trình con gọi worker process để xử lý các request được gửi từ phía client, mỗi worker sẽ handle nhiều connections (lên đến hàng ngàn). Những con Worker thực hiện được điều này bằng cách hiện thực một kiến trúc fast looping vừa kiểm tra và thực hiện những sự kiện trên.

Kiến trúc NGINX:
* Master process: thực thi những tác vụ như đọc config, binding ports, tạo một số lượng các process con. Cache loader process: process này chạy lúc khởi động để nạp bộ nhớ disk cache vào memory sau đó nó sẽ exit. Process này được lên kế hoạch trước, sử dụng ít tài nguyên hệ thống.
* Cache manager process: process chạy định kỳ, để giữ cho bộ nhớ disk cache luôn đúng kích thước như trong config.
* Worker process: là những process làm việc với connections, nó đọc và ghi nội dung vào disk, và giao tiếp với app server, handle request từ clients.

### Một số tính năng thông thường của nginx 
* Webserver cho các ứng dụng website
* Proxy server cho email (IMAP, POP3, và SMTP).
* Load balancer cho HTTP, TCP, và UDP servers.
* Content Cache gia tăng peformance cho hệ thống
* Hỗ trợ WebSockets
* Security Controls (Giới hạn kết nối từ địa chỉ IP)

### Cài đặt nginx
Đầu tiên, update lại APT cache bằng lệnh:
```
apt-get update
```
Thực hiện theo các bước sau nếu bạn chưa cài đặt nginx
```
apt-get install nginx
```

Ngoài ra mình cũng sử dụng một số package khác nên tiện cài đặt luôn:
```
apt-get install curl vim
```

Sau khi cài đặt bạn hãy start service bằng lệnh sau: `sudo service nginx start`. Sau đó bạn có thể kiểm tra lại bằng cách gõ lệnh như sau:
```
$ curl localhost
//Kết quả sau khi chạy
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
</html>
```

### Directive và Context
Ta sẽ sử dụng file nginx.conf làm ví dụ như sau:
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
```
File config ở trên sẽ bao gồm:
* directive: là chỉ thị lệnh bao gồm tên và tham số truyền vào, và kết thúc bởi dấu `;`. Ví dụ : `gzip on;`
* context: tương tự như là một scope trong ngôn ngữ lập trình, hay có thể hiểu là một block bao gồm nhiều  directive. Ví dụ
```
worker_processes 2; # directive in global context

http {              # http context
    gzip on;        # directive in http context

  server {          # server context
    listen 80;      # directive in server context
  }
}
```
 Tiếp theo mình sẽ giải thích một chút ở file config trên:
*  worker_processes: setting này định nghĩa số lượng worker process Nginx sử dụng. Số lượng worker process nên được set bằng giá trị với số core của CPU.
*  worker_connections: số lượng tối đa kết nối với worker_processes, hay số lượng tối đa kết nối nginx có thể xử lý.
*  access_log & error_log: đây là những file mà Nginx sẽ sử dụng để log lại toàn bộ error và access request. Phần log này thường được sử dụng để debug.
* gzip: là một phương thức để nén và làm giảm dung lượng các file ở server trước khi gửi đến client (ví dụ như trình duyệt). Nó giúp tiết kiệm băng thông, tăng tốc độ tải của website.

###  Processing requests
Nginx có thể thiết lập các server ảo bằng cách sửu dụng context `server { }` . Như sau:

Đầu tiên, bạn vào thư mục /etc/nginx/sites-available/ và backup lại file default trước khi sửa đổi:
```
cp default default.bak
```

Sau đó, sửa file default với nội dung sau:
```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/html;

  index index.html index.htm index.nginx-debian.html;

  server_name _;

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }
}

server {
  listen      *:81;
  server_name bar.co;

  return 200 "Hello from bar.co";
}
```
Sau đó chạy `curl localhost:81` để kiểm tra xem nginx đã thiết lập đúng chưa:
```
root@56eefd1ad30c:/etc/nginx/sites-available# curl localhost:81
Hello from bar.co
```

Mình sẽ giải thích qua một chút về hai directive ở trên: `listen` và `server_name`
 **server_name**
 Server_name directive có thể chấp nhận nhiều giá trị cùng một lúc, chấp nhận wildcard matching và regular expressions.
 ```
 server_name netguru.co www.netguru.co; # exact match
server_name *.netguru.co;              # wildcard matching
server_name netguru.*;                 # wildcard matching
server_name  ~^[0-9]*\.netguru\.co$;   # regexp matching
 ```
 
  **listen**
  Listen directive sẽ có định dạng ` IP:port`. Ví dụ
```
listen 127.0.0.1:80;
listen 127.0.0.1;    # by default port :80 is used

listen *:81;
listen 81;           # by default all ips are used

listen [::]:80;      # IPv6 addresses
listen [::1];        # IPv6 addresses
```

### Một số directives khác
**root directive**

Root directive dùng để set thư mục gốc của server khi có request tới hệ thống. Ví dụ:
```
server {
  listen 80;
  server_name netguru.co;
  root /var/www/netguru.co;
}
```
Từ đó Nginx có thể return tới địa chỉ dựa trên request gửi tới:
```
netguru.co:80/index.html     # returns /var/www/netguru.com/index.html
netguru.co:80/foo/index.html # returns /var/www/netguru.com/foo/index.html
```

**location directive**

Location directive dùng để xác định URI rõ ràng hơn khi có request gửi tới nginx sẽ kiểm tra có match với location được khai báo, nếu trùng nginx sẽ thực hiện các chỉ thì được khai báo trong block location. Ví dụ
```
server {
  listen 80;
  server_name netguru.co;
  root /var/www/netguru.co;

  location / {
    return 200 "root";
  }

  location /foo {
    return 200 "foo";
  }
}
```
```
netguru.co:80   /       # => "root"
netguru.co:80   /foo    # => "foo"
netguru.co:80   /foo123 # => "foo"
netguru.co:80   /bar    # => "root"
```

**try_files directive**
Try directive sẽ được gọi khi mà nginx không tìm thấy địa chỉ ban đầu, mà sẽ thử các đường dẫn khác. Ví dụ
```
try_files $uri index.html =404;
```
Trong trường hợp client request đến địa chỉ /foo.html , nginx sẽ thực hiện lần lượt các bước sau:
1. $uri ( /foo.html );
2. index.html;
3. If none is found: 404.

Lưu ý nếu trong server block để location directive có dạng như sau:
```
server {
  try_files $uri /index.html =404;

  location / {
  }
}
```
Thì try_files sẽ không bao giờ được thực thi, do đó để đảm bảo rõ ràng hơn ta nên thiết kế như sau:
```
server {
  location / {
    try_files $uri /index.html =404;
  }
}
```

### Lời kết
Đầu tiên, mình xin được cảm ơn các bạn đã đọc bài viết của mình, có thể trong bài viết còn nhiều sai sót hy vọng là các bạn có thể comment để giúp mình hoàn thiện hơn. Những khái niệm ở trên mới chỉ là những phần rất cơ bản về nginx nếu có cơ hội mình sẽ xin được tìm hiểu và chia sẽ tiếp.

Bài viết này mình tham khảo tại:
* https://medium.freecodecamp.org/an-introduction-to-nginx-for-developers-62179b6a458f
* https://www.netguru.com/codestories/nginx-tutorial-basics-concepts