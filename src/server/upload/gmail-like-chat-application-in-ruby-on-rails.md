Chúng ta sẽ đi tìm hiểu cách thêm tính năng nhắn tin vào một ứng dụng rails đã có sẵn. Dưới đây là màn hình của một ứng dụng rails đơn giản mà sử dụng Devise để xác thực người dùng. Trên trang chủ hiển thị các user khác ngoài user đang đăng nhập

![a1.png](/uploads/29e4a232-a288-4bfe-b0a0-4cd8132a33ab.png)

Để các user có chat với những người dùng khác. Chúng ta sẽ thiết lập logic cho ứng dụng đơn giản. Một `User` có nhiều `conversations` và một `conversation` có nhiều  `messages`. Sau đây là biều đồ mối quan hệ

![a2.png](/uploads/39a07ba3-5e9f-44a7-be2a-2f8f09e065bd.png)

### 1. CONVERSATION MODEL

Chúng ta sẽ đi tạo modle `Conversation`. Một conversation có chứa `sender_id` và `recipient_id`, chúng là instances của `User`. sender_id sẽ chứa id của user bắt đầu cuộc hội thoại và recipient_id sẽ chứa id của user khác. Bạn có thế sử dụng lệnh sau để tạo model một cách tự động:

> $ rails g model Conversation sender_id:integer recipient_id:integer

Chúng ta nên add thêm index cho sender_id và recipient_id. File model Conversation sẽ có dạng;

```ruby
class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :sender_id
      t.integer :recipient_id

      t.timestamps
    end

    add_index :conversations, :sender_id
    add_index :conversations, :recipient_id
  end
end
```

Bây giờ trong model Conversation không có cột user_id, vì thế chúng ta cần chỉnh sửa lại model User. Cần thêm vào foreign_key như sau:

```ruby
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :conversations, foreign_key: :sender_id
end
```

Tiếp theo cần phải sửa trong model Conversation. Một conversation sẽ belongs_to cả sender và recipient. cả hai là instances của user.

```ruby
class Conversation < ActiveRecord::Base
  belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
  belongs_to :recipient, foreign_key: :recipient_id, class_name: 'User'

  has_many :messages, dependent: :destroy

  validates_uniqueness_of :sender_id, scope: :recipient_id

  scope :involving, -> (user) do
    where("conversations.sender_id =? OR conversations.recipient_id =?",user.id,user.id)
  end

  scope :between, -> (sender_id,recipient_id) do
    where("(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
  end
end
```

Trong model Conversation ở trên có thiết lập conversation có nhiều messages. Chúng ta cũng cần validate uniqueness cho sender_id và bao gồm cả recipient_id. Điều này đảm bảo rằng sender_id và recipient_id là luôn luôn duy nhất. ví dụ: một conversation với (sender_id: 1, recipient_id: 2) và cái khác với (sender_id: 2, and recipient_id: 1) sẽ không thể xảy ra một các cuộc hội thoại giống nhau giữa các user giống nhau.

Scope `involving` sẽ giúp ta lấy tất cả các conversations của user hiện thời.
Scope `between` sẽ giúp ta kiểm tra nếu conversation tồn tại giữa bất kỳ 2 user trước khi tạo conversation.

### 2. Message Model

Chúng ta cần tạo thêm model message. Sử dụng lệnh sau để  tạo model message tự động:

> $ rails g model Message body:text conversation:references user:references

sau đó, chạy lệnh sau để tạo database:

> $ rake db:migrate

Model message có 3 thuộc tính `body`, `conversation_id`, `user_id`. Để  chúng không nil thì chúng ta cần thêm vào validate luôn tồn tại cho 3 thuộc tính:

```ruby
class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :user

  validates_presence_of :body, :conversation_id, :user_id
end
```

### 3. Adding the message button

Ở trên chúng ta đã tạo xong model. Tiếp  theo, trên trang chủ chúng ta sẽ thêm vào một nút gửi tin nhắn bên cạnh tên của mỗi user. Mỗi nút sẽ lưu trữ 2 dữ liệu id của người  dùng hiện thời và id của người nhận khác. Khi user  click vào button chúng ta sễ gửi một yêu cầu không đồng bộ đến ứng dụng với 2 params đó. Nếu cuộc trò chuyện tồn tại, ta sẽ trả về  id của conversation ngay, nếu không thì chúng ta sẽ tạo một conversation mới và trả về id của conversation vừa tạo.

```ruby
<% @users.each_with_index do |user, index| %>
    <tr>
      <td><%= index +=1 %></td>
      <td><%= user.name %></td>
      <td>
        <%= link_to "Send Message", "#", class: "btn btn-success btn-xs start-conversation",
                    "data-sid" => current_user.id, "data-rip" => user.id %>
      </td>
    </tr>
<% end %>
```

Ở trên thuộc tính `data-sid` sẽ lưu lại id của user hiện thời và `data-rip` lưu id của user nhận meseage. Chúng ta sẽ gửi các giá trị thông qua ajax đến server để tạo conversation nếu cần thiết. Hãy tạo file `chat.js` trong folder javascripts của bạn và thêm nội dụng của `chat.js`. Đây là file chứa tất cả các hàm chúng ta sẽ cần khi tạo chatbox. Bạn cần thêm cả require đến file vừa tạo:

>//= require chat

`user.js`

```JavaScript
var ready = function () {

    /**
     * When the send message link on our home page is clicked
     * send an ajax request to our rails app with the sender_id and
     * recipient_id
     */

    $('.start-conversation').click(function (e) {
        e.preventDefault();

        var sender_id = $(this).data('sid');
        var recipient_id = $(this).data('rip');

        $.post("/conversations", { sender_id: sender_id, recipient_id: recipient_id }, function (data) {
            chatBox.chatWith(data.conversation_id);
        });
    });

    /**
     * Used to minimize the chatbox
     */

    $(document).on('click', '.toggleChatBox', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });

    /**
     * Used to close the chatbox
     */

    $(document).on('click', '.closeChat', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.close(id);
    });

    /**
     * Listen on keypress' in our chat textarea and call the
     * chatInputKey in chat.js for inspection
     */

    $(document).on('keydown', '.chatboxtextarea', function (event) {

        var id = $(this).data('cid');
        chatBox.checkInputKey(event, $(this), id);
    });

    /**
     * When a conversation link is clicked show up the respective
     * conversation chatbox
     */

    $('a.conversation').click(function (e) {
        e.preventDefault();

        var conversation_id = $(this).data('cid');
        chatBox.chatWith(conversation_id);
    });

}

$(document).ready(ready);
$(document).on("page:load", ready);
```

Trong `users.js` chúng ta sẽ lắng nghe các sự kiện trong trang home và gọi các phương thức tương ứng trong file `chat.js`

Kết Luận:

Trên đây là các bước đầu tiên để  tạo một ứng dụng chat với ruby on rails. Bài viết tiếp theo sẽ là các bước để hoàn thành tính năng chat này. Cảm  ơn bạn đã theo dõi bài viết.

Tham khảo:

http://josephndungu.com/tutorials/gmail-like-chat-application-in-ruby-on-rails

https://www.sitepoint.com/create-a-chat-app-with-rails-5-actioncable-and-devise/