Tôi không chắc liệu mọi người có cần thêm một bài đăng nữa về các truy vấn N + 1 trong Ruby on Rails hay không. Để bù đắp cho vấn đề chủ đề sáo rỗng, tôi sẽ mô tả các giải pháp ít phổ biến hơn cho vấn đề này. Đọc tiếp nếu bạn muốn tìm hiểu cách giảm số lượng truy vấn SQL N + 1 xếp tầng mà không cần sử dụng includes hoặc các table join operations.

### Tổng quan về N + 1 truy vấn

Các truy vấn N + 1 là sát thủ hiệu suất hàng đầu cho các ứng dụng Rails. ActiveRecord làm cho việc sử dụng sai cấu trúc cơ sở dữ liệu của bạn trở nên quá dễ dàng. Hãy xem xét đoạn mã sau:

```ruby
# app/models/post.rb

class Post < ApplicationRecord
  belongs_to :user

  def author_name
    user.name
  end
end

# app/models/user.rb

class User < ApplicationRecord
  has_many :posts
end

# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  def index
    @posts = Post.published
  end
end
```

app/views/posts/index.html.erb:

```ruby
<ul>
  <% @posts.each do |post| %>
    <li>
      <%= post.title %>
      <%= post.author_name %>
    </li>
  <% end %>
</ul>
```

Với cách triển khai ở trên, bạn sẽ thấy các truy vấn SQL sau trong log của mình:

```ruby
Post Load SELECT "posts".* FROM "posts" WHERE "state" = "published"
  User Load SELECT "users".* FROM "users" WHERE "users"."id" = 1 LIMIT 1
  User Load SELECT "users".* FROM "users" WHERE "users"."id" = 2 LIMIT 1
  User Load SELECT "users".* FROM "users" WHERE "users"."id" = 3 LIMIT 1
  ...
```

Truy vấn SQL do người dùng tải bổ sung được tạo cho mỗi bài đăng được tải. Vì ActiveRecord cần dữ liệu bổ sung từ một bảng khác để hiển thị trang nên nó sẽ chạy ngầm các truy vấn đó. Nếu bạn đang tải hàng chục đối tượng, một yêu cầu duy nhất có thể tạo ra hàng trăm truy vấn SQL làm quá tải cơ sở dữ liệu của bạn và giảm mạnh hiệu suất của trang web.

Để khắc phục, bạn sẽ phải thay đổi mã của controller của mình để sử dụng cái gọi là eager loading:

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.published.includes(:user)
  end
end
```

Kết quả là bạn sẽ thấy các log SQL sau:

```ruby
 Post Load SELECT "posts".* FROM "posts" WHERE "state" = "published"
 User Load SELECT "users".* FROM "users" WHERE "users"."id" IN (...)
```

Bạn sẽ nhận thấy rằng bất kể số lượng đối tượng là bao nhiêu, hiện chỉ có hai truy vấn được tạo. Một câu tìm nạp tất cả các bài đăng được yêu cầu, câu còn lại tìm nạp người dùng của nó.

Có nhiều phương pháp hơn có sẵn để tải trước các đối tượng ActiveRecord. Bạn có thể xem bài đăng trên [blog này](https://scoutapm.com/blog/activerecord-includes-vs-joins-vs-preload-vs-eager_load-when-and-where) để biết thêm chi tiết về sự khác biệt giữa các phép nối, bao gồm, tải trước và háo hức.

### Theo dõi các vấn đề N + 1 trên production

Bây giờ chúng ta đã biết N + 1 truy vấn là gì, hãy thảo luận cách xác định những truy vấn đáng sửa. Tốt nhất, bạn nên theo dõi mọi truy vấn không cần thiết và tối ưu hóa nó. Đối với các chức năng hiếm khi được sử dụng, nó không phải lúc nào cũng xứng đáng với thời gian và nỗ lực của bạn.

Bạn có thể bắt đầu nghiên cứu liên quan đến hiệu suất với ScoutAPM. Họ cung cấp tổng quan hữu ích về N + 1 vấn đề có tác động thực tế đến hiệu suất của ứng dụng:

![](https://images.viblo.asia/637103c0-275a-4329-b852-50aa420a0c69.png)

Đảm bảo bật thiết bị đo đạc tự động ScoutAPM bằng cách đặt biến ENV sau:

```ruby
SCOUT_AUTO_INSTRUMENTS=true
```

Với cài đặt này, bạn có thể theo dõi nguồn gốc của N + 1 truy vấn của mình từ dòng mã duy nhất chịu trách nhiệm.

Ngoài ra, bạn có thể sử dụng gem Bullet phổ biến. Một nhược điểm là nó có thể khiến bạn choáng ngợp với dữ liệu về tất cả các chức năng bị ảnh hưởng bởi vấn đề N + 1. Bạn sẽ phải chọn ra những điểm nghẽn thực sự đáng để sửa chữa.

Bây giờ chúng ta đã đề cập đến các khái niệm cơ bản, hãy thảo luận về các giải pháp phi tiêu chuẩn đã hứa cho vấn đề N + 1.

### Lưu cache và sử dụng lại các truy vấn trùng lặp

Phát hiện các kết quả truy vấn có thể tái sử dụng là vô giá trong việc tối ưu hóa hiệu suất của ứng dụng của bạn. Hãy xem xét ứng dụng có cấu trúc sau:

![](https://images.viblo.asia/64ffed61-f314-4809-9a9a-5e4794dc3acf.png)

Bài viết có nhiều Bình luận thuộc về Người dùng. Giả sử rằng chúng tôi có một trang mà chúng tôi muốn hiển thị dữ liệu và bài đăng của người dùng kèm theo nhận xét.

app / controllers / posts_controller.rb:

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.published.includes(comments: :user)
    @users = User.active
  end
end
```

app/views/posts/index.html.erb:

```ruby
<div>
  <% @users.each do |user| %>
    <div>
      <%= user.nickname %>
      <%= user.email %>
    </div>
  <% end %>

  <% @posts.each do |post| %>
    <div>
      <%= post.title %>
      <%= post.content %>
      <%= post.comments.each do |comment| %>
        <%= comment.content %>
        <%= comment.user.nickname %>
      <% end %>
    </div>
  <% end %>
</div>
```

Đoạn mã trên đã sẵn sàng tải tất cả dữ liệu được yêu cầu và sẽ tạo ra bốn truy vấn. Một để tải bài đăng, một cho nhận xét và hai để tải dữ liệu của người dùng.

Giả sử rằng dữ liệu của người dùng được tải bởi hai truy vấn là giống hệt nhau, chúng tôi có thể viết lại ví dụ trên theo cách sau:

app/controllers/posts_controller.rb:

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.published.includes(:comments)
    @users = User.active
    @users_cache = @users.reduce({}) do |agg, user|
      agg[user.id] = user
      agg
    end
  end
end
```

app/views/posts/index.html.erb:

```ruby
<div>
  <% @users.each do |user| %>
    <div>
      <%= user.nickname %>
      <%= user.email %>
    </div>
  <% end %>

  <% @posts.each do |post| %>
    <div>
      <%= post.title %>
      <%= post.content %>
      <%= post.comments.each do |comment| %>
        <%= comment.content %>
        <%= @users_cache.fetch(comment.user_id).nickname %>
      <% end %>
    </div>
  <% end %>
</div>
```

Bạn hiển thị dữ liệu người dùng của nhận xét từ một biến phiên bản @users_cache được tạo từ dữ liệu được tìm nạp bởi một truy vấn duy nhất. Cách tiếp cận này sẽ cắt một truy vấn Người dùng không cần thiết trong khi vẫn tránh được vấn đề N + 1.

Đảm bảo luôn đo lường kết quả của các lần tái cấu trúc tương tự trong môi trường production. Trong ví dụ cụ thể này, chúng ta đã xóa một truy vấn bổ sung. Tuy nhiên, có thể việc xây dựng băm @cached_users có thể chậm hơn so với việc tìm nạp dữ liệu trùng lặp bằng SQL.

Tôi hiểu rằng ví dụ trên có vẻ hơi phức tạp. Tuy nhiên, trong các ứng dụng Rails lâu đời, không có gì lạ khi tìm nạp các mô hình lồng nhau khác nhau có quan hệ phụ thuộc lẫn nhau để hiển thị chế độ xem HTML phức tạp hơn.

Bạn có thể xem bài đăng trên [blog này](https://pawelurbanek.com/rails-query-caching) để biết thêm thông tin về cách tăng tốc hiệu suất ActiveRecord bằng cách lưu vào bộ nhớ đệm các truy vấn con.

### Sử dụng các giá trị thay vì các đối tượng 

Hãy xem xét scope sau:

```ruby
class Post < ApplicationRecord
  scope :by_same_author, -> (post) {
    where(user_id: post.user.id)
  }
end
```

Bạn có thể phát hiện ra điều gì sai không?

Vấn đề là bạn không thể sử dụng phương pháp này mà không thực hiện một truy vấn bổ sung. Bạn đang truyền một đối tượng ActiveRecord Post đầy đủ phải khởi tạo một đối tượng Người dùng khác từ mối quan hệ của nó.

Để giảm thiểu số lượng truy vấn không cần thiết, bạn có thể viết lại phương thức này như sau:

```ruby
class Post < ApplicationRecord
  scope :by_author, -> (user_id) {
    where(user_id: user_id)
  }
end
```

Bây giờ bạn đang chuyển các giá trị, cần ít truy vấn hơn và ít bộ nhớ hơn để thực thi phương thức này. Thiết kế các API công khai của bạn trên các đối tượng cấp thấp sẽ giúp chúng sử dụng đơn giản hơn và có khả năng hoạt động hiệu quả hơn.

### Thêm các mối quan hệ 'tắt'

Luật Demeter không phải lúc nào cũng được tuân thủ nghiêm ngặt trong các ứng dụng Rails cũ. Không có gì lạ khi gặp mã như sau:

```ruby
class Post < ApplicationRecord
  belongs_to :user

  def author_last_active_at
    user.account.activity.last_active_at
  end
end
```

Việc thực thi phương thức này sẽ tạo ra ba truy vấn SQL bổ sung để tìm nạp và khởi tạo các đối tượng được yêu cầu. Những phương thức dạng này là tệ nhất. Việc hiển thị chỉ vài chục đối tượng đax có thể làm tràn cơ sở dữ liệu của bạn với hàng trăm truy vấn.

Một giải pháp tiềm năng cho vấn đề này là thêm một lối tắt vào cấu trúc cơ sở dữ liệu của bạn để tính đến các yêu cầu truy cập dữ liệu. Nếu mô hình Bài đăng của bạn nhất thiết phải truy cập dữ liệu từ Tài khoản và các truy vấn bổ sung đang giết chết hiệu suất, bạn có thể cân nhắc tạo kết nối trực tiếp giữa các mô hình. Đó là một thủ thuật hơi lươn lẹo, nhưng nó có thể giúp bạn tăng tốc đáng kể cho các chức năng bị tắc nghẽn.

Với các mối quan hệ được đơn giản hóa, ví dụ trên bây giờ có thể trông như thế này:

```ruby
class Post < ApplicationRecord
  belongs_to :user
  belongs_to :activity

  def author_last_active_at
    activity.last_active_at
  end
end
```

Hãy coi chừng, vì lạm dụng cách tiếp cận này có thể nhanh chóng dẫn đến cấu trúc cơ sở dữ liệu của bạn trở thành một mớ hỗn độn không thể maintain được.

### Lặp dữ liệu trong db

Một biến thể cực đoan của kỹ thuật trên là sao chép dữ liệu và đưa nó trực tiếp vào một model cần nó. Ưu điểm là nó cho phép bạn loại bỏ hoàn toàn bất kỳ truy vấn bổ sung nào. Trong cách tiếp cận này, bản thân mô hình Post là một lớp bộ nhớ đệm cho thuộc tính Mô hình tài khoản.

Tuy nhiên, nó đi kèm với một loạt thách thức riêng đối với việc đồng bộ hóa dữ liệu giữa các model. Bạn sẽ phải cập nhật đối tượng Đăng bất cứ khi nào Tài khoản của anh ấy thay đổi. Tôi chỉ sử dụng kỹ thuật này cho một số điểm cuối cực kỳ tắc nghẽn mà việc giảm một truy vấn bổ sung sẽ tạo ra sự khác biệt lớn.

### Tổng kết

Thêm includes vào lệnh gọi cơ sở dữ liệu của bạn thường là lựa chọn đơn giản nhất và tốt nhất cho các vấn đề N + 1 phổ biến. Tuy nhiên, đối với một số trường hợp hiếm và phức tạp hơn, những kỹ thuật này có thể đáng được xem xét.