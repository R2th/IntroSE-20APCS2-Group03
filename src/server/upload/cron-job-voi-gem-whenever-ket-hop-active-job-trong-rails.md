Thời gian gần đây mình có làm dự án và mình có đụng 1 task "Tự động thực thi khi kết thúc lịch đăng kí cho phép". Tức là cái task phải set thời gian chạy theo lịch (setting) là sau khi kết thúc thời gian đăng kí. Mình có lên mạng và tìm hiểu về set thời gian chạy tự động trong linux có cron job và tất cả nhiêm vụ sẽ được ghi ở crontab, và trong rails có hỗ trợ gem whenever. Mình có tìm hiểu gem whenever và sử dụng kết hợp với Active Job của Rails(vì thời gian thực thi task khá lâu) để phục vụ cho giải pháp của task.
# Triển khai
## Gem whenever
Gem whenever là một gem trong rails giúp triển khai thực hiện cronjobs trong linux, thực hiện công việc tự động hóa theo chu kì mà ta có thể cấu hình. Khi sử dụng gem whenever thì cũng giống như trên terminal ở linux ta sử dụng `crontab -e` để add công việc và hẹn lịch chạy, vấn đề mấu chốt là ở đó. Hãy hiểu whenever là 1 cái đồng hồ báo thức và chúng ta có thể cài đặt thời gian trong schedule.rb

![](https://images.viblo.asia/7dea707d-b82d-47f2-a19d-7b91b9d24b47.png)

Mình đã add thủ công bằng tay công việc vào crontab với câu lệnh `0 1 * * * ~/Hoc/Rails/Vip/config/schedule.rb` tức là vào 1:00 am hắng ngày sẽ chạy file schedule.rb

Đó là thực hiện bằng tay, bây giờ chúng ta cùng triển khai gem whenever để thực hiện công việc này 1 cách tự động từ ban đầu.

Ta tiến hành add vào Gemfile, sau đó chạy bundle install
```
$ gem 'whenever', require: false
```

hoặc 
```
$ gem install whenever
```
để cài đặt gem. Sau đó ta chạy lệnh
```
$ wheneverize .
```
Một file config/schedule.rb sẽ được tạo. File này là nơi mà mình sẽ cài đặt cấu hình công việc cần chạy định kì.

Tất nhiên linux sẽ không tự hiểu được mỗi sự thay đổi của file schedule.rb mà chúng ta phải thực hiện cập nhật schedule vào crontab bằng lệnh
```
$ whenever --update-crontab
```

### Cấu hình trong file schedule.rb
Một vài cách cài đặt thời gian chạy công việc
```
every 1.day, at: '4:30 am' do
  runner "User.excute"
end

every '15 0 1 12 *' do
  rake "auto_task:enforcement"
end

every '0 0 27-31 * *' do
  command "echo 'you can use raw cron syntax too'"
end
```
Ý nghĩa các con số `15 0 1 12 *` và các dấu * xem đoạn giải thích sau:
```
+---------------- Phút (0 - 59)
|  +------------- Giờ (0 - 23)
|  |  +---------- Ngày trong tháng (1 - 31)
|  |  |  +------- Tháng trong năm (1 - 12)
|  |  |  |  +---- Thứ trong tuần (0 - 6) (Chủ nhật = 0)
|  |  |  |  |
*  *  *  *  * 
```
Vậy `15 0 1 12 *` tức là hẹn lịch cho 0h 15 phút ngày 1 tháng 12 hằng năm sẽ chạy task.

Các bạn có thể thấy ở trên có các kiểu chạy Job khác nhau như: rake hay là runner, command và script
* rake: Chạy các rake task của Rails app
* runner: Chạy các class method của Rails app
* command: Chạy các command của linux
* script: Chạy script file

Có thể cài log của crontab bằng cách setup trong file schedule.rb:
```
set :output, "#{path}/log/cronjob.log"
```
### Cấu hình 1 file rake
Mỗi ngày vào lúc 1h sáng đều có lịch để chạy rake "auto_task:enforcement"
```
every '1.day, at: '1:00 am' do
  rake "auto_task:enforcement"
end
```
```
namespace :auto_task do
  desc "Auto task"
  task enforcement: :environment do
    end_date = end_date
    if end_date == (Date.today - 1.days).day
      AutoTaskJob.perform_now users.ids, current_day.year
    end
  end
end
```
Note ngoài luồng: Gửi dữ liệu qua thực thi Job bằng perform_now thì nên gửi id, gửi đối tượng cũng ok nhưng mà có vài case sẽ lỗi. Đó là lí do mình gửi list id user qua (users.ids)

end_date: Giả lập là ngày kết thúc thời gian cho phép nhân viên tự đăng kí

Cấu hình Job
```
class AutoTaskJob < ApplicationJob
  queue_as :high_priority

  def perform user_ids, year
    AutoTaskService.new(user_ids, year).execute
  end
end
```
AutoTaskService: Service thực thi yêu cầu bài toán

Ba đoạn code trên có nghĩa là khi kết thúc ngày cho phép đăng kí(end_date) hàng tháng thì ActiveJob(AutoTaskJob) sẽ được kích hoạt. Mọi việc sau đó chỉ là nhiệm vụ chạy Job mà ActiveJob đảm nhiệm và công việc trong Service AutoTaskService sẽ được thực hiện. Đã có bài viết trên viblo viết về ActiveJob rồi, mình sẽ để [link đây](https://viblo.asia/p/activejob-rails-4P856RYR5Y3) mọi người vào đọc.
# Kết
Trên đây là sự tìm hiểu và vận dụng của mình về gem whenever. Khi những task yêu cầu sự chạy tự động, lập lịch chạy theo một thời điểm cố định trong tương lai thì chúng ta hãy dùng gem này. Bài viết với sự tìm hiểu trong khi làm task nên có thể có những chỗ hiểu sai, mong bạn đọc có thể góp ý phần comment để cùng nhau xây dựng thêm sự hoàn thiện cho bạn đọc sau.