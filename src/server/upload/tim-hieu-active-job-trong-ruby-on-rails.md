#                       NỘI DUNG
## 1. Activejob là gì ?
- ActiveJob là 1 framework trong rails dùng để khai báo các công việc và xử lý chúng theo thứ tự hàng đợi queue, là frontend để khai báo các job.

- Những công việc này có thể là mọi thứ, từ dọn dẹp thường xuyên theo lịch trình, đến tính phí thanh toán, cho đến gửi email.  

- Bất cứ thứ gì có thể được chia nhỏ thành các đơn vị công việc nhỏ và chạy song song độc lập với luồng chính đều có thể xếp hàng để thực hiện (backend)


## 2. Backgroud job là gì ?
-**BackgroudJob có thể gọi là các công việc chạy nền, những công việc thực hiện trên luồng độc lập với luồng chính của ứng dụng web.**

-**Bình thường thì các trang web nhận request từ người dùng và trả về một response nhưng Background job thì có khác biệt**

=> Bắt đầu từ một request đến Website nhưng đòi hỏi thời gian thực thi lâu hơn so với bình thường (có thể tưởng tưởng như là những request này không thể xử lý ngay lập tức) thì chúng ta sẽ cần sử dụng đến Background job

=> Xử lý bất đồng bộ trên một luồng riêng biệt, trả về response cho người dùng.

## 3. Có những các nào để xử lý background job?
**-Có 10 cách để xử lý trong bảng dưới đây:**

|                   | Async | Queues | Delayed    | Priorities | Timeout | Retries |
|-------------------|-------|--------|------------|------------|---------|---------|
| **Backburner**        | Yes   | Yes    | Yes        | Yes        | Job     | Global  |
| **Delayed** **Job**       | Yes   | Yes    | Yes        | Job        | Global  | Global  |
| **Que**               | Yes   | Yes    | Yes        | Job        | No      | Job     |
| **queue_classic**     | Yes   | Yes    | Yes*       | No         | No      | No      |
| **Resque**            | Yes   | Yes    | Yes (Gem)  | Queue      | Global  | Yes     |
| **Sidekiq**           | Yes   | Yes    | Yes        | Queue      | No      | Job     |
| **Sneakers**          | Yes   | Yes    | No         | Queue      | Queue   | No      |
| **Sucker** **Punch**      | Yes   | Yes    | Yes        | No         | No      | No      |
| **Active** **Job** **Async**  | Yes   | Yes    | Yes        | No         | No      | No      |
| **Active** **Job** **Inline** | No    | Yes    | N/A        | N/A        | N/A     | N/A     |

chú thích: 

-**Async**: Xử lý bất đồng bộ.

-**Queues**: Hàng đợi.
 
-**Delayed**: Bổ xung yêu cầu thực hiện sau 
ví dụ perform_later.

-**Priorities**: Thứ tự các job có thể thay đổi trong queue.

-**Timeout**: Hết thời gian thực hiện

-**Retries**: Thử lại các job fail 

- Mặc định Rails cung cấp cho chúng ta Active job (1 framework để xử lý Background job) built-in queue process (tích hợp sẵn hàng đợi).

- Những process trong queue được lưu vào RAM nên nếu server bị shutdown thì những job chưa hoặc đang thực hiện sẽ bị mất, điều này có thể gây ảnh hưởng tiêu cực đến người dùng và dịch vụ của chúng ta, vì vậy nó chỉ thích hợp cho những ứng dụng nhỏ hoặc những công việc không quan trọng.

## 4. Cách tạo, Config, Sử dụng ActiveJob?
Trước tiên ta phải tạo ra một job mà bạn muốn sử dụng:
```ruby
rails g job SendMail
  invoke  test_unit
  create  test/jobs/send_mail_job_test.rb
  create  app/jobs/send_mail_job.rb
```
```ruby
class SendMailJob < ApplicationJob
 queue_as :default

 def perform(*args)
   # Do something later
 end
end

```
**Với Active job có thể gửi bao nhiêu tham số tùy ý, kể cả 1 object phức tạp như** :
+ Basic types (NilClass, String, Integer, Float, BigDecimal, TrueClass, FalseClass)
+ Symbol / Array
 + Date / Time / DateTime
 + ActiveSupport::TimeWithZone / ActiveSupport::Duration /Hash (Keys should be of String or Symbol type)...

**config** :

Mặc định active job sử dụng **queue :default (:async)** để lưu job, ngoài ra còn có adapter khác là :**inline**, để sử dụng ta phải config như sau:

`config.active_job.queue_adapter = :inline` => job sẽ thực hiện ngay lập tức trong luồng chính

`config.active_job.queue_adapter = :async` =>  job sẽ được thực hiện trong nhóm luồng khác, là adapter hàng đợi mặc định, phù hợp với môi trường dev/test vì nó không cần cơ sở hạ tầng bên ngoài, nhưng nó không phù hợp trong môi trường production, vì nó sẽ loại bỏ những công việc đang chờ xử lý khi khởi động lại.

**Ta có thể config số luồng hoạt động như sau** :

```ruby
config.active_job.queue_adapter = ActiveJob::QueueAdapters::AsyncAdapter.new 
   min_threads: 1,
   max_threads: 2 * Concurrent.processor_count,
   idletime: 600.seconds
```


## 5. Queue
Chúng ta có thể đẩy công việc chạy ngầm vào hàng đợi queue cụ thể và xét độ ưu tiên
```ruby
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  # ...
end
```

Bạn có thể đặt trước tên hàng đợi cho tất cả các công việc của mình bằng cách sử dụng:

`config.active_job.queue_name_prefix ` 
trong file **application.rb:**
```ruby
# config/application.rb
module YourApp
  class Application < Rails::Application
    config.active_job.queue_name_prefix = Rails.env
  end
end
```

```ruby
# app/jobs/guests_cleanup_job.rb
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  # ...
end
```
-Có thể config queue trong job như sau: 
```ruby
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  self.queue_name_prefix = nil
  # ...
end
```
-Cũng có thể config khi gọi job:

``` ruby 
MyJob.set(queue: :another_queue).perform_later(record)
```
## 6. Callback Trong ActiveJob?
**Tương tự như ActiveRecord, Active Job cũng sử dụng callback để can thiệp vào vòng đời của một job**
```ruby
before_enqueue
around_enqueue
after_enqueue
before_perform
around_perform
after_perform
```

## 7.Xử lý exceptions, Retry hay Discard failed Job ?
```ruby

class RemoteServiceJob < ApplicationJob
  retry_on CustomAppException # defaults to 3s wait, 5 attempts

  discard_on ActiveJob::DeserializationError

  def perform(*args)
    # Might raise CustomAppException or ActiveJob::DeserializationError
  end
end
```
-Mặc định **Job failed** sẽ không được **retry** mà job sẽ bị **discard** luôn 

-Trường hợp muốn **retry** hoặc discard theo mục đích thì ta **raise exception** sau đó sử dụng 
**retryon exeption** để thử lại mặc định đợi **3s** và thử lại **5 lần**

-**Discardon exeption** để xóa luôn job đi

## 8.Tham khảo 
https://guides.rubyonrails.org/active_job_basics.html