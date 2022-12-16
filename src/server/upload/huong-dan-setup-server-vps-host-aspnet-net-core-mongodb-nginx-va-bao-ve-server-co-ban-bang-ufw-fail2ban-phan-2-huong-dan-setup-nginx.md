Nối tiếp bài viết trước [bài viết trước](https://viblo.asia/p/huong-dan-setup-server-vps-host-aspnet-net-core-mongodb-nginx-va-bao-ve-server-co-ban-bang-ufw-fail2ban-phan-1-cai-dat-moi-truong-va-firewall-m68Z0j9N5kG)Phần 1 - Cài đặt môi trường và firewall 
Hôm nay mình sẽ hướng dẫn setup nginx cơ bản, cách tăng tốc và bảo vệ website của bạn. 

# Cài đặt Nginx:

Tham khảo: "https://nginx.org/en/docs/"

Nginx là một trong những web server phổ biến nhất trên thế giới và chịu trách nhiệm lưu trữ một số trang web lớn và có lưu lượng truy cập cao trên internet. Nó là một lựa chọn nhẹ có thể được sử dụng như một web server or reverse proxy.
Đầu tiên mình sẽ kiểm tra nginx có đang run:
```
systemctl status nginx
```
```
Output
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   Memory: 3.5M
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```
Hoặc mở web `http://your_server_ip`

## Câu lệnh để quản lý Nginx Process:

Stop web server:
```
sudo systemctl stop nginx
```
Start web server khi nginx stop:
```
sudo systemctl start nginx
```
Stop và start lại nginx:
```
sudo systemctl restart nginx
```
Nếu bạn chỉ thực hiện thay đổi cấu hình, Nginx thường có thể tải lại mà không làm rớt kết nối. Để làm điều này, hãy nhập:
```
sudo systemctl reload nginx
```
Theo mặc định, Nginx được định cấu hình để khởi động tự động khi máy chủ khởi động. Nếu đây không phải là những gì bạn muốn, bạn có thể vô hiệu hóa hành vi này bằng cách nhập:
```
sudo systemctl disable nginx
```
Để bật lại dịch vụ khởi động khi khởi động, bạn có thể nhập:
```
sudo systemctl enable nginx
```

## Làm quen với các tệp và thư mục Nginx quan trọng

```
Server Configuration

*     /etc/nginx: The Nginx configuration directory. All of the Nginx configuration files reside here.
*     /etc/nginx/nginx.conf: The main Nginx configuration file. This can be modified to make changes to the Nginx global configuration.
*     /etc/nginx/sites-available/: The directory where per-site server blocks can be stored. Nginx will not use the configuration files found in this directory unless they are linked to the sites-enabled directory. Typically, all server block configuration is done in this directory, and then enabled by linking to the other directory.
*     /etc/nginx/sites-enabled/: The directory where enabled per-site server blocks are stored. Typically, these are created by linking to configuration files found in the sites-available directory.
>     /etc/nginx/snippets: This directory contains configuration fragments that can be included elsewhere in the Nginx configuration. Potentially repeatable configuration segments are good candidates for refactoring into snippets.

Server Logs

*     /var/log/nginx/access.log: Every request to your web server is recorded in this log file unless Nginx is configured to do otherwise.
*     /var/log/nginx/error.log: Any Nginx errors will be recorded in this log.

```

##  Cài đặt server blocks 

Khi sử dụng Nginx web server, các web server blocks được sử dụng để cấu hình chi tiết web server và file thực thi. Mình sẽ thiết lập web server tên miền `your_domain`, bạn nên thay thế bằng tên miền của bạn. Nếu có nhiều tên miền hoặc web service bạn có thể thêm block ở đây mình sẽ có thêm 1 `guest` , 1 `api`.
```
sudo mkdir -p /var/www/your_domain
sudo mkdir -p /var/www/guest
sudo mkdir -p /var/www/api
```
Tiếp theo, chỉ định quyền sở hữu thư mục với biến môi trường `$ USER` ,  thường thì mình sẽ dùng user www-data cho các thưc mục chưa html, các file load trên web. 
```
sudo chown -R www-data:www-data /var/www/your_domain/html
sudo chown -R www-data:www-data /var/www/your_domain/wwwroot
sudo chown -R www-data:www-data /var/www/guest/html
```
Chỉ định permissions của web, quyền đọc(read), ghi(write) và thực thi file (execute). Các bạn nên chỉ định chính xác quyền sẽ cấp cho thưc mục và files để tăng tính bảo mật. Thông thường "Directories 755 , Files 644".
Tham khảo "https://www.pluralsight.com/blog/it-ops/linux-file-permissions"

```
sudo chmod  755 /var/www/your_domain
sudo chmod  755 /var/www/guest
sudo chmod -R 644 /var/www/your_domain/
sudo chmod -R 644 /var/www/guest/
```
Tiếp theo sửa file configuration block của nginx:
```
sudo nano /etc/nginx/sites-available/your_domain
```
Thêm vào nội dung:
```
server {
        listen 80;
        listen [::]:80;
        server_name your_domain www.your_domain;

        location / {
                 root /var/www/your_domain;
                 proxy_pass        https://localhost:5001;
                try_files $uri $uri/ =404;
        }
}
```

Tiếp theo, hãy kích hoạt tệp bằng cách tạo một liên kết từ nó đến thư mục hỗ trợ trang web, mà Nginx đọc từ đó trong khi khởi động:

```
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
```

Hai khối máy chủ hiện đã được kích hoạt và được định cấu hình để phản hồi các yêu cầu dựa trên các lệnh nghe và server_name của chúng (bạn có thể đọc thêm về cách Nginx xử lý các lệnh này [tại đây](https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms)):

    your_domain: Sẽ phản hồi các yêu cầu cho your_domain và www.your_domain.
    default: Sẽ phản hồi bất kỳ yêu cầu nào trên cổng 80 không khớp với hai khối còn lại.
    
Tiếp theo, hãy kiểm tra để đảm bảo rằng không có lỗi cú pháp nào trong bất kỳ tệp Nginx nào của bạn:
```
sudo nginx -t
```
Nếu không có bất kỳ sự cố nào, hãy khởi động lại Nginx để kích hoạt các thay đổi của bạn:
```
sudo systemctl restart nginx
```

##  Tiếp theo mình sẽ hướng dẫn cài đặt nginx cho server name your_domain với usecase cho nhiều project cùng chạy trên domain.

Trong trường hợp web site của mình có 3 project chạy cùng domain:
*  your_domain cho user thường dùng.   https://localhost:5001
*  your_domain/guest cho user không cần đăng nhập dùng với giao diện khác và chức năng hạn chế.  https://localhost:5002
*  your_domain/api  dùng cho api server.  https://localhost:5003
*Lưu ý cách làm này có thể làm giảm hiệu năng của server và có thể tạo bottleneck. Có nhiều cách tốt hơn như tạo sub domain, thêm IP hoặc thêm VPS* 
Mình sẽ setting server blocks bằng cách regex url để reverse proxy về project. 
```
sudo nano /etc/nginx/sites-available/your_domain
```
```
server {
        listen 80;
        listen [::]:80;
        server_name your_domain www.your_domain;

        location ~ ^/(?!api|guest)  {
                 root /var/www/your_domain;
                 proxy_pass        https://localhost:5001;
                try_files $uri $uri/ =404;
        }
          location ~ ^/(guest)  {
                 root /var/www/guest;
                 proxy_pass        https://localhost:5002;
                try_files $uri $uri/ =404;
        }
           location ~ ^/(api)  {
                 root /var/www/api;
                 proxy_pass        https://localhost:5003;
                try_files $uri $uri/ =404;
        }
}
```

## Cải thiện hiệu năng và bảo vệ server bằng nginx:

Tiếp theo mình sẽ hướng dẫn các bạn cách cải thiện hiệu năng và bảo vệ server bằng nginx cơ bản. Hy vọng sẽ giúp server ổn định cũng như giảm các cuộc tấn công làm downtime server.

> Tham khảo: https://github.com/denji/nginx-tuning  , https://gist.github.com/denji/8359866

### Đầu tiên mình sẽ thêm fillter và block

 **SQL injections**

```
if ($query_string ~ "union.*select.*\(") {
        set $block_sql_injections 1;
    	}
    	if ($query_string ~ "union.*all.*select.*") {
        set $block_sql_injections 1;
    	}
    	if ($query_string ~ "concat.*\(") {
        set $block_sql_injections 1;
    	}
    	if ($block_sql_injections = 1) {
        return 403;
    	}
```

** File injections:**

```
set $block_file_injections 0;
    	if ($query_string ~ "[a-zA-Z0-9_]=http://") {
        	set $block_file_injections 1;
    	}
    	if ($query_string ~ "[a-zA-Z0-9_]=(\.\.//?)+") {
        set $block_file_injections 1;
    	}
    	if ($query_string ~ "[a-zA-Z0-9_]=/([a-z0-9_.]//?)+") {
        	set $block_file_injections 1;
    	}
    	if ($block_file_injections = 1) {
        	return 403;
    	}
```

**Mình sẽ fillter và block các exploits đơn giản**

```
set $block_common_exploits 0;
    	if ($query_string ~ "(<|%3C).*script.*(>|%3E)") {
        	set $block_common_exploits 1;
    	}
    	if ($query_string ~ "GLOBALS(=|\[|\%[0-9A-Z]{0,2})") {
        	set $block_common_exploits 1;
    	}
    	if ($query_string ~ "_REQUEST(=|\[|\%[0-9A-Z]{0,2})") {
        	set $block_common_exploits 1;
    	}
    	if ($query_string ~ "proc/self/environ") {
        	set $block_common_exploits 1;
    	}
    	if ($query_string ~ "mosConfig_[a-zA-Z_]{1,21}(=|\%3D)") {
        	set $block_common_exploits 1;
    	}
    	if ($query_string ~ "base64_(en|de)code\(.*\)") {
        	set $block_common_exploits 1;
    	}
    	if ($block_common_exploits = 1) {
        	return 403;
    	}
```

**Chặn các user agents bất thường phổ biến** 

Thường các User-Agent sẽ thay đổi trong quá trình tấn công, nên cách này không hiệu quả. Bạn nên theo dõi server hoặc viết 1 script để tự thêm user-agent.  
```
## Block user agents
	set $block_user_agents 0;
	# Don't disable wget if you need it to run cron jobs!
	if ($http_user_agent ~ "Wget") {
	set $block_user_agents 1;
	}
	 # Disable Akeeba Remote Control 2.5 and earlier
   	if ($http_user_agent ~ "Indy Library") {
        set $block_user_agents 1;
    	}

   	 # Common bandwidth hoggers and hacking tools.
   	 if ($http_user_agent ~ "libwww-perl") {
        set $block_user_agents 1;
   	 }
   	 if ($http_user_agent ~ "GetRight") {
        set $block_user_agents 1;
    	}
   	if ($http_user_agent ~ "GetWeb!") {
        set $block_user_agents 1;
    	}
    	if ($http_user_agent ~ "Go!Zilla") {
        set $block_user_agents 1;
    	}
    	if ($http_user_agent ~ "Download Demon") {
        	set $block_user_agents 1;
    	}
    	if ($http_user_agent ~ "Go-Ahead-Got-It") {
        set $block_user_agents 1;
    	}
    	if ($http_user_agent ~ "TurnitinBot") {
        set $block_user_agents 1;
    	}
    	if ($http_user_agent ~ "GrabNet") {
        set $block_user_agents 1;
    	}
        
    	if ($block_user_agents = 1) {
        return 403;
    	}
```
*Bạn có thể xem log nginx để thêm các fillter trong quá trình website hoạt động để chống lại các truy cập bất thường*

Giới thiệu cho bạn 1 tools đơn giản và hiệu quả mình đang dùng "https://github.com/mitchellkrogza/nginx-ultimate-bad-bot-blocker" đừng quên donate cho tác giả đã đóng góp cho cộng đồng. 

###  Chống DDoS đơn giản:

**Giới hạn số connection và request.**

```
# limit the number of connections per single IP
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

# limit the number of requests for a given session
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;

# zone which we want to limit by upper values, we want limit whole server
server {
    limit_conn conn_limit_per_ip 10;
    limit_req zone=req_limit_per_ip burst=10 nodelay;
}

# if the request body size is more than the buffer size, then the entire (or partial)
# request body is written into a temporary file
client_body_buffer_size  128k;

# buffer size for reading client request header -- for testing environment
client_header_buffer_size 3m;

# maximum number and size of buffers for large headers to read from client request
large_client_header_buffers 4 256k;

# read timeout for the request body from client -- for testing environment
client_body_timeout   3m;

# how long to wait for the client to send a request header -- for testing environment
client_header_timeout 3m;
```
**Thêm  Client-Side Certificate Authentication with nginx**
Mình sẽ thêm Client-Side Certificate Authentication cho api server, hoặc server chỉ dùng nội bộ.
Tham khảo  "https://fardog.io/blog/2017/12/30/client-side-certificate-authentication-with-nginx/" để tạo file certificate
```
    # client certificate
    ssl_client_certificate /etc/nginx/client_certs/ca.crt;
    # make verification optional, so we can display a 403 message to those
    # who fail authentication
    ssl_verify_client optional;
       location ~ ^/(api)  {
    
        # if the client-side certificate failed to authenticate, show a 403
        # message to the client
       if ($ssl_client_verify != SUCCESS) {
        return 403;
       }
      
      }
```

###  Cải thiện hiệu năng:

Nginx hỗ trợ nhiều loại cache (Disk, Ram) với nhiều cách config khác nhau tùy theo nhu cầu và cấu hình server của bạn.
Tham khảo "https://www.linuxcapable.com/nginx-optimization-tuning-with-caching/"

**Traditional Disk cache**

Đầu tiên tạo thư mục cache:
```
sudo mkdir -p /cache/tmpfs/
```
Tiếp theo, thêm phần sau vào khối máy chủ của bạn, sửa đổi khối máy chủ proxy hiện có và thêm các tính năng bổ sung.
```
proxy_cache_path /cache/nginx/tmpfs levels=1:2 keys_zone=my_cache:100m max_size=6g inactive=1d use_temp_path=off;
server {
    ...
    location / {
        proxy_cache my_cache;
        proxy_cache_key $scheme$request_method$proxy_host$request_uri;
        proxy_cache_valid 404 302 1m;
        proxy_cache_valid 200 1d;
        proxy_http_version   1.1;
        add_header X-Cache-Status $upstream_cache_status;
        proxy_cache_background_update on;
        proxy_cache_lock on;
    }
    ...
}
```
Cài đặt cache cho các file static thường dùng:
```
if ( $http_referer  ~* ^.+\.(?:css|cur|js|jpe?g|gif|htc|ico|png|html|xml|otf|ttf|eot|woff|woff2|svg))
	{
            access_log off;
    		expires 30d;
    		add_header Cache-Control public;
            add_header Vary Accept-Encoding;
            ## No need to bleed constant updates. Send the all shebang in one
    		## fell swoop.
    		#tcp_nodelay off;

    		## Set the OS file cache.
    		#open_file_cache max=3000 inactive=120s;
    		#open_file_cache_valid 45s;
    		#open_file_cache_min_uses 2;
    		#open_file_cache_errors off;
	}
```

**Nginx cache in RAM**

Nếu máy chủ của bạn có tài nguyên, bộ cache vào RAM sẽ luôn tốt hơn disk, điều này thậm chí còn áp dụng cho các ổ SSD tối tân. Điều này là nhằm hướng tới các máy chủ tự quản lý và có nguồn tài nguyên dồi dào như ram không làm gì cả.

Đầu tiên, tạo một thư mục mới để lưu vào bộ nhớ đệm trong RAM:
```
sudo mkdir -p /cache/nginx/tmpfs
```
Thứ hai, gắn kết thư mục đã tạo trong RAM với (tmpfs) bằng lệnh sau:
```
sudo mount -t tmpfs -o size=2g tmpfs /cache/nginx/tmpfs
```
Điều này gắn (/data/nginx/tmpfs) trong RAM, phân bổ 2 GB. Điều này có thể được điều chỉnh tăng hoặc giảm. Các máy chủ nhỏ hơn sẽ bắt đầu với 512MB thay vì 2g
Nếu bạn cần ngắt kết nối, hãy thực thi đoạn mã sau:
```
sudo umount /cache/nginx/ramcache
```
Để hoàn tất thiết lập với bộ nhớ đệm RAM với Nginx, bạn cần thêm phần sau vào (/ etc / fstab), để khi máy chủ tự động khởi động lại, thư mục bộ nhớ đệm RAM sẽ được tạo lại.
```
sudo nano /etc/fstab
```
```
tmpfs /cache/nginx/tmpfs tmpfs defaults,size=1g 0 0
```
# Tổng kết:
Bài viết này mình đã hướng dẫn các bạn cài đặt môi trường nginx và setup cơ bản để bảo vệ server an toàn hơn. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment. Cảm ơn các bạn đã theo dõi, ở phần tiếp theo mình sẽ hướng dẫn setup để HOST 1 web server dùng ASP.Net , .Net Core và mongodb cũng như một số mẹo mà mình biết.

Bài viết này mình đã hướng dẫn các bạn cài đặt môi trường và setup cơ bản để bảo vệ server an toàn hơn. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment. Cảm ơn các bạn đã theo dõi, ở phần tiếp theo mình sẽ hướng dẫn setup nginx cũng như một số mẹo mà mình biết.

Phần 1 - Cài đặt môi trường và firewall

Phần 2 - hướng dẫn setup nginx .

Phần 3 - Host web với ASP.Net, .Net Core và MongoDB

Phần 4 - Cấu hình HTTPS bằng self-certification hoặc Let's Encrypt.

Một phút quảng cáo, mình đang dùng VPS trên digitalocean.com. Đang có chương trình tặng 100$ cho account sử dụng trong 60 ngày, hãy đăng kí sử dụng và dùng invite link này "https://m.do.co/c/666bcca701f7" để ủng hộ mình.