Janus là một mã nguồn mở của webRTC, cung cấp nhiều tiện ích giúp cho việc Chat, Videos/Audio call, Recorder hay streamming. Nó thực sự là một thư viện hữu ích đối với những ai muốn phát triển ứng dụng đựa trên nền tảng webRtc hay websocket.
Trong bài viết này mình xin hướng dẫn các bước cài đặt janus trên môi trường ubuntu/centos cũng như macos.
để biết thêm những tính năng hữu ích của thư viện này, bạn có thể tham khảo nó tại đây :
- https://github.com/meetecho/janus-gateway
- https://janus.conf.meetecho.com/demos.html

### Cài đặt lib cần thiết
#### In centos

Chạy lệnh sau để cài đặt:

```bash
yum install libmicrohttpd-devel jansson-devel libnice-devel \
   openssl-devel libsrtp-devel sofia-sip-devel glib-devel \
   opus-devel libogg-devel libcurl-devel lua-devel \
   pkgconfig gengetopt libtool autoconf automake
```

đôi lúc chúng ta cần cài đặt `epel-release` by command `yum install epel-release`

#### In ubuntu

```bash
aptitude install libmicrohttpd-dev libjansson-dev libnice-dev \
	libssl-dev libsrtp-dev libsofia-sip-ua-dev libglib2.0-dev \
	libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
	pkg-config gengetopt libtool automake
```

#### In macos

```bash
brew install jansson libnice openssl srtp libusrsctp libmicrohttpd \
	libwebsockets cmake rabbitmq-c sofia-sip opus libogg curl \
	glib pkg-config gengetopt autoconf automake libtool
```


### Cài đặt lib cho websocket

####  Libsrtp

```bash
wget https://github.com/cisco/libsrtp/archive/v2.1.0.tar.gz
tar xfv v2.1.0.tar.gz
cd libsrtp-2.1.0
./configure --prefix=/usr --enable-openssl
make shared_library && sudo make install
```

#### Libwebsockets

```bash
git clone git://git.libwebsockets.org/libwebsockets
cd libwebsockets
git checkout v2.4-stable
mkdir build
cd build
cmake -DLWS_MAX_SMP=1 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" ..
make && sudo make install
```

Đến đây coi như xong những thư viện cần thiết, bay giờ bạn cần download janus về để cài đặt trên máy

### Install Janus

#### In linux (ubuntu and centos)
Chạy những lệnh sau đây:

```bash
git clone https://github.com/meetecho/janus-gateway.git
cd janus-gateway
sh autogen.sh
./configure --prefix=/opt/janus
make
make install
```

Generate config:

```bash
make configs
```

#### In Macos

Chạy những lệnh dưới đây:

```bash
git clone https://github.com/meetecho/janus-gateway.git
cd janus-gateway
sh autogen.sh
./configure --prefix=/usr/local/janus PKG_CONFIG_PATH=/usr/local/opt/openssl/lib/pkgconfig
make
make install
```

Generate config:

```bash
make configs
```

Lưu ý:

> `prefix` chính là nơi janus sẽ cài đặt vào, bạn có thể tự do thay đổi nơi cài đặt theo ý muốn của mình

Sau khi cài đặt xong thì bạn cần thay đổi một chút file config để có thể videos call được:

Thay đổi trong file `/opt/janus/etc/janus/janus.cfg` như sau:

```
stun_server = stun1.l.google.com
stun_port = 19302
turn_server = 13.250.13.83
turn_port = 3478
turn_type = udp
turn_user = YzYNCouZM1mhqhmseWk6
turn_pwd = YzYNCouZM1mhqhmseWk6
```

thông tin `stun` này là của google, bạn có thể dễ dàng tìm trên mạng hoặc có thể cài đặt một server của riêng mình cho bảo mật 

### Chạy Janus server

Bạn `cd` vào thư mục janus đã cài đặt (linux/centos tại`/opt/janus` and macos tại `/usr/local/janus`)
 và chạy command sau:
 
Đối với môi trương dev: 

 ```bash
 /bin/janus
 ```
 
Mỗi trường production:
 
 ```bash
 export LD_LIBRARY_PATH=/usr/lib64;/opt/janus/bin/janus -d 5 -6 >
 2>&1 &
 ```
 
 > `/tmp/janus.log` là file logs, janus sẽ lưu toàn bộ logs vào đây
 
 Ngoài ra janus còn có nhiều cầu hình khác nữa, bạn có thể lên github để xem thêm cấu hình.
 
 janus có yêu cầu `nginx` bản `rtmp` module để có thể chạy được livestream cũng như những tính năng khác, phần tiếp theo mình sẽ hướng dẫn bạn cài nginx với rtmp module
 
## Cài đặt Nginx with rtmp module

Phần này thì phải tự build riêng, chứ ko chỉ cài một lệnh là xong như nginx thông thường.

### Cài đặt  libs

```bash
sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev
```

### Cài đặt ngixn and hls

```bash
wget http://nginx.org/download/nginx-1.15.1.tar.gz
wget https://github.com/arut/nginx-rtmp-module/archive/master.zip
tar -zxvf nginx-1.15.1.tar.gz
unzip master.zip
cd nginx-1.15.1
./configure --with-http_ssl_module --add-module=../nginx-rtmp-module-master
make
sudo make install
```

Install the Nginx init scripts.

Phần này để cho có thể sử dụng câu lệnh như `service nginx start ...` như bình thường thôi:

```bash
sudo wget https://raw.github.com/JasonGiedymin/nginx-init-ubuntu/master/nginx -O /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
sudo update-rc.d nginx defaults
```

## Tham khảo
- https://github.com/meetecho/janus-gateway
- https://janus.conf.meetecho.com/demos.html

Và các nguồn khác trên internet