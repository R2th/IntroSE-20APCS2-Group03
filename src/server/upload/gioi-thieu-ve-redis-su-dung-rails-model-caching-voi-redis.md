## Giới thiệu
Hiện nay có rất nhiều chương trình hỗ trợ việc lưu trữ dữ liệu: MySQL, MongoDB, Hbase, Memcached, Redis… Nhưng để tăng tốc ứng dụng của chúng ta thì Redis là 1 sự lựa chọn tốt. Vậy redis là gì? Nó hoạt động như thế nào? Tại sao nó lại nhanh?
## I. Redis là gì?
- Redis là hệ thống lưu trữ key-value với rất nhiều tính năng và được sử dụng rộng rãi.
- Redis hỗ trợ lưu strings, hashes, lists, arrays...
- Redis lưu dữ liệu trên RAM. 
- Redis hỗ trợ lưu trữ dữ liệu trên đĩa cứng cho phép phục hồi dữ liệu khi gặp sự cố.
## II. Tại sao chọn redis?
- Redis sẽ đảm bảo việc lưu dữ liệu vào đĩa, thậm chí dữ liệu được thay đổi, sửa chữa thường xuyên. Ngoài ra Redis cũng rất nhanh nhưng vẫn ổn định
- Redis quan tâm đặc biệt vào hiệu quả bộ nhớ, vì vậy dữ liệu bên trong Redis sẽ sử dụng ít bộ nhớ hơn so với những hệ thống lưu trữ dữ liệu sử dụng ngôn ngữ lập trình bậc cao cùng loại.
- Redis cung cấp một số các tính năng như sự sao chép (replication), tính bền bỉ (durability), phân cụm (cluster) hay độ khả dụng cao (high availability).
### III. Các cơ chế lưu dữ liệu lên đĩa cứng của redis
### 1. RDB
- RDB: cho phép người dùng lưu các version khác nhau của DB chính, có thể dễ dàng backup lại dữ liệu khi có sự cố xảy ra.
- RDB giúp tối ưu hóa hiệu năng của Redis. Tiến trình Redis chính sẽ làm các công việc trên RAM, bao gồm các thao tác cơ bản được yêu cầu từ phía client, trong khi đó 1 tiến trình con sẽ đảm nhiệm các thao tác disk I/O. Cách tổ chức này giúp tối đa hiệu năng của Redis.
- Tuy nhiên RDB không phải là lựa chọn tốt nếu bạn muốn giảm thiểu tối đa nguy cơ mất mát dữ liệu. vì khi chúng ta setup 5p ghi dữ liệu vào đĩa thì sẽ xảy ra tình trạng mất mát dữ liệu.
### 2. AOF
- AOF lưu lại tất cả các thao tác write mà server nhận được, các thao tác này sẽ được chạy lại khi restart server hoặc tái thiết lập dataset.
- AOF sẽ an toàn hơn RDB. không xảy ra mất mát dữ liệu
- Redis ghi log AOF theo kiểu thêm vào cuối file sẵn có, kể cả khi chỉ 1 nửa câu lệnh được ghi trong file log, Redis vẫn có cơ chế quản lý và sửa chữa lỗi
### IV. Sử dụng redis trong rails app
1. Cài đặt.
```ruby
gem 'redis'
gem 'redis-namespace'
gem 'redis-rails'
gem 'redis-rack-cache'
```
2. Cấu hình
```ruby
# config/application.rb
config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', { expires_in: 90.minutes }

# config/initializers/redis.rb 
$redis = Redis::Namespace.new("site_point", :redis => Redis.new)
```
3. Sử dụng
Đầu tiên thì chúng ta viết một method để get tất cả dữ liệu category. Với lần đầu tiên gọi thì method này sẽ get dữ liệu và đẩy vào redis.
Với lần gọi thứ 2 trở đi thì dữ liệu chỉ việc lấy ở redis. Điều này làm tăng tốc độ do không cần phải thực hiện truy vấn lại vào database.
```ruby
# app/controller/categories_controller.rb

def index
    fetch_categories
end

def fetch_categories
    categories =  $redis.get("categories")
    if categories.nil?
      categories = Category.all.to_json
      $redis.set("categories",  categories)
      $redis.expire("categories", 3.hour.to_i) # Expire the cache, every 3 hours
    end
    @categories = JSON.load categories
end
```
Vậy nó cứ lấy dữ liệu ở redis thế thì khi có update hay insert thì sao ? Chúng ta sẽ giải quyết như thế nào. Rất đơn giản bạn chỉ việc clear dữ liệu ở Redis.
```ruby
# app/models/category.rb

    class Category
      after_save :clear_cache

      def clear_cache
        $redis.del "categories"
      end
    end
```
Vậy là xong rồi đó. Lúc này nếu có cập nhật hay insert thì dữ liệu sẽ được xóa đi trong Redis và sẽ thực hiện truy vấn và đưa lại vào redis như ban đầu.
Mong rằng bài viết này có thể giúp bạn hiểu cơ bản về redis cũng như sử dụng để tăng tốc ứng dụng của mình.
Cảm ơn đã dành thời gian cho bài viết của mình
### V. Tham khảo
[Redis Persistence](https://redis.io/topics/persistence) 

[Rails model caching](https://www.sitepoint.com/rails-model-caching-redis/)