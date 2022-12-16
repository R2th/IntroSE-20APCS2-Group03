## Đối với nhà phát triển Web. Mục đích cuối cùng của việc phát triển là cho phép mọi người có thể truy cập và sử dụng web đó. Và việc triển khai trang web lên môi trường để có thể sử dụng gọi là deployment. Hôm nay mình sẽ giới thiệu cách deploy 1 web Ruby On Rails lên AWS EC2.
### 1. Chuẩn bị server.
- Trước tiên cần đăng kí 1 tài khoản amazon để có thể sử dụng dịch vụ của. Đăng ký ở [đây](https://portal.aws.amazon.com/billing/signup#/start).
Với tài khoản mới thì bạn có thể sử dụng free 1 số tính năng của amazon trong vòng 12 tháng. Nhưng sẽ bị giới hạn. Chi tiết thì các bạn hãy đọc qua https://aws.amazon.com/free để tránh bị mất tiền không mong muốn. 
- Tiếp theo sau khi đăng ký và đăng nhập thì hãy vào [console ec2](https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home) để có thể tạo 1 instance.
Trông nó như sau:
![](https://images.viblo.asia/daff0cf0-e907-4055-bb05-27f884fa01fa.png)
- Để tạo instance thì click vào Launch instance. Sau khi vào thì chúng ta sẽ được chọn Hệ điều hành ...
của instance. Chú ý chỉ chọn những instance có note là Free tier eligible để được sử dụng free.
Mình làm việc với ubuntu 16.04 nên sẽ chọn Ubuntu Server 16.04 LTS (HVM), SSD Volume Type.
![](https://images.viblo.asia/451212cd-4155-4d5b-be53-8bb4073325d0.png)

- Đến instace type. Ở đây thì chúng ta sẽ chọn RAM, CPU các thứ liên quan tới cấu hình. Và mình để mặc định.
![](https://images.viblo.asia/b1fc57d0-d5cd-49ea-bb4b-906395b64aef.png)
- Nhấn Review and Launch. Rồi kiểm tra lại thông tin của instance nếu cần thiết. => Launch
![](https://images.viblo.asia/1b5c1b05-e71c-447a-abb1-b105f2ee42be.png)
- Ở đây thì nó cũng đã bảo chúng ta là tạo khóa. Aws sẽ lưu trữ 1 khóa và chúng ta sẽ lưu 1 khóa. Muốn Ssh lên instance thì bạn cần có cái khóa này. Và không nên chia sẽ cái khóa này nếu bạn không muốn người khác có thể truy cập vào Instance. OK nhấn download key và launch instance => View instance.
- Đợi 1 lát cho instance chuẩn bị xong. Và có state là running là chúng ta có thể ssh vào được.
Và để ý địa chỉ ipv4 public. Ở đây ip instance của mình là ```3.0.184.168```. Lát nữa mình sẽ dùng ip này để ssh.
![](https://images.viblo.asia/7a62dfe5-411c-4d8e-aa8e-415dcbd62579.png)
### 2. Config server.
ssh: Ở máy local mình sẽ đưa key lúc nãy download về vào thư mục Awskeys và thực hiện ssh như sau:
![](https://images.viblo.asia/886f5400-1698-423b-880a-b1866313b307.png)
- Lệnh ```chmod 400 AWSNam.pem``` sửa lại quyền cho file. Chỉ cho phép user sở hữu quyền read. nếu không khi ssh sẽ bị WARNING: UNPROTECTED PRIVATE KEY FILE!
- Lệnh ```ssh -i "AWSNam.pem" ubuntu@3.0.184.168``` dùng để ssh vào instance. trong đó có key file, 
ubuntu là user root mặc định. và 3.0.184.468 là địa chỉ ip của instance. 
- Vậy là ssh thành công rồi. Giờ mình sẽ tạo  1 user cho việc deploy. 
### 3. Tạo user, thêm sshkey.
Mình sẽ tạo 1 user namdv. Và cấp quyền sudo cho user mới.
``` 
sudo adduser namdv
```
Mở file sudoers và add thêm dòng ```%namdv ALL=(ALL) ALL``` như sau:
```
sudo nano /etc/sudoers
```
![](https://images.viblo.asia/2f073e1d-8c2c-431e-a4f6-e002922459ec.png)
Vậy là cấp quyền sudo cho user xong. Giờ chúng ta login vào user này bằng lệnh 
```
sudo su - namdv
```
Để ssh vào thẳng user mà không phải dùng keypem thì mình phải add sshkey máy của mình vào instance này.
```
mkdir .ssh
cd .ssh
nano authorized_keys
```
- Copy ssh key ở máy tính local và dán vào. Xem key bằng lệnh ```cat ~/.ssh/id_rsa.pub```.  Nếu bạn chưa có thì có thể tạo theo [hướng dẫn](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- Giờ chúng ta ssh vào user namdv bằng lệnh ```ssh namdv@3.0.184.168```.
-  Tương tự thì mình cần tạo ssh key cho instance và add vào github để server có thể clone source code từ github. 
- Instance mới tạo cũng giống như chúng ta mới cài đặt lại hệ điều hành. Do đó cần cài môi trường cho nó. Ở đây mình cài Git, Ruby, Ruby on rails, Mysql , Nodejs và 1 số thứ khác nếu cần thiết cho project của bạn.
Mình sẽ cài: Git, Ruby, Ruby on rails, Mysql , Nodejs, gem bundle
### 4. Cài đặt nginx.
nginx là 1 web server. Nó sẽ tiếp nhận request và đưa tới Rails app để xử lý.
```
sudo apt-get install nginx
```
Xóa config default và tạo 1 config mới.
```
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/conf.d/default.conf
# config
upstream app {
   # Path to Puma SOCK file, as defined previously
   server unix:/var/www/deploy-ec2/shared/tmp/sockets/puma.sock fail_timeout=0;
 }

 server {
   listen 80;
   server_name localhost;

   root /var/www/deploy-ec2/current/public;

   try_files $uri/index.html $uri @app;

   location / {
     proxy_set_header X-Forwarded-Proto $scheme;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header Host $host;
     proxy_redirect off;
     proxy_set_header Connection '';
     proxy_pass http://app;
     proxy_read_timeout 150;
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
Sau đó restart nginx để nhận config mới.
```
sudo service nginx restart
```
Chú ý 1 số dòng sau và chỉnh nó lại cho phù hợp với folder app. Mình sẽ config vào đây trước và tạo folder chứa app sau nhé. ```/var/www/deploy-ec2```
- server unix:/var/www/deploy-ec2/shared/tmp/sockets/puma.sock fail_timeout=0;
-  root /var/www/deploy-ec2/current/public;
-  listen 80;
Port ở đây là config là 80. Do đó cần mở port 80 trên instance. Cách mở như sau:
Ở mục instance. Mình kéo sang ngang tìm cột Security Group. => Ấn vào launch wizard 3
![](https://images.viblo.asia/f06f3308-da92-42c9-96ea-36d517dcb8fb.png)
Ấn chuột phải vào. Và chọn edit inbound rule.
![](https://images.viblo.asia/fa5bc9a0-10e5-463b-827a-e1744a26a44a.png)
Add rule mới. type là http, port 80 => save.
![](https://images.viblo.asia/883be22f-8043-418f-bc9d-f4192d5eeed8.png)
### 5. Tạo folder chứa app và database.
Tạo database
```
mysql -u root -p
> CREATE DATABASE `deploy-ec2_staging`;
```

Ở đây mình sử dụng folder /var/www để chứa app nên cứ cd vào và tạo folder app. Có thể tạo 1 folder nào tùy thích nhé. Nhớ config ở nginx đúng đường dẫn là được.
- Mình tạo luôn 2 file database.yml và application.yml.
```
cd /var/www
sudo mkdir deploy-ec2
sudo chown -R namdv:root deploy-ec2/
mkdir deploy-ec2/shared
mkdir deploy-ec2/shared/config

nano deploy-ec2/shared/config/database.yml
# content
staging:
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  database: "deploy-ec2_staging"
  username: root
  password: "password mysql"
  socket: /var/run/mysqld/mysqld.sock
  
nano deploy-ec2/shared/config/application.yml
# content
SECRET_KEY_BASE: "chạy rake secret ở máy local và copy vào đây"  
```
### Cơ bản cho server thế là xong. Giờ cần config vào dự án của chúng ta. Mình sẽ sử dụng gem [capistrano](https://github.com/capistrano/capistrano) để hỗ trợ cho việc deploy.
### 1. Cài đặt gem.
```
gem "capistrano"
gem "capistrano3-puma"
gem "capistrano-rails"
gem "capistrano-bundler"
gem "capistrano-rvm"
```
- Sau khi cài đặt xong thì chạy lệnh ```cap install``` để tạo file config cho việc deploy.
![](https://images.viblo.asia/a88d231f-8fb3-4499-99db-1c060a1bdb2e.png)
- Trong lần deploy này mình sẽ cho môi trường là staging. Vậy chỉ cần quan tâm tới 2 file là. deploy.rb và staging.rb.
### 2. Config
deploy.rb
```ruby
lock "3.11.0"

set :application, "deploy-ec2"
set :repo_url, "git@github.com:namdv-1352/deploy-ec2.git"

set :branch, :master	
set :deploy_to, "/var/www/#{fetch(:application)}"

set :linked_files, %w(config/database.yml config/application.yml)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads public/assets)

set :keep_releases, 5
set :rvm_type, :user
set :rvm_ruby_version, "ruby-2.5.1"	
```
- application: Tên App.
- repo_url: Repo github của project bạn muốn deploy(ssh)
- branch: Branch github deploy.
- deploy_to: Thư mục chứa app. Ở trên mình đã config nginx dẫn tới thư mục /var/www/deploy-ec2. Với 1 thư mục khác cũng tương tự. 2 cái này phải giống nhau. 
- 1 số option khác các bạn có thể đọc thêm ở [đây](https://capistranorb.com/documentation/getting-started/configuration/)

staging.rb
```ruby
set :stage, :staging
set :rails_env, :staging
set :deploy_to, "/var/www/#{fetch(:application)}"
set :branch, :master
server "3.0.184.168", user: "namdv", roles: %w(web app db)
```
- server :  Nhớ trỏ đúng ip và user của bạn nhé.

secrets.yml
```
staging:
  secret_key_base: "Key vừa tạo ở trên để add vào server".
```

Capfile
```ruby
require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require "capistrano/rvm"
require "capistrano/bundler"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"
require "capistrano/puma"
install_plugin Capistrano::Puma

# Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
```
Capfile này cho phép bạn config chạy 1 số lệnh, task trong khi deploy.
- Require bundle: chạy bundle install
- Require assets: chạy rake assets:precompile 
- Require migrations: chạy db:migrate
### 3. Deploy
Để deploy thì dùng lệnh cap <environment> deploy. Ở đây mình dụng staging thì sẽ là:
```
cap staging deploy
```
Chờ 1 lát và nếu thành công thì có thể truy cập vào trang bằng public ip hoặc public dns.
- http://3.0.184.168/
- http://ec2-3-0-184-168.ap-southeast-1.compute.amazonaws.com/
    ![](https://images.viblo.asia/c5af0071-c609-423f-a143-adcf1c2059c9.png)

Github: https://github.com/namdv-1352/deploy-ec2    
#### Vậy là thành công. Mình đã deploy được 1 trang web  và mọi người có thể truy cập vào. Cám ơn các bạn đã dành thời gian cho bài viết của mình.