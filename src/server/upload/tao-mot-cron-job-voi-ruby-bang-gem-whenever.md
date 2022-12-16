# I. Cron job là gì ?
Cron job là một chức năng để thực thi định kì một lệnh nào đó trong một khoảng thời gian đã được xác định từ trước.  
Nó có thể được sử dụng để chạy bất kỳ chương trình nào tại bất kỳ thời điểm nào.
Nếu có một công việc định kỳ cụ thể nào đó mà bạn muốn tự động chạy hàng ngày, hàng tuần hoặc thậm chí hàng giờ, thì Cron job có thể là thứ bạn đang tìm kiếm.

Ví dụ về một số công việc hay sử dụng crob :

* Chạy sao lưu cơ sở dữ liệu hàng tuần
* Tạo báo cáo hàng ngày về hoạt động của trang web
* Gửi email nhắc nhở

# II. Sử dụng cronjob trong Ruby on Rails bằng gem whenever
## 1. Cài đặt

* Cài đặt gem whenever

```
  gem install whenever
```

Hoặc bạn có thể bỏ vào thêm câu lệnh nào vào Gemfile:

```
    gem 'whenever', require: false
```
Sau đó chạy bundle install.

## 2. Cách sử dụng
Để tạo cronjob đầu tiên bạn tạo file schedule.rb trong thư mục config/schedule.rb
Cách đơn giản để tạo ra file này là 
```
bundle exec whenever
```

Mở files schedule.rb ra.

Bạn sẽ thấy một số ví dụ đã được comment lại
```
    # Use this file to easily define all of your cron jobs.
    #
    # It's helpful, but not entirely necessary to understand cron before proceeding.
    # http://en.wikipedia.org/wiki/Cron

    # Example:
    #
    # set :output, "/path/to/my/cron_log.log"
    #
    # every 2.hours do
    #   command "/usr/bin/some_great_command"
    #   runner "MyModel.some_method"
    #   rake "some:great:rake:task"
    # end
    #
    # every 4.days do
    #   runner "AnotherModel.prune_old_records"
    # end

    # Learn more: http://github.com/javan/whenever
```

**Example**

Giả sử chúng ta muốn mỗi giờ sẽ chạy một lên thông báo là bây giờ là mấy giờ thì ta làm như sau:

Viết code này bên trong tệp “config / Schedule.rb”:
```
every 1.hour do
  rake "db:backup"
end
```

Ở trên mình là ví dụ dùng với lệnh rake, có các option khác như sau :
* rake (bắt đầu tác vụ rake được xác định trên dự án hiện tại của bạn)
* runner (lớp Ruby + phương thức)
* command (lệnh hệ thống)

Sau đó:
Chạy lệnh ```whenever --update-crontab``` để tạo các mục cron.
Bạn sẽ có thể list các cron mình vừa tạo bằng cách ```crontab -l.```

Sau khi chạy lên trên bạn sẽ thấy như sau:
```
* * * * * /bin/bash -l -c 'cd /home/do.huy.thanh/blueocean-server && RAILS_ENV=production bundle exec rake puts 2021-05-14 16:36:58 +0700 --silent'
```

Bạn sẽ nhận ra là câu lệnh trên nó sẽ chỉ chạy trên production (RAILS_ENV=production)
Nếu bạn muốn chạy trên môi trường dev
Bạn có thể sử dụng cài đặt này:
```
set :environment, "development"
```
Bạn sẽ viết đoạn này trong file schedule.rb, ở trên top của file

Hoặc bạn cũng có thể dùng lệnh này 
```
whenever --update-crontab --set environment=development
```

Câu lệnh trên tạo ra các cron chạy trên môi trường development

* Làm thế nào để bạn biết cron job của bạn đã hoạt động đúng
Bạn có thể cài logging và đọc chúng

Bật logging bằng cách add dòng sau vào trên đầu file schedule.rb
```
set :output, "log/cron.log"
```
Bạn sẽ đợi đến khi cron thực thi và có thể xem thông tin của nó trong file log/cron.log

# Kết luận
Bạn đã học cách tạo một cron job để thực hiện công việc bằng gem Whenever trong Ruby!
Cảm ơn vì đã đọc.

#  Tài liệu tham khảo
*  Gem [Whenever](https://github.com/javan/whenever)