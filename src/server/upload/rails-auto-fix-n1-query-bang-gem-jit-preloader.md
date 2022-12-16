# 1. Tổng quan về lỗi N+1
 Chúng ta sẽ cùng xem ví dụ bên dưới:
 
**#Model**
```ruby
class Author < ActiveRecord::Base
  has_many :books
end

class Book < ActiveRecord::Base
  belongs_to :author
end
```

Chúng ta có 2 model với mối quan hệ 1-n như trên, bây giờ, giả sử ta muốn hiển thị 1 danh sách **books**, kèm theo thông tin **author**

**#Controller**
```ruby
@books = Book.order(:name)
```

**#View**
```ruby
@books.each do |book|
    <h1><%= book.name %></h1>
    <p><%= book.author.name %></p>
end
```

Lúc này, rails sẽ sinh ra hàng loạt câu query để lấy thông tin book, đại loại như:
```bash
Book Load (0.4ms)  SELECT  "books".* FROM "books" ORDER BY "books"."name" ASC LIMIT $1
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 2], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 3], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 4], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 5], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 6], ["LIMIT", 1]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = $1 LIMIT $2  [["id", 7], ["LIMIT", 1]]
```

Cứ có bao nhiêu record Book, sẽ sinh ra bấy nhiêu câu query Author, đây chính là ví dụ về N+1 queries, đối với khối lượng dữ liệu lớn thì điều này thật đáng sợ.

Để xử lý vấn đề này, Rails có cung cấp cho chúng ta một số method như includes, preload, eager_load. Tuy nhiên, thật tai hại là không phải lúc nào anh em coder chúng mình cũng nhận ra được sự hiện diện của N+1 trong hệ thống của mình @@.
# 2. Gem jit_preloader
 Gem jit_preloader cung cấp một "magic bullet" có thể loại bỏ hầu hết các truy vấn N + 1 trong ứng dụng của bạn.
  
###  Cài đặt
Thêm dòng này vào Gemfile của ứng dụng của bạn:
```ruby
gem 'jit_preloader'
```
Và sau đó thực hiện:
```bash
$ bundle install
```
Hoặc tự cài đặt nó:
```bash
$ gem install jit_preloader
```

Kích hoạt jit_preloader bằng cách thêm dòng này vào **config/initializer/jit_preloader.rb**
```ruby
JitPreloader.globally_enabled = true
```

Vậy là xong, Bạn không cần sử dụng includes, preload hoặc eager_load nữa. Bạn sẽ không cần phải kiểm tra mã để tìm ra những liên kết nào đang được sử dụng hoặc để tìm N + 1 truy vấn ẩn. Tất cả đều được xử lý tự động và nó sẽ chỉ tải trước liên kết nếu bạn sử dụng nó. Bạn sẽ luôn tải trước lượng dữ liệu phù hợp chính xác.

# 3. Kết luận
Với gem jit_preloader, bạn đã có thể làm bay màu đống lỗi N+1 có tồn tại trong source code của mình rồi 😍. Tuy nhiên, vẫn có những trường hợp đặt biệt mà gem này không xử lý được, lúc đó phải trông cậy vào bản thân bạn rồi :).

# Tài liệu tham khảo
https://github.com/clio/jit_preloader

https://www.aha.io/engineering/articles//2021-06-30-90-percent-of-rails-n-plus-one-queries-solved-with-a-drop-in-fix