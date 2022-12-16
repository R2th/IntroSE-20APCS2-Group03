# Giới thiệu
Chào các bạn, hôm nay mình sẽ giới thiệu về Action Cable, WebSockets interface cho Rails
mà nó kết hợp 1 ứng dụng Real-time với sức mạnh và tiền lợi của Rails.

Bài viết này mình sẽ nói tổng quan về Action Cable, sau đó giới thiệu qua 1 ứng dụng chat nho nhỏ sử dụng Restful. Nhờ vào hướng dẫn của mình, các bạn có thể áp dụng tính năng Real time cho nó cũng như có kiến thức để áp dụng tính năng Real time có các ứng dụng của bạn

# WebSockets và Action Cable

WebSocket Protocal là 1 sự bổ sung của HTTP mà tạo nên sự kết nối liên tục giữa servers và client, cho phép cả giao tiếp 2 chiều giữa chúng. Kết quả là WebSockets cho phép lập trình viên tạo 1 ứng dụng real-time như ứng dụng chat hay game servers tương tác nhiều hơn các trang web thông thường

Trước khi nói về WebSockets, chúng ta cần quan tâm tới kiến trúc HTTP. HTTP được thiết kế với kiến trúc được hiểu là "half-duplex", nghĩa là chỉ một nửa số Client/Server có thể "giao tiếp" tại một thời điểm nhất định. Chúng ta cùng xem hình minh họa dưới đây

![](https://images.viblo.asia/e692c1fe-72b2-4689-958f-b5eb05f38bd8.png)

Khi nào Client gửi một yêu cầu (request) đến Server thì Server mới xử lý và trả kết quả về cho máy khách

Trai ngược với HTTP, WebSocket cho phép Client và Server giao tiếp đồng thời và liên tục 

![](https://images.viblo.asia/899dba54-c00d-4f43-bcab-66736c4102f7.png)

Ví dụ, với 1 ứng dụng Chat sử dụng HTTP, khi 2 người ở trong cùng phòng chat, khi 1 người gửi tin nhắn, không có cách nào để người còn lại có thể nhận tin nhắn mà không tải lại trang web đó. Với WebSocket là kết nối liên tục giữa Client và Server, 2 người trong cùng phòng chat có thể gửi tin nhắn cùng 1 lúc và nhìn thấy ngay lập tức

Trong Ruby On Rails, nó cung cấp Action Cable dùng WebSocket để tạo nên những ứng dụng Real Time. Để hiểu rõ hơn về Action Cable, mình sẽ cung cấp một app chat cho các bạn, sau đó sẽ hướng dẫn áp dụng Action Cable trên ứng dụng này

# Base App

Chúng ta sẽ bắt đầu với 1 ứng dụng chat cơ bản dùng Restful thay vì Action Cable. Nhưng ứng dụng chat này không thực tế. Đặc biệt, những người tham gia trò chuyện phải làm mới trình duyệt của họ theo cách thủ công để xem tin nhắn từ những người dùng khác. Đó là lí do chúng ta sẽ áp dụng Action Cable lên ứng dụng này để nó có thể Real time nhận tự hiển thị tin nhắn khi có tin nhắn mới

Các bạn hãy click vào https://github.com/mhartl/action_cable_chat_app để clone ứng dụng này về

Sau đó bundle, migrate và seed
```
$ bundle install
$ rails db:migrate
$ rails db:seed
```

Sau khi cài xong ứng dụng sẽ có giao diện như hình dưới đây
![](https://images.viblo.asia/876ebe6f-77ae-4e88-a6d2-79f2c7ea7c63.png)

Các bạn có thể đăng nhập với username là alice password là wonderland
Hãy thử gửi 1 tin nhắn đầu tiên với alice và đăng nhập với username “bob”, password “asdfasdf” để thấy được tin nhắn của alice hiện trên main box

![](https://images.viblo.asia/4434c709-0f00-43c5-bf57-fd2c891ea1fc.png)

Nếu sau đó Bob thêm tin nhắn, nó sẽ xuất hiện ngay lập tức vì HTTP redirect trở về trang hiện tại, nhưng nó không refresh cửa sổ của Alice, vì vậy tin nhắn báo của Bob không xuất hiện. Thay vào đó, Alice phải refresh browser của mình theo cách thủ công để nhận tin nhắn của Bob

![](https://images.viblo.asia/9e52e6d2-8f94-46fa-a6dd-130bbcbb8a99.png)

Qua ứng dụng này, mình sẽ hướng dẫn các bạn thực hành áp dụng Action Cable vào trong ứng dụng này và có thể hiểu được nó và áp dụng cho nhiều ứng khác nữa

# Sơ qua về CoffeeScript
#

Theo mô tả riêng của mình, “CoffeeScript là một ngôn ngữ nhỏ biên dịch [được chuyển đổi] thành JavaScript.” Nó được thiết kế để trở thành phiên bản JavaScript sạch hơn, thân thiện với người dùng hơn.

Để hỗ trợ thêm, Rails tạo một tệp CoffeeScript mẫu trong một số contexts, bao gồm khi tạo các channel của Action Cable, điều này sẽ đủ để chúng ta bắt đầu với CoffeeScript.

Với mục đích của hướng dẫn này, điều chính chúng ta cần biết về CoffeeScript là cách define functions và cách tốt nhất để làm điều này là translate 1 vài ví dụ từ JavaScript sang CoffeeScript

VD: 

```
message_appender = function(content) {
  $('#messages-table').append(content);
}
```

Dùng CoffeeScript sẽ như thế này

```
message_appender = (content) ->
  $('#messages-table').append content
```


Sự khác biệt chính so với JavaScript như sau:

1. CoffeeScript sử dụng ký hiệu mũi tên nhỏ gọn -> cho các function.

2. Dấu ngoặc đơn thường là tùy chọn.

3. CoffeeScript sử dụng dấu chấm câu ít hơn (ít dấu ngoặc đơn hơn, không có dấu ngoặc nhọn, không có dấu chấm phẩy).

CoffeeScript được cài đặt tự động trong mọi ứng dụng Rails mới và tệp CoffeeScript được tạo với mọi controller mới.

Ví dụ cụ thể trong ứng dụng chat: 

```
message_appender = function(content) {
  $('#messages-table').append(content);
}

$(document).on('turbolinks:load', function() {
  message_appender('hello, world!');
});
```

Đoạn code trên có ý nghĩa là khi trình duyệt được tải xong thì javascript chèn đoạn text "hello, world!" vào id "messages-table"

Hãy thử convert sang CoffeeScript và áp dụng nó nào: 

> Viết vào trong  app/assets/javascripts/messages.coffee

```
message_appender = (content) ->
  $('#messages-table').append content

$(document).on 'turbolinks:load', ->
  message_appender('hello, world!')
```


![](https://images.viblo.asia/8d267df4-6ffe-4d75-af5c-0843656699aa.png)

Đoạn text đã được thêm vào.

# Áp dụng Action Cable
# 
Tiếp theo chúng ta sẽ chỉnh sửa và áp dụng Action Cable. Có 3 bước chính cần thiết để chuyển đổi ứng dụng sang ứng dụng dùng Action Cable: 

1. Tạo 1 kênh để xử lí các kết nối WebSocket ở phía server

2. Tạo 1 chương trình CoffeeScript (room.coffee) cho chat room ở phía client (web browser)

3. Cập nhật **Messages** controller với action là *create*, 
broadcast các thay đổi đến *channel* thay vì chuyển hướng hoặc render page

## Room Channel

Chúng ta có thể dùng lệnh rails để tạo ra 1 channel của Action Cable. Ở đây mình gọi tên channel đó là "Room"
```
$ rails generate channel Room
      create  app/channels/room_channel.rb
   identical  app/assets/javascripts/cable.js
      create  app/assets/javascripts/channels/room.coffee
```

Sau khi tạo xong, hãy cùng nhìn qua về channel vừa tạo

> app/channels/room_channel.rb
```
class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```

Ở đây có 2 method mặc định, **subscribed**  và **unsubscribed**. Action Cable hoạt động bằng cách đăng ký người dùng vào một channel cụ thể, cho phép trình duyệt của người dùng đó được cập nhật qua WebSocket. Các phương thức **subscribed** và **unsubscribed** là các *callbacks* cho phép chúng ta thực hiện hành động khi một trong hai sự kiện này diễn ra


Cũng lưu ý là server của Rails cần được restart để tải lại chức năng của Action Cable

Mình sẽ đặt tên cho luồng ban đầu là "room_channel", channel này sẽ broadcast cho tất cả user.

> app/channels/room_channel.rb
> 

```
 class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```

Cách gửi dữ liệu tới những người đã đăng ký channel là sử dụng method broadcast trong controller:

```
ActionCable.server.broadcast 'room_channel', <data hash>
```

Ở đây, data hash bao gồm dữ liệu được truyền tới client. Trong ứng dụng của chúng ta, nó sẽ là nội dung của tin nhắn và username của người gửi tin nhắn đó.

Để sử dụng method broadcast, chúng ta sẽ cập nhật action create trong Messages controller, thay thế redirect/render trang với Action Cable server broadcast
> app/controllers/messages_controller.rb

```ruby
class MessagesController < ApplicationController
  .
  .
  .
  def create
    message = current_user.messages.build(message_params)
    if message.save
      ActionCable.server.broadcast 'room_channel',
        content:  message.content,
        username: message.user.username
    end
  end
  .
  .
  .
end
```

Như đoạn code trên, Action Cable sẽ gửi 1 tín hiệu (broadcast) tới tất cả các users đã đăng kí ở kênh "**room_channel"**, sẽ được nhận bởi phần thứ ba, phía client của người đăng kí Room, trong trường hợp này là file **room.coffee**

> app/assets/javascripts/channels/room.coffee
```
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Được gọi khi người đăng ký đã sẵn sàng để sử dụng trên máy chủ

  disconnected: ->
    # Được gọi khi người đăng ký đã bị máy chủ chấm dứt

  received: (data) ->
    # Được gọi khi có dữ liệu đến trên WebSocket cho kênh này

```


Chúng ta thấy trong dòng được đánh dấu mà method **received** có một **data** object, nó tự động chứa data hash được broadcast 
> ActionCable.server.broadcast 'room_channel', <data hash>

Để xem mọi thứ phù hợp với nhau như thế nào, hãy đặt 1 alert trong method **received**.

> app/assets/javascripts/channels/room.coffee

```ruby
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    alert data.content
```

Để làm việc này, mình sẽ cấu hình lại routes, để cho ứng dụng biết về Action Cable server, nó sẽ chịu trách nhiệm transmitting thông tin giữa local system và máy chủ Rails. Theo mặc định, nó chạy tại URL/cable và cách để liên kết nó với server chính bằng cách sử dụng method **mount**

> config/routes.rb

```
Rails.application.routes.draw do
  root 'messages#index'
  resources :users
  resources :messages
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  mount ActionCable.server, at: '/cable'
end
```

Giờ hãy test thử action cable nào, nhập một số văn bản vào hộp trò chuyện và click "SEND"

![](https://images.viblo.asia/f74de7e1-761d-4a9a-bcc0-58593fe66173.png)

> Nói “hello, world!” bằng cách sử dụng action cable
>

# Gửi tin nhắn

Bây giờ chúng ta đã có một có thể hoạt động, mình sẽ thêm code cần thiết để thêm tin nhắn vào bảng thông báo.
> app/assets/javascripts/channels/room.coffee

```
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    unless data.content.blank?
      $('#messages-table').append '<div class="message">' +
        '<div class="message-user">' + data.username + ":" + '</div>' +
        '<div class="message-content">' + data.content + '</div>' + '</div>'
```

Để sử dụng Action Cable, chúng ta cần thay đổi form remote để gửi Ajax mà không cần làm mới trang.
> app/views/messages/_message_form.html.erb
> 
```
<div class="message-input">
  <%= form_for(@message, remote: true) do |f| %>
    <%= f.text_area :content %>
    <%= f.submit "Send" %>
  <% end %>
</div>
```

Tại thời điểm này, Action Cable cơ bản đang hoạt động: các thông báo mới xuất hiện không chỉ trên người gửi, mà còn trên các client, ví dụ, khi mình gửi cho người khác một tin nhắn

1. (client) Mình gửi một tin nhắn mới bằng cách sử dụng remote form
2. Messages controller (Listing 19) nhận được yêu cầu, lưu tin nhắn vào cơ sở dữ liệu và broadcast kết quả
3. (client) Vì mỗi người dùng được đăng ký kênh Room (Liệt kê 18), mỗi máy khách nhận được phát sóng và thực hiện phương thức nhận được, nó append tin nhắn vào bảng thông báo cho cả người gửi và người nhận.

# Cải tiến Action Cable

Mặc dù ứng dụng trò chuyện hiện đang hoạt động, có một vài cải tiến cơ bản mà mình cần thêm để thuận tiện và bảo mật.

Chúng bao gồm việc từ chối các kết nối trái phép, loại bỏ trùng lặp bằng cách sử dụng lại phần thông báo.

**Bảo vệ đăng nhập**

Chúng ta hiện đang xử lý quyền trong ứng dụng chat bằng cách sử dụng before filter, nhưng cũng có cách yêu cầu đăng nhập người dùng hợp lệ ở cấp Action Cable . Ngoài việc cung cấp cho một lớp bảo mật bổ sung, điều này sẽ tạo biến message_user mà chúng tôi sẽ đưa vào sử dụng trong sau.

Tệp có liên quan là connection.rb trong thư mục app/channels/application_cable. Nó định nghĩa một class Connection được định nghĩa khi một kết nối mới được tạo ra. Theo mặc định, file chỉ chứa một module ApplicationCable và class Connection, nhưng chúng ta có thể thêm vào code cần thiết để xác định người dùng bằng cách sử dụng **identified_by** (được cung cấp bởi Action Cable) và bằng cách định nghĩa một phương thức **connect** được gọi khi kết nối thực hiện:
```
identified_by :message_user

def connect
  self.message_user = find_verified_user
end
```

Chúng tôi cũng sẽ xác định phương thức find_verified_user trả về người dùng đã đăng nhập hiện tại hoặc từ chối kết nối:
```
def find_verified_user
  if logged_in?
    current_user
  else
    reject_unauthorized_connection
  end
end
```

Ở đây phương thức reject_unauthorized_connection được cung cấp bởi Action Cable.
Mã đầy đủ xuất hiện như trên nhưng đó chỉ là một sửa đổi nhỏ của code trong [Action Cable documentation](http://edgeguides.rubyonrails.org/action_cable_overview.html), vì vậy đừng lo lắng quá nhiều về việc hiểu nó đầy đủ. Mục đích chính của nó là để cho sử dụng message_user ở những nơi current_user không có sẵn, nhưng như đã thấy nó cũng bảo vệ chống lại các kết nối trái phép.

> app/channels/application_cable/connection.rb

```
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include SessionsHelper

    identified_by :message_user

    def connect
      self.message_user = find_verified_user
    end

    private

    def find_verified_user
      if logged_in?
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end

```

**At-mention notifications**

Nâng cao nâng cao thứ hai của mình là thông báo @mention. Như chúng ta sẽ thấy, đây là một ví dụ mang tính hướng dẫn cao vì nó sẽ yêu cầu tạo luồng trên cơ sở mỗi người dùng, điều này sẽ giúp hiểu sâu hơn về cách hoạt động của Cable Action.

Ý tưởng đằng sau thông báo @mention là cung cấp cho người dùng cách thu hút sự chú ý của những người dùng khác trong cuộc trò chuyện. Ví dụ: nếu mình nhập một thông báo đề cập đến Alice bằng tên người dùng, như trong “Good morning, @alice!” Hoặc “@alice Good morning!” thì Alice sẽ được popup về việc được đề cập.

Do Room channel được định nghĩa chỉ bao gồm  single global stream, hiện tại mọi thông báo sẽ được gửi tới tất cả người dùng. Để cho phép nhiều thông báo được gửi tới 1 người cụ thể, trong phần này, chúng ta sẽ tạo một channel riêng cho từng user dùng Room channel và sau đó gửi thông báo @mention đến các kênh của người dùng đã được đề cập.

Cách dễ nhất để tạo luồng cho mỗi người dùng là phạm vi chúng theo user id, như dưới đây

```
stream_from "room_channel_user_#{message_user.id}"
```

Ở đây, mình đã áp dụng biến message_user được tạo khi bảo vệ kết nối trong
> app/channels/application_cable/connection.rb
```
identified_by :message_user 
​
def connect
  self.message_user = find_verified_user
end
```

> app/channels/room_channel.rb
```
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
    stream_from "room_channel_user_#{message_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```

Phương pháp tạo @mentions liên quan đến việc xác định **mentions** attributes trên  Message model trả về danh sách tất cả người dùng được đề cập trong tin nhắn đó.

> app/models/message.rb

```
class Message < ApplicationRecord
  belongs_to :user
  validates :content, presence: true
  scope :for_display, -> { order(:created_at).last(50) }

# Returns a list of users @mentioned in message content.
  def mentions
    content.scan(/@(#{User::NAME_REGEX})/).flatten.map do |username|
      User.find_by(username: username)
    end.compact
  end
end
```

Chúng tôi có thể đặt method metions để hoạt động trong MessagesController bằng cách lặp qua các mentions và broadcast tới từng channel của người dùng tương ứng

```
class MessagesController < ApplicationController
  .
  .
  .
  def create
    message = current_user.messages.build(message_params)
    if message.save
      ActionCable.server.broadcast 'room_channel',
        content:  message.content,
        username: message.user.username
      message.mentions.each do |mention|
        ActionCable.server.broadcast "room_channel_user_#{mention.id}",
          mention: true
      end
    end
  end
  .
  .
  .
end
```

> app/assets/javascripts/channels/room.coffee
```
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
  
  disconnected: ->
    # Called when the subscription has been terminated by the server
  
  received: (data) ->
    alert("You have a new mention") if data.mention
    if (data.message && !data.message.blank?)
      $('#messages-table').append '<div class="message">' +
        '<div class="message-user">' + data.username + ":" + '</div>' +
        '<div class="message-content">' + data.content + '</div>' + '</div>'
```

![](https://images.viblo.asia/d676e598-4fa2-4948-bed9-7cfbcd12df24.png)

Bob nhận được thông báo từ @mention của Alice

# Kết
Action Cable là chủ đề mới, vì vậy đôi khi Google cũng không phải là ý tưởng tồi để xem có gì mới.

Chúc các bạn may mắn bằng cách sử dụng Action Cable để tạo các ứng dụng real-time với Rails

--------------

**Nguồn bài viết: [Learn Enough Action Cable to Be Dangerous
](https://www.learnenough.com/action-cable-tutorial#sec-deploying_to_production)**