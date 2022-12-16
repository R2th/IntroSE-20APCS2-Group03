Trải nghiệm người dùng luôn được các trang web hướng tới trong xu thế hiện nay. Vậy làm sao có thể cung cấp một trải nghiệm tốt cho người dùng khi phải xử lý một lượng lớn truy cập tới trang web của mình ? Một trong những cách để xử lý việc này là sử dụng background job 
# 1. Background job là gì?
Hiểu một cách đơn giản thì background job là một nơi xử lý các luồng, không can thiệp vào luồng chính request/response của 1 trang web, và thực hiện trên server.

Ví dụ cho background job có thể là tính toán tiền lương cho 1000 nhân viên. Việc tính toán lương cho 1000 nhân viên có thể mất một khoảng thời gian rất dài, nếu không đặt vào background thì có thể sẽ khiến web page bị chết do server đang bận xử lý việc tính toán.

# 2. Sử dụng background job
Mặc định Rails cung cấp cho ta Active job và built-in queue process, những process trong queue được lưu vào RAM nên nếu server bị shutdown thì những job chưa hoặc đang thực hiện sẽ bị mất, điều này có thể gây ảnh hưởng tiêu cực đến người dùng và dịch vụ của chúng ta.
Chính vì vậy chúng ta nên sử dụng các 3rd-party adapter như Sidekiq, DelayJob, Rescue ... 
Có nhiều cách để sử dụng background job trong Rails, phổ biến nhất vẫn là Sidekiq, Delay Job và Rescue sử dụng Redis để lưu các queue.

Mình sẽ chọn Sidekiq vì chưa sử dụng Rescue bao giờ. 

Sidekiq cung cấp cho ta 2 option là Active Job hoặc Worker. Về cơ bản thì Active job không khác gì so với Worker, tuy nhiên ActiveJob có một số hạn chế các chức năng khi sử dụng với Sidekiq.

Cài đặt
thêm Gem vào Gemfile. Bạn có thể thêm redis-namespace nếu muốn chia các namespace cho queue của redis
```
gem "sidekiq"
gem 'redis-namespace'
```

Config cho sidekiq , tạo file sidekiq.yml . Ở đây mình cài đặt
+ Log file: log/sidekid.log
+ pidfile: tmp/pids/sidekiq.pid
+ concorrency max là 25
+ 3 queue: default, worker, active_job với thứ tự thực hiện từ trên xuống


```
:concurrency: 25
:pidfile: tmp/pids/sidekiq.pid
:logfile: log/sidekiq.log
:queues:
  - default
  - [worker, 2]
  - active_job
:daemon: true

```

Các bạn chạy sidekiq như sau để load config
```
bundle exec sidekiq -C sidekiq.yml
```

hoặc cũng có thể dùng rake task như sau
```
namespace :sidekiq do
  desc "Strano | Start sidekiq"
  task start: :environment do
    system "bundle exec sidekiq -C config/sidekiq.yml"
  end
end

```
và chạy rake sidekiq:start

Ở đây chúng ta có thể lựa chọn sử dụng Worker hoăc active job
Nếu là Active job ta thêm config vào application.rb
```
 config.active_job.queue_adapter = :sidekiq
```

Tạo examplejob như sau
```
class ExampleJob < ActiveJob::Base
  queue_as :active_job

  def perform
    // Do some job
  end
end

```

Để thực hiện job ta làm như sau
```
ExampleJob.perform_now # Nếu muốn job được thực thi ngay
ExampleJob.perform_later # Nếu muốn job được thêm vào queue

```

Sidekiq yêu cầu Redis để lưu trữ các job trong queue của mình, vì vậy các bạn cần đảm bảo cài đặt redí trước khi sử dung.

Ngoài ra sidekiq còn cung cấp cho chúng ta giao diện để có thể kiểm soát các job được thực hiện

![](https://images.viblo.asia/5c4638ec-7069-4f96-8b50-d707d9352289.png)


## Gửi Email với sidekiq
Rails hỗ trợ chúng ta có thể gửi email vào hàng đợi queue của sidekiq bằng việc sử dụng deliver_later
```
UserMailer.send_email(@user).deliver_later
```

# 3.Một số ứng dụng của background job
Một ứng dụng khá phổ biến của background job là export CSV, hay thực hiện gửi thông báo email analysis đến một lượng lớn user của 1 web page. 

VD:
```
class SendAnalyticsEmailJob < ActiveJob::Base
  def perform
    User.need_report_analysis.find_each do |user|
      UserMailer.send_bulk_mail(to: user).deliver_later
    end
  end
end
```

# 4. Tổng kết

Background job giúp ta giải quyết rất nhiều bài toán trong Rails khi phải thực hiện các tác vụ trên server mà không muốn làm giảm trải nghiệm người dùng. Còn rất nhiều ứng dụng của background job. 
Về phía client thì chúng ta có thế sử dụng các background webpage client như: web worker. 
Bài viết còn nhiều thiếu sót mong các bạn góp ý thêm