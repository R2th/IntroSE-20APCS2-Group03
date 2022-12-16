Trong bài viết này, mình muốn giới thiệu với mọi người về gem Whenever trong Rails. Gem Whenever là một công cụ đắc lực để tạo Cron Jobs trong các dự án Rails.

## I, Cron Jobs là gì
Cron Jobs là một chức năng dùng để thực thi các câu lệnh vào một thời điểm nhất đinh.<br>
Ví dụ: Bạn muốn định kỳ hàng tuần gửi email cho người dùng bạn có thể sự dung cronjob để tự động hóa việc này thay vì phải làm bằng tay.

## II, Gem Whenever
Gem whenever là 1 gem giúp ta set up cron jobs thay vì phải tự mình chỉnh sửa crontab(file chứa các cronjobs). Bạn có thể để whenever cập nhật crontab của bạn bằng các câu lệnh ruby.

### 1, Cài đặt

Như thường lệ khi cài đặt một gem trong Rails chúng ta sẽ thêm gem đó vào` Gemfile `và chạy lệnh `bundle install`:<br>

`gem "whenever"`

Sau đó chạy lệnh:

`bundle exec wheneverize`

Lệnh này sẽ tạo file config/schedule.rb. Bạn sẽ viết các cronjobs trong file này.

### 2, Sử dụng

Lệnh `whenever` lệnh này đơn giản hiển thị cho bạn file schedule.rb sau khi chuyển thành cron syntax. Lệnh này sẽ không đọc hay ghi file crontab

Để viết vào file crontab công việc mình muốn làm thì thực thi lệnh:

`whenever --update -crontab`

Ngoài ra nếu bạn muốn xem các lệnh cronjobs đang chạy bạn có thể sử dụng câu lệnh: 
`crontab -l`

Ví dụ file schedule.rb

```
every 3.hours do #Thực hiện công việc mỗi 3 tiếng
  runner "MyModel.some_process"
  rake "my:rake:task"
  command "/usr/bin/my_great_command"
end

every 1.day, at: '4:30 am' do #Thực hiện công việc mỗi này vào lúc 4:30am
  runner "MyModel.task_to_run_at_four_thirty_in_the_morning"
end

every 1.day, at: ['4:30 am', '6:00 pm'] do #Thực hiện công việc mỗi ngày vào lúc 4:30am và 6:00pm
  runner "Mymodel.task_to_run_in_two_times_every_day"
end

every :hour do #Viết tắt cho 1.hour ngoài ra còn có :day, :month, :year
  runner "SomeModel.ladeeda"
end

every :sunday, at: '12pm' do #Thực hiện công việc vào chủ nhật lúc 12pm
  runner "Task.do_something_great"
end

every '0 0 27-31 * *' do #Viết theo lệnh cron 
  command "echo 'you can use raw cron syntax too'"
end
```
Khi viết theo kiểu lệnh cron các bạn cần chú ý cron sẽ sử dung "* * * * * *" để xác định thời điểm thực hiện lệnh theo quy tắc:

```
* * * * * *
| | | | | |
| | | | | +-- Năm              (range: 1900-3000)
| | | | +---- Thứ trong tuần   (range: 1-7, 1 standing for Monday)
| | | +------ Tháng            (range: 1-12)
| | +-------- Ngày trong tháng (range: 1-31)
| +---------- Giờ              (range: 0-23)
+------------ Phút             (range: 0-59)
```
Whenever có các loại job được xác định trước:
```
job_type :command, ":task :output"
job_type :rake,    "cd :path && :environment_variable=:environment bundle exec rake :task --silent :output"
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  "cd :path && :environment_variable=:environment bundle exec script/:task :output"
```
Ngoài ra bạn có thể tự định nghĩa các job_type của riêng mình và cũng có thể ghi đè các job_type mặc định.<br>

Bạn cũng có thể set các giá trị mặc định trong câu lệnh job_type<br>
Ví dụ:` set :output, "log/cron_job.log" #set file output là "log/cron_job.log"`

Trên đây là những gì mình muốn giới thiệu về gem Whenever. Cảm ơn các bạn đã xem bài viết của mình

### Tài liệu tham khảo:

https://github.com/javan/whenever