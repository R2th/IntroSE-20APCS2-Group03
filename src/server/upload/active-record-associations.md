Bài viết sau đây nhằm hướng đến đối tượng là các bạn mới tiếp xúc với Rails, như các bạn đã biết thì rails là một framwork được tổ chức theo mô hình MVC, và Active Record được hiểu là phần model (M) trong đó có nhiều phần quan trọng như: Migrations, Validations, Callbacks, Acssociations, Query interface... 
   
   Sau đây mình xin giới thiệu cụ thể về Acssociations, một phần được xem là quan trọng bậc nhất trong Active record.
   
## Why acssociation?
   
Trong Rails, association là một kết nối giữa hai Active Record models. Việc tạo ra các association là rất quan trọng, vì nó sẽ giúp các thao tác chung của các model đó trở nên đơn giản và dễ dàng hơn, và đơn nhiên code của chúng ta cũng ngắn gọn hơn nhiều.
<br>
Ta xét ví dụ có hai models Category và Product, một category có nhiều products và một product chỉ thuộc về một category:
<br>   
**Trường hợp 1**: Không sử dụng Association:
```ruby
class Category < ApplicationRecord
end
 
class Product < ApplicationRecord
end 

// select tất cả product của một category bất kỳ
@category = Category.first
@products = Product.where(category_id: @category.id)

// delete category (những products của nó cũng phải được xóa)
@products.each do |product|
    product.destroy
end
@category.destroy
```

<br>

**Trường hợp 2**: Sử dụng association
   ```ruby
class Category < ApplicationRecord
    has_many :products, dependent: :destroy   
end
 
class Product < ApplicationRecord
    belongs_to :category 
end 

// select tất cả product của một category bất kỳ
@products = Category.first.products

// delete category (những products của nó cũng phải được xóa)
@category.destroy
```
Qua ví dụ đơn giản trên ta cũng thấy được phần nào tác dụng của association, để hiểu rõ hơn ta sẽ tìm hiểu ở phần tiếp theo.
<br>
## Các loại association trong rails
Rails hỗ trợ 6 loại association:
* belongs_to
* has_one
* has_many
* has_many :through
* has_one :through
* has_and_belongs_to_many
<br>
###  belongs_to association
Sử dụng belongs_to association để thiết lập một kết nối một-một (one-to-one) với một model khác, sao cho mỗi instance của model khai báo belongs_to thuộc về một instance của model khác. 
<br><br>
*Xét ví dụ*: nếu ứng dụng của ta bao gồm jobs và applies, và mỗi apply có thể được gán cho chính xác một job, ta sẽ khai báo model apply theo cách này:
```ruby
class Job < ActiveRecord::Base
end

class Apply < ActiveRecord::Base
  belongs_to :job
end
```
### has_one association
Liên kết has_one cũng thiết lập một kết nối một-một (one-to-one) với một model khác, nhưng với ngữ nghĩa hơi khác. Nó chỉ ra rằng mỗi instance của một model chứa hoặc sở hữu một instance của một model khác. 
<br><br>
Xét ví dụ: nếu mỗi supplier chỉ có một account, ta sẽ khai báo model supplier như sau:

```ruby
class Supplier < ApplicationRecord
  has_one :account
end
```

### has_many association
Sử dụng **has_many** association để thiết lập một kết nối một-nhiều (one-to-many) với một model khác. Ta thường sẽ tìm thấy liên kết này trên "phía bên kia" của liên kết belongs_to. Nó chỉ ra rằng mỗi instance của model có không hoặc nhiều instance của một model khác.
<br>
Xét ví dụ về  jobs và applies ở trên ta sẽ khai báo model job như sau: 
```ruby
class Job < ApplicationRecord
  has_many :applies
end
```
**Lưu ý**: tên model trong các quan hệ belongs_to và has_one ở số ít còn trong has_many phải ở số nhiều.

### has_many :through Association 
Liên kết **has_many: through** thường được sử dụng để thiết lập một kết nối nhiều-nhiều (many-to-many) với một mô hình khác. Nó chỉ ra rằng model khai báo có thể được kết hợp với 0 hoặc nhiều instances của một model khác bằng cách thông qua một model thứ ba.
<br><br>
Xét ví dụ, ta có hai bảng products và orders quan hệ nhiều-nhiều, một products có thể có trong nhiều orders và mỗi order cũng có thể chứa nhiều products. Để thiết lập association cho hai bảng trên ta cần thêm một bảng phụ là order_items chẳng hạn, khi đó ta sẽ khai báo các models như sau:
```ruby
#app/models/order_item.rb
class OrderItem < ApplicationRecord
 belongs_to :product
 belongs_to :order 
end
#app/models/products.rb
class Product < ApplicationRecord
 has_many :order_items
 has_many :orders, through: :order_items
end
#app/models/order.rb
class Order < ApplicationRecord
  has_many :order_items
  has_many :products, through: :order_items
end
```
Lúc này ta có thể sử dụng các cú pháp như:
```ruby
@products = order1.products // lấy tất cả products của order1 
@orders = product1.orders //lấy tất cả orders có chứa product1
```
**Ngoài ra**, liên kết **has_many: through** cũng hữu ích cho việc thiết lập "shortcuts" thông qua các liên kết **has_many lồng nhau**.
<br>
Ví dụ, nếu mỗi company có nhiều categories, và mỗi category có nhiều products, nếu ta muốn lấy tất cả products của company ta có thể thiết lập nó theo cách này:
```ruby
#app/models/company.rb
class Company < ApplicationRecord
 has_many :categories 
 has_many :products, through: :categories
end
#app/models/category.rb
class Category < ApplicationRecord
 belongs_to :company
 has_many :products
end
#app/models/product.rb
class Product < ApplicationRecord
  belongs_to :category
end

@products = company1.products // lấy tất cả products của company1
```

### has_one :through Association
Liên kết **has_one: through** thiết lập kết nối one-to-one với một model khác. Liên kết này chỉ ra rằng model khai báo có thể được kết hợp với một instance của một model khác bằng cách tiến hành thông qua một model thứ ba.
<br>
Xét ví dụ: nếu mỗi user có một account và mỗi account được liên kết với một account_history thì model user có thể trông giống như sau:
```ruby
class User < ApplicationRecord
  has_one :account
  has_one :account_history, through: :account
end
 
class Account < ApplicationRecord
  belongs_to :user
  has_one :account_history
end
 
class AccountHistory < ApplicationRecord
  belongs_to :account
end 

// lúc này ta có thể dùng 
user.account_history
```

### has_and_belongs_to_many Association
Liên kết **has_and_belongs_to_many** tạo kết nối trực tiếp many-to-many với một model khác mà không cần khai báo thêm model thứ ba.
<br>
Lấy lại ví dụ về products và orders ở trên nhưng sử dụng quan hệ has_and_belongs_to_many ta có thể khai báo như sau:
```ruby
class Product < ApplicationRecord
  has_and_belongs_to_many :orders
end

class Order < ApplicationRecord
  has_and_belongs_to_many :products
end 

// lúc này ta có thể sử dụng các cú pháp
product.orders
order.products
```
**Lưu ý**: Mặc dù ta không phải tạo model phụ nhưng vẫn phải tạo table phụ như sau:
```ruby
class CreateProductsAndOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.timestamps
    end
    create_table :orders do |t|
      t.string :name
      t.timestamps
    end
    create_table :products_orders, id: false do |t|
      t.belongs_to :product, index: true
      t.belongs_to :order, index: true
    end
  end
end
```
## Tổng  kết
Trên đây là phần giới thiệu về các kiểu liên kết của active models trong rails, hy vọng có thể giúp ích được các bạn phần nào trong bước đầu tìm hiểu các kiến thức cơ bản để đến với rails dễ dàng hơn.

Bài viết dựa trên khả năng hiểu biết của bản thân cũng như quá trình tìm hiểu trên mạng, nên có gì thiếu sót mong mọi người bỏ qua đồng thời góp ý để mình cải thiện cho hoàn chỉnh hơn.

Xin cảm ơn!

### Tài liệu tham khảo: 
https://guides.rubyonrails.org/association_basics.html