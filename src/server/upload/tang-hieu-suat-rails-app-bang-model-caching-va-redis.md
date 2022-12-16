Trong các ứng dụng Rails, chúng ta thường ít để ý tới performance bởi vì dữ liệu chúng ta vẫn còn ít, chưa đủ để lm chậm hệ thống. 

Nhưng trong một số dự án lớn, thì việc cải thiện performance lại trở nên rất quan trọng. Việc làm đầu tiên là chúng ta sẽ phải là
loại bỏ N+1 query, sau khi loại bỏ xong mà hệ thống chúng ta vẫn chậm thì cần phải sử dụng Cache dữ liệu để tối ưu.

# 1. Cách hoạt động

Model Caching hoạt động bằng cách sử dụng 1 bộ nhớ đệm để lưu dữ liệu trong lần load trang web đầu tiên. Trong các lần
truy cập tiếp theo, dữ liệu chỉ việc lấy từ bộ nhớ đệm ra, chứ không cần phải query từ DB nữa. Từ đó trang web chúng ta
sẽ cải thiện được performance, người dùng sẽ cảm thấy được trang web của chúng ta nhanh và mượt hơn.

Bộ nhớ đệm ở đây mình sử dụng Redis. Bởi vì redis là một in-memory data structures store, dạng lưu trữ cấu trúc dữ liêu, 
lưu trữ dạng key-value ở trong bộ nhớ chính(RAM). Chính điều này đã làm cho Redis có tốc độ xử lý nhanh và phục hồi dữ liệu gần như tức thời

# 2. Caching với Redis
# 2.1 Khởi tạo Project

Chúng ta sẽ tạo một ứng dụng demo nhỏ có tên là MyPost như sau:

```
  rails new MyPost
  rails g scaffold Post content:string
```

Chúng ta sẽ sử dụng gem "Faker" để fake dữ liệu

```
  gem "faker"
```

Sau đó chạy `bundle install` và Import dữ liệu như sau:

```
100000.times do
  Post.create(content: Faker::Lorem.paragraph)
end
```

Ở đây mình tạo 100k record, các bạn cũng có thể tạo nhỏ hơn. Và bh sẽ chạy lệnh `rails db:seed`

Sửa lại router để root page trỏ vào đúng trang Post của chúng ta

```
  #routes.rb
  
  root "posts#index"
```

Khi load trang thì sẽ cho kết quả như dưới đây

![](https://images.viblo.asia/7482f2bb-8c4f-49d2-8054-00f6953305cd.png)

ActiveRecord mất 60.6ms để thực hiện câu lệnh sql và Views mất 21941.0ms để hiển thị. Như vậy ta có thể thấy rằng ứng dụng của chúng ta chạy rất chậm. Nào bh chúng ta cùng tối ưu chúng nhé.

# 2.2 Khởi tạo Redis 

Chúng ta sẽ cài redis qua lệnh này

```
sudo apt-get install redis
```
hoặc xem hướng dẫn chi tiết [tại đây](https://redis.io/download)

Sau khi cài đặt redis xong thì chúng ta start nó

```
redis-server
```

![](https://images.viblo.asia/1d502363-d3f6-4c6a-b2fa-45413206ec44.png)

Để kết nối được Redis với ứng dụng thì chúng ta sẽ phải thêm vài gem vào **Gemfile**, sau đó run `bundle install`

```
gem "redis"
gem "redis-namespace"
gem "redis-rails"
gem "redis-rack-cache"
```

# 2.3 Caching
Chúng ta setup lại file **application.rb** để có thể cache được ứng dụng bằng redis

```
module MyPost
  class Application < Rails::Application
    [...]
    config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', {expires_in: 90.minutes}
    [...]
  end
end
```

Ta cần phải tạo ra một Redis instance để có thể gọi được ở bất kì đâu trong ứng dụng Rails

```
#initializers/redis.rb

$redis = Redis::Namespace.new "demo-redis", redis: Redis.new
```

Ta sẽ chỉnh sửa lại method index trong posts_controller.rb  như sau:

```
# posts_controller.rb

  def index
    @posts = fetch_post
    
    respond_to do |format|
      format.json {render json: @posts, status: :ok}
    end
  end
  
  private
  
  def fetch_post
      posts = $redis.get "posts"

      if posts.nil?
        posts = Post.all.to_json
        $redis.set "posts", posts
      end
      
      JSON.load posts
   end
```

Chúng ta cùng chạy lại và xem kết quả nào

![](https://images.viblo.asia/69808ad5-40d9-48f0-88a7-328d5340f3bd.png)

Ta thấy Views chỉ mất có 13ms để hiển thị và ActiveRecord là 0ms, như vậy Server không hề mất thời gian truy vấn dữ liệu, thay vào đó là lấy dữ liệu từ Redis ra vì thế mà ứng dụng chúng ta chạy rất nhanh.

# 3. Một số lưu ý

# 3.1 Sử lý khi redis lỗi

Chúng ta cần phải bắt exception cho trường hợp như này 

```
   # posts_controller.rb
   
   def fetch_post
      begin
        posts = $redis.get "posts"

        if posts.nil?
          posts = Post.all.to_json
          $redis.set "posts", posts
        end
        posts = JSON.load posts
      rescue => error
        puts error.inspect
        posts = Post.all
      end
      posts
   end
```

# 3.2 Dữ liệu sau khi update hoặc delete

Trong trường hợp dữ liệu sau khi update hoặc bị xóa thì trong redis dữ liệu vẫn chưa được cập nhật lại. Vì thế chúng ta cần cập nhật lại dữ liệu trong redis khi gặp trường hợp này

```
    #Post.rb
    
    class Post < ApplicationRecord
      after_save :clear_cache

      private
      def clear_cache
        $redis.del "posts"
      end
    end
```

Caching là một kỹ thuật tuyệt vời để có thể tăng hiệu suất ứng dụng của chúng ta. Hi vọng bài viết sẽ giúp các bạn có cái nhìn về caching
# Tham khảo

http://www.victorareba.com/tutorials/speed-your-rails-app-with-model-caching-using-redis
https://www.sitepoint.com/rails-model-caching-redis/