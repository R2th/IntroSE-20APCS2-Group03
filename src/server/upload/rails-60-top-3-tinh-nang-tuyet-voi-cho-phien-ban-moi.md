### Mở đầu
Rails là 1 framework phát triển ứng dụng web được viết bằng ngôn ngữ Ruby. Ngôn ngữ này cho phép bạn viết code 1 cách ngắn gọn hơn mà không ảnh hưởng đến chức năng của nó. Trong khi có nhiều ngôn ngữ và framework khác, việc phát hành phiên bản mới Rails 6.0 với nhiều tính năng hữu ích đang là xu hướng của các tín đồ công nghệ.
![](https://images.viblo.asia/5f5af553-2a43-45c8-9e72-eebfa922e979.png)

Vì vậy bài viết này sẽ tiết lộ các tính năng chính của phiên bản Rails mới 6.0

Nâng cấp Rails App lên 6.0

Action text

Action mailbox

Multiple Databases with Active Record

### Nâng cấp rails 5.2 lên 6.0

Rails 6 yêu cầu Ruby 2.5.0 hoặc cao hơn để cập nhật. Chúng ta cần cập nhật phiên bản Ruby và Rails tương ứng và sau đó cập nhật trong gemfile. Bây giờ ta chạy lệnh sau:
```ruby
bundle update
```
Bạn có thẻ sử dụng tác vụ này để cập nhật rails app.
```ruby
rails app:update
```
Bạn cần thay đổi nhiều thứ bằng tay.

Chúng ta có giá trị Config.load_defaults trong config/application.rb.

Sau đó thêm gem "webpacker" vào app của chúng ta.
```ruby
gem "webpacker"
```
Rồi chạy lệnh
```ruby
rails webpacker:install
```
Lệnh trên tạo một thư múc riêng cho javascrip. Chúng ta cần di chuyển tất cả các javascrip hiện có của chúng ta sang nó.

Nếu trước đó bạn đã load bất kì actioncable, activestorage hoặc rails-ujs, thì bây giờ nó sẽ load các gói thông qua npm/yarn.

Webpacker, ngoài việc là trình biên dịch javascrip mặc định cho Rails 6, nó không được kích hoạt theo mặc định khi nâng cấp. Vì vậy khi sử dụng Webpacker, hãy đưa nó vào gemfile của bạn và sau đố cài đặt nó.

Khi tất cả packege yarn được chuyển đến @rails scope, bạn phải cập nhật tên của cá phụ thuộc sau.
```ruby
actioncable   → @rails/actioncable
 
activestorage → @rails/activestorage
 
rails-ujs     → @rails/ujs
```

Nếu đây là quá trình dài đối với bạn, chỉ cần tạo app mới với rails 6.0 và di chuyển code của bạn và bạn có thể sử dụng yarn và bất kì lib nào  để làm điều này.

Ở đây, chúng ta hãy xem xét một số ví dụ để hiểu rõ hơn về các tính năng. Tạo một app cho mail campaign sẽ là 1 khái niệm tuyệt vời. Sử dụng **action text**, chúng ta sẽ phác thảo 1 mail và gửi cho người đăng ký. Người đăng ký có thể trả lời qua mail và điều đó sẽ được ghi lại với dự trợ giúp của **action mailbox** và thêm vào table comment. Ở đây, 1 cơ sở dữ liệu riêng biệt được tạo ra để comment, để triển khai ta sử tính năng **Multiple Databases with Active Record**. 

Vì vậy bạn có thể tạo app và model mới với các lệnh sau.
```ruby
rails new rails6_implementation 

rails generate scaffold Newsletter subject:string from_address:string 

rails generate scaffold Subcriber name:string email:string
```
Tạo DB và migrate app.

Bây giờ thêm trường content vào model newsletter.

### Action text
Action text mang nội dung văn bản phong phú và chỉnh sửa vào rails. Nó bao gồm trình soạn thảo Trĩ xử lý tất cả hành động của bạn như thêm hình ảnh, văn bản, liên kết và các nội dung khác vào nội dung. Sau đây là code đổ cài đặt.
```ruby
rails action_text:install
```
Nó sẽ cài đặt active storage nếu mà nó không có trong app của bạn.
```ruby
has_rich_text :content
```
Bạn cần thêm dòng trên vào model của bạn.
```ruby
<%= f.rich_text_area :content %>
```
Đặt đoạn code trên vào phần "view"

Hơn nữa, permit các params trong controller
```ruby
:content
```
Để thay đổi thiết kế, bạn cần xóa 1 mặc định.

Bạn cần xóa liên kết app/assets/stylesheets/actiontext.scss và căn cứ vào kiểu của bạn trên nội dung của tệp đó.

Ở đây cấu hình email để gửi email cho subscriber được thức hiện bằng cách sử dụng mailgun, bạn có thể thực hiện với mail service của mình.

Bây giờ, tiến hành thu thập các văn bản trả lời từ email của người đăng ký, hãy thêm vào trường "reply_to" kèm khi gửi email. Thêm newsletter id để theo dõi trả lời của người dùng mà newsletter đi.
![](https://images.viblo.asia/6f052188-cc23-4c16-a039-54f27fb47811.png)

### Action Mailbox
Action mailbox định tuyến các mail đến các hộp thư giống như controller để xử lý trong Rails. Nó ships với các đường vào Mailgun, Mandrill, Postmark và SendGrid. Bạn cũng có thể xử lý các mail gửi đến trực tiếp thông qua các mục nhập Exim, Postfix và Qmail tích hợp.
```ruby
rails action_mailbox:install

rake db:migrate
```
Điều này cũng sẽ tạo ra active storage migration và action mailbox. Và tao file application_mailbox.rb trong mailbox.

Ở dây  bạn có thẻ xác định các routes của mình và sau đó tạo mailbox để trả lời tương tự code được cung cấp bên dưới.
```ruby
rails g mailbox Replies
```
Code này tạo mailbox trả lời để sử dụng thêm. Ở đó, bạn có thể tìm thấy một phương thức xử lý và có quyền truy cập vào object mail.

Bạn có thể truy cập tất cả các phương pháp phân tích thư mục của [mail gem](https://github.com/mikel/mail), bởi vì nó được xây dựng trên đầu trang này.

![](https://images.viblo.asia/f6a919e0-940c-4cae-9481-e9a4a80cad40.png)

Trên đây là class mailbox, nơi chúng ta đang xử lý gửi mail đến. Để chụp thư của bạn, hãy config domain của bạn trong MATCHER.

**Test trên local**

Bắt đầu với rails server, nhập URL được cung cấp dưới đây. Tại đây bạn sẽ nhận được một form  để text mailbox của bạn.
```ruby
http://localhost:3000/rails/conductor/action_mailbox/inbound_emails/new
```
Nếu bạn cần test với mail thực tế của mình, bạn cần thiết lập server hoặc ngrok(local). Sau đó, cấu hình các routes trong "mailgun".
```ruby
http://localhost:3000/rails/conductor/action_mailbox/inbound_emails/new
```

Thêm table comments trong cơ sở dữ liệu riêng biệt bằng các sử dụng Multiple Databases with Active Record  trong Rails 6.0.
### Multiple Databases with Active Record
Tính năng này gần như không thể tránh khỏi khi bạn mở rộng app của bạn ở cấp độ database. Phiên bản mới nhất hỗ trợ bạn bằng cách hỗ trợ nhiều database để lưu trữ dữ liệu của bạn. Với cấu trúc nhiều database, bạn không cần phải dựa vào dữ liệu duy nhất mà cuối cùng sẽ tắng tốc độ khi truy xuất dữ liệu từ database.

Đầu tiên bạn cần thêm cấu hình database mới trong file database.yml.
```ruby
development:

  primary:

    <<: *default

    database: rails6_implementation_dev

  primary_replica:

    <<: *default

    database: rails6_implementation_dev_replica

    replica: true

  primary2:

    <<: *default

    database: rails6_implementation_dev_2

    migrations_paths: db/primary2_database
```
Ở đấy, thêm nhiều database cho development. Bạn cần sử dụng replica: true để tạo bản sao database.

Các "migrations_paths" được sử dụng để sửa vị trí của các file migration cho một database.

**Để tạo model hoặc migration trên một database cụ thể:**

Các lệnh sau cho phép bạn tạp một model và migration một database cụ thể tương ứng
```ruby
rails g model comment --database primary2

rails g migration CreateComments  --database primary2
```
**Để migration một database cụ thể:**
```ruby
rake db:create:primary2

rake db:migrate:primary2
```
Bây giờ, model comment được tạo trên database primary2 bằng cách sử dụng lệnh trên. Trước khi định cấu hình trong model, bạn có thể truy cập vào active record.

![](https://images.viblo.asia/17a540d2-4396-4b55-afa0-c5124471a595.png)

Vì vậy, hình ảnh trên cho thấy database comment không được kết nối thông qua model.

Để kết nối với active record, thêm phần sau vào model của bạn:

```ruby
connects_to database: { writing: :primary2, reading: :primary2}

connects_to database: { writing: :primary, reading: :primary_replica}
```

Khi model được kết nối, bây giờ bạn có thể kiểm tra trong rails console sẽ trả về bản ghi như hình dưới đây.

![](https://images.viblo.asia/db5f1d2a-aacc-43fe-b1a2-59aaada47393.png)

Bạn có thể tham khảo [repo github](https://github.com/guru28/rails6_implementation) để có được code hoàn chỉnh.
### Kết luận
Như vậy ta đã có 3 tính năng mới với Rails 6.0, hi vọng có thể giúp ích cho bạn khi cần :v  

Link tham khảo: https://www.agiratech.com/top-3-rails-6-features/