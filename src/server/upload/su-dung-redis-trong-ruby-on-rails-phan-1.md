![](https://images.viblo.asia/f22034bf-6e96-4b68-a4fe-113d67b1569f.png)
### Redis là gì?
Redis là 1 loại database trên bộ nhớ có các loại cấu trúc dữ liệu khác nhau mà bạn có thể sử dụng. Như:
* Key / value storage
* Lists
* Sets

### Redis thường sử dụng khi nào?
* Caching
* Counting visitors
* Fast autocomplete suggestions
* Keeping track of active user sessions
* Work & message queues

### Cài đặt Redis
Đầu tiên bạn cần phải cài đặt redis server trước. Có thể cài đặt theo link dưới
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04

### Sử dụng gem Redis
Chúng có thể thao tác với Redis thông qua redis-cli, nhưng nếu muốn làm việc với Rails thì phải sử dụng gem.
Dưới đây là 1 số gem:
* oxblood
* redis-rb
Ở đây chúng ta sẽ dùng redis-rb 

```
gem install redis
```
Sau khi install thì bạn có thể thao tác với Redis trên Rails
```
require 'redis'
redis = Redis.new(host: "localhost")
redis.set("a", 1)
# "OK"
redis.get("a")
# "1"
```
### Các lệnh gán và lấy dữ liệu trên redis
```
redis.set("a", 1)
# "OK"
redis.get("a")
# "1"
```
Tăng giá trị của a
```
redis.incr("a")
# "2"
```
Bạn có thể set auto-expiring key với setex
```
redis.setex("b", 10, 100)
```
```
redis.get("b")
# "100"
```
sau 10s
```
redis.get("b")
# nil
```
### Sorted Sets
Redis không giới hạn lưu trữ các giá trị key/value đơn giản.
Nó cung cấp một số cấu trúc dữ liệu mạnh mẽ như sorted sest.
Nó cho phép bạn tạo một danh sách các mục duy nhất được sắp xếp theo một giá trị nhất định. Giá trị này được gọi là một score trong các tài liệu Redis.
Bạn có thể truy vấn để có được N mục hàng đầu trong 1 set.
```
redis.zadd("popular_fruit", 10, "apple")
# true
redis.zadd("popular_fruit", 20, "banana")
# true
redis.zadd("popular_fruit", 30, "orange")
# true
```
add các items vào sorted set popular_fruit với điểm số lần lượt 10, 20, 30

Lấy item có điểm cao nhất
```
redis.zrevrange("popular_fruit", 0, 0)
# ["orange"]
```

Nếu bạn muốn mọi thứ theo thứ tự
```
redis.zrevrange("popular_fruit", 0, -1)
# ["orange", "banana", "apple"]
```
`zrevrange` sẽ sắp xếp theo thứ tự giảm dần ngược lại với `zrange`
Cảm ơn các bạn đã theo dõi bài viết, hẹn gặp lại các bạn vào phần tiếp theo. Phần tới sẽ đề cập đến keys, values, namespacing.