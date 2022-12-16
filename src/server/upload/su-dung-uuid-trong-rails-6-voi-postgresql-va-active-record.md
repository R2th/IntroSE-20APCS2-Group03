UUID là một loại khóa chính thay thế cho cơ sở dữ liệu SQL. Nó mang lại một số lợi ích hơn so với khóa chính theo kiểu số nguyên tiêu chuẩn. Rails 6 phát hành bản beta mới giới thiệu một tính năng mới trong ActiveRecord, giúp làm việc với các khóa chính UUID đơn giản hơn. Trong hướng dẫn này, chúng tôi sẽ đi sâu vào UUID với tất cả các nhược điểm và ưu điểm của chúng.

# Ưu điểm của việc sử dụng UUID so với số nguyên
UUID là một chuỗi ngẫu nhiên theo định dạng được xác định trước có kiểu dạng như thế này:

```
ccbb63c0-a8cd-47b7-8445-5d85e9c80977
```

UUID vượt trội so với các khóa chính dựa trên số nguyên trên nhiều mặt. Tuy nhiên, một cảnh báo có thể là kích thước của các chỉ mục cơ sở dữ liệu, nhưng đối với các bảng không có dữ liệu lớn, bạn sẽ không nhận thấy sự khác biệt giữa các số nguyên và UUID.

## Hiển thị thông tin không công khai trong URL
Giá trị khóa chính thường được sử dụng công khai trong URL và API network logs. Đổi lại, mọi người có thể ước tính tổng số tài nguyên ứng dụng và tốc độ tăng trưởng của ứng dụng. 

Bạn có thực sự muốn tiết lộ có bao nhiêu người dùng đang đăng ký dịch vụ của bạn hoặc có bao nhiêu sản phẩm bạn đang bán với các URL công khai như:

```
/orders/2234/checkout
/users/287/profile
```

Vấn đề này có thể được giảm thiểu bằng cách thêm slugs, nhưng đây chỉ là các khóa duy nhất trùng lặp với yêu cầu bảo trì bổ sung.

Chuyển sang kết quả UUID trong các URL không thể tiết lộ bất kỳ thông tin bí mật nào:

```
/orders/cc7a4c8b-1a90-4287-a983-3f6e10bd88d4/checkout
/users/6b6cabb3-e37d-4dd1-ae18-a4eb893b07ae/profile
```

## Vi phạm phạm vi truy cập
Sẽ khá là khó để truy cập đúng cách vào các tài nguyên trong các ứng dụng web với logic kinh doanh không bình thường. Rails làm cho nó quá dễ dàng như

```ruby
class InvoicesController < ApplicationController
  ...

  def show
    Invoice.find(params.fetch(:id))
  end
end
```

Thay vì:

```
class InvoicesController < ApplicationController
  ...

  def show
    current_user.invoices.find(params.fetch(:id))
  end
end
```

Ví dụ này có vẻ rõ ràng, nhưng trong các ứng dụng khác - khi mà một user có nhiều vai trò khác nhau và logic phức tạp cho những ai có thể truy cập vào cái gì, nó không phải lúc nào cũng có thể ngăn chặn hoàn toàn các lỗi tương tự.

Trong ví dụ trên, nếu ID hóa đơn là loại UUID, kẻ tấn công sẽ không thể quét tuần tự các giá trị ID số nguyên tìm kiếm lỗ hổng bảo mật. Thay đổi đơn giản này làm cho một loạt các lỗi bảo mật tiềm năng cực kỳ khó khai thác.

Dù sao đi nữa, tôi khẳng định rằng việc sử dụng UUID sẽ giải phóng bạn khỏi việc giới hạn truy cập vào các tài nguyên trong ứng dụng web của bạn. Tuy nhiên, nó có thể giúp bạn tiết kiệm trong trường hợp lỗ hổng bảo mật tương tự được phát hiện trong dự án của bạn.

## Độc lập với Frontend
Các khóa chính UUID cho phép các ứng dụng frontend tạo độc lập các đối tượng mới, cùng với ID mà không cần nói chuyện với backend. Một ID duy nhất có thể được tạo bằng mã JavaScript và khả năng trùng lặp với các đối tượng đã tồn tại là không đáng kể.

Cách tiếp cận này mở ra một loạt các khả năng cho các frontend developer, ví dụ, để tạo các đối tượng cùng với các liên kết của họ mà không cần gọi API.

# Sử dụng UUID trong ứng dụng Ruby on Rails
Bạn có thể tạo UUID bằng Ruby bằng cách:

```ruby
require "securerandom"

SecureRandom.uuid => "b436517a-e294-4211-8312-8576933f2db1"
```

Để bật UUID trong PostgreSQL, bạn cần tạo migration sau:

```ruby
class EnableUUID < ActiveRecord::Migration
  def change
    enable_extension "pgcrypto"
  end
end
```

Đừng quên chạy

```bash
rails db:migrate
```

Bây giờ bạn có thể cấu hình các bảng mới để sử dụng UUID làm khóa chính của chúng:

```ruby
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users, id: :uuid  do |t|
      t.string :name
      t.timestamps
    end
  end
end
```

Nhớ đặt đúng kiểu dữ liệu khóa ngoài trên các model quan hệ. Đối với trường hợp model này

```ruby
# app/models/user.rb

class User < ApplicationRecord
  has_many :comments
end
```

```ruby
# app/models/comments.rb

class Comment < ApplicationRecord
  belongs_to :user
end
```

Migration để tạo comment sẽ như thế này

```ruby
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments, id: :uuid  do |t|
      t.string :content
      t.uuid :user_id
      t.timestamps
    end

    add_index :comments, :user_id
  end
end
```

Nếu bạn muốn tất cả các mô hình trong tương lai của bạn sử dụng UUID cho các khóa chính theo mặc định, bạn cần thêm file sau đây

```ruby
# config/initializers/generators.rb

Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

## Làm cách nào để chuyển khóa chính của một bảng từ số nguyên sang UUID?
Việc thay đổi type của khóa chính không hề đơn giản. Đầu tiên, cần bắt đầu bằng cách chạy một migration tương tự, điều đó sẽ tạo ra một cột `uuid` mới. Sau đó đổi tên cột `id` cũ thành `integer_id`, bỏ đặt nó làm khóa chính tiện cho cột `uuid` mới sau khi đổi tên thành `id`.

```ruby
class AddUUIDToUsers < ActiveRecord::Migration
  def up
    add_column :users, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :users, :id, :integer_id
    rename_column :users, :uuid, :id
    execute "ALTER TABLE users drop constraint users_pkey;"
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"

    # Optinally you remove auto-incremented
    # default value for integer_id column
    execute "ALTER TABLE ONLY users ALTER COLUMN integer_id DROP DEFAULT;"
    change_column_null :users, :integer_id, true
    execute "DROP SEQUENCE IF EXISTS users_id_seq"
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
```

Tôi sẽ không đi vào chi tiết về cách migrate associations vì nó sẽ khác nhau cho các trường hợp sử dụng. Bạn cần làm theo các bước tương tự để thêm cột loại UUID mới và dựa trên giá trị từ khóa ngoài số nguyên cũ, bạn phải gán lại các khóa UUID chính xác. Việc này có thể sẽ tốn thời gian. 

## Vấn đề sắp xếp UUID

Trước Rails 6, dùng thử UUID trong ứng dụng của bạn có thể hơi nản lòng. Rõ ràng `first` và `last` -  các phương thức `ActiveRecord::Relation`  không còn hoạt động như mong đợi, trả về một đối tượng dường như ngẫu nhiên từ một collection.

Hãy cùng xem một truy vấn SQL được tạo bằng cách chạy `User.last`

```sql
SELECT * FROM users ORDER BY id DESC LIMIT 1
```

Các khóa chính số nguyên được tạo tuần tự. Chúng ta có thể giả định một cách an toàn rằng đối tượng được tạo gần đây nhất sẽ có giá trị ID cao nhất.

Ngược lại, do tính chất hoàn toàn ngẫu nhiên của UUID, nó được tạo ra theo thứ tự không tuần tự. PostgreSQL vẫn có thể sắp xếp chúng bằng thuật toán xác định. Điều đó có nghĩa là một UUID duy nhất từ bảng sẽ luôn có vị trí đầu tiên khi sắp xếp. Thật không may, nó không liên quan gì khi nó được tạo so với các giá trị UUID khác từ cùng một bảng.

Nó dẫn đến một hành vi dường như có lỗi của các phương thức `first` và `last` trước Rails 6 bởi vì theo mặc định, chúng ngầm sắp xếp các mối quan hệ theo các giá trị ID.

## Những thay đổi trong Rails 6

Rails 6 đã giới thiệu [một tùy chọn cấu hình mới](https://github.com/rails/rails/pull/34480) `implicit_order_value` cho các lớp `ApplicationRecord`. Bạn có thể sử dụng nó như thế này:

```ruby
class User < ApplicationRecord
  self.implicit_order_column = "created_at"
  ...
end
```

Với cài đặt này, chạy `User.last` hiện tạo truy vấn sau

```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 1
```

Như vậy phương thức đã hoạt động đúng như mong muốn, ngay cả khi nó đang sử dụng UUID không tuần tự cho khóa chính.

Việc sử dụng `implicit_order_column` có thể gây ra một lỗi tiềm ẩn. Trường hợp xuất hiện nhiều giá trị created_at giống nhau, chạy truy vấn trên sẽ trả về kết quả không xác định. Các giá trị dấu thời gian trong Rails có độ chính xác đến mili giây, do đó có thể sẽ không có nhiều hơn một đối tượng có cùng thời gian tạo. Nhưng tạo hàng loạt các đối tượng thì rất dễ xảy ra hiện tượng này. 

## Đóng góp của tác giả 

Tác giả của bài viết ngày đã tạo một [pull request](https://github.com/rails/rails/pull/37626) liên quan đến vấn đề được đề cập ở trên và đã được merged với Rails và sẽ được phát hành trực tiếp trong bản 6.0.2.

Nó sửa đổi hành vi của `implicit_order_column` thành các kết quả sắp xếp phụ của truy vấn theo khóa chính nếu nó có sẵn. Nó đảm bảo kết quả xác định bất kể các giá trị trùng lặp tiềm năng trong cột thứ tự ngầm. Một truy vấn SQL được tạo bởi `User.last` bây giờ trông như thế:

```sql
SELECT * FROM users ORDER BY created_at DESC, id DESC LIMIT 1
```

## Sử dụng sắp xếp ngầm tùy chỉnh trong Rails cũ

Bạn đang mắc kẹt trong phiên bản Rails cũ hơn, nhưng bạn có muốn bắt đầu sử dụng `implicit_order_column` ngay bây giờ không? Bạn có thể kiểm tra [gem mới của tác giả](https://github.com/pawurb/activerecord-implicit-order) hỗ trợ tính năng này. Nó có một chút khó khăn, nhưng đang sử dụng nó mà không gặp vấn đề gì trong [dự án Abot](https://abot.app/) dựa trên Rails 5 của tác giả.

# Tổng kết
Chuyển sang UUID làm loại khóa chính mặc định trong ứng dụng Rails của bạn rất đáng để xem xét. Tôi không nghĩ tới một trường hợp  nào mà chỉ có thể sử dụng kiểu số nguyên làm khóa chính thay cho UUID. Khi tạo một model mới, bạn không thể tưởng tượng tất cả các yêu cầu business logic có thể có mà nó sẽ xử lý. Sử dụng UUID ngay từ đầu có thể giúp bạn bớt những migration rườm rà trong tương lại.

Bài viết được dịch từ [nguồn](https://pawelurbanek.com/uuid-order-rails). Cảm ơn các bạn đã đọc.