Ở bài viết này mình sẽ tóm tắt cách dùng Ruby on Rails và Ajax để tạo 1 app có chức năng "thêm vào giỏ hàng" như các shop online. ! 😊😊<br>
Viết bài này cũng là để chính bản thân đọc lại khi có thời gian nên sẽ rất ngắn gọn và lược đi phần frontend. 😂<br>

# Mở đầu
App lần này của mình sẽ là app order sách. <br>
> Ruby version: 2.7.2<br>
Rails version : 6.1.5<br>
Database : default SQLite3

<h2>1. tạo user bằng gem devise </h2>

* Bước này khá đơn giản nên mình sẽ không nói sâu nữa. 
    <br>Thêm `gem 'devise'` vào `Gemfile`. Sau đó các bạn cài đặt devise như trong hướng dẫn của github https://github.com/heartcombo/devise
* Lưu ý rằng ở đây mình sẽ thay tên class name của mình là `user` chứ không phải `MODEL` như trong hướng dẫn.

<h2>2. Tạo Model và Controller</h2>

* Tạo Model `book` có `title` là tên sách và `price` là giá sách

```cpp
rails g model book title:text price:integer
```

<br>

* Controller `books` với 2 chức năng là create và destroy

```php
rails g controller books create destroy
```

<br>

* Model `order` dùng để lưu lại lịch sử order. `quantity` là số lượng mỗi lần order, `total_price` là số tiền mỗi lần order. 
Trong table `order` thì `book_id` và `user_id`sẽ là khóa ngoại.

```css
rails g model order quantity:integer total_price:integer book:references user:references
```

<br>

* Controller `orders` có 2 chức năng là create và destroy
```cpp
rails g controller orders create destroy
```

<br>

* Tạo trang homepage cho app qua file index của controller `homes`

```go
rails g controller homes index
```

<br>
* Khởi tạo database bằng lệnh migrate

```css
rails db:migrate
```

<h2>3. Tạo tính năng Giỏ Hàng</h2>

* Tạo database `book` bằng seed. App của mình sẽ có 3 sản phầm sách như sau:<br>
seed.rb
```ruby
Book.create(title: "Java", price: 50)
Book.create(title: "RoRs", price: 80)
Book.create(title: "C", price: 70)
```

```css
rails db:seed
```

<br>

* Config file `routes.rb`<br>

```ruby
Rails.application.routes.draw do
  get 'books/create'
  get 'books/destroy'

  resources :orders, only: [:create, :destroy]
  resources :homes, only: [:index]
  root "homes#index"
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
```
`resources  :orders` chỉ áp dụng cho method `create` và `destroy`.<br>
`resources  :homes` chỉ áp dụng cho method `index`.


<br>

* book.rb
```ruby
class Book < ApplicationRecord
    has_many :orders
end
```

* order.rb
```ruby
class Order < ApplicationRecord
    belongs_to :book
    belongs_to :user
end
```
Một `book` sẽ có nhiều `orders`. Quan hệ giữa `book` và `orders`, cũng như giữa `user` và `orders` là one-to-many. 
<br>

* Homepage của app sẽ được customize qua file `homes/index.html.erb`

```html
<h1>Shop</h1>

<h4>Logging as: <%= current_user.email %> -- 
<%= link_to "Sign Out", destroy_user_session_path, method: :delete %></h4>

<% @books.each do |book| %>
    <%= book.id %> - <%= book.title %> - <%= book.price %>￥
    <%= form_for @order, remote: true do |f| %>
    	<%= f.hidden_field :book_id, :value => book.id %>
    	<%= f.hidden_field :user_id, :value => current_user.id %>
    	<%= f.number_field :quantity, :value => 1, :min => 1 %>
    	<%= f.submit "Add to cart" %>
	<% end %>
<% end %>

<hr>
<div class="total-amount">
    <%= render "orders/total" %>
</div>
<div class="reception">
    <% @orders.each do |order| %>
            <%= render "orders/order", order: order %>
    <% end %>
</div>



```
Do ở phần sau mình có dùng thêm tính năng của Ajax nên trong `form_for` phải có thêm `remote: true`.

<br>

* Tạo mới file `orders/_total.html.erb`, tổng tiền cần thanh toán sẽ được gọi qua file partial này. * 

```
<h3>Ordered List -- Total amount: <%= Order.where(user_id: current_user.id).sum(:total_price) %>￥</h3>
```
Tổng tiền sẽ được tính bằng tổng của tất cả column `total_price` trong bảng Order.<br>
Ở trang chủ sẽ chỉ hiển thị những `order` của người dùng hiện tại chứ không phải tất cả orders.
<br>

* Tạo mới file `orders/_order.html.erb`, danh sách order sẽ được hiển thị qua file partial này.

```html
<%= order.created_at.strftime("%Y/%m/%d") %> - <%= order.book.title %> - 
<%= order.book.price %>￥ x <%= order.quantity %> = 
<%= order.total_price %>￥<br>
```
<br>

* Config controller `homes` và `orders`. Sửa file app/controller/homes_controller.rb như sau<br>

```ruby
class HomesController < ApplicationController
    before_action :authenticate_user!
    
  def index
      @books = Book.all
      @orders = Order.where(user_id: current_user.id).order("created_at DESC")
      @order = Order.new
  end
end

```
Ta muốn người dùng phải đăng nhập trước khi truy cập vào trang web. Do đó thêm `before_action :authenticate_user!` vào đầu controller.

* app/controller/orders_controller.rb
```ruby
class OrdersController < ApplicationController
  def create
    @order = Order.new(order_params)
    @order.total_price = @order.book.price * @order.quantity
    respond_to do |format|
        if @order.save
            format.js {} 
        end
    end
  end

  def destroy
  end

  private
  def order_params
    params.require(:order).permit(:book_id, :quantity, :total_price, :user_id)      
  end
end

```

<h2>4. Áp dụng Ajax</h2>
Đến đây tính năng Thêm vào giỏ hàng đã cơ bản được hoàn thành. Nhưng mình muốn áp dụng ajax vào app để các thao tác người dùng được mượt mà hơn. Các bạn có thể xem thêm cách xây dựng 1 app Ajax đơn giản qua bài mình đã viết đây   

https://viblo.asia/p/app-ajax-don-gian-trong-rails-bWrZnAmrKxw

<br>

* Import CDN của ajax vào file `application.html.erb`. Phiên bản mình dùng là 3.6.0.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Testapp</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

<br>

* Trong folder app/views/orders, đổi tên file `create.html.erb` thành `create.js.erb` . Sau mỗi lần bấm button `Add to cart` thì file `create.js.erb` sẽ được gọi.

```ruby
$(".reception").prepend("<%= j render @order %>");
$(".total-amount").html("<%= j render "orders/total" %>");
```
 Mỗi khi bấm button `Add to cart` thì thông tin `book` được đặt sẽ được hiển thị lên màn hình và tổng tiền sẽ được làm mới.<br> 
<br>Câu lệnh `<%= j render @order %>` là cách viết tắt của `<%= escape_javascript(render @order) %>`.<br>
Nó giúp lệnh render của chúng ta tránh bị lỗi ký tự khi render file partial. Các bạn có thể đọc thêm về escape_javascript ở đây<br>
https://stackoverflow.com/questions/1620113/why-escape-javascript-before-rendering-a-partial Hoặc
https://apidock.com/rails/ActionView/Helpers/JavaScriptHelper/escape_javascript

<br>
Đến đây app đặt sách đơn giản với tính năng thêm vào giỏ hàng đã được hoàn thành. Truy cập vào localhost và xem thành quả nào ^^. <br>
Sau khi bấm Add to cart thì thông tin `book` được order sẽ được thêm vào Ordered List bên dưới.

![ezgif.com-gif-maker (1).gif](https://images.viblo.asia/f418bb46-cf5f-4a2d-b284-b144921eb53d.gif)

# Tổng kết

App bên trên do chỉ có tính năng thêm vào giỏ hàng nên vẫn còn khá sơ sài. Nhưng bằng cách làm tương tự, ta hoàn toàn có thể làm thêm tính năng xóa sản phẩm và chỉnh sửa số lượng sản phẩm trong ordered list.<br>
Mọi người cùng đọc và góp ý nếu bài viết có thiếu sót nhé. 😊😊