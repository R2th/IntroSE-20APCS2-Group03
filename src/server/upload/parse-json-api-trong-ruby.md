Trang [The Ruby Toolbox](https://www.ruby-toolbox.com/categories/http_clients) có liệt kê ra không dưới 25 HTTP clients. Trong bài viết này, mình xin giới thiệu 4 thư viện phổ biến nhất. Hãy xem cách các thư viện này lấy và dịch kết quả JSON từ một API RESTful như thế nào.

![](https://images.viblo.asia/dbde54aa-4b0b-477c-9210-87abadec0518.gif)

Với mỗi thư viện, sẽ có một ví dụ tương ứng, và 4 đoạn code ví dụ đó sẽ:

- Định nghĩa một URL được sử dụng để phân tích. Ta sẽ dùng **Spotify API** vì nó cho phép request ẩn danh, không cần xác thực. Bạn có thể tìm hiểu thêm ở [đây](https://developer.spotify.com/documentation/web-api/).
- Tạo một request HTTP GET đến URL đã được định nghĩa ở trên.
- Dịch kết quả JSON nhận được.

Mỗi đoạn code sẽ là một đường dẫn khác nhau đến cùng một địa chỉ đích. Nếu bạn dùng lệnh `pp` để in kết quả ra thì sẽ được một hash với kết quả tìm kiếm Spotify.

### net/http

- [Link thư viện](http://ruby-doc.org/stdlib-2.2.3/libdoc/net/http/rdoc/Net/HTTP.html)

`net/http` đã được tích hợp sẵn vào trong thư viện chuẩn của Ruby, bạn không cần phải cài thêm bất cứ gem nào cả. Nếu dự án của bạn cần có một tốc độ phát triển nhanh thì đây là một lựa chọn tốt. Ví dụ như [twilio-ruby gem](https://www.twilio.com/docs/libraries/ruby) cũng được xây dựng trên `net/http`.

Vì là một thư viện đã được tích hợp sẵn, nên cũng không ngạc nhiên khi mà sử dụng `net/http` sẽ yêu cầu bạn phải làm nhiều việc hơn là các gem cài thêm. Ví dụ như bạn phải tao một đối tượng URI trước khi tạo request HTTP. Hãy cùng xem code sau:

```ruby
require 'net/http'
require 'json'
 
uri = URI('https://api.spotify.com/v1/search?type=artist&q=tycho')
response = Net::HTTP.get(uri)
JSON.parse(response)
```

### HTTParty

- [Thư viện](https://github.com/jnunemaker/httparty)

Được xây dựng trên `net/http`, như lời giới thiệu trên repo github

> Makes http fun again!

Nó bổ sung rất nhiều phương thức tiện lợi và có thể được sử dụng cho tất cả các cách xử lý các yêu cầu HTTP. Câu lệnh cài đặt rất đơn giản:

```
gem install httparty
```


```ruby
require 'httparty'
 
response = HTTParty.get('https://api.spotify.com/v1/search?type=artist&q=tycho')
response.parsed_response
```

Công việc phải làm đã đơn giản đi nhiều rồi chứ nhỉ? HTTParty cũng cung cấp một giao diện dòng lệnh hữu ích trong quá trình phát triển khi cố gắng hiểu cấu trúc của các phản hồi HTTP.

### rest-client

- [Thư viện](https://github.com/rest-client/rest-client)

Cũng được xây dựng trên `net/http`.

> A simple HTTP and REST client for Ruby, inspired by the Sinatra's microframework style of specifying actions: get, put, post, delete.
> 
Cài đặt

```
gem install rest-client
```

Tuy nhiên, không giống với khi sử dụng HTTParty, ở đây bạn vẫn cần thư viện `JSON` để dịch kết quả. Code như sau:

```ruby
require 'rest-client'
require 'json'

response = RestClient.get('https://api.spotify.com/v1/search?type=artist&q=tycho')
JSON.parse(response)
```

### Faraday

- [Thư viện](https://github.com/lostisland/faraday)

Cài đặt
``` 
gem install faraday
gem install faraday_middleware
```

Trước khi thực hiện yêu cầu HTTP và phân tích kết quả, ta cần phải:

- Chọn HTTP adapter, mặc định là `net/http`
- Xác định loại response, trong trường hợp này ta sử dụng JSON

Code
```ruby
require 'faraday'
require 'faraday_middleware'

url = 'https://api.spotify.com/v1'

conn = Faraday.new(url: url) do |faraday|
  faraday.adapter Faraday.default_adapter
  faraday.response :json
end

response = conn.get('search', type: 'artist', q: 'tycho')
response.body
```

***
#### Tham khảo

https://www.twilio.com/blog/2015/10/4-ways-to-parse-a-json-api-with-ruby.html