Tìm hiểu cách dùng Redis để có thể nâng hiệu suất của ứng dụng khi nó phát triển lên.

Ruby on Rails là một framework thích hợp trong việc xây dựng các hệ thống một cách nhanh chóng. Nhưng khi các hệ thống phát triển lên, chúng ta phải đối mặt với những thách thức về mở rộng ứng dụng. Có nhiều công cụ khác nhau mà chúng ta có thể dùng để làm việc đó, nhưng việc thêm các công nghệ khác nhau vào các ứng dụng sẽ làm tăng tính phức tạp của chúng. Bài viết này chủ yếu tìm hiểu cách sử dụng Redis, kho lưu trữ cấu trúc dữ liệu trong bộ nhớ, như một công cụ đa mục đích để giải quyết các vấn đề khác nhau.

Trước hết, chúng ta cần phải cài đặt Redis, có thể thực hiện bằng các lệnh như `brew`, `apt-get`, v.v. tuỳ vào máy của bạn. Và tất nhiên là chúng ta cũng cần cả Ruby on Rails nữa nhé. Trong ví dụ này, chúng ta sẽ xây dừng lên 1 ứng dụng quản lý sự kiện online. Cài đặt 1 số model đơn giản như sau nhé:

```ruby
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

# Sử dụng Redis như là bộ nhớ đệm
Yêu cầu đầu tiên của ứng dụng là hiển thị ra có bao nhiêu vé được bán ra cho 1 sự kiện nào đó và sự kiện đó thu về được bao nhiêu tiền. Chúng ta cần cài đặt một số phương thức như sau:
```ruby
class Event < ApplicationRecord
  has_many :tickets

  def tickets_count
    tickets.count
  end
  
  def tickets_sum
    tickets.sum(:amount)
  end
end
```

Đoạn code trên khi được gọi sẽ sinh ra các câu lệnh SQL để chọc vào database và lấy về dữ liệu cần thiết. Vấn đề ở đây là khi ứng dụng phát triển lên, so bản ghi sẽ rất lớn và việc query lấy dữ liệu này có thể sẽ mất rất nhiều thời gian để thực hiện. Để tăng tốc ứng dụng, chúng ta sẽ lưu các kết quả của những phương thức này vào bộ nhớ đệm. Trước hết, chúng ta cần phải kích hoạt bộ nhớ đệm với Redis cho ứng dụng. Thêm `gem 'redis-rails'` vào Gemfile và chạy `bundle install`. Trong `config/environment/development.rb`, cấu hình như sau:
```ruby
config.cache_store = :redis_store, {
  expires_in: 1.hour,
  namespace: 'cache',
  redis: { host: 'localhost', port: 6379, db: 0 }
}
```

Việc chỉ định `namespace` là không bắt buộc, nhưng nó sẽ có ích (...về mặt nào đấy). Đoạn code này cũng đặt thời hạn mặc định cho việc cache dữ liệu là 1 giờ, khi đó, Redis time-to-live (TTL) sẽ xóa dữ liệu cũ đi. Bây giờ chúng ta có thể bọc các phương thức trong các `cache` block:
```ruby
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

`Rails.cache.fetch` sẽ kiểm tra xem một key cụ thể có tồn tại trong Redis hay không. Nếu key có tồn tại, nó sẽ trả về một giá trị được liên kết với key đó cho ứng dụng và không thực thi đoạn code trong block. Nếu key không tồn tại, Rails sẽ chạy đoạn code trong block và lưu trữ dữ liệu trong Redis. `cache_key` là một phương thức do Rails cung cấp, nó sẽ kết hợp tên model, khóa chính và mốc thời gian cập nhật cuối cùng để tạo ra 1 key duy nhất cho Redis. Chúng ta sẽ thêm `__method__`, nó sẽ sử dụng tên của một phương thức cụ thể để tiếp tục làm cho các key là duy nhất. Và nếu muốn thì chúng ta hoàn toàn có thể chỉ định thời gian hết hạn khác nhau cho các phương thức. Dữ liệu trong Redis sẽ giống như thế này:
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

Trong trường hợp này, sự kiện 1 đã bán được chín vé với tổng số tiền `$127` và sự kiện 2 đã bán được 16 vé với tổng số tiền là `$211`.

# Cập nhật bộ nhớ đệm
Chuyện gì sẽ xảy ra nếu một vé khác được bán ngay sau khi chúng ta lưu trữ dữ liệu này? Trang web sẽ hiển thị nội dung được lưu trong bộ nhớ cache cho đến khi Redis dọn dẹp các key này bằng TTL. Việc nội dung cũ được hiển thị có thể chấp nhận được trong một số trường hợp, nhưng chúng ta muốn hiển thị dữ liệu là chính xác với thời điểm hiện tại. Và giờ là thời khắc cho mốc thời gian cập nhật cuối cùng được toả sáng. Chúng ta sẽ chỉ định một callback `touch: true` từ con (model `Ticket`) gọi đến bố mẹ (model `Event`). Khi Rails đụng đến cột `updated_at` của Ticket, một `cache_key` mới sẽ được tạo ra cho model Event.
```ruby
class Ticket < ApplicationRecord
  belongs_to :event, touch: true
end

# Dữ liệu trong Redis
{"db":0,"key":"cache:events/1-20180322035927682000000/tickets_count:","ttl":1799,
  "type":"string","value":"9",...}
{"db":0,"key":"cache:events/1-20180322035928682000000/tickets_count:","ttl":1800,
  "type":"string","value":"10",...}
...
```

Nguyên tắc là: Khi chúng ta tạo một kết hợp key và nội dung bộ nhớ cache, chúng ta không thay đổi nó. Chúng ta tạo sẽ tạo nội dung mới kết hợp với key mới và dữ liệu đã lưu trong bộ nhớ cache trước đó vẫn còn trong Redis cho đến khi bị TTL xóa đi. Điều này gây lãng phí bộ nhớ nhưng nó giúp code của chúng ta đơn giản hơn, và chúng ta cũng không cần phải viết callbacks đặc biệt để xoá và tái tạo bộ nhớ cache.

Chúng ta cần phải cẩn thận trong việc lựa chọn TTL bởi vì nếu dữ liệu thay đổi thường xuyên và TTL dài, chúng ta sẽ lưu trữ quá nhiều bộ nhớ cache không sử dụng. Nếu dữ liệu thay đổi không thường xuyên nhưng TTL quá ngắn, thì bộ nhớ cache sẽ được tạo lại ngay cả khi không có gì thay đổi. Và [đây](http://dmitrypol.github.io/redis/2017/05/25/rails-cache-variable-ttl.html) là một số gợi ý để cân bằng việc này.

Lưu ý: Caching cũng chỉ là một giải pháp tạm thời, chúng ta vẫn nên tìm cách viết code hiệu quả và tối ưu đánh index cho cơ sở dữ liệu. Nhưng đôi khi bộ nhớ đệm vẫn còn cần thiết và có thể là một giải pháp nhanh chóng để tiết kiệm thời gian cho việc khác refactor phức tạp hơn.
# Sử dụng Redis như là hàng đợi
Yêu cầu tiếp theo là tạo báo cáo cho một hoặc nhiều sự kiện để hiển thị số liệu thống kê chi tiết về số tiền mỗi sự kiện thu về được và liệt kê danh sách các vé bán ra kèm theo thông tin người dùng.
```ruby
class ReportGenerator
  def initialize event_ids
  end
  def perform
    # query DB and output data to XLSX
  end
end
```

Việc tạo các báo cáo này có thể sẽ mất thời gian, vì dữ liệu phải được thu thập từ nhiều bảng khác nhau. Thay vì khiến người dùng chờ phản hồi sau đó mới tải xuống bảng thống kê, chúng ta có thể biến nó thành một background job và gửi email đính kèm bảng thống kê hoặc chứa đường link download cho người dùng khi nó xử lý xong.

Ruby on Rails có ActiveJob có thể sử dụng nhiều hàng đợi khác nhau. Trong ví dụ này, chúng ta sẽ sử dụng thư viện Sidekiq, lưu trữ dữ liệu trong Redis. Thêm `gem 'sidekiq'` vào tệp `Gemfile` và chạy `bundle install`. Chúng ta cũng sẽ sử dụng gem `sidekiq-cron` để lên lịch cho các job định kỳ.
```ruby
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

Lưu ý rằng chúng ta đang sử dụng 1 cơ sở dữ liệu Redis khác cho Sidekiq. Tuy không bắt buộc, nhưng nó có thể hữu ích để lưu trữ bộ nhớ cache trong một cơ sở dữ liệu Redis riêng biệt (hoặc thậm chí trên một máy chủ khác) trong trường hợp chúng ta cần xóa nó.

Chúng ta cũng có thể tạo một tệp cấu hình khác cho Sidekiq để chỉ định hàng đợi nào nó cần xem. Để không có quá nhiều hàng đợi, nhưng nếu chỉ có một hàng đợi có thể dẫn đến tình trạng hàng đợi bị tắc với job có mức độ ưu tiên thấp và trì hoãn một job có mức độ ưu tiên cao hơn. Trong `config/sidekiq.yml`, bổ sung như sau:
```
---
:queues:
  - [high, 3]
  - [default, 2]
  - [low, 1]
```

Bây giờ chúng ta sẽ tạo các job và chỉ định vào hàng đợi có mức độ ưu tiên thấp.
```ruby
class ReportGeneratorJob < ApplicationJob
  queue_as :low
  self.queue_adapter = :sidekiq

  def perform event_ids
    # có thể gọi ra ReportGenerator ở đây hoặc là đưa đoạn code đó vào job
  end
end
```

Chúng ta có thể đặt một bộ queue adapter khác (nếu muốn). Active Job cho phép chúng ta sử dụng các queue backend khác nhau cho các công việc khác nhau trong cùng một ứng dụng. Chúng ta có thể có các job cần chạy hàng triệu lần mỗi ngày. Redis có thể xử lý điều này, nhưng chúng ta có thể muốn sử dụng một dịch vụ khác như AWS Simple Queue Service (SQS).

Sidekiq tận dụng nhiều loại dữ liệu Redis. Nó sử dụng Lists để lưu trữ các job, điều này làm cho việc sắp xếp vào hàng đợi thực sự nhanh chóng. Nó sử dụng các Sorted Sets để trì hoãn việc thực hiện job (hoặc được yêu cầu cụ thể bởi một ứng dụng hoặc khi thực hiện một việc trả về theo hàm mũ khi thử lại). Redis Hashes lưu trữ số liệu thống kê về số lượng job đã được thực hiện và thời gian mà chúng cần để thực hiện xong.

Các job định kỳ cũng được lưu trữ trong Hashes. Chúng ta có thể sử dụng Linux cron đơn giản để khởi động công việc, nhưng điều đó sẽ giới thiệu một điểm thất bại duy nhất trong hệ thống của chúng ta. Với Sidekiq-cron, lịch trình được lưu trữ trong Redis và bất kỳ máy chủ nào mà nhân viên Sidekiq chạy có thể thực hiện công việc (thư viện đảm bảo rằng chỉ một worker sẽ lấy một job cụ thể vào thời gian đã lên lịch). Sidekiq cũng có giao diện người dùng tuyệt vời, nơi chúng ta có thể xem các thống kê khác nhau và tạm dừng các job đã lên lịch hoặc thực hiện chúng theo yêu cầu.

# Sử dụng Redis như cơ sở dữ liệu
Yêu cầu nghiệp vụ cuối cùng là theo dõi số lượt truy cập có trên mỗi trang sự kiện để chúng ta có thể xác định mức độ phổ biến của chúng. Chúng ta sẽ sử dụng Sorted Sets. Chúng ta có thể tạo trực tiếp `REDIS_CLIENT` để gọi các lệnh Redis gốc hoặc sử dụng gem Leaderboard, cung cấp thêm các tính năng bổ sung.
```ruby
# config/initializers/redis.rb
REDIS_CLIENT = Redis.new(host: 'localhost', port: 6379, db: 1)

# config/initializers/leaderboard.rb
redis_options = {:host => 'localhost', :port => 6379, :db => 1}
EVENT_VISITS = Leaderboard.new('event_visits', Leaderboard::DEFAULT_OPTIONS, redis_options)
```

Bây giờ chúng ta có thể gọi nó từ action show của controller:
```ruby
class EventsController < ApplicationController
  def show
    ...
    REDIS_CLIENT.zincrby('events_visits', 1, @event.id)
    # or
    EVENT_VISITS.change_score_for(@event.id, 1)
  end
end

# dữ liệu trong Redis
{"db":1,"key":"events_visits","ttl":-1,"type":"zset","value":[["1",1.0],...,["2",4.0],["7",22.0]],...}
```

Việc thêm các mục vào một Sorted Set sẽ bị chậm lại khi chúng ta có hàng triệu phần tử trong Sorted Set, nhưng Redis rất nhanh cho hầu hết các trường hợp. Bây giờ chúng ta có thể sử dụng SortedSet này để xác định `rank` và `score` của mỗi sự kiện. Hoặc chúng ta có thể hiển thị 10 sự kiện top với `REDIS_CLIENT.zrange ('events_visits', 0, 9)`.

Vì chúng ta đang sử dụng Redis để lưu trữ các loại dữ liệu rất khác nhau (bộ nhớ cache, jobs, v.v.), chúng ta cần phải cẩn thận để không bị hết RAM. Redis sẽ gỡ bỏ các key của nó, nhưng nó không thể nói sự khác biệt giữa một key giữ bộ nhớ cache cũ so với một cái gì đó quan trọng đối với ứng dụng của chúng ta.


*Tham khảo: https://opensource.com/article/18/4/ruby-rails-redis*