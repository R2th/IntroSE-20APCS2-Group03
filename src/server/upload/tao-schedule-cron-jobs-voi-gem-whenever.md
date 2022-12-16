Whenever là gem dùng để tạo và deploy các cron job với cú pháp rõ ràng.

Cài đặt:

`gem install whenever`

hoặc thêm vào Gemfile:

`gem 'whenever', require: false`

Sau đó chạy lệnh:
`wheneverize .`
sẽ sinh ra file config/schedule.rb

Whenever command:

```
cd /apps/my-great-project
whenever
```

Chuyển schedule.rb thành cron syntax, Nó không đọc hoặc viết vào file crontab, bạn cần thực hiện lệnh sau:

`whenever --update-crontab`

Một số command khác:
```
$ whenever --user app # set a user as which to install the crontab
$ whenever --load-file config/my_schedule.rb # set the schedule file
$ whenever --crontab-command 'sudo crontab` # override the crontab command
```
Liệt kê các cronrab đã được cài đặt: `crontab -l`
Hoặc chạy `whenever --help` để xem đầy đủ các lựa chọn cho schedule

Ví dụ schedule.rb

```
every 3.hours do # 1.minute 1.day 1.week 1.month 1.year is also supported
  runner "MyModel.some_process"
  rake "my:rake:task"
  command "/usr/bin/my_great_command"
end

every 1.day, at: '4:30 am' do
  runner "MyModel.task_to_run_at_four_thirty_in_the_morning"
end

every 1.day, at: ['4:30 am', '6:00 pm'] do
  runner "Mymodel.task_to_run_in_two_times_every_day"
end

every :hour do # Many shortcuts available: :hour, :day, :month, :year, :reboot
  runner "SomeModel.ladeeda"
end

every :sunday, at: '12pm' do # Use any day of the week or :weekend, :weekday
  runner "Task.do_something_great"
end

every '0 0 27-31 * *' do
  command "echo 'you can use raw cron syntax too'"
end

# run this task only on servers with the :app role in Capistrano
# see Capistrano roles section below
every :day, at: '12:20am', roles: [:app] do
  rake "app_server:task"
end
```

Xác định loại job:
Whenever có 3 loại job: command, runner, and rake

```
job_type :awesome, '/usr/local/bin/awesome :task :fun_level'

every 2.hours do
  awesome "party", fun_level: "extreme"
end
```

Lệnh trên sẽ chạy /usr/local/bin/awesome :task :fun_level 2 giờ một lần.

Các job tupe mặc định:
```
job_type :command, ":task :output"
job_type :rake,    "cd :path && :environment_variable=:environment bundle exec rake :task --silent :output"
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  "cd :path && :environment_variable=:environment bundle exec script/:task :output"
```

Parsing dates and times:
Whenever sử dụng gem Chronic để phân tích dates và time đã được chỉ định.
Ví dụ, bạn muốn dùng đồng hồ 24 giờ thay thế cho loại mặc định là 12 giờ:

```
set :chronic_options, hours24: true

# By default this would run the job every day at 3am
every 1.day, at: '3:00' do
  runner "MyModel.nightly_archive_job"
end
```

Cron:
Cron là một daemon được sử dụng để thực hiện các nhiệm vụ theo lịch trình. Các hệ thống Unix cung cấp một lệnh, được gọi là crontab, cho phép người dùng cá nhân tạo các tác vụ theo lịch trình.

Cron tìm kiếm khu vực spool của nó (/ var / spool / cron / crontabs) cho các tệp crontab và tải chúng vào bộ nhớ. Các tệp trong thư mục này không nên được truy cập trực tiếp - lệnh crontab nên được sử dụng để truy cập và cập nhật crontab. 
Sửa tệp crontab bằng cách chạy lệnh:
`crontab -e`

Giả sử bạn muốn sao lưu thư mục nhật ký của mình mỗi ngày vào lúc 1:10 sáng. Thêm dòng sau vào tệp crontab:

`10 1 * * * *  /path/to/your/backup/script.sh`

Cron sử dụng 10 1 * * * * để tìm ra lịch trình thực hiện công việc.
```
* * * * * *
| | | | | |
| | | | | +-- Năm              (khoảng: 1900-3000)
| | | | +---- Thứ trong tuần   (khoảng: 1-7, 1 standing for Monday)
| | | +------ Tháng            (range: 1-12)
| | +-------- Ngày trong tháng (range: 1-31)
| +---------- Giờ              (range: 0-23)
+------------ Phút             (range: 0-59)
```