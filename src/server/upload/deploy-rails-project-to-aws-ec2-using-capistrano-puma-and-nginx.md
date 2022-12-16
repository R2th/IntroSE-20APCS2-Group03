Đầu tiên ta cần đăng kí tài khoản AWS đã. Để có thể sử dụng free thì mình đăng kí tài khoản AWS Free Tier. Đầu tiên bạn cần 1 thẻ thanh toán quốc tế  VISA/MasterCard có ít nhất 1 đô trong đó. Sau đó có thể đăng kí tại [Đây](https://aws.amazon.com/free/?sc_channel=PS&sc_campaign=acquisition_VN&sc_publisher=google&sc_medium=english_cloud_computing_b&sc_content=aws_account_p&sc_detail=create%20aws%20account&sc_category=cloud_computing&sc_segment=158525273887&sc_matchtype=p&sc_country=VN&s_kwcid=AL!4422!3!158525273887!p!!g!!create%20aws%20account&ef_id=WquDlQAAAMB6WAsP:20180509035741:s) . Tài khoản này được dùng miễn phí trong một năm với những giới hạn sử dụng nhất định. 

Đã có tài khoản AWS rồi giờ thì cùng nhau deploy 1 project Rails lên đó thôi ~.~

### 1. Config Rails app
Tạo ứng dụng Rails:
```
rails new rails-aws-ec2-deploy
```
Thêm static page:
```
rails generate controller home index
```

Thêm vào routes:
```
 root :to => "home#index"
```

Thêm capistrano, puma gem bằng cách thêm vào Gemfile:
```
gem 'figaro'
gem 'puma'
group :development do
  gem 'capistrano'
  gem 'capistrano3-puma'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rvm'
end
```
Tạo ra các file config Capistrano:
```
cap install STAGES=production
```
Sẽ tạo ra forder deploy trong config chứa production.rb, Capfile, deploy.rb

Thêm vào Capfile:
```
require 'capistrano/rvm'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano/puma'
install_plugin Capistrano::Puma
```

Thêm vào deploy.rb:
Ở đây ta chỉ cần quan tâm `set :application` và `set :repo_url`

```
# Tên application của mình
set :application, 'urlshortner' 
# Repository github của bạn. Tạo 1 repo mới trên github
set :repo_url, 'git@github.com:ngocvu3010/rails-aws-ec2-deploy.git' 
set :branch, :master
set :deploy_to, '/home/deploy/urlshortner'
set :pty, true
set :linked_files, %w{config/database.yml config/application.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
set :keep_releases, 5
set :rvm_type, :user
set :rvm_ruby_version, 'ruby-2.2.3' 

set :puma_rackup, -> { File.join(current_path, 'config.ru') }
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"    #accept array for multi-bind
set :puma_conf, "#{shared_path}/puma.rb"
set :puma_access_log, "#{shared_path}/log/puma_error.log"
set :puma_error_log, "#{shared_path}/log/puma_access.log"
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
```
Thêm config/database.yml trong .gitignore
Sau đó ta đẩy project lên Github.
### 2. Tạo  1 instance trên AWS EC2
Vào EC2 trên AWS, chọn ``Launch Instance`` 

Chọn amazon machine image:
Ubuntu Server 14.04 LTS (HVM), SSD Volume 

![](https://images.viblo.asia/495467a8-4ab0-4495-8d9d-e315304a6410.png)

Next qua các step đến Step 6: Configure Security Group: Chọn add thêm HTTP
![](https://images.viblo.asia/bdb785b9-79b2-4d81-a2f5-e11fde670ac0.png)


Step cuối Chọn `Launch`. Lúc đó sẽ hiển thị ra modal tạo Key pair:

![](https://images.viblo.asia/414e5b91-cdfd-4dd7-9092-df2c40f6a52e.png)

Màn hình hiển thị ntn là đã tạo instance ec2 thành công

![](https://images.viblo.asia/6677a94a-f22e-4e64-80d3-4a7bd26c6c2d.png)


Chuyển file pem vào ssh sau đó `chmod 400` cấp quyền đọc

![](https://images.viblo.asia/fd299c82-6826-4a01-a288-1e74b9f37529.png)

Trên AWS: Click vào connect sẽ thấy hướng dẫn để connect tới instance

![](https://images.viblo.asia/08512d7b-a847-47de-83bc-85b5e11d305d.png)

Ta thử chạy `ssh -i "urlshorter.pem" ubuntu@ec2-18-218-162-201.us-east-2.compute.amazonaws.com`

![](https://images.viblo.asia/24a699ca-35ab-4652-8191-684c474618e6.png)
Màn hình giống như vậy tức là đã connect thành công từ máy local mình tới instance EC2

Giờ thì config server thôi
### 3. Config server
**Step 1:** Update và Upgrade server:
```
sudo apt-get update && sudo apt-get -y upgrade
```
**Step 2:** Tạo 1 user mới cho ubutun server: Mình để là `deploy`
```
sudo useradd -d /home/deploy -m deploy
sudo passwd deploy
```
Sau đó cấp quyền cho user `deploy` 

```
sudo visudo
```
Thêm `deploy  ALL=(ALL:ALL) ALL` ngay dưới dòng `root    ALL=(ALL:ALL) ALL`

**Step 3:**
 Login user `deploy` và tạo public key
```
su - deploy
```
Ở teminar chuyển từ `ubuntu@ip-172-31-36-238:` thành `deploy@ip-172-31-36-238:` nghĩa là ta đã đăng nhập thành công

Tạo public key:
```
ssh-keygen
```

![](https://images.viblo.asia/ab5d9b21-ec0b-47c3-baa2-50fff0ecab1f.png)

Copy ssh-key  vào `Settings => SSH and GPG keys`, tạo 1 ssh key mới cho github
Sau đó ta authenticate ssh đó trên máy của mình

![](https://images.viblo.asia/e51b6a05-fb84-4333-920c-611ee753e1f1.png)

**Step 4:** Copy public key và paste vào server authorized_keys
![](https://images.viblo.asia/b48f50bb-89bc-4426-a81d-384f427cd314.png)

Sau đó paste vào file `authorized_keys` server instance:

```
deploy@ip-172-31-36-238:~/.ssh$ vi authorized_keys
```

Cấp quyền truy cập:
```
sudo chmod 700 .ssh
sudo chmod 600 authorized_keys
```

**Step 5:** Cài đặt git, nginx

 Cài đặt git trên server:
```
sudo apt-get install git
```
Cài đặt Nginx:

```
sudo apt-get install nginx
```

Sau đó sửa file config của nginx: ``deploy@ip-172-31-36-238:~$ sudo vi /etc/nginx/sites-available/default ``. Xóa config mặc định đi
Paste đoạn config này vào đó:
```
upstream app {
  # Thay đường dẫn đến File Puma.sock
  server unix:/home/deploy/urlshortner/shared/tmp/sockets/puma.sock fail_timeout=0;
}

server {
  listen 80;
  server_name localhost;
 # Thay đường dẫn đến public
  root /home/deploy/urlshortner/current/public;

  try_files $uri/index.html $uri @app;

  location / {
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Connection '';
    proxy_pass http://app;
  }

  location ~ ^/(assets|fonts|system)/|favicon.ico|robots.txt {
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  error_page 500 502 503 504 /500.html;
  client_max_body_size 4G;
  keepalive_timeout 10;
}  
```


**Step 6:** Cài đặt mysql cho server:
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
Tạo 1 database mới bằng cách :
```
mysql -u root -p
CREATE DATABASE database_production CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
```
Như vậy đã tạo xong DB cho production

**Step 7:** Cài RVM cho server
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable

rvm install 2.3.1 
```
**Step 8:** Cài đặt bundler gem cho server:
```
gem install bundler --no-ri --no-rdoc
```
**Step 9:** Tạo cấu trúc thư mục cho server:

Ở trong folder deploy.rb ta để ý dòng `set :deploy_to, '/home/deploy/urlshortner'`. Hiện tại trên server ta gõ `pwd` sẽ ra thư mục hiện tại `/home/deploy`. cần tạo thư mục tên theo mình set ở trên là `urlshortner`

```
mkdir urlshortner
mkdir -p urlshortner/shared/config
nano urlshortner/shared/config/database.yml
```

Điền các thông tin vào database.yml
```
production:
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  database: <your_database_name> # Ở đây của mình là database_production
  username: root
  password: <your_mysql_password>
  socket: /var/run/mysqld/mysqld.sock
```

Tiếp đến tạo application.yml:
Tạo secret key ở local bằng cách: `RAILS_ENV=production rake secret` sẽ sinh ra secret key. Ta paste `SECRET_KEY_BASE: "<your_secret_key_base>"` vàp application.yml ở server
```
nano urlshortner/shared/config/application.yml
```

**Step 10:** Thêm vào `config/deploy/production.rb` ở local:
```
server '18.218.162.201', user: 'deploy', roles: %w{web app db}
```
18.218.162.201 là địa chỉ IPv4 Public IP mà các bạn có thể thấy ở trang thông tin instance lấy từ đường link này:  `ec2-18-218-162-201.us-east-2.compute.amazonaws.com` 


Sau đó chạy lệnh
```
cap production deploy
```

Hiển thị ntn là đang deploy:

![](https://images.viblo.asia/b0ec55da-dee2-4529-b335-6fff740ce3a8.png)

sau khi deploy xong ta restart lại nginx

```
sudo service nginx restart
```

Cùng nhìn kết quả nào:

![](https://images.viblo.asia/380ed05f-2bae-4190-ab59-fd72dfc247a7.png)

Vậy là chúng ta đã deploy xong! 

Nếu không thể `rails c` trên server được thì add thêm
```
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}
```
vào `deploy.rb`
Sau đó deploy lại và chạy rails c bằng cách
```
RAILS_ENV=production bundle exec rails console
```

Bạn có thể tham khảo
github: https://github.com/ngocvu3010/rails-aws-ec2-deploy

Hi vọng bài viết sẽ giúp ích cho bạn. 


### Nguồn tham khảo 

https://www.youtube.com/watch?v=imdrYD4ooIk

https://viblo.asia/p/huong-dan-deploy-ung-dung-ruby-on-rails-len-server-aws-ec2-su-dung-gem-capistrano-puma-va-nginx-Eb85oXDWK2G