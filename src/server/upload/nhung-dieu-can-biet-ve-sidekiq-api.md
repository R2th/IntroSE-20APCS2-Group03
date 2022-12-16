**Sidekiq Api**

Sidekiq có API công khai cho phép truy cập thông tin real-time về workers, queues, jobs. Vào lib [sidekiq/api](https://github.com/mperham/sidekiq/blob/master/lib/sidekiq/api.rb) để xem chi tiết hơn.

- Để có thể có quyền truy cập vào tất cả các chức năng của nó (những chức năng bên dưới đây), thì trước hết cần khai báo như sau:

```
require 'sidekiq/api'
```

**Queue**

- get tất cả các queue hiện có:

```
Sidekiq::Queue.all
```

- get một queue bất kỳ:

```
Sidekiq::Queue.new # the "default" queue
Sidekiq::Queue.new("mailer")
```

- get số lượng jobs của một queue bất kỳ:

```
Sidekiq::Queue.new.size # => 4
```
- Khi muốn xóa bỏ tất cả jobs trong một queue thì chỉ cần remove queue đó

```
Sidekiq::Queue.new.clear
```

- Xóa 1 job cụ thể  trong 1 queue cụ thể

```
queue = Sidekiq::Queue.new(queue_name) #queue_name là tên queue tương ứng được khai báo trong file sidekiq.yml

queue.each do |job|
  job.klass # => 'MyWorker'
  job.args # => [1, 2, 3]
  job.delete if job.jid == 'abcdef1234567890'
end
```

- Tính độ trễ (s) của queue(bây giờ - khi job cũ nhất đã được xử lý)

```
Sidekiq::Queue.new.latency
14.5
```

- Tìm job bằng JID (tuy nhiên hãy chú ý cái này sẽ không hiệu quả nếu queue quá lớn)

```
Sidekiq::Queue.new.find_job(somejid)
```

**Named Queues**

- Scheduled

`schedule` sắp xếp một tập các `schedule jobs`  theo thứ tự sắp xếp theo thời gian
```
ss = Sidekiq::ScheduledSet.new
ss.size
ss.clear
```
Cho phép liệt kê các `schedule job` trong Sidekiq. Dựa vào đó, ta có thể search/filter các jobs.


*Ví dụ sau là chọn tất cả các `job` thuộc một loại nhất định và xóa chúng khỏi queue scheduled*
```
r = Sidekiq::ScheduledSet.new
jobs = r.select {|retri| retri.klass == 'SomeWorker' }
jobs.each(&:delete)
```

- Retries

Khi một `job` phát sinh lỗi, Sidekiq đặt nó vào `Retryset` để tự động retry lại. Các `jobs` được sắp xếp dựa trên thời gian retry.

```
rs = Sidekiq::RetrySet.new
rs.size
rs.clear
```

Cho phép liệt kê các lần `retry` rong Sidekiq. Dựa vào đó mà có thể search/filter các jobs. 

*Ví dụ sau là chọn tất cả các `job` thuộc một loại nhất định và xóa chúng khỏi queue retry*

```
query = Sidekiq::RetrySet.new
query.select do |job|
  job.klass == 'Sidekiq::Extensions::DelayedClass' &&
    # For Sidekiq::Extensions (e.g., Foo.delay.bar(*args)),
    # the context is serialized to YAML, and must
    # be deserialized to get to the original args
    ((klass, method, args) = YAML.load(job.args[0])) &&
    klass == User &&
    method == :setup_new_subscriber
end.map(&:delete)
```

- Dead

Giống như `Retryset và `ScheduledSet`, Deadset gồm các jobs được coi như đã "chết". Sidekiq sẽ không retry job nào trong hàng đợi này. Nó hỗ trợ các hoạt động cơ bản giống như những queue khác.

```
ds = Sidekiq::DeadSet.new
ds.size
ds.clear
```

**Processes**

`Sidekiq::ProcessSet` giúp bạn truy cập vào thông tin gần thời gian thực (được cập nhật cứ sau 5 giây một) về tập tiến trình Sidekiq hiện tại đang chạy. Và ta cũng có thể điều khiển các quy trình từ xa :

```
ps = Sidekiq::ProcessSet.new
ps.size # => 2
ps.each do |process|
  p process['busy']     # => 3
  p process['hostname'] # => 'myhost.local'
  p process['pid']      # => 16131
end
ps.each(&:quiet!) # equivalent to the USR1 signal
ps.each(&:stop!) # equivalent to the TERM signal
```

Điều khiển từ xa có thể hữu ích trong các trường hợp tín hiệu không được hỗ trợ: Windows, JRuby và JVM hoặc Heroku...

**Workers**

 `worker` hoạt động hiện tại được thiết lập cho tất cả các tiến trình Sidekiq. Một `worker` được định nghĩa là một luồng hiện đang xử lý một `job`.
Có thể tùy chỉnh các option về queue, retry, backtrace cho một worker.

**Stats**

- Xem số liệu thống kê khác nhau về cài đặt Sidekiq:

```
stats = Sidekiq::Stats.new
=> #<Sidekiq::Stats:0x00000004d00bc0
 @stats=
  {:processed=>221337,
   :failed=>188740,
   :scheduled_size=>0,
   :retry_size=>363,
   :dead_size=>216,
   :processes_size=>0,
   :default_queue_latency=>12282707.394646406,
   :workers_size=>0,
   :enqueued=>403}>
[89] pry(main)> stats.processed # => 100
=> 221337
[90] pry(main)> stats.failed # => 3
=> 188740
[91] pry(main)> stats.queues # => { "default" => 1001, "email" => 50 }
=> {"default"=>235, "critical"=>168, "candidate_import"=>0, "mailers"=>0, "cron_worker"=>0}
```
-  Get số lượng những job ở trong tất cả các hàng đợi (TRỪ hàng đợi retry và scheduled).
```
[92] pry(main)> stats.enqueued
=> 403
```

**Stats History**
Tất cả các date là format UTC và số liệu thống kê lịch sử sẽ bị xóa sau 5 năm.

- Get lịch sử của failed/processed stats

```
s = Sidekiq::Stats::History.new(2)
=> #<Sidekiq::Stats::History:0x0000000a8122c0 @days_previous=2, @start_date=Thu, 21 Feb 2019>
[94] pry(main)> s.failed
=> {"2019/02/21"=>0, "2019/02/20"=>0}
[95] pry(main)> s.processed
=> {"2019/02/21"=>0, "2019/02/20"=>0}
[96] pry(main)> 

```

- reset những job đã được xử lý

```
Sidekiq.redis {|c| c.del('stat:processed') }
```

- reset những job chạy failed

```
Sidekiq.redis {|c| c.del('stat:failed') }
```

- reset thống kê

```
Sidekiq::Stats.new.reset
```

- Ngoài ra, để đặt lại ngày cụ thể trong bảng lịch sử, bạn có thể làm:

```
Sidekiq.redis {|c| c.del('stat:processed:2015-07-02') }
Sidekiq.redis {|c| c.del('stat:failed:2015-07-02') }
```

- nếu có bất kỳ scheduled jobs nào, có thể xóa tất cả các jobs đó bằng lệnh sau:

```
Sidekiq::ScheduledSet.new.clear
```

- Xóa các retry jobs:

```
Sidekiq::RetrySet.new.clear
```

Trên đây là một số những kiến thức liên quan đến Sidekiq API, hi vọng bài viết sẽ hữu ích với mọi người!
Thanks for reading!

Bài viết được dịch từ nguồn [sidekiq api](https://jsarbada.wordpress.com/2016/11/18/sidekiq-api/)