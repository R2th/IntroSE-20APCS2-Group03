# Giới thiệu
Đôi lúc bạn muốn có khả năng bật/tắt một feature nào đó ở trên môi trường production, hoặc chỉ cho phép một số người dùng có quyền sử dụng feature mới trong ứng dụng của bạn
* Có thể bạn muốn nhận feedback từ người dùng trước khi đưa ra bản release cuối cùng?
* Bạn muốn có khả năng revert lại feature trước chỉ với một dòng lệnh?

![](https://images.viblo.asia/afe7e53a-82e5-46c8-be71-8f59486f7e0f.gif)


Điều đó hoàn toàn có thể và thực hiện dễ dàng hơn với gem Rollout để setup trong ứng dụng Rails của bạn.

Rollout cho phép bạn enable/disable feature mà không cần revert code hoặc sử dụng branch khác trên môi trường production. Điều này được thực hiện bởi Rollout bằng cách lưu một "feature flag" trong Redis. Đây là một To-do app demo nho nhỏ về cách mà Rollout hoạt động. User có thể tạo mới, xoá to-do, và đánh dấu chúng là đã hoàn thành.

![](https://images.viblo.asia/9de55171-8792-4608-b83c-8762b4dc6f89.gif)


# Thực hiện
## 1. Cài đặt Redis
Thêm `redis-rails` vào `Gemfile`

```ruby
gem 'redis', '~> 4.1', '>= 4.1.3'
```

Chạy `bundle install` và thêm 1 biến env vào file `.env`

```
REDIS_URL=redis://localhost:6379
```


Tiếp theo, hãy tạo 1 file initializers cho Redis để tự động khởi tạo Redis khi Rails được boot

```ruby
# config/initializers/redis.rb

require "redis"
Redis.current = Redis.new(url: ENV['REDIS_URL'])
```
Thử mở `rails console` lên check xem Redis đã hoạt động chưa
```
=> #<Redis client v4.1.3 for redis://localhost:6379/0>
```

Redis đã hoạt động!

## 2. Cài đặt Rollout
Thêm Rollout vào `Gemfile` của bạn
```ruby
gem 'rollout', '~> 2.4', '>= 2.4.5'
```

Thêm vào file `redis.rb` chúng ta vừa tạo lúc nãy
```ruby
# config/initializers/redis.rb

require "redis"
Redis.current = Redis.new(url: ENV['REDIS_URL'])

$rollout = Rollout.new(Redis.current)
```

Restart lại server và kiểm tra `$rollout` trong rails console
```
=> #<Rollout:0x00007fee86119578........>
```

Rollout đã sẵn sàng để sử dụng rồi!

## 3. Đóng gói feature
Mình đã thêm một cột `important` vào bảng `todos`, cập nhật lại view và controller.

{@embed: https://gist.github.com/Gabriel-Martin/fbd504b830fd111c383d80320f20f6a6#file-rollout_view-html-erb}

Các bạn có thể thấy mình đã đóng gói lại `important` vào trong câu lệnh `if`

```ruby
if $rollout.active? :important_todos
```

Phương thức `active` kiểm tra Redis xem feature `important_todos` đã được active hay chưa. Nếu chưa, nó sẽ return false và không render ra gì cả.
![](https://images.viblo.asia/9cb81666-94c1-4f52-9d78-5f846c78e775.gif)

Nếu chúng ta muốn active feature này, điều chúng ta cần làm là mở `rails console` và chạy

```ruby
$rollout.activate :important_todos
```

Điều tuyệt nhất ở đấy chính là mọi thứ đều diễn ra trong môi trường thực tế mà không cần down server. Chúng ta không cần push một branch khác lên để enable/disable nó đi, hoặc restart server để thấy được sự thay đổi.

Nếu chúng ta muốn tắt nó đi? Lại mở `rails console` lên và chạy `$rollout.deactivate :important_todos`. Xong, mất tiêu luôn.

![](https://images.viblo.asia/19db9a3f-581c-4cad-a94b-b8ba825c8199.gif)


Rollout không chỉ đơn giản là enable/disable một feature nào đó. Bạn có thể enable feature cho user hoặc một nhóm user nhất định trải nghiệm trước và enable cho tất cả user sau. Hãy xem qua document của Rollout để biết thêm chi tiết hơn.

## 4. Tham khảo

Document chính thức của Rollout: https://github.com/fetlife/rollout

https://blog.echobind.com/feature-flipping-with-rails-and-rollout-5282b8d4fb1c