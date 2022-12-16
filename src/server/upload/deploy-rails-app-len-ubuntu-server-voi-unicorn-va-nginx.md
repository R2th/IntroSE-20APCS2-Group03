# Unicorn là gì?
Dễ hiểu là server HTTP cho Ruby. Cơ chế hoạt động là web server gửi các request tới worker Unicorn thông qua Unix sockets or TCP sockets....
Có nhiều lựa chọn khác Unicorn như `Puma` và `Thin`. Ở bài viết này mình sẽ giới thiệu về Unicorn
## Setup Unicoirn
### Config Unicoirn
Rồi tiếp theo phần I. Chúng ta đã có 1 rails server trên instance. Và giờ chúng ta sẽ sử dụng Unicorn cho nó =.="
1. Thêm `gem unicorn` vào gemfile
2. bundle install
3. tạo folder `current` chưa code app, 1 file `shared` chứa log, config, socket,... Khi deploy thì các file trong shared sẽ không bị mất thay đổi có thể xảy ra mấy log,...
    - cd
    - cd demo-deploy
    - mkdir -p current
    - mv * current
    - mkdir -p shared
    - cd shared
    - mkdir pids log sockets
5. Tạo file config/unicorn.rb để config unicorn 
    - cd ..
    - cd current
     - vim config/unicorn.rb
7. add nội dung file:
    ```
     # set path to application
    app_dir = File.expand_path("../..", __FILE__)
    shared_dir = '/home/deploy/demo-deploy/shared'
    working_directory app_dir


    # Set unicorn options
    worker_processes 2
    preload_app true
    timeout 30

    # Set up socket location
    listen "#{shared_dir}/sockets/unicorn.sock", :backlog => 64

    # Logging
    stderr_path "#{shared_dir}/log/unicorn.stderr.log"
    stdout_path "#{shared_dir}/log/unicorn.stdout.log"

    # Set master PID location
    pid "#{shared_dir}/pids/unicorn.pid"
    ```
    Giải thích 1 chút nhé :
   - `working_directory` DSL (Domain Specific Language) xét thư mục làm việc, pid file, standard in và standard out.
   - `worker_processes` : số worker processes unicorn chạy.  mặc định là 1 master process. Nếu bạn muốn môi trường production chạy nhiều worker processes các bạn có thể viết như sau :
    
        ex: `worker_processes (ENV['RAILS_ENV'] == 'production' ? 4 : 1)`
    - `listen`: Unicorn có thể lắng nghe trên port và sockets. File này cũng được dùng để cấu hình cho nginx. Bạn có thể lắng xét mỗi worker để nghe trên từng port
        ex :
        ```
        listen "#{shared_dir}/sockets/unicorn.sock", backlog: 64
        listen(3000, backlog: 64) if ENV['RAILS_ENV'] == 'development'
        ```
    - `timeout` : default là 60s, nếu app của bạn cầu thời gian timeout lâu thì bạn có thể xét tăng lên
    - `stdout_path` và `stderr_path`: đường dẫn chứa 2 file log của unicorn, sau này có sự cố gì thì vào đó xem
  5. Tạo thư mục với những j đã khai báo ở trên `pids`, `sockets`, `log`
  
       `mkdir -p shared/pids shared/sockets shared/log`
  ### Tạo script để tắt bật unicorn
  1. Tạo file `unicorn_appname` trong thư mục `etc/init.d`
  
       `sudo vi /etc/init.d/unicorn_appname`
   2. Thêm config vào file `unicorn_appname`
       ```
       #!/bin/sh

        ### BEGIN INIT INFO
        # Provides:          unicorn
        # Required-Start:    $all
        # Required-Stop:     $all
        # Default-Start:     2 3 4 5
        # Default-Stop:      0 1 6
        # Short-Description: starts the unicorn app server
        # Description:       starts unicorn using start-stop-daemon
        ### END INIT INFO

        set -e

        USAGE="Usage: $0 <start|stop|restart|upgrade|rotate|force-stop>"

        # app settings
        USER="deploy" #user name
        APP_NAME="appname" #directory project name
        APP_ROOT="/home/$USER/$APP_NAME/current"
        ENV="development"

        # environment settings
        PATH="/home/$USER/.rbenv/shims:/home/$USER/.rbenv/bin:$PATH"
        CMD="cd $APP_ROOT && bundle exec unicorn -c config/unicorn.rb -E $ENV -D"
        PID="$APP_ROOT/shared/pids/unicorn.pid"
        OLD_PID="$PID.oldbin"

        # make sure the app exists
        cd $APP_ROOT || exit 1

        sig () {
          test -s "$PID" && kill -$1 `cat $PID`
        }

        oldsig () {
          test -s $OLD_PID && kill -$1 `cat $OLD_PID`
        }

        case $1 in
          start)
            sig 0 && echo >&2 "Already running" && exit 0
            echo "Starting $APP_NAME"
            su - $USER -c "$CMD"
            ;;
          stop)
            echo "Stopping $APP_NAME"
            sig QUIT && exit 0
            echo >&2 "Not running"
            ;;
          force-stop)
            echo "Force stopping $APP_NAME"
            sig TERM && exit 0
            echo >&2 "Not running"
            ;;
          restart|reload|upgrade)
            sig USR2 && echo "reloaded $APP_NAME" && exit 0
            echo >&2 "Couldn't reload, starting '$CMD' instead"
            $CMD
            ;;
          rotate)
            sig USR1 && echo rotated logs OK && exit 0
            echo >&2 "Couldn't rotate logs" && exit 1
            ;;
          *)
            echo >&2 $USAGE
            exit 1
            ;;
        esac
       ```

    3. Giờ bạn có thể start/stop/restart... service 
        
        `sudo service filename start`

       **Note**
       - Mình mới tìm hiểu tạo 1 file scrip để chạy  service nên khi đọc nhiều bài hướng dẫn nếu khi bạn chạy xong bước 3 mà xảy ra lỗi :
       `Failed to start filename.service: Unit filenamservice not found.`
       Thì các bạn nhớ cấp quyền cho file và khời động khi boot 
           ```
           sudo chmod 755 /etc/init.d/filename
           sudo update-rc.d filename defaults
           ```
           Và rồi bạn chạy lại `sudo service filename start`
        - Khi bạn start service mà vẫn lỗi. Thì các bạn có thể xem log `sudo service filename status`
        - Ở nội dung file `unicorn_appname` phía trên : có thể bạn gặp lỗi `bundle: command not found` thì nhớ thay đổi 
            
            `"cd $APP_ROOT && bundle exec unicorn -c config/unicorn.rb -E $ENV -D"` thành `"cd $APP_ROOT; ~/.rbenv/bin/rbenv exec bundle exec unicorn -c config/unicorn.rb -E $ENV -D"`
# NginX là gì?
NginX cũng là 1 web server,  nó hỗ trợ cho unicorn trong việc xử lý các HTTP request.
Tới đây nhiều người sẽ hỏi là Unicorn ở trên cũng là 1 web server thì cần j phải sử dụng NginX nữa?
- NginX hỗ trợ multi-clients tốt hơn unicorn. Do Unicorn sử dụng blocking I/O (1 thời điểm chỉ dùng 1 client/worker) vì vậy càng nhiều worker_processes thì càng cần nhiều tài nguyên phần cứng.
    NginX lúc này sẽ đứng ra nhận các request và dưa vào hàng đợi, sau đó đưa dần xuống cho unicorn xử lý
- unicorn hỗ trợ static file không tốt bằng nginx
....
 
     Mọi người có thể tham khảo sự khác nhau giữa Unicorn và Nginx http://www.differencebetween.info/difference-between-nginx-and-unicorn
  ## Setup NginX
  ### Config Nginx
  1. Cài đặt Nginx
      `sudo apt-get install -y nginx`
   2. Mở file default config trong thư mục `/etc/nginx/sites-available`:
       `sudo vi /etc/nginx/sites-available/default`
       Note: Tốt nhất là nên tạo 1 file config mới: `sudo vi /etc/nginx/sites-available/demo-nginx` để chính sửa
       thêm nội dung file:
       ```
       upstream unicorn_stream {
          server unix:/home/deploy/demo-deploy/shared/sockets/unicorn.sock fail_timeout=0;
        }

        server {
          listen 80 default deferred;
          server_name localhost;
          root /home/deploy/demo-deploy/current/public;

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
            proxy_pass http://unicorn_stream;
            access_log /var/log/nginx/demo_deploy.access.log;
            error_log /var/log/nginx/demo_deploy.error.log;
          }

          error_page 500 502 503 504 /500.html;
          keepalive_timeout 10;
        }
       ```
       - `server unix:/home/deploy/demo-deploy/shared/sockets/unicorn.sock`: link socket của nginx phải cùng cổng với unicorn như vậy 2 đứa nó mới chịu hợp tác với nhau.
       - `root /home/deploy/current/demo-deploy/public;` cần phải trở đến thư mục public của rails app
       - access_log và error_log: 2 file lưu log.
       - Link nó sang thư mục /etc/nginx/sites-enabled/ để kích hoạt nó: 

            `ln -nfs /etc/nginx/sites-available/demo_deploy /etc/nginx/sites-enabled/demo_deploy`
     3. sudo service nginx restart
     4. Giờ bạn có thể chạy server thông qua public ID rồi
 # Config File config ^^
 1. Tạo thư mục config trong shared `mkdir -p config`
 ## Database.yml
 1. Tạo file database.yml
 2. Thêm nội dung file ví dụ ở đây mình thiết lập 2 môi trường development và production
 
     ```
     default: &default
      adapter: mysql2
      encoding: utf8
      pool: 5
      username: root
      password: ****

    development:
      <<: *default
      database: data_development

    production:
      <<: *default
      database: database_production
      username: root
      password: ****
      host: localhost
      port: 5432
     ```
  3. Lại dùng `ln` để link từ `shared/config/database.yml` -> `current/config/database.yml`
     `ln -nfs /home/deploy/demo-deploy/shared/config/database.yml /home/deploy/demo-deploy/current/config/database.yml`
  4. `rake db:create` (muốn tạo db môi trường production `RAILS_ENV=production rake db:create`)
  ## Secrets.yml
  1. Tạo file secrets.yml
  2. get  token bằng `bundle exec rake secret`
  3. Thêm nội dung file
      ```
      development:
          secret_token: d10a0f5fc488f5c3954f87a8f5262378c6929593f1a83b111296e80b67d7d.....
          secret_key_base: d10a0f5fc488f5c3954f87a8f5262378c6929593f1a83b111296e80b67d7d.....
       production:
           secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
      ```
  # Kết luận 
  Vậy là đã xong phần 2 config Nginx và Unicorn trên server. Phần tạo thư mục shared ở bài viết mình có tạo khác so với các bài viết mình đã tham khảo, nhưng mình nghĩ không nên tạo thư mục đó trong rails app vì khi deploy các file log sẽ bị xóa hết...