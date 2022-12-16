### Giới thiệu
Chắc hẳn ai cũng từng nghe về khái niệm proxy, thực tế có nhiều loại giao thức proxy khác nhau như: Socks4, Socks5, HTTP/HTTPs, FTP, SSL, ... tuỳ theo mục đích trên từng hệ thống. Trong bài này, mình đề cập đến HTTP/HTTPs proxy một cách đơn giản cho người mới bắt đầu. 
Về khái niệm proxy server, mời các bạn có thể đọc bài của bạn @buihieubthc2rb [tại đây](https://viblo.asia/p/proxy-server-la-gi-4dbZN2onZYM)

[Tinyproxy ](http://tinyproxy.github.io/) là một HTTP/HTTPS proxy gọn nhẹ, được viết bằng ngôn ngữ C. Người dùng dễ dàng cấu hình và hỗ trợ filter dựa trên URL và domain, có thể tuỳ chỉnh header hoặc dùng cho reverse proxy. 

![](https://images.viblo.asia/5d5b00cb-963c-4d8a-94b2-75fbb5ff519f.jpg)

Dưới đây, mình sẽ hướng dẫn các bạn cài đặt tinyproxy từ mã nguồn và cấu hình chế độ forward proxy.

### Chuẩn bị 
* Trong bài này, mình sử dụng **Ubuntu 18.04 LTS**
* Hoặc bạn có thể dùng bất kỳ distro Linux nào và có quyền thực thi **root** shell thông qua ssh hoặc console.
* Sử dụng vim hoặc nano để chỉnh sửa nội dung tập tin.

### Các bước cài đặt
#### Bước 1: Cài đặt các thư viện cần thiết 
Cập nhật mới nhất từ repo linux theo lệnh sau:
```console
# apt update
# apt upgrade -y
# reboot
```

Cài đặt các gói (packages) thư viện để chuẩn bị build tinyproxy: 
```console
# apt install git automake build-essential asciidoc xsltproc -y
```

#### Bước 2: Cài đặt tinyproxy từ mã nguồn
Tải về tinyproxy từ [github](https://github.com/tinyproxy/tinyproxy.git): 
```console
# cd /tmp
# git clone https://github.com/tinyproxy/tinyproxy.git
```

 Tiếp theo, chúng ta sẽ compile chương trình và cài đặt vào máy các bằng lệnh sau:
```console
# cd tinyproxy
# ./autogen.sh
# ./configure 
# make && make install
# cd .. && rm -rf tinyproxy # xoá thư mục mã nguồn nếu bạn muốn không dùng nữa
```

Sau khi cài đặt, chúng ta sẽ tạo tài khoản user để sử dụng cho tinyproxy (tránh dùng tài khoản root vì an toàn). Ví dụ, chúng ta tạo ra tài khoản là tinyproxy, tài khoản này không cần thiết phải có thư mục home (/home/tinyproxy) và không có quyền đăng nhập (tránh trường hợp người khác có thể dùng tài khoản này để truy cập vào máy), theo lệnh sau: 
```console
# useradd -M -U -s /bin/false tinyproxy
```

Tiếp theo, tạo và chỉ định tập tin để lưu lại log của tinyproxy (vì tinyproxy chạy trên quyền root nên cần thay đổi thuộc tính owner cho phù hợp quyền):
```console
# mkdir -p /usr/local/var/log/tinyproxy
# touch /usr/local/var/log/tinyproxy/tinyproxy.log
# chown tinyproxy:root /usr/local/var/log/tinyproxy/tinyproxy.log
```

#### Bước 3: Khởi tạo cấu hình proxy
Để tránh sai sót khi thao tác, chúng ta nên lưu lại cấu hình gốc mặt định của tinyproxy trước khi chỉnh sửa: 
```console
# mv /usr/local/etc/tinyproxy/tinyproxy.conf /usr/local/etc/tinyproxy/tinyproxy.conf.orig
```

Tạo mới một tập tin cấu hình tên tinyproxy.conf: 
```console
# nano /usr/local/etc/tinyproxy/tinyproxy.conf
```

Sao chép và dán nội dung sau vào tập tin trên: 
```console
##User/Group to use after dropping root
User tinyproxy
Group tinyproxy

##Port and address to bind to
Port 8080
Bind 0.0.0.0

##File locations
DefaultErrorFile "/usr/local/share/tinyproxy/default.html"
StatFile "/usr/local/share/tinyproxy/stats.html"
LogFile "/usr/local/var/log/tinyproxy/tinyproxy.log"
LogLevel Info
PidFile "/var/run/tinyproxy.pid"

##Authentication
BasicAuth your_username your_secure_password

##HTTP Headers
ViaProxyName "server-hostname"
DisableViaHeader No

##Threading
StartServers 5
MinSpareServers 5
MaxSpareServers 10 
MaxRequestsPerChild 0

##Connection
Timeout 600
MaxClients 100
```

Ở nội dung trên, chúng ta sẽ thay thế **your_username**, **your_secure_password** và **server_hostname** bằng những giá trị định nghĩa riêng của mình. 

 Chúng ta vừa tạo ra một tập tin cấu hình đơn giản để bắt đầu cho tinyproxy. Với cấu hình này, tinyproxy sẽ hoạt động như một proxy chuyển tiếp (forward proxy) có xác thực (authentication) trên port 8080. Hỗ trợ tuỳ chỉnh các tập tin về log, trạng thái, pid, cả số lượng kết nối tối đa được cho phép, và các tham số khác. 
 
 Để kiểm tra xem cấu hình vừa tạo trên có được chưa, chúng ta dùng lệnh: 
 ```console
 # /usr/local/bin/tinyproxy -c '/usr/local/etc/tinyproxy/tinyproxy.conf'
 ```
 
 Sau đó, kiểm tra tình trạng kết nối bằng lệnh sau
 ```console
 # ss -lntp | grep tinyproxy
 ```
 
 Nếu cấu hình ok và tinyproxy chạy đúng thì màn hình sẽ có kết quả tương tự như sau: 
 ```console 
LISTEN    0         128                0.0.0.0:8080
LISTEN    0         128                   [::]:8080
 ```
 
Để kiểm tra xem proxy có hoạt động chưa, có thể đơn giản dùng lệnh **curl**: 
```console
$ curl --proxy http://127.0.0.1:8080 --proxy-user your_username https://ipinfo.io/ip
```

Curl sẽ hỏi mật khẩu **your_password**. Nếu kết nối thành công, public IP của máy bạn sẽ được trả về. 

#### Bước 4 - Tạo service (tuỳ nhu cầu)
Bước này tuỳ nhu cầu của bạn, có muốn tinyproxy chạy như một dịch vụ trên linux không. Vì mình sử dụng Ubuntu 18.04 nên dùng service loại systemd để tạo. 

Đầu tiên, chúng ta kill các tinyproxy (nếu đang chạy)
```console 
# pkill -e tinproxy
```

Dùng nano để tạo tập tin service: ***nano /etc/systemd/system/tinyproxy.service*** có nội dung sau: 
```console
[Unit]
Description=Tinyproxy Service
Requires=network.target
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/tinyproxy -c '/usr/local/etc/tinyproxy/tinyproxy.conf'
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

 Lưu lại và reload cấu hình systemd
```console
# systemctl enable tinyproxy.service
# systemctl daemon-reload
```

Bây giờ, bạn có thể quản lý tinyproxy bằng service (start, stop, restart) thông qua các lệnh sau: 
```console
systemctl start tinyproxy
systemctl stop tinyproxy
systemctl restart tinyproxy
```

#### Bước 5 - Các tuỳ chỉnh khác về chứng thực 
Bạn cũng có thể sử dụng whitelist/blacklist IP để chỉ cho phép những IP nào có thể hoặc không thể sử dụng được proxy bằng cú pháp: 
(Khi dùng tuỳ chỉnh này, bạn có thể bỏ đi tính năng **BasicAuth** bằng username/password)
```console 
Allow IP_ADDR[/xx]
Deny IP_ADDR[/xx]
```

Ví dụ: 
```console
[...]

##Authentication
#BasicAuth your_username your_secure_password
Allow 127.0.0.1
Allow 192.168.1.0/24
Allow 123.0.126.10
ViaProxyName "server_hostname"

[...]
```
Nếu không có **Allow** hoặc **Deny**, thì mặc định sẽ là allow tất cả
Chú ý, mọi thay đổi về cấu hình để phải restart lại process hoặc service
```console 
systemctl restart tinyproxy
```

### Cuối lời
Bài viết chia sẻ cách cài đặt và sử dụng tinyproxy từ mã nguồn trên linux cơ bản nhất. Chúc các bạn thành công!
Bài viết có thể tham khảo từ stackoverflow, có thể sẽ có sai sót, mong các bạn thông cảm :slightly_smiling_face: