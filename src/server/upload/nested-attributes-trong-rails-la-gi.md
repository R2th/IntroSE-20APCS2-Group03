# Đặt vấn đề
Dù là Rails beginner thì chắc cũng đã quen và dễ dàng làm việc với form khi cần tạo ra một record với một model riêng lẻ. Vậy nếu mình có 1 `user` có `address` và muốn tạo ra `address` trong form tạo `user` thì sao? Đó là lý do Nested Attributes ra đời. Chúng ta sẽ cùng tìm hiểu kĩ hơn về nó trong bài này nhé :D
# Nested Attributes là gì?
Nested Attributes (Thuộc tính lồng nhau) là một tính năng của Active Record. Nó cho phép lưu bản ghi của đối tượng thông qua đối tượng cha của nó. 

Mặc định, nested attributed không được kích hoạt, ta phải kích hoạt nó bằng class method `#accepts_nested_attributes_for`. 
Khi kích hoạt, 1 attribute writer được định nghĩa trong model. Attribute writer được đặt tên theo `association`. Ví dụ, ta có:
``` ruby
class Book < ActiveRecord::Base
  has_one :author
  has_many :pages

  accepts_nested_attributes_for :author, :pages
end
```

Từ đoạn code trên, 2 attribute writer được tạo ra, đó là: `author_attributes=(attributes)` và `pages_attributes=(attributes)`
# Cách dùng Nested Attributes
## Quan hệ 1-1
Giả sử 1 Member có 1 Avatar
``` ruby
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar
end
```
Dùng Nested Attributes cho quan hệ 1-1 cho phép bạn tạo member và avatar chỉ trong một bước:
```ruby
params = { member: { name: 'Hau Nguyen', avatar_attributes: { icon: 'smiling' } } }
member = Member.create(params[:member])
member.avatar.id # => 2
member.avatar.icon # => 'smiling'
```
Ta cũng có thể update avatar thông qua member:
``` ruby
params = { member: { avatar_attributes: { id: '2', icon: 'sad' } } }
member.update params[:member]
member.avatar.icon # => 'sad'
```

Nếu muốn update avatar hiện tại mà không cần truyền vào id, bạn cần thêm option `:update_only`

``` ruby
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end

params = { member: { avatar_attributes: { icon: 'sad' } } }
member.update params[:member]
member.avatar.id # => 2
member.avatar.icon # => 'sad'
```

Mặc định, bạn chỉ có thể set hay update attributes của model con. Nếu muốn destroy nó thông qua attributes hash, ban cần dùng option `:allow_destroy`.
``` ruby
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, allow_destroy: true
end
```

Sau đó, bạn có thể thêm `_destroy` với giá trị `true` vào attributes hash để destroy model con:
``` ruby
member.avatar_attributes = { id: '2', _destroy: '1' }
member.avatar.marked_for_destruction? # => true
member.save
member.reload.avatar # => nil
```

Model con sẽ không bị destroy cho đến khi model cha được lưu.
## Quan hệ 1-n
Giả sử 1 member có nhiều posts:
``` ruby
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end
```

Bạn có thể set hoặc update attributes của bài post của 1 member thông qua attribute hash
``` ruby
params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '', _destroy: '1' } # this will be ignored
  ]
}}

member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

Sử dụng `:reject_if` để loại bỏ bản ghi không phù hợp với điều kiện đặt ra:
``` ruby
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: proc { |attributes| attributes['title'].blank? }
end

params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '' } # this will be ignored because of the :reject_if proc
  ]
}}

member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

Dùng `:reject_if` với symbol:

``` ruby
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :new_record?
end

class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :reject_posts

  def reject_posts(attributes)
    attributes['title'].blank?
  end
end
```

Tạo 1 mảng nested attributes:
* Cách 1: 
``` ruby
Member.create(
  name: 'joe',
  posts_attributes: {
    first:  { title: 'Foo' },
    second: { title: 'Bar' }
  }
)
```
* Cách 2:
``` ruby
Member.create(
  name: 'joe',
  posts_attributes: [
    { title: 'Foo' },
    { title: 'Bar' }
  ]
)
```
## Một số tùy chọn #accepts_nested_attributes_for

* `:allow_destroy`
* `:reject_if`
* `:limit`
* `:update_only`

Xem chi tiết các option tại [đây](https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html#method-i-accepts_nested_attributes_for)
# Dùng Nested Attributes với field_for helper
Fields_for về cơ bản cũng gần giống form_for là tạo ra một scope xung quanh một đối tượng cụ thể nhưng không tạo ra form_tags chính nó. Vì thế fields_for thích hợp cho việc xác định các model object bổ sung trong cùng form đấy.
Ta sẽ đi giải quyết câu hỏi đặt ra từ đầu bài: Tạo 1 form tạo User và address:

**app/models/user.rb**
``` ruby
class User < ActiveRecord::Base
  has_one :address
  accepts_nested_attributes_for :address
end
```

**app/models/address.rb**
``` ruby
class Address < ActiveRecord::Base
  belongs_to :user
end
```

Tạo form thêm mới:
**app/views/user/new.html.erb**
``` ruby
<%= form_for @user do |f| %>

  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.fields_for :address do |add| %>
    <%= add.label :street %>
    <%= add.text_field :street %>
    <%= add.label :city %>
    <%= add.text_field :city %>
    <%= add.label :nation %>
    <%= add.text_field :nation %>
  <% end %>

  <%= f.submit "Save" %>
<% end %>
```

Tạo Controller:
**app/controllers/users_controller.rb**
``` ruby
class UsersController < ApplicationController
  def new
    @user = User.new
    @user.build_address unless @user.build_address.present?
  end

  def create
    @user = User.new user_params
    if @user.save
      flash[:success] = "Created success!"
      redirect_to root_path
    else
      flash[:error] = "Created failed!"
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit :name, address_attributes: [:street, :city, :nation]
  end
end
```

Như vậy là đã hoàn thành form ta mong muốn rồi :v 
# Tài liệu tham khảo
1. https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
2. https://medium.com/@mindovermiles262/triple-nested-forms-in-rails-dedbcccb5799