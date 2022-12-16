:red_car:
![](https://images.viblo.asia/b18b51da-6fc3-4722-aa01-c91406892123.png)

## Background Job
Thông thường, các trang web nhận request từ người dùng, thực hiện xử lý logic sau đó trả về một response.

> `Background Job` những tiến trình được thực thi tách biệt với luồng xử lý request/response thông thường.
> 
Khi nào cần sử dụng `background job`?

Giả sử ta có những công việc cần một khoảng thời gian để xử lý, hoặc một số có thể gây ra lỗi (gửi email cho người dùng), lúc này server sẽ phải chờ cho đến khi công việc được xử lý xong mới có thể xử lý các tiến trình khác, điều này gây ra trì hoãn thời gian response cho người dùng,  server bị quá tải ...

Với `Background Job` , ứng dụng sẽ đẩy tất cả các công việc muốn xử lý riêng vào hàng đợi (hoặc có thể lập lịch cho chúng). Việc thực thi các công việc này xảy ra trên các luồng riêng biệt với luồng xử lý chính của ứng dụng.
## Sidekiq
![](https://images.viblo.asia/1753b370-cc28-4f8d-9634-c1fef898493d.jpg)

> `Sidekiq` là một background processing framework được xây dựng nhằm mục đích dễ dàng tương tác với `rails` application

### 1. Client
> `Sidekiq client` chạy trên các  `ruby process` (`puma` process hoặc `passenger` process) cho phép tạo và đẩy các job vào trong `redis queue`:
```ruby
CleanUpOrderJob.perform_later(1)
```
`CleanUpOrderJob` kế thức `ActiveJob::Base` được cung cấp bởi `rails` :
```ruby
class CleanUpOrderJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "LET TALK!"
  end
end
```
`perform_later` enqueue `redis queue` với value được truyền và `queue` mặc định là `:default`.

`queue_as` trong `CleanUpOrderJob` với param truyền vào sẽ chỉ ra `queue` mong muốn enqueue tới `redis queue`.

method `perform` sẽ được thực thi mỗi khi `Sidekiq server` lấy queue ra khỏi `redis queue`, tham số `args` là những value được truyền qua `perform_later`.
### 2. Redis
> `redis` cung cấp nơi chứa các job cần thực thi của `sidekiq`, chứa trong các `queue`.

Ta cần cài đặt [Redis](https://redis.io/): `$ sudo apt install redis-server`
Mặc định thì redis sẽ chạy trên cổng 6379.
### 3. Server
`Sidekiq server` luôn đợi `redis server` chạy trên cổng 6379 nếu có job mới được enqueue vào queue, lấy ra và thực thi nó.

Lúc này 1 object của `CleanUpOrderJob` được sinh ra và method `perform` được thực thi.

---
Như vậy, các job được lập lịch và đưa vào `redis queue` qua Sidekiq client, và mỗi khi có job được enqueue thì Sidekiq server sẽ thực thi nó.
### 4. Job Lifecycle
Các trạng thái của 1 job:
![](https://images.viblo.asia/ef20ba8a-9e2a-4e04-95fc-a8f96fad737f.png)

- **Processed**: job đã thực hiện thành công
- **Failed**: những job được thực thi bởi `sidekiq` và failed, những job này sẽ được retry lại bằng cách đẩy vào *Retries Queue*
 - **Retries**:  
     - Những job sẽ được đưa vào *Enqueue Gauge* để retry (mặc định là 25 lần, trong khoảng 21 ngày, nếu trong khoảng thời gian này bug được sửa thì job sẽ retry thành công).
     -  Nếu retry thành công thì job chuyển sang **Processed**, còn nếu retry failed (quá 25 lần thì job sẽ bị chuyển sang *Dead queue*)
     -  Ta có thể config số lần retry: 
     
          Trong `config/sidekiq.yml`: 
          ```ruby
          :max_retries: 8
          ```
- **Dead**: những job đã dead (vẫn có thể retry được)
-  **Scheduled**: jobs được lập lịch để thực thi trong một khoảng thời gian hoặc thời điểm mong muốn
-  **Enqueue**: những job đang được lấy ra từ *Scheduled Queue* và chuẩn bị được thực thi
- **Busy**: những job đang được thực thi 

Ta có thể dễ dàng kiểm soát các job thông qua WebUI ([gem Sinatra](https://github.com/sinatra/sinatra)):
![](https://images.viblo.asia/7858f3f5-d0b1-46c3-83d5-7fbaf60e0937.png)


### 5. Scheduled Jobs
`sidekiq` cho phép ta lập lịch thời gian thực thi cho các job:
```ruby
// Job được lập lịch sẽ thực thi vào sáng ngày mai
CleanUpJOrderJob.set(wait_until: Date.tomorrow.noon).perform_later("param")

// Job được lập lịch sẽ thực thi vào 1 tuần sau
CleanUpJOrderJob.set(wait: 1.week).perform_later("param")
```

## Reference
https://github.com/mperham/sidekiq/wiki

https://edgeguides.rubyonrails.org/active_job_basics.html

https://medium.com/@shashwat12june/all-you-need-to-know-about-sidekiq-a4b770a71f8f

https://www.youtube.com/watch?v=GBEDvF1_8B8&t=234s