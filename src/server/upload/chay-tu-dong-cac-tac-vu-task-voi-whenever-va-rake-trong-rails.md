Phần lớn các chức năng trong ứng dụng web của bạn là để trả về kết quả (response) tương ứng với các yêu cầu (request). Tuy nhiên có nhiều trường hợp bạn cần phải tạo các tác vụ chạy độc lập hoặc định kì trên máy chủ (server) ko cần yêu cầu từ client.

Ví dụ như các tác vụ bảo trì hệ thống, các tác vụ tính toán định kì hoặc xuất báo cáo ...

#### Rake

Rake gem là một gem được sử dụng phổ biến nhất trong Ruby để xử lí, thực hiện các tác vụ (task). Rake cũng cung cấp cho bạn một môi trường thuận tiển để khai báo và sử dụng các tác vụ, sử dụng cũng hết sức đơn giản


#### Rake tasks

Để chạy một task đã được định nghĩa bạn có thể sử dụng lệnh sau

```sh
$ rake my_task_name
```

Trong trường hợp bạn không thể nhớ được hết các task đã được định nghĩa bạn có thể dùng lệnh sau để liệt kê tên các task

```
$ rake -T --all
hoặc
$ rake -T
```

Bạn cũng có thể lọc ra các task có chứa một đoạn text nào đó theo cú pháp sau
```
$ rake -T text_to_match

hoặc
$ rake -T | grep text_to_match

```

#### Rakefile

Khi chạy Rake sẽ đọc file `Rakefile` để tải (load) các tasks. Theo mặc định thì `Rakefile` sẽ có nội dung như sau

```ruby
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks
```

#### Khai báo task (Cách cài đặt một tác vụ)

Để khai báo một tác vụ cùng với namspace như sau

```ruby
namespace :myrailsapp do
  task purge_audits: :environment do
    puts "Purging old audits..."
    Audit.purge
  end
end
```

Việc khai báo bắt đầu bằng phương thức `task` với tham số truyền vào là một `hash`.  Với key `:purge_audits` sẽ là tên của tác vụ. Và giá trị tương ứng với key ở đây là `:environment`, có nghĩa là tác vụ này sẽ phụ thuộc vào environment. Trước khi thực thi tác vụ (task) nó sẽ cần phải tải (load) Rails application trước. Như vậy nếu task không cần dùng Rails, thì ta cũng không cần khai báo phụ thuộc vào `environment` như vậy tác vụ sẽ khởi tạo nhanh hơn và cũng đỡ tốn bộ nhớ hơn.

#### Mô tả tác vụ

Tất cả các task nên có một mổ tả tóm tắt công việc của task, thường nên mô tả ngắn ngọn trong một dòng

```ruby
namespace :myrailsapp do
  desc "Purge stale entries from audits table"
  task purge_audits: :environment do
    puts "Purging old audits..."
    Audit.purge
  end
end
```
Dòng mô tả này sẽ xuất hiện khi chúng ta gọi lệnh `rake -T`

#### Thiết kế task

Rake task được viết bằng ruby, bạn có thể làm những logic phức tạp ở đây. Tuy nhiên tốt nhất bạn nên viết ít logic ở rake task nếu có thể. Thay vào đó bạn sẽ gọi đến phần cài đặt của các đối tượng khác như (models, workers, services, ...)

Ở trên chỉ là một vài ví dụ đơn giản, trong trường hợp muốn truyền thêm tham số khi chạy task thì làm thế nào?

#### Truyền tham số khi chạy rake task

```
rake myrailsapp:monthly_report[8]
```

```ruby
namespace :myrailsapp do
  desc "Run monthly report"
  task :montly_report, [:month] => :environment do
    month = args[:month].to_i || Time.now.month
    puts "Generate TPS report CSV..."
    TpsWorker.export_csv(month)
  end
end
```

Khi thêm vào `[:month]` ở trong khai báo task, bạn có thể truyền tham số month khi chạy task này.

Tuy nhiên cũng có một cách khác để truyền tham số cho task như sau

#### Dùng biến ENV như là tham số

Có một cách khác để truyền tham số cho task bằng cách thêm chúng vào sau lệnh rake. Nó sẽ thêm biến với tên vào trong environment của task, ở trong task có thể truy cập như sau

```ruby
namespace :myrailsapp do
  desc "Run monthly report"
  task montly_report: :environment do
    month = ENV['month'].to_i || Time.now.month
    puts "Generate TPS report CSV..."
    TpsWorker.export_csv(month)
  end
end
```

#### Lên lịch chạy task định kì

Để chạy các task theo thời gian được đặt trước bạn có thể dùng thư viện [whenever](https://github.com/javan/whenever).

Việc cài đặt và sử dụng nó cũng rất đơn giản.

#### Cài đặt thời gian

Thời gian để chạy các tác vụ định kì theo một định dạng chuẩn. Lúc mới nhìn vào thì có vẻ hơi khó hiểu, tuy nhiên tìm hiểu qua một chút nó khá đơn giản, dựa trên cú pháp `regex` dựa trên mẫu sau
```
minute hour day month weekday
```
phút, giờ, ngày, tháng, ngày trong tuần

Dưới đây là một vài ví dụ điển hình

```
15 * * * *
```

Chạy vào phút thứ 15 mỗi giờ (tất cả các ngày)

```
00,15,30,45 * * * *
```
Chạy vào phút 00, 15, 30, 45 mỗi giờ (tất cả các ngày).

```
00 00 * * 0
```

Chạy vào lúc 0h các ngày chủ nhật

Trên đây là bài viết hướng dẫn sử dụng rake task kết hợp với whenever để lên lịch chạy các task định kì. Cảm ơn bạn đã theo dõi bài viết

#### Tham khảo

1. [Automated Tasks with Cron and Rake](http://tutorials.jumpstartlab.com/topics/systems/automation.html)

2. [whenever](https://github.com/javan/whenever)