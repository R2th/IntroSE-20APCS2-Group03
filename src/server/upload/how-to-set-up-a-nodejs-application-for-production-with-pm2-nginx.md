## Mở đầu
Bài này mình viết với mục đích để tổng hợp lại kiến thức và bổ sung kĩ thuật liên quan đến server cho bản thân. Thực tế thì có rất nhiều cách để deploy ứng dụng nodejs (express framework), nhưng trong bài này mình sẽ lựa chọn stack capistrano + pm2 + nginx

### Init project
 Để cho nhanh mình sử dụng express-generator để init project như sau:
 
```
npx express-generator --view=ejs --git
```
Tham khảo: https://expressjs.com/en/starter/generator.html .

Sau khi đã init và start ứng dụng thành công , bước tiếp theo là cài đặt capistrano cho việc tự động depoly code lên server

## Capistrano (local side)

### Prerequisite
Trước tiên các bạn cần phải cài đặt ruby (rbenv or rvm). Sau đó bạn có thể init Gemfile bằng câu lệnh `bundle init`

Edit Gemfile như dưới đây, sau đó chạy `bundle install` để cài đặt gem.

```
source 'https://rubygems.org'

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

group :development do
  gem 'capistrano', require: false
  gem 'capistrano-npm', require: false
end
```

Generate file config với câu lệnh `$ cap install`. Trong  `Capfile`  bỏ comment dòng dưới đây

```
# Load DSL and set up stages
require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git
require 'capistrano/npm'

Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
```

 Việc tiếp theo là sửa file `config/deploy.rb`

```
# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, 'nodejs_skeleton'
set :repo_url, 'git@github.com:duongpham910/nodejs_skeleton.git'
set :keep_releases, 5
set :deploy_to, '/var/www/nodejs_skeleton'

namespace :deploy do
  desc 'Restart pm2'
  task :restart_app do
    on roles(:app) do
      execute 'sudo /etc/init.d/nodejs_skeleton restart'
    end
  end

  before :finished, :restart_app
end
```

Tuỳ thuộc vào môi trường ( trong trường hợp này là production). Mở file config/deploy/production.rb

```
set :user, 'ec2-user'
set :stage, :production
set :ssh_options, {
  keys: %w(~/key.pem),
  forward_agent: false,
  auth_methods: %w(publickey)
}

# Pass varibale to deploy from different git branches
set :deploy_ref, ENV['DEPLOY_REF']
if fetch(:deploy_ref)
 set :branch, fetch(:deploy_ref)
else
 set :branch, 'master'
end

# Setup IP with ec2 server
server '', user: fetch(:user), roles: %w[app web]
```

## EC2 (server side)

### Prerequisite
Cần cài đặt các package sau
- Nginx
```
sudo yum install nginx
```
- Node (& yarn or npm)

Cài đặt nvm 
```
> git clone https://github.com/creationix/nvm.git ~/.nvm  
source ~/.nvm/nvm.sh
```

Sửa file .bashrc như dưới, sau đó chạy lệnh `source .bashrc`
```
if [[ -s ~/.nvm/nvm.sh ]] ; then
  source ~/.nvm/nvm.sh ;
fi
```

Cuối cùng
```
nvm install 12.16.1
nvm use 12.16.1
node -v
ln -s `which node` /usr/local/bin/node //create symlink
```
- PM2
```
npm install -g pm2
ln -s `which pm2` /usr/local/bin/pm2 //create symlink
```

### App preparation
 Các bạn cần tạo thư mục có đường dẫn như sau `/var/www/nodejs_skeleton`. Cấp quyền cho thư mục:
```
sudo chmod -R 777 /www
```

Trong nodejs_skeleton directory tạo thư mục sau để chuẩn bị cho việc deploy bằng capistrano
```
repo
releases
shared
```

### Configuration

#### Nginx

Tạo file config như sau `sudo vi /etc/nginx/conf.d/nodejs_skeleton.conf `

```conf
server {
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Tiếp theo các bạn cần sửa file nginx.config `sudo vi /etc/nginx/nginx.conf`
```
       #  listen       80 default_server;
       #  listen       [::]:80 default_server;
       #  server_name  _;
       #  root         /usr/share/nginx/html;
```

Kiểm tra file nginx đã hoạt động chính xác chưa
```
sudo nginx -t
Still error: nginx: [warn] conflicting server name "" on 0.0.0.0:80, ignored
```

Lệnh start/stop/restart service của nginx như sau
```
sudo chkconfig nginx on
sudo service nginx start/stop/restart
```

#### PM2
Tạo thư mục client_deploy rồi tạo file config cho PM2 như dưới (hoặc đặt trong thư mục shared) với cluster 2 instance
```js
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
   apps : [{
     name: 'nodejs_skeleton',
     cwd: '/var/www/nodejs_skeleton/current',
     script: '/var/www/nodejs_skeleton/current/bin/www',
     exec_mode: 'cluster_mode',
     instances: 2,
     max_memory_restart: '300M',
     env: {
        NODE_ENV: 'production'
      }
    }],
};
```

#### Init.d Script

- Tạo 1 Script tên `nodejs_skeleton` như dưới trong `/etc/init.d/nodejs_skeleton`
- Cấp quyền: `sudo chmod 755 /etc/init.d/nodejs_skeleton`

```bash
#!/bin/bash
# chkconfig: 2345 98 02
#
# description: PM2 next gen process manager for Node.js

NAME=nodejs_skeleton
PM2=/usr/local/bin/pm2
NODE=/usr/local/bin/node
USER=ec2-user
CONFIG_FILE_PATH=/home/ec2-user/client_deploy/ecosystem.config.js

export PATH=/usr/local/bin:$PATH
export PM2_HOME="/home/ec2-user/.pm2"

get_user_shell() {
    local shell
    shell=$(getent passwd "${1:-$(whoami)}" | cut -d: -f7 | sed -e 's/[[:space:]]*$//')

    if [[ $shell == *"/sbin/nologin" ]] || [[ $shell == "/bin/false" ]] || [[ -z "$shell" ]];
    then
      shell="/bin/bash"
    fi

    echo "$shell"
}

super() {
    local shell
    shell=$(get_user_shell $USER)
    su - "$USER" -s "$shell" -c "PATH=$PATH; PM2_HOME=$PM2_HOME $*"
}

start() {
    echo "Starting $NAME"
    super $PM2 start $CONFIG_FILE_PATH --update-env
}

stop() {
    super $NODE $PM2 kill
}

restart() {
    echo "Restarting $NAME"
    stop
    start
}

reload() {
    echo "Reloading $NAME"
    super $PM2 reload all
}

status() {
    echo "Status for $NAME:"
    super $NODE $PM2 list
    RETVAL=$?
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage: {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL
```

#### Commands
Cũng giống như các câu lệnh của webserver như nginx. Khi bị lỗi cũng có thể stop/start hoặc restart.

- Start PM2
```
sudo /etc/init.d/nodejs_skeleton start
```

- Stop PM2
```
sudo /etc/init.d/nodejs_skeleton stop
```

- Restart PM2
```
sudo /etc/init.d/nodejs_skeleton restart
```

- Check Status
```
sudo /etc/init.d/nodejs_skeleton status
```

### Deploy

```
cap staging deploy // Deploy code base from master branch
cap staging deploy DEPLOY_REF=A // Deploy code from branch A
```