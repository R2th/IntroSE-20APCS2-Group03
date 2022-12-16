## Chọn nơi cung cấp dịch vụ hosting 
Có rất nhiều lựa chọn khi nói đến nơi cung cấp dịch vụ hosting. Đây là một số nhà cung cấp hosting phổ biến hiện nay: [Amazon EC2](https://aws.amazon.com/ec2/), [DigitalOcean](https://www.digitalocean.com/), [Vultr](https://www.vultr.com/), [linode](https://www.linode.com/),... 

Trong bài này mình sẽ hướng dẫn các bạn deploy lên DigitalOcean. Nếu bạn chưa có tài khoản, hãy đăng ký tại [đây](https://www.digitalocean.com/). Và đặc biệt, khi quá trình đăng ký hoàn tất, bạn sẽ nhận được 100$ miễn phí để sử dụng trong 60 ngày trên DigitalOcean.

## Tạo Server DigitalOcean
Đầu tiên bạn phải tạo server digitalocean của riêng mình bằng cách chọn `Create > Droplets` hoặc click vào [đây](https://cloud.digitalocean.com/droplets/new)

#### Chọn hệ điều hành 
Mặc định **Ubuntu 20.04 LTS** đã được chọn, nếu bạn không muốn chọn một distro khác thì hãy chuyển sang bước tiếp theo 

![Screen Shot 2022-05-25 at 10.34.04.png](https://images.viblo.asia/499bb1c9-ae32-4e45-b14e-3e8de6a6ecb1.png)

#### Chọn bộ nhớ RAM cho server 
Các ứng dụng Ruby on Rails có xu hướng yêu cầu nhiều RAM, và ta sẽ cần chạy CSDL như Postgresql hay MySQL cũng như Redis. Mỗi thứ trong số này sẽ yêu cầu RAM để hoạt động. Vì vậy, tuỳ vào dự án mà bạn muốn deploy và chọn bộ nhớ thích hợp.
![Screen Shot 2022-05-25 at 11.09.29.png](https://images.viblo.asia/ecc2727c-1b8a-40de-899f-5739e14fbbea.png)

#### Chọn nơi đặt server 
Hãy chọn một trung tâm gần nhất với nơi mình sống.
![Screen Shot 2022-05-25 at 11.11.25.png](https://images.viblo.asia/f7c1cda1-5a5c-41f3-8123-794f0201c58f.png)

#### Chọn phương thức xác thực 
Mình khuyên bạn nên chọn SSH keys để đỡ phải nhớ password :D. Về cách tạo thì bạn click vào New SSH Key và làm theo hướng dẫn.
![Screen Shot 2022-05-25 at 11.12.30.png](https://images.viblo.asia/17dc4f49-bdcf-4a90-acab-f387bd84da54.png)

#### Tạo Server 
Click vào nút Create Droplet để hoàn tất quá trình tạo server. Và giờ bạn có thể login vào server của mình bằng lệnh sau: `ssh root@1.2.3.4`. Để lấy được địa chỉ IP, bạn có thể truy cập vào droplet của mình và copy địa chỉ ipv4.

#### Tạo user deploy
Chúng ta sẽ tạo một user để deploy, user này hạn chế quyền trên production để giúp ngăn chặn khi ai đó cố gắng lấy toàn quyền kiểm soát máy chủ.

Trong khi login với quyền root trên máy chủ, chúng ta có thể chạy các lệnh sau để tạo thêm user deploy.

```
root@your-server$ adduser deploy
root@your-server$ adduser deploy sudo
root@your-server$ exit
```

Sau đó để ko phải nhập password khi bạn muốn login vào deploy user thì bạn phải thêm ssh key cho user này bằng cách sử dụng `ssh-copy-id`

```
$ ssh-copy-id root@1.2.3.4
$ ssh-copy-id deploy@1.2.3.4
```

Bây giờ bạn có thể login với deploy user mà ko cần nhập password: `ssh deploy@1.2.3.4`

## Cài đặt Ruby
Cài đặt môi trường:

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev dirmngr gnupg apt-transport-https ca-certificates redis-server redis-tools nodejs yarn
```

Cài đặt Ruby:

```
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
git clone https://github.com/rbenv/rbenv-vars.git ~/.rbenv/plugins/rbenv-vars
exec $SHELL
rbenv install 3.1.2
rbenv global 3.1.2
ruby -v
```

Bước cuối là cài đặt Bundler:

```
gem install bundler
gem install bundler -v 1.17.3
```

## Cài đặt NGINX và Passenger
Đối với môi trường production, chúng ta sẽ sử dụng NGINX làm máy chủ để nhận HTTP requests. Những requests đó sẽ được chuyển cho Passenger.

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger focal main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update
sudo apt-get install -y nginx-extras libnginx-mod-http-passenger
if [ ! -f /etc/nginx/modules-enabled/50-mod-http-passenger.conf ]; then sudo ln -s /usr/share/nginx/modules-available/mod-http-passenger.load /etc/nginx/modules-enabled/50-mod-http-passenger.conf ; fi
sudo ls /etc/nginx/conf.d/mod-http-passenger.conf
```

Bây giờ chúng ta đã cài đặt xong NGINX và Passenger và ta cần phải trỏ Passenger đến đúng phiên bản Ruby đang sử dụng

* Mở Terminal và chạy `sudo nano /etc/nginx/conf.d/mod-http-passenger.conf`
* Đổi dòng chứa `passenger_ruby` thành `passenger_ruby /home/deploy/.rbenv/shims/ruby;`
* Khởi động lại nginx `sudo service nginx start`

Bây giờ bạn có thể kiểm tra và đảm bảo NGINX đang chạy bằng cách truy cập địa chỉ IP của máy chủ trong trình duyệt của bạn và sẽ hiện thông báo: "Welcome to NGINX"

Tiếp theo, chúng ta sẽ xóa máy chủ NGINX mặc định và thêm một máy chủ cho ứng dụng của bạn.

```
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-enabled/your-app
```

Copy đoạn mã sau vào file trên và đổi your-app thành tên dự án của bạn

```
server {
  listen 80;
  listen [::]:80;

  server_name _;
  root /home/deploy/your-app/current/public;

  passenger_enabled on;
  passenger_app_env production;

  location /cable {
    passenger_app_group_name your-app_websocket;
    passenger_force_max_concurrent_requests_per_process 0;
  }

  # Allow uploads up to 100MB in size
  client_max_body_size 100m;

  location ~ ^/(assets|packs) {
    expires max;
    gzip_static on;
  }
}
```

Và reload NGINX để load lại file mới nhất: `sudo service nginx reload`

## Tạo Database
#### Tạo PostgreSQL Database
Đối với Postgres, chúng ta sẽ bắt đầu bằng cách cài đặt máy chủ Postgres và libpq để biên dịch pg rubygem. Sau đó, sẽ tạo 1 user postgres có toàn quyền truy cập vào CSDL và sử dụng tài khoản đó để tạo người dùng CSDL mới cho các dự án khác. 

Đảm bảo thay đổi your-app thành tên dự án của bạn.

```
sudo apt-get install postgresql postgresql-contrib libpq-dev
sudo su - postgres
createuser --pwprompt deploy
createdb -O deploy your-app
exit
```

#### Tạo MySQL Database
Đối với MySQL, chúng ta sẽ cài đặt cả thư viện server và client để có thể biên dịch rubygem mysql2.

```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
sudo mysql_secure_installation
mysql -u root -p
```

Bây giờ chúng ta có thể tạo CSDL cho dự án của mình.

```
mysql> CREATE DATABASE IF NOT EXISTS your-app;
mysql> CREATE USER IF NOT EXISTS 'deploy'@'localhost' IDENTIFIED BY 'password123';
mysql> CREATE USER IF NOT EXISTS 'deploy'@'%' IDENTIFIED BY 'password123';
mysql> GRANT ALL PRIVILEGES ON your-app.* TO 'deploy'@'localhost';
mysql> GRANT ALL PRIVILEGES ON your-app.* TO 'deploy'@'%';
mysql> FLUSH PRIVILEGES;
mysql> \q
```

## Deploy production
#### Setup Capistrano
Thêm các gem sau vào Gemfile
```
gem 'capistrano', '~> 3.11'
gem 'capistrano-rails', '~> 1.4'
gem 'capistrano-passenger', '~> 0.2.0'
gem 'capistrano-rbenv', '~> 2.1', '>= 2.1.4'
```

Sau khi thêm, chúng ta sẽ chạy bundle và yêu cầu Capistrano cài đặt các tệp cấu hình của nó:

```
bundle
cap install STAGES=production
```

Khi chạy lệnh trên nó sẽ tạo ra một vài files:
* Capfile
* config/deploy.rb
* config/deploy/production.rb

Sau đó bạn đổi lần lượt các file trên như sau:

```ruby:Capfile
require 'capistrano/rails'
require 'capistrano/passenger'
require 'capistrano/rbenv'

set :rbenv_type, :user
set :rbenv_ruby, '3.1.2'
```

```ruby:config/deploy.rb
set :application, "your-app"
set :repo_url, "git@github.com:username/your-app.git"

# Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads'

# Only keep the last 5 releases to save disk space
set :keep_releases, 5

# Optionally, you can symlink your database.yml and/or secrets.yml file from the shared directory during deploy
# This is useful if you don't want to use ENV variables
# append :linked_files, 'config/database.yml', 'config/secrets.yml'
```

```ruby:config/deploy/production.rb
server 'your-ip', user: 'deploy', roles: %w{app db web}
```

Trường hợp dự án của bạn có sử dụng các biến môi trường thì cần phải thêm nó cho môi trường production

```
$ ssh deploy@1.2.3.4
deploy$ mkdir /home/deploy/your-app
deploy$ nano /home/deploy/your-app/.rbenv-vars
```

Bây giờ, bạn có thể deploy dự án của bạn trên production bằng cách chạy lệnh sau: `bundle exec cap production deploy`. Nếu bạn thấy lỗi, bạn có thể SSH vào máy chủ và xem logs:
 
```
# To view the Rails logs
less /home/deploy/myapp/current/log/production.log
# To view the NGINX and Passenger logs
sudo less /var/log/nginx/error.log
```

Bài viết được dịch từ [gorails](https://gorails.com/deploy/ubuntu/22.04). Cảm ơn các bạn đã theo dõi.