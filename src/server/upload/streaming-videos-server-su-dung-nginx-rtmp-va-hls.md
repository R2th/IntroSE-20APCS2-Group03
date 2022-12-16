Chào mọi người, lại là mình đây.
Không hiểu sao dạo này mình chợt thấy hứng thú với Nginx, ngồi vọc lung tung thì chợt nghĩ ra chủ đề này, vậy là bắt tay vào làm một app demo nho nhỏ.

Bài viết hôm nay mình sẽ demo về video theo yêu cầu (VOD), cùng tìm hiểu một vài định nghĩa sau nhé!

## Video on demand là gì
> Video theo yêu cầu (VOD) hay âm thanh và video theo yêu cầu (AVOD) là hệ thống cho phép người dùng lựa chọn và xem / nghe nội dung video hoặc âm thanh khi họ chọn, thay vì phải xem vào một thời gian phát sóng cụ thể. Công nghệ IPTV thường được sử dụng để mang lại các video theo yêu cầu cho TV và máy tính cá nhân.
> 
- Có thể hiểu qua là chúng ta sẽ setup server trở thành một server chứa videos có sẵn, chúng ta có thể phát video trong danh sách có sẵn đó.

Ví dụ : Youtube, Netflix, Disney+ ... là những hệ thống cung cấp videos trực tuyến có cung cấp video on demand. Và trong demo này, chúng ta cũng có thế làm kiểu như vậy nhưng quy mô nhỏ hơn rất nhiều =))

![](https://images.viblo.asia/4d1ed085-67c3-4b60-b3a7-f11519ed93ef.png)

Trước khi vào phần demo thì hãy cùng xem một vài định nghĩa về các giao thức mà chúng ta sẽ sử dụng nhé.

## RTMP

> RTMP là từ viết tắt của Real time messaging protocol.
> Giao thức RTMP ban đầu là một giao thức độc quyền được phát triển bởi Macromedia để truyền phát âm thanh, video và dữ liệu qua Internet, giữa trình phát Flash và máy chủ. Macromedia hiện thuộc sở hữu của Adobe, đã phát hành một phiên bản chưa hoàn chỉnh về đặc điểm kỹ thuật của giao thức để phát hành chính thức.
> 
> RTMP là một giao thức dựa trên TCP, duy trì các kết nối liên tục và cho phép giao tiếp với độ trễ thấp. Để phân phối luồng một cách trơn tru và truyền càng nhiều thông tin càng tốt, nó chia luồng thành các đoạn (fragments) và kích thước của chúng được thỏa thuận tùy vào thỏa thuận giữa máy khách và máy chủ. Đôi khi, kích thước đó được giữ nguyên.
> 
> Kích thước đoạn mặc định là 64 byte cho dữ liệu âm thanh và 128 byte cho dữ liệu video và hầu hết các loại dữ liệu khác. Các đoạn từ các luồng khác nhau sau đó có thể được xen kẽ và ghép thành một kết nối duy nhất.
> 
> Với các khối dữ liệu dài hơn, giao thức do đó chỉ mang một tiêu đề một byte cho mỗi đoạn, do đó phát sinh rất ít băng thông. Tuy nhiên, trong thực tế, các mảnh riêng lẻ thường không được xen kẽ. Thay vào đó, việc xen kẽ và ghép kênh được thực hiện ở cấp gói, với các gói RTMP trên một số kênh hoạt động khác nhau được xen kẽ để đảm bảo mỗi kênh đáp ứng băng thông, độ trễ và các yêu cầu chất lượng dịch vụ khác. Các gói xen kẽ trong thời gian này được coi là không thể chia cắt, cũng như không xen kẽ ở cấp độ mảnh.
> 

Nginx cung cấp cho chúng ta cách thức cấu hình rtmp thông qua nginx plus (https://www.nginx.com/products/nginx/modules/rtmp-media-streaming/), và vì phiên bản này có tính phí nên trong phạm vi bài viết này mình sẽ cấu hình bằng cách import thêm module cho nginx - nginx-rtmp-module (tác giả https://github.com/arut/)

## HLS
> HLS là từ viết tắt của HTTP live streaming, HLS là một HTTP-based adaptive bitrate streaming, một giao thức truyền bitrate dựa trên HTTP. HLS được lập trình bởi Apple Inc. Là một giao thức truyền phát nội dung đa phương tiện khá phổ biến.
> 
> HLS giống với MPEG-DASH ở chỗ nó hoạt động bằng cách chia luồng tổng thể thành một chuỗi các tệp tải xuống dựa trên HTTP, mỗi lần tải xuống tải một đoạn ngắn của một luồng truyền tải tổng thể có khả năng không bị ràng buộc.
> Một danh sách các luồng khả dụng, được mã hóa ở các tốc độ bit khác nhau, được gửi đến máy client bằng cách sử dụng danh sách phát m3u mở rộng.
> 

## Mã hóa
### RTMP
Các phiên RTMP có thể được mã hóa bằng một trong hai phương pháp:

> - Sử dụng các cơ chế TLS / SSL tiêu chuẩn của ngành. Phiên RTMP cơ bản chỉ đơn giản được gói bên trong phiên TLS / SSL bình thường.
> - Sử dụng RTMPE, kết thúc phiên RTMP trong lớp mã hóa trọng lượng nhẹ hơn.
> 
### HLS

> Dựa trên các giao dịch HTTP tiêu chuẩn, HLS có thể đi qua bất kỳ tường lửa hoặc máy chủ proxy nào cho phép lưu lượng HTTP tiêu chuẩn, không giống như các giao thức dựa trên UDP như RTP.
> 

> Điều này cũng cho phép nội dung được cung cấp từ các máy chủ HTTP thông thường và được phân phối trên các mạng phân phối nội dung dựa trên HTTP có sẵn rộng rãi. Tiêu chuẩn cũng bao gồm một cơ chế mã hóa tiêu chuẩn và phân phối khóa bảo mật dựa trên HTTPS, cùng nhau cung cấp một hệ thống DRM đơn giản. Các phiên bản sau này của giao thức cũng cung cấp khả năng tua nhanh và tua lại, tích hợp phụ đề.

## Hỗ trợ client

### Với giao thức RTMP

RTMP là giao thức base trên TCP, có độ trễ thấp nhưng lại được hỗ trợ không rộng rãi, muốn phát video trên web chúng ta phải cài đặt Flash.

Từ khi Apple tuyên bố không hỗ trợ flash và tự phát triển giao thức riêng thì flash cũng từ đó ít được hỗ trợ hơn.

![](https://images.viblo.asia/daecd6d5-9a76-4702-9873-4ef9ef928042.png)

- Adobe Flash Player (web browser plug-in):	Windows, OS X, Chrome OS, Linux

- Gnash (web browser plug-in/media player):	Windows, Linux

- VLC media player:	Windows, OS X, Linux, iOS, Android
- MPC-HC:	Windows

- XBMC Media Center:	Windows, OS X, Linux, iOS (jailbroken), Android

Nguồn: https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol

### Với giao thức HLS
HLS được hỗ trợ bởi hầu hết các nền tảng cũng như ứng dụng hiện nay.

Mặc định, HLS được hỗ trợ phát với:

- Windows 10 (Microsoft Edge)
- macOS 10.6+ (Safari and QuickTime)
- iOS 3.0+ (Safari)
- Andoid 4.1+ (Google Chrome)

Ngoài ra mọi người có thể tham khảo thêm link wiki để tìm hiểu thêm.

Nguồn: https://en.wikipedia.org/wiki/HTTP_Live_Streaming

## Setup basic
Giới thiệu vậy đủ rồi, bây giờ mình sẽ trình bày các bước setup để stream video on demand sử dụng NGINX.

> *Lưu ý server mình sử dụng là server aws ec2 đang chạy ubuntu 16.04. Vì thế nên toàn bộ setup mình hướng dẫn trong bài viết này là sử dụng cho ubuntu 16.04.*
> 
> *Các hệ điều hành khác sẽ có cách cài đặt khác nhưng mình không đề cập đến trong bài này nhé.*
> 

#### Install ffmpeg

```shell
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
sudo apt-get update
sudo apt-get install ffmpeg
```

#### Install nginx

Như đã nói ở phần đầu bài viết, mình sẽ sử dụng module free của tác giả Roman Arutyunyan.
Và module này sẽ phải setup lúc cài nginx nên chúng ta không sử dụng apt-get để cài đặt.

```shell
sudo apt install build-essential -y
wget http://nginx.org/download/nginx-1.14.2.tar.gz
tar zxvf  nginx-1.14.2.tar.gz
wget https://ftp.pcre.org/pub/pcre/pcre-8.40.tar.gz
tar xzvf pcre-8.40.tar.gz
wget http://www.zlib.net/zlib-1.2.11.tar.gz
tar xzvf zlib-1.2.11.tar.gz
wget https://www.openssl.org/source/openssl-1.1.0f.tar.gz
tar xzvf openssl-1.1.0f.tar.gz
```

Tải và cài đặt module nginx-rtmp-module:

```shell
wget https://github.com/arut/nginx-rtmp-module/archive/master.zip
unzip master.zip
```

Cần lấy đường dẫn đến thư mục nginx-rtmp-module vừa giải nén.

Ở đây thư mục mình giải nén file zip ra là /home/uytv2/Downloads/nginx-rtmp-module-master vì thế mình sẽ để option như sau:

```shell
--add-module='/home/uytv2/Downloads/nginx-rtmp-module-master'
```

```shell
cd nginx-1.14.2
./configure --prefix=/usr/share/nginx
            --sbin-path=/usr/sbin/nginx
            --modules-path=/usr/lib/nginx/modules
            --conf-path=/etc/nginx/nginx.conf
            --error-log-path=/var/log/nginx/error.log
            --http-log-path=/var/log/nginx/access.log
            --pid-path=/run/nginx.pid
            --lock-path=/var/lock/nginx.lock
            --user=www-data
            --group=www-data
            --build=Ubuntu
            --http-client-body-temp-path=/var/lib/nginx/body
            --http-fastcgi-temp-path=/var/lib/nginx/fastcgi
            --http-proxy-temp-path=/var/lib/nginx/proxy
            --http-scgi-temp-path=/var/lib/nginx/scgi
            --http-uwsgi-temp-path=/var/lib/nginx/uwsgi
            --with-openssl=../openssl-1.1.0f
            --with-openssl-opt=enable-ec_nistp_64_gcc_128
            --with-openssl-opt=no-nextprotoneg
            --with-openssl-opt=no-weak-ssl-ciphers
            --with-openssl-opt=no-ssl3
            --with-pcre=../pcre-8.40
            --with-pcre-jit
            --with-zlib=../zlib-1.2.11
            --with-compat
            --with-file-aio
            --with-threads
            --with-http_addition_module
            --with-http_auth_request_module
            --with-http_dav_module
            --with-http_flv_module
            --with-http_gunzip_module
            --with-http_gzip_static_module
            --with-http_mp4_module
            --with-http_random_index_module
            --with-http_realip_module
            --with-http_slice_module
            --with-http_ssl_module
            --with-http_sub_module
            --with-http_stub_status_module
            --with-http_v2_module
            --with-http_secure_link_module
            --with-mail
            --with-mail_ssl_module
            --with-stream
            --with-stream_realip_module
            --with-stream_ssl_module
            --with-stream_ssl_preread_module
            --with-debug
            --add-module='/home/uytv2/Downloads/nginx-rtmp-module-master'

sudo make
sudo make install
```

Check nginx version

```shell
sudo nginx -V
```

Sửa config sau để có thể sử dụng nginx bằng lệnh systemctl
```shell
sudo nano /etc/systemd/system/nginx.service
```

Dán cấu hình sau vào:

```shell:txt
[Unit]
Description=A high performance web server and a reverse proxy server
After=network.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t -q -g 'daemon on; master_process on;'
ExecStart=/usr/sbin/nginx -g 'daemon on; master_process on;'
ExecReload=/usr/sbin/nginx -g 'daemon on; master_process on;' -s reload
ExecStop=-/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /run/nginx.pid
TimeoutStopSec=5
KillMode=mixed

[Install]
WantedBy=multi-user.target

```
Bấm Ctrl + X, gõ y để lưu lại

```shell
sudo nano /etc/ufw/applications.d/nginx
```

Dán đoạn text sau và lưu lai:

```rust:txt
[Nginx HTTP]
title=Web Server (Nginx, HTTP)
description=Small, but very powerful and efficient web server
ports=80/tcp

[Nginx HTTPS]
title=Web Server (Nginx, HTTPS)
description=Small, but very powerful and efficient web server
ports=443/tcp

[Nginx Full]
title=Web Server (Nginx, HTTP + HTTPS)
description=Small, but very powerful and efficient web server
ports=80,443/tcp
```

Xong bước cài đặt module nginx-rtmp-module. Bây giờ chúng ta có thể sử dụng block rtmp trong config của nginx.

### Setup NGINX RTMP using nginx-rtmp-module

```shell
cd /etc/nginx
sudo nano nginx.conf
```

Thêm block rtmp vào cuối file và Ctrl + x để lưu lại:

nginx.conf :
```conf
rtmp {
    server {
        listen 1935;
        application myvideos {
           play /home/uytv2/videos;
        }
    }
}
```

Thư mục ```/home/uytv2/videos``` là thư mục chứa video contents. Chọn videos lưu vào đây để có thể stream.
Videos có thể phát trực tiếp qua giao thức rtmp

```html
rtmp://<ip-address or domain name>/myvideos/<videos name>
```

### Setup NGINX HLS

HLS base trên giao thức http, vì thế chúng ta có thể khai báo hls ngay trong block http:

Cần include thư mục conf.d trong file /etc/nginx/nginx.conf, và các config khác mình cũng sẽ để ở đấy.

```css
http {
...
  include /etc/nginx/conf.d;
...
}
```

Lưu ý:

*Để có thể phát videos qua hls, chúng ta cần dùng ffmpeg convert video đó thành các file riêng lẻ dưới dạng .ts, và một playlist dưới dạng file .m3u8*

*Ví dụ video gốc là ```demo.mp4``` thì convert thành các file: ```demo.m3u8,  demo0.ts,  demo1.ts,  demo2.ts ...```*

```shell
ffmpeg -i demo.mp4 -profile:v baseline -level 3.0 -s 720x400 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls /home/uytv2/videos/hls/demo.m3u8
```

Trong demo thư mục chứa videos playlist .m3u8 của mình là /home/uytv2/videos/hls, các bạn cần đổi đường dẫn cho phù hợp nhé.

Sample file ```/etc/nginx/conf.d/hls.conf```

Ở file này hãy quan tâm đến block ```types: {}``` và ```alias```.
Block ```types``` khai báo mimes type cho các videos phát qua hls.
Phần server_name thì cần đưa domain name vào. Nếu server của bạn không cần quản lý domains thì có thể để là gì cũng được.

Còn ```alias``` khai báo thư mục chứa videos playlist chúng ta vừa convert xong.

```conf
server {
    listen 80;
    root /var/www/html;
    server_name videos.uytran.cf;
    location /hls {
        # CORS setup
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length';
        # Allow CORS preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        types {
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }
        add_header Cache-Control no-cache;
        alias /home/uytv2/videos/hls;
    }
}
```

Link playlist video của mình bây giờ sẽ là:

```markdown
http://videos.uytran.cf/hls/demo.m3u8
```
update: 

```python
http://videos.uytran.tk/hls/video_1.m3u8
```
Chúng chỉ cần trỏ link đến link playlist này là được.

Như vậy là xong setup cho nginx. Hãy restart nginx để update setup mới là xong :D

```shell
sudo systemctl restart nginx
```

### Demo
- Với RTMP:
Như list các ứng dụng hỗ trợ hai giao thức này mình có đề cập ở phần đầu bài viết. Vì giao thức rtmp hiện không còn được support rộng rãi.

Việc cài đặt flash player trên web cũng khá vất vả nên mình sẽ dùng phần mềm vlc media player để phát video nhé.

Ở cửa sổ vlc, chọn Media -> Open network stream và dán link videos vào là xong.

```markdown
rtmp://uytran.cf/myvideos/demo.mp4
```

- Với HLS chúng ta có nhiều lựa chọn hơn. Hls được hỗ trợ bởi trình phát vlc, vừa được hỗ trợ bời nhiều lib player js trên web.

Với hls thì mình sẽ sử dụng jwplayer trên web để phát videos.

```markdown
http://videos.uytran.cf/hls/demo.m3u8
```

```html:html
<script src="https://cdn.jwplayer.com/libraries/<- your_jwplayer_key ->.js"></script>
<div id="myPlayer">This text will be replaced with a player.</div>
<script>
  jwplayer("myPlayer").setup({
    file: "http://videos.uytran.cf/hls/demo.m3u8",
    height: 360,
    width: 640
  });
</script>
```

Mình đã chuẩn bị một video của Hoàng Thùy Linh để demo, mời mọi người vào xem nhé ;)
- http://railsapp.uytran.cf/ 
- Hoặc http://user.railsapp.uytran.cf/videos

Update: - https://user.uytran.tk/ 

Vậy là xong phần demo, hi vọng qua bài viết mọi người có thể setup được một server như ý muốn. Thanks for reading!