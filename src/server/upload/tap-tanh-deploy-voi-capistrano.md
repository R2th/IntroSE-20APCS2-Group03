Chào các bạn, bài viết hôm nay mình sẽ viết về 1 chủ đề khá quen thuộc: Deploy 1 Rails app với Capistrano.

Bước vào thế giới của Ruby và Rails, hẳn các bạn sẽ đọc qua cuốn Ruby on Rails Tutorial, cuốn sách giúp bạn tiếp cận với Ruby on Rails từ zero tới deploy.

Các bạn sẽ được làm quen với các lệnh như `git push heroku master`, `heroku run rails db:migrate`, ... và Rails app của bạn sẽ chạy ngon lành trên server của Heroku.

Bước vào những dự án thực tế, bạn sẽ bắt đầu xa dần với Heroku, thay vào đó sẽ là server AWS, server vật lý, và làm thế nào để deploy Rails app của bạn lên các server đó. Kể ra thì có khá là nhiều cách, từ dùng Docker, Codedeploy, Capistrano, ... hay thậm chí là các bạn có thể access trực tiếp vào server rồi làm mọi thứ bằng cơm :D

Bài viết hôm nay mình sẽ hướng dẫn các bạn dựng 1 server trên máy local, mô phỏng các bước deploy 1 Rails app lên server đó bằng  [Capistrano](https://github.com/capistrano/capistrano) - một thư viện hỗ trợ deploy có thể nói là tốt nhất hiện nay của Rails.

### Dựng server deploy

Để deploy thì chắc chắn rồi, đầu tiên bạn cần phải có 1 server để Rails app chạy trên đó chứ nhỉ :D

Khá là dễ dàng, bạn có thể bỏ tiền ra mua 1 con server vật lý nào đó, hoặc đăng ký 1 tài khoản AWS, GCP tạo 1 cái instance. Mục đích cuối cùng là có 1 cái máy cài đặt môi trường đầy đủ để Rails app của bạn có thể chạy trên đó.

Tuy nhiên, nếu không có điều kiện thì các bạn có thể theo mình tự dựng 1 con server ảo ngay trên PC của chính mình. 

Mình sẽ hướng dẫn các bạn cài Docker và run 1 container cài sẵn Ubuntu 18.04

```bash
# cài docker
curl -fsSL https://get.docker.com/ | sh
# Thêm current user vào docker group để khỏi dùng sudo
sudo usermod -aG docker $USER
# Nếu vẫn phải dùng sudo thì reset máy lại cho chắc
sudo reboot

# Kiểm tra docker đã cài đặt thành công
docker --version

# Run 1 container cài sẵn Ubuntu 18.04
docker run --name ubuntu_server -it ubuntu:18.04 bash

# Lúc này con trỏ trong terminal của bạn đang nháy ở dòng có dạng
root@3788a1e70189:/#
# thì chúc mừng bạn đã có 1 server để sẵn sàng deploy rồi đấy
```

Mà docker là gì? Đây lại là 1 kiến thức khá rộng nên mình sẽ không giải thích trong bài viết này. Nếu các bạn vẫn muốn tò mò muốn biết vì sao chỉ vài lệnh trên mà mình đã có 1 server thì có thể research Docker nhé :D Các bạn cungx có thể xem nó như là 1 cái máy ảo, nhưng thực chất nó không phải là máy ảo đâu nhé. À mà nếu không muốn dùng Docker thì các bạn cũng có thể cài một cái máy ảo chạy trên HĐH của mình, tuy nhiên hãy chắc chắn rằng phần cứng của mình đảm bảo chạy được không lag nhé.

OK, vậy là chúng ta đã có 1 server đang chạy Ubuntu 18.04

### Cài đặt môi trường

Hãy tưởng tượng các bạn vừa mua 1 chiếc máy tính mới toanh, cài đặt hệ điều hành Ubuntu 18.04. Bây giờ, muốn run 1 Rails app lên đó thì làm gì? Hãy làm điều tương tự với con server mà mình vừa dựng ở trên.

Hãy trở lại với terminal của chúng ta, khi bạn đang đứng ở

```bash
root@3788a1e70189:/# 
```

Lúc này bạn đang truy cập vào máy tên là `3788a1e70189` dưới quyền `root`. 

À mà nếu lỡ tắt terminal hoặc thoát khỏi cái máy deploy ở trên, các bạn có thể bật lại bằng lệnh

```bash
docker start ubuntu_server

# Rồi access vào server bằng lệnh
docker exec -it ubuntu_server bash
```

Thực tế thì bạn sẽ phải tạo thêm user, cấp quyền vừa đủ để deploy chứ không deploy bằng root. Thử tạo user tên là `deploy`

```bash
adduser deploy
# Nhập password cho user deploy, các thông tin khác có thể để default

# Install sudo
apt-get update
apt-get install sudo

# Cấp quyền sudo cho deploy
apt-get install nano
sudo nano /etc/sudoers

# Add thêm dòng này vào rồi lưu lại
%deploy ALL=(ALL) ALL

# Chuyển sang user deploy để cài đặt môi trường
sudo su - deploy
```

Ok bây giờ hãy cài đặt môi trường theo hướng dẫn quen thuộc này https://gorails.com/setup/ubuntu/18.04

### Config deploy

Bây giờ hãy add thêm Capistrano và các gem hỗ trợ vào project của bạn. Bạn chỉ cần add các Gem này vào group development. Vì bản chất nó sẽ đứng ở local của bạn để deploy code lên server staging, production, ...

```ruby
# Gemfile
group :development do
  gem "capistrano"
  gem "capistrano3-puma"
  gem "capistrano-rails", require: false
  gem "capistrano-bundler", require: false
  gem "capistrano-rvm"
end
```

`bundle install` để cài các thư viện của Capistrano vào máy local của bạn.

`bundle exec cap install` và Capistrano sẽ generate các file config sau

```
├── Capfile # Đây là file require các thư viện liên quan
├── config
│   ├── deploy
│   │   ├── production.rb # File config deploy cho môi trường production
│   │   └── staging.rb # File config deploy cho môi trường staging
│   └── deploy.rb # File config deploy chung
└── lib
    └── capistrano
            └── tasks
```

Khi bạn thực hiện deploy, Capistrano sẽ thực hiện require các thư viện từ `Capfile`, đọc các config từ `config/deploy.rb` rồi đọc các config từ `config/deploy/{env}.rb`. Cùng 1 config nhưng giá trị khác nhau giữa 2 file `deploy.rb` và `{env}.rb` thì giá trị ở `{env}.rb` là giá trị cuối cùng.

Bây giờ, hãy thử vọc vạch một số config cơ bản:

```ruby
set :repo_url, "git@github.com:{your_repo}.git" # Chir ra cho Cap biết bạn sẽ muốn lấy code từ repo nào
set :branch, :master # Bạn sẽ deploy code mới nhất từ branch nào, cái này sẽ khác nhau giữa các môi trường
server "172.17.0.2", user: "deploy", roles: %w(web app db) # Thông tin về host và user của server deploy
set :stage, :production
set :rails_env, :production # Set biến môi trường cho Rails app
set :deploy_to, "~/my_app" # Chọn folder (ở máy server) để deploy vào
set :keep_releases, 5 # Số phiên bản release mà bạn muốn giữ lại
# 2 config tiếp theo sẽ lưu lại những file, folder cần giữ lại mỗi lần deploy, chúng sẽ được lưu ở folder "shared"
set :linked_files, %w{.env}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/upload node_modules}
```

Capistrano là một tool deploy tự động được xây dựng dựa trên Ruby, Rake và SSH. Nó sẽ đứng ở máy local của bạn SSH vào server và thực thi các Rake tasks theo trình tự. Vì vậy điều kiện đầu tiên để có thể deploy là tại máy local của bạn có thể access vào máy server bằng SSH.

Để có thể access vào server bằng SSH, rất đơn giản ta chỉ cần cung cấp SSH public key cho server deploy là xong. Từ máy local của bạn gõ `cat ~/.ssh/id_rsa.pub` để lấy SSH public key

Hãy trở lại với Terminal của chúng ta, nơi mà chúng ta đang access vào server deploy với user deploy. Chắc chắn rằng bạn đang đứng ở user deploy nhé

```bash
deploy@5c2da7d6ce46:~$

# Cho phép server run SSH ở port 22
sudo apt-get install -y openssh-server
sudo service ssh start

# Tạo folder .ssh
mkdir ~/.ssh
cd ~./ssh
# Tạo file authorized_keys để add các SSH key được phép truy cập vào server
touch authorized_keys
# Cấp quyền thực thi cho authorized_keys
chmod 600 authorized_keys
```

Bây giờ open file `authorized_keys` và paste SSH public key của bạn vào đó, và bạn có thể từ local access vào server bằng lệnh `ssh {user}@{host}`. Trong đó user chính là `deploy`, host là địa chỉ của server. Để lấy địa chỉ của server bạn dựng trước đó, gõ `docker inspect ubuntu_server | grep IPAddress`, giá trị IPAddress chính là IP của máy server trên. Giả sử giá trị này là 172.17.0.2, hãy thử connect vào server bằng lệnh `ssh deploy@172.17.0.2`

![](https://images.viblo.asia/528ef727-e663-4eb2-98de-0c95b8a1b03a.png)

Vậy là sắp xong công tác chuẩn bị, bây giờ giả sử bạn set môi trường cho con server deploy kia là production. Hãy config lại các giá trị cho file `config/deploy.rb` và `config/deploy/production.rb`. Đứng ở project folder của bạn ở máy local gõ lệnh `cap production deploy`, Cap sẽ giúp bạn tự động lấy code từ repo Github, và triển khai nó trên server deploy của bạn. Hãy đọc tất cả những dòng log sinh ra để hiểu Capistrano nó sẽ làm những bước gì khi triển khai code của bạn trên 1 server.

Tuy nhiên, đời sẽ không như mơ, những lần deploy đầu tiên bạn sẽ gặp tương đối là nhiều lỗi, chẳng hạn như chưa tạo file .env, cài Ruby chưa đúng phiên bản, chưa có DB,  thiếu RAILS_MASTER_KEY, .... Đừng nản chí, hãy cố gắng đọc log (Capistrano nó ghi log khá rõ ràng) và fix từng lỗi một, khổ trước sướng sau mà :D

Mà lỗi rắc rối nhất chính là bật puma. Trên server, capistrano sẽ không bật puma ở port 3000 như máy local của chúng ta, nó sẽ run puma dưới dạng socket thông qua file config được lưu ở `#{your_project_path}/shared/puma.rb` trên máy server. SSH vào server của bạn, tạo file `#{your_project_path}/shared/puma.rb`

```ruby
#!/usr/bin/env puma

directory "#{project_path}/current"
rackup "#{project_path}/current/config.ru"
environment "production"

tag ""

pidfile "#{project_path}/shared/tmp/pids/puma.pid"
state_path "#{project_path}/shared/tmp/pids/puma.state"
stdout_redirect "#{project_path}/shared/log/puma_access.log", "#{project_path}/shared/log/puma_error.log", true

threads 0,8

bind "unix://#{project_path}/shared/tmp/sockets/puma.sock"

workers 2
daemonize true

prune_bundler


on_restart do
  puts "Refreshing Gemfile"
  ENV["BUNDLE_GEMFILE"] = ""
end
```

Hãy thử deploy lại, fix các lỗi lặt vặt cho đến khi Capistrano thông báo rằng tất cả các tasks của bạn đều success đồng nghĩa với code của bạn đã được triển khai thành công trên server deploy.

![](https://images.viblo.asia/15a225ea-4731-44e7-8cfd-1f47685c9695.png)


### Public thành quả

Vì puma trên server deploy đang chạy dưới socket nên không thể truy cập vào ứng dụng của bạn bằng URL public được. Bước cuối cùng, cài đặt và config nginx cho phép từ bên ngoài xem được sản phẩm của bạn

Access vào server deploy bằng SSH, cài đặt nginx `sudo apt-get install nginx`.
Xóa file config mặc định của nginx `sudo rm /etc/nginx/sites-enabled/default`
Tạo file config `sudo touch /etc/nginx/conf.d/default.conf`
Open file config và thử với đoạn config sau (Mình xin phép không giải thích về các config trong bài viết này)

```
upstream app {
   # Path to Puma SOCK file, as defined previously
   server unix:{your_project_folder}/shared/tmp/sockets/puma.sock fail_timeout=0;
 }

 server {
   listen 80;

   root {your_project_folder}/current/public;

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

Save lại và restart lại nginx `sudo service nginx restart`

Mở browser và truy cập vào server của bạn, như ví dụ của chúng ta là 172.17.0.2 và đón nhận thành quả

![](https://images.viblo.asia/45595f3e-4a0f-419a-a0b4-abea14392888.png)

Chúc các bạn thành công và qua đó hi vọng các bạn có cái nhìn tổng quát về cách triển khai 1 ứng dụng Rails trên server của Capistrano.