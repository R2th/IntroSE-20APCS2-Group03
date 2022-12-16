> Vào việc luôn nhé ! Không có intro đâu....

## Hỗ trợ config multi database một cách dễ dàng
> Khi dự án của bạn yêu cầu xây dựng database cho một ứng dụng cho phép chia sẻ một vài dữ liệu chung cho một vài sites khác. Ví dụ như là chúng ta có 2 ứng dụng là notes và memories cần dùng chung database là bảng user để khi mà người dùng có tài khoản trong notes thì đều có thể đăng nhập vào memories thông qua tài khoản đó trong khi đó chúng ta cũng có những database riêng để lưu trữ dữ liệu cho những phần khác của những sites đó.

Đến đây chắc bạn cũng sẽ nghĩ cần phải tách dữ liệu và lưu trữ vào những database riêng biệt, qua đó có thể include vào những sites khác nhau để dùng
> Trong bài viết này mình không hướng dẫn config đâu nhé. 
> 
>  Nhưng trong này [guides rails](https://guides.rubyonrails.org/active_record_multiple_databases.html) có hướng dẫn chi tiết lắm nhé, các bạn ghé đọc
```ruby
class AnimalsModel < ApplicationRecord
  self.abstract_class = true
  connects_to database: { writing: :animals_primary, reading: :animals_replica }
end

class Dog < AnimalsModel
end
```
## New Methods:  create_or_find_by 
> Rails 6 đã thêm create_or_find_by và create_or_find_by! . Cả hai phương pháp này đều dựa vào các ràng buộc duy nhất trên cấp độ cơ sở dữ liệu. Nếu quá trình tạo không thành công, đó là do các ràng buộc duy nhất trên một hoặc tất cả các cột đã cho và nó sẽ cố gắng tìm bản ghi bằng cách sử dụng find_by! 

`create_or_find_by` thử tạo mới một record với thuộc tính đã cho, có một ràng buộc duy nhất trên một hoặc một số cột của nó.

Như trong ví dụ trên, nếu một record đã tồn tại với một ràng buộc duy nhất, một exception là điều đầu tiên chúng ta bắt gặp.

Sau đó nó tiến hành sử dụng find_by! và trả về record.

Điều này giúp sử dụng để khắc phục vấn đề đọc cũ gây ra bởi nhiều race conditions.

## Function pick-tương tự như function pluck nhưng lại cho single record

```ruby
Person.where(id: 1).pick(:name)
# SELECT people.name FROM people WHERE id = 1 LIMIT 1
# => 'David'

Person.where(id: 1).pick(:name, :email_address)
# SELECT people.name, people.email_address FROM people WHERE id = 1 LIMIT 1
# => [ 'David', 'david@loudthinking.com' ]
```
> Nhìn cái hiểu luôn, khỏi giải thích nhé !. Thực ra nó là thế này: relation.limit(1).pluck(*column_names).first

## Sắp xếp bản ghi với implicit_order_column
Cú pháp:
```
class User < ActiveRecord::Base
  self.implicit_order_column = "created_at"
end
```
Cùng xem ví dụ nhé:
```ruby
class User < ApplicationRecord
   validates :name, presence: true
end
```
> Before
```
>> User.first
SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]

=> #<User id: 1, name: "Amit", created_at: "2019-03-11 00:18:41", updated_at: "2019-03-11 00:18:41">
```
```
>> User.last
SELECT "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT $1  [["LIMIT", 1]]

=> #<User id: 2, name: "Mark", created_at: "2019-03-11 00:20:42", updated_at: "2019-03-11 00:20:42">
```

> After -> Sửa lại model 1 chút

```ruby
 class User < ApplicationRecord
  validates :name, presence: true
  self.implicit_order_column = "updated_at"
 end
```

> Update lại chút nè

```
User.find(1).touch
SELECT "users".* FROM "users" WHERE "users"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
UPDATE "users" SET "updated_at" = $1 WHERE "users"."id" = $2  [["updated_at", "2019-03-11 00:23:33.369021"], ["id", 1]]

=> true
```

> Kết quả sau khi add `implicit_order_column`

```
>> User.first
SELECT "users".* FROM "users" ORDER BY "users"."updated_at" ASC LIMIT $1  [["LIMIT", 1]]

=> #<User id: 2, name: "Mark", created_at: "2019-03-11 00:20:42", updated_at: "2019-03-11 00:23:09">
```
```
>> User.last
SELECT "users".* FROM "users" ORDER BY "users"."updated_at" DESC LIMIT $1  [["LIMIT", 1]]

=> #<User id: 1, name: "Amit", created_at: "2019-03-11 00:18:41", updated_at: "2019-03-11 00:23:33">
```

## Dễ dàng redirect ở server và kèm theo các params với follow_redirect!
```ruby
def create
  # do stuff
  follow_redirect!(params: { user: params[:user_id] })
end
```

## Action cable được tích hợp trực tiếp
Trong [docs](https://edgeguides.rubyonrails.org/action_cable_overview.html) nó được giới thiệu là "full-stack offering": Nó cung cấp cả client-side JavaScript framework, và Ruby server-side framework. Vì nó gắn liền với Rails, nên chúng ta sẽ phải truy cập tới các models từ trong các WebSocket workers

Action Cable có thể chạy độc lập với server, hoặc chúng ta có thể thiết lập để nó chạy trên bên trong server của ứng dụng Rails.
![](https://images.viblo.asia/9af3befa-b519-4eb5-8ab8-38b49e031505.png)

ActionCable sử dụng Rack Socket Hijacking API để tiếp quản việc điều khiển kết nối từ ứng dụng server. ActionCable sau đó sẽ quản lý việc kết nối một cách riếng rẽ, đa luồng, nhiều kênh.

Đối với mỗi instance của ứng dụng khi được 'spins up', instance của Action Cable được tạo sử dụng Rack để mở và duy trì việc kết nối, và sử dụng một kênh gắn kết trên một sub-URI trong ứng dụng để stream từ những phần nhất định trong ứng dụng và broadcaset tới những phần khác.

ActionCable cung cấp server-side code để broadcast nội dung nhất định ( new message hay notification) thông qua kênh "channel" tới một "subscriber". Subscriber này được khởi tạo từ phía clint-side với một hàm JS sử dụng JQuery để append nội dung vào DOM.

## Webpacker

> Bắt đầu với Rails 6, Webpacker là một compiler mặc định trong javascript. Nghĩa là tất cả code JavaScript sẽ được xử lý bởi Webpacker thay vì Asset Pipeline như trong rails 5. Về asset pipeline mình xin phép được trình bày trong một bài viết khác . Trong phạm vi bài viết này, chúng ta sẽ cùng tìm hiểu về cách tổ chức và hoạt động của Webpacker trong Ruby on Rails 6.

Nói cho đơn giản thì nó là một ruby gem được sử dụng để quản lý và đóng gói các đoạn code javascript. Khi tạo một application trên rails 6 thì mình sẽ nhìn thấy như bên dưới:

```
RAILS_ENV=development environment is not defined in config/webpacker.yml, falling back to production environment
      create  config/webpacker.yml
Copying webpack core config
      create  config/webpack
      create  config/webpack/development.js
      create  config/webpack/environment.js
      create  config/webpack/production.js
      create  config/webpack/test.js
```

Bạn cũng sẽ nhìn thấy gem webpacker trong Gemfile. Đối với trường hợp sử dụng Rails 5 để update lên rails 6, Gem webpaker sẽ không tự động có sẵn trong Gemfile. Trong trường hợp này bạn sẽ tự đưa nó vào trong Gemfile và chạy câu lệnh: `rails webpacker:install`

> Đối với các phiên bản Rails trước Rails 6, tất cả các đoạn code javascript được lưu trữ trong app/assets/javascripts. Nhưng trong rails 6 đã không còn tồn tại đường dẫn này. Thay vào đó, một nơi lưu trữ mới được tạo ra tại: app/javascripts. thư mục này để lưu trữ tất cả các mã JavaScript. Ok chúng ta sẽ xem về cấu trúc của thư mục này:

![](https://images.viblo.asia/8d505cf4-2839-4642-8815-db95e74b37c0.png)

> Vậy làm thế nào để sử dụng các file javascript khi bạn đã đặt chúng vào app/javascript/packs.

 Rất đơn giản, Webpacker đã cung cấp cho chúng ta method là javascript_pack_tag, method cũng giống như method javascript_link_tag ở trong rails 5, method này sẽ đảm bảo ứng dụng sẽ gọi đến đúng file javascript mà bạn đã cung cấp
 
Nó trông như thế này !!!
```
 <head>
    <title>HelloWorld</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>
```
> Webpacker cung cấp khả năng tích hợp với các framwork khác của js như React, Angular, Vue,… Bạn có thể xem danh sách các lệnh / tác vụ khả dụng bằng cách chạy bundle exec rails webpacker
Trước khi tích mình cần chắc chắn rằng đã cài đặt Yarn 0.25.2+.
    
### REACT
Để sử dụng Webpacker với React, khi tạo ứng dụng rails các bạn thêm một option như sau: 

`rails new myapp --webpack=react`
    
Trong trường hợp mình đã có một rails application và muốn tích hợp React, thì các bạn sẽ chạy câu lệnh:
bundle exec rails webpacker:install:react
Rails sẽ cài đặt tất cả các thành phần phụ thuộc thông qua Yarn, các React Component cho dự án cộng thêm một ví dụ nhỏ về React được cập nhật tại** app/javascript/packs** và bạn có thể sử dụng React ngay bây giờ.

### ANGULAR WITH TYPESCRIPT
Tương tự như React, để sử dụng Webpacker với  Angular khi tạo ứng dụng rails,
các bạn thêm một option như sau: `rails new myapp --webpack=angular`
  
### VUEJS
Đối với VueJS thì mình cũng làm tương tự: rails new myapp --webpack=vue

Tích hợp VueJS với ứng dụng Rails đã có sẵn: bundle exec rails webpacker:install:vue


### TỔNG KẾT
Trên đây là một vài điểm ấn tượng mình muốn giới thiệu tới các bạn.Rails 6 còn rất nhiều điều mới khác mình sẽ nghiên cứu thêm và viết bài tiếp theo. Cảm ơn các bạn đã quan tâm đọc.

### Tài liệu tham khảo
https://www.bigbinary.com/blog/rails-6-adds-implicit_order_column
https://edgeguides.rubyonrails.org/action_cable_overview.html
https://apidock.com/rails/ActiveRecord/