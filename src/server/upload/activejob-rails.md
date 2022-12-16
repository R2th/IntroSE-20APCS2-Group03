Active Job là một framework tác để khai báo các job chạy ngầm trong hệ thống như dọn dẹp thường xuyên theo lịch trình, export data, gửi mail,...
1. Tạo job

Để tạo một background job, chúng ta có thể dùng Rails generator

```bash
bin/rails generate job guests_cleanup
invoke  test_unit
create    test/jobs/guests_cleanup_job_test.rb
create  app/jobs/guests_cleanup_job.rb
```

Hoặc tạo job chạy trên 1 queue chỉ định:

`bin/rails generate job guests_cleanup --queue urgent`

Hoặc tư tạo bằng cách tạo class GuestsCleanupJob kề thừa từ ApplicationJob:
```ruby
class GuestsCleanupJob < ApplicationJob
  queue_as :default
 
  def perform(*guests)
    # Do something later
  end
end
```

2. Enqueue the Job
Để chạy job, chúng ta có thể chạy các lệnh như sau:

`GuestsCleanupJob.perform_later guest`: Job sẽ thực thi ngay khi queue free.

`GuestsCleanupJob.set(wait_until: Date.tomorrow.noon).perform_later(guest)`: Job sẽ chạy vào chiều hôm sau

`GuestsCleanupJob.set(wait: 1.week).perform_later(guest)`: Jon sẽ chạy sau 1 tuần kể từ bây giờ

`GuestsCleanupJob.perform_later(guest1, guest2, filter: 'some_filter')`: truyền đối số vào job

3. Job Execution

Active Job có thể tích hợp đa dạng cho các queue backends như Sidekiq, Resque, Delayed Job,...

Set queue backend:

```ruby
module YourApp
  class Application < Rails::Application
    # Be sure to have the adapter's gem in your Gemfile
    # and follow the adapter's specific installation
    # and deployment instructions.
    config.active_job.queue_adapter = :sidekiq
  end
end
```

Hoặc có thể set ngay trên từng job:

```ruby
class GuestsCleanupJob < ApplicationJob
  self.queue_adapter = :resque
  #....
end
```

4. Queues
Hầu hết adapter hỗ trợ multiple queues. Active Job cho phép chúng ta có thể đặt lịch job để chạy trên một queue cụ thể.

```ruby
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  #....
end
```

Bạn có thể đặt trước tên queue cho tất cả các job của bạn bằng cách sử dụng config.active_job.queue_name_prefix trong application.rb:

```ruby
# config/application.rb
module YourApp
  class Application < Rails::Application
    config.active_job.queue_name_prefix = Rails.env
  end
end
 
# app/jobs/guests_cleanup_job.rb
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  #....
end
 
# Now your job will run on queue production_low_priority on your
# production environment and on staging_low_priority
# on your staging environment
```
Thay đổi prefix mặc định "_": `config.active_job.queue_name_delimiter in application.rb:`

```ruby
# config/application.rb
module YourApp
  class Application < Rails::Application
    config.active_job.queue_name_prefix = Rails.env
    config.active_job.queue_name_delimiter = '.'
  end
end
 
# app/jobs/guests_cleanup_job.rb
class GuestsCleanupJob < ApplicationJob
  queue_as :low_priority
  #....
end
 
# Now your job will run on queue production.low_priority on your
# production environment and on staging.low_priority
# on your staging environment
```

Chỉ định queue cho Job:

```ruby
MyJob.set(queue: :another_queue).perform_later(record)
```

Dùng #queue_as để control job:

```ruby
class ProcessVideoJob < ApplicationJob
  queue_as do
    video = self.arguments.first
    if video.owner.premium?
      :premium_videojobs
    else
      :videojobs
    end
  end
 
  def perform(video)
    # Do process video
  end
end
 
ProcessVideoJob.perform_later(Video.last)
```