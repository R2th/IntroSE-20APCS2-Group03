Rails 5 đã cung cấp một tính năng thú vị đó là ActionCable. Nhiệm vụ của ActionCable là cho phép chúng ta có thể tạo chức năng real-time trong các ứng dụng Rails trở nên đơn giản hơn rất nhiều. ActionCable sử dụng giao thức Websocket để hỗ trợ giao tiếp hai chiều giữa client và server. Action Cable có thể chạy độc lập với server hoặc chúng ta có thể cấu hình cho nó chạy chính process của nó bên trong ứng dụng chính của server.
Nội dung bài viết này mình tập trung hướng dẫn tạo một Web Chat Real-time sử dụng ActionCable trong Rails 5.
### Yêu cầu
* Ruby 2.2.2 trở lên
* Rails 5
### **Bước 1. Tạo ứng dụng với Rails 5.**
Tạo một ứng dụng có tên `chat_action_cable`:
```Ruby
rails new chat_action_cable
```
Cài đặt các gem cần thiết:
```Ruby
gem "devise"
gem "jquery-rails"
```
ActionCable khởi tạo subscriber phía client và sử dụng jQuery để thêm nội dung vào DOM. Trong ứng dụng này mình sẽ dùng gem Devise để xác thực người dùng. Thêm `gem "devise"` và `gem "jquery-rails"`vào trong Gemfile của bạn,  `bundle install` để cài đặt gem.
Thêm `require jquery` vào application.js
```Ruby
// app/assets/javascripts/cable.js
//= require jquery
//= require rails-ujs
```
### **Bước 2. Xác thực người dùng.**
Xác thực người dùng sử dụng gem Devise.
```Ruby
rails g devise:install
rails g devise user
rails db:migrate
```
Chạy `rails s` và bạn đã có thể đăng ký tài khoản người dùng tại [http://localhost:3000/users/sign_in](http://localhost:3000/users/sign_in)
### **Bước 3. Xây dựng chức năng trò chuyện.**
1. Tạo trang hiển thị tin nhắn
```Ruby
rails g controller chats index
```
Thêm đường dẫn trong file `routes.rb`:
```Ruby
# config/routes.rb
...
root chats#index
```
Để chắc chắn người dùng đã đăng nhập trước khi gửi tin nhắn chúng ta thêm phương thức `authenticate_user!`  mà gem devise cung cấp vào trong controller:
```Ruby
# controllers/chats_controller.rb
class ChatsController < ApplicationController
  before_action :authenticate_user!

  def index
  end
end
```
2. Tạo model chứa tin nhắn

Chúng ta sẽ tạo model Message:
```Ruby
rails g model Message user:belongs_to body:text
rails db:migrate
```
Kiểm tra các liên kết giữa các model:
```Ruby
# models/user.rb
has_many :messages, dependent: :destroy
```
```Ruby
# models/message.rb
belongs_to :user
```
Tiếp theo chúng ta sẽ lấy messages trong `chats_controller.rb`:
```Ruby
# controllers/chats_controller.rb
def index
  @messages = Message.order(created_at: :asc)
end
```
Tạo `_message.html.erb` để hiển thị message:
```Ruby
# views/messages/_message.html.erb
<div class="message">
  <strong><%= message.user.email %></strong> says:
  <%= message.body %>
  <br>
  <small>at <%= l message.created_at, format: :short %></small>
  <hr>
</div>
```
Tạo chat_room để người dùng gửi tin nhắn:
```Ruby
# views/chats/index.html.erb
<h1>Chat room</h1>
<hr>
<div id="messages">
  <%= render @messages %>
</div>
<%= text_field_tag :body, "", id: "message-body" %>
```
### **Bước 4.  Tạo channel để giao tiếp giữa client và server.**
Trước tiên thêm một vài cấu hình cho trang web của chúng ta:
```Ruby
# config/environments/development.rb
config.action_cable.url = 'ws://localhost:3000/cable'
config.action_cable.allowed_request_origins = [ 'http://localhost:3000', 'http://127.0.0.1:3000' ]
```
Cấu hình `routes.rb`:
```Ruby
# config/routes.rb
...
mount ActionCable.server => "/cable"
```
Tạo channel `chat` với phương thức  `send_message`:
```Ruby
rails g channel chat send_message
```
Tiếp theo ta cấu hình cho channel vừa tạo. Cấu hình cho client:
```Ruby
# assets/javascripts/channels/chat.coffee
App.chat = App.cable.subscriptions.create "ChatChannel",
  connected: ->
    # Method này sẽ được gọi khi đã kết nối với ChatChannel.
     
  disconnected: ->
    # Method này sẽ được gọi khi đã kết thúc kết nối với ChatChannel.
    
  received: (data) ->
    $('#messages').append data['message']
    #Show messges khi nhận dữ liệu từ server trả về.
     
  send_message: (message) ->
    @perform 'send_message',  message: message
    # Dùng để thông báo với server là có dữ liệu truyền lên

  $(document).on 'keypress', '#message-body', (event) ->
    if event.keyCode is 13
      App.chat.send_message event.target.value, 
      event.target.value = ""
      event.preventDefault()
```
Cấu hình cho server:
```Ruby
# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed; end

  def send_message data
    current_user.messages.create! body: data['message']
  end
end
```
Tuy nhiên, phương thức `current_user` không thể truy cập được vào `channels`. Do đó chúng ta phải tạo `current_user` thông qua cookie mà người dùng đăng nhập `cookies.signed["user.id"]`.
```Ruby
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      session_key = cookies.encrypted[Rails.application.config.session_options[:key]]
      verified_id = session_key['warden.user.user.key'][0][0]
      verified_user = User.find_by(id: verified_id)
      return reject_unauthorized_connection unless verified_user

      verified_user
    end
  end
end
```
Khi sử dụng Devise, `cookies.signed["user.id"]` thì `id` của người dùng đăng nhập không được lưu trữ. Giải quyết vấn đề này chúng ta sử dụng Warden.
```Ruby
# config/initializers/warden_hooks.rb
Warden::Manager.after_set_user do |user,auth,opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.id"] = user.id
  auth.cookies.signed["#{scope}.expires_at"] = 30.minutes.from_now
end

Warden::Manager.before_logout do |user, auth, opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.id"] = nil
  auth.cookies.signed["#{scope}.expires_at"] = nil
end
```
### **Bước 5. Tạo một background job thực hiện việc response cho client.**
```
rails g job MessageBroadcast
```
Chúng ta sẽ sử dụng Callbacks của Active Record để gọi Jobs thực hiện response cho client:
```Ruby
# app/models/message.rb
class Message < ApplicationRecord
  ...

  after_create_commit :broadcast_message

  private

  def broadcast_message
    MessageBroadcastJob.perform_later self
  end
end
```
```Ruby
# app/jobs/message_broadcast_job.rb
class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat_channel", message: render_message(message)
  end

  private

  def render_message(message)
    MessagesController.render partial: "messages/message", locals: {message: message}
  end
end
```

Như vậy, chúng ta đã hoàn thành xong một Web Chat Real-time sử dụng ActionCable. Bây giờ bạn có thể `rails s` và mở nhiều tab để có thể xem kết quả nhé!

Tài liệu tham khảo:
1. [https://qiita.com/](https://qiita.com/eRy-sk/items/4c4e983e34a44c5ace27)
2. [https://scotch.io/](https://scotch.io/tutorials/asynchronous-chat-with-rails-and-actioncable)