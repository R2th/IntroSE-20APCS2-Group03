Sidekiq cung cấp API để chúng ta có thể thao tác trực tiếp với worker, queue và job.
Để sử dụng API ta cần thêm điều kiện:

```
require 'sidekiq/api'
```

Bất cứ chức năng nào trên giao diện Web đều có thể thực hiện bằng API.

# 1. Queue
Lấy tất cả queue:
```
Sidekiq::Queue.all
```

Lấy 1 queue cụ thể:
```
Sidekiq::Queue.new # the "default" queue
Sidekiq::Queue.new("mailer")
```

Xem số lượng job của 1 queue:
```
Sidekiq::Queue.new.size # => 4
```

Xóa tất cả job trong queue bằng cách xóa queue:
```
Sidekiq::Queue.new.clear
```

Xóa job trong queue `mailer` với `jid` là `abcdef1234567890`
```
queue = Sidekiq::Queue.new("mailer")
queue.each do |job|
  job.klass # => 'MyWorker'
  job.args # => [1, 2, 3]
  job.delete if job.jid == 'abcdef1234567890'
end
```

Tính độ trễ  (đơn vị giây) của queue (tính từ thời điểm hiện tại đến khi job cuối cùng dc enqueued):
```
> Sidekiq::Queue.new.latency
14.5
```

Tìm kiếm job theo JID (Chú ý: không khả quan khi queue quá lớn)
```
> Sidekiq::Queue.new.find_job(somejid)
```

# 2. Named Queues

## 2.1 Scheduled

Xem số lượng hoặc clear scheduled:
```
ss = Sidekiq::ScheduledSet.new
ss.size
ss.clear
```

Có thể dựa vào các thông tin cụ thể để xác định tìm kiếm hoặc lọc job, ví dụ như tên class, sau đó có thể thao tác với những job đó:
```
ss = Sidekiq::ScheduledSet.new
jobs = ss.select {|retri| retri.klass == 'SomeWorker' }
jobs.each(&:delete)
```

## 2.2 Retries

Khi một job gặp lỗi, sidekiq sẽ đặt nó vào RetrySet để tự động thực hiện lại. Những job này sẽ được sắp xếp theo thời gian mà nó retry ở lần kế tiếp:
```
rs = Sidekiq::RetrySet.new
rs.size
rs.clear
```

Cũng tùy vào các thông tin cụ thể của job ấy mà ta có thể tìm kiếm hoặc lọc job, rồi thao tác với job đó:
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

## 2.3 Dead
Giống với RetrySet và ScheduledSet, DeadSet lưu trữ những job đã chết, xếp theo thời gian mà nó chết. Cũng có những action cơ bản như các Set khác:
```
ds = Sidekiq::DeadSet.new
ds.size
ds.clear
```

# 3. Processes
Sidekiq::ProcessSet giúp bạn truy cập vào thông tin các job đang chạy theo thời gian gần thực (cập nhật sau mỗi 5 giây).
```
ps = Sidekiq::ProcessSet.new
ps.size # => 2
ps.each do |process|
  p process['busy']     # => 3
  p process['hostname'] # => 'myhost.local'
  p process['pid']      # => 16131
end
ps.each(&:quiet!) # equivalent to the TSTP signal (USR1 for version < 5)
ps.each(&:stop!) # equivalent to the TERM signal
```

# 4. Worker
Worker được định nghĩa là 1 thread đang xử lý các job hiện tại.

```
workers = Sidekiq::Workers.new
workers.size # => 2
workers.each do |process_id, thread_id, work|
  # process_id is a unique identifier per Sidekiq process
  # thread_id is a unique identifier per thread
  # work is a Hash which looks like:
  # { 'queue' => name, 'run_at' => timestamp, 'payload' => msg }
  # run_at is an epoch Integer.
  # payload is a Hash which looks like:
  # { 'retry' => true,
  #   'queue' => 'default',
  #   'class' => 'Redacted',
  #   'args' => [1, 2, 'foo'],
  #   'jid' => '80b1e7e46381a20c0c567285',
  #   'enqueued_at' => 1427811033.2067106 }
end
```

# 5. Stats
Thông tin các số liệu thống kê về Sidekiq:
```
stats = Sidekiq::Stats.new
stats.processed # => 100
stats.failed # => 3
stats.queues # => { "default" => 1001, "email" => 50 }
```

Số lượng job được enqueued trong tất cả các queue:
```
stats.enqueued # => 5 
```

# 6. Stats History
Tất cả các giờ theo UTC, và các thông kê sẽ bị xóa sau 5 năm.
Lấy lịch sử thông kê các job failed/processed:
```
s = Sidekiq::Stats::History.new(2) # Chỉ định bao nhiêu ngày trở về trước tính từ hôm nay (ví dụ hôm nay là "2012-12-05")
s.failed # => { "2012-12-05" => 120, "2012-12-04" => 234 }
s.processed # => { "2012-12-05" => 1010, "2012-12-04" => 1500 }
```

Chỉ định từ 1 ngày cụ thể:
```
s = Sidekiq::Stats::History.new( 3, Date.parse("2012-12-3") )
s.failed # => { "2012-12-03" => 10, "2012-12-02" => 24, "2012-12-01" => 4 }
s.processed # => { "2012-12-03" => 124, "2012-12-02" => 345, "2012-12-01" => 355 }
```

# Nguồn

https://github.com/mperham/sidekiq/wiki/API#retries