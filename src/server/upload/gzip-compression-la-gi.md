- Gzip là một phương thức nén file để transfer nhanh hơn.
- Nó cũng là một định dạng file.

Việc nén này giúp máy chủ của bạn cung cấp file có kích thước nhỏ hơn, để người dùng load web nhanh hơn.

![](https://images.viblo.asia/3a14a10c-8bc1-4aa8-8349-0f887390faf4.png)

Việc kích hoạt nén file bằng gzip là một tiêu chuẩn thông thường. Tuy nó không phải là bắt buộc (bạn có thể không kích hoạt vì một số lý do) nhưng nếu không kích hoạt thì trang web của bạn có thể chậm hơn tương đối nhiều so với các trang web khác.

### Cách kích hoạt Gzip compression
- Compression được kích hoạt thông qua config webserver.
- Các webserver khác nhau có những cách config khác nhau.

Trong bài viết này chúng ta cùng tìm hiểu cách config với .htaccess, Apache, Nginx, and Litespeed webservers.

### Kích hoạt compression thông qua .htaccess
Đối với hầu hết người đọc bài viết này, việc kích hoạt compression được thực hiện bằng cách thêm vài dòng code vào file .htaccess trên webserver. 

Đoạn code cần thêm vào .htaccess
```
<ifModule mod_gzip.c>
mod_gzip_on Yes
mod_gzip_dechunk Yes
mod_gzip_item_include file .(html?|txt|css|js|php|pl)$
mod_gzip_item_include handler ^cgi-script$
mod_gzip_item_include mime ^text/.*
mod_gzip_item_include mime ^application/x-javascript.*
mod_gzip_item_exclude mime ^image/.*
mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</ifModule>
```

Save file .htaccess rồi refresh trang web của bạn.

### Kích hoạt compression trên Apache webservers
Các hướng dẫn và đoạn code ở trên hoạt động được trên Apache. 
Nếu nó không hoạt động, hãy xóa đoạn code trên khỏi file .htaccess và thay bằng đoạn code dưới:

```
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
```


### Kích hoạt compression trên NGINX webservers

Để kích hoạt compression trên NGINX, bạn cần thêm đoạn code dưới vào file config của bạn:

```
gzip on;
gzip_comp_level 2;
gzip_http_version 1.0;
gzip_proxied any;
gzip_min_length 1100;
gzip_buffers 16 8k;
gzip_types text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# Disable for IE < 6 because there are some known problems
gzip_disable "MSIE [1-6].(?!.*SV1)";

# Add a vary header for downstream proxies to avoid sending cached gzipped files to IE6
gzip_vary on;
```


### Kích hoạt compression trên Litespeed webservers
Cách tất nhất để kích hoạt compression trên Litespeed là thực hiện cấu hình thông qua "tuning". Kiểm tra trạng thái "enable compression", nếu nó chưa được bật thì click "edit" rồi bật nó lên. 

### Gzip compression có hiệu quả thế nào?
Khi nén các file HTML và CSS của bạn bằng gzip thường giúp tiết kiệm khoảng 50-70% kích thước file. Điều đó có nghĩa là sẽ mất ít thời gian hơn để tải trang của bạn và sử dụng ít bằng thông hơn.

### Các file bị nén hoạt động như thế nào trên web?
![](https://images.viblo.asia/28989d3c-5367-485e-988b-bbde3d23ccab.png)

Khi một request được tạo từ trình duyệt tới một page trong trang web của bạn, webserver sẽ trả về file nén có kích thước nhỏ nến trình duyệt có thể đọc được file đã nén. Các trình duyệt hiện đại hấu hết đều có thể đọc hiểu được các file nén

### Nguồn
https://varvy.com/pagespeed/enable-compression.html