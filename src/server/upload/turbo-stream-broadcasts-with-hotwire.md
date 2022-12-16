![](https://images.viblo.asia/4b75ff97-c845-48b6-af4e-a1e93e00f920.png)
## Introduction
Như ở bài [trước](https://viblo.asia/p/remotely-loading-tabbed-content-with-hotwire-bJzKmoW6l9N) chúng ta đã biết, Hotwire là công cụ dành cho việc phát triển web, nó cung cấp cho chúng ta một framework giúp developer không cần (hoặc ít) phải viết các đoạn code javascript bằng cách gửi HTML thay vì JSON, trong khi vẫn đảm bảo tốc độ load ứng dụng nhanh chóng. Ở bài viết này, chúng ta sẽ cùng thực hành một chức năng thú vị khác nữa của Hotwire, đó là **Turbo Stream Broadcasts**.

Thời gian thực (Realtime) giờ hầu như đều phổ biến ở tất cả các website, khi nhắc đến tính năng realtime ở 1 Rails app (vd Notification, Chat, Post...) chúng ta sẽ nghĩ ngay đến Action Cable, một tính năng khá mạnh của Rails giúp developer có thể implement WebSockets theo chuẩn thiết kể của Rails. Nếu như việc khởi tạo các Channel, Subscriber (và đoạn logic Javascript phía client để nhận và thêm content vào DOM tương ứng) khiến chúng ta thấy phiền phức và mất thời gian, chúng ta hoàn toàn có thể thử áp dụng tính năng Turbo Stream Broadcasts của Hotwire.

## Implement
Ý tưởng sẽ là một list danh sách các user, việc thêm mới user (ở tab khác) sẽ được phản ánh realtime ở màn list này.

### Setup app
Tạo app migrate các kiểu:
```
rails new hotwire_demo
rails g scaffold User name:string
rails db:migrate
```
### Install Hotwire
Để thêm hotwire vào app, chúng ta có thể add `hotwire-rails` vào Gemfile rồi bundle.

Sau khi add hotwire, chúng ta run `rails hotwire:install` để install hotwire và mọi thứ đã sẵn sàng.
### Implement logic
Ở controller user, để thuận tiện cho việc khởi tạo user, chúng ta sẽ ngăn việc redirect đến màn list mặc định, thay vào đó là màn tạo mới:
```ruby
def create
  @user = User.new(user_params)

  respond_to do |format|
    if @user.save
      format.html { redirect_to new_user_path }
      format.json { render :show, status: :created, location: @user }
    else
      format.html { render :new, status: :unprocessable_entity }
      format.json { render json: @user.errors, status: :unprocessable_entity }
    end
  end
end
```

Ở `users/index.html.erb`:
```html
<p id="notice"><%= notice %></p>

<h1>Users List: (<%= Time.zone.now %>)</h1>

<%= turbo_stream_from :users %>
<div id="list-user">
  <%= render @users %>
</div>
```
chúng ta sử dụng method `turbo_stream_from` để thực hiện việc subcribe đến channel có tên là "users", và set id cho thẻ div để tiện cho việc chỉ định thành phần DOM mà chúng ta muốn append data mới từ Channel users .

Tiếp theo là tạo partial `users/user.html.erb`:
```
touch app/views/users/_user.html.erb
```
```html
<div style="background: lightgrey; width: 300px; padding: 10px;">
  <%= user.name %>
</div>
<br>
```
Sau khi đã xong quá trình subcribe, tiếp đến là bước broadcast, chúng ta sẽ thực hiện broadcast ngay sau khi tạo user thành công, trong model `user.rb`:
```ruby
class User < ApplicationRecord
  after_create_commit { broadcast_append_to(:users, target: "list-user") }
end
```
Ở đây chúng ta sử dụng method broadcast_append_to với tham số users và target "list-user", nhằm mục đích broad cast Channel `users` và data sau sẽ được append ở element có id là `list-user`.

Sau đó chúng ta sẽ có kết quả thu được:
![](https://images.viblo.asia/4de24891-f78e-4a60-8319-c00e5135b58a.gif)

Check log quá trình khởi tạo user vừa rồi chúng ta sẽ thấy  cả quá trình boardcast:
```
Started POST "/users" for ::1 at 2021-09-20 20:51:26 +0700
Processing by UsersController#create as TURBO_STREAM
  Parameters: {"authenticity_token"=>"[FILTERED]", "user"=>{"name"=>"H"}, "commit"=>"Create User"}
  TRANSACTION (0.2ms)  begin transaction
  ↳ app/controllers/users_controller.rb:27:in `block in create'
  User Create (0.8ms)  INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)  [["name", "H"], ["created_at", "2021-09-20 13:51:26.322698"], ["updated_at", "2021-09-20 13:51:26.322698"]]
  ↳ app/controllers/users_controller.rb:27:in `block in create'
  TRANSACTION (13.3ms)  commit transaction
  ↳ app/controllers/users_controller.rb:27:in `block in create'
  Rendered users/_user.html.erb (Duration: 0.1ms | Allocations: 41)
[ActionCable] Broadcasting to users: "<turbo-stream action=\"append\" target=\"list-user\"><template><div style=\"background: lightgrey; width: 300px; padding: 10px;\">\n  H\n</div>\n<br>\n</template></turbo-stream>"
Redirected to http://localhost:3000/users/new
Completed 302 Found in 23ms (ActiveRecord: 14.2ms | Allocations: 4969)


Turbo::StreamsChannel transmitting "<turbo-stream action=\"append\" target=\"list-user\"><template><div style=\"background: lightgrey; width: 300px; padding: 10px;\">\n  H\n</div>\n<br>\n</template></turbo-stream>" (via streamed from users)
Started GET "/users/new" for ::1 at 2021-09-20 20:51:26 +0700
Processing by UsersController#new as TURBO_STREAM
  Rendering layout layouts/application.html.erb
  Rendering users/new.html.erb within layouts/application
  Rendered users/_form.html.erb (Duration: 1.1ms | Allocations: 608)
  Rendered users/new.html.erb within layouts/application (Duration: 1.3ms | Allocations: 718)
[Webpacker] Everything's up-to-date. Nothing to do
  Rendered layout layouts/application.html.erb (Duration: 4.7ms | Allocations: 3886)
Completed 200 OK in 6ms (Views: 5.3ms | ActiveRecord: 0.0ms | Allocations: 4169)


Finished "/cable/" [WebSocket] for ::1 at 2021-09-20 20:53:28 +0700
Turbo::StreamsChannel stopped streaming from users
```
## Summary
Hotwire cung cấp cho developer 1 framework khá mạnh mẽ giúp cải thiện performance ứng dụng và trải nghiệm người dùng với chi phí tối thiểu. Bài viết nhằm chia sẻ và demo cách implement 1 trong những tính năng mạnh mẽ của Hotwire là **Turbo Stream Broadcasts** trong rails app, cảm ơn bạn đã dành thời gian đọc.

Tài liệu tham khảo:
* https://turbo.hotwired.dev/handbook/streams
* https://hotwired.dev/