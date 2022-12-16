Có khá nhiều thư viện để tạo ra sortable list với javascript và ruby on rails. Trong bài này mình sẽ trình bày cách tạo sortable list với gem ranked-model và jquery-ui. 

![](https://images.viblo.asia/e2bba6d0-f3da-4419-a461-234e9bb00bae.gif)

Trước hết mình sẽ giới thiệu qua về cách cài đặt và cách sử dụng của nó.
# Gem ranked-model
Gem `ranked-model` là gem mới thay cho `acts_as_sortable` / `acts_as_list` có performance tối ưu tốt hơn nhiều so với các gem khác. Nó sử dụng được với cả Rails 3, 4, 5.

### Cài đặt 
Gemfile
```ruby
gem "ranked-model"
```

=> `bundle install`

### cách sử dụng
Đơn giản include code sau đây vào Model
```ruby
  include RankedModel
  ranks :row_order    #column sử dụng để sort
```
Sau đó bạn có thể gọi các method của gem này để dùng.
* Order Model theo order
```ruby
Duck.rank(:row_order).all
```
* Cập nhật vị trí của model 
```ruby
@model.update_attribute :row_order_position, 0  # or 1, 2, 37. :first, :last, :up and :down are also valid
```

Bạn phải append `_position`  với column order của bạn. Như trên bạn có thể sort record đó vào vị trí bất kỳ, chỉ đơn giản là gán vị trí nào đó vào, hoặc dùng `:first, :last, :up, :down` cũng được. Sau đó gem sẽ lo hết cho mình. 

Logic tính toán và update order của nó, bạn có thể đọc chi tiết ở đây. https://github.com/mixonic/ranked-model#internals

# jqueryui Sortable
### Cài đặt 
Download thư viện jqueryui qua url http://jqueryui.com/download/ 
Sau đó bạn chỉ cần link js và css vào trong website của bạn
```
<link rel="stylesheet" href="jquery-ui.min.css">
<script src="jquery-ui.min.js"></script>
```

Bây giờ bạn đã cài đặt xong thư viện này. jqueryui không chỉ có sort mà có nhiều thứ khác nữa mà bạn cũng có thể dùng được.

### cách sử dụng jqueryui sortable
Initialize sortable với selector:

```
$(".selector").sortable();
```
Đây là cấu trúc basic nhất của nó, bạn có thể customize thêm option, event , ... cho nó.
Refresh lại và bạn sẽ nhận được list có thể kéo thả và sắp xếp được. 

Tuy nhiên đây chỉ là Frontend thôi, khi bạn refresh lại nó sẽ như lúc ban đầu. 
Vậy bạn phải cập nhật lên database.

# Put together
Bây giờ mình sẽ kết hợp 2 thư viên trên để hoàn thành được một sortable list hoàn chỉnh.

### Model
```ruby
# product.rb
class Product < ActiveRecord::Base
  include RankedModel
  ranks :row_order
end
```

### View
```erb
# products/index.html.erb
<table id="product-list" class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <%= render @products %>
    </tbody>
</table>
```

  ```erb
  # products/_product.html.erb
<tr data-product-id="<%= product.id %>">
    <td>product.id</td>
    <td>product.name</td>
  </tr>
```
```js
# app/assets/javascripts/products.js

$(document).on("turbolinks:load", function() {
  $("#product-list tbody").sortable({
    update: function(event, ui) {
      $.ajax({
        dataType: "script",
        url: "/products/" + ui.item.data("product-id"),
        type: "PATCH",
        data: {row_order_position: ui.item.index()}
    });
    }
  });
});
```


### Controller
```ruby
  def index
      @products = Product.rank(:row_order).all
  end
  
  def update
    @product = Product.find(params[:id])
    @product.update_attribute :row_order_position, params[:row_order_position]

    respond_to do |format|
      format.js
    end
  end
```

Bây giờ bạn đã tạo ra sortable table sử dụng gem ranked-model và jqueryui sortable rồi. 
Chi tiết về các thư viện này, bạn tham khảo tại link sau đây:

https://github.com/mixonic/ranked-model

http://api.jqueryui.com/sortable/

http://learn.jquery.com/jquery-ui/getting-started/