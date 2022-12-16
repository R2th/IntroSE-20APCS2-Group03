# 1. Disable SE Linux
```
sudo vi /etc/sysconfig/selinux
```
Then change the directive SELinux=enforcing to SELinux=disabled Reboot server.

# 2. Create deploy user
```
sudo adduser deploy
sudo passwd deploy
```

Run sudo visudo then add this to the end of file
```
## Allow deploy to run any commands anywhere
deploy    ALL=(ALL)       ALL
```

Switch to deploy user
```
su - deploy
```

# 3. Install essential packages
```
sudo yum update
sudo yum groupinstall -y "development tools"

sudo yum install -y epel-release
sudo yum install -y wget nodejs nginx redis
```

# 4. Install MySQL 5.7
```
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo rpm -ivh mysql57-community-release-el7-11.noarch.rpm
sudo yum install mysql-server
sudo yum install mysql-devel
```

Get temporary password
```
sudo grep 'temporary password' /var/log/mysqld.log
```

Using this command to setup security and password
```
sudo mysql_secure_installation
```

# 5. Install Ruby
```
cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

sudo yum install -y git-core zlib zlib-devel gcc-c++ patch readline readline-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison curl

rbenv install 2.4.1
rbenv global 2.4.1

echo "gem: --no-document" > ~/.gemrc

gem install bundler
gem install rails
rbenv rehash
```

# 6. Generate server’s public ssh key
```
ssh-keygen
cat ~/.ssh/id_rsa.pub
```
Then add this to Deploy keys on Git repo

# 7. Add your local public ssh key to server
```
mkdir ~/.ssh
touch ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

# 8. Create database
```
sudo service mysqld start
mysql -u root -p -e "create database project_name_production"
```

# 9. Init deploy folder
```
sudo mkdir /usr/local/project_name
sudo mkdir -p /usr/local/project_name/shared/config
```

Create /usr/local/project_name/shared/config/database.yml file with content :
```
production:
  adapter: mysql2
  encoding: utf8
  username: root
  password:
  database: project_name_production
  host: localhost
```

Create /usr/local/project_name/shared/config/application.yml file with content : ( You can using rake secret to generate new key. )
```
SECRET_KEY_BASE: "79f0a62c733e00ab309b5bc58dbbf4768539fe1495bdd9a521f49cec3af1b4d935f7e46adb07eef72ed2a4aa8c5d228553a9388bb29359eec27c767029caaf21"
```

# 10. Change user ownership
```
sudo chown -R deploy:root /usr/local/project_name
```

# 11. Config nginx
Open /etc/nginx/nginx.conf and remove server {...} Your nginx.conf will look like that
```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;
}
```

Create new file /etc/nginx/conf.d/project_name.conf
```
upstream app {
  # Path to Puma SOCK file, as defined previously
  server unix:/usr/local/project_name/shared/tmp/sockets/puma.sock fail_timeout=0;
}

server {
  listen 80;
  server_name localhost;

  root /usr/local/project_name/current/public;

  try_files $uri/index.html $uri @app;

  location / {
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_redirect off;
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

Restart nginx :
```
sudo service nginx restart
```

# 12. Generate deploy files
Add to Gemfile :
```
gem "capistrano"
gem "capistrano3-puma"
gem "capistrano-rails", require: false
gem "capistrano-bundler", require: false
gem "capistrano-rbenv"
```

```
bundle install
bundle exec cap install
```

Edit your Capfile to :
```
require "capistrano/setup"

require "capistrano/deploy"

require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require "capistrano/rbenv"
require "capistrano/bundler"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"

require "capistrano/puma"
install_plugin Capistrano::Puma

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
```

Edit your config/deploy/production.rb to :
```
set :stage, :production
set :rails_env, :production
set :deploy_to, "/usr/local/project_name"
set :repo_url, "REPO_URL"
set :branch, ENV["PRODUCTION_BRANCH"]
server ENV["PRODUCTION_SERVER_IP"], user: ENV["PRODUCTION_DEPLOY_USER"], roles: %w{web app db}
```

Edit your config/deploy.rb to :
```
set :application, "project_name"
set :branch, :master
set :pty, true
set :linked_files, %w{config/database.yml config/application.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
set :keep_releases, 5
set :bundle_binstubs, nil
set :rbenv_type, :user

set :puma_rackup, -> { File.join(current_path, "config.ru") }
set :puma_state, -> { "#{shared_path}/tmp/pids/puma.state" }
set :puma_pid, -> { "#{shared_path}/tmp/pids/puma.pid" }
set :puma_bind, -> { "unix://#{shared_path}/tmp/sockets/puma.sock" }
set :puma_conf, -> { "#{shared_path}/puma.rb" }
set :puma_access_log, -> { "#{shared_path}/log/puma_access.log" }
set :puma_error_log, -> { "#{shared_path}/log/puma_error.log" }
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, "production"))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
```

# 13. Deploying
```
bundle exec cap production deploy PRODUCTION_BRANCH='your_branch' PRODUCTION_SERVER_IP='your_server_ip' PRODUCTION_DEPLOY_USER='deploy'
```