## Delegate và cách sử dụng
`delegate` cung cấp cho chúng ta một class method giúp ta có thể dễ dàng gọi tới public methods của object khác như là gọi các method của chính nó. Hiểu đơn giản là thông qua delegate, bạn có thể sử dụng các public method của object khác một cách trực tiếp.

Ví dụ, tôi có 2 model Employee và Company
```ruby
Class Comment < ActiveRecord::Base
  belongs_to :post 
end

Class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
end
```

Nếu tôi muốn lấy tên của user tạo ra bài post chứa comment đầu tiên, tôi có thể viết là:
```ruby
comment = Comment.first
comment.post.user.name
```

Như bạn thấy, nó khá là dài dòng. Thay vì việc phải lấy object thông qua các model association, chúng ta có thể sử dụng delegate để đơn giản hóa việc này:
```ruby
Class Comment < ActiveRecord::Base
  belongs_to :post 
  delegate :user, to: :post
end
```
Rồi lấy ra user bằng cách:
```ruby
comment = Comment.first
comment.user.name
```

## Các options
### `:to`

Sau `:to` là object mà bạn muốn sử dụng public methods
VD:
```ruby
delegate :title, :content, to: :post
```

### `:prefix`

Dùng để quy định tên method của đối tượng delegate tới
VD:
Nếu đặt `prefix: true`:
```ruby
delegate :title, :content, to: :post, prefix: true
```
Thì method được gọi tới sẽ là `post_title` và 'post_content'.

Ta cũng có thể tùy chỉnh tên method, ví dụ:
```ruby
delegate :title, :content, to: :post, prefix: news
```
thì method được gọi tới sẽ là 'news_title' và 'news_content'.

### `:allow_nil`
Nếu được set bằng true, trả về nil thay vì NoMethodError khi target của method là nil
VD:
```ruby
delegate :title, to: :post, prefix: true, allow_nil: true
```
Bình thường nếu không có post thì khi ta gọi đến method 'post_title' sẽ báo lỗi NoMethodError.
Nhưng nếu ta thêm option allow_nil thì kết quả trả về sẽ là `nil`.

Tham khảo:
https://medium.com/@pk60905/using-delegate-in-rails-527332da7f96
https://apidock.com/rails/Module/delegate