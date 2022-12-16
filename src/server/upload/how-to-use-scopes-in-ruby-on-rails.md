# Giới thiệu

Scope trong Ruby là gì? Tại sao chúng ta nên sử dụng nó?

Scope là việc bận custom các câu truy vấn, được định nghĩa trong các model của Rails với method scope.

Mỗi scope có 2 tham số:

- Một tên(name), cái mà bạn sẽ gọi nó trong code khi cần sử dụng scope
- Một lambda, để thực thi câu truy vấn

Ví dụ:

```
class Fruit < ApplicationRecord
  scope :with_juice, -> { where("juice > 0") }
end
```

Kết quả của việc gọi scope này là một đối tượng ActiveRecord::Relation. Điều này có nghĩa rằng bạn có thể gọi các scope liên tiếp nhau. Ví dụ:

```
Fruit.with_juice.with_round_shape.first(3)
```

# Khi nào nên sử dụng scope

Hãy cùng xem ví dụ:

```
def index
  @books = Book.where("LENGTH(title) > 20")
end
```

Đây là đoạn code trong action index của controller, để hiển thị danh sách các quyển sách có độ dài tiêu đề lớn hơn 20 kí tự.

Nhưng nếu bạn muốn sử dụng câu truy vấn này ở một nơi khác, bạn sẽ bị dupplicate code. Dupplicate code dẫn đến dự án rất khó để maintain. Hãy cùng nhau chuyển câu truy vấn này vào trong scope.

Như sau:

```
class Book
  scope :with_long_title, -> { where("LENGTH(title) > 20") }
end
```

Bây giờ, trong controller chỉ việc gọi:

```
def index
  @books = Book.with_long_title
end
```

# How to Use Rails Scopes With Arguments

Có những trường hợp, bạn muốn truyền biến vào trong một scope để làm cho scope trở nên linh hoạt hơn:

```
class Book
  scope :with_long_title, ->(length) { where("LENGTH(title) > ?", length) }
end
```

Nếu bạn muốn có một giá trị default cho tham số:

```
class Book
  scope :with_long_title, ->(length = 20) { where("LENGTH(title) > ?", length) }
end
```

# Scope hay Instance Method

Scope cũng có những giới hạn của nó, nó không phải là chìa khóa vạn năng có thể giải quyết được nhiều vấn đề, bởi đơn giản, chúng chỉ là những method. Trên thực tế, bạn có thể làm những việc tương tự scope bằng cách sử dụng class method.

```
class Fruit
  def self.with_juice
    where("juice > 0")    
  end
end
```

Nhưng có nhiều lợi ích của việc sử dụng scope hơn là các class method:

- Scope làm code clean hơn bởi chính cú pháp của chúng.
- Scope thực hiện duy nhất một điều gì đó, nên khi đọc code bạn dễ dàng nắm bắt được đang làm vấn đề gì
- Scope không trộn lẫn được với những method khác nên chúng dễ dàng được nhận ra

Về chức năng, thì scope chỉ có một khác biệt duy nhất với class method, là scope luôn đảm bảo kết quả trả về là một ActiveRecord::Relation, còn class method thì không.

# Đừng sử dụng default scope

Một default scope là một scope sẽ được tự động thực hiện trong model của bạn. Ví dụ:

```
class Post
  default_scope { where(published: true) }
end
```

Default scope trông khá thú vị, nhưng không nên sử dụng chúng, bởi vì bạn có thể quên rằng chúng tồn tại, gây ra các lỗi tiềm ẩn, và mất thời gian để điều tra các lỗi phát sinh. Nếu bạn phải làm việc với default scope, có thể bạn sẽ cần sử dụng method unscoped để disable tất cả các scope đã apply hiện tại.


Source:

https://www.rubyguides.com/2019/10/scopes-in-ruby-on-rails/?tl_inbound=1&tl_target_all=1&tl_period_type=1