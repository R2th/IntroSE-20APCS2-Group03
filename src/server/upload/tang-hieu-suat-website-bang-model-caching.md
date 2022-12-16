Khi chúng ta mới làm quen vơi Ruby on Rails, chúng ta thường ít khi quan tâm đến hiệu suất của website vì dữ liệu của chúng ta còn nhỏ lẻ và dù có hơi lâu 1 chút cũng vẫn cảm thấy ok vì hiển thị ra đúng kết quả cũng thấy vui lắm rồi :) <br/>
Nhưng khi chúng ta join vào 1 dự án thực sự với lượng lớn dữ liệu và cấu trúc dữ liệu phức tạp thì chúng ta mới nhận ra hiệu suất rất quan trọng . Không ai muốn bỏ ra cả 1 phút để chờ 1 trang web load xong hay thậm chí 10s thôi cũng cảm thấy bực bội rồi.
### Cách hoạt động
Model Caching hoạt động rất đơn giản , chúng ta sẽ sử dụng 1 bộ nhớ đệm (cụ thể trong bài viết là Redis) để lưu dữ liệu khi load trang web lần đầu . Sau đó khi chúng ta muốn quay lại trang web đã load thì dữ liệu sẽ được lấy ra từ bộ nhớ đệm chứ không phải chọc vào DB lấy dữ liệu nữa.
## Cụ thể chúng ta có ví dụ sau:
### Chuẩn bị 1 app đơn giản
Tạo 1 app tên Demo
```
rails new SnippetDemo
```
Dự sẵn luôn resource tên là Snippet
```
rails g scaffold Snippet content:text
```
Chúng ta sử dụng gem `rack-mini-profiler` để đo tốc độ tải trang và gem `Faker` để tạo dữ liệu ảo. Thêm 2 dòng sau vào Gemfile:
```
gem 'rack-mini-profiler'
gem 'faker'
```
Sau đó chạy `bundle install`
Dựng dữ liệu ảo trong `db/seed.rb`
```
100000.times do
  Snippet.create(content: Faker::Lorem.paragraph)
end
```
Sau đó chạy 2 câu lệnh `rails db:migrate` và `rails db:seed`<br/>
Để cho tiện thì chúng ta để luôn trang index của Snippet là trang home. trong` config/routes.rb`:
```
root 'snippets#index'
```
Khi chạy server và vào trang home chúng ta sẽ thấy 1 vài thông tin về tốc độ tải trang như sau:
![](https://images.viblo.asia/b741f8fc-49fc-428f-b5b2-a74eb851a253.png)
### Sử dụng Redis
Redis sử dụng kiểu lưu trữ thông tin là key-value với tốc độ truy suất gần như tức thời.<br/>
Để cài đặt redis trên Ubuntu:
```
sudo apt-get install redis
```
Khi cài xong chúng ta nhớ mở 1 tab terminal khác để chạy redis nhé
```
redis-server
```
và chúng ta sẽ nhận được 'something like this' :
![](https://images.viblo.asia/37ebd456-6af5-4676-aa04-56306ec41018.png)
Để kết nối Redis với app Demo , chúng ta cần add thêm 1 vài gem sau trong Gemfile:
```
gem 'redis'
gem 'redis-namespace'
gem 'redis-rails'
gem 'redis-rack-cache'
```
Khai báo cho rails biết chúng ta sử dụng Redis làm bộ nhớ cache trong application.rb
``` ruby
..
module Demo
  class Application < Rails::Application
    ..
    config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', { expires_in: 90.minutes }
    ..
  end
end
```
Tạo 1 biến global để khai báo và truy cập bộ nhớ Redis trong `initializers/redis.rb`
``` ruby
$redis = Redis::Namespace.new("site_point", :redis => Redis.new)
```
### Kết hợp với nhau
snippets_controllers.rb:
```ruby
class SnippetsController < ApplicationController
  include SnippetsHelper

  def index
    fetch_snippets
  end

  ..
end
```
snippets_helper.rb:
```ruby
def fetch_snippets
  snippets =  $redis.get("snippets")
  if snippets.nil?
    snippets = Snippet.all.to_json
    $redis.set("snippets", snippets)
    # Expire the cache, every 5 hours
    $redis.expire("snippets",5.hour.to_i)
  end
  @snippets = JSON.load snippets
end
```
Lần load đầu tiên có thể sẽ hơi lâu xíu vì redis chưa được nạp dữ liệu nhưng từ lầu sau thì trang load nhanh đáng kể:
![](https://images.viblo.asia/aa7786a8-6184-4f8f-a15e-68e055517cbf.png)
### Kết luận
Vừa rồi là bài chia sẻ 1 chút hiểu biết của mình về Redis, mong sẽ giúp mọi người hiểu hơn về Model Caching và có thêm 1 cách làm tăng hiệu suất website của mình.
Tài liệu tham khảo: http://www.victorareba.com/tutorials/speed-your-rails-app-with-model-caching-using-redis