# Giới thiệu
Trong ứng dụng chat cũng như mạng xã hội thường có chức năng mention (@) để notify hoặc thông báo đến người đó là bạn muốn mention đến. Ví dụ khi chat, bạn muốn mention  đến userA sẽ là "@userA Good morning", .... 
Hôm này mình sẽ làm demo về chức năng mention trong Rails sử dụng actioncable. 


# Implement
Có rất nhiều bài viết về actioncable trong chat, ... Bây giờ mình sẽ không giới thiệu chi tiết về actioncable nữa. Mình sẽ hướng dẫn luôn về cách làm chức năng mention luôn. 

### Subscribe channel
Đầu tiên,  phải subscribe vào channel như sau. Khi có broadcast đến channel đó, bạn sẽ nhận được thông tin gửi đến.

```
app/channels/room_channel.rb
 class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_user_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```

### Làm mention như thế nào?
Ý tưởng là bạn cần dùng regex để lấy được các từ mà người ta mention, tức là từ ngay sau @.
Vào rails console để thử nhé:

```
$ rails console
>>  NAME_REGEX = /@(\w+)/
>> content = "This mentions @alice and @bob, and also @nonexistent"

>> content = content.scan(NAME_REGEX)
=> [["alice"], ["bob"], ["nonexistent"]]

>> mention_names = content.flatten
=> ["alice", "bob", "nonexistent"]

// tìm user có tên trong content
>> mention_names.map do |username|
?>   User.find_by(username: username)
>> end.compact
=> [#<User id: 1, username: "alice"...>, #<User id: 2, username: "bob"]
```
Đến đây là mình có thể tạo hàm mention được rồi. 
```
app/models/message.rb
class Message < ApplicationRecord
NAME_REGEX = /@(\w+)/

  belongs_to :user
  validates :content, presence: true
    
  // trả về danh sách users đã mention trong message content
  def mentions
    content.scan(NAME_REGEX).flatten.map do |username|
      User.find_by(username: username)
    end.compact
  end
end
```

### Thực hiện broadcast và nhận kết quả
Sau khi tạo message thành công, mình sẽ broadcast tới channel của các users trong danh sách đã mention.
```
app/controllers/messages_controller.rb
 class MessagesController < ApplicationController
  .
  .
  .
  def create
    message = current_user.messages.build(message_params)
    if message.save
      message.mentions.each do |user|
        ActionCable.server.broadcast "room_channel_user_#{user.id}", content: "#{message.user.name} đã mention bạn."
      end
    end
  end
  .
  .
  .
end
```

Khi broadcast được thực hiện, user trong danh sách được mention đó sẽ nhận được data gửi về channel RoomChannel của họ. 
```
app/assets/javascripts/channels/room.coffee
 App.room = App.cable.subscriptions.create "RoomChannel",
    connected: ->
      # Called when the subscription is ready for use on the server
  
    disconnected: ->
      # Called when the subscription has been terminated by the server
  
    received: (data) ->
      alert(data.content);
```
Khi có người mention bạn, bạn sẽ nhận được alert lên là "User đã mention bạn."
Đến đây, bạn sẽ hoàn thành chức năng mention rồi. 

References:

https://www.learnenough.com/action-cable-tutorial

https://viblo.asia/p/using-reactjs-with-rails-action-cable-MJykjWZYvPB

https://viblo.asia/search?q=actioncable