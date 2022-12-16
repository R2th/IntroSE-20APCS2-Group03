## 1. NGINX là gì?
**NGINX** là một phần mềm mã nguồn mở được dùng như là một web server, reverse proxy, caching, load balancing, media streaming, ... Ban đầu, nó được thiết kế để làm web server có hiệu suất và độ ổn định cao. Ngoài khả năng giao tiếp bằng HTTP, **NGINX** còn có thể hoạt động như là một email server (IMAP, POP3, SMTP), reverse proxy, load balancer cho các server dùng HTTP, TCP và UDP.

## 2. Tiểu sử
Ban đầu, Igor Sysoev viết **NGINX** là để giải quyết [vấn đề 10k](https://en.wikipedia.org/wiki/C10k_problem) (C10k_problem), một thuật ngữ được đặt ra vào năm 1999 để mô tả những vấn đề mà những web server thời bấy giờ gặp phải. Đó là xử lý một lượng lớn kết nối cùng một lúc (C10k là viết tắt của *concurrent*). Với kiến trúc hướng sự kiện (event-driven) và bất đồng bộ (asynchronous), **NGINX** đã làm nên một cuộc cách mạng khi trở thành web server chạy nhanh nhất vào thời bấy giờ.

Sau khi open source hóa dự án vào năm 2004 và nhận thấy sự tin dùng tăng theo cấp số mũ. Sysoev đã sáng lập **NGINX, Inc.** để tiếp tục hỗ trợ phát triển và thương mại hóa **NGINX Plus** với những tính năng dành cho các doanh nghiệp. Ngày nay, **NGINX** và **NGINX Plus** có thể xử lý hàng trăm ngàn kết nối cùng một lúc và là nền tảng của hơn 50% trang web truy cập nhiều nhất trên internet.

## 3. NGINX khi là Web Server
Mục tiêu cuối cùng của **NGINX** là tạo ra một web server nhanh nhất và việc duy trì **NGINX** hiện tại vẫn là một mục tiêu chính của dự án. **NGINX** vẫn luôn vượt trên Apache và những web server khác về hiệu năng sử dụng. Kể từ ngày ra mắt chính thức của **NGINX**, các website đã mở rộng từ những trang HTML đơn giản cho đến những nội dung đa dạng, linh hoạt. **NGINX** đã phát triển cùng với nó và giờ đã hỗ trợ tất cả các thành phần của web hiện đại, bao gồm WebSocket, HTTP/2, khả năng streaming nhiều định dạng video như HDS, HLS, RTMP, ...

## 4. Câu chuyện đằng sau NGINX
Mặc dù **NGINX** nổi tiếng là một web server chạy nhanh nhất, nhưng kiến trúc dễ mở rộng của nó đã chứng minh những công việc lý tưởng dành cho web server ngoài *serving content*.  Vì nó có thể xử lý một lượng lớn các kết nối nên **NGINX** thường được sử dụng như là một reverse proxy và load balancer để quản lý lượng truy cập và phân phối chúng đến những server chậm hơn (từ *legacy database* cho đến *microservices*).

**NGINX** cũng thường được đặt giữa client và server chính, để giải mã SSL/TLS hoặc dùng để tăng tốc web, hoạt động như một máy chủ trung gian. **NGINX** xử lý hiệu quả các tác vụ có thể làm chậm server như giải mã SSL/TLS hoặc nén và cache nội dung để tăng hiệu suất. Các trang web động thường triển khai **NGINX** làm bộ nhớ đếm và reverse proxy để giảm tải cho các server và sử dụng phần cứng một cách hiệu quả nhất.

## 5. Những thư mục và câu lệnh quan trọng
### 5.1. File và thư mục
- `/etc/nginx`
    - Thư mục `/etc/nginx` là thư mục gốc để cài đặt cấu hình mặc định cho **NGINX**. Trong thư mục này, bạn sẽ tìm thấy những file config mô tả cách **NGINX** hoạt động.

- `/etc/nginx/nginx.conf`
    - Đây là file config mặc định của **NGINX**. File config này sẽ thiết lập *global* những thứ như worker process, tuning, logging, load module hay reference đến những file config khác. Mặc định, `/etc/nginx/nginx.conf` chứa block cấp cao nhất - `http` - cái mà sẽ thêm những file config khác ở trong thư mục dưới dây.

- `/etc/nginx/conf.d/`
  - Đây là thư mục chứa những file config mặc định dùng HTTP. Những file có đuôi `.conf` sẽ được thêm vào trong file `/etc/nginx/nginx.conf`. Ở một số phiên bản khác, folder này được đặt tên là `sites-enable`nhưng quy ước này đã bị loại bỏ.

- `/var/log/nginx/`
    - Đây là thư mục log mặc định của **NGINX**. Trong thư mục này, bạn sẽ tìm thấy *`access.log`* và *`error.log`*. File *`access.log`* chứa thông tin của mỗi request đến **NGINX** server. File *`error.log`* chứa lỗi và những thông tin debug.

### 5.2. Những câu lệnh quan trọng
- `nginx -h`
    - Hiện lên menu trợ giúp của **NGINX**

- `nginx -v`
    - Hiện lên phiên bản của **NGINX**

- `nginx -V
    - Hiển thị phiên bản, build, configuartion, module, ... của **NGINX**

- `nginx -t`
    - Câu lệnh dùng để test xem config của **NGINX** đã đúng hay chưa

- `nginx -T`
    - Giống `nginx -t` và hiển thị thêm trợ giúp về config đúng

- `nginx -s signal`
    - Option `-s` sẽ gửi một tín hiệu đến process tổng của **NGINX**. Bạn có thể gửi những tín hiệu như là: `stop`, `quit`, `reload`, `reopen`. Tín hiệu `stop` sẽ dừng **NGINX** ngay lập tức, `quit` sẽ dừng **NGINX** ngay sau khi nó thực hiện xong request hiện tại, `reload` sẽ load lại config, `reopen` dùng để mở lại log file.

Với những kiến thức cốt lõi bên trên về file, thư mục, câu lệnh, giờ bạn đã sẵn sàng để thực hành với **NGINX** rồi! Hãy cứ thử chỉnh sửa file config và test bằng `nginx -t` nếu test thành công thì nên dùng `nginx -s reload` để reload lại những thay đổi nữa nhé.
## 6. Serving Static Content
Giờ hãy config để serve static content với **NGINX**, hãy viết lại file `/etc/nginx/conf.d/default.conf` với nội dung như sau:
```nginx
    server {
        listen 80 default_server;
        server_name www.example.com;
        
        location / {
            root /usr/share/nginx/html;
            # alias /usr/share/nginx/html;
            index index.html index.htm;
        }
    }
```
Đoạn config này sẽ serve static file bằng HTTP qua cổng 80 từ thư mục `/usr/share/nginx/html/`. 

- Dòng đầu tiên định nghĩa là một `server` block - một context để **NGINX** listen. 
- Dòng thứ hai chỉ dẫn cho **NGINX** listen ở port 80 và tham số `default_server` chỉ dẫn cho **NGINX** sử dụng server này là server mặc định cho port 80.
- Ở dòng thứ ba, `server_name` directive định nghĩa một hostname hoặc những cái tên mà những request sẽ trỏ về server này.
- `location` block định nghĩa một config dựa trên path của URL (hay còn gọi là URI). **NGINX** sẽ match URI của request đến `location` block. Ví dụ trên dùng `/` để match tất cả các request.
-  `root` directive cho **NGINX** biết thư mục nào là thư mục để tìm kiếm file trả về cho client.
-  Cuối cùng, `index` directive sẽ cung cấp cho **NGINX** một file hoặc một list file để kiểm tra và trả về cho client.

Trên đây là giới thiệu sơ lược và những concept chính, hy vọng các bạn đã có một cái nhìn khái quát hơn về **NGINX** :D

## 7. Tài liệu tham khảo
- [What is NGINX?](https://www.nginx.com/resources/glossary/nginx/)
- NGINX Cookbook