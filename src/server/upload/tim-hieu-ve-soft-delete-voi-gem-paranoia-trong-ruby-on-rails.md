# Paranoia dùng để làm gì? 
Gem này có tác dụng khi xóa bỏ một đối tượng, nó sẽ không thực sự xóa bản ghi ở trong cơ sở dữ liệu, mà chỉ ẩn nó đi.

Paranoia thực hiện điều này bằng cách đặt trường ` deleted_at` thành thời điểm hiện tại khi bạn xóa bản ghi và ẩn nó bằng cách phân tích tất cả các truy vấn trên model của bạn và chỉ hiện các bản ghi không có trường deleted_at hoặc không có giá trị.

Nếu bạn muốn thực sự xóa một đối tượng, bạn có thể gọi `really_destroy!` Điều này cũng sẽ thực sự xóa tất các các association `dependent: :destroy`, điều này khá nguy hiểm các bạn hãy cân nhắc trước khi sử dụng
# Cài đặt & sử dụng
## Cài đặt
Để cài đặt gem paranoia, ta thêm tên gem vào Gemfile:
```
Với Rails 3:
  gem "paranoia", "~> 1.0"
Với Rails 4:
  gem "paranoia", "~> 2.0"
Với Rails 5:
  gem "paranoia", "~> 2.2.0.pre"
```
Sau đó chạy `bundle ínstall` để cài đặt.

Chạy migrate để thêm column deleted_at vào table:
```ruby
bin/rails generate migration AddDeletedAtToClient deleted_at:datetime:index
# Client là tên table cần soft delete
```

## Sử dụng
Thêm acts_as_paranoid vào model để thực hiện soft delete với ActiveRecord
```ruby
class Client < ActiveRecord::Base
  acts_as_paranoid

  # ...
end
```


Nếu bạn muốn sử dụng một cột không phải là remove_at, bạn có thể chuyển nó dưới dạng tùy chọn:
```ruby
class Client < ActiveRecord::Base
  acts_as_paranoid column: :destroyed_at

  ...
end

```

Sau khi hoàn tất việc cài đặt, khi gọi delete sẽ update giá trị cho trường deleted_at:
```ruby
>> client.deleted_at
# => nil
>> client.destroy
# => client
>> client.deleted_at
# => [current timestamp]
```
Để thực hiện việc xóa hoàn toàn record, chúng ta chạy lệnh really_destroy!:
```ruby
>> client.deleted_at
# => nil
>> client.really_destroy!
# => client
```


Để truy vấn tất cả các record đã bị xóa bởi soft delete:
```ruby
Client.only_deleted
```
Để truy vấn tất cả các record đang tồn tại trong database, bao gồm đã xóa và chưa xóa:
```ruby
Client.with_deleted
```
Nếu bạn muốn loại trừ các bản ghi đã xóa:
```ruby
Client.without_deleted
```

Để kiểm tra xem record đó đã được soft delete hay chưa:
```ruby
client.paranoia_destroyed?
# or
client.deleted?
```
Để khôi phục record đã bị soft delete:
```ruby
Client.restore(id)
# or
client.restore
# or
Client.restore([id1, id2, ..., idN])
```
Nếu muốn khôi phục cả những record có quan hệ dependently destroyed:
```ruby
Client.restore(id, :recursive => true)
# or
client.restore(:recursive => true)
```
Nếu muốn khôi phục cả những record có quan hệ dependently destroyed mà được xóa trong vòng 2 phút trước: 
```ruby
Client.restore(id, :recursive => true. :recovery_window => 2.minutes)
# or
client.restore(:recursive => true, :recovery_window => 2.minutes)
```

Với những bản ghi có quan hệ dependently destroyed cần lưu ý rằng bất kỳ phương thức nào được gọi trên model cha cũng sẽ được gọi trên model con. Ví dụ:
```ruby
class Client < ActiveRecord::Base
  acts_as_paranoid

  has_many :emails, dependent: :destroy
end

class Email < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :client
end
```

Khi ta gọi destroy ở model `client` thì phương thức destroy cũng được gọi ở model `emails` Ví dụ:
```ruby
>> client.emails.count
# => 5
>> client.destroy
# => client
>> client.deleted_at
# => [current timestamp]
>> Email.where(client_id: client.id).count
# => 0
>> Email.with_deleted.where(client_id: client.id).count
# => 5
```

Tương tự như vậy, khi chúng ta gọi really_destroy! trên `client`, sau đó mỗi `email` của `client` cũng sẽ có really_destroy!:
```ruby
>> client.emails.count
# => 5
>> client.id
# => 12345
>> client.really_destroy!
# => client
>> Client.find 12345
# => ActiveRecord::RecordNotFound
>> Email.with_deleted.where(client_id: client.id).count
# => 0
```
Tuy nhiên, nếu model Email không có `act_as_paranoid`, thì việc gọi destroy trên `client` cũng sẽ gọi hủy destroy các email của client đó và thực sự destroy chúng:
```ruby
class Client < ActiveRecord::Base
  acts_as_paranoid

  has_many :emails, dependent: :destroy
end

class Email < ActiveRecord::Base
  belongs_to :client
end

>> client.emails.count
# => 5
>> client.destroy
# => client
>> Email.where(client_id: client.id).count
# => 0
>> Email.with_deleted.where(client_id: client.id).count
# => NoMethodError: undefined method `with_deleted' for #<Class:0x0123456>
```

Qua bài viết trên là mong các bạn sẽ có thêm kiến thức cơ bản cũng như cách sử dụng của Paranoia để áp dụng vào project Ruby on Rails của các bạn. Nếu thấy bài viết có ích thì up vote cho mình nhé ^^
Nguồn tài liệu: https://github.com/rubysherpas/paranoia