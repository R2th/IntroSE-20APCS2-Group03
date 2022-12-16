## 1. Giới thiệu
- Sidekiq là một gem phục vụ cho việc chạy ngầm các công việc trong ứng dụng rails.

- Sidekiq sử dụng đa luồng và Redis để xử lý nhiều công việc đồng thời nhau.

- Redis được hiểu như là một database store để lưu trữ các công việc trong hàng đợi.

- Theo mặc định thì Sidekiq kết nối với Redis qua cổng `localhost:6379` trong môi trường development
## 2. Configuration
**Sidekiq:**

- Trong Gemfile thêm dòng: `gem "sidekiq"`

- Sau đó chạy `bundle install`
    
**Redis:**

- Cài đặt Redis theo link: https://redis.io/topics/quickstart

- Config Sidekiq để kết nối với Redis trong file `config/initializers/sidekiq.rb`

```ruby
Sidekiq.configure_server do |config|
  config.redis = {
    url: "redis://127.0.0.1:6379/12"
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: "redis://127.0.0.1:6379/12"
  }
end
```
Một số option config khác mình sẽ giới thiệu trong phần sau.
## 3. Luồng hoạt động
Sidekiq gồm 3 phần chính là **sidekiq client**, **sidekiq server**, **redis**

**Sidekiq client:**

- Chịu trách nhiệm đẩy job vào hàng đợi trong Redis.

- Dùng hàm `JSON.dump` để chuyển dữ liệu thành một hash.

- Lưu ý: các đối số truyền vào phải là các kiểu json đơn giản như `string, integer, boolean, float, null(nil), hash, array`

**Sidekiq server**:

- Chịu trách nhiệm lấy job từ hàng đợi trong Redis để xử lý.

- Khởi động Worker và gọi tới hàm perform với các tham số truyền vào.

**Redis:**
Nơi lưu trữ các job.
## 4. Vòng đời của một job
Các bạn có thể hình dung tổng quan dưới hình này
![](https://images.viblo.asia/c8ed723d-978d-4c91-9b2d-62ee3891ad96.png)

**1.Scheduled:** Danh sách các job đang chờ được thực thi

**2.Enqueued:** Thực hiện một job trong hàng đợi

**3.Busy:**  Job đang được thực thi

**4.Failed counter**: Số lần job được thực thi nhưng bị lỗi và không hoàn thành. 

- Mặc định số lần có thể xảy ra lỗi của job trước khi bị destroy là 25. 
- Nếu vượt quá số lần thì job sẽ được chuyển sang hàng đợi Dead Queue.
- Khi tạo job ta có thể custom lại như sau: `sidekiq_options :retry => 5` 
    
**5.Processed**: Job hoàn thành 

**6.Retries:**  Khi một job bị fail thì nó sẽ được đưa luôn vào Retries Queue nếu Failed Counter chưa vượt quá số lần fail cho phép.

**7.Dead Queue:** Job đã có số lần fail vượt quá số lần cho phép sẽ được đẩy vào dead queue


## 5. Sử dụng
Sau khi config **Sidekiq** và **Redis**, bây giờ bạn đã sẵn sàng sử dụng **Sidekiq**.

Chạy lệnh sau: `rails g sidekiq:worker Hard`

Khi đó nó sẽ tự động tạo ra file `app/workers/hard_worker.rb`. Hoặc bạn cũng có thể tạo file đó bằng tay.
```ruby
class HardWorker
  include Sidekiq::Worker

  def perform(*args)
    # do something
  end
end
```
Trong đó, **perform** sẽ là hàm thực thi các tác vụ chạy ngầm.

`*args ` là các đối số truyền vào. Lưu ý là các đối số truyền vào phải là các kiểu `json` đơn giản như `string, integer, boolean, float, null(nil), hash, array`, không nên sử dụng `symbol, name parameter, ruby object như Date, Time.`

Tạo job để chạy ngầm:

+ Tạo job để xử lý bất đồng bộ:

```ruby 
HardWorker.perform_async('bob', 5)
```


+ Hoặc bạn cũng có thể tạo job để chạy trong tương lai:
```ruby
HardWorker.perform_in(5.minutes, 'bob', 5)
HardWorker.perform_at(5.minutes.from_now, 'bob', 5)
```
Mặc định thì sidekiq scheduler sẽ kiểm tra các **schedule job** cách **5s** một lần (**15s đối với sidekiq < 5.1**), và bạn có thể set lại giá trị đó trong file `config/initializers/sidekiq.rb`

```ruby
Sidekiq.configure_server do |config|
  config.average_scheduled_poll_interval = 15
end
```


**Chạy thử**: Để thực thi được bạn phải mở 3 tab

 + Tab 1: chạy redis-server
	`redis-server`
 + Tab 2: chạy sidekiq
	`bundle exec sidekiq`
 + Tab 3: chạy server
	`rails s`
    
    Tạo job chạy và xem kết quả 
    ![](https://images.viblo.asia/1148e952-458f-4399-bca5-279259fa0578.png)

## 6. Các cài đặt nâng cao
Bạn có thể config một số option nâng cao trong file `config/sidekiq.yml`
```ruby
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
**Queue**: Theo mặc định sidekiq sử dụng một hàng đợi duy nhất cho việc xử lý job có tên là default. Bạn có thể tùy chỉnh các hàng đợi với các mức ưu tiên khác nhau.

**Concurrency**: Sidekiq xử lý các luồng bất đồng bộ, concurrency thể hiện số lượng các luồng chạy trong cùng một lúc.

**Sidekiq web**: Trong file routes.rb
```ruby
require "sidekiq/web"
  	mount Sidekiq::Web => "/sidekiq"
```

## 7. Server die
Khi **sidekiq** đang chạy mà **stop** **sidekiq** **server** thì sidekiq sẽ đưa **job** đang chạy trở lại hàng đợi, và khi **sidekiq** chạy lại thì **job** đó sẽ được thực hiện lại từ đầu.

Nếu **Redis server** bị lỗi thì ngay lập tức sẽ báo lỗi khi **Sidekiq** gọi đến hàm **perform**.

Bạn có thể bắt **exception** tại đó để tránh chết trang:

```ruby
begin
  SidekiqWorker.perform_async
rescue
  # Do something
end

```

## 8. Tham khảo
https://github.com/mperham/sidekiq