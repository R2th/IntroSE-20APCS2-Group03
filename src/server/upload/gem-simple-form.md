Simple Form giúp ta tạo ra form đơn giản và rất linh hoạt.

### Các bước cài đặt
Trong Gemfile, ta thêm dòng:

```
gem 'simple_form'
```

Vào command để thực hiện install:

```
bundle install
```

Và chạy lệnh:

```
rails generate simple_form:install
```

chỉ cần thực hiện các bước đơn giản trên là đã hoàn thành việc cài đặt và có thể sử dụng rồi.

### Sử dụng
Simple form bao gồm các thành phần để tạo ra một form html hoàn chỉnh. Và theo mặc định, nó sẽ chứa các lable, hints, errors và inputs và có thể tùy chỉnh cho phù hợp hơn với nhu cầu.

Để bắt đầu sử dụng gem, cần phải sử dụng helper mà gem cung cấp bằng cách khai báo thẻ `simple_form_for`

```
<%= simple_form_for @user do |f| %>
  <%= f.input :username %>
  <%= f.input :password %>
  <%= f.button :submit %>
<% end %>
```

Với đoạn code trên, ta đã có thể tạo ra một form đơn giản với ô nhập tên người dùng và mật khẩu. Và với dữ liệu người dùng không hợp lệ, lỗi mặc định sẽ được bắn ra sau khi bấm nút submit. 

Và để thân thiện hơn với người dùng, ta có thể tinh chỉnh form với các gợi ý hay kể cả là những thông báo lỗi.

```
<%= simple_form_for @user do |f| %>
  <%= f.input :username, label: 'Your username', error: 'Username is mandatory, please specify one' %>
  <%= f.input :password, hint: 'No special characters.' %>
  <%= f.input :email, placeholder: 'user@domain.com' %>
  <%= f.input :remember_me, inline_label: 'Yes, remember me' %>
  <%= f.button :submit %>
<% end %>
```
Ở đây, ta thấy có thể sử dụng với những trường dữ liệu là boolean bằng cách khai báo nhãn `inline_label` là đã có thể sử dụng được.

Trong trường hợp không muốn sử dụng thông báo lỗi đến người dùng hoặc những disable label hoặc hints ta có thể viết lại

```
<%= simple_form_for @user do |f| %>
  <%= f.input :username, label_html: { class: 'my_class' } %>
  <%= f.input :password, hint: false, error_html: { id: 'password_error'} %>
  <%= f.input :password_confirmation, label: false %>
  <%= f.button :submit %>
<% end %>
```
Với những tùy chọn như `hint: false`, `label: false`, `error_html: { id: 'password_error'}`, ta đã có thể disable đi chúng.

Và một số tùy chọn khá hữu ích đi kèm với form để yêu cầu dữ liệu người dùng nhập vào form dễ dàng hơn với option `input_html`

```
<%= simple_form_for @user do |f| %>
  <%= f.input :username, input_html: { class: 'special' } %>
  <%= f.input :password, input_html: { maxlength: 20 } %>
  <%= f.input :remember_me, input_html: { value: '1' } %>
  <%= f.button :submit %>
<% end %>
```

Trong trường hợp muốn sử dụng tùy chọn giống nhau (một class hoặc 1 style) cho các trường đầu vào, ta có thể sử dụng tùy chọn `defaults` trong `simple_form_for`

```
<%= simple_form_for @user, defaults: { input_html: { class: 'default_class' } } do |f| %>
  <%= f.input :username, input_html: { class: 'special' } %>
  <%= f.input :password, input_html: { maxlength: 20 } %>
  <%= f.input :remember_me, input_html: { value: '1' } %>
  <%= f.button :submit %>
<% end %>

```
Để tạo ra một wrapper bao quanh các ô nhập trong form, ta có thể sử dụng tùy chọn `wrapper_html`

```
<%= simple_form_for @user do |f| %>
  <%= f.input :username, wrapper_html: { class: 'username' } %>
  <%= f.input :password, wrapper_html: { id: 'password' } %>
  <%= f.input :remember_me, wrapper_html: { class: 'options' } %>
  <%= f.button :submit %>
<% end %>
```

Với những đầu vào dữ liệu là bắt buộc, ta sẽ thể hiện ở trên form bằng cách thêm dấu * vào lable của trường để người dùng nhận biết. Và với tùy chọn require, thì đầu vào này sẽ là bắt buộc và form chỉ được xác nhận khi người dùng nhập đủ dữ liệu. Và với những trường dữ liệu không bắt buộc, ta thể tắt đi tùy chọn này

```
<%= simple_form_for @user do |f| %>
  <%= f.input :name, required: false %>
  <%= f.input :username %>
  <%= f.input :password %>
  <%= f.button :submit %>
<% end %>
```
### Collections

Với những dữ liệu có tính lựa chọn, chẳng hạn như độ tuổi từ 0-100 chằng hạn, ta có thể sử dụng tùy chọn `collection` để tạo ra 1 form chọn cho người dùng
```
<%= simple_form_for @user do |f| %>
  <%= f.input :user %>
  <%= f.input :age, collection: 18..60 %>
  <%= f.button :submit %>
<% end %>
```
Và còn nhiều tùy chọn để bạn có thể tạo ra một form linh hoạt, bắt mắt và thân thiện với người dùng hơn với link tham khảo [Simple Form](https://github.com/plataformatec/simple_form)

Tài liệu tham khảo
[https://github.com/plataformatec/simple_form](https://github.com/plataformatec/simple_form)