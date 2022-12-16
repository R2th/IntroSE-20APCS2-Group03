### Composite primary keys
Mình có 3 model `User, Post, Bookmark` có cấu trúc lần lượt như sau:
```ruby
# model User
class User < ApplicationRecord
  has_many :bookmarks
  has_many :posts, through: :bookmarks
end

# model Post
class Post < ApplicationRecord
  has_many :bookmarks
  has_many :users, through: :bookmarks
end

# model Bookmark
class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
```
Bảng `bookmarks` trong database có 2 khóa ngoại (foreign keys): *user_id* và *post_id*.

Câu hỏi đặt ra ở đây là `Làm thế nào để tạo 2 khóa chính hợp nhất từ 2 khóa ngoại ở trên trong bảng bookmarks?`.

Sẽ có rất nhiều câu hỏi mà bạn có thể nêu ra ở đây: 

- Trong Rails, mọi thứ hoạt động tốt hơn nếu như bạn có cột `id` là khóa chính trong mỗi bảng dữ liệu. Vì sao lại muốn dùng khóa chính kép (Composite primary keys) thay vì tuân thủ theo Rails convention và chỉ sử dụng cột `id` là khóa chính mặc định của bảng?
- Composite primary keys liệu có hỗ trợ và hoạt động ổn định đối với các thành phần khác thường sử dụng hay không? (ví như Rails link helper, ...)

Để giải quyết vấn đề cho những câu hỏi này, trước hết chúng ta cùng đi tìm cách giải quyết câu hỏi đầu tiên đưa ra `Làm thế nào để tạo 2 khóa chính hợp nhất từ 2 khóa ngoại ở trên trong bảng bookmarks?`. Có một số phương pháp tiếp cận trực tiếp mà bạn có thể đưa ra:
- Cách 1: Thêm một index cho 2 cột hợp nhất và gán cho nó là duy nhất, bằng cách:

```ruby
add_index :bookmarks, [:user_id, :post_id], unique: true
```
- Cách 2: Đơn giản, xóa cột `id` khóa chính mặc định của Rails sinh ra trong bảng `bookmarks`, thay vào đó dùng lệnh để thực thi thay đổi bảng và cập nhật 2 khóa chính là `user_id` và `post_id` (cách này mình tự nghĩ ra :D), cụ thể:
> Vì sao cần xóa cột `id`, vì đơn giản nếu bạn update add 3 columns làm khóa chính thì sẽ báo lỗi khi chạy lệnh `rails db:migrate` để update DB, như này:
> ```ruby
> Caused by:
> Mysql2::Error: Multiple primary key defined
> ```
```ruby
# MySQL DB
  def change
    create_table :bookmarks do |t|
      t.integer :user_id
      t.integer :post_id

      t.timestamps
    end
    remove_column :bookmarks, :id
    execute "ALTER TABLE bookmarks ADD PRIMARY KEY (user_id, post_id);"
  end
```
Cách này chạy ổn, và khi bạn kiểm tra cấu trúc bảng thì kết quả như sau:
```
mysql> desc bookmarks;
+------------+----------+------+-----+---------+-------+
| Field      | Type     | Null | Key | Default | Extra |
+------------+----------+------+-----+---------+-------+
| user_id    | int(11)  | NO   | PRI | NULL    |       |
| post_id    | int(11)  | NO   | PRI | NULL    |       |
| created_at | datetime | NO   |     | NULL    |       |
| updated_at | datetime | NO   |     | NULL    |       |
+------------+----------+------+-----+---------+-------+
```
Tuy vậy, với cách như hiện tại thì mình cũng không chắc Rails có thể hỗ trợ và thực thi ổn định các method, helper liên quan đến ActiveRecord association, ActiveRecord validation, ... do cấu trúc bảng đã thay đổi, khóa chính mặc định cũng bị xóa đi :D
- Cách 3: set primary_key trong model `Bookmark` với `gem "composite_primary_keys"`, được extend từ ActiveRecord để hỗ trợ composite keys.
> 1, Cài đặt:
> 
> - Chạy lệnh: gem install composite_primary_keys
> 
> Hoặc:
> 
> - Thêm vào Gemfile: gem "composite_primary_keys", "[gem version]"
>
> 2, Cách dùng:
> ```ruby
> # model Bookmark
> class Bookmark < ApplicationRecord
>  self.primary_keys = :user_id, :post_id
>  belongs_to :user
>  belongs_to :post
>end
> ```
> Gem cung cấp một số method:
> ```ruby
> Bookmark.primary_key  # => [:user_id, :post_id] # composite keys
> Bookmark.primary_key.to_s # => "user_id,post_id"
> 
> Bookmark.find([1,1])  # composite ids returns single instance
> => <Bookmark:0x39218b0 @attributes={"user_id"=>"1", "post_id"=>"1"}>
> ```
> Hỗ trợ cho các hệ quản trị CSDL:
> * PostgreSQL
> * MySQL
> * MariaDB
> * Oracle
> * DB2
> * SQLite
> * SQLServer
>
> Việc sử dung gem là hiệu quả, vì cấu trúc các bảng trong cơ sử dữ liệu vẫn giữ nguyên, đồng nghĩa với việc Rails vẫn hỗ trợ mạnh mẽ lợi ích làm việc với ActiveRecord, và bạn vẫn đạt được mục đích của Composite primary keys <3

### Tài liệu tham khảo:
1, [Define a unique primary key based on 2 columns](https://stackoverflow.com/questions/12746280/define-a-unique-primary-key-based-on-2-columns)

2, [How to implement composite primary keys in rails](https://stackoverflow.com/questions/41888549/how-to-implement-composite-primary-keys-in-rails#)

3, [Gem Composite primary keys](https://github.com/composite-primary-keys/composite_primary_keys)