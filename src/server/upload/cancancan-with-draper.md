Draper và CanCanCan chắc hẳn sẽ là hai cái tên không phải xa lạ gì đối với những developer Ruby on Rails. Nói qua một chút về hai gem rất mạnh mẽ này.
## Draper
Draper được sử dụng để tạo ra một object có đầy đủ những method cần thiết nhằm hạn chế tối đa việc sử dụng logic ngoài view. Một decorator class sẽ được tự động map với một model có tên tương ứng. Ví dụ `UserDecorator` sẽ map với model `User`. Tất cả những method được thêm vào `UserDecorator` đều phải dựa trên những method hiện tại của `User`. Khi muốn sử dụng một decorator object, đơn giản ta chỉ cần gọi method `decorate` từ object hiện tại.
```
pry(main)>  user = User.new
=> #<User:0x00007ffa254d2340>
pry(main)>  user_decorator = user.decorate
=> #<UserDecorator:0x00007ffa252dcf68>
pry(main)>  user_decorator.object.equal? user
=>  true
```
Khi gọi method `decorate` thì Draper sẽ trả về một decorator object tương ứng. Hơn thế nữa ta có thể thấy decorator object này sẽ luôn trỏ đến object ban đầu, như trong trường hợp này là `user_decorator` và `user`. Khi sử dụng thực tế, các object chỉ thực sự được decorated ở ngoài view còn ở controller thì không. Điều này để tránh những lỗi phát sinh khi nhầm lẫn việc thao tác giữa `model object` và `decorator object`.
## CanCanCan
`CanCanCan` là một gem rất mạnh mẽ được sử dụng để phân quyền ứng dụng. Nó cung cấp những method để xây dựng các permission tương tứng với từng role của người dùng, cùng với đó là các helper method được sử dụng ngoài view. Tất cả các permission có thể được định nghĩa trong một class `Ability` duy nhất.
## Work Together
Cả hai đều rất tuyệt vời nhưng khi chúng làm việc cùng nhau ở ngoài view thì không hẳn là như thế. Chúng ta xét một ví dự sau để thấy rõ hơn điều này. Chúng ta có hai model `User` và `Comment`

```
class User < ApplicationRecord
  has_many :comments
end

class Comment < ApplicationRecord
  belongs_to :user
  
  validates :content, presence: true
end
```
Để thuận tiện thì ta sẽ không show toàn bộ content của một comment ra mà sẽ chỉ show một phần rút gọn của nó. Lúc này sẽ có giải pháp có thể là viết thêm method `excerpt` vào model `Comment`, nhưng điều này là không cần thiết vì method đó chỉ được sử dụng ở ngoài view và việc này lâu dần sẽ làm cho model `Comment` ngày càng bị phình to ra. Khi này ta nghĩ ngay đến việc sử dụng một class `CommentDecorator` thay thế, method `excerpt` sẽ cắt `content` với một số lượng các từ tùy ý.
```
class CommentDecorator < Draper::Decorator
  delegate_all

  def excerpt
    content.first Settings.comment.content.excerpt
  end
end
```

Trong file ability.rb chúng ta định nghĩa như sau:
```
class Ability
  include CanCan::Ability
  
  def initialize current_user
    current_user ||= User.new
    
    can :manage, Comment do |comment|
      comment.user == current_user
    end
  end
end
```
Khi đó một `user` chỉ có thể thao tác trên những `comment` của chính mình.
Để đơn giản và dễ hình dung, khi show ra các `comments` trên trang `index` mình sẽ xử lý như sau:
```
<% @comments.decorate.each do |comment| %>
  <div><%= comment.excerpt %></div>
  <div class="read-more"><%= t ".read_more" %></div>
  <% if can? :edit, comment %>
    <%= link_to t(".edit_comment"), edit_comment_path(comment) %>
  <% end %>
<% end %>
```
Mọi thứ nhìn có vẻ ổn, chúng ta mong muốn sẽ hiển thị ra link edit tương ứng với những `comment` của `user` hiện tại. Tuy nhiên kết quả chúng ta nhận được là không có bất cứ link nào được hiển thị ra cả. Bởi vì biểu thức điều kiện `can? :edit, comment` trong trường hợp này luôn trả về `false`.
Lý do là vì object `comment` mà chúng ta truyền vào method `can?` ở trên thực ra là một `CommentDecorator` object. `CanCanCan` khi đó tất nhiên sẽ kiểm tra trong `Ability` và nó không thấy bất cứ chỗ nào định nghĩa permission cho các object của `CommentDecorator` cả nên mặc định method `can?` sẽ trả về `false`.

Để giải quyết điều này đơn giản chúng ta chỉ cần thay đổi một chút ở biểu thức điều kiện trên, thay vì `can? :edit, comment` thì chúng ta sẽ kiểm tra `can? :edit, comment.object`. Mọi thứ hoạt động bình thường nhưng nhiều trường hợp ở ngoài view chúng ta có thể sẽ nhầm lẫn giữa một `model object` với một `decorator object`.
Vì thế cách giải quyết triệt để vấn đề này là chúng ta sẽ overide lại method `can?` trong module `CanCan::Ability`. Trong class Ability chúng ta thêm vào đoạn code:
```
class Ability
  include CanCan::Ability
  
  def can? action, subject, *extra_args
    if subject.is_a? Draper::Decorator
      super action, subject.object, *extra_args
    else
      super
    end
  end
  
  ----
end
```
Đến đây mọi thứ sẽ làm việc đúng theo ý chúng ta muốn và khi kiểm tra
`can? :edit, comment` hay `can? :edit, comment.decorate` lúc này sẽ luôn cho ra cùng một kết quả.
## Summary
Trên đây chúng ta đã đi tìm hiểu về hai gem rất mạnh mẽ và được sử dụng phổ biến khi làm việc với Ruby on Rails. Hi vọng bài viết sẽ giúp các bạn hiểu rõ hơn về hai gem rất tuyệt vời này cũng như cách để chúng có thể làm việc hiệu quả cùng nhau.