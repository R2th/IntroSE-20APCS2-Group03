## Mở đầu

Xin chào! Ồ! Mình biết bạn đấy! Mấy tháng trước, mình cũng giống như bạn bây giờ, cũng giành hàng đống thời gian để deploy code lên server, dù có cố như thế nào cũng không tự động hóa được quá trình deploy. Điều đó thật không công bằng đúng không? Chứ còn gì nữa! Mình đã tìm kiếm rất nhiều cách và rồi sau đó, mình đã đọc được một bài viết giống như bài viết bạn đang xem bây giờ. Mới đầu mình nghĩ, cách này rồi cũng giống như các cách deploy khác. Nhưng, mình tự nhủ, mình không còn cách nào khác và rồi sau đó, mình đã đi đến một quyết định, và đó là quyết định sáng suốt nhất trong cuộc đời mình! Sau một ngày, mình đã tự động hóa được phần lớn công việc deploy code lên server. Sau hai ngày, mình đã có thể deploy code lên nhiều server cùng một lúc. Bằng cách nào ư? Mình đã thử deploy code sử dụng gem __Capistrano__. Hóa ra, để deploy code không tốn nhiều thời gian như mình nghĩ, chỉ cần gem __Capistrano__ là đủ. Bạn chỉ cần vào terminal và gõ duy nhất 1 câu lệnh `cap production deploy`. Cùng tính thời gian nào! Vâng, chỉ sau 2 phút 17 giây, mình đã đưa được app của mình lên server. Nghe có vẻ khó tin, nhưng đó là sự thật. Trong bài viết này, chúng ta sẽ cùng deploy một ứng dụng thực tế lên server AWS nhé

![](https://images.viblo.asia/cafa4728-4906-409b-9172-1148667d05f8.png)

## Deploy là gì? Tại sao lại cần Capistrano

Deploy hiểu đơn giản là quá trình bạn đưa code lên server và config cho server để code của bạn có thể chạy được trên đó. Nghe qua có vẻ đơn giản tuy nhiên việc deploy bao gồm rất nhiều công đoạn như: cài đặt môi trường cho server, pull code từ github, cài đặt các gem cần thiết, tạo database, chạy rake task, config nginx. Các công đoạn này thường lặp đi lặp lại rất mất thời gian nếu thực hiện bằng tay mà nếu sai ở bước nào đó thì quá nhọ vì vậy Capistrano được sinh ra để tự động hóa các công đoạn trên. Ngoài ra, Capistrano còn cho phép chúng ta deploy code lên nhiều server cùng một lúc, rollback nếu deploy lôi, lưu trữ các bản deploy gần đây nhất, chạy custom task trong quá trình deploy. Việc deploy với gem Capistrano gồm 3 bước

* Tạo môi trường trên server
* Config cho Capistrano
* Config Nginx

Trong bài viết này mình sử dụng project Ruby on Rails mình đã viết sẵn khi còn là intern. Các bạn có thể xem repo [tại đây](https://github.com/hoanghaidangdev/demo_danghh)

![](https://images.viblo.asia/3ab552ca-4ee0-49ed-b6ab-5208957d0cb0.png)

## Cách hoạt động của Capistrano

Capistrano hoạt động bằng cách chia việc deploy thành các Rake task. Để thực hiện 1 task, nó sẽ truy cập vào một hoặc một số server (mà chúng ta thiết lập) thông qua SSH connection để thực hiện các đoạn script trên server. Để hiểu rõ hơn chúng ta cùng đi sâu vào phân tích task __deploy:publishing__ được định nghĩa trong code của Capistrano nhé

```ruby
namespace :deploy do
  task :publishing do
    invoke "deploy:symlink:release"
  end
end
```

Đoạn code trên dùng để định nghĩa task __deploy:publishing__ khi thực hiện task này nó sẽ gọi đến một task khác có tên là __deploy:symlink:release__

```ruby
namespace :deploy do
  namespace :symlink do
    desc "Symlink release to current"
    task :release do
      on release_roles :all do
        tmp_current_path = release_path.parent.join(current_path.basename)
        execute :ln, "-s", release_path, tmp_current_path
        execute :mv, tmp_current_path, current_path.parent
      end
    end
  end
end
```

__execute__ trong đoạn code tạo ra một SSH connection và thực thi lệnh `ln -s` và `mv` trên server

![](https://images.viblo.asia/53a9325d-4a0c-43f0-8812-fc287a6b2365.png)

Capistrano định nghĩa sẵn cho chúng ta các task khi chúng ta thực hiện lệnh `cap production deploy` như sau:

```text
deploy
  deploy:starting
    [before]
      deploy:ensure_stage
      deploy:set_shared_assets
    deploy:check
  deploy:started
  deploy:updating
    git:create_release
    deploy:symlink:shared
  deploy:updated
    [before]
      deploy:bundle
    [after]
      deploy:migrate
      deploy:compile_assets
      deploy:normalize_assets
  deploy:publishing
    deploy:symlink:release
  deploy:published
  deploy:finishing
    deploy:cleanup
  deploy:finished
    deploy:log_revision
```

Ngoài ra chúng ta có thể định nghĩa các custom task để thực hiện các công việc trong quá trình deploy thông qua __after hook__ và __before hook__ hay đơn giản là ghi đè lại task do Capistrano định nghĩa. Điều này làm cho Capistrano là một công cụ deploy mạnh mẽ, dễ tùy biến và vô cùng mềm dẻo.

## Tạo môi trường trên server

### Tạo tài khoản AWS

Nếu các bạn chưa có tài khoản AWS thì có thể truy cập [link](https://portal.aws.amazon.com/billing/signup) để tạo một cái. Lưu ý đến bước này, các bạn cần có thẻ visa hoặc credit để hoàn tất đăng ký, Amazon sẽ trừ 1$ trong tài khoản và sẽ trả lại sau khi đăng ký thành công

![](https://images.viblo.asia/9c555a5f-a6a6-483c-b539-de7aecb2194e.png)

Khi đăng ký thành công, AWS sẽ cho chúng ta sử dụng một số dịch vụ của nó miễn phí trong vòng 12 tháng (quá đã). Ở đây, mình đã tạo sẵn một tài khoản rồi nên chúng ta tiếp tục bước tiếp theo nhé

### Tạo EC2 instance

Đăng nhập bằng tài khoản vừa đăng ký thôi, ở góc trên bên phải click vào button __Sign In to the console__

![](https://images.viblo.asia/f535a568-72ea-4852-89e1-071cc4c69d3a.png)

Chúng ta sẽ vào trang quản lý các dịch vụ của AWS, trong mục All services chọn __EC2__

![](https://images.viblo.asia/06670398-56e8-4842-af18-656014862d99.png)

Trong phần create instance, click vào Launch Instance

![](https://images.viblo.asia/550deccf-8ab0-4149-b850-09dac439c5bd.png)

Ở trang này nó sẽ cho phép chúng ta chọn loại instance để deploy, có thể xem instance là các máy ảo đã cài hệ điều hành và một số phần mềm cần thiết như git, vim, openssh... để ta có thể thao tác với server, chú ý các loại instance có phần chú thích __Free tier eligible__ có nghĩa là chúng ta có thể dùng nó free với tài khoản vừa mới đăng ký. Có rất nhiều loại OS chúng ta có thể chọn, tuy nhiên để dễ thao tác, ta chọn __Ubuntu Server 18.04 LTS (HVM), SSD Volume Type__

![](https://images.viblo.asia/cb496b73-f90f-459c-808e-fffd2537478f.png)

Tiếp tục click vào __Review and launch__

![](https://images.viblo.asia/9157e239-b498-40c4-bd7b-785e30084c3c.png)

Nó sẽ cho chúng ta xem qua các thông số của server, cứ để mọi thứ ở mặc định, click vào __Launch__

![](https://images.viblo.asia/055c8e8a-24c1-43cf-9ff4-129fa44f53a8.png)

Tiếp theo hệ thống yêu cầu chúng ta tạo một cái __key pair__ hoặc upload __public key__, mục đích là để chúng ta có thể truy cập được vào server thông qua SSH, chọn __Create new key pair__, ô key pair name có thể nhập cái gì cũng được, mình sẽ đặt theo tên của project, sau đó nhấn vào __Download key pair__ để tải private key về. Tránh để mất cái private key này, nếu mất sẽ không vào được server, người khác có private key này cũng có thể truy cập được vào server của chúng ta(lol). Sau đó click vào __Launch instance__ và đợi nó mấy phút để start instance nhé.

![](https://images.viblo.asia/baa2b40c-b2ca-43fd-ba55-8d30ab73d718.png)

Trong phần __Description__ có 2 mục mà ta cần quan tâm đến đó là __Public DNS (IPv4)__ và __IPv4 Public IP__, chúng ta có thể dùng 2 cái này để truy cập vào trang web sau khi deploy xong. Ngoài ra cái __IPv4 Public IP__ dùng để ta SSH vào và config cho Capistrano

### SSH vào EC2 instance

Trước hết ta vào thư mục mà ta mới tải cái __private key__ kia về sau đó cấp quyền cho nó. Bật terminal lên `cd` vào thư mục chứa key (Trong máy mình để ở thư mục Downloads) sau đó gõ lệnh `chmod 400 demo_danghh.pem`

![](https://images.viblo.asia/ce79b213-9e53-4c91-b09f-9cd005ea823f.gif)

Tiếp theo, ta SSH vào server thông qua cái private key kia, mặc định AWS sẽ tạo cho chúng ta một instance với user __ubuntu__ và IP của server chính là cái __IPv4 Public IP__ mình vừa đề cập bên trên.

```bash
ssh -i demo_danghh.pem ubuntu@18.141.8.95
```

![](https://images.viblo.asia/529738d7-f6f5-4a40-9f0a-d36ce135e2da.gif)

### Tạo user deploy và cấp quyền sudo

Khi làm việc chung với một nhóm, chúng ta cần share instance kia với những người khác để họ có thể deploy code lên server, ta không nên share private key vì rất dễ lộ key ra bên ngoài(lý do bảo mật) thay vào đó ta nên tạo một user, sau đó cấp quyền cho user đó, những người khác có thể truy cập thông qua public key, cùng bắt tay vào làm nào.

Tạo một user có tên __deploy__, tên này các bạn đặt là gì cũng được

```bash
sudo adduser deploy
```

![](https://images.viblo.asia/b223a9cf-cf75-4c55-80b9-e592819742fc.gif)

Trong quá trình tạo user, nó sẽ yêu cầu ta nhập mật khẩu và các thông tin liên quan khác, mật khẩu thì bắt buộc còn các thông tin khác thì có thể để trống nhé, sau đó chọn `Y` để xác nhận việc tạo user mới

Khi deploy ta cần cài đặt một số package do vậy user deploy cần có quyền root, ta add user deploy vào group sudo như sau

```bash
sudo usermod -aG sudo deploy
```

![](https://images.viblo.asia/71a8958f-efda-424b-8fc7-f434cb98da04.gif)

Cẩn tắc vô áy náy, thử test lại bằng cách SSH vào server bằng user mới tạo

![](https://images.viblo.asia/01adad70-369b-4671-838a-a20930dc2441.gif)

Bị dính lỗi __Permission denied (public key)__ do chúng ta chưa cho phép local ssh vào server. Ở máy local ta tạo mới ssh key như sau

```bash
ssh-keygen -t rsa -b 4096 -C "hoang.hai.dang@sun-asterisk.com"
```

Cái email kia các bạn nhập gì cũng được

![](https://images.viblo.asia/33042d6e-137b-4340-8a62-3506420d3d2e.gif)

Sau đó lên server add public key vừa mới tạo vào file __authorezied_keys__ của user deploy trên server. Ở máy local ta copy public key

```bash
cat ~/.ssh/id_rsa.pub | pbcopy
```

Sau đó ssh lại vào server, chuyển qua user __deploy__ tạo file authorized_keys và paste public key vào

```bash
ssh -i demo_danghh.pem ubuntu@18.141.8.95
su deploy
mkdir ~/.ssh
cd ~/.ssh
touch authorized_keys
vim authorized_keys
```

![](https://images.viblo.asia/7ae61690-dfe2-4d0f-bffc-1857bff1fe22.gif)

Đến đây coi như chúng ta đã hoàn thành việc setup tài khoản ở server, từ giờ chúng ta sẽ làm việc với user deploy mà chúng ta đã tạo mà không thông qua __private key__ kia nữa

### Cài đặt các package cần thiết

Tiếp theo mình cần cài đặt một số package để web app của chúng ta có thể chạy được trên đó, ở đây mình deploy ứng dụng Ruby on Rails nên sẽ cần cài đặt một số thứ như RVM, ruby, rails, bundler, nginx, mysql server, nodejs, yarn và một số thư viện liên qua khác

#### Cài đặt RVM, Ruby và Rails

```bash
sudo apt install gnupg2
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable --rails
```

#### Cài đặt Nodejs

```bash
sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install nodejs -y
```

#### Cài đặt yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

#### Cài đặt các thư viện cần thiết khác

```bash
sudo apt install build-essential libreadline-dev libxml2-dev libxslt1-dev libcurl4-openssl-dev libmysqlclient-dev
```

#### Cài đặt mysql và tạo database

```bash
sudo apt install -y mysql-server-5.7
```

Sau đó chúng ta cần config cho mysql

```bash
sudo mysql_secure_installation
```

Validate Password Plugin? n

Change the password for root? n

Remove anonymous users? y

Disallow root login remotely? y

Remove test database and access to it? y

Reload privilege tables now? y

Cuối cùng tạo database

```sql
mysql -uroot -p
CREATE DATABASE demo_danghh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Nếu bạn chạy lệnh `mysql -uroot -p` sau đó nhập mật khẩu mà gặp lỗi `Access denied for user 'root'@'localhost'` thì ta xử lý như sau

Trước hết ta cần dừng tiến trình mysql hiện đang chạy và truy cập mysql thông qua skip-grant-tables

```bash
sudo service mysql stop
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo /usr/sbin/mysqld --skip-grant-tables --skip-networking &
mysql -u root
```

Tiếp đến ta tiến hành reset password cho user root của mysql

```sql
USE mysql;
UPDATE user SET authentication_string=PASSWORD("12345678") WHERE User='root';
UPDATE user SET plugin="mysql_native_password" WHERE User='root';
quit
```

Trong đó `12345678` chính là mật khẩu ta đặt lại cho user root. Cuối cùng restart lại mysql

```bash
sudo pkill mysqld
sudo service mysql start
```

Đến đây ta đã xong bước đầu tiên cài đặt môi trường server để app của chúng ta có thể hoạt động được, tiếp theo ta sẽ cùng config cho Capistrano

## Config cho Capistrano

### Cài đặt các gem cần thiết

Trong Gemfile thêm vào group production những gem sau

```ruby
gem "capistrano"
gem "capistrano3-puma"
gem "capistrano-rails", require: false
gem 'capistrano-passenger'
gem "capistrano-yarn"
gem "capistrano-bundler", require: false
gem "capistrano-rvm"
```

Sau đó chạy `bundle install`

### Cài đặt Capistrano

Để cài đặt Capistrano, ta chạy lệnh `cap install`. Sau khi chạy nó sẽ sinh cho chúng ta các file cấu hình

* config/deploy.rb: Cấu hình chung

* config/deploy/production.rb: Cấu hình cho môi trường product

* config/deploy/staging.rb: Cấu hình cho môi trường staging

* Capfile: Dùng để import các module cần cho deploy

* lib/capistrano/tasks: Đây là thư mục nơi sẽ định nghĩa các custom task chạy trong quá trình deploy

![](https://images.viblo.asia/f74e605b-b5fc-4159-b1d8-6a0fea2eb2ac.gif)

### Capfile

Đây là nơi import các module, mỗi module được thêm vào sẽ bao gồm nhiều task, các task này sẽ được chạy tự động trong quá trính deploy. Ví dụ khi `require "capistrano/passenger"` thì task `deploy:restart` sẽ được thêm vào quá trình deploy sau khi `deploy:publishing` hoàn tất. Ta thêm các module vào Capfile như sau

```ruby
require "capistrano/setup"
require "capistrano/deploy"

require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require "capistrano/rvm"
require "capistrano/bundler"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"
require "capistrano/passenger"
require 'capistrano/yarn'
require 'capistrano/puma'
install_plugin Capistrano::Puma
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
```

Kết hợp thứ tự chạy capitrano và Capfile ta có thứ tự các task chạy như sau:

```text
deploy
  deploy:starting
    [before]
      deploy:ensure_stage
      deploy:set_shared_assets
    deploy:check
  deploy:started
  deploy:updating
    git:create_release
    deploy:symlink:shared
  deploy:updated
    [before]
      deploy:bundle
      yarn:install
    [after]
      deploy:migrate
      deploy:compile_assets
      deploy:normalize_assets
  deploy:publishing
    deploy:symlink:release
  deploy:published
    deploy:restart
  deploy:finishing
    deploy:cleanup
  deploy:finished
    deploy:log_revision
```

### config/deploy.rb

Đây là file config chung cho tất cả các môi trường, file này sẽ chứa các config về tên app, đường dẫn đến repo github, đường dẫn đến app trên server, config cho puma.... Ta config lại file này như sau

```ruby
lock "~> 3.11.1"

set :application, "demo_danghh"
set :repo_url, "git@github.com:hoanghaidangdev/demo_danghh.git"
set :ssh_options, { :forward_agent => true }

set :pty, true
set :linked_files, %w(config/database.yml config/application.yml)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads)
set :keep_releases, 5
set :rvm_type, :user
set :passenger_restart_with_touch, true

set :puma_rackup, -> {File.join(current_path, "config.ru")}
set :puma_state, -> {"#{shared_path}/tmp/pids/puma.state"}
set :puma_pid, -> {"#{shared_path}/tmp/pids/puma.pid"}
set :puma_bind, -> {"unix://#{shared_path}/tmp/sockets/puma.sock"}
set :puma_conf, -> {"#{shared_path}/puma.rb"}
set :puma_access_log, -> {"#{shared_path}/log/puma_access.log"}
set :puma_error_log, -> {"#{shared_path}/log/puma_error.log"}
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, "production"))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
```

Có ba điểm cần lưu ý trong file trên là

`set :application, "demo_danghh"` chính là tên app

`set :repo_url, "git@github.com:hoanghaidangdev/demo_danghh.git"` là đường dẫn đến repo github

`set :linked_files, %w(config/database.yml config/application.yml)` là các file sẽ được ta tạo trên server để Capistrano có thể kết nối được với mysql, file application.yml chứa secret_key_base cho ứng dụng Rails

Tiếp đến ta sẽ config cho từng môi trường, mặc định Capistrano sẽ sinh ra hai file là `config/deploy/production.rb` và `config/deploy/staging.rb` để config cho môi trường production và staging ở đây ta chỉ config cho file `config/deploy/production.rb`, môi trường staging làm tương tự.

### config/deploy/production.rb

File này chứa các config cho môi trường __production__, gồm các config liên quan đến branch dể deploy, ip và user_name của server. Ta cấu hình cho môi trường này như sau

```ruby
set :stage, :production
set :rails_env, :production
set :branch, "master"
set :deploy_to, "/home/deploy/deploy/demo_danghh"
server "18.141.8.95", user: "deploy", roles: %w{app db web}
```

`set :deploy_to, "/home/deploy/deploy/demo_danghh` chính là đường dẫn đến thư mực deploy trên server

`server "18.141.8.95"` chính là ip của server

`user: "deploy"` chính là user trên server thực hiện deploy.

Xong phần config cho Capistrano

## Config cho Nginx và tạo thư mục deploy trên server

### Tạo cấu trúc thư mục deploy

```bash
mkdir -p deploy/demo_danghh/shared/config && cd $_
touch application.yml database.yml
```

![mkdir](images/mkdir.gif)

Trong file database.yml ta config như sau:

```yaml
production:
  adapter: mysql2
  encoding: utf8mb4
  pool: "5"
  database: demo_danghh
  username: root
  password: "12345678"
  socket: /var/run/mysqld/mysqld.sock
```

Trong file application.yml ta config như sau:

```yaml
SECRET_KEY_BASE: "SECRET_KEY_BASE"
```

Cái secret key base ở trên ta có thể tạo ra bằng lệnh `rake secret`. Copy cái key đó bỏ vào file `application.yml` như trên

### Config Nginx

Đầu tiên ta cài đặt Nginx: `sudo apt install nginx`

Sửa lại file config nginx `cd /etc/nginx/sites_enabled/default`

```text
upstream app {
  server unix:/home/deploy/deploy/demo_danghh/shared/tmp/sockets/puma.sock fail_timeout=0;
}
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  index index.html index.htm index.nginx-debian.html;
  server_name _;
  root /home/deploy/deploy/demo_danghh/current/public;
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
  location ~* ^/assets/ {
        expires 1y;
        add_header Cache-Control public;
        add_header Last-Modified "";
        add_header ETag "";
        break;
    }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}
```

Trong file trên ta chú ý đến 3 dòng:

`server unix:/home/deploy/deploy/demo_danghh/shared/tmp/sockets/puma.sock fail_timeout=0;` cái là đường dẫn đến file puma.sock

`listen 80 default_server;` cho nginx đón các request đến thông qua cổng 80, lát nữa là sẽ mở công 80 trên instance để bên ngoài có thể truy cập vào được.

`root /home/deploy/deploy/demo_danghh/current/public;` thư mục public, các file sau khi precomplie đều nằm ở thư mục này

Restart lại Nginx `sudo service nginx restart`

Sau đó ta lên trang quản lý instance của AWS để mở port 80

Trong phần network and security ta chọn mục __Security Groups__

![](https://images.viblo.asia/289dacdb-174d-4f9c-8a41-13fc08b675ef.png)

Chọn cái security group của chúng ta, sau đó kích chuột phải vào, chọn __Edit inbound rules__

![](https://images.viblo.asia/6a1c6d77-f162-468c-80b1-c468146d62f7.png)

Tiếp tục click vào button __Add rule__, click vào cái dropdown trong phần type sau đó chọn __HTTP__ cuối cùng save lại

![](https://images.viblo.asia/61e8e43f-2636-43fa-9be8-8949d500baab.png)

Bây giờ ta quay lại máy local và chạy lệnh `cap production deploy`

![](https://images.viblo.asia/fef7a94c-bd3f-4d5a-a7c1-e092b8311a0d.png)

Bây giờ ta thử lên server xem kết quả như thế nào nhé

![](https://images.viblo.asia/18df809c-ac2f-4753-9973-2b431ba2441c.png)

Pơ phệch! Vậy là chúng ta đã deploy thành công một ứng dụng Rails lên server AWS rồi đó

## Cấu trúc thư mục deploy trên server

```text
├── current -> /home/deploy/deploy/demo_danghh/releases/20190916200944/
├── releases
│   ├── 20190916192621
│   ├── 20190916194120
│   ├── 20190916200119
│   ├── 20190916200522
│   └── 20190916200944
├── repo
│   └── git data file
├── revisions.log
└── shared
    └── linked_files and linked_dirs
```

Thư mục releases giữ tất cả các phiên bản deploy thành công folder được đặt tên theo định dạng [year][month][day][timestamp]

Thư mục current đây là một __symlink__ trỏ tới bản release cuối cùng thành công, nếu deploy thất bại thì thư mục current sẽ giữ bản release lần gần nhất thành công trước đó

Thư mục repo giữ một bản copy của git repo, giúp các lần sau pull code từ Github về nhanh hơn

File revisions.log chứa log dùng để debug khi deploy fail hoặc xem log các lần deploy trước đó

Thư mục shared chứa các linked_files và linked_dirs. Trong một Rails app bình thường, các file chứa các thông tin nhạy cảm như application.yml, database.yml, secret.yml sẽ không được đưa lên Github (lý do bảo mật) nên khi Capistrano pull code từ Github về sẽ không có các file này. Chẳng lẽ mỗi lần deploy ta lại lên server set lại các biến môi trường? Không hề, các file nằm trong thư mục share này sẽ được dùng chung cho tất cả các lần deploy và sẽ được link đến các file tương ứng trong quá trình deploy

```ruby
set :linked_files, %w(config/database.yml config/application.yml)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads)
```

## Một vài thứ hay ho khác có thể làm với Capistrano

### Deploy lên nhiều server cùng một lúc

Trong file `config/deploy/production.rb` ta có thể config để deploy lên nhiều server cùng lúc như sau

``` ruby
server "32.68.168.32", user: "deploy", roles: %w{app db web}
server "34.70.227.168", user: "dummy", roles: %w{app web}
server "3.72.123.12", user: "database", roles: :db
```

### Role filtering

Ví dụ chúng ta có 2 server dùng cho 2 mục đích: Server thứ nhất là webserver chỉ chạy Ruby on Rails app, server thứ hai là Database server chỉ chạy mysql. Vì vậy chúng ta không thể ép cả hai server chạy các task như nhau được vì sẽ lỗi trong quá trình deploy. Thay vào đó, ta sẽ chỉ định server chạy những task nhất định nếu có role tương ứng. Ta có thể hình dung việc config hai server đó như sau

```ruby
server "34.70.227.168", user: "ruby", roles: %w{app web}
server "3.72.123.12", user: "database", roles: :db
```

Ngoài ra các task do lập trình viên định nghĩa cũng có thể chỉ định role, ví dụ

```ruby
task :say_hello, role: :web do
  puts "Hello, world"
end
```

Hơn nữa, ta có thể thêm các role tùy ý để chỉ định chạy trên các server, ví dụ

```ruby
task :show_name, role: :super_server do
  puts "Foo bar"
end
```

Trong file `config/deploy/production.rb`

```ruby
server "32.68.168.32", user: "deploy", roles: %w{app db web}
server "34.70.227.168", user: "dummy", roles: %w{app db web}
server "3.72.123.12", user: "database", roles: %w{db super_server}
```

Nếu config như trên thì chỉ có server thứ ba mới có quyền chạy task `show_name`

### Chạy custom task trong khi deploy

Trong phần hướng dẫn bên trên, mình phải tạo database trước khi tiến hành deploy, vậy có cách nào tự động tạo database nếu như database chưa có trong khi deploy không? Có nhé, để mị nói cho mà nghe

Trong thư mục `lib/capistrano/tasks` tạo file `create_database.rake`, nội dung file này để định nghĩa rake task mà chúng ta sẽ chạy khi deploy

```ruby
namespace :deploy do
  desc "Create database"
  task :create_database do
    ask :db_root_password, ''
    ask :db_name, ''
    ask :db_pass, ''
    on roles(:web) do
      execute "mysql --user=root --password=#{fetch(:db_root_password)} -e \"CREATE DATABASE IF NOT EXISTS #{fetch(:db_name)}\""
    end
  end
end
```

Để trong quá trình deploy Capistrano có thể gọi được task trên ta cần dùng __before hook__. Trong file `config/deploy` ta thêm dòng sau

```ruby
before "deploy:migrate", "deploy:create_database"
```

Bây giờ trước khi chạy migrate nó sẽ chạy task tạo database nếu chưa có

![](https://images.viblo.asia/f80fc86b-c729-4c42-a114-e2cff8843492.png)

Ta cũng có thể áp dụng cách trên để tạo thêm các task khác như: tạo sẵn thư mục deploy, cài đặt các package cần thiết trước khi tiến hành deploy...

## Tổng kết

Trên đây mình đã giới thiệu cho các bạn cách thức hoạt động của Capistrano cũng như demo cách deploy một ứng dụng Ruby on Rails lên server AWS, bài viết dựa theo những kiến thức mình tổng hợp được nên không tránh khỏi những thiếu sót, rất mong nhận được những ý kiến đóng góp để mình có thể tiến bộ hơn trong tương lai. Nếu thấy bài viết bổ ích, đừng quên upvote cho mình nhé.

## Tài liệu tham khảo

* Github Capistrano [https://github.com/capistrano/capistrano](https://github.com/capistrano/capistrano)
  
* Capistrano home page [https://capistranorb.com/](https://capistranorb.com/)