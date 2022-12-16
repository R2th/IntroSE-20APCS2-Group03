Chào các bạn, bài viết này mình sẽ chia sẻ cho các bạn về gem whenever trong rails. Dưới đây là những kiến thức mà mình tìm hiểu được, nếu có thiếu sót, hi vọng các bạn có thể đóng góp cho mình ở phần comment bên dưới nha!

Trước khi tìm hiểu cấu trúc và cách sử dụng của gem whenever, mình sẽ giới thiệu một chút về cron job và tại sao lại sinh ra gem whenever. 
# 1. Cron job là gì
Cron là một hệ thống lập lịch công việc có sẵn trong hệ điều hành Linux & MacOS. Cron được sử dụng để lập lịch cho các công việc lặp đi lặp lại. Lập lịch các tác vụ một lần có thể được thực hiện bằng cách sử dụng tiện ích được liên kết. Nếu có một nhiệm vụ định kỳ cụ thể mà bạn muốn chạy tự động hàng ngày, hàng tuần hoặc thậm chí hàng giờ, thì Cron có thể là thứ bạn đang tìm kiếm.

Cron giống như một chiếc đồng hồ báo thức, mình đặt báo thức 6h sáng chuông báo thức sẽ kêu....
## 1.1 Crontab
* Các hành động của cron được điều khiển bởi một tệp crontab.
* Crontab là một tệp cấu hình chỉ định các lệnh shell để chạy định kỳ theo một lịch trình nhất định. Các tệp crontab lưu trữ danh sách các công việc và các hướng dẫn khác đối với daemon cron (daemon: tiến trình chạy nền). 
* Ta có thể tạo các file crontab riêng lẻ và thường có một tệp crontab trên toàn hệ thống (chỉ có quản trị viên hệ thống mới có quyền chỉnh sửa).
![](https://images.viblo.asia/fb1f0183-03c8-4859-8852-d9c106053dcc.png)
* Cú pháp của mỗi dòng mong đợi một biểu thức cron gồm 5 trường biểu thị thời gian thực hiện lệnh, theo sau là lệnh thực thi.
* Tệp cấu hình người dùng có thể được chỉnh sửa bằng lệnh `crontab -e` trên terminal ở bất cứ đâu.
* Để liệt kê các công việc đã lên lịch, sử dụng `crontab -l`
## 1.2 Các định nghĩa lập lịch phi tiêu chuẩn
![](https://lh6.googleusercontent.com/tbtC3k9yDq7AZR-DdDztUnXroZf76h10hV-k8iU2USLLVfAbPBFx-V69kFM6dcJecPxbHvrhr6bhCUBlsuq2rknCuD9Pf6RdwE4kcAaWYbd3nX43jenRyoqtWB2v8YNRtbQLqP3-)
## 1.3 Timezone handling - Xử lý múi giờ
> Hầu hết các triển khai cron dựa trên múi giờ của hệ thống mà daemon cron chạy dưới đó. Vấn đề về nhiều người dùng ở nhiều múi giờ thì lập lịch xử lý như thế nào?
> Để giải quyết vấn đề này, cron có một trường hợp đặc biệt để nhận ra các dòng có dạng "CRON_TZ=<time_zone>" trong crontabs của người dùng, nó sẽ diễn giải các mục crontabs tiếp theo liên quan tới múi giờ đó.
# 2. Whenever trong rails
Ở phần 1, mình đã giới thiệu tổng quát về cron job, vậy câu hỏi đặt ra là: vậy nó có liên quan gì tới cái gem whenever này? Đơn giản là vì gem whenever nó được sử dụng để hỗ trợ lập trình viên chúng mình viết các cron job trong ruby thôi :stuck_out_tongue_winking_eye:. 
Vì cú pháp để viết một cron job khá dài và cồng kềnh, khó đọc code và bảo trì nữa, do đó mà các nhà phát triển đã tạo ra gem whenever để khắc phục những vấn đề đó. 
## 2.1 Cấu hình gem
Có hai cách để cấu hình gem:
* Cách 1: Sử dụng lệnh sau "gem install whenever"
* Cách 2: Sử dụng bundle install
  - Thêm dòng sau vào Gemfile "gem 'whenever', require: false"
 - Chạy "bundle install"

Để lập lịch các công việc của mình, trước tiên ta cần tạo một file config để lưu các công việc cần lập lịch. Whenever cung cấp lệnh sau để tạo file config:
`bundle exec wheneverize .` Thao tác này sẽ tạo tệp config/schedule.rb ban đầu cho bạn (miễn là thư mục config đã có trong dự án của bạn). Bạn sẽ viết các cronjobs trong file này.
## 2.2 Whenever command
Lệnh `whenever` hiển thị cho bạn file schedule.rb sau khi chuyển thành cron syntax. Lệnh này sẽ không đọc hay ghi file crontab.

Ví dụ:
![](https://lh4.googleusercontent.com/pJB5ephoUR5Duz7pojWGqQ0BO9UI_-0nF7-ivQhnsV1381CicWWaOJpN9bHyz6SBGDi-BcIgTl9qxKJZ5sfnemxEzo4JUIGK0ToLpWdfbjKzEhnFuDYfXGhxRbBFBgvYNOJS0GoK)
* Ô được tô đỏ là thời điểm thực thi lệnh cron, mình xét lịch cho công việc `invite_messages` là cứ sau 30 phút sẽ thực thi một lần. Như vậy, cứ sau 30 phút, hệ thống sẽ thực hiện chạy `rake batch:invite_messages` và ghi nhật ký vào file log/cron_log.log
* Khi bạn thêm một công việc cần được lập lịch vào trong file config/schedule.rb, bạn cần phải chạy thêm lệnh sau để công việc mới được thêm vào crontab: `whenever --update -crontab`
* Để xem các lệnh cron jobs đang chạy, sử dụng lệnh sau: 
`crontab -l`
* Để xem đầy đủ các tùy chọn trong lập lịch, sử dụng lệnh sau: 	
`whenever --help`
## 2.3 Ví dụ lập lịch công việc
```ruby
every 3.hours do # Cứ sau mỗi 3 tiếng sẽ thực hiện các công việc sau
  # Các công việc dưới đây được thực hiện song song(không theo trình tự)
  runner "MyModel.some_process"
  rake "my:rake:task"
  command "/usr/bin/my_great_command"
end

every 1.day, at: '4:30 am' do # Mỗi ngày, vào lúc 4 giờ 30 sáng sẽ thực hiện lệnh sau:
  runner "MyModel.task_to_run_at_four_thirty_in_the_morning"
end

every 1.day, at: ['4:30 am', '6:00 pm'] do # mỗi ngày, vào lúc 4 giờ 30 sáng hoặc 6 giờ tối:
  runner "Mymodel.task_to_run_in_two_times_every_day"
end

every :hour do # cứ mỗi giờ sẽ thực hiện lệnh bên dưới
# Có nhiều shortcut có sẵn như: :hour, :day, :month, :year, :reboot
  runner "SomeModel.ladeeda"
end

every :sunday, at: '12pm' do # mỗi chủ nhật hàng tuần, vào lúc 12 giờ trưa
# Use any day of the week or :weekend, :weekday
  runner "Task.do_something_great"
end

every '0 0 27-31 * *' do
# Viết theo cú pháp cron job: lúc 00:00 từ ngày 27 đến ngày 31 hàng tháng sẽ thực hiện công việc sau:
  command "echo 'you can use raw cron syntax too'"
end

# run this task only on servers with the :app role in Capistrano
# see Capistrano roles section below
every :day, at: '12:20am', roles: [:app] do
  rake "app_server:task"
end
```
## 2.4 Định nghĩa job types
Whenever xác định với 4 loại công việc được định nghĩa trước: command, runner, rake, script.
* command dùng để thực thi các lệnh trên terminal.
* runner dùng thực thi trực tiếp các method trong một class.
* rake dùng để thực thi các công việc được đặt trong batch file.
* script dùng để thực thi các script task

Các job types mặc định giao cho whenever được định nghĩa như sau:

```ruby
job_type :command, ":task :output"
job_type :rake,    "cd :path && :environment_variable=:environment bundle exec rake :task --silent :output"
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  "cd :path && :environment_variable=:environment bundle exec script/:task :output"
```
* Nếu một `:path` không được đặt, nó sẽ mặc định là thư mục mà whenever được thực thi, `:environment_variable` sẽ mặc định thành "RAILS_ENV"
* Môi trường mặc định là `:production` và `:output` sẽ được thay thế bằng cài đặt chuyển hướng đầu ra của bạn.
* Tất cả các công việc được chạy mặc định với lệnh: `-l -c 'command...'`. Bạn cũng có thể thay đổi lệnh này bằng cách set `:job_template` của riêng mình: `set :job_template, "bash -l -c ':job'"`

Ngoài ra, bạn cũng có thể tự định nghĩa các job types của riêng mình thông qua `job_type`.
```ruby
job_type :awesome, '/usr/local/bin/awesome :task :fun_level'

every 2.hours do
  awesome "party", fun_level: "extreme"
end
```
* Cron job sẽ hiểu rằng nó cần chạy lệnh sau mỗi 2 giờ: `/usr/local/bin/awesome party extreme`
* `:task` luôn được thay thế bằng đối số đầu tiên và bất kỳ phần bổ sung `:whatevers` nào đều được thay thế bằng các tùy chọn được chuyển vào hoặc bằng các biến được xác định với `set`.
## 2.5 Phân tích ngày và giờ
Whenever sử dụng [gem Chronic](https://github.com/mojombo/chronic) để phân tích các ngày và giờ được chỉ định. Bạn có thể đặt cấu hình Chronic tùy chỉnh của mình nếu các giá trị mặc định không phù hợp với bạn. Ví dụ: đồng hồ 24 giờ thay cho 12 giờ mặc định.
```ruby
set :chronic_options, hours24: true

# By default this would run the job every day at 3am
every 1.day, at: '3:00' do
  runner "MyModel.nightly_archive_job"
end
```
## 2.6 Output - chuyển hướng đầu ra
Chuyển hướng đầu ra chính là việc ghi lại nhật ký hoạt động của công việc của bạn vào một file mà bạn set cho nó.
Trong tệp Schedule.rb, bạn có thể chỉ định các tùy chọn chuyển hướng cho các lệnh của mình ở cấp độ toàn cầu hoặc cấp độ lệnh bằng cách đặt biến :output. 

Ví dụ này là cấp độ toàn cầu (global):
![](https://lh4.googleusercontent.com/2vp719_UIoQD-0f5LxdXJcbOAJQlpcFzRVeCfh_1sm1SF6guRUv6cvJk6R0p2YRwj0L3scINRSj_d-9Z4my3PmIVV7zGj0il8DE5VyciAt9q5P59Mt1c1wMA44z63AXAYWOJ0-66)
Ví dụ trên, mình lưu nhật ký ở trong file log/cron_log.log
Trước đó mình sẽ tạo một file cron_log ở trong thư mục log để làm cho đường dẫn tồn tại.
> Lưu ý: đặt đoạn mã này trên đoạn mã định nghĩa lập lịch công việc của bạn, nếu không, đoạn mã trên sẽ không hoạt động.

Bạn cũng có thể set đầu ra riêng biệt cho STDOUT và STDERR:
```ruby
# adds ">> cron.log 2> error.log" to all commands
  set :output, {:error => 'error.log', :standard => 'cron.log'}

  # adds ">> cron.log" to all commands
  set :output, {:standard => 'cron.log'}

  # adds "2> error.log" to all commands
  set :output, {:error => 'error.log'}
```
Lỗi sẽ được log vào file error.log và đầu ra của công việc nếu chạy thành công sẽ được lưu vào file cron.log

Ví dụ ở cấp độ lệnh:
```ruby
every 3.hours do
    runner "MyModel.some_process", :output => 'cron.log'     
    rake "my:rake:task", :output => {:error => 'error.log', :standard => 'cron.log'}
    command "/usr/bin/cmd"
  end  
```
Bạn cũng có thể chuyển output thành một command bằng cách sử dụng lambda như ví dụ sau:
```ruby
set :output, lambda { "2>&1 | logger -t whenever_cron" }
```
> Nếu như bạn đặt đầu ra của log file bằng nil, nó sẽ mặc định điều hướng đầu ra tới dev/null

Trong Rails, đầu ra để đưa các tệp vào thư mục nhật ký là `log/name_of_log.log`

# Tài liệu tham khảo:
1. [Wiki cron](https://en.wikipedia.org/wiki/Cron)
2. [How to Schedule Cron Jobs in Ruby With the Whenever Gem](https://www.rubyguides.com/2019/04/ruby-whenever-gem/)
3. [Wiki whenever](https://github.com/javan/whenever)
4. [Chạy tự động các tác vụ task với whenever ](https://viblo.asia/p/chay-tu-dong-cac-tac-vu-task-voi-whenever-va-rake-trong-rails-naQZRW7Plvx)
5. [How to list, display, & view all current cron jobs in linux](https://phoenixnap.com/kb/how-to-list-display-view-all-cron-jobs-linux#:~:text=Cron%20jobs%20are%20typically%20located,users%2C%20except%20the%20root%20user.)

Trên đây là bài viết chia sẻ của mình về gem whenever và cách sử dụng nó trong rails, cảm ơn các bạn đã theo dõi. Chúc các bạn có một ngày làm việc hiệu quả :hugs:.