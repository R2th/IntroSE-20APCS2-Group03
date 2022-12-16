# Sidekiq là gì?
Trong những trường hợp ứng dụng của bạn có những tác vụ mà việc hiển thị lên màn hình của người dùng tương ứng với tiến trình đang thực hiện là không quan trọng thì background job sẽ là một lựa chọn để tăng hiệu suất của ứng dụng lên.

Đúng như theo tên gọi của nó, background job là những công việc chạy ngầm, song song với các tiến trình khác của hệ thống. Với những công việc không cần phải thực hiện theo trình tự thì việc thực hiện chúng cùng một lúc ở các tiến trình khác nhau sẽ làm giảm tổng thời gian thực hiện công việc đó.

Sidekiq là một framework dùng để xử lý các tác vụ chạy ngầm. Nó sử dụng Redis để lưu trữ các background job.
# Redis là gì ?
Redis là một hệ thống lưu trữ dưới dạng key - value. Giống như các NoSQL Database khác, tuy nhiên sử dụng RAM thay vì trên ROM nên tốc độ xử lý nhanh hơn rất nhiều. 
# Cài đặt
Chúng ta thêm sidekiq và redis vào `Gemfile` rồi chạy bundle install để cài đặt:
```
gem "sidekiq"
gem "redis", "~> 3.3"
```
Khi thực hiện xong thì sidekiq đã được cài đặt trong hệ thống do đó khi deploy thì nó cũng sẽ được cài đặt lên server luôn. Do đó chúng ta chỉ cần cài đặt redis trên server nữa là ổn. 
SSH vào server cần cài đặt
```
ssh deploy@remote
```
Cập nhật các packages mới nhất cũng nhưng update các packages lên phiên bản mới hơn:

```
sudo apt-get update
sudo apt-get upgrade
```
Mặc định redis đã có sẵn trong kho paskages của Ubuntu nên bạn chỉ cần chạy lệnh sau để cài đặt:

```
sudo apt-get install redis-server
```
# Config Sidekiq
Tạo file `sidekiq.rb` trong thư mục `config/initializers`:
```
Sidekiq::Extensions.enable_delay!

Sidekiq.configure_server do |config|
  config.redis = { url: "redis://#{ENV['REDIS_SERVER']}:6379" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: "redis://#{ENV['REDIS_SERVER']}:6379" }
end
```
Như đã nói ở trên, do sidekiq sử dụng redis để lưu các background job nên đây là nơi để bạn định nghĩa kết nối từ sidekiq đến redis để đẩy dữ liệu vào cũng như lấy dữ liệu ra

Tạo file `sidekiq.yml` trong thư mục `config`. Đây là nơi định nghĩa thêm một số option khác khi khởi động sidekiq
```
---
verbose: false
concurrency: 10
pidfile: ./tmp/pids/sidekiq.pid
logfile: ./log/sidekiq.log
queues:
  - default
  - low
production:
  concurrency: 25
staging:
   concurrency: 15
```
Chúng ta sử dụng **capistrano** để hỗ trợ trong việc deploy nên thêm vào `deploy.rb` đoạn code sau:

```
task :restart, :clear_cache do
  on roles(:app) do
    execute "cd #{current_app_path}"
    execute :sudo, :systemctl, :restart, :sidekiq
  end
end
```
Trong đó `current_app_path` là đường dẫn đến thư mục ứng dụng của bạn. Ví dụ như trong tường hợp của mình là `/home/deploy/dnlblog/current`.
Để deploy bằng capistrano thông qua người dùng `deploy` thì cần phải cấp quyền chạy lệnh trên mà không yêu cầu mật khẩu cho người dùng đó.
Câu lệnh `execute :sudo, :systemctl, :restart, :sidekiq` sẽ tương đương với việc bạn chạy `sudo systemctl restart sidekiq`. Tuy nhiên để chạy được lệnh này, người dùng deploy phải có quyền sudo và sẽ phải yêu cầu mật khẩu

Trên server deploy chúng ta kiểm tra group hiện tại của người dùng deploy bằng cách chạy lệnh:
```
groups
```
Mở file sudoers
```
sudo visudo
```
Trong trường hợp của mình, người dùng deploy đang ở trong group là sudo do đó sẽ thêm vào dòng sau:
```
%sudo ALL=NOPASSWD:/bin/systemctl restart sidekiq
```
Các người dùng trong group sudo sẽ có thể chạy lệnh để restart sidekiq thông quay systemctl mà không cần phải yêu cầu mật khẩu nữa

Để chạy sidekiq thông qua `systemctl` chúng ta phải tạo ra file `/lib/systemd/system/sidekiq.service` với nội dung sau:

```
# Customize this file based on your bundler location, app directory, etc.
# Put this in /usr/lib/systemd/system (CentOS) or /lib/systemd/system (Ubuntu).
# Run:
#   - systemctl enable sidekiq
#   - systemctl {start,stop,restart} sidekiq
#
# This file corresponds to a single Sidekiq process.  Add multiple copies
# to run multiple processes (sidekiq-1, sidekiq-2, etc).
#
# See Inspeqtor's Systemd wiki page for more detail about Systemd:
# https://github.com/mperham/inspeqtor/wiki/Systemd
#
[Unit]
Description=sidekiq
After=syslog.target network.target

[Service]
Type=simple
WorkingDirectory=/home/deploy/dnlblog/current
ExecStart=/home/deploy/.rbenv/shims/bundle exec sidekiq -e production -C config/sidekiq.yml
User=deploy
Group=sudo
UMask=0002

# if we crash, restart
RestartSec=1
#Restart=on-failure
Restart=always

# output goes to /var/log/syslog
StandardOutput=syslog
StandardError=syslog

# This will default to "bundler" if we don't specify it
SyslogIdentifier=sidekiq

[Install]
WantedBy=multi-user.target
```
Trong dó có hai điểm cần chú ý đó là thư mục hiện tại chạy ứng dụng, trong trường hợp của mình là `/home/deploy/dnlblog/current`
```
WorkingDirectory=/home/deploy/dnlblog/current
```
Và đường dẫn đến command để start sidekiq. Nó có thể sẽ khác nhau phụ thuộc vào trình quản lý ruby version mà bạn đang sử dụng
```
ExecStart=/home/deploy/.rbenv/shims/bundle exec sidekiq -e production -C config/sidekiq.yml
```
Tiếp theo là cập nhật lại thay đổi cấu hình hệ thống và enable sidekiq
```
systemctl daemon-reload
sudo systemctl enable sidekiq
```
# Deploy
Quay trở lại local của bạn, commit và đấy code lên thôi nào. Sau đó chạy
```
cap production deploy
```
chờ đợi và lên server kiểm tra trạng thái của sidekiq
```
sudo systemctl status sidekiq
```
Nếu có thông báo như bên dưới thì coi như chúng ta đã thành công
```
● sidekiq.service - sidekiq
   Loaded: loaded (/lib/systemd/system/sidekiq.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2019-05-26 08:40:26 UTC; 30min ago
 Main PID: 27049 (bundle)
    Tasks: 28 (limit: 1152)
   CGroup: /system.slice/sidekiq.service
           └─27049 sidekiq 5.1.3 dnlblog [0 of 25 busy]

May 26 08:40:26 ip-172-31-12-156 systemd[1]: Stopped sidekiq.
May 26 08:40:26 ip-172-31-12-156 systemd[1]: Started sidekiq.
```
# Summary
Vừa rồi mình đã hướng dẫn các bạn config và cài đặt Sidekiq, Redis trên môi trường Production. Hi vọng bài viết sẽ giúp ích cho những bạn lần đầu deploy Rails app lên VPS.

Blog: https://www.dnlblog.com/posts/config-sidekiq-va-redis-tren-production