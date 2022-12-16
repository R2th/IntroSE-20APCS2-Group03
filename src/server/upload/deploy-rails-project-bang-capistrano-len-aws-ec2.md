Nếu bạn để ý bất kỳ project đang trong thời gian phát triển, bạn là một developer và bạn muốn test chức năng chắc chắn bước đầu là sẽ chạy test trên local nhưng có nhiều bug không phát sinh dưới local mà trên server.

Vậy làm sao để phát hiện được những vấn đề đấy. Tất nhiên ta phải deploy code lên server để chạy thử sau khi chạy dưới local rồi. 

Là một developer công việc deploy bạn chắc chắn phải làm dù sớm hay muộn.

Hôm nay mình muốn hướng dẫn cơ bản cách deploy một ứng dụng Rail lên server EC2 của AWS sử dụng Capistrano

## I/ Server EC2 của AWS

**Amazon EC2** (Elastic Cloud) là một trong những gói dịch vụ của AWS cung cấp giải pháp điện toán đám mây cho phép người dùng có thể tạo, thiết lập và sử dụng một server một cách dễ dàng. Nó giảm thiểu việc  cài đặt và cấu hình server đi rất nhiều so với việc bạn tự dựng 1 server vật lý.

**Amazon EC2 Instance** là một cloud server. Với một tài khoản bạn có thể tạo và sử dụng nhiều Amazon EC2 Instance. Các Amazon EC2 Instance được chạy trên cùng một server vật lý và chia sẻ memory, CPU, ổ cứng... Tuy nhiên do tính chất của cloud service nên mỗi một Instance được hoạt động giống như một server riêng lẻ.

#### Tạo tài khoản AWS
Bạn vào [đây](https://portal.aws.amazon.com/billing/signup#/start) để tạo tài khoản AWS. Tài khoản của bạn mặc định sẽ được sử dụng gói Free-Tier một năm.

**CHÚ Ý**:
- Gói Free-Tier thường sẽ tính thời gian sử dụng của bạn là **750h/tháng** với **mỗi loại instance** và cấu hình thường sẽ là **t2.micro**. Nên nếu bạn chọn tạo sai cấu hình hay tạo quá nhiều instance mà không dùng đến sẽ bị tính phí.
- Trường hợp chẳng may bạn không để ý và bị tính phí, bạn nên feedback cho bên AWS để nhờ hỗ trợ loại bỏ hoặc giảm trừ khoản phí đó *(Kinh nghiệm 1 người suýt bị mất 100$ :v)*

#### Tạo EC2 Instance
Bạn đăng nhập account AWS và chọn **Service** -> **EC2**
![](https://images.viblo.asia/f5f4601b-56a8-4ffa-a3c8-730af27c3e1e.png)

Sau đó bạn chọn **Launch Instance** để bắt đầu tạo EC2 Instance
![](https://images.viblo.asia/4b786b46-7acb-454d-9b63-81531484466e.png)

Bạn chú ý đến **Free tier eligible** là những OS bạn có thể cài đặt. Ở đây mình chọn AWS Linux AMI 2018 đã được cài sẵn Ruby

Tiếp đến sẽ chọn cấu hình máy mặc định sẽ là Free-Tier t2.micro
![](https://images.viblo.asia/3f5f9b0e-4ddf-4788-9eed-d8d1fcf82012.png)

Chọn **Review and Launch** và **Launch**
![](https://images.viblo.asia/55fc851a-8a3c-4c86-827a-acfd749b4478.png)

Bạn sẽ cần tạo ra một `Key Pair`: đây là key để ta ssh vào server, không có ta sẽ không thể truy cập server. 
Bạn chọn **Create a new key pair** đặt tên key rồi Download về máy
**Chú ý**: `Key Pair` bạn sẽ chỉ được cấp 1 lần duy nhất khi khởi tạo instance nên nếu mất bạn sẽ không có cách nào cấp lại và buộc phải tạo instance và `Key Pair`  mới để sử dụng

![](https://images.viblo.asia/a3e6b449-f1e9-4edc-a5e3-9a1cc220ca23.png)

Chọn **Lauch Instances** để hệ thống bắt đầu khởi tạo EC2
![](https://images.viblo.asia/206f2d61-9eb8-4133-8bf7-c4f293a4046d.png)

#### SSH server EC2
Bạn đã tạo xong EC2 bây giờ ta sẽ *ssh* vào nó thử xem sao nha
Đây là lúc dùng đến `Key Pair` mà ta đã tạo và tải xuống ở trên
- Bạn cần chuyển đổi quyền truy cập của `Key Pair` thành 400 vì file key sẽ chỉ được quyền read nếu bạn cho thêm quyền sẽ thông báo lỗi khi ssh vào server
```
sudo chmod 400 key.pem
```
- SSH vào server: IP server của bạn xem ở trường `IPv4 Public IP` và user mặc định sẽ `ec2-user`
![](https://images.viblo.asia/6bceee40-476b-457b-af5d-56e68dcc43c7.png)
Đây là lệnh để ssh vào server của bạn
```
ssh -i key.pem ec2-user@IP
```
Đây là kết quả sau khi ssh 
![](https://images.viblo.asia/8e56e83f-8780-4570-b31e-8965b19c1683.png)

#### Tạo user để deploy
- Tạo user mới trên server: `sudo adduser <new_user>`
- Cài password cho user mới tạo: `sudo passwd <new_user>`

Để deploy được user của bạn cần có quyền sudo để có thể cài đặt các ứng dụng như Rails,... và khởi chạy được các service khi deploy như puma, nginx,...

Để cấp quyền sudo cho user ta làm như sau:
- Truy cập file:
```
sudo vi /etc/sudoers
```
- Sau đó thêm dòng này vào  `%user ALL=(ALL) ALL`

Bây giờ ta đăng nhập sang user mới tạo: `sudo su user`

Thêm ssh key để ta có thể truy cập thẳng vào user mới tạo từ máy a
- Tạo file ssh authentication trên server
 ```
mkdir .ssh
sudo chmod 700 .ssh
vi ~/.ssh/authorized_keys
sudo chmod 600 ~/.ssh/authorized_keys
```
- Dưới máy local của bạn bạn cần tạo ra key `ssh-keygen -t rsa`. Bạn đặt tên cho file key (nếu cần) rồi enter đến hết bỏ qua password 
- Tên mặc định của file nếu bạn không đặt sẽ là id_rsa.pub. Bạn copy nội dung trong file `cat ~/.ssh/id_rsa.pub`
![](https://images.viblo.asia/36e7a133-6e97-4519-aa7b-41809f6b3aad.png)
- Bạn paste nội dung key file vào file `~/.ssh/authorized_keys` đã tạo ở trên server
![](https://images.viblo.asia/0c8a95bd-25af-4bec-81bf-497c76ac9a6e.png)

Bây giờ bạn có thể ssh qua user mới rồi : `ssh user@IP`
## II/ Deploy 
Trên server bạn cần cài những cấu hình cơ bản sau: RVM, Ruby, Rails, Git, MySQL,....
#### Cài đặt Capistrano
Trở về với máy local của ta, trong ứng dụng Rails mà ta muốn deploy sẽ cần thêm vào Gemfile những gem sau:
```
gem "capistrano"
gem "capistrano3-puma"
gem "capistrano-rails", require: false
gem "capistrano-bundler", require: false
gem "capistrano-rvm"
```
Sau đó chạy `bundle install` để cài đặt gem

Cài đặt xong **Capistrano** gem ta chạy `cap install` để khởi tạo cái file cần thiết cho việc deploy gồm:
```
├── Capfile
├── config
│   ├── deploy
│   │   ├── local.rb
│   │   ├── production.rb
│   │   └── staging.rb
│   └── deploy.rb
└── lib
    └── capistrano
        └── tasks
```
Bạn để ý các file được tạo ra có:
- deploy.rb: đây là các lệnh và setting chung cho ứng dụng Rails trên tất cả các môi trường
- thư mục deploy: đây bao gồm các file có chức năng giống như file deploy.rb nhưng nó sẽ thực hiện riêng cho các môi trường 
Sửa file deploy.rb và thêm đoạn sau:
```ruby
lock "~> 3.11.0"

set :application, "g22-rails-training"
set :repo_url, "git@github.com:DuongDo317/g22-rails-training.git"

set :pty, true
set :linked_files, %w(config/database.yml config/application.yml config/puma.rb config/master.key)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads)
set :keep_releases, 5
set :rvm_type, :user

set :puma_rackup, -> {File.join(current_path, "config.ru")}
set :puma_state, -> {"#{shared_path}/tmp/pids/puma.state"}
set :puma_pid, -> {"#{shared_path}/tmp/pids/puma.pid"}
set :puma_bind, -> {"unix://#{shared_path}/tmp/sockets/puma.sock"}
set :puma_conf, -> {"#{shared_path}/config/puma.rb"}
set :puma_access_log, -> {"#{release_path}/log/puma_access.log"}
set :puma_error_log, -> {"#{release_path}/log/puma_error.log"}
set :puma_role, :app
# set :puma_env, fetch(:rack_env, fetch(:rails_env, "staging"))
set :puma_threads, [4, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end
  
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end
```
Và thêm vào file deploy/production.rb: 
```ruby
server "54.169.193.207", user: "duong_deploy", roles: %w(web app db), primary: true

set :stage, :production
set :rails_env, :production
set :deploy_to, "/home/duong_deploy/deploy/apps/"
set :branch, ENV['BRANCH'] if ENV['BRANCH']
```
Bây giờ mình sẽ giải thích những phần bạn cần chú ý trong 2 file trên:
- `repo_url`: link github repo project của bạn
- `deploy_to`: thư mục mà bạn deploy trên server.
> Đặc biêt bạn phải để đường dẫn trực tiếp chứ không phải những đường dẫn gián tiếp như  *~/...* vì nó sẽ ảnh hưởng đến hai biến `current_path` và `shared_path`. Nếu bạn để đường dẫn gián tiếp khi deploy sẽ thông báo thành công thư mục được tạo xong nhưng các file service sẽ không thể tạo được dẫn đến dù trên log deploy ghi start service thành công nhưng thực chất service chưa từng chạy 
- `shared_path`: là thư mục shared được tạo ra bạn deploy trông đấy sẽ bao gồm các file service và config
- `branch`: đây là đoạn mình thêm vào để bạn có thể deploy dựa vào tên nhánh trên repo của bạn nếu bạn không nhập mặc định sẽ deploy master
- `server`, `user`: chính là user deploy và IP server của bạn
- `roles` và `puma_role`: bạn có thể đặt tên roles tùy ý nhưng khi gọi *pumarole* phải là một trong những *roles* bạn đã khai báo không sẽ không thể start puma được
- `linked_files`: đây sẽ là những file config của ứng dụng Rails của bạn mà bạn phải tạo trước trên server. Những file này sẽ không thay đổi khi deploy mà phải sửa trên server

#### Setting puma
Thêm vào `Capfile` để khởi chạy puma khi deploy: 
```
require "capistrano/puma"
install_plugin Capistrano::Puma
```
Sửa file config/puma.rb:
```ruby
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count
port        ENV.fetch("PORT") { 3000 }
app_dir = File.expand_path("../..", __FILE__)
environment "production"

bind "unix:///home/duong_deploy/deploy/apps/shared/tmp/sockets/puma.sock"
pidfile '/home/duong_deploy/deploy/apps/shared/tmp/pids/puma.pid'
state_path '/home/duong_deploy/deploy/apps/shared/tmp/pids/puma.state'
workers ENV.fetch("WEB_CONCURRENCY") { 2 }

plugin :tmp_restart
```

> Chú ý: Hạn chế việc cài puma bằng tay trên server vì có thể dẫn đến puma khai báo trong rails và trên server không đồng nhất. Khi đó sẽ phát sinh hiện tượng khi `start puma` sẽ tạo ra các `zombie process`

#### Setting nginx
Cài nginx trên server: `sudo apt-get install nginx`
Xóa đi file trỏ mặc định của nginx: `sudo rm /etc/nginx/sites_enabled/default`
Tạo file app.conf `sudo vi /etc/nginx/conf.d/app.conf` và copy đoạn sau vào:
```
upstream app {
   # Path to Puma SOCK file, as defined previously
   server unix:///home/duong_deploy/deploy/apps/shared/tmp/sockets/puma.sock;
}

server {
   listen 80 default_server deferred;
   # server_name localhost;

   root /home/duong_deploy/deploy/apps/current/public;

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

   error_page 404 /404.html;
     location /404.html {
       root /home/duong_deploy/deploy/apps/current/public/;
       try_files /404.html =404;
     }

   error_page 500 502 503 504 /50x.html;

   client_max_body_size 4G;
   keepalive_timeout 10;
}
```
- `listen 80`: là port chạy ứng dụng
- `server unix:///home/duong_deploy/deploy/apps/shared/tmp/sockets/puma.sock`: đường dẫn file puma.sock được tạo ra khi deploy
- `error_page`: bạn có thể setting hiện thị khi server errors 

Start nginx trên server: `sudo service nginx restart`
Sau khi chaỵ nginx ta cần lên AWS console để mở cổng 80 cho server:
- Vào **Securiry group**:
![](https://images.viblo.asia/9ce61dba-3fe5-4b01-9f44-5460d3df0b4a.png)
- Chọn 	**Edit inbound rules**:
![](https://images.viblo.asia/be000891-349f-423c-bb30-28dd2baded54.png)
- Thêm một rules mới và chọn HTTP:
![](https://images.viblo.asia/7d5c8b2c-f77f-40bf-936a-e893c5b4013e.png)

#### Một số setting thêm trước khi chuẩn bị deploy
Trước khi deploy lên server mình cần tạo cấu trúc thư mục như mình đã khai báo trong file deploy.rb
Dưới local mình cần tạo master.key như sau
```
EDITOR=vi bin/rails credentials:edit
```
Khi đó sẽ tạo ra 2 file **master.key** và **credentials.yml.enc**:
- `credentials.yml.enc`: dùng để lưu các setting secret key của bên thứ 3 như AWS key, Github, .... File này mặc định mã hõa thành một chuỗi random mỗi khi bạn thay đổi nội dung file một chuỗi mới được tạo ra
- `master.key`: dùng để mã hóa file `credentials.yml.enc` để lấy thông tin setting. File này mặc định được đưa vào .gitignore

Sau khi tạo xong `master.key` bạn sẽ phải đưa lên server vào thư mục shared/config bằng cách `scp`
```
scp master.key IP:/home/user/deploy/apps/shared/config/
```
#### Tiến hành deploy
```
cap production deploy BRANCH=deploy_test
```
![](https://images.viblo.asia/6671bdf9-b5b5-41bd-9be4-f6d7338f56be.png)

Của mình là api và đây là kết quả sẽ xuất hiện error page của nginx:
![](https://images.viblo.asia/f737d81a-bb68-417a-a00f-1003c34b3947.png)
Đã có thể bắn api bình thường rồi: 
![](https://images.viblo.asia/3f4e005e-3b47-42ab-a69a-94c88c19b98f.png)