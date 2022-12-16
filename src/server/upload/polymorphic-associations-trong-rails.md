# Polymorphic Associations là gì? 
Polymorphic Associations là một loại Active Record Association, giúp tạo liên kết giữa 1 `model` với nhiều `model` khác thông qua 1 `association` duy nhất.
# Tại sao nên dùng Polymorphic Associations?
Để chứng minh sự lợi hại của Polymorphic Associations, ta sẽ xét qua bài toán cụ thể sau:
## Bài toán images 
Ví dụ, một User và một bài Product đều có thể có nhiều Images.

![](https://images.viblo.asia/02f68892-06f9-4caf-ae25-d430dfaa146d.png)

Theo cách thông thường, ta tạo ra 2 `association` trong model Image như sau:
``` ruby
class Image < ApplicationRecord
  belongs_to :user
  belongs_to :product
end

class User < ApplicationRecord
  has_many :images
end

class Product < ApplicationRecord
  has_many :images
end
```
Như vậy, bảng `images` sẽ cần phải có foreign key `user_id` và `product_id`. Đó mới chỉ là 2 bảng `users` và `products`, điều gì sẽ xảy ra khi có hàng trăm, ngàn bảng như thế? Số lượng foreign_key `images` cần phải chứa là rất lớn. 
Để giải quyết vấn đề đó, thực chất ta chỉ cần thêm 2 trường vào bảng images, ta gọi đó là: `imageable_type`, `imageable_id`. 
* `imageable_type`: để chứa tên model có images
* `imageable_id`: chứa id của model có images

![](https://images.viblo.asia/91607632-da2d-4c9c-b303-1ed32dd5313d.png)
Rails cho phép làm việc đó với polymorphic như sau: 
``` ruby
class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end

class User < ApplicationRecord
  has_many :images, as: :imageable
end

class Product < ApplicationRecord
  has_many :images, as: :imageable
end
```
Thật là awesome :D Nhưng đó chưa phải là tất cả về polymorphic, ta sẽ tìm hiểu tiếp về nó qua bài toán tiếp theo
## Bài toán comments
Bây giờ, 1 User có thể comments về Product, Post, 1 User khác có thể reply comment của người khác về 1 product hay post. Hmm, có vẻ phức tạp đây :v Cụ thể, ta sẽ có quan hệ như sau:
![](https://images.viblo.asia/1ccc357c-8009-4808-9ed7-5e235df60d91.png)
Khác với bài toán images chỉ gồm 1 vai trò của đối tượng `imageable`, trong bài này ta có 2 vai trò:
* `owner`: Đối tượng tạo ra comment
* `commentable`: Đối tượng được comment 

`owner` ở bài này là User, `commentable` có thể là Post, Product.. và do có thể reply comment, nên Comment cũng có thể đóng vai trò là 1 `commentable` 
Ta sử dụng polymorphic để mô tả bài toán như sau:
``` ruby
class User < ApplicationRecord
  has_many :comments, as: :owner
end

class Product < ApplicationRecord
  has_many :comments, as: :commentable
end

class Post < ApplicationRecord
  has_many :comments, as: :commentable
end

class Comment < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable
end
```
# Cách dùng Polymorphic Associations
Mình sẽ ví dụ về cách dùng cho bài toán images ở trên. 
Để tạo model Image có `imageable`, ta có thể chạy lệnh:
``` ruby
rails g model Image imageable:references{polymorphic}
```
Trong model User và Product, ta lần lượt thêm:
``` ruby
class User < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy
end

class Product < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy
end
```
Sau đó, ta có thể tạo Image bằng cách truyền 1 instance của User hoặc Product vào.
``` ruby
user = User.create name: "Hau Nguyen"
product = Product.create name: "Macbook", desc: "This is a laptop"

Image.create imageable: user, link: "/public/images/user.jpg"
Image.create imageable: product, link: "/public/images/laptop.jpg"
```
Rất đơn giản phải không ;) 
# Kết luận
Hai mục đích chính của việc sử dụng Polymorphic Associations là:
* Giảm số lượng foreign_key
* Với 1 bài toán nhiều vai trò, sẽ có 1 bảng trung gian. Nó giúp làm rõ vai trò của các bảng đến bảng trung gian.

Hi vọng rằng với những gì mình chia sẻ, các bạn sẽ có cái nhìn rõ hơn về Polymorphic Association và có thể áp dụng nó vào project rails của mình. 
# Tài liệu tham khảo
1. https://viblo.asia/p/polymorphic-associations-Eb85ojxkl2G
2. https://guides.rubyonrails.org/association_basics.html#polymorphic-associations
3. https://6ftdan.com/allyourdev/2015/02/10/rails-polymorphic-models/