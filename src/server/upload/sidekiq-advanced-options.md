# 1. The Sidekiq Configuration File
File config sidekiq là 1 file YAML, sidekiq server sử dụng nó để tự cấu hình. Mặc định được đặt ở `config/sidekiq.yml`.
Nó chỉ cần thiết nếu bạn muốn có những cài đặt nâng cao, ví dụ như cài đặt`concurrency size`, khi có queue có tên khác `default` ...

```
---
:concurrency: 5
staging:
  :concurrency: 10
production:
  :concurrency: 20
:queues:
  - critical
  - default
  - low
```

Với cài đặt riêng cho từng môi trường, thì các cài đặt này sẽ ghi đè lên thông số mặc định ban đầu. Trong ví dụ trên thì concurrency size trên staging sẽ là 10, chứ không phải 5, tương tự trên production sẽ là 20.

Nếu bạn không để file config ở dạng mặc định thì khi chạy sidekiq cần thêm flag -c để chỉ định đường dần file:

```
sidekiq -C config/myapp_sidekiq.yml
```

Các tùy chọn được truyền trên dòng lệnh cũng sẽ ghi đè các tùy chọn trong file config.

# 2. Queues

Mặc định sidekiq sử dụng một queue gọi là `default` trong Redis. Nếu bạn muốn sử dụng nhiều queue, bạn có thể chỉ định chúng trong tham số truyền vào khi khởi động sidekiq hoặc sửa trong file config. Mỗi queue có thể chỉ định trọng số. Queue có trọng số bằng 2 sẽ được check nhiều lần gấp đôi queue có trọng số bằng 1. 

Tham số:
```
sidekiq -q critical,2 -q default
```

File config:
```
# ...
:queues:
  - [critical, 2]
  - default
```

Nếu bạn muốn queue luôn được xử lý theo một thứ tự cụ thể thì chỉ cần khai báo chúng theo thứ tự mà không cần trọng số.

Tham số:
```
sidekiq -q critical -q default -q low
```

File config:
```
# ...
:queues:
  - critical
  - default
  - low
```

Nếu muốn các queue có độ ưu tiên ngẫu nhiên thì có thể khai báo tên queue kèm tất cả các trọng số đều là 1.
```
# ...
:queues:
  - ["foo", 1]
  - ["bar", 1]
  - ["xyzzy", 1]
```

Tên của queue có thể chỉ định trong worker:
```
class ImportantWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical'

  def perform(*important_args)
    puts "Doing critical work"
  end
end
```

### Reserved Queues

Nếu bạn muốn dành riêng một queue để xử lý một việc nhất định, cách đơn giản nhất là chạy 2 sidekiq riêng rẽ, mỗi cái xử lý một hàng đợi khác nhau:

```
sidekiq -q critical # Only handles jobs on the "critical" queue
sidekiq -q default -q low # Handles the other jobs
```

# 3. Workers

Sidekiq có các options sau cho worker:
- queue: sử dụng hàng đợi có tên cho worker này, mặc định là `default`.
- retry: kích hoạt RetryJobs cho worker này, mặc định là `true`.
- backtrace: dùng để lưu lại lỗi khi retry để hiển thị trên giao diện web, có thể là `true`, `false`, hoặc là 1 số  integer để chỉ định số dòng được save. Mặc định là `false`.

```
class HardWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :crawler, :retry => false, :backtrace => true
  
  def perform(name, count)
  end
end
```

Các options của worker có thể set bằng `Sidekiq.default_worker_options=`
```
Sidekiq.default_worker_options = { 'backtrace' => true }
```

Hoặc cũng có thể ghi đè ghi gọi worker đó:
```
HardWorker.set(:queue => :critical).perform_async(name, count)
```

# 4. Concurrency

Bạn có thể  điều chỉnh số  luồng đồng thời trong sidekiq của bạn. Mặc định thì sẽ một tiến trình sidekiq sẽ có 10 luồng. Bạn có thể điều chỉnh nó lên hoặc xuống:
```
sidekiq -c 5
```

Lưu ý không đặt số luồng lớn hơn 50, vì đã có lỗi xảy ra khi chạy cùng lúc 100 luồng.


### Nguồn
https://github.com/mperham/sidekiq/wiki/Advanced-Options