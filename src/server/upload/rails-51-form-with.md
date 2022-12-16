`form_tag` và `form_for` đã "hơi cũ" (soft deprecated) và chúng sẽ được thay thế bởi form_with trong tương lai. Nếu bạn muốn biết thêm về `form_with`, bạn có thể check thông tin về nó tại issue [#25197]( https://github.com/rails/rails/issues/25197) này, kiểm tra pull request implement helper này, và thử với một vài test project.

Ở bài viết này, mình sẽ giới thiệu sự khác nhau giữa 3 loại helper trên với một vài ví dụ cụ thể.

### One syntax to rule them all

Trước kia, khi bạn muốn tạo một form, nhưng bạn lại không có model nào cụ thể, bạn có thể dùng `form_tag`

```html
<%= form_tag users_path do %>
  <%= text_field_tag :email %>
  <%= submit_tag %>
<% end %>
```

Khi bạn taọ một form đại diện cho việc tạo mới hay update một model, bạn dùng `form_for`

```html
<%= form_for @user do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```

Như bạn có thể thấy, chúng ta có thể dùng các builder field helper để tạo ra các trường trong form nhưng chúng ta ko thể dùng nó với `form_tag`. Vì vậy cú pháp của hai kiểu viết form (cho model và không cho model) này là khác nhau.

Đối với `form_with` thì lại khác, vì chúng ra sử dụng form builder hầu hết trong ứng dụng Rails app của mình, nên việc sử dụng form_with là rất tiện lợi và tránh được sai cú pháp đối với hai dạng build form.

`form_with` khi không có model:

```html
<%= form_with url: users_path do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```

`form_with` khi có model:

```html
<%= form_with model: @user do |form| %>
  <%= form.text_field :email %>
  <%= form.submit %>
<% end %>
```

Khi bạn truyền vào tham số model thì scope và url được tự động sinh ra từ object truyền vào đó. Điều này thì tương tự với `form_for`

### Automatic ids and classes are gone

`form_tag` và `form_for` tự động sinh ra id cho các field ở trong form. `form_for` làm vậy khi chúng ta chỉ cần khai báo:

```html
<%= form_for User.new do |form| %>
  <%= form.text_field :email %>
<% end %>
```

Nó sẽ tự sinh ra

```html
<form class="new_user" id="new_user" action="/users" ...>
  ...
  <input type="text" name="user[email]" id="user_email" />
</form>
```

Ở Rails 5.1 thì đối với `form_with`, bạn phải tự định nghĩa ra `id` và `class`:

```html
<%= form_with model: @user do |form| %>
  <%= form.text_field :name %>
  <%= form.text_field :email, id: :email, class: :email %>
<% end %>
```

Sẽ sinh ra:

```html
<form action="/users" ...>
  ...
  <input type="text" name="user[name]" />
  <input id="email" class="email" type="text" name="user[email]" />  
</form>
```

Đừng quên định nghĩa `id` cho form fields nếu bạn muốn các labels hoạt động.

```html
<%= form_with model: @user do |form| %>
  <%= form.label :name %>
  <%= form.text_field :name, id: :user_name %>
<% end %>
```

Từ Rails 5.2 thì các id sẽ được tự động sinh ra, vì thế không phải tự định nghĩa bằng tay nữa

### Form id and class attributes aren’t wrapped anymore

Trước kia, khi muốn định nghĩa `class` và `id` cho thẻ form, bạn phải gói chúng trong tham số `html`:

```html
<%= form_for @user, html: { id: :custom_id, class: :custom_class } do |form| %>
<% end %>
```

Với `form_with`, nó nhận định nghĩa này là tham số hash đầu vào và không cần bao đóng trong cặp `{ }`:

```html
<%= form_with model: @user, id: :custom_id, class: :custom_class do |form| %>
<% end %>
```

### Form fields không cần thiết phải tương ứng với model attributes

Với `form_for` và bạn muốn khai báo thêm trường ngoài model trong form:

```html
<%= form_for @user do |form| %>
  <%= form.text_field :email %>
  <%= check_box_tag :send_welcome_email %>
<% end %>
```

Với `form_with`, trường không cần tương ứng với thuộc tính của model:

```html
<%= form_with model: @user, local: true do |form| %>
  <%= form.text_field :email %>
  <%= form.check_box :send_welcome_email %>
  <%= form.submit %>
<% end %>
```

Nhưng `send_welcome_email` khi đó sẽ bị scoped trong user trong tham số `params` của controller:

```ruby
params[:user][:send_welcome_email]
```

### All forms are remote by default

Đây là sự thay đổi thú vị nhất của `form_with`. Tất cá các form được sinh ra từ `form_with` sẽ mặc định submit XHR request. Không cần khai báo `remote: true` như với `form_tag` và `form_for`. Vì vậy, nếu bạn vẫn muốn tạo form với html request thì phải disable remote form bằng cách khai báo `local: true`

```html
<%= form_with model: @user, local: true %>
<% end %>
```

Trên đây là những điểm khác biệt khi sử dụng các loại form helper trong Rails, hai phương thức `form_for` và `form_tag` sẽ sớm deprecated trong tương lai và được thay thế bởi `form_with`, vậy chúng ta nên thực hành và tìm hiểu về nó trước khi sử dụng cho các project sau này của mình. Happy coding !!!

### Tham khảo
- [Rails 5.1 `form_with`](https://m.patrikonrails.com/rails-5-1s-form-with-vs-old-form-helpers-3a5f72a8c78a)
- [`form_with` API document](http://api.rubyonrails.org/v5.1/classes/ActionView/Helpers/FormHelper.html#method-i-form_with)