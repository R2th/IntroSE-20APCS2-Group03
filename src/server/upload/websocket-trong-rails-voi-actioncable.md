# Giới thiệu sơ lược về websocket
Websocket là giao thức giao tiếp hai chiều giữa client và server. Websocket không sử dụng HTTP mà sử dụng TCP( Tranmission Control Protocol) làm phương thức giao tiếp.  Khác với HTTP protocol (không duy trì kết nối giữa client và server, thường bắt đầu bằng request từ phía client và server sẽ xử lý và phản hồi lại) thì với websocket có thể duy trì kết nối với server và cả client và server đều có thể chủ động giao tiếp thông qua kết nối này.
Dưới đây là hình ảnh so sánh giữa HTTP protocol và websocket.
![](https://images.viblo.asia/c17df97b-bfcc-45dd-8a4b-e4bbeba357f6.png)
![](https://images.viblo.asia/63ad66c6-0f8a-4373-b070-aa0bac0d3a51.png)

Chúng ta có thể thấy rằng với websocket chỉ cần một request yêu cầu kết nối ban đầu thì client và server có thể giao tiếp với nhau qua kết nối này. 
### Ưu điểm:
=> websocket có độ trễ thấp nên thường được sử dụng trong các ứng dụng thời gian thực như chat, thông tin chứng khoán...

# ActionCable Rails
Là giải pháp tích hợp Websocket vào Rails. Nó cung cấp cả JavaScript framework phía client và cả Ruby framework phía server.
## Các khái niệm trong ActionCable
### Connections
Giống với tên gọi của nó. Nó là kết nối giữa client và server. Với mỗi Websocket thì một instance connection được khởi tạo. connection được sử dụng để xác thực và phân quyền. Ngoài ra nó không xử lý bất ký logic nào khác.
### Consumers
Phía client của websocket được gọi là consumers. Trong ActionCable thì consumer được tạo bằng JavaScript framework.
### Channels
 Channel tương tự như một controller trong MVC. Nó thực hiện xử lý logic cho ActionCable. Một consumer có thể đăng ký vào nhiều channel khác nhau. Khi đăng ký vào một channel thì ActionCable sẽ tạo ra một connection instance và một Websocket.
 ###  Subcribers
Khi một consumer đăng ký vào một channel nó hoạt động như một subcriber. Một consumer có thể đăng ký nhiều channel khác nhau cùng lúc.
# Notification app Sample
Tạo một channel với nội dung như sau:
```
# app/channels/web_notifications_channel.rb
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
```
Ở đây phương thức subscribed sẽ được thực hiện khi yêu cầu kết nối của user được chấp nhận
Tiếp theo ta cần tạo một consumer phía client
```
// app/javascript/channels/web_notifications_channel.js
import consumer from "./consumer"

consumer.subscriptions.create("WebNotificationsChannel", {
  received(data) {
    new Notification(data["title"], body: data["body"])
    # do something here
  }
})

```
Tạo một Job để thực hiện broadcast thông báo cho user
```
class NotificationJob < ApplicationJob
  queue_as :default

  def perform
    NotificationsChannel.broadcast_to current_user, title: 'signup notification', body: 'Thank for create account'
  end
end
```
Cuối cùng là callback để gọi đến job trên
```
#app/models/user.rb
after_create ->{ NotificationJob.perform_later }
```
# Tham Khảo
https://guides.rubyonrails.org/action_cable_overview.html