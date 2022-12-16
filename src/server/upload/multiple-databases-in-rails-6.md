## 1. Tự động chuyển đổi connection giữa primary và replica database
Để sử dụng read-only database, bạn cần config `middleware` cho phần tự động chuyển đổi connection.

Middleware tự động chuyển đổi connection cho phép ứng dụng của bạn chuyển đổi giữa primary và reploca database dựa trên các HTTP verb của request.

Ví dụ: nếu ứng dụng của bạn nhận được yêu cầu **POST**, **PUT**, **DELETE** hoặc **PATCH**, ứng dụng sẽ tự động ghi vào primary database. Và, đối với các yêu cầu như **GET** hoặc **HEAD**, ứng dụng sẽ đọc replica database.

Để config middleware cho bộ chuyển đổi tự động; uncomment hoặc thêm dòng sau vào file config:
```csharp
config.active_record.database_selector = { delay: 2.seconds }
```

Với các request GET hoặc HEAD, rails sẽ chỉ connect đến primary database nếu request nằm trong khoảng thời gian tính từ request ghi cuối cùng; theo mặc định, nó sẽ là 2 giây. Ví dú: giây thứ 10 bạn nhận đc 1 request **POST** (request ghi), thì trong 2 giây tiếp theo, tất cả request đọc sẽ tự động được kết nối tới primary database, thay vì replica database. Bạn có quyền tự do thay đổi option `delay` dựa theo infra structure.

## 2. Kết nối thủ công với primary và replica dabase
Để kết nối với primary hoặc replica database theo cách thủ công; rails cung cấp phương thức `ActiveRecord :: Base.connected_to`.

Đôi khi, ứng dụng của bạn cần kết nối với primary hoặc replica database không phân biệt loại request. Trong những trường hợp như vậy, bạn có thể sử dụng phương thức `connect_to` do `ActiveRecord` cung cấp.

```ruby
ActiveRecord::Base.connected_to(role: :writing) do
  Person.first
end
```

## 3. Horizontal sharding
`Horizontal sharding` là việc bạn chia nhỏ database của mình để giảm số `rows` trên mỗi database server, nhưng duy trì cùng một schema trên các "sharding". Điều này thường được gọi là "multi-tenant" sharding.

API hỗ trợ `horizontal sharding` trong Rails tương tự như API hỗ trợ multiple database.

```python
production:
  primary:
    database: my_primary_database
    adapter: mysql
  primary_replica:
    database: my_primary_database
    adapter: mysql
    replica: true
  primary_shard_one:
    database: my_primary_shard_one
    adapter: mysql
  primary_shard_one_replica:
    database: my_primary_shard_one
    adapter: mysql
    replica: true
```

Models được kết nối với API connect_to thông qua shard key:
```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  connects_to shards: {
    default: { writing: :primary, reading: :primary_replica },
    shard_one: { writing: :primary_shard_one, reading: :primary_shard_one_replica }
  }
end
```

Sau đó, các models có thể hoán đổi kết nối theo cách thủ công thông qua API connect_to. Nếu sử dụng sharding, cả `role` và `shard` phải được truyền:

```ruby
ActiveRecord::Base.connected_to(role: :writing, shard: :default) do
  @id = Person.create! # Creates a record in shard default
end

ActiveRecord::Base.connected_to(role: :writing, shard: :shard_one) do
  Person.find(@id) # Can't find record, doesn't exist because it was created
                   # in the default shard
end
```

API `horizontal sharding` cũng hỗ trợ replica database. Bạn có thể hoán đổi `role` và `shard` bằng API connect_to.

```ruby
ActiveRecord::Base.connected_to(role: :reading, shard: :shard_one) do
  Person.first # Lookup record from read replica of shard one
end
```

REFS:
https://guides.rubyonrails.org/active_record_multiple_databases.html
https://hackernoon.com/how-to-manage-multiple-databases-in-rails-6-ye6x3ypv