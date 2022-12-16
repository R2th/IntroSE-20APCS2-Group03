# Cấu hình Reverse Proxy trên Nginx

### 1. Reverse Proxy là gì?

<br>
<br>

Đối lập với forward proxy, đây là một loại proxy phía server. Server đóng vai trò làm reverse proxy sẽ chắn trước các request từ client đẩy đến và che dấu toàn bộ backend server đằng sau.

<br>

![](https://images.viblo.asia/17a17929-1d8c-4567-9e05-dfeea371a1be.jpeg)

<br>
<br>

### 2. Mục đích sử dụng

<br>
<br>

* **Load Balancing:** Như theo sơ đồ trên, Reverse Proxy sẽ nhận request, phân bố cho Server tương ứng, nhận kết quả và trả về cho client.
* **Web Acceleration:** Reverse Proxy có thể được dùng cho việc nén dữ liệu inbound và outbound, cũng như cache lại các request nhằm giảm dung lượng dữ liệu và tăng tốc độ cho cả phía client lẫn server.
* **Bảo mật và ẩn danh:** Reverse Proxy có thể được dùng như một tường lửa đơn giản để block hoặc filter các bad-request

<br>
<br>

### 3. Cài đặt Nginx

<br>
<br>

Bởi vì mình dùng server: CentOs 7x64, nên mình sẽ hướng dẫn cài theo server của mình nhé.
 
**Bước 1:** Chạy dòng lệnh sau đây:

`/etc/yum.repos.d/nginx.repo`
 
**Bước 2:** Copy đoạn text vào file nginx.repo vừa tạo
 
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```
 
**Bước 3**: Save file vừa tạo lại bằng cách thực hiện 

Nhấn `Esc` tiếp đó nhập  `:x` cuối cùng ấn  `Enter`
 
**Bước 4:** Chạy dòng lệnh sau:

`sudo yum install nginx`
 
Trong quá trình chạy chương trình có xác nhận `y/n` thì cứ chọn `y`. Các bạn ngồi đợi cho đến khi báo Complete! là xong

<br>
<br>

### 4. Một số câu lệnh cơ bản để thao tác với Nginx

<br>
<br>

**a. Khởi động Nginx**

`sudo systemctl start nginx`
 
**b. Dừng hoạt động Nginx**

`sudo systemctl start nginx`
 
**c. Khởi động lại Nginx**

`sudo systemctl restart nginx`
 
**d. Kiểm tra trạng thái của Nginx**

`sudo systemctl status nginx`

<br>
<br>

### 5. Cấu hình Reverse Proxy trên Nginx

<br>
<br>

**Bước 1:** Vào thư mục conf.d của Nginx bằng cách chạy câu lệnh sau:

`cd /etc/nginx/conf.d`
 
**Bước 2:** Tạo 1 file config mới:

`vi domain.conf`
 
**Bước 3:** Copy đoạn cấu hình sau vào trong file `domain.conf`

```
server {
        listen 80;
        server_name your_domain_name; #change to your domain name
 
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_pass http://checkip.dyndns.com/;  #change to your internal server IP
                proxy_redirect off;
        }
}
```
 
**Bước 4:** Lưu lại cấu hình bằng cách ấn

`Esc` -> `:x` -> `Enter`
 
**Bước 5:** Reload lại nginx

`systemctl reload nginx`

Như vậy là bạn đã hoàn thành việc cài đặt server bạn thành Reverse Proxy trên Nginx

Ở ví dụ của mình thì mỗi khi vào http://your_domain_name/ -> thì luôn nhận được reponse là response của trang http://checkip.dyndns.com/ (chỗ này bạn sẽ thay bằng base url của server resource của bạn)

<br>
<br>

### Cám ơn các bạn đã theo dõi bài viết của mình!!!