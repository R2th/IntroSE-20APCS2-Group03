Nếu có một nhiệm vụ định kỳ cụ thể mà bạn muốn chạy tự động hàng ngày, hàng tuần hoặc thậm chí hàng giờ như tự động gửi mail thông báo cho khách hàng, thì Cron job có thể là thứ bạn đang tìm kiếm.
# Cron job là gì
Cron là một hệ thống lập lịch công việc có sẵn trong hệ điều hành Linux & MacOS giúp lập lịch chạy những dòng lệnh bên phía server để thực thi một hoặc nhiều công việc  nào đó theo thời gian được lập sẵn.
Các công việc cron thường được đặt trong các thư mục spool. Chúng được lưu trữ trong các bảng gọi là crontabs . Cron sẽ tìm kiếm trong folder` spool` (/var/spool/cron/crontabs) các file crontab và tải chúng vào bộ nhớ. 

```Crontab ``` là một tệp cấu hình chỉ định các lệnh shell để chạy định kỳ theo một lịch trình nhất định. Các tệp crontab lưu trữ danh sách các công việc và các hướng dẫn khác đối với daemon cron (daemon: tiến trình chạy nền). Ta có thể tạo các file crontab riêng lẻ và thường có một tệp crontab trên toàn hệ thống (chỉ có quản trị viên hệ thống mới có quyền chỉnh sửa). Các tập tin trong thư mục spool  không nên được truy cập trực tiếp mà nên dùng lệnh crontab để truy cập và cập nhật chúng.
## Các Lệnh Crontab
Có 3 lệnh cơ bản hay dùng:
* ```crontab -l```: Xem danh sách các task đã được lên lịch
* ```crontab -r```: Xóa toàn bộ các task đã được lên lịch
* ```crontab -e```: Chỉnh sửa file crontab
* Ngoài ra ```crontab -h```: sẽ hiện hướng dẫn các lệnh còn lại.
## Cú Pháp Crontab
Mỗi dòng mong đợi một biểu thức cron gồm 5 trường biểu thị thời gian thực hiện lệnh, theo sau là lệnh thực thi.
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN - DEC)
│ │ │ │ ┌───────────── day of week (0 - 6 or SUN-SAT) (Sunday to Saturday;
│ │ │ │ │                                       7 is also Sunday on some  systems)
│ │ │ │ │
│ │ │ │ │
* * * * *  /command/to/be/executed
```
- Dấu * đại diện cho tất cả các giá trị có thể
- Dấu , liệt kê các giá trị 
- Dấu - là khoảng giá trị 
- Dấu / chia đều khoảng thời gian (ví dụ như 5 ngày gửi mail 1 lần ).

Ví dụ tôi muốn gửi email cho khách vào 7h 30 sáng ngày 15 hàng tháng sẽ như sau:

`30 7 15 * *  /command/to/send/an/email`
# Gem Whenever
Chúng ta sẽ thao tác trực tiếp với file Crontab thông qua lệnh crontab -e. Việc sửa trực tiếp file cron thì thực sự là rất khó khăn nên trong rails chúng ta  sử dụng gem Whenever để thực thi các task của Rails vào Crontab . Khi sử dụng gem whenever thì cũng giống như trên terminal ở linux ta sử dụng crontab -e để add công việc và hẹn lịch chạy
## cài đặt 
Có hai cách để cấu hình gem:
* Cách 1: Sử dụng lệnh sau gem install whenever
* Cách 2: Sử dụng `bundle install`
    * Thêm dòng sau vào Gemfile `gem 'whenever', require: false`
    * Chạy `bundle install`
## Sử dụng
Ví dụ sử dụng trong trường hợp gửi mail cho khách hàng 
```
# file: app/mailers/user_mailer.rb

class UserMailer < ActionMailer::Base
  def send_mail_notifications (options)
    # ...viet logic gui mail
  end
end
```
Tạo một  file Rake gửi email. Thêm một file mới tên send_email_tasks.take trong thư mục lib/tasks của ứng dụng rails
```
desc 'send email to notify customers'
task send_email_to_notify_customers': :environment do
  # ... set options if any
  UserMailer.send_mail_notifications(options).deliver!
End
```
send_email_to_notify_customers: :environment để tải các môi trường Rails trước khi chạy các nhiệm vụ nên  có thể truy cập vào các class (như UserMailer) bên trong task.

Để lập lịch cho task gửi mail , trước tiên ta cần tạo một file config để lưu các công việc cần lập lịch. Whenever cung cấp lệnh sau để tạo file config: `bundle exec wheneverize `
.Thao tác này sẽ tạo tệp` config/schedule.rb `ban đầu cho bạn (miễn là thư mục config đã có trong dự án của bạn). Bạn sẽ viết các cronjobs trong file này.
```
# file config/schedule.rb

every :day, at: "7:20am" do

# specify the task name as a string

  rake "send_email_to_notify_customers"
end

#or 

every '20 7 * * * ' do
  rake "send_email_to_notify_customers"
end

```
Có thể dùng song song 2 loại "ngôn ngữ" mà Whenever vẫn hiểu: ngôn ngữ crontab và ngôn ngữ tự nhiên.

Chạy lệnh `whenever` hiển thị danh sách các task đã được lên lịch, lệnh này đơn giản hiển thị cho bạn file` schedule.rb` sau khi chuyển thành cron syntax. Nên khi chạy lệnh này  sẽ ra một bản xem trước của task trong định dạng cron thực tế:
```
20 7 * * * /bin/bash -l -c 'cd /home/demo && RAILS_ENV=development bundle exec rake send_email_to_notify_customers --silent'

## [message] Above is your schedule file converted to cron syntax; your crontab file was not updated

## [message] Run `whenever --help' for more options
```

Để tạo lịch trình và ghi vào crontab, chạy lệnh:
`whenever -w`

Khi bạn thêm một công việc cần được lập lịch vào trong `file config/schedule.rb`, bạn cần phải chạy thêm lệnh sau để công việc mới được thêm vào crontab. Điều ngày có nghĩa crontab đã được cập nhật
```whenever --update-crontab```

Note : Whenever xem xét môi trường ứng dụng Rails của bạn khi viết vào crontab. Nếu bạn đang sử dụng môi trường `development`, hãy chạy lệnh với tùy chọn bên dưới (mặc định là `production`).
```
whenever --update-crontab --set environment='development'
```
## Định nghĩa job types
Whenever xác định với 3 loại công việc được định nghĩa trước: command, runner, rake
* command dùng để thực thi các lệnh trên terminal.
* runner dùng thực thi trực tiếp các method trong một class.
* rake dùng để thực thi các công việc được đặt trong batch file.
 
Các job types mặc định giao cho whenever được định nghĩa như sau:
```
job_type :command, ":task :output"
job_type :rake,    "cd :path && :environment_variable=:environment bundle exec rake :task --silent :output"
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  "cd :path && :environment_variable=:environment bundle exec script/:task :output"

```
 
* Nếu một :path không được đặt, nó sẽ mặc định là thư mục mà whenever được thực thi. :environment_variable sẽ mặc định thành "RAILS_ENV"
* Môi trường mặc định là :production và :output sẽ được thay thế bằng cài đặt chuyển hướng đầu ra của bạn
Ngoài ra, bạn cũng có thể tự định nghĩa các job types của riêng mình thông qua job_type. 
```
job_type :awesome, '/usr/local/bin/awesome :task :fun_level'

every 2.hours do
  awesome "party", fun_level: "extreme"
end
```

* Cron job sẽ hiểu rằng nó cần chạy lệnh sau mỗi 2 giờ: /usr/local/bin/awesome party extreme
* :task luôn được thay thế bằng đối số đầu tiên và bất kỳ phần bổ sung :whatevers nào đều được thay thế bằng các tùy chọn được chuyển vào hoặc bằng các biến được xác định với set.

Trên đây là những gì mình muốn giới thiệu về gem Whenever. Cảm ơn các bạn đã xem bài viết của mình
# Tài liệu tham khảo
https://dev.to/risafj/cron-jobs-in-rails-a-simple-guide-to-actually-using-the-whenever-gem-now-with-tasks-2omi
https://github.com/javan/whenever
https://quangteomedia.com/chay-task-tu-dong-tren-linux-voi-crontab/