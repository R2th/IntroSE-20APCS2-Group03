# 1. Introduction:
- `Delayed Job` là 1 queue backend được support bởi `Active Job` của Rails.
- `Delayed Job` được tạo ra bởi `Shopify`, sử dụng table `delayed_job` để quản lý và thực hiện các background task.

# 2. Create demo app
- Tương tự như với `Active Job` chúng ta cũng sẽ thực hiện các bước tạo demo app và sử dụng gem `delayed_job` để thực hiện các background job.
- Chạy command tạo rails app
    ```ruby
    rails new demo_delayed_job_revise
    ```
- Chạy command tạo model user
    ```ruby
    rails g model user name:string email:string
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
- Chạy commend để tạo seed users
    ```ruby
    rails db:seed
    ```
- Thêm hàm tạo và update user trong user.rb
    ```ruby
    # app/models/user.rb
    class User < ApplicationRecord
      def update_random
        update_attributes name: FFaker::Name.name , email: FFaker::Internet.email   
      end

      class << self
        def create_random
          User.create name: FFaker::Name.name , email: FFaker::Internet.email
        end
      end
    end
    ```
 
# 3. Installation:
- Thêm gem `delayed_job` vào Gemfile.
- Thêm gem `delayed_job_active_record` vào Gemfile nếu bạn sử dụng delayed_job với Active Record
- Trong trường hợp bạn sử dụng ORM khác Active Record, bạn có thể tham khảo thêm tạo [đây](https://github.com/collectiveidea/delayed_job/wiki/Backends).
    ```ruby
    # Gemfile
    gem "delayed_job"
    gem "delayed_job_active_record"
    ```
- Chạy command để install gem.
    ```ruby
    bundle install
    ```
- Chạy command để tạo table cho `delayed_job` cho  Active Record và tạo các file cần thiết
    ```ruby
    rails generate delayed_job:active_record
    rake db:migrate
    ```
- Command tạo migration cho table `delayed_job`, hãy nhìn 1 chút qua file migration đươc tạo ra.
    ```ruby
    # db/migrations/create_delayed_jobs.rb
    class CreateDelayedJobs < ActiveRecord::Migration[5.2]
      def self.up
        create_table :delayed_jobs, force: true do |table|
          table.integer :priority, default: 0, null: false # Allows some jobs to jump to the front of the queue
          table.integer :attempts, default: 0, null: false # Provides for retries, but still fail eventually.
          table.text :handler,                 null: false # YAML-encoded string of the object that will do work
          table.text :last_error                           # reason for last failure (See Note below)
          table.datetime :run_at                           # When to run. Could be Time.zone.now for immediately, or sometime in the future.
          table.datetime :locked_at                        # Set when a client is working on this object
          table.datetime :failed_at                        # Set when all retries have failed (actually, by default, the record is deleted instead)
          table.string :locked_by                          # Who is working on this object (if locked)
          table.string :queue                              # The name of the queue this job is in
          table.timestamps null: true
        end

        add_index :delayed_jobs, [:priority, :run_at], name: "delayed_jobs_priority"
      end

      def self.down
        drop_table :delayed_jobs
      end
    end
    ```
- Command cũng tạo ra file `bin/delayed_job`, phần này sẽ cần sử  dụng thêm gem [daemons](https://github.com/thuehlinger/daemons) chúng ta sẽ nói về nó sau.
    ```ruby
    # bin/delayed_job
    #!/usr/bin/env ruby

    require File.expand_path(File.join(File.dirname(__FILE__), "..", "config", "environment"))
    require "delayed/command"
    Delayed::Command.new(ARGV).daemonize
    ```
- Set `:delayed_job` làm queue backend cho `Active Job` trong `config/application.rb`
    ```ruby
    config.active_job.queue_adapter = :delayed_job
    ```

# 4. Running jobs:
- Theo như file `bin/delayed_job` chúng ta cần thêm gem `daemons` vào Gemfile.
    ```ruby
    gem "daemons"
    ```
- Chạy command để install gem
    ```ruby
    bundle install
    ```
- Bạn có thể thực hiện start / stop hoặc restart delayed_job với các command sau
    ```ruby
    bin/delayed_job start
    bin/delayed_job stop
    bin/delayed_job restart
    ```
- Bạn cũng có thể chạy các command trên với các options, tham khảo thêm tạo [đây](https://github.com/collectiveidea/delayed_job#running-jobs).

# 5. Queuing Jobs with delay:
- Bình thường khi gọi hàm, hàm đó sẽ được chạy ngay lập tức, ví dụ
    ```ruby
    2.5.1 :001 > user = User.last
      User Load (0.1ms)  SELECT  "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT ?  [["LIMIT", 1]]
     => #<User id: 11, name: "Alvera Gislason", email: "andre.bernhard@volkmanlehner.name", created_at: "2019-07-20 11:51:29", updated_at: "2019-07-20 12:19:49">

    2.5.1 :002 > user.update_random
       (0.2ms)  begin transaction
      User Update (0.6ms)  UPDATE "users" SET "name" = ?, "email" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "Yuko Johns"], ["email", "tyson@friesenreichel.biz"], ["updated_at", "2019-07-20 12:30:20.258349"], ["id", 11]]
       (35.4ms)  commit transaction
     => true 
    ```

- Khi gọi hàm `delay` với delayed_job trước khi gọi hàm, thay vì chạy hàm ngay lập tức, delayed_job sẽ insert 1 record vào bảng `delayjob_job`, đưa job tương ứng với hàm đó và queue và thực hiện job khi tới lượt.
    ```ruby
    2.5.1 :003 > user = User.last
      User Load (0.3ms)  SELECT  "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT ?  [["LIMIT", 1]]
     => #<User id: 11, name: "Yuko Johns", email: "tyson@friesenreichel.biz", created_at: "2019-07-20 11:51:29", updated_at: "2019-07-20 12:30:20"> 
    2.5.1 :004 > user.delay.update_random

    2.5.1 :004 > user.delay.update_random
       (0.1ms)  begin transaction
      Delayed::Backend::ActiveRecord::Job Create (0.9ms)  INSERT INTO "delayed_jobs" ("handler", "run_at", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["handler", "--- !ruby/object:Delayed::PerformableMethod\nobject: !ruby/object:User\n  concise_attributes:\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: id\n    value_before_type_cast: 11\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: name\n    value_before_type_cast: Yuko Johns\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: email\n    value_before_type_cast: tyson@friesenreichel.biz\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: created_at\n    value_before_type_cast: '2019-07-20 11:51:29.306947'\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: updated_at\n    value_before_type_cast: '2019-07-20 12:30:20.258349'\n  new_record: false\n  active_record_yaml_version: 2\nmethod_name: :update_random\nargs: []\n"], ["run_at", "2019-07-20 12:34:42.157918"], ["created_at", "2019-07-20 12:34:42.157963"], ["updated_at", "2019-07-20 12:34:42.157963"]]
       (11.5ms)  commit transaction
     => #<Delayed::Backend::ActiveRecord::Job id: 4, priority: 0, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2019-07-20 12:34:42", locked_at: nil, failed_at: nil, locked_by: nil, queue: nil, created_at: "2019-07-20 12:34:42", updated_at: "2019-07-20 12:34:42"> 
     
    2.5.1 :005 > user = User.last
  => #<User id: 11, name: "Tanner Dibbert", email: "graham@hicklehahn.co.uk", created_at: "2019-07-20 11:51:29", updated_at: "2019-07-20 12:34:42"> 
 
     2.5.1 :006 > 
    ```

- Các bạn có thể kiểm tra trên `development.log` các bước trên
- Tạo `delayed_job`
    ```ruby
    [1m[36mDelayed::Backend::ActiveRecord::Job Create (0.9ms)[0m  [1m[32mINSERT INTO "delayed_jobs" ("handler", "run_at", "created_at", "updated_at") VALUES (?, ?, ?, ?)[0m  [["handler", "--- !ruby/object:Delayed::PerformableMethod\nobject: !ruby/object:User\n  concise_attributes:\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: id\n    value_before_type_cast: 11\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: name\n    value_before_type_cast: Yuko Johns\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: email\n    value_before_type_cast: tyson@friesenreichel.biz\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: created_at\n    value_before_type_cast: '2019-07-20 11:51:29.306947'\n  - !ruby/object:ActiveModel::Attribute::FromDatabase\n    name: updated_at\n    value_before_type_cast: '2019-07-20 12:30:20.258349'\n  new_record: false\n  active_record_yaml_version: 2\nmethod_name: :update_random\nargs: []\n"], ["run_at", "2019-07-20 12:34:42.157918"], ["created_at", "2019-07-20 12:34:42.157963"], ["updated_at", "2019-07-20 12:34:42.157963"]]
      [1m[35m (11.5ms)[0m  [1m[36mcommit transaction[0m    
    ```

- Load `delayed_job`
    ```ruby
    [1m[36mDelayed::Backend::ActiveRecord::Job Load (0.5ms)[0m  [1m[34mSELECT  "delayed_jobs".* FROM "delayed_jobs" WHERE ((run_at <= '2019-07-20 12:34:42.713725' AND (locked_at IS NULL OR locked_at < '2019-07-20 08:34:42.713777') OR locked_by = 'delayed_job.0 host:hcm1020003 pid:19487') AND failed_at IS NULL) ORDER BY priority ASC, run_at ASC LIMIT ?[0m  [["LIMIT", 5]]
      ↳ bin/delayed_job:5

      [1m[36mDelayed::Backend::ActiveRecord::Job Update All (15.0ms)[0m  [1m[33mUPDATE "delayed_jobs" SET "locked_at" = '2019-07-20 12:34:42.717572', "locked_by" = 'delayed_job.0 host:hcm1020003 pid:19487' WHERE "delayed_jobs"."id" IN (SELECT "delayed_jobs"."id" FROM "delayed_jobs" WHERE ((run_at <= '2019-07-20 12:34:42.713725' AND (locked_at IS NULL OR locked_at < '2019-07-20 08:34:42.713777') OR locked_by = 'delayed_job.0 host:hcm1020003 pid:19487') AND failed_at IS NULL) AND "delayed_jobs"."id" = ? ORDER BY priority ASC, run_at ASC)[0m  [["id", 4]]
      ↳ bin/delayed_job:5

      [1m[36mDelayed::Backend::ActiveRecord::Job Load (0.4ms)[0m  [1m[34mSELECT  "delayed_jobs".* FROM "delayed_jobs" WHERE "delayed_jobs"."id" = ? LIMIT ?[0m  [["id", 4], ["LIMIT", 1]]
      ↳ bin/delayed_job:5
    ```
    
- Execute `delayed_job` và update user
    ```ruby
      [1m[36mUser Load (0.4ms)[0m  [1m[34mSELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?[0m  [["id", 11], ["LIMIT", 1]]
      ↳ bin/delayed_job:5
      
    2019-07-20T19:34:42+0700: [Worker(delayed_job.0 host:hcm1020003 pid:19487)] Job User#update_random (id=4) RUNNING
      [1m[35m (0.1ms)[0m  [1m[36mbegin transaction[0m
      ↳ app/models/user.rb:3
      
      [1m[36mUser Update (0.5ms)[0m  [1m[33mUPDATE "users" SET "name" = ?, "email" = ?, "updated_at" = ? WHERE "users"."id" = ?[0m  [["name", "Tanner Dibbert"], ["email", "graham@hicklehahn.co.uk"], ["updated_at", "2019-07-20 12:34:42.772118"], ["id", 11]]
      ↳ app/models/user.rb:3
      [1m[35m (13.8ms)[0m  [1m[36mcommit transaction[0m
      ↳ app/models/user.rb:3
      [1m[35m (0.1ms)[0m  [1m[36mbegin transaction[0m
      ↳ bin/delayed_job:5
      
      [1m[36mDelayed::Backend::ActiveRecord::Job Destroy (0.5ms)[0m  [1m[31mDELETE FROM "delayed_jobs" WHERE "delayed_jobs"."id" = ?[0m  [["id", 4]]
      ↳ bin/delayed_job:5
      [1m[35m (14.2ms)[0m  [1m[36mcommit transaction[0m
      ↳ bin/delayed_job:5
    2019-07-20T19:34:42+0700: [Worker(delayed_job.0 host:hcm1020003 pid:19487)] Job User#update_random (id=4) COMPLETED after 0.0364
    ```

# 6. Queuing Jobs with handle_asynchronously:
- Thay vì gọị hàm `delay` trước khi gọi hàm để đưa job vào queue và execute
    ```ruby
    user.delay.update_random
    ```
- Bạn có thể khai báo hàm `handle_asynchronously` với params là tên hàm muốn đưa vào queue.
    ```ruby
    # app/models/user.rb
    class User < ApplicationRecord
      def update_random
        update_attributes name: FFaker::Name.name , email: FFaker::Internet.email   
      end

      handle_asynchronously :update_random
    end
    ```
- Khi đó hàm sẽ tự động được đưa vào queue khi được gọi mà không cần gọi hàm `delay`
    ```ruby
    user.update_random
    ```
- Để gọi và hàm và execute ngay lập tức, bạn có gọi hàm với hậu tố `_without_delay`
    ```ruby
    user.update_random_without_delay
    ```

# 7. Parameters:
Bạn có thể gọi hàm `delay` hoặc `handle_asynchronously` với các parameters sau

## a. priority (number): 
- Quy định độ ưu tiên của job, mặc định là 0, được lưu trong field `priority` của job
    ```ruby
    delayed_job = user.delay(priority: 1).update_random
     => #<Delayed::Backend::ActiveRecord::Job id: 10, priority: 1, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2019-07-20 13:24:06", locked_at: nil, failed_at: nil, locked_by: nil, queue: nil, created_at: "2019-07-20 13:24:06", updated_at: "2019-07-20 13:24:06">

    delayed_job.priority
     => 1
    ```
- Các job có priority thấp hơn sẽ được chạy trước
- Có thể thay đổi giá trị mặc định của priority dựa vào `Delayed::Worker.default_priority` 
    ```ruby
    # config/initializers/delayed_job_config.rb
    Delayed::Worker.default_priority = 0
    ```


## b. run_at (Time):
- Job sẽ đươc load sau thời gian này và execute nếu queue rỗng, mặc định là thời gian tạo job `created_at` 
    ```ruby
    delayed_job = user.delay(run_at: 1.years.from_now).update_random
    => #<Delayed::Backend::ActiveRecord::Job id: 16, priority: 2, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2020-07-20 13:33:22", locked_at: nil, failed_at: nil, locked_by: nil, queue: nil, created_at: "2019-07-20 13:33:22", updated_at: "2019-07-20 13:33:22">

    delayed_job.created_at
    => Sat, 20 Jul 2019 13:33:22 UTC +00:00

    delayed_job.run_at
    => Mon, 20 Jul 2020 13:33:22 UTC +00:00
    ````

- Trước thời gian `run_at` job sẽ không được execute cho dù queue rỗng hay không.

## c. queue (string):
- Quy định queue sẽ chạy job, mặc định là `nil`, được lưu trong field `queue` của job
    ```ruby
    delayed_job = user.delay(queue: :user_queue).update_random
    => #<Delayed::Backend::ActiveRecord::Job id: 17, priority: 2, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2019-07-20 13:49:10", locked_at: nil, failed_at: nil, locked_by: nil, queue: "user_queue", created_at: "2019-07-20 13:49:10", updated_at: "2019-07-20 13:49:10">

    delayed_job.queue
     => "user_queue"
    ```
- Có thể thay đổi giá trị mặc định của queue dựa vào `Delayed::Worker.default_queue_name`
    ```ruby
    # config/initializers/delayed_job_config.rb
    Delayed::Worker.default_queue_name = "default_queue"
    ```

# 8. Queue và proprity:
- Chúng ta thường set queue với priority tương ứng, ví dụ
    ```ruby
    # config/initializers/delayed_job_config.rb
    Delayed::Worker.queue_attributes = {
      high_priority: { priority: -10 },
      low_priority: { priority: 10 }
    }
    ```
- Khi đó job được tạo ra với queue sẽ mang priority tương ứng.
    ```ruby
    delayed_job = user.delay(queue: "high_priority").update_random
    => #<Delayed::Backend::ActiveRecord::Job id: 21, priority: -10, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2019-07-20 13:58:25", locked_at: nil, failed_at: nil, locked_by: nil, queue: "high_priority", created_at: "2019-07-20 13:58:25", updated_at: "2019-07-20 13:58:25">

    delayed_job.queue
    => "high_priority"

    delayed_job.priority
    => -10
    ```
- Bạn cũng có thể override lại priority bằng cách thêm params `priority` khi gọi hàm
    ```ruby
    delayed_job = user.delay(queue: "high_priority", priority: -20).update_random
    => #<Delayed::Backend::ActiveRecord::Job id: 23, priority: -20, attempts: 0, handler: "--- !ruby/object:Delayed::PerformableMethod\nobject...", last_error: nil, run_at: "2019-07-20 14:02:05", locked_at: nil, failed_at: nil, locked_by: nil, queue: "high_priority", created_at: "2019-07-20 14:02:05", updated_at: "2019-07-20 14:02:05">

    delayed_job.queue
    => "high_priority"

    delayed_job.priority
    => -20
    ```

# 9. Config delayed_job
- Bạn có thể tạo file `config/initializers/delayed_job.rb` để override config mặc định của `delayed_job`.
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.max_attempts = 10
    Delayed::Worker.max_run_time = 5.hours
    ```

## a. max_attempts:
- Mặc định là `25`, số lần thử lại sau khi job fail.
- Sau khi chạy lại job mà vẫn fail thì job sẽ bị xóa (được quy định bởi `Delayed::Worker.destroy_failed_jobs` mặc định là true) hoặc update `fail_at` của job.
- Bạn có thể overide `max_attempts` như sau.
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.max_attempts = 10
    ```

## b. max_run_time:
- Mặc định là `4.hours`, quy định thời gian lâu nhất job cần để chạy.
- Nếu job của bạn cần nhiều hơn 4 hours để chạy xong, bạn cần override `max_run_time`.
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.max_run_time = 5.hours
    ```
- Giá trị `Delayed::Worker.max_run_time` có thể bị override bời hàm `max_run_time` của từng job.

## c. destroy_failed_jobs:
- Mặc định là `true`, job khi chạy fail sẽ bị xóa.
- Nếu bạn muốn giữ lại các job chạy fail và update `fail_at` thì override `destroy_failed_jobs`.
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.destroy_failed_jobs = false
    ```

## d: default_priority:
- Mặc định là `0`, quy định priority mặc định của job.
- Khi job được tạo với queue thì job sẽ nhận priority của queue thay cho `default_priority`.
- Bạn có thể override `default_priority` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.default_priority = 1
    ```

## e: read_head:
- Mặc định là `5`, quy định số job được load mỗi lần delayed_job thực hiện load available job để execute.
- Bạn có thể override `read_head` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.read_head = 10
    ```

## f: default_queue_name:
- Mặc định là `nil`, quy định queue khi các job được tạo
- Khi job đươcj tạo với queue thì job sẽ nhận queue này thay cho `Delayed::Worker.default_queue_name`
- Bạn có thể override `default_queue_name` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.default_queue_name = "default"
    ```

## g: sleep_delay:
- Mặc định là `5 seconds` Quy định thời gian sleep cho worker của delayed_job trong trường hợp không có job nào đươc tìm thấy để execute.
- Bạn có thể override `sleep_delay` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.sleep_delay = 60
    ```

## h: delay_jobs:
- Mặc định là `true`, quy định các job có được execute hay không.
- Bạn có thể override `delay_jobs` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    # disable all job
    Delayed::Worker.delay_jobs = false
    # disable all job on test env
    Delayed::Worker.delay_jobs = !Rails.env.test?
    # disable all job on disable queue
    Delayed::Worker.delay_jobs = = ->(job) {
      job.queue != "disable"
    }
    ```
    
## i: logger:
- Mặc định là `development.log` hoặc `staging.log` / `production.log`, tùy vào môi trường mà job được execute.
- Bạn có thể override `logger` như sau
    ```ruby
    # config/initializers/delayed_job.rb
    Delayed::Worker.logger = Logger.new(File.join(Rails.root, "log", "delayed_job.log"))
    ```
    
# 10. Document:
- Bạn có thể sử dụng thêm gem [delayed_job_web](https://github.com/ejschmitt/delayed_job_web) để tạo dashboard theo dõi các job. 
- Source code của demo app mình đang để ở [đây](https://github.com/LeTanThanh/demo_delayed_job_revise).
- Bạn có thể tìm hiểu thêm về gem delayed_job ở [đây](https://github.com/collectiveidea/delayed_job).