Sidekiq là framework để thực hiện các background job được sử dụng rất nhiều trong các rails app hiện nay. Trong bài viết này tôi sẽ giới thiệu một vài vấn đề về xử lý lỗi trong sidekiq.

## 1. Best Practices

- Sử dụng một dịch vụ báo lỗi - Honeybadger, Airbrake, Rollbar, BugSnag, Sentry, Exceptiontrap, Raygun ... Chúng khá giống nhau về tính năng và giá cả, chỉ cần chọn một loại và sử dụng. Nó sẽ gửi mail mỗi khi một job nào đấy bị lỗi (hoặc thông minh hơn giống như Honeybadger, sẽ gửi mail vào các lần lỗi thứ 1, 3 và 10 để không làm quá tải hòm thư của bạn nếu có đến 1000 job lỗi)
- Hãy để Sidekiq bắt được lỗi do job của bạn gây ra. Cơ chế retry tích hợp trong Sidekiq sẽ bắt lỗi và retry chúng thường xuyên. Dịch vụ báo lỗi sẽ thông báo cho bạn lỗi đó. Bạn cần sửa và deploy lại, sau đó Sidekiq sẽ retry thành công job của bạn.
- Nếu bạn không fix kịp bug trước 25 lần retry của job (trong khoảng 21 ngày), Sidekiq sẽ dừng retry và đẩy job đó vào Dead Job Queue. Bạn có thể retry lại job đó bằng tay qua giao diện web của Sidekiq trong vòng 6 tháng tiếp theo.
- Sau 6 tháng, những job lỗi đó sẽ bị xóa.

## 2. Error Handlers

Sử dụng gem của dịch vụ báo lỗi đính kém với trình xử lý lỗi global của Sidekiq để chúng được thông báo bất cứ lúc nào có lỗi trong Sidekiq. Dịch vụ bào lỗi nên cung cấp tích hợp tự động bằng cách cài gem của họ trong Gemfile trong ứng dụng của bạn.

Bạn có thể tạo trình xử lý lỗi của riêng mình bằng cách cung cấp phản hồi kiểu: `call(exception, context_hash)` :

```Ruby
Sidekiq.configure_server do |config|
  config.error_handlers << Proc.new {|ex,ctx_hash| MyErrorService.notify(ex, ctx_hash) }
end
```

Lưu ý là các trình xử lý lỗi chỉ liên quan đến máy Sidekiq Server. Chúng không hoạt động trong Rails Console.

## 3. Backtrace Logging

Khi bật backtrace logging cho job thì quá trình ghi log sẽ duy trì suốt dòng đời của job. 
Đặc biệt cẩn thận vì `backtraces` có thể ngốn 1-4k bộ nhớ Redis. Với mỗi lượng lớn các job lỗi, con số này lại tăng lên đáng kể.

```Ruby
sidekiq_options backtrace: true
```

Bạn nên sử dụng thận trọng khi bật backtrace bằng cách giới hạn số dòng log, hoặc sử  dụng dịch vụ báo lỗi để theo dõi lỗi và backtrace liên quan.

```Ruby
sidekiq_options backtrace: 20 # top 20 lines
```

## 4. Automatic job retry

Sidekiq sẽ tự retry với thời gian theo công thức: `(retry_count ** 4) + 15 + (rand(30) * (retry_count + 1))`
Nó sẽ retry 25 lần trong khoảng 21 ngày. Giả sử bạn fix bug và deploy lại trong thời gian đó thì job sẽ được retry thành công. Sau 25 lần, Sidekiq sẽ tự chuyển job lỗi về  Dead Job queue. Khi đó cần thao tác thủ công để tác động vào job đó.

Số lần thử lại tối đá được cấu hình toàn cục bằng cách thêm vào file `sidekiq.yml`: 
```
max_retries: 1
```

Dưới đây là bàng thời gian chờ gần đúng (hàm `rand(30)` luôn trả về 15)

```
 # | Next retry backoff | Total waiting time
 -------------------------------------------
 1 |     0d  0h  0m 30s |     0d  0h  0m 30s
 2 |     0d  0h  0m 46s |     0d  0h  1m 16s
 3 |     0d  0h  1m 16s |     0d  0h  2m 32s
 4 |     0d  0h  2m 36s |     0d  0h  5m  8s
 5 |     0d  0h  5m 46s |     0d  0h 10m 54s
 6 |     0d  0h 12m 10s |     0d  0h 23m  4s
 7 |     0d  0h 23m 36s |     0d  0h 46m 40s
 8 |     0d  0h 42m 16s |     0d  1h 28m 56s
 9 |     0d  1h 10m 46s |     0d  2h 39m 42s
10 |     0d  1h 52m  6s |     0d  4h 31m 48s
11 |     0d  2h 49m 40s |     0d  7h 21m 28s
12 |     0d  4h  7m 16s |     0d 11h 28m 44s
13 |     0d  5h 49m  6s |     0d 17h 17m 50s
14 |     0d  7h 59m 46s |     1d  1h 17m 36s
15 |     0d 10h 44m 16s |     1d 12h  1m 52s
16 |     0d 14h  8m  0s |     2d  2h  9m 52s
17 |     0d 18h 16m 46s |     2d 20h 26m 38s
18 |     0d 23h 16m 46s |     3d 19h 43m 24s
19 |     1d  5h 14m 36s |     5d  0h 58m  0s
20 |     1d 12h 17m 16s |     6d 13h 15m 16s
21 |     1d 20h 32m 10s |     8d  9h 47m 26s
22 |     2d  6h  7m  6s |    10d 15h 54m 32s
23 |     2d 17h 10m 16s |    13d  9h  4m 48s
24 |     3d  5h 50m 16s |    16d 14h 55m  4s
25 |     3d 20h 16m  6s |    20d 11h 11m 10s
```

## 5. Web UI

Giao diện người dùng của Sidekiq có 2 tab "Retries" và "Dead" liệt kê các job fail và cho phép bạn chạy chúng, kiểm tra hoặc xóa chúng.

## 6. Dead Job Queue

Dead Job Queue giữ các job fail sau khi chạy tất cả các lần retry. Sidekiq sẽ không retry các job này nữa, nếu muốn bạn có thể tự retry bằng tay trên Web UI. Để tránh trường hợp lưu vô hạn trong Dead Job Queue thì chỉ có tối đa 10000 job được lưu lại và các job lỗi quá 6 tháng sẽ bị xóa.
Chỉ những job được config với số lần retry là 0 hoặc lớn hơn thì khi lỗi và hết số lần retry mới dc chuyển vào Dead Job Queue.
Nếu config `:retry => false`, job này chỉ thực hiện đúng 1 lần dù có lỗi gì xảy ra.

## 7. Configuration

Nếu thấy 25 lần retry là quá nhiều, bạn có thể  chỉ định một số khác:

```Ruby
class LessRetryableWorker
  include Sidekiq::Worker
  sidekiq_options :retry => 5 # Only five retries and then to the Dead Job Queue

  def perform(...)
  end
end
```

Hoặc bạn có thể disable luôn việc retry (đồng nghĩa với việc job đó có lỗi thì cũng không được chuyển vào 
Dead Job Queue):

```Ruby
class NonRetryableWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false # job will be discarded immediately if failed

  def perform(...)
  end
end
```

Hoặc có thể  vừa config số lẫn retry nhưng không muốn chuyển vào Dead Job Queue khi retry hết số lượt:

```Ruby
class NoDeathWorker
  include Sidekiq::Worker
  sidekiq_options :retry => 5, :dead => false

  def perform(...)
  end
end
```

Độ trể của các lần retry cũng có thể  tùy chỉnh được:

```Ruby
class WorkerWithCustomRetry
  include Sidekiq::Worker
  sidekiq_options :retry => 5

  # The current retry count is yielded. The return value of the block must be 
  # an integer. It is used as the delay, in seconds. A return value of nil will
  # use the default.
  sidekiq_retry_in do |count|
    10 * (count + 1) # (i.e. 10, 20, 30, 40, 50)
  end

  def perform(...)
  end
end
```

Khi chạy hết số lần retry, Sidekiq sẽ họi hàm `sidekiq_retries_exhausted` nếu bạn có định nghĩa sẵn.

```Ruby
class FailingWorker
  include Sidekiq::Worker

  sidekiq_retries_exhausted do |msg, ex|
    Sidekiq.logger.warn "Failed #{msg['class']} with #{msg['args']}: #{msg['error_message']}"
  end
  
  def perform(*args)
    raise "or I don't work"
  end
end
```

## 8. Death Notification

Hàm `sidekiq_retries_exhausted` dành riêng cho class Worker. Bắt đầu từ bản 5.1, Sidekiq sẽ kích hoạt callback toàn cục khi có job die:

```
# this goes in your initializer
Sidekiq.configure_server do |config|
  config.death_handlers << ->(job, ex) do
    puts "Uh oh, #{job['class']} #{job["jid"]} just died with error #{ex.message}."
  end
end
```

Với callback này bạn có thể gửi email hay tin nhắn thông báo khi có lỗi.

## Nguồn
https://github.com/mperham/sidekiq/wiki/Error-Handling