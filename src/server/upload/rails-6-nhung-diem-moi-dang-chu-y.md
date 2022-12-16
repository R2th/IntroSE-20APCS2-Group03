Hi,

Chào mọi người. Hôm nay mình sẽ chia sẽ với các bạn một vài điểm thú vị về Rails 6-phiên bản mới nhất của framework Rails. Lý do mà mình viết bài viết này là vì trong tháng vừa rồi sấp mặt với dự án quá, không có thời gian tìm hiểu thêm cái chi hay về coding đủ để viết một tutor hết, tiện trước đây có tham gia một dự án nhỏ sử dụng Rails 6. Nên mình dành thời gian đọc thêm về Rails 6 sau khi được một vài người chỉ "nên đọc" :D


Nhìn chung, Rails 6 ra mắt cung cấp thêm một số tính năng để hổ trợ việc phát triển các ứng dụng website cũng như api. Trong bài viết mình xin giữ nguyên gốc Tiếng Anh với những mục mình sẽ note ra sau khi đọc các tài liệu. Vì thực ra mình cũng gặp khó khăn khi dịch những cụm từ đó một cách rõ nghĩa.

Bắt đầu từng điểm nhé!

# Active Record

Điểm đáng chú ý nhất chính là tính năng connect với nhiều cơ sở dữ liệu-database trong cùng một ứng dụng Rails. Điều này đã được giới thiệu trước đó.

Eileen M. Uchitelle đã kế thừa từ codebase của Github để đưa vào tính năng switch multi database trong Rails 6. Nó cung cấp cho chúng ta một giải pháp khá tiện lợi để chuyển đổi connection đến các database repo và query.

Phần source code gốc các bạn có thể follow tại [Đây](https://github.com/rails/rails/pull/34052)

Nó khá đơn giản và dễ đọc, mình sẽ đưa ra một vài ví dụ để các bạn cụ thể hơn.

```ruby
class AnimalsModel < ApplicationRecord
  self.abstract_class = true

  connects_to database: { writing: :animals_primary, reading: :animals_replica }
end

class Dog < AnimalsModel
  # connected to both the animals_primary db for writing and the animals_replica for reading
end
```

Như trên ta thấy model AnimalsModel được config để connect trực tiếp đến database với các quyền writing, reading khác nhau.

Ở file `database.yml`, ta tiến hành config đơn giản như sau:

```ruby
development:
  primary:
    database: my_primary_db
    user: root
  primary_replica:
    database: my_primary_db
    user: ro_user
    replica: true
  animals:
    database: my_animals_db
    user: root
  animals_replica
    database: my_animals_db
    user: ro_user
    replica: true
```

Sau đó, Gannon McGibbon đã thêm vào những bộ mã mới hơn để hổ trợ hash và url config trong database hash của `ActiveRecord::Base.connected_to` để cải cách thêm cho chức năng này. Bên dưới mà mã code thể hiện tính năng này:

```ruby
User.connected_to(database: { writing: "postgres://foo" }) do
  User.create!(name: "Gannon")
end

config = { "adapter" => "sqlite3", "database" => "db/readonly.sqlite3" }
User.connected_to(database: { reading: config }) do
  User.count
end
```

# Function pick-tương tự như function pluck nhưng lại cho single record

Cái này bản thân mình thấy cũng khá hay. Thay vì bình thường anh em sẽ dùng select hay gì đấy để get ra những attribute mình cần ở một record. Thì Rails 6 đã bổ sung thêm một function khá hay hổ trợ việc này đó là pick.

```ruby
Member.where(id: 1).pick(:country, :email)
# SELECT member.country, member.email FROM member WHERE id = 1 LIMIT 1
# => ['QuangTri', 'lanka@personal-email.com']
```

Nhìn qua cái vd thì hiểu luôn rồi đúng không? :D :D

Bản thân hàm pick là một câu select lấy ra các field mà bạn muốn.

# ActiveRecord::Base.create_or_find_by/! bổ trợ tính năng query select or insert

Nhìn cái tên function mình nghĩ các bạn cũng hiểu luôn chức năng rồi: Nó thực hiện create hoặc find_by cùng lúc, điều kiện để xảy ra find_by chính là rescue của create. Các bạn có thể đọc qua source code bên dưới để nắm thêm:

```ruby
def create_or_find_by(attributes, &block)
  transaction(requires_new: true) { create(attributes, &block) }
rescue ActiveRecord::RecordNotUnique
  find_by!(attributes)
end
```

# Make the implicit order column configurable

Thông thường khi xử lý với list records, chúng ta hay dùng những function để get các giá trị ở các vị khác nhau. Rails 6 hổ trợ chúng ta một tính năng để ngầm order các record đó theo một cơ sở nhất định: có thể là các attribute của model đó.

```ruby
class User < ActiveRecord::Base
  self.implicit_order_column = "created_at"
end 
```


Như trên, attribute created_at được dùng để làm cơ sở order cho list User.

# Action Mailbox

Rails 6 cung cấp một bộ ứng dụng cho phép developer tích hợp các tính năng về email một cách tiện lợi và dễ dàng hơn gọi là `Action Mailbox`. Tất cả những tích năng hay ho này sẽ được cung cấp đầy đủ trong `ActionMailbox::Base`. Các bạn có thể extends nó thông qua một class khác là `ApplicationMailbox`.

```ruby
COMMENTS_REGEX = /^comment\+(.+)@example\.com/i

# app/mailboxes/application_mailbox.rb
class ApplicationMailbox < ActionMailbox::Base
  routing COMMENTS_REGEX => :comments
end

# app/mailboxes/comments_mailbox.rb
class CommentsMailbox < ApplicationMailbox
  def process
    user = User.find_by(email: mail.from)
    post_uuid = COMMENTS_REGEX.match(mail.to)[1]
    
    post = Post.find_by(uuid: post_uuid)
    post.comments.create(user: user, content: mail.body)
  end
end
```

Các bạn có thể xem thêm tài liệu tại [Đây](https://edgeguides.rubyonrails.org/action_mailbox_basics.html)


# Pass along arguments to underlying GET method in
`#follow_redirect!`

Thông thường với các vers dưới 6 của Rails, chúng ta cảm thấy khá cồng kềnh khi muốn redirect ở server và kèm theo các params. Nhưng với `follow_redirect` của Rails 6, bạn có thể dễ dàng pass những parameters cho method GET bằng việc truyền các params đấy vào `follow_redirect`.

```ruby
def create
  # do stuff
  follow_redirect!(params: { user: params[:user_id] })
end
```

# Action View

## Add allocations to template rendering instrumentation

Ở Rails 6, developer có thể dễ dàng biết được thời gian của một tác vụ nào đó từ khi bắt đầu đến kết thúc. Nó report rất chính xác con số(giây). Điều này hộ trợ nhiều đến quá trình phát triển các function và tối ưu hoá hiệu năng của tác vụ cũng như ứng dụng. Chúng ta xem qua một đoạn Rails log bên dưới:

```ruby
 Rendered posts/_form.html.erb (Duration: 7.1ms | Allocations: 6004)
  Rendered posts/new.html.erb within layouts/application (Duration: 8.3ms | Allocations: 6654)
Completed 200 OK in 858ms (Views: 848.4ms | ActiveRecord: 0.4ms | Allocations: 1539564)
```

# Active Job

## Allows configurable attribute name for `#has_secure_password`

`#has_secure_password` là một phương pháp định danh cho các attribute cần được mã hoá trong ứng dụng, phổ biến nhất là password. Nó bổ trợ các tính năng mã hoá một cách rất đơn giản. Việc bạn cần làm chỉ là định danh cho attribute cần thiết vào model tương ứng.

```ruby
    class User < ActiveRecord::Base
  has_secure_password :recovery_password, validations: false
end
user = User.new()
user.recovery_password = "42password"
user.recovery_password_digest # => "$2a$04$iOfhwahFymCs5weB3BNH/uX..."
user.authenticate_recovery_password('42password') # => user
```


# Action Cable

Điểm ấn tượng cuối cùng mà mình muốn chia sẽ với các bạn chính là `Action cable` trong Rails 6. Phải nói đây là thay đổi ấn tượng nhất đối với mình, vi trước đây ở những version cũ hơn, mình cảm thấy khá khó khăn khi đụng tới thằng ni. Ví dụ như phát triển chức năng Chat realtime :D

Nhưng ở Rails 6 thì mọi chuyện dễ hơn nhiều. Action cable được tích hợp trực tiếp, điều đó có nghĩa là bạn có thể dùng nó chỉ với việc tạo ra các chanel phù hợp với mục đích của mình.

```ruby
def test_broadcasts
  assert_broadcasts 'messages', 0
  ActionCable.server.broadcast 'messages', { text: 'hello' }
  assert_broadcasts 'messages', 1
end

def test_subscribed_with_room_number
  subscribe room_number: 1
  assert subscription.confirmed?
  assert_has_stream "chat_1"
  assert_has_stream_for Room.find(1)
end

def test_perform_speak
  subscribe room_number: 1
  perform :speak, message: "Hello, Rails!"
  assert_equal "Hello, Rails!", transmissions.last["text"]
end

def test_connects_with_cookies
  connect cookies: { user_id: users[:john].id }
  assert_equal "John", connection.user.name
end
```

Trên là một vài điểm ấn tượng mình muốn giới thiệu tới các bạn. Dĩ nhiên Rails 6 còn khá nhiều cái hay nữa mà các bạn có thể nghiên cứu thêm. Ví dụ: `Action Mailer, Action Support, Zeitwerk, Active Storage...`

Cảm ơn các bạn đã tham khảo qua bài viết của mình! Bye bye