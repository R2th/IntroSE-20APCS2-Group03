Trong bài này mình sẽ hưởng dẫn step by step để deploy Rails App lên production sử dụng `Puma` và `Nginx`. Sau đó sẽ tạo SSL sử dụng certbot. 

# 1. Prepare Production Server
 **Đầu tiên mình cần mua VPS nào đó để deploy code của mình lên**

Sau đây là một số provider bạn có thể lựa chọn :

* [DigitalOcean](https://www.digitalocean.com/)
* [Linode](https://www.linode.com/)
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Google Cloud](https://cloud.google.com/compute/)
* [Microsoft Azure](https://azure.microsoft.com/en-us/services/virtual-machines/)
* ....

**Tạo Deploy user cho server**

Sau khi mình đã chọn và mua VPS được rồi. Tiếp theo mình cần ssh vào server và tạo một deploy user. User này có quyền giới hạn trong production server, vậy nếu có hacker hack vào server của mình thì sẽ không có full quyền cho toàn bộ server. 
```
ssh root@server_ip
adduser deploy
adduser deploy sudo
exit
```

Bây giờ mình có thể login as deploy user
```
ssh deploy@server_ip
```

# 2. Cài đặt Ruby on Rails và Database
Bạn có thể làm theo hưởng dẫn này để cài đặt Ruby on Rails và Database

https://gorails.com/setup/ubuntu/20.10

# 3. Chạy rails server trên môi trường production
Sau khi cài đặt những thứ cần thiết xong hết rồi, ở step này bạn cần pull code từ github về và config biến môi trường, rake db, ... để làm sao bạn có thể chạy server được như trên local ấy.
```
RAILS_ENV=production rake db:create
RAILS_ENV=production rake db:migrate
RAILS_ENV=production rake assets:precompile
```

Chạy server:
```
RAILS_ENV=production rails server --binding=server_ip
```

Test thử là đã chạy ok chưa : 
[http://server_ip:3000/](http://server_ip:3000/)

Nếu tất cả mọi thứ đã chạy ok rồi thì việc config Ruby on Rails của bạn đã xong. Step tiếp theo là cần config `Puma` và `Nginx`.

# 4. Cài đặt và config Puma
Add vào Gemfile:
```
gem "puma"
```
```
bundle install
```

Tạo `config/puma.rb` và add config như sau:

```rb
# Change to match your CPU core count
workers 2

# Min and Max threads per worker
threads 1, 6

app_dir = File.expand_path("../..", __FILE__)
shared_dir = "#{app_dir}/shared"

# Default to production
rails_env = ENV['RAILS_ENV'] || "production"
environment rails_env

# Set up socket location
bind "unix://#{shared_dir}/sockets/puma.sock"

# Logging
stdout_redirect "#{shared_dir}/log/puma.stdout.log", "#{shared_dir}/log/puma.stderr.log", true

# Set master PID and state locations
pidfile "#{shared_dir}/pids/puma.pid"
state_path "#{shared_dir}/pids/puma.state"
activate_control_app

on_worker_boot do
  require "active_record"
  ActiveRecord::Base.connection.disconnect! rescue ActiveRecord::ConnectionNotEstablished
  ActiveRecord::Base.establish_connection(YAML.load_file("#{app_dir}/config/database.yml")[rails_env])
end
```

Bạn cần cập nhật số `workers` thành số CPU core của server.

Trên config trên, bạn cần tạo thêm folders để chứa socket, logs và PIDS của Puma.
```
mkdir -p shared/pids shared/sockets shared/log
```

Bây giờ bạn có thể start puma lên như sau:
```
bundle exec puma -e production -d
```

# 5. Cài đặt và config Nginx
Cài đặt Nginx :
```
sudo apt-get install nginx
```

Sau đó bạn cần vào edit file `/etc/nginx/sites-available/default`:

```
upstream app {
    # Path to Puma SOCK file, as defined previously
    server unix:/home/deploy/appname/shared/sockets/puma.sock fail_timeout=0;
}

server {
    listen 80;
    server_name localhost;

    root /home/deploy/appname/public;

    try_files $uri/index.html $uri @app;

    location @app {
        proxy_pass http://app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
    }

    error_page 500 502 503 504 /500.html;
    client_max_body_size 4G;
    keepalive_timeout 10;
}
```

Đổi `appname` thành folder App của mình. 

Restart Nginx:
```
sudo service nginx restart
```

Nếu không có error gì, bạn có thể vào url để thử nhé  [http://server_ip/](http://server_ip/)

# 6. Tạo SSL với certbot
Đến step này, Rails App của bạn đã lên production rồi. Ở bước này, mình sẽ sử dụng [certbot](https://certbot.eff.org/) để tạo SSL. certbot là  open source để tạo và tự động renew SSL sử dụng  [Let’s Encrypt](https://letsencrypt.org/)

Đầu tiên mình phải có domain mới set up SSL được. Sau khi mua và config doman xong, bạn update trong file config của Nginx từ `localhost` sang `domain` của bạn.

```
server {
    listen 80;
    server_name domain;
    ...
  }
```

Các bước đơn giản như sau: (bạn có thể vào website của certbot để xem chi tiết hơn)
1. ssh vào server
2. [Cài đặt snapd.](https://snapcraft.io/docs/installing-snapd/)
3. Kiêm tra và update snapd tới version mới nhất
```
sudo snap install core; sudo snap refresh core
```
4. Remove các certbot packages nếu có
```
sudo apt-get remove certbot
```

5. Cài đặt certbot
```
sudo snap install --classic certbot
```
6. Chạy command dưới để check certbot đã chạy ok
```
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

7. Kết nối cerbot vào Nginx
```
sudo certbot --nginx
```

Nó sẽ tự động config vào file config của Nginx `/etc/nginx/sites-available/default` và mặc định sẽ tự động renew SSL cho mình. Mình sẽ không cần lo về việc hết hạn nữa. 

Bạn có thể vào url để thử nhé  [https://domain/](https//domain/) 

# References:
https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-puma-and-nginx-on-ubuntu-14-04

https://gorails.com/deploy/ubuntu/18.04#guide

https://certbot.eff.org/