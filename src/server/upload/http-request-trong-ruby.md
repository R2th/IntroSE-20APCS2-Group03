Khi làm việc chắc hẳn bạn rất nhiều lần làm các công việc như: get thông tin từ một trang web nào đó, hay đơn giản như submit một form, upload một file...thì bạn cần gửi một HTTP request đến website đó, rùi xử lý kết quả response.

Trong bài viết này mình xin giới thiệu:
- Cách tạo một request HTTP đơn giản sử dụng net/http
- Gửi một request SSL
- Submit data sử dụng request POST
- Gửi một custom header
- Chọn một HTTP client tốt nhất cho từng mục đích công việc của bạn

# How to Send an HTTP Request

Ruby được tích hợp sẵn HTTP client là net/http và bạn có thể sử dụng nó để gửi bất kì request cần thiết nào
Ví dụ:

```
require 'net/http'
Net::HTTP.get('example.com', '/index.html')
```

Dòng trên sẽ return lại nội dung HTML của page. Nhưng thường chúng ta muốn nhiều hơn thế chẳng hạn như HTTP response status. Nếu không có HTTP status, bạn sẽ không biết được liệu request đã thành công hay fail. 
```
response = Net::HTTP.get_response('example.com', '/')
response.code
# 200
```

Bây giờ, nếu bạn muốn get nội dung của response,bạn chỉ cần:

```
response.body
```

# How to Use the HTTParty Gem

Có rất nhiều gem để hỗ trợ bạn gửi request http dễ dàng hơn. Một trong chúng là HTTParty:

```
require 'httparty'
response = HTTParty.get('http://example.com')
response.code
# 200
response.body
# ...
```

Những lợi ích của việc sử dụng HTTP Gem:

- Sử dụng dễ dàng hơn
- Không cần method riêng get_response nữa. Get đã đưa bạn đầy đủ đối tượng response
- Hỗ trợ tạo request SSL transparent

# Sending SSL Requests

Nếu bạn cố gắng để gửi một request SSL với net/http

```
Net::HTTP.get_response("example.com", "/", 443)
```

Bạn sẽ nhận được:

```
Errno::ECONNRESET: Connection reset by peer
```

Thay vào đó, để sử dụng bạn cần làm như sau:

```
net = Net::HTTP.new("example.com", 443)
net.use_ssl = true
net.get_response("/")
```
Thay vào đó, nếu sử dụng gem bạn chỉ cần:
```
response = HTTParty.get('https://example.com')
```

# How to Submit Data With a Post Request
Một request GET được sử dụng để get thông tin như: download ảnh, css, javascript...Còn nếu bạn muốn submit một information nào đó thì cần sử dụng request POST
Ví dụ như:

```
HTTParty.post("http://example.com/login", body: { user: "test@example.com", password: "chunky_bacon" })
```
Để upload một file, bạn cần có request multipart, cái mà không được support bởi HTTParty, thay vào đó bạn có thể sử dụng gem rest client:

```
require 'rest-client'
RestClient.post '/profile', file: File.new('photo.jpg', 'rb')
```

Hoặc gem Faraday:

```
require 'faraday'
conn =
Faraday.new do |f|
  f.request :multipart
  f.request :url_encoded
  f.adapter :net_http
end
file_io = Faraday::UploadIO.new('photo.jpg', 'image/jpeg')
conn.post('http://example.com/profile', file: file_io)
```
# How to Send Custom HTTP Headers

Bạn có thể custom header với một http request. Nó sẽ giúp bạn add thêm các thông tin vào http request của bạn như: cookie hay các thông tin caching... 

```
Faraday.new('http://example.com', headers: { 'User-Agent' => 'test' }).get
```

# Choosing The Best Ruby HTTP Client

Có rất nhiều HTTP client được avaiable trong Ruby, nhưng bạn nên sử dụng loại nào, để giúp bạn đưa ra những quyết định chính xác, tôi đã tạo ra một bảng so sánh giữa chúng:


REPO                |STARS | RECENT_COMMITS | LAST_COMMIT         | LATEST_RELEASE       |CREATED_DATE | 
| ----------------- | ---- | -------------- | ------------------- | -------------------- | ----------- |
|lostisland/faraday | 4103 | 18	            | 2018-05-28 21:42:12 |	2018-05-23 15:15:54	 | 2009-12-10 17:14:55 |
|rest-client/rest-client|4441|0|2017-09-20 04:00:46|2017-07-05 08:43:12|2009-12-07 19:34:29|
|typhoeus/typhoeus|3332|9|2018-07-30 21:21:26|2017-08-21 09:47:17|2009-02-18 23:14:50|
|jnunemaker/httparty|4596|17|2018-03-30 13:54:32|2018-03-30 13:54:32|2008-07-28 20:55:11|
|excon/excon|894|38|2018-08-02 16:01:07|2018-03-27 15:39:37|2009-10-25 17:50:46|
|httprb/http|2225|27|2018-06-13 16:38:36|2018-04-25 13:49:26|2011-10-06 04:19:10|

Nhìn vào độ phổ biến cũng như đánh gía star, last commit là tiêu chí ban đầu tốt để đánh giá từng loại thư viện trên. Nhưng sự khác nhau về technical giữa chúng là gì? 
Rất nhiều trong chúng được wrappers around từ thư viên net/http:
- excon
- httparty
- rest client

Còn Typhoeus được wrapper arround bởi thư viên C libcurl.

Trong khi đó Faraday là 1 gem adapter, nó có thể implement bằng nhiều kiểu khác nhau
# Typhoeus For Multi-Threading

Typhoeus supports concurrent mà không cần viết bất kì một dòng code concurrent nào. Typhoeus là sự lụa chọn tốt nhất nếu bạn đang muốn tối đa hóa request trên giây. Để sử dụng Typhoeus với multi-threading:

```
hydra   = Typhoeus::Hydra.hydra
request = Typhoeus::Request.new("https://www.rubyguides.com")
hydra.queue(request)
hydra.queue(request)
hydra.run    
```

# Faraday Gem For Adaptability
Faraday cho phép bạn lựa chọn bất kì kiểu thực thi nào, từ net/http đến Typhoeus hay thậm chí là rest-client, tất cả từ cùng một giao diện:

Để sử dụng với Typhoeus bạn có thể custom:
```
Faraday.default_adapter = :typhoeus
```

Một điều thú vị khác về Faraday là nó được hỗ trợ bởi các middleware. Middleware giống như các plugin giúp bạn thay đổi request hay response theo mục đích nào đó. Ví dụ:
```
require 'faraday_middleware'
client =
  Faraday.new do |f|
    f.response :json
    f.adapter :net_http
  end
client.get('https://api.github.com/repos/vmg/redcarpet/issues')
```

# How to Debug Your HTTP Requests

Bạn có thể làm như sau:

```
ruby -rsocket -e "trap('SIGINT') { exit }; Socket.tcp_server_loop(8080) { |s,_| puts s.readpartial(1024); puts; s.puts 'HTTP/1.1 200'; s.close }
```

Nó sẽ tạo một server với cổng 8080, cái mà sẽ in ra mọi thứ mà nó nhận được, return một http status code, sau đó đóng connection.Bạn có thể gửi lại request đến localhost:8080 để xem chúng:
```
Faraday.new('http://localhost:8080', headers: { 'User-Agent' => 'test', 'foo' => '1234' }).get
# GET / HTTP/1.1
# User-Agent: test
# Foo: 1234
# Accept-Encoding: gzip;q=1.0,deflate;q=0.6,identity;q=0.3
# Accept: */*
# Connection: close
# Host: localhost:8080
```

Trên đây là một số cách thông dụng để tạo request HTTP trong ngôn ngữ Ruby, cũng như so sánh ưu nhược điểm giữa chúng, hy vọng sẽ giúp ích được các bạn trong quá trình làm việc
Thanks for reading

Tham khảo: https://www.rubyguides.com/2018/08/ruby-http-request/