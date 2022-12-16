### 1. Giới thiệu
Rails 5 được thêm khá nhiều tính năng mới rất hay so với các phiên bản trước đó và ActionCable là một trong số đó. ActionCable a framework real-time configuration giống web-sockets. Nó cung cấp client-side (JavaScript) và server-side (Ruby) code.

### 2. Các bước chuẩn bị tạo demo chat

create một new Rails app với version rails 5.1.1
```bash
rails new ActionCableUploader
```
Để thực hiện việc login và trên bài viết này mình sẽ sử dụng gem Clearance chức năng authentication với email và password để phục vụ cho việc login, nhưng nó khá nhỏ và dễ override điều này khá phù hợp cho việc tạo một demo test như thế này

```bash
gem 'clearance', '~> 1.16'
```
Sau đó chạy:
```bash
bundle install
rails generate clearance:install
```
Các bước tiếp theo:
- Tạo model User (sử dụng gem clearance https://github.com/thoughtbot/clearance )
- Tạo file initializer cho Clearance để có thể modify nó khi cần thiết.
- Thêm include Clearance::Controller vào ApplicationController
- Tạo file .coffee (để tạo client phục vụ cho việc tạo demo chat)

### 3. Tạo chat page

Tạo ChatController như sau:
```ruby
# controllers/chats_controller.rb
class ChatsController < ApplicationController
  before_action :require_login

  def index
  end
end
```

routes:
```ruby
# config/routes.rb
root 'chats#index'
```
view application controller:
```ruby
<!-- views/layouts/application.html.erb -->
<% if signed_in? %>
  Signed in as: <%= current_user.email %>
  <%= button_to 'Sign out', sign_out_path, method: :delete %>
<% else %>
  <%= link_to 'Sign in', sign_in_path %>
<% end %>

<div id="flash">
  <% flash.each do |key, value| %>
    <%= tag.div value, class: "flash #{key}" %>
  <% end %>
</div>
```

- chat index
```ruby
# views/chats/index.html.erb
<h1>Demo Chat</h1>
Ta có:
```
![](https://images.viblo.asia/2fb149a2-6ffc-4ea3-b7fe-2a3c7321afe7.png)
Sau khi login chúng ta sẽ redirect về trang chat index. Bây giờ chúng ta sẽ tiến hành tạo model Message nhằm lưu những messages chat.

#### Message
```bash
rails g model Message user:belongs_to body:text
rails db:migrate
```
```bash
# models/user.rb
has_many :messages, dependent: :destroy
```
```ruby
# models/message.rb
belongs_to :user
```
Tại views/chats/index.html.erb view:

```ruby
<div id="messages">
  <%= render @messages %>
</div>

<%= form_with url: '#', html: {id: 'new-message'} do |f| %>
  <%= f.label :body %>
  <%= f.text_area :body, id: 'message-body' %>
  <br>
  <%= f.submit %>
<% end %>
```
Tạo views/messages/_message.html.erb 
```
<div class="message">
  <strong><%= message.user.email %></strong> says:
  <%= message.body %>
  <br>
  <small>at <%= l message.created_at, format: :short %></small>
  <hr>
</div>
```

Tại chats_controller.rb

```ruby
# chats_controller.rb
def index
  @messages = Message.order(created_at: :asc)
end
```
Giao diện chạy localhost sẽ như thế này:

![](https://images.viblo.asia/0eb11c60-b68d-4cda-bb1f-e794a655c97d.png)

#### ActionCable: Time for Action!

Để sử dụng ActionCable trong rails 5 ta cài đặt như sau:
```ruby
# config/environments/development.rb
config.action_cable.url = 'ws://localhost:3000/cable'
config.action_cable.allowed_request_origins = [ 'http://localhost:3000', 'http://127.0.0.1:3000' ]
```
(chỉ định url sử dụng là localhost:3000) đối với các môi trường khác thì cài đặt url tương ứng.
routes:
```ruby
# routes.rb
# ...
mount ActionCable.server => '/cable'
```
```ruby
<!-- views/layouts/application.html.erb -->
<!-- ... -->
<%= action_cable_meta_tag %>
<%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
<%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
<!-- ... -->
```
Tạo một file chat.coffee đây là file sử dụng của client
```ruby
# app/assets/javascripts/channels/chat.coffee
jQuery(document).on 'turbolinks:load', ->
  $messages = $('#messages')
  $new_message_form = $('#new-message')
  $new_message_body = $new_message_form.find('#message-body')

  if $messages.length > 0
    App.chat = App.cable.subscriptions.create {
      channel: "ChatChannel"
      },
      connected: ->

      disconnected: ->

      received: (data) ->

      send_message: (message) ->
```
file này có nhiệm vụ checking nếu như tồn tại #mesages trên page chat thì sẽ tạo ra 1 new subcription cho ChatChannel - cổng giao tiếp real-time với server. 
```bash
# Gemfile
gem 'jquery-rails
```
include in application.js
```
//= require jquery3
```
file chat.coffee
```coffee
jQuery(document).on 'turbolinks:load', ->
  $messages = $('#messages')
  $new_message_form = $('#new-message')
  $new_message_body = $new_message_form.find('#message-body')
  $new_message_attachment = $new_message_form.find('#message-attachment')

  if $messages.length > 0
    App.chat = App.cable.subscriptions.create {
        channel: "ChatChannel"
      },
      connected: ->

      disconnected: ->

      received: (data) ->
        if data['message']
          $new_message_body.val('')
          $messages.append data['message']

      send_message: (message, file_uri, original_name) ->
        @perform 'send_message', message: message, file_uri: file_uri, original_name: original_name

    $new_message_form.submit (e) ->
      $this = $(this)
      message_body = $new_message_body.val()

      if $.trim(message_body).length > 0 or $new_message_attachment.get(0).files.length > 0
        if $new_message_attachment.get(0).files.length > 0 # if file is chosen
          reader = new FileReader() # standart JS file reader
          file_name = $new_message_attachment.get(0).files[0].name
          reader.addEventListener "loadend", -> # when file has finished loading
            App.chat.send_message message_body, reader.result, file_name # send message with file
            # at this point reader.result is a BASE64-encoded file

          reader.readAsDataURL $new_message_attachment.get(0).files[0] # read file in base 64 format
        else
          App.chat.send_message message_body

      e.preventDefault()
      return false
```
#### ActionCable: Server-Side
Thực hiện bên phía server
```ruby
# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed
  end

  def send_message(data)
    message = current_user.messages.build(body: data['message'])
    if data['file_uri']
      message.attachment_name = data['original_name']
      message.attachment_data_uri = data['file_uri']
    end
    message.save
  end
end
```
Tại file app/channels/application_cable/connection.rb
```ruby
# app/channels/application_cable/connection.rb

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_current_user
      reject_unauthorized_connection unless self.current_user
    end

    private

    def find_current_user
      if remember_token.present?
        @current_user ||= user_from_remember_token(remember_token)
      end

      @current_user
    end

    def cookies
      @cookies ||= ActionDispatch::Request.new(@env).cookie_jar
    end

    def remember_token
      cookies[Clearance.configuration.cookie_name]
    end

    def user_from_remember_token(token)
      Clearance.configuration.user_model.find_by(remember_token: token)
    end
  end
end
```

#### Callback và ActiveJob
tại model mesage sẽ gọi callback như sau:
```ruby
# models/message.rb
class Message < ApplicationRecord
  belongs_to :user

  validates :body, presence: true

  after_create_commit :broadcast_message

  private

  def broadcast_message
    MessageBroadcastJob.perform_later(self)
  end
end
```

tạo activejob # app/jobs/message_broadcast_job.rb

```ruby
# app/jobs/message_broadcast_job.rb
class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'chat_channel', message: render_message(message)
  end

  private

  def render_message(message)
    MessagesController.render partial: 'messages/message', locals: {message: message}
  end
end
```
tạo mesages_controller.rb
```ruby
# app/controllers/messages_controller.rb
class MessagesController < ApplicationController
end
```
Tạo 2 thanh niên xxx@gmail.com và xxx2@gmail.com để chat:
Kết quả:
![](https://images.viblo.asia/2bbdef12-250e-4c66-a82b-97919d6bf95b.png)

### 3. Kết luận

ActionCable giúp chúng ta dễ dàng thực hiện chức năng chat real-time, có thể nói nó là một tính năng vượt trội mà rails 5 đã cung cấp. Qua bài viết hi vọng các bạn sẽ có thể ứng dụng nó vào trong project đang làm.
### 4. Tài liệu tham khảo
https://medium.com/rubyinside/action-cable-hello-world-with-rails-5-1-efc475b0208b
https://scotch.io/tutorials/asynchronous-chat-with-rails-and-actioncable#toc-messages