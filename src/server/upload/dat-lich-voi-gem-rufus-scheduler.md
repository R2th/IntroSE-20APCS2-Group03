## Đặt lịch với gem rufus-scheduler
### 1. Giới thiệu.
Rufus-scheduler là một gem giúp chúng ta có thể lên lịch để chạy các tác vụ, bạn có thể thiết lập các tác vụ để chạy tại một thời điểm nào đó, trong một khoảng thời gian hoặc mỗi một khoảng thời  gian nào đó ví dụ như gửi mail báo hoặc backup dữ liệu vào thời điểm nào đó hằng ngày. Khác với các gem tạo các job chạy ngầm khác như delayed job hay sidekiq lưu hàng đợi các job trên database hay redis, Rufus-scheduler là một in-memory process chạy trên một thread riêng song song với ứng dụng rails của bạn và bắt đầu chạy khi ứng dụng của bạn bắt đầu chạy.
### 2. Cách dùng.
Để sử dụng, bạn thêm gem rufus vào gem file và chạy lệnh *bundle install* để chạy:
```
gem "rufus-scheduler"
```
Sau đó dùng lệnh bundle để cài đặt
```
bundle install
```
Tiếp theo bạn tạo một file tên *scheduler.rb* nằm tỏng thư mục *config/initializers*. File này sẽ là nơi các bạn định nghĩa tất cả các tác vụ. Tại đây chúng ta sẽ tạo một đối tượng *scheduler* :
```
require "rufus-scheduler"

scheduler = Rufus::Scheduler.new
```
Rufus-scheduler cung cấp những cú pháp đơn giản để có thể thiết lập lịch. Bạn có thể tạo các công việc chạy một lần hoặc các công việc chạy định kỳ.

**Các công việc chạy định kỳ**

Tạo jobs chạy định kỳ vô cùng đơn giản, chúng ta sẽ dùng đối tượng *scheduler* đã tạo ở trên.

*config/initializers/scheduler.rb*
```
scheduler.every "1s" do
  puts "Hello!"
end
```
Khởi động rails lên và kết quả:
![](https://images.viblo.asia/4b1f6fc3-a757-4876-848c-f289dbbdeb10.gif)


**Các công việc trì hoãn**

Ví dụ bạn muốn trì hoãn 1 công việc sẽ thực hiện sau 1 giờ 30 phút thì đoạn code sẽ là:

*config/initializers/scheduler.rb*
```
scheduler.in "1h30m" do
  puts "Do something!"
end
```
Ở đây ta sẽ sử dụng từ khóa *in* thay cho *every*

**Lên lịch thực hiện các công việc**

Bạn có thể lên lịch để thực hiện các công việc vào một thời điểm nào đó, để làm điều này ta dùng từ khóa *at*. ví dụ: đoạn code dưới đây sẽ chạy vào lúc 13:0 vào ngày 1 tháng 5 năm 2019:

```
scheduler.at '2019/05/01 13:00' do
  puts "Do something!"
end
```

Lưu ý rằng bạn nên kiểm tra Time zone hiện tại của mình bằng lệnh *Time.zone.now* ở rails console, bạn có thể đặt lại time zone ở Việt Nam bằng cách thêm dòng này vào *config/application.rb*

```
config.time_zone = "Asia/Bangkok"
```

**Lên lịch thực hiện các công việc hằng ngày**

Bạn có thể lên lịch để thực hiện các công việc vào thời điểm nào đó mỗi ngày bằng cách tạo cron job, ví dụ: đoạn code dưới đây sẽ đặt lịch làm gì đó mỗi ngày vào lúc 5 giờ chiều:

```
scheduler.cron "00 17 * * *"  do
  puts "Do something!"
end
```

Ngoài ra còn nhiều options khác bạn có thể tham khảo tại trang [documents của rufus-scheduler](https://www.rubydoc.info/gems/rufus-scheduler/2.0.17) 

### 3. Lời kết.

Sử dụng rufus-scheduler thật đơn giản đúng không. Nhưng bạn hãy lưu ý rằng Rufus-scheduler chạy trên process cùng với rails app của bạn. Khi rails server của bạn tắt thì tất cả các process sẽ bị kill, điều này đồng nghĩa với việc tất cả dữ liệu của nó sẽ biết mất. Vì vậy bạn không nên tạo các bộ đếm bằng Rufus-scheduler vì nó sẽ reset khi rails server tắt/ khởi động lại.

Tham khảo:

* https://richonrails.com/articles/background-tasks-with-rufus-scheduler
* https://github.com/jmettraux/rufus-scheduler#schedulershutdown
* https://www.rubydoc.info/gems/rufus-scheduler/2.0.17