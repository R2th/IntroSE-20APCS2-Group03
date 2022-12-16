Bạn muốn cài đặt thêm các modules Nginx nhưng cài lệnh qua Yum không xử lý được. Bắt buộc bạn phải compile file Nginx từ source code.
![](https://images.viblo.asia/4528ff1a-8c88-44a1-aa40-d3fc6cfece8a.png)
Đây là script mình build Nginx kết hợp với một số module đủ dùng như:
- Pagespeed
- Let's Encrypt
- HTTP2
- ...
Cụ thể ở đây:
```
--prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --user=nginx --group=nginx --build=CentOS --builddir=nginx-1.19.1 --with-select_module --with-poll_module --with-threads --with-file-aio --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module=dynamic --with-http_image_filter_module=dynamic --with-http_geoip_module=dynamic --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-http_perl_module=dynamic --with-perl_modules_path=/usr/lib64/perl5 --with-perl=/usr/bin/perl --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --with-mail=dynamic --with-mail_ssl_module --with-stream=dynamic --with-stream_ssl_module --with-stream_realip_module --with-stream_geoip_module=dynamic --with-stream_ssl_preread_module --with-compat --with-pcre=../pcre-8.44 --with-pcre-jit --with-zlib=../zlib-1.2.11 --with-openssl=../openssl-1.1.1g --with-openssl-opt=no-nextprotoneg --add-module=../google-pagespeed/ --with-debug
```
## Cách chạy script
```
cd ~
```
```
vi nginx-build.sh
```
Bấm i để chuyển sang chế độ insert
Paste script này vào file nginx-build.sh
```
timedatectl set-timezone 'Asia/Ho_Chi_Minh'
yum install -y epel-release vim wget tree upzip gcc-c++ make perl pcre-devel perl-ExtUtils-Embed libxslt libxslt-devel libxml2 libxml2-devel gd gd-devel GeoIP GeoIP-devel zlib-devel -y
yum update -y
mkdir ~/nginx-build && cd ~/nginx-build
wget http://nginx.org/download/nginx-1.19.1.tar.gz && tar zxvf nginx-1.19.1.tar.gz
wget https://ftp.pcre.org/pub/pcre/pcre-8.44.tar.gz && tar zxvf pcre-8.44.tar.gz
wget https://zlib.net/zlib-1.2.11.tar.gz && tar zxvf zlib-1.2.11.tar.gz
wget https://www.openssl.org/source/openssl-1.1.1g.tar.gz && tar zxvf openssl-1.1.1g.tar.gz
mkdir google-pagespeed
cd google-pagespeed
wget https://apache.googlesource.com/incubator-pagespeed-ngx/+archive/11ba8ea542164e4ad1fc1a394652db2dddb086a7.tar.gz
tar zxvf *.tar.gz
wget https://dl.google.com/dl/page-speed/psol/1.13.35.2-x64.tar.gz
tar -xzvf 1.13.35.2-x64.tar.gz
cd ~/nginx-build/nginx-1.19.1
cp ~/nginx-build/nginx-1.19.1/man/nginx.8 /usr/share/man/man8
gzip /usr/share/man/man8/nginx.8
ls /usr/share/man/man8/ | grep nginx.8.gz
yes | ./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --user=nginx --group=nginx --build=CentOS --builddir=nginx-1.19.1 --with-select_module --with-poll_module --with-threads --with-file-aio --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module=dynamic --with-http_image_filter_module=dynamic --with-http_geoip_module=dynamic --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-http_perl_module=dynamic --with-perl_modules_path=/usr/lib64/perl5 --with-perl=/usr/bin/perl --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --with-mail=dynamic --with-mail_ssl_module --with-stream=dynamic --with-stream_ssl_module --with-stream_realip_module --with-stream_geoip_module=dynamic --with-stream_ssl_preread_module --with-compat --with-pcre=../pcre-8.44 --with-pcre-jit --with-zlib=../zlib-1.2.11 --with-openssl=../openssl-1.1.1g --with-openssl-opt=no-nextprotoneg --add-module=../google-pagespeed/  --with-debug
make
make install
ln -s /usr/lib64/nginx/modules /etc/nginx/modules
nginx -V
useradd --system --home /var/cache/nginx --shell /sbin/nologin --comment "nginx user" --user-group nginx
mkdir /var/cache/nginx/
mkdir /var/cache/nginx/client_temp
nginx -t
touch /etc/systemd/system/nginx.service
echo "[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target" >> /etc/systemd/system/nginx.service
systemctl enable nginx.service
systemctl start nginx.service
systemctl status nginx.service
mkdir ~/.vim/
cp -r ~/nginx-build/nginx-1.19.1/contrib/vim/* ~/.vim/
mkdir /etc/nginx/{conf.d,snippets,sites-available,sites-enabled}
chmod 640 /var/log/nginx/*
chown nginx:adm /var/log/nginx/access.log /var/log/nginx/error.log
touch /etc/logrotate.d/nginx
echo " /var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 640 nginx adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}" >> /etc/logrotate.d/nginx
```
Ấn :wq để lưu và thoát ra ngoài
```
sh ./nginx-script.sh
```
Chờ build tầm 10p và tận hưởng.