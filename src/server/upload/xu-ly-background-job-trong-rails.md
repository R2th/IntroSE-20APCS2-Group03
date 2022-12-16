# Xử lý background jobs trong Rails
## 1. Background jobs là gì?
Thông thường, các ứng dụng web nhận được request từ phía client (hoặc một server nào đó gọi API), sau đó web server sẽ thực hiện một số xử lý (như truy vấn cơ sở dữ liệu) và ngay lập tức phản hồi dữ liệu về với tốc độ rất nhanh chỉ trong vòng vài mili giây. Đây là mô hình bình thường mà tất cả chúng ta đã quen thuộc khi phát triển các ứng dụng web và được gọi là giao tiếp đồng bộ (Synchronous).

Mặt khác, các tác vụ bất đồng bộ là những tác vụ có thể được bắt đầu từ một request thông thường, nhưng yêu cầu thời gian dài hơn để hoàn thành so với request thông thường. Vì các request này không thể được xử lý ngay lập tức mà phải cần thời gian lâu hơn để xử lý và trả về phản hồi ví dụ như các tác vụ gửi mail, truy vấn dữ liệu với một database phức tạp... và chúng được gọi là bất đồng bộ. Để không làm gián đoạn tiến trình công việc đồng bộ thông thường của một ứng dụng, các tác vụ bất đồng bộ thường được xử lý trên một luồng riêng biệt hoặc được sinh ra như một quy trình riêng biệt hay còn gọi là background jobs.


-----
**Ví dụ**: Khi người dùng đăng ký một tài khoản thì hệ thống sẽ thực hiện 2 tác vụ riêng biệt: tác vụ A thực hiện mất 2 giây và tác vụ B thực hiện mất 3 giây.
```
  def create
     register
    flash[:info] = t "controllers.users_controller.account_activation"
    redirect_to root_path
  end

  def register
    # Tác vụ A mất 2 giây
    UsersController.task_a
    # Tác vụ B mất 3 giây
    UsersController.task_b
  end

  def self.task_a
    sleep 2
  end

  def self.task_b
    sleep 3
  end
```
Khi đó sau khi đăng ký người dùng sẽ phải đợi mất khoảng 5 giây để chờ phản hồi và điều này sẽ có thể làm nguwoif dùng khó chịu vì đợi lâu.
![](https://images.viblo.asia/344c04df-959f-4e47-805f-ff6689b48be3.gif)
## 2. Xử lý background jobs.
### 2.1 Sử dụng kỹ thuật đa luồng (multithreading).
- Cánh này đơn giản chỉ là tạo ra một luồng riêng (thread) để xử lý background job trong khi luồng chính (main thread) vẫn phản hồi dữ liệu về với tốc độ của một request/response thông thường. Bạn có thể tham khảo thêm về multithreading tại [đây](https://viblo.asia/p/ruby-multithreading-PjxMeV5bG4YL)

Ở vấn đề trên, ta sẽ bọc 2 tác vụ A và B trong 2 thread riêng biệt.
```
def register
    Thread.new do
      # Tác vụ A mất 2 giây
      UsersController.task_a
    end
    Thread.new do
      # Tác vụ B mất 3 giây
      UsersController.task_b
    end
end
```

và kết quả
![](https://images.viblo.asia/a580a8e1-eb62-4686-a333-975c25aeafca.gif)
- Tuy nhiên sử dụng multithreading vẫn có một số lỗi nếu ta không kiểm soát được chúng như  [Race conditions](https://tech.vccloud.vn/race-condition-la-gi-lam-sao-de-khai-thac-20180116193609705.htm), [Deadlock](https://vi.wikipedia.org/wiki/Deadlock)...

> ![](https://images.viblo.asia/8d5d75bd-01a6-4522-a191-ba267088875e.png) Deadlock
### 2.2 Sử dụng thư viện hỗ trợ gem delayed-job.

Delayed job là một framework được phát triển ở [Shopify](https://www.shopify.com/) - một trang thương mại điện tử phổ biến. Nó hoạt động bằng cách tạo ra một table trong database và sử dụng nó để lưu thông tin của các background job để xử lý.

Cách dùng:
Bước 1: Thêm *gem "delayed_job_active_record"* vào gemfile sau đó chạy lệnh *bundle install* để cài đặt

Bước 2: chạy lệnh
```
rails g delayed_job:active_record
rails db:migrate
```
Sau khi chạy lệnh trên thì trong database sẽ xuất hiện một table có tên *delayed_job* có các cột như sau
![](https://images.viblo.asia/f08f4384-2244-4129-b88f-f090d76ba760.png)
 Bước 3: thêm hàm delay vào trước các hàm cần chạy background
 
```
  def register
    # Tác vụ A mất 2 giây
    UsersController.delay.task_a
    
    # Tác vụ B mất 3 giây
    UsersController.delay.task_b
  end
```

Bước 4: chạy lệnh sau để bắt đầu thực thi các background job
```
rails jobs:work
```

Và kết quả
![](https://images.viblo.asia/dd9c1e07-a0f6-441a-b348-05cf1867900a.gif)

Trong thời gian các tác vụ còn đang thực hiện thì bạn có thể kiểm tra các thông tin của chúng trong bảng *delayed_job* , khi thực hiện xong job nào thì delayed_job sẽ tự động xóa thông tin của tác vụ đó trong bảng *delayed_job*
![](https://images.viblo.asia/4df7880d-8ac2-4397-b825-488726dd3cf8.png)

Tuy nhiên cách này sẽ khiến database phải xử lý nhiều hơn và có thể khiến hệ thống của bạn bị chậm trong trường hợp có nhiều job trong hàng đợi.
## 3. Lời kết.
Ngoài ra vẫn còn rất nhiều thư viện khác để xử lý background jobs như Sidekiq, SuckerPunch... và mỗi thư viện đều có ưu và nhược điểm riêng, tùy vào hệ thống mà có thể lựa chọ sử dụng cho phù hợp.

Bài viết đến đây là hết, vì kiến thức còn hạn chế nên bài viết không tránh khỏi các sai sót, mong các bạn đóng ý kiến dưới comment cho mình nhé. Thank kiu vì đã đọc :D 


-----


**Tham khảo**
* https://www.agileplannerapp.com/blog/building-agile-planner/rails-background-jobs-in-threads
* https://scoutapm.com/blog/which-ruby-background-job-framework-is-right-for-you?utm_source=rubyweekly&utm_medium=email
* https://openclassrooms.com/en/courses/4567631-deploy-rails-applications/4794726-send-email-with-a-background-job