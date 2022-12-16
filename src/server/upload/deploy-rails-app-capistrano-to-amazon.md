Ở bài viết này mình sẽ hướng dẫn các bạn deploy rails App bằng capistrano lên Ec2 của amazon

## 1. Tạo instance Ec2 trên AWS
Vào Ec2 Dashboard trên amazon, chọn launch instance 

- Tiếp theo chọn Ubuntu Server 16.04 LTS (HVM), SSD Volume Type

![](https://images.viblo.asia/d626a01d-1230-4927-9b6f-19c647a8f8bb.png)

- Ở phần config Security group ta add thêm HTTP và HTTPS 

![](https://images.viblo.asia/c9481bb4-87cd-439a-a621-840256d5c313.png)

- Sau khi config xong thì ta chọn launch, sẽ xuất hiện popup select key-pair, ta chọn create new key-pair, sau đó download về máy đê có thể sử dụng để SSH vào server
![](https://images.viblo.asia/bce1e7ac-3af9-46f9-9762-a7ff9abed681.png)

Sau khi launch xong instance EC2, chúng ta sẽ có 1 ec2 server ubuntu

## 2. Setup Server Ec2
Ở bài viết này mình sẽ sử dụng Ec2 ubuntu 16.04 instance. Về server mình sẽ bỏ qua phần tạo instance trên Ec2, mặc định các bạn đã có 1 instance với Public IP: x.x.x.x và key.pem
- SSH vào server 
```
sudo ssh -i key.pem ubuntu@x.x.x.x
```
- Tạo user ec2-user và gán quyền sudo để dùng cho việc deploy
```
adduser ec2-user
passwd ec2-user
usermod -aG sudo ec2-user
```
Login user ec2-user: 
```
sudo su - ec2-user
```
- Update 
```
sudo apt-get update && sudo apt-get -y upgrade
```
- Cài đặt ruby, ở đây mình dùng rvm để quản lý các phiên bản, các bạn có thể chạy cài đặt theo trên trang chủ http://rvm.io/
```
sudo apt-get install gnupg2
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
rvm install 2.4.1
gem install rails
```
- Cài đặt mysql, 
```
sudo apt install mysql-server
sudo apt install mysql-client libmysqlclient-dev
```

- Cài đặt nodejs
```
sudo apt install nodejs
```


- Thư mục mình sẽ deploy là **/home/ec2-user/rails_app/** . Các bạn để ý mình có dòng 
```
set :deploy_to, "/home/ec2-user/rails_app/#{fetch :application}"
```
trên deploy.rb, đây sẽ là thư mục mình deploy, VD: /home/ec2-user/rails_app/demo-deploy

Chạy lệnh sau
```
mkdir -p /home/ec2-user/rails_app/shared/config/
```
Sau đó copy tất cả các file application.yml, database, credentials.yml.enc, master.key vào đó
## 3. Config rails app
- Thêm routes cho app của chúng ta 
```
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "home#index"
end

class HomeController < ActionController::Base
  def index
  end
end

```
Thêm các gem sau vào, do mình deploy cap production nên để group production, các bạn có thể tùy chọn
```
gem "mysql2"
gem 'figaro'

group :development, :production do
  gem 'capistrano'
  gem 'capistrano3-puma'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rvm'
end

```
Sau đó chạy bundle install rồi chạy lệnh sau để generate ra các file config Capistrano
```
cap production deploy
```
Sửa file Capfile của Capistrano tạo ra như sau
```
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
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
```
Tiếp đó sửa deploy.rb như sau

```
lock "~> 3.11.0"

# Tên application của mình
set :application, 'demo-deploy' 
# Repository github của bạn. Tạo 1 repo mới trên github
set :repo_url, 'git@github.com:thonglh-1035/demo-deploy.git' 
set :branch, :master
set :deploy_to, "/home/ec2-user/rails_app/#{fetch :application}"
set :pty, true
set :linked_files, %w{config/database.yml config/application.yml config/master.key config/credentials.yml.enc}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
set :keep_releases, 5
set :rvm_type, :user
set :rvm_ruby_version, 'ruby-2.4.1' 

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
set :puma_workers, 1
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false

namespace :deploy do
  before :migrate, :create_database

  desc "create database"
  task :create_database do
    on roles(:db) do |host|
      within "#{release_path}" do
        with rails_env: ENV["RAILS_ENV"] do
          execute :rake, "db:create"
        end
      end
    end
  end

  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        execute "/bin/bash #{ENV["APP_ROOT"]}/config/deploy/common/puma.sh"
      end
    end
  end
end

```
database.yml của mình
```
default: &default
  adapter: mysql2
  encoding: utf8mb4
  collation: utf8mb4_bin
  pool: 5
  username: <%= ENV["DB_USERNAME"] %>
  password: <%= ENV["DB_PASSWORD"] %>
  socket:   <%= ENV["DB_SOCKET"] %>
  host:     <%= ENV["DB_HOST"] %>
  database: <%= ENV["DB_NAME"] %>

development:
  <<: *default

test:
  <<: *default

staging:
  <<: *default

production:
  <<: *default

```

production.rb
```
server "x.x.x.x", user: "ec2-user", roles: %w{web app db}
```
## 4. Setup ssh-key để có thế ssh được vào server qua Capistrano

Thực hiện lệnh sau trên máy local (Tham khảo tại https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

Sau đó copy id_rsa vào file ~/.ssh/authorized_keys trên server

## 5. Deploy
Sau khi đã thực hiện các bước trên ta chạy 
```
bundle exec cap production deploy 
```
Kết quả 
![](https://images.viblo.asia/9257c642-ed14-4216-974b-95d0057d0e29.png)
![](https://images.viblo.asia/22bfff39-1a1a-4da4-9e47-26d32153eeef.png)

Source code: https://github.com/thonglh-1035/demo-deploy