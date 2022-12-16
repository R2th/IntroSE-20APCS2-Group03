Nếu ai đã và đang học Ruby on Rails cũng sẽ được biết về scope và class method. Tuy rằng cả 2 không có nhiều sự khác biệt nhưng trong bài viết này mình muốn chỉ ra một vài điểm khác biệt giữa scope và class method trong rails.
# Định nghĩa Scope # 
> Adds a class method for retrieving and querying objects. The method is intended to return an ActiveRecord::Relation object, which is composable with other scopes. If it returns nil or false, an all scope is returned instead.

Bản chất nó là 1 **class method** và dùng để lấy và truy vấn các **object**. Các phương thức sẽ trả về object *ActiveRecord::Relation*, có thể kết hợp với các scope khác. Nếu nó trả về nil hoặc false, thay vào đó, tất cả scope sẽ được trả về.

**Cách sử dụng scope:**
``` ruby
  scope :draft, -> { where(status: 'draft') } 
```
Nó sẽ trả về các object có status là `draft`
# Scope cũng là class method
Bản thân *ActiveRecord* đã chuyển đổi **scope** thành **class method**. Về mặt khái niệm, thực hiện trong rails đơn giản như sau:

``` ruby
def self.scope(name, body)
  singleton_class.send(:define_method, name, &body)
end
```
Giống như một **Class method** cùng với `name` và `body`. Giống như sau:
```
def self.published
  where status: "published"
end
```

Nếu **Scope** cũng là **Class method** thì tại sao lại sử dụng Scope? Sau đây là vài điểm khác biệt giữa **Scope** và **Class method**

# Scope luôn luôn gọi liên tiếp được
Ở ví dụ sau, người dùng sẽ có thể lọc các bài đăng theo trạng thái, sắp xếp theo thứ tự được cập nhật gần đây nhất. Hãy viết scope cho query đó:
```ruby
class Post < ActiveRecord::Base
  scope :by_status, ->status{where(status: status)}
  scope :recent, ->{order("posts.updated_at DESC")}
end
```
chúng ta có thể gọi chúng một cách thoải mái như sau:
```
Post.by_status('published').recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" = 'published' 
#   ORDER BY posts.updated_at DESC
```
hoặc thông qua params
```ruby
Post.by_status(params[:status]).recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" = 'published'
#   ORDER BY posts.updated_at DESC
```
Hãy thử viết bằng **Class method** và so sánh với **Scope**
```ruby
class Post < ActiveRecord::Base
  class << self
    def by_status status
      where status: status
    end

    def recent
      order "posts.updated_at DESC"
    end
  end
end
```
Cùng xem vấn đề xảy ra của chúng ta là gì khi sử dụng với status là **nil** hoặc **blank?**
```ruby
Post.by_status(nil).recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" IS NULL 
#   ORDER BY posts.updated_at DESC

Post.by_status('').recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" = '' 
#   ORDER BY posts.updated_at DESC
```
Class method vẫn hoạt động ổn. Nhưng mình nghĩ rằng không nên cho phép việc query dữ liệu với 2 điều kiện trên. Chúng ta thay đổi scope đã định nghĩa bên trên một chút như sau:
```ruby
scope :by_status, -> status { where(status: status) if status.present? }
```
Thử lại với scope:
```ruby
Post.by_status(nil).recent
# SELECT "posts".* FROM "posts" ORDER BY posts.updated_at DESC

Post.by_status('').recent
# SELECT "posts".* FROM "posts" ORDER BY posts.updated_at DESC
```
Hãy thử ví dụ trên với Class method
```ruby
class Post < ActiveRecord::Base
  def self.by_status(status)
    where(status: status) if status.present?
  end
end
```
Kết quả:
```ruby
Post.by_status('').recent
NoMethodError: undefined method `recent' for nil:NilClass
```
Có sự khác nhau ở đây. Scope thì luôn luôn trả về một ActiveRecord Relation, trong khi class method thì không hoạt động. Để class method hoạt động được, chúng ta thay đổi một chút như sau:
```ruby
  class << self
    def by_status status
      if status.present?
        where status: status
      else
        all
      end
    end
  end
```
Lời khuyên ở đây là: Không nên trả về giá trị `nil` với class method, có thể gây chết app của bạn vì nó trả về exception thay vì 1 *ActiveRecord::Relation*
# Scope có thể mở rộng
Ở đây mình lấy ví dụ về scope với sử dụng Gem Kaminari để phân trang. 
```ruby
Post.page(2)
```
Lấy cụ thể bao nhiêu bản ghi trên 1 trang:
```
Post.page(2).per(15)
```
Và bạn có thể biết tổng số trang hoặc bạn đang ở trang đầu hay trang cuối:
```
posts = Post.page(2)
posts.total_pages # => 2
posts.first_page? # => false
posts.last_page?  # => true
```
Điều này có ý nghĩa khi chúng ta gọi chúng theo thứ tự, nhưng cũng chẳng có ý nghĩa gì cả khi gọi những methods đó chưa phần trang. Khi viết scope, chúng ta có thể thêm các thành phần mở rộng bên trong scope và những thành phần mở rộng này chỉ có tác dụng với object nếu như scope được gọi. Trong trường hợp của kaminari, các thành phần mở rộng được gọi khi mà page được gọi. Chúng ta có thể mô tả lại bằng code như sau:
```ruby
scope :page, -> num { # some limit + offset logic here for pagination } do
  def per(num)
    # more logic here
  end

  def total_pages
    # some more here
  end

  def first_page?
    # and a bit more
  end

  def last_page?
    # and so on
  end
end
```
Scope extensions là một kỹ thuật mạnh mẽ và linh hoạt cần có. Nhưng tất nhiên, chúng ta luôn có thể tự nhiên và có được tất cả những điều đó với các class method:
```ruby
def self.page(num)
  scope = # some limit + offset logic here for pagination
  scope.extend PaginationExtensions
  scope
end
```
```ruby
module PaginationExtensions
  def per(num)
    # more logic here
  end

  def total_pages
    # some more here
  end

  def first_page?
    # and a bit more
  end

  def last_page?
    # and so on
  end
end
```
# Kết luận
Cá nhân ưu tiên sử dụng Scope khi logic rất nhỏ, đối với các mệnh đề/lệnh đơn giản và các class method khi nó phức tạp hơn một chú. Sử dụng scope nhiều hơn khi thực hiện các extension mở rộng nhiều hơn, vì đó là tính năng mà Active Record đã cung cấp cho chúng ta miễn phí.

Mình nghĩ điều quan trọng là phải làm rõ sự khác biệt chính giữa scope và class method, để bạn có thể chọn công cụ phù hợp cho công việc hoặc công cụ giúp bạn thoải mái hơn. Cho dù bạn sử dụng cái này hay cái khác, mình không nghĩ nó thực sự quan trọng, miễn là bạn viết chúng rõ ràng và nhất quán trong suốt project của bạn.

Nguồn bài viết: http://blog.plataformatec.com.br/2013/02/active-record-scopes-vs-class-methods/