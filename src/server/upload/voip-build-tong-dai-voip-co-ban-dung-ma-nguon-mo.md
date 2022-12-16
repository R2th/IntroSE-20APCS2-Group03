Hello mọi người, lại một mùa xuân mới lại về chúc tất cả mọi người một năm mới an lành, yên vui bên gia đình ai rảnh thì  vô đọc tech để khám phá kiến thức như mình nha 😃😆 😁

![](https://images.viblo.asia/0197d019-37dc-4ea5-9810-010228341e32.png)

Nhân dịp năm mới còn Cô Vy không đi đâu, rảnh rồi ngồi khai bút. Bài viết này mình chia sẻ về Voip. Làm cách nào để build được tổng đài Voip cơ bản từ **OpenSource** các bạn cùng đọc bài viết nha!

# 1. Tổng quan
Voip (voice over internet protocol) hay còn gọi là Voice IP, hiểu đơn giản là âm thanh được truyền qua giao thức internet.

VoIP sử dụng RTP (giao thức thời gian thực) để đảm bảo rằng các gói này được phân phối kịp thời. Bạn có thể sử dụng cáp ethernet hoặc kết nối WiFi tốc độ cao cho VoIP.

![](https://images.viblo.asia/d0ad50b1-c78c-431e-9846-0326396e3a0d.png)

# 2. Cài đặt
## 2.1. Chuẩn bị
 VPS mua tại các nhà cung cấp như  [**Vultr**](https://www.vultr.com/?ref=9021330-8H), **[Linode](https://linode.com)**, **[AWS](https://aws.amazon.com/)**… 

Hệ điều hành: **Debian 10**

Ram: **1-2G**

HDD: **10-20G**
## 2.2 Cài đặt
### 2.2.1 Chỉnh ngày giờ và cập nhập hệ thống
```
ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
```
```
apt update && apt -y upgrade && apt install lsb-release
```
### 2.2.2 Cài PHP
```
apt -y install curl apt-transport-https ca-certificates
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > \
/etc/apt/sources.list.d/php.list
```
**#Install PHP v7.4**
```
apt update && apt -y install php7.4 php7.4-curl php7.4-cli php7.4-mysql php7.4-mbstring php7.4-gd php7.4-xml
```
**Trên Debian 9/10**

```
apt -y install locales sngrep build-essential aptitude openssh-server apache2 mariadb-server mariadb-client bison doxygen flex php-pear curl sox libncurses5-dev libssl-dev libmariadbclient-dev mpg123 libxml2-dev libnewt-dev sqlite3 libsqlite3-dev pkg-config automake libtool-bin autoconf git subversion uuid uuid-dev libiksemel-dev tftpd postfix mailutils nano ntp libspandsp-dev libcurl4-openssl-dev libical-dev libneon27-dev libasound2-dev libogg-dev libvorbis-dev libicu-dev libsrtp*-dev unixodbc unixodbc-dev python-dev xinetd e2fsprogs dbus sudo xmlstarlet lame ffmpeg dirmngr linux-headers*
```
**Trên Debian 11**

```
apt -y install locales sngrep build-essential aptitude openssh-server apache2 mariadb-server mariadb-client bison doxygen flex php-pear curl sox libncurses5-dev libssl-dev libmariadb-dev mpg123 libxml2-dev libnewt-dev sqlite3 libsqlite3-dev pkg-config automake libtool-bin autoconf git subversion uuid uuid-dev libiksemel-dev tftpd postfix mailutils nano ntp libspandsp-dev libcurl4-openssl-dev libical-dev libneon27-dev libasound2-dev libogg-dev libvorbis-dev libicu-dev libsrtp*-dev unixodbc unixodbc-dev python-dev xinetd e2fsprogs dbus sudo xmlstarlet lame ffmpeg dirmngr linux-headers*
```
### 2.2.3 Cài Node.js
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt -y install nodejs
```
### 2.2.4 Cài ODBC
```
cd /usr/src
wget https://downloads.mariadb.com/Connectors/odbc/connector-odbc-2.0.19/\
mariadb-connector-odbc-2.0.19-ga-debian-x86_64.tar.gz
tar -zxvf mariadb-connector-odbc-2.0.19*.tar.gz
cp lib/libmaodbc.so /usr/lib/x86_64-linux-gnu/odbc/
```
**Tạo /etc/odbcinst.ini**

```
cat >> /etc/odbcinst.ini << EOF
[MySQL]
Description = ODBC for MariaDB
Driver = /usr/lib/x86_64-linux-gnu/odbc/libmaodbc.so
Setup = /usr/lib/x86_64-linux-gnu/odbc/libodbcmyS.so
FileUsage = 1
  
EOF
```
**Tạo /etc/odbc.ini**

```
cat >> /etc/odbc.ini << EOF
[MySQL-asteriskcdrdb]
Description = MariaDB connection to 'asteriskcdrdb' database
driver = MySQL
server = localhost
database = asteriskcdrdb
Port = 3306
Socket = /var/run/mysqld/mysqld.sock
option = 3
  
EOF
```
### 2.2.5 Cài Asterisk
```
cd /usr/src
wget http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-16-current.tar.gz
tar zxvf asterisk-16-current.tar.gz
cd /usr/src/asterisk-16*/
make distclean
cd /usr/src/asterisk-16*/
./contrib/scripts/install_prereq install

cd /usr/src/asterisk-16*/
./configure --with-jansson-bundled
Xem log nano -v config.log

cd /usr/src/asterisk-16*/
make menuselect
```
Chọn **Applications** và make sure `app_macro`.

```
adduser asterisk --disabled-password --gecos "Asterisk User"
make && make install && chown -R asterisk. /var/lib/asterisk
```
### 2.2.6 Cài  FreePBX 16
```
cd /usr/src
git clone -b release/16.0 --single-branch https://github.com/freepbx/framework.git freepbx
touch /etc/asterisk/modules.conf
cd /usr/src/freepbx
./start_asterisk start
./install -n
```
**#Cài module**
```
fwconsole ma downloadinstall framework core voicemail sipsettings infoservices \
featurecodeadmin logfiles callrecording cdr dashboard music soundlang recordings conferences pm2
fwconsole chown
fwconsole reload
```
Cài Freepbx để start khi boot

```
cat >> /etc/systemd/system/freepbx.service << EOF
[Unit]
Description=Freepbx
After=mariadb.service
 
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/sbin/fwconsole start -q
ExecStop=/usr/sbin/fwconsole stop -q
 
[Install]
WantedBy=multi-user.target

EOF
```
```
systemctl enable freepbx
```
**Cài  Apache**
Thêm AllowOverride All để web truy cập vì mặc định chỉ set ở  `.htaccess` .

```
cat >> /etc/apache2/conf-available/allowoverride.conf << EOF 
<Directory /var/www/html>
    AllowOverride All
    </Directory>
EOF
```
```
a2enconf allowoverride
```
Cấp quyền cho apache

```
sed -i 's/\(APACHE_RUN_USER=\)\(.*\)/\1asterisk/g' /etc/apache2/envvars
sed -i 's/\(APACHE_RUN_GROUP=\)\(.*\)/\1asterisk/g' /etc/apache2/envvars
chown asterisk. /run/lock/apache2
mv /var/www/html/index.html /var/www/html/index.html.disable
a2enmod rewrite
systemctl restart apache2
reboot
```
Truy cập FreePBX 16 Web UI http://IP

Login browser và cài đặt user admin account.

Tạo xoá log định kỳ

```
nano /etc/logrotate.d/asterisk
```
```
/var/spool/mail/asterisk
/var/log/asterisk/full
/var/log/asterisk/dtmf
/var/log/asterisk/fail2ban
/var/log/asterisk/freepbx.log
/var/log/asterisk/freepbx_security.log 
/var/log/asterisk/freepbx_debug {
        size 50M
        missingok
        rotate 4
        #compress
        notifempty
        sharedscripts
        create 0640 asterisk asterisk
        postrotate
        /usr/sbin/asterisk -rx 'logger reload' > /dev/null 2> /dev/null || true
        endscript
        su root root
}
```
Set PHP memory limit and upload max file size.

```
sed -i 's/memory_limit = .*/memory_limit = 256M/g' /etc/php/7.4/apache2/php.ini
sed -i 's/upload_max_filesize = .*/upload_max_filesize = 20M/g' /etc/php/7.4/apache2/php.ini
systemctl restart apache2
```

# Lời kết
Trên đây là hướng dẫn build một tổng đài voip cơ bản từ Opensource. Mình hi vọng sẽ hữu ích với các bạn sinh viên đang làm đồ án hoặc các anh/chị nào đang tìm hiểu về voip. Hẹn gặp mọi người về chủ đề voip ở các bài viết tiếp theo. 


Tham khảo: 

[Deploy tổng đài FreePBX lên AWS](https://youtu.be/d39ONMsmGls?t=332)

[Hướng dẫn cài đặt Asterisk Freepbx trên Debian ( Asterisk v16, Freepbx v16)](https://vietcalls.com/huong-dan-cai-dat-asterisk-freepbx-tren-debian-asterisk-v16-freepbx-v16/)

[Install Asterisk 16 with FreePBX 15 on Ubuntu 20.04/18.04/16.04 & Debian 9](https://computingforgeeks.com/how-to-install-asterisk-16-with-freepbx-15-on-ubuntu/)