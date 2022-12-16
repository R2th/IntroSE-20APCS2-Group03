Gần đầy rails vừa cập nhật lên phiên bản thứ 6 với một số thay đổi lớn như thay đổi Javascript complier mặc định là Webpacker thay vì assest pipeline (Sprockets) và cập nhật thêm một số method giúp cho lập trình viên làm việc nhanh hơn. Nào chúng ta cùng bắt đầu :grin:
## Webpaker là gì?
Việc đầu tiên khi nhắc đến Rails 6 thì webpacker là được chú ý nhiều nhất, vậy webpacker là gì? mà lại được set làm mặc định thay cho sprockets. 
Webpacker là gem đóng gói **webpack** -   *the popular JavaScript tool used for managing and bundling JavaScript code*  , nói  ngắn gọn thì Webpack là công cụ giúp gói gọn toàn bộ file js, css(bao gồm cả scss,sass,..).

Webpacker giúp chúng ta sử dụng được webpack một cách dễ dàng mà không phải nhức não config nó ( nhưng khá khó để config sâu hơn, nếu người đã biết webpack)
Khi bạn tạo mới ứng dụng rails `rails new` bạn sẽ nhìn thấy output dưới console như thế này

```sh
rails  webpacker:install
RAILS_ENV=development environment is not defined in config/webpacker.yml, falling back to production environment
create  config/webpacker.yml
Copying webpack core config
create  config/webpack
create  config/webpack/development.js
create  config/webpack/environment.js
create  config/webpack/production.js
create  config/webpack/test.js
```
Và bạn sẽ thấy cài rất nhiều package thông qua `yarn`
Bạn kiểm tra `Gemfile` bạn sẽ thấy `webpacker` đã được cài đặt mặc định.
## Thay đổi nơi chưa javascript code
Ở các phiên bản rails 6 code javascript sẽ được chứa ở `app/assets/javascripts`,  nhưng từ rails 6 javascript code và code front end sẽ được quản lý tại `app/avascripts`

```
testrails tree app/javascripts
app/javascript
├── channels
│   ├── consumer.js
│   └── index.js
└── packs
    └── application.js

2 directories, 3 files
```

Có 2 thư mục chính đó là `channels` và `packs`. Thư mục channels được tạo bởi Action Cable và thư mục pack là thư mục quan trọng nó sẽ chứa tất cả code javascript, image , css, scss...
Ở đây mình sẽ chưa đi sâu vào, ở các bài viết sau minh sẽ tìm hiểu chi tiết hơn.

## Thêm shortcut method #pick

Giả sử bạn muốn tìm tên của user có email là: `test@gmail.com` thì bạn sẽ viết như sau
```ruby
User.where(email: 'test@gmail.com').limit(1).pluck(:name).first
# (0.7ms)  SELECT  "users"."name" FROM "users" WHERE "users"."email" = $1 LIMIT $2  [["email", "test@gmail.com"], ["LIMIT", 1]]
# => Sang Vo
```
Ở rails 6 bạn chỉ cần viết lại như sau:
```ruby
User.where(email: 'test@gmail.com').pick(:name)
# (0.7ms)  SELECT  "users"."name" FROM "users" WHERE "users"."email" = $1 LIMIT $2  [["email", "test@gmail.com"], ["LIMIT", 1]]
# => Sang Vo
```

Method này được định nghĩa như sau:
```ruby
def pick(*column_names)
  limit(1).pluck(*column_names).first
end
```
## Cho phép cấu hình thuộc tính `has_secure_password`
[**has_secure_password** ](https://api.rubyonrails.org/v5.2/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password) được dùng để mã hóa và xác thực mật khẩu sử dụng gem [Bcrypt](https://github.com/codahale/bcrypt-ruby) khi model có cột `password_digest`

Trước rails 6  `has_secure_password` sẽ không chấp nhận trường nào ngoài password_digest. Nếu muốn sử dụng Bcrypt cho các trường khác ta phải tự định nghĩa lại các phương thức encrypt dựa theo bcrypt và hàm authenticate và lưu trữ chúng. 

Từ rails 6 has_secure_password đã có thể custom tham số và mặt định vẫn là trường `password` và trường tự định nghĩa phải đặt tên theo dạng `column_name_digest` trên model. Và has_secure_password cũng được thêm method `authenticate_column_name` để xác thực column đó.
Ta sẽ xem qua ví dụ sau
```ruby
>> class User < ApplicationRecord
>>   has_secure_password
>>   has_secure_password :activation
>> end

>> user = User.create(email: 'test@gmail.com', password: '1234456', activation: 'kBmLNImbhr2u6fgSljZ2Ww==')
BEGIN
User Create (0.5ms)  INSERT INTO "users" ("email", "password_digest", "activation_digest", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5) RETURNING "id"  [["email", "test@gmail.com"], ["password_digest", "$2a$10$nUiO7E2XrIJx/sSdpG0JAOL00uFvPRH7kXHLk5f/6qA1zLPHIrpPy"], ["activation_digest", "$2a$10$l6cTpHwV9xOEn2.OumI29OnualGpvr1CgrNrbuMuHyGTltko8eBG2"], ["created_at", "2019-11-17 23:42:28.723431"], ["updated_at", "2019-11-17 23:42:28.723431"]]
COMMIT

=> #<User id: 5, email: "test@gmail.com", password_digest: [FILTERED], activation_digest: [FILTERED], created_at: "2019-11-17 23:42:28", updated_at: "2019-11-17 23:42:28">

>> user.authenticate('1234456')

=> #<User id: 5, email: "test@gmail.com", password_digest: [FILTERED], activation_digest: [FILTERED], created_at: "2019-11-17 23:42:28", updated_at: "2019-11-17 23:42:28">

>> user.authenticate_activation('kBmLNImbhr2u6fgSljZ2Ww==')

=> #<User id: 5, email: "test@gmail.com", password_digest: [FILTERED], activation_digest: [FILTERED], created_at: "2019-11-17 23:42:28", updated_at: "2019-11-17 23:42:28">
```
## Phủ định của enum
Khi bạn khai báo enum một trường của model Rails sẽ thêm chúng ta một số default scope để filter dữ liệu theo giá trị đó.
Ví dụ
```ruby
class Post < ActiveRecord::Base
  enum status: %i[drafted active trashed]
end

Post.drafted # => where(status: :drafted) // Get tất cả các post với trạng thái drafter
Post.active  # => where(status: :active) // Get tất cả các bài post có trạng thái active
```
Rails 6 cung cấp ta phủ định của các  giá trị này bằng cách thêm tiền tố `not_scope`
```ruby
class Post < ActiveRecord::Base
  enum status: %i[drafted active trashed]
end

Post.not_drafted # => where.not(status: :drafted)
Post.not_active  # => where.not(status: :active)
```

## Tổng kết
Trên đây mình đã tổng hợp một số cập nhật về rails 6 hi vọng sẽ giúp ích cho các bạn.
Happy Codding~!

### Tham khảo
https://blog.bigbinary.com/  
https://weblog.rubyonrails.org/releases/