Chào mừng các bạn đã quay trở lại với blog của mình :call_me_hand::call_me_hand:

Ở 2 bài trước chúng ta đã biết cách sử dụng Public, Private và Presence channel để xây dựng ứng dụng chat realtime với Laravel. 

Giờ ở local đã chạy ngon, vấn đề là làm sao để có thể deploy ứng dụng ra server thật cho các anh chị em khác vào sử dụng. Vì việc deploy 1 ứng dụng Laravel ra production sẽ khá là khác so với lúc ta setup ở local và rất nhiều bạn đã comment cho mình là viết về 1 bài về việc này.

Cùng với đó mình thấy ứng dụng Chat realtime này cũng là 1 ví dụ điển hình cho một project Laravel chúng ta thường thấy khi đi làm với đầy đủ các components:
- Laravel
- MySQL
- VueJS
- Queue/Job
- Task Scheduling
- Laravel Horizon
- Laravel Echo Server/SocketIO

Ta bắt đầu thôi nhé ;)
# Điều kiện tiên quyết
> Nghe như đám học sinh cấp 2 :joy::joy:

Ở bài này ta sẽ thực hành với project của mình với đầy đủ chức năng và sẵn sàng cho deploy trên server, [ở đây](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio)

Vì deploy trên server thật nên tất nhiên các bạn sẽ phải có server để thực hành, môi trường Ubuntu 16 hoặc 18 đều oke. Server các bạn có thể thuê ở bất kì nhà cung cấp nào: AWS, Google, Azure, Digital Ocean,... (Đây là 4 địa chỉ mà mình ưa thích và luôn recommend)

> Các bạn chú ý là ta phải có Server (VPS), chứ không phải Hosting thông thường nhé.

Nếu các bạn có domain thì đến cuối bài ta có thể setup được HTTPS xịn xò luôn. Mình khuyến khích các bạn bỏ ra ít tiền (mấy chục tới 1-200K) lên Goddady mua 1 cái domain lởm lởm về để học tập :)
# Tổng quan
Bài này chúng ta sẽ cùng nhau deploy ứng dụng realtime chat giống hệt như của mình ở đây: https://realtime-chat.jamesisme.com/

![](https://images.viblo.asia/44413fbe-b269-4f32-a1ab-82d6cd2621b7.png)

Đầu tiên ta cùng lắc não trước tổng hợp lại xem để chạy được project này thì ta cần những gì nhé:
- code Laravel thì server cần phải có PHP + Composer (tất nhiên rồi :D)
- MySQL
- NodeJS/npm để build code VueJS và cài các thể loại socketio, laravel echo, chạy Laravel Echo Server cũng yêu cầu NodeJS luôn
- Redis (để broadcast message)
- Crontab (Ubuntu có sẵn) để chạy Scheduled Task. Đợt đầu mới học Laravel mình ngây thơ lắm, đọc docs Laravel xong cứ nghĩ Task Scheduling cứ thế chạy với cái command được ghi trong docs cơ :D
- Process Manager để chạy tất cả những thứ bên trên, ở đây mình chọn Supervisor. Đây là cái gì lát nữa mình sẽ giải thích sau nhé
- Nginx làm webserver để chạy ứng dụng PHP. Các bạn chú ý là ở production ta không chạy `php artisan serve` nữa mà ta sẽ dùng một webserver để làm điều đó.
- Cuối cùng là Certbot để lấy HTTPS

Ồi liệt kê ra cũng nhiều phết đấy chứ nhỉ :D. Tiến hành thôi nào
# Cài đặt
Đầu tiên các bạn SSH vào server của các bạn nhé. Trong bài này mình sẽ bắt đầu với một server "trắng tinh", nếu các bạn đã có server và đã cài một trong những thứ bên dưới thì cứ thoải mái mà bỏ qua nhé ;)
## PHP
Các bạn lần lượt chạy các command sau để cài PHP nhé:
```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php7.3 php7.3-cli php7.3-common
```
Ở trên mình cài PHP 7.3 vì ở thời điểm hiện tại (tháng 8-2020) thì Laravel đã yêu cầu tối thiểu PHP 7.3 nhé.

Sau đó các bạn check thử xem php đã được cài thành công chưa nhé:
```bash
php -v

----> in ra
PHP 7.3.21-1+ubuntu16.04.1+deb.sury.org+1 (cli) (built: Aug  7 2020 14:43:42) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.21, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.3.21-1+ubuntu16.04.1+deb.sury.org+1, Copyright (c) 1999-2018, by Zend Technologies
```
Tiếp theo ta cần cài thêm extenstions của PHP vì đó là những extension mà ứng dụng Laravel của chúng ta sẽ cần dùng tới:
```bash
sudo apt install php-pear php7.3-curl php7.3-dev php7.3-gd php7.3-mbstring php7.3-zip php7.3-mysql php7.3-xml php7.3-fpm libapache2-mod-php7.3 php7.3-imagick php7.3-recode php7.3-tidy php7.3-xmlrpc php7.3-intl
```
## Composer
Tiếp theo ta tiến hành cài Composer nhé. Các bạn chạy command sau:
```bash
sudo apt-get install curl php7.3-cli git unzip
```
Ở trên ta cài `curl` để download Composer về server, `php7.3-cli` để cài đặt Composer, `Git` để Composer có thể download các thành phần liên quan và cũng để sau này chúng ta clone code về luôn, `unzip` để giải nén.

Tiếp theo ta chuyển tới thư mục `~` (home) và bắt đầu cài đặt nhé:
```bash
cd ~
```
Các bạn vào trang download của Composer [ở đây], chúng ta sẽ thấy giao diện như sau:

![](https://images.viblo.asia/ea9f45f4-9d33-4412-aa8c-16f9bc5594c6.png)

Ở phần đầu tiên các bạn copy toàn bộ command ở trong ô textbox, ở đây là:
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '572cb359b56ad9ae52f9c23d29d4b19a040af10d6635642e646a7caa7b96de717ce683bd797a92ce99e5929cc51e7d5f') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
Nhưng từ từ hẵng chạy command :D. Vì sau này ta muốn ở bất kì đâu ta cũng có thể chạy được command `composer ...` do đó ta cần cài composer global. Vậy nên ở command thứ 3 các bạn sửa lại cho mình như sau:
```bash
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```
Âu cây, ta lại copy toàn bộ 4 command sau đó quay lại serve paste vào terminal/command line và để quá trình cài đặt diễn ra tự động.

Sau khi quá trình cài đặt thành công, các bạn có thể gõ command sau ở terminal để check xem composer cài được hay chưa nhé:
```bash
composer

--> in ra
  ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.10.10 2020-08-03 11:35:19
```
## MySQL
Tiếp theo chúng ta tiến hành cài MySQL nhé. Các bạn chạy command sau:
```bash
sudo apt-get update
sudo apt-get install mysql-server
```
Đến đây sẽ hiện ra màn hình hỏi password cho user `root` cho MySQL, các bạn nhập password tuỳ ý nhé, ở đây password mình cũng đặt là `root` luôn:

![](https://images.viblo.asia/b15a624f-6ad2-4fe7-b151-64da48657e13.png)

Tiếp theo ta chạy command sau để tự động cấu hình cho MySQL:
```bash
mysql_secure_installation
```
Khi được hỏi thì các bạn chọn như sau nhé:
```bash
VALIDATE PASSWORD PLUGIN: No
Change the password for root: No
Remove anonymous users: y
Disallow root login remotely: y
Remove test database and access to it: y
Reload privilege tables now: y
```
Cuối cùng là check xem MySQL đã chạy chưa nhé:
```bash
systemctl status mysql.service

-->> in ra
● mysql.service - MySQL Community Server
   Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-23 03:57:25 UTC; 4min 0s ago
 Main PID: 39326 (mysqld)
   CGroup: /system.slice/mysql.service
           └─39326 /usr/sbin/mysqld

Aug 23 03:57:24 test-ubuntu systemd[1]: Starting MySQL Community Server...
Aug 23 03:57:25 test-ubuntu systemd[1]: Started MySQL Community Server.
```
Ta chạy command sau để MySQL có thể khởi động cùng với server nếu sau này server khởi động lại:
```bash
sudo systemctl enable mysql
```
## NodeJS
Tiếp theo ta tiến hành cài đặt NodeJS nhé, các bạn chạy command sau:
```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs
```
Ở trên mình cài NodeJS bản 12 hiện tại đang là LTS (Long-term support - ý là bản nên dùng bản này :D), sau này có thể thay đổi các bạn vào nodejs.org để xem bản LTS là bao nhiêu nhé.

Sau đó ta check xem nodejs đã cài thành công hay chưa nhé:
```bash
node -v
--->> v12.18.3

npm -v
--->> 6.14.6
```
## Redis
Tiến tới là ta cài Redis nhé:
```bash
sudo apt-get update
sudo apt-get install redis-server
```
Sau đó ta chạy command sau để tự động khởi động Redis nếu như server có khởi động lại nhé:
```bash
sudo systemctl enable redis-server
```
Ta kiểm tra xem Redis đã chạy ngon hay chưa nhé:
```bash
service redis-server status

--->>
● redis-server.service - Advanced key-value store
   Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-23 04:06:58 UTC; 2min 43s ago
     Docs: http://redis.io/documentation,
           man:redis-server(1)
 Main PID: 41365 (redis-server)
   CGroup: /system.slice/redis-server.service
           └─41365 /usr/bin/redis-server 127.0.0.1:6379   
```
## Process manager - Supervisor
Trước khi cài đặt ta cùng tìm hiểu qua Process manager là gì nhé.

Khi ở local muốn chạy command nào thì ta chỉ cần mở 1 tab terminal và chạy command đó, ví dụ:
```bash
php artisan serve

php artisan queue:work

laravel-echo-server start
```
Mỗi command chạy trên 1 tab, nhưng nếu ta tắt terminal đi thì các command trên sẽ bị stop, bởi vì các command trên đang chạy ở `foreground`, tức là khi ta bấm `Enter` để chạy thì command sẽ treo luôn ở terminal, và khi ta tắt terminal thì các command kia sẽ bị stop. Lên server cũng vậy, ta có thể mở nhiều tab terminal, SSH vào server và chạy các command như vậy, nhưng cuối cùng thì cũng đến lúc ta phải tắt máy đi ngủ lúc đó thì terminal bị tắt và toàn bộ các command sẽ bị stop :D.

Do đó ta cần có process manager để có thể chạy được các command ở `background` - chạy ngầm, chúng sẽ liên tục được chạy và ta không phải lo về việc terminal bị tắt nữa ;).

Và trên Ubuntu thì `Supervisor` là một process manager rất được ưa chuộng. Ta tiến hành cài nhé:
```bash
sudo apt-get install supervisor
```
Sau đó ta kiểm tra xem supervisor chạy hay chưa nhé:
```bash
service supervisor status

--->>
● supervisor.service - Supervisor process control system for UNIX
   Loaded: loaded (/lib/systemd/system/supervisor.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-23 04:18:07 UTC; 18s ago
     Docs: http://supervisord.org
 Main PID: 42284 (supervisord)
```
## Nginx
Cuối cùng là ta tiến hành cài Nginx (ối dồi ôi cài mệt nghỉ :joy::joy:)
```
sudo apt update
sudo apt install nginx
```
Sau đó ta check xem Nginx chạy hay chưa nhé:
```bash
service nginx status

--->>
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Sun 2020-08-23 04:20:19 UTC; 56s ago

Aug 23 04:20:18 test-ubuntu nginx[42892]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
Aug 23 04:20:18 test-ubuntu nginx[42892]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Aug 23 04:20:18 test-ubuntu nginx[42892]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
Aug 23 04:20:19 test-ubuntu nginx[42892]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Aug 23 04:20:19 test-ubuntu nginx[42892]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
Aug 23 04:20:19 test-ubuntu nginx[42892]: nginx: [emerg] still could not bind()
Aug 23 04:20:19 test-ubuntu systemd[1]: nginx.service: Control process exited, code=exited status=1
Aug 23 04:20:19 test-ubuntu systemd[1]: Failed to start A high performance web server and a reverse proxy server.
Aug 23 04:20:19 test-ubuntu systemd[1]: nginx.service: Unit entered failed state.
Aug 23 04:20:19 test-ubuntu systemd[1]: nginx.service: Failed with result 'exit-code'.
```
Từ từ, có lỗi xảy ra :worried::worried:. Nginx báo là cổng 80 đã bị 1 anh bạn nào đó chiếm mất.

Ta check thử xem các cổng nào đang chạy và ai dùng nó nhé:
```bash
sudo lsof -i -P -n | grep LISTEN

--->>
sshd       1717     root    3u  IPv4  29476      0t0  TCP *:22 (LISTEN)
sshd       1717     root    4u  IPv6  29478      0t0  TCP *:22 (LISTEN)
apache2   20464     root    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
apache2   20470 www-data    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
apache2   20471 www-data    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
apache2   20473 www-data    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
apache2   20474 www-data    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
apache2   20475 www-data    4u  IPv6  62114      0t0  TCP *:80 (LISTEN)
mysqld    39326    mysql   20u  IPv4 132199      0t0  TCP 127.0.0.1:3306 (LISTEN)
redis-ser 41365    redis    4u  IPv4 160609      0t0  TCP 127.0.0.1:6379 (LISTEN)
```
Ố ồ, thì ra là Apache đã chiếm mất cổng 80.

Giải thích cho các bạn Apache là gì, thì nó cũng là 1 webserver như Nginx vậy, được cài đặt kèm với Ubuntu.

Tại sao mình không không dùng Apache luôn, thì lí do là Nginx hiện tại cực kì phổ biến về tính dễ dùng và hiệu năng của nó. Và mình chỉ khuyến khích các bạn dùng những thứ phổ biến, nếu có gặp lỗi cũng sẽ dễ sửa hơn ;)

Âu cây vậy giờ ta tiến hành shutdown Apache đi để chạy Nginx nhé:
```bash
sudo service apache2 stop
sudo service nginx start
sudo service nginx status

--->>
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-23 04:26:54 UTC; 2s ago
  Process: 43250 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 43239 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
```
Khi Webserver được chạy sẽ cho phép ta có khả năng truy cập từ bên ngoài vào server, hay cụ thể là ta có thể truy cập qua trình duyệt.

Các bạn thử mở trình duyệt ở địa chỉ là IP server của các bạn xem nhé. Cách xem IP là các bạn xem ở trên trang quản trị của nhà cung cấp nơi bạn mua server, ví dụ của mình là Azure thì sẽ như sau:

![](https://images.viblo.asia/f6aadba3-a809-47b3-9b31-25f388df18ab.png)

Chú ý phần `Public IP Address` nhé, chính là nó. Các nơi khác (AWS, Google, Digital Ocean,...) chắc chắn có đó, các bạn đừng comment hỏi mình là ở đâu nhé :D

Ta copy địa chỉ ip đó và mở ở trình duyệt xem nhé.

Quay đều quay đều quay đềuuuuuu,.... không thấy có điều gì xảy ra, lí do vì sao nhỉ???

Mặc định để đảm bảo bảo mật thì Ubuntu không cho phép traffic đi vào từ bất kì cổng nào, do đó mặc dù ta đã có Nginx chạy và lắng nghe ở cổng 80 thế nhưng khi truy cập từ trình duyệt thì vẫn chỉ thấy "quay đều và quay đều" :D

Và để "mở", cho phép traffic vào ra 1 cổng nào đó chúng ta có 2 cách, 1 là dùng UFW (Firewall) như các bạn xem các tutorial người ta thường nói, nhưng hiện nay nếu các bạn mua server từ các nhà cung cấp lớn thì họ đều cung cấp cho chúng ta giao diện quản trị để ta tương tác, ta chỉ cần chọn cổng muốn mở, việc còn lại đã có người lo và ta không cần care vì việc mở cổng bừa bãi có thể ảnh hưởng nghiêm trọng tới security.

Các bạn mở cho mình 2 port là 80 và 443 nhé, port 443 là để lát nữa ta chạy với HTTPS nhé. Ví dụ giao diện của mình trên Azure sẽ như sau (AWS EC2 hay trên Google cũng xêm nhé các bạn):

![](https://images.viblo.asia/ea96885e-7f22-4518-a5af-1d208512be1a.png)

Ngay sau khi mở port thì ta quay lại trình duyệt F5 lại lần nữa sẽ thấy kết qủa ngay nhé.

Note: nếu các bạn vẫn muốn dùng UFW để mở port thì ta làm như sau nhé;
```bash
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
```
Oke ổn rồi đó, setup từ đầu bài vỡ mặt thớt mà chưa thấy Realtime chat ở cái chỗ nào :rofl::rofl:

> Fact: cho bạn nào muốn biết thêm, lí do ở trên ta phải mở allow cho traffic đi vào từng port cụ thể là vì VM (hay cũng gọi là VPS) của ta được deploy ở trong 1 Virtual Network (Azure gọi là Virtual Network - VNet, còn bên Google/AWS gọi là Virtual Private Cloud - VPC), trong virtual network đó mặc định Azure (Aws, Google cloud) tạo sẵn 1 subnet (hoặc do ta tự tạo), và VM của chúng ta thực tế nằm ở trong subnet này. Ở subnet đó sẽ được áp dụng Network Security Group (NSG), và việc ta mở traffic cho đi vào 1 port như ở trên thực tế là ta đang tạo 1 Inbound Port Rule ở trong Network Security Group - dịch ra đại loại là 1 rule cho traffic đi vào VM (inbound). Hiện tại hầu hết các nhà cung cấp cloud lớn bây giờ đều dùng kiểu kiến trúc này, vừa có thêm 1 lớp bảo mật (NSG) mà người dùng lại vừa dễ hơn trong việc thao tác với network (thêm các rules) chứ ta không cần trực tiếp cấu hình `Firewall` hay `Iptables` ở trong VM (đây sẽ là 1 ác mộng nếu nghịch linh tinh đó - mình đã thử rồi :rofl::rofl::rofl:)
# Bắt đầu
## Setup Laravel
Đầu tiên ta tiến hành clone source code của mình [ở đây](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio) như sau nhé:
```bash
cd /var/www/html

# Đổi quyền /var/www/html về dưới quyền user hiện tại để ta có thể clone
sudo chown -R $USER:$USER .

git clone https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio

cd realtime-chatapp-laravelecho-socketio/
```
Sau đó ta tiến hành tạo file `.env` và thiết lập giá trị:
```bash
cp .env.example .env
```
Thay thế một số mục trong file `.env` thành như sau:
```bash
APP_ENV=local

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=realtime_chat
DB_USERNAME=laravel
DB_PASSWORD=laravelpass

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

LARAVEL_ECHO_SERVER_REDIS_HOST=localhost
LARAVEL_ECHO_SERVER_REDIS_PORT=6379
LARAVEL_ECHO_SERVER_AUTH_HOST=http://localhost
LARAVEL_ECHO_SERVER_DEBUG=false

MIX_FRONTEND_PORT=6001
```
Tiếp theo ta tiến hành cài dependencies nhé:
```bash
composer install
npm install
```
Sau đó ta chạy `generate key` nhé:
```bash
php artisan key:generate
```
Tiếp theo ta cần `migrate`, nhưng trước hết ta cần tạo database trong MySQL đã nhé.
```bash
mysql -u root -p
->> sau đó bị hỏi password thì các bạn nhập password cho MySQL vào nhé

create database realtime_chat;

CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'laravelpass';

GRANT ALL PRIVILEGES ON realtime_chat.* To 'laravel'@'localhost' IDENTIFIED BY 'laravelpass';

show databases;

--->> In ra:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| realtime_chat      |
| sys                |
+--------------------+

exit
```
Ở trên các bản để ý là sau khi tạo database mình tạo user `laravel` với password là `laravelpass` , sau đó gán cho user này có toàn quyền truy cập chỉ trong database `realtime_chat`. Chạy production ta không dùng chỉ 1 user `root` nữa nhé.

Note: ở trên lúc tạo user cho database nếu các bạn gặp lỗi `your password does not satisfy the current policy requirements` thì ý MYSQL bảo là "password của chúng ta lởm quá đặt cái nào bảo mật hơn đi", thì các bạn cần đặt mật khẩu nào xịn hơn. Các bạn lên [trang này](https://passwordsgenerator.net/) tạo nhanh 1 password rồi làm lại nhé.

Sau đó ta tiến hành migrate nhé:
```bash
php artisan migrate --seed
```
Sau đó ta tiến hành build phần code VueJS nhé:
```bash
npm run prod
```
Ổn rồi đó, đến bước này là ta đã có thể xem trực tiếp web của chúng ta như thế nào rồi, ta cùng cấu hình Nginx 1 chút nhé.
```bash
sudo nano /etc/nginx/sites-available/default
```
Ở đó ta thấy có sẵn nội dung mặc định, ta thay thế toàn bộ bằng nội dung sau nhé:
```bash
server {
	listen 80;
	listen [::]:80;

	root /var/www/html/realtime-chatapp-laravelecho-socketio/public;

	index index.php;

	server_name _;

	add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
        charset utf-8;

	location / {
		try_files $uri $uri/ /index.php?$query_string;
	}
	
	location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ \.php$ {
		fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
		fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
		include fastcgi_params;
	}

	location ~ /\.(?!well-known).* {
		deny all;
	}
}
```
Sau đó ta kiểm tra xem cú pháp của file ta vừa thay đổi có đúng không, có lỗi gì không nhé:
```bash
sudo nginx -t

--->> in ra:
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
Sau đó ta tiến hành khởi động lại Nginx nhé:
```
sudo service nginx restart
```
Ổn rồi đó ta mở trình duyệt ở địa chỉ là IP server của chúng ta và xem nhé:

![](https://images.viblo.asia/ac0ba0df-d635-4b2c-806b-cdc31328e63e.png)

Âu cây đã lên rồi đó, nhưng lại bị dính lỗi `Permission denied` do không tạo được file log vì thiếu quyền, đây là 1 lỗi cực kì phổ biến khi deploy ứng dụng Laravel :D.

Lí do thì khá là đơn giản: khi ta truy cập từ trình duyệt, request gửi tới Nginx, nginx forward request vào PHP-FPM, sau đó tới project Laravel của chúng ta, sau đó sẽ được ghi ra file Log, bởi vì Nginx được chạy dưới quyền của user `www-data` vậy nên cuối cùng Nginx cần có quyền để ghi vào folder `storage/logs`, nhưng folder đó đang được đặt dưới quyền user mà ta đang thực hiện SSH (của mình là `james`, vậy nên ta cần đổi lại quyền cho project Laravel của chúng ta nhé, các bạn quay trở lại folder gốc nơi chứa project và chạy command sau:
```bash
sudo chown -R www-data:www-data .
```
Sau đó quay trở lại trình duyệt, F5 và pằng pằng chíu chíu:

![](https://images.viblo.asia/2f3647c9-86ca-4859-94ee-d3ade2540a26.png)

Ta thử đăng kí tài khoản mới, sau đó vào thử gửi vài tin nhắn xem nhé ;)

Và nếu ta mở console (chuột phải -> Inspect) thì sẽ thấy lỗi đỏ lòm như sau:

![](https://images.viblo.asia/ff04916a-d3a8-4a63-89b9-e29e78777241.png)

Đó chính là bởi vì ta chưa có Laravel Echo Server đó, yên tâm không sao nhé :D
## Laravel echo server
Bây giờ ta cùng tiến hành cài Laravel echo server nhé, các bạn chạy command sau:
```bash
sudo npm install -g laravel-echo-server
sudo laravel-echo-server init
```
Các bạn để ý 1 chút là ở trên khi chạy `init` ta phải dùng tới `sudo` (chạy với quyền root) ý là vì ta muốn để file `laravel-echo-server.json` chung với folder project Laravel luôn, mà folder này đang đặt dưới quyền `www-data` nên nếu không có sudo thì sẽ không thể chạy được.

Khi được hỏi thì ta chọn option như sau nhé:

![](https://images.viblo.asia/95819351-f46b-4db3-9f8b-402e5d2a75ce.png)

Sau khi chạy xong thì file `laravel-echo-server.json` được tạo ra dưới quyền `root` (các bạn có thể chạy `ls -l` để check), thì ta đổi lại cho đồng bộ với cả project nhé:
```bash
sudo chown www-data:www-data laravel-echo-server.json
```

Nếu các bạn để ý bên trên đoạn Authentication server, ở local thì ta để là `localhost:8000` lên server thì ta để là `localhost`. Sao biết giá trị nào mà đặt nhỉ :thinking::thinking:

Thì khi mà Laravel cần xác thực user thì nó sẽ cần phải gửi request tới app Laravel, mà app Laravel của chúng ta đang chạy ở địa chỉ `http://52.163.85.44/`, nhưng vì Laravel echo server và app Laravel của chúng ta đang đặt ở trên cùng 1 server nên `52.163.85.44` thì có thể quy đổi về chỉ còn `localhost` ;)

Tiếp theo ta cần chạy laravel echo server lên, nếu ở local ta cứ thế mở terminal và gõ `laravel-echo-server start` thì như mình đã nói, lên server ta sẽ dùng Supervisor để chạy nhé.

Toàn bộ file chạy cho Supervisor sẽ được đặt ở folder `/etc/supervisor/conf.d`. Ta chuyển tới folder đó để làm việc nhé:
```bash
cd /etc/supervisor/conf.d
```
Sau đó ta tạo 1 file cấu hình để chạy Laravel echo server:
```bash
sudo nano laravel-echo-server.conf
```
Và ta thêm vào nội dung như sau:
```bash
[program:laravel_echo_server]
command=laravel-echo-server start
user=www-data
directory=/var/www/html/realtime-chatapp-laravelecho-socketio
autostart=true
autorestart=true
stderr_logfile=/var/log/laravel_echo_server.err.log
stdout_logfile=/var/log/laravel_echo_server.out.log
```
Sau đó ta "bảo" Supervisor update lại nhé:
```bash
sudo supervisorctl reread
sudo supervisorctl update
```
> Mỗi khi ta update lại file cấu hình thì các bạn chạy lại 2 command trên là được nhé

Sau đó ta kiểm tra thử xem Laravel echo Server chạy chưa nhé:
```bash
curl localhost:6001
--->> OK
```
Ổn rồi đó, giờ ta quay lại trình duyệt F5 thử xem lỗi đỏ lòm khi nãy còn không nhé. 

Ta thử mở console, và..... BÙMMM

![](https://images.viblo.asia/35963530-4a63-45e9-bd6c-aea8c8af7026.png)

Vẫn lỗi như vậy???? lí do là sao nhỉ?? :persevere::persevere:

Lí do là khi trình duyệt gửi request tới địa chỉ IP ở cổng 6001 thì cổng này chưa cho phép traffic đi vào, như phần trước ta đã nói. Và ta cần mở cho phép traffic chạy vào cổng này. Thì các bạn lại có 2 cách: dùng UFW hoặc làm trên trang quản trị của nhà cung cấp server nơi các bạn mua (khuyến khích cách này)

Nếu các bạn vẫn muốn làm với UFW thì chạy command sau nhé:
```bash
sudo ufw allow 6001
```
Sau đó ta quay lại trình duyêt, F5 và kiểm tra nhé:

![](https://images.viblo.asia/5061f766-cd84-4a5a-8476-c8162cd0c26e.png)

Âu cây vậy là ổn rồi đó. Pằng pằng chíu chíu :fireworks::fireworks:

Nhưng nếu ta thử mở 2 tab chat thì sẽ không thấy realtime, đơn giản vì ta chưa chạy queue work (không có worker nào hoạt động).

## Worker + Horizon

Vậy là ta cần chạy `queue:work` với Supervisor là ổn ấy gì? :thinking::thinking:

Đúng vậy các bạn có thể làm luôn như vậy sẽ ổn, nhưng ta dừng lại 1 chút suy nghĩ nhé: vì lát nữa ta sẽ chạy Horizon để quản lý app Laravel, mà Horizon thì có sẵn worker luôn rồi, do vậy thì thay vì chạy `queue:work` thì ta chạy `php artisan horizon` là được cả đôi đường luôn ;)

Vẫn ở folder `/etc/supervisor/conf.d`, các bạn tạo file cấu hình Laravel Horizon nhé:
```bash
sudo nano laravel-horizon.conf
```
Và nội dung thì ta để như sau nhé:
```
[program:laravel_horizon]
command=php artisan horizon     
user=www-data
directory=/var/www/html/realtime-chatapp-laravelecho-socketio
autostart=true
autorestart=true
stderr_logfile=/var/log/laravel_horizon.err.log
stdout_logfile=/var/log/laravel_horizon.out.log
```
> Note: ở project này mình đã cài sẵn Horizon từ trước, nếu các bạn setup từ đầu thì follow theo docs của Laravel nhé: https://laravel.com/docs/7.x/horizon
> 
Sau đó ta lại "nhắc" Supervisor update lại nhé:
```
sudo supervisorctl reread
sudo supervisorctl update
```
Sau đó ta quay trở lại trình duyệt mở 2 tab và thử chat là thấy đã Realtime được rồi nhé

![](https://images.viblo.asia/a09d68bb-8531-40a4-aa5c-a494c4feffe3.png)

Vậy là ứng dụng chat của ta đã được cài đặt thành công ;). Pằng pằng chíu chíu :rocket::rocket:

Ta thử vào xem Horizon xem có gì, các bạn truy cập ở địa chỉ `<server_ip>/horizon` nhé:

![](https://images.viblo.asia/247904ca-3c40-4fab-8d06-6a34ba61059b.png)

Bởi vì hiện tại ở `.env` ta set `APP_ENV` là `local` nên ai cũng có thể xem, và lát nữa nếu ta đổi thành `production` thì sẽ chỉ có `admin@gmail.com` mới vào xem được nhé. Để thiết lập ai được vào xem Horizon ở production các bạn check ở file `app/Providers/HorizonServiceProvider.php` nhé.

## Task Scheduling (cronjob)
Ở ứng dụng chat này mình có 1 chức năng nữa là cứ đều đặt thì sẽ có 1 tin nhắn thông báo từ Bot gửi tới để hướng dẫn user sử dụng các tính năng chat:

![](https://images.viblo.asia/05ed2991-6b2c-451b-aafa-dd223d1af8a5.png)

Và để làm được việc này thì ta cần chạy thêm 1 process nữa để chạy Scheduled Task (hay còn gọi là CronJob) cho Laravel nhé. Nhưng giờ ta không dùng supervisor nữa mà ta phải dùng Crontab để chạy nhé.

Các bạn chạy command sau:
```bash
sudo crontab -u www-data -e
```
Sau đó ở màn hình nhập, các bạn thêm vào cuối file giá trị như sau:
```
* * * * * cd /var/www/html/realtime-chatapp-laravelecho-socketio && php artisan schedule:run >> /dev/null 2>&1
```
Ở trên ta thiết lập một crontab chạy mỗi giây, với mỗi giây thì commadn `schedule:run` được chạy một lần, và tuỳ vào giá trị ở code Laravel ta thiết lập mà ta có thể thực hiện công việc mỗi giây/mỗi phút/mỗi giờ,.... Ở bài này thì mình đặt mỗi phút thì Bot thông báo một lần.

Màn hình cấu hình Crontab trông giống như sau nhé các bạn

![](https://images.viblo.asia/16db2bc1-b92d-493c-8af0-c6827c5c1ad6.png)

Sau đó ta quay lại trình duyêt, F5, và ngồi chờ nhé :D. Và khi nào tới đủ 1 phút ta sẽ thấy Bot thông báo:

![](https://images.viblo.asia/ef4ddf89-1cf8-456c-ae3e-03d7d5fe424d.png)

Và cứ sau 1 phút thì lại có 1 thông báo như vậy ;)

Đến đây là ta đã có 1 ứng dụng Laravel đầy đủ hoàn chỉnh về mặt chức năng rồi đó :kissing_heart::kissing_heart:

![](https://images.viblo.asia/bc02b880-5693-45ec-bd5d-35f5664f5476.png)

> Ở trên Ubuntu mặc định có cài và chạy sẵn Crontab nên ta có thể dùng được ngay, nếu bạn nào từng đọc bài [Dockerize ứng dụng Chat Laravel](https://viblo.asia/p/dockerize-ung-dung-chat-realtime-voi-laravel-nginx-vuejs-laravel-echo-redis-socketio-bJzKmxgY59N) sẽ thấy ở bài đó ta phải tự cài và chạy Crontab vì ở trên Alpine ko có sẵn
# HTTPS
Và đã chạy production thì thường là ta sẽ cần tới HTTPS thì mới đủ xịn xò và tăng tính bảo mật cho website của chúng ta.

Nếu các bạn chỉ search google: How to get SSL certificate thì khả năng cao là sẽ gặp phải nhiều tutorial họ hướng dẫn cách dùng self-signed certificate, tức là chứng chỉ mà ta "tự kí", những loại chứng chỉ này khi chạy ở các tình duyệt hiện đại sẽ bị báo là chứng chỉ fake, tất nhiên đó không phải là thứ ta muốn đúng không nào. ;)

Có một cách khác rất đơn giản và mọi người thường làm là lấy chứng chỉ HTTPS Free bằng `certbot` và Lets Encrypt. Và ta sẽ dùng cách này nhé.

Điều kiện cần là các bạn cần phải có 1 domain name nhé, vì Lets Encrypt yêu cầu phải có domain name chứ không dành cho IP.

Các bạn bỏ ra vài chục hoặc 1-2 trăm nghìn VND lên Goddady (Trang trên miền lớn nhất TG), mua 1 cái domain lởm lởm để học tập nhé. Nên mua domain ở các nhà cung cấp lớn thế này vì những công việc như cập nhập DNS, nameserver sẽ rất là nhanh và tiện. Mình đã và đang trải nghiệm cả những nhà cung cấp của VN (dành cho tên miền `.vn`, và chất lượng thì thật sự là ... :) )

Sau khi các bạn có tên miền, thì ta vào trang quản trị tên miền và trỏ về IP server của chúng ta là được nhé. Ví dụ ở đây tên miền của mình là `xoixeotv.com` và màn hình quản trị trên Goddady sẽ như sau nhé:

![](https://images.viblo.asia/c8e480ac-8ad3-4b8b-8ffc-413381de7f0e.png)

> Note: mặc định Goddady tạo cho ta 1 bản ghi CNAME với tên là `www` và trỏ về @, tức là trỏ về cùng địa chỉ server với bản ghi `A` ở bên trên. Nếu các bạn dùng nhà cung cấp khác thì tự thêm vào nhé

Ngay sau đó ta quay trở lại trình duyệt, truy cập ở địa chỉ tên miền của chúng ta là có thể thấy kết quả ngay nhé.

Tiếp tới là ta cần tạo chứng chỉ HTTPS với certbot nhé. Đầu tiên là ta cần cài `certbot`, các bạn chạy command sau:
```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```
Sau đó chúng ta sửa lại file cấu hình Nginx một chút nhé:
```bash
sudo nano /etc/nginx/sites-available/default
```
Các bạn chỉ cần sửa lại duy nhất đoạn `server_name` với giá trị như sau nhé:
```bash
server_name xoixeotv.com www.xoixeotv.com;
```
Ở đây ý bảo là ta có thể truy cập ứng dụng Laravel bằng 2 địa chỉ bên trên. Sau đó ta khởi động lại Nginx nhé:
```
sudo service nginx restart
```

Sau đó ta tiến hành tạo chứng chỉ HTTPS nhé:
```
sudo certbot --nginx -d xoixeotv.com -d www.xoixeotv.com
```
Ở trên các bạn thay thế tên domain của các bạn vào nhé.

Chú ý ở cuối quá trình khi được hỏi có muốn tự động redirect HTTP sang HTTPS không thì các bạn chọn có (option 2) nhé. Vì thường ta muốn user truy cập ứng dụng của ta ở HTTPS thôi đúng không :)

Ngay sau đó chúng ta quay lại trình duyệt load lại là sẽ thấy app của chúng ta đã có HTTPS nhé. Các bạn thử đăng nhập và test thử nhé.

Và.... BÙM, gặp lỗi :scream::scream:

![](https://images.viblo.asia/c494b24b-ba2d-417f-95aa-4867ffd7bc00.png)

Lỗi ở đây in ra là cổng 6001 đang không được chạy dưới HTTPS. Nếu các bạn mở file `/etc/nginx/sites-available/default` sẽ thấy là ta chỉ có cổng `443` được chạy dưới HTTPS.

Oke vậy bây giờ copy paste cả khối `server` trong file kia và đổi 443 thành `6001` là được đúng không?? Đúng vậy, nhưng có 1 cách hay hơn đó là ta vẫn dùng cổng `443` và forward request vào cổng `6001`, bởi vì ta nhận thấy rằng toàn bộ request tới Laravel Echo Server thì đều qua route `/socket.io`, cùng với đó là dùng cách này ta có thể đóng cổng `6001` không cho traffic đi vào server thông qua cổng này nữa, tăng bảo mật, vì một trong những `best practices` khi cấu hình server là hạn chế mở port tối đa.

Ta thêm vào file `/etc/nginx/sites-available/default` ở block có chứa cổng 443 một chút nhé:
```bash
location /socket.io {
            proxy_pass http://localhost:6001;
            proxy_redirect     off;
            proxy_http_version 1.1;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header Host $host;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```
Trông sẽ như sau nhé:

![](https://images.viblo.asia/5f7600f9-8223-454e-8da5-c5121baaedd3.png)

Sau đó ta tiến hành restart lại Nginx nhé:
```bash
sudo service nginx restart
```
Tiếp theo ta cần sửa lại file `.env` một chút nhé:
```bash
APP_ENV=production
APP_URL=https://xoixeotv.com

...
MIX_FRONTEND_PORT=443
```
Sau đó ta tiến hành build lại code VueJS để phần cấu hình Laravel Echo được cập nhật nhé:
```bash
sudo npm run prod
```
> Note: ở trên chạy `npm run prod` ta cần có `sudo` vì giờ folder Laravel của chúng ta thuộc sở hữu của `www-data` rồi.

Mở lại trình duyệt và test thử, ta đã thấy không còn lỗi đỏ lòm ở console nữa, nhưng Realtime đã bị mất ???? Ô mai gót  :scream::scream: Lí do vì sao????? Không lỗi lầm gì. :persevere::persevere:

Realtime bị mất thì điều đầu tiên ta cần nghĩ tới là Laravel Echo Server có vấn đề. Ta thử check log xem nhé:
```bash
nano /var/log/laravel_echo_server.out.log
```

![](https://images.viblo.asia/f85babb1-c1bb-4419-8365-4c9b4ffb9240.png)

Hìu, vì ta đang chạy Laravel Echo Server ở production mode nên không thấy in ra log, cú thật :angry::angry:.

Ta sửa lại file `.env` một chút nhé, các bạn chạy `sudo nano .env` nhé:
```bash
...
LARAVEL_ECHO_SERVER_DEBUG=true
```
> Khi chạy Laravel Echo Server sẽ tự động đọc file `.env` nếu thấy có option nào thì sẽ override lại option tương ứng trong file `laravel-echo-server.json` nhé

Sau đó ta tiến hành khởi động lại process chạy laravel echo server nhé:
```bash
sudo supervisorctl restart laravel_echo_server
```
Sau đó check lại log nhé:
```bash
nano /var/log/laravel_echo_server.out.log
```
Và ta sẽ thấy như sau:

![](https://images.viblo.asia/d25c1f3f-5645-46da-8f85-9dfbe18bcd91.png)

Hừm, lỗi 404, lí do vì sao nhỉ????????

Ta lật lại vấn đề một chút, vừa nãy ở file cấu hình Nginx đoạn `server_name` ta đã nói rằng chỉ chấp nhận request tới app Laravel của chúng ta nếu chúng được gửi từ domain `xoixeotv.com` hoặc `www.xoixeotv.com`, nhưng khi Laravel Echo Server xác thực user thì nó gửi request tới Laravel thông qua `localhost`, và nếu gọi tới `localhost` thì Nginx sẽ trả về 404 vì không tìm thấy.

Vậy bây giờ ta cần sửa lại `authHost` trong file `laravel-echo-server.json` là được, nhưng ở file `.env` mình đã override lại giá trị đó rồi nên ta sửa ở file `.env` nhé, các bạn chạy `sudo nano .env` nhé:
```bash
LARAVEL_ECHO_SERVER_AUTH_HOST=https://xoixeotv.com
```
> Thay tên domain của các bạn vào nhé.

Cuối cùng là quay lại trình duyệt, F5 và BÙMmmmm:

![](https://images.viblo.asia/9d23d627-67c6-4f39-8972-1fc70ae45fc5.png)

Ta đã có một ứng dụng đầy đủ hoàn chỉnh, pằng pằng chíu chíu :boom::boom:

> Note: vì `APP.ENV` ta đặt là production nên Horizon chỉ được truy cập với tài khoản `admin@gmail.com` nhé các bạn, thêm/sửa tài khoản ở `app/Providers/HorizonServiceProvider.php` nhé

Cuối cùng là ta đóng lại cổng 6001 không cho truy cập từ bên ngoài nhé. Các bạn có thể dùng 2 cách: vẫn làm trên trang quản trị của nhà cung cấp nơi các bạn mua server hoặc qua UFW

Nếu dùng UFW thì các bạn chạy command sau;
```bash
sudo ufw delete 6001
```

# Đóng máy
Như các bạn thấy để chạy được một ứng dụng Laravel đầy đủ ở production ta cần phải setup mệt nghỉ, cùng với đó là debug khi gặp lỗi hack não :rofl::rofl:

Cùng với đó toàn bộ các thành phần của ứng dụng đều được chạy dưới quyền của `www-data`. Khi làm việc với server mục tiêu của ta là luôn chạy app với các quyền vừa đủ, tránh việc cái nào cũng phang với quyền `root` nhé :rofl::rofl:

Một trong những điều mình thấy hạnh phúc khi làm việc với mỗi project đó là: từ quá trình viết design, viết code, tới khi deploy thành công ra production thấy đứa con cưng của mình chạy thành công cảm giác thật là sung sướng. :D

Cùng với đó việc phải xử lý các vấn đề đau đầu trên server cũng làm giúp mình cải thiện kĩ năng làm việc với server khá là nhiều nữa.

Bài đến đây quá là dài rồi. Nếu các bạn có gì thắc mắc thì để lại comment cho mình nhé. Hẹn gặp lại các bạn ở những bài sau ^^