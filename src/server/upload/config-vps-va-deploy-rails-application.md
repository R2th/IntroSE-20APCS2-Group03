# Mở đầu
Trong cuộc đời developer thì chắc ai cũng trải qua bước deploy sản phẩm của mình lên server để public cho mọi người. Ở bài viết này mình sẽ hướng dẫn mọi người config và deploy rails app lên server từ a-z.
# Cài đặt server (vps)
Ruby on rails không phải là ngôn ngữ execute luôn như PHP nên mình sẽ chọn VPS để có thể custom, config như ý muốn và đặc biệt sẽ giúp mình hiểu hơn về stack của 1 server chạy ruby on rails sẽ cần những gì.
## Chọn VPS
Trước đây mình có dùng VPS bên vultr để vọc vạch 1 chút, lượn 1 vòng thì mình thấy ưu điểm là giá rẻ hơn so với VPS trong nước mà cấu hình lại mạnh hơn, bù lại điểm yếu là nếu bị đứt cáp thì đường truyền hơi toang.
Bạn có thể truy cập [tạo vps](https://www.vultr.com/?ref=8247102) (đây là link ref, sẽ giúp mình có thêm tý $ duy trì con vps hiện tại để vọc tiếp :v ) rồi tạo account và bắt đầu tạo vps cho riêng mình. Bên Vultr có chương trình dùng thử nếu thấy tốt bạn có thể thêm phương thức thanh toán để trả phí dùng tiếp.
Hoặc bạn có thể chọn bên [Digital Ocean](https://cloud.digitalocean.com/) có service cũng gần tương tự. Còn nếu bạn có vps rồi thì chuyển qua phần tiếp theo nhé.
Sau khi tạo account bên vultr sẽ cho bạn chọn VPS ở phần product trên thanh menu trái. Ở đây mình dùng cấu hình minimum là 
- Choose Server:  Cloud Compute 
![](https://images.viblo.asia/51148195-d681-4e57-925e-6c9a13eebe57.png)
- Server Location: Singapore (mình chọn chỗ này cho gần và có cáp quang trực tiếp với VN => fastest)
![](https://images.viblo.asia/a721eac9-f4be-4c38-a4a6-394b062dd98b.png)
- Server Type: Ubuntu 16.04 (lý do mình chọn 16.04 để tránh những trường hợp xung đột môi trường hoặc ở 18.04 có những package hoạt động không như mong muốn, gây lỗi.)
![](https://images.viblo.asia/b8f1f237-0ace-4e15-8a08-6cf30313395f.png)
- Server Size: 25 GB SSD /$5/mo / $0.007/h / 1 CPU / 1024MB Memory / 1000GB Bandwidth
Server bên trên có giá 5$ / 1 tháng
![](https://images.viblo.asia/b13d811a-5911-463a-9cd4-7af5ccce9ea3.png)

## Cài đặt môi trường
- Sau khi làm các bước trên, bên vultr sẽ chuyển hướng bạn qua trang detail của VPS, nếu không chuyển hướng bạn chọn vào VPS vừa tạo để xem nhé.
- Trong này sẽ có thông tin access đến VPS qua SSH và cũng là SFTP luôn.
![](https://images.viblo.asia/491f368a-cddb-4bb5-91ba-6753a3209bbe.png)

Môi trường server cũng cần cài đặt ruby như bình thường để chạy rails app.
Để cài đặt ruby mình cài theo hướng dẫn ở trang này [Hướng dẫn cài đặt ruby với từng phiên bản và hệ điều hành](https://gorails.com/setup/ubuntu/16.04)
Các bước và lệnh để cài đặt như sau 
```bash:create_user_deploy
sudo adduser deploy
sudo adduser deploy sudo
su deploy
cd
```
```bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev nodejs yarn
```

```bash
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.7.1
rbenv global 2.7.1
ruby -v
```
- Nhập password của sudo nếu cần nhé.
- Nếu bạn dính lỗi thiếu thư viện để build thì hãy cài thêm nhé

```bash
sudo apt-get install build-essential
```
- Nếu có lỗi về `--openssl`
```bash
sudo apt-get install libssl-dev
```
- Hoặc có thể cài đặt ngắn hơn như này 
```bash
cd
wget http://ftp.ruby-lang.org/pub/ruby/2.7/ruby-2.7.1.tar.gz
tar -xzvf ruby-2.7.1.tar.gz
cd ruby-2.7.1/
./configure
make
sudo make install
ruby -v
```
- Tiếp theo là cài bundle
```bash
gem install bundler
```
- Một trong những thứ không thể thiếu khi deploy là cài đặt git nè.
```bash
git config --global color.ui true
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR@EMAIL.com"
ssh-keygen -t rsa -b 4096 -C "YOUR@EMAIL.com"
```
- Test kết nối đến git 
```bash
ssh -T git@github.com
```
Nếu message trả về có dạng như bên dưới là oke nhá.
```
Hi tungblvt-1933! You've successfully authenticated, but GitHub does not provide shell access.
```
- Cài đặt rails ( bạn có thể chọn bất cứ phiên bản nào bạn muốn )
```bash
gem install rails -v 6.0.2.2
rbenv rehash
```
- Kiểm tra version rails 
```bash
rails -v
```
trả về `Rails 6.0.2.2` là đúng.

- Cài đặt Database (ở đây mình chọn MySQL làm mẫu nhé)
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
Các bước cài đặt như local, ghi nhớ password của root mysql khi cài đặt nhé ( mình nghĩ nên ghi vào đâu đó để lưu lại )

- Cài đặt Nginx ( các bạn có thể dùng apache cũng được, mình cài apache rồi nên lần này mình cài nginx :v )
```bash
sudo apt-get install nginx
```

Sau khi cài đặt chạy lệnh `sudo ufw app list` mà server trả về như bên dưới là oke
```bash
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

- Giải thích 1 chút 
    + **Nginx Full**: cái này sẽ đồng thời mở cổng 80 ( không được mã hóa ) và cổng 443 (TLS/SSL đã được mã hóa ). nó là cổng trao đổi data ấy.
    + **Nginx HTTP**: cái này thì chỉ mở cổng 80 thoai
    + **Nginx HTTPS**: còn cái này chỉ mở cổng 443.
 - Ở bài này mình chưa đả động đến mã hóa nên mình sẽ bỏ qua HTTPS đồng nghĩa domain sẽ không có SSL.
 - Mình sẽ chỉ sử dụng cổng 80 thôi. Bật nó lên nhé.
 ```bash
 sudo ufw allow 'Nginx HTTP'
 ```
 - Kiểm tra sự thay đổi nè
 ```bash
 sudo ufw status
 ```
 - Nếu message trả về là  `Status: inactive` thì bạn chạy lệnh sau để active lại nhé
 ```bash
 sudo ufw enable
 ```

 - Output thành công sau khi kiểm tra status có dạng
 ```bash
 Status: active

To                         Action      From
--                         ------      ----
Nginx HTTP                 ALLOW       Anywhere                  
Nginx HTTP (v6)            ALLOW       Anywhere (v6)             
 ```
 
 - Phòng khi SSH bị lỗi thì ta có thể bật kết nối SSH bằng lệnh `sudo ufw allow 'OpenSSH'`
- Kiểm tra websever 
```bash
systemctl status nginx
```
- kết quả trả về thành công sẽ như sau
```bash
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2020-07-29 04:10:31 UTC; 19min ago
 Main PID: 24343 (nginx)
   CGroup: /system.slice/nginx.service
           ├─24343 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
           └─24344 nginx: worker process
```

- Về cơ bản đã xong, theo mình cách tốt nhất để kiểm tra webserver đã hoạt động hay chưa là truy cập luôn vào IP của server (nếu chưa có domain) sẽ trả về trang default của nginx như sau.
![](https://images.viblo.asia/679e857f-59ac-4f0b-95a5-7166cadeebfc.png)

- Nhoài ra chúng ta còn cần cài đặt thêm 1 vài package để rails có thể chạy như Nokogiri, NodeJs
```bash
sudo apt-get install libxml2-dev libxslt-dev
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Do rails yêu cầu nodejs >8.x, đó là lý do tại sao cần thêm option 8.x 

- Cài đặt gem passenger để kết nối giữa Rails app và nginx
```bash
gem install passenger 
# or
sudo gem install passenger
```
- Do chúng ta dùng passenger nên khi complie có thể gem sẽ yêu cầu 1 vài package, ta chạy lệnh sau để cài đặt
```bash
sudo apt-get install -y zlib1g zlib1g-dev libssl-dev libyaml-dev libcurl4-openssl-dev libruby
```
- Một vài package có thể sử dụng trong tương lai như: imagemagick để gem cùng tên dùng, nano hay vim để edit file bạn có thể tự cài theo nhu cầu nhé.
- Cuối cùng là passenger, thứ sẽ liên kết rails app với nginx 
```bash
sudo apt-get install -y libnginx-mod-http-passenger
```
nếu gặp lỗi package quá cũ bạn có thể chạy như sau (lỗi này xảy ra với ubuntu < 18.04
```bash
sudo apt install aptitude
sudo aptitude install -y libnginx-mod-http-passenger
```

## Cài đặt rails và nginx
Mặc định nginx sẽ chỉ cho phép `root` hoạt động ở `/var/www/`, mình sẽ cho thêm user `deploy` nữa 
```bash
sudo chown deploy:deploy /var/www -R
```

- Tạo project hoặc bạn cũng có thể lấy từ git về, cú pháp quen thuộc nào.
```bash
rails new example
```
- Sửa config nginx. Do chúng ta đã tạo user deploy nên ta sẽ đổi default user của nginx thành deploy 
```bash
sudo nano /etc/nginx/nginx.conf
```
( newbie nên mình dùng nano nhé, bạn nào biết dùng vim thì múc thoai :v )
- Tạo / sửa file `/etc/nginx/conf.d/mod-http-passenger.conf`
```bash
sudo nano /etc/nginx/conf.d/mod-http-passenger.conf
```
Ta sửa config để passenger biết mà kết nối với nginx và rails
```bash:/etc/nginx/conf.d/mod-http-passenger.conf
passenger_ruby /home/deploy/.rbenv/shims/ruby;
passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
```

- Trỏ đến site example lúc nãy tạo project ấy của chúng ta
```bash
sudo nano /etc/nginx/sites-enabled/example.conf
```
với content như sau :
```bash:/etc/nginx/sites-enabled/example.conf
server {
  listen 80;
  server_name example.com www.example.com;
  root /var/www/example/public;
  passenger_enabled on;

  # When you are ready to switch to production mode - change this to `production`
  passenger_app_env development; # <-- !important      
}
```

Nhưng do mình chưa có domain là example.com nên mình sẽ dùng IP server để kết nối, mình sẽ đổi thành
```bash:/etc/nginx/sites-enabled/example.conf
server {
  listen 80;
  server_name 45.77.241.5;
  root /var/www/example/public;
  passenger_enabled on;

  # When you are ready to switch to production mode - change this to `production`
  passenger_app_env development; # <-- !important      
}
```

sau đó reload nginx
```bash
sudo systemctl restart nginx
```

Bây giờ bạn có thể truy cập qua browser bằng ip mà bạn set server của bạn. Nếu không có sai sót gì thì màn hình sẽ hiện như ảnh nè
```
ex: http://45.77.241.5
```
![](https://images.viblo.asia/94db0779-93fd-44c1-be3d-fb356dbac27d.png)
## chúc các bạn thành công :v