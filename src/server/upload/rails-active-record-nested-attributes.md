# 1. Giới thiệu:
- `Nested Attributes` cho phép bạn lưu (create hoặc update) associated record vào database thông qua parent record.
- Theo mặc định thì `Nested Attributes` bị disable, để enable chức năng này ta gọi hàm `accepts_nested_attributes_for` trong model class của parent record.
 
# 2. Nested Attributes cho quan hệ one-to-one (has_one association):
 - Ta chạy migration để tạo 2 model `Member` và `Atatar` như sau:
```
rails g model member name:string
rails g model avatar url:string member:references
```

- Khi đó ta có 2 model `Member` và `Avatar` có quan hệ như sau:
```
class Member < ApplicationRecord
  has_one :avatar
  accepts_nested_attributes_for :avatar
end

class Avatar < ApplicationRecord
  belongs_to :member
end
```

- Thêm `accepts_nested_attributes_for :avatar` vào `memeber.rb` để enable `Nested Attributes` cho model `Member` và `Avatar`.
- `Nested Attributes`sẽ  thêm một `Attribute Writer` là `avatar_attributes` vào model `Member` .
- Khi đó ta có thể `create`, `update` hoặc `delete` avatar thông qua memeber của avatar đó, sử dụng `avatar_attributes`.
  
## a.  Tạo Member và Avatar:
- Ta có thể tạo đồng thời member và avatar của member đó như sau:
```
member = Member.create name: "ThachThao",
                       avatar_attributes: {
                         url: "http://i.pravatar.cc/100?img=1"
                       }
member.id         # 1  
member.name       # ThachThao
member.avatar.id  # 1
member.avatar.url # http://i.pravatar.cc/100?img=1
```
 
- Đối với trường hợp `has_one association`, `avatar_attributes` nhận giá trị là một `hash_attributes` của model `Avatar`.
- Giả sử model `Avatar` có thêm các attributes khác như `file_type`, `file_size` ta có thể tạo member và avatar như sau
```
member = Member.create name: "ThachThao",
                       avatar_attributes: {
                         url: "http://i.pravatar.cc/100?img=1",
                         file_type: "png",
                         file_size: 5
                       }
```
 
## b. Update Member và Avatar:
- Ta có thể update đồng thời member và avatar của member đó như sau:
```
member.update_attributes name: "MaiNgo",
                         avatar_attributes: {
                           id: 1,
                           url: "http://i.pravatar.cc/100?img=2"
                         }
member.id         # 1  
member.name       # MaiNgo
member.avatar.id  # 1
member.avatar.url # http://i.pravatar.cc/100?img=2
```
 
- Trong trường hợp mặc định, ta phải truyền `id` của avatar như một tham số vào `avatar_attributes`, khi không truyền tham số `id`, việc update member và avatar gặp lỗi như sau
```
member.update_attributes name: "Mai Ngo", avatar_attributes: {url: "http://i.pravatar.cc/100?img=2"}
   (0.2ms)  begin transaction
   (0.1ms)  rollback transaction
Traceback (most recent call last):
ActiveRecord::RecordNotSaved (Failed to remove the existing associated avatar. The record failed to save after its foreign key was set to nil.)
```

- Nguyên nhân là đối với trường hợp mặc định `has_one association`, tùy thuộc vào các tham số truyền vào `avatar_attributes` có tham số `id` hay không mà thực hiện việc update hay tạo avatar cho user.
- Khi các tham số truyền vào `avatar_attributes` có tham số `id` thì thực hiện update avatar cho member.
- Khi các tham số truyền vào `avatar_attributes` không có tham số `id` thì thực hiện tạo avatar cho member .

- Nêu bạn muốn thực hiện update cho avatar mà không cần truyền tham số `id`, thêm option `update_only: true` (mặc định là `update_only: false`) vào hàm `accepts_nested_attributes_for :avatar`.
```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end
```

- Thực hiện update avatar của member mà không cần truyền tham số `id` vào `avatar_attributes`.
```
member.update_attributes name: "KathyNguyen",
                         avatar_attributes: {
                           url: "http://i.pravatar.cc/100?img=3"
                         }
member.id         # 1  
member.name       # KathyNguyen
member.avatar.id  # 1
member.avatar.url # http://i.pravatar.cc/100?img=3           
```

## c. Xóa Avatar:
- Theo mặc định, bạn chỉ có thể tạo and update attributes của avatar thông qua member.
- Nếu bạn muốn xóa avatar thông qua `hash_attributes`, bạn phải thêm option `allow_destroy: true` (mặc định là `allow_destroy: false`) vào hàm `accepts_nested_attributes :avatar`.
```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, allow_destroy: true
end
```

- Khi đó để xóa avatar, ta truyền tham số `_destroy` với giá trị tương đương `true` vào `avatar_attributes`.
```
member.update_attributes avatar_attributes: {_destroy: true}
```

# 2. Nested Attributes cho quan hệ one-to-many (has_many association):
 - Ta chạy migration để tạo model `Post` như sau:
```
rails g model post content:text member:references
```

- Khi đó ta có 2 model `Member` và `Post` có quan hệ như sau:
```
class Member < ApplicationRecord
  has_many :posts
  accepts_nested_attributes_for :posts
end

class Post < ApplicationRecord
  belongs_to :member
end
```

- Thêm `accepts_nested_attributes_for :posts` vào `memeber.rb` để enable `Nested Attributes` cho model `Member` và `Post`.
- `Nested Attributes`sẽ  thêm một `Attribute Writer` là `posts_attributes` vào model `Member` .
- Khi đó ta có thể `create`, `update` hoặc `delete` posts thông qua memeber của posts đó, sử dụng `posts_attributes`.

## a.  Tạo Member và Posts:
- Ta có thể tạo đồng thời member và posts của member đó như sau:
```
member = Member.create name: "ThachThao",
                       posts_attributes: [{
                         content: "Friday Post"
                       }, {
                         content: "Saturday Post"
                       }]
member.id                    # 1
member.name                  # ThachThao
member.posts.count           # 2
member.posts.first.content   # Friday Post
member.posts.second.content  # Saturday Post
```

- Đối với trường hợp `has_many association`, `posts_attributes` nhận giá trị là một array của `hash_attributes` của model `Post`.

## b.  Update Member và Posts:
- Ta có thể update đồng thời member và avatar của member đó như sau:
```
member.update_attributes name: "MaiNgo",
                         posts_attributes: [{
                           id: 1,
                           content: "Sunday Post"
                         }, {
                           id: 2,
                           content: "Monday Post"
                         }, {
                           content: "Tuesday Post"
                         }]
member.id                   # 1  
member.name                 # MaiNgo
member.posts.count          # 3
member.posts.first.content  # Sunday Post
member.posts.second.content # Monday Post
member.posts.third.content  # Tuesday Post
```

- Để update posts của member, ta truyền tham số `id` cùng với các attributes khác vào `hash_attributes`, trong trường hợp không truyền tham số `id` vào `has_attributes` thì bài post mới được tạo ra.

## c. Xóa Posts:
- Theo mặc định, bạn chỉ có thể tạo and update attributes của posts thông qua member.
- Nếu bạn muốn xóa posts thông qua `hash_attributes`, bạn phải thêm option `allow_destroy: true` (mặc định là `allow_destroy: false`) vào hàm `accepts_nested_attributes :posts`.
```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, allow_destroy: true
end
```

- Khi đó để xóa posts, ta truyền tham số `id` cùng với tham số `_destroy` giá trị tương đươcng `true` vào `hash_attributes`
```
member.update_attributes posts_attributes: [{
                           id: 1,
                           _destroy: true
                         }, {
                           id: 2,
                           _destroy: true
                         }]
member.id                   # 1
member.posts.count          # 1
member.posts.first.content  # Tuesday Post
```