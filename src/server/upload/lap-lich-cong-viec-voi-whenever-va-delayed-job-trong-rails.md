Trong bài này tôi sẽ giới thiệu với các bạn hai Ruby Gem được sử dụng khá nhiều trong Rails để lập lịch thực hiện công việc, tạo cronjob và triển khai ứng dụng một cách tự động, đó là Whenever và Delayed_job.

# I. Whenever
Whenever là một Ruby Gem cung cấp cú pháp rõ ràng cho việc viết và triển khai cronjobs.

Whenever được dùng để thực hiện các công việc hàng ngày như backup hệ thống, kiểm tra tài khoản người dùng,… và có thể được tích hợp vào Capistrano để tự động tạo cronjobs khi triển khai ứng dụng lên server.

Bạn có thể tìm hiểu về Whenever tai trang Github https://github.com/javan/whenever.

Để cài đặt Whenever ta chạy lệnh

`$ gem install whenever`

Để bắt đầu sử dụng Whenever, di chuyển đển thư mục ứng dụng và khởi tạo Whenever

```
$ cd ~/projects/my-project
$ wheneverize .
```
Lệnh wheneverize . sẽ tạo file `config/schedule.rb`

Đây là một ví dụ của file `config/schedule.rb`

```
# Kiểm tra tài khoản người dùng hàng ngày vào lúc 1 giờ sáng
every 1.day, :at => "1:00am" do
    rails "system:account_check"
end
# Mỗi ngày chạy sao lưu hệ thống 2 lần, cách nhau 12 tiếng
every 12.hours do
   rails "system:run_backup"
end
```
Để đưa các task này vào crontab, ta chạy lệnh:

`~/projects/my-project$ whenever --update-crontab my-project`

Ta có thể sử dụng whenever với Capistrano như sau:

```
set :application, "my-project"
namespace :deploy do
   desc "Update the crontab file"
   task :update_crontab, :roles => :app do
      run "cd #{release_path} && whenever --update-crontab #{application}"
   end
end
after "deploy:create_symlink", "deploy:update_crontab"
```

Đây là nội dung được tạo ra trong crontab khi triển khai ứng dụng bằng Capistrano (chạy lệnh` crontab -l` từ terminal để xem)

```
# Begin Whenever generated tasks for: my-project
0 1 * * * /bin/bash -l -c 'cd /var/www/projects/my-project/production/releases/20121219061558 && RAILS_ENV=production bundle exec rake system:account_check --silent >> /var/www/projects/my-project/production/releases/20121219061558/log/cron_log.txt 2>&1'
0 0,12 * * * /bin/bash -l -c 'cd /var/www/projects/my-project/production/releases/20121219061558 && RAILS_ENV=production bundle exec rake system:run_backup --silent >> /var/www/projects/my-project/production/releases/20121219061558/log/cron_log.txt 2>&1'
# End Whenever generated tasks for: my-project
```

# II. Delayed_job
Delayed_job là Ruby gem thường được sử dụng để thực các công việc có thời gian chạy lâu hoặc các công việc muốn thực hiện trong tương lai. Các công việc này sẽ được chạy nền và không hiển thị đối với người dùng cuối.

Delayed_job giúp cho ứng dụng chạy mượt mà hơn đối với người dùng cuối do các công việc tiêu tốn thời gian sẽ được thực hiện ngầm. Các công việc này có thể là:

* Gửi email đến người dùng
* Thu nhỏ ảnh được tải lên
* Tải nội dung từ một trang thứ 3
* Đánh chỉ mục hệ thống
* Các phép tính toán đòi hỏi thời gian…

Ngoài ra Delayed_job cũng phù hợp với các công việc được thực hiện theo một kế hoạch nào đó, chẳng hạn như định kỳ gửi bản tin đến người dùng.

Ban đầu Delayed_job được viết bởi tác giả Tobias Lütke (https://github.com/tobi), sau đó được fork lại bởi Collective Idea (https://github.com/collectiveidea) và hiện tại phiên bản của Collective Idea đang được sử dụng phổ biến hơn.

Bạn có thể tìm hiểu thêm về delayed_job tại địa chỉ https://github.com/collectiveidea/delayed_job

Dưới đây là các bước cài đặt và sử dụng Delayed_job trong Rails với ActiveRecord.

Để cài đặt Delayed_job cho Active Record, bạn sử dụng `gem ‘delayed_job_active_record’`

* Khởi tạo delayed_job
    ```
    $ rails g delayed_job:active_record
    $ rails db:migrate
    ```

* Khởi động Worker của Delayed_job

    ```
    $ rake jobs:work
    ```

* Sử dụng Delayed_job theo cách đơn giản, ví dụ gửi email cho người dùng sau khi đăng ký thành công
     * Trước khi sử dụng Delayed_job
    ```
    NotificationMailer.notify_account_activated(@user).deliver
    ```
* Với Delayed_job
    ```
        NotificationMailer.delay.notify_account_activated(@user)
    ```
    
    Ta cũng có thể sử dụng Delayed_job để thực hiện công việc theo lịch hay định kỳ. Trong ví dụ này ứng dụng sẽ gửi email đến người dùng vừa kích hoạt sau một ngày, vào lúc 8 giờ sáng.
    
   ```
       RAILS_ROOT/lib/delayed_jobs/newsletter_job.rb
        class NewsletterJob < Struct.new(:user)
          def perform
            NewsletterMailer.welcome_mail(user).deliver
          end
        end

        # Controller
        # run at 8 a.m next day
        Delayed::Job.enqueue NewsletterMailer.new(@user) , 0, 1.day.from_now.change({:hour => 8 })
   ```
   
   Sử dụng Delayed_job với Capistrano

Trước tiên bạn cần cài đặt Ruby gem có tên “daemons” để chạy worker của delayed_job như một process của hệ thống.

```
gem install 'daemons'
```
```
# Location: config/deploy.rb
namespace :delayed_job do
  desc "Start delayed_job process"
  task :start, :roles => :app do
    run "cd #{current_path}; RAILS_ENV=#{rails_env} script/delayed_job start"
  end

  desc "Stop delayed_job process"
  task :stop, :roles => :app do
    run "cd #{current_path}; RAILS_ENV=#{rails_env} script/delayed_job stop"
  end

  desc "Restart delayed_job process"
  task :restart, :roles => :app do
   run "cd #{current_path}; RAILS_ENV=#{rails_env} script/delayed_job restart"
  end
end
```

Như vậy Whenever và Delayed_job sẽ giúp cho bạn thực hiện công việc theo lịch định sẵn, tăng tốc độ ứng dụng đối với người dùng cuối và triển khai lên server một cách nhanh chóng và tự đông.