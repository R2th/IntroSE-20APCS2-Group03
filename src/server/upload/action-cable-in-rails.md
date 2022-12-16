#  Action Cable in Rails
## Hôm nay chúng ta sẽ build 1 app chat sử dụng ActionCable websocket, rails và postgreql

## Http và Websockets
Với Http việc kết nối giữa client server có vòng đời ngắn. Client request đến server, kết nối được hình thành và dữ liệu được máy chủ trả về cho client gọi là response. Sau đó kết nối được đóng lại. Nhưng làm thế nào để client biết server có thay đổi. Thông thường, http sử dụng long pulling.  Client sẽ hỏi server xem có gì thay đổi không trong khoảng thời gian nhất định
Không giống như http, websocket là phương thức cho phép client và server giữ kết nối, client và server có thể trao đổi qua lại. Client subscribes đến channel trên server và khi có thay đổi, server sẽ phát tín hiệu và client nhận nó.

## ActionCable hoạt động như thế nào?
Trong Rails, controller được xây dựng với mục đích xử lí các http request. Để xử lí các kết nối websocket, rails đã tạo ra thư mục mới gọi là channels. Channels hoạt động giống controller để xử lí các Websocket request. Các channel có thể được client subscribe để  truyền dữ liệu qua lại.

## Cài đặt
ActionCable là tín năng mới được tích hợp trên rails 5.
Databse: PostgreSQL

```
    rails _5.0.0.beta3_ new chatapp --database=postgresql
````
Sau đó cấu hình ở trong file database.yml xong thì chạy
```
    cd chatapp
    rake db:create
```

Các bước cần làm:
- Tạo channel websocket phía server gọi là room_channel, nó sẽ có các các method để xử lí việc subscribe, unsubscribe và gửi data đến client
- Sử dụng javascript ở client đế gọi subscribe, unsubcribe, xử lí việc gửi mà nhận dữ  liệu.

```
    rails g controller rooms show
```
```ruby
#config/routes.rb

Rails.application.routes.draw do
root to: 'rooms#show'
```

Tiếp theo chúng ta sẽ tạo model mesage
```
rails g model message content:text
```
rồi tạo bảng message trong db
```
rails db:migrate
```

List tất cả các message
```ruby
#app/controllers/rooms_controller.rb

class RoomsController < ApplicationController
  def show
    @messages = Message.all
  end
end
```

view rooms#show
```ruby
<h1>Chat room</h1>

<div id="messages">
  <%= render @messages %>
</div>

<form>
  <label>Say something:</label><br>
  <input type="text" data-behavior="room_speaker">
</form>
```

```ruby
# app/view/messages/_message.html.erb

<div class=“message”>
  <p><%= message.content %></p>
</div>
```
```javascript
// app/assets/javascripts/application.js

//= require jquery
//= require jquery_ujs
```

## Tạo channel
### routes.
```ruby
  #config/routes.rb
     # Serve websocket cable requests in-process
   mount ActionCable.server => '/cable'
```

### cable.coffee
```
#= require action_cable
#= require_self
#= require_tree ./channels
#
@App ||= {}
App.cable = ActionCable.createConsumer()
```

Đặt <%= action_cable_meta_tag %> trong head của app/views/layouts/application.html.erb

Tạo channel 
```
rails g channel room speak
```

```ruby
 #app/channels/room_channel.rb

class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
  end
end
```

subscribed method sẽ được gọi khi client kết nối đến channel, và nó thường được sử dụng để bật lắng nghe những thay đổi cho client. speak method nhận data từ client.
```javascript
 #app/assets/javascripts/channels/room.coffee

App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel

  speak: ->
    @perform 'speak'
 ```
 Ở đây, client subscribes đến server thông qua ```App.room = App.cable.subscriptions.create "RoomChannel"```.  connected và disconnected dùng để xử lí trạng thái kết nối, received xử lí data nhận được từ server. speak method có nhiệm vụ gửi data lên server.
 
## Truyền dữ liệu
Thêm tham số vào speak method
```javascript
#app/assets/javascripts/channels/room.coffee

App.room = App.cable.subscriptions.create "RoomChannel",
  #rest of the code
  speak: (message) ->
    @perform 'speak', message: message
```
speak sẽ gửi 1 message Json object đến speak method trong class RoomChannel.
```ruby
 #app/channels/room_channel.rb

  def speak(data)
    ActionCable.server.broadcast "room_channel", message: data['message']
  end
  ```
  
  Bây giờ, speak method sẽ phát tin nhắn lên room_channel. Nhưng làm thế nào để chúng ta nhận được?
  Để làm điều này ta chỉ định tất cả các subscriber nhận nó sử dụng stream_from trong subscribed method.
  
 ```ruby
  #app/channels/room_channel.rb

class RoomChannel < ApplicationCable::Channel
  def subscribed
     stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast "room_channel", message: data['message']
  end
end
```

Về bản chất, room_channel là môi trường trong actioncable server, nơi mà dữ liệu đến và đổ về những client nhất định. Chúng ra có thể nhận dữ liệu từ subscribed method sử dụng received method trong room.coffee
```javascript
#app/assets/javascripts/channels/room.coffee

  received: (data) ->
    alert(data['message'])

  #speak function

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
  if event.keyCode is 13 # return/enter = send
    App.room.speak event.target.value
    event.target.value = ''
    event.preventDefault()
```
Một event listener được thêm phía dưới file cho textbox ở trong template. Khi chúng ta viết gì đó và nhấn enter, nó sẽ gọi speak method trong room.coffee và gửi text đã nhập lên server.

## Xử lí database
Khi nhận data từ client gửi lên, thay vì phát nó lên channel thì bây giờ lưu vào database.
```ruby
 #app/channels/room_channel.rb

  #the rest of the methods
  def speak(data)
    Message.create! content: data['message']
  end
```

Để giảm thời gian chờ server xử lí request, ta sử dụng background job để phát sóng message lên channel
```ruby
#app/models/message.rb

class Message < ApplicationRecord
  after_create_commit { MessageBroadcastJob.perform_later self }
end
```
```ruby
#app/jobs/message_broadcast_job.rb
class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'room_channel', message: render_message(message)
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
```
```ruby
#app/assets/javascripts/channels/room.coffee

  received: (data) ->
    $('#messages').append data['message']
```

## Hoàn thành
Bây giờ, bạn có thể start server và nhập vào textbox và tin nhắn của mình xuất hiện trong cuộc trò chuyện.