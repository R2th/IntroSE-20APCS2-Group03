Khi làm việc với Rails framework, ắt hẳn bạn đã rất quen thuộc với khái niệm association rồi nhỉ. Với mình cũng thế, hầu như project Rails nào của mình cũng động đến association cả.

Giật tít vậy chứ trong bài viết này mình sẽ chỉ giới thiệu association và cách dùng một số phương thức với associations thôi nhé :D
# Association là gì
`Association` là tập các macro dùng để liên kết, tạo ra ràng buộc buộc giữa các model trong ứng dụng tương tự như các bảng trong database, thông qua các khoá ngoại.

## Liên kết 1 - 1

Ví dụ ta có 2 bảng là `users` và `accounts`. Một user chỉ được có duy nhất 1 tài khoản ngân hàng và một tài khoản ngân hàng chỉ thuộc về 1 user nhất định, vậy để tạo association cho 2 model này, ta sẽ khai báo trong 2 model như sau:

```Ruby
# app/models/user.rb
class User < ApplicationRecord
  has_one :account
end
```

```Ruby
# app/models/account.rb
class Account < ApplicationRecord
  belongs_to :user
end
```

Việc làm trên sẽ định nghĩa rằng mỗi đối tượng `@user` thuộc model `User` sẽ chỉ sở hữu một đối tượng `@user.account` thuộc model `Account` và mỗi đối tượng `@account` thuộc model `Account` chỉ thuộc về 1 đối tượng `@account.user` thuộc model `User`.

## Liên kết 1 - n

Ví dụ ta có 2 bảng là `users` và `tickets`. Một user có thể có nhiều ticket và mỗi ticket chỉ thuộc về 1 user nào đó, vậy để tạo association cho 2 model này, ta sẽ khai báo trong 2 model như sau:

```Ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :tickets
end
```

```Ruby
# app/models/ticket.rb
class Ticket < ApplicationRecord
  belongs_to :user
end
```

Việc làm trên sẽ định nghĩa rằng mỗi đối tượng `@user` thuộc model `User` sẽ sở hữu nhiều đối tượng `@user.tickets` thuộc model `Ticket` và mỗi đối tượng `@ticket` thuộc model `Ticket` chỉ thuộc về 1 đối tượng `@ticket.user` thuộc model `User`.

## Liên kết n - n

Ví dụ ta có 2 bảng là `invoices` và `products` được nối với nhau qua bảng `invoice_details`. Mỗi invoice có thể có nhiều invoice_details và mỗi product có thể có trong nhiều invoice_details.

Có 2 cách để tạo liên kết n - n, đó là sử dụng `has_many :through` và `has_and_belongs_to_many`.

**Cách 1: Dùng `has_many :through`**

```Ruby
# app/models/invoice_detail.rb
class InvoiceDetail < ApplicationRecord
  belongs_to :invoice
  belongs_to :product
end
```

```Ruby
# app/models/invoice.rb
class Invoice < ApplicationRecord
  has_many :invoice_details
  has_many :products, through: :invoice_details
end
```

```Ruby
# app/models/product.rb
class Product < ApplicationRecord
  has_many :invoice_details
  has_many :invoices, through: :invoice_details
end
```

Việc làm trên sẽ định nghĩa rằng mỗi đối tượng `@invoice_detail` thuộc model `InvoiceDetail` sẽ chỉ thuộc về một đối tượng `@invoice_detail.invoice` thuộc model `Invoice` và thuộc về một đối tượng `@invoice_detail.product` thuộc model `Product`, mỗi đối tượng `@invoice` thuộc model `Invoice` sở hữu nhiều đối tượng `@invoice.invoice_details` và `@invoice.products`, mỗi đối tượng `@product` thuộc model `Product` sở hữu nhiều đối tượng `@product.invoice_details` và `@product.invoices`.

**Cách 2: Dùng `has_and_belongs_to_many`**

```Ruby
# app/models/invoice.rb
class Invoice < ApplicationRecord
  has_and_belongs_to_many :products
end
```

```Ruby
# app/models/product.rb
class Product < ApplicationRecord
  has_and_belongs_to_many :invoices
end
```

Với cách này thì ta không phải tạo model cho bảng `invoice_details`.

Dù cả 2 cách đều yêu cầu bảng `invoice_details` tồn tại trong database nhưng nếu dùng `has_and_belongs_to_many` thì ta sẽ không thể validate khi tạo mỗi bản ghi của bảng `invoice_details` như cách dùng `has_many :through` do không có model.

Một lưu ý nhỏ các bạn cần để ý đó là tên của đối tượng được liên kết trong model. Các đối tượng bên n (bên nhiều) sẽ nên để tên ở dạng số nhiều.

Trên đây là cách tạo ra association cho các model, tiếp theo, mình sẽ giới thiệu một số phương thức với association

# Các phương thức hỗ trợ
## Liên kết dạng đơn
Các liên kết dạng đơn như `belongs_to` hay `has_one` sẽ cung cấp cho chúng ta các phương thức theo bảng sau:

Phương thức                       | belongs_to | belongs_to :polymorphic | has_one
----------------------------------|------------|--------------|-------------
other                             |     X      |      X       |    X
other=(other)                     |     X      |      X       |    X
build_other(attributes={})        |     X      |              |    X
create_other(attributes={})       |     X      |              |    X
create_other!(attributes={})      |     X      |              |    X
reload_other                      |     X      |      X       |    X
(với `other` là đại diện cho đối tượng được liên kết)

Ví dụ, mình có các model với các associations như sau:

```
class User < ActiveRecord
  has_one :profile
end
```

```
class Profile < ActiveRecord
  belongs_to :user
  has_many :images, as: :imageable
end
```

```
class Image < ActiveRecord
  belongs_to :imageable, polymorphic: true
end
```

Như vậy từ mỗi đối tượng của model `User`, ta có thể gọi các phương thức sau:
```
user = User.first

# Lấy ra profile được liên kết với user
profile = user.profile

# Thay đổi đối tượng profile được liên kết với user thành giá trị khác
user.profile = Profile.create

# Tạo ra 1 đối tượng của model Profile có liên kết với user nhưng chưa lưu vào CSDL
profile = user.build_profile

# Tạo ra 1 đối tượng của model Profile có liên kết với user và lưu vào CSDL
profile = user.create_profile
profile = user.create_profile! # raise exception nếu xảy ra lỗi lưu không thành công

# Làm mới dữ liệu từ CSDL cho đối tượng profile đươc liên kết với user đã được load ra
user.reload_profile
```

Cũng tương tự đối với các model `Profile` (với liên kết `belongs_to :user`) và `Image` (với liên kết `belongs_to :imageable, polymorphic: true`, nhưng không hỗ trợ 3 phương thức tạo mới đối tượng do liên kết là polymorphic).
## Liên kết dạng tập hợp
Còn các liên kết dạng tập hợp như `has_many`, `has_and_belongs_to_many`, chúng ta sẽ sử dụng với các phương thức như sau:

generated methods                 | has_many | has_and_belongs_to_many
----------------------------------|-------|----------
others                            |   X   |    X
others=(other,other,...)          |   X   |    X 
other_ids                         |   X   |    X
other_ids=(id,id,...)             |   X   |    X
others<<                          |   X   |    X
others.push                       |   X   |    X
others.concat                     |   X   |    X
others.build(attributes={})       |   X   |    X
others.create(attributes={})      |   X   |    X
others.create!(attributes={})     |   X   |    X
others.size                       |   X   |    X
others.length                     |   X   |    X
others.count                      |   X   |    X
others.sum(*args)                 |   X   |    X
others.empty?                     |   X   |    X
others.clear                      |   X   |    X
others.delete(other,other,...)    |   X   |    X
others.delete_all                 |   X   |    X
others.destroy(other,other,...)   |   X   |    X
others.destroy_all                |   X   |    X
others.find(*args)                |   X   |    X
others.exists?                    |   X   |    X
others.distinct                   |   X   |    X
others.reset                      |   X   |    X
others.reload                     |   X   |    X
(với `other` là đại diện cho đối tượng được liên kết)

Với model Profile (và liên kết `has_many :images, as: :imageable`) trong ví dụ trước, mình sử dụng như sau:

```
profile = Profile.first

# Lấy ra các images được liên kết với profile
images = profile.images

# Cập nhật lại danh sách image được liên kết với profile
profile.images = [Image.create, Image.create] # Vế phải có thể là liệt danh sách các đối tượng Image (profile.images = image1, image2, ...) không nhất thiết phải để dưới dạng mảng

# Lấy ra danh sách id các image được liên kết với profile
image_ids = profile.image_ids

# Cập nhật lại danh sách image được liên kết với profile bằng id của các images
profile.image_ids = [1, 2, 3] # Vế phải có thể là liệt danh sách các id (profile.image_ids = 1, 2, ...) không nhất thiết phải để dưới dạng mảng

# Liên kết thêm đối tượng image cho profile, chúng ta có thể sử dụng 3 phương thức sau:
images = [Image.create, Image.create]
profile.images << images
profile.images.push(images)
profile.images.concat(images) # Với push và concat, chúng ta có thể chỉ cần liệt kê các đối tượng mà không nhất thiết phải để dưới dạng mảng

# Tạo ra một đối tượng Image nhưng chưa lưu vào CSDL
image = profile.images.build

# Tạo ra một đối tượng Image và lưu vào CSDL
profile.images.create
profile.images.create! # raise exception nếu xảy ra lỗi lưu không thành công

# Lấy ra số lượng images được liên kết với profile
images_count = profile.images.size
images_count = profile.images.length
images_count = profile.images.count

# Tính tổng một thuộc tính nào đấy của các image được liên kết với profile
total_view = profile.images.sum(:view)

# Kiểm tra xem có image nào được liên kết với profile hay không
no_image = profile.images.empty?

# Xoá các images được liên kết với profile
profile = profile.images.clear
images = profile.images.delete_all # Trả về các phần tử bị xoá
profile.images.delete(image,image,...)
profile.images.destroy(image,image,...)
profile.images.destroy_all

# Tìm image được liên kết với profile theo điều kiện nào đó
image = profile.images.find(1)
images = profile.images.find(1, 2, 3)

# Kiểm tra xem có image nào được liên kết với profile hay không
profile.images.exists?

# Lấy ra danh sách không trùng lặp các images được liên kết với profile
profile.images.distinct

# Loại bỏ các đối tượng images được liên kết với profile đã lấy ra, sau đó khi gọi profile.products sẽ truy cập đến CSDL để lấy dữ liệu mới
profile.images.reset

# Làm mới các đối tượng images được liên kết với profile theo dữ liệu từ CSDL
profile.images.reload
```

# Kết luận
Trên đây là một số kiến thức mình đã tìm hiểu được về association trong Rails và muốn chia sẻ với các bạn. Nếu có ý kiến hay thắc mắc, hãy comment bên dưới để cùng thảo luận nhé.

Cảm ơn bạn đã quan tâm đến bài viết của mình (h)

# Tham khảo
http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html