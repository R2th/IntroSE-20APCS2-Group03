## Giới thiệu
Kaminari là một gem rất phổ biến để phân trang khi làm việc với Rails. Trong bài viết này, chúng ta cùng nhau tìm hiểu cách phân trang sử dụng ajax để giúp cho quá trình này diễn ra mượt mà hơn :v: .

## Chuẩn bị
#### Tạo app, thêm gem kaminari
Tạo 1 sample app tạm đặt tên là  `ajax_pagination` và add thêm gem `kaminari` vào Gemfile:
```
rails new ajax_pagination
```

Trong`Gemfile`:
```
gem 'kaminari'
```
Sau đó chạy `bundle install`.

#### Tạo User
Bước tiếp theo, cần tạo model `User` với 2 trường `name` và `age`. Để cho nhanh, ta dùng `scaffold`:
```
rails g scaffold user name:string age:integer
rails db:migrate
```

#### Seeds

Trong `db/seeds.rb`:
```
puts "create users"
60.times do |n|
  User.create! name: "user_#{n}", age: n
end
```

![](https://images.viblo.asia/ff75a773-7faf-408e-aab3-744ba1db155c.png)

#### Implement pagination:

`users_controller.rb`:
```
@users = User.page(params[:page]).per(10)
```

`index.html.erb`
```
<%= paginate @users %>
```

![](https://images.viblo.asia/19679fe8-9043-4013-a389-db5d0b4f99e1.png)

#### Add jquery
`Gemfile`:
```
gem 'jquery-rails`
```
## Process
Thêm id cho pagination
`index.html.erb`:
```
<div id="paginator">
  <%= paginate @users %>
</div>
```

Render partial user:
- Tạo file: `_user.html.erb`:
```
<tr>
  <td><%= user.name %></td>
  <td><%= user.age %></td>
  <td><%= link_to 'Show', user %></td>
  <td><%= link_to 'Edit', edit_user_path(user) %></td>
  <td><%= link_to 'Destroy', user, method: :delete, data: { confirm: 'Are you sure?' } %></td>
</tr>
```

- Ở trang index, render partial ra như sau:
```
<tbody id="users">
  <%= render @users %>
</tbody>
```

OK và đây là phần chính, để dùng được ajax links, ta chỉ cần add thêm 1 param như sau:
```
<%= paginate @users, remote: true %>
```
Yeah, trông đơn giản nhưng mà chưa đủ :v:
Cần tạo thêm file: `app/views/users/index.js.erb`
```
$("#users").html("<%= j render(@users) %>");
$("#paginator").html("<%= j paginate(@users, remote: true) %>");
```
Với `#users` là id của users list.

Vậy là xong :P

Code trang index:
```
<p id="notice"><%= notice %></p>

<h1>Users</h1>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody id="users">
    <%= render @users %>
  </tbody>
</table>

<br>

<%= link_to 'New User', new_user_path %>

<div id="paginator">
  <%= paginate @users, remote: true %>
</div>
```

## Wrapup
Trông có vẻ dài dòng vậy, thức chất việc làm ajax cho pagination chỉ tổng kết gói gọn trong 3 dòng code
```
# Thêm remote true ở pagination
<%= paginate @users, remote: true %>

# Và:
$("#users").html("<%= j render(@users) %>");
$("#paginator").html("<%= j paginate(@users, remote: true) %>");
```

Các bạn có thể làm thêm phần ajax cho action destroy user, giữ lại trang hiện tại mà ko phải load về trang đầu (thêm 1 biến đếm ở controller mỗi khi xóa). 

Repo tham khảo thêm ở [đây](https://github.com/quynhqtvn/ajax_pagination/commits/master).

Thanks for reading.