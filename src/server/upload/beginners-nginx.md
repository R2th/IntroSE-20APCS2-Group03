# I. Chuẩn bị:
## 1. Hệ điều hành:
- Dưới đây chúng ta sẽ thực hành trên hệ điều hành Ubuntu được rất nhiều developer yêu thích vì tính bảo mật cao cũng như support nhiều packet cần thiết liên quan tới việc phát triền phần mềm.
- Sử dụng 1 user của thường xuyên của mình trên Ubuntu. Lưu ý: không chạy trên quyền user: root.

## 2. Install Nginx:
-  Nginx đã có sẵn trong repositories mặc định của Ubuntu do đó việc cài đặt khá là đơn giản.
-  Bạn có thể tham khảo 1 số lệnh bên dưới để tiến hành install nginx:
```
    sudo apt-get update
    sudo apt-get install nginx
```
- Sau khi đợi Ubuntu chạy xong thì chúng ta đã có 1 nginx để sử dụng, đơn giản đúng không ạ.

# II. Hướng dẫn cơ bản khi sử dụng Nginx.
## 1. Một số lệnh cơ bản thường được sử dụng:
- Đầu tiên chúng ta mở terminal lên và thực hành sử dụng cơ bản như sau:
- To stop Nginx:
```
    sudo systemctl stop nginx
```
- Để start lại server sau khi stop, chúng ta sử dụng:
```
    sudo systemctl start nginx
```
- Để thực hiện đồng thời tắt xong bật lại, chúng ta có:
```
    sudo systemctl restart nginx
```
- Nếu bạn đơn giản là thay đổi cấu hình của Nginx, thì có thể sử dụng lệnh dưới đây để apply phần cấu hình mới của nginx. Mà không làm mất kết nối của client:
```
    sudo systemctl reload nginx
```
- Theo mặc định, Nginx sẽ được khởi động luôn khi bạn tiến hành khởi động ubuntu. Nếu bạn không muốn tắt nó:
```
    sudo systemctl disable nginx
```
- Để bật lại:
```
    sudo systemctl enable nginx
```
- Để test file config của bạn:
```
    sudo nginx -t
```
## 2. NGINX Files and Directorie quan trọng.
### a. Content:
- /var/www/html: Ở đây sẽ chứa nội dung hiển thị mặc định của website. Chúng ta có thể thay đổi được nội dung hiển thị này trong file config của nginx.
### b. Server Configuration:
- /etc/nginx: Tất cả nhưng thư mục config nginx sẽ nằm trong này.
- /etc/nginx/nginx.conf: File config chính của nginx, có thể thay đổi tùy ý theo nhu cầu sử dụng.
- /etc/nginx/sites-available/: Thư mục có thể lưu trữ "server blocks" trên mỗi trang web.
- /etc/nginx/sites-enabled/: Thư mục lưu trữ “server blocks” được kích hoạt trên mỗi trang web.
- /etc/nginx/snippets: Thư mục này chứa các đoạn cấu hình có thể được đưa vào ở những nơi khác trong cấu hình NGINX.
### c. Server Logs:
- /var/log/nginx/access.log: Mọi yêu cầu đến máy chủ web của bạn đều được ghi lại trong bản ghi nhật ký này trừ khi và cho đến khi NGINX được định cấu hình để làm việc khác.
- /var/log/nginx/error.log: Mọi lỗi NGINX sẽ chỉ được ghi lại trong nhật ký này.
## 3. Configure NGINX to serve backend
- Bạn cần phải cho Nginx hiểu là server của bạn đang chạy ở đâu và chạy như thế nào. Và để làm được điều đó chúng ta sẽ tiến vào config cơ bản của nginx.
- cd vào thư mục /etc/nginx/. Đây sẽ chứa tất cả các config liên quan tới server của bạn.
- Có 2 thư mục mà chúng ta cần để ý là: sites-available và sites-enabled. <br>
        + Sites-available: chứa sẵn tất cả các cấu hình riêng lẻ có thể có của website của bạn. <br>
        + Sites-enabled: Chứa các liên kết đến các tệp mà Nginx có thể đọc và chạy. <br>
- Bây giờ, hãy cd vào /etc/nginx/sites-enabled để xem có những gì trong đó nhé. <br>
```
server {
    listen 80 default_server;
    listen [::]:80 default_server; 
    root /var/www/html;  
    index index.html; 
    server_name _;  
    location / {
       try_files $uri $uri/ =404;
    }
    location /api/ {
           proxy_pass http://localhost:8080/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
    }
    location /images {
           alias uploads/images/;
    }
}
```
- Chúng ta cùng tìm hiểu 1 số đoạn phía trên xem nó đang làm gì nha: <br>
        +     root /var/www/html: Phần này khi bạn setting như thế thì sau khi server chạy nó sẽ vào cái phần link đó và lôi cái code trong đó để đọc. <br>
        +     Phần index.html: Khi bạn vào localhost:8000 thì cái view bạn thấy nó sẽ đọc cái file này. <br>
        +     Phần server_name: Thì như tên của nó sẽ là tên của server bạn đặt =)). <br>
        +     Phần location: Có nghĩa là nó chỉ trả về respond  cho những thằng trong server.<br>
        +     Phần api: Có nghĩa là bạn định nghĩa cho 1 api có thể truy cập đến server bằng port 8000.<br>
        +     Phần image: Sẽ là đường dẫn lưu lại ảnh của bạn khi bạn muốn upload 1 ảnh nào đó lên server.<br>
#  III. Tham khảo
- Bài viết này mình tham khảo và nghiên cứu từ những nguồn bên dưới:
  + https://nginx.org
  + https://medium.com
- Cám ơn các bạn đã dành thời gian cùng mình tìm hiểu 1 chút kiến thức về Nginx.
- Mọi góp ý và chia sẻ xin viết ở dưới phần bình luận.