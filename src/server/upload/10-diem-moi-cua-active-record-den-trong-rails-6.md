Trong bài viết này, chúng ta sẽ xem xét 10 tính năng mới được bổ sung cho Active Record trong Rails 6. Với mỗi lần bổ sung, tôi sẽ đính kèm một liên kết đến PR mà tính năng được giới thiệu, một liên kết đến hồ sơ GitHub của tác giả và một bản tóm tắt mô tả về những gì tính năng cung cấp.

Chúng ta có rất nhiều thứ để nói đến, vì vậy hãy bắt đầu nào!

## 1. rails db:prepare

[PR 35678](https://github.com/rails/rails/pull/35768) bởi [@robertomiranda](https://github.com/robertomiranda)

Khi rake task này được thực, nếu cơ sở dữ liệu tồn tại, nó sẽ chạy tất cả cả migrations đang tồn đọng. Còn nếu cơ sở dữ liệu không tồn tại, nó sẽ chạy rake task db:setup.

Tính năng này được thiết kế để được chạy nhiều lần mà cho ra kết quả không đổi, cho phép nó được chạy đi chạy lại cho đến khi công việc được hoàn thành thành công.
4. Negative Scopes for Enums
Rake task db:setup có flow như sau:

![](https://images.viblo.asia/9757f1b3-8417-44b1-8a14-2d2556fea819.jpg)

Nếu bạn không quen thuộc với nó, rake task db: setup làm những công việc sau:

*      Tạo cơ sở dữ liệu
*      Tải tệp lược đồ.rb hoặc struct.sql (dựa vào ứng dụng bạn đang sử dung)
*      Chạy rake task db: seed, chạy code trong tệp db/seed.rb

## 2. rails db:seed:replant

[PR 34779](https://github.com/rails/rails/pull/34779) bởi [@bogdanvlviv](https://github.com/bogdanvlviv)

Rake task db: seed:replant này thực hiện hai việc:

*      Chạy truncate trên tất cả các bảng được quản lý bởi ActiveRecord trong môi trường Rails mà rake task này đang được chạy. (Lưu ý rằng việc truncate sẽ xóa tất cả dữ liệu trong bảng, nhưng không đặt lại bộ đếm tăng tự động (ID) của bảng)
*      Chạy rake task db:seed tạo dữ liệu mẫu.

## 3. Automatic Database Switching

[PR 35073](https://github.com/rails/rails/pull/35073) bởi [@eileencodes](https://github.com/eileencodes)

Rails 6 cung cấp một framework để tự động định tuyến các yêu cầu đến tới kết nối cơ sở dữ liệu chính hoặc bản sao dùng để đọc.

Theo mặc định, chức năng mới này cho phép ứng dụng của bạn tự động định tuyến các yêu cầu đọc (GET, HEAD) đến cơ sở dữ liệu bản sao nếu nó đã qua ít nhất 2 giây kể từ yêu cầu ghi cuối cùng (bất kỳ yêu cầu nào không phải là yêu cầu GET hoặc HEAD) được thực hiện.

Logic chỉ định khi nào yêu cầu đọc nên được định tuyến đến một bản sao được viết trong một resolver class, mặc định sẽ là  ActiveRecord::Middleware::DatabaseSelector::Resolver, bạn có thể ghi đè nếu bạn muốn điều chỉnh hành vi của nó.

Middleware cũng cung cấp một session class, ActiveRecord::Middleware::DatabaseSelector::Resolver::Session có nhiệm vụ theo dõi khi nào yêu cầu ghi cuối cùng được thực hiện. Giống như resolver class, lớp này cũng có thể bị ghi đè.

Để sử dụng hành vi mặc định, bạn sẽ thêm các tùy chọn cấu hình sau vào một trong các tệp môi trường của ứng dụng - ví dụ: config/environments/production.rb:

```ruby
config.active_record.database_selector = { delay: 2.seconds }
config.active_record.database_resolver = 
  ActiveRecord::Middleware::DatabaseSelector::Resolver
config.active_record.database_operations = 
  ActiveRecord::Middleware::DatabaseSelector::Resolver::Session
```

Nếu bạn quyết định ghi đè chức năng mặc định, bạn có thể sử dụng các tùy chọn cấu hình này để chỉ định độ trễ bạn muốn sử dụng, tên của resolver cass và session classs của bạn, cả hai đều là hậu duệ của các lớp mặc định.

## 4. Negative Scopes for Enums

[PR 35381](https://github.com/rails/rails/pull/35381) bởi [@dhh](https://github.com/dhh)


Mặc dù từ xa xưa enum đã cung cấp các scopes để tìm các mục theo giá trị enum của chúng, nhưng nó không cung cấp một scopes nào để tìm kiếm các mục mà giá trị không thỏa mãn một phạm vi nhất định nào đó.

Ví dụ: chúng ta tạo một model Post dành cho một trang blog, với trường trạng thái là một enum:

```ruby
enum status %i(draft published archived)
```

Các scopes sau đây đã được cung cấp sẵn từ khi enum mới đc công bố:

```ruby
scope :draft, -> { where(status: 0) }
scope :published, -> { where(status: 1) }
scope :archived, -> { where(status: 2) }
```

Bây giờ, các scopes trái sau đây cũng có sẵn:

```ruby
scope :not_draft, -> { where.not(status: 0) }
scope :not_published, -> { where.not(status: 1) }
scope :not_archived, -> { where.not(status: 2) }
```

Điều này giúp ta dễ dàng tìm thấy các bài đăng chưa được công bố:

```ruby
Post.not_published
```

## 5. #extract_associated

[PR 35784](https://github.com/rails/rails/pull/35784) bởi [@dhh](https://github.com/dhh)


Phương thức #extract_associated mới thực sự chỉ là sự kết hợp giữa preload và map/collect.

Đây là mã nguồn của phương thức:

```ruby
def extract_associated(association)
  preload(association).collect(&association)
end
```

Xin lưu ý rằng preload không cho phép bạn chỉ định các điều kiện trên các association được "preloaded". Bạn sẽ muốn sử dụng một cơ chế eager-loading khác cho điều đó như includes, eager_load hoặc joins

Việc sử dụng #extract_associated có thể giống như thế này:

```ruby
commented_posts = user.comments.extract_associated(:post)
```

## 6. #annotate

[PR 35617](https://github.com/rails/rails/pull/35617) bởi [@mattyoho](https://github.com/mattyoho)

Đây là một tính năng bổ sung tiện lợi có thể được sử dụng để thêm thông tin hữu ích vào các tệp nhật ký của ứng dụng của bạn. Phương thức #annotate cung cấp một cơ chế để nhúng các nhận xét vào SQL được tạo bởi các truy vấn ActiveRecord. Là một lợi ích bổ sung, các ghi chú mà nó tạo ra có thể là bất cứ thứ gì bạn muốn.

Chèn chú thích vào chuỗi truy vấn của bạn như dưới đây:

```ruby
User
  .annotate('there can be only one!')
  .find_by(highlander: true)
```

Sẽ tạo SQL như sau:

```sql
SELECT "users".*
FROM "users"
WHERE "users"."highlander" = ? /* there can be only one! */
LIMIT ? [["highlander", 1], ["LIMIT", 1]]
```

## 7. #touch_all

[PR 31513](https://github.com/rails/rails/pull/31513) bởi [@fatkodima](https://github.com/fatkodima)

Một phương thức ActiveRecord::Relation khác được thêm vào là  #touch_all chạm vào tất cả các bản ghi trong phạm vi hiện tại, cập nhật timestamps của chúng.

Bạn có thể truyền một mảng để touch và tùy ý cung cấp giá trị thời gian để sử dụng. touch_all mặc định theo thời gian hiện tại ở bất kỳ múi giờ nào mà cấu hình của ứng dụng đã được đặt sử dung config.active_record.default_timezone (cài đặt mặc định thành UTC).

Ví dụ: để cập nhật trường update_at của tất cả các nhận xét được liên kết với một bài đăng trên blog nhất định, @post, bạn có thể:

```ruby
@post.comments.touch_all
```

Để cập nhật một trường nhất định trên các nhận xét, giả sử: review_at, bạn sẽ cung cấp tên cột:

```ruby
@post.comments.touch_all(:reviewed_at)
```

Và, để chỉ định giá trị thời gian, bạn sẽ:

```ruby
@post.comments.touch_all(:reviewed_at, time: the_time)
```

## 8. #destroy_by and #delete_by

[PR 35316](https://github.com/rails/rails/pull/35316) bởi [@abhaynikam](https://github.com/abhaynikam)


Các phương thức delete_by và destroy_by nhằm cung cấp tính đối xứng ("về mặt tinh thần") với các phương thức find_by và find_or_create_by của ActiveRecord (yaoming)

Tôi tin rằng có một sự khác biệt quan trọng bạn nên biết đến. find_by trả về một bản ghi hoặc nil, trong khi hủy_by và xóa_by sẽ xóa toàn bộ bộ sưu tập các bản ghi.

Chúng ta thường sử dụng find_by như thế này:

```ruby
User.find_by(admin: true)
```

Sẽ tạo ra lệnh query SQL sau:

```sql
SELECT  "users".*
FROM "users"
WHERE "users"."admin" = $1
LIMIT 1  [["admin", 1]]
```

Trong khi đó, sử dụng delete_by với cùng tham số như trên:

```ruby
User.delete_by(admin: true)
```

Sẽ cho ra kết quả như sau:

```ruby
DELETE FROM "users"
WHERE "users"."admin" = ?  [["admin", 1]]
```

Đây là một điều đáng lưu tâm về mặt rủi do khi sử dụng phương thức này.

Ngoài ra, còn một điều nữa là không có phiên bản chấm than (!) của các phương thức delete_by/destroy_by.

## 9. Endless Ranges in #where

[PR 34906](https://github.com/rails/rails/pull/34906) bởi [@gregnavis](https://github.com/gregnavis)

Ruby 2.6 giới thiệu ranges vô hạn (range có điểm đầu nhưng ko có điểm cuối). Tính năng mới này cho phép bạn sử dụng chúng trong mệnh đề #where của Rails.

Ví dụ: khi cố gắng tìm một Bài đăng có hơn 10 bình luận.

Trước đây bạn sẽ viết câu truy vấn như đây:

```ruby
Post.where('num_comments > ?', 10)
```

Bây giờ bạn có thể sử dụng cú pháp Ruby dễ hiểu hơn:

```ruby
User.where(num_comments: (10..))
```

## 10. Implicit Ordering

[PR 34480](https://github.com/rails/rails/pull/34480) bởi [@tekin](https://github.com/tekin)

Tính năng này làm cho phép chúng ta tùy chỉnh cách đánh id của một bảng trong cơ sở dữ liệu.

Đặt cột thứ tự ngầm định của bảng cho phép bạn chỉ định một thứ tự mặc định, không cần sử dụng default scope.

Ví dụ: nếu bạn khai báo một thứ tự ngầm trên bảng Post của mình:

```ruby
class Post < ActiveRecord::Base
  self.implicit_order_column = 'title'
end
```

Xin lưu ý rằng nếu bạn khai báo thứ tự ngầm trên một cột không đảm bảo các giá trị là duy nhất, kết quả của bạn có thể không như bạn mong đợi.

- Link tới bài viết gốc:
https://hint.io/blog/10-New-Things-in-Active-Record