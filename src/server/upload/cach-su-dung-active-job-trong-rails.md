Bạn luôn cố gắng cung cấp cho người dùng trải nghiệm tốt nhất khi họ sử dụng trang web hoặc ứng dụng của bạn? Một trong những cách quan trọng nhất để đạt được điều này là cung cấp cho họ phản hồi thật nhanh từ máy chủ. Trong bài này, chúng ta sẽ cùng khám phá cách sử dụng Rails Active Job để cho phép thực hiện việc này thông qua việc sử dụng hệ thống hàng đợi. Bạn cũng có thể sử dụng hàng đợi để giúp bình thường hóa lưu lượng truy cập hoặc tải trên máy chủ, cho phép các công việc được thực hiện khi máy chủ rảnh rỗi hơn.

Active Job lần đầu tiên được giới thiệu trong Rails 4.2 như là một cách để chuẩn hóa giao diện cho một số tùy chọn hàng đợi đã có. Các hàng đợi phổ biến nhất được sử dụng trong các ứng dụng Rails là Sidekiq, Resque, và Delayed Job. Active Job cho phép ứng dụng Rails của bạn làm việc với bất kỳ một trong số những hàng đợi kia (cũng như các hàng đợi khác) thông qua một giao diện chuẩn duy nhất. Để có danh sách đầy đủ các ứng dụng nền bạn có thể sử dụng với Rails Active Job, hãy tham khảo [trang này](http://api.rubyonrails.org/classes/ActiveJob/QueueAdapters.html). Điều quan trọng là phải xem tính năng nào được hỗ trợ bởi hệ thống hàng đợi nào, một số không hỗ trợ delayed jobs chẳng hạn.
Ngay cả khi bạn chưa sẵn sàng sử dụng hàng đợi trong ứng dụng của mình, bạn vẫn có thể sử dụng Active Job với nền Active Job Inline mặc định. Các công việc được điều khiển bằng Inline adapter sẽ được thực thi ngay lập tức.
# Sử dụng Rails Active Job
Active Job có một giao diện khá đơn giản và tập cấu hình cài đặt. Sau đây là cách tận dụng một số tính năng của nó:
## Khởi tạo một job
Active Job đi kèm với một generator mà sẽ vừa tạo ra lớp job của bạn, vừa tạo ra một file test cho nó nữa:
```
rails g job TweetNotifier
  invoke  test_unit
  create  test/jobs/tweet_notifier_job_test.rb
  create  app/jobs/tweet_notifier_job.rb
```
## Thêm mới một phần tử vào hàng đợi
Nếu bạn muốn xử lý job càng sớm càng tốt, bạn có thể sử dụng phương pháp `perform_later`. Ngay khi một worker rảnh rỗi, nó sẽ tiến hành xử lý job đó.
```
UpdateUserStatsJob.perform_later user
```
## Đưa phần tử vào hàng đợi để xử lý sau
Nếu bạn muốn job được thực hiện sau một tuần kể từ bây giờ, một số hàng đợi nền cho phép bạn truyền thêm vào các thông số chỉ thời gian khi thêm một job:
```
UserReminderJob.set(wait: 1.week).perform_later user
```
## Điều gì xảy ra trong một lớp job?
Lớp job là nơi bạn đặt code sẽ được thực hiện bởi hàng đợi. Có một phương thức `perform` sẽ được gọi và được truyền vào bất cứ thông số nào đã được truyền khi job được đưa vào hàng đợi lần đầu tiên (khi bạn gọi phương thức `perform_later`).
```
class UpdateUserStatsJob < ActiveJob::Base 
  queue_as :default

  def perform(user) 
    user.update_stats 
  end 
end
```
# Sử dụng Rails Active Job với Sidekiq và Resque
Cả Sidekiq và Resque đều yêu cầu Redis đã được cài đặt trên máy của bạn, nơi mà chúng sẽ lưu trữ các phần tử trong hàng đợi. Để sử dụng một trong hai, bạn nên làm theo các hướng dẫn trên trang [Resque GitHub](https://github.com/resque/resque) hoặc [Sidekiq wiki](https://github.com/mperham/sidekiq/wiki).
Chúng ta sẽ cần chỉ cho Active Job rằng chúng ta đang sử dụng hàng đợi nào, có thể được thực hiện trong file cấu hình của application. Trong ví dụ này, mình sẽ làm việc với Sidekiq:
```
module MyApp
  class Application < Rails::Application
    config.active_job.queue_adapter = :sidekiq
  end
end
```
Sidekiq và Resque đều có giao diện web để xem thông tin về các worker cũng như job nào đang ở trong hàng đợi. Sidekiq hiệu quả hơn và nhanh hơn Resque nhưng yêu cầu code Ruby của bạn là đảm bảo [thread-safe](https://bearmetal.eu/theden/how-do-i-know-whether-my-rails-app-is-thread-safe-or-not/). Ngoài ra, mặc dù điều này là hơi thiên về cảm nhận cá nhân mình thì Sidekiq có một giao diện web đẹp hơn giao diện của Resque.
# Một số trường hợp thường sử dụng đến hàng đợi
Có một số công việc mà bạn nên xử lý trong hàng đợi. Để giúp bạn xác định được khi nào xử lý các công việc trong queue, bạn cần trả lời được hai câu hỏi: Nó cần phải xảy ra ngay bây giờ và/hoặc nếu nó có thể mất một thời gian dài để sử lý.

Nếu cần thiết phải xảy ra ngay (ví dụ Thông tin thẻ tín dụng của ai đó có chính xác không), bạn phải xử lý nó trước khi phản hồi được trả về cho người dùng. Thậm chí, bạn nên suy nghĩ đến trải nghiệm với vai trò người dùng, bạn nên gửi một thông báo để cho họ biết rằng bạn đang xử lý thông tin của họ và có thể mất chút thời gian.

## Gửi Email
Gửi mail là một trong những tác vụ phổ biến có thể và nên được thực hiện trong background job. Đâu nhất thiết phải bắt buộc rằng email phải được gửi ngay lập tức (ngay trước khi response kịp render) nên tôi luôn nhét việc gửi mail đến hàng đợi. Thậm chí nếu server chỉ mất 100ms để phản hồi, thì tức là bạn đang bắt người dùng đợi 100ms mặc dù không cần thiết. 

Việc gửi mail thông qua background job là điều đơn giản với Active Job, bởi phần lơn nó được xây dựng trong ActionMailer.

Bằng cách thay đổi phương pháp `deliver_now` `deliver_later`, Active Job sẽ tự động gửi mail không đồng bộ trong hàng đợi.

```
UserMailer.welcome(@user).deliver_later
```
## Tạo báo cáo
Để tạo báo cáo lớn thường mất nhiều thời gian, bạn muốn người dùng của bạn phải chờ đợi? Bạn cũng không muốn đặt loại tải này trên máy chủ ứng dụng của mình. Bạn có thể tạo một báo cáo trong hàng đợi và sau đó gửi email một đường link tới người dùng để tải xuống khi nó đã hoàn thiện. Mình đã thấy điều này rất hữu ích khi tạo báo cáo cho bộ phận kế toán, thường phải download báo cáo với hàng triệu hồ sơ trong đó.

Một luồng xử lý để tạo báo cáo:
+ Cho phép người dùng chỉ định báo cáo nào họ muốn tạo cùng với tất cả các bộ lọc của nó.
+ Thêm công việc vào hàng đợi để tạo báo cáo này.
+ Người dùng sẽ ngay lập tức thấy một trang hoặc thông báo cho họ biết rằng báo cáo của họ đã được gửi để xử lý và họ có thể mong đợi nhận được nó như thế nào.
+ Người dùng sẽ được thông báo trong giao diện người dùng của trang web hoặc ứng dụng rằng tệp đó đã sẵn sàng để tải xuống, họ sẽ nhận được một email có liên kết để tải xuống báo cáo đã hoàn thành.

## Thông báo cho nguời khác về thay đổi
Khi người dùng tạo nội dung mới (ví dụ: họ tweet cái gì đó), bạn thường phải thông báo cho người khác về sự thay đổi đó. Xác định ai thông báo có thể là một quá trình khó khăn (chậm, mất thời gian) và không có lý do để làm chậm trải nghiệm của người dùng đang tạo nội dung này.

Nếu tweet được tạo thành công, bạn có thể thêm một công việc trong bộ điều khiển để thông báo cho người dùng đã được đề cập hoặc những người theo dõi người dùng này.
```
def create 
  @tweet = Tweet.new(tweet_params)

  respond_to do |format| 
    if @tweet.save 
      TweetNotifierJob.perform_later(@tweet) 
      format.html { redirect_to @tweet, notice: 'Tweet was successfully created.' }    
      format.json { render :show, status: :created, location: @tweet } 
    else 
      format.html { render :new } 
      format.json { render json: @tweet.errors, status: :unprocessable_entity } 
    end 
  end 
end
```

Trong lớp Job, chúng ta chỉ đơn giản có thể truyền công việc này sang một lớp chuyên biệt để thông báo cho người dùng về tweet này:

```
class TweetNotifierJob < ActiveJob::Base 
  queue_as :default

  def perform(tweet) 
    TweetNotifier.new(tweet).notify 
  end 
end
```
Lớp TweetNotifier thực hiện phần lớn công việc. Nó phân tích Tweet tìm kiếm người được đề cập đến và cũng thêm Tweet này vào dòng thời gian của bất kỳ người dùng nào đã follow người dùng này.

```
class TweetNotifier

  def initialize(tweet) 
    @tweet = tweet 
  end

  def notify 
    notify_mentions 
    notify_followers 
  end

  private

    def notify_mentions
      # search for @ mentions and notify users
    end
    
    def notify_followers
      # add tweet to timelines of user's followers
    end

end
```

# Tổng kết
Active Job là một bổ sung hữu ích cho Rails. Nó sẽ không giúp bạn thoát khỏi việc phải học cách sử dụng tốt nhất phần mềm hàng đợi mà bạn sẽ kết thúc, nhưng nó sẽ cung cấp một giao diện đơn giản và sạch sẽ để thêm việc làm và xử lý những công việc đó, bất kể phụ trợ. Nếu bạn đang bắt đầu một dự án Rails mới hoặc thêm một hệ thống xếp hàng vào một hệ thống hiện có, chắc chắn bạn sẽ nghĩ về việc sử dụng Active Job thay vì nói chuyện trực tiếp với hàng đợi.

Sử dụng hàng đợi có thể làm tăng khả năng sử dụng trang web của bạn (bằng cách giảm thời gian phản hồi), cung cấp thời gian phản hồi phù hợp và tải máy chủ (bằng cách truyền tải nặng nề lên các máy chủ và công nhân khác nhau) và mở cánh cửa mới cho trang web của bạn có thể làm xử lý ra khỏi yêu cầu người sử dụng / đáp ứng dòng chảy).