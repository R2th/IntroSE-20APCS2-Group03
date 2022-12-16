Trong tương lai `form_tag` và `form_for` sẽ không được dùng nữa và chúng sẽ được thay thế bằng `form_with`. Nếu bạn muốn biết thêm về `form_with` thì bạn có thể xem qua [đề xuất của DHH](https://github.com/rails/rails/issues/25197), kiểm tra [pull request](https://github.com/rails/rails/pull/26976/files) trong đó nó đã được triển khai, kiểm tra [tài liệu API](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-form_with) và thử tạo một dự án và sử dụng nó.

Hoặc, tiếp tục đọc bài viết này trong đó tôi giải thích sự khác biệt giữa `form_tag`, `form_for` và `form_with` với các ví dụ.

# Một cú pháp dùng cho tất cả
Trước đây khi bạn muốn tạo một form, nhưng bạn không có một model cơ bản cho nó, thì bạn sẽ sử dụng `form_tag`.
```html.erb
<%= form_tag users_path do %>
  <%= text_field_tag :email %>
  <%= submit_tag %>
<% end %>
```
Khi bạn có một model cụ thể, thì bạn sẽ sử dụng `form_for`.
```html.erb
<%= form_for @user do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```
Như bạn có thể thấy, chúng ta sử dụng các form builder field helpers với `form_for` nhưng chúng ta không thực hiện điều đó với `form_tag`. Vì vậy, cú pháp cho mỗi form này là khác nhau.

Trường hợp này sẽ không xảy ra với `form_with`, bởi vì chúng ta luôn sử dụng form builder.

`form_with` không có model:
```html.erb
<%= form_with url: users_path do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```
`form_with` với model:
```html.erb
<%= form_with model: @user do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```
Khi truyền tham số `model` thì `scope` và `url` sẽ tự động được lấy từ nó. Điều này tương tự như `form_for`.
# Id và class tự động đã biến mất
`form_tag` và `form_for` tạo id tự động cho các trường trong biểu mẫu. Ngoài ra `form_for` cũng tạo id cho form.
```html.erb
<%= form_for User.new do |form| %>
  <%= form.text_field :email %>
<% end %>
```
Kết quả:
```html.erb
<form class="new_user" id="new_user" action="/users" ...>
  ...
  <input type="text" name="user[email]" id="user_email" />
</form>
```
Với `form_with`, bạn phải chỉ định tất cả các id và class của mình theo cách thủ công:
```html.erb
<%= form_with model: @user do |form| %>
  <%= form.text_field :name %>
  <%= form.text_field :email, id: :email, class: :email %>
<% end %>
```
Kết quả:
```html.erb
<form action="/users" ...>
  ...
  <input type="text" name="user[name]" />
  <input id="email" class="email" type="text" name="user[email]" />  </form>
```
Đừng quên gán id cho các trường trong biểu mẫu nếu bạn muốn làm cho label hoạt động.
```html.erb
<%= form_with model: @user do |form| %>
  <%= form.label :name %>
  <%= form.text_field :name, id: :user_name %>
<% end %>
```
> Cập nhật: `form_with` sẽ tự động tạo id từ Rails 5.2, do đó bạn không cần gán thủ công chúng nữa.
# Form id và class attributes không kèm theo nữa
Trước đây:
```html.erb
<%= form_for @user, html: { id: :custom_id, class: :custom_class } do |form| %>
<% end %>
```
Với `form_with`:
```html.erb
<%= form_with model: @user, id: :custom_id, class: :custom_class do |form| %>
<% end %>
```
# Form fields không phải tương ứng với các thuộc tính của model
Trước đây:
```html.erb
<%= form_for @user do |form| %>
  <%= form.text_field :email %>
  <%= check_box_tag :send_welcome_email %>
<% end %>
```
Với `form_with`:
```html.erb
<%= form_with model: @user, local: true do |form| %>
  <%= form.text_field :email %>
  <%= form.check_box :send_welcome_email %>
  <%= form.submit %>
<% end %>
```
Lưu ý rằng `send_welcome_email` sẽ được giới hạn cho `user` trong các tham số của `controller` trong ví dụ sau:
```ruby
params[:user][:send_welcome_email]
```
Do đó, tôi có thể vẫn sẽ sử dụng `check_box_tag` thay vì `form.check_box` nếu tôi cần.
# Tất cả form đều là remote theo mặc định
Sự thay đổi này là thú vị nhất đối với tôi. Tất cả các form được tạo bởi `form_with` sẽ được gửi theo yêu cầu XHR (Ajax) theo mặc định. Không cần khai báo `remote: true` như bạn phải làm với `form_tag` và `form_for`.

Tôi thích tính năng này, vì nó sẽ gửi một tin nhắn. Nhờ Turbolinks, (gần như) tất cả các yêu cầu GET là các yêu cầu XHR theo mặc định. Và nhờ có `form_with`, điều này cũng có thể trở thành hiện thực cho các biểu mẫu. Bạn chỉ cần thực hiện một chút công việc (tạo mẫu phản hồi JavaScript) và bạn sẽ không cần phải load lại trang.

Tuy nhiên, nếu bạn muốn tắt các remote forms thì bạn có thể thực hiện với `local: true`.
```html.erb
<%= form_with model: @user, local: true %>
<% end %>
```
# Hãy sử dụng form_with từ bây giờ
Tôi không trình bày mọi thứ trong bài viết này, nhưng nó đủ để giúp bạn bắt đầu với form_with vì vậy bạn không phải sử dụng form_tag và form_for nữa (dù sao chúng cũng sẽ bị xóa). Ngoài ra, hãy đọc [tài liệu cho form_with](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-form_with).

Nguồn: [Patrik Bóna](https://m.patrikonrails.com/rails-5-1s-form-with-vs-old-form-helpers-3a5f72a8c78a)