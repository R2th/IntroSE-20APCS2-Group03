## Giới thiệu

 Bạn có một background jobs và bạn không biết bắt đầu từ đâu? 

Hãy bắt đầu với một số thuật ngữ: Backrgound job là gì?

Dưới đây là 2 định nghĩa sẽ giúp bạn hiểu hơn về nó:

*“A background or asynchronous job (or task) is one that is processed outside of the usual request/response workflow that is part of any modern web framework.”*

*“A job is typically a process that runs outside of your application request cycle.”*

Tiếp theo, gem sidekiq-scheduler:

Gem sidekiq-scheduler là một phần mở rộng của Sidekiq có thêm hỗ trợ để chạy các công việc được lên lịch, giống như các công việc định kỳ, hoặc các công việc được định kỳ thường xuyên.

## Cài đặt

Bây giờ, bạn hãy tạo một ứng dụng mới của mình và ứng dụng gem sidekiq-scheduler vào để sử dụng. Chúng ta phải cài đặt các gem cần thiết để sử dụng cho background jobs, vậy bạn hãy thêm chúng vào trong Gemfile:

```
gem 'redis-rails'
gem 'sidekiq'
gem 'sidekiq-scheduler'
```

Và để cài đặt nó bạn chạy `bundle install`.

Giải thích qua một chút về các gem trên:

Redis - Cung cấp một bộ đầy đủ các gói (Cache, Session, HTTP Cache).

Sidekiq - Xử lý background cho Ruby, sử dụng các luồng để xử lý nhiều công việc cùng một lúc trong cùng một quy trình. (Sidekiq sử dụng Redis để lưu trữ tất cả dữ liệu công việc và dữ liệu hoạt động của nó, đây là lý do tại sao chúng ta cần Redis). Tìm hiểu thêm về Gem Sidekiq  [tại đây.](https://github.com/mperham/sidekiq)

Sidekiq Scheduler - Là một phần mở rộng cho Sidekiq giúp đẩy công việc theo cách được lên lịch.

### Cấu hình

Cấu hình cho Redis, trong file config/application.rb:

`config.cache_store = :redis_store, "redis://localhost:6379/0/cache", { expires_in: 90.minutes }`

Cấu hình cho Sidekiq, trong routes.rb: `mount Sidekiq::Web => '/sidekiq'`

Tiếp theo, để sử dụng nó bạn tạo file config/sidekiq.yml. 
 File cấu hình này giúp bạn thiết lập ra lịch trình các công việc mà bạn cần thực hiện định kỳ, những công việc cần được lên lịch theo thời gian nhất định.
 
###  Cách sử dụng

 Ví dụ dưới đây sẽ giúp bạn hình dung rõ hơn và cách sử dụng của gem sidekiq-scheduler. Hãy tạo file app/jobs/hello_world.rb:
 
```
class HelloWorld < ApplicationJob

  def perform args
    puts 'Xin chào #{args}'
  end
end
```

Tiếp theo, để lập lịch chạy jobs đó theo thời gian bạn muốn, trong file config/sidekiq.yml thiết lập:

```
# config/sidekiq.yml

:schedule:
  hello_world:           
    cron: '0 * * * *'     # Thời gian chạy => Chạy mỗi phút 1 lần 
    args: "Name"
    class: HelloWorld  
```

Theo mặc định, tên công việc sẽ được lấy làm tên của class job. Nếu bạn muốn có một tên job và tên class khác, hãy cung cấp tùy chọn 'class'.

Để kiểm tra lịch trình chạy theo đúng lập lịch hay ko, bạn dùng lệnh: `sidekiq`

### Cấu hình lịch trình

Một số tùy chọn có sẵn:
```
:dynamic: <nếu đúng lịch biểu có thể được sửa đổi trong thời gian chạy [false theo mặc định]>
:dynamic_every: <nếu dynamic là đúng, lịch biểu được tải lại mỗi lần [5s theo mặc định]>
:enable: <cho phép scheduler nếu đúng [true theo mặc định]>
:scheduler:
   :listened_queues_only: <đẩy các công việc có hàng đợi đang được lắng nghe bởi sidekiq [false theo mặc định]>
```

Các công việc được lên lịch (hoặc định kỳ) về mặt logic không khác gì một công việc định kỳ tiêu chuẩn. Chúng là các công việc chạy dựa trên một lịch trình cố định được thiết lập khi khởi động.

Lịch biểu là một danh sách các lớp worker Sidekiq với các đối số và tần suất lịch biểu (theo cú pháp crontab). Lịch biểu chỉ là một Hash, và có thể được lưu trữ trong file YAML:

 ```
 CancelAbandonedOrders:
    cron: "*/5 * * * *"

  queue_documents_for_indexing:
    cron: "0 0 * * *"
    # you can use rufus-scheduler "every" syntax in place of cron if you prefer
    # every: 1h

    # By default the job name (Hash key) will be taken as worker class name.
    # If you want to have a different job name and class name, provide the 'class' option
    class: QueueDocuments

    queue: high
    args:
    description: "This job queues all content for indexing in solr"

  clear_leaderboards_contributors:
    cron: "30 6 * * 1"
    class: ClearLeaderboards
    queue: low
    args: contributors
    description: "This job resets the weekly leaderboard for contributions"
```

### Các loại  schedule

Các loại được hỗ trợ là cron, every, interval, at, in.

Cron, every, và interval đẩy công việc vào sidekiq một cách thường xuyên. 

**cron - theo mô hình tương tự như tiện ích cron, với độ phân giải giây.**
```
:schedule:
   HelloWorld :
     cron: '0 * * * * *'  # Chạy khi giây = 0
```
     
**every - kích hoạt theo một tần số nhất định:**

    every: '45m'     # Chạy cứ sau 45 phút
    
**interval tương tự như every**

Sự khác biệt giữa chúng là kiểu lập lịch interval thực hiện tiếp theo sau khi khoảng thời gian đã trôi qua tính từ công việc cuối cùng của nó.

Lưu ý rằng every và interval tính từ khi quá trình Sidekiq bắt đầu (bắt đầu lại). Vì vậy, `every: '48h'` sẽ không bao giờ chạy nếu quá trình Sidekiq được khởi động lại hàng ngày.
Ví dụ, bạn có thể làm `every: ['48h', first_in: '0s']` để thực hiện công việc ngay lập tức sau khi khởi động lại, và sau đó kiểm tra nhân viên khi nó chạy lần cuối.

**at -  trong các loại đẩy công việc chỉ một lần. at - lịch trình trong một thời điểm:**

 `at: '3001/01/01'`
 
Bạn có thể chỉ định bất kỳ chuỗi nào DateTime.parse và Chronic. Để bật chuỗi Chronic, bạn phải thêm nó dưới dạng phụ thuộc.

**in - kích hoạt sau một khoảng thời gian đã trôi qua:**

`in: '1h'  # đẩy một công việc sidekiq trong 1 giờ, sau khi khởi động`

Bạn có thể cung cấp tùy chọn every hoặc cron thông qua một mảng:

```
hello_world:
    every: ["30s", :first_in => '120s']
    class: HelloWorld
    description: "This job will check HelloWorld every 30 seconds after 120 seconds after start"
```

Thời gian lập lịch theo tiêu chuẩn:

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
```

Bạn có thể tham khảo thêm [tại đây.](https://crontab.guru/)

LƯU Ý: Sáu thông số của cron cũng được hỗ trợ (vì chúng được hỗ trợ bởi bộ lập lịch rufus, cung cấp khả năng cho quá trình lập lịch biểu sidekiq). Điều này cho phép bạn lên lịch công việc mỗi giây (nghĩa là: 30 * * * * *sẽ sa thải một công việc cứ sau 30 giây).
 
 ```
# ┌───────────── second (0 - 59)
# │ ┌───────────── minute (0 - 59)
# │ │ ┌───────────── hour (0 - 23)
# │ │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday; 7 is also Sunday on some systems)
# │ │ │ │ │ |
# │ │ │ │ │ |
# * * * * * command to execute
```

Ví dụ:

```
hello_world:
  cron: '45 30 6 * * *'
  class: HelloWorld
  args: "Name"
```

### Loading scheduler

Trong gem sidekiq-scheduler file thiết lập lịch trình sẽ mặc định là config/sidekiq.yml. Nếu trong trường hợp bạn sử dụng 1 tên khác thì bạn có thể định nghĩa lại nó trong `config/initializers/scheduler.rb`:

```
require 'sidekiq/scheduler'

Sidekiq.configure_server do |config|
  config.on(:startup) do
    Sidekiq.schedule = YAML.load_file(File.expand_path('../../ten_file.yml', __FILE__))
    Sidekiq::Scheduler.reload_schedule!
  end
end
```

## Kết luận

Bài viết trên đã giới thiệu một cách tổng quát về Background jobs và cách sử dụng gem sidekiq-scheduler. Mong rằng bài biết sẽ giúp các bạn phần nào hiểu và ứng dụng được nó vào trong project của minh.

Các bạn có thể tham khảo thêm các bài viết dưới đây để hiểu rõ hơn về nó:

https://github.com/moove-it/sidekiq-scheduler#dynamic-schedule
https://en.wikipedia.org/wiki/Cron
https://github.com/mperham/sidekiq