### Nginx là gì?

Nginx là một máy chủ proxy ngược, mã nguồn mở (open source reverse proxy server) sử dụng phổ biến giao thức HTTP, HTTPS, SMTP, POP3 và IMAP , cũng như dùng làm cân bằng tải (load balancer), HTTP cache và máy chủ web (web server). Dự án Nginx tập trung vào việc phục vụ số lượng kết nối đồng thời lớn (high concurrency), hiệu suất cao và sử dụng bộ nhớ thấp. Nginx được biết đến bởi sự ổn định cao, nhiều tính năng, cấu hình đơn giản và tiết kiệm tài nguyên.

Để tìm hiểu sâu hơn về Nginx, các bạn có thể Google và tham khảo các bài viết liên quan, trong khuôn khổ bài viết này, mình muốn giới thiệu cho các bạn về cách cài đặt và gắn module mod_pagespeed vào nginx để làm tăng hiệu năng, tốc độ của website.

### Google PageSpeed là gì?

[PageSpeed ](https://www.modpagespeed.com/) là tập hợp một số các modules dành cho NGINX và Apache, hỗ trợ cho việc tối ưu mã html trên trinh duyệt và đo được performance của website. 
- Viêc tối ưu được thực hiện bằng cách tự động minifying các file resource của web như CSS và Javascript, những thành phần chính gây ảnh hưởng đến page load time. 
- Việc đo performance được thực hiện bằng cách tận dụng tool [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)  để kiểm tra hiệu năng website và có thể suggest một số thay đổi để cải thiện kết quả dựa trên thông số đã đo trước đó.

Có 2 cách để gắn Mod_PageSpeed vào Nginx :

1. Compile lại mã nguồn NGINX để hỗ trợ PageSpeed, sau đó compile lại PageSpeed.
2. Compile PageSpeed như là một dynamic module để gắn vào NGINX.

**Note**

Cài đặt NGINX từ source yêu cầu một vài step bắt buộc và phải tự maintain sau nếu muốn upgrade version của NGINX. Để cài đặt NGINX sử dụng package manager thì có thể tham khảo [tại đây](https://www.linode.com/docs/web-servers/nginx/).

Ở phạm vi bài viết này sẽ giới thiệu cách làm thế nào để compile cả NGINX và PageSpeed. Nếu bạn quan tâm đến việc sử dụng PageSpeed như là một module cho NGINX, có thể tham khảo bài viết khác [tại đây](https://www.nginx.com/blog/optimize-website-google-pagespeed-dynamic-module-nginx-plus/).

**Trước khi  bắt đầu**

- Cần chắc chắn rằng bạn chưa cài 1 instance của NGINX trước đó trên server. Nếu đã cài đặt rồi, thì có thể backup lại các config cần thiết trước khi thực hiện các step dưới đây.
- Cần phải có quyền sudo để thực hiện cài đặt resource.
- Cài đặt hostname cho server.
- Update system’s packages.

### Một số ghi chú khi cài NGINX từ việc compile source

**Filesystem Locations**

Khi cài NGINX từ việc compile source, các file cài đặt sẽ được đặt tại  `/usr/local/nginx/nginx/`, thay vì đặt tại thư mục `/etc/nginx/` như việc cài đặt từ package.

**Built-in Modules**

Khi compile NGINX từ source, sẽ không có modules nào tự động được add vào trừ khi chỉ định trong lúc compile, có nghĩa là ví dụ như HTTPS sẽ không được support. Sử dụng command `nginx -V` có thể check được các module gì đang được add vào NGINX.
  
 ```
root@localhost:~# /usr/local/nginx/sbin/nginx -V
nginx version: nginx/1.13.8
built by gcc 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.5)
configure arguments: --add-module=/root/incubator-pagespeed-ngx-latest-stable
```

 ```
root@localhost:~# nginx -V
nginx version: nginx/1.13.8
built by gcc 4.8.4 (Ubuntu 4.8.4-2ubuntu1~14.04.3)
built with OpenSSL 1.0.1f 6 Jan 2014 (running with OpenSSL 1.0.2g 1 Mar 2016)
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie'
```
 
### Build NGINX và PageSpeed

Ở trang official của PageSpeed, có cung cấp cách thức install PageSpeed tự động từ script.

**Note**

Script tự động cài đặt sẽ cài đặt một số compile tool phục vụ cho việc cài đặt PageSpeed. Nếu đang cài đặt trên môi trường production, hãy tháo cài đặt các thư viện này nếu thực sự không cần thiết để tránh "rác" server.

Nếu có mục đích sử dụng TLS, cần cài đặt thêm thư viện SSL phục vụ cho việc compile HTTPS module :

**CentOS/Fedora**

 `yum install openssl-devel`

**Ubuntu/Debian**

`apt install libssl-dev`

Chạy bash tự động cài đặt:

```
bash <(curl -f -L -sS https://ngxpagespeed.com/install) --nginx-version latest
```
Trong quá trình cài đặt, sẽ có một số thư viện cần xác nhận cài đặt, k cần để ý quá nhiều, hãy ignore vì trong PageSpeed đã bao gồm các thư viện này rồi.

Các option dưới đây là recommend cho việc cài đặt Nginx.

`--prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module`

Tiếp theo sẽ có câu hỏi liên quan đến cấu trúc tư mục cài đặt, chỉ cấn gõ "Y" để tiếp tục:

 ```
Configuration summary
+ using system PCRE library
+ using OpenSSL library: /usr/bin/openssl
+ using system zlib library

nginx path prefix: "/etc/nginx"
nginx binary file: "/usr/sbin/nginx"
nginx modules path: "/usr/lib/nginx/modules"
nginx configuration prefix: "/etc/nginx"
nginx configuration file: "/etc/nginx/nginx.conf"
nginx pid file: "/var/run/nginx.pid"
nginx error log file: "/var/log/nginx/error.log"
nginx http access log file: "/var/log/nginx/access.log"
nginx http client request body temporary files: "/var/cache/nginx/client_temp"
nginx http proxy temporary files: "/var/cache/nginx/proxy_temp"
nginx http fastcgi temporary files: "/var/cache/nginx/fastcgi_temp"
nginx http uwsgi temporary files: "/var/cache/nginx/uwsgi_temp"
nginx http scgi temporary files: "/var/cache/nginx/scgi_temp"

Build nginx? [Y/n]
```

Nếu cài đặt thành công, sẽ có thông báo như dưới đây:

 ```
Nginx installed with ngx_pagespeed support compiled-in.

If this is a new installation you probably need an init script to
manage starting and stopping the nginx service. See:
http://wiki.nginx.org/InitScripts

You'll also need to configure ngx_pagespeed if you haven't yet:
https://developers.google.com/speed/pagespeed/module/configuration
```

Nếu muốn upgrade NGINX, cần phải thực hiện backup lại toàn bộ config đã cấu hình và thực hiện lại các step ở trên.

### Control NGINX
Nginx có thể control bằng việc gõ lệnh trực tiếp đến process của nginx hoặc sử dụng systemd như sau:

Sử dụng vi/vim để tạo file  /`lib/systemd/system/nginx.service` với nội dung như sau:

```
# /lib/systemd/system/nginx.service
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Cấu hình nginx khởi động cùng hệ điều hành và start nginx:

```
systemctl enable nginx
systemctl start nginx
```

Có thể control nginx và theo dõi trạng thái process thông qua các command sau:

```
systemctl stop nginx
systemctl restart nginx
systemctl status nginx
```

Nếu sử dụng command trực tiếp, có thể thực hiện các tác vụ tương tự như trên như sau:

**Start NGINX:**
`/usr/sbin/nginx`

**Reload cấu hình:**
`/usr/sbin/nginx -s reload`

**Stop NGINX:**
`/usr/sbin/nginx -s stop`

### Cấu hình
#### NGINX

Thực hiện cấu hình nginx bằng các command sau, lưu ý thay thế `example.com` bằng domain cần cấu hình:

```
useradd --no-create-home nginx
mkdir -p /var/cache/nginx/client_temp
mkdir /etc/nginx/conf.d/
mkdir /var/www/example.com
chown nginx:nginx /var/www/example.com
mv /etc/nginx/nginx.conf.default /etc/nginx/nginx.conf.backup-default
```

Trong NGINX, mỗi block `Server` sẽ tương đương như một website (tương tự như Virtual Host trong Apache). Mỗi website cấu hình trong nginx nên có một file cấu hình riêng theo dạng `example.com.conf`, lưu tại  `/etc/nginx/conf.d/`.

```
# /etc/nginx/conf.d/example.com.conf
server {
    listen       80;
    listen       [::]:80;
    server_name  example.com www.example.com;
    access_log   logs/example.access.log main;
    error_log    logs/example.error error;

    root         /var/www/example.com/;
}
```

**Start NGINX:**

Sử dụng systemd:

`systemctl start nginx`

Sử dụng command trực tiếp:

`/usr/sbin/nginx`

Verify lại NGINX đã hoạt động bằng cách truy cập vào link của website và port đã cấu hình như trong file `example..com.conf`

![NGINX welcome page](https://images.viblo.asia/6ccd6c23-91da-4260-a1f2-ae16f21c1f14.png)

#### PageSpeed
Tạo thư mục lưu trữ các file của pagespeed sinh ra và điều chỉnh lại owner của thư mục:

```
mkdir /var/cache/ngx_pagespeed/
chown nginx:nginx /var/cache/ngx_pagespeed/
```

Thêm cấu hình mod_pagespeed vào trong nginx.

```
# /etc/nginx/conf.d/example.com.conf
server {

      ...

    pagespeed on;
    pagespeed FileCachePath "/var/cache/ngx_pagespeed/";
    pagespeed RewriteLevel OptimizeForBandwidth;

    location ~ "\.pagespeed\.([a-z]\.)?[a-z]{2}\.[^.]{10}\.[^.]+" {
        add_header "" "";
    }

    location ~ "^/pagespeed_static/" { }
    location ~ "^/ngx_pagespeed_beacon$" { }

    }
```

**Note**

`RewriteLevel OptimizeForBandwidth` là lựa chọn an toàn hơn là cấu hình mặc định `CoreFilters`.

NGINX mặc định hỗ trợ HTTPS, nên nếu website đã cài đặt TLS, cần thêm 2 dòng sau vào trong file cấu hình `example.com.conf`:

```
pagespeed SslCertDirectory directory;
pagespeed SslCertFile file;
```

Reload lại file cấu hình:

`/usr/sbin/nginx/ -s reload`

### Verify hoạt động của mod_pagespeed

#### Thực hiện command

`curl -I -X GET example.com`

Output của command tương tự như dưới đây, Http Response status là 200 và có  `X-Page-Speed` được liệt kê trong header với PageSpeed version.

```
HTTP/1.1 200 OK
Server: nginx/1.13.8
Content-Type: text/html
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
Date: Tue, 23 Jan 2018 16:50:23 GMT
X-Page-Speed: 1.12.34.3-0
Cache-Control: max-age=0, no-cache
```

#### View source website

Sử dụng tính năng view source website tại các trình duyệt, có thể dễ dạng thấy các thay đổi như sau:

- Các inline css, inline js đã được minify lại, và move vào trong thẻ `<head/>`
- Các hình ảnh trên website đã được gắn thêm đuôi theo dạng: *.pagespeed.*
- Các khoảng trắng không cần thiết đã bị xóa bỏ khỏi output HTML


**Ví dụ**
  
Trước thay đổi:
```
<style>
body{
    font-family:sans-serif;
    margin:0;
    padding:0;
    line-height:1.5;
    word-wrap:break-word
}
</style>
<img src="/Nx80xincubator.png" height="80" align="right">
```

Sau thay đổi:

```
<style>body{font-family:sans-serif;margin:0;padding:0;line-height:1.5;word-wrap:break-word}</style>
<img src="/Nx80xincubator.png.pagespeed.ic.-k25bqBQMf.webp" height="80" align="right" data-pagespeed-url-hash="3262077144" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
```

=> Công việc tiếp theo là sử dụng PageSpeed Insights  để test lại và điều chỉnh lại website sao cho phù hợp.

### Config mẫu 

```
server {
  #port to listen on
  listen 80;

  # server name
  server_name www.maxcdn.com;

  # root location
  root /var/www/maxcdn.com/public_html;

  # access log
  access_log /var/log/nginx/maxcdn.com.access.log main;

  # PageSpeed
  pagespeed on;

  # let's speed up PageSpeed by storing it in the super duper fast memcached
  pagespeed MemcachedThreads 1;
  pagespeed MemcachedServers "localhost:11211";

  # show half the users an optimized site, half the regular site
  pagespeed RunExperiment on;
  pagespeed AnalyticsID UA-XXXXXXXXXX-1;
  pagespeed ExperimentVariable 1;
  pagespeed ExperimentSpec "id=1;percent=50;level=CoreFilters;enabled=collapse_whitespace,remove_comments;";
  pagespeed ExperimentSpec "id=2;percent=50";

  # Filter settings
  pagespeed RewriteLevel CoreFilters;
  pagespeed EnableFilters collapse_whitespace,remove_comments;

  # needs to exist and be writable by nginx
  pagespeed FileCachePath /var/ngx_pagespeed_cache;

  # Varnish talks to us as maxcdn.com:8080 but when we rewrite
  # urls we should use maxcdn.com because that's what the
  # outside world uses for us.
  pagespeed MapRewriteDomain maxcdn.com maxcdn.com:8080;

  # This is a temporary workaround that ensures requests for pagespeed
  # optimized resources go to the pagespeed handler.
  location ~ ".pagespeed.([a-z].)?[a-z]{2}.[^.]{10}.[^.]+" { }
  location ~ "^/ngx_pagespeed_static/" { }
  location ~ "^/ngx_pagespeed_beacon$" { }

}
```

Reference: 

- https://www.linode.com/docs/web-servers/nginx/build-nginx-with-pagespeed-from-source/
- https://blog.stackpath.com/nginx-performance-tips-google-pagespeed