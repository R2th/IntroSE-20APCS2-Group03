Trong các phiên bản từ Rails 5.1 trở về trước, `form_tag` và `form_for` chắc hẳn đã rất quen thuộc với nhiều người. Nhưng chúng không còn được sử dụng nhiều và sẽ dần bị thay thế bởi `form_with` (Rails 5.1) trong tương lai.<br>
Dưới đây, là một số sự khác nhau cơ bản giữa `form_with` với `form_tag` và `form_for` được minh họa qua các ví dụ cụ thể.
### 1. Một cú pháp cho tất cả
Khi muốn tạo `form` mà không có đối tượng, chúng ta sử dụng `form_tag` <br>
```rails
<%= form_tag users_path do %>
  <%= text_field_tag :email %>
  <%= submit_tag %>
<% end %>
```
Còn khi có một đối tượng, dùng `form_for`. Nó thường được sử dụng  khi tạo mới hay cập nhất một đối tượng.<br>
```rails
<%= form_for @user do |f| %>
  <%= f.text_field :email %>
  <%= f.submit %>
<% end %>
```
Ta thấy rằng, cú pháp của hai `form` trên có sự khác nhau. Bởi do `form_for` sử dụng `form builder field helper` để tạo `form`, còn `form_tag` thì không.<br>
Nhưng với `form_with` thì không như vậy, chúng ta sử dụng `form builder` cho tất cả các `field` mọi lúc. Nó tạo `form` khi có đối tượng hay không có đều được, điều này giúp thuận tiện hơn và tránh sai cú pháp.<br>
Khi không có đối tương, `form_with` <br>
```rails
<%= form_with url: users_path do |f| %>
  <%= f.text_field :email %>
  <%= f.submit %>
<% end %>
```
Và có một đối tượng, `form_with`<br>
```rails
<%= form_with model: @user do |f| %>
  <%= f.text_field :email %>
  <%= f.submit %>
<% end %>
```
Khi thêm các đối số cho đối tượng, các `scope` và `url` sẽ điều hướng từ đó, lúc này nó hoạt động tương tự `form_for`.
### 2. Không tự động thêm id và class
`form_tag` và `form_for` tự động khởi tạo `id` và `class` cho các trường của `form`. `form_for` còn thêm cả cho thẻ form.
```rails
<%= form_for User.new do |f| %>
  <%= f.text_field :email %>
<% end %>
```
sẽ tạo ra<br>
```rails
<form class="new_user" id="new_user" action="/users" ...>
  ...
  <input type="text" name="user[email]" id="user_email" />
</form>
```
Với `form_with` thì phải tự thêm `id` và `class` bằng tay
```rails
<%= form_with model: @user do |f| %>
  <%= f.text_field :name %>
  <%= f.text_field :email, id: :email, class: :email %>
<% end %>
```
tạo ra<br>
```rails
<form action="/users" ...>
  ...
  <input type="text" name="user[name]" />
  <input id="email" class="email" type="text" name="user[email]" />
</form>
```
Nếu muốn các `label` hoạt động, phải thêm `id` cho các trường của `form`.
```rails
<%= form_with model: @user do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name, id: :user_name %>
<% end %>
```
***Chú ý:*** Từ Rails 5.2 `form_with` cũng sẽ tự động tạo `id`, do đó không cần phải chỉ định chúng theo cách thủ công nữa.
### 3. Các thuộc tính id và class của form_with không cần đóng gói nữa.
Trước đây thường viết
```rails
<%= form_for @user, html: { id: :custom_id, class: :custom_class } do |f| %>
  ...
<% end %>
```
Còn giờ chỉ đơn giản
```rails
<%= form_with model: @user, id: :custom_id, class: :custom_class do |f| %>
  ...
<% end %>
```
### 4. Các form fields không cần phải tương ứng với các thuộc tính của đối tượng
Lúc trước
```rails
<%= form_for @user do |f| %>
  <%= f.text_field :email %>
  <%= check_box_tag :send_welcome_email %>
<% end %>
```
Bây giờ
```rails
<%= form_with model: @user, local: true do |f| %>
  <%= f.text_field :email %>
  <%= f.check_box :send_welcome_email %>
  <%= f.submit %>
<% end %>
```
***Lưu ý:*** `send_welcome_email` sẽ được gửi tới controller dưới dạng `params[:user][:send_welcome_email]`. Nên vẫn có thể sử dụng cả 2 cách `check_box_tag` hoặc `f.check_box`.
### 5. Tất cả các form đều mặc định ở chế độ remote
Đây là sự thay đổi thú vị. Mọi `form` được tạo bởi `form_with` sẽ được submit mặc định bởi `request XHR (AJAX)`, không cần thêm tùy chọn `remote: true` như ở `form_tag` hay `form_for`. Chỉ cần làm thêm một chút công việc là tạo một `JavaScript response template` để nó hoạt động.<br>
Tuy nhiên, nếu không muốn sử dụng `remote: true` cho form thì có thể sử dụng `local: true`
```rails
<%= form_with model: @user, local: true %>
  ...
<% end %>
```
### 6. Tổng kết
Bên trên chỉ là một vài điểm khác biệt của `form_with`, `form_tag` và `form_for`. Nhưng nó vẫn cho thấy những thuận lợi nhất định khi sử dụng `form_with` so với các phương pháp cũ.<br>
***Tóm tắt***<br>
| **form_tag** | **form_for** | **form_with** |
| -------- | -------- | -------- |
| - Tạo form không có đối tượng. | - Tạo form có đối tượng.<br>- Thường dùng khi tạo mới hay update một đối tượng. | - Tạo form có đối tượng hay không đều được.<br>- Thuận tiện, tránh sai cú pháp. |
| - Không sử dụng `form builder field helper`. | - Sử dụng `form builder field helper`.| - Sử dụng `form builder` cho tất cả các field. |
| - Tự động thêm `id`, `class` cho các `form field`. | - Tự động thêm `id`, `class` cho cả thẻ `form` và các `form field`. | - Không tự động thêm `id`, `class` cho thẻ `form` và `form field`.<br>--> Tự thêm bằng tay.<br>- Từ Rails 5.2 có tự động thêm id cho form. |
| - Các thuộc tính `id`, `class` cần đóng gói. | - Các thuộc tính `id`, `class` cần được đóng gói. | - `Id` và `class` không cần đóng gói nữa.<br>- Các `form field` không cần phải tương ứng với các thuộc tính của model. |
| - Không mặc định chế độ `remote`. | - Không mặc định chế độ `remote`. | - Mặc định chế độ `remote`.|

Bài viết trên có tham khảo [bài viết](https://m.patrikonrails.com/rails-5-1s-form-with-vs-old-form-helpers-3a5f72a8c78a).