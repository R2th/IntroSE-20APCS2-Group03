![](https://images.viblo.asia/8a32fea0-52b5-4ee5-83b4-afc071e5670c.png)
Chào mọi người, hôm nay chúng ta sẽ tìm hiểu về Action Cable trong Rails. :red_car:
# Introduction
Action Cable tích hợp [Websockets](https://en.wikipedia.org/wiki/WebSocket) với Rails app. Nó cho phép Rails xây dựng các tính năng realtime.

Với `full-stack offering`: cung cấp cả client-side `JavaScript` framework, và `Ruby` server-side framework.
# Terminology
Một `Action Cable server` có thể xử lý nhiều kết nối tới. Mỗi kết nối Websocket sẽ có một connection instance tương ứng.

Một user có thể có nhiều kết nối Websocket tới app nếu user đó mở  nhiều tab trên các trình duyệt hoặc thiết bị.

Client có kết nối websocket được gọi là `consumer`. Mỗi `consumer` có thể subscribe tới nhiều `cable channel`(kênh truyền). `channel` là nơi chứa các logic, như là controller trong mô hình MVC.

 Khi `consumer` đăng kí `channel`, trở thành `subscriber`, `connection` giữa `subscriber` và `channel` được gọi là `subscription`.
 

-----


# Server-Side Components
## 1. Connections
`Connection` thiết lập mỗi quan hệ giữa client và server, với mỗi `Websocket` kết nối tới server, một `connection` object được khởi tạo. Object này trở thành  cha của tất cả `channel subscriptions` được tao sau này.

`Connection` là một instance của `ApplicationCable::Connection`. Trong class này, ta sẽ phân quyền, tiến hành kết nối nếu user được xác định.
### 1.1 Connection setup
```ruby
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
 
    def connect
      self.current_user = find_verified_user
    end
 
    private
      def find_verified_user
        if verified_user = User.find_by(id: cookies.encrypted[:user_id])
          verified_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
```

`identified_by` định danh connection để dễ dàng cho việc tìm kiếm connection sau này.

`cookie` tự động được gửi tới `connection instance` khi có `connection` mới, và ta dùng nó để đặt giá trị cho `current_user`. Bằng việc định danh mỗi `connection` bằng `current_user`, ta có thể lấy lại các `connection` của user đó.
## 2. Channels
`channel` là nơi chứa các logic, như là controller trong mô hình MVC. `channel` được tạo bởi class `ApplicationCable::Channel`.
### 2.1 Parent channel setup
```ruby

# app/channels/application_cable/channel.rb
module ApplicationCable
  class Channel < ActionCable::Channel::Base
  end
end
```
Sau đó ta có thể tạo ra các `channel` của mình:
```ruby

# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
end
 
# app/channels/appearance_channel.rb
class AppearanceChannel < ApplicationCable::Channel
end
```
### 2.2 Subscriptions
Khi `consumer` subscribe một `channel`, trở thành `subscribers`, kết nối giữa hai bên được gọi là `subscription`
```ruby

# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
 # Được gọi khi consumer trở thành subscriber của channel này
  def subscribed
  end
end
```
# Client-Size Components
## 1. Connections
Phía client cũng cần `connection object` để thiết lập kết nối. Nó được tạo mặc định trong `Rails`:
### 1.1 Connect consumer
```ruby
// app/javascript/channels/consumer.js
import { createConsumer } from "@rails/actioncable"
 
export default createConsumer()
```

Mặc định `consumer` sẽ connect tới `/cable` tới server. `connection` sẽ không được thành lập cho đến khi ta tạo một `subscription`.
### 1.2 Subscribers
Một `consumer` trở thành `subscriber` bằng việc tạo một `subscription` tới một `channel`:
```ruby
// app/javascript/channels/chat_channel.js
import consumer from "./consumer"
 
consumer.subscriptions.create({ channel: "ChatChannel", room: "Best Room" })
 
// app/javascript/channels/appearance_channel.js
import consumer from "./consumer"
 
consumer.subscriptions.create({ channel: "AppearanceChannel" })
```
# Client-Server Interations
## 1. Streams
`Streams` cung cấp cơ chế cho những `channel` định tuyến những nội dung muốn gửi (`broadcast`) tới các `subscribers`
```ruby
# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end
end
```
Nếu ta có một `stream` có liên kết với `model` thì `broadcasting` có thể được tạo từ `model` và `channel`:
```ruby
class CommentsChannel < ApplicationCable::Channel
  def subscribed
    post = Post.find(params[:id])
    stream_for post
  end
end
```
Sau đó ta có thể `broadcast` tới kênh truyền này:
```ruby
CommentsChannel.broadcast_to(@post, @comment)
```
## 2. Broadcasting
`broadcasting` là một liên kết `pub/sub`(published, subscriber), nơi mà mọi thứ được truyền bởi `publisher` được định tuyến tới thẳng các `subscribers` đang `streaming` với tên của `broadcasting` này. Mỗi `channel` có thể `streaming` một hoặc nhiều `broadcasting`.

`broadcast` có thể được gọi ở nơi khác trong `Rails`:
```ruby
WebNotificationsChannel.broadcast_to(
  current_user,
  title: 'New things!',
  body: 'All the news fit to print'
)
```
## 3. Subscriptions
 Khi `consumer` đăng kí `channel`, trở thành `subscriber`, `connection` giữa `subscriber` và `channel` được gọi là `subscription`.
 
 Những messages được định tuyến tới `channel subscriptions` này dựa vào định danh do `cable consumer` gửi.
 ```ruby
// app/javascript/channels/chat_channel.js
import consumer from "./consumer"
 
consumer.subscriptions.create({ channel: "ChatChannel", room: "Best Room" }, {
  received(data) {
    this.appendLine(data)
  },
 
  appendLine(data) {
    const html = this.createLine(data)
    const element = document.querySelector("[data-chat-room='Best Room']")
    element.insertAdjacentHTML("beforeend", html)
  },
 
  createLine(data) {
    return `
      <article class="chat-line">
        <span class="speaker">${data["sent_by"]}</span>
        <span class="body">${data["body"]}</span>
      </article>
    `
  }
})
 ```
 ## 4. Passing parameter to channels
 Ta có thể truyền params từ phía client tới server khi tạo mới `subsciptions`:
 ```ruby
# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end
end
 ```
 Tham số đầu tiên truyền vào `subscriptions.create` trở thành params hash trong `cable channel`:
 ```ruby
 // app/javascript/channels/chat_channel.js
import consumer from "./consumer"
 
consumer.subscriptions.create({ channel: "ChatChannel", room: "Best Room" }, {
  received(data) {
    this.appendLine(data)
  },
 
  appendLine(data) {
    const html = this.createLine(data)
    const element = document.querySelector("[data-chat-room='Best Room']")
    element.insertAdjacentHTML("beforeend", html)
  },
 
  createLine(data) {
    return `
      <article class="chat-line">
        <span class="speaker">${data["sent_by"]}</span>
        <span class="body">${data["body"]}</span>
      </article>
    `
  }
})
 ```
# Examples
## Receiving New Web Notification
Tạo `notifications channel`:
```ruby
# app/channels/web_notifications_channel.rb
class WebNotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
```
Phía client:
```ruby
// app/javascript/channels/web_notifications_channel.js
import consumer from "./consumer"
 
consumer.subscriptions.create("WebNotificationsChannel", {
  received(data) {
    new Notification(data["title"], body: data["body"])
  }
})
```
Broadcast:
 ```ruby
WebNotificationsChannel.broadcast_to(
  current_user,
  title: 'New things!',
  body: 'All the news fit to print'
)
```


-----