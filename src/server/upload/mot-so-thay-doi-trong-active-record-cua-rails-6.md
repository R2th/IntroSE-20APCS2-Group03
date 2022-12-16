# 1. ActiveRecord::Relation#pick 
Trước Rails 6
Pluck được sử dụng để lấy ra một mảng của attribute value khi query, giúp giảm step loop qua từng phần tử trong mảng ActiveRecord

Pluck.first sẽ lấy ra phần tử đầu tiên của mảng.
```ruby
User.limit(1).pluck(:name).first
# SELECT "users"."name" FROM "users" LIMIT ? [["LIMIT", 1]]
# => "David"
User.where(id: 1).pluck(:name).first
# SELECT "users"."name" FROM "users" WHERE "users"."id" = $1
# => "David"
```

Rails 6
Pick được sử dụng thay Pluck.first với mục đích là lấy ra phần tử đầu tiên của mảng
```ruby
User.pick(:name)
# SELECT "users"."name" FROM "users" LIMIT ? [["LIMIT", 1]]
# => "David"

User.where(id: 5).pick(:name, :city)
# SELECT "users"."name", "users"."city" FROM "users" WHERE "users"."id" = ? LIMIT ? [["id", 5], ["LIMIT", 1]]
# => ["Naiya", "Goa"]
```
# 2. ActiveRecord::Base.create_or_find_by/!
create_or_find_by rails 6 là method thay cho find_or_create_by khi nó thay đổi thứ tự từ select->insert thành insert->select để tránh race condition khi sử dụng find_or_create_by trong các ứng dụng cần high scale.

Nếu một bản ghi đã tồn tại với các ràng buộc duy nhất, sẽ đưa ra một ngoại lệ giống việc sử dụng find_by.
Giả sử có 2 bảng với ràng buộc như sau
```ruby
class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title, index: { unique: true }

      t.timestamps
    end
  end
end
```
```ruby
class Post < ApplicationRecord
  validates :title, presence: true
end
```

Sử dụng **create_or_find_by**

![](https://images.viblo.asia/093337e6-4788-49d1-b399-a38f495d3982.png)

Raise ngoại lệ với  **create_or_find_by!**

![](https://images.viblo.asia/ad2aec7b-f663-4303-a40d-acd71b02d718.png)

# 3. Enum
Enum được sử dụng nhiều để đặt tên cho scope. Trong Rails 6 để đặt tên cho scope với ý nghĩa lấy ra phủ định ta có thể sử dụng **not_***
```ruby
class Feed < ActiveRecord::Base
  enum status: %i[ active pending trashed ]
end

Feed.not_active # => where.not(status: :active)
Feed.not_pending  # => where.not(status: :pending)
Feed.not_trashed # => where.not(status: :trashed)
```

# 4. update_columns
update_columns trong Rails được sử dụng để update record mà bỏ qua các điều kiện (validate) của thuộc tính. 

Rails 6 khi sử dụng update_columns cho thuộc tính không tồn tại sẽ raise lên lỗi **ActiveModel::MissingAttributeError**.

Ở các phiên bản rails 4 hay rails 5 thì trong trường hợp này sẽ raise lên lỗi **ActiveRecord::StatementInvalid**
```ruby
# Rails 6
> User.first.update_columns(office_email: 'mit@gmail.com')

SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]

Traceback (most recent call last):
        1: from (irb):1
ActiveModel::MissingAttributeError (can't write unknown attribute `office_email`)
```

```ruby
# Rails 5.2
> User.first.update_columns(office_email: 'mit@gmail.com')
SELECT  "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
UPDATE "users" SET "office_email" = $1 WHERE "users"."id" = $2  [["office_email", "mit@gmail.com"], ["id", 1]]

=> Traceback (most recent call last):
        1: from (irb):8
ActiveRecord::StatementInvalid (PG::UndefinedColumn: ERROR:  column "office_email" of relation "users" does not exist)
LINE 1: UPDATE "users" SET "office_email" = $1 WHERE "users"."id" = $2
                           ^
: UPDATE "users" SET "office_email" = $1 WHERE "users"."id" = $2
```
# 5. delete_by and destroy_by
Rails có **find_or_create_by**, **find_by** và các phương thức tương tự để tìm giá trị đầu tiên và tạo nếu không tìm thấy bản ghi khớp với các tham số đã cho.

Rails bị thiếu tính năng tương tự để xóa/hủy một record phù hợp điều kiện, ở các bản Rails trước chỉ hỗ trợ phương thức destroy và delete_all để xóa tất cả các record.
```ruby
Sử dụng destroy và delete_all để xóa toàn bộ bản ghi phù hợp điều kiện cho trước
  User.find_by(email: "mit@gmail.com").destroy
  User.where(email: "mit@gmail.com", rating: 4).destroy_all

  User.find_by(email: "mit@gmail.com").delete
  User.where(email: "mit@gmail.com", rating: 4).delete_all
```

Rails 6 đã bổ sung việc xóa/hủy một record được tìm thấy với điều kiện cho trước với 2 phương thức là delete_by and destroy_by
```ruby
Cú pháp:
model_name.delete_by(attr_name: 'value')
model_name.destroy_by(attr_name: 'value')
```

```ruby
Sử dụng destroy_by và delete_by để xóa bản ghi phù hợp điều kiện cho trước
  User.destroy_by(email: "mit@gmail.com")
  User.destroy_by(email: "mit@gmail.com", rating: 4)

  User.delete_by(email: "mit@gmail.com")
  User.delete_by(email: "mit@gmail.com", rating: 4)
```
# 6. ActiveRecord::Relation#touch_all
Trong Rails, phương thức **touch** được sử dụng để update trường updated_at từ thời gian mặc định để current time. Không có validate và chỉ có các callback **after_touch, after_commit, and after_rollback** được thực hiện.

Rails 6 đã thêm phương thức **touch_all** trong ActiveRecord::Relation để touch vào nhiều bản ghi cùng một lúc.

Trước Rails 6, cần lặp lại trên tất cả các bản ghi bằng cách sử dụng một trình vòng lặp. Kết quả sẽ trả về một mảng ActiveRecords.
```ruby
# Rails 5.2
> User.count
SELECT COUNT(\*) FROM "users"
=> 3

> User.all.touch_all
=> Traceback (most recent call last):1: from (irb):2
NoMethodError (undefined method 'touch_all' for #<User::ActiveRecord_Relation:0x00007fe6261f9c58>)

> User.all.each(&:touch)
SELECT "users".* FROM "users"
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2019-04-20 16:23:31.388028"], ["id", 1]]
commit transaction
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2019-04-20 16:23:31.418028"], ["id", 2]]
commit transaction
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2019-04-20 16:23:31.518028"], ["id", 3]]
commit transaction

=> [#<User id: 1, name: "John", email: "john@gmail.com", rating: 2, created_at: "2019-04-10 16:09:29", updated_at: "2019-04-20 16:23:31">, #<User id: 2, name: "Marry", email: "marry@gmail.com", rating: 4, created_at: "2019-04-10 16:09:43", updated_at: "2019-04-20 16:23:31">, #<User id: 3, name: "Poll", email: "poll@gmail.com", rating: 4, created_at: "2019-04-10 16:09:45", updated_at: "2019-04-20 16:23:31">]
```

Với Rails 6 thì phương thức touch_all sẽ trả về số lượng của ActiveRecords
```ruby
# Rails 6
> User.count
SELECT COUNT(*) FROM "users"
=> 3

> User.all.touch_all
UPDATE "users" SET "updated_at" = ?  [["updated_at", "2019-04-20 16:10:40.490507"]]
=> 3
```

Ngoài ra, touch_all còn lấy custom_time hoặc tham số khác ở các cột như ở ví dụ dưới
```ruby
User.all.touch_all(time: Time.new(2019, 4, 12, 1, 0, 0))
User.all.touch_all(:created_at)
```

**Cảm ơn các bạn đã theo dõi đến đây!!!**

**Nguồn tham khảo:**
https://www.botreetechnologies.com/blog/notable-activerecord-changes-in-rails-6-part-1
https://www.botreetechnologies.com/blog/notable-activerecord-changes-in-rails-6-part-2