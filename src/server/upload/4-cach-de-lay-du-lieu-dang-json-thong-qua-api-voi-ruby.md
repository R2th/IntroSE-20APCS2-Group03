Danh sách Ruby Toolbox cung cấp cho chúng ta khoảng [25 HTTP clients](https://www.ruby-toolbox.com/categories/http_clients). Chúng ta cùng nhìn lại cách để lấy và parse kết quả của JSON từ một ứng dụng RESTful API sử dụng 4 thư viện Ruby HTTP Libraries phổ biến sau.

4 thư viện dưới đây sẽ thực hiện các công việc sau:
1. Định nghĩa một URL cần parse. Chúng ta sẽ sử dụng [Spotify API ](https://developer.spotify.com/documentation/web-api/) bởi vì Spotify cho phép các request không cần authenticate
2. Tạo ra một HTTP request với method GET cho URL trên
3. Parse kết quả thành JSON

Mỗi thư viện có một cách thực hiện khác nhau nhưng cùng cho ra 1 kết quả.Nếu bạn kiểm tra kết quả từ bất kì cách nào trong 4 cách thì bạn sẽ thấy một kết quả dạng JSON với kết quả tìm kiếm Spotify.
\
\
![](https://images.viblo.asia/33695633-6b74-4353-9b89-12debe51308b.gif)
\
\
Nếu bạn đã từng thử việc này, các bạn có thể vào đọc và làm theo hướng dẫn theo [link](https://www.twilio.com/docs/quickstart/ruby) này, nó khá hay và hữu dụng cho người mới bắt đầu. Còn bây giờ, hãy cũng tìm hiểu 4 thư viện mình đã đề cập ở trên nhé
### Net/http
[net/http](http://ruby-doc.org/stdlib-2.2.3/libdoc/net/http/rdoc/Net/HTTP.html) được xây dựng sẵn trong thư viện chuẩn của Ruby. Không có gem để cài đặt và không có dependencies (các yêu cầu ràng buộc) có thể gây rắc rối cho bạn nếu sử dụng tích hợp chung với các thư viện khác bạn muốn. Nếu bạn đánh giá sự ổn định thông qua tốc độ phát triển, đây là lựa chọn phù hợp với bạn (ví dụ, [gem twilio-ruby](https://www.twilio.com/docs/libraries/ruby) được xây dựng trên thư viện `Net/http` - các bạn có thể tự tìm hiểu và đọc docs của gem này để hiểu thêm).
\
\
Không có gì phải ngạc nhiên khi sử dụng `Net/http` có thể đòi hỏi làm được nhiều công việc hơn là sử dụng những gem được xây dựng trên nó. Ví dụ, bạn phải tạo một đối tượng `URI` trước khi thực hiện yêu cầu `HTTP`.
```
require 'net/http'
require 'json'

url = 'https://api.spotify.com/v1/search?type=artist&q=tycho'
uri = URI(url)
response = Net::HTTP.get(uri)
JSON.parse(response)
```

### HTTParty
`Net/http` cho ta cảm giác khá "rườm rà" và đôi lúc không có nhiều lợi ích khi sử dụng.  Lúc này chúng ta có [HTTParty](https://github.com/jnunemaker/httparty) được xây dựng trên nền của `Net/http` để "Làm cho HTTP trở nên thú vị hơn một lần nữa." Nó thêm rất nhiều methods tiện lợi và có thể được sử dụng cho tất cả các cách sử dụng của các HTTP request.
\
\
Nó cũng hoạt động khá độc đáo với các API RESTful. Hãy cùng xem cách gọi parsed_response trên một response dùng để parse JSON mà không sử dụng một thư viện JSON rõ ràng nào cả:
```
gem install httparty
```
```
require 'httparty'

url = 'https://api.spotify.com/v1/search?type=artist&q=tycho'
response = HTTParty.get(url)
response.parsed_response
```
`HTTParty` cũng cung cấp một danh sách dòng lệnh(command line interface) - hữu ích trong quá trình phát triển khi cố gắng hiểu cấu trúc của các HTTP responses.

### rest-client
[rest-client](https://github.com/rest-client/rest-client) là "một máy khách HTTP và REST đơn giản cho Ruby, lấy cảm hứng từ phong cách microframework của `Sinatra` về việc chỉ định các hành động: get, put, post, delete." Giống như `HTTParty`, nó cũng được xây dựng trên `Net/http`. Không giống như `HTTParty`, bạn vẫn sẽ cần thư viện JSON để parse các response.
```
gem install rest-client
```
```
require 'rest-client'
require 'json'

url = 'https://api.spotify.com/v1/search?type=artist&q=tycho'
response = RestClient.get(url)
JSON.parse(response)
```

### Faraday
[Faraday](https://github.com/lostisland/faraday) dành cho các nhà phát triển (các developer) khao khát việc kiểm soát mọi thứ. Nó có phần mềm trung gian để kiểm soát tất cả các khía cạnh của chu kỳ request / response. Trong khi client và `HTTParty` khóa bạn vào `Net/http`, `Faraday` cho phép bạn chọn từ bảy Ứng dụng HTTP clients. Ví dụ, bạn có thể sử dụng `EventMachine` cho các request không đồng bộ. (Đối với những điều khác hơn nữa, hãy kiểm tra repo github để các bạn có thể hiểu sâu hơn).
\
\
Tùy chỉnh đó có nghĩa là đoạn mã Faraday của chúng ta có liên quan nhiều hơn. Trước khi chúng ta thực hiện HTTP request và phân tích(parse) kết quả, chúng ta cần phải:
```
1. Chọn bộ điều hợp HTTP. Mặc định là Net/http.
2. Xác định loại phản hồi. Trong trường hợp này, chúng ta đang nói đến là JSON, nhưng bạn cũng có thể sử dụng XML hoặc CSV.
```
```
gem install faraday
gem install faraday_middleware
```
```
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
\
Bạn sẽ nhận thấy rằng ví dụ trên chuyển truy vấn của mình dưới dạng tham số tùy chọn trên phương thức get thay vì kết hợp chúng vào chuỗi URL. Và bởi vì bên trên đã định nghĩa với `Faraday` rằng response sẽ là JSON, chúng ta có thể gọi response.body và lấy lại một hash đã được parse.

### Tổng kết
Ruby cung cấp rất nhiều tùy chọn để tương tác với các API JSON. Mặc dù các phương pháp này tương tự cho các yêu cầu GET đơn giản nhất, nhưng sự khác biệt trở nên rõ ràng hơn khi các HTTP request của bạn phát triển phức tạp. tìm hiểu nhiều hơn và xem cái nào phù hợp nhất với nhu cầu của bạn nhé.
\
\
Còn rất nhiều các thư viện hay mà mình chưa có thời gian để tìm hiểu, hoặc các ý kiến của mình nêu trên đều chưa hoàn toàn chính xác, các bạn hãy góp ý thêm để bài viết của mình có ý nghĩa hơn nữa nhé.
\
\
Cảm ơn tất cả các bạn đã theo dỗi bài viết.