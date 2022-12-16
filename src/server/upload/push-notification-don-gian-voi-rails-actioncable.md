Trong bài này, mình sẽ xây dựng chức năng push notification đơn giản sử dụng actioncable của Rails.
Như đã biết actionCable được dùng để làm realtime cho ứng dụng của mình. 

# Bước thực hiện
### Tạo một channel cho actioncable
```
✗ rails generate channel notifications
Running via Spring preloader in process 4124
      create  app/channels/notifications_channel.rb
   identical  app/assets/javascripts/cable.js
      create  app/assets/javascripts/channels/notifications.coffee
```

Nó đã tạo 2 file như trên. Bây giờ mình sẽ subscribe vào channel tên là: `notifications_channel`

```rb
# app/channels/notifications_channel.rb
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_channel"
  end

  def unsubscribed
  end
end
```

### Tạo Form 
Đơn giản chỉ có một text_field và nút submit để có thể gửi nội dùng push message.
**View**

```rb
<%= form_tag push_notification_path do %>
  <%= text_field_tag :message %>
  <%= submit_tag :submit %>
<% end %>
```

**Controller**
```rb
class NotificationsController < ApplicationController

  def push_notification
    ActionCable.server.broadcast("notifications_channel", {message: params[:message]})
    redirect_to root_path
  end
  
end
```

**routes**

```rb
Rails.application.routes.draw do
  post :push_notification, to: "notifications#push_notification"
end
```

Đến đây, khi submit form, nó sẽ broadcast tới `notifications_channel` với data object `{message: params[:message]})`

### Làm thế nào để push notification 
Ở đây mình sẽ sử dụng Push API để push notification. 

https://developer.mozilla.org/en-US/docs/Web/API/Push_API

```js
// app/assets/javascript/application.js
// request permission
Notification.requestPermission().then(function (result) {})
```

![](https://images.viblo.asia/27fa83e7-ce35-43e7-a076-71d77ac67319.png)

Để push notification, mình có thể dùng như sau:
```js
new Notification(title, {body: body})
```

Từ đó, mình sẽ áp dụng cái này vào trong `notifications_channel` trong hàm received như sau:

```js
App.notifications = App.cable.subscriptions.create("NotificationsChannel", {
  connected: function() {console.log("connected")},
  disconnected: function() {},
  received: function(data) {
    if (Notification.permission === "granted") {
      var title = "Push Notification"
      var options = {body: data["message"]}
      new Notification(title, options)
    }
  }
});
```

Như trên, sau khi submit form, controller sẽ broadcast đến `notifications_channel`. Sau đó hàm `received` sẽ được thực hiện và call push notification lên.

![](https://images.viblo.asia/dafb6b2b-27bd-489c-953d-2b5630ebe8be.png)

 Đến đây là đã xong. Vào localhost:3000 và chạy thử nhé!