Hiện tại với sự phát triển mạnh mẽ của các thư viện Javascript như ReactJs, VueJs, AngularJS, chúng ta có thể sử dụng các thư viện này kết hợp với Rails API để tạo ra những ứng dụng Web. Tất cả dữ liệu trả về API trả về đều là JSON. Điều này làm mình hứng thú với việc tìm cách lưu response của API vào bộ nhớ đệm để có thể trả về nhanh hơn mà không cần truy vấn vào cơ sở dữ liệu. Trong bài viết này, mình muốn chia sẻ về cách cache Json hiệu quả.

### Xây dựng một ứng dụng không áp dụng kỹ thuật cache

Trong ứng dụng này, mình có 2 model `Post`

``` ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
```

Và `Comment`

``` ruby
class Comment < ApplicationRecord
  belongs_to :post
end
```

Và `Post` has_many `Comment`

Tiếp theo, chúng ta có một controller và method index, chúng ta cần lấy ra tất cả các bài đăng và nhận xét

``` ruby
class PostsController < ApplicationController
  def index
    render json: Post.includes(:comments).to_json(include: :comments)
  end
end
```

Và tất nhiên cần thêm một route `posts#index`

```ruby
# config/routes.rb
Rails.application.routes.draw do
  get 'posts/index'
end
```

Đây là một điều tồi tệ khi chúng ta phải lấy ra hết mọi thứ như thế này. Giả định chúng ta đang gặp điều tồi tệ nhất và để thấy nó chạy chậm như nào.

Tiếp theo, giả sử chúng ta có rất nhiều dữ liệu. Ở đây mình sẽ sử dụng `seeds.rb` để fake dữ liệu

```ruby
# db/seeds.rb
post_description =
  %(Simply dummy text of the printing and typesetting industry)

(1..10).to_a.each do |index|
  post = Post.create(title: "Post #{index}", content: post_description)
  (1..1000).to_a.each do |comment_index|
    post.comments.create(content: "Comment #{comment_index}")
  end
end
```

Như bạn có thể thấy, chúng ta có 10 bài viết và mỗi bài viết có 1000 bình luận. Dữ liệu này đủ lớn để minh họa mức độ tồi tệ khi chúng ta lấy hết dữ liệu ra và làm thế nào để cache giúp tăng tốc độ đáng kể.

Bây giờ, hay thử lấy dữ liệu ra bằng `curl`

``` shell
time curl -s http://localhost:3000/posts/index > /dev/null
```

Kết quả:

```shell
curl -s http://localhost:3000/posts/index > /dev/null  0.00s user 0.00s system 0% cpu 1.364 total
```

Và trong Rails log, với request này, kết quả là:

```shell
Started GET "/posts/index" for 127.0.0.1 at 2017-08-13 16:35:38 +0800
Processing by PostsController#index as */*
  Post Load (0.3ms)  SELECT `posts`.* FROM `posts`
  Comment Load (11.3ms)  SELECT `comments`.* FROM `comments` WHERE `comments`.`post_id` IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')
Completed 200 OK in 1351ms (Views: 0.2ms | ActiveRecord: 11.6ms)
```

Như bạn có thể thấy, mất khoảng 1,3 giây để trả về dữ liệu. Điều này khá là tốn thời gian nếu chúng ta dành 1,3 giây cho 1 request. Có nghĩa là theo tính toán thì:

```ruby
1 request / 1.3s = 0.769 requests / second (req/s)
```

`0.769 req/s` rất chậm so với một ứng dụng thông thường. Hãy tưởng chúng ta có 50 người dùng cùng gọi đến method index của controller trên, người cuối cùng cần phải đợi

```ruby
50 requests / (0.769 req/s) = 65 seconds ~= 1 minute
```

`1 minute` chờ dữ liệu trả về là điều không phải ai cũng muốn. Chúng ta cần tăng tốc độ trả về bằng cách thêm kỹ thuật caching.

### Thêm Rails cache với redis trong môi trường phát triển

Trong phạm vi bài viết này mình sẽ hướng dẫn cách thêm cache vào trong môi trường phát triển để đánh giá hiệu suất. Nó sẽ khá giống với staging hay production một khi bạn biết cách làm điều đó trên mội trường development. 

Hãy bắt đầu với đoạn code caching mà Rails có sẵn trong `config/development.rb`:

``` ruby
# config/development.rb

# ...
if Rails.root.join('tmp/caching-dev.txt').exist?
  config.action_controller.perform_caching = true

  config.cache_store = :memory_store
  config.public_file_server.headers = {
    'Cache-Control' => "public, max-age=#{2.days.seconds.to_i}"
  }
else
  config.action_controller.perform_caching = false

  config.cache_store = :null_store
end
# ...
```

Như bạn có thể thấy, mặc định `cache_store` trong rails là `null_store`, có nghĩa là không có bộ nhớ cache. 

Để thử cache, chúng ta chỉ cần tạo một tệp trống `tmp/caching-dev.txt` để nó chạy vào điều kiện `if` trong đoạn code trên.

``` shell
touch tmp/caching-dev.txt
```

Lưu ý rằng, mặc định cache store là `memory_store`. Có nghĩa là nó sẽ sử dụng Ram để lưu trữ dữ liệu. Với `memory_store` chúng ta không thể mở rộng quy mô lưu trữ bộ nhớ đệm thành nhiều máy nên nếu bạn có nhiều máy chủ chạy ứng dụng, bộ nhớ đệm sẽ không chia sẻ giữa các máy chủ này. Chúng ta nên sử dụng `memcache` hoặc `redis_store` để các máy chủ đang chạy chia sẻ cùng mộ bộ nhớ đệm. Hãy thay đổi cache store thành `redis_store` 

```ruby
config.cache_store = :redis_store
```

Chúng ta cần cài thêm gem `redis_rails `, hãy thêm vào gem file và bundle:

```ruby
# Gemfile
# ...
gem 'redis-rails'
# ...
```

Khi bạn thực việc này, bạn cần khởi động lại máy chủ để cập nhật config mới. Để cache chúng ta cần thay đổi trong controller:

```ruby
class PostsController < ApplicationController
  def index
    json = Rails.cache.fetch('posts') do
      Post.includes(:comments).to_json(include: :comments)
    end

    render json: json
  end
end
```

Mình sẽ giới thiệu về block:

```ruby
Rails.cache.fetch('posts') do
  # ...
end
```

Nó sẽ lưu trữ bất kỳ kết nào được tạo trong block vào bộ nhớ đệm với key là `posts`. Và chúng ta cần chạy máy chủ redis :

```shell
redis-server
```

Bây giờ, hãy thử chạy lại tới controller:

```shell
time curl -s http://localhost:3000/posts/index > /dev/null
```

Và kết quả là:

```shell
curl -s http://localhost:3000/posts/index > /dev/null  0.00s user 0.00s system 0% cpu 1.432 total
```

Khá chậm `1,432 giây`. Tuy nhiên, đây là trạng thái khởi động và nó khá là trậm. Hãy chạy thử lại 1 lần nữa nhé. Bây giờ đã nhanh hơn rất nhiều so với lần trước.

```shell
time curl -s http://localhost:3000/posts/index > /dev/null
curl -s http://localhost:3000/posts/index > /dev/null  0.00s user 0.00s system 34% cpu 0.016 total

time curl -s http://localhost:3000/posts/index > /dev/null
curl -s http://localhost:3000/posts/index > /dev/null  0.00s user 0.00s system 35% cpu 0.013 total
```

Điều này khá là tuyệt vời

```
1 request / 0.013s = 76.9 requests / second (req/s)
```

Nói cách khác nó đãnh nhanh gấp 100 lần chỉ với vài dòng cốt.

Nguồn: http://jameshuynh.com/cache/json/rails/2017/08/13/how-to-effectively-cache-json-in-api-rails-app/