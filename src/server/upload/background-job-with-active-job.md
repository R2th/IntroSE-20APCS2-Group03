# 1. Background job:
- Đôi khi chúng ta cần implement 1 feature nào đó thực hiện nhiều action khác nhau bao gồm cả các action 
- Ví dụ như khi user đăng ký account mới thì sẽ gửi confirm email cho user, khi KOL của shop đăng bài thì sẽ gửi notification cho toàn bộ follower của KOL, ...
- Nếu thực hiện tuần tự đầy đủ các action xong mới trả response về cho user thì sẽ chờ khá lâu, ảnh hưởng đến trải nghiệm của user, ví dụ như khi số followr của KOL tăng lên thì mỗi lần đăng bài thì sẽ gửi notification đến nhiều user hơn và KOL cũng phải chờ lâu hơn.
- Trong các trường hợp đó, ta sẽ đưa các action nào vào queue, hệ thống sẽ enqueue và thực hiện chạy ngầm các action này, khi đó các action này được gọi là background job.

# 2. Active Job:
![](https://images.viblo.asia/0cfe6812-3084-4331-a50c-6a34c0673cf6.jpg)
## a. Introduction:
- `Active Job` là framework của Rails cho phép ta khai báo các background job khác nhau
- Ta có thể sử dụng `Active Job` với các queue backend khác nhau như [Delayed Job](https://github.com/collectiveidea/delayed_job), [Sidekiq](https://github.com/mperham/sidekiq) hoặc [Resque](https://github.com/resque/resque).
- Danh sách các queue backend đầy đủ của Active Job được update tạo [đây](https://api.rubyonrails.org/classes/ActiveJob/QueueAdapters.html).
- `Active Job` đảm bảo chúng ta có thể thay đổi qua lại giữa các queue backend mà không cần phải viết lại các job đã implement trước đó.

## b. Creating a job:
### i. Create demo app:
- Chạy command tạo rails app
    ```ruby
    rails new demo_active_job_revise
    ```
- Chạy command tạo model user
    ```ruby
    rails g model user name:string email:string
    rails db:migrate
    ```
- Thêm gem `ffaker` vào Gemfile
    ```ruby
    # Gemfile
    gem "ffaker"
    ```
- Chạy command để install gem 
    ```ruby
    bundle install
    ```
- Tạo seed users
    ```ruby
    # db/seeds.rb
    10.times do
      User.create name: FFaker::Name.name , email: FFaker::Internet.email
    end
    ```
- Chạy command để tạo seed users
    ```ruby
    rails db:seed
    ```

### ii. Create the Job:
- Chúng ta sẽ tạo 1 background job để tạo random user tương tự như cách ta đã làm khi tạo seed users.
- Chạy command để tạo job.
    ```ruby
    rails g job create_random_user
    ```
- Generator sẽ tạo file `app/jobs/create_random_user_job.rb` như sau
    ```ruby
    # app/jobs/create_random_user_job.rb
    class CreateRandomUserJob < ApplicationJob
      queue_as :default

      def perform(*args)
        # Do something later
      end
    end
    ```
- Ta có thể truyền thêm ham số `--queue` khi tạo job
    ```ruby
    rails g job create_random_user --queue urgent
    ```
- Khi đó generator sẽ tạo file `app/jobs/create_random_user_job.rb` như sau
    ```ruby
    # app/jobs/create_random_user_job.rb
    class CreateRandomUserJob < ApplicationJob
      queue_as :urgent

      def perform(*args)
        # Do something later
      end
    end
    ```
- Update lại hàm `perform`
    ```ruby
    # app/jobs/create_random_user_job.rb
    def perform()
      User.create name: FFaker::Name.name , email: FFaker::Internet.email
    end
    ```
    
### iii. Enqueue the Job:
- Để enqueue job ta có thể gọi
    ```ruby
    # Enqueue a job to be performed as soon the queuing system is free
    CreateRandomUserJob.perform_later
    ```
- Khi đó ta sẽ thu đươc log trên console 
    ```ruby
    Enqueued CreateRandomUserJob (Job ID: 6fa80570-7b2c-4263-b97a-e707797cadd6) to Async(default)
     => #<CreateRandomUserJob:0x00000000046de8c8 @arguments=[], @job_id="6fa80570-7b2c-4263-b97a-e707797cadd6", @queue_name="default", @priority=nil, @executions=0, @provider_job_id="c881286e-b834-46c5-b75a-8b97ab0d51d8"> 
    2.5.1 :002 > Performing CreateRandomUserJob (Job ID: 6fa80570-7b2c-4263-b97a-e707797cadd6) from Async(default)
       (0.1ms)  begin transaction
      User Create (0.2ms)  INSERT INTO "users" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["name", "Earl Moore"], ["email", "frances@durganoconnell.name"], ["created_at", "2019-07-01 04:19:25.463957"], ["updated_at", "2019-07-01 04:19:25.463957"]]
       (12.5ms)  commit transaction
    Performed CreateRandomUserJob (Job ID: 6fa80570-7b2c-4263-b97a-e707797cadd6) from Async(default) in 64.11ms
    ```
- Hoặc log trên development.log
    ```ruby
    [ActiveJob] [CreateRandomUserJob] [51ecf695-70c1-4567-b843-3e3cb9319e10] Performing CreateRandomUserJob (Job ID: 51ecf695-70c1-4567-b843-3e3cb9319e10) from Async(default)
    [ActiveJob] [CreateRandomUserJob] [51ecf695-70c1-4567-b843-3e3cb9319e10]   [1m[35m (0.1ms)[0m  [1m[36mbegin transaction[0m
    [ActiveJob] [CreateRandomUserJob] [51ecf695-70c1-4567-b843-3e3cb9319e10]   [1m[36mUser Create (0.6ms)[0m  [1m[32mINSERT INTO "users" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)[0m  [["name", "Earl Moore"], ["email", "frances@durganoconnell.name"], ["created_at", "2019-07-01 04:19:08.410595"], ["updated_at", "2019-07-01 04:19:08.410595"]]
    [ActiveJob] [CreateRandomUserJob] [51ecf695-70c1-4567-b843-3e3cb9319e10]   [1m[35m (15.6ms)[0m  [1m[36mcommit transaction[0m
    [ActiveJob] [CreateRandomUserJob] [51ecf695-70c1-4567-b843-3e3cb9319e10] Performed CreateRandomUserJob (Job ID: 51ecf695-70c1-4567-b843-3e3cb9319e10) from Async(default) in 20.48ms
    [ActiveJob] Enqueued CreateRandomUserJob (Job ID: 239274e1-161d-455f-a795-9c0083377e96) to Async(default)
    ```
- Ta có thể sử dụng hàm `set` và truyền thêm params để tùy chỉnh thời gian job đươc enqueue
    ```ruby
    # Enqueue a job to be performed tomorrow at noon.
    CreateRandomUserJob.set(wait_until: Date.tomorrow.noon).perform_later

    # Enqueue a job to be performed 1 week from now.
    CreateRandomUserJob.set(wait: 1.week).perform_later
    ```

## c. Exception:
- `Active Job` sử dụng `rescue_from exception` để catch và handle exception
    ```ruby
    class UpdateRandomUserJob < ApplicationJob
      queue_as :default

      rescue_from(ActiveRecord::RecordNotFound) do |exception|
        puts "Please check again ActiveRecord::RecordNotFound #{exception.message}"
      end

      def perform(user_id)
        user = User.find user_id
        user.update_attributes name: FFaker::Name.name , email: FFaker::Internet.email
      end
    end
    ```

## d. Document:
- Source code của demo app mình đang để ở [đây](https://github.com/LeTanThanh/demo_active_job_revise).
- Bạn có thể tìm hiểu thêm về Active Job ở [đây](https://guides.rubyonrails.org/active_job_basics.html).