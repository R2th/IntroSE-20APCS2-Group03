![](https://images.viblo.asia/885f305d-11c0-4ec0-8124-46f4d5f54a90.png)

Nginx là phần mềm nguồn mở làm web server. Ngoài các tính năng của một máy chủ HTTP, Nginx cũng có thể hoạt động như một máy chủ proxy cho email (IMAP, POP3 và SMTP) và một trình cân bằng tải (load balancer) và proxy ngược (reverse proxy) cho các máy chủ HTTP, TCP và UDP.

Nginx được tạo ra bởi Igor Sysoev và phát hành lần đầu tiên vào năm 2004. Theo W3techs, Nginx được nhiều người sử dụng làm Web server chiếm tỉ lệ 42,1% tổng số lượng Web server trên thế giới.

# 1. Cài đặt
### Step 1: Cài đặt Epel Repo
 ```
$ sudo yum install epel-release
```
### Step 2: Cài đặt Nginx
```
$ sudo yum install nginx
```
### Step 3: Khởi động Nginx
```
$ sudo systemctl start nginx
```
Nếu bạn đang bật Firewall, chạy các câu lệnh sau để cho cho phép khởi chạy giao thức HTTP và HTTPS
```
sudo firewall-cmd --permanent --zone=public --add-service=http 
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```
Cho phép khởi động dịch vụ Nginx
```
$ sudo systemctl enable nginx
```
Giờ khi truy cập vào domain name hoặc địa chỉ IP bạn sẽ nhìn thấy trang index mặc định của Nginx. Như vậy các bước cài đặt của chúng ta đã hoàn thành
![](https://images.viblo.asia/5a14386c-97cc-4e65-8090-4b8a56282306.png)

# 2. Các dòng lệnh thao tác Nginx cơ bản
Khởi động Nginx
```
$ sudo systemctl start nginx
```
Tắt Nginx
```
$ sudo systemctl stop nginx
```
Restart Nginx
```
$ sudo systemctl restart nginx
```
Kiểm tra trạng thái Nginx
```
$ sudo systemctl status nginx
```
Kiểm tra file config Nginx
```
$ sudo nginx -t
```
# 3. Mẫu cấu hình cơ bản cho Nginx
### Mẫu cấu hình mặc định của Nginx
Trước tiên chúng ta di chuyển tới thư mục cấu hình của Nginx trên CentOS
```
$ cd /etc/nginx
```
Ta cùng xem file default config của Nginx
```
$ cat nginx.conf.default
```
```
........................................
include /etc/nginx/conf.d/*.conf;

server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        #include /etc/nginx/default.d/*.conf;

       location / {
        }

        error_page 404 /404.html;
           location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
........................................
```
 `include /etc/nginx/conf.d/*.conf;` : gọi tới những file .conf chứa những câu lệnh cấu hình riêng của chúng ta
 
`listen` : cổng mạng mà ta cần sử dụng

`server_name` : domain name của chúng ta

Nếu bạn đang cấu hình trên local, bạn hãy thêm domain local tại file `hosts` trong thư mục `etc`

Di chuyển tới thư mục `etc`
```
$ cd /etc/
```
Chỉnh sửa file hosts
```
$ sudo nano hosts
```
Thêm domain local của chúng ta
```
127.0.0.1 duongtiendat.com
::1       duongtiendat.com
127.0.0.1 cv.duongtiendat.com
::1       cv.duongtiendat.com
```
`root` : địa chỉ thư mục project mà ta muốn gọi tới, mặc định sẽ gọi tới file `index.html` trong thư mục đó, nếu ta muốn khi hiển thị xuất hiện ra file ta chỉ định thì ta cần khai báo tên file đó dưới câu lệnh root
```
root /var/www/html/duongtiendat/;
index index.php;
```
# 4. Cấu hình Subdomain trên Nginx
Trong phần này mình sẽ cấu hình cho domain và subdomain là:

https://duongtiendat.com

https://cv.duongtiendat.com

### Step 1: Chuẩn bị project
Đầu tiên, mình sẽ chuẩn bị 2 thư mục project để dùng cho domain, subdomain tại `/var/www/html/duongtiendat/ `và `/var/www/html/my_resume/`

Nếu các bạn chưa có sẵn project nào thì có thể tạo 2 file `index.html` cơ bản để test 

### Step 2: Cấu hình domain
Ta di chuyển vào thư mục `/etc/nginx/conf.d/`, thư mục này sẽ chứa các file config của chúng ta

Mình sẽ tạo file config domain có tên là `duongtiendat.com.conf`

> :warning: Lưu ý: Các file config luôn phải để định dạng `.conf`

```
$ sudo touch duongtiendat.com.conf
```
File config sẽ có nội dung như sau (File này mình cấu hình cho project Wordpress nên có thêm một vài tùy chọn):
```
server {
        ## Your website name goes here.
        server_name duongtiendat.com www.duongtiendat.com;
        ## Your only path reference.
        root /var/www/html/duongtiendat/;
        ## This should be in your http block and if it is, it's not needed here.
        index index.php;

        location = /favicon.ico {
                log_not_found off;
                access_log off;
        }

        location = /robots.txt {
                allow all;
                log_not_found off;
                access_log off;
        }

        location / {
                # This is cool because no php is touched for static content.
                # include the "?$args" part so non-default permalinks doesn't break when using query string
                try_files $uri $uri/ /index.php?$args;
        }

        location ~ \.php$ {
                #NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
                include fastcgi.conf;
                fastcgi_intercept_errors on;
                fastcgi_pass 127.0.0.1:9000;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
                expires max;
                log_not_found off;
        }
}
```
### Step 3: Cấu hình Subdomain
Ta tạo file config subdomain có tên là `cv.duongtiendat.com.conf`
```
server {
        listen       80;
        server_name  cv.duongtiendat.com;

        location / {
            root /var/www/html/my_resume;
            index  index.php index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
             root   html;
        }
}
```
### Step 4: Hoàn tất config
Để kiểm tra lại xem các file config vừa rồi có bị lỗi gì không, chúng ta dùng lệnh
```
$ sudo nginx -t
```
Nếu command trả về như dưới đây tức là ta đã thành công
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
Và giờ ta restart nginx để cập nhật những tùy chỉnh mới nhất
```
$ sudo systemctl restart nginx
```

Vậy là chúng ta đã config xong, giờ hãy cùng truy cập domain và subdomain để xem thành quả thu được :sweat_smile::sweat_smile:

https://duongtiendat.com
![](https://images.viblo.asia/4abc04b9-4890-4cb5-89e1-8dff4ffe8328.png)

https://cv.duongtiendat.com

![](https://images.viblo.asia/6992f6d9-dd82-4eb3-8e06-691c4f93d218.png)