Xin chào tất cả các bạn, chắc hẳn các bạn khi sử dụng ngôn ngữ Ruby ob Rails(RoR) đều có ít nhất một lần thắc mắc làm như nào để có thể triển khai(deploy) code của mình lên production như thế nào.

Hiện cũng có một trang rất hữu ích và ai cũng có thể sử dụng đó là trang web `heroku` hỗ trợ deploy tận răng cho các bạn, chỉ cần chạy lệnh trên command của các bạn là đã có thể deploy lên production mà không cần config hay gì cả.

Vậy hôm nay mình sẽ hướng dẫn các bạn cách để deploy lên server Sử dụng Linux và ngôn ngữ RoR.
## 1: Cấu hình server remote:
**1: Bước đầu tiên là cài đặt một số phụ thuộc cho Ruby và Rails.**
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn
```
**Tiếp theo mình sử dụng rvm để cài ruby(mình cài gói ruby 2.4.3)**
```
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm install 2.4.3
rvm use 2.4.3 --default
ruby -v
gem install bundler
```
**Tiếp đến là cài đặt Rails**

Vì các phiên bản Rails có rất nhiều phụ thuộc vào những ngày này, chúng ta sẽ cần phải cài đặt một thời gian chạy Javascript như NodeJS. Điều này cho phép bạn sử dụng Coffeescript và Asset Pipeline trong Rails kết hợp và minifies javascript của bạn để cung cấp một môi trường production nhanh hơn.

Để cài đặt NodeJS, chúng ta sẽ thêm nó bằng cách:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

gem install rails -v 5.1.2
rails -v
# Rails 5.1.2
```
Nếu bạn có kết quả khác vì lý do nào đó, điều đó có nghĩa là môi trường của bạn có thể không được thiết lập đúng.

**Sau đó chúng ta cài MySQL**
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
tại đây, khi cài đặt máy sẽ hỏi bạn điền password MySQL, bạn điền thế nào thì nhớ hoặc ghi lại đâu đó để không quên =))
- Khởi tạo 1 rails app “hello_app” mới sử dụng mysql:

    `$  rails new hello_app –d mysql`
- Tạo db cho rail: Ở đây mình cho hết code của rails vào folder `current`(để phân biệt với những app khác):

    `$ cd hello_app`

    `$ mkdir –p current`

    `$ mv * current`

    `$ cd current`
- Chỉnh sửa file `config/development.yml` như sau:
```
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: ****** #pass bạn xài lúc cài đặt MySQL
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: hello_app_development
```
**Tiếp theo, chúng ta cài unicorn và capistrano**

Chỉnh sửa `Gemfile`, thêm 2 gem vào:
```
gem 'unicorn'
group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rbenv'
  gem 'capistrano', '~> 3.4.0'
end
```
Lưu ý do cài rails 5.1.2 nên khi tạo app sẽ tự sinh ra gem puma, bạn cần comment dòng gem đó lại

`# gem 'puma', '~> 3.7'`

Và chạy command: 

`$ bundle install`

Sau khi cài xong unicorn, ta cấu hình file `config/unicorn.rb`:
```
#your root app
root = "/home/tuan/test/hello_app"
working_directory root
#pid của unicorn khi chạy
pid "#{root}/tmp/pids/unicorn.pid"
#log
stderr_path "#{root}/log/unicorn.error.log"
stdout_path "#{root}/log/unicorn.access.log"

#chạy với sock
listen "#{root}/shared/sockets/unicorn.sock"
worker_processes 2
timeout 30
```
và tạo script `start/stop` unicorn `$ sudo subl /etc/init.d/unicorn` (mình dùng sublime text)
```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          unicorn
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Manage unicorn server
# Description:       Start, stop, restart unicorn server for a specific application.
### END INIT INFO
set -e

TIMEOUT=${TIMEOUT-60}
APP_ROOT=/home/tuan/hello_app/current
PID=$APP_ROOT/tmp/pids/unicorn.pid
CMD="cd $APP_ROOT; ~/.rvm/bin/rvm exec bundle exec unicorn -D -c $APP_ROOT/config/unicorn.rb -E development"
AS_USER=tuan
set -u

OLD_PIN="$PID.oldbin"

sig () {
  test -s "$PID" && kill -$1 `cat $PID`
}

oldsig () {
  test -s $OLD_PIN && kill -$1 `cat $OLD_PIN`
}

run () {
  if [ "$(id -un)" = "$AS_USER" ]; then
    eval $1
  else
    su -c "$1" - $AS_USER
  fi
}

case "$1" in
start)
  sig 0 && echo >&2 "Already running" && exit 0
  run "$CMD"
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
  run "$CMD"
  ;;
upgrade)
  if sig USR2 && sleep 2 && sig 0 && oldsig QUIT
  then
    n=$TIMEOUT
    while test -s $OLD_PIN && test $n -ge 0
    do
      printf '.' && sleep 1 && n=$(( $n - 1 ))
    done
    echo

    if test $n -lt 0 && test -s $OLD_PIN
    then
      echo >&2 "$OLD_PIN still exists after $TIMEOUT seconds"
      exit 1
    fi
    exit 0
  fi
  echo >&2 "Couldn't upgrade, starting '$CMD' instead"
  run "$CMD"
  ;;
reopen-logs)
  sig USR1
  ;;
*)
  echo >&2 "Usage: $0 <start |stop|restart|upgrade|force-stop|reopen-logs>"
  exit 1
  ;;
esac
```
Các bạn chỉ cần quan tâm tới các thông tin:
```
#folder root của app
APP_ROOT=/home/tuan/hello_app/current

#pid unicorn (như  trong file unicorn.rb vừa thiết lập)
PID=$APP_ROOT/tmp/pids/unicorn.pid

#lệnh chạy unicorn với môi trường development
CMD="cd $APP_ROOT; ~/.rvm/bin/rvm exec bundle exec unicorn -D -c $APP_ROOT/config/unicorn.rb -E development"

#chạy với user nào
AS_USER=deploy
```
Và cuối cùng là phân quyền chạy cho script

`$ sudo chmod 755 /etc/init.d/unicorn`

**Tiếp theo ta sẽ cài và cấu hình nginx**
- Cài nginx

    `$ sudo apt-get install nginx`
- Tạo file cấu hình để nginx gọi tới unicorn

    `$ sudo subl /etc/nginx/sites-available/hello_app`
    ```
    upstream unicorn {
      server unix:/home/tuan/hello_app/current/shared/sockets/unicorn.sock fail_timeout=0;
    }

    server {
      listen 80 default deferred;
      server_name _;
      root /home/tuan/hello_app/current/public;

      location ^~ /assets/ {
        gzip_static on;
        expires max;
        add_header Cache-Control public;
      }

      try_files $uri/index.html $uri @unicorn;
      location @unicorn {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://unicorn;
      }

      error_page 500 502 503 504 /500.html;
      client_max_body_size 4G;
      keepalive_timeout 10;
    }
    ```
    Trong này cần chú ý tới:
    ```
    server unix:/home/tuan/hello_app/current/shared/sockets/unicorn.sock fail_timeout=0;
    Là dòng nginx kết nối tới unicorn thong qua file .sock

    root /home/tuan/hello_app/current/public;
    là folder public của rails app
    ```
    và enable file này:
    
    `$ sudo ln -s /etc/nginx/sites-available/hello_app /etc/nginx/sites-enabled/hello_app`
    
    `$ sudo rm –rf /etc/nginx/sites-enabled/default`
    
Vậy là đã xong cấu hình trên server.
## 2: Cấu hình server local
Thực ra cấu hình trên server local thì các bạn chạy y hệt như cấu hình server remote ở trên, chỉ khác là cần cài thêm gói `Capistrano`.

Cài gói đó bằng cách sau:

`$ bundle exec cap install`

```
mkdir -p config/deploy
create config/deploy.rb
create config/deploy/staging.rb
create config/deploy/production.rb
mkdir -p lib/capistrano/tasks
create Capfile
Capified
```
Capistrano sẽ tạo ra các file với cấu trúc trên

- `Capfile`: Đây là file định nghĩa các thư viện con của capistrano mà nó sẽ dùng trong việc deploy.
    ```
    # Load DSL and set up stages
    require 'capistrano/setup'

    # Include default deployment tasks
    require 'capistrano/deploy'

    # Include tasks from other gems included in your Gemfile
    #
    # For documentation on these, see for example:
    #
    #   https://github.com/capistrano/rvm
    #   https://github.com/capistrano/rbenv
    #   https://github.com/capistrano/chruby
    #   https://github.com/capistrano/bundler
    #   https://github.com/capistrano/rails
    #   https://github.com/capistrano/passenger
    #
    require 'capistrano/rvm'
     # require 'capistrano/rbenv'
    # require 'capistrano/chruby'
     require 'capistrano/bundler'
     require 'capistrano/rails/assets'
     require 'capistrano/rails/migrations'
    # require 'capistrano/passenger'

    # Load custom tasks from `lib/capistrano/tasks` if you have any defined
    Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
    ```
- `config/deploy.rb` Là file cấu hình chung cho việc deploy
    ```
    # config valid only for current version of Capistrano
    lock '3.4.1'

    #tên application
    set :application, "hello_app"

    set :scm, :git

    #set repo trên git
    set :repo_url, "git@github.com:tuannd255/hello_app.git"

    #deploy tới folder nào trên server remote
    set :deploy_to, "/home/tuan/hello_app"

    #branch trên github. Mặc định là master
    set :branch, "master"

    set :pty, false
    set :format, :pretty

    # Default branch is :master
    # ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

    # Default deploy_to directory is /var/www/my_app_name
    # set :deploy_to, '/var/www/my_app_name'

    # Default value for :scm is :git
    # set :scm, :git

    # Default value for :format is :pretty
    # set :format, :pretty

    # Default value for :log_level is :debug
    # set :log_level, :debug

    # Default value for :pty is false
    # set :pty, true

    # Default value for :linked_files is []
    # set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

    # Default value for linked_dirs is []
    # set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

    # Default value for default_env is {}
    # set :default_env, { path: "/opt/ruby/bin:$PATH" }

    # Default value for keep_releases is 5
    # set :keep_releases, 5

    namespace :deploy do
      after :restart, :clear_cache do
        on roles(:web), in: :groups, limit: 3, wait: 10 do
          # Here we can do anything such as:
          # within release_path do
          #   execute :rake, 'cache:clear'
          # end
        end
      end
    end
    ```
- Sau đó cấu hình file`config/deploy/production.rb`(production ở đây là môi trường sản xuất của mình, bạn có thể để tên khác tùy ý)
    ```
    #set phương thức ssh = public key (đây là lý do mà mình cần gen ssh-key cho deploy ngoại trừ việc up lên github)
    set :ssh_options, {
      keys: %w(~/.ssh/id_rsa),
      forward_agent: true,
      port: 22,
      user: 'deploy',
    }

    # role :name, %{[user]@[IP adde.]}
    role :app, %w{deploy@192.168.1.7}
    role :web, %w{deploy@192.168.1.7}
    role :db,  %w{deploy@192.168.1.7}

    # Define server(s)
    server '192.168.1.7', user: 'deploy', roles: %w{web}
    ```
    Cuối cùng chạy lệnh start:
    `$ sudo /etc/init.d/nginx restart`
    `$ sudo /etc/init.d/unicorn start`
Như vậy là đã xong phần cài đặt, sau đây mình sẽ giới thiệu luôn phần deploy cho nóng
## 3: Deploy
Giờ đến việc dễ dàng nhất. deploy nào. Các bạn chỉ việc lên server local vào folder app và gõ: 

`$ cap production deploy`

và đợi cho đến khi chạy xong thôi.

Chúc các bạn thành công.