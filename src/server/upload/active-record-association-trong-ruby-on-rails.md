Tài liệu tham khảo: https://guides.rubyonrails.org/association_basics.html
# 1. Tại sao cần association?

Trong rails, association là liên kết giữa hai model với nhau. Association giúp cho việc truy vấn dễ dàng và làm cho code ngắn gọn, đơn giản hơn rất nhiều. Giả sử ta có hai models là Product và Image, giả sử một sản phẩm(prodcut) có nhiều ảnh(image) và một image chỉ thuộc về product. Nếu không có association khi đó ta sẽ khai báo trong model Product và Picture sẽ như thế này.

```
class Product < ApplicationRecord
end
 
class Image < ApplicationRecord
end
```

Ví dụ nếu muốn thêm một ảnh cho sản phẩm hiện có, cần phải:

```
@image = Image.create(name: "image1.jpg", product_id: @product.id)
```

Muốn xóa một sản phẩm và đảm bảo rằng tất cả hình ảnh của nó cũng bị xóa

```
@images = Image.where(product_id: @product.id)
@images.each do |image|
  image.destroy
end
@product.destroy
```

Với association, chỉ cần khai báo trong model Product và Image như sau:

```
class Prodcut < ApplicationRecord
  has_many :images, dependent: :destroy
end
 
class Image < ApplicationRecord
  belongs_to :product
end
```

Bây giờ, việc thêm một ảnh cho sản phẩm hiện có chỉ cần

```
@image = @product.images.create(name: "image1.jpg")
```

Xóa một sản phẩm chỉ cần
```
@product.destroy
```
tất cả những hình ảnh của nó cũng bị xóa đi.

# 2. Các loại association

Trong Rails hỗ trợ sáu loại associan:
1. belongs_to
2. has_one
3. has_many
4. has_many :through
5. has_one :through
6. has_and_belongs_to_many

## The belongs_to association

belongs_to thiết lập kết nối one-to-one (1-1) giữa model này với model khác. Giả sử như ví dụ ở trên ta khai báo trong model Image.

```
belongs_to :product
```

Lưu ý là blongs_to khi khai báo sử dụng thuật ngữ số ít. Tiếp theo cần phải tạo khóa ngoại product_id cho bảng images

```
class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :images do |t|
      t.belongs_to :product
     t.string :name
      t.timestamps
    end
  end
end
```

Khi bạn khai báo một belongs_to liên kết, lớp khai báo sẽ tự động nhận được 6 phương thức liên quan đến liên kết. Với ví dụ trên thì lớp Product sẽ nhận có thêm 6 phương thức đi kèm như sau:

```
#lấy ra image được liên kết với product
 image
 
 #gán một đối tượng liên quan đến đối tượng này
 image=
 
 #Tạo ra 1 image có liên kết với product nhưng chưa lưu vào CSDL
 build_image(attributes = {})
 
  #Tạo ra 1 image có liên kết với product và lưu vào CSDL
 create_image(attributes = {})
 create_image!(attributes = {})  #raise exception nếu xảy ra lỗi lưu không thành công
 
 # Làm mới dữ liệu từ CSDL cho đối tượng image đươc liên kết với product đã được load ra
 reload_image
```

## The has_one Association

has_one cũng thiết lập kết nối one-to-one(1-1) với một model khác, nhưng nó khác nhau về mặt ngữ nghĩa. Mối quan hệ này cho thấy răng một đối tượng của model này sở hữu một đối tượng của model khác. Ví dụ như ta có hai đối tượng của hai models là user và account, mỗi user chỉ có một account. Chúng ta sẽ khai báo như sau:

```
class User < ApplicationRecord
  has_one :account
end
```

```
class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :accounts do |t|
      t.belongs_to :user, index: true, unique: true, foreign_key: true
      t.string :account_number
      t.timestamps
    end
  end
end
```

Tùy vào trường hợp và mục đích sử dụng, chúng ta có thể khai báo unique hay không.

Khi bạn khai báo một has_one liên kết, lớp khai báo sẽ tự động nhận được 6 phương thức liên quan đến liên kết. Với ví dụ trên thì lớp User sẽ nhận có thêm 6 phương thức đi kèm như sau:

```
#lấy ra account được liên kết với 
 account
 
 #gán một đối tượng liên quan đến đối tượng này
 account=
 
 #Tạo ra 1 account có liên kết với user nhưng chưa lưu vào CSDL
 build_account(attributes = {})
 
  #Tạo ra 1 account có liên kết với user và lưu vào CSDL
 create_account(attributes = {})
 create_account!(attributes = {})  #raise exception nếu xảy ra lỗi lưu không thành công
 
 # Làm mới dữ liệu từ CSDL cho đối tượng account đươc liên kết với user đã được load ra
 reload_account
```

## The has_many Association

has_many thiết lập kết nối one-to-many với một model khác. Chúng ta sẽ thường thấy has_many ở model kia trong mối quan hệ belongs_to. Mối quan hệ này chỉ ra răng một đối tượng của model này có thể có 0 hoặc nhiều đối tượng của một model khác. Ví dụ như ở trên, ta có một product sẽ có nhiều images, ta sẽ khai báo như sau:

```
class Product < ApplicationRecord
  has_many :images
end
```

Lưu ý tên của other model tức là images phải là số nhiều trong association has_many. Và khai báo bên model Image như sau:

```
class Image < ApplicationRecord
  belongs_to :product
end
```
Chúng ta cần một khóa ngoại product_id cho bảng images, vì khai báo belongs_to đến product

```
class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :images do |t|
      t.belongs_to :product
     t.string :name
      t.timestamps
    end
  end
end
```

Khi bạn khai báo một liên kết một-nhiều, lớp khai báo sẽ tự động nhận được 17 phương thức liên quan đến liên kết. Với ví dụ trên thì lớp Product sẽ nhận có thêm 6 phương thức đi kèm như sau:

```
images
images<<(object, ...)
images.delete(object, ...)
images.destroy(object, ...)
images=(objects)
image_ids
image_ids=(ids)
images.clear
images.empty?
images.size
images.find(...)
images.where(...)
images.exists?(...)
images.build(attributes = {}, ...)
images.create(attributes = {})
images.create!(attributes = {})
images.reload
```

## The has_many :through Association
has_many:through association thường được sử dụng để thiết lập mối quan hệ many-to-many (n-n) giữa hai model với nhau. Giả sử ta có 2 model Product và Size, trong đó một sản phẩm có thể có nhiều kích thước và một kích thước có thể có nhiều sản phẩm. Từ đó ta có quan hệ giữa Product và Size là n-n. Thông thường, đối với quan hệ n-n, chúng ta cần tạo ra một model thứ 3 ở giữa để trở thành hai mối quan hệ 1-n. Trong trường hợp này, chúng ta sẽ có model thứ 3 chính là ProductSize và khai báo trong các model như sau:

```
class Product < ApplicationRecord
  has_many :product_sizes
  has_many :sizes, through: :product_sizes
end
 
class ProductSize < ApplicationRecord
  belongs_to :product
  belongs_to :size
end
 
class Size < ApplicationRecord
  has_many :product_sizes
  has_many :products, through: :product_sizes
end
```

## The has_and_belongs_to_many Association

has_and_belongs_to_many tạo ra một quan hệ n-n trực tiếp mà không có sự can thiệp của một model khác. Giả sử chúng ta có model Assembly và Part. Ứng với 1 assembly có nhiều parts và 1 part có nhiều assemblies. Chúng ta sẽ khai báo trong model như sau:

```
class Assembly < ApplicationRecord
  has_and_belongs_to_many :parts
end
 
class Part < ApplicationRecord
  has_and_belongs_to_many :assemblies
end
```

Khi bạn khai báo một has_and_belongs_to_many liên kết, lớp khai báo sẽ tự động nhận được 17 phương thức liên quan đến liên kết:

```
assemblies
assemblies<<(object, ...)
assemblies.delete(object, ...)
assemblies.destroy(object, ...)
assemblies=(objects)
assembly_ids
assembly_ids=(ids)
assemblies.clear
assemblies.empty?
assemblies.size
assemblies.find(...)
assemblies.where(...)
assemblies.exists?(...)
assemblies.build(attributes = {}, ...)
assemblies.create(attributes = {})
assemblies.create!(attributes = {})
assemblies.reload
```

# Tài liệu tham khảo:
Trên đây là những gì mình mới tìm hiểu về activerecord association trong ruby on rails. Hi vọng sẽ giúp ích cho các bạn newbie giống như mình. 

Cảm ơn các bạn đã đọc bài viết. Các bạn có thể vào link mình đính kèm bên dưới để tìm hiểu thêm :D

Docs: https://guides.rubyonrails.org/association_basics.html