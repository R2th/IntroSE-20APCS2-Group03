## Giới thiệu
   Mình xin giới thiệu về cách đánh số thứ tự bằng each_with_index cho các bản ghi mà mình có tìm hiểu và sử dụng trong quá trình bắt đầu học về lập trình Ruby On Rails.
   Cách hoạt động của each_with_index:
```ruby
a = [11, 22, 31, 44, 224].each_with_index { |val, index| puts "index: #{index} for #{val}" }
```
   Kết quả:
```ruby
index: 0 for 11
index: 1 for 22
index: 2 for 31
index: 3 for 44
index: 4 for 223

=> [11, 22, 31, 224, 44]
```
##  Sử dụng trong project
Ở đây ta sử dụng gem phân trang là kaminari để kết hợp với each_with_index, ta cài đặt trong Gemfile:
```ruby
gem "kaminari"
```
 Sau đó chạy
```ruby
bundle install
```
 Tiếp theo ta tạo dữ liệu với 1 model product với các trường dữ liệu là picture, name, quantity, price và category rồi thêm 6 bản ghi.

 Sau đó ở `product_controller.rb` trong **Controller**, thêm phương thức **Index**:
```ruby
class ProductsController < ApplicationController
  def index
    @products = Product.page(params[:page]).per 5
  end
end
```
Ở trên ta có hiển thị 5 product trên 1 trang và trong`Index.html.erb`ở **views/products** ta có:
```html
List product
<div>
  <table class="table">
    <thead>
       <tr>
          <th>No.</th>
          <th>Picture</th>
           <th>Name</th>
           <th>Quantity</th>
           <th>Price</th>
           <th>Category</th>
        </tr>
    </thead>
       <tbody id="list-product">
         <% @products.each_with_index do |product, index| %>
            <tr>
              <td><%= index %></td>
              <td class="th-product"><%= image_tag product.picture.url %></td>
              <td><%= product.name %></td>
              <td><%= product.quantity %></td>
              <td><%= product.price %></td>
              <td><%= product.category_name %></td>
            </tr>
          <% end %>
       </tbody>
  </table>
</div>
<%= paginate @products, theme: "twitter-bootstrap-3" %>
```

  Kết quả ta có:

Trang 1
  ![](https://images.viblo.asia/7dab7424-2558-4e4b-b0e9-866d0413aa0a.png)

Trang 2
  ![](https://images.viblo.asia/3a976326-7b02-4a96-bf36-f813dff9e769.png)

   Như ta thấy kết quả ở trên đánh index được bắt đầu từ 0 và khi ta chuyển đến trang 2 nó cũng được đánh lại bắt đầu từ 0.
   Để giải quyết vấn đề này ta thêm phương thức `page_index` trong `product_helper.rb` ở **app/helpers**.
```ruby
module ProductHelper
  def page_index params_page, index, per_page
    params_page ||= 1
    (params_page.to_i - 1) * per_page.to_i + index.to_i + 1
  end
end
```
Ở đây params_page là số trang hiện tại(params[:page]), index là chỉ số được lấy each_with_index và per_page là số bản ghi được hiển thị trên 1 trang.

Tiếp theo ở Index.html.erb ta viết:
```html
list product
<div>
  <table class="table">
    <thead>
       <tr>
          <th>No.</th>
          <th>Picture</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Category</th>
        </tr>
     </thead>
       <tbody id="list-product">
         <% @products.each_with_index do |product, index| %>
            <tr>
              <td><%= page_index params[:page], index, 5 %></td>
              <td class="th-product"><%= image_tag product.picture.url %></td>
              <td><%= product.name %></td>
              <td><%= product.quantity %></td>
              <td><%= product.price %></td>
              <td><%= product.category_name %></td>
            </tr>
          <% end %>
       </tbody>
  </table>
</div>
<%= paginate @products, theme: "twitter-bootstrap-3" %>
```
 Ta nhận được kết quả:

Trang 1
   ![](https://images.viblo.asia/663cc63d-0ac1-4dab-a192-1ce613be3cdf.png)
Trang 2

   ![](https://images.viblo.asia/b9ecb0f8-60e3-49f3-88e6-92ae8a226e74.png)
   
   Như vậy ta có thể đánh số thứ tự cho các bản ghi.
   
Link tham khảo : https://apidock.com/ruby/Enumerator/each_with_index