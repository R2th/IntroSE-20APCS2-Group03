# 1. Sidekiq:
- Sidekiq là 1 công cụ đơn giản và hiệu quả để quản lý các tiến trình background job trong ruby.
- Sidekiq sử dụng `thread` và `redis` để quản lý nhiều job cùng 1 lúc trong cùng 1 tiến trình.

# 2. Getting Started:
- Thêm `sidekiq` vào Gemfile
    ```ruby
    # Gemfile
    gem "sidekiq"
    ```
- Chạy command bundle `install` để install gem
    ```ruby
    bundle install
    ```
- Tạo worker để handle các job bất đồng bộ
    ```ruby
    # app/workers/hard_worker
    require "colorize"

    class HardWorker
      include Sidekiq::Worker

      def perform(name, count)
        puts "HardWorker is performing".red
        count.times do
          puts "...Hello #{name}".green
        end
      end
    end
    ```
- Mình có sử dụng thêm gem `colorize` để string được in ra console có thêm màu sắc.
- Hàm `perform` chỉ nhận các tham số đơn giản như `string`, `integer`, `boolean` được support bởi `JSON`.
- Hàm `perform` là instance method được gọi khi ta gọi class method `perform_async`.
- Để start sidekiq ở môi trường development, ta chạy các command sau để start redis vad sidekiq
- Command redis-server để chạy redis
    ```sh
    redis-server
    bundle exec sidekiq
    ```
- Vào rails console để tạo 1 job bất đồng bộ
    ```ruby
    HardWorker.perform_async("LeTanThanh", 5)
    ```
- Ta sẽ thấy hàm này trả về 1 job ID
    ```ruby
    2.5.1 :001 > HardWorker.perform_async("LeTanThanh", 5)
     => "550e1ba61c8e870711654fd3"
    ```
- Kiểm tra trên log của sidekiq, ta sẽ thấy job được lấy ra theo Job ID này và được chạy trên sidekiq.
    ```ruby
    2019-10-19T14:03:33.653Z pid=7970 tid=hg5pe class=HardWorker jid=550e1ba61c8e870711654fd3 INFO: start
    HardWorker is performing
    ...Hello LeTanThanh
    ...Hello LeTanThanh
    ...Hello LeTanThanh
    ...Hello LeTanThanh
    ...Hello LeTanThanh
    2019-10-19T14:03:33.887Z pid=7970 tid=hg5pe class=HardWorker jid=550e1ba61c8e870711654fd3 elapsed=0.234 INFO: done
    ```
- Sidekiq còn cung cấp thêm 2 class method là `perform_in` và `perform_at` bên cạnh `perform_async`.
- Với 2 class method này, job sẽ được lên schedule theo tham số truyền vào method chứ không thưc hiện ngay khi được lấy ra khỏi queue như method `perform_async`.
    ```ruby
    HardWorker.perform_in(2.minutes, "LeTanThanh", 2)
    HardWorker.perform_at(2.minutes.from_now, "LeTanThanh", 3)
    ```

# 3. The basic:
-  Sidekiq là framework để process background job cho phép scale up perform của Rails app gồm 3 phần chính

## a. Client:
- Sidekiq client thực hiện chạy các Ruby process cho phép bạn tạo các background job.
    ```ruby
    MyWorker.perform_async(1, 2, 3)
    Sidekiq::Client.push("class" => MyWorker, "args" => [1, 2, 3])
    ```
- Cả 2 method này đều tạo 1 hash để lưu các thông tin của job vừa được tạo, serializes hash thành chuỗi JSON và đưa vào queue của redis.
- Do đó mà các tham số truyền vào bên trong worker đều phải là các kiểu dữ kiệu đơn giản được support bởi JSON như `integer`, `float`, `string`, `boolean`, `array`, `hash`.
 
## b. Redis:
- Redis chứa tất cả data của các job được sidekiq push vào queue, lịch sử các job đã thực hiện cũng như các thông tin khác để hiển thị lên Web UI của Sidekiq
- Ở môi trường development, Sidekiq tự connect tới redis thông qua `redis:/localhost:6379`
- Ở môi trường staging và production, để connect tới redis ta cần cung cấp `ENV["REDIS_URL"]` như sau
    ```ruby
    # app/config/initializers/sidekiq.rb
    Sidekiq.configure_server do |config|
      config.redis = {url: ENV.fetch("REDIS_URL", "redis:/localhost:6379")}
    end

    Sidekiq.configure_client do |config|
      config.redis = {url: ENV.fetch("REDIS_URL", "redis:/localhost:6379")}
    end
    ```

## c. Server:
- Sidekiq server thực hiện đưa các job vào queue của Redis.
- Sidekiq server boots Rails vào trong các worker do đó bên trong các Worker có full các API của Rails (Active Record, ...)
- Sidekiq server sẽ tạo các instance của worker và gọi instance method `perfom` khi class method `perform_async` của worker được gọi.

# 4. Best Practices:
- Follow các rule dưới đây khi sử dụng Sidekiq.

## a. Make your job parameters small and simple
- Sidekiq gửi tham số của class method `perform_async` vào redis dưới dạng JSON.
- Tránh các trường hợp gửi tham số là ruby object như sau.
    ```ruby
    quote = Quote.find(quote_id)
    SomeWorker.perform_async(quote)
    ```
- Các ruby object phức tạp như trên thường sẽ được convert sang string thông qua method `to_s` thay vì convert chính xác sang JSON.
- Ngay cả khi được convert chính xác sang JSON và gửi vào queue của redis thì khi job được chạy, trạng thái của ruby object được lưu trong queue cũng có thể khác với trạng thái được lưu trong Database và job chạy sai so với kết quả mong muốn.
- Rule #1: **Don't save state to Sidekiq, save simple identifiers**
- Trong các trường hợp như vậy ta nên viết code như sau
    ```ruby
    SomeWorker.perform_async(quote_id)

    class SomeWorker
      include Sidekiq::Worker

      def perform quote_id
        quote = Quote.find quote_id
        # do something
      end
    end
    ```
- Tham số truyền vào class method `perform_async` phải là simple JSON datatypes: `string`, `integer`, `float`, `boolean`, `null (nil)`, `array` hoặc `hash`.
- Do đó ta không được sử dụng `symbol` của ruby cũng như các ruby object phức tạp làm tham số cùa class method `perform_async`.
- Sidekiq client sử dụng method `JSON.dump` để gửi data vào queue của redis.
- Sidekiq server sử dụng methof `JSON.load` để convert data từ queue của redis về datatype của Ruby và truyền vào làm tham số của  instance methof `perform`.
- Ruby symboy và các ruby object phức tạp sẽ không còn chính xac như lúc ban đầu sau khi trải qua 2 method `JSON.dump` và `JSON.load`
- Rule #2: **Don't pass symbols, named parameters or complex Ruby objects (like Date or Time!)**

## b. Make your job idempotent and transactional:
- `Idempotent` có nghĩa job có thể được thực hiện nhiều lần.
- Khi job của bạn excute được một nửa, gặp error vẫn có thể re-excute nhiều lần cho đến khi excute thành công.
- Lấy ví dụ về job thực hiện 2 công việc liên tiếp là charge card của KH và gửi mail báo cho KH biết
    ```ruby
    class ChargeCardWorker
      include Sidekiq::Worker

      def perform(card_id)
        card = Card.find card_id
        charge = card.charge(100)
        ChangeEmail.charge_success(charge).deliver
      end
    end
    ```
- Trong trường hợp `ChangeEmail.charge_success(charge).deliver` bị lỗi và job được re-excute
- Card của user sẽ bị charge nhiều lần cho đến khi gửi mail thành công gây ra thiệt hại cho user.
- Trong trường hợp này ta nên sử dụng `ActiveRecord::Base.transaction` để rollback lại các action đã thực hiện.
    ```ruby
    def perform
      ActiveRecord::Base.transaction do
        card = Card.find card_id
        charge = card.charge(100)
        ChangeEmail.charge_success(charge).deliver
      end
    rescue => error
      card.refund(100) if charge
    end
    ```
- Rule #1: **Sidekiq will execute your job at least once, not exactly one**

## c. Embrace Concurrency:
- Sidekiq được design để có thể thực hiện song song nên các job cũng cần được design sao cho có thể chạy song song mà không ảnh hưởng đến nhau.
- Sidekiq cung cấp các tính năng để điều chỉnh `concurrency` (ví dụ: số sidekiq process của 1 queue).
- Sidekiq cũng có cơ chế điều chỉnh `connection pool` để giới hạn số connection tới resource của server nếu số lượng sidekiq process vượt quá lượng truy cập cho phép.

# 5. Job Lifecycle:
- Job trog sidekiq có thể nhận 1 trong các state sau, tùy vào life cycle của job đó trong sidekiq.
- Ứng với từng state sẽ có số job tương ứng được hiển thị lên Web UI của sidekiq.

## a. Scheduled:
- Các job đã được đưa vào queue của redis và được config để enqueue vào 1 thời điểm trong tương lai.

## b. Enqueued:
- Các job đã enqueue ra khỏi queue của redis đang chờ được excute, được sắp xếp theo thời gian (nguyên tắc `FIFO`) hoặc theo `priority` của queue.

## c. Busy:
- Các job đang được process (process thành công chuyển qua state `processed`, process thất bại chuyển qua state `failed`).

## d. Processed:
- Các job đã được process thành công, life cycle của job kết thúc.

## e. Failed:
- Các job đã process thất bại (có thể chuyển qua retry hoặc dead).

### f. Retry:
- Các job đã process thất bại và được retry, chuyển sang state `enqueued` để re-execute trong tương lai,  job thất bại có thể được retry tối đa 25 lần.
 
### g. Dead:
- Các job đã process thất bại và không đươc retry, life cycle của job kết thúc, tuy nhiên vẫn được lưu lại để retry manual.

# 6. Error handling:
- Một vài job sẽ raise error khi execute, do đó sidekie cung cấp 1 số feature để handle error.

## a. Best practices:
- Sử dụng third party error service như `Honeybadger`, `Airbrake`, `Rollbar`, `BugSnag`, `Sentry`, ... các service này cung cấp những feature tương tự nhau: gửi email khi job raise error.
- Khi job raise error, sidekiq bắt lỗi này và thực hiện cơ chế retry, error service gửi thông báo cho bạn để fix bug, deploy và  sidekiq retry job success.
- Nếu không fix bug trước khi sidekiq thực hiện 25 lần retry hoặc trong 21 ngày, sidekiq sẽ không thực hiện retry nữa mà update job sang state Dead, bạn có thể fix bug và retry jpb manual trong vòng 6 tháng bằng Web UI của Sidekiq.
- Sau 6 tháng, sidekiq sẽ xóa job.

## b. Web UI:
- The Sidekiq Web UI cung cấp `Retries`và `Dead` tab list ra các job đã process thất bại (có thể retry hoặc dead) và cho phép re-execute, inspect hoặc delete manual.

## c. Deadset:
- Dead set là tập hợp các job đã fail và đã sử dụng hết số lần retry cho phép của job đó.
- Sidekiq sẽ không tự động thực hiện retry cho các job này nữa, bạn có thể thực hiện retry manual thông qua Web UI của Sidekiq.
- Dead set của Sidekiq sẽ lưu 10000 job hoặc job trong 6 tháng.
- Chỉ các job được config retry lớn hơn 0 mới được đưa vào Dead set.

# 7. The Sidekiq Configuration File:
## a. The Sidekiq Configuration File:
- Sidekiq config file là file YAML, mặc định là `app/config/sidekiq.yml` lưu các thông tin config cho Sidekiq server.
- Chỉ tạo file nếu cần custom các advance của sidekiq, nếu không sidekiq sẽ sử dụng các config mặc định.
    ```ruby
    # app/config/sidekiq.yml
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
- Config cho từng môi trường sẽ override config global.
- Trong trường hợp không sử dụng file mặc định, khai báo file của bạn với `-c` option khi start sidekiq.
    ```ruby
    bundle exec sidekiq -c config/custom_sidekiq.yml
    ```

## b. Queues:
- Theo mặc định, sidekiq sử dụng queue mặc định là `default`.
- Nếu muốn dử dụng nhiều queue, ta có thể khai báo tên và weight của chúng  với `-q` option khi start sidekiq.
    ```ruby
    bundle exec sidekiq -q critical,2 -q default
    ```
- Hoặc khai báo trong file `app/config/sidekiq.yml`
    ```ruby
    # app/config/sidekiq.yml
    :queues:
      - [critical, 2]
      - default
    ```
- Queue không được khai báo weight sẽ nhận weight mặc định là 1.
- Bạn cũng có thể khai báo các queue theo 1 thứ tự nhất định và các job được đưa vào các queue sẽ được thực hiện theo đúng thứ tự khai báo của các queue.
- Khai báo khi start sidekiq
    ```ruby
    bundle exec sidekiq -q critical -q default -q low
    ```
- Khai báo trong file `app/config/sidekiq.yml`
    ```ruby
    :queues:
      - critical
      - default
      - low
    ```
- Theo đó, tất cả các job trong queue `critical` sẽ được ưu tiên execute trước.
- Sau đó, tất cả các job trong queue `default` sẽ được execute.
- Cuối cùng, tất cả các job trong queue `low` sec được execute.

## c. Workers:
- Sidekiq cung cấp 1 số option sau cho các worker

### i. queue:
- Queue của redis mà sidekiq sẽ đưa job vào, mặc định là `default`
    ```ruby
    class HardWorker
      include Sidekiq::Worker
     
      sidekiq_options queue: :crawler

      def perform(args)
      end
    end
    ```
- Bạn cũng có thể quy định queue khi khởi tạo job
    ```ruby
    HardWorker.set(queue: :crawler).perform_async(args)
    ```

### ii. retry:
- Enable re-execute job khi process thất bại, defaule là true và sẽ thực hiện retry tối đa 25 lần,
- Bạn có thể quy định lại số lần retry tối đa nếu 25 lần là quá nhiều
    ```ruby
    class LessSidekiq::Worker
      include Sidekiq::Worker
  
      # Thực hiện retry 5 lần trước khi chuyển job vào Dead set
      sidekiq_options retry: 5

      def perform(args)
      end
    end
    ```
- Bạn có thể disable retry
    ```ruby
    class NonRetryableWorker
      include Sidekiq::Worker

      # Job sẽ bị xóa nếu process thất bại
      sidekiq_options retry: false

      def perform(args)
      end
    end
    ```
- Bạn có thể skip retry, đưa job vào Deadset nếu process thất bại
    ```ruby
    class NonRetryableWorker
      include Sidekiq::Worker

       # Job sẽ bị đưa vào Deadset nếu process thất bại
      sidekiq_options retry: 0

      def perform(args)
      end
    end
    ```
- Bạn có thế disable a job được chuyển vào Dead set
    ```ruby
    class NoDeathWWorker
      include Sidekiq::Worker

      # Job sẽ được retry tối đa 5 lần trước khi bị xóa
      sidekiq_options retry: 5, dead: false
      
      def perform(args)
      end
    end
    ```

### iii. Backtrace:
- Quy định có lưu error backtrace và hiển thị lên Web UI của side kiq hay không.
- Backtrace có thể nận giá trị boolean (true, false) hoặc integer (số dòng error backtrace được lưu lại), giá trị mặc định là false.
- Backtrace có thể chiếm 1lượng lớn bộ nhớ của redis khi số lượng job tăng lên.
    ```ruby
    class HardWorker
      include Sidekiq::Worker
     
      sidekiq_options backtrace: 5

      def perform(args)
      end
    end
    ```
    
# 8. Scheduled Jobs:
- Sidekiq cho phép bạn config thời gian execute của job.
- Bạn có thể sử dụng class methof `perform_in` và `perform_at` để lên schedule cho jon thay vì sử dụng class methof `perform_async`
    ```ruby
    MyWorker.perform_in(3.hours, "kime", 1)
    MyWorker.perform_at(3.hours.from_now, "kime", 1)
    ```

## a. Timezone:
- Sidekiq's schedule gọi method `to_f` với tham số truyển vào `perform_in` và `perform_at` nên không bị phụ thuộc vào time zone.

## b. Checking for new jobs:
- Sidekiq kiểm tra các job đã được schedule theo interval khoảng 5s 1 lần.
- Bạn có thể config lại interval như sau
    ```ruby
    Sidekiq.configure_server do |config|
      config.average_scheduled_poll_interval = 10
    end
    ```
    
# 9. Delayed extensions:
- Delayed extensions support chạy các methid bất đồng bộ,
- Mặc định, tất cả các class method và `ActionMailer` deliveries đều có thể chạy bất đồng bộ.
- Sidekiq 5+ disable delayed extension, để bật chức năng này, gọi hàm `enable_delay!` 
    ```ruby
    # app/config/seidekiq.rb
    Sidekiq::Extensions.enable_delay!
    ```
   
## a. Action Mailer:
- Sử dụng class method `delay` để gửi mail bất đồng bồ.
    ```ruby
    UserMailer.delay.welcome_mail(user_id)
    ```

- Sử dụng class_method `delay_for` và `delay_until` để gử mail bất đồng bộ vào 1 thời điểm trong tương lai
    ```ruby
    UserMailer.delay_for(5.days).welcome_mail(user_id)
    UserMailer.delay_until(5.dáy.from_now).welcome_mail(user_id)
    ```

## b. Active Record.
- Tương tự ta cũng có thể sử dụng `delay`, `delay_for` và `delay_until` cho `ActiveRecord` class
    ```ruby
    User.delay.delete_old_users(user_ids)
    User.delay_for(2.weeks).delete_old_users(user_ids)
    User.delay_until(2.weeks.from_now).delete_old_users(user_ids)
    ```

## c. Class Methods:
- Tương tự ta cũng có thể sử dụng `delay`, `delay_for` và `delay_until` cho class method
    ```ruby
    MyClass.delay.do_something(args)
    MyClass.delay_for(2.weeks).do_something(args)
    MyClass.delay_until(2.weeks.from_now).do_something(args)
    ```
    
## d. Advances Options:
- Bạn có thể thêm các tham số khác cho hàm `delay`, `delay_for` và `delay_until`
     ```ruby
    MyClass.delay(queue: "low").do_something(args)
    MyClass.delay_for(2.weeks, retry: 5).do_something(args)
    MyClass.delay_until(2.weeks.from_now, dead: false).do_something(args)
    ```
    
# 10. Active Job
- Rails 4.2 giới thiệu `Active Job`.
- `Active Job` là interface chuẩn để tương tác với jon runners.
- `Active Job` có thể config để chạy với `Sidekiq`.

## a. Active Job Setup:
- Set Active Job adapter to :sidekiq.
    ```ruby
    # app/config/application.rb
    config.active_job.queue_adapter = :sidekiq
    ```
- Tạo job mới
    ```
    rails g job example
    ```
- Chạy command ở trên sẽ tạo ra `example_job.rb`
    ```ruby
    # app/jobs/example_job.rb
    class ExampleJob < ActiveJob::Base
      queue_as: :default

      def perform(args)
      end
    end
    ```
    
## b. Useage:
- Gọi class method `perform_later` để đưa job vào redis.
- Nếu job fail, sidekiq sẽ retry như bình thường.
    ```ruby
    ExampleJob.perform_later(args)
    ```
    
## c. Customizing error handling:
- Active Job không support full Sidekiq retry, thay vào đó Active Job có cơ chế retry dựa trên từng loại exception cụ thể
    ```ruby
    class ExampleJob < ActiveJob::Base
      rescue_from(ErrorLoadingSite) do
        retry_job wait: 5.minutes, queue: :low_priority
      end

      def perform(args)
      end
    end
    ```
- Theo mặc định Active Job sẽ thực hiện retry 3 lần, mỗi lần cách nhau 5s.
- Khi tất cả retry kết thúc (sau khoảng 15-30s) Active Job sẽ đưa job trở lại Sidekiq retry.
- Sidekiq 6.0.1 có thể thêm `sidekiq_options` vào `Active Jov` để config Sidekiq retry
    ```ruby
    class ExampleJob < ActiveJob::Base
      sidekiq_options retry: 5

      def perform args
      end
    end
    ```

## d. Action Mailer:
- `Action Mailer` nay có thêm method `deliver_later` giúp gửi mail bất đồng bộ (mail được gửi nhoe background job).
- Khi Active Job được setup cùng với Sidekiq, chúng ta có thể sử dụng class method `deliver_later`.
- Không giống như sidekiq, ActiveJob sẽ serialize active record instance với GLobal ID.
- Mailer được đưa vào `mailers` queue, start sidekiq process queue mailer.
    ```ruby
    bundle exec sidekiq -q default -q mailers
    ```
- Để gửi messgae vào job queue mailers, chúng ta gọi class method `deliver_later` của `Mailer`
    ```ruby
    UserMailer.welcome(user).deliver_later
    ```
- Nếu bạn muốn bypass job queue và thực hiện job đông bộ, bạn có thể sử dụng class method `deliver_now` của `Mailer`
    ```ruby
    UserMailer.welcome(user).deliver_now
    ```
- Với Sidekiq chúng ta cí thể gửi mail delay, chúng ta cũng có thể làm tương tự thông qua Active Job.
    ```
    UserMailer.welcome(user).deliver_later(wait: 1.hour)
    UserMailer.welcome(user).deliver_later(wait_until: 1.hour.from_now)
    ```