## I. Giới thiệu tổng quan
   Như các bạn đã biết, hiện nay việc sử dụng Background Job khá là phổ biến trong tất cả dự án, nó mang lại hiệu quả tốt về phía mặt người dùng. Có khá là nhiều thư viện hỗ trợ việc xử lí Background Job như Delayed Job, Sidekiq và như bài viết này là Resque. Đối với Sidekiq và Resque thì bạn sẽ bắt buộc phải cài đặt Redis. Vậy Redis là gì, Redis bạn có thể hiểu nó là một CSDL NoSQL, nó hỗ trợ lưu các Job vào Redis, và các Worker sẽ lấy các Job này ra để xử lí. Về cơ bản mỗi Background Job sẽ có những ưu nhược điểm riêng, ở bài viết này mình sẽ tập trung nói về cách thức hoạt động, các giao tiếp giữa Resque-Redis, các Worker nó lấy job xử lí như thế nào. Bây giờ mình sẽ đi vào chi tiết cách push và pop 1 job.

## II. Push Job
Tạo một đoạn job là UserMailWorker
```
class UserMailWorker
  @queue = :send_mail

  def self.perform params = {}
    ApiMailer.send(params.symbolize_keys).deliver_now
  end
end
```

Đây là 1 đoạn job khá cơ bản xử lí việc gửi email đến cho người dùng, ở đây sẽ tạo ra biến instance là @queue, để báo với các Worker rằng khi nào cần cứ vào queue `:send_mail` để kiểm tra xem có job nào đang thực thi hay không. 
Để có thể thực thi đoạn job trên thường mình sẽ sử dụng câu lệnh sau `Resque.enqueue(UserMailWorker, params)` Bây giờ mình sẽ xem hàm `enqueue` của Resque nó làm gì nhé

```
lib/resque.rb

def enqueue(klass, *args)
    enqueue_to(queue_from_class(klass), klass, *args)
end
```

Có vẻ chưa có gì cả nhỉ, tiếp tục với `enqueue_to(queue_from_class(klass), klass, *args)`

```
def enqueue_to(queue, klass, *args)
    # Perform before_enqueue hooks. Don't perform enqueue if any hook returns false
    before_hooks = Plugin.before_enqueue_hooks(klass).collect do |hook|
      klass.send(hook, *args)
    end
    return nil if before_hooks.any? { |result| result == false }

    Job.create(queue, klass, *args)

    Plugin.after_enqueue_hooks(klass).each do |hook|
      klass.send(hook, *args)
    end

    return true
end
```

OK! nhìn thì khá lằng nhằng, tuy nhiên mình không cần hiểu hết đâu, sẽ tập trung vào `Job.create(queue, klass, *args)` Ở đây chúng ta sẽ xem thằng Job đang làm gì với hàm **create** này nhé

```
lib/resque/job.rb

def self.create(queue, klass, *args)
      Resque.validate(klass, queue)

      if Resque.inline?
        # Instantiating a Resque::Job and calling perform on it so callbacks run
        # decode(encode(args)) to ensure that args are normalized in the same manner as a non-inline job
        new(:inline, {'class' => klass, 'args' => decode(encode(args))}).perform
      else
        Resque.push(queue, :class => klass.to_s, :args => args)
      end
end
```

Ở đây ta sẽ thấy có đoạn xử lí `Resque.push(queue, :class => klass.to_s, :args => args)`, sau khi nhìn đoạn code này các bạn cũng hiểu rồi phải không, đây chính là cách Resque push job thông qua hàng đợi `queue` Giờ chúng ta tiếp tục kiểm tra hàm **push** của Resque nhé

```
lib/resque.rb

def push(queue, item)
    data_store.push_to_queue(queue,encode(item))
  end
```

Oài, lại gọi qua thằng data_store =)) Tiếp tục đi tìm ẩn số nào. Tuy nhiên các bạn luôn nhớ mỗi lần push job vào Redis thì Resque luôn encode giá trị nhé

```
lib/resuqe/data_store.rb

def push_to_queue(queue,encoded_item)
    @redis.pipelined do
      watch_queue(queue)
      @redis.rpush redis_key_for_queue(queue), encoded_item
    end
end
```
Ở đây Redis sẽ sử dụng `rpush` để đẩy job vào trong Redis, để hiểu rpush là gì các bạn có thể tham khảo https://viblo.asia/p/redis-data-types-and-commands-ZK1ov1n1R5b9
Vậy là sau khi đến đây là mình đã hiểu về cơ chế việc push job vào Redis, tiếp theo chúng ta sẽ tìm hiểu các lấy job ra để thực thi

## III. Pop Job 

Như bạn đã thấy, khi có một Job được tạo, thì Job này sẽ được Resque đẩy vào Redis thông qua 1 hàng đợi nào đó. Tiếp theo các worker cứ 5s sẽ vào check hàng đợi này một lần để kiếm tra có job nào đang cần xử lí hay không, nếu có sẽ lấy ra, còn không thì sẽ skip. Đây là đoạn log hiển thị sau mỗi 5s:
```
D, [2020-10-20T15:14:17.652536 #21501] DEBUG -- : Checking create_notification
D, [2020-10-20T15:14:17.653048 #21501] DEBUG -- : Checking create_user_notification
D, [2020-10-20T15:14:17.654848 #21501] DEBUG -- : Checking db_user_notification
D, [2020-10-20T15:14:17.655374 #21501] DEBUG -- : Checking push_notification
D, [2020-10-20T15:14:17.655796 #21501] DEBUG -- : Checking queue:create_user_notification
D, [2020-10-20T15:14:17.711380 #21501] DEBUG -- : Checking register_user
D, [2020-10-20T15:14:17.711591 #21501] DEBUG -- : Checking send_mail
D, [2020-10-20T15:14:17.711930 #21501] DEBUG -- : Checking send_mail_reset_pw
D, [2020-10-20T15:14:17.712064 #21501] DEBUG -- : Checking update_user_notification
D, [2020-10-20T15:14:17.712240 #21501] DEBUG -- : Sleeping for 5.0 seconds
D, [2020-10-20T15:14:17.712456 #21501] DEBUG -- : resque-1.27.4: Waiting for create_notification,create_user_notification,
db_user_notification,push_notification, queue:create_user_notification,register_user,send_mail,send_mail_reset_pw,
update_user_notification
```
Bây giờ mình sẽ đi vào chi tiết đoạn xử lí để lấy job. Đầu tiên Resque sẽ có 1 method để thực thi viết check các queue mỗi 5s để kiểm tra xem có job nào cần xử lí hay không

```
lib/resque/worker.rb

def work(interval = 5.0, &block)
  interval = Float(interval)
  startup

  loop do
    break if shutdown?

    unless work_one_job(&block)
    break if interval.zero?
    ......
end
```

Ở đây bạn thấy interval = 5.0 chính là việc cứ 5s worker sẽ gọi vào hàm này một lần. Như bạn thấy vòng lặp này luôn chạy trừ trường hợp Resque bị **shutdown** hoặc **interval = 0**, còn không nó sẽ chạy mãi. 
Tiếp theo chúng ta sẽ thấy có 1 method để xử lí job chính là **work_one_job(&block)** 

```
def work_one_job(job = nil, &block)
  return false if paused?
  return false unless job ||= reserve

  working_on job
  procline "Processing #{job.queue} since #{Time.now.to_i} [#{job.payload_class_name}]"

  log_with_severity :info, "got: #{job.inspect}"
  job.worker = self

  if fork_per_job?
    perform_with_fork(job, &block)
  else
    perform(job, &block)
  end

  done_working
  true
end
```

Ở đây mình sẽ quan tâm 2 vấn đề là **working_on(job)** và **perform(job, &block)** Đối với method đầu tiên mục đích của việc này sẽ xác định Worker đó xử lí Job đó như thế nào, mất thời gian bao lâu, giúp cho việc tracking sau này

```
def working_on(job)
  data = encode \
    :queue   => job.queue,
    :run_at  => Time.now.utc.iso8601,
    :payload => job.payload
  data_store.set_worker_payload(self,data)
end
```


**Có 1 điều các bạn luôn nhớ, trước khi đẩy dữ liệu vào Redis, Resque luôn thực hiện encode data. **

Tiếp theo mình sẽ phân tích method **perform(job, &block)** . Follow xử lí chính của việc thực thi job sẽ nằm trong  **Job.rb**
```
/lib/resque/job.rb 

def perform
    # Execute the job. Do it in an around_perform hook if available.
    if around_hooks.empty?
      job.perform(*job_args)
      job_was_performed = true
    else
end
```

Bạn sẽ nhìn thấy `job.perform(*job_args)` job ở đây chính là cái class mà bạn vừa tạo để thực hiện Job chính là **UserMailWorker**

```
class UserMailWorker
  @queue = :send_mail

  def self.perform send_method, params = {}
    ApiMailer.send(send_method, params.symbolize_keys).deliver_now
  end
end
```

Vậy là mình đã giới thiệu qua các bạn cơ chế Push Pop job sử dụng Resque. Nếu có gì sai sót mong các bạn góp ý thêm để có thể hoàn thiện hơn