## Introduction
Action cable được Rails tích hợp WebSocket để hỗ trợ realtime được viết bằng Ruby cho phép giao tiếp 2 chiều giữa client và server. Dữ liệu được truyền tải qua giao thức HTTP(Ajax).

Nó cho phép viết các tính năng thời gian thực
Nó cung cấp đầy đủ các tính năng để hỗ trợ liên kết giữa client-side javascrip framework and sever-side Rail framework.
## Notification
### Bước 1
- Tạo table Notification
```
rails g model Notification sender_id:int content:string receiver_id:int
rails g model User name:string
```
Thiết lập mối quan hệ ho model
```
#app/models/user.rb
 has_many :notifications, class_name: Notification.name,
                        foreign_key: :receiver_id, dependent: :destroy
 has_many :send_notifications, class_name: Notification.name,
                        foreign_key: :sender_id, dependent: :destroy
```

```
#app/models/notification.rb
belongs_to :sender, class_name: User.name
belongs_to :receiver, class_name: User.name
```
### Bước 2 
- Tạo view
```
#app/views/notifications/_notification_center.html.erb
<div class="nav-item dropdown">
    <%= render "notifications/counter", counter: current_user.notifications.count %>
    <ul id="notification-list">
      <%= render notifications %>
    </ul>
</div>

```
- Partial View khi có Notification mới
```
#app/views/notifications/_notification.html.erb
<li>
  <%= notification.event %>
  <span> <%= notification.created_at.strftime("%d %b. %Y") %></span>
</li>
```
- Partial View để đếm số lượng Notifcation
```
#app/views/notifications/_counter.html.erb
  <i class="far fa-bell></i>
  <span  id="notification-counter"><%= counter %></span>
```
### Bước 3
- ActionCable sẽ cho phép bạn mở chanel và duy trì chanel kết nối của chanel tới server mà ko cần phải refresh page. Đầu tiên chúng ta sẽ khởi tạo chanel cho project với cú pháp
```
rails g channel notifications
```
```
create  app/channels/notifications_channel.rb
identical  app/javascript/channels/index.js
identical  app/javascript/channels/consumer.js
create  app/javascript/channels/notifications_channel.js
```
- Rails sẽ tự đông tạo thêm cho chúng ta 2 file ```app/channels/notifications_channel.rb``` và ```app/javascript/channels/notifications_channel.js```
### Bước 4
- Thiết lập connetion ở phía server side

```
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
  identified_by :current_user

  def connect
    self.current_user = find_verified_user
  end

  private

  def find_verified_user
    if user_id = cookies.signed[:user_id] || request.session[:user_id]
      User.find_by(id: user_id) || reject_unauthorized_connection
    end
  end
end
```
### Bước 5
- Thiết lập channels ở phía server side như sau:

```
# app/channels/notifications_channel.rb
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications:#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end
end
```
### Bước 6
- Thiết lập kết nối ở phía client
```
#config/routes.rb
mount ActionCable.server => '/cable'
```
### Bước 7
- Thiết lập Subscribers ở phía client side
```
#app/assets/javascripts/channels/notifications.js
App.notifications = App.cable.subscriptions.create("NotificationsChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
    $("#notification-list").prepend(data.layout)
  }
});
```
### Bước 8
- Tạo 1  job để thực hiện việc response cho client, đồng thời broadcast sẽ gọi đến channel.
```
rails g job NotificationBroadcastJob
```
```
class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform notification
    ActionCable.server.broadcast "notifications:#{notification.receiver_id}", counter: render_counter(notification.receiver.notifications.count), layout: render_notification(notification)
  end

  private

  def render_counter counter
    ApplicationController.renderer.render(partial: "notifications/counter", locals: {counter: counter})
  end

  def render_notification notification
    ApplicationController.renderer.render(partial: "notifications/notification", locals: {notification: notification})
  end
end
```
### Bước 9
- Cuối cùng, Ta sẽ sử dụng Callbacks của Active Record để gọi Jobs thực hiện response cho client.
```
after_create :send_notification

def send_notification
  NotificationBroadcastJob.perform_now(self)
end
  ```
  ### Tổng kết
  Như vậy chúng ta đã hoàn thành việc tạo notification trong ứng dụng, mình là người mới học rails nên bài viết còn nhiều thiếu sót, mong mọi người góp ý để có thể cải thiện
  ### Tài liệu tham khảo
  https://guides.rubyonrails.org/action_cable_overview.html