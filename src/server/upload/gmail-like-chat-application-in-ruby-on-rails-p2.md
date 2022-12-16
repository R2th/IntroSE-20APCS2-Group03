Trong phần trước chúng ta đã tìm hiểu các bước đầu tiên để thêm tính năng nhắn tin vào một ứng dụng rails đã có sẵn. Bài viết này là các bước tiếp theo để hoàn thành tính năng.

### 4. Creating Controllers

Để xử lý các yêu cầu trong file js chúng ta cần tạo các controller. Tạo tự động controller conversations bằng lệnh sau:

> $ rails g controller conversations

Controller conversation chỉ có 2 action là create và show:

```ruby
class ConversationsController < ApplicationController
  before_filter :authenticate_user!

  layout false

  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end

    render json: { conversation_id: @conversation.id }
  end

  def show
    @conversation = Conversation.find(params[:id])
    @reciever = interlocutor(@conversation)
    @messages = @conversation.messages
    @message = Message.new
  end

  private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end
end
```

### 5. Installing private_pub

Nó sẽ tốt hơn nếu chúng ta cài đặt thêm private_pub, chúng ta sẽ được sử dụng các chức năng của gem. Thêm gem vào Gemfile và chạy bundle để cài đặt nó:

> gem 'private_pub'
>
> gem 'thin'

Chạy lệnh sau để sinh cấu hình cho private_pub

> rails g private_pub:install

Chúng ta bắt đầu Rack  server bằng lệnh sau:

> rackup private_pub.ru -s thin -E production

Bước cuối cùng là thêm require private_pub vào file application.js

> //= require private_pub

Chúng ta có thể tạo view đầu tiên sử dụng chức năng private_pub:

`views/conversations/show.html.erb`

```ruby
<div class="chatboxhead">
  <div class="chatboxtitle">
    <i class="fa fa-comments"></i>

    <h1><%= @reciever.name %> </h1>
  </div>
  <div class="chatboxoptions">
    <%= link_to "<i class='fa  fa-minus'></i> ".html_safe, "#", class: "toggleChatBox", "data-cid" => @conversation.id %>
      
    <%= link_to "<i class='fa  fa-times'></i> ".html_safe, "#", class: "closeChat", "data-cid" => @conversation.id %>
  </div>
  <br clear="all"/>
</div>
<div class="chatboxcontent">
  <% if @messages.any? %>
      <%= render @messages %>
  <% end %>
</div>
<div class="chatboxinput">
  <%= form_for([@conversation, @message], :remote => true, :html => {id: "conversation_form_#{@conversation.id}"}) do |f| %>
      <%= f.text_area :body, class: "chatboxtextarea", "data-cid" => @conversation.id %>
  <% end %>
</div>

<%= subscribe_to conversation_path(@conversation) %>
```

### 6. Message controller

Chúng ta sẽ tạo controller cho message:

> rails g controller messages

`messages_controller.rb`

```ruby
class MessagesController < ApplicationController
  before_filter :authenticate_user!

  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.messages.build(message_params)
    @message.user_id = current_user.id
    @message.save!

    @path = conversation_path(@conversation)
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
```

Controller message chỉ có một hành động create. Chúng ta sẽ lưu lại đường dẫn của conversation vào biến @path. Nó sẽ được dùng để đẩy cac thông báo lên view.

Hành động create sẽ render ra một javascript template. Chúng ta sẽ tạo nó trong folder messages:

`create.js.erb`

```ruby
<% publish_to @path do %>
    var id = "<%= @conversation.id %>";
    var chatbox = $("#chatbox_" + id + " .chatboxcontent");
    var sender_id = "<%= @message.user.id %>";
    var reciever_id = $('meta[name=user-id]').attr("content");

    chatbox.append("<%= j render( partial: @message ) %>");
    chatbox.scrollTop(chatbox[0].scrollHeight);

    if(sender_id != reciever_id){
    	chatBox.chatWith(id);
        chatbox.children().last().removeClass("self").addClass("other");
    	chatbox.scrollTop(chatbox[0].scrollHeight);
        chatBox.notify();
    }
<% end %>
```

Tiếp theo cần tạo file partial message trong folder messages:

`_message.html.erb`

```ruby
<li class="<%=  self_or_other(message) %>">
  <div class="avatar">
    <img src="http://placehold.it/50x50" />
  </div>
  <div class="chatboxmessagecontent">
    <p><%= message.body %></p>
    <time datetime="<%= message.created_at %>" title="<%= message.created_at.strftime("%d %b  %Y at %I:%M%p") %>">
      <%= message_interlocutor(message).name %> • <%= message.created_at.strftime("%H:%M %p") %>
    </time>
  </div>
</li>
```

Chúng ta cũng cần định nghĩa 2 method self_or_other và message_interlocutor với tham số đưa vào là message. Chúng ta sẽ viết nó trong helper:

`messages_helper.rb`

```ruby
module MessagesHelper
  def self_or_other(message)
    message.user == current_user ? "self" : "other"
  end

  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
  end
end
```

Cuối cùng chúng ta cần tạo đường dẫn cho các controller:

`routes.rb`

```ruby
Rails.application.routes.draw do

  devise_for :users

  authenticated :user do
    root 'users#index'
  end

  unauthenticated :user do
    devise_scope :user do
      get "/" => "devise/sessions#new"
    end
  end

  resources :conversations do
    resources :messages
  end
end
```

Tạo file chat.css trong thư mục stylesheets và paste nội dung của chat.css vào. Sau đó thêm một số font vào trong application.html:

`application.html`

```ruby
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta content='<%= user_signed_in? ? current_user.id : "" %>' name='user-id'/>

  <title>Chatty</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= stylesheet_link_tag '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>

  <!-- shiv here -->

</head>

<body>

<%= render 'layouts/nav' %>

<div class="container">
  <!-- flash messages here -->
  <%= yield %>
</div>
<audio id="chatAudio"><source src="/sounds/notification.mp3" type="audio/mpeg"></audio>
</body>

</html>
```

Bạn có thể thay đổi css cho đẹp hơn tùy theo ý mình.

Kết Luận:

Trên đây là các bước tiếp theo để  hoàn thiện một ứng dụng chat với ruby on rails. Cảm  ơn bạn đã theo dõi bài viết.

Tham khảo:

http://josephndungu.com/tutorials/gmail-like-chat-application-in-ruby-on-rails

https://www.sitepoint.com/create-a-chat-app-with-rails-5-actioncable-and-devise/