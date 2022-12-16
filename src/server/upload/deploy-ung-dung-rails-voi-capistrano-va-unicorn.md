### Lời mở đầu
Thực ra trên viblo đã có nhiều bài hướng dẫn chi tiết việc deploy rails app lên môi trường server rồi. Bài này mình viết với mục đích để tổng hợp lại kiến thức và bổ sung kĩ thuật liên quan đến server cho bản thân.

Do không có điều kiện để thuê cloud server hay máy chủ, do đó mình sẽ build docker làm server. Nếu các bạn đã có cloud server như ec2 thì có thể bỏ qua phần build container và cài đặt ssh trong bài viết.

Let 's go
### Cấu trúc server
![](https://images.viblo.asia/68ea9125-3143-49a3-b07e-214d145d12c0.png)
Sơ đồ trên minh họa các công việc chúng ta cần phải cài đặt trên local và server:
* Rails app: là một app được viết bằng ruby on rails
* Unicorn: là một app server hỗ trợ rails - tương tự puma hay passenger. nó nằm giữa rails app và web server.
* Nginx: là web server
* Mysql: database cho rails app
* Capistrano: tool tự động deploy từ local tới server remote

### Build container ubuntu (remote server)
Trước khi làm build container các bạn có thể đọc qua các thao tác cơ bản khi làm việc với container tại [đây](https://viblo.asia/p/docker-basic-Ljy5Vxm9Zra)

Mình sử dụng image ubuntu bản 16.04 để làm remote server nhé
```
$ docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
ubuntu               16.04               2a4cca5ac898        12 months ago       111MB
```

Build remote server bằng docker container. Mình đặt tên cho container là `deploy_server`:
```
$ sudo docker run --name deploy_server -it ubuntu:16.04 /bin/bash
```

Sau khi chạy xong lệnh này thì bạn đã vào trong container với quyền hạn cao nhất, việc bây giờ cần làm là cài đặt ssh để truy cập từ local đến host nhá.

#### Install SSH
Cài đặt ssh và vim bằng lệnh sau:
```
root@1cb3a078d00b:/# apt-get update
root@1cb3a078d00b:/# apt-get install -y vim openssh-server
```

Trước khi sửa file config ssh thì các bạn có thể tạo một bản backup nhé:
```
root@1cb3a078d00b:/# vim /etc/ssh/sshd_config
```
Các giá trị cần kiểm tra, nếu chưa có thêm vào cuối file:
```
MaxAuthTries 3
RSAAuthentication yes
PubkeyAuthentication yes
ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
```
Sau khi sửa xong bạn sẽ cần khởi động lại service
```
root@1cb3a078d00b:/# service ssh restart
```
Tạo thư mục .ssh để chứa publickey của máy mà chúng ta có thể SSH lên:
```
root@1cb3a078d00b:/# ~/.ssh
root@1cb3a078d00b:~# ssh-keygen -t rsa // sau đó enter để pass qua phần setup cũng được
```
Tạo file authorized_keys trong folder .ssh để chứa publickey với lệnh:
```
root@1cb3a078d00b:/# cd ~/.ssh
root@1cb3a078d00b:~/.ssh# touch authorized_keys
root@1cb3a078d00b:~/.ssh# chmod 600 authorized_keys
root@1cb3a078d00b:~/.ssh# ls
authorized_keys  id_rsa  id_rsa.pub
```

Bước tiếp theo lấy public key của local và add vào file authorized_keys của server:
* Local: `cat ~/.ssh/id_rsa.pub` và copy đoạn SSH key

* Server: `vi ~/.ssh/authorized_keys` và paste đoạn SSH của host vào

Thoát khỏi container bằng tổ hợp phím `ctrl + d` và ssh vào lại server. Tuy nhiên ta cần phải kiểm tra ip của deploy server là gì bằng câu lệnh sau:
```
$ sudo docker inspect deploy_server | grep IPAddress
"SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
                    "IPAddress": "172.17.0.2",
```

Sau khi thực hiện câu lệnh thì IP của deploy_server trên máy mình `172.17.0.2`. SSH vào server bằng lệnh sau:
```
ssh root@172.17.0.2
```
Lưu ý: 
* Trước khi ssh còn phải kiểm tra xem container đã được start chưa bằng lệnh sau:
```
$ docker ps
1cb3a078d00b        ubuntu:16.04        "/bin/bash"         5 hours ago         Up 4 hours                              deploy_server
```
* Trong trường hợp container chưa chạy, cần phải start container:  `docker start deploy_server`
* Truy cập lại deploy_server:  `docker exec -it deploy_server /bin/bash`

#### Install Ruby on Rails
Cài đặt RVM theo trang trủ [RVM.io](https://rvm.io/)
```
root@1cb3a078d00b:~# apt-get install -y curl
root@1cb3a078d00b:~# gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
root@1cb3a078d00b:~# curl -sSL https://get.rvm.io | bash -s stable
```
Để có thể sử dụng rvm bạn cần phải chạy lệnh: `source /usr/local/rvm/scripts/rvm`

Ngoài ra để các lần sau có thể tự động start mà ko cần gõ lệnh bạn chạy lệnh sau:
```
echo source /usr/local/rvm/scripts/rvm | tee -a ~/.bashrc
```
Tiếp theo để cài đặt các package cần thiết ta sẽ chạy lệnh sau . Sau đó tiền hành cài đặt ruby ở deploy_server mình sẽ cài phiên bản 2.3.3
```
root@1cb3a078d00b:~# rvm requirements
root@1cb3a078d00b:~# rvm install ruby-2.3.3
```
Cuối cùng ta sẽ cài đặt gem rails và bundle
```
root@1cb3a078d00b:~# gem install bundler
root@1cb3a078d00b:~# gem install rails
```
#### Install MySQL, NginX, Git, Node.JS and NPM
Trước tiên mình sẽ cài đặt `mysql - server `
```
apt-get install -y software-properties-common python-software-properties libmysqlclient-dev
add-apt-repository 'deb http://archive.ubuntu.com/ubuntu trusty universe'
apt-get install mysql-server
```
Sau khi cài đặt xong chạy lệnh `start service mysql` để start mysql. Sau đó bạn có thể kiểm tra lại service đã chạy chưa bằng lệnh sau:
```
mysql -uroot -p -e "show databases;"
```

Tiếp theo mình sẽ cài đặt `git`
```
apt-get install git
```

Để cài đặt `nodejs và npm` các bạn cần chạy lệnh sau:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install nodejs
apt-get install npm
ln -s `which nodejs` /usr/local/bin/node
```

Sau khi cài đặt xong bạn có thể kiểm tra lại xem đã thành công chưa: `node -v` hoặc `nodejs -v`

Cuối cùng là `NginX`:
```
apt-get install nginx
```
Nhớ start service `service nginx start` trước khi trước khi sử dụng nginx. Sau đó bạn có thể kiểm tra lại bằng cách gõ :
```
root@1cb3a078d00b:~# curl localhost
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
</html>
```

**Lưu ý các bạn phải khởi động lại service của 3 thằng ssh, mysql, nginx sau mỗi lần start lại docker container nhé**
```
service ssh start
service mysql start
service nginx start
```

### Setup gem capistrano
Như mình đã giải thích ở trên capistrano sẽ đóng vai trò cầu nối giữa server và local. Để có thêm thông in về capistrano bạn có thể xem tại [đây](https://github.com/capistrano/capistrano)

Sửa gem file trong project như sau:
```ruby
gem "unicorn"
group :development do
  gem "capistrano"
  gem "capistrano-rails"
  gem "capistrano3-unicorn"
  gem "capistrano-rvm"
end
```
Chạy `bundle install` để cài đặt các gem cần thiết. Sau đó gõ `bundle exec cap install` để init project

Trong file `Capfile` các bạn sửa như sau:
```ruby
# Uncomment các require sau
require "capistrano/rvm"
require "capistrano/bundler"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"
# Thêm require sau
require "capistrano3/unicorn"
```

Kiểm tra các xem unicorn đã chạy chưa  Tiếp theo ta sẽ sửa file `config/deploy.rb`
```ruby
lock "~> 3.11.0"

set :application, "prototype"
set :repo_url, "git@github.com:duongpham910/deploy_prototype.git"
set :bundle_binstubs, nil

# Default branch is :master
set :branch, "develop"

set :deploy_to, "/var/www/html/#{fetch(:application)}"

set :linked_files, fetch(:linked_files, [])
  .push("config/database.yml", "config/secrets.yml")
set :linked_dirs, fetch(:linked_dirs, [])
  .push("log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor/bundle")

set :keep_releases, 5

after "deploy:publishing", "deploy:restart"

# Khởi động lại unicorn sau khi deploy
namespace :deploy do
  task :restart do
    invoke "unicorn:restart"
  end
end
```
Ý nghĩa của các params:
* :application là tên ứng dụng sẽ deploy
* :repo_url là Github repository URL
* :deploy_to là thư mục sẽ chứa code deploy
* :linked_files là các file dùng chung cho các bản deploy như secrets.yml, .env, database.yml, ...
* :linked_dirs là các thư mục dùng chung cho các bản deploy
* :keep_releases là số lượng bản deploy sẽ giữ lại. Tương đương với số lần bạn có thể rollback lại

**Lưu ý**: một số user có public key chứa kí tự không hợp lệ khi đặt tên file, dẫn đến có trường hợp capistrano tạo file git-ssh bị lỗi thì các bạn có sửa bằng cách thêm params sau: `set :local_user, "duongph"`

Tiếp theo mình sẽ sửa file `conifg/deploy/staging` để thiết lập cho môi trường staging 
```ruby
set :user, "root"
set :deploy_via, :remote_cache
set :conditionally_migrate, true
set :rails_env, "staging"

# Phần IP thì bạn thay thế cho phù hợp với IP của Docker container nhé
server "172.17.0.2", user: fetch(:user), port: fetch(:port), roles: %w(web app db)
```
Ý nghĩa của các params:
* :user chính là user bạn sử dụng để ssh vào server
* :rails_env: môi trường rails sử dụng để chạy rake task
* :roles các các roles mà Capistrano sẽ sử dụng.

**Lưu ý**: nếu bạn có nhiều hơn một server, thì chỉ cần một server có chứa role db thôi (vì nhiều server cũng chỉ chung nhau một database và chỉ cần chạy migrate trên một server là đủ), ví dụ:
```ruby
server "172.17.0.2", user: fetch(:user), port: fetch(:port), roles: %w(web app db)
server "172.17.0.3", user: fetch(:user), port: fetch(:port), roles: %w(web app)
```

Sau khi thiết lập xong các bạn có thể gõ `bundle exec cap staging deploy:check` để kiểm tra xem capistrano đã thiết lập liên kết với server chưa:

Capistrano sẽ báo lỗi ở phần `deploy:check:linked_files` do không tồn tại file `database.yml` và `secrets.yml`. 
```
00:04 deploy:check:linked_files
      ERROR linked file /var/www/html/prototype/shared/config/database.yml does not exist on 172.17.0.2
```
Do vậy chúng ta file ssh vào server để tạo 2 file con thiếu đồng thời thêm setting cho cả 2 file luôn:
**Lưu ý**: file secret.yml chưa có key của môi trường staging thì bạn có thể chạy lệnh sau để thêm secret key: `RAILS_ENV=staging bundle exec rake secret` (còn phải đợi code đẩy lên mới chạy được)

### Setup gem unicorn
Unicron là một ruby application servers được sử dụng điển hình cùng với một web server nginx. Khi người dùng request một page từ ứng dụng rails của bạn, nginx ủy quyền request cho application server. Tương tự với app server khác như là: puma hay passenger tuy nhiên unicorn cho phép việc deploy code lên server mà ko gây hiện tượng downtime - server ko phải dừng lại khi code mới được đẩy lên. 

Đầu tiên ta sẽ tạo file `config/unicorn/staging.rb` và sửa nội dung như sau:
```ruby
app_path = "/var/www/html/prototype/current"
working_directory app_path

pid "#{app_path}/tmp/pids/unicorn.pid"

stderr_path "#{app_path}/log/unicorn.err.log"
stdout_path "#{app_path}/log/unicorn.out.log"

worker_processes 3
timeout 30
preload_app true

listen "#{app_path}/tmp/sockets/unicorn.sock", backlog: 64

before_exec do |_|
  ENV["BUNDLE_GEMFILE"] = File.join(app_path, "Gemfile")
end

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.connection.disconnect!

  old_pid = "#{app_path}/tmp/pids/unicorn.pid.oldbin"

  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end
```

Ở đây bản chỉ cần lưu ý duy nhất là `app_path = "/var/www/html/prototype/current"` phải đúng đường dẫn khai báo bên phía capistrano

Tiếp theo trên server, chúng ta sẽ tạo file `/etc/init.d/unicorn_deploy` để start/restart/reload/stop ứng dụng Rails từ terminal nhé:
```
root@1cb3a078d00b:/etc/init.d# touch unicorn_deploy
root@1cb3a078d00b:/etc/init.d# vi unicorn_deploy
```
Sửa file unicorn_deploy như sau:
```ruby
#!/bin/sh
set -u
set -e
# Example init script, this can be used with nginx, too,
# since nginx and unicorn accept the same signals
#[[ -s '/usr/local/rvm/scripts/rvm' ]] && source '/usr/local/rvm/scripts/rvm'

# Feel free to change any of the following variables for your app:
USER=root
GEM_HOME="/var/www/html/prototype/shared/bundle"
APP_ROOT="/var/www/html/prototype/current"
SET_PATH="export GEM_HOME=$GEM_HOME"

PID="$APP_ROOT/tmp/pids/unicorn.pid"
ENV="staging"
CMD="$SET_PATH; cd $APP_ROOT && bundle exec unicorn -D -E $ENV -c $APP_ROOT/config/unicorn/$ENV.rb"
old_pid="$PID.oldbin"

#cd $APP_ROOT || exit 1
$SET_PATH || exit 1

sig () {
  test -s "$PID" && kill -$1 `cat $PID`
}

oldsig () {
  test -s $old_pid && kill -$1 `cat $old_pid`
}

case $1 in
start)
  sig 0 && echo >&2 "Already running" && exit 0
  su - $USER -c "$CMD"
  ;;
stop)
  sig QUIT && exit 0
  echo >&2 "Not running"
  ;;
force-stop)
  sig TERM && exit 0
  echo >&2 "Not running"
  ;;
restart|reload)
  sig HUP && echo reloaded OK && exit 0
  echo >&2 "Couldn't reload, starting '$CMD' instead"
  su - $USER -c "$CMD"
  ;;
upgrade)
  sig USR2 && echo upgraded OK && exit 0
  echo >&2 "Couldn't upgrade, starting '$CMD' instead"
  su - $USER -c "$CMD"
  ;;
rotate)
  sig USR1 && echo rotated logs OK && exit 0
  echo >&2 "Couldn't rotate logs" && exit 1
  ;;
*)
  echo >&2 "Usage: $0 <start|stop|restart|upgrade|rotate|force-stop>"
  exit 1
  ;;
esac
```
Ở đoạn trên, bạn cần quan tâm các biến sau:
* USER là user sẽ sử dụng để chạy ứng dụng, giống với user trong config/deploy/<stage>.rb
* GEM_HOME là thư mục chứa Gem của ứng dụng, bạn sửa lại đường dẫn cho phù hợp
* APP_ROOT là thư mục chứ ứng dụng, bạn sửa lại cho phù hợp
* ENV là môi trường của ứng dụng, bạn sửa lại cho phù hợp

Sau khi lưu lại, bạn cần cấp quyền thực thi (executable) cho file đó với lệnh:
```
chmod +x /etc/init.d/unicorn_deploy
```

Cuối cùng ta sẽ sửa file config nginx `/etc/nginx/sites-available/` để unicorn có thể connect được với nginx như sau:
```
root@1cb3a078d00b:/etc/nginx/sites-available# vi default
```
Sau đó, sửa file default với nội dung sau:
```text
upstream prototype {
  server unix:/var/www/html/prototype/current/tmp/sockets/unicorn.sock fail_timeout=0;
}

server {
  listen 80 default deferred;
  # server_name example.com;
  root /var/www/html/prototype/current/public;

  location ^~ /assets/ {
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  location ~ ^/(robots.txt|sitemap.xml.gz)/ {
    root /var/www/html/prototype/current/public;
  }

  try_files $uri/index.html $uri @prototype;
  location @prototype {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://prototype;
  }

  error_page 500 502 503 504 /500.html;
  client_max_body_size 4G;
  keepalive_timeout 10;
}
```
Sửa lại đường dẫn cho phù hợp với project của bạn và sau đó khởi động lại nginx bằng câu lệnh
```
service nginx restart
```

Trước khi đến bước cuối cùng còn một số việc phải làm như sau
* Commit code và đồng bộ lên git đảm bảo nhánh deploy - cụ thể ở TH của mình là develop đã có code mới nhất.
* Tạo db cho môi trường staging nhé: `RAILS_ENV=staging bundle exec rake db:create`.
* Trên môi trường docker package tzdata không được cài đặt do đó gem tzinfo-data sẽ gây lỗi => giải pháp: `apt-get update && apt-get install tzdata -y`.

Cuối cùng là giây phút hồi hộp nhất là đẩy toàn bộ source code và config của bạn lên server :
```
bundle exec cap staging deploy
```

Quá trình deploy của bạn hoàn tất, còn một việc nhỏ mà bạn cần lưu ý mà mình đã nhắc ở trên là thêm secret key cho file secrets.yml. Sau đó khởi động lại unicorn để rails nhận setting nhé.
```
root@1cb3a078d00b:/var/www/html/prototype/shared/config# service unicorn_deploy stop   
root@1cb3a078d00b:/var/www/html/prototype/shared/config# service unicorn_deploy start
```
Kiểm tra lại thành quả của mình nào:
![](https://images.viblo.asia/baf32bca-a5bc-43c2-ad80-7593d6a95b7b.png)

### Tham Khảo
Bài viết của mình được tham khảo phần lớn từ anh leader của mình. Tuy nhiên mình đã cố gắng để bổ sung thêm những chi tiết cần lưu ý là những khó khăn mà mình gặp phải. Hy vọng bài viết này sẽ nâng cao kiến thức về mảng server của bạn:

Bài viết được tham khảo từ:
* https://viblo.asia/p/zero-downtime-deployment-for-rails-with-capistrano-and-unicorn-Az45bA6QlxY
* https://viblo.asia/p/deploy-rails-app-with-unicorn-and-nginx-with-capistrano-PwRkgxVBvEd

Link github project:
* https://github.com/duongpham910/deploy_prototype