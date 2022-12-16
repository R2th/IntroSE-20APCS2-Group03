![](https://images.viblo.asia/4bcbcb8e-2492-4233-a221-517a0ead3d78.png)

[Ruby on Rails](http://rubyonrails.org/) là một trong những framwork mạnh mẽ trong việc phát triển các ứng dụng web appications. Như chúng ta đã biết, với những ứng dụng lớn chúng ta sẽ phải đối mặt với những thách thức scaling. Bài viết hôm nay mình sẽ chia sẻ cách [Redis](https://redis.io/) lưu trữ các data structure trong bộ nhớ, đây là một trong những phương pháp nổi bật nhằm tăng hiệu suất, mở rộng của ứng dụng.
Trước tiên chúng ta cần cài đặt Redis, thông qua các câu lệnh như `brew`, `apt-get` hoặc sử dụng `docker`. Và đương nhiên chúng ta phải có ứng dụng Ruby on Rails rồi. Với ví dụ dưới đây, chúng ta sẽ build một ứng dụng quản lý sự kiện online. Hãy cùng xem các model relation sau đây:
```
class User < ApplicationRecord
  has_many :tickets
end
class Event < ApplicationRecord
  has_many :tickets
end
class Ticket < ApplicationRecord
  belongs_to :user
  belongs_to :event
end
```
# Redis as a cache
Yêu cầu đầu tiên của ứng dụng là chỉ ra bao nhiêu tickets được bán và tổng số tiền thu được từ chúng. Ta sẽ có các methods sau: 
```
class Event < ApplicationRecord
  def tickets_count
    tickets.count
  end
  def tickets_sum
    tickets.sum(:amount)
  end
end
```
Đoạn code trên sẽ khơi tạo các câu lệnh SQL truy cập vào database để truy xuất dữ liệu. Vấn đề có thể xảy ra ở đây là khi ứng dụng mở rộng, dữ liệu ngày càng lớn thì những câu lệnh này có thể trở nên chậm chạp, trì trễ. Để cải thiện điều này ta có thể caching kết quả vào các methods. Trước hết cần phải enable caching Redis cho application. Thêm gem `redis-rails` vào Gemfile và chạy `bundle install`. Cấu hình môi trường:
```
#config/environments/development.rb
config.cache_store = :redis_store, {
  expires_in: 1.hour,
  namespace: 'cache',
  redis: { host: 'localhost', port: 6379, db: 0 },
  }
```
Chỉ định `cache` namespace là optional(tùy chọn). Đoạn code trên sẽ set mặc định thời gian hết hạn là trong 1 hours. Trong thời gian sống của cache (time-to-live) các dữ liệu cũ sẽ được thanh lọc. Bây giờ ta có thể wrap các method của chúng ta vào các khối được gọi là `cache` blocks.
```
class Event < ApplicationRecord
  def tickets_count
    Rails.cache.fetch([cache_key, __method__], expires_in: 30.minutes) do
      tickets.count
    end
  end
  def tickets_sum
    Rails.cache.fetch([cache_key, __method__]) do
      tickets.sum(:amount)
    end
  end
end
```
`Rails.cache.fetch` sẽ check một specific key đã được tồn tại trong Redis hay chưa? Nếu đã tồn tại nó sẽ return một giá trị liên kết với key đấy tới application nếu không sẽ thực hiện đoạn code bên trong và lưu trữ data vào Redis. `cache_key` là một method cho phép rails kết hợp model name với primary key và last updated timestamp để khởi tạo một Redis key duy nhất. Ta có thêm `__method__` sẽ dùng name của method để tiếp tục xây dựng unique key.  Đương nhiên có thể chỉ định các expirations khác nhau cho từng method. Data được lưu trữ trong Redis sẽ có dạng sau: 
```
{"db":0,"key":"cache:events/1-20180322035927682000000/tickets_count:","ttl":1415,
"type":"string","value":"9",...}

{"db":0,"key":"cache:events/1-20180322035927682000000/tickets_sum:","ttl":3415,
"type":"string","value":"127",...}

{"db":0,"key":"cache:events/2-20180322045827173000000/tickets_count:","ttl":1423,
"type":"string","value":"16",...}

{"db":0,"key":"cache:events/2-20180322045827173000000/tickets_sum:","ttl":3423,
"type":"string","value":"211",...}
```
Trong kết quả này event 1 bán 9 tickets với tổng $127, event 2 bán 16 tickets với tổng $221

# Cache busting
Vậy điều gì xảy ra nếu một ticket khác được bán ra ngay sau khi chúng ta cache data? Website sẽ hiện thị nội dung đã cached cho đến khi redis key đó bị xóa đi. Điều này có thể ổn trong một vài case, nhưng điều ta thực sự cần ở đây là hiện thị current data realtime. Đây là nơi mà last updated timestamp mình đã nói ở trên được sử dụng. Ta sẽ chỉ định một callback `touch: true` từ child model(ticket) tới parent model(event). Rails sẽ đánh dấu `updated_at` timestamp, từ đấy tạo một `cache_key` mới cho event model. 
```
class Ticket < ApplicationRecord
  belongs_to :event, touch: true
end
# data in Redis
{"db":0,"key":"cache:events/1-20180322035927682000000/tickets_count:","ttl":1799,
  "type":"string","value":"9",...}
{"db":0,"key":"cache:events/1-20180322035928682000000/tickets_count:","ttl":1800,
  "type":"string","value":"10",...}
...
```
Mô hình sẽ là: Khi tạo một kết hợp của cache key và content, ta sẽ không thay đổi nó. Tạo một new content với một new key và previously cached data được lưu trữ trong Redis sẽ bị loại bỏ. Việc này có thể sẽ dẫn đến tốn `RAM` nhưng nó giảm được sự rắc rối trong đoạn code, ta không cần phải viết một callback để loại bỏ và regenerate cache. 

Cũng phải chú ý trong việc set TTL (time-to-live) nếu data thường xuyên bị thay đổi và nếu TTL là lớn thì sẽ dẫn đến việc lưu trữ nhiều các data không cần thiết sử dụng đến. Mặt khác nếu như data ít thay đổi nhưng TTL lại quá ngắn thì việc regenerate cache trở nên lãng phí khi chẳng thay đổi gì dữ liệu. 

**A note of caution**:  Caching không phải một giải pháp chính. Thay vì đó nên tìm giải pháp tốt nhất để tối ưu code, database indexes. Tuy nhiên đôi lúc nào đấy caching lại là một giải pháp cần thiết và nhanh chóng thay vì tốn nhiều thời gian cho việc tái cấu trúc phức tạp. 

# Redis as a queue
Yêu cầu tiếp theo đó là generate reports cho một hoặc nhiều events như việc show ra số liệu thống kê số tiền thu được cho mỗi ticket và thông tin người mua. 
```
class ReportGenerator
  def initialize event_ids
  end
  def perform
    # query DB and output data to XLSX
  end
end
```
Việc thu thập data từ nhiều tables dẫn đến hiệu suất chậm chạp. Thay vì phải bắt người dùng chờ đợi và download spreadsheet, ta có thể cho chúng vào background job và gửi email cùng với đính kèm khi nó đã được hoàn thành. 

Ruby on Rails có một Active Job framework cho phép sử dụng nhiều hàng đợi khác nhau. Ở ví dụ dưới đây, ta sẽ tận dụng thư viện Sidekiq, thứ được dùng để lưu trữ data trong Redis. 

Thêm `gem 'sidekiq'` vào Gemfile và chạy 'bundle install'. Sử dụng gem 'sidekiq-cron' để sắp xếp công việc định kì. 
```
# in config/environments/development.rb
config.active_job.queue_adapter = :sidekiq
# in config/initializers/sidekiq.rb
schedule = [
  {'name' => MyName, 'class' => MyJob, 'cron'  => '1 * * * *',  
  'queue' => default, 'active_job' => true }
]
Sidekiq.configure_server do |config|
 config.redis = { host:'localhost', port: 6379, db: 1 }
 Sidekiq::Cron::Job.load_from_array! schedule
end
Sidekiq.configure_client do |config|
 config.redis = { host:'localhost', port: 6379, db: 1 }
end
```
Lưu ý rằng ta đang sử dụng một Redis database khác cho Sidekiq. Điều này không bắt buộc tuy nhiên nó là hữu ích khi lưu trữ store cache vào một Redis database khác(hay thậm chí kể cả trên một server khác) trong trường hợp ta cần flush nó. 

Cũng có thể tạo một config file khác để chỉ định queues nào nên được watch. Ta không nên có quá nhiều queues, nhưng có duy nhất một queue có thể dẫn tới tắc nghen với các jobs có độ ưu tiên thấp và delay job có độ ưu tiên cao. Để hiểu rõ hơn hãy xem đoạn code sau:
```
---
:queues:
  - [high, 3]
  - [default, 2]
  - [low, 1]
```
Giờ ta có thể tạo job và set prioriy queue
```
class ReportGeneratorJob < ApplicationJob
  queue_as :low
  self.queue_adapter = :sidekiq  
  def perform event_ids
    # either call ReportGenerator here or move the code into the job
  end
end
```

Ta có thể tùy ý set các queue adapter khác nhau. Active Job cho phép sử dụng các queue khác nhau cho các jobs khác nhau trong cùng 1 ứng dụng. Có thể có jobs cần chạy hàng triệu lần mỗi ngày. Redis có thể xử lý việc đó nhưng ta có thể nghĩ đến các services khác như AWS Simple Queue Service (SQS). 

Sidekiq tận dụng nhiều loại Redis data types. Nó sử dụng **Lists** để lưu trữ jobs, **Sorted Sets** để delay job execution, **Hashes** để lưu trữ thống kê bao nhiêu jobs được thực thi và thực thi trong bao lâu, recurring jobs cũng được lưu trữ trong **Hashes**. 

# Redis as a database
Yêu cầu cuối cùng là theo dõi bao nhiêu bao nhiêu lượt visit trên mỗi page từ đó chỉ ra mức độ phổ dụng của chúng. Để làm điều đó ta có thể dùng **Sorted Sets**. Có thể tạo **REDIS_CLIENT** để call trực tiếp đến native Redis commands hay sử dụng Leaderboard gem
```
# config/initializers/redis.rb
REDIS_CLIENT = Redis.new(host: 'localhost', port: 6379, db: 1)
# config/initializers/leaderboard.rb
redis_options = {:host => 'localhost', :port => 6379, :db => 1}
EVENT_VISITS = Leaderboard.new('event_visits', Leaderboard::DEFAULT_OPTIONS, redis_options)
```
Giờ ta có thể gọi nó từ controller show action: 

```
class EventsController < ApplicationController
  def show
    ...
    REDIS_CLIENT.zincrby('events_visits', 1, @event.id)
    # or
    EVENT_VISITS.change_score_for(@event.id, 1)
  end
end
# data in Redis
{"db":1,"key":"events_visits","ttl":-1,"type":"zset","value":[["1",1.0],...,["2",4.0],["7",22.0]],...}
```
Ta có thể dùng Sorted Set để xác định `rank`, `score` của các event . Hay có thể hiển thị top 10 events với `REDIS_CLIENT.zrange('events_visits', 0, 9)`.

Với việc ứng dụng Redis để lưu trữ các data types khác nhau (cache, jobs, ...), ta cần phải lưu ý đến việc chúng sử dụng dung lượng RAM. 

Bài viết trên mình đã giới thiệu sự hữu ích khi sử dụng Redis với các mục đích khác nhau trong ứng dụng Ruby on Rails application. Chúc các bạn một ngày làm việc vui vẻ.

**Tài liệu tham khảo:** [How to scale Ruby on Rails with Redis](https://opensource.com/article/18/4/ruby-rails-redis)