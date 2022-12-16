Ở phần 1 mình đã hướng dẫn mọi người cách tạo tài khoản và đăng kí dịch vụ EC2 trên AWS, cách tạo user để deploy và cài đặt các môi trường thiết yếu cho việc deploy rails app lên server.
Ở bài viết này mình sẽ hướng dẫn 1 vài config cơ bản để deploy ứng dụng lên EC2.
## Cài đặt Database
Ở bài viết này mình sẽ sử dụng MySQL cho ứng dụng, sau khi cài đặt thành công MySQL trên server chúng ta tiến hành tạo sẵn DB cho ứng dụng:
```
mysql -u root -p
Nhập password vào
Gõ lệnh này
CREATE DATABASE <your_database_name> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```
Nhớ cái tên database để lát còn config trong file database.yml nhé
## Git
Dĩ nhiên rồi, nếu các bạn quản lí source code của mình thì phải cài git để giúp con server này có thể pull được source mới nhất về mỗi lúc bạn tiến hành re-deploy.
```
sudo apt-get install git
```
# Config cho Project
Có rất nhiều phương án để deploy 1 rails app lên server, các bạn có thể làm thủ công, cài đặt và pull code trực tiếp trên server rồi chạy server hệt như máy local của bạn. Tất cả mọi thứ bạn phải làm bằng tay. 
Nhưng hôm nay mình giới thiệu 1 phương pháp hỗ trợ cho việc deploy tự động chỉ bằng 1 dòng lệnh. Đấy là sử dụng  Capistrano Gem.

## Cài đặt capistrano
Thêm các gem cần thiết :
```
gem "capistrano"
gem "capistrano3-puma"
gem "capistrano-rails", require: false
gem "capistrano-bundler", require: false
gem "capistrano-rvm"
```

Rồi `bundle `nó thôi.
Sau khi cài xong Capistrano, chạy lệnh `cap install` để thằng gem này sinh ra các file config CẦN thiết:  `deploy.rb, staging.rb, production.rb`
Cái này là cho chúng ta 2 môi trường, 1 cái production.rb cho Production và 1 cái staging.rb cho test, muốn thêm nữa thì tạo thêm thôi.

Tiến hành thiết lập cho file `deploy.rb`
```
# config valid only for current version of Capistrano
lock "3.5.0"

set :application, "your_app"
set :repo_url, "your_git_repo"
set :pty, true
set :linked_files, %w(config/database.yml config/application.yml)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads)
set :keep_releases, 5
set :rvm_type, :user

set :puma_rackup, -> {File.join(current_path, "config.ru")}
set :puma_state, -> {"#{shared_path}/tmp/pids/puma.state"}
set :puma_pid, -> {"#{shared_path}/tmp/pids/puma.pid"}
set :puma_bind, -> {"unix://#{shared_path}/tmp/sockets/puma.sock"}
set :puma_conf, -> {"#{shared_path}/puma.rb"}
set :puma_access_log, -> {"#{shared_path}/log/puma_access.log"}
set :puma_error_log, -> {"#{shared_path}/log/puma_error.log"}
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, "staging"))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
```

Trong file này chủ yếu cần quan tâm đến dòng application, và git repo thôi, còn các thứ còn lại nó sẽ lấy mặc định các path rồi, nếu các bạn không động gì đến nó thì cũng không cần quan tâm sớm. Cơ bản cái đã.

Tiếp đến là config file `production.rb` , `staging.rb` làm tương tự nhé
```
set :stage, :production
set :rails_env, :production
set :deploy_to, "path_to_your_app"
set :branch, :config_deploy
server <server_ipv4_public_ip>, user: <your_user>, roles: %w(web app db)
```

Trong cái này các bạn có thể thấy, set :stage là thiết lập cho môi trường nào ( ở đây là production)

Và set :deploy_to là nơi các bạn đặt đường dẫn các bạn muốn deploy app lên, ở server các bạn tạo thư mục app ở đâu thì ở đây push vào như vậy ví dụ như `"xxx/xxxx/your_app"`

Xong dưới local rồi đấy, giờ thì tạo cái cổng cho thằng server có thể ssh được tới git repo của mình, công việc đó y hệt như việc làm với máy local vậy

Trên sever thực hiện câu lệnh lấy ssh key:

`ssh-keygen -t rsa -C "tên gì cũng được"`


Sau đó quăng cái key public lên git `repo setting > deploy keys`.

Sau khi thực hiện việc cấp quyền SSH cho con EC2 sang thằng Git rồi thì chúng ta cài tiếp 1 Web server.

## Thiết lập Web server

Nói 1 chút về Web server nhé. Trong hầu hết các ứng dụng rails chúng ta tạo ra thì mặc định sử dụng 1 App server là Puma. Các bạn có thể thấy nó mỗi lần thực hiện `rails s`

```
=> Booting Puma
=> Rails 5.2.1 application starting in development 
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.12.0 (ruby 2.5.1-p57), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://0.0.0.0:3000
Use Ctrl-C to stop
```

Mỗi khi chạy app server rails mặc định sẽ gọi tới puma app server, cái này là có gem mặc định cắm luôn trong gemfile rồi. Dĩ nhiên có nhiều app server cho các bạn lựa chọn chứ không riêng gì puma ( ví dụ như Thin, Rainbows, Unicorn ...)
App server này sẽ đảm nhận nhiệm vụ load code của các bạn lên và giữ trong bộ nhớ, tiếp nhận các request từ client gửi lên và chuyển cho rails app xử lý, sau khi xử lý xong rails app trả ngược các response về cho app server và app server trả ra cho client.

App Server có thể chạy độc lập mà chả cần tới web server, ví dụ như cách mà nó thực hiện trên máy dev của các bạn vậy. Nhưng khi ra production, đòi hòi nhiều thứ hơn mà app server không thể đảm nhận hết, vì thế mà chúng ta phải dùng thêm 1 web server, nó giống như 1 đơn vị tiền xử lý các request vậy. Web server có thể chạy 1 lúc nhiều App server, xử lý được nhiều  requesst hơn. Có những request không cần hỏi tới server như css, js, images thì thằng này có thể làm luôn mà chả cần rails.

Có 2 thằng Web server được sử dụng phổ biến nhất là Nginx  và Apache. Ở đây mình sẽ đề cập tới Nginx
![](https://images.viblo.asia/9ad3743b-aa40-450d-888d-5234a49bc901.png)
Đây là kiến trúc cơ bản của Nginx

Dài dòng quá, giờ cài nó thôi, nhớ là cài trên con EC2 nhé.


```
sudo apt-get install nginx
```

Sau khi cài xong, chúng ta tạo ra 1 file config `default.conf`
```
sudo nano /etc/nginx/conf.d/default.conf
```
với nội dung như sau :
```
upstream app {
   # Path to Puma SOCK file, as defined previously
   server unix:/<path_to_your_app>/shared/tmp/sockets/puma.sock fail_timeout=0;
 }

 server {
   listen 80;
   server_name localhost;

   root /<path_to_your_app>/current/public;

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
Trong file này chúng ta chỉ cần quan tâm tới 3 chỗ chính cái đã.

1.  server unix: đây là nơi thiết lập socket connect của thằng nginx và con puma của mình. phải chính xác đường dẫn này không thì toi đấy. 
2.  listen 80: Cái này là cổng http protocol, nginx mặc định sẽ dùng cổng 80 để giao tiếp với các request http từ client, nếu thay đổi giá trị này thì phải nhớ để lát nữa chúng ta config tiếp.
3.  root: cái này thì đường dẫn tới thư mục deploy public rồi. 

Các thông số dưới để thiết lập proxy ... . Mấy cái này các bạn tự tìm hiểu thêm để nghịch nhé, dài quá mình không nói ở đây được ( mà thực ra mình cũng méo biết nó là cái gì lol)

Config xong thì save lại rồi restart cái server cái.
```
sudo service nginx restart
```
90% rồi đó. Tiếp theo là tạo ra các thư mục mà chúng ta chỉ định để deploy lên. Nhớ các path nãy giờ chỉ định nhé.
## Chỉ định thư mục deploy
Nãy giờ có mấy cái `<path-to-your-app>`mà các bạn không biết để làm gì thì đây :
```
mkdir /deploy
mkdir /deploy/apps
mkdir /deploy/apps/your_app_name
sudo chown -R www:root /deploy/apps/your_app_name
mkdir /deploy/apps/your_app_name/shared
mkdir /deploy/apps/your_app_name/shared/config
nano /deploy/apps/your_app_name/shared/config/database.yml
```

Cái này thì mình học theo 1 đồng nghiệp cách đặt tên đường dẫn. cái này thì các bạn thích đặt thế nào thì đặt thôi, miễn là config cho đúng PATH là oki cả.

Trong file `database.yml` :
```
production:
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  database: <your_database_name>
  username: root
  password: <your_mysql_password>
  socket: /var/run/mysqld/mysqld.sock
```
Không khác gì cái file ở dưới local cả. Nhập vào cái database name và pass mà khi nãy bạn đã tạo nhé.

Tiếp là file config `application.yml`
```
nano /deploy/apps/your_app_name/shared/config/application.yml
```

Dán `secret key` vào :
```
SECRET_KEY_BASE: "<your_secret_key_base>"
```

key này thì dưới local gõ lệnh :

```
RAILS_ENV=production rake secret
```

rồi paste nó lên server là xong. Save hết đám nó lại.

Xong cả rồi đấy, mọi thứ đã sẵn sànggggggggggggggggggggggggggggggggggg.

À mém tý quên, nãy chúng ta thiết lập cái `listen 80` thì giờ phải mở cái cỗng đó ra trên con EC2 nhé.
Login vào AWS  - > Dashboard -> Network & Security > security group

![](https://images.viblo.asia/4a9cc2ff-353d-4b06-8930-48f760e71405.png)

Liếc qua phải cái thì thấy có 1 thằng group nằm chờ sẵn. Click phải chuột vào nó -> Edit inbound rules


![](https://images.viblo.asia/d0bf4cfe-94e4-4920-89c2-a6e6af3bd63f.png)


![](https://images.viblo.asia/5fd5aa32-6299-4ff4-b108-0b38d5f8e88d.png)

Click vào Add Rule. Phần type chọn HTTP, Protocol thì giữ nguyên là TCP và port thì thiết lập là 80( hoặc cái mà bạn muốn), phía sau đó là phần giới hạn ip truy cập bạn tự tìm hiểu thêm nhé

![](https://images.viblo.asia/eb674a57-5f37-4777-a024-93435920cd6e.png)

Mọi thứ đã sẵn sàng. Quay về local thực hiện deploy thôi.

Như mình đã nói, chỉ 1 lệnh duy nhất :

```
cap production deploy
```

Pha cho mình ly cafe và chờ đợi thành quả.

30 mins later .....

Nhập địa chỉ ip v4 public của con EC2 lên web browser và xem kết quả nhé. Chúc bạn may mắn, nếu không may thì đọc và làm lại từ đầu thôi (yaoming)