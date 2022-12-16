Caching  là rất quan trọng chúng ta hay xem qua kỹ thuật mà có thể cải thiện hiệu suất của trang web khá lớn. Tóm tắt lại, caching là cách lưu các kết quả của một tính toán phúc tạm trong lưu trữ và trả về ngay mà không cần phải tính toán lại.
Trong bài viết này sẽ thảo luận về nhiều loại bộ nhớ đệm trong Ruby on Rails:
- Low Level Caching
- Fragment caching
- Action caching
- Page caching
- HTTP caching

### Low Level Caching
Low-level caching đòi hỏi phải sử dụng đối tượng `Rails.cache` trực tiếp để cache bất kỳ thông tin. Sử dụng nó để chứa bất kỳ dữ liệu tốn kém để truy xuất và có khả năng lỗi thời. Truy vấn db hoặc gọi API là sử dụng phổ biến cho việc này
Cách hiệu quả nhất để thực hiện low-level caching là sử dụng phương thức `Rails.cache.fetch`, nó đọc một giá trị từ cache nếu sẵn có hoặc nó sẽ thực thi một block được truyền cho nó và trả về kết qủa:

```ruby
>> Rails.cache.fetch('answer')
==> "nil"
>> Rails.cache.fetch('answer') {1 + 1}
==> 2
Rails.cache.fetch('answer')
==> 2
```
Hãy tưởng tựng rằng một ứng dụng có một model `Product` với một phương thức của class trả về tất cả các mặt hàng hết hàng và một phương thức tức thời tìm giá của sản phẩm trên một trang web cạnh tranh. Dữ liệu trả về bởi các phương thức sẽ hoàn hảo với `low-level caching`:

```ruby
# product.rb

def Product.out_of_stock
  Rails.cache.fetch("out_of_stock_products", :expires_in => 5.minutes) do
    Product.all.joins(:inventory).conditions.where("inventory.quantity = 0")
  end
end

def competing_price
  Rails.cache.fetch("/product/#{id}-#{updated_at}/comp_price", :expires_in => 12.hours) do
    Competitor::API.find_price(id)
  end
end
```
Lưu ý rằng trong ví dụ này đã tạo một khóa bộ đệm dựa trên các thuộc tính Id và update_at. Đây là một quy ước phổ biến và có lợi ích là vô hiệu hóa bộ đệm bất cứ khi nào sản phẩm được cập nhật. Nói chung khi sử dụng low-level caching cho thông tin cấp độ tức thời cần tạo khóa bộ đệm.

### Fragment caching
Fragment caching làm một cơ chế hay cho vật dụng đệm hoặc partial trong ứng dụng. Fragment caching sử dụng phương thức `[cache](http://api.rubyonrails.org/classes/ActionView/Helpers/CacheHelper.html#method-i-cache)` bóc các code. Vd: nếu như ứng dụng liệt kê các sản phẩm như sau:
```html
# index.html.erb
<%= render :partial => "product", :collection => @products %>

# _product.html.erb
<div><%= link_to product, product.name %>: <%= product.price%></div>
<div><%= do_something_comlicated%></div>
```
Sau đó có thể dễ dàng lưu trữ partial cho từng sản phẩm với fragment caching. Rails sẽ tự động tạo khóa bộ đệm nếu truyền cho nó một đối tượng ActiveRecord:
```html
# _product.html.erb
<% cache(product) do %>
   <div><%= link_to product, product.name %>: <%= product.price%></div>
   <div><%= do_something_comlicated%></div>
<% end %>
```
Một chiến lược  fragment caching khác là lưu trữ các widget hoặc các phần khác nhau của các trang không cần làm mới từ kho dữ liệu trực tiếp cho mỗi lần tải trang mới. Ví dụ: trang đầu của trang web được liệt kê các sản phẩm bán chạy nhất có thể lưu trữ đoạn này. Hãy giả sử rằng muốn làm mới thông tin mỗi giờ:
```html
# index.html.erb
<% cache("top_products", :expires_in => 1.hour) do %>
  <div id="topSellingProducts">
    <% @recent_product = Product.order("units_sold DESC").limit(20) %>
    <%= render :partial => "product", :collection => @recent_products %>
  </div>
<% end %>
```

### Action caching
Nếu các trang cần xác thực hoặc before/after filters, nội dung có thể cache sử dụng gem [action_caching](https://github.com/rails/actionpack-action_caching).
Đơn giản chỉ cần thêm `caches_action :<action_name>` trong controller để bật lên bộ nhớ đệm cho các action cụ thể. Nếu layout chức các phần tử động( tên hoặc email của user trong header) có thể render layout  động trong khi vẫn có thể caching nội dung của action. Sử dụng cờ `layout: false` để thực thi. Cuối cung có thể dùng `expire_action` command để xóa các action từ bộ nhớ đệm khi có ghi dữ liệu mới.

Controller Rails dưới này sẽ phản án các ý tưởng:
```ruby
# products_controller.rb
class ProductsController < ActionController

  before_filter :authenticate
  caches_action :index
  caches_action :show, layout: false

  def index
    @products = Product.all
  end

  def show
    @product = Product.find params[:id]
  end

  def create
    expire_action action: :index
  end
end
```

### Page caching
Page caching rất giống với action caching nhưng nó không chạy bất cứ before action và tạo bộ nhớ đệm trang web. Các request tiếp theo không thực hiện bởi Rails stack và một trang tĩnh được phục vụ. Cache kiểu này có thể nhanh nhưng thật ra nó vẫn giới hạn về việc sử dụng. Trong một số ứng dụng hiện đại các người truy cập trang nên được phục vụ khác nhau và page caching không thật sự phù hợp nhưng nó vẫn tốt với các nguồn wiki và blog.

[Gem page_caching](https://github.com/rails/actionpack-page_caching) hoạt động bằng tạo một file trên hệ thống và sử dụng phương thức `cache_page :action_name`.

```ruby
# controllers/employees_controller.rb
class EmployeesController < ApplicationController
  caches_page :info

  def info
    @employees = Employee.all
  end
end
```
Để vô hiệu lực cache có thể dung phương thức `expire_page`:
```javascript
expire_page controller: 'employees', action: 'info'
```

### HTTP caching
[HTTP caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) là một kiểu caching dựa trên các HTTP header, cụ thể `HTTP_IF_NONE_MATCH` và `HTTP_IF_MODIFIED_SINCE`. Bằng cách sử dụng các header trình duyệt của người dùng có thể kiểm trả khi trang được chỉnh sửa lần cuối và giá trị id tác biệt của nó là gì(ETag).

Ý tưởng là khi request đầu tiên trình duyệt ghi ETag của trang và cache trên đĩa. Khi các request tiếp theo trình duyệt gửi ETag đã lưu gửi đến server. Nếu tag trả về bởi server và một khi gửi bởi người dùng không khớp, có nghĩ là nội dung của trang thay đổi cần yêu cầu lại. Nếu ETag giống nhau, `304` status code ("Not modified") được trả về và trình duyệt có thể hiển thị trang từ cache.

Một điểm lưu ý có 2 loại ETag: strong và weak. Weak tag có tiên tố `W/` và cho phép trang có thể đổi nội dung chút xíu. Strong tag yêu cầu response hoàn toàn lý tưởng không thì sẽ tải lại trang.
Để bật chức năng hỗ trợ [HTTP caching in Rails](http://guides.rubyonrails.org/caching_with_rails.html#conditional-get-support) cần một trong hai phương thức `stale?` và `fresh_when`. `stale?` là một phương thức hơi phức tạm  mà nhận một block(ưu điểm có thể dụng với `respond_to`). `fresh_when` là đơn giản hơn và có thể dùng khi không muốn respond với một số format.

```ruby
# controllers/employees_controller.rb
class EmployeesController < ApplicationController
# ...
  def index
    @employees = Employee.by_gender params[:gender]
    fresh_when etag: @employees, last_modified: @employees.first.updated_at
  end
 # other actions here...
end
```

```
# models/employee.rb
class Employee < ApplicationRecord
  scope :by_gender, ->(gender) do
    if VALID_GENDER.include?(gender)
      Rails.cache.fetch("employees_#{gender}") { where(gender: gender).order(updated_at: :desc) }
    else
      Rails.cache.fetch('all_employees') { all.order(updated_at: :desc) }
    end
  end
 end
 ```

 #### Tài liệu tham khảo
 - [How to Improve Website Performance With Caching in Rails](https://scotch.io/tutorials/how-to-improve-website-performance-with-caching-in-rails#toc-fragment-caching)
 - [Caching Strategies for Rails](https://devcenter.heroku.com/articles/caching-strategies#low-level-caching)