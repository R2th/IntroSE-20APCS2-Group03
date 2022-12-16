Trong quá trình làm dự án, chúng ta thường xuyên phải làm việc với tính năng gửi mail. Tính năng này thực sự có mặt trong hầu hết các dự án, và với sự trợ giúp của class Action Mailer nó trở nên đơn giản hơn rất nhiều với các lập trình viên, tuy nhiên với mỗi email gửi đi chúng ta phải thật sự cẩn trọng bởi nó thường chứa đựng nhiều thông tin cá nhân người dùng, các thông báo quan trọng hoặc thậm chí là các thông tin thanh toán nhạy cảm. Hôm nay mình xin giới thiệu đến các bạn 1 gem giúp chúng ta có thể xem được các email gửi đi ở môi trường develop, điều này giúp chúng ta hạn chế được phần nào các sai lầm có thể xảy ra khi gửi mail, đó là gem Letter opener.


**I.Khởi tạo project Rails demo**

Các bạn chạy câu lệnh
```
rails new letter_opener_demo
```
để tạo project rails, trong file Gemfile, thêm dòng `gem 'letter_opener',  :group => :development` và chạy `bundle install` để cài đặt gem trên môi trường develop.


**II.Config letter_opener trên develop**


Sau khi đã tạo project và cài gem xong, chúng ta tiến hành config để Rails gửi mail thông qua letter_opener trên môi trường develop.
Trong file config/environments/development.rb các bạn thêm dòng sau:

```
config.action_mailer.delivery_method = :letter_opener
```


**III. Viết class Notification Mailer**


Nhập dòng sau trong console của dự án:

```
rails generate mailer NotificationMailer
```
Rails sẽ tự động sinh cho chúng ta 3 file như sau:

1 app/mailers/notification_mailer.rb
2 app/views/notification_mailer
3 test/functional/notification_mailer_test.rb

Mở file app/mailers/notification_mailer.rb chúng ta được những dòng code mặc định sau:

```
class NotificationMailer < ActionMailerBase
    default from: "from@example.com"
end
```

Các bạn có thể sửa dòng trên để thêm địa chỉ gửi và nhận mặc định, ví dụ như sau 

```
default :from => "from@framgia.com",  :to => "to@framgia.com"
```
Giờ các email của bạn có địa chỉ gửi và nhận mặc định như trên, nếu muốn thay đổi địa chỉ người nhận và gửi, chúng ta có thể truyền tham số vào hàm gửi mail sau.

Tiếp theo chúng ta viết 1 hàm gửi mail, các mail được gửi đi đều gọi qua hàm này, chỉ xác định nội dung gửi bởi các tham số truyền vào.

```
def notification_mailer(notification)
  @notification = notification
  @url  = "http://example.com"
  mail(:subject => "New Notification")
end
```

**IV. Thiết lập nội dung email** 


Mỗi loại email cần có 2 loại file là text và html. Điều này giúp chung ta định dạng được template của mail khi gửi nhiều mail tự động.
Chúng ta phải tạo ra 2 file có tên giống hàm gửi mail, file html có dạng như sau

```
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></pre>
<h1>Notification email.</h1>
<h2><%= @notification.headline %></h2>
<pre>
<%= @notification.content %>

This email was sent out to you, because you are subscribed to the postbox-mailing-list.
If you want to unscribscribe, please use this url: <%= @url %>.
```
Các tham số trong hàm notification email sẽ được hiển thị thay thế ở trong file html này.


**V.Viết controller và action gửi mail**

Chúng ta tiếp tục viết controller để gửi email, để đơn giản và gọn nhẹ chúng ta dùng scaffold. Nhập vào console dòng sau

```
rails generate scaffold Notification headline:string content:text
```
Mục đích là tạo ra model và controller sẵn có, với 2 trường trong email là tiêu đề và nội dung mail .

Sau lệnh trên, rails sẽ sinh mặc định cho chúng ta file migrate, controller và model, các bạn chạy `rake db:migrate` để sinh database.

Trong action create của controller Notification, chúng ta thêm dòng gửi email khi tạo notification. Code sẽ như sau

```
def create
  @notification = Notification.new(notification_params)
  respond_to do |format|
    if @notification.save
      NotificationMailer.notification_mailer(@notification).deliver
      format.html { redirect_to(@notification, :notice => 'Notification was successfully created.') }
    else
        render :new
    end
  end
end
```

Sau đó các bạn chạy rails server.

Bây giờ các bạn vào địa chỉ `localhost:3000/notifications/new`, nhập mail title và content như ảnh bên dưới:



![](https://images.viblo.asia/304db806-a439-4472-81c6-677380989804.png)




Sau đó bấm gửi đi, khi notification được lưu lại, email sẽ được gửi và màn hình chuyển đến action show notification đã được tạo



![](https://images.viblo.asia/abc1bd8a-9a50-4c2b-adb4-514f9dd6e0d6.png)



Cuối cùng Gem letter_opener sẽ mở 1 tab mới và cho chúng ta xem nội dung email mà chúng ta đã gửi đi. Như vậy là xong rồi :D.



![](https://images.viblo.asia/d16d2608-0379-4288-aa84-854a0d665417.png)

Như các bạn đã thấy, gem letter_opener là 1 gem khá hữu ích trong quá trình xây dựng dự án, nó giúp chúng ta giả lập việc gửi mail trên môi trường develop và cũng giúp chúng ta test lại các chức năng gửi mail đã làm, hạn chế sai sót trong hệ thống. Hy vọng bài viết sẽ giúp các bạn triển khai dự án một cách dễ dàng hơn.