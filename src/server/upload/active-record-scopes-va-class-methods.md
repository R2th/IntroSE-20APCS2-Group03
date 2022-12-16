Khi làm việc với Rails framework, hẳn bạn đã không ít lần sử dụng đến scope cũng như class method. Mình làm việc với scope và class method cũng khá nhiều, và đã từng thắc mắc rằng "Hự, 2 thằng này dùng thay cho nhau được, thế sao sinh ra làm qué gì cả 2 cái cho nó phức tạp nhể?". Tuy nhiên sau khi tìm hiểu lại thì mình thấy rằng vẫn có 1 số điểm khác biệt giữa scope và class method.
# Định nghĩa một scope
Trước tiên, mình sẽ nhắc lại một chút về scope nhé. Trong Rails 3, ta có thể định nghĩa scope bằng 2 cách như sau:
```ruby
class Post < ActiveRecord::Base
  scope :published, where(status: 'published')
  scope :draft, -> { where(status: 'draft') } 
end
```
Sự khác biệt chính giữa 2 cách trên là điều kiện của scope `:published` được đánh giá ngay khi class `Post` được load lần đầu tiên, còn điều kiện của scope `:draft` thì sẽ được đánh giá mỗi lần mà nó được gọi đến.

Và cách làm đầu tiên đã bị loại bỏ từ Rails 4, có nghĩa là bạn luôn phải định nghĩa scope với đối số là một đối tượng có thể gọi đến được. Điều này giúp tránh gặp phải các vấn đề khi khai báo scope sử dụng thời gian làm tham số:
```ruby
class Post < ActiveRecord::Base
  scope :published_last_hour, where('published_at >= ?', 1.hour.ago)
end
```
Nếu khai báo như trên, mốc thời gian `1.hour.ago` sẽ được đánh giá khi class được load lần đầu, và do đó không đảm bảo rằng khi scope được gọi ra giá trị trả về sẽ giống như mong muốn.
# Scope cũng chỉ là class method mà thôi
Bạn có để ý rằng cách bạn gọi ra scope cũng giống như cách mà bạn gọi ra class method?? Chính xác đấy ạ. Nếu bạn chọc vào core để xem cách mà Active Record triển khai 1 scope, bạn sẽ thấy được rằng thực chất scope cũng chỉ là class method mà thôi: `singleton_class.send(:define_method, name)`
```ruby
def scope(name, body, &block)
  unless body.respond_to?(:call)
    raise ArgumentError, "The scope body needs to be callable."
  end

  if dangerous_class_method?(name)
    raise ArgumentError, "You tried to define a scope named \"#{name}\" " \
      "on the model \"#{self.name}\", but Active Record already defined " \
      "a class method with the same name."
  end

  valid_scope_name?(name)
  extension = Module.new(&block) if block

  if body.respond_to?(:to_proc)
    singleton_class.send(:define_method, name) do |*args|
      scope = all.scoping { instance_exec(*args, &body) }
      scope = scope.extending(extension) if extension

      scope || all
    end
  else
    singleton_class.send(:define_method, name) do |*args|
      scope = all.scoping { body.call(*args) }
      scope = scope.extending(extension) if extension

      scope || all
    end
  end
end
```
Vậy thì sinh ra scope làm qué gì nhì??? Sao không dùng mọe luôn class method đi???
# Scope có tính chất chainable
Ví dụ nhé, người dùng muốn lọc ra các bài viết theo `status` và sắp xếp thứ tự bài viết sao cho bài viết mới được cập nhật sẽ lên đầu danh sách. Viết thử scope nhé:
```ruby
class Post < ActiveRecord::Base
  scope :by_status, -> status { where(status: status) }
  scope :recent, -> { order("posts.updated_at DESC") }
end
```
Và chúng ta có thể gọi ra như sau:
```ruby
Post.by_status(params[:status]).recent
```
(ngon)

Vậy thử chuyển các scope trên thành class method nào:
```ruby
class Post < ActiveRecord::Base
  def self.by_status(status)
    where(status: status)
  end
  
  def self.recent
    order("posts.updated_at DESC")
  end
end
```
Ố kề. Chỉ là dài hơn 1 vài dòng thôi, đoạn code của chúng ta vẫn chạy ổn.

Nhưng mình lại chỉ muốn chạy filter `status` chỉ khi mà `params[:status]` không có giá trị là `nil` hay `blank` thôi thì sao?
```ruby
Post.by_status(nil).recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" IS NULL  ORDER BY posts.updated_at DESC

Post.by_status('').recent
# SELECT "posts".* FROM "posts" WHERE "posts"."status" = ''  ORDER BY posts.updated_at DESC
```
Óe. Nhìn cái điều kiện của `status` kìa. Giá trị trả về hơm như mình mong muốn.

OK, với scope ta có thể xử lý như sau:
```ruby
scope :by_status, -> status { where(status: status) if status.present? }
```
Thử lại xem:
```ruby
Post.by_status(nil).recent
# SELECT "posts".* FROM "posts" ORDER BY posts.updated_at DESC

Post.by_status('').recent
# SELECT "posts".* FROM "posts" ORDER BY posts.updated_at DESC
```
Tuyệt vời ông mặt trời.. Thử sửa cho class method nhé:
```ruby
def self.by_status(status)
    where(status: status) if status.present?
end
```
Trông có vẻ ổn, huh? Chạy thử nhé:
```ruby
Post.by_status('').recent
# NoMethodError: undefined method `recent' for nil:NilClass
```
Lỗi cmnr. (khoc)

Sự khác biệt là ở đây. `scope` luôn trả về một ActiveRecord Relation, mà `class method` thì không. Để cho class method chạy đúng thì phải sửa lại như sau:
```ruby
def self.by_status(status)
  if status.present?
    where(status: status)
  else
    all
  end
end
```
Chạy lại nhé:
```ruby
Post.by_status('').recent
# SELECT "posts".* FROM "posts" ORDER BY posts.updated_at DESC
```
Ngon roài... Vậy bài học rút ra là: với các class method mà bạn muốn hoạt động như scope, hãy trả về relation để giữ tính chainable cho nó nhé. Và cố gắng đừng làm mất tính chainable của scope nhé (ví dụ dùng `pluck`).
# Scope có thể mở rộng được
Phần này, mình sẽ lấy ví dụ là tính năng phân trang nhé.

Điều cần nhất khi triển khai phân trang cho tập kết quả là truyền vào trang mà bạn muốn lấy dữ liệu đúng không nào:
```ruby
posts = Post.page(3)
```
Và bạn cũng có thể chỉ định rằng bạn muốn lấy ra bao nhiêu bản ghi trên 1 trang dữ liệu:
```ruby
posts = Post.page(3).per(15)
```
Tuy nhiên, bạn lại muốn biết là với cách phân chia như thế thì bạn sẽ có bao nhiêu trang dữ liệu? Hay muốn kiểm tra là bạn đang ở trang đầu, hoặc trang cuối?
```ruby
posts = Post.page(3)
posts.total_pages # => 2
posts.first_page? # => false
posts.last_page?  # => true
```
Bạn thấy đấy, những thứ trên chỉ có ý nghĩa khi gọi từ 1 collection đã được phân trang thôi, đúng hơm nà? Vậy khi viết scope, bạn có thể bổ sung 1 số phần mở rộng mà chỉ gọi được khi scope được gọi rồi:
```ruby
scope :page, -> num {
  # Code logic xử lý offset và limit để phân trang
} do
  def per(num)
    # Thêm code ở đây nè
  end
  
  def total_pages
    # Bổ sung thêm code ở đây nữa nà
  end
  
  def first_page?
    # Lại thêm code nà
  end
  
  def last_page?
    # Code nữa nà
  end
end
```
Thật là mạnh mẽ và linh động biết bao (ngon). Đương nhiên, chúng ta vẫn có thể triển khai bằng class method:
```ruby
module PaginationExtensions
  def per(num)
    # Thêm code nè
  end
  
  def total_pages
    # Lại thêm code nữa nà
  end
  
  def first_page?
    # Thêm code tiếp nà
  end
  
  def last_page?
    # Code tiếp nà
  end
end

def self.page(num)
  scope = # Code logic xử lý offset và limit để phân trang
  scope.extend PaginationExtensions
  scope
end
```
Đó, tuy là nó vẫn hoạt động như mình triển khai bằng scope nhưng mà rườm rà vãi chưởng. Vậy nên, hãy chọn cách làm nào mà bạn cảm thấy tự tin nhất nhưng hãy biết tận dụng những gì mà framework cung cấp cho bạn, đừng "reinvent the wheel" nếu không cần thiết nhé.

*Tham khảo: http://blog.plataformatec.com.br/2013/02/active-record-scopes-vs-class-methods/*