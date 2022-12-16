### Giới thiệu
Khi xử lý các bảng dữ liệu, đôi khi bạn có thể muốn sắp xếp các cột để xem dễ dàng hơn. May mắn thay, chúng ta có thể dễ dàng làm điều này trong ứng dụng Ruby on Rails. Băt đâu nào.
### Tạo ứng dụng Rails
Đối với hướng dẫn này, chúng tôi sẽ tạo một Product model đơn giản, sẽ chứa 3 trường, id, tên và giá. Để tạo modle này, hãy chạy lệnh dưới đây.
```
rails g model Product name price:decimal{12,3}
```
Bây giờ hãy chạy rake db:migrate
```
rake db:migrate
```
Bây giờ, hãy thêm một số dữ liệu. Mở tệp db / seed.rb và thêm vào 
```
Product.delete_all
Product.create!(id: 1, name: "Banana", price: "1.00")
Product.create!(id: 2, name: "Apple", price: "1.50")
Product.create!(id: 3, name: "Grape", price: "0.10")
Product.create!(id: 4, name: "Strawberry", price: "0.30")
Product.create!(id: 5, name: "Blueberry", price: "0.50")
Product.create!(id: 6, name: "Raspberry", price: "0.33")
```
Bây giờ hãy chạy rake db: seed để cài đặt dữ liệu seed.
```
rake db: seed
```
Tạo products controller. Chạy lệnh dưới đây để tạo này bây giờ.
```
rails g controller Products index
```
Config routes mở file config/routes.rb
```
Rails.application.routes.draw do
  resources :products, only: [:index]
  root to: "products#index"
end
```
Tiếp theo, chúng ta cần thêm Bootstrap vào dự án của mình để làm mọi thứ tốt hơn. Mở file layouts/application.html.erb
```
<!DOCTYPE html>
<html>
<head>
  <title>SortableTableColumns</title>
  <%= stylesheet_link_tag    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', 'data-turbolinks-track' => true %>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

<%= yield %>

</body>
</html>
```
Bây giờ chúng tôi có một nền tảng cơ bản cho ứng dụng của mình, chúng tôi có thể làm việc để hiển thị và sắp xếp các product. 
Mở file controllers/products_controller.rb:
```
class ProductsController < ApplicationController
  helper_method :sort_column, :sort_direction

  def index
    @products = Product.order("#{sort_column} #{sort_direction}")
  end
private
  def sortable_columns
    ["name", "price"]
  end

  def sort_column
    sortable_columns.include?(params[:column]) ? params[:column] : "name"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
```
Vậy chuyện gì đang xảy ra ở đây? Đầu tiên, chúng tôi đưa ra các phương thức sort_column và sort_direction cho những người trợ giúp của chúng tôi. Điều này cho phép chúng tôi sử dụng chúng bên ngoài controller. Tiếp theo, thứ tự phương thức chỉ mục theo cột sắp xếp hiện tại của chúng tôi (được chỉ định bởi phương thức sort_column) và hướng (được chỉ định bởi phương thức sort_direction). Nếu bạn xem phương thức sort_column, bạn sẽ thấy nó kiểm tra tên cột dựa vào danh sách tên cột màu trắng. Điều này ngăn người dùng sắp xếp theo các cột mà chúng tôi có thể không muốn họ sắp xếp theo, ví dụ như id. Phương pháp sắp xếp hướng kiểm tra để đảm bảo hướng là asc hoặc desc. Cả hai phương pháp trả về mặc định hợp lý khác. Điều này giúp giữ cho người dùng không làm những điều bất ngờ với dữ liệu của bạn.

Bây giờ hãy tạo một phương thức trợ giúp sẽ được sử dụng để tạo các liên kết sắp xếp thực tế. Mở helpers/products_helper.rb thêm đoạn code này vào.
```
module ProductsHelper
  def sort_link(column, title = nil)
    title ||= column.titleize
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    icon = sort_direction == "asc" ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"
    icon = column == sort_column ? icon : ""
    link_to "#{title} <span class='#{icon}'></span>".html_safe, {column: column, direction: direction}
  end
end
```
Phương thức sort_link có 2 đối số. Cột đầu tiên, là tên của cột bạn muốn sắp xếp theo. Tiêu đề tiếp theo là tiêu đề dựa trên văn bản của cột. Đây có thể là bất cứ điều gì. Nếu tiêu đề là không, phương thức sẽ sử dụng tên cột thực tế trong Trường hợp tiêu đề. Phần còn lại của mã tạo ra các lớp css và siêu liên kết. Điều này được trả lại cho quan điểm của chúng tôi, mà tiêm nó trên trang.

Bây giờ hãy tạo quan điểm của chúng tôi. Mở chế độ xem chỉ mục cho bộ điều khiển sản phẩm của bạn và sửa đổi nó để trông giống như code được liệt kê bên dưới.
products/index.html.erb
```
<h1>Products</h1>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th><%= sort_link "name" %></th>
      <th><%= sort_link "price" %></th>
      <th><%= sort_link "created_at", "Added On" %></th>
    </tr>
  </thead>
  <tbody>
    <% @products.each do |product| %>
      <tr>
        <td><%= product.name %></td>
        <td><%= number_to_currency product.price %></td>
        <td><%= product.created_at.strftime "%B %e, %Y" %></td>
      </tr>
    <% end %>
  </tbody>
</table>
```
Bạn sẽ nhận thấy rằng chúng tôi gọi phương thức sort_link ở đây để tạo liên kết để nhúng vào trang. Từ đó trở đi, chúng tôi chỉ liệt kê dữ liệu như bình thường. Nếu bạn khởi động máy chủ rails vào thời điểm này và mở một trang vào ứng dụng rails của bạn, bạn sẽ thấy rằng tất cả các cột đều có thể sắp xếp theo thứ tự tăng dần hoặc giảm dần. Đó là nó, cảm ơn vì đã đọc!