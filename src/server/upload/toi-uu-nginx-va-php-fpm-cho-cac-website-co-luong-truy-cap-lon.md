![](https://geekflare.com/wp-content/uploads/2018/10/php-fpm-optimization.png)

Bài viết này sẽ hướng dẫn các bạn cấu hình tối ưu Nginx và PHP-FPM, mục đích chung của việc này là giúp Nginx và PHP-FPM hoạt động hiệu quả hơn, sử dụng tài nguyên hợp lý hơn, thông qua đó tăng cường khả năng chịu tải của toàn bộ hệ thống, không lãng phí tài nguyên vô ích.

Trong bài viết này tôi bỏ qua phần cài đặt và cấu hình cơ bản cho Nginx và PHP-FPM, hoặc nếu bạn chưa hiểu việc cài đặt có thể sử dụng lệnh sau đây để cài đặt toàn bộ các thành phần cần thiết.

```
yum install php php-fpm php-mysql php-cgi php-cli php-gd nginx mysql-server -y
``` 
hoặc tham khảo thêm bài viết đã được publish tại đâ (có kết hợp việc cài đặt mod_pageseed): https://viblo.asia/p/tang-toc-website-voi-nginx-va-mod-pagespeed-bJzKmGorl9N
 
Mặc định sau khi cài đặt thành công, các file cấu hình của Nginx sẽ nằm tại /etc/nginx và các file cấu hình PHP-FPM sẽ nằm tại /etc/php-fpm.d. Đầu tiên chúng ta sẽ cấu hình Nginx trước.

## I. NGINX

Mở file `/etc/nginx/nginx.conf` và điều chỉnh theo các hướng dẫn sau.

Đầu tiên các bạn phải biết công thức 

`max_clients = worker_processes * worker_connections`

số lượng người truy cập tối đa Nginx có thể phục vụ bằng thông số `worker_processes` nhân với `worker_connections`. Mặc định sau khi cài đặt Nginx thì 
```
worker_processes = 1
worker_connections = 1024.
```

Các bạn cần chỉnh lại worker_processes bằng với số lượng CPU core trong server bạn cấu hình. Có thể xem số CPU Core thông qua lệnh sau:

```
cat /proc/cpuinfo |grep processor  
 processor     : 0  
 processor     : 1  
 processor     : 2  
 processor     : 3  
 ```
 
Trong trường hợp này là 4, các bạn chỉnh sửa thông số `worker_processes` thành 4. Tuy nhiên nếu bạn có ít hơn 4 thì không nên ghi khống bởi như vậy hệ thống sẽ hoạt động không ổn định và lỗi.

Với `worker_connections` mặc định là 1024 và `worker_processes` đã được điều chỉnh thành 4 như trên thì số lượng người truy cập tối đa đã lên đến `1024 * 4 = 4096`.

Con số này là đủ lớn nên bạn không cần thay đổi gì thêm, trường hợp bạn chỉ có 2 CPU Core nhưng muốn nâng cao số lượng truy cập có thể phục vụ bạn có thể nâng `worker_connections` lên thành 2048, nhưng điều này đôi khi xảy ra lỗi trên server, nên bạn cần thêm thông số sau đây vào file `nginx.conf`, ngay trên đoạn cấu hình `worker_connections`.

```
 worker_rlimit_nofile 2048;  
```

Các bạn cũng nên xóa thông tin phiên bản của Nginx đang sử dụng và các thông tin quan trọng của Nginx bằng việc sửa hoặc bổ sung thông số

```
server_tokens off;  
```

Các bạn cũng cần thiết giới hạn kích thước body của các http request và buffer dùng xử lý http request thông qua việc thêm hai thông số sau đây vào file cấu hình

```
 client_max_body_size 20m;  
 client_body_buffer_size 128k;  
 ```
 
Các bạn cũng nên yêu cầu client cache lại các file tĩnh và ít bị thay đổi, điều đó giúp bạn tiết kiệm băng thông hơn vì không phải tải lại các file tĩnh đó, bạn thêm nội dung sau đây vào từng virtual host trên Nginx. Ngoài ra khi truy cập các file tĩnh cũng không nên log lại vì quá trình ghi log sẽ làm giảm tốc độ xử lý của Nginx, chúng ta bỏ luôn việc log khi truy cập các file tĩnh.

```
location ~* .(jpg|jpeg|gif|png|css|js|ico|xml)$ {  
   access_log    off;  
   log_not_found   off;  
   expires      360d;  
 }  
```

Thông thường việc liên lạc giữa Nginx và PHP-FPM sẽ sử dụng tcp socket, **việc này sẽ làm chậm tốc độ đáng kể so với sử dụng unix socket,** do đó bạn cần chỉnh lại thay vì sử dụng tcp socket nên sử dụng unix socket cho việc truyền tải thông tin, đặt biệt nếu sử dụng ssd thì việc này sẽ càng hiệu quả.

```
location ~* .php$ {  
   fastcgi_index  index.php;  
   fastcgi_pass  127.0.0.1:9000;  
   include     fastcgi_params;  
   fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;  
   fastcgi_param  SCRIPT_NAME    $fastcgi_script_name;  
} 
 ```
 
Nên chuyển thành như sau

```
location ~* .php$ {  
   fastcgi_index  index.php;  
   #Chinh tai day  
   fastcgi_pass  unix:/var/run/php-fpm/php-fpm.sock;  
   include     fastcgi_params;  
   fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;  
   fastcgi_param  SCRIPT_NAME    $fastcgi_script_name;  
}
```

Các bạn cũng không nên cho phép truy cập các file hoặc thư mục ẩn, file và thư mục ẩn trên Linux sẽ có dấu chấm (.) trước tên file, thư mục. Do đó bạn có thể cấu hình như sau để không cho phép truy cập trực tiếp vào.

```
location ~ /. {  
   access_log off;  
   log_not_found off;   
   deny all;  
}  
```

## II. PHP-FPM

**Điều chỉnh đường dẫn file sock giống như trong file Nginx ở trên**

```
listen = /var/run/php-fpm/php-fpm.sock
user = site  
group = site  
request_slowlog_timeout = 5s  
slowlog = /var/log/php-fpm/slowlog-site.log  
listen.allowed_clients = 127.0.0.1  
pm = dynamic  
pm.max_children = 5  
pm.start_servers = 3  
pm.min_spare_servers = 2  
pm.max_spare_servers = 4  
pm.max_requests = 200  
listen.backlog = -1  
pm.status_path = /status  
request_terminate_timeout = 120s  
rlimit_files = 131072  
rlimit_core = unlimited  
catch_workers_output = yes  
env[HOSTNAME] = $HOSTNAME  
env[TMP] = /tmp  
env[TMPDIR] = /tmp  
env[TEMP] = /tmp  
```

Thực sự đối với PHP-FPM các bạn chỉ cần quan tâm đến các thông số sau : `pm`, `pm.max_children`, `pm.start_servers`, `pm.min_spare_servers` và `pm.max_spare_servers`. 

Trong đó `pm` là chế độ quản lý process của PHP-FPM, bao gồm có static, ondemand, dynamic. Thường chúng ta sử dụng dynamic như trên. Theo đó thì ý nghĩa các thông số `pm.max_children`, `pm.start_servers`, `pm.min_spare_servers`, `pm.max_spare_servers` lần lượt là:

```
pm.max_children = Số process con (child processes) tối đa được tạo (tương đương tổng số request có thể phục vụ)
pm.start_servers = Tổng số child processes được tạo khi khởi động php-fpm (được tính bằng công thức `min_spare_servers + (max_spare_servers – min_spare_servers) / 2` )
pm.min_spare_servers = Tổng số child process nhàn rỗi tối thiểu được duy trì.
pm.max_spare_servers = Tổng số child process nhàn rỗi tối đa được duy trì.
```

### Cách tính pm.max_children

#### B1. Xác định số lượng bộ nhớ cần thiết trung bình cho 1 process php-fpm

Chạy lệnh sau:
```
ps -ylC php-fpm --sort:rss
```

Ouput sẽ tương tự như sau, column RSS sẽ chứa giá trị mà chúng ta cần xác định

```
S   UID   PID  PPID  C PRI  NI   RSS    SZ WCHAN  TTY          TIME CMD
S     0 24439     1  0  80   0  6364 57236 -      ?        00:00:00 php-fpm
S    33 24701 24439  2  80   0 61588 63335 -      ?        00:04:07 php-fpm
S    33 25319 24439  2  80   0 61620 63314 -      ?        00:02:35 php-fpm
```

Như kết quả ở trên là khoảng 61620KB, tương đương với ~60MB/process

#### B2. Tính toán ra pm.max_children

Ví dụ server hiện tại có khoảng 4GB RAM, đang chạy cả web và DB, chúng ta sẽ tính con số ước lượng là DB hoạt động khoảng 1GB và 0.5G dành cho buffer. Với các con số như vậy thì dung lượng RAM còn lại cho hoạt động của php-fpm tương đương với:  4 - 1 - 0,5 = 2,5 GB RAM hoặc 2560 Mb.

```
pm.max_children = 2560 Mb / 60 Mb = 42
```

Làm tròn con số xuống (để đảm bảo server hoạt động không bị quá tải), thì `pm.max_children = 40`

### Cách tính pm.min_spare_servers

`pm.min_spare_servers` có giá trị tương đương với 20% của `pm.max_children`.

Nếu như với gía trị ở trên thì `pm.min_spare_servers = 20% * 40 = 8`

*Cũng có hướng dẫn ghi là `pm.min_spare_servers = (cpu cores)  * 2`*

### Cách tính pm.max_spare_servers

`pm.max_spare_servers` có giá trị tương đương với 60% của `pm.max_children`.

Nếu như với gía trị ở trên thì `pm.max_spare_servers = 60% * 40 = 24`

*Cũng có hướng dẫn ghi là `pm.max_spare_servers = (cpu cores) * 4`*

### Cách tính pm.max_requests

Tham số này chính là số lượng request xử lý đồng thời mà server có thể chịu tải được, giá trị phụ thuộc vào `pm.max_children` và số lượng request trên 1s vào server. Con số này tính toán cũng khá hên xui, nhưng có thể có 1 phương pháp là sử dụng tool `ab` của apache sau đó giảm giá trị dần dần sao cho phù hợp.

```
ab -n 5000 -c 100 http://domain.com/
```

Khi chạy command trên thì có nghĩa là tạo ra 5000 request với 100 session hoạt động cùng lúc truy cập vào url `http://domain.com`. Giá trị `pm.max_requests` có thể set là 1000 sau đó tăng/giảm dần đến mức phù hợp (Phù hợp là khi server vẫn còn chịu được tải).

![](https://images.viblo.asia/c7f0507d-e3ba-40cc-a79a-4cf10cdac609.png)


**Nguồn tham khảo:**

* https://geekflare.com/php-fpm-optimization/
* https://vuvangiap.com/huong-dan-cau-hinh-toi-uu-nginx-va-php-fpm.html
* https://www.kinamo.be/en/support/faq/determining-the-correct-number-of-child-processes-for-php-fpm-on-nginx
* https://gurdeep.ninja/php-fpm-process-management/
* https://medium.com/@sbuckpesch/apache2-and-php-fpm-performance-optimization-step-by-step-guide-1bfecf161534