ActiveRecord rất tuyệt vời. Thực sự vậy, nó giúp tách biệt bạn khỏi các câu query SQL chạy trong database. Vì vậy, nếu bạn không hiểu cách ActiveRecord hoạt động, bạn có thể tạo ra các câu query SQL không mong muốn.

Bởi vì SQL chính là một nguyên nhân chính làm chậm các action trong controller, đặc biệt khi tạo ra các câu query không cần thiết trong quá trình render các phần tử trong một tập hợp. Lỗi này hay xảy ra trong các action search hoặc index. Đây là vấn đề khá phổ biến khi xây dựng app.

Vậy muốn loại bỏ các câu query không cần thiết, ta cần phải tìm hiểu về ActiveRecord và hiểu nó, biết thực sự những gì xảy ra trong các method của nó. Trong bài viết này, tôi sẽ đề cập đến 3 method mà gây ra nhiều câu query không cần thiết trong Rails, đó là: `count`, `where` và `present?`

### Làm sao để biết một query là không cần thiết?

Tôi có một quy ước để xác định query SQL là không cần thiết. Đó là một action trong controller chỉ nên thực thi một query SQL cho mỗi bảng. Nếu bạn thấy có nhiều hơn một query SQL cho mỗi bảng, thì bạn luôn luôn có cách để giảm bớt để còn một hoặc tối thiểu là 2 query. Nếu thấy nhiều query hơn cho một bảng, thì chắc chắn là đó là những query không cần thiết.

Bạn có thể sử dụng gem [NewRelic](https://github.com/newrelic/rpm) để kiểm tra số lượng query SQL cho từng action trong controller.

Quy ước tiếp theo là đa số các câu query nên được thực hiện trong phần đầu tiên trong response của controller action, và không bao giờ chạy trong partials, khi trong quá trình render view. Các query chạy trong partial thường sẽ dẫn đến N+1. VD:

```ruby
User Load (0.6ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = $1 LIMIT 1  [["id", 2]]
Rendered posts/_post.html.erb (23.2ms)
User Load (0.3ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = $1 LIMIT 1  [["id", 3]]
Rendered posts/_post.html.erb (15.1ms)
```
ta thấy, đang có lỗi query N + 1 trong partials. Khi đó, bạn đã không thực hiện preload dữ liệu cần thiết.

Dưới đây, ta sẽ tìm hiểu về các methods: count, where và present? và tại sao chúng lại gây ra các query SQL không cần thiết.

### COUNT thực hiện query mọi lúc

Method count trong ActiveRecord luôn luôn cố thực hiện một query SQL mọi lúc. Điều này không phù hợp cho mọi thời điểm, khi thông thường, chỉ nên sử dụng count nếu bạn muốn chạy query SQL COUNT ngay lập tức.

Nguyên nhân chính dẫn đến các query `count` không cần thiết là khi bạn thực hiện count một quan hệ mà bạn sẽ sử dụng sau đấy trong view hoặc đã được dùng trước đó.

```ruby
# _messages.html.erb
# Assume @messages = user.messages.unread, or something like that

<h2>Unread Messages: <%= @messages.count %></h2>

<% @messages.each do |message| %>
blah blah blah
<% end %>
```

Trong VD trên sẽ tạo ra 2 query, một COUNT và một là SELECT. COUNT được thực hiện bởi @messages.count và @messages.each sẽ tạo ra SELECT để load tất cả các message. Nếu thay đổi thứ tự code và đổi sang dùng size thay vì count sẽ giúp loại bỏ query COUNT và chỉ giữ lại SELECT:

```
<% @messages.each do |message| %>
blah blah blah
<% end %>

<h2>Unread Messages: <%= @messages.size %></h2>
```

Tại sao vậy, chúng ta có thể xem trong source code của hàm size:

```ruby
# File activerecord/lib/active_record/relation.rb, line 210
def size
  loaded? ? @records.length : count(:all)
end
```

Nếu quan hệ đã được load, nghĩa là câu quey cho quan hệ trên đã được thực hiện và chúng ta đã lưu lại kết quả, khi đó bạn sẽ gọi method length cho các record đã được load sẵn. Đó chỉ là method Ruby đơn giản cho Array. Nếu ActiveRecord::Relation chưa được load, thì ta sẽ trigger một query COUNT.

CÒn đây là cách count được thực hiện trong ActiveRecord::Calculations:

```ruby
def count(column_name = nil)
  if block_given?
    # ...
    return super()
  end

  calculate(:count, column_name)
end
```

Ta thấy, hiển nhiên là `calculate` không được ghi nhớ hay được cache ở đâu, và sẽ thực hiện một câu SQL tính toán mọi lúc nếu được gọi.

Nếu dùng size, khi record chưa được load, ActiveRecord sẽ thực hiện COUNT. Khi chuyển method sau khi record đã được load sẽ loại bỏ được query COUNT. Bây giờ, nếu yêu cầu là phải hiển thị count trước khi hiển thị danh sách record, thì ta phải làm thế nào để không trigger query COUNT, chúng ta có thể sử dụng method `load`

```ruby
<h2>Unread Messages: <%= @messages.load.size %></h2>

<% @messages.each do |message| %>
blah blah blah
<% end %>
```

load sẽ load tất cả các record @messages ngay lập tức, không cần phải đợi khi cần. Nó sẽ trả về ActiveRecord::Relation, chứ không phải là các record. Vì vậy, khi size được gọi, record được được loaded? và sẽ không trigger COUNT query nữa.

Nếu sử dụng `messages.load.count`, nó vẫn trigger một query COUNT.

Nếu như ta gọi count 2 lần trong view, thì vẫn sẽ sinh ra 2 query COUNT, nhưng query thứ 2 đã được cache lại bởi ActiveRecord::QueryCache, nên thời gian thực hiện query đó sẽ là 0.

Vì vậy, chúng ta nên sử dụng size trong tất cả các trường hợp khi cần count. size sẽ chạy count khi nó thực sự cần và sẽ không chạy khi dữ liệu đã được load. Vậy khi nào cần thực sự dùng count? Đấy là khi bạn đã không load toàn bộ quan hệ mà bạn cần count, vd như khi phân trang dữ liệu chẳng hạn, cần số liệu count toàn bộ dữ liệu nhưng lúc hiển thị chỉ cần load 1 phần thôi. Khi đấy, sử dụng count là hợp lý, nhưng trong trường hợp này, dùng size cũng là tương tự, vì nếu dữ liệu chưa load full, thì size vẫn sẽ trigger count.

### Where lọc dữ liệu trong database

Ta có đoạn code view:

```ruby
<% @posts.each do |post| %>
  <%= post.content %>
  <%= render partial: :comment, collection: post.active_comments %>
<% end %>
```

trong model:

```ruby
# Post.rb

class Post < ActiveRecord::Base
  def active_comments
    comments.where(soft_deleted: false)
  end
end
```

Khi đấy, nó sẽ tạo ra một query SQL được thực hiện mỗi khi render một post partial. Chúng ta không thể dùng includes hay preload comments để ngăn chặn điều đó. 

ĐIều này cũng xảy ra khi bạn gọi qua scope, VD:

```ruby
class Comment < ActiveRecord::Base
  belongs_to :post

  scope :active, -> { where(soft_deleted: false) }
end
```

Từ đó, tôi có 2 quy ước: Không gọi scope trong quan hệ khi bạn đang render một tập hợp và không đặt query, vd where, trong các instance method của class ActiveRecord::Base 

Gọi các scope trong các quan hệ thì bạn không thể preload kết quả. VD trên, bạn có thể preload comment trong post, nhưng bạn không thể preload active comment trong một post, vì vậy bạn phải trigger database , thực hiện các query mới cho mọi thành phần trong tập hợp.

Để giải quyết vấn đề này, ta tạo một quan hệ mới, để có thể dùng được preload:

```ruby
class Post
  has_many :comments
  has_many :active_comments, -> { active }, class_name: "Comment"
end

class Comment
  belongs_to :post
  scope :active, -> { where(soft_deleted: false) }
end

class PostsController
  def index
    @posts = Post.includes(:active_comments)
  end
end
```

View không đổi, nhưng giờ chỉ chạy đúng 2 query, 1 cho bảng Post, và 1 cho bảng Comment.

```ruby
<% @posts.each do |post| %>
  <%= post.content %>
  <%= render partial: :comment, collection: post.active_comments %>
<% end %>
```

Quy ước thứ 2 tôi đề cập là không đặt query như Where trong instance methds:

```ruby
class Post < ActiveRecord::Base
  belongs_to :post

  def latest_comment
    comments.order('published_at desc').first
  end
end  

# trong view
<% @posts.each do |post| %>
  <%= post.content %>
  <%= render post.latest_comment %>
<% end %>
```

Khi đó sẽ tạo ra query SQL cho mọi post, dù bạn có preload comment. Để giải quyết, thì ta cần sử dụng preload cho chính xác.

### any?, exists? and present?

Chúng ta thường sử dụng các method để kiểm tra sự tồn tại các biến. Như là `present?`, `exists` hoặc ngược lại là `none?`, `empty?`, `blank?`. Trong các VD dưới đây, ta sẽ hiển lúc nào nên và không nên sử dụng các biến:

Giả sử @comments là một ActiveRecord::Relation:

```ruby
- if @comments.any?
  h2 Comments on this Post
  - @comments.each do |comment|
  ```
  
  Ở đoạn code trên, sẽ tạo ra 2 query SQL. Một là để kiểm tra sự tồn tại 
  ```ruby
  @comments.any? (SELECT 1 AS one FROM ... LIMIT 1)
  ```
  còn 2 là để load dữ liệu comments
  ```ruby
  (SELECT "comments".* FROM "comments" WHERE ...)
  ```
  
  Vậy với đoạn code sau:
  ```ruby
  - unless @comments.load.empty?
  h2 Comments on this Post
  - @comments.each do |comment|
  ```
  
  Khi đấy, `@comments.load` sẽ load toàn bộ dữ liệu với query 
  ```ruby
  SELECT "comments".* FROM "comments" WHERE ....
  ```
  
  Vậy với:
  ```ruby
  - if @comments.exists?
  This post has
  = @comments.size
  comments
- if @comments.exists?
  h2 Comments on this Post
  - @comments.each do |comment|
  ```
 
 4 query, `exists?` không ghi nhớ nó và không load quan hệ, exists? sẽ trigger một query `SELECT 1 ...`, còn size sẽ trigger một query COUNT bởi vì quan hệ chưa được load và sau đó ở lần kiểm tra exists? tiếp sẽ lại trigger query `SELECT 1 ...` khác , và cuối cùng @comments sẽ tạo query để load toàn bộ dữ liệu. 
 
 Bạn có thể giảm bớt chỉ còn 1 query bằng cách:
 ```ruby
 - if @comments.load.any?
  This post has
  = @comments.size
  comments
- if @comments.any?
  h2 Comments on this Post
  - @comments.each do |comment|
 ```
 
 Sự thay đổi này cũng phụ thuộc vào version của Rails:
 
 Vởi Rails 5.1
 ![](https://images.viblo.asia/76a3ef1f-f40a-446d-89a1-66a886dd92e8.png)
 
 Rails 5.0
 ![](https://images.viblo.asia/a0ec0088-f324-42ec-a827-0e67530c9864.png)
 
 Rails 4.2
 ![](https://images.viblo.asia/e8ccbe63-972a-49a0-9538-64d0681be29e.png)
 
 `any?`, `empty?` và `none?` cũng tương tự như size, nếu record đã được loaded? thì sẽ gọi method đơn giản cho Array. Nếu chưa load, thì sẽ trigger một query SQL. Với `exists?` sẽ không cache hay ghi nhớ lại, mà sẽ tương tự như ActiveRecord::Calculations, sẽ tồi tệ hơn present? trong một vài trường hợp.
 
###  Kết luận

Khi ứng dụng ngày càng phình to cả về độ lớn và độ phức tạp, những câu SQL không cần thiết có thể trở nên thực sư đáng kể cho hiệu năng của hệ thống. Mỗi query SQL sẽ tạo ra một quá trình kết nối database, mà sẽ tiêu tốn vài milisecond và thỉnh thoảng có thể nhiều hơn với các câu WHERE phức tạp. Thậm chí với exists? thì sẽ là cả một vấn đề nếu chạy với mọi row của bảng hay các partial của collection, đó sẽ là một vấn đề lớn.

ActiveRecord rất mạnh, nhưng việc kết nối với database không bao giờ là miễn phí, bạn cần nắm rõ cách ActiveRecord hoạt động để có thể tránh việc truy cập vào database cho những trường hợp không cần thiết.