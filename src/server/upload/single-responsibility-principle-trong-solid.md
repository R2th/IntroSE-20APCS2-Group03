# 1. Single responsibility principle là gì?
Theo Wikipedia: "Một class chỉ nên mang 1 trách nhiệm duy nhất mà thôi", và theo Robert C.Martin: "Một class chỉ nên có duy nhất 1 lý do để phải thay đổi". Vậy kết hợp lại, ta có định nghĩa cho Single responsibility principle: "Một lớp chỉ nên mang 1 trách nhiệm duy nhất và chỉ nên có duy nhất 1 lý do để phải thay đổi".

Đôi khi, các lập trình viên phải đối mặt với khái niệm "responsibility". Thật dễ dàng khi chỉ thêm 1 dòng code vào phương thức, rồi sau đó lại thêm 1 dòng nữa, cứ thế và bạn có 1 class khổng lồ phải xử lý bao nhiêu thứ.

Một kỹ năng mà bất kỳ lập trình viên nào cũng nên có: biết khi nào class bắt đầu trở nên phình to và cần tối ưu lại thành các class nhỏ hơn.

Để dễ hình dung về nguyên lý này, hãy cùng xem ví dụ sau nhé:
# 2. Ví dụ
Ngày nay, việc sử dụng API khá là phổ biến. Trong ví dụ này, mình cần `BlogService` gọi đến 1 API để lấy ra danh sách các bài viết của blog.

```ruby
require 'net/http'
require 'json'

class BlogService
  def initialize(environment = 'development')
    @env = environment
  end

  def posts
    url = 'https://jsonplaceholder.typicode.com/posts'
    url = 'https://prod.myserver.com' if env == 'production'

    puts "[BlogService] GET #{url}"
    response = Net::HTTP.get_response(URI(url))

    return [] if response.code != '200'

    posts = JSON.parse(response.body)
    posts.map do |params|
      Post.new(params)
    end
  end

  private

  attr_reader :env
end

class Post
  attr_reader :id, :user_id, :body, :title

  def initialize(attributes = {})
    @id = attributes['id']
    @user_id = attributes['user_id']
    @body = attributes['body']
    @title = attributes['title']
  end
end

blog_service = BlogService.new
puts blog_service.posts.inspect
```

Trước hết, hãy cùng tìm ra các trách nhiệm mà class `BlogService` đang phải gánh nhé.

### Cấu hình
Chính là các dòng sau:

```ruby
    url = 'https://jsonplaceholder.typicode.com/posts'
    url = 'https://prod.myserver.com' if env == 'production'
```

Dựa vào môi trường thực thi, chúng ta có thể thay đổi địa chỉ gốc của API.

### Logging
```ruby
puts "[BlogService] GET #{url}"
```

### HTTP Request
```ruby
response = Net::HTTP.get_response(URI(url))
return [] if response.code != '200'
```

Chúng ta cũng nên xử lý khác đi với response code khác 200 thay vì chỉ trả về kết quả rỗng.

### Xử lý kết quả trả về
Chúng ta sẽ nhận về kết quả dạng như:

```
[{
  "userId": 10,
  "id": 95,
  "title": "id minus libero illum nam ad officiis",
  "body": "earum voluptatem facere..."
},
{
  "userId": 10,
  "id": 96,
  "title": "quaerat velit veniam amet cupiditate aut numquam ut sequi",
  "body": "in non odio excepturi sint eum..."
}, ...]
```

Chúng ta cần phải đưa kết quả của request trên từ JSON thành mảng các hash và trả về mảng các đối tượng `Post`:

```ruby
posts = JSON.parse(response.body)
posts.map do |params|
  Post.new(params)
end
```

Vậy là có ít nhất 4 trách nhiệm cho class trên. Để đảm bảo nguyên lý Single responsibility thì chúng ta hãy thử tách class trên thành nhiều class nhỏ như sau nhé:

```ruby
class BlogServiceConfig
  def initialize(env:)
    @env = env
  end

  def base_url
    return 'https://prod.myserver.com' if @env == 'production'

    'https://jsonplaceholder.typicode.com'
  end
end
```

Một class đơn giản với 1 nhiệm vụ duy nhất là trả về cấu hình cho blog service. Hiện tại thì nó mới chỉ có trả về `base_url` thôi, nhưng nếu cần thiết thì sau này có thể mở rộng dễ dàng.

Bây giờ chúng ta có thể sử dụng class này trong `BlogService` như sau:
```ruby
class BlogService
  # ...
  def posts
    url = "#{config.base_url}/posts"

    puts "[BlogService] GET #{url}"
    response = Net::HTTP.get_response(URI(url))
    # ...
  end

  private
  # ...
  def config
    @config ||= BlogServiceConfig.new(env: @env)
  end
end
```

Tiếp tục với nhiệm vụ Logging nhé. Có thể chúng ta sẽ cần sử dụng đến lớp này để log cho các request khác nữa, cho nên, mình sẽ triển khai chức năng này dưới dạng module nhé:

```ruby
module RequestLogger
  def log_request(service, url, method = 'GET')
    puts "[#{service}] #{method} #{url}"
  end
end
```

Khi sử dụng trong Rails, bạn chỉ cần đơn giản là và class này và thay `puts` bởi `Rails.logger` thôi là được rồi. Sử dụng module này cho `BlogService` của chúng ta nhé:

```ruby
class BlogService
  include RequestLogger
  # ...
  def posts
    url = "#{config.base_url}/posts"

    log_request(BlogService.name, url)
    response = Net::HTTP.get_response(URI(url))
    # ...
  end
end
```

Bây giờ, chúng ta cần xử lý việc gửi request đi để lấy dữ liệu và xử lý kết quả trả về nhé:

```ruby
class RequestHandler
  ResponseError = Class.new(StandardError)

  def send_request(url, method = :get)
    response = Net::HTTP.get_response(URI(url))
    raise ResponseError if response.code != '200'

    JSON.parse(response.body)
  end
end
```

`RequestHandler` thực hiện 1 truy vấn HTTP đến `url` được truyền vào và đưa chuỗi JSON về dạng mảng các hash luôn.

Cùng đưa class trên vào `BlogService`:

```ruby
class BlogService
  # ...
  def posts
    url = "#{config.base_url}/posts"

    log_request(BlogService.name, url)
    posts = request_handler.send_request(url)
    # ...
  end

  private
  # ...
  def request_handler
    @request_handler ||= RequestHandler.new
  end
end
```

Và cuối cùng, ta cần tạo class `ResponseProcessor` để xử lý kết quả lấy được từ `RequestHandler` như sau:

```ruby
class ResponseProcessor
  def process(response, entity)
    return entity.new(response) if response.is_a?(Hash)

    if response.is_a?(Array)
      response.map { |h| entity.new(h) if h.is_a?(Hash) }
    end
  end
end
```

class `ResponseProcessor` có thể xử lý cho cả dữ liệu trả về là dạng mảng hoặc chỉ đơn thuần là 1 hash.

Đưa `ResponseProcessor` vào sử dụng trong `BlogService`:

```ruby
class BlogService
  # ...    
  def posts
    url = "#{config.base_url}/posts"

    log_request(BlogService.name, url)
    posts = request_handler.send_request(url)
    response_processor.process(posts, Post)
  end

  private
  # ...
  def response_processor
    @response_processor ||= ResponseProcessor.new
  end
end
```

Cuối cùng thì phương thức `posts` đã trở nên gọn gàng và thanh thoát hơn rất nhiều so với ban đầu đúng không ạ.

Hãy xem đoạn code của chúng ta sau khi tách lớp ban đầu ra thành nhiều lớp con khác nhau nhé:

```ruby
require 'net/http'
require 'json'

module RequestLogger
  def log_request(service, url, method = :get)
    puts "[#{service}] #{method.upcase} #{url}"
  end
end

class RequestHandler
  ResponseError = Class.new(StandardError)

  def send_request(url, method = :get)
    response = Net::HTTP.get_response(URI(url))
    raise ResponseError if response.code != '200'

    JSON.parse(response.body)
  end
end

class ResponseProcessor
  def process(response, entity)
    return entity.new(response) if response.is_a?(Hash)

    if response.is_a?(Array)
      response.map { |h| entity.new(h) if h.is_a?(Hash) }
    end
  end
end

class BlogServiceConfig
  def initialize(env:)
    @env = env
  end

  def base_url
    return 'https://prod.myserver.com' if @env == 'production'

    'https://jsonplaceholder.typicode.com'
  end
end

class BlogService
  include RequestLogger

  def initialize(environment = 'development')
    @env = environment
  end

  def posts
    url = "#{config.base_url}/posts"

    log_request(BlogService.name, url)
    posts = request_handler.send_request(url)
    response_processor.process(posts, Post)
  end

  private

  attr_reader :env

  def config
    @config ||= BlogServiceConfig.new(env: @env)
  end

  def request_handler
    @request_handler ||= RequestHandler.new
  end

  def response_processor
    @response_processor ||= ResponseProcessor.new
  end
end

class Post
  attr_reader :id, :user_id, :body, :title

  def initialize(attributes = {})
    @id = attributes['id']
    @user_id = attributes['user_id']
    @body = attributes['body']
    @title = attributes['title']
  end
end

blog_service = BlogService.new
puts blog_service.posts.inspect
```

Như vậy, tất cả các lớp mà chúng ta tạo ra đều có trách nhiệm ít hơn. Điều quan trọng đó là chúng có thể tái sử dụng chúng khá là đơn giản.

Cảm ơn bạn đã quan tâm đến bài viết!

*Tham khảo: http://rubyblog.pro/2017/05/solid-single-responsibility-principle-by-example*