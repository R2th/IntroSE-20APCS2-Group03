![](https://images.viblo.asia/d9759a6c-85b2-4abb-9981-f3c3508757be.gif)

Trong quá trình phát triển web, có những lúc chúng ta sẽ cần phải giới hạn người dùng truy cập đến website của mình và để giới hạn chúng ta có thể yêu cầu người dùng xác thực qua `tài khoản` và `mật khẩu`.

Bài viết này sẽ hướng dẫn cho bạn các bước để cấu hình [**Basic Authentication**](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/) bảo vệ server [**Nginx**](https://www.nginx.com) chạy trên môi trường **[Ubuntu Server](https://ubuntu.com/)**.

## Yêu cầu
1. Chuẩn bị 1 VPS **[Ubuntu Server](https://ubuntu.com/)**
2. Cài đặt [**Nginx**](https://www.nginx.com) là web server

```
sudo apt-get update
sudo apt-get install nginx
```

## Tạo file lưu mật khẩu
Để tạo mật khẩu, chúng ta có thể sử dụng **[OpenSSL](https://www.openssl.org)**.

Nếu server đã có **[OpenSSL](https://www.openssl.org)** thì có thể chuyển qua bước tiếp theo, còn chưa có thì chúng ta cần
cài đặt **[OpenSSL](https://www.openssl.org)** trước thông qua lệnh:

```
sudo apt install libssl-dev
sudo apt install openssl
```

Tạo một file `.htpasswd` để lưu tài khoản và mật khẩu bên trong thư mục `/etc/nginx/basic-auth`. Nếu có nhiều web cùng chạy trên server này thì có thể tạo các file riêng cho từng web, ví dụ `.htpasswd-web`, `.htpasswd-another-web`.

Đầu tiên chúng ta sẽ thêm tên đăng nhập vào file `.htpasswd`. Ví dụ chúng ta sử dụng tên đăng nhập là `username` thì chạy lệnh:

```
sudo sh -c "echo -n 'username:' >> /etc/nginx/basic-auth/.htpasswd"
```

Tiếp theo chúng ta cần thêm mật khẩu đã mã hóa cho tên đăng nhập `username` bằng lệnh:

```
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/basic-auth/.htpasswd"
```

Sau khi chạy lệnh trên, nhập mật khẩu mong muốn và xác nhận mật khẩu rồi nhấn `Enter`.

Xem nội dung file `.htpasswd` vừa tạo, chạy lệnh:

```
cat /etc/nginx/basic-auth/.htpasswd
```

Nội dung có dạng như bên dưới nghĩa là chúng ta đã tạo thành công tài khoản và mật khẩu:

```
username:$apr1$2KLGvvZj$6DYTtfzjTIlI0HPQOhLbG0
```

## Cấu hình xác thực mật khẩu cho Nginx

Cập nhật file config nginx, trong ví dụ này mình sử dụng file `default` của nginx, ngoài ra mọi người có thể cập nhật vào file config tương ứng với web trên server cửa mình.

```
sudo nano /etc/nginx/sites-enabled/default
```

Ban đầu file `/etc/nginx/sites-enabled/default` có dạng như sau:

```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Chúng ta thêm `auth_basic` và `auth_basic_user_file` trỏ đến file tên đăng nhập và mật khẩu bạn vừa mới tạo ở trên.

```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
        auth_basic "Restricted Content";
        auth_basic_user_file /etc/nginx/basic-auth/.htpasswd;
    }
}
```

Lưu file config lại và restart lại server.

```
sudo systemctl restart nginx
```

Sau khi khởi động lại server, truy cập vào trang web của mình, chúng ta sẽ thấy có 1 cửa sổ bật ra yêu cầu nhập tên đăng nhập và mật khẩu (giống như hình ảnh ở đầu bài viết). Nếu chúng ta điền đúng tài khoản thì sẽ được phép truy cập vào bên trong trang web. Ngược lại nếu điền sai hoặc chọn `cancel` thì trang web sẽ tự chuyển hướng đến trang thông báo lỗi `401 Authorization Required`.