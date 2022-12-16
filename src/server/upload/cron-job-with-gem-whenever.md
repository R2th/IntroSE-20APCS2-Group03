![](https://images.viblo.asia/8e50ee2e-dcad-4e42-b4f7-83657ad68ab9.png)
# 1. Cron job là gì:
- Đôi khi chúng ta cần implement các job cần được thực hiện theo 1 schedule cho trước, các job này được gọi chung là cron job.
- Các job này có thể là gửi remind email cho user hằng ngày, gọi API crawl data của third party để import hoặc update data của app mỗi tuần 1 lần, xóa cache, xóa log, backup database, ...
- Trong Rails chúng ta có thể sử dụng gem `whenever` để lên schedule cho cronjob.

# 2. Tạo demo app:
- Chạy các command sau để tạo 1 app đơn giản.
    ```ruby
    rails new demo_whenever_revise
    ```
- Chạy các command migration cho user.
    ```ruby
    rails g model user email name
    rails db:migrate
    ```
- Thêm gem `ffaker` vào `Gemfile`.
    ```ruby
    # Gemfile
    gem "ffaker"
    ```
- Chạy command `bundle install` để install gem `ffaker`.
    ```ruby
    bundle install
    ```
- Tạo seed data cho user.
    ```ruby
    # db/seeds.rb
    10.times do
      User.create email: FFaker::Internet.email, name: FFaker::Name.name
    end
    ```
- Chạy command `rails db:seed` để tạo seed data.
    ```ruby
    rails db:seed
    ```
- Tạo rake task tạo random user.
    ```ruby
    # lib/tasks/user/create_random.rake
    namespace :user do
      desc "Create random user"

      task create_random: :environment do
        puts "RUNNING rake user:create_random"
        user = User.create email: FFaker::Internet.email, name: FFaker::Name.name
        puts "CREATED user: #{user.inspect}"
      end
    end
    ```
- Chạy command `rake user:create_random` để test rake task vừa tạo.
    ```ruby
    rake user:create_random
    ```
- Tiếp theo chúng ta sẽ dùng gem `whenever` để tạo cronjob cho rake task này. Let's go!

# 3. Gem whenever:
## a. Install:
- Thêm gem `whenever` vào `Gemfile`.
    ```ruby
    # Gemfile
    gem "whenever"
    ```
- Chạy command `bundle install` để install gem `whenever`.
    ```ruby
    bundle install
    ```
- Chạy command `wheneverize` để generate file `config/schedule.rb`.
    ```ruby
    wheneverize
    ```

## b. Update file config/schedule.rb:
- Update lại file `config/schedule.rb` như sau.
    ```ruby
    # config/schedule.rb
    every 1.minutes do
      rake "user:create_random"
    end
    ```
- Mỗi lần update file `config/schedule.rb` ta cần chạy command `whenever --update-crontab` để update lại crontab.
    ```ruby
    whenever --update-crontab
    ```
- Chạy lại command `whenever` để check lại crontab.
    ```
    whenever
    ```
- Check lại outout của crontab ta được kết quả như sau.
    ```
    * * * * * /bin/bash -l -c 'cd /home/hcm-102-0003/Desktop/demo_whenever_revise && RAILS_ENV=production bundle exec rake user:create_random --silent'

    ## [message] Above is your schedule file converted to cron syntax; your crontab file was not updated.
    ## [message] Run `whenever --help' for more options.
    ```
- Ta thấy `RAILS_ENV` đang được set giá trị là `production`, có nghĩa là crontab này chỉ được chạy ở môi trường  production, không được chạy ở môi trường development hay staging.
- Nguyên nhân là môi trường chạy crontab được lưu trong biến `@environment` và biến này có giá trọ mặc định là production.
- Ta có thể check lại bằng cách update lại file `config/schedule.rb`, in ra màn hình giá trị của biến `@environment`.
    ```ruby
    # config/schedule.rb
    puts "Crontab is run on #{@environment}"
    ```
- Sau đó chạy lại command `whenever --update-crontab`
    ```ruby
    whenever --update-crontab
    ```
- Output
    ```
    Crontab is run on production
    [write] crontab file updated
    ```
- Ta có thể set giá trị của biến `@environment` bằng cách thêm đoạn code sau vào đầu file `config/schedule.rb`
    ```ruby
    # config/schedule.rb
    set :environment, :development
    ```
- Sau đó chạy lại command `whenever --update-crontab`
    ```ruby
    whenever --update-crontab
    ```
- Output
    ```
    Crontab is run on development
    [write] crontab file updated
    ```
- Tuy nhiên ta đang hard code giá trị của biến `@environment`, ta cần phải set giá trị của biến `@environment` thay đổi theo môi trường.
- Để làm vậy ta cần sử dụng `Rails.env`, update lại file `config/schedule.rb` như sau
    ```ruby
    # config/schedule.rb
    require_relative "environment"
    set :environment, Rails.env
    ```
- Chúng ta cũng có thể quy định outout log của crontab bằng cách thêm đoạn code sau vào file `config/schedule.rb`
    ```ruby
    # config/schedule.rb
    set :output, "log/cron_job.log"
    ```
- File `config/schedule.rb` hoàn chỉnh
    ```ruby
    # config/schedule.rb
    require_relative "environment"

    set :environment, Rails.env
    set :output, "log/cron_job.log"

    # puts "Crontab is run on #{@environment}"
    # puts "Crontab is logged on #{@output}"

    every 1.minutes do
      rake "user:create_random"
    end
    ```
- Chạy command để update crontab và check lại
    ```ruby
    whenever --update-crontab
    whenever
    ```
- Output
    ```ruby
    * * * * * /bin/bash -l -c 'cd /home/hcm-102-0003/Desktop/demo_whenever_revise && RAILS_ENV=development bundle exec rake user:create_random --silent >> log/cron_job.log 2>&1'

    ## [message] Above is your schedule file converted to cron syntax; your crontab file was not updated.
    ## [message] Run `whenever --help' for more options.
    ```
- Bạn có thể check lại kết quả bằng cách mở file `log/cron_job.log` và xem lại log, dưới đây là log của mình
    ```ruby
    RUNNING rake user:create_random
    CREATED user: #<User id: 12, email: "deanna.braun@brekke.ca", name: "Claretha Hintz", created_at: "2019-06-26 08:58:03", updated_at: "2019-06-26 08:58:03">
    RUNNING rake user:create_random
    CREATED user: #<User id: 13, email: "kathyrn.kris@king.name", name: "Debera Purdy", created_at: "2019-06-26 08:59:03", updated_at: "2019-06-26 08:59:03">
    RUNNING rake user:create_random
    CREATED user: #<User id: 14, email: "leontine@russel.biz", name: "Erminia Weber", created_at: "2019-06-26 09:00:03", updated_at: "2019-06-26 09:00:03">
    ```
    
## c. Jobtypes:
- Mặc định whenever cung cấp cho chúng ta 4 loại `jobtype` để chạy các crontab khác nhau.

    1. **command**: chạy các command của linux hoặc rails app, ví dụ
        ```ruby
        command "echo 'example command'"
        ```

    2. **rake**: chạy các rake task của rails app, crontab trong bài viết này cũng có jobtype là rake
        ```ruby
        rake "user:create_random"
        ```

    3. **runner**: chạy các class method, trong source code tham khảo có bổ sung thêm 1 crontab có jobtype là runner, bạn có thể tham khảo thêm
        ```ruby
        runner "User.create_random"
        ```

    4. **script**: chạy script file, ví dụ
        ```ruby
        script "example_script"
        ```
- Bạn cũng có thể tự define thêm jobtype mới, tham khảo [document](https://github.com/javan/whenever#define-your-own-job-types) của gem whenever.

## d. Date and time:
### i. Gem Chronic:
- Gem whenever đang sử dụng gem [Chronic](https://github.com/mojombo/chronic) để parse date time.
- Theo mặc định Chronic sử dụng thời gian theo option 12h và có hậu tố `am` hoặc `pm` để phân biệt.
- Bạn có thể sử dụng thời gian theo option 24h và không cần sử dụng hậu tố `am` hoặc `pm` để phân biệt bằng cách set `chronic_options` như sau.
    ```ruby
    set :chronic_options, hours24: true
    ```
- Khi đó thay vì viết `3:00 am` bạn có thể viết ngắn gọn là `3:00` hoặc `15:00` thay cho `3:00 pm`. 
- Các option date time trong `whenever` bao gồm
    ```ruby
    every n.minutes # or every :minute with n = 1 
    every n.hours   # or every :hour with n = 1
    every n.days    # or every :day with n = 1
    every n.months  # or every :month with n = 1
    every n.years   # or every :year with n = 1
    
    # hours in a day
    every "1:00am" 
    ...
    every "11:00am"
    
    # days in a week
    every :monday
    ...
    every :sunday
    
    # days in a month
    every "1st" 
    ...
    every "31st"
    
    # months in a year
    every :jan
    ...
    every :dec
    ```
- Bạn cũng có thể kết hợp các option để tạo ra các option phức tạp hơn.
    ```ruby
    every :day, at: "3:00am"
    every :month, at: "1st"
    every :year, at: :jan
    ...
    ```

### ii. Timezone:
- Hãy thử tưởng tượng Timezone Rails app của bạn là `Tokyo UTC +09:00` nhưng server của bạn lại được deploy và set Timezone là `UTC UTC +00:00`.
- Khi đó crontab `11:00 am` của bạn sẽ được chạy lúc `11:00 am` của Timzone nào nhỉ.
- Expectation của chúng ta là `11:00 am` của timezone `Tokyo UTC +09:00` .
- Nhưng sự thật là `11:00 am` của timezone `UTC UTC +00:00`, tức là `08:00 pm` của timezone `Tokyo UTC +09:00`.
- Để tránh tình trạng này chúng ta có 2 solution.
    ```
    Solution 1: set timezone của server deploy trùng với timezone của app
    ```
- Với solution này thì chúng ta không cần implement thêm code.
    ```
    Solution 2: convert timezone của rails app sang timezone của server
    ```
- Với solution này thì chúng ta cần implement thêm hàm convert time của app sang timezone  của server
    ```ruby
    def server_timezone time
      Time.zone.parse(time).localtime
    end

    every :day, at: server_timezone("11:00 am") do
      command "echo 'example command'"
    end
    ```
- Bạn có thểm tham khảo thêm ở [issue#239](https://github.com/javan/whenever/pull/239#issuecomment-13864270).

## e. Các vấn đề khác:
### i. Deploy:
- Nếu bạn sử dụng capistrano, bạn có thể tham khảo [document](https://github.com/javan/whenever#capistrano-integration) của whenever.
- Nếu bạn sử dụng mina, bạn có thể tham khảo thêm gem [mina-whenever](https://github.com/mina-deploy/mina-whenever).
- Nếu bạn sử dụng heroku, bạn có thể tham khảo thêm add-ons [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler).
### ii. Test:
- Gem [whenever-test](https://github.com/rafaelsales/whenever-test) được recommend để viết test cho gem whenever.
- Bạn có thể tham khảo thêm về gem [shoulda-whenever](https://github.com/MGerrior/shoulda-whenever) và [example code](https://devpost.com/software/shoulda-matchers-for-whenever) của gem shoulda-whenever.

# 4. Document:
- Source code demo mình đang để ở [github](https://github.com/LeTanThanh/demo_whenever_revise), các bạn có thể clone về để tham khảo.
- Document của [whenever](https://github.com/javan/whenever).
- Bài viết là những kinh nghiệm mình có được khi tìm hiểu và  sử dụng gem whenever khi làm dự án thực tế, mong đươc các bạn đóng góp thêm ý kiến để mình hoàn thiện thêm bái viết này.