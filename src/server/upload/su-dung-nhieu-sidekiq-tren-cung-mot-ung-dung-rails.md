Các luồng xử lý của sidekiq được giả định kết nối với 1 redis duy nhất. Bởi vậy khi kết nối ứng dụng đến nhiều redis, số lượng sidekiq cần tương ứng với số lượng redis.
Bài viết này hướng dẫn cài đặt nhiều sidekiq trên cùng một ứng dụng rails một cách ngắn gọn nhất

## config/initializers/sidekiq.rb
```
Sidekiq.configure_server do |config|
  config.redis = { url: "redis://#{ENV.fetch('REDIS_SERVERNAME')}:6379/0", namespace: ENV['REDIS_NAMESPACE'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: "redis://#{ENV.fetch('REDIS_SERVERNAME_1')}:6379/0", namespace: ENV['REDIS_NAMESPACE_1'] }
end
```

Đầu tiên bạn cần hiểu Sidekiq server và sidekiq client là gì?
- client: là nơi gửi các jobs lên và đưa vào hàng đợi (enqueue) (còn gọi là ứng dụng Rails)
- server: là nơi các jobs được lấy ra (dequeue) để xử lý (Sidekiq process)

Sidekiq config luôn bao gồm cả Sidekiq server và Sidekiq client.
Thường thì các sidekiq_server được đặt trên các instance khác nhau, nên cần đặt đúng giá trị của REDIS_SERVERNAME tại các instance này
ví dụ:
- sidekiq_1: 
```
export REDIS_SERVERNAME=redis_1_server_name
export REDIS_NAMESPACE=redis_1_name_space
```

- sidekiq_2: 
```
export REDIS_SERVERNAME=redis_2_server_name
export REDIS_NAMESPACE=redis_2_name_space
```

- rails: 
```
export REDIS_SERVERNAME_1=redis_1_server_name
export REDIS_SERVERNAME_2=redis_2_server_name
export REDIS_NAMESPACE_1=redis_1_name_space
export REDIS_NAMESPACE_2=redis_2_name_space
```

## config/sidekiq.yml
Đây là nơi định nghĩa danh sách các queue được sử dụng trong sidekiq. Với mỗi sidekiq process cần định nghĩa 1 file sidekiq.yml riêng.
ví dụ: `sidekiq.yml` và `sidekiq_1.yml`

```
:verbose: false
:concurrency: 10
:timeout: 10
:queues:
  - sidekiq_queue_1
  - sidekiq_queue_2
  - sidekiq_queue_3
development:
  :verbose: true
staging:
  :concurrency: 5
production:
  :concurrency: 5
```

### Định nghĩa worker cho sidekiq_1
Ứng dụng rails sẽ gọi đến method của worker này để gửi jobs đến sidekiq.

```
class Worker1
    include Sidekiq::Worker
    sidekiq_options queue: :sidekiq_1_queue_1, retry: 5

    def perform(*args)
      # các xử lý của sidekiq process được định nghĩa tại đây
  end
```

### Định nghĩa worker cho sidekiq_2
Đến đây có thể một số bạn sẽ thắc mắc tại sao ở bước 1 ta định nghĩa 2 biến trong rails instance nhưng sidekiq_client lại chỉ sử dụng 1 giá trị.
Lý do là ta có thể chọn 1 sidekiq làm mặc định cho ứng dụng rails. Thường thì sẽ chọn sidekiq nào có nhiều loại queue hơn, và ở `sidekiq_options` ta chỉ cần gọi tên queue ra.
Đối với sidekiq_2, ta cần định nghĩa rằng worker này sử dụng sidekiq nào thông qua class `ConnectionPool`.


```
class Worker2
    include Sidekiq::Worker
   sidekiq_options pool: ConnectionPool.new {
      redis_2 = Redis.new(url: "redis://#{ENV.fetch('REDIS_SERVERNAME_2')}:6379/0")
      Redis::Namespace.new(ENV['REDIS_NAMESPACE_2'], redis: redis_2)
    },queue: :sidekiq_2_queue_1, retry: 5

    def perform(*args)
      # các xử lý của sidekiq process được định nghĩa tại đây
  end
```

## Kết luận
Như vậy, ta đã có thể cấu hình cho ứng dụng rails xử dụng nhiều sidekiq process!
Cảm ơn mọi người đã ghé qua bài viết! Rất mong nhận được sự góp ý từ mọi người.