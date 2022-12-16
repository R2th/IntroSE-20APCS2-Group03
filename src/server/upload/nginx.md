## NGINX là gì
Năm 2002, Igor Sysoev phát triển Nginx ban đầu và công bố lần đầu vào năm 2004. Tháng 7 năm 2011, công ty Nginx Inc được thành lập với trụ sở đầu tiên tại San Francisco, California, USA.

**NGINX** đọc là "engine-ex", là một phần mềm web server mã nguồn mở nổi tiếng. Ban đầu nó dùng để phục vụ web HTTP. Tuy nhiên sau này nó cũng được dùng làm reverse proxy, HTTP load balancer và email proxy như IMAP, POP3, và SMTP.

 **Nginx** sử dụng kiến trúc đơn luồng, hướng sự kiện vì thế nó hiệu quả hơn Apache server. Nó cũng có thể làm những thứ quan trọng khác, chẳng hạn như load balancing, HTTP caching, hay sử dụng như một reverse proxy.

**NGINX** với khả năng mạnh mẽ, và để có thể xử lý hàng ngàn kết nối cùng lúc, nhiều website có traffic lớn đã sử dụng dịch vụ NGINX. Một vài trong số những ông lớn công nghệ dùng nó là Google, Netflix, Adobe, Cloudflare, WordPress và còn nhiều hơn nữa.
### NGINX và tính năng
NGINX có những tính năng như sau:
* Có khả năng xử lý hơn 10.000 kết nối cùng lúc với bộ nhớ thấp.
* Phục vụ tập tin tĩnh (static files) và lập chỉ mục tập tin.
* Tăng tốc reverse proxy bằng bộ nhớ đệm (cache), cân bằng tải đơn giản và khả năng chịu lỗi.
* Hỗ trợ tăng tốc với bộ nhớ đệm của FastCGI, uwsgi, SCGI, và các máy chủ memcached.
* Kiến trúc modular, tăng tốc độ nạp trang bằng nén gzip tự động.
* Hỗ trợ mã hoá SSL và TLS.
* Cấu hình linh hoạt; lưu lại nhật ký truy vấn
* Chuyển hướng lỗi 3XX-5XX
* Rewrite URL (URL rewriting) dùng regular expressions
* Hạn chế tỷ lệ đáp ứng truy vấn
* Giới hạn số kết nối đồng thời hoặc truy vấn từ 1 địa chỉ
* Khả năng nhúng mã PERL
* Hỗ trợ và tương thích với IPv6
* Hỗ trợ WebSockets
* Hỗ trợ truyền tải file FLV và MP4
**Mail proxy**
Trên máy chủ mail proxy cua NGINX có các phương thức xác thực:

* POP3: USER/PASS, APOP, AUTH LOGIN/PLAIN/CRAM-MD5;
* IMAP: LOGIN, AUTH LOGIN/PLAIN/CRAM-MD5;
* SMTP: AUTH LOGIN/PLAIN/CRAM-MD5;
* Hỗ trợ SSL, STARTTLS và STLS
## Một chút về web server
Chúng ta cần biết cách web server hoạt động khi tìm hiểu thêm về NGINX nhé. Ví dụ nếu ai đó gửi một yêu cầu để mở một trang web. Trình duyệt sẽ liên lạc với server chứa website đó. Sau đó server sẽ tìm kiếm đúng file yêu cầu của trang đó và gửi ngược về cho server. Đây là loại truy vấn đơn giản nhất.
 
 Ví dụ trên được xem như là một single thread - một bộ các bước xử lý dữ liệu được thực thi theo 1 trình tự duy nhất. Web server truyền thống tạo một thread cho mỗi yêu cầu (request). NGINX thì hoạt động theo một cách khác. Nó hoạt động theo kiến trúc bất đồng bộ(asynchronous), hướng sự kiện (event driven). Kiến trúc này có thể hiểu là những threads tương đồng nhau sẽ được quản lý trong một tiến trình (process), và mỗi tiến trình hoạt động chứa các thực thể nhỏ hơn gọi là worker connections. Cả bộ đơn vị này chịu trách nhiệm xử lý các threads.
 
 Worker connections sẽ gửi các truy vấn cho một worker process, worker process sẽ gửi nó tới process cha (master process). Cuối cùng, master process sẽ trả kết quả về cho những yêu cầu đó.
 
 Điều này có vẻ đơn giản, một worker connection có thể xử lý đến 1024 yêu cầu tương tự nhau. Vì vậy, NGINX có thể xử lý hàng ngàn yêu cầu mà không gặp rắc rối gì. Đây cũng là lý do vì sao NGINX tỏ ra hiệu quả hơn khi hoạt động trên môi trường thương mại điện tử, trình tìm kiếm và cloud storage.
###  Cài đặt NGINX
Ở đây mình sẽ cài đặt NGINX bản stable trên windows tại: http://nginx.org/en/download.html
Sau khi tải về file .zip các bạn giải nén nó ra để có fodler nginx. Sau đó chúng ta sẽ có cấu trúc folder nginx
![image.png](https://images.viblo.asia/6206220e-1748-4c0a-93f3-ec9c5812c29c.png)

NGINX không cần phải cài đặt mà chỉ cần chạy file .exe để start, các bạn có thể click vào nginx.exe để start tuy nhiên không nên làm như thế. Ta nên thao tác với nginx ở command line trong foler chứa file nginx.exe. Sau đó chúng ta sẽ có các mã lệnh như sau:

```
start nginx                   # bật nginx
nginx -s stop               # tắt nginx
nginx -s reload           # tải lại cấu hình nginx (khi file cấu hình thay đổi và bạn muốn apply sự thay đổi đó luôn)
```
Hình ảnh:
![image.png](https://images.viblo.asia/82e92078-471c-4af4-9c69-4756fe5f6d37.png)
### Các thông tin cấu hình NGINX
Chúng ta mở file nginx.conf trong folder conf, ta sẽ thấy một số thông tin cơ bản như sau:
```
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
```
trong đó:
* *workerprocesses 1*: sử dụng 1 process
* *errorlog logs/error.log*: file log sẽ lưu ở folder logs/error.log( mở folder logs sẽ thấy), có dấu # ở đầu tức là đang bị disable.

```
http {
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```

* *listen   80*: nginx sẽ lắng nghe tất cả các reqeust từ localhost:80
* request / sẽ được redirect tới file index.html hoặc index.html trong folder html

Đó là lý do vì sao khi ta gõ localhost hoặc localhost:80 trên trình duyệt nó sẽ hiển thị nội dung như trên( nội dung như trne6 chính là file index.html trong folder html, bạn sửa file này thì nội dụng sẽ hiển thị khác).
### Tóm lại
Cảm ơn các bạn đã dành thời gian quý giá của mình để đọc bài viết này, hy vọng nó sẽ có ích cho các bạn, have a nice day <3

Bài viết đã tham khảo:

Hướng dẫn cài đặt và cấu hình NGINX trên Windows: https://stackjava.com/nginx/huong-dan-cai-dat-va-cau-hinh-nginx-tren-windows.html

NGINX là gì? Tổng quan về NGINX: https://topdev.vn/blog/nginx-la-gi/