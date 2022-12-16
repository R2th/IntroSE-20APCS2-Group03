# Introduction
Trong hướng dẫn này, chúng ta sẽ khám phá hai tính năng của Ruby on Rails - Action Cable và Active Job. Action Cable có tính năng tích hợp giao thức truyền thông WebSocket so với HTTP , cung cấp một số tính năng mới tuyệt vời sẽ cung cấp cho bạn nhiều ý tưởng mới để xây dựng nhiều thứ. Rails có lẽ là framework đầu tiên áp dụng và triển khai giao thức WebSocket! Để thể hiện tốt nhất các khả năng của ActionCable, WebSocket và Active Job, tôi sẽ tạo một cuộc trò chuyện bằng Ruby on Rails.
# HTTP and Websockets
Trong HTTP, kết nối giữa server và client có tuổi thọ ngắn: Client yêu cầu tài nguyên từ server, kết nối với máy chủ được thiết lập và tài nguyên được yêu cầu (có thể là JSON, HTML, XML ... ) được truyền trực tuyến tới client dưới dạng response. Sau đó, kết nối bị đóng. Nhưng làm thế nào để người dùng biết nếu máy chủ có dữ liệu mới hoặc có cập nhật? Thông thường, HTTP sẽ sử dụng tính năng long polling, trong đó client sẽ "hỏi" máy chủ nếu có điều gì đó mới trong một khoảng thời gian nhất định.

Không giống như HTTP, WebSockets là giao thức cho phép client và server giữ kết nối mở, cho phép chúng truyền trực tiếp dữ liệu giữa nhau. Client subscribes kết nối websocket mở trong server và khi có thông tin mới, server sẽ phát dữ liệu và các client đã đăng ký sẽ nhận được. Bằng cách này, cả server và client đều biết về trạng thái của dữ liệu và có thể dễ dàng đồng bộ hóa các thay đổi khi chúng xảy ra.
# Building the application
## Setup
Giả sử máy bạn đã cài đặt sẵn Ruby, Rails và DB(MySQL).
Ở đây mình sử dụng Ruby 2.7, Rails 5.2.4 và MySQL

Tạo app:
`rails new demo-socket -d mysql`

Di chuyển tới thư mục chứa project
`cd demo-socket`

Thiết lập các biến để kết nối DB ở file *database.yml*

Thử *rails server* và access vào *localhost:3000* đã được chưa nhé.
## User and Devise
Thêm `gem 'devise'` vào file Gemfile trong project.

Cài đặt gem mới bằng lệnh
`bundle install`

Intergration devise :
`rails generate devise:install`

Tạo model User bằng cách sử dụng devise generator:
`rails generate devise User email:string name:string`

Migrate vào DB:
`rails db:migrate`

## Rooms and messages
Tạo model Room: 
```
rails g model Room name:string user:references
```

Tạo model Message :
```
rails g model Message content:text user:references room:references
```

Thiết lập quan hệ :

*app/models/user.rb*
```
  has_many :messages
  has_many :rooms
```
  
*app/models/room.rb*
```
  belongs_to :user
  has_many :messages
```
  
*app/models/message.rb*
```
  belongs_to :user
  belongs_to :room
```
  
 Migrate database:
` rails db:migrate`

Tạo RoomController:
```
class RoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rooms = Room.all
  end

  def new
    @room = current_user.rooms.new
  end

  def show
    @room = Room.find_by id: params[:id]
    @messages = @room.messages.includes(:user).order(created_at: :asc)
  end

  def create
    @room = current_user.rooms.new room_params

    if @room.save
      flash[:success] = "Room is created"
      redirect_to root_url
    else
      flash.now[:danger] = "Something wrong"
      render :new
    end
  end

  private

  def room_params
    params.require(:room).permit :name, :image
  end
end
```

Cấu hình config/routes.rb
```
  devise_for :users
  resources :rooms
```

Thêm view cho index và show room
app/views/rooms/index.html.erb
```
<div class="container">
  <h2>List rooms</h2>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Owner</th>
      </tr>
    </thead>
    <tbody>
        <% @rooms.each do |room| %>
        <tr>
          <td><%= link_to room.name, room_path(room) %></td>
          <td><%= room.user.name %></td>
        </tr>
        <% end %>
    </tbody>
  </table>
</div>

<%= link_to "Create room", new_room_path %>
```

app/views/rooms/show.html.erb
```
<h1><%= current_user.name %></h1>

<div class="messaging">
  <div class="inbox_msg">
    <div class="mesgs">
			<div class="msg_history" id="messages"
				current_user = <%= current_user.id %>
				room_id = <%= @room.id %>>
				<% @messages.each do |message| %>
					<% if message.user_id == current_user.id%>
						<%= render "messages/message", message: message %>
					<% else %>
						<%= render "messages/message_other", message: message %>
					<% end %>
				<% end %>
      </div>
			<div class="type_msg">
				<div class="input_msg_write">
					<input id="user_id" name="user_id" type="hidden" value=<%= current_user.id %> />
                    <input type="text" class="write_msg js-message-content" placeholder="Type a message" />
				</div>
			</div>
    </div>
  </div>
</div>
```

Thêm 2 view để thể hiện message của người gửi và người nhận
app/views/messages/_message.html.erb
```
<div class = "message">
  <div class="outgoing_msg">
    <div class="sent_msg">
      <% unless message.content.blank? %>
        <p><%= message.content %></p>
      <% end %>
      <span class="time_date"><%= time_ago_in_words message.created_at %> ago</span>
    </div>
  </div>
</div>
```

app/views/messages/_message_other.html.erb
```
<div class = "message">
  <div class="incoming_msg">
    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
    <div class="received_msg">
      <div class="received_withd_msg">
        <% unless message.content.blank? %>
          <p><%= message.content %></p>
        <% end %>
        <span class="time_date"><%= time_ago_in_words message.created_at %> ago</span>
      </div>
    </div>
  </div>
</div>
```

Thêm jquery và bootstrap cho đẹp :
```
gem "jquery-rails"
gem "bootstrap"
```

`bundle install`

## Creating a channel
Điều đầu tiên chúng ta cần làm là kích hoạt sử dụng ActionCable trong ứng dụng. Nó được thực hiện trong hai bước đơn giản:
config/routes.rb

```mount ActionCable.server => '/cable'```

app/assets/javascripts/cable.js
```
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
```

Tạo channel 
`rails g channel room speak`

#app/channels/room_channel.rb
```
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    current_user.messages.create! content: data["message"],
                                  user_id: data["user_id"],
                                  room_id: data["room_id"]

  end
end
```

Phương thức subscribed là phương thức mặc định được gọi khi client kết nối với channel và phương thức này thường được sử dụng để 'subscribe' để client nhận các thay đổi. Action speak sẽ được sử dụng để nhận dữ liệu từ đại diện client của nó.

Đế sử dụng current_user ở channel cần chỉnh sửa một chút ở *app/channels/applicationcable/connection.rb*
```
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = env["warden"].user || reject_unauthorized_connection
    end
  end
end
```

Nó sẽ tạo *app/assets/javascripts/channels/room.js*
Sửa lại như sau :
```
$(document).ready(function() {
  var roomId = $('#messages').attr('room_id');
  App.room = App.cable.subscriptions.create({channel: "RoomChannel", room_id: roomId}, {
    connected: function() {},
    disconnected: function() {},
    received: function(data) {
      if ($('#messages').attr('current_user') == data['user_id']) {
        $('#messages').append(data['message']);
      } else {
        $('#messages').append(data['message_other']);
      }
      scrollToLastMessage();
    },
    speak: function(message, user_id, room_id) {
      this.perform('speak', {
        message: message,
        user_id: user_id,
        room_id: room_id
      });
    }
  });
});
```

Tiếp theo là viết đoạn js bắt sự kiện gửi message bằng phím enter
*assets/javascripts/rooms/actioncable.js*

```
$(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
  if (event.keyCode === 13) {
    if (!event.target.value.trim().length) {
      return 0;
    }
    App.room.speak(event.target.value,
      $("#user_id").val(),
      $("#messages").attr("room_id")
    );
    event.target.value = '';
    return event.preventDefault();
  }
});
```

## Testing
Bật `rails server` lên và test thử. Có thể mở 2 trình duyệt hoặc bật ẩn danh