## I. Background Job là gì?
Là một tiến trình xử lý ngoài luồng request/response thông thường của một trang web.
Thông thường, các trang web nhận request từ người dùng, thực hiện xử lý logic sau đó trả về một response. Đây là mô hình bình thường mà một trang web được xây dựng.
Background job theo một cách khác, nó bắt đầu từ một request đến website nhưng đòi hỏi thời gian thực thi lâu hơn so với request bình thường. Vì những request này không thể được xử lý ngay lập tức và trả về một response nên gọi là xử lý bất đồng bộ. Việc này sẽ không ảnh hưởng đến tiến trình làm việc đồng bộ của trang web và các tiến trình bất đồng bộ này thường được xử lý trên một luồng riêng biệt được sinh ra như một tiến trình riêng biệt hoàn toàn.
## II. Khi nào cần sử dụng một background job?
Có thể dễ dàng giải thích những gì một background job bằng cách mô tả một trường hợp sử dụng phổ biến mà nhiều ứng dụng phải thực hiện. Ví dụ bạn đang viết một hệ thống quản lý thông tin sinh viên trong Rails. Một chức năng chính của ứng dụng này là nó phải gửi email cho sinh viên sau khi một lệnh được thực hiện. 
Bạn có thể thực hiện tính năng này song song với tiến trình thông thường, có nghĩa là ngay sau khi một hành động tạo ra một email, hành động đó không thể hoàn thành (một response không thể được trả lại cho người sử dụng) cho đến khi email đã được gửi đi. Cách này có thể vẫn làm việc, tuy nhiên cách thức này sẽ không phải là giải pháp tốt nếu các trường hợp sau xảy ra: 

1. Server mail bị lỗi và hệ thống không thể gửi mail được.
2. Dịch vụ mail của người dùng bị lỗi và không thể nhận email
3. Hộp thư của người dùng full và không thể nhận thêm mail.

Mọi trường hợp phát sinh lỗi là việc mà một sản phẩm ứng dụng phải được thiết kế để xử lý. Điều này cũng có nghĩa là ứng dụng của bạn sẽ bị đứng thay vì trả lại một response ngay lập tức cho người dùng. Đây không phải là điều lý tưởng cho người dùng không thích chờ đợi thời gian phản hồi từ một ứng dụng. Một request quá lâu cũng có thể gây ra vấn đề năng lực cho các máy chủ ứng dụng, trì hoãn thời gian đáp ứng cho các yêu cầu từ người dùng khác mà dẫn đến quá tải.
Background jobs là một cách phổ biến để giảm bớt vấn đề này. Hãy tưởng tượng lại cùng một quy trình làm việc này nhưng với việc sử dụng một background job. Khi một email được kích hoạt, ứng dụng của bạn tạo ra một lịch chạy hoặc hàng đợi cho một EmailSendJob có chứa tất cả các thông tin liên quan cần thiết như người nhận, nội dung, chủ đề... Ứng dụng của bạn có thể tạo ra một hàng đợi các công việc trước khi chúng được xử lý. Điều này được cho phép bởi vì việc xử lý các công việc này xảy ra trên một luồng chạy nền và không ảnh hưởng đến công việc đồng bộ bình thường của ứng dụng.
## III. Các Background job framework.
### 1. Delayed job
#### 1.1. Cài đặt:
 Thêm *“gem delayedjob”* vào Gemfile. Sau đó chạy câu lệnh `bundle install` để cài đặt gem.
Active Record yêu cầu tạo một bảng trong cơ sở dữ liệu. Cần chạy câu lệnh sau để tạo bảng dữ liệu: 
```
rails g delayed_job:active_record
rails db:migrate
```
Khi chạy rails `db:migrate` , delayed_job sẽ tạo ra 1 bảng với tên gọi là delayed_job. Các tác vụ chạy ngầm sẽ được lưu vào bảng này và sau đó delayed_job sẽ xử lý từng tác vụ. Mỗi tác vụ sau khi chạy hoàn thành thì record của tác vụ đó sẽ bị xóa khỏi bảng này. Nếu tác vụ chạy không thành công, nó sẽ được retry đến khi hết lần thử tối đa, nếu vẫn không thành công thì sẽ bị xóa vào 1 thời gian sau đó.

Để thay đổi các thiết lập mặc định cho Delayed_job ta vào đường dẫn config/initializes/delayed_job.rb. và cài đặt các thông số.
VD:
* destroy_failed_jobs: có xóa job khi thất bại hay không
* sleep_delay: thời gian sleep của Worker khi không có tác vụ nào để thực thi
* max_attempts: số lần thử tối đa của job
* max_run_time: thời gian chạy tối đa của job
* max_priority: độ ưu tiên tối đa của job

#### 1.2 Tạo job
Delayed job có thể tạo background job thông qua các cách sau:

 a. Gọi `.delay` ngay sau object nào bạn muốn xử  lý ở backgroud job. Cách này tốt cho trường hợp một số tính năng thường phải thực thi trong backgroud nhưng cũng có thể chạy đồng bộ ở những tình huống khác.
 
```ruby
    #thực thi thông thường:
    mailer.send_email(user)
    #thực thi bất đồng bộ với background job
    mailer.delay.send_email(user)
```

 b.Sử dụng khi một hàm luôn được chạy nền. Để sử dụng cần gọi handle_asynchonously.
 
 ```ruby
class LessonCreateMailer < ApplicationMailer
      def remind_finish_lesson lesson
        @lesson = lesson
        mail to: lesson.user.email, subject: t(:subject_finish_lesson)
      end
      handle_asynchronously :remind_finish_lesson
end      
```

#### 1.3 Chạy job
Để chạy 1 job của Delayed_job ta dùng lệnh:

```ruby
rails jobs:work
```

## IV. Tổng kết
Delayed_job là môt gem rất tốt để xử lý các tác vụ chạy ngầm đòi hỏi thời gian thực thi lâu hoặc sẽ chạy trong tương lai. Delayed_job hoạt động bằng cách duy trì một bảng 'công việc' trong cơ sở dữ liệu để theo dõi một nhiệm vụ và vị trí của nó trong vòng đời của công việc.
Một trong những nhược điểm của các framework sử dụng cơ sở dữ liệu là khi thêm hoặc thực thi phụ thuộc vào cơ sở dữ liệu. Nếu bảng 'công việc' của bạn đặt trong cơ sở dữ liệu sử dụng chung với ứng dụng của bạn, điều này có thể đặt cơ sở dữ liệu chịu tải cao không cần thiết, nhất là trong trường hợp bạn có một hàng đợi tồn đọng nhiều jobs chưa xử lý. Cơ sở dữ liệu sẽ dễ trở thành nút cổ chai của ứng dụng.
Trên đây là bài giới thiệu một cách tổng quát về background job và gem delayed_job. Mình sẽ nói thêm về các framework khác trong bài viết tiếp theo.



#### link tham khảo: http://blog.scoutapp.com/articles/2016/02/16/which-ruby-background-job-framework-is-right-for-you