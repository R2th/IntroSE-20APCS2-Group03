Rails 6 đã được release và nó được tích hợp nhiều tính năng rất có lợi cho các ứng dụng kể cả lớn lẫn nhỏ, có vẻ như rất nhiều cải thiện về tốc độ cũng như khả năng mở rộng đã được mang đến trong Rails 6.
<br>

Mình đã đọc qua CHANGELOGs từng phần của Rails 6 (ActiveRecord, ActionPack, ActiveSupport, etc.) và chọn ra một vài tính năng mà mình cảm thấy thú vị nhất.
<br>

---

# Active Record
### Thêm API cơ bản cho việc chuyển đổi kết nối nhằm mục đích hỗ trợ đa cơ sở dữ liệu.
[Eileen M. Uchitelle](https://medium.com/@eileencodes) đã trích xuất từ codebase của Github và đưa tính năng tuyệt vời này vào Rails, một giải pháp nhằm chuyển đổi kết nối cơ sở dữ liệu cho một model cụ thể hoặc một query cụ thể.
Code của tính năng này là một phần trong pull request sau: https://github.com/rails/rails/pull/34052, nó được viết doc khá là đầy đủ và dễ đọc.
```ruby
class AnimalsModel < ApplicationRecord
  self.abstract_class = true

  connects_to database: { writing: :animals_primary, reading: :animals_replica }
end

class Dog < AnimalsModel
  # connected to both the animals_primary db for writing and the animals_replica for reading
end
```
Các truy vấn bị chậm trong job có thể được đọc từ một bản sao của cơ sở dữ liệu bằng một API đơn giản
```ruby
ActiveRecord::Base.connected_to(database: :slow_replica) do
  SlowReplicaModel.first
end
```
Còn file `database.yml` lúc này sẽ cần dài hơn một chút
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
[Gannon McGibbon](https://medium.com/@gannon.mcgibbon) sau đó đã thêm vào một chút code nhằm hỗ trợ hash và config url trong database hash của `ActiveRecord::Base.connected_to` và giúp chúng ta có khả năng viết được đoạn code như sau
```ruby
User.connected_to(database: { writing: "postgres://foo" }) do
  User.create!(name: "Gannon")
end

config = { "adapter" => "sqlite3", "database" => "db/readonly.sqlite3" }
User.connected_to(database: { reading: config }) do
  User.count
end
```
### Thêm `Relation#pick`, pluck dành cho các giá trị đơn
Như tiêu đề, dùng pick sẽ tượng tự pluck nhưng dùng cho các giá trị đơn
```ruby
Person.where(id: 1).pick(:name, :email_address)
# SELECT people.name, people.email_address FROM people WHERE id = 1 LIMIT 1
# => ['Tung K', 'nguyen.thanh.tungk@sun-asterisk.com']
```
### Có thể config được các cột được sắp xếp ngầm
Đối với các ứng dụng không sử dụng ID tăng dần, tính năng này thật là quý giá. Bây giờ chúng ta sẽ có thể thiết lập thứ tự của các bản ghi chỉ với một dòng lệnh.
```ruby
class User < ActiveRecord::Base
  self.implicit_order_column = "created_at"
end 
```

---

# Action Mailbox
Action mailbox đã được mang đến trong phiên bản thứ sáu của Ruby on Rails, mình chắc rằng sẽ có nhiều bài viết về tính năng này trong tương lai. Action Mailbox cung cấp một bộ công cụ cho phép các ứng dụng có thể tích hợp một cách tốt hơn các luồng emails đến.
<br>

Config cơ bản có trong [Action Mailbox Basics Rails Guide](https://edgeguides.rubyonrails.org/action_mailbox_basics.html), có một vài ý tưởng thú vị về tính năng này đó là các cuộc hội thoại sẽ có thể diễn ra tự động trong cả platform và email và có thể hoán đổi cho nhau, ví dụ như comment trên Github từ email, email trợ giúp biến thành ticket...
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
Chú ý rằng Action Mailbox cần có Active Job và Active Storage và cần một bảng trong database cho nó. Hầu hết tài liệu về các class cũng có sẵn tại  [ActionMailbox::Base class documentation](https://github.com/rails/rails/blob/master/actionmailbox/lib/action_mailbox/base.rb), [ActionMailbox::InboundEmail class documentation](https://github.com/rails/rails/blob/master/actionmailbox/app/models/action_mailbox/inbound_email.rb) và làm việc với email được parse được thực hiện bằng cách sử dụng gem [Mail](https://github.com/mikel/mail).

---

# Action Text
Action Text chính là [Trix editor](https://trix-editor.org/) của Basecamp được đưa vào trong các model của ActiveRecord. Nó cho chúng ta method `has_rich_text` và chúng ta có thể apply nó vào model mà mình muốn và Action Text sẽ xử lý các việc còn lại. Action Text require ActiveStorage và một số bảng để lưu metadata của nó nên hãy lưu ý rằng bạn sẽ cần phải chuyển sang dùng một ActiveStorage provider mà không lưu trên ổ cứng nếu như ứng dụng của bạn cần có hơn một server.
<br>

Tài liệu về tính năng này có trên [Rails Guides](https://edgeguides.rubyonrails.org/action_text_overview.html) và nó khá là dễ hiểu.

---

# Action Pack
### ActionDispatch::HostAuthorization
Host Authorization là một middleware mới giúp chống lại các cuộc tấn công rebinding DNS (là kiểu tấn công bằng cách tạo các đường link dẫn tới các trang web có chứa mã JS độc hại) bằng cách chỉ ra rõ ràng các hosts có thể gửi request đến.
<br>

Theo mặc định, nó được đặt cho tất cả các ứng dụng Rails 6 và cho phép request tới các host sau ở môi trường development `IPAddr.new (“0.0.0.0/0”), IPAddr.new (“:: / 0”), “localhost”]`, config của nó có thể nhận các mảng `RegExp`, `Proc`, `IPAddr` và `String`. Điều này có nghĩa là với Rails 6, chúng ta sẽ cần đặt tên miền của mình một cách rõ ràng trong các file cấu hình môi trường.

```ruby
Rails.application.config.hosts = [
  IPAddr.new("0.0.0.0/0"), # All IPv4 addresses.
  IPAddr.new("::/0"),      # All IPv6 addresses.
  "localhost"              # The localhost reserved dom
  
Rails.application.config.hosts << "product.com"
  
Rails.application.config.hosts << /.*\.product\.com/
```
### metadata `purpose` dành cho cookie được sign/encrypt
Rails giờ đây đã có thể ngăn chặn các cuộc tấn công bằng cách sao chép các giá trị đã được sign/encrypt của một cookie này và sử dụng nó làm giá trị của một cookie khác.
<br>

Rails có thể làm được như vậy bằng cách lưu trữ tên cookie trong trường `purpose` rồi sign/encrypt nó cùng với giá trị của cookie. Sau đó, khi được đọc từ phía server, tên cookie sẽ được verify bằng purpose và khi đó các cookie đã bị tấn công sẽ được loại bỏ.
<br>

Enable config `action_dispatch.use_cookies_with_metadata` để sử dụng tính năng này.
### Truyền thêm tham số vào các request GET ngầm thông qua #`follow_redirect!`
Giờ đây chúng ta đã có thể truyền thêm các tham số vào các request GET ngầm bằng cách thêm tham số cho method `follow_redirect!`.
```ruby
def create
  # do stuff
  # method that have redirect
  follow_redirect!(params: { user: params[:user_id] })
end
```

---

# Action View
### Thêm allocations vào trong việc phân tích đo đạc render template
Rails 6 sẽ report về việc phân bổ đối tượng được thực hiện trong các views, điều này sẽ cho phép developer biết được lượng thời gian dành cho việc phân bổ và thu thập các đối tượng trong bộ nhớ của các process.
```ruby
  Rendered posts/_form.html.erb (Duration: 7.1ms | Allocations: 6004)
  Rendered posts/new.html.erb within layouts/application (Duration: 8.3ms | Allocations: 6654)
Completed 200 OK in 858ms (Views: 848.4ms | ActiveRecord: 0.4ms | Allocations: 1539564)
```

---

# Active Job
### Thêm các instrumentation hooks `enqueue_retry.active_job`, `retry_stopped.active_job`, và `discard.active_job`
Rails có một lượng instrumentation hooks rất phong phú được tích hợp vào Active Support và nó dàn trải trên toàn bộ framework.
<br>

Nó cho phép bạn lắng nghe các sự kiện xảy ra trong suốt vòng đời của các request,  các truy vấn SQL và các Job.
<br>

Với việc bổ sung thêm `enqueue_retry.active_job`, `retry_stopped.active_job` và `discard.active_job` giúp cho việc phân tích và handle Job dựa trên status của chúng càng trở nên dễ dàng hơn.
### Cho phép truyền vào #`retry_on` và #`discard_on` nhiều exception
```ruby
retry_on Errno::ECONNREFUSED, SocketError, Timeout::Error, attempts: 5
```

---

# Active Model
### Cho phép đổi tên thuộc tính khi dùng `#has_secure_password`
Trước đây, thuộc tính mặc định khi dùng #has_secure_password là 'pasword'
```ruby
class User < ActiveRecord::Base
  has_secure_password :recovery_password, validations: false
end
user = User.new()
user.recovery_password = "42password"
user.recovery_password_digest # => "$2a$04$iOfhwahFymCs5weB3BNH/uX..."
user.authenticate_recovery_password('42password') # => user
```

---

# Active Storage
### File upload lên khi được assign vào một record sẽ được lưu vào storage khi record được save thay vì lưu vào storage ngay lập tức
Ở Rails 5.2, files sẽ được lưu ngay lập tức vào storage khi được assign
```ruby
@user.avatar = params[:avatar]
```
Giờ đây cơ chế của nó đã chính xác hơn khi chỉ lưu khi `@user.save`
### Dùng gem [ImageProcessing](https://github.com/janko/image_processing) cho Active Storage và các biến thể của nó, deprecate MiniMagick 
ImageProcessing hỗ trợ một số macro tốt hơn như `:resize_to_fit`, `:resize_to_fill` và có tích hợp sẵn [libvips](http://libvips.github.io/libvips/) thay thế cho ImageMagick.
<br>

Việc thay đổi cũng dễ dàng bằng cách cấu hình Rails như thông thường
```ruby
Rails.application.config.active_storage.variant_processor = :vips
```

---

# Action Mailer
### Thêm `MailDeliveryJob `, deprecate `DeliveryJob` và `Parameterized::DeliveryJob`
`MailDeliveryJob` được sử dụng cho cả việc send mail thường và mail được tham số hóa

---

# Zeitwerk
Zeitwerk là một code loader mới cho Ruby. Nó hiệu quả, an toàn cho luồng và phù hợp với cú pháp hằng số của Ruby.
<br>

Với một cấu trúc thư mục theo đúng quy tắc, Zeitwerk sẽ load các class và module khi cần, nghĩa là bạn không cần phải viết các lệnh require trong file của mình.
<br>

Zeitwerk được mặc định kích hoạt trong Rails 6.
<br>

Tuy nhiên, nếu bạn không muốn sử dụng nó, bạn luôn có thể sử dụng loader cũ bằng cách config trong `application.rb`.
```ruby
config.autoload = :classic
```

---

*Source: https://medium.com/rubyinside/whats-coming-to-rails-6-0-8ec79eea66da*