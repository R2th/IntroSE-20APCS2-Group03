https://viblo.asia/p/tu-dong-gui-mail-bang-delayed-job-OeVKBg90ZkW
https://github.com/collectiveidea/delayed_job
# 1/ Delayed_job là gì - Cơ chế hoạt động
## 1.1/ Khái quát
Mọi người thường biết đến delayed job như là một gem hỗ trợ cho việc xử lý các tác vụ bất đồng bộ với server, nhằm nâng cao hiệu suất. Cụ thể hơn, delayed job đóng băng những dòng lệnh mà chúng ta mong muốn, và rồi sẽ tiến hành chạy chúng vào 1 khoảng thời gian nào đó kể từ lúc mà nó được gọi đến.
Ví dụ như sau khi đăng ký một user, thông thường mail yêu cầu xác nhận sẽ được gửi ngay lập tức đến hòm thư của user đó. Tuy nhiên vì một lý do nào đó bạn muốn thư được gửi sau 5 phút kể từ lúc người tạo tài khoản nhấn submit thì delayed job sẽ giúp bạn làm điều đó.
* Lưu ý: Delayed job chỉ hỗ trợ cho Rails phiên bản 3.0 trở đi.
## 1.2/ Cơ chế hoạt động
Delayed job tạo ra một bảng có tên là delayed_job và được lưu vào trong DB. Mỗi khi được gọi đến, tác vụ ngầm(là những đoạn code mà bạn muốn 'đóng băng' như mình đã nói ở trên) sẽ được sinh ra và lưu thành record. Mỗi khi tác vụ được thực thi thành công thì nó cũng sẽ tự động xóa đi để , ngược lại nếu như thất bại thì sẽ retry cho đến khi thành công hoặc cho đến khi hết số lần thử .. rồi cũng tự động xóa. (À, số lần thử tối đa sẽ được config trong file delayed_job_config.rb, mình có nói ở bên dưới nhé)
# 2/ Bài toán cần giải
Như đã nói trên, Delayed job có thể áp dụng được cho khá nhiều trường hợp. Ở đây mình sẽ giới thiệu cho các bạn cách sử dụng delayed job trong việc tự động update record
Mình có một chức năng đặt hàng nho nhỏ, với mỗi đơn hàng sẽ tương ứng với một record ở bảng Booking. Trong bảng Booking này, trường status sẽ quyết định trạng thái của đơn hàng với qui ước:
* uncheck - Đơn hàng vừa được khởi tạo và chưa có phản hồi từ nhà cung cấp
* accepted - Đơn hàng đã được duyệt
* denied - Đơn hàng bị từ chối
Cách hoạt động của chức năng này là kể khi đơn hàng được khởi tạo cho đến 7 ngày sau, nếu như nhà cung cấp không duyệt đơn thì đơn hàng sẽ tự động bị hủy bỏ. Như vậy, bài toàn chúng ta cần giải là sử dụng delayed job để chuyển status của một record đơn hàng nếu như sau 7 ngày mà status của nó vẫn là "uncheck"
Nào, cùng thử 'nhẹ' một cái nào

# 3/ Cài đặt và sử dụng
## 3.1/ Cài đặt
Đầu tiên bạn cần thêm dòng này vào trong Gemfile và sau đó nhớ chạy bundle install lại nhé.

`gem 'delayed_job_active_record'`

Tiếp theo mở terminal và chạy 2 dòng lệnh sau để tạo bảng delayed_job

`rails generate delayed_job:active_record
rails db:migrate`

Các column chính trong bảng delayed_job:
priority: task có độ ưu tiên nhỏ hơn sẽ chạy trước
attempts: số lần retry của task(Nếu không định nghĩa lại thì sẽ tự động set default theo config ở delayed_job_config.rb)
last_error: nguyên nhân gây lỗi của lần thử cuối cùng
run_at: thời điểm để thực thi task
queue: tên của queue

-----


Đối với Rails 4.2 trở đi, bạn cần config ở trong config/application.rb với dòng lệnh

`config.active_job.queue_adapter = :delayed_job`

Tham khảo thêm về phần này ở [đây](https://guides.rubyonrails.org/active_job_basics.html#setting-the-backend)
## 3.2/ Sử dụng
### a. Tạo job
Tiếp theo ta cần tạo job để thực hiện thao tác đổi status
```
# app/jobs/notify_create_store_job.rb

class AutoUpdateBookingStatusJob < ApplicationJob
  queue_as :auto_update_booking_status_job

  def perform(booking) #Đơn hàng cần xét để thay đổi status
      if booking.status == "uncheck" #Kiểm tra trạng thái hiện tại xem có cần đổi status không
        booking.status = "denied"
        booking.save
      end
  end
end

```

### b. Gọi từ controller
Ở trong BookingController, mỗi khi đơn hàng được khởi tạo, mình sẽ tính toán thời gian 7 ngày kể từ ngày hiện tại, sau đó truyền và gọi thằng Auto update job ở trên
```
  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      change_status_day = Time.now.to_i/(24 * 3600) + 7 #Đoạn này tính ngày cần thay đổi status nè 
      AutoUpdateBookingStatusJob.set(wait: change_status_day.days).perform_later(@booking) #Sau đó gọi đến job lúc nãy, truyền thời gian delay vào wait: và nhớ truyền cả đơn hàng nữa nhé
      flash[:success] = t("success")
      redirect_to booking_path(@booking)
    else
      flash[:error] = t("fail")
      redirect_to booking__path(@booking)
    end
  end
```
Vậy là xong, đơn giản vãi chưởng :female_detective: 
Tất nhiên ở đây mình chỉ giới thiệu những bước cơ bản tối thiếu, nếu áp dụng thì tùy vào bussiness project của bạn mà thay đổi lại một chút nhé
 # 4/ Một số option + thông tin thêm
 Để config theo mong muốn, ở config/initializers/delayed_job_config.rb sẽ có những dòng như: 
`Delayed::Worker.destroy_failed_jobs = false #Xóa job khi thực thi thất bại`

`Delayed::Worker.sleep_delay = 60 #thời gian sleep của Worker khi không có tác vụ nào để thực thi`

`Delayed::Worker.max_attempts = 3 #Số lần retry tối đa `

`Delayed::Worker.max_run_time = 5.minutes #thời gian chạy tối đa của job`

`Delayed::Worker.read_ahead = 10`

# 5/ Kết luận
Delayed job là một gem khá phổ biến và hữu dụng trong việc xử lí bất đồng bộ. Hãy thử áp dụng vào project của bạn nhé