## Giới thiệu
Hãy hình dung điều này - bạn đã tạo ra một ứng dụng web và bây giờ đang tìm kiếm một web server phù hợp để lưu trữ (host) nó.

Ứng dụng của bạn có thể bao gồm nhiều tệp tin tĩnh (static files) -- HTML, CSS và JavaScript, một backend phục vụ các API hoặc thậm chí nhiều webservice. Nginx có thể là cái bạn đang tìm kiếm và có một vài lý do cho điều đó.

NGINX là một web server mạnh mẽ và sử dụng kiến trúc đơn luồng, hướng sự kiện vì thế nó hiệu quả hơn Apache server nếu được cấu hình chính xác. Nó cũng có thể làm những thứ quan trọng khác, chẳng hạn như load balancing, HTTP caching, hay sử dụng như một reverse proxy.
![](https://images.viblo.asia/ad1ad442-f39b-49b9-81ad-1102c8a7ccf6.jpg)

## Cài đặt cơ bản --Kiến trúc
Có 2 cách để cài đặt NGINX, có thể sử dụng gói (package) dựng sẵn hoặc cài đặt từ source.

Phương thức đầu tiên dễ và nhanh hơn, nhưng cài đặt từ source cung cấp khả năng cài đặt thêm các module khác giúp NGINX mạnh mẽ hơn. Nó cho phép chúng ta tùy chỉnh cho phù hợp với nhu cầu của ứng dụng.

Để cài đặt một gói Debian dựng sẵn, thứ duy nhất cần làm là:
```ruby
sudo apt-get update
sudo apt-get install nginx
```
Sau khi quá trình cài đặt kết thúc, bạn có thể kiểm tra mọi thứ là ỔN bằng cách chạy lệnh dưới đây, nó sẽ hiển thị phiên bản NGINX được cài đặt:
```ruby
sudo nginx -v
nginx version: nginx/1.6.2
```
Webserver mới sẽ được cài đặt tại /etc/nginx/. Nếu bạn vào trong thư mục này, bạn sẽ thấy nhiều tệp tin và thư mục. Nhưng thứ quan trọng nhất cần chú ý là tệp tin nginx.conf và thư mục `sites-available`.
## Thiết lập cấu hình
Những thiết lập quan trọng nhất ở trong tập tin nginx.conf, mặc định nó sẽ như thế này:
```
user www-data;
worker_processes 4;
pid /run/nginx.pid;

events {
    worker_connections 768;
    # multi_accept on;
}

http {

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

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    gzip on;
    gzip_disable "msie6";

    # gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    # gzip_buffers 16 8k;
    # gzip_http_version 1.1;
    # gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```
Tệp tin được cấu trúc thành các ngữ cảnh. Đầu tiên là **events**, và thứ 2 là **http**. Cấu trúc này có một vài lợi thế trong việc cấu hình, như mỗi ngữ cảnh có thể lồng trong ngữ cảnh khác, cái kế thừa mọi thứ từ cha mẹ của chúng nhưng cũng có thể ghi đè thiết lập nếu cần.

Nhiều thứ trong tệp tin này có thể tinh chỉnh dựa theo nhu cầu của bạn, nhưng bạn cũng có thể sử dụng các thiết lập mặc định. Một số phần quan trọng của tệp tin cấu hình này là:
* **worker_processes**: Thiết lập này định nghĩa số worker processes mà NGINX sẽ sử dụng. Bởi vì NGINX là đơn luồng (single threaded), nó thường bằng với số lõi CPU.
* **worker_connection**: Đây là số lượng tối đa của các kết nối đồng thời cho mỗi worker process và nói cho các worker process của chúng ta có bao nhiêu người có thể được phục vụ đồng thời bởi NGINX.
* **access_log & error_log**: Đây là những tệp tin mà NGINX sẽ sử dụng để log bất kỳ lỗi và số lần truy cập. Các bản ghi này thường được sử dụng để gỡ lỗi hoặc sửa chữa.
* **gzip**: Đây là các thiết lập nén GZIP của các NGINX reponse. Tính năng này có nhiều thiết lập phụ, phần bị comment bởi mặc định có thể giúp hiệu suất được cải thiện đáng kể. Trong các thiết lập phụ của GZIP, cần quan tâm tới `gzip_comp_level`, nó là mức nén và nằm trong khoảng từ 1 tới 10. Thông thường, giá trị này không nên lớn hơn 6 -- trên mức này lợi ích từ việc nén là không đáng kể, vì nó cần sử dụng nhiều CPU hơn. `gzip_types` là một danh sách các kiểu response sẽ được nén.

NGINX có thể hỗ trợ nhiều hơn một website, và các tệp tin định nghĩa các trang web của bạn ở trong thư mục `/etc/nginx/sites-available.`

Tuy nhiên, các tệp tin trong thư mục này không "live" -- bạn có thể có nhiều tệp tin định nghĩa các trang web ở đây, nhưng NGINX không thực sự làm bất cứ điều gì với chúng trừ khi chúng được symlink (liên kết tượng trưng) tới thư mục `/etc/nginx/sites-enabled` (bạn cũng có thể copy chúng tới thư mục này, nhưng symlink đảm bảo rằng chỉ có duy nhất một bản copy của mỗi tệp tin được theo dõi).

Nó cung cấp cho bạn một phương thức để nhanh chóng đưa các trang web online hoặc offilne mà không cần phải thực sự xóa bất kỳ tệp tin nào -- khi bạn sẵn sàng cho một trang web online, tạo symlink tới `sites-enabled` và khởi động lại NGINX.

Thư mục site-available bao gồm các cấu hình cho các host ảo (virtual host). Nó cho phép web server có thể cấu hình cho nhiều trang web với các cấu hình riêng biệt. Các trang web trong thư mục không live và chỉ được cho phép nếu chúng ta tạo một symlink tới thư mục `sites-enabled`.

Bạn có thể tạo một tệp tin mới cho ứng dụng của mình hoặc chỉnh sửa một tệp tin mặc định. Một cấu hình thông thường sẽ như dưới đây:

```
upstream remoteApplicationServer {
    server 10.10.10.10;
}

upstream remoteAPIServer {
    server 20.20.20.20;
    server 20.20.20.21;
    server 20.20.20.22;
    server 20.20.20.23;
}


server {
    listen 80;
    server_name www.customapp.com customapp.com
    root /var/www/html;
    index index.html

        location / {
            alias /var/www/html/customapp/;
            try_files $uri $uri/ =404;
        }

        location /remoteapp {
            proxy_set_header   Host             $host:$server_port;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_pass http://remoteAPIServer/;
        }

        location /api/v1/ {
            proxy_pass https://remoteAPIServer/api/v1/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_redirect http:// https://;
        }
}
```

Giống như `nginx.conf`, nó cũng sử dụng khái niệm các ngữ cảnh lồng nhau (và tất cả cũng được lồng trong ngữ cảnh **HTTP** CỦA `nginx.conf`, vì thế chúng cũng kế thừa mọi thứ từ nó).

Ngữ cảnh **server** định nghĩa một server ảo để xử lý các request từ client của bạn. Bạn có thể có nhiều khối server, và NGINX sẽ chọn một trong số chúng dựa trên các chỉ thị `listen` và `server_name`.

Trong một khối server, chúng ta định nghĩa nhiều ngữ cảnh **location** được sử dụng để quyết định cách xử lý các request từ client. Bất cứ khi nào một request đến, NGINX sẽ thử khớp URI tới một trong số các định nghĩa location và xử lý nó cho phù hợp.

Có nhiều chỉ thị quan trọng có thể được sử dụng dưới ngữ cảnh location, chẳng hạn như:
* **try_files** sẽ cố gắng phục vụ các tệp tin tĩnh được tìm thấy trong thư mục được trỏ tới bởi chỉ thị gốc.
* **proxy_pass** sẽ gửi request tới một proxy server cụ thể.
* **rewrite** sẽ viết lại URI tới dựa trên một regular expression để một khối location có thể xử lý nó.

Ngữ cảnh **upstream** định nghĩa một pool của các server cái NGINX sẽ ủy quyền các request tới. Sau khi chúng ta tạo một khối upstream và định nghĩa một server bên trong nó chúng có thể tham chiếu nó bằng tên bên trong các khối location. Thêm nữa, một ngữ cảnh upstream có thể có nhiều server được gán trong nó vì rằng NGINX sẽ làm một vài load balancing khi ủy quyền các request.

## Bắt đầu NGINX
Sau khi chúng ta hoàn tất cấu hình và di chuyển ứng dụng web tới thư mục phù hợp, chúng ta có thể khởi động NGINX sử dụng lệnh dưới đây:
`sudo service nginx start`
Sau đó, bất cứ khi nào chúng ta thay đổi cấu hình, chúng ta chỉ cần tải lại (không có thời gian downtime) sử dụng lệnh dưới đây:
`service nginx reload`
Cuối cùng, chúng ta có thể kiểm tra trạng thái của NGINX sử dụng lệnh dưới đây:
`service nginx status`
## Kết luận
Với nhiều tính năng mở rộng, NGINX có thể là một cách tuyệt vời để phục vụ ứng dụng của bạn hay thậm chí được sử dụng như một HTTP proxy hay load balancer cho các web server khác. Hiểu cách NGINX làm việc và xử lý các request sẽ cung cấp nhiều sức mạnh để mở rộng (scaling) và cân bằng tải (balancing the load) cho ứng dụng của bạn.

Tài liệu tham khảo: https://medium.freecodecamp.org/an-introduction-to-nginx-for-developers-62179b6a458f