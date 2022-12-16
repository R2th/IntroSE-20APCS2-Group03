Bạn luôn cố gắng mang đến cho người dùng trải nghiệm tốt hơn khi sử dụng trang web hoặc ứng dụng của bạn? Một trong những cách quan trọng nhất để đạt được điều này là bằng cách giảm thời gian response của server. Trong bài này, chúng ta sẽ khám phá về Active Job -  cho phép thực hiện việc đó bằng hệ thống hàng đợi (queueing backends). Bạn cũng có thể sử dụng hàng đợi để giúp giảm lưu lượng truy cập hoặc tải lên server, cho phép công việc được thực hiện khi server "rảnh" hơn.
# Active Job là gì? 
Active Job trong Rails là một framework giúp tạo ra các tác vụ (job) và cho phép chúng chạy trên một số hệ thống hàng đợi (queueing backends) khác nhau. Các tác vụ có thể là dọn dẹp thường xuyên theo định kì, upload ảnh lên server, gửi mail... Các hệ thống hàng đợi phổ biến nhất được sử dụng trong ứng dụng Rails là Sidekiq, Resque và Delayed Job.
# Sử dụng Active Job
Active Job có giao diện và bộ cài đặt cấu hình khá đơn giản. Dưới đây, cách sử dụng các tính năng của nó:
## Tạo Job
Active Job khi được tạo qua command sẽ bao gồm job và các stub cần thiết.
```ruby
rails g job TweetNotifier
  invoke  test_unit
  create  test/jobs/tweet_notifier_job_test.rb
  create  app/jobs/tweet_notifier_job.rb
```
Trong Job Class được tạo ra, method #perform được gọi khi Job được thực thi, ta có thể truyền tùy ý tham số vào method này
``` ruby
class TweetNotifierJob < ActiveJob::Base 
  queue_as :default

  def perform(user) 
    user.update_stats 
  end 
end
```
## Thêm Job vào hàng đợi
Ta có các lựa thêm job vào hàng đợi như dưới đây:
``` ruby
# Thêm job vào hàng đợi để chạy sớm nhất có thể khi server rảnh
GuestsCleanupJob.perform_later guest
```
``` ruby
# Thêm job vào hàng đợi để chạy vào thời gian định sẵn
GuestsCleanupJob.set(wait_until: Date.tomorrow.noon).perform_later(guest)
```
``` ruby
# Thêm job vào hàng đợi để chạy sau khoảng thời gian chờ kể từ hiện tại
GuestsCleanupJob.set(wait: 1.week).perform_later(guest)
```
``` ruby
# `perform_now` and `perform_later` sẽ gọi method `perform` vì thể có thể truyền tùy ý các tham số
GuestsCleanupJob.perform_later(guest1, guest2, filter: 'some_filter')
```
## Thực thi Job
Nếu không được set adapter, job sẽ được thực thi ngay lập tức.
### Backends
Active Job cung cấp các adapters có sẵn cho một số hệ thống hàng đợi như: Sidekiq, Resque, Delayed Job,... Bạn có thể xem chi tiết tại document của [ActiveJob::QueueAdapters ](https://api.rubyonrails.org/classes/ActiveJob/QueueAdapters.html)
### Cài đặt Backend
Bạn có thể cài đặt cho hệ thống hàng đợi cho ứng dụng của mình.
``` ruby
# config/application.rb
module YourApp
  class Application < Rails::Application
    # Be sure to have the adapter's gem in your Gemfile and follow
    # the adapter's specific installation and deployment instructions.
    config.active_job.queue_adapter = :sidekiq
  end
end
```
## Hàng đợi
Hầu hết các adapter hỗ trợ nhiều hàng đợi. Bạn có thể lập lịch cho job chạy trên một hàng đợi cụ thể
``` ruby
class GuestsCleanupJob < ActiveJob::Base
  queue_as :low_priority
  #....
end
```
Nếu muốn quản lý rõ ràng hơn hàng đợi mà job sẽ chạy, bạn có thể dùng method #set như sau:
``` ruby
MyJob.set(queue: :another_queue).perform_later(record)
```
Hoặc muốn quản lý từ Job level, bạn có thể truyền 1 block vào method #queue_as. Block sẽ được thực thi trong job context (có thể gọi self.arguments) và phải trả về tên hàng đợi.
``` ruby
class ProcessVideoJob < ActiveJob::Base
  queue_as do
    video = self.arguments.first
    if video.owner.premium?
      :premium_videojobs
    else
      :videojobs
    end
  end

  def perform(video)
    # do process video
  end
end

ProcessVideoJob.perform_later(Video.last)
```
## Callbacks
Active Job cung cấp các hooks trong vòng đời của 1 job. Callback cho phép gắn xử lý logic trong vòng đời của job.
###  Callbacks có sẵn
> * before_enqueue
> * around_enqueue
> * after_enqueue
> * before_perform
> * around_perform
> * after_perform
### Cách dùng callbacks
``` ruby
class GuestsCleanupJob < ActiveJob::Base
  queue_as :default

  before_enqueue do |job|
    # do something with the job instance
  end

  around_perform do |job, block|
    # do something before perform
    block.call
    # do something after perform
  end

  def perform
    # Do something later
  end
end
```sql
# Một số tác vụ nên dùng Active Job
## Gửi email
Gửi email là nhiệm vụ phổ biến nhất có thể và nên được thực hiện trong background job. Không có lý do để gửi email ngay lập tức (trước khi response được hiển thị), tất cả các email nên được chuyển đến hàng đợi. Ngay cả khi máy chủ email phản hồi trong 100ms, thì vẫn còn 100ms mà bạn đang làm cho người dùng chờ đợi không cần thiết.
Gửi email thông qua 1 background job là cực kỳ đơn giản với Active Job, do nó được tích hợp sẵn trong ActionMailer.
Bằng cách đổi method deliver_now sang deliver_later, Active Job sẽ tự động gửi email trong hàng đợi một cách bất đồng bộ. 
``` ruby
UserMailer.welcome(@user).deliver_later
```
## Xử lý ảnh
Hình ảnh có thể mất thời gian để được xử lý. Càng mất thời gian hơn nếu bạn có một vài (hoặc nhiều) kiểu và kích cỡ ảnh khác nhau cần tạo. May thay, cả [Paperclip](https://github.com/thoughtbot/paperclip) và [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) đều có gem bổ sung có thể giúp xử lý những hình ảnh này trong hàng đợi thay vì tại thời điểm tải lên.

Paperclip sử dụng một gem  [Delayed Paperclip](https://github.com/jrgifford/delayed_paperclip), hỗ trợ Active Job và CarrierWave sử dụng gem [CarrierWave Backgrounder](https://github.com/lardawge/carrierwave_backgrounder). 
Với  [Delayed Paperclip](https://github.com/jrgifford/delayed_paperclip), bạn chỉ cần gọi một method bổ sung để cho nó biết những gì bạn muốn xử lý trong background và gem sẽ xử lý phần còn lại. Bạn có thể yêu cầu nó xử lý một số kiểu ngay lập tức, trong khi các kiểu khác được xử lý trong hàng đợi.
``` ruby
class User < ActiveRecord::Base
  has_attached_file :avatar, styles: { small: "25x25#", medium: "50x50#", large: "200x200#" }, only_process: [:small]

  process_in_background :avatar, only_process: [:medium, :large] 
end
```
Ví dụ trên cho phép xử lý ảnh :small ngay lập tức, còn :medium và :large thì được thực hiện trong background.
## Upload nội dung
Thông thường khi bạn có user tải lên nội dung, nó cần được xử lý. Đây có thể là tệp CSV cần được nhập vào hệ thống, hình ảnh cần tạo hình thu nhỏ hoặc video cần xử lý.
Một tệp CSV lớn có thể mất vài phút để xử lý, trong thời gian đó, kết nối có thể bị timeout. Bạn nên xử lý hầu hết các dữ liệu tải lên không đồng bộ trong hàng đợi.
Quá trình sử dụng như sau:
1. Chấp nhận tệp và tải nó lên S3 (hoặc bất cứ nơi nào bạn đang lưu trữ nội dung do người dùng tạo).
2. Thêm một job vào hàng đợi để xử lý tệp này.
3. Người dùng sẽ thấy ngay một trang thành công cho họ biết rằng tệp của họ đã được gửi để xử lý.
4. Hệ thống sẽ tải tập tin, xử lý nó và đánh dấu nó đã được xử lý.
Một lưu ý khác là bạn sẽ muốn lưu trữ một báo cáo về việc nhập trong cơ sở dữ liệu. Nó có thể bao gồm bất kỳ bản ghi nào không được xử lý do dữ liệu không hợp lệ. Điều cần làm là tạo tệp tin thông báo lỗi cho mỗi lần nhập để user có thể download.
## Sử dụng API bên ngoài
Các API bên ngoài có thể không ổn định, chậm và trải nghiệm của người dùng không nên phụ thuộc vào chúng bất cứ khi nào có thể. Ví dụ, bên dưới nơi ta sử dụng địa chỉ IP để tìm hiểu một số thông tin địa lý bằng cách sử dụng API Telize. Nó thường phản hồi trong 200ms đến 500ms, được thêm vào thời gian phản hồi hiện tại của bạn, có thể tạo ra sự khác biệt lớn. Tất cả các API bên ngoài nên được xử lý theo cùng một cách: Dùng background job nếu có thể. 
Đầu tiên, ta lên lịch thực thi 1 job, truyền vào địa chỉ IP của request hiện tại.
``` ruby
LogIpAddressJob.perform_later(request.remote_ip)
```
``` ruby
class LogIpAddressJob < ActiveJob::Base
  queue_as :default

  def perform(ip) 
    ip = "66.207.202.15" if ip == "::1" 
    LogIpAddress.log(ip) 
  end 
end
```
Ở đây ta thực hiện các công việc thực tế sẽ được thực hiện. Ta sẽ thực hiện một request  từ xa thực sự đến API để hiển thị thời gian yêu cầu như thế này có thể mất bao lâu.
``` ruby
class LogIpAddress

  def self.log(ip) 
    self.new(ip).log 
  end

  def initialize(ip) 
    @ip = ip 
  end

  def get_geo_info 
    HTTParty.get("http://www.telize.com/geoip/#{@ip}").parsed_response 
  end

  def log 
    geo_info = get_geo_info 
    Rails.logger.debug(geo_info) 
    # log response to database 
  end

end
```
Bạn có thể thấy những gì đã diễn ra trong Rails logs:
``` ruby
[ActiveJob] Enqueued LogIpAddressJob (Job ID: 839db962-28a0-4e9d-9168-b08674ba192f) to Inline(default) with arguments: "::1"
[ActiveJob] [LogIpAddressJob] [839db962-28a0-4e9d-9168-b08674ba192f] Performing LogIpAddressJob from Inline(default) with arguments: "::1"
[ActiveJob] [LogIpAddressJob] [839db962-28a0-4e9d-9168-b08674ba192f] {"longitude"=>-79.4167, "latitude"=>43.6667, "asn"=>"AS21949", "offset"=>"-4", "ip"=>"66.207.202.15", "area_code"=>"0", "continent_code"=>"NA", "dma_code"=>"0", "city"=>"Toronto", "timezone"=>"America/Toronto", "region"=>"Ontario", "country_code"=>"CA", "isp"=>"Beanfield Technologies Inc.", "postal_code"=>"M6G", "country"=>"Canada", "country_code3"=>"CAN", "region_code"=>"ON"}
[ActiveJob] [LogIpAddressJob] [839db962-28a0-4e9d-9168-b08674ba192f] Performed LogIpAddressJob from Inline(default) in 572.39ms
```
# Kết luận
Active Job là một bổ sung tuyệt vời của Rails. Nó cung cấp một interface rõ ràng và duy nhất để thêm công việc và xử lý các job. Nếu bạn đang bắt đầu một dự án Rails mới hoặc thêm một hệ thống xếp hàng vào một dự án hiện có, chắc chắn hãy nghĩ đến việc sử dụng Active Job thay vì làm trực tiếp với hàng đợi.
Sử dụng hàng đợi có thể tăng tính khả dụng trang web (bằng cách giảm thời gian phản hồi), cung cấp thời gian phản hồi và tải server phù hợp hơn (bằng cách truyền tải nhiều công việc và server khác nhau).
# Tài liệu tham khảo
1. https://guides.rubyonrails.org/v4.2/active_job_basics.html#queues
2. https://blog.codeship.com/how-to-use-rails-active-job/
3. https://medium.com/@josh_works/sidekiq-and-background-jobs-for-beginners-89c95fef786f