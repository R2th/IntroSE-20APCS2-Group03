Sidekiq cung cấp một bộ public API rất hữu ích cho người dùng để có thể truy cập real-time vào các workers, queues, jobs.

## Usage

Để sử dụng Sidekiq API ta cần phải require nó.
```
require 'sidekiq/api'
```

## Jobs

Sidekiq lưu trữ job dưới dạng JSON:

```
> SecretWorker.perform_async("foo", 123)
=> "1704fc9272746d0cba87c2f6"

> job = Sidekiq::Queue.new.first
=> #<Sidekiq::Job:0x00007fb30d0c8060 ...>

> job.value
=> "{\"class\":\"SecretWorker\",\"args\":[\"foo\",\"BAhTOhFTaWRla2lxOjpFbmMKOgZjSSIQYWVzLTI1Ni1nY20GOgZFVDoIdGFnIhWZI9cHOalTr475-9lIS0dyOgdpdiIRxcn72zsyzUnxDwh8OgZ2aQY6CWJsb2IiCnCz22JV\"],\"retry\":true,\"queue\":\"default\",\"encrypt\":true,\"jid\":\"1704fc9272746d0cba87c2f6\",\"created_at\":1618777117.251842,\"enqueued_at\":1618777117.253449}"

> pp JSON.parse(job.value)
{"class"=>"SecretWorker",
 "args"=>
  ["foo",
   "BAhTOhFTaWRla2lxOjpFbmMKOgZjSSIQYWVzLTI1Ni1nY20GOgZFVDoIdGFnIhVCXh1SNPysah7H0QcQNjKaOgdpdiIRd-Llb2KCN3xRuqaROgZ2aQY6CWJsb2IiCjPNio3T"],
 "retry"=>true,
 "queue"=>"default",
 "encrypt"=>true,
 "jid"=>"b3701748f571ccf97560e617",
 "created_at"=>1618777253.048657,
 "enqueued_at"=>1618777253.048795}
```

Chú ý rằng: 
* job đã được đẩy đến hàng đợi default. Khi chúng ta gọi Sidekiq :: Queue.new nó trỏ đến hàng đợi default. Sidekiq :: Queue.new ("critial") sẽ mở hàng đợi critial.
* Chúng ta có thể gọi first vì Sidekiq :: Queue là Enumerable.

## Stats

Stats cung cấp các API để lấy thông tin thống kê trạng thái cho các job.
Các api:
```
stats = Sidekiq::Stats.new
stats.processed # lấy số lượng job đã được xử lý => 100
stats.failed # lấy số lượng job bị failed => 3
stats.queues # lấy ra tất cả queues hiện có => { "default" => 1001, "email" => 50 }
stats.enqueued # lấy ra số lượng job đã được enqueued => 3
...
```
Để lấy nhanh thông tin Stats ta có thể sử dụng fetch_stats_fast!
data trả về sẽ có dạng:
```
    {
        processed: 10,
        failed: 3,
        scheduled_size: 30,
        retry_size: 5,
        dead_size: 3,
        processes_size: 5,

        default_queue_latency: 0
   }
```

## Queues

Queues bao gồm danh sách các job đã sẵn sàng để chạy. Sidekiq :: Queue.all sẽ lấy ra danh sách tất cả queues trong Redis. Với queues bạn có thể biết size, latency của chúng, xóa queue và tìm một job của queue đó bằng JID. Redis không có bất kỳ cách hiệu quả nào để đánh index cho queue vì vậy việc tìm kiếm trong queue giống như bạn tìm kiểm qua tất cả các bảng trong database.
Các API:
```
Sidekiq :: Queue.all # sẽ lấy ra danh sách tất cả các queues trong Redis.
queues = Sidekiq :: Queue.new
queues.size # lấy số lượng job trong queues
queues.find_job(jid) # tìm một job ở trong list queues.
...
```

## ScheduledSet

ScheduledSet chứa tất cả các job đã được lên lịch, sắp xếp thứ tự theo thời gian. giống như với queues bạn có thể lấy thông tin size, tìm một job, xóa một hoặc toàn bộ job trong ScheduledSet đó. Các API:
```
ss = Sidekiq::ScheduledSet.new
ss.size # lấy số lượng job trong ScheduledSet
ss.clear # clear toàn bộ job đã được lập lịch
job = ss.find_job(jid) # tìm một job.
ss.delete_by_jid(time, jid) # delete một job
```

Ngoài ra với reschedule(at) bạn có thể thay đổi thời gian thực hiện cho job.
```
job = ss.find_job(jid) # tìm một job trong ScheduledSet.
job.reschedule(at_time)
```

Notes: Lưu ý rằng find_job sẽ không hiệu quả nếu số lượng job quá lớn.

## RetrySet

Khi một job bị lỗi Sidekiq sẽ đặt nó vào RetrySet để tự động retry lại sau. Job được sắp xếp dựa trên thời điểm chúng được thử lại lần sau. Các API:
```
retry_set = Sidekiq::RetrySet.new
retry_set.retry_all # retry tất các các job hiện tại trong retry_set.
retry_set.kill_all # kill tất cả các job hiện tai trong retry_set
```

## DeadSet

Chứa các job được xem như đã chết, sắp xếp theo thời gian job đó chết. DeadSet cũng có các action lấy ra size và clear job giống RetrySet, ScheduledSet...
```
ds = Sidekiq::DeadSet.new
ds.size
ds.clear
```
Ngoài ra DeadSet còn một số api khác như:
```
Sidekiq::DeadSet.new.retry_all # retry all job đã chết.
Sidekiq::DeadSet.max_jobs # lấy ra số lượng max jobs mà DeadSet lưu.
Sidekiq::DeadSet.timeout # get thời gian timeout cho job trong DeadSet
```

## TỔNG KẾT
   Trên đây là một số API mình thấy hữu ích trong khi làm việc với sidekiq. Ngoài ra các bạn có thể tham khảo các API khác [ở đây](https://github.com/mperham/sidekiq/blob/master/lib/sidekiq/api.rb).
   
##  THAM KHẢO
https://www.mikeperham.com/2021/04/20/a-tour-of-the-sidekiq-api/