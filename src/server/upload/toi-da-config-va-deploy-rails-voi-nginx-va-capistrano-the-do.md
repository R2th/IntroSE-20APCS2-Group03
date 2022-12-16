## 1: Tạo user deploy
Giả sử bạn được khách hàng add vào 1 server. Bước đầu tiên bạn sẽ phải 1 user chuyên làm nhiệm vụ deploy.
- Tạo 1 file create_user.sh
```
#!/bin/bash
useradd -d /home/deploy -s /bin/bash -m deploy -G admin
mkdir /home/deploy/.ssh
echo '' > /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 -R /home/deploy/.ssh
chmod 600 -R /home/deploy/.ssh/*
sed -i '/^deploy:.*$/d' /etc/shadow
echo 'deploy:$6$OPvierkr$8UjzyjKbwHALdZe8c.R7dsbP3eoQMtYbW.9gPhwHc2aJIiu3tyx2JlKHFDkL9sM4p6EGH./U2QBABtnxYOttK0:18158:0:99999:7:::' >> /etc/shadow
```
Sau khi tạo xong phân quyền cho file `.sh`
```
chmod +x deploy.sh
```
- Phân quyền xong chúng ta sẽ run file `.sh`
```
source ./deploy.sh
```
Ok vậy là user deploy đã được tạo với user name là `deploy` password là `12345678` (bạn có thể đổi password lại)
tiếp theo chạy lênh:
```
su - deploy
nhập mật khâu: 12345678
```
## 2 Config server remote
### 2.1 Cài các dependencies cho ruby và rails
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn
```
### 2.2 Cài ruby sử dụng rvm (ruby 2.5.3)
```
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm install 2.5.3
rvm use 2.5.3 --default
ruby -v
gem install bundler
```
### 2.3 Cài rails và NodeJs  (rails 5.2.3)
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

gem install rails -v 5.2.3
rails -v
# Rails 5.2.3
```
### 2.4 Cài Mysql
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
Bạn có thể chỉ định version của mysql 5.7 như bên dưới và tương tự với các version khác.
```
apt-get install mysql-server-5.7 mysql-clients-5.7 mysql-server-cores-5.7
```
### 2.5 Config nginx
```
sudo apt-get install nginx
```
Vì mình sử dụng unicorn nên chúng ta cần 1 file config nginx để trỏ tới unicorn

Các bạn tạo file `nginx_app_rails` như sau
```
vi /etc/nginx/site-available/nginx_app_rails
```
Và sửa file đó như sau:
```
upstream backend-unicorn {
  server unix:/usr/local/rails_apps/<PROJECT_NAME>/current/tmp/sockets/unicorn.sock fail_timeout=0;
}
server {
  listen 80;
  #server_name <'domain'>;
  server_name 192.168.xxx.xx;
  client_max_body_size 10M;
  root /usr/local/rails_apps/<PROJECT_NAME>/current/public;
  location ~ ^/.*\.(gif|ico|css|js)$ {
    expires 3d;
    break;
   }
   location / {
     try_files $uri @webapp;
   }
   location @webapp {
     proxy_redirect     off;
     proxy_set_header   Host             $host;
     proxy_set_header   X-Real-IP        $remote_addr;
     proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
     proxy_read_timeout 3000;
     proxy_pass http://backend-unicorn;
   }
}
```
Trong file trên các bạn chú ý tới 3 điều sau:
```
upstream backend-unicorn {
  server unix:/usr/local/rails_apps/<PROJECT_NAME>/current/tmp/sockets/unicorn.sock fail_timeout=0;
}
```
Dòng `server unix` phải trỏ tới tới file unicorn.sock của thử code deploy (thư mục current)
```
server_name 192.168.xxx.xx;
#server_name <'domain'>;
```
chỗ này sẽ config tới domain và địa chỉ ip của server remote
```
root /usr/local/rails_apps/<PROJECT_NAME>/current/public;
```
Nơi đây sẽ trỏ tới code deploy được sinh ra khi chúng ta chạy lệnh
```
cap staging deploy
```
Sau tất cả chúng ra sẽ enable nó lên:
```
sudo ln -s /etc/nginx/sites-available/nginx_app_rails /etc/nginx/sites-enabled/nginx_app_rails
```
## 3 Config server local và add gem để config
### 3.1 Config unicorn
Thêm các gem sau vào gem file
```
group :staging, :production do
  gem "unicorn"
end
```
Tạo thư mục `config/unicorn.rb` và edit nó như sau:
```
# set path to the application
app_dir git File.expand_path("../..", __FILE__)
shared_dir = "#{app_dir}/shared"
working_directory app_dir

# Set unicorn options
worker_processes 2
preload_app true
timeout 30

# Path for the Unicorn socket
listen "#{shared_dir}/sockets/unicorn.sock", backlog: 128

# Set path for logging
stderr_path "#{shared_dir}/log/unicorn.stderr.log"
stdout_path "#{shared_dir}/log/unicorn.stdout.log"

# Set proccess id path
pid "#{shared_dir}/pids/unicorn.pid"
```
Tiếp theo chúng ta sẽ tạo cấu hình cho staging và production

1. Tạo thư mục có dang như sau:
```
project_name
 - config
   - unicorn
     - staging.rb
     - production.rb
```
Và lân lượt sửa như sau:
```
#config/unicorn/staging.rb
worker_processes 2
app_directory = "/usr/local/rails_apps/<PROJECT_NAME>/current"
working_directory app_directory

listen "#{app_directory}/tmp/sockets/unicorn.sock", backlog: 128

timeout 3000
pid "#{app_directory}/tmp/pids/unicorn.pid"

stderr_path "#{app_directory}/log/unicorn_staging.log"
stdout_path "#{app_directory}/log/unicorn_staging.log"

preload_app true

before_exec do |server|
  ENV["BUNDLE_GEMFILE"] = "#{app_directory}/Gemfile"
end

before_fork do |server,  worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end
  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server,  worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end
end
```
Như file trên chúng ta cần hiểu 1 số dòng như sau:

*  worker_processes: 2  # như này unicorn sẽ chạy với 2 process
*  app_directory = "....." thư mục current chưa code hiện đang deploy trên hệ thống sinh ra khi chúng ta chạy lên `cap staging deploy`
*  listen "#{app_directory}/tmp/sockets/unicorn.sock", backlog: 128 # Lắng nghe unicorn.sock cái này mình cũng không hiểu lắm :D
*  pid "..." trỏ tới pid của unicorn khi mà project chạy unicorn sẽ có 1 pid của unicord dc sinh ra
*  stderr_path và stdout_path nơi lưu trữ log unicorn
*  preload_app true # mình không biết cái này là gi đâu đại loại load lại app để nhận các config trên mình đoán thế  =))
*  Còn đoạn code dưới thì mục đọc check khi mình fork code github về thì check xem activerecord được định nghia chưa xóa pid của app nếu tồn tại. và cuối cùng là check có connect thành công tới DB không (`ActiveRecord::Base.establish_connection`)
### 3.2 Config capistrino
Ok Trên chúng ra đã config xong unicorn giờ chúng ta sẽ dùng `Capistrano` để nhằm mục đích auto load các dependencies của rails app

Chúng ta sử dụng 1 số gem sau:
```
# deployment
gem "capistrano", "~> 3.4.1"
gem "capistrano3-unicorn"
gem "rvm1-capistrano3", require: false
gem "capistrano-rails"
gem "capistrano-sidekiq"
gem "capistrano-bundler"
```
và comment `gem 'puma'` lại.
và sau đó là bundle
```
bundle install
```
Sau khi bundle chúng ta chạy lênh sau để tạo các file. `bundle exec cap install`  Sẽ sinh ra các file sau:
```
mkdir -p config/deploy
create config/deploy.rb
create config/deploy/staging.rb
create config/deploy/production.rb
mkdir -p lib/capistrano/tasks
create Capfile
Capified
```
Ok sau đó chúng sẽ đi config:
1: config `Capfile`
```
#Capfile
require "capistrano/setup"

require "capistrano/deploy"
require "capistrano3/unicorn"
require "rvm1/capistrano3"
require "capistrano/bundler"
require "capistrano/rails"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
```
Xong đó config file `config/deploy`
```
lock "3.4.1"

set :application, "<PROJECT_NAME>"
set :repo_url, "git@github.com:thang/PROJECT_NAME.git"
set :deploy_to, "/usr/local/rails_apps/PROJECT_NAME"
set :default_stage, "development"
ask :branch, proc {`git rev-parse --abbrev-ref HEAD`.chomp}.call
set :deploy_via, :remote_cache
set :format, :pretty
set :log_level, :debug
set :keep_releases, 5
set :rvm_type, :system
set :rvm1_ruby_version, "2.5.3"
set :linked_files, %w{config/database.yml config/master_database.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle}
set :scm, :git
set :pid_file, "#{shared_path}/tmp/pids/unicorn.pid"

namespace :deploy do
  desc "Restart application"
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke "unicorn:restart"
    end
  end

  after :publishing, :restart

  desc "Upload database.yml"
  task :upload do
    on roles(:app) do |host|
      if test "[ ! -d #{shared_path}/config ]"
        execute "mkdir -p #{shared_path}/config"
      end
      upload!("config/database.yml", "#{shared_path}/config/database.yml")
      upload!("config/enfit_master_database.yml", "#{shared_path}/config/master_database.yml")
    end
  end
  before :starting, "deploy:upload"
end
```
config tiếp cho production và staging tron `config/deploy`
```
#config/deploy/staging.rb
set :stage, :production
set :rails_env, :production

server ENV["API_APP_SERVER"], user: "deploy", roles: %w{app}

set :ssh_options, {
  keys: %w(/home/deploy/.ssh/id_rsa),
  forward_agent: true,
}

```

```
#config/deploy/production.rb
set :stage, :staging
set :rails_env, :staging

server ENV["API_APP_SERVER"], user: "deploy", roles: %w{app}

set :ssh_options, {
  keys: %w(/home/deploy/.ssh/id_rsa),
  forward_agent: true,
}
```
Nhưng điều cân chú ý ở file trên là:
```
ENV["API_APP_SERVER"]: là địa chỉ của server remote
```
Ok như vậy là cơ bản về việc config tiếp theo là nhưng phần le ve trong quá trình sử lý.
### 4 Một số điều khác
#### 1: Tạo ssh key cho user deploy
```
ssh-keygen -t rsa -b 4096
# Add key to the ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
Xong khi có ssh key ta add ssh vào tài khoản github
##### 2 Tạo file `.env`
```
cd home/deploy
vi .env
Và sửa file như sau:
export API_APP_SERVER="xxxxxx"
export SECRET_KEY_BASE="xxxxxxxx"
```
NOTE:
Phải edit lại file `~/.bashrc` để nhận file `.env`
```
if [ -f ~/.env ]; then
    . ~/.env
fi
```
Cuối cùng:  `source .env` và `source .bashrc` để nhận biến môi trường
#### 3 clone code từ github về
```
cd home/deploy
git clone xxxx
```
### 4 Chạy các lệnh của rails khi clone project về
```
bundle install
rake db:create
rake db:migrate
```
### 5 Deploy
```
cap staging deploy
```
Khi chạy lệnh này chúng ta sẽ bị một số lôi như sau:
1. chưa phân quyền cho thư mục rails_app
```
chmod 757 rails_app
Trong đó
  7: user sở hữu thư mục rails_app (user deploy) full quyen (read write execute)
  5: Nhưng thằng user thuộc group của user deploy có quyền 5 (quyền read and execute)
  7: Nhưng thằng user không có thuộc group của user deploy sẽ có full quyênd
```
2. Chưa tạo file database.yml
```
cd home/deloy/project_name
vi project_name/config/database.yml
và edit nó
```
3. Chưa tạo file `config\screts.yml` File này có cproduction:
Cách tạo screts key
```
bundle exec rake secret
hoặc
bundle exec rake -T 
```
```
staging:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>ó nội dung như sau:
```
Đó là một số lỗi mình gặp phải còn thực tế các bạn khi chạy uncort có lỗi thi vào thư mục sau để tìm lỗi
```
cd /usr/local/rails_apps/enFIT_API_APP/current
tail -100f log/unicorn/unicorn.log
```
4. Tao file credentials
Khi có lỗi là :
```
bundler: failed to load command: unicorn (/usr/local/rails_apps/THANG_APP/shared/bundle/ruby/2.5.0/bin/unicorn)
ArgumentError: Missing `secret_key_base` for 'production' environment, set this string with `rails credentials:edit`
```
Thì chúng ta cần:
```
 EDITOR="vim" bin/rails credentials:edit
```
NOTE:
> Nhớ remove file master.key và credentials trước khi chạy lênh