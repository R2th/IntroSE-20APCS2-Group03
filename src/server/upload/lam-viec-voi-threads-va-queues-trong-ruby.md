[Threads](https://ruby-doc.org/core/Thread.html) được ruby implementation nhằm phục vụ cho các chương trình đồng thời ([concurrent programming](https://en.wikipedia.org/wiki/Concurrent_computing)). Threads tồn tại trong một tiến trình của hệ điều hành và có quyền truy cập vào bộ nhớ của nó. Và trên thực tế bất kỳ đoạn mã nào được viết bới ruby đều được thực thi bới một luồng hay còn gọi là luồng chính (main thread).

Threads rất hữu ích cho các đoạn mã có thể được thực thi độc lập, đặc biệt là khi đoạn mã dành thời gian chờ đợi các sự kiện từ bên ngoài. Loại tình huống này xảy ra khi bạn xử lý với các thao tác vào và ra (I / O).

Ta có một ví dụ sau đây:

Ta có một lớp **Worker**:

```
class Worker
end
```
    
Mục đích của Worker này là để làm một việc gì đó, nhưng điều làm nó trở lên hữu ích rất nhiều đó là nó có thể thực hiện trong một thread riêng biệt hay có thể là nhiều thread.
    
```
class Worker
  attr_reader :num_threads, :threads
  private :threads
  
  def initialize(num_threads:)
    @num_threads = num_threads
    @threads = []
  end
  
  def spawn_threads
    num_threads.times do
      threads << Thread.new do
        # there will be work that the worker performs
      end
    end
  end
end
```
Vì các thread rất hữu ích cho các hoạt động I / O nặng, con Worker này hoàn hảo để thực hiện các yêu cầu **HTTP**, thao tác với các tệp trên đĩa hay tạo các DB request. Ta có thể ví dụ về luồng hoạt động như sau:

"Này, woker! Hãy gửi dữ liệu này tới API và tìm nạp một số dữ liệu từ một API khác, sau khi lưu một số dữ liệu đó vào cơ sở dữ liệu của tôi và đừng quên lưu tất cả những gì bạn đã thực hiện vào một tệp log" - đây là một công việc hoàn hảo cho worker.

Vậy làm thế nào ta có thể giao việc cho worker. Điều này thật đơn giản nếu bạn phải thực hiện một nhiệm vụ đơn điệu nhiều lần:

```
class Worker
  # rest of the class omitted
  def spawn_threads
    num_threads.times do
      threads << Thread.new do
        HealthService::API.ping # send a HTTP request
      end
    end
  end
end
```

Nhưng nếu bạn cần thực hiện nhiều loại công việc khác nhau tùy thuộc bối cảnh bên ngoài, thì lúc đó ta có thể sử dụng [Queues](https://ruby-doc.org/core/Queue.html) để giải quyết vấn đề này.

```
class Worker
  def initialize(num_threads:)
    @num_threads = num_threads
    @threads = []
    @queue = Queue.new
  end
  # rest of the class omitted
  
  def enqueue(action, payload)
    queue.push([action, payload])
  end
end
```

Với phương thức Worker#enqueue, giờ đây ta có thể chuyển công việc cho Worker. Điều này có thể được thực hiện bằng nhiều cách. Ví dụ: action có thể là một Proc và payload có thể là đối số cho Proc.

```
require "net/http"
require "json"
action = proc do |data|
  Net::HTTP.post(
    URI("https://api.some-ping-service.com"),
    data.to_json,
    "Content-Type" => "applicatoin/json",
  )
end
worker_instance.enqueue(action, { ok: true })
```

Điều tuyệt vời khi triển khai Queues với ruby là bản chất chúng an toàn cho chuỗi các thread được triển khai.

Để thực hiện các hành động vào Worker mà không tiêu tốn tất cả tài nguyên CPU, chúng ta cần sắp xếp thuật toán dequeue - xóa job khỏi hàng đợi một cách thông minh, hiệu quả. Chẳng hạn, ta có ví dụ sau:

```
queue = Queue.new
loop do
  puts "we need dequeue actions and do some job" unless queue.empty?
end
```

Một vòng lặp như trên sẽ ăn hết thời gian CPU miễn phí của bạn. Khi ta kiểm tra các tiến trình trên máy, sẽ được kết quả sau:

```
$ top -o cpu
PID    COMMAND      %CPU  TIME
56681  ruby         99.9  01:58.17
```

Các tiếp cận phổ biến nhất để giải quyết vấn đề này là sử dụng `sleep`:

```
queue = Queue.new
loop do
  puts "we need dequeue actions and do some job" unless queue.empty?
  sleep 5
end
```

Điều này có ích nhưng không phải là hoàn hảo. Hãy tưởng tượng làm thế nào trình thông dịch Ruby phải dành thời gian để chuyển đổi giữa luồng chính và luồng xử lý công việc trong mỗi khoảng thời gian ngủ để nhận ra rằng chúng ta không có gì để làm vì hàng đợi worker rỗng. Vấn đề này sẽ được nhân lên bởi một số chủ đề và trở nên tồi tệ hơn khi khoảng thời gian ngủ phải trở nên nhỏ hơn. `Sleep` không phải là một cách hiệu quả để nắm bắt điều gì đó trong tương lai.

Và một lần nữa, Queues lại được sử dụng để giải quyết:

Phương thức `Queue#pop(non_block = false)`, khi mà `non_block = false`, sẽ tạm dừng luồng hiện tại nếu hàng đợi trống cho đến khi dữ liệu được đẩy lên hàng đợi. Điều này có nghĩa là luồng worker không có gì để làm sẽ chờ đợi hành động tiếp theo. Không cần sleep.

Và để thuận tiện Worker có các phương thức cụ thể mô tả trạng thái của nó:
```
class Worker
  # rest of the class omitted
  private
  attr_reader :queue, :threads
  def actions?
    !queue.empty?
  end
  def running?
    !queue.closed?
  end
  def dequeue_action
    queue.pop(true)
  end
  def wait_for_action
    queue.pop(false)
  end
end
```

Ta hãy để ý đến phương thức `wait_for_action`. Nó đình chỉ một luồng của Worker, như được mô tả ở trên, khi chúng tôi không có hành động nào trong hàng đợi. 

Cuối cùng, đã đến lúc cho phần chính của lớp Worker:
```
class Worker
  # rest of the class omitted
  def spawn_threads
    num_threads.times do
      threads << Thread.new do
        while running? || actions?
          action_proc, action_payload = wait_for_action
          action_proc.call(action_payload) if action_proc
        end
      end
    end
  end
  # rest of the class omitted
end
```

Với #`wait_for_action` tương đương với queue.pop (false), worker sẽ bắt đầu thoát hàng đợi chính xác khi hàng đợi bắt đầu bị lấp đầy.

Điều cuối cùng. Worker cần có một phương pháp để ngăn chặn nó
```
class Worker
  # rest of the class omitted
  def stop
    queue.close
    threads.each(&:exit)
    threads.clear
    true
  end
  # rest of the class omitted
end
```

Như vậy mình vừa giới thiệu cho các bạn về threads và queues trong ruby và một số lưu ý khi làm việc với nó. 
## Tài liệu tham khảo
https://medium.com/@shvetsovdm/playing-with-ruby-threads-and-queues-52beb6e8613c