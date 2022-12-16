###  Keys, Values & Namespacing
Không có cột, không có bảng, mọi thứ là một không gian tên đơn giản.

**Vậy làm thế nào bạn có thể tổ chức dữ liệu?**

Bạn có thể sử dụng key

*Một quy ước chung là sử dụng dấu hai chấm `(:)` để phân tách tên chung & phần cụ thể của tên đó.*

```
redis.set("fruit:1", "apple")
# OK
redis.set("fruit:2", "banana")
# OK
```

Không có gì đặc biệt về quy ước này, đối với Redis một khóa có dấu hai chấm không khác gì một khóa không có nó, nhưng đối với bạn, nó giúp bạn sắp xếp dữ liệu của mình.

### Data Persistence in Redis
Theo mặc định, Redis không lưu trữ mọi thao tác bạn thực hiện như một cơ sở dữ liệu thông thường.

Nó chỉ lưu dữ liệu vào đĩa khi bạn dừng server

Hoặc theo các điều kiện sau:

* sau 15 phút, nếu 1 hoặc nhiều phím thay đổi
* sau 5 phút, nếu thay đổi 10 phím trở lên
* sau 1 phút, nếu 10.000 phím trở lên thay đổi

Nó tạo ra một tệp dump.rdb trên thư mục hiện tại.
Còn nếu bạn muốn nó lưu lại vào mọi thời điểm bạn có thể enable “Append Only Mode”

```
appendonly yes
```

### Sử dụng Redis để cache trên Rails
Kể từ Rails 5.2, bạn có thể sử dụng Redis để cache
Bạn chỉ cần cài đặt redis gem 
Sau đó config trong enviroments

```
# config/environments/production.rb
Rails.application.configure do
  config.cache_store = :redis_cache_store, { url: "redis://localhost:6379/0" }
end
```

Bây giờ bạn cũng có thể lưu gì đó lên cache

```
Rails.cache.write("a", 1)
# "OK"
Rails.cache.read("a")
# 1
```

Nó sẽ trông như thế này:

```
"\u0004\bo: ActiveSupport::Cache::Entry\t:\v@valuei\u0006:\r@version0:\u0010@created_atf\u00171555005228.7954454:\u0010@expires_in0"
```

Điều này có nghĩa là bạn có thể lưu trữ bất kỳ đối tượng Ruby nào, như kết quả của truy vấn ActiveRecord.
Cảm ơn các bạn đã theo dõi bài viết. Happy coding :)