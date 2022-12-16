<div align="justify">

### 1. Vai trò của Nginx
* Bản thân Nginx không thể xử lý file PHP được, cho nên nó cần 1 Server PHP để xử lý và ta biết đến PHP-FPM
* Khi người dùng truy cập vào browser, trình duyệt sẽ gửi request HTTP đến Nginx, sau đó Nginx sẽ tìm trang để nạp vào.
* Khi mà Nginx tìm thấy mã PHP trong trang, vì nó không thể tự xử lý được nên nó sẽ chuyển yêu cầu tới PHP-FPM để nhờ xử lý. Sau đó PHP-FPM sẽ truy vấn database để thực hiện yêu cầu.
* Sau khi xử lý xong, PHP-FPM sẽ tạo ra 1 trang tĩnh là HTML và trả ngược lại cho Nginx, sau đó Nginx gửi respone (chứa trang tĩnh) về browser để hiển thị cho người dùng.

 Vòng đời của request được minh họa như hình ảnh dưới đây
![image.png](https://images.viblo.asia/ec2898ce-1a7f-429c-99a2-b0e55fa0444d.png)

Nginx có thể bắn đi các request bằng nhiều giao thức khác nhau: HTTP, FastCGI, uwsgi, SCGI hoặc memcached. Trong đó, FastCGI là giao thức phổ biến nhất để Nginx giao tiếp với PHP-FPM

### 2. Giao thức FastCGI
* FastCGI là một giao thức xác định cách mà WebServer (Apache, Nginx) giao tiếp với Server PHP. FastCGI là bản mở rộng của CGI.
* Cả CGI và FastCGI đều dùng để gửi request gồm các thông tin: header, body, input,.. tới Server PHP.
* Với CGI, thông thường mỗi một single request cần có 1 process tương ứng để handle và sau khi xử lý xong thì process này sẽ bị delete.
* FastCGI là cải tiến của CGI, process được khởi tạo ngay khi WebServer start, và không bị delete mỗi khi xử lý xong request, nó sẽ đợi để xử lý request tiếp theo. Điều này làm giảm đi những cái chi phí mỗi khi sinh và diệt process, làm tăng tốc độ xử lý nhưng đồng thời cũng chiếm RAM nhiều hơn.


Tóm lại có thể hiểu, FastCGI như là 1 cầu nối giữa WebServer và Server PHP, Khi WebServer nhận được một request, nó sẽ biết cách cung cấp nó cho FastCGI và PHP biết cách lấy nó từ FastCGI.<br>
    
Lấy ví dụ FastCGI như là shipper, khi khách hàng (WebServer) có yêu cầu đặt món ăn (request) thì shipper sẽ đến cửa hàng (Server PHP) có địa chỉ đặt tại `unix socket` để lấy đồ, sau đó lại mang trả lại cho khác hàng.

![image.png](https://images.viblo.asia/0dc0b908-99af-4363-8283-1604173b03d0.png)

Nhận thấy sức mạnh, tiềm năng của giao thức này, từ đó PHP-FPM (FastCGI Process Manager) ra đời, với mục đích tiếp nhận và xử lý các PHP request được gửi đi bằng giao thức FastCGI này.

### 3. Config domain cho Nginx
```
server {
    listen 80;

    root /usr/share/nginx/html;
    index index.html index.htm index.nginx-debian.html;

    server_name strawberry.local www.strawberry.local;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # location / {
    #         try_files $uri $uri/ =404;
    # }

    gzip on;
    gzip_types text/css application/javascript text/javascript application/x-javascript image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon;
    location / {
        try_files $uri $uri/ /index.php?query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php-fpm/strawberry.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```
1. `server_name strawberry.local www.strawberry.local` ta sẽ config virtual host cho domain này là `www.strawberry.local`
2. Mỗi khi có request, Server sẽ chọc vào thư mục `/usr/share/nginx/html` trong Docker để tìm file và xử lý, sau đó trả kết quả về cho Nginx.
3. Domain này được lắng nghe trên port `80`.
4. `gzip on` giúp nén các dữ liệu trước khi chuyển chúng tới client, làm giảm dung lượng và tiết kiệm băng thông nhờ đó tăng tốc độ duyệt web.
5. `zip_types` : mặc định chỉ có text/plain được nén, bổ sung thêm các tập tin văn bản xml, css, js.
6. `try_files $uri =404` kiểm tra file request có tồn tại trước khi gửi cho PHP-FPM, nếu không sẽ hiển thị trang 404.
7. `fastcgi_pass unix:/var/run/php-fpm/strawberry.sock` địa chỉ mà PHP-FPM lắng nghe để nhận request.
    
### 4. upstream Server
Để Nginx có thể thực sự tạo request xử lý file .php ta cần thêm một bước nữa, đó là `upstream server`, upstream được sử dụng để định nghĩa server lắng nghe ở địa chỉ nào, ngoài ra upstream còn dùng để định nghĩa 1 group các server cho việc load balacing.
    
Ở bước trên, ta mới chỉ setting địa chỉ của PHP-FPM chứ chưa enable nó, do đó ta cần thêm config sau đây. Nếu không có, Nginx sẽ không thể tạo được các request để xử lý file .php, vì ta chưa enable địa chỉ này cho PHP-FPM.
```
upstream php-fpm {
    server unix:/var/run/php-fpm/strawberry.sock;
}
```

    
</div>