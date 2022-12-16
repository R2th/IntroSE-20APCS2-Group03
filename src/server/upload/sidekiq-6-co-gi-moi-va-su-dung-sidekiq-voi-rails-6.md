# 1. Một số điểm mới
Vào tháng 9 năm 2019, **Sidekiq** đã phát hành phiên bản 6.x. bao gồm: **Open-source version, Sidekiq Pro và Sidekiq Enterprise**. Sidekiq sử dụng các luồng để xử lý nhiều job cùng một lúc trong cùng một quy trình và được tích hợp chặt chẽ với Rails. 

Sidekiq 6.0 chứa một số thay đổi đột phá giúp hợp lý hóa hoạt động của Sidekiq và giảm hỗ trợ cho các phiên bản EOL của Ruby và Rails.

**ActiveJobs** có thể sử dụng ```sidekiq_options``` trực tiếp để cấu hình ```features/internals``` của Sidekiq như ```retry subsystem```. ```Sidekiq::Worker APIs``` có một số tính năng Sidekiq  (e.g. unique jobs) không hoạt động tốt với AJ. (requires Rails 6.0.2)
```ruby
class MyJob < ActiveJob::Base
  queue_as :myqueue
  sidekiq_options retry: 10, backtrace: 20
  def perform(...)
  end
end
```

**Logging**

Logging đã được thiết kế lại để cho phép các định dạng có thể ```pluggable``` và một số định dạng được gửi cùng với Sidekiq. VD:  JSON - một định dạng JSON để lập Search Indexing, một hash trên mỗi dòng

```ruby
Sidekiq.configure_server do |config|
  config.log_formatter = Sidekiq::Logger::Formatters::JSON.new
end
```
**Result của một số format**
```
Sidekiq::Logger::Formatters::Pretty	(Normal output)
2019-08-31T15:36:07.569Z pid=82859 tid=11cy9br class=HardWorker jid=528f1b0ddc4a9d0690464fe4 INFO: start
```
```
Sidekiq::Logger::Formatters::WithoutTimestamp (Output without time stamp)
pid=82859 tid=119pz7z class=HardWorker jid=b7f805c545c78770d30dc1fd elapsed=0.089 INFO: done
```
```
Sidekiq::Logger::Formatters::JSON (Output in JSON format)
{"ts":"2019-09-01T22:34:59.778Z","pid":90069,"tid":"104v8ph","lvl":"INFO","msg":"Running in ruby ​​2.5. 1p57 (2018-03-29 revision 63029) [x86_64-darwin17]"}
```


**Sidekiq sẽ kích hoạt định dạng tốt nhất cho môi trường nhưng có thể ghi đè lên bằng cách cấu hình định dạng Log một cách rõ ràng.**
```ruby
Sidekiq.configure_server do |config|
  config.log_formatter = AcmeCorp::PlainLogFormatter.new
  # config.log_formatter = Sidekiq::Logger::Formatters::JSON.new
end
```
**REDIS_PROVIDER variable** giữ tên của biến môi trường chứa URL Redis, để có thể chuyển đổi providers Redis nhanh chóng và dễ dàng với một thay đổi duy nhất. Nếu muốn đặt URL Redis theo cách thủ công thì có thể đặt REDIS_URL trực tiếp.

**Giống như trong Rails 6.0, Sidekiq 6.0 hiện đã nâng cấp nền tảng của mình lên Ruby 2.5+ và Redis 4.0+**

**Timeout mặc định chờ tắt sidekiq được tăng từ 8 giây lên 25 giây.**

**```Sidekiqctl``` được sử dụng để stop và kill Sidekiq đã bị xóa.**
```ruby
sidekiqctl quiet	kill -TSTP <pid>	#Stop each worker thread
sidekiqctl stop	kill -TERM <pid>	#Terminate the process (after executing the above command)
```
    
# 2. Setup
Install Sidekiq bằng cách thêm gem sidkiq vào Gemfile
```ruby
gem 'sidekiq', '~> 6.1.0'
```

Tạo một job mới trong ```app/jobs``` để xử lý các job không đồng bộ:

```ruby
class MyJob
  include Sidekiq::Worker

  def perform(args)
    # block that will be retried in case of failure
  end
end
```
Invoke bằng cách sau ```MyJob.perform_async(args)``` . Bắt đầu Sidekiq Process với ```bundle exec sidekiq```. Nếu sử dụng Invoker thì cần cấu hình lại tệp Sidekiq như sau:
```ruby
[sidekiq]
directory = /Users/work/my-project
command = RBENV_VERSION=$(cat .ruby-version) zsh -c "bundle exec sidekiq -c 2"
```

# 3.Tích hợp với Active Job
Active Job được giới thiệu trong Rails 4.2, là ```background job–processing framework``` mặc định của Rails. Theo mặc định, Active Job sẽ chạy các job theo line, nhưng có thể đặt adapter thành Sidekiq và thiết lập môi trường chạy background job như sau:
```ruby
# config/environments/production.rb
config.active_job.queue_name_prefix = "test_app_#{Rails.env}"
config.active_job.queue_adapter = :sidekiq
```

Điều thú vị về sự tích hợp chặt chẽ giữa Sidekiq với Active Job là các ```background worker``` sẽ trông giống Rails hơn. Tạo một base class với một số cấu hình phổ biến, được đặt tên là ```ApplicationJob```. 
```ruby
class ExampleJob < ApplicationJob
  queue_as :default
  def perform
     # do some stuff
  end
end
```

**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại!!**

**Link tham khảo**
https://medium.com/better-programming/how-to-use-sidekiq-in-rails-6-f3b76678362d

https://www.mikeperham.com/2019/09/03/welcome-to-sidekiq-6.0/