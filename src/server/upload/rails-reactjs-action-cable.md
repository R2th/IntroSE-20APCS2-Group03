Chao,
Xin chào mọi người. Hôm nay mình xin giới thiệu với các bạn cách sử dụng action cable với reactjs trong Rails.

Vô luôn nhá! :D

# Giới thiệu chung

   
   
   Ngắn gọn: 
   - Action cable hổ trợ những chức năng cần tích hợp thời gian thực trong ứng dụng Rails, ví dụ những chức năng về NOTIFICATION, COMMENT, CHAT BOX...
   - React là một công cụ hổ trợ quản lý, thao tác những phần phức tạp phía client. Còn overview vể reactjs, các bạn có thể tham khảo nhanh qua bằng một bài viết khác của mình ở [đây nhé](https://viblo.asia/p/khoi-dau-voi-reactjs-rails-3Q75w2velWb)

Trong link trên, mình đã hướng dẫn luôn phần install reactjs trong Rails, nên mình xin phép bỏ luôn phần install + config reactjs trong bài viết này nhé ;)

Mình cũng bỏ luôn phần nguyên lý hoạt động của reactjs nha, huynh đệ chịu khó vô link đó nắm xí overview cho nhanh :v: 



   
#    Ứng dụng rails cơ bản

Chúng ta sẽ chọn ứng dụng CHAT để làm demo nhé

Các bạn vào link [này](https://github.com/rails/actioncable-examples) để lấy ứng dụng trước

Ngoài việc tích hợp `gem "react-rails"` vào ứng dụng thì ta sử dụng thêm `gem "sprockets-es6"` 

Chúng ta check lại xem file `app/assets/javascripts/application.js` đã có đủ dư lày chưa nhá:

```
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require cable

//= require channels
//= require_tree .
```


## Install Action cable

Chúng ta sẽ sử dụng ES6 nên  sau khi bundle sẽ không có file
```
app/assets/javascripts/channels/index.coffee
```
vì đổi thành 

```
app/assets/javascripts/channels/index.es6
```

Chính trong file này, ta thêm đoạn code nhỏ: 

```
var App = {};
App.cable = Cable.createConsumer('ws://localhost:28080');
```

Ta xóa luôn file `app/assets/javascripts/channels/comments.coffee`

## Tạo component:  CommentList

Trong file `app/assets/javascripts/components/comments_list.js.jsx`, ta thêm đoạn code:

```
var CommentList = React.createClass({
  getInitialState(){
    let message = JSON.parse(this.props.message);
    return {message: message};
  },

  render() {
    let comments = this.state.message.comments.map((comment) => {
      return this.renderComment(comment);
    });

    return (
      <div>{comments}</div>
    );
  },

  renderComment(comment) {
    return (
      <article key={comment.id}>
        <h3>Comment by { comment.user.name }</h3>
        <p>{ comment.content }</p>
      </article>
    );
  }
});
```

Đây là component để hiển thị comments.

## Tạo message Json builder

Chúng ta sẽ thông qua component để khởi tạo dữ liệu. Trong file `app/views/messages/_message.json.jbuilder.` sẽ có đoạn code sau:

```
json.(message, :created_at, :updated_at, :title, :content, :id)
json.comments(message.comments) do |comment|
  json.extract! comment, :id, :content
  json.user do
    json.extract! comment.user, :id, :name
  end
end
```

Đoạn code trên sẽ đẩy dữ liệu dạng JSON vào component CommentList ở trên mình vừa mới tạo.



## Tạo trang html.erb để hiển thị dữ liệu từ component

Ta tạo file `app/views/comments/_new.html.erb` với đoạn code(form)

```
<%= form_for [message, Comment.new], remote: true do |form| %>
  <%= form.text_area :content, size: "100x20" %><br>
  <%= form.submit "Post comment" %>
<% end %>
```

Form này để tạo message, và ta sẽ sử dụng nó. 

Vì sẽ sử dụng form vừa tạo nên ta sẽ xóa dòng code sau trong `app/views/comments/create.js.erb`

```
$('#comments').append('<%=j render @comment %>');
```


Chúng ta cần phải hiển thị chi tiết message và render component để hiển thị các comments. Bổ sung thêm đoạn code sau vào file `app/views/messages/show.html.erb` trước `<%= render 'comments/comments', message: @message %>`

```
<%= react_component 'CommentList', message: render(partial: 'messages/message.json', locals: {message: @message}) %>
```

Túm lại, file show.html.erb sẽ như sau: 

```
<h1><%= @message.title %></h1>
<p><%= @message.content %></p>
<%= react_component 'CommentList', message: render(partial: 'messages/message.json', locals: {message: @message}) %>
<%= render 'comments/new', message: @message %>
```


Lưu ý rằng, cách chúng ta render CommentList sẽ dựa vào nội dùng trả về từ json builder mà chúng ta đã tạo.

## Cài đặt Subscription để lắng nghe Action Cable từ React component

Để lắng nghe các thay đổi ở component, ta cần cài đặt subscription từ Action Cable

Lúc này, CommentList component sẽ được thêm đoạn code sau: 

```
setupSubscription(){

  App.comments = App.cable.subscriptions.create("CommentsChannel", {
    message_id: this.state.message.id,

    connected: function () {
      setTimeout(() => this.perform('follow',
                                    { message_id: this.message_id}), 1000 );
    },

    received: function (data) {
      this.updateCommentList(data.comment);
    },

    updateCommentList: this.updateCommentList

    });
}
```


Chúng ta cần tạo thêm một chanel hổ trợ việc lắng nghe các events được gửi xuống từ client

```
app/channels/comments_channel.rb
```
Add đoạn code sau vào file mới tạo:


```
class CommentsChannel < ApplicationCable::Channel
  def follow(data)
    stop_all_streams
    stream_from "messages:#{data['message_id'].to_i}:comments"
  end

  def unfollow
    stop_all_streams
  end
end
```


Trong React component của chúng ta, sẽ sử dụng App.cable.subscriptions.create để tạo một subscription mới cho việc update, và thông qua channel chúng ta muốn lắng nghe. Nó sẽ chấp thuận các method sau để callback hooks.

- connected Subscription đã được kết nối thành công. Chúng ta sử dụng method perform để gọi tới hành động liên quan, và gửi dữ liệu tới method. perform('follow', {message_id: this.message_id}), 1000), gọi CommentsChannel#follow(data).
- received Chúng ta sẽ nhận thông báo dữ liệu mới từ Rails. Tới đây sẽ sử dụng action để cập nhật Component. Cần phải pass qua updateCommentList: this.updateCommentList, là một method của Component được gọi tới với dữ liệu gửi từ Rails


## Hoàn chỉnh Component



CommentList sẽ như này cho nhanh nè:

```
var CommentList = React.createClass({
  getInitialState(){
    let message = JSON.parse(this.props.message);
    return {message: message};
  },

  render() {
    let comments = this.state.message.comments.map((comment) => {
      return this.renderComment(comment);
    });

    return (
        <div>{comments}</div>
    );
  },

  renderComment(comment) {
    return (
        <article key={comment.id}>
          <h3>Comment by { comment.user.name } </h3>
          <p>{ comment.content }</p>
        </article>
    );
  },

  componentDidMount() {
    this.setupSubscription();
  },

  updateCommentList(comment) {
    let message = JSON.parse(comment);
    this.setState({message: message});
  },

  setupSubscription() {

    App.comments = App.cable.subscriptions.create("CommentsChannel", {
      message_id: this.state.message.id,

      connected: function () {
        // Timeout here is needed to make sure Subscription
        // is setup properly, before we do any actions.
        setTimeout(() => this.perform('follow',
                                      {message_id: this.message_id}),
                                      1000);
      },

      received: function(data) {
        this.updateCommentList(data.comment);
      },

      updateCommentList: this.updateCommentList
    });
  }
});
```



## Broadcast message khi comment mới được tạo


Phần sau cùng là cập nhật mới broadcast sang mesage sang listeners rồi đi tới chanel.

Trong file `app/jobs/message_relay_job.rb`, ta thêm:

```
class MessageRelayJob < ApplicationJob
  def perform(message)
    comment =  MessagesController.render(partial: 'messages/message',
                                         locals: {message: message})
    ActionCable.server.broadcast "messages:#{message.id}:comments",
                                 comment: comment
  end
end
```

sau đó sẽ gọi từ model Comment như sau:


```
# app/model/comment.rb

[...]
after_commit {MessageRelayJob.perform_later(self.message)}
[...]
```

Chúng ta cũng cần phải xóa refernece từ CommentRelayJob từ model Comment, từ after_commit sẽ gọi tới MessageRelayJob


Rồi, xong xuôi, chúc các bạn thành công nhé. Tài liệu mình tham khảo từ [đây](https://blog.bigbinary.com/2015/07/19/using-reactjs-with-rails-actioncable.html). Hy vọng mọi người sẽ thành công ;)

Xin chào và hẹn gặp lại =))